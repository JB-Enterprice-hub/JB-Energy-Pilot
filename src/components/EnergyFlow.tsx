import { Zap, Battery, Factory } from 'lucide-react';

interface EnergyFlowProps {
    action: 'IDLE' | 'CHARGE' | 'DISCHARGE';
    soc: number;
}

const EnergyFlow = ({ action, soc }: EnergyFlowProps) => {
    const isCharging = action === 'CHARGE';
    const isDischarging = action === 'DISCHARGE';

    // Config based on state
    const activeColorClass = isCharging ? 'text-emerald-400' : isDischarging ? 'text-amber-400' : 'text-slate-500';
    const activeBgClass = isCharging ? 'bg-emerald-500/20' : isDischarging ? 'bg-amber-500/20' : 'bg-slate-800';
    const activeBorderClass = isCharging ? 'border-emerald-500/50' : isDischarging ? 'border-amber-500/50' : 'border-slate-700';

    return (
        <div className="h-full w-full flex items-center justify-center relative py-2">
            {/* Connection SVG Layer */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                {/* Path: Grid -> Inverter -> Battery */}
                <path d="M 20% 50% L 50% 50% L 80% 50%" stroke="#1e293b" strokeWidth="1.5" fill="none" />
                <path d="M 50% 50% L 50% 80%" stroke="#1e293b" strokeWidth="1.5" fill="none" />

                {/* Animated Flow: Grid -> Battery (Charge) */}
                {isCharging && (
                    <>
                        <circle r="2" fill="#10b981">
                            <animateMotion dur="1.5s" repeatCount="indefinite" path="M 20% 50% L 80% 50%" />
                        </circle>
                    </>
                )}

                {/* Animated Flow: Battery -> Grid (Discharge) */}
                {isDischarging && (
                    <>
                        <circle r="2" fill="#f59e0b">{/* Amber */}
                            <animateMotion dur="1.5s" repeatCount="indefinite" path="M 80% 50% L 20% 50%" />
                        </circle>
                    </>
                )}
            </svg>

            {/* Nodes Grid */}
            <div className="grid grid-cols-3 w-full h-full relative z-10 gap-2">

                {/* GRID (Left) */}
                <div className="flex flex-col items-center justify-center gap-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border bg-slate-900 transition-colors duration-500 
                    ${isCharging || isDischarging ? 'border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.3)]' : 'border-slate-700'}`}>
                        <Factory className="text-blue-400" size={16} />
                    </div>
                    <span className="text-[9px] font-bold text-slate-500 tracking-wider">GRID</span>
                </div>

                {/* INVERTER (Center) */}
                <div className="flex flex-col items-center justify-center gap-1">
                    <div className={`w-14 h-14 rounded-lg flex flex-col items-center justify-center border transition-all duration-300
                    ${activeBgClass} ${activeBorderClass} backdrop-blur-md shadow-lg`}>
                        <Zap className={`${activeColorClass} animate-pulse`} size={20} />
                        <span className={`text-[8px] font-bold mt-0.5 ${activeColorClass}`}>
                            {action}
                        </span>
                    </div>
                </div>

                {/* BATTERY (Right) */}
                <div className="flex flex-col items-center justify-center gap-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border bg-slate-900 transition-colors duration-500 overflow-hidden relative
                    ${soc > 20 ? 'border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.2)]' : 'border-red-500'}`}>

                        {/* Fill Level */}
                        <div
                            className={`absolute bottom-0 left-0 right-0 transition-all duration-1000 ${soc > 20 ? 'bg-emerald-500/20' : 'bg-red-500/20'}`}
                            style={{ height: `${soc}%` }}
                        ></div>

                        <Battery className={`relative z-10 ${soc > 20 ? 'text-emerald-400' : 'text-red-500'}`} size={16} />
                    </div>
                    <span className="text-[9px] font-bold text-slate-500 tracking-wider">BESS {soc.toFixed(0)}%</span>
                </div>

                {/* HOME (Bottom Center - Optional/Future) */}
                {/* Included in SVG logic above, but visualized here for completeness if needed */}
            </div>
        </div>
    );
};

export default EnergyFlow;
