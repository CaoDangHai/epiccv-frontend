import React from "react";
import type { Roadmap, RoadmapStep } from "../types";

interface Props {
  roadmap: Roadmap;
}

const colorMap: Record<string, string> = {
  primary: "border-blue-400 bg-blue-50",
  success: "border-emerald-400 bg-emerald-50",
  warning: "border-amber-400 bg-amber-50",
  danger: "border-red-400 bg-red-50",
  info: "border-cyan-400 bg-cyan-50",
  purple: "border-purple-400 bg-purple-50",
};

const dotColorMap: Record<string, string> = {
  primary: "bg-blue-500",
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  danger: "bg-red-500",
  info: "bg-cyan-500",
  purple: "bg-purple-500",
};

const StepCard: React.FC<{ step: RoadmapStep; index: number; isLast: boolean }> = ({
  step,
  index,
  isLast,
}) => {
  const color = step.ui_color || "primary";
  const borderBg = colorMap[color] || colorMap.primary;
  const dot = dotColorMap[color] || dotColorMap.primary;

  return (
    <div className="flex gap-4">
      {/* Timeline spine */}
      <div className="flex flex-col items-center">
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0 shadow-md ${dot}`}
        >
          {index + 1}
        </div>
        {!isLast && <div className="w-0.5 flex-1 bg-slate-200 mt-1" />}
      </div>

      {/* Card */}
      <div className={`flex-1 mb-6 rounded-2xl border-2 p-6 ${borderBg}`}>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <h4 className="font-black text-slate-900 text-base">{step.title}</h4>
          <span className="text-xs font-bold bg-white border border-slate-200 text-slate-600 px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
            <span className="material-symbols-outlined text-[14px]">schedule</span>
            {step.estimated_duration}
          </span>
        </div>

        <p className="text-slate-600 text-sm leading-relaxed mb-4">{step.description}</p>

        {/* Key Topics */}
        {step.key_topics?.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-black text-slate-500 uppercase tracking-wider mb-2">
              Key Topics
            </p>
            <div className="flex flex-wrap gap-2">
              {step.key_topics.map((topic, i) => (
                <span
                  key={i}
                  className="bg-white border border-slate-200 text-slate-700 text-xs font-semibold px-3 py-1 rounded-lg shadow-sm"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Skill Gaps addressed */}
        {step.linked_skill_gaps?.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-black text-slate-500 uppercase tracking-wider mb-2">
              Addresses Skill Gaps
            </p>
            <div className="flex flex-wrap gap-2">
              {step.linked_skill_gaps.map((gap, i) => (
                <span
                  key={i}
                  className="bg-amber-100 border border-amber-200 text-amber-800 text-xs font-semibold px-3 py-1 rounded-lg"
                >
                  ⚡ {gap}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Resources */}
        {step.resources?.length > 0 && (
          <div>
            <p className="text-xs font-black text-slate-500 uppercase tracking-wider mb-2">
              Resources
            </p>
            <div className="grid gap-2">
              {step.resources.map((res, i) => (
                <a
                  key={i}
                  href={String(res.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 bg-white rounded-xl p-3 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all group"
                >
                  <span className="material-symbols-outlined text-[20px] text-blue-500 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform">
                    open_in_new
                  </span>
                  <div className="min-w-0">
                    <p className="font-bold text-slate-800 text-sm leading-snug line-clamp-1">
                      {res.title}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                      <span className="bg-slate-100 px-2 py-0.5 rounded-md font-semibold">
                        {res.resource_type}
                      </span>
                      {res.duration && <span>{res.duration}</span>}
                    </p>
                    {res.description && (
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{res.description}</p>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const RoadmapView: React.FC<Props> = ({ roadmap }) => {
  return (
    <div className="animate-in fade-in duration-300">
      {/* Header Summary */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 p-6 mb-8">
        <div className="flex flex-wrap gap-4 items-start justify-between mb-4">
          <div>
            <h3 className="font-black text-slate-900 text-xl mb-1">
              🎯 {roadmap.target_job_title}
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed max-w-2xl">{roadmap.summary}</p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <div className="bg-white rounded-xl px-4 py-2 border border-blue-100 text-center shadow-sm">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                Duration
              </p>
              <p className="font-black text-blue-600 text-sm">{roadmap.estimated_total_time}</p>
            </div>
            <div className="bg-white rounded-xl px-4 py-2 border border-blue-100 text-center shadow-sm">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                Level
              </p>
              <p className="font-black text-indigo-600 text-sm">{roadmap.difficulty}</p>
            </div>
            <div className="bg-white rounded-xl px-4 py-2 border border-blue-100 text-center shadow-sm">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                Steps
              </p>
              <p className="font-black text-slate-800 text-sm">{roadmap.steps.length}</p>
            </div>
          </div>
        </div>

        {roadmap.mentor_advice && (
          <div className="bg-white rounded-xl p-4 border border-amber-200 flex gap-3">
            <span className="text-2xl flex-shrink-0">💡</span>
            <div>
              <p className="font-black text-amber-700 text-xs uppercase tracking-wider mb-1">
                Mentor Advice
              </p>
              <p className="text-slate-700 text-sm leading-relaxed italic">
                "{roadmap.mentor_advice}"
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Steps Timeline */}
      <div className="mb-8">
        <h3 className="font-black text-slate-900 text-lg mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-[var(--color-primary)]">route</span>
          Learning Path
        </h3>
        {roadmap.steps
          .sort((a, b) => a.order - b.order)
          .map((step, idx) => (
            <StepCard
              key={step.id || idx}
              step={step}
              index={idx}
              isLast={idx === roadmap.steps.length - 1}
            />
          ))}
      </div>

      {/* Final Outcomes */}
      {roadmap.final_outcomes?.length > 0 && (
        <div className="bg-emerald-50 rounded-2xl border border-emerald-100 p-6">
          <h3 className="font-black text-emerald-800 text-base mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined">emoji_events</span>
            What You'll Achieve
          </h3>
          <div className="grid md:grid-cols-2 gap-3">
            {roadmap.final_outcomes.map((outcome, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-4 border border-emerald-200 shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-black text-slate-900 text-sm">{outcome.skill_name}</span>
                  <span className="bg-emerald-100 text-emerald-700 text-[10px] font-black px-2 py-0.5 rounded-md uppercase">
                    {outcome.target_level}
                  </span>
                </div>
                <ul className="space-y-1">
                  {outcome.achieved_competencies.map((comp, i) => (
                    <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5">
                      <span className="text-emerald-500 mt-0.5 flex-shrink-0">✓</span>
                      {comp}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoadmapView;
