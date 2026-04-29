import { apiClient } from "../utils/apiClient";
import type { AnalysisResult } from "../features/analysis/types";

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
