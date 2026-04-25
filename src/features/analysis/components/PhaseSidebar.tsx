import React from 'react';
import type { Phase } from '../types';

interface PhaseSidebarProps {
    phases: Record<number, Phase>;
    activePhase: number;
    setActivePhase: (phaseId: number) => void;
    checkPhaseDone: (phaseId: number) => boolean;
    isPhaseUnlocked: (phaseId: number) => boolean;
}

export const PhaseSidebar: React.FC<PhaseSidebarProps> = ({ phases, activePhase, setActivePhase, checkPhaseDone, isPhaseUnlocked }) => {
    return (
        <div className="flex flex-col gap-4">
            {Object.values(phases).map((phase) => {
                const unlocked = isPhaseUnlocked(phase.id);
                const active = activePhase === phase.id;
                const done = checkPhaseDone(phase.id);

                const handleCardClick = () => {
                    if (unlocked) {
                        setActivePhase(phase.id);
                    }
                };

                return (
                    <div
                        key={phase.id}
                        onClick={handleCardClick}
                        // SỬA: Thêm opacity-50, cursor-not-allowed và pointer-events-none khi bị khóa
                        className={`bg-slate-50 rounded-2xl p-6 border transition-all ${!unlocked ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer'} ${active ? 'ring-2 ring-[var(--color-primary)] border-transparent' : 'border-slate-200 hover:border-blue-300'} ${done ? 'bg-emerald-50/50' : ''}`}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <span className={`text-[10px] font-black tracking-widest uppercase ${active ? 'text-[var(--color-primary)]' : 'text-slate-400'}`}>Phase 0{phase.id}</span>
                                {!unlocked && <span className="material-symbols-outlined text-[14px] text-slate-400">lock</span>}
                                {done && <span className="material-symbols-outlined text-[14px] text-emerald-500">check_circle</span>}
                            </div>

                            {/* SỬA: Cập nhật UI Badges (LOCKED, IN PROGRESS, COMPLETED) */}
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${unlocked ? (done ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-800') : 'bg-slate-200 text-slate-500'}`}>
                                {unlocked ? (done ? 'COMPLETED' : 'IN PROGRESS') : 'LOCKED'}
                            </span>
                        </div>

                        <h3 className="font-bold text-lg text-slate-900 mb-2">{phase.title}</h3>
                        <p className="text-sm text-slate-500 mb-6 line-clamp-2">
                            {phase.desc || 'Comprehensive overview of phase goals and required outcomes.'}
                        </p>

                        <div className="flex items-center justify-between">
                            {/* SỬA: Thêm cụm Avatar thành viên tham gia */}
                            <div className="flex -space-x-2">
                                <img className="w-6 h-6 rounded-full border-2 border-white bg-slate-200" src={`https://ui-avatars.com/api/?name=User+${phase.id}&background=random`} alt="User" />
                                <img className="w-6 h-6 rounded-full border-2 border-white bg-slate-200" src={`https://ui-avatars.com/api/?name=Dev+${phase.id}&background=random`} alt="Dev" />
                                <div className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[8px] font-bold text-slate-500">+{phase.id + 2}</div>
                            </div>

                            {/* SỬA: Estimate Time */}
                            <div className="flex items-center gap-1 text-slate-500 text-xs">
                                <span className="material-symbols-outlined text-sm">schedule</span> {phase.estimate || 'TBD'}
                            </div>
                        </div>
                    </div>
                );
            })}

            {/* SỬA: Khối "Next Step" UI cập nhật mới */}
            <div className="bg-[var(--color-primary)] rounded-2xl p-8 text-white relative overflow-hidden shadow-lg shadow-blue-500/20">
                <div className="relative z-10">
                    <h4 className="font-bold text-xl mb-4">Next Step?</h4>
                    <p className="text-white/80 text-sm mb-6 leading-relaxed">
                        {activePhase === Object.keys(phases).length ? "You've reached the final phase! Review your reports for interview prep." : `Progress is looking great. Move to Phase 0${activePhase + 1} once you're ready.`}
                    </p>
                    {activePhase < Object.keys(phases).length && isPhaseUnlocked(activePhase + 1) ? (
                        <button
                            onClick={() => setActivePhase(activePhase + 1)}
                            className="bg-white text-[var(--color-primary)] px-6 py-2 rounded-full font-bold text-xs hover:scale-105 active:scale-95 transition-all shadow-md"
                        >
                            Next Phase
                        </button>
                    ) : (
                        <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full font-bold text-xs cursor-default">
                            {activePhase === Object.keys(phases).length ? "Roadmap Complete" : "Complete Current Phase"}
                        </button>
                    )}
                </div>
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            </div>
        </div>
    );
};