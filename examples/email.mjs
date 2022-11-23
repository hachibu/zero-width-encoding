import { createHmac } from 'crypto'
import { zeroWidthEncode, zeroWidthDecode } from "../src/index.mjs"

const emailRecipient = 'test@test.com'
const hash = createHmac('sha256', 'secret').update(emailRecipient).digest('hex')
const hashEncoded = zeroWidthEncode(hash)
const hashDecoded = zeroWidthDecode(hashEncoded)

console.log({
    hash,
    hashEncoded,
    hashEncodedLength: hashEncoded.length,
    hashDecoded
})
