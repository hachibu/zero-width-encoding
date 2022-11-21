import { createHmac } from 'crypto'
import { TextEncoder, TextDecoder } from 'util';

const ZERO_WIDTH_SPACE = '​'
const ZERO_WIDTH_JOINER = '‍'
const ZERO_WIDTH_NON_JOINER = '‌'

export const ZeroWidthEncode = (string) => {
    const encoder = new TextEncoder()
    const byteEncoding = encoder.encode(string)

    let binaryEncoding = []
    for (const byte of byteEncoding) {
        binaryEncoding.push(byte.toString(2))
    }

    let zeroWidthEncoding = ''
    for (const binaryString of binaryEncoding) {
        for (const digit of binaryString) {
            zeroWidthEncoding += digit === '0' ? ZERO_WIDTH_SPACE : ZERO_WIDTH_JOINER
        }
        zeroWidthEncoding += ZERO_WIDTH_NON_JOINER
    }

    return zeroWidthEncoding
}

export const ZeroWidthDecode = (string) => {
    let binaryEncoding = []
    let currentBinaryString = ''
    for (let i = 0; i < string.length; i++) {
        const c = string[i]
        if (c === ZERO_WIDTH_NON_JOINER) {
            binaryEncoding.push(currentBinaryString)
            currentBinaryString = ''
            continue
        }
        currentBinaryString += c === ZERO_WIDTH_SPACE ? '0' : '1'
    }

    const integerEncoding = []
    for (const binaryString of binaryEncoding) {
        const n = parseInt(binaryString, 2)
        integerEncoding.push(n)
    }

    const byteEncoding = new Uint8Array(integerEncoding)

    const decoder = new TextDecoder('utf-8')
    const stringEncoding = decoder.decode(byteEncoding)

    return stringEncoding
}

function main() {
    const emailRecipient = 'test@test.com'
    const hmacKey = 'secret'

    const hash = createHmac('sha256', hmacKey).update(emailRecipient).digest('hex')
    const hashEncoded = ZeroWidthEncode(hash)
    const hashDecoded = ZeroWidthDecode(hashEncoded)

    console.log({
        hash,
        hashEncoded,
        hashEncodedLength: hashEncoded.length,
        hashDecoded
    })
}

main()
