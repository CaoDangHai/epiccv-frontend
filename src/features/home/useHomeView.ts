import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { uploadCV } from '../../api/cvApi';


import type { HomeFormValues, SavedCV, UseHomeViewReturn } from './types';

export const useHomeView = (): any => { // Dùng type UseHomeViewReturn nếu bạn đã update types.ts
    const [credentialsTab, setCredentialsTab] = useState<'upload' | 'saved'>('upload');
    const [opportunityTab, setOpportunityTab] = useState<'paste' | 'upload'>('paste');

    // SỬA: Đổi giá trị khởi tạo thành null để mặc định không chọn CV nào
    const [selectedCv, setSelectedCv] = useState<number | null>(null);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [cvToDelete, setCvToDelete] = useState<number | null>(null);

    const { register, handleSubmit, formState: { errors }, watch } = useForm<HomeFormValues>();

    const savedCVs: SavedCV[] = [
        { name: "Frontend_Resume_Oct.pdf", meta: "Last used 2 days ago", color: "blue" },
        { name: "Senior_Dev_CV_v2.pdf", meta: "Uploaded Jan 15", color: "slate" },
        { name: "Product_Manager_2023.docx", meta: "Uploaded Dec 20, 2023", color: "slate" }
    ];

    // THÊM: Hàm xử lý toggle chọn CV
    const toggleSelectCv = (index: number) => {
        setSelectedCv(prev => (prev === index ? null : index));
    };

    const validateFile = (fileList: FileList) => {
        if (!fileList || fileList.length === 0) return true;
        const file = fileList[0];
        const validTypes = [
            'application/pdf',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/msword'
        ];
        if (!validTypes.includes(file.type)) return 'Chỉ hỗ trợ file định dạng PDF hoặc DOCX';
        if (file.size > 5 * 1024 * 1024) return 'Dung lượng file vượt quá giới hạn 5MB';
        return true;
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        // 1. Nếu không chọn file thì thoát luôn
        if (!e.target.files || e.target.files.length === 0) return;

        const file = e.target.files[0];
        
        // 2. Bọc try catch để xem lỗi ở đâu
        try {
            toast.success(`Bắt đầu tải lên: ${file.name}`, { duration: 2000 });
            
            const result = await uploadCV(file);
            
            // 3. Nếu không lỗi, dòng này chắc chắn sẽ chạy
            console.log("DỮ LIỆU TỪ BACKEND TRẢ VỀ:", result);
            toast.success(`Trích xuất thành công: ${file.name}`, { duration: 2000 });

        } catch (error) {
            // 4. Nếu bị lỗi, nó sẽ nhảy vào đây
            console.error("LỖI RỒI BẠN ƠI:", error);
            toast.error("Tải file thất bại, hãy check console trình duyệt!");
        } finally {
            // Reset lại input để có thể chọn lại đúng file đó lần nữa
            e.target.value = '';
        }
    };

    const onAnalyze = (data: HomeFormValues) => {
        // Có thể thêm logic kiểm tra nếu (credentialsTab === 'saved' && selectedCv === null) thì báo lỗi
        console.log("Dữ liệu form:", data);
        toast.loading('AI Đang phân tích dữ liệu...', { duration: 3000 });
        //call api
        
    };

    const handleDeleteCvClick = (e: React.MouseEvent, index: number) => {
        e.stopPropagation();
        setCvToDelete(index);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        toast.success('Đã xóa CV khỏi hệ thống');
        setIsDeleteModalOpen(false);
        // SỬA: Bỏ chọn CV nếu CV đó đang được chọn và bị xóa
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
        selectedCv, setSelectedCv, savedCVs,
        isDeleteModalOpen, cancelDelete, confirmDelete, handleDeleteCvClick, cvToDelete,
        handleFileChange, onAnalyze, validateFile,
        toggleSelectCv
    };
};