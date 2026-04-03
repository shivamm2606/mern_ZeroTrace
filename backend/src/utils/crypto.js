import { randomBytes, createCipheriv, createDecipheriv } from 'crypto';

export const encrypt = (text) => {
  const key = Buffer.from(process.env.ENCRYPTION_KEY, 'utf8');
  const iv = randomBytes(16);
  const cipher = createCipheriv('aes-256-cbc', key, iv);
  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
  return {
    encryptedData: encrypted.toString('hex'),
    iv: iv.toString('hex'),
  };
};

export const decrypt = (encryptedHex, ivHex) => {
  const key = Buffer.from(process.env.ENCRYPTION_KEY, 'utf8');
  const iv = Buffer.from(ivHex, 'hex');
  const decipher = createDecipheriv('aes-256-cbc', key, iv);
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(encryptedHex, 'hex')),
    decipher.final(),
  ]);
  return decrypted.toString('utf8');
};