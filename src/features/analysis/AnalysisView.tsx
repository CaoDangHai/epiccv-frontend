import React from "react";
import { useAnalysis } from "./useAnalysis";
import { TaskTimeline } from "./components/TaskTimeline";
import { PhaseSidebar } from "./components/PhaseSidebar";
import { documentationResources } from "./mockData";
import { Button } from "../../components/ui/Button";

const AnalysisView: React.FC = () => {
  const {
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
    updateStepStatus,
  } = useAnalysis();

  return (
    <div className="p-8 lg:p-12 h-full">
      {viewMode === "list" ? (
        <div className="animate-in fade-in duration-300 max-w-7xl mx-auto">
          <header className="mb-10">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">My Analysis Reports</h1>
            <p className="text-slate-500 text-lg">
              Manage and review your career development roadmaps.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {reports.map((report) => (
              <div
                key={report.id}
                onClick={() => handleSelectReport(report.id)}
                className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all cursor-pointer flex flex-col h-[280px]"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-[var(--color-primary)] group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined">description</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-2xl font-bold text-[var(--color-primary)]">
                      {report.match}
                    </span>
                    <span className="text-[10px] font-bold uppercase text-slate-400">Match</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-[var(--color-primary)] transition-colors">
                  {report.role}
                </h3>
                <p className="text-sm font-medium text-slate-500 mb-4">{report.company}</p>

                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-slate-400 text-xs">
                    <span className="material-symbols-outlined text-sm">location_on</span>
                    <span className="truncate max-w-[120px]">{report.location}</span>
                  </div>
                  <span className="material-symbols-outlined text-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-opacity">
                    arrow_forward
                  </span>
                </div>
              </div>
            ))}

            <div className="bg-slate-50 rounded-2xl p-6 h-[280px] border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-blue-300 hover:bg-slate-100 transition-colors">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-400 group-hover:text-[var(--color-primary)] transition-colors shadow-sm mb-4">
                <span className="material-symbols-outlined">add</span>
              </div>
              <h3 className="font-bold text-slate-900">New Analysis</h3>
              <p className="text-xs text-slate-500 mt-1">Start a new career path</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto">
          <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-8 animate-in slide-in-from-top-4 duration-500">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="text-sm font-medium text-slate-500 hover:text-[var(--color-primary)] cursor-pointer transition-colors"
                  onClick={handleBack}
                >
                  Reports
                </span>
                <span className="text-sm text-slate-300">/</span>
                <span className="text-sm font-medium text-slate-500">{selectedReport?.role}</span>
              </div>
              <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.05em] text-indigo-500 mb-1 block">
                Analysis Report #{selectedReport?.id.toString().padStart(3, "0")}
              </span>
              <h1 className="text-5xl font-bold tracking-tight text-slate-900 mb-4 leading-tight">
                {selectedReport?.role}
              </h1>
              <div className="flex items-center gap-3 text-slate-600">
                <span className="material-symbols-outlined text-[var(--color-primary)]">
                  corporate_fare
                </span>
                <span className="text-lg font-medium">{selectedReport?.company}</span>
                <span className="mx-2 text-slate-300">|</span>
                <span className="material-symbols-outlined text-[var(--color-primary)]">
                  location_on
                </span>
                <span className="text-lg">{selectedReport?.location}</span>
              </div>
            </div>

            {/* Radial Progress */}
            <div className="relative group shrink-0">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative flex items-center justify-center w-40 h-40 rounded-full bg-white shadow-xl">
                <svg className="absolute w-full h-full -rotate-90">
                  <circle
                    className="text-slate-100"
                    cx="80"
                    cy="80"
                    fill="transparent"
                    r="70"
                    stroke="currentColor"
                    strokeWidth="8"
                  ></circle>
                  <circle
                    className="text-[var(--color-primary)] transition-all duration-1000 ease-out"
                    cx="80"
                    cy="80"
                    fill="transparent"
                    r="70"
                    stroke="currentColor"
                    strokeDasharray="440"
                    strokeDashoffset={440 - (440 * globalProgress) / 100}
                    strokeWidth="8"
                    strokeLinecap="round"
                  ></circle>
                </svg>
                <div className="text-center">
                  <span className="block text-4xl font-bold text-slate-900">
                    {globalProgress}
                    <span className="text-xl opacity-50">%</span>
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Overall Match
                  </span>
                </div>
              </div>
            </div>
          </header>

          {/* Navigation Tabs */}
          <div className="flex items-center border-b border-slate-200 mb-8 gap-8 overflow-x-auto whitespace-nowrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {["Roadmap", "Phases", "Documentation", "Status"].map((tab) => {
              const id = tab.toLowerCase();
              const active = activeTab === id;
              return (
                <Button
                  variant="unstyled"
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`pb-4 px-2 text-sm transition-all relative ${active ? "text-[var(--color-primary)] font-bold" : "text-slate-500 hover:text-slate-900"}`}
                >
                  {tab}
                  {active && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--color-primary)] rounded-t-md"></div>
                  )}
                </Button>
              );
            })}
          </div>

          {/* Tab Contents */}
          {activeTab === "roadmap" && (
            <div className="animate-in fade-in duration-300 space-y-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <section className="lg:col-span-8 bg-slate-50 rounded-2xl p-8 shadow-sm">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                        Skill Gap Analysis
                      </h2>
                      <p className="text-slate-500 text-sm mt-1">
                        Comparing your profile against 24 key requirements
                      </p>
                    </div>
                    <span className="material-symbols-outlined text-blue-500 text-3xl">
                      insights
                    </span>
                  </div>
                  <div className="space-y-10">
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--color-primary)] mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">check_circle</span>
                        Matched Skills
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "User Research",
                          "Figma (Advanced)",
                          "Design Systems",
                          "Interaction Design",
                          "Stakeholder Mgmt",
                          "A/B Testing",
                        ].map((skill) => (
                          <span
                            key={skill}
                            className="px-4 py-2 bg-white rounded-full text-sm font-medium text-slate-800 shadow-sm border border-slate-200"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-widest text-red-500 mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">warning</span>
                        Missing / Critical Gaps
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "GraphQL",
                          "Strategic Roadmapping",
                          "Next.js Fundamentals",
                          "Leadership Experience",
                        ].map((skill) => (
                          <span
                            key={skill}
                            className="px-4 py-2 bg-red-50 text-red-600 rounded-full text-sm font-medium border border-red-100"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                <div className="lg:col-span-4 flex flex-col gap-6">
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between h-full shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="material-symbols-outlined text-slate-400">description</span>
                      <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                        Uploaded Resume
                      </span>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-slate-900 break-all">
                        nguyen-van-viet-cv-2026.pdf
                      </div>
                      <p className="text-xs text-slate-500 mt-2">Last updated: 2 days ago</p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <a
                        href="#"
                        className="text-sm font-medium text-[var(--color-primary)] hover:text-blue-700 transition-colors"
                      >
                        View File
                      </a>
                    </div>
                  </div>
                  <div className="bg-indigo-600 text-white rounded-2xl p-6 flex flex-col justify-between h-full shadow-md">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="material-symbols-outlined text-indigo-200">
                        work_outline
                      </span>
                      <span className="text-xs font-bold uppercase tracking-widest text-indigo-100">
                        Target Role
                      </span>
                    </div>
                    <div>
                      <div className="text-lg font-bold">Senior Product Designer</div>
                      <p className="text-xs text-indigo-200 mt-2">
                        Source: LinkedIn / Uploaded text
                      </p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-indigo-500">
                      <a
                        href="#"
                        className="text-sm font-medium hover:text-indigo-200 transition-opacity"
                      >
                        View Job Description
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <section className="bg-white rounded-2xl p-10 border border-slate-200 shadow-sm">
                <div className="mb-12 flex items-end justify-between">
                  <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                      Learning Roadmap
                    </h2>
                    <p className="text-slate-500 mt-2">
                      The fastest path to close your skill gap for this role.
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-slate-400 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-slate-300"></span> To Do
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse"></span>{" "}
                      In Progress
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Done
                    </span>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-slate-200 -translate-x-1/2"></div>
                  <div className="space-y-16">
                    {Object.keys(selectedReport?.phases || {}).map((id, idx) => {
                      const phase = selectedReport?.phases[Number(id)];
                      const done = checkPhaseDone(Number(id));
                      const unlocked = isPhaseUnlocked(Number(id));
                      const isLeft = idx % 2 === 0;
                      const status = done ? "done" : unlocked ? "in-progress" : "todo";

                      const handlePhaseClick = () => {
                        if (!unlocked) return;
                        setSelectedPhase(Number(id));
                        setActiveTab("phases");
                      };

                      return (
                        <div
                          key={id}
                          className={`relative flex flex-col md:flex-row items-center justify-between group ${!unlocked ? "opacity-50 pointer-events-none" : ""}`}
                        >
                          {isLeft ? (
                            <>
                              <div
                                className="w-full md:w-[45%] md:text-right mb-4 md:mb-0"
                                onClick={handlePhaseClick}
                              >
                                <div
                                  className={`p-6 rounded-2xl inline-block text-left w-full md:w-auto max-w-sm transition-all hover:shadow-md ${unlocked ? "cursor-pointer" : "cursor-not-allowed"} ${status === "done" ? "bg-emerald-50/50 border border-emerald-100" : "bg-slate-50 border border-slate-200"}`}
                                >
                                  <div className="flex items-center justify-between mb-2">
                                    <span
                                      className={`text-[10px] font-bold uppercase tracking-widest ${status === "done" ? "text-emerald-600" : "text-slate-400"}`}
                                    >
                                      Phase 0{id}
                                    </span>
                                    <span className="material-symbols-outlined text-lg text-slate-400">
                                      {status === "done"
                                        ? "check_circle"
                                        : unlocked
                                          ? "circle"
                                          : "lock"}
                                    </span>
                                  </div>
                                  <h4
                                    className={`text-lg font-bold text-slate-900 mb-2 ${status === "done" ? "line-through opacity-70" : ""}`}
                                  >
                                    {phase?.title}
                                  </h4>
                                  <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
                                    {phase?.desc ||
                                      "Complete the fundamental steps for this milestone."}
                                  </p>
                                </div>
                              </div>
                              <div
                                className={`absolute left-4 md:left-1/2 w-8 h-8 ${status === "done" ? "bg-emerald-500" : status === "in-progress" ? "bg-[var(--color-primary)] animate-pulse" : "bg-slate-200"} rounded-full border-4 border-white -translate-x-1/2 flex items-center justify-center text-white shadow-lg z-10`}
                              >
                                <span className="material-symbols-outlined text-xs">
                                  {status === "done"
                                    ? "check"
                                    : status === "in-progress"
                                      ? "pending"
                                      : "lock"}
                                </span>
                              </div>
                              <div className="hidden md:block w-[45%]"></div>
                            </>
                          ) : (
                            <>
                              <div className="hidden md:block w-[45%]"></div>
                              <div
                                className={`absolute left-4 md:left-1/2 w-8 h-8 ${status === "done" ? "bg-emerald-500" : status === "in-progress" ? "bg-[var(--color-primary)] animate-pulse" : "bg-slate-200"} rounded-full border-4 border-white -translate-x-1/2 flex items-center justify-center text-white shadow-lg z-10`}
                              >
                                <span className="material-symbols-outlined text-xs">
                                  {status === "done"
                                    ? "check"
                                    : status === "in-progress"
                                      ? "pending"
                                      : "lock"}
                                </span>
                              </div>
                              <div
                                className="w-full md:w-[45%] pl-12 md:pl-0 mb-4 md:mb-0"
                                onClick={handlePhaseClick}
                              >
                                <div
                                  className={`p-6 rounded-2xl inline-block max-w-sm transition-all hover:shadow-lg ${unlocked ? "cursor-pointer" : "cursor-not-allowed"} ${status === "in-progress" ? "bg-white border-2 border-[var(--color-primary)]/20 ring-4 ring-[var(--color-primary)]/5" : "bg-slate-50 border border-slate-200"}`}
                                >
                                  <div className="flex items-center justify-between mb-2">
                                    <span
                                      className={`text-[10px] font-bold uppercase tracking-widest ${status === "in-progress" ? "text-[var(--color-primary)]" : "text-slate-400"}`}
                                    >
                                      Phase 0{id}
                                    </span>
                                    {status === "in-progress" && (
                                      <span className="flex h-2 w-2 rounded-full bg-[var(--color-primary)] animate-ping"></span>
                                    )}
                                    {!unlocked && (
                                      <span className="material-symbols-outlined text-lg text-slate-400">
                                        lock
                                      </span>
                                    )}
                                  </div>
                                  <h4 className="text-lg font-bold text-slate-900 mb-2">
                                    {phase?.title}
                                  </h4>
                                  <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
                                    {phase?.desc ||
                                      "Complete the fundamental steps for this milestone."}
                                  </p>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>

              {/* --- KHỐI BỔ SUNG: Company Culture & Export --- */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-slate-900 rounded-2xl overflow-hidden relative group h-48">
                  <img
                    className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                    alt="Company Culture"
                  />
                  <div className="p-6 absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent flex flex-col justify-end">
                    <h4 className="text-xl font-bold text-white mb-1">Company Culture Insight</h4>
                    <p className="text-sm text-slate-300">
                      {selectedReport?.company} values high-autonomy and data-driven design
                      decisions.
                    </p>
                  </div>
                </div>
                <div className="bg-slate-50 rounded-2xl p-8 flex items-center justify-between border-2 border-dashed border-slate-300 hover:border-blue-400 hover:bg-slate-100 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-[var(--color-primary)] shadow-sm group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-3xl">picture_as_pdf</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900">Export Full Report</h4>
                      <p className="text-sm text-slate-500">
                        Download PDF with detailed AI feedback
                      </p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-slate-400 group-hover:text-[var(--color-primary)] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </div>
              </div>
              {/* --- KẾT THÚC KHỐI BỔ SUNG --- */}
            </div>
          )}

          {activeTab === "phases" && (
            <div className="animate-in fade-in duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8">
                <TaskTimeline
                  currentPhase={selectedReport?.phases[selectedPhase]}
                  onStatusChange={updateStepStatus}
                />
              </div>

              <div className="lg:col-span-4 sticky top-24">
                <PhaseSidebar
                  phases={selectedReport?.phases || {}}
                  activePhase={selectedPhase}
                  setActivePhase={setSelectedPhase}
                  checkPhaseDone={checkPhaseDone}
                  isPhaseUnlocked={isPhaseUnlocked}
                />
              </div>
            </div>
          )}

          {activeTab === "documentation" && (
            <div className="animate-in fade-in duration-300">
              <div className="mb-10">
                <h2 className="text-3xl font-bold text-slate-900">Technical Resources</h2>
                <p className="text-slate-500 mt-2">
                  Curated documentation to help you clear the technical bar.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {documentationResources.map((doc, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-slate-200 p-8 rounded-2xl hover:shadow-lg hover:-translate-y-1 transition-all group cursor-pointer flex flex-col"
                  >
                    <div
                      className={`w-16 h-16 ${doc.color} rounded-2xl mb-6 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform`}
                    >
                      <span className="material-symbols-outlined text-3xl">{doc.icon}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-slate-900 group-hover:text-[var(--color-primary)] transition-colors">
                      {doc.title}
                    </h3>
                    <p className="text-sm text-slate-500 mb-6 flex-1">{doc.desc}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {doc.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-bold bg-slate-100 border border-slate-200 px-2 py-1 rounded-md text-slate-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center text-[var(--color-primary)] font-bold text-sm gap-2 mt-auto">
                      View Guide{" "}
                      <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                        arrow_outward
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "status" && (
            <div className="animate-in fade-in duration-300">
              <div className="mb-10">
                <h2 className="text-3xl font-bold text-slate-900">Real-time Progress</h2>
                <p className="text-slate-500 mt-2">
                  Track your improvement metrics as you complete roadmap tasks.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-sm border border-slate-200">
                {/* Khối Global Progress */}
                <div className="mb-12">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-4">
                    <div>
                      <span className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-widest">
                        Global Readiness Score
                      </span>
                      <h3 className="text-5xl font-black text-slate-900 mt-2">{globalProgress}%</h3>
                    </div>
                    <div className="text-left md:text-right">
                      <span className="text-sm font-medium text-slate-500">
                        Estimated hire readiness:{" "}
                        <span className="font-bold text-emerald-600">Optimal</span>
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                    <div
                      className="h-full bg-[var(--color-primary)] transition-all duration-1000 ease-out relative"
                      style={{ width: `${globalProgress}%` }}
                    >
                      <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite]"></div>
                    </div>
                  </div>
                </div>

                {/* Khối Grid Các Phase */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {Object.values(selectedReport?.phases || {}).map((p: any) => {
                    const steps = p.steps || [];
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const completedCount = steps.filter((s: any) => s.status === "Done").length;
                    const prog =
                      steps.length > 0 ? Math.round((completedCount / steps.length) * 100) : 0;
                    const isDone = prog === 100;

                    return (
                      <div
                        key={p.id}
                        className="p-6 bg-slate-50 border border-slate-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all cursor-default group"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-slate-600 transition-colors">
                            Phase 0{p.id}
                          </span>
                          <span
                            className={`text-sm font-bold ${isDone ? "text-emerald-600" : "text-slate-900"}`}
                          >
                            {prog}%
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-200 rounded-full mb-4 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-700 ${isDone ? "bg-emerald-500" : "bg-[var(--color-primary)]"}`}
                            style={{ width: `${prog}%` }}
                          ></div>
                        </div>
                        <h4 className="font-bold text-slate-900 text-sm mb-1 line-clamp-1">
                          {p.title}
                        </h4>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-2">
                          {isDone && (
                            <span className="material-symbols-outlined text-[14px] text-emerald-500">
                              check_circle
                            </span>
                          )}
                          {completedCount} of {steps.length} tasks done
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AnalysisView;
