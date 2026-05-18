import { apiClient } from "../utils/apiClient";

// Gửi file PDF/DOC
export const uploadJDFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await apiClient.post("/jd/process", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// Gửi text
export const uploadJDText = async (content: string) => {
  const response = await apiClient.post("/jd/process", { content });
  return response.data;
};
