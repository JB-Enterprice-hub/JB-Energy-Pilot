import SmartCard from '../SmartCard';
import ArbitrageChart from '../../ArbitrageChart'; // Verify import path later
import { TrendingUp, Euro } from 'lucide-react';

interface ProfitCardProps {
    profit: number;
}

export default function ProfitCard({ profit }: ProfitCardProps) {
    return (
        <SmartCard
            id="profit"
            title="Profit"
            subtitle="Today's Earnings"
            icon={<Euro className="text-m3-tertiary" />} // using m3 accent
            activeColor="bg-surface-2 border-l-4 border-m3-tertiary"
        >
            {/* SUMMARY CONTENT */}
            <div className="mt-4">
                <div className="text-4xl font-bold text-white">{profit.toFixed(0)}€</div>
                <div className="text-xs text-m3-tertiary mt-1">+15.40€ This Week</div>
            </div>
        </SmartCard>
    );
}
