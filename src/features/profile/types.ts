export interface PersonalInfo {
    name: string;
    role: string;
    email: string;
    phone: string;
    location: string;
    avatarUrl: string;
}

export interface Experience {
    id: string;
    period: string;
    title: string;
    company: string;
    description: string;
    isCurrent: boolean; // Dùng để xác định màu sắc (primary vs xám) trên timeline
}

export interface Resume {
    id: string;
    name: string;
    modified: string;
    size: string;
    iconColorClass: string;
    hoverColorClass: string;
}