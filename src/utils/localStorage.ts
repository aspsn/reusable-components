import CryptoJs from "crypto-js";

const getLocalStorage = (key: string) => {
  if (typeof window !== "undefined") return localStorage?.getItem(key);
  return null;
};
const getDataLocalStorageHash = (key: string) => {
  const value =
    typeof window !== "undefined" ? localStorage?.getItem(key) : null;

  if (value !== null) {
    const desc = CryptoJs.AES.decrypt(value, "token-fis");
    const data = desc.toString(CryptoJs.enc.Utf8);
    return data;
  } else {
    return;
  }
};

const setLocalStorage = (key: string, value: string) => {
  if (typeof window !== "undefined") localStorage.setItem(key, value);
  return null;
};

const setDataLocalStorageHash = (key: string, value: string) => {
  const hash = CryptoJs.AES.encrypt(value, "token-fis");
  return localStorage.setItem(key, hash.toString());
};

export {
  getDataLocalStorageHash,
  getLocalStorage,
  setDataLocalStorageHash,
  setLocalStorage,
};
