import LZString from "lz-string";

const encode = (str: string): string => {
  return LZString.compressToEncodedURIComponent(str);
};

const decode = (str: string): string => {
  return LZString.decompressFromEncodedURIComponent(str) ?? "";
};

const UrlEncoder = { encode, decode };

export default UrlEncoder;
