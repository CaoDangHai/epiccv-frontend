// import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";
import type { Roadmap } from "../types";

interface RoadmapViewProps {
  roadmap: Roadmap;
  isDrawerOpen: boolean;
  selectedPhase: Roadmap["steps"][0] | null;
  handleOpenPhaseDetail: (p: Roadmap["steps"][0]) => void;
  handleCloseDrawer: () => void;
  handleToggleStepStatus: (id: string, s: boolean) => Promise<void>;
}

const RoadmapView: React.FC<RoadmapViewProps> = ({
  roadmap,
  isDrawerOpen,
  selectedPhase,
  handleOpenPhaseDetail,
  handleCloseDrawer,
  handleToggleStepStatus,
}) => {
  const onToggleStatusWithConfirm = (stepId: string, currentStatus: boolean) => {
    if (!currentStatus) {
      toast.custom(
        (t) => (
          <div
            className={`${t.visible ? "animate-in zoom-in-95" : "animate-out zoom-out-95"} max-w-md w-full bg-white shadow-[0_20px_50px_rgba(0,0,0,0.2)] rounded-3xl pointer-events-auto flex flex-col border border-slate-100 overflow-hidden`}
          >
            <div className="p-7">
              <div className="flex items-start gap-5 mb-2">
                <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center shrink-0 border-[3px] border-amber-50">
                  <span className="material-symbols-outlined text-amber-500 text-3xl">help</span>
                </div>
                <div>
                  <p className="text-xl font-black text-slate-900 mb-1">Xác nhận hoàn thành?</p>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">
                    Bạn sắp đánh dấu Phase này là đã hoàn thành. Khối lộ trình sẽ được làm mờ để bạn
                    tập trung vào các bước tiếp theo.
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-7 border-t border-slate-100 pt-5">
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  onClick={() => {
                    toast.dismiss(t.id);
                    handleToggleStepStatus(stepId, currentStatus).then(() => {
                      toast.success("Tuyệt vời! Chúc mừng bạn đã hoàn thành Phase này!", {
                        icon: "🎉",
                        style: {
                          borderRadius: "16px",
                          padding: "16px",
                          fontWeight: "bold",
                          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                        },
                      });
                    });
                  }}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-emerald-500 hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/30 flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                  Đồng ý
                </button>
              </div>
            </div>
          </div>
        ),
        { duration: Infinity, position: "top-center" }
      ); // Infinity để bắt buộc người dùng thao tác
    } else {
      // Hủy Undo (từ Done sang To Do)
      handleToggleStepStatus(stepId, currentStatus).then(() => {
        toast.success("Đã chuyển lại thành To Do", {
          style: { borderRadius: "16px", fontWeight: "bold" },
        });
      });
    }
  };

  const drawerContent = (
    <div
      className={`fixed inset-0 z-[999999] transition-opacity duration-300 ${isDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={handleCloseDrawer}
      ></div>
      <div
        className={`absolute right-0 top-0 h-full w-full max-w-2xl bg-slate-50 shadow-2xl transition-transform duration-300 transform ${isDrawerOpen ? "translate-x-0" : "translate-x-full"} flex flex-col`}
      >
        {selectedPhase && (
          <>
            <header className="p-6 bg-white border-b border-slate-200 flex justify-between items-center shrink-0">
              <div>
                <span className="text-blue-600 font-black text-xs uppercase tracking-widest">
                  Phase Detail
                </span>
                <h2 className="text-2xl font-black text-slate-900">{selectedPhase.title}</h2>
              </div>
              <button
                onClick={handleCloseDrawer}
                className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </header>

            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center justify-between shadow-sm">
                <div>
                  <h4 className="text-sm font-black text-slate-500 uppercase">Phase Status</h4>
                  <p className="text-slate-900 font-medium">Have you completed this phase?</p>
                </div>
                <button
                  onClick={() =>
                    onToggleStatusWithConfirm(selectedPhase.id!, selectedPhase.is_completed)
                  }
                  className={`px-6 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ${selectedPhase.is_completed ? "bg-emerald-100 text-emerald-700 border border-emerald-300 hover:bg-emerald-200" : "bg-slate-900 text-white hover:bg-blue-600"}`}
                >
                  {selectedPhase.is_completed ? (
                    <>
                      <span className="material-symbols-outlined text-[18px]">verified</span>{" "}
                      Completed
                    </>
                  ) : (
                    "Mark as Done"
                  )}
                </button>
              </div>

              <section>
                <h4 className="text-sm font-black text-slate-400 uppercase mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">info</span> Overview
                </h4>
                <p className="text-slate-700 leading-relaxed bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  {selectedPhase.description}
                </p>
              </section>

              <section>
                <h4 className="text-sm font-black text-slate-400 uppercase mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">auto_stories</span> Learning
                  Resources
                </h4>
                <div className="grid gap-4">
                  {selectedPhase.resources?.map((res, rIdx: number) => (
                    <a
                      key={rIdx}
                      href={res.url}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all group flex items-center gap-4"
                    >
                      <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 shrink-0 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <span className="material-symbols-outlined">
                          {res.resource_type === "Video" ? "play_circle" : "article"}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h5 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {res.title}
                        </h5>
                        <p className="text-xs text-slate-500">
                          {res.description || "Access high-quality learning content"}
                        </p>
                      </div>
                      <span className="material-symbols-outlined text-slate-300 group-hover:text-blue-500 transition-colors">
                        open_in_new
                      </span>
                    </a>
                  ))}
                </div>
              </section>

              {selectedPhase.key_topics?.length > 0 && (
                <section>
                  <h4 className="text-sm font-black text-slate-400 uppercase mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">checklist</span> Key Topics
                    to Master
                  </h4>
                  <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 shadow-sm">
                    {selectedPhase.key_topics.map((topic: string, tIdx: number) => (
                      <div
                        key={tIdx}
                        className="p-4 flex items-center gap-3 hover:bg-slate-50 transition-colors"
                      >
                        <span className="material-symbols-outlined text-emerald-500 text-[20px]">
                          check_circle
                        </span>
                        <span className="text-slate-700 font-medium">{topic}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="relative pb-10">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-10 mb-12 text-white shadow-xl">
        <h2 className="text-4xl font-black mb-3">{roadmap.target_job_title}</h2>
        <p className="text-blue-100 text-lg mb-8 max-w-3xl leading-relaxed">{roadmap.summary}</p>
        <div className="flex flex-wrap gap-4">
          <div className="bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-xl flex items-center gap-2 border border-white/20">
            <span className="material-symbols-outlined text-sm">schedule</span>
            <span className="font-bold">{roadmap.estimated_total_time}</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-xl flex items-center gap-2 border border-white/20">
            <span className="material-symbols-outlined text-sm">trending_up</span>
            <span className="font-bold">{roadmap.difficulty}</span>
          </div>
        </div>
      </div>

      <div className="relative ml-4 md:ml-12 border-l-[3px] border-blue-200/60 pl-10 space-y-12">
        {roadmap.steps.map((step, index) => (
          <div key={index} className="relative group">
            <div
              className={`absolute -left-[58px] top-2 w-9 h-9 rounded-full border-4 shadow-sm group-hover:scale-110 transition-transform z-10 flex items-center justify-center ${step.is_completed ? "bg-emerald-500 border-emerald-100" : "bg-white border-blue-500"}`}
            >
              {step.is_completed ? (
                <span className="material-symbols-outlined text-white text-[18px]">check</span>
              ) : (
                <span className="text-xs font-black text-blue-600">{index + 1}</span>
              )}
            </div>

            <div
              onClick={() => handleOpenPhaseDetail(step)}
              className={`p-6 rounded-2xl border shadow-sm transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between
                ${
                  step.is_completed
                    ? "bg-slate-50 border-slate-200 opacity-50 grayscale hover:opacity-100 hover:grayscale-0"
                    : "bg-white border-slate-200 hover:shadow-lg hover:border-blue-400 hover:-translate-y-1"
                }`}
            >
              <div className="flex justify-between items-start mb-4 gap-4">
                <div>
                  <h3
                    className={`text-xl font-black flex items-center gap-2 transition-colors ${step.is_completed ? "text-slate-600" : "text-slate-900 group-hover:text-blue-600"}`}
                  >
                    {step.title}
                    {step.is_completed && (
                      <span
                        className="material-symbols-outlined text-emerald-500 text-[20px]"
                        title="Completed"
                      >
                        verified
                      </span>
                    )}
                  </h3>
                  <p className="text-slate-500 text-sm mt-2 leading-relaxed line-clamp-2">
                    {step.description}
                  </p>
                </div>
                <span
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 border ${step.is_completed ? "bg-slate-200 text-slate-500 border-slate-300" : "bg-blue-50 text-blue-700 border-blue-100"}`}
                >
                  {step.estimated_duration}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                {step.focus_skills?.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="bg-slate-100 text-slate-600 border border-slate-200 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {createPortal(drawerContent, document.body)}
    </div>
  );
};

export default RoadmapView;
