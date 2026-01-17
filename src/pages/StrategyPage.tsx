import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Settings, Sliders } from 'lucide-react';

export default function StrategyPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-surface-1 text-white p-6 font-sans">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => navigate('/')}
                        className="p-2 rounded-full bg-surface-2 hover:bg-surface-3 transition-colors"
                    >
                        <ArrowLeft />
                    </button>
                    <h1 className="text-3xl font-bold">Strategy Config</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Section 1: Scheduler */}
                    <section className="bg-surface-2 p-6 rounded-3xl border border-white/5">
                        <div className="flex items-center gap-2 mb-6">
                            <Settings className="text-m3-secondary" />
                            <h2 className="text-xl font-bold">Smart Schedule</h2>
                        </div>

                        <div className="space-y-4">
                            {/* Mock Blocks */}
                            {['00:00 - 08:00 (Cheap)', '19:00 - 22:00 (Peak)'].map((block, i) => (
                                <div key={i} className="p-4 bg-surface-3 rounded-xl flex justify-between items-center">
                                    <span>{block}</span>
                                    <span className="text-xs font-bold bg-m3-secondary text-surface-1 px-2 py-1 rounded">ACTIVE</span>
                                </div>
                            ))}
                            <button className="w-full py-3 rounded-xl border border-dashed border-slate-600 text-slate-500 hover:border-slate-400 hover:text-slate-300 transition-colors">
                                + Add Time Block
                            </button>
                        </div>
                    </section>

                    {/* Section 2: Parameters */}
                    <section className="bg-surface-2 p-6 rounded-3xl border border-white/5">
                        <div className="flex items-center gap-2 mb-6">
                            <Sliders className="text-m3-secondary" />
                            <h2 className="text-xl font-bold">Thresholds</h2>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="text-sm text-slate-400 mb-2 block">Discharge Price Trigger</label>
                                <div className="flex items-center gap-4">
                                    <input type="range" className="flex-1 accent-m3-secondary" />
                                    <span className="font-mono text-xl">0.15€</span>
                                </div>
                            </div>
                            <div>
                                <label className="text-sm text-slate-400 mb-2 block">Min Battery Reserve</label>
                                <div className="flex items-center gap-4">
                                    <input type="range" className="flex-1 accent-m3-secondary" />
                                    <span className="font-mono text-xl">20%</span>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

            </div>
        </div>
    );
}
