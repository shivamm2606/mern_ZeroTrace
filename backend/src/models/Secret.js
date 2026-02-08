import mongoose from 'mongoose';

const secretSchema = new mongoose.Schema({
    encryptedData: {
        type: String,
        required: true,
    },
    iv: {
        type: String,
        required: true,
    },
    viewLimit: {
        type: Number,
        default: 1,
    },
    viewCount: {
        type: Number,
        default: 0,
    },
    expiresAt: {
        type: Date,
        required: true,
    },
}, { timestamps: true });

// Create a TTL index on the expiresAt field
secretSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model('Secret', secretSchema);
