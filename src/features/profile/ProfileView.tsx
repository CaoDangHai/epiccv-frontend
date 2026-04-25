import React from 'react';
import { useProfile } from './useProfile';

const ProfileView: React.FC = () => {
    const {
        personalInfo,
        skills,
        experiences,
        resumes,
        fileInputRef,
        handleBack,
        handleUploadClick,
        handleFileChange
    } = useProfile();

    // Helper nhỏ để luân phiên màu cho Tags (để giống bản HTML gốc)
    const getSkillColorClass = (index: number) => {
        const colors = [
            'bg-primary/10 text-primary',
            'bg-secondary/10 text-secondary',
            'bg-tertiary/10 text-tertiary'
        ];
        return colors[index % colors.length];
    };

    return (
        <main className="pt-12 pb-12 px-6 max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
            {/* Side Profile Column (Editorial Layout) */}
            <aside className="w-full md:w-1/3 flex flex-col gap-6">
                {/* Back Navigation */}
                <div className="mb-6">
                    <button
                        onClick={handleBack}
                        className="flex items-center gap-1 text-sm font-medium text-on-surface-variant hover:text-primary transition-colors group w-fit"
                    >
                        <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
                        Back
                    </button>
                </div>

                {/* Header Card */}
                <div className="bg-surface-container-lowest rounded-3xl p-8 shadow-[0_10px_30px_rgba(11,28,48,0.06)] flex flex-col items-center text-center">
                    <div className="relative mb-6">
                        <div className="absolute inset-0 bg-primary-container blur-2xl opacity-20 rounded-full"></div>
                        <img
                            alt={`${personalInfo.name} avatar`}
                            className="relative w-40 h-40 rounded-full object-cover border-4 border-surface-container-lowest"
                            src={personalInfo.avatarUrl}
                        />
                        <div className="absolute bottom-2 right-2 w-10 h-10 bg-primary rounded-full flex items-center justify-center border-4 border-surface-container-lowest text-white cursor-pointer hover:bg-blue-600 transition-colors">
                            <span className="material-symbols-outlined text-sm">edit</span>
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-on-background">{personalInfo.name}</h1>
                    <p className="text-primary font-semibold mt-1">{personalInfo.role}</p>

                    <div className="mt-8 w-full space-y-4">
                        <button className="w-full py-4 bg-primary-container text-on-primary-container rounded-full font-bold shadow-lg shadow-primary-container/20 flex items-center justify-center gap-2 hover:brightness-105 active:scale-95 transition-all">
                            <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>bolt</span>
                            Upgrade to Premium
                        </button>
                        <button className="w-full py-3 bg-surface-container-low text-primary rounded-full font-semibold hover:bg-surface-container-high transition-colors">
                            View Public Profile
                        </button>
                    </div>
                </div>

                {/* Personal Info Bento */}
                <div className="bg-surface-container-lowest rounded-3xl p-8 shadow-[0_10px_30px_rgba(11,28,48,0.06)]">
                    <h2 className="text-xs font-bold uppercase tracking-[0.05em] text-outline mb-6">Personal Info</h2>
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-primary">mail</span>
                            </div>
                            <div>
                                <p className="text-xs text-outline font-medium">Email</p>
                                <p className="text-sm font-semibold break-all">{personalInfo.email}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-primary">call</span>
                            </div>
                            <div>
                                <p className="text-xs text-outline font-medium">Phone</p>
                                <p className="text-sm font-semibold">{personalInfo.phone}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-primary">location_on</span>
                            </div>
                            <div>
                                <p className="text-xs text-outline font-medium">Location</p>
                                <p className="text-sm font-semibold">{personalInfo.location}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <section className="flex-1 flex flex-col gap-8">

                {/* Skills Section (Tag Cloud) */}
                <div className="bg-surface-container-lowest rounded-3xl p-8 shadow-[0_10px_30px_rgba(11,28,48,0.06)]">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-semibold tracking-tight">My Skills</h2>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {skills.map((skill, idx) => (
                            <span
                                key={idx}
                                className={`px-5 py-2.5 rounded-xl text-sm font-medium ${getSkillColorClass(idx)}`}
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Experience Timeline */}
                <div className="bg-surface-container-lowest rounded-3xl p-8 shadow-[0_10px_30px_rgba(11,28,48,0.06)]">
                    <h2 className="text-2xl font-semibold tracking-tight mb-8">Professional Experience</h2>
                    <div className="relative space-y-10 pl-6 border-l-2 border-outline-variant/20">
                        {experiences.map((exp) => (
                            <div key={exp.id} className="relative">
                                <div className={`absolute -left-[31px] top-0 w-4 h-4 rounded-full ring-4 ring-surface-container-lowest shadow-sm ${exp.isCurrent ? 'bg-primary' : 'bg-outline-variant'}`}></div>
                                <div className="flex flex-col gap-2">
                                    <span className={`text-xs font-bold uppercase tracking-widest ${exp.isCurrent ? 'text-primary' : 'text-outline'}`}>
                                        {exp.period}
                                    </span>
                                    <h3 className="text-lg font-bold">{exp.title} • {exp.company}</h3>
                                    <p className="text-on-surface-variant leading-relaxed">
                                        {exp.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Resume Inventory (Bento Grid Style) */}
                <div className="bg-surface-container-lowest rounded-3xl p-8 shadow-[0_10px_30px_rgba(11,28,48,0.06)]">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-semibold tracking-tight">Resume Inventory</h2>
                        <button
                            className="bg-primary-container text-on-primary-container px-6 py-2 rounded-full text-sm font-bold hover:brightness-105 active:scale-95 transition-all"
                            onClick={handleUploadClick}
                        >
                            Upload New
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {resumes.map((resume) => (
                            <div key={resume.id} className="p-6 bg-surface-container-low rounded-2xl flex items-center justify-between hover:bg-surface-container-high transition-colors cursor-pointer group">
                                <div className="flex items-center gap-4 overflow-hidden">
                                    <div className="w-12 h-12 bg-[#ffffff] rounded-xl flex items-center justify-center shadow-sm shrink-0">
                                        <span className={`material-symbols-outlined text-3xl ${resume.iconColorClass}`}>description</span>
                                    </div>
                                    <div className="truncate">
                                        <p className="font-bold truncate">{resume.name}</p>
                                        <p className="text-xs text-outline">{resume.modified} • {resume.size}</p>
                                    </div>
                                </div>
                                <span className={`material-symbols-outlined text-outline transition-colors ${resume.hoverColorClass}`}>download</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Input file ẩn, được điều khiển thông qua useRef */}
            <input
                ref={fileInputRef}
                accept=".pdf,.doc,.docx"
                className="hidden"
                type="file"
                onChange={handleFileChange}
            />
        </main>
    );
};

export default ProfileView;