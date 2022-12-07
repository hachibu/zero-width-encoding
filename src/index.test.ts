import { createHmac } from 'crypto'
import { zeroWidthEncode, zeroWidthDecode } from './index'

test('encodes and decodes a SHA256 hash', () => {
    const hash = createHmac('sha256', 'secret')
        .update('test@test.com')
        .digest('hex')
    const hashEncoded = zeroWidthEncode(hash)
    const hashDecoded = zeroWidthDecode(hashEncoded)

    expect(hash).toEqual(hashDecoded)
})
