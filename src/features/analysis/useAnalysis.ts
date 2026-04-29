import { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getAnalysisHistory, getAnalysisById } from "../../api/cvApi";
import type { AnalysisResult } from "./types";
import { mockReports } from "./mockData";

export const useAnalysis = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [viewMode, setViewMode] = useState<"list" | "detail">("list");
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [selectedPhase, setSelectedPhase] = useState<number>(1);

  const [analysisList, setAnalysisList] = useState<AnalysisResult[]>([]);
  const [analysisData, setAnalysisData] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const selectedReportMock = useMemo(() => mockReports[0], []);

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
    setSelectedPhase(1);
    setAnalysisData(null);
  };

  const handleSelectReport = async (id: string) => {
    setViewMode("detail");
    setSelectedPhase(1);
    setActiveTab("overview");

    setIsLoading(true);
    try {
      const data = await getAnalysisById(id);
      setAnalysisData(data);
    } catch {
      toast.error("Failed to load report details");
      handleBack();
    } finally {
      setIsLoading(false);
    }
  };

  const checkPhaseDone = (phaseId: number) => {
    if (!selectedReportMock?.phases) return false;
    const phase = selectedReportMock.phases[phaseId];
    return (phase?.steps || []).every((s) => s.status === "Done");
  };

  const isPhaseUnlocked = (phaseId: number) => {
    if (phaseId === 1) return true;
    if (!selectedReportMock?.phases) return false;
    const phaseIds = Object.keys(selectedReportMock.phases)
      .map(Number)
      .sort((a, b) => a - b);
    const currentIndex = phaseIds.indexOf(phaseId);
    if (currentIndex <= 0) return true;
    const prevPhaseId = phaseIds[currentIndex - 1];
    return checkPhaseDone(prevPhaseId);
  };

  const onTabChange = (tab: string) => {
    if (tab !== "overview") {
      toast("Please Generate a Roadmap to unlock this section.", { icon: "🔒" });
      return;
    }
    setActiveTab(tab);
  };

  const updateStepStatus = () => {};

  const globalProgress = 0;

  return {
    viewMode,
    reports: analysisList,
    analysisData,
    selectedReport: selectedReportMock,
    activeTab,
    setActiveTab: onTabChange,
    selectedPhase,
    setSelectedPhase,
    globalProgress,
    handleBack,
    handleSelectReport,
    checkPhaseDone,
    isPhaseUnlocked,
    updateStepStatus,
    isLoading,
  };
};
