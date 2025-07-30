import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

const SECRET_KEY = "c1f2d390e6c84ac5b22a71197ff76c9c88dc7ea057b6a5aafaa44223fa4534k6"; // 🔒 Use env in production

// Encrypt only values
export const setEncryptedCookie = (key, valueObj, expiresInDays = 7) => {
  const encryptedData = {};

  for (const prop in valueObj) {
    if (Object.prototype.hasOwnProperty.call(valueObj, prop)) {
      const encryptedValue = CryptoJS.AES.encrypt(
        JSON.stringify(valueObj[prop]),
        SECRET_KEY
      ).toString();
      encryptedData[prop] = encryptedValue;
    }
  }

  Cookies.set(key, JSON.stringify(encryptedData), { expires: expiresInDays });
};

// Decrypt each value individually
export const getDecryptedCookie = (key) => {
  const cookie = Cookies.get(key);
  if (!cookie) return null;

  try {
    const parsed = JSON.parse(cookie);
    const decryptedData = {};

    for (const prop in parsed) {
      if (Object.prototype.hasOwnProperty.call(parsed, prop)) {
        const bytes = CryptoJS.AES.decrypt(parsed[prop], SECRET_KEY);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);
        decryptedData[prop] = JSON.parse(decrypted);
      }
    }

    return decryptedData;
  } catch (err) {
    console.error("Failed to decrypt cookie:", err);
    return null;
  }
};

export const removeCookie = (key) => {
  Cookies.remove(key);
};
