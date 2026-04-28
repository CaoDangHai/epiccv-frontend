import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { uploadCV } from '../../api/cvApi';
import { uploadJDFile, uploadJDText } from '../../api/jdApi';

import type { HomeFormValues, SavedCV, UseHomeViewReturn } from './types';

export const useHomeView = (): UseHomeViewReturn => {
  const [credentialsTab, setCredentialsTab] = useState<'upload' | 'saved'>('upload');
  const [opportunityTab, setOpportunityTab] = useState<'paste' | 'upload'>('paste');

  const [selectedCv, setSelectedCv] = useState<number | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [cvToDelete, setCvToDelete] = useState<number | null>(null);

  const { register, handleSubmit, formState: { errors }, watch } = useForm<HomeFormValues>();

  const savedCVs: SavedCV[] = [
    { name: 'Frontend_Resume_Oct.pdf', meta: 'Last used 2 days ago', color: 'blue' },
    { name: 'Senior_Dev_CV_v2.pdf', meta: 'Uploaded Jan 15', color: 'slate' },
    { name: 'Product_Manager_2023.docx', meta: 'Uploaded Dec 20, 2023', color: 'slate' },
  ];

  const toggleSelectCv = (index: number) => {
    setSelectedCv((prev) => (prev === index ? null : index));
  };

  const validateFile = (fileList: FileList) => {
    if (!fileList || fileList.length === 0) return true;
    const file = fileList[0];
    const validTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
    ];
    if (!validTypes.includes(file.type)) return 'Chỉ hỗ trợ file định dạng PDF hoặc DOCX';
    if (file.size > 5 * 1024 * 1024) return 'Dung lượng file vượt quá giới hạn 5MB';
    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: string) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    try {
      toast.success(`Đã chọn ${fileType}: ${file.name}`, { duration: 2000 });
    } catch (error) {
      console.error(`Lỗi chọn file ${fileType}:`, error);
      toast.error('Chọn file thất bại!');
    }
  };

  const onAnalyze = async (data: HomeFormValues) => {
    const cvFileFromForm = data.cvFile?.[0];

    if (credentialsTab === 'upload' && !cvFileFromForm) {
      toast.error('Vui lòng tải lên CV trước!');
      return;
    }

    const jdFileFromForm = data.jdFile?.[0];
    const jdText = data.jdText?.trim();

    if (opportunityTab === 'upload' && !jdFileFromForm) {
      toast.error('Vui lòng tải lên file JD!');
      return;
    }
    if (opportunityTab === 'paste' && !jdText) {
      toast.error('Vui lòng nhập nội dung JD!');
      return;
    }

    const toastId = toast.loading('AI đang phân tích...');
    try {
      const [cvResult, jdResult] = await Promise.all([
        cvFileFromForm ? uploadCV(cvFileFromForm) : Promise.resolve(null),
        opportunityTab === 'upload' && jdFileFromForm
          ? uploadJDFile(jdFileFromForm)
          : uploadJDText(jdText!),
      ]);

      console.log('CV result:', cvResult);
      console.log('JD result:', jdResult);
      toast.success('Phân tích thành công!', { id: toastId });
    } catch (error) {
      console.error('Lỗi phân tích:', error);
      toast.error('Phân tích thất bại!', { id: toastId });
    }
  };

  const handleDeleteCvClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setCvToDelete(index);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    toast.success('Đã xóa CV khỏi hệ thống');
    setIsDeleteModalOpen(false);
    if (selectedCv === cvToDelete) setSelectedCv(null);
    setCvToDelete(null);
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setCvToDelete(null);
  };

  return {
    register, errors, handleSubmit, watch,
    credentialsTab, setCredentialsTab,
    opportunityTab, setOpportunityTab,
    selectedCv: selectedCv ?? -1,
    setSelectedCv,
    savedCVs,
    isDeleteModalOpen, cancelDelete, confirmDelete,
    handleDeleteCvClick, cvToDelete,
    handleFileChange, onAnalyze, validateFile,
    toggleSelectCv,
  };
};