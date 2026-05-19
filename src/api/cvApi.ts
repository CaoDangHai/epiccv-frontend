import { apiClient } from "../utils/apiClient";
import type { AnalysisResult, Roadmap } from "../features/analysis/types";

// Trả về jobId thay vì data để chạy SSE
export const processCVStart = async (formData: FormData): Promise<{ jobId: string }> => {
  const response = await apiClient.post<{ jobId: string }>("/cv/process", formData, {
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

// Trả về jobId thay vì data
export const generateRoadmapStart = async (analysisId: string): Promise<{ jobId: string }> => {
  const response = await apiClient.post<{ jobId: string }>(`/roadmap/generate/${analysisId}`);
  return response.data;
};

export const getRoadmapFromDb = async (analysisId: string): Promise<Roadmap | null> => {
  const response = await apiClient.get(`/roadmap/${analysisId}`);
  return response.data || null;
};

export const updateStepStatus = async (stepId: string, isCompleted: boolean) => {
  const response = await apiClient.patch(`/roadmap/step/${stepId}/status`, { isCompleted });
  return response.data;
};