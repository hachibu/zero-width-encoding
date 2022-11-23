import { TextEncoder, TextDecoder } from 'util';

const ZERO_WIDTH_SPACE = '​'
const ZERO_WIDTH_JOINER = '‍'
const ZERO_WIDTH_NON_JOINER = '‌'

export const zeroWidthEncode = (string) => {
    const encoder = new TextEncoder()
    const byteEncoding = encoder.encode(string)
    const binaryEncoding = byteEncoding.reduce((a, b) => a.concat(b.toString(2)), [])

    let zeroWidthEncoding = ''
    for (const binaryString of binaryEncoding) {
        for (const digit of binaryString) {
            zeroWidthEncoding += digit === '0' ? ZERO_WIDTH_SPACE : ZERO_WIDTH_JOINER
        }
        zeroWidthEncoding += ZERO_WIDTH_NON_JOINER
    }

    return zeroWidthEncoding
}

export const zeroWidthDecode = (string) => {
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
