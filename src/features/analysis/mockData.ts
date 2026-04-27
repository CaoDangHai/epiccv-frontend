import type { Report } from "./types";

export const mockReports: Report[] = [
  {
    id: 1,
    role: "Senior Product Designer",
    company: "Stellar Systems",
    match: "85%",
    location: "San Francisco, CA",
    phases: {
      1: {
        id: 1,
        title: "UI/UX Fundamentals",
        icon: "architecture",
        estimate: "2 weeks",
        desc: "Master the technical core foundational requirements for this specific role.",
        steps: [
          {
            id: "user-research",
            title: "User Research",
            desc: "Planning and conducting user interviews for key workflows.",
            status: "Done",
          },
          {
            id: "wireframing",
            title: "Wireframing",
            desc: "Low-fidelity layout exploration and interaction planning.",
            status: "Done",
          },
        ],
        resources: [
          {
            title: "Industry Best Practices",
            desc: "Standard architectural patterns",
            icon: "description",
            color: "bg-blue-500",
            tags: ["Research", "UX"],
          },
          {
            title: "Project Roadmap",
            desc: "Step-by-step implementation guide",
            icon: "school",
            color: "bg-teal-500",
            tags: ["Planning", "Guide"],
          },
        ],
      },
      2: {
        id: 2,
        title: "Advanced Prototyping",
        icon: "integration_instructions",
        estimate: "3 weeks",
        desc: "Deep dive into React frameworks and bridging the gap between design and code.",
        steps: [
          {
            id: "figma-vars",
            title: "Figma Variables",
            desc: "Implementing tokens and variables for theme management.",
            status: "In Progress",
          },
          {
            id: "transitions",
            title: "Transitions",
            desc: "Complex prototyping with Smart Animate and logic.",
            status: "To Do",
          },
        ],
        resources: [
          {
            title: "React Framework Docs",
            desc: "Core documentation",
            icon: "library_books",
            color: "bg-blue-500",
            tags: ["Next.js", "Vite"],
          },
          {
            title: "Tailwind Configuration",
            desc: "Styling guide",
            icon: "settings_ethernet",
            color: "bg-teal-500",
            tags: ["Styling", "UI Kit"],
          },
        ],
      },
    },
  },
  {
    id: 2,
    role: "Frontend Architecture",
    company: "TechNova",
    match: "72%",
    location: "Austin, TX (Hybrid)",
    phases: {
      1: {
        id: 1,
        title: "Core Foundations",
        icon: "hub",
        estimate: "3 weeks",
        desc: "Laying the groundwork for scalable frontend infrastructure.",
        steps: [
          {
            id: "design-system",
            title: "Design System",
            desc: "Synchronizing Figma variables with Tailwind theme tokens.",
            status: "Done",
          },
          {
            id: "tokens",
            title: "Tokens",
            desc: "Definition of shared design tokens across platforms.",
            status: "In Progress",
          },
        ],
      },
      2: {
        id: 2,
        title: "Micro-Frontend Setup",
        icon: "speed",
        estimate: "4 weeks",
        desc: "Implementing federated application architecture.",
        steps: [
          {
            id: "module-fed",
            title: "Module Federation",
            desc: "Webpack 5 & Vite configuration for independent apps.",
            status: "To Do",
          },
          {
            id: "shared-shell",
            title: "Shared Shell",
            desc: "Defining module loading patterns and event bus messaging.",
            status: "To Do",
          },
        ],
      },
    },
  },
];

// THÊM: Mảng dữ liệu Mock cho tab Documentation
export const documentationResources = [
  {
    title: "React Framework Docs",
    desc: "Tài liệu cốt lõi về Next.js và Vite cho ứng dụng CSR/SSR",
    icon: "library_books",
    color: "bg-blue-500",
    tags: ["Next.js", "Vite"],
  },
  {
    title: "Tailwind Configuration",
    desc: "Hướng dẫn thiết lập Design System Tokens với Tailwind v4",
    icon: "settings_ethernet",
    color: "bg-teal-500",
    tags: ["Styling", "UI Kit"],
  },
  {
    title: "Advanced TypeScript",
    desc: "Sử dụng Generics và Utility Types trong dự án thực tế",
    icon: "code_blocks",
    color: "bg-indigo-500",
    tags: ["Generics", "Utility Types"],
  },
  {
    title: "Webpack to Vite Migration",
    desc: "Tối ưu hóa tốc độ build và Hot Module Replacement",
    icon: "speed",
    color: "bg-purple-500",
    tags: ["Build Tools", "Performance"],
  },
  {
    title: "State Management",
    desc: "Kinh nghiệm chuyển đổi store từ Redux sang Zustand",
    icon: "account_tree",
    color: "bg-rose-500",
    tags: ["Redux", "Zustand"],
  },
  {
    title: "Frontend System Design",
    desc: "Thiết kế kiến trúc Scalable và Micro-frontends",
    icon: "architecture",
    color: "bg-amber-500",
    tags: ["Architecture", "Scale"],
  },
];

export const mockNotifications = [
  {
    id: 1,
    title: "CV Analysis Complete",
    description: "Your CV has been successfully analyzed. Check your score!",
    time: "2 mins ago",
    unread: true,
  },
  {
    id: 2,
    title: "New Roadmap Available",
    description: "A new learning roadmap for Full-stack Developer is ready.",
    time: "1 hour ago",
    unread: true,
  },
  {
    id: 3,
    title: "System Update",
    description: "EpicCV will undergo maintenance tonight at 12:00 AM.",
    time: "2 days ago",
    unread: false,
  },
];
