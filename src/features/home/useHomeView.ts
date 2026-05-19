import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { processCVStart } from "../../api/cvApi"; 

import type { HomeFormValues, SavedCV, UseHomeViewReturn } from "./types";

export const useHomeView = (): UseHomeViewReturn => {
  const navigate = useNavigate();
  const [credentialsTab, setCredentialsTab] = useState<"upload" | "saved">("upload");
  const [opportunityTab, setOpportunityTab] = useState<"paste" | "upload">("paste");

  const [selectedCv, setSelectedCv] = useState<number | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [cvToDelete, setCvToDelete] = useState<number | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [analyzeProgress, setAnalyzeProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState("");
  
  // State quản lý hiệu ứng vòng quay upload
  const [isUploadingCv, setIsUploadingCv] = useState(false);
  const [isUploadingJd, setIsUploadingJd] = useState(false);
  
  // Ref quản lý Interval của Hybrid Progress
  const progressIntervalRef = useRef<number | null>(null);

  const { register, handleSubmit, formState: { errors }, watch } = useForm<HomeFormValues>();

  const savedCVs: SavedCV[] = [
    { name: "Frontend_Resume_Oct.pdf", meta: "Last used 2 days ago", color: "blue" },
    { name: "Senior_Dev_CV_v2.pdf", meta: "Uploaded Jan 15", color: "slate" },
    { name: "Product_Manager_2023.docx", meta: "Uploaded Dec 20, 2023", color: "slate" },
  ];

  const toggleSelectCv = (index: number) => setSelectedCv((prev) => (prev === index ? null : index));

  const validateFile = (fileList?: FileList, maxSizeMB = 5, allowedTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]) => {
    if (!fileList || fileList.length === 0) return true;
    const file = fileList[0];
    if (!allowedTypes.includes(file.type)) return "Chỉ chấp nhận file PDF hoặc DOCX";
    if (file.size > maxSizeMB * 1024 * 1024) return `Kích thước file tối đa là ${maxSizeMB}MB`;
    return true;
  };

  // Logic hiệu ứng tải file
  const handleFakeUpload = (type: "cv" | "jd") => {
    if (type === "cv") {
      setIsUploadingCv(true);
      setTimeout(() => setIsUploadingCv(false), 800);
    } else {
      setIsUploadingJd(true);
      setTimeout(() => setIsUploadingJd(false), 800);
    }
  };

  const onAnalyze = async (data: HomeFormValues) => {
    const cvFileFromForm = data.cvFile?.[0];
    const jdFileFromForm = data.jdFile?.[0];
    const jdText = data.jdText;

    if (!cvFileFromForm) { toast.error("Vui lòng tải lên file CV!"); return; }
    if (opportunityTab === "paste" && !jdText) { toast.error("Vui lòng nhập nội dung JD!"); return; }
    if (opportunityTab === "upload" && !jdFileFromForm) { toast.error("Vui lòng tải lên file JD!"); return; }

    const toastId = toast.loading("Khởi tạo quá trình phân tích...");
    setIsLoading(true);
    setAnalyzeProgress(0);
    setLoadingMessage("Đang kết nối...");

    try {
      const formData = new FormData();
      formData.append("file", cvFileFromForm);
      if (opportunityTab === "paste" && jdText) formData.append("jd_text", jdText);
      if (opportunityTab === "upload" && jdFileFromForm) formData.append("jd_file", jdFileFromForm);

      const { jobId } = await processCVStart(formData);

      // KHỞI TẠO HYBRID PROGRESS
      let targetProgress = 0;
      let currentProgress = 0;

      // Cứ mỗi 300ms nhích phần trăm một lần để tạo độ mượt
      progressIntervalRef.current = setInterval(() => {
        if (currentProgress < targetProgress) {
          // Bắt kịp Backend nhanh
          currentProgress += 2;
          setAnalyzeProgress(currentProgress > 100 ? 100 : currentProgress);
        } else if (currentProgress < targetProgress + 20 && currentProgress < 95) {
          // Nhích ảo: Vượt lên trước Backend 1 chút nhưng không bao giờ quá xa
          currentProgress += 1;
          setAnalyzeProgress(currentProgress);
        }
      }, 300);

      const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
      const eventSource = new EventSource(`${baseUrl}/cv/progress/${jobId}`);

      eventSource.onmessage = (event) => {
        const payload = JSON.parse(event.data);
        if (payload.error) {
          toast.error(payload.error, { id: toastId });
          eventSource.close();
          if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
          setIsLoading(false);
        } else {
          // Chỉ cập nhật mục tiêu, kệ cho interval tự xử lý UI chạy tới đó
          targetProgress = payload.progress;
          setLoadingMessage(payload.message);

          if (payload.progress === 100) {
            currentProgress = 100;
            setAnalyzeProgress(100);
            toast.success("Phân tích hoàn tất!", { id: toastId });
            eventSource.close();
            if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
            setTimeout(() => {
              navigate("/analysis", { state: { targetReportId: payload.resultId } });
            }, 800);
          }
        }
      };

      eventSource.onerror = () => {
        toast.error("Mất kết nối với máy chủ", { id: toastId });
        eventSource.close();
        if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
        setIsLoading(false);
      };

    } catch (error) {
      toast.error("Không thể bắt đầu phân tích", { id: toastId });
      setIsLoading(false);
    }
  };

  const handleDeleteCvClick = (e: React.MouseEvent, index: number) => { e.stopPropagation(); setCvToDelete(index); setIsDeleteModalOpen(true); };
  const confirmDelete = () => { toast.success("Đã xóa CV khỏi hệ thống"); setIsDeleteModalOpen(false); if (selectedCv === cvToDelete) setSelectedCv(null); setCvToDelete(null); };
  const cancelDelete = () => { setIsDeleteModalOpen(false); setCvToDelete(null); };

  return { register, errors, handleSubmit, watch, credentialsTab, setCredentialsTab, opportunityTab, setOpportunityTab, selectedCv: selectedCv ?? -1, setSelectedCv, savedCVs, toggleSelectCv, validateFile, onAnalyze, isDeleteModalOpen, setIsDeleteModalOpen, handleDeleteCvClick, confirmDelete, cancelDelete, isLoading, analyzeProgress, loadingMessage, isUploadingCv, isUploadingJd, handleFakeUpload };
};