import { ResponsiveContainer, ComposedChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine } from 'recharts';


interface PricePoint {
    time: string;
    price: number;
}

interface ArbitrageChartProps {
    data: PricePoint[];
    buyThreshold: number;
    sellThreshold: number;
    optimalStartTime?: string | null;
}

const ArbitrageChart = ({ data, buyThreshold, sellThreshold, optimalStartTime }: ArbitrageChartProps) => {
    return (
        <div className="w-full h-full min-h-[300px] flex flex-col relative group">
            {/* Header is handled by DashboardCard wrapper now, but we keep the Legend inline */}

            <div className="flex justify-between items-center mb-4">
                <div className="text-xs text-slate-400">
                    OMIE Spot Price (PT)
                </div>
                <div className="flex gap-3 text-[10px] font-mono uppercase tracking-wider">
                    <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                        <span className="text-emerald-400 font-bold">Buy &lt; {buyThreshold}€</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]"></span>
                        <span className="text-amber-400 font-bold">Sell &gt; {sellThreshold}€</span>
                    </div>
                    {optimalStartTime && (
                        <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.5)] animate-pulse"></span>
                            <span className="text-purple-400 font-bold">Smart Charge: {optimalStartTime}</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex-1 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                        <XAxis
                            dataKey="time"
                            stroke="#475569"
                            tick={{ fontSize: 10, fill: '#64748b' }}
                            tickLine={false}
                            axisLine={false}
                            dy={10}
                            interval={4}
                        />
                        <YAxis
                            stroke="#475569"
                            tick={{ fontSize: 10, fill: '#64748b' }}
                            unit="€"
                            tickLine={false}
                            axisLine={false}
                            dx={-5}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#020617', borderColor: '#1e293b', color: '#f8fafc', borderRadius: '8px', zIndex: 50 }}
                            itemStyle={{ color: '#bae6fd', fontSize: '12px' }}
                            cursor={{ stroke: '#334155', strokeWidth: 1, strokeDasharray: '4 4' }}
                        />

                        <Area
                            type="monotone"
                            dataKey="price"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorPrice)"
                            animationDuration={1000}
                        />

                        <ReferenceLine
                            y={buyThreshold}
                            stroke="#10b981"
                            strokeDasharray="3 3"
                            strokeWidth={1}
                            label={{ position: 'insideTopRight', value: 'BUY', fill: '#10b981', fontSize: 9, fontWeight: 'bold' }}
                        />

                        <ReferenceLine
                            y={sellThreshold}
                            stroke="#f59e0b"
                            strokeDasharray="3 3"
                            strokeWidth={1}
                            label={{ position: 'insideBottomRight', value: 'SELL', fill: '#f59e0b', fontSize: 9, fontWeight: 'bold' }}
                        />

                        {optimalStartTime && (
                            <ReferenceLine
                                x={optimalStartTime}
                                stroke="#c084fc"
                                strokeDasharray="3 3"
                                strokeWidth={2}
                                label={{ position: 'insideTop', value: 'START', fill: '#c084fc', fontSize: 9, fontWeight: 'bold' }}
                            />
                        )}
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ArbitrageChart;
