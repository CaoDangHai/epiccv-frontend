import React from "react";
import { useAnalysis } from "./useAnalysis";
import { Button } from "../../components/ui/Button";
import type { AnalysisResult } from "./types";
import RoadmapView from "./components/RoadmapView";

// import { TaskTimeline } from "./components/TaskTimeline";
// import { PhaseSidebar } from "./components/PhaseSidebar";

const AnalysisView: React.FC = () => {
  const {
    viewMode,
    reports,
    analysisData,
    activeTab,
    setActiveTab,
    handleBack,
    handleSelectReport,
    isLoading,
    roadmap,
    isGenerating,
    handleGenerateRoadmap,
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

          {isLoading ? (
            <div className="text-center text-gray-500 py-10 font-bold animate-pulse">
              Loading reports...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {reports.map((report: AnalysisResult) => (
                <div
                  key={report.id}
                  onClick={() => handleSelectReport(report.id)}
                  className="group bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-[var(--color-primary)] transition-all cursor-pointer flex flex-col h-full relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-bl-full pointer-events-none"></div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-100 group-hover:scale-110 transition-transform shadow-sm">
                      <span className="text-[var(--color-primary)] font-black text-lg">
                        {Math.round(report.match_percentage || 0)}%
                      </span>
                    </div>
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full">
                      {report.created_at
                        ? new Date(report.created_at).toLocaleDateString()
                        : "Recent"}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-[var(--color-primary)] transition-colors line-clamp-2">
                    {report.overall?.summary || "Analysis Overview"}
                  </h3>
                  <p className="text-sm text-slate-500 mb-4 line-clamp-1">Click to view details</p>
                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-center text-[var(--color-primary)] font-bold text-sm">
                    View Details
                    <span className="material-symbols-outlined ml-1 text-[18px] group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </div>
                </div>
              ))}
              {reports.length === 0 && (
                <div className="col-span-full py-20 text-center bg-gray-50 rounded-3xl border border-dashed border-gray-300 text-gray-400">
                  No reports generated yet.
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="animate-in slide-in-from-right-4 duration-300 flex flex-col h-full">
          <header className="mb-6 flex items-center justify-between">
            <div>
              <button
                onClick={handleBack}
                className="flex items-center text-slate-500 hover:text-[var(--color-primary)] transition-colors mb-4 font-medium text-sm group"
              >
                <span className="material-symbols-outlined mr-1 text-[18px] group-hover:-translate-x-1 transition-transform">
                  arrow_back
                </span>
                Back to Reports
              </button>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center border border-blue-100 shadow-sm">
                  <span className="text-[var(--color-primary)] font-black text-xl">
                    {Math.round(analysisData?.match_percentage || 0)}%
                  </span>
                </div>
                <div>
                  <h1 className="text-3xl font-black text-slate-900 mb-1 flex items-center gap-3">
                    Analysis Result
                  </h1>
                  <p className="text-slate-500 text-sm flex items-center gap-2">
                    {analysisData?.created_at
                      ? new Date(analysisData.created_at).toLocaleString()
                      : ""}
                  </p>
                </div>
              </div>
            </div>
          </header>

          <div className="border-b border-slate-200 mb-8">
            <div className="flex gap-8">
              {["overview", "phases", "documentation", "status"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 relative font-bold text-sm transition-colors flex items-center gap-1 ${
                    activeTab === tab
                      ? "text-[var(--color-primary)]"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  {tab !== "overview" && !roadmap && <span className="text-[10px]">🔒</span>}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--color-primary)] rounded-t-full shadow-[0_-2px_8px_rgba(37,99,235,0.3)]"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {isLoading ? (
            <div className="flex-1 text-center text-gray-500 font-bold animate-pulse">
              Loading report details...
            </div>
          ) : (
            <>
              {activeTab === "overview" && analysisData && (
                <div className="flex-1 overflow-y-auto pr-2 pb-8 animate-in fade-in duration-300">
                  <div className="space-y-8">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                      <h3 className="text-[var(--color-primary)] font-black text-2xl mb-4">
                        Professional Verdict
                      </h3>
                      <p className="text-slate-700 leading-relaxed text-lg italic bg-slate-50 p-6 rounded-xl border border-slate-100">
                        "{analysisData?.overall?.summary}"
                      </p>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {analysisData?.overall?.strengths?.map((s, idx) => (
                          <span
                            key={`strength-${idx}`}
                            className="bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-bold border border-emerald-100"
                          >
                            ✓ {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                      <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[var(--color-primary)]">
                          tune
                        </span>
                        Skill Comparison
                      </h3>
                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="text-sm font-black text-emerald-600 mb-4 flex items-center gap-2 uppercase tracking-wider bg-emerald-50 w-fit px-3 py-1 rounded-lg">
                            <span className="material-symbols-outlined text-[18px]">verified</span>
                            Matched Skills
                          </h4>
                          <div className="grid grid-cols-2 gap-3">
                            {analysisData?.matched_skills?.map((skill, idx) => (
                              <div
                                key={`match-${idx}`}
                                className="bg-white border border-emerald-200 p-3 rounded-xl flex flex-col shadow-sm hover:shadow-md transition-shadow"
                              >
                                <span
                                  className="font-bold text-slate-900 text-sm mb-1 line-clamp-1"
                                  title={skill.name}
                                >
                                  {skill.name}
                                </span>
                                <span className="text-xs text-emerald-600 font-bold bg-emerald-50 w-fit px-2 py-0.5 rounded-md">
                                  {skill.cv_level}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-black text-amber-600 mb-4 flex items-center gap-2 uppercase tracking-wider bg-amber-50 w-fit px-3 py-1 rounded-lg">
                            <span className="material-symbols-outlined text-[18px]">warning</span>
                            Critical Gaps
                          </h4>
                          <div className="space-y-3">
                            {analysisData?.missing_skills?.map((gap, idx) => (
                              <div
                                key={`gap-${idx}`}
                                className="p-4 border border-amber-200 bg-white shadow-sm rounded-xl hover:shadow-md transition-shadow relative overflow-hidden"
                              >
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-400"></div>
                                <div className="flex justify-between items-start mb-2 pl-2">
                                  <span className="font-bold text-slate-900">{gap.name}</span>
                                  <span
                                    className={`text-[10px] px-2 py-1 rounded-md font-black uppercase tracking-wider ${
                                      gap.importance === "Critical"
                                        ? "bg-red-100 text-red-700 border border-red-200"
                                        : "bg-amber-100 text-amber-700 border border-amber-200"
                                    }`}
                                  >
                                    {gap.importance}
                                  </span>
                                </div>
                                <p className="text-xs text-slate-600 mt-1 pl-2 leading-relaxed">
                                  {gap.recommendation}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center pt-6 pb-10">
                      <Button
                        className="!px-10 !py-4 shadow-xl hover:shadow-blue-500/30 flex items-center gap-2 font-bold text-lg"
                        onClick={handleGenerateRoadmap}
                        disabled={isGenerating}
                      >
                        {isGenerating ? (
                          <>
                            <span className="material-symbols-outlined animate-spin">
                              progress_activity
                            </span>
                            Generating...
                          </>
                        ) : (
                          <>
                            <span className="material-symbols-outlined">auto_awesome</span>
                            Generate Roadmap
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "phases" && roadmap && (
                <div className="flex-1 overflow-y-auto pr-2 pb-8 animate-in fade-in duration-300">
                  <RoadmapView roadmap={roadmap} />
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AnalysisView;
