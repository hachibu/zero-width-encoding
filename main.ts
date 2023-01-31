const ZERO_WIDTH_SPACE = String.fromCodePoint(8203);
const ZERO_WIDTH_NON_JOINER = String.fromCodePoint(8204);
const ZERO_WIDTH_JOINER = String.fromCodePoint(8205);

export const encode = (string: string): string => {
  let result = "";
  const textEncoder = new TextEncoder();
  const bytes: Uint8Array = textEncoder.encode(string);

  for (let byte of bytes) {
    while (byte) {
      const digit = byte & 1;
      switch (digit) {
        case 0:
          result += ZERO_WIDTH_SPACE;
          break;
        case 1:
          result += ZERO_WIDTH_NON_JOINER;
          break;
      }
      byte = byte >> 1;
    }
    result += ZERO_WIDTH_JOINER;
  }

  return result;
};

export const decode = (string: string): string => {
  const textDecoder = new TextDecoder("utf-8");
  const bytes: number[] = [];
  let byteString = "";

  for (const char of string) {
    switch (char) {
      case ZERO_WIDTH_SPACE:
        byteString = "0" + byteString;
        break;
      case ZERO_WIDTH_NON_JOINER:
        byteString = "1" + byteString;
        break;
      case ZERO_WIDTH_JOINER:
        bytes.push(parseInt(byteString, 2));
        byteString = "";
        break;
    }
  }

  return textDecoder.decode(new Uint8Array(bytes));
};
