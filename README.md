# Zero-Width Encoding

A text-to-invisible-text encoding scheme that represents text as binary byte strings using invisible characters to represent 0, 1 and the end of each byte.

1. `'abc'`
2. `Uint8Array(3) [97, 98, 99]`
3. `['1100001', '1100010', '1100011']`

| Binary character | Invisible character   |
| ---------------- | --------------------- |
| 0                | Zero-width space      |
| 1                | Zero-width non-joiner |
| End of byte      | Zero-width joiner     |
