import { v6 as uuidv6 } from 'uuid';
import { prismClient } from "database/client";
import type { signupMessage, validatorMessage } from 'types/types';
import type { ServerWebSocket } from 'bun';
import {PublicKey} from "@solana/web3.js";
import nacl from "tweetnacl";
import nacl_util from "tweetnacl-util";

const availableValidators: {validatorId: string, publicKey: string, socket: ServerWebSocket<unknown>}[] = []
const callbacks: {[callbackId: string]:(data: validatorMessage)=>void} = {};
const COST_PER_VALIDATION = 100 ; // it is in lamports.

Bun.serve({
    fetch(req, server) {
      // upgrade the request to a WebSocket
      if (server.upgrade(req)) {
        return; // do not return a Response
      }
      return new Response("Upgrade failed", { status: 500 });
    },
    port: 8080,
    websocket: {
        async message(ws: ServerWebSocket<unknown>,message: string){
            const data = JSON.parse(message);
            if(data.type === "signup"){
                try{
                    const details: signupMessage = data.data;
                    const verified = await verifyMessage(
                        `Signed message for ${data.data.callbackId}, ${data.data.publicKey}`,
                        data.data.publicKey,
                        data.data.signedMessage
                    );
                    if(!verified){
                        console.error("Not verified.");
                        return;
                    }
                    const existingValidator = await prismClient.validator.findFirst({
                        where:{
                            publicKey: details.publicKey
                        }
                    })
                    if(existingValidator){
                        ws.send(JSON.stringify({
                            type: "signup",
                            data:{
                                validatorId: existingValidator.id,
                                callbackId: details.callbackId
                            }
                        }));

                        availableValidators.push({
                            validatorId: existingValidator.id,
                            publicKey: details.publicKey,
                            socket: ws
                        })
                        return;
                    }
                    const response = await prismClient.validator.create({
                        data:{
                            publicKey: details.publicKey,
                            ip: details.ip,
                            location: "unknown",
                        }
                    });
                    ws.send(JSON.stringify({
                        type: "signup",
                        data:{
                            validatorId: response.id,
                            callbackId: details.callbackId
                        }
                    }));
                    availableValidators.push({
                        validatorId: response.id,
                        publicKey: details.publicKey,
                        socket: ws
                    })
                } catch(err){
                    console.error(err);
                }
                
            } else if(data.type === "validate"){
                callbacks[data.data.callbackId](data);
                delete callbacks[data.data.callbackId];
            }
        },
        async close(ws: ServerWebSocket<unknown>){
            availableValidators.splice(availableValidators.findIndex(v=>v.socket === ws),1);
        }
    }, // handlers
  });


  async function verifyMessage(message: string, publicKey: string, signature: string) {
    const messageBytes = nacl_util.decodeUTF8(message);
    const result = nacl.sign.detached.verify(
        messageBytes,
        new Uint8Array(JSON.parse(signature)),
        new PublicKey(publicKey).toBytes(),
    );

    return result;
}

setInterval(async () => {
    const websitesToMonitor = await prismClient.websites.findMany({
        where: {
            disabled: false
        }
    });

    websitesToMonitor.forEach(website => {
        availableValidators.forEach(validator => {
            const callbackId = uuidv6();
            validator.socket.send(JSON.stringify({
                type: "validate",
                data:{
                    callbackId,
                    url: website.url
                }
            }))

            callbacks[callbackId] = async (data: validatorMessage) => {
                const verified = await verifyMessage(`Replying to ${callbackId}`,validator.publicKey,data.signedMessage);
                if(!verified){
                    console.error("Not verified");
                    return;
                }
                await prismClient.$transaction(async (tx)=>{
                    await tx.websiteTicks.create({
                        data:{
                            websiteId: website.id,
                            validatorId: data.validatorId,
                            status: data.status,
                            latency: data.latency,
                            timestamp: new Date()
                        }
                    })

                    await tx.validator.update({
                        where:{
                            id: data.validatorId,
                        },
                        data:{
                            pendingPayouts:{
                                increment: COST_PER_VALIDATION
                            }
                        }
                    })
                })
            }

        });
    });

}, 1000*60*1);