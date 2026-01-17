import type { ReactNode } from 'react';

interface DashboardCardProps {
    title?: string;
    icon?: ReactNode;
    children: ReactNode;
    className?: string;
    glowColor?: 'blue' | 'green' | 'amber' | 'none';
    headerAction?: ReactNode;
}

const DashboardCard = ({ title, icon, children, className = '', glowColor = 'none', headerAction }: DashboardCardProps) => {
    const glowStyles = {
        blue: 'shadow-[0_0_20px_rgba(59,130,246,0.15)] border-blue-500/30',
        green: 'shadow-[0_0_20px_rgba(16,185,129,0.15)] border-emerald-500/30',
        amber: 'shadow-[0_0_20px_rgba(245,158,11,0.15)] border-amber-500/30',
        none: 'border-slate-800'
    };

    return (
        <div className={`relative bg-slate-900/60 backdrop-blur-xl rounded-2xl border ${glowStyles[glowColor]} p-5 flex flex-col ${className} transition-all duration-300 hover:bg-slate-900/80`}>
            {/* Header */}
            {(title || icon || headerAction) && (
                <div className="flex justify-between items-center mb-4 text-slate-400 border-b border-white/5 pb-2">
                    <div className="flex items-center gap-2">
                        {icon && <span className="text-slate-200">{icon}</span>}
                        {title && <h3 className="text-xs font-bold uppercase tracking-wider">{title}</h3>}
                    </div>
                    {headerAction && <div>{headerAction}</div>}
                </div>
            )}

            {/* Content */}
            <div className="flex-1 min-h-0 relative">
                {children}
            </div>
        </div>
    );
};

export default DashboardCard;
