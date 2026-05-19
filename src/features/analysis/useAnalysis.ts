import { useState, useEffect, useMemo, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getAnalysisHistory, getAnalysisById, getRoadmapFromDb, generateRoadmapStart, updateStepStatus } from "../../api/cvApi";
import type { AnalysisResult, Roadmap } from "./types";

export const useAnalysis = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [viewMode, setViewMode] = useState<"list" | "detail">("list");
  const [activeTab, setActiveTab] = useState<string>("overview");

  const [analysisList, setAnalysisList] = useState<AnalysisResult[]>([]);
  const [analysisData, setAnalysisData] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generateProgress, setGenerateProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState("");

  // Ref quản lý Interval của Hybrid Progress
  const progressIntervalRef = useRef<number | null>(null);

  const [selectedPhase, setSelectedPhase] = useState<Roadmap["steps"][0] | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleGenerateRoadmap = async () => {
    if (!analysisData?.id) return;
    setIsGenerating(true);
    setGenerateProgress(0);
    setLoadingMessage("Khởi tạo AI...");

    try {
      const { jobId } = await generateRoadmapStart(analysisData.id);

      let targetProgress = 0;
      let currentProgress = 0;

      progressIntervalRef.current = setInterval(() => {
        if (currentProgress < targetProgress) {
          currentProgress += 2;
          setGenerateProgress(currentProgress > 100 ? 100 : currentProgress);
        } else if (currentProgress < targetProgress + 20 && currentProgress < 95) {
          currentProgress += 1;
          setGenerateProgress(currentProgress);
        }
      }, 350);

      const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
      const eventSource = new EventSource(`${baseUrl}/roadmap/progress/${jobId}`);

      eventSource.onmessage = async (event) => {
        const payload = JSON.parse(event.data);
        if (payload.error) {
          toast.error(payload.error);
          eventSource.close();
          if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
          setIsGenerating(false);
        } else {
          targetProgress = payload.progress;
          setLoadingMessage(payload.message);

          if (payload.progress === 100) {
            currentProgress = 100;
            setGenerateProgress(100);
            eventSource.close();
            if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
            toast.success("Roadmap generated successfully!");
            const existingRoadmap = await getRoadmapFromDb(analysisData.id);
            if (existingRoadmap) setRoadmap(existingRoadmap);
            setActiveTab("phases");
            setIsGenerating(false);
          }
        }
      };

      eventSource.onerror = () => {
        toast.error("Mất kết nối với máy chủ");
        eventSource.close();
        if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
        setIsGenerating(false);
      };
    } catch {
      toast.error("Failed to start generating roadmap");
      setIsGenerating(false);
    }
  };

  const handleToggleStepStatus = async (stepId: string, currentStatus: boolean) => {
    try {
      await updateStepStatus(stepId, !currentStatus);
      setRoadmap((prev: Roadmap | null) => {
        if (!prev) return prev;
        return { ...prev, steps: prev.steps.map((s) => s.id === stepId ? { ...s, is_completed: !currentStatus } : s) };
      });
      if (selectedPhase && selectedPhase.id === stepId) {
        setSelectedPhase((prev) => (prev ? { ...prev, is_completed: !currentStatus } : null));
      }
    } catch (e) { toast.error("Lỗi khi cập nhật trạng thái"); throw e; }
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setIsLoading(true);
        const data = await getAnalysisHistory();
        setAnalysisList(data);
        const targetId = location.state?.targetReportId;
        if (targetId) { handleSelectReport(targetId); navigate("/analysis", { replace: true, state: {} }); }
      } catch (error) { toast.error("Failed to load reports"); } finally { setIsLoading(false); }
    };
    fetchHistory();
  }, []);

  const handleBack = () => { setViewMode("list"); setActiveTab("overview"); setSelectedPhase(null); setAnalysisData(null); setRoadmap(null); };

  const handleSelectReport = async (id: string) => {
    setViewMode("detail"); setSelectedPhase(null); setActiveTab("overview"); setIsLoading(true); setRoadmap(null);
    try {
      const data = await getAnalysisById(id);
      setAnalysisData(data);
      const existingRoadmap = await getRoadmapFromDb(id);
      if (existingRoadmap) setRoadmap(existingRoadmap);
    } catch { toast.error("Failed to load report details"); handleBack(); } finally { setIsLoading(false); }
  };

  const onTabChange = (tab: string) => {
    if ((tab === "phases" || tab === "documentation" || tab === "status") && !roadmap) { toast("Please Generate a Roadmap to unlock this section.", { icon: "🔒" }); return; }
    setActiveTab(tab);
  };

  const handleOpenPhaseDetail = (phase: Roadmap["steps"][0]) => { setSelectedPhase(phase); setIsDrawerOpen(true); };
  const handleCloseDrawer = () => { setIsDrawerOpen(false); setTimeout(() => setSelectedPhase(null), 300); };

  const progressStats = useMemo(() => {
    if (!roadmap || !roadmap.steps) return { total: 0, completed: 0, percent: 0 };
    const total = roadmap.steps.length;
    const completed = roadmap.steps.filter((s) => s.is_completed).length;
    return { total, completed, percent: total === 0 ? 0 : Math.round((completed / total) * 100) };
  }, [roadmap]);

  return { viewMode, reports: analysisList, analysisData, activeTab, setActiveTab: onTabChange, handleBack, handleSelectReport, isLoading, roadmap, isGenerating, generateProgress, loadingMessage, handleGenerateRoadmap, selectedPhase, isDrawerOpen, handleOpenPhaseDetail, handleCloseDrawer, handleToggleStepStatus, progressStats };
};