import React from 'react';
import { useParams } from 'react-router-dom';
import RevealCard from '../components/RevealCard';

const RevealPage = () => {
    const { id } = useParams();

    return (
        <div className="min-h-screen bg-zinc-950 flex flex-col items-center pt-32 p-4">
            <header className="mb-10 cursor-pointer fade-in" onClick={() => window.location.href = '/'}>
                <h1 className="text-2xl px-4 tracking-tighter text-slate-100 opacity-50 hover:opacity-100 transition-opacity">
                    <span className="font-bold">Zero</span>
                    <span className="font-light text-slate-400">Trace</span>
                </h1>
            </header>

            <div className="w-full">
                <RevealCard id={id} />
            </div>
        </div>
    );
};

export default RevealPage;
