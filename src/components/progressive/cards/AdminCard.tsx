import { useNavigate } from 'react-router-dom';
import SmartCard from '../SmartCard';
import { Settings } from 'lucide-react';

export default function AdminCard() {
    const navigate = useNavigate();

    return (
        <SmartCard
            id="admin-tools"
            title="Admin"
            subtitle="Control Room"
            icon={<Settings className="text-m3-error" />}
            activeColor="bg-surface-2 border-l-4 border-m3-error"
            onClick={() => navigate('/admin')}
        >
            <div className="mt-4">
                <div className="text-xl font-bold text-white">Console</div>
                <div className="text-xs text-m3-error mt-1 flex items-center gap-1">
                    <div className="w-2 h-2 bg-m3-error rounded-full animate-pulse"></div>
                    System Active
                </div>
            </div>
        </SmartCard>
    );
}
