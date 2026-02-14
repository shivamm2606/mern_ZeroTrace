import React from 'react';
import ComposeForm from '../components/ComposeForm';

const Home = () => {
    return (
        <div className="min-h-screen bg-zinc-950 flex flex-col items-center pt-10 p-4">
            <header className="mb-12 text-center animate-fade-in relative z-10">
                <div className="inline-flex items-center justify-center mb-2">
                    <h1 className="text-4xl px-4 text-slate-100">
                        <span className="font-bold">Zero</span>
                        <span className="font-medium text-slate-250">Trace</span>
                    </h1>
                </div>
                <p className="text-slate-300 text-xs font-medium uppercase">Secure & Encrypted</p>
            </header>

            <div className="w-full">
                <ComposeForm />
            </div>

            <footer className="mt-16 text-slate-600 text-sm relative z-10">
                &copy; {new Date().getFullYear()} ZeroTrace
            </footer>
        </div>
    );
};

export default Home;
