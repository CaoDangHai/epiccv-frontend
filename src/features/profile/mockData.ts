import type { PersonalInfo, Experience, Resume } from './types';

export const personalInfo: PersonalInfo = {
    name: "John Doe",
    role: "Senior Frontend Developer",
    email: "john.doe@epiccv.com",
    phone: "+1 (555) 012-3456",
    location: "San Francisco, CA",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuD1KMAwPKm4PfsBOXrZyb2okZhOfSGiwsHFUQLU29kS4vWeh81smy3_mvB2_Bv781HgD8P1VvMt35O5SDjsl_3Xn0NzY76ZLZ6JkXerF3EP8mQRo3nE5zVsoxi58-w4yfVXocUhCyQhNOWvG_sOvkOFYsDbohsP3Hf4YVGpqhkDMy_VXqdJqjbAHMNKoq37LomuZJ7d2tAe3x8zwF5nJLCAkD-I-P80StxtO3X5xUZj5O0-E_6-plKfZlm0tCbetJSoTTT3-T8VzCCV"
};

export const skills: string[] = [
    "React", "Node.js", "TypeScript", "Tailwind CSS",
    "GraphQL", "AWS", "Next.js", "Figma"
];

export const experiences: Experience[] = [
    {
        id: '1',
        period: 'Jan 2021 — Present',
        title: 'Senior Software Engineer',
        company: 'TechNova Inc.',
        description: 'Leading the architecture of high-performance user interfaces using React and Next.js. Mentoring junior developers and defining front-end best practices across the engineering department.',
        isCurrent: true
    },
    {
        id: '2',
        period: 'Mar 2018 — Dec 2020',
        title: 'Full Stack Developer',
        company: 'CreativeSphere',
        description: 'Developed complex e-commerce platforms with Node.js and Shopify. Optimized performance by 40% through lazy loading and advanced caching strategies.',
        isCurrent: false
    }
];

export const resumes: Resume[] = [
    {
        id: '1',
        name: 'Main_CV_2024.pdf',
        modified: 'Modified 2 days ago',
        size: '1.2MB',
        iconColorClass: 'text-primary',
        hoverColorClass: 'group-hover:text-primary'
    },
    {
        id: '2',
        name: 'Tech_Lead_Role.docx',
        modified: 'Modified 1 month ago',
        size: '840KB',
        iconColorClass: 'text-secondary',
        hoverColorClass: 'group-hover:text-secondary'
    },
    {
        id: '3',
        name: 'Portfolio_Summary.pdf',
        modified: 'Modified 3 months ago',
        size: '4.5MB',
        iconColorClass: 'text-tertiary',
        hoverColorClass: 'group-hover:text-tertiary'
    }
];