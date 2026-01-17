import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, ReactNode } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useOnClickOutside } from 'usehooks-ts'; // Note: might need to install or implement this simple hook

interface SmartCardProps {
    id: string;
    title: string;
    subtitle?: string;
    icon?: ReactNode;
    className?: string;
    children: ReactNode;
    detailContent?: ReactNode;
    activeColor?: string;
    onClick?: () => void; // Support direct action
}

export default function SmartCard({
    id,
    title,
    subtitle,
    icon,
    className,
    children,
    detailContent,
    activeColor = "bg-zinc-800",
    onClick
}: SmartCardProps) {
    const [isOpen, setIsOpen] = useState(false);

    // If onClick is provided, use it. Otherwise, toggle expansion (if detailContent exists).
    const handleClick = () => {
        if (onClick) {
            onClick();
        } else if (detailContent) {
            setIsOpen(!isOpen);
        }
    };

    return (
        <>
            {/* 1. COLLAPSED CARD (Visual Placeholder in Grid) */}
            <motion.div
                layoutId={`card-container-${id}`}
                onClick={handleClick}
                className={cn(
                    "relative overflow-hidden rounded-3xl p-6 cursor-pointer hover:bg-zinc-700 transition-colors",
                    "flex flex-col justify-between",
                    activeColor,
                    className
                )}
            >
                <motion.div layoutId={`card-header-${id}`} className="flex justify-between items-start mb-4">
                    <div>
                        <motion.h3 layoutId={`card-title-${id}`} className="text-sm font-bold uppercase tracking-widest text-slate-400">
                            {title}
                        </motion.h3>
                        {subtitle && (
                            <motion.p layoutId={`card-subtitle-${id}`} className="text-xs text-slate-500">
                                {subtitle}
                            </motion.p>
                        )}
                    </div>
                    <motion.div layoutId={`card-icon-${id}`}>
                        {icon}
                    </motion.div>
                </motion.div>

                <motion.div layoutId={`card-content-${id}`} className="flex-1">
                    {children}
                </motion.div>
            </motion.div>

            {/* 2. EXPANDED OVERLAY (The 'Page') */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.6 }}
                            exit={{ opacity: 0 }}
                            onClick={toggleOpen}
                            className="fixed inset-0 bg-black z-40 backdrop-blur-sm"
                        />

                        {/* Expanded Card */}
                        <motion.div
                            layoutId={`card-container-${id}`}
                            className={cn(
                                "fixed inset-4 md:inset-10 z-50 rounded-[2rem] overflow-hidden flex flex-col shadow-2xl",
                                "bg-surface-1 md:max-w-5xl md:mx-auto border border-surface-3"
                            )}
                        >
                            {/* Header / Nav Area */}
                            <div className="p-6 md:p-8 flex justify-between items-center bg-surface-2/50 border-b border-white/5">
                                <div className="flex items-center gap-4">
                                    <motion.div layoutId={`card-icon-${id}`} className="scale-125">
                                        {icon}
                                    </motion.div>
                                    <div>
                                        <motion.h3 layoutId={`card-title-${id}`} className="text-2xl font-bold text-white">
                                            {title}
                                        </motion.h3>
                                        <motion.p layoutId={`card-subtitle-${id}`} className="text-sm text-slate-400">
                                            {subtitle}
                                        </motion.p>
                                    </div>
                                </div>

                                <button
                                    onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                                    className="w-10 h-10 rounded-full bg-surface-3 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                                >
                                    <X />
                                </button>
                            </div>

                            {/* Scrollable Content Area */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar relative"
                            >
                                {detailContent}
                            </motion.div>

                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
