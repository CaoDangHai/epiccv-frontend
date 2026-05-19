import React from "react";
import { useAnalysis } from "./useAnalysis";
import { Button } from "../../components/ui/Button";
import type { AnalysisResult } from "./types";
import RoadmapView from "./components/RoadmapView";

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
    isDrawerOpen,
    progressStats,
    selectedPhase,
    handleOpenPhaseDetail,
    handleCloseDrawer,
    handleToggleStepStatus,
    loadingMessage,
    generateProgress
  } = useAnalysis();

  return (
    <div className={`p-8 lg:p-12 h-full ${isDrawerOpen ? "overflow-hidden" : ""}`}>
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
            <div className="overflow-x-auto bg-white rounded-2xl border border-slate-200 shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm font-bold uppercase tracking-wider">
                    <th className="p-4">Report Summary</th>
                    <th className="p-4">CV Name</th>
                    <th className="p-4">Job Description</th>
                    <th className="p-4">Match %</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {reports.map((report: AnalysisResult) => (
                    <tr
                      key={report.id}
                      className="hover:bg-slate-50 transition-colors group cursor-pointer"
                      onClick={() => handleSelectReport(report.id)}
                    >
                      <td className="p-4">
                        <div
                          className="font-bold text-slate-900 line-clamp-1 max-w-[200px]"
                          title={report.overall?.summary}
                        >
                          {report.overall?.summary || "Analysis Overview"}
                        </div>
                      </td>
                      <td className="p-4 text-slate-600 font-medium">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[18px] text-blue-500">
                            description
                          </span>
                          <span className="line-clamp-1 max-w-[150px]" title={report.cvName}>
                            {report.cvName || "CV"}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-slate-600 font-medium">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[18px] text-purple-500">
                            work
                          </span>
                          <span className="line-clamp-1 max-w-[150px]" title={report.jdName}>
                            {report.jdName || "JD"}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-blue-50 text-[var(--color-primary)] font-black text-sm border border-blue-100">
                          {Math.round(report.match_percentage || 0)}%
                        </span>
                      </td>
                      <td className="p-4 text-slate-500 text-sm font-medium">
                        {report.created_at
                          ? new Date(report.created_at).toLocaleDateString()
                          : "Recent"}
                      </td>
                      <td className="p-4">
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectReport(report.id);
                          }}
                          className="!px-4 !py-2 text-sm !bg-white !text-[var(--color-primary)] border border-blue-200 hover:!bg-blue-50 shadow-sm"
                        >
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {reports.length === 0 && (
                <div className="p-16 text-center bg-gray-50 text-gray-400">
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
                  className={`pb-4 relative font-bold text-sm transition-colors flex items-center gap-1 ${activeTab === tab
                    ? "text-[var(--color-primary)]"
                    : "text-slate-500 hover:text-slate-900"
                    }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  {tab !== "overview" &&
                    (!roadmap || !roadmap.steps || roadmap.steps.length === 0) && (
                      <span className="text-[10px]">🔒</span>
                    )}
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
              {/* TAB OVERVIEW */}
              {activeTab === "overview" && analysisData && (
                <div className="flex-1 overflow-y-auto pr-2 pb-8 animate-in fade-in duration-300">
                  <div className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-start gap-4 hover:border-blue-300 transition-colors">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center border border-blue-100 shrink-0">
                          <span className="material-symbols-outlined text-[var(--color-primary)]">
                            description
                          </span>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                            Analyzed CV
                          </h4>
                          <p
                            className="text-slate-900 font-bold truncate max-w-[200px]"
                            title={analysisData?.cvName}
                          >
                            {analysisData?.cvName || "Uploaded CV"}
                          </p>
                          <button
                            onClick={() =>
                              analysisData?.cvUrl && window.open(analysisData.cvUrl, "_blank")
                            }
                            disabled={!analysisData?.cvUrl}
                            className="text-[var(--color-primary)] text-sm font-medium mt-2 hover:underline flex items-center gap-1 opacity-80 hover:opacity-100 disabled:opacity-40 disabled:cursor-not-allowed disabled:no-underline"
                          >
                            <span className="material-symbols-outlined text-[16px]">
                              visibility
                            </span>
                            {analysisData?.cvUrl ? "View CV File" : "No File Attached"}
                          </button>
                        </div>
                      </div>

                      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-start gap-4 hover:border-purple-300 transition-colors">
                        <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center border border-purple-100 shrink-0">
                          <span className="material-symbols-outlined text-purple-600">work</span>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                            Target Job Description
                          </h4>
                          <p
                            className="text-slate-900 font-bold truncate max-w-[200px]"
                            title={analysisData?.jdName}
                          >
                            {analysisData?.jdName || "Job Requirements"}
                          </p>
                          <button
                            onClick={() =>
                              analysisData?.jdUrl && window.open(analysisData.jdUrl, "_blank")
                            }
                            disabled={!analysisData?.jdUrl}
                            className="text-purple-600 text-sm font-medium mt-2 hover:underline flex items-center gap-1 opacity-80 hover:opacity-100 disabled:opacity-40 disabled:cursor-not-allowed disabled:no-underline"
                          >
                            <span className="material-symbols-outlined text-[16px]">
                              visibility
                            </span>
                            {analysisData?.jdUrl ? "View JD File" : "No File Attached"}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                      <h3 className="text-[var(--color-primary)] font-black text-2xl mb-4">
                        Professional Verdict
                      </h3>
                      <p className="text-slate-700 leading-relaxed text-lg italic bg-slate-50 p-6 rounded-xl border border-slate-100">
                        &quot;{analysisData?.overall?.summary}&quot;
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
                                    className={`text-[10px] px-2 py-1 rounded-md font-black uppercase tracking-wider ${gap.importance === "Critical"
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

                    {/* Điều kiện Ẩn Nút Generate Roadmap nếu Roadmap đã được tạo (Có mảng steps) */}
                    {(!roadmap || !roadmap.steps || roadmap.steps.length === 0) && (
                      <div className="flex justify-center pt-6 pb-10">
                        {isGenerating ? (
                          <div className="w-full max-w-md bg-white p-5 rounded-2xl shadow-sm border border-[var(--color-primary)]/30 animate-in zoom-in-95">
                            <div className="flex justify-between items-center mb-3">
                              <span className="text-sm font-bold text-[var(--color-primary)] flex items-center gap-2">
                                <span className="material-symbols-outlined animate-spin text-[18px]">precision_manufacturing</span>
                                {loadingMessage || "Building your Roadmap..."}
                              </span>
                              <span className="text-sm font-black text-[var(--color-primary)]">{generateProgress}%</span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                              <div
                                className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full transition-all duration-300 ease-out"
                                style={{ width: `${generateProgress}%` }}
                              ></div>
                            </div>
                          </div>
                        ) : (
                          <Button className="!px-10 !py-4 shadow-xl hover:shadow-blue-500/30 flex items-center gap-2 font-bold text-lg" onClick={handleGenerateRoadmap}>
                            <span className="material-symbols-outlined">auto_awesome</span> Generate Roadmap
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB PHASES */}
              {activeTab === "phases" && roadmap && (
                <div className="flex-1 overflow-y-auto pr-2 pb-8 animate-in fade-in duration-300">
                  <RoadmapView
                    roadmap={roadmap}
                    isDrawerOpen={isDrawerOpen}
                    selectedPhase={selectedPhase}
                    handleOpenPhaseDetail={handleOpenPhaseDetail}
                    handleCloseDrawer={handleCloseDrawer}
                    handleToggleStepStatus={handleToggleStepStatus}
                  />
                </div>
              )}

              {/* ✅ YÊU CẦU 3: TAB DOCUMENTATION GOM THEO PHASE TUYỆT ĐẸP */}
              {activeTab === "documentation" && roadmap && roadmap.steps?.length > 0 && (
                <div className="flex-1 overflow-y-auto pr-2 pb-8 animate-in fade-in duration-300">
                  <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-2">
                    <span className="material-symbols-outlined text-blue-600">local_library</span>{" "}
                    Master Library
                  </h2>
                  <div className="space-y-8">
                    {roadmap.steps.map((step, sIdx: number) => {
                      if (!step.resources || step.resources.length === 0) return null;
                      return (
                        <div
                          key={sIdx}
                          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden"
                        >
                          {/* Dòng line trang trí bên trái */}
                          <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500"></div>

                          <h3 className="text-lg font-bold text-slate-800 mb-5 flex items-center gap-3 border-b border-slate-100 pb-4">
                            <span className="w-9 h-9 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-sm font-black border border-blue-100">
                              {sIdx + 1}
                            </span>
                            Phase {sIdx + 1}: {step.title}
                          </h3>

                          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {step.resources.map((res, rIdx: number) => (
                              <a
                                key={rIdx}
                                href={res.url}
                                target="_blank"
                                rel="noreferrer"
                                className="bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-blue-400 hover:shadow-md transition-all flex flex-col group"
                              >
                                <div className="flex justify-between items-start mb-3">
                                  <span className="material-symbols-outlined text-blue-500 bg-white p-2 rounded-lg shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                                    {res.resource_type === "Video" ? "play_circle" : "article"}
                                  </span>
                                  <span className="material-symbols-outlined text-slate-300 group-hover:text-blue-500">
                                    open_in_new
                                  </span>
                                </div>
                                <h4 className="font-bold text-slate-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                  {res.title}
                                </h4>
                                <p className="text-xs text-slate-500 mt-auto line-clamp-2 leading-relaxed">
                                  {res.description || "Reference material"}
                                </p>
                              </a>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB STATUS VÀ TÍNH TOÁN % TỐI ƯU */}
              {activeTab === "status" && roadmap && roadmap.steps?.length > 0 && (
                <div className="flex-1 overflow-y-auto pr-2 pb-8 animate-in fade-in duration-300">
                  <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined text-emerald-600">monitoring</span>{" "}
                    Progress Tracking
                  </h2>
                  <div className="space-y-8">
                    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                      <div className="flex justify-between items-end mb-4">
                        <div>
                          <p className="text-slate-500 font-bold uppercase tracking-wider text-xs mb-1">
                            Overall Progress
                          </p>
                          <h3 className="text-3xl font-black text-slate-900">
                            {progressStats.percent}%
                          </h3>
                        </div>
                        <span className="text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-full text-sm">
                          {progressStats.completed} / {progressStats.total} Phases Done
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden">
                        <div
                          className="bg-emerald-500 h-4 rounded-full transition-all duration-1000"
                          style={{ width: `${progressStats.percent}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                      <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-200">
                          <tr>
                            <th className="p-4 font-bold text-slate-500 uppercase text-xs">
                              Phase
                            </th>
                            <th className="p-4 font-bold text-slate-500 uppercase text-xs">
                              Duration
                            </th>
                            <th className="p-4 font-bold text-slate-500 uppercase text-xs">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {roadmap.steps.map((step, idx: number) => (
                            <tr key={idx} className="hover:bg-slate-50 transition-colors">
                              <td className="p-4 font-bold text-slate-900">{step.title}</td>
                              <td className="p-4 text-slate-500">{step.estimated_duration}</td>
                              <td className="p-4">
                                {step.is_completed ? (
                                  <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-md text-xs font-bold flex items-center w-fit gap-1">
                                    <span className="material-symbols-outlined text-[14px]">
                                      check_circle
                                    </span>{" "}
                                    Done
                                  </span>
                                ) : (
                                  <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-md text-xs font-bold flex items-center w-fit gap-1">
                                    <span className="material-symbols-outlined text-[14px]">
                                      pending
                                    </span>{" "}
                                    To Do
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
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
