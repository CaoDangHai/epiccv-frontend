import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { processCV } from "../../api/cvApi";

import type { HomeFormValues, SavedCV, UseHomeViewReturn } from "./types";

export const useHomeView = (): UseHomeViewReturn => {
  const navigate = useNavigate();
  const [credentialsTab, setCredentialsTab] = useState<"upload" | "saved">("upload");
  const [opportunityTab, setOpportunityTab] = useState<"paste" | "upload">("paste");

  const [selectedCv, setSelectedCv] = useState<number | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [cvToDelete, setCvToDelete] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<HomeFormValues>();

  const savedCVs: SavedCV[] = [
    { name: "Frontend_Resume_Oct.pdf", meta: "Last used 2 days ago", color: "blue" },
    { name: "Senior_Dev_CV_v2.pdf", meta: "Uploaded Jan 15", color: "slate" },
    { name: "Product_Manager_2023.docx", meta: "Uploaded Dec 20, 2023", color: "slate" },
  ];

  const toggleSelectCv = (index: number) => {
    setSelectedCv((prev) => (prev === index ? null : index));
  };

  const validateFile = (
    fileList?: FileList,
    maxSizeMB = 5,
    allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]
  ) => {
    if (!fileList || fileList.length === 0) return true;
    const file = fileList[0];
    if (!allowedTypes.includes(file.type)) return "Chỉ chấp nhận file PDF hoặc DOCX";
    if (file.size > maxSizeMB * 1024 * 1024) return `Kích thước file tối đa là ${maxSizeMB}MB`;
    return true;
  };

  const onAnalyze = async (data: HomeFormValues) => {
    const cvFileFromForm = data.cvFile?.[0];
    const jdFileFromForm = data.jdFile?.[0];
    const jdText = data.jdText;

    // Validation
    if (!cvFileFromForm) {
      toast.error("Vui lòng tải lên file CV!");
      return;
    }
    if (opportunityTab === "paste" && !jdText) {
      toast.error("Vui lòng nhập nội dung JD!");
      return;
    }
    if (opportunityTab === "upload" && !jdFileFromForm) {
      toast.error("Vui lòng tải lên file JD!");
      return;
    }

    const toastId = toast.loading("Analyzing your profile and JD...");
    try {
      const formData = new FormData();
      formData.append("file", cvFileFromForm);
      if (opportunityTab === "paste" && jdText) formData.append("jd_text", jdText);
      if (opportunityTab === "upload" && jdFileFromForm) formData.append("jd_file", jdFileFromForm);

      // Gọi 1 API duy nhất
      const analysisResult = await processCV(formData);

      toast.success("Analysis complete!", { id: toastId });
      // Chuyển sang trang Analysis, đính kèm targetReportId
      navigate("/analysis", { state: { targetReportId: analysisResult.id } });
    } catch (error) {
      console.error("Lỗi phân tích:", error);
      toast.error("Failed to analyze CV. Please try again.", { id: toastId });
    }
  };

  const handleDeleteCvClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setCvToDelete(index);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    toast.success("Đã xóa CV khỏi hệ thống");
    setIsDeleteModalOpen(false);
    if (selectedCv === cvToDelete) setSelectedCv(null);
    setCvToDelete(null);
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setCvToDelete(null);
  };

  return {
    register,
    errors,
    handleSubmit,
    watch,
    credentialsTab,
    setCredentialsTab,
    opportunityTab,
    setOpportunityTab,
    selectedCv: selectedCv ?? -1,
    setSelectedCv,
    savedCVs,
    toggleSelectCv,
    validateFile,
    onAnalyze,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    handleDeleteCvClick,
    confirmDelete,
    cancelDelete,
  };
};
