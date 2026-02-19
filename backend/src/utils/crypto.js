import CryptoJS from "crypto-js";

// Beginner-friendly Encryption
export const encrypt = (text) => {
  // Access key inside the function to ensure .env is loaded
  const secretKey = process.env.ENCRYPTION_KEY;
  if (!secretKey) throw new Error("Missing ENCRYPTION_KEY in .env file");

  // CryptoJS handles all the complex logic (IV, Salt, etc.) automatically
  const encrypted = CryptoJS.AES.encrypt(text, secretKey).toString();

  return {
    encryptedData: encrypted,
    iv: "generated_automatically",
  };
};

// Beginner-friendly Decryption
export const decrypt = (encryptedText) => {
  const secretKey = process.env.ENCRYPTION_KEY;
  if (!secretKey) throw new Error("Missing ENCRYPTION_KEY in .env file");

  // We just need the encrypted text and the key to unlock it
  const bytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);

  if (!originalText) {
    throw new Error("Decryption failed - invalid key or corrupted data");
  }

  return originalText;
};
