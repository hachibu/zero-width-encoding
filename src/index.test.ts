import { createHmac } from 'crypto'
import { zeroWidthEncode, zeroWidthDecode } from './index'

describe('index', () => {
    it.concurrent('encodes and decodes a SHA-256 hash', () => {
        const hash = mockHash()
        const hashEncoded = zeroWidthEncode(hash)
        const hashDecoded = zeroWidthDecode(hashEncoded)

        expect(hash).toEqual(hashDecoded)
    })

    it.concurrent(
        'encodes a SHA-256 hash using only zero-width characters',
        () => {
            const hashEncoded = zeroWidthEncode(mockHash())

            for (const char of hashEncoded) {
                expect([8203, 8204, 8205]).toContain(char.codePointAt(0))
            }
        }
    )

    const mockHash = () =>
        createHmac('sha256', 'secret').update('test@test.com').digest('hex')
})
