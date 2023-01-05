import {
  assertArrayIncludes,
  assertEquals,
} from "https://deno.land/std@0.168.0/testing/asserts.ts";
import { hmac } from "https://deno.land/x/hmac@v2.0.1/mod.ts";
import { decode, encode } from "./main.ts";

function mockHash(): string {
  return hmac("sha256", "key", "email", "utf8", "hex").toString();
}

Deno.test("encodes and decodes a SHA-256 hash", () => {
  const hash = mockHash();
  const hashEncoded = encode(hash);
  const hashDecoded = decode(hashEncoded);

  assertEquals(hash, hashDecoded);
});

Deno.test("encodes a SHA-256 hash using only zero-width characters", () => {
  const hashEncoded = encode(mockHash());

  for (const char of hashEncoded) {
    const codePoint = char.codePointAt(0);
    assertArrayIncludes([8203, 8204, 8205], [codePoint]);
  }
});
