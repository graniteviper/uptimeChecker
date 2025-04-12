import { Keypair } from "@solana/web3.js";

const keypair = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(process.env.PRIVATE_KEY!)),{skipValidation: true});
// console.log(keypair.publicKey);
// const arr = new Uint8Array([ 198, 86, 135, 193, 125, 53, 4, 169, 114, 218, 226, 70, 126, 57, 126, 21, 187, 55, 151, 39, 190, 125, 49, 149, 137, 147, 211, 179, 49, 176, 120, 71 ])
// const a = new TextDecoder().decode(arr);
console.log(keypair.publicKey.toBase58());

