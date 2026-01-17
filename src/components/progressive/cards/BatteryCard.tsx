import { useNavigate } from 'react-router-dom';
import SmartCard from '../SmartCard';
import { Battery, Zap } from 'lucide-react';

interface BatteryCardProps {
    soc: number;
    status: 'IDLE' | 'CHARGE' | 'DISCHARGE';
}

export default function BatteryCard({ soc, status }: BatteryCardProps) {
    const navigate = useNavigate();

    return (
        <SmartCard
            id="battery"
            title="Battery"
            subtitle="System Status"
            icon={<Battery className="text-emerald-400" />}
            onClick={() => navigate('/analytics')}
            activeColor="bg-surface-2"
        >
            {/* SUMMARY CONTENT */}
            <div className="mt-4">
                <div className="text-4xl font-bold text-white">{soc.toFixed(0)}%</div>
                <div className={`text-xs font-bold mt-1 inline-flex items-center gap-1 ${status === 'CHARGE' ? 'text-emerald-400' :
                    status === 'DISCHARGE' ? 'text-amber-400' : 'text-slate-500'
                    }`}>
                    <Zap size={12} className={status !== 'IDLE' ? 'animate-pulse' : ''} />
                    {status}
                </div>
            </div>
        </SmartCard>
    );
}
