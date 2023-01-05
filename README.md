# Zero-Width Encoding

A text-to-invisible-text encoding scheme that represents text as a binary string using invisible characters to represent 0, 1 and the end of each byte.

| Binary Character | Invisible Character   |
| ---------------- | --------------------- |
| 0                | Zero-Width Space      |
| 1                | Zero-Width Non-Joiner |
| End of Byte      | Zero-Width Joiner     |

## Encoding Diagram

![zero-width encoding diagram](images/zero-width-encoding-diagram.png)
