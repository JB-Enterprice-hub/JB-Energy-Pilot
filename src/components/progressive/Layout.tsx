import { ReactNode } from 'react';
import { cn } from '../../lib/utils';

// Added 'header' prop
interface LayoutProps {
    children: ReactNode;
    className?: string;
    header?: ReactNode;
}

export default function Layout({ children, className, header }: LayoutProps) {
    return (
        <div className={cn(
            "min-h-screen bg-surface-1 text-slate-200 p-4 font-sans",
            "flex flex-col md:justify-center", // Center on desktop, top on mobile
            className
        )}>
            <div className="max-w-md mx-auto w-full md:max-w-4xl relative">
                {/* HEADER SLOT */}
                {header && <div className="mb-4">{header}</div>}

                {/* BENTO GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-auto md:min-h-[600px]">
                    {children}
                </div>
            </div>
        </div>
    );
}
