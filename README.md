# Catching Email Leaks At Scale

After reading [this article](https://www.ndtv.com/world-news/elon-musk-explains-how-tesla-caught-employee-leaking-data-3433802) about how Tesla caught an employee who leaked confidential data by using a binary signature of 1 or 2 spaces between sentences, I realized that this approach has 2 major flaws.

1. The encoding is visible to the naked eye.
2. This approach is not scalable if they intend to uniquely identify billions of email recipients because
the number of sentences must grow exponentially. For example, an email with 100 sentences can at most uniquely identify 10,000 email recipients.

This is a proof-of-concept using cryptographic hashes and zero-width text encoding to solve the problems above. By encoding a SHA256 hash into a series of zero-width characters we can identify 10^77 unique email recipients in a way that is invisible to the naked eye.

The 256-bit hashspace is very large and is on the order of 10^77. The total number of atoms in the known universe is currently estimated by physicists to be on the order of 10^80.

## What is zero-width encoding?
Zero-width encoding is a text-to-invisible-text encoding scheme. The core of the algorithm is very simple and can be summarized by the table below.

| binary      | invisible character   |
| ----------- | --------------------- |
| 0           | zero-width space      |
| 1           | zero-width joiner     |
| end of byte | zero-width non-joiner |

## Encoding
UTF-8 string > Uint8 Array > binary string > invisible string

## Decoding
Invisible string > binary string > Uint8Array > UTF-8 string

## Usage
```
node src/index.mjs
```
