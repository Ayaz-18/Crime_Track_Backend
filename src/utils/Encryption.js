import crypto from "crypto"
const ALGO="aes-256-cbc"

const ENC_KEY=crypto.createHash("sha256")
.update(String(process.env.SECRET_KEY)).digest("base64").substr(0, 32)
const IV=crypto.randomBytes(16)

export const encrypt=(text)=>{
    let cipher=crypto.createCipheriv(ALGO, ENC_KEY, IV)
    let encrypted=cipher.update(text, "utf8", "hex")
    encrypted+=cipher.final("hex")
    return IV.toString("hex")+":"+encrypted
}

export const decrypt=(hash)=>{
    let parts=hash.split(":")
    let iv=Buffer.from(parts.shift(), "hex")
    let encryptedText=parts.join(":")
    let decipher=crypto.createDecipheriv(ALGO, ENC_KEY, iv)
    let decrypted=decipher.update(encryptedText, "hex", "utf8")
    decrypted+=decipher.final("utf8")
    return decrypted
}

export const hash=(text)=>{
    return crypto.createHash("sha256").update(text).digest("hex")
}

