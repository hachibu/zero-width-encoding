import { createHash } from 'crypto'
import { encode, decode } from './index'

describe('index', () => {
    it.concurrent('encodes and decodes a SHA-256 hash', () => {
        const hash = mockHash()
        const hashEncoded = encode(hash)
        const hashDecoded = decode(hashEncoded)

        expect(hash).toEqual(hashDecoded)
    })

    it.concurrent(
        'encodes a SHA-256 hash using only zero-width characters',
        () => {
            const hashEncoded = encode(mockHash())

            for (const char of hashEncoded) {
                expect([8203, 8204, 8205]).toContain(char.codePointAt(0))
            }
        }
    )

    const mockHash = () => createHash('sha256').update('email').digest('hex')
})
