import { DEFAULT_RISK_SCHEDULE } from '../config/constants';

const EnergyWeather = () => {
    // Convert time string "HH:MM" to % position (0-100)
    const timeToPercent = (time: string) => {
        const [h, m] = time.split(':').map(Number);
        return ((h * 60 + m) / (24 * 60)) * 100;
    };

    // Get current time marker position
    const now = new Date();
    const currentPercent = ((now.getHours() * 60 + now.getMinutes()) / (24 * 60)) * 100;

    return (
        <div className="w-full h-full flex flex-col justify-between py-2">
            <div className="flex justify-between items-end px-2 mb-2">
                <h3 className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">24h Energy Forecast</h3>
                <span className="text-[9px] text-slate-500">Next Peak: 18:00</span>
            </div>

            {/* Timeline Bar */}
            <div className="relative h-8 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700 mx-1">

                {/* Render Risk Blocks */}
                {DEFAULT_RISK_SCHEDULE.map((block, i) => {
                    const left = timeToPercent(block.start);
                    const width = timeToPercent(block.end) - left;

                    let colorClass = 'bg-amber-500/20'; // Default
                    if (block.factor < 1) colorClass = 'bg-emerald-500/50'; // Green
                    if (block.factor > 1) colorClass = 'bg-red-500/50'; // Red

                    return (
                        <div
                            key={i}
                            className={`absolute top-0 bottom-0 ${colorClass} border-r border-slate-900/10 last:border-0`}
                            style={{ left: `${left}%`, width: `${width}%` }}
                            title={`${block.start} - ${block.end}: ${block.factor}x`}
                        ></div>
                    );
                })}

                {/* Current Time Indicator */}
                <div
                    className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_white] z-10"
                    style={{ left: `${currentPercent}%` }}
                ></div>
            </div>

            {/* Legend / Labels */}
            <div className="flex justify-between px-1 mt-1 text-[8px] text-slate-500 font-mono">
                <span>00:00</span>
                <span>06:00</span>
                <span>12:00</span>
                <span>18:00</span>
                <span>23:59</span>
            </div>
        </div>
    );
};

export default EnergyWeather;
