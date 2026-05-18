import { apiClient } from "../utils/apiClient";
import type { AnalysisResult, Roadmap } from "../features/analysis/types";

export const processCV = async (formData: FormData): Promise<AnalysisResult> => {
  const response = await apiClient.post<AnalysisResult>("/cv/process", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const getAnalysisHistory = async (): Promise<AnalysisResult[]> => {
  const response = await apiClient.get<AnalysisResult[]>("/cv/reports");
  return response.data;
};

export const getAnalysisById = async (id: string): Promise<AnalysisResult> => {
  const response = await apiClient.get<AnalysisResult>(`/cv/analysis/${id}`);
  return response.data;
};

// --- ROADMAP APIs ---
export const getRoadmapFromDb = async (analysisId: string): Promise<Roadmap | null> => {
  const response = await apiClient.get(`/roadmap/${analysisId}`);
  return response.data || null;
};

export const generateRoadmapAI = async (analysisId: string): Promise<Roadmap> => {
  const response = await apiClient.post<Roadmap>(`/roadmap/generate/${analysisId}`);
  return response.data;
};

export const updateStepStatus = async (stepId: string, isCompleted: boolean) => {
  const response = await apiClient.patch(`/roadmap/step/${stepId}/status`, { isCompleted });
  return response.data;
};
