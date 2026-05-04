export type StepStatus = "To Do" | "In Progress" | "Done";

export interface Step {
  id: string;
  title: string;
  desc: string;
  status: StepStatus;
}

export interface Resource {
  title: string;
  desc: string;
  icon: string;
  color?: string;
  tags?: string[];
}

export interface Phase {
  id: number;
  title: string;
  icon: string;
  estimate: string;
  desc: string;
  steps: Step[];
  resources?: Resource[];
}

export interface Report {
  id: number;
  role: string;
  company: string;
  match: string;
  location: string;
  phases: Record<number, Phase>;
}

// --- CÁC TYPE MỚI THÊM VÀO ---
export interface OverallAssessment {
  summary: string;
  strengths: string[];
  weaknesses: string[];
  improvement_notes: string[];
}

export interface SkillMatch {
  name: string;
  cv_level: string;
  jd_level: string;
  match_status: string;
}

export interface SkillGap {
  name: string;
  importance: string;
  recommendation: string;
}

export interface AnalysisResult {
  id: string;
  match_percentage: number;
  overall: OverallAssessment;
  matched_skills: SkillMatch[];
  missing_skills: SkillGap[];
  created_at?: string;
}

// --- ROADMAP TYPES ---
export interface LearningResource {
  title: string;
  url: string;
  resource_type: string;
  duration?: string;
  description?: string;
}

export interface LearningOutcome {
  skill_name: string;
  target_level: string;
  achieved_competencies: string[];
}

export interface RoadmapStep {
  id?: string;
  order: number;
  title: string;
  description: string;
  linked_skill_gaps: string[];
  focus_skills: string[];
  estimated_duration: string;
  key_topics: string[];
  resources: LearningResource[];
  ui_color: string;
  is_completed: boolean;
}

export interface Roadmap {
  id?: string;
  target_job_title: string;
  summary: string;
  difficulty: string;
  estimated_total_time: string;
  steps: RoadmapStep[];
  final_outcomes: LearningOutcome[];
  mentor_advice?: string;
}
