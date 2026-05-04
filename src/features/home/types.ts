import type {
  UseFormRegister,
  FieldErrors,
  UseFormHandleSubmit,
  UseFormWatch,
} from "react-hook-form";

export interface HomeFormValues {
  cvFile: FileList;
  jdText: string;
  jdFile: FileList;
}

export interface SavedCV {
  name: string;
  meta: string;
  color: string;
}

export interface UseHomeViewReturn {
  register: UseFormRegister<HomeFormValues>;
  errors: FieldErrors<HomeFormValues>;
  handleSubmit: UseFormHandleSubmit<HomeFormValues>;
  watch: UseFormWatch<HomeFormValues>;

  credentialsTab: "upload" | "saved";
  setCredentialsTab: (tab: "upload" | "saved") => void;
  opportunityTab: "paste" | "upload";
  setOpportunityTab: (tab: "paste" | "upload") => void;

  selectedCv: number;
  setSelectedCv: (index: number) => void;
  savedCVs: SavedCV[];
  toggleSelectCv: (index: number) => void;

  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: (isOpen: boolean) => void;
  cancelDelete: () => void;
  confirmDelete: () => void;
  handleDeleteCvClick: (e: React.MouseEvent, index: number) => void;

  onAnalyze: (data: HomeFormValues) => void;
  validateFile: (
    fileList?: FileList,
    maxSizeMB?: number,
    allowedTypes?: string[]
  ) => string | boolean;

  isLoading: boolean;
}
