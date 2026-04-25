import { useState, useMemo } from 'react';
import { mockReports } from './mockData';
import type { Report, StepStatus } from './types';

export const useAnalysis = () => {
    const [viewMode, setViewMode] = useState<'list' | 'detail'>('list');
    const [selectedReportId, setSelectedReportId] = useState<number | null>(null);
    const [activeTab, setActiveTab] = useState<string>('roadmap');
    const [selectedPhase, setSelectedPhase] = useState<number>(1);
    const [reports, setReports] = useState<Report[]>(mockReports);

    const selectedReport = useMemo(() =>
        reports.find(r => r.id === selectedReportId),
        [reports, selectedReportId]);

    const handleBack = () => {
        setViewMode('list');
        setSelectedReportId(null);
        setActiveTab('roadmap');
        setSelectedPhase(1);
    };

    const handleSelectReport = (id: number) => {
        setSelectedReportId(id);
        setViewMode('detail');
        setSelectedPhase(1);
        setActiveTab('roadmap');
    };

    const checkPhaseDone = (phaseId: number) => {
        if (!selectedReport?.phases) return false;
        const phase = selectedReport.phases[phaseId];
        return (phase?.steps || []).every(s => s.status === 'Done');
    };

    const isPhaseUnlocked = (phaseId: number) => {
        if (phaseId === 1) return true;
        if (!selectedReport?.phases) return false;
        const phaseIds = Object.keys(selectedReport.phases).map(Number).filter(id => id < phaseId).sort((a, b) => a - b);
        return phaseIds.every(id => checkPhaseDone(id));
    };

    const updateStepStatus = (phaseId: number, stepIndex: number, newStatus: StepStatus) => {
        setReports(prevReports => {
            return prevReports.map(report => {
                if (report.id !== selectedReportId) return report;

                const updatedPhases = { ...report.phases };
                const currentPhase = { ...updatedPhases[phaseId] };
                const newSteps = [...(currentPhase.steps || [])];

                const oldStatus = newSteps[stepIndex].status;
                newSteps[stepIndex].status = newStatus;

                // Reset các step sau nếu thay đổi từ Done -> Not Done
                if (oldStatus === 'Done' && newStatus !== 'Done') {
                    for (let i = stepIndex + 1; i < newSteps.length; i++) {
                        newSteps[i] = { ...newSteps[i], status: 'To Do' };
                    }
                }

                currentPhase.steps = newSteps;
                updatedPhases[phaseId] = currentPhase;

                const phaseDoneNow = newSteps.every(s => s.status === 'Done');
                if (!phaseDoneNow) {
                    const phaseIds = Object.keys(updatedPhases).map(Number).sort((a, b) => a - b);
                    phaseIds.forEach(id => {
                        if (id > phaseId) {
                            const p = { ...updatedPhases[id] };
                            p.steps = (p.steps || []).map(step => ({ ...step, status: 'To Do' }));
                            updatedPhases[id] = p;
                        }
                    });
                }

                return { ...report, phases: updatedPhases };
            });
        });
    };

    const globalProgress = useMemo(() => {
        if (!selectedReport?.phases) return 0;
        const allSteps = Object.values(selectedReport.phases).flatMap(p => p.steps || []);
        if (allSteps.length === 0) return 0;
        const completed = allSteps.filter(s => s.status === 'Done').length;
        return Math.round((completed / allSteps.length) * 100);
    }, [selectedReport]);

    return {
        viewMode,
        reports,
        selectedReport,
        activeTab,
        setActiveTab,
        selectedPhase,
        setSelectedPhase,
        globalProgress,
        handleBack,
        handleSelectReport,
        checkPhaseDone,
        isPhaseUnlocked,
        updateStepStatus
    };
};