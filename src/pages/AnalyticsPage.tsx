import { useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Download } from 'lucide-react';
import ArbitrageChart from '../components/ArbitrageChart';

export default function AnalyticsPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-surface-1 text-white p-6 font-sans">
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/')}
                            className="p-2 rounded-full bg-surface-2 hover:bg-surface-3 transition-colors"
                        >
                            <ArrowLeft />
                        </button>
                        <h1 className="text-3xl font-bold">Performance Analytics</h1>
                    </div>
                    <button className="flex items-center gap-2 bg-surface-2 px-4 py-2 rounded-full hover:bg-surface-3 transition-colors">
                        <Download size={16} />
                        <span className="text-sm font-bold">Export CSV</span>
                    </button>
                </div>

                {/* Main Chart Section */}
                <section className="bg-surface-2 p-6 rounded-3xl border border-white/5 mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <TrendingUp className="text-m3-tertiary" />
                            Profit History
                        </h2>
                        <div className="flex gap-2">
                            {['1D', '1W', '1M', 'YTD'].map(p => (
                                <button key={p} className={`px-3 py-1 rounded-full text-xs font-bold ${p === '1W' ? 'bg-m3-tertiary text-surface-1' : 'bg-surface-3 text-slate-400'}`}>
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="h-[400px] w-full">
                        <ArbitrageChart />
                    </div>
                </section>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: 'Total Revenue', val: '1,540€', change: '+12%' },
                        { label: 'Energy Traded', val: '4.2 MWh', change: '+8%' },
                        { label: 'Avg. Margin', val: '0.12€', change: '-2%' },
                        { label: 'Cycles', val: '245', change: '+5%' },
                    ].map((stat, i) => (
                        <div key={i} className="bg-surface-2 p-4 rounded-2xl border border-white/5">
                            <p className="text-xs text-slate-500 uppercase tracking-wider">{stat.label}</p>
                            <div className="flex items-end justify-between mt-2">
                                <span className="text-2xl font-bold">{stat.val}</span>
                                <span className={`text-xs font-bold ${stat.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>{stat.change}</span>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
