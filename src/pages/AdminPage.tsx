import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/progressive/Layout';
import Header from '../components/progressive/Header';
import { MOCK_CUSTOMERS, type Customer } from '../data/crmData';
import { ArrowLeft, Users, TrendingUp, AlertTriangle } from 'lucide-react';

export default function AdminPage() {
    const navigate = useNavigate();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [customers, setCustomers] = useState<Customer[]>(MOCK_CUSTOMERS);

    // Quick Aggregates
    const totalProfit = customers.reduce((acc, c) => acc + (c.revenue - c.costOfEnergy), 0);
    const totalVol = customers.reduce((acc, c) => acc + c.totalConsumptionKwh, 0);

    return (
        <Layout>
            <div className="md:col-span-3 space-y-6">
                {/* Header / Nav */}
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/')} className="p-2 bg-surface-2 rounded-full hover:bg-surface-3 transition-colors">
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h2 className="text-2xl font-bold text-white">Admin Console</h2>
                        <p className="text-slate-500 text-sm">Customer Relationship & Fleet Management</p>
                    </div>
                </div>

                {/* KPI Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-surface-2 p-4 rounded-2xl border border-white/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10"><TrendingUp size={60} /></div>
                        <div className="text-slate-400 text-xs uppercase font-bold tracking-widest">Net Fleet Profit</div>
                        <div className="text-2xl font-mono text-emerald-400 mt-1">€{totalProfit.toFixed(2)}</div>
                        <div className="text-[10px] text-slate-500">Real-time Margin</div>
                    </div>

                    <div className="bg-surface-2 p-4 rounded-2xl border border-white/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10"><Users size={60} /></div>
                        <div className="text-slate-400 text-xs uppercase font-bold tracking-widest">Active Users</div>
                        <div className="text-2xl font-mono text-white mt-1">{customers.length}</div>
                        <div className="text-[10px] text-emerald-500">All Systems Online</div>
                    </div>

                    <div className="bg-surface-2 p-4 rounded-2xl border border-white/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10"><AlertTriangle size={60} /></div>
                        <div className="text-slate-400 text-xs uppercase font-bold tracking-widest">Total Volume</div>
                        <div className="text-2xl font-mono text-blue-400 mt-1">{(totalVol / 1000).toFixed(1)} MWh</div>
                        <div className="text-[10px] text-slate-500">Lifetime Throughput</div>
                    </div>
                </div>

                {/* CRM Table */}
                <div className="bg-surface-2 rounded-2xl border border-white/5 overflow-hidden">
                    <div className="p-6 border-b border-white/5">
                        <h3 className="text-lg font-bold text-white">Customer Directory</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-slate-400">
                            <thead className="bg-surface-3/50 text-xs uppercase font-bold text-slate-500">
                                <tr>
                                    <th className="p-4">Customer</th>
                                    <th className="p-4">Plan</th>
                                    <th className="p-4 text-right">Wallet</th>
                                    <th className="p-4 text-right hidden md:table-cell">Cons. (kWh)</th>
                                    <th className="p-4 text-right">Net Margin</th>
                                    <th className="p-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {customers.map(c => {
                                    const margin = c.revenue - c.costOfEnergy;
                                    return (
                                        <tr key={c.id} className="hover:bg-surface-3/50 transition-colors cursor-pointer">
                                            <td className="p-4 font-medium text-white">{c.name}</td>
                                            <td className="p-4">
                                                <span className={`text-[10px] px-2 py-1 rounded border ${c.plan === 'SUBSCRIPTION' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-slate-500/10 border-slate-500/20 text-slate-400'}`}>
                                                    {c.plan === 'SUBSCRIPTION' ? 'SUB' : 'STD'}
                                                </span>
                                            </td>
                                            <td className="p-4 text-right font-mono text-white">€{c.walletBalance.toFixed(2)}</td>
                                            <td className="p-4 text-right font-mono hidden md:table-cell">{c.totalConsumptionKwh}</td>
                                            <td className={`p-4 text-right font-mono font-bold ${margin >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                                {margin >= 0 ? '+' : ''}€{margin.toFixed(2)}
                                            </td>
                                            <td className="p-4">
                                                <span className="flex items-center gap-1.5">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>
                                                    <span className="text-xs text-emerald-500">Active</span>
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
