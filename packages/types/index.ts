export interface signupMessage {
    publicKey: string,
    ip: string,
    callbackId: string
}

export interface validatorMessage {
    validatorId: string,
    status: 'Good' | 'Bad',
    latency: number,
    signedMessage: string
}