import { apiClient } from "../utils/apiClient";

export interface ProfileData {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  avatarUrl: string;
  role: string;
  provider: string;
}

export interface UpdateProfilePayload {
  fullName: string;
  phone: string;
  location: string;
}

export const getProfile = async (): Promise<ProfileData> => {
  const response = await apiClient.get<ProfileData>("/candidate/profile");
  return response.data;
};

export const updateProfile = async (data: UpdateProfilePayload): Promise<ProfileData> => {
  const response = await apiClient.put<ProfileData>("/candidate/profile", data);
  return response.data;
};

export const changePassword = async (
  data: Record<string, string>
): Promise<{ success: boolean }> => {
  const response = await apiClient.put<{ success: boolean }>("/candidate/password", data);
  return response.data;
};

// --- API UPLOAD AVATAR ---
export const uploadAvatarAPI = async (file: File): Promise<{ avatarUrl: string }> => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await apiClient.post<{ avatarUrl: string }>("/candidate/avatar", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
