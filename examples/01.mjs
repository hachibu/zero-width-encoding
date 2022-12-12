import { encode } from '../dist/index.js'

const invisibleMessage = encode('A secret message.')

console.log('Hello,', invisibleMessage + 'World!')
