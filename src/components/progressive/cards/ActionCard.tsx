import SmartCard from '../SmartCard';
import { Calendar, Clock, Sliders } from 'lucide-react';

interface ActionCardProps {
    nextActionTime: string;
    nextActionType: string;
    onUpdateStrategy?: (start: string, end: string) => void;
}

export default function ActionCard({ nextActionTime, nextActionType }: ActionCardProps) {
    return (
        <SmartCard
            id="action"
            title="Next Action"
            subtitle="Scheduled Event"
            icon={<Clock className="text-m3-secondary" />}
            activeColor="bg-surface-2 border-l-4 border-m3-secondary"
        >
            {/* SUMMARY CONTENT */}
            <div className="mt-4">
                <div className="text-xl font-bold text-white">{nextActionType}</div>
                <div className="text-2xl text-slate-300 font-light">{nextActionTime}</div>
                <div className="flex items-center gap-1 text-[10px] text-m3-secondary mt-2 bg-m3-secondary/10 w-fit px-2 py-0.5 rounded">
                    <Calendar size={10} />
                    Smart Schedule
                </div>
            </div>
        </SmartCard>
    );
}
