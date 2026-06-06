import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { processCVStart, getSavedCVs, deleteCV } from "../../api/cvApi";
import type { HomeFormValues, SavedCV, UseHomeViewReturn } from "./types";

const SUPPORTED_DOCUMENT_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

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

  const [isUploadingCv, setIsUploadingCv] = useState(false);
  const [isUploadingJd, setIsUploadingJd] = useState(false);
  const [savedCVs, setSavedCVs] = useState<SavedCV[]>([]);

  const progressIntervalRef = useRef<number | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<HomeFormValues>();

  useEffect(() => {
    const fetchCVs = async () => {
      try {
        const cvs = await getSavedCVs();
        setSavedCVs(cvs);
      } catch {
        console.error("Unable to load saved CVs");
      }
    };

    fetchCVs();
  }, []);

  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) window.clearInterval(progressIntervalRef.current);
    };
  }, []);

  const toggleSelectCv = (index: number) =>
    setSelectedCv((prev) => (prev === index ? null : index));

  const validateFile = (
    fileList?: FileList,
    maxSizeMB = 5,
    allowedTypes = SUPPORTED_DOCUMENT_TYPES
  ) => {
    if (!fileList || fileList.length === 0) return true;
    const file = fileList[0];
    if (!allowedTypes.includes(file.type)) return "Only PDF and DOCX files are supported";
    if (file.size > maxSizeMB * 1024 * 1024) return `Maximum file size is ${maxSizeMB}MB`;
    return true;
  };

  const handleFakeUpload = (type: "cv" | "jd") => {
    if (type === "cv") {
      setIsUploadingCv(true);
      window.setTimeout(() => setIsUploadingCv(false), 800);
    } else {
      setIsUploadingJd(true);
      window.setTimeout(() => setIsUploadingJd(false), 800);
    }
  };

  const onAnalyze = async (data: HomeFormValues) => {
    const cvFileFromForm = data.cvFile?.[0];
    const jdFileFromForm = data.jdFile?.[0];
    const jdText = data.jdText?.trim();
    const selectedSavedCv = selectedCv !== null ? savedCVs[selectedCv] : undefined;

    if (credentialsTab === "upload" && !cvFileFromForm) {
      toast.error("Please upload a CV file.");
      return;
    }
    if (credentialsTab === "saved" && !selectedSavedCv?.id) {
      toast.error("Please select a saved CV.");
      return;
    }
    if (opportunityTab === "paste" && !jdText) {
      toast.error("Please enter the job description.");
      return;
    }
    if (opportunityTab === "upload" && !jdFileFromForm) {
      toast.error("Please upload a job description file.");
      return;
    }

    const toastId = toast.loading("Starting analysis...");
    setIsLoading(true);
    setAnalyzeProgress(0);
    setLoadingMessage("Connecting...");

    try {
      const formData = new FormData();
      if (credentialsTab === "upload" && cvFileFromForm) {
        formData.append("file", cvFileFromForm);
      }
      if (credentialsTab === "saved" && selectedSavedCv?.id) {
        formData.append("saved_cv_id", selectedSavedCv.id);
      }
      if (opportunityTab === "paste" && jdText) formData.append("jd_text", jdText);
      if (opportunityTab === "upload" && jdFileFromForm) formData.append("jd_file", jdFileFromForm);

      const { jobId } = await processCVStart(formData);

      let targetProgress = 0;
      let currentProgress = 0;

      progressIntervalRef.current = window.setInterval(() => {
        if (currentProgress < targetProgress) {
          currentProgress += 2;
          setAnalyzeProgress(currentProgress > 100 ? 100 : currentProgress);
        } else if (currentProgress < targetProgress + 20 && currentProgress < 95) {
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
          if (progressIntervalRef.current) window.clearInterval(progressIntervalRef.current);
          setIsLoading(false);
          return;
        }

        targetProgress = payload.progress;
        setLoadingMessage(payload.message);

        if (payload.progress === 100) {
          currentProgress = 100;
          setAnalyzeProgress(100);
          toast.success("Analysis complete!", { id: toastId });
          eventSource.close();
          if (progressIntervalRef.current) window.clearInterval(progressIntervalRef.current);
          window.setTimeout(() => {
            navigate("/analysis", { state: { targetReportId: payload.resultId } });
          }, 800);
        }
      };

      eventSource.onerror = () => {
        toast.error("Lost connection to the server", { id: toastId });
        eventSource.close();
        if (progressIntervalRef.current) window.clearInterval(progressIntervalRef.current);
        setIsLoading(false);
      };
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || "Unable to start analysis", { id: toastId });
      setIsLoading(false);
    }
  };

  const handleDeleteCvClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setCvToDelete(index);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (cvToDelete === null) return;
    const cvId = savedCVs[cvToDelete].id;
    try {
      await deleteCV(cvId);
      setSavedCVs((prev) => prev.filter((_, i) => i !== cvToDelete));
      setSelectedCv((prev) => {
        if (prev === null) return null;
        if (prev === cvToDelete) return null;
        return prev > cvToDelete ? prev - 1 : prev;
      });
      toast.success("CV deleted successfully");
    } catch {
      toast.error("Unable to delete this CV");
    }
    setIsDeleteModalOpen(false);
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
    isLoading,
    analyzeProgress,
    loadingMessage,
    isUploadingCv,
    isUploadingJd,
    handleFakeUpload,
  };
};
