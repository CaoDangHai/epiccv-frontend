import type { HistoryRecord, SummaryStat } from './types';

export const summaryStats: SummaryStat[] = [
    {
        id: 'total_scans',
        title: 'Total Scans',
        value: 128,
        icon: 'analytics',
        iconColorClass: 'text-blue-600',
        iconBgClass: 'bg-blue-50'
    },
    {
        id: 'avg_match',
        title: 'Avg. Match',
        value: '84%',
        icon: 'trending_up',
        iconColorClass: 'text-purple-600',
        iconBgClass: 'bg-purple-50'
    },
    {
        id: 'optimized',
        title: 'Optimized',
        value: 92,
        icon: 'check_circle',
        iconColorClass: 'text-green-600',
        iconBgClass: 'bg-green-50'
    }
];

export const historyRecords: HistoryRecord[] = [
    {
        id: '1',
        date: 'Oct 24, 2023',
        role: 'Senior Product Designer',
        department: 'UI/UX Department',
        companyInitial: 'A',
        companyName: 'Atlassian',
        matchScore: 92,
        matchBgClass: 'bg-primary',
        matchTextClass: 'text-primary'
    },
    {
        id: '2',
        date: 'Oct 22, 2023',
        role: 'Frontend Architect',
        department: 'Engineering',
        companyInitial: 'S',
        companyName: 'Stripe',
        matchScore: 78,
        matchBgClass: 'bg-secondary',
        matchTextClass: 'text-secondary'
    },
    {
        id: '3',
        date: 'Oct 19, 2023',
        role: 'Design Systems Lead',
        department: 'Creative Services',
        companyInitial: 'F',
        companyName: 'Figma',
        matchScore: 89,
        matchBgClass: 'bg-primary', // Dùng primary thay vì hardcode để chuẩn UI
        matchTextClass: 'text-primary'
    },
    {
        id: '4',
        date: 'Oct 15, 2023',
        role: 'Growth Manager',
        department: 'Marketing',
        companyInitial: 'N',
        companyName: 'Notion',
        matchScore: 65,
        matchBgClass: 'bg-tertiary',
        matchTextClass: 'text-tertiary'
    }
];