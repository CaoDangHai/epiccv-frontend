import { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  getAnalysisHistory,
  getAnalysisById,
  getRoadmapFromDb,
  generateRoadmapAI,
  updateStepStatus,
} from "../../api/cvApi";
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
  const [selectedPhase, setSelectedPhase] = useState<Roadmap["steps"][0] | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleGenerateRoadmap = async () => {
    if (!analysisData?.id) return;
    setIsGenerating(true);
    try {
      const data = await generateRoadmapAI(analysisData.id);
      setRoadmap(data);
      setActiveTab("phases");
      toast.success("Roadmap generated successfully!");
    } catch {
      toast.error("Failed to generate roadmap");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleToggleStepStatus = async (stepId: string, currentStatus: boolean) => {
    try {
      await updateStepStatus(stepId, !currentStatus);
      setRoadmap((prev: Roadmap | null) => {
        if (!prev) return prev;
        return {
          ...prev,
          steps: prev.steps.map((s) =>
            s.id === stepId ? { ...s, is_completed: !currentStatus } : s
          ),
        };
      });
      // Đổi state của Phase đang mở trong Drawer ngay lập tức
      if (selectedPhase && selectedPhase.id === stepId) {
        setSelectedPhase((prev) => (prev ? { ...prev, is_completed: !currentStatus } : null));
      }
    } catch (e) {
      toast.error("Lỗi khi cập nhật trạng thái");
      throw e;
    }
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setIsLoading(true);
        const data = await getAnalysisHistory();
        setAnalysisList(data);

        const targetId = location.state?.targetReportId;
        if (targetId) {
          handleSelectReport(targetId);
          navigate("/analysis", { replace: true, state: {} });
        }
      } catch (error) {
        console.error("Lỗi lấy danh sách:", error);
        toast.error("Failed to load reports");
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBack = () => {
    setViewMode("list");
    setActiveTab("overview");
    setSelectedPhase(null);
    setAnalysisData(null);
    setRoadmap(null); // Clear roadmap khi back ra list
  };

  const handleSelectReport = async (id: string) => {
    setViewMode("detail");
    setSelectedPhase(null);
    setActiveTab("overview");

    setIsLoading(true);
    setRoadmap(null);
    try {
      const data = await getAnalysisById(id);
      setAnalysisData(data);

      const existingRoadmap = await getRoadmapFromDb(id);
      if (existingRoadmap) setRoadmap(existingRoadmap);
    } catch {
      toast.error("Failed to load report details");
      handleBack();
    } finally {
      setIsLoading(false);
    }
  };

  const onTabChange = (tab: string) => {
    if ((tab === "phases" || tab === "documentation" || tab === "status") && !roadmap) {
      toast("Please Generate a Roadmap to unlock this section.", { icon: "🔒" });
      return;
    }
    setActiveTab(tab);
  };

  const handleOpenPhaseDetail = (phase: Roadmap["steps"][0]) => {
    setSelectedPhase(phase);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => setSelectedPhase(null), 300);
  };

  const progressStats = useMemo(() => {
    if (!roadmap || !roadmap.steps) return { total: 0, completed: 0, percent: 0 };
    const total = roadmap.steps.length;
    const completed = roadmap.steps.filter((s) => s.is_completed).length;
    return {
      total,
      completed,
      percent: total === 0 ? 0 : Math.round((completed / total) * 100),
    };
  }, [roadmap]);

  return {
    viewMode,
    reports: analysisList,
    analysisData,
    activeTab,
    setActiveTab: onTabChange,
    handleBack,
    handleSelectReport,
    isLoading,
    roadmap,
    isGenerating,
    handleGenerateRoadmap,
    selectedPhase,
    isDrawerOpen,
    handleOpenPhaseDetail,
    handleCloseDrawer,
    handleToggleStepStatus,
    progressStats,
  };
};
