export type StepStatus = 'To Do' | 'In Progress' | 'Done';

export interface Step {
    id: string;
    title: string;
    desc: string;
    status: StepStatus;
}

export interface Resource {
    title: string;
    desc: string;
    icon: string;
    color?: string;
    tags?: string[];
}

export interface Phase {
    id: number;
    title: string;
    icon: string;
    estimate: string;
    desc: string;
    steps: Step[];
    resources?: Resource[];
}

export interface Report {
    id: number;
    role: string;
    company: string;
    match: string;
    location: string;
    phases: Record<number, Phase>;
}