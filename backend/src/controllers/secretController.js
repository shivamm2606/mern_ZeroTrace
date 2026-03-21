import Secret from "../models/Secret.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { encrypt, decrypt } from "../utils/crypto.js";

export const createSecret = asyncHandler(async (req, res) => {
    
  const { text, viewLimit, expiration } = req.body;

  if (!text) {
    res.status(400);
    throw new Error("Please provide some text to encrypt.");
  }

  const { encryptedData, iv } = encrypt(text);

  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + (parseInt(expiration) || 1440));

  const secret = await Secret.create({
    encryptedData,
    iv,
    viewLimit: viewLimit || 1,
    expiresAt,
  });

  res.status(201).json({
    success: true,
    data: { id: secret._id },
  });
});

export const getSecret = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const secret = await Secret.findById(id);

  if (!secret) {
    res.status(404);
    throw new Error(
      "Secret not found. It may have been viewed and destroyed already.",
    );
  }

  // increment before checking to handle concurrent requests
  secret.viewCount += 1;
  await secret.save();

  if (secret.viewCount > secret.viewLimit) {
    await Secret.deleteOne({ _id: id });
    res.status(404);
    throw new Error("Secret is no longer available. (View limit reached)");
  }

  let decryptedText;
  try {
    decryptedText = decrypt(secret.encryptedData);
  } catch (err) {
    res.status(400);
    throw new Error("Could not decrypt data. It might be corrupted.");
  }

  if (secret.viewCount >= secret.viewLimit) {
    await Secret.deleteOne({ _id: id });
  }

  res.status(200).json({
    success: true,
    data: decryptedText,
  });
});
