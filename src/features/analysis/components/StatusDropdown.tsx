import React, { useState, useRef, useEffect } from 'react';
import type { StepStatus } from '../types';

interface StatusDropdownProps {
    initialStatus: StepStatus;
    onStatusChange: (status: StepStatus) => void;
    disabled?: boolean;
}

export const StatusDropdown: React.FC<StatusDropdownProps> = ({ initialStatus, onStatusChange, disabled }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const statuses: { id: StepStatus; label: string; color: string; dot: string }[] = [
        { id: 'To Do', label: 'To Do', color: 'text-slate-500 hover:bg-slate-50', dot: 'bg-slate-300' },
        { id: 'In Progress', label: 'In Progress', color: 'text-[var(--color-primary)] hover:bg-blue-50', dot: 'bg-[var(--color-primary)]' },
        { id: 'Done', label: 'Done', color: 'text-emerald-600 hover:bg-emerald-50', dot: 'bg-emerald-500' }
    ];

    const activeStyle = statuses.find(s => s.id === initialStatus) || statuses[0];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={`relative ${disabled ? 'pointer-events-none' : ''}`} ref={dropdownRef}>
            <button
                onClick={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeStyle.color} bg-white border border-transparent hover:border-slate-200 ${disabled ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
                <span className={`w-1.5 h-1.5 rounded-full ${activeStyle.dot}`}></span>
                {initialStatus}
                <span className={`material-symbols-outlined text-[16px] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>expand_more</span>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-slate-100 z-[60] overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                    {statuses.map((status) => (
                        <button
                            key={status.id}
                            onClick={() => {
                                onStatusChange(status.id);
                                setIsOpen(false);
                            }}
                            className="w-full text-left px-4 py-3 text-xs font-semibold text-slate-600 hover:bg-slate-50 flex items-center gap-2 transition-colors"
                        >
                            <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`}></span>
                            {status.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};