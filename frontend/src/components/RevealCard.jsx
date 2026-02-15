import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { Eye, EyeOff, AlertTriangle, Copy, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const RevealCard = ({ id }) => {
    // State to hold the decrypted secret text from the API
    const [secretData, setSecretData] = useState(null);

    // State to track if the secret has been revealed (decrypted)
    const [isRevealed, setIsRevealed] = useState(false);

    // State to store any errors (like 404 Not Found)
    const [errorMessage, setErrorMessage] = useState(null);

    // Loading state for the network request
    const [isLoading, setIsLoading] = useState(false);

    // Tiny state for the "Copied!" icon feedback
    const [isCopied, setIsCopied] = useState(false);

    // This function runs when the user clicks "Reveal Secret"
    const handleReveal = async () => {
        setIsLoading(true);
        try {
            // GET request to /api/secrets/:id
            // This will also trigger the backend to increment the view count or delete the secret
            const response = await axiosInstance.get(`/secrets/${id}`);

            // If successful, save the data and switch the view
            setSecretData(response.data.data);
            setIsRevealed(true);
        } catch (error) {
            // Use the message from the backend if available
            const message = error.response?.data?.message || 'This secret does not exist or has expired.';
            setErrorMessage(message);
        } finally {
            setIsLoading(false);
        }
    };

    // Helper to copy text
    const handleCopy = () => {
        navigator.clipboard.writeText(secretData);
        setIsCopied(true);
        toast.success('Secret copied');

        // Reset the icon after 2 seconds
        setTimeout(() => setIsCopied(false), 2000);
    };

    // 1. Error View: If something went wrong or secret is gone
    if (errorMessage) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-lg bg-zinc-900/50 backdrop-blur-md p-6 rounded-xl border border-red-500/20 text-center mx-auto"
            >
                <div className="mx-auto bg-red-500/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <AlertTriangle className="w-6 h-6 text-red-500" />
                </div>
                <h2 className="text-lg font-medium text-slate-100 mb-1">Unavailable</h2>
                <p className="text-slate-500 text-sm">{errorMessage}</p>
            </motion.div>
        );
    }

    // 2. Main View
    return (
        <div className="w-full max-w-lg mx-auto">
            <AnimatePresence mode="wait">
                {isRevealed ? (
                    // VIEW A: The secret is visible
                    <motion.div
                        key="revealed"
                        initial={{ opacity: 0, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="bg-zinc-900/50 backdrop-blur-md p-6 rounded-xl border border-zinc-800"
                    >
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-lg font-medium text-indigo-500 flex items-center gap-2">
                                <Eye className="w-4 h-4" /> Secret Revealed
                            </h2>
                            <span className="px-2 py-0.5 bg-red-500/10 text-red-500 text-xs font-medium rounded border border-red-500/20">
                                secret deleted
                            </span>
                        </div>

                        <div className="bg-zinc-950 rounded-lg p-4 border border-zinc-800 mb-5 relative group">
                            {/* The secret text block */}
                            <pre className="text-slate-200 whitespace-pre-wrap font-mono text-sm break-all">{secretData}</pre>

                            {/* Copy button that appears on hover */}
                            <button
                                onClick={handleCopy}
                                className="absolute top-3 right-3 p-1.5 bg-zinc-800 rounded-md text-slate-500 hover:text-slate-100 transition-colors opacity-0 group-hover:opacity-100"
                                title="Copy"
                            >
                                {isCopied ? <Check size={14} /> : <Copy size={14} />}
                            </button>
                        </div>

                        <div className="text-center">
                            <p className="text-slate-500 text-xs">Please copy this now. It may not be here if you refresh.</p>
                        </div>
                    </motion.div>
                ) : (
                    // VIEW B: The gateway (Click to reveal)
                    <motion.div
                        key="hidden"
                        exit={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
                        transition={{ duration: 0.2 }}
                        className="w-full max-w-lg mx-auto bg-zinc-900/50 backdrop-blur-md p-8 rounded-xl border border-zinc-800 text-center"
                    >
                        <div className="mx-auto bg-zinc-800/50 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                            <EyeOff className="w-8 h-8 text-slate-500" />
                        </div>
                        <h2 className="text-xl font-medium text-slate-100 mb-2">Secure Message</h2>
                        <p className="text-slate-500 mb-8 text-sm">This message is encrypted. Click to reveal.</p>

                        <button
                            onClick={handleReveal}
                            disabled={isLoading}
                            className="px-8 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-md transition-all disabled:opacity-50 text-sm shadow-sm"
                        >
                            {isLoading ? 'Decrypting...' : 'Reveal Secret'}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default RevealCard;
