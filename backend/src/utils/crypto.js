import CryptoJS from "crypto-js";

export const encrypt = (text) => {
  const secretKey = process.env.ENCRYPTION_KEY;
  if (!secretKey) throw new Error("Missing ENCRYPTION_KEY in .env file");

  const encrypted = CryptoJS.AES.encrypt(text, secretKey).toString();

  return {
    encryptedData: encrypted,
    iv: "generated_automatically",
  };
};

export const decrypt = (encryptedText) => {
  const secretKey = process.env.ENCRYPTION_KEY;
  if (!secretKey) throw new Error("Missing ENCRYPTION_KEY in .env file");

  const bytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);

  if (!originalText) {
    throw new Error("Decryption failed, invalid key or corrupted data");
  }

  return originalText;
};
