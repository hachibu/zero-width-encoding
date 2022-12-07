import { TextEncoder, TextDecoder } from "util";

const ZERO_WIDTH_SPACE = String.fromCodePoint(8203);
const ZERO_WIDTH_NON_JOINER = String.fromCodePoint(8204);
const ZERO_WIDTH_JOINER = String.fromCodePoint(8205);

export const zeroWidthEncode = (string) => {
  const textEncoder = new TextEncoder();
  const binaryStrings = textEncoder
    .encode(string)
    .reduce((acc, byte) => acc.concat(byte.toString(2)), []);

  let zeroWidthString = "";
  for (const binaryString of binaryStrings) {
    for (const digit of binaryString) {
      switch (digit) {
        case "0":
          zeroWidthString += ZERO_WIDTH_SPACE;
          break;
        case "1":
          zeroWidthString += ZERO_WIDTH_NON_JOINER;
          break;
      }
    }
    zeroWidthString += ZERO_WIDTH_JOINER;
  }

  return zeroWidthString;
};

export const zeroWidthDecode = (zeroWidthString) => {
  const binaryStrings = [];
  let currentBinaryString = "";
  for (const char of zeroWidthString) {
    switch (char) {
      case ZERO_WIDTH_SPACE:
        currentBinaryString += "0";
        break;
      case ZERO_WIDTH_NON_JOINER:
        currentBinaryString += "1";
        break;
      case ZERO_WIDTH_JOINER:
        binaryStrings.push(currentBinaryString);
        currentBinaryString = "";
        break;
    }
  }

  const bytes = new Uint8Array(
    binaryStrings.map((binaryString) => parseInt(binaryString, 2))
  );
  const textDecoder = new TextDecoder("utf-8");
  const string = textDecoder.decode(bytes);

  return string;
};
