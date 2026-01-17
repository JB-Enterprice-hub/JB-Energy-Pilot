import { useNavigate } from 'react-router-dom';
import {
    TrendingUp, Battery, Activity, Sun, Zap, Settings, AlertCircle, BarChart3
} from 'lucide-react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, BarChart, Bar
} from 'recharts';

// Props passed from App.tsx
interface DashboardProps {
    soc: number;
    currentAction: 'IDLE' | 'CHARGE' | 'DISCHARGE';
    netMargin: number;
    role: 'GUEST' | 'ADMIN';
    setRole: (role: 'GUEST' | 'ADMIN') => void;
}

// Helper for Old Design Stats
const StatCard = ({ title, value, unit, icon: Icon, color }: any) => (
    <div className={`p-6 rounded-xl border bg-slate-900/50 backdrop-blur-sm border-slate-800`}>
        <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-lg bg-${color}-500/10`}>
                <Icon className={`text-${color}-400`} size={24} />
            </div>
            {(title === 'Bot Action' || title === 'Battery State') && (
                <span className={`w-2 h-2 rounded-full bg-${color}-400 animate-pulse`} />
            )}
        </div>
        <div className="text-3xl font-bold text-white mb-1">
            {value}<span className="text-lg text-slate-500 font-normal ml-1">{unit}</span>
        </div>
        <div className="text-xs font-medium text-slate-400 uppercase tracking-widest">{title}</div>
    </div>
);

// Mock Data for Charts (Same as Old App)
const data = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    price: Math.abs(Math.sin(i / 3) * 100) + 50,
    soc: 20 + Math.random() * 60
}));

export default function Dashboard({ soc, currentAction, netMargin, role, setRole }: DashboardProps) {
    const navigate = useNavigate();

    // Color logic from old app
    const getActionColor = (a: string) => {
        if (a === 'CHARGE') return 'text-green-400 border-green-500/50';
        if (a === 'DISCHARGE') return 'text-amber-400 border-amber-500/50';
        return 'text-slate-400 border-slate-500/50';
    };

    return (
        <div className="min-h-screen bg-slate-950 p-6 font-sans text-slate-200">
            <header className="max-w-7xl mx-auto mb-12 flex justify-between items-center bg-slate-900/50 border border-slate-800 rounded-2xl p-4 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/50">
                        JB
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                            JB-Enterprise Victron Pilot
                        </h1>
                        <div className="flex items-center gap-2">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
                            <p className="text-xs text-green-400 font-mono tracking-wide">CERBO GX ONLINE • PORTUGAL (OMIE)</p>
                        </div>
                    </div>
                </div>

                {role === 'GUEST' ? (
                    <button
                        onClick={() => setRole('ADMIN')}
                        className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded text-sm font-medium transition-all text-white"
                    >
                        Unlock Admin
                    </button>
                ) : (
                    <div className="flex items-center gap-4">
                        {/* NEW ADMIN LINK */}
                        <button
                            onClick={() => navigate('/admin')}
                            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-bold shadow-lg shadow-emerald-500/20 transition-all"
                        >
                            <Settings size={16} />
                            OPEN CRM CONSOLE
                        </button>
                        <button onClick={() => setRole('GUEST')} className="text-xs text-slate-500 uppercase font-bold hover:text-white">
                            Lock
                        </button>
                    </div>
                )}
            </header>

            <main className="max-w-7xl mx-auto space-y-8">
                {/* KPI Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <StatCard
                        title="Real-Time Price"
                        value="84" // Mocked
                        unit="€/MWh"
                        icon={TrendingUp}
                        color="blue"
                    />
                    <StatCard
                        title="Battery State"
                        value={soc.toFixed(0)}
                        unit="%"
                        icon={Battery}
                        color={soc < 30 ? 'red' : 'green'}
                    />
                    <StatCard
                        title="Bot Action"
                        value={currentAction}
                        unit=""
                        icon={Activity}
                        color="purple"
                    />
                    <StatCard
                        title="Est. 30-Day Profit"
                        value={netMargin.toFixed(0)}
                        unit="€"
                        icon={Sun}
                        color="yellow"
                    />
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Chart (Live) */}
                    <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
                        <h3 className="text-lg font-semibold mb-6 flex items-center gap-2 text-white">
                            <BarChart3 className="text-blue-400" />
                            Live Market Tracking (24h)
                        </h3>
                        <div className="h-[350px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data}>
                                    <defs>
                                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                    <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} />
                                    <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={(val) => `€${val}`} tickLine={false} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                                        itemStyle={{ color: '#cbd5e1' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="price"
                                        stroke="#3b82f6"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorPrice)"
                                        name="OMIE Price"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Side Panel */}
                    <div className="space-y-6">
                        {/* Bot Controls (Visual Only) */}
                        <div className="bg-blue-600/10 border border-blue-500/30 rounded-2xl p-6">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs uppercase text-blue-300 font-bold tracking-widest">Simulated Time</span>
                                <Zap size={16} className="text-yellow-400 animate-pulse" />
                            </div>
                            <div className="text-4xl font-mono font-bold text-white tracking-tighter">
                                14:32:01
                            </div>
                            <div className="mt-4 flex items-center gap-2">
                                <span className={`text-sm font-bold uppercase px-3 py-1 rounded-full bg-black/30 border border-white/10 ${getActionColor(currentAction)}`}>
                                    {currentAction}
                                </span>
                                <span className="text-xs text-slate-400">Current Strategy Mode</span>
                            </div>
                        </div>

                        {/* Admin Actions */}
                        {role === 'ADMIN' && (
                            <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6">
                                <h3 className="text-sm font-bold text-red-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <Settings size={16} /> Manual Override
                                </h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <button className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 py-3 rounded text-sm font-bold transition-all">
                                        FORCE CHARGE
                                    </button>
                                    <button className="bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 text-orange-400 py-3 rounded text-sm font-bold transition-all">
                                        DUMP TO GRID
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
