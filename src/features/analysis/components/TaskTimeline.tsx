import React from 'react';
import { StatusDropdown } from './StatusDropdown';
import type { Phase, StepStatus } from '../types';

interface TaskTimelineProps {
    currentPhase?: Phase;
    onStatusChange: (phaseId: number, stepIndex: number, newStatus: StepStatus) => void;
}

export const TaskTimeline: React.FC<TaskTimelineProps> = ({ currentPhase, onStatusChange }) => {
    if (!currentPhase) return null;

    const isStepUnlocked = (index: number) => {
        if (index === 0) return true;
        const precedingSteps = (currentPhase.steps || []).slice(0, index);
        return precedingSteps.every(s => s.status === 'Done');
    };

    const checkPhaseDone = () => {
        return (currentPhase.steps || []).every(s => s.status === 'Done');
    };

    return (
        <div className="animate-in fade-in duration-300 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-8">
                <div className="flex justify-between items-start mb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-[var(--color-primary)]">
                            <span className="material-symbols-outlined text-3xl">{currentPhase.icon || 'architecture'}</span>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900">Phase 0{currentPhase.id}: {currentPhase.title}</h3>
                            <p className="text-slate-500 text-sm">Estimated Completion: {currentPhase.estimate || 'TBD'}</p>
                        </div>
                    </div>
                    <div className={`flex items-center gap-2 ${checkPhaseDone() ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'} px-4 py-2 rounded-full text-xs font-bold`}>
                        <span className="material-symbols-outlined text-sm">{checkPhaseDone() ? 'check_circle' : 'sync'}</span>
                        {checkPhaseDone() ? 'COMPLETED' : 'IN PROGRESS'}
                    </div>
                </div>

                <div className="space-y-8 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
                    {(currentPhase.steps || []).map((step, idx) => {
                        const unlocked = isStepUnlocked(idx);
                        return (
                            <div key={step.id} className={`relative pl-12 transition-all duration-300 ${!unlocked ? 'opacity-50' : 'opacity-100'}`}>
                                <div className={`absolute left-0 w-10 h-10 bg-white border-4 rounded-full flex items-center justify-center z-10 ${unlocked ? (step.status === 'Done' ? 'border-[var(--color-primary)]' : 'border-blue-200') : 'border-slate-100'}`}>
                                    {!unlocked ? (
                                        <span className="material-symbols-outlined text-slate-300 text-lg">lock</span>
                                    ) : step.status === 'Done' ? (
                                        <span className="material-symbols-outlined text-[var(--color-primary)] text-lg">check</span>
                                    ) : (
                                        <div className={`w-2 h-2 ${step.status === 'In Progress' ? 'bg-[var(--color-primary)]' : 'bg-transparent'} rounded-full`}></div>
                                    )}
                                </div>
                                <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 bg-slate-50 rounded-2xl border transition-all ${unlocked ? (step.status === 'In Progress' ? 'border-blue-200 ring-1 ring-blue-100' : 'border-transparent') : 'pointer-events-none'}`}>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-bold text-slate-900">{step.title}</h4>
                                            {!unlocked && <span className="material-symbols-outlined text-[14px] text-slate-400">lock</span>}
                                        </div>
                                        <p className="text-sm text-slate-500">{step.desc}</p>
                                    </div>
                                    <StatusDropdown
                                        initialStatus={step.status}
                                        onStatusChange={(val) => onStatusChange(currentPhase.id, idx, val)}
                                        disabled={!unlocked}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="bg-slate-50 p-8 border-t border-slate-100">
                <h5 className="text-xs font-black tracking-widest text-slate-400 uppercase mb-4">Learning Resources & Documentation</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(currentPhase.resources || []).map((res, i) => (
                        <a key={i} href="#" className="flex items-center gap-4 p-4 bg-white rounded-xl hover:shadow-md hover:bg-slate-50 transition-all group cursor-pointer border border-slate-100 active:scale-[0.98]">
                            <div className={`p-2 bg-blue-50 text-[var(--color-primary)] rounded-lg group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors`}>
                                <span className="material-symbols-outlined">{res.icon}</span>
                            </div>
                            <div>
                                <p className="font-bold text-sm text-slate-900">{res.title}</p>
                                <p className="text-[10px] text-slate-500">{res.desc}</p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};