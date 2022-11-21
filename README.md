# Zero-Width Encoding

After reading [this article](https://www.ndtv.com/world-news/elon-musk-explains-how-tesla-caught-employee-leaking-data-3433802) on how Tesla caught an employee who leaked confidential data, I thought about how I would solve this problem.

The approach outlined in the article has 2 problems.

1. The encoding is easy to detect because it's visible to the naked eye.
2. Identifying large amounts of people would require embedding a long unique signature into the email (e.g. random SHA256 hash) which would result in very long emails that would be very suspicious looking.

This is a proof-of-concept for zero-width text encoding and decoding which could be used to identify data leaks by embedding a random SHA256 hash tied to the recipient in an email.

## What is zero-width encoding?
Zero-width encoding is a text-to-invisible-text encoding scheme. The core of the algorithm is very simple and can be summarized by the table below.

| binary      | invisible character   |
| ----------- | --------------------- |
| 0           | zero-width space      |
| 1           | zero-width joiner     |
| end of byte | zero-width non-joiner |

### Encoding
UTF-8 string > Uint8 Array > binary string > invisible string

### Decoding
Invisible string > binary string > Uint8Array > UTF-8 string

## Usage
```
node src/index.mjs
```
