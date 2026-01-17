import { useState, KeyboardEvent } from 'react';
import { Wifi, Lock, Info, X } from 'lucide-react';

interface HeaderProps {
    role: 'GUEST' | 'ADMIN';
    onLogin: (role: 'GUEST' | 'ADMIN') => void;
}

export default function Header({ role, onLogin }: HeaderProps) {
    const [password, setPassword] = useState('');
    const [showInfo, setShowInfo] = useState(false);

    const handleLogin = () => {
        if (password === 'admin123') {
            onLogin('ADMIN');
            setPassword('');
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleLogin();
    };

    return (
        <>
            <header className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                        JB Enterprise
                    </h1>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Pilot Dashboard</span>
                        <span className="flex items-center gap-1 text-[9px] text-amber-500 border border-amber-900/50 bg-amber-900/20 px-1.5 py-0.5 rounded">
                            <Lock size={10} /> SIM (MOCK)
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setShowInfo(true)}
                        className="text-slate-400 hover:text-white transition-colors"
                    >
                        <Info size={20} />
                    </button>

                    {role === 'ADMIN' ? (
                        <button onClick={() => onLogin('GUEST')} className="text-xs text-slate-500 hover:text-white transition-colors">
                            Exit Admin
                        </button>
                    ) : (
                        <div className="flex gap-2">
                            <input
                                type="password"
                                placeholder="Key"
                                className="bg-surface-2 border border-white/5 rounded px-2 py-1 text-xs w-20 focus:outline-none focus:border-emerald-500 transition-colors text-white"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            <button
                                onClick={handleLogin}
                                className="bg-surface-3 hover:bg-white/10 text-white text-[10px] font-bold px-3 py-1 rounded transition-colors"
                            >
                                LOGIN
                            </button>
                        </div>
                    )}
                    {/* Status Indicator */}
                    <div className="w-8 h-8 rounded-full bg-surface-2 flex items-center justify-center border border-white/5">
                        <div className={`w-2 h-2 rounded-full ${role === 'ADMIN' ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-slate-500'}`} />
                    </div>
                </div>
            </header>

            {/* Info Modal */}
            {showInfo && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-surface-2 border border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl relative">
                        <button
                            onClick={() => setShowInfo(false)}
                            className="absolute top-4 right-4 text-slate-500 hover:text-white"
                        >
                            <X size={20} />
                        </button>
                        <h2 className="text-xl font-bold text-white mb-4">About JB Pilot</h2>
                        <p className="text-slate-400 text-sm">
                            Version 2.2.0 (Progressive). Implements Energy Arbitrage simulation with Material 3 Design.
                            <br /><br />
                            <strong>Admin Key:</strong> admin123
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}
