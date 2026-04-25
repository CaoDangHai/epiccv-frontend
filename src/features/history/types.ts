export interface SummaryStat {
    id: string;
    title: string;
    value: string | number;
    icon: string;
    iconColorClass: string;
    iconBgClass: string;
}

export interface HistoryRecord {
    id: string;
    date: string;
    role: string;
    department: string;
    companyInitial: string;
    companyName: string;
    matchScore: number;
    matchBgClass: string;
    matchTextClass: string;
}