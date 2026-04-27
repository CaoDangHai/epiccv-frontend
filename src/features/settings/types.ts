export type SettingsTab = 'account' | 'notifications' | 'appearance' | 'help';
export type SupportDetailType = 'faq' | 'contact' | 'terms' | null;

export interface SupportItem {
    title: string;
    icon: string;
    color: string;
}