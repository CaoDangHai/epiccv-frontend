import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { personalInfo, skills, experiences, resumes } from './mockData';

export const useProfile = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Xử lý nút Back
    const handleBack = () => {
        navigate(-1);
    };

    // Xử lý trigger click vào thẻ input file ẩn
    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    // Xử lý khi user chọn file xong
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            console.log("File đã chọn:", files[0].name);
            // Có thể tích hợp toast thông báo hoặc gọi API upload ở đây
        }
    };

    return {
        personalInfo,
        skills,
        experiences,
        resumes,
        fileInputRef,
        handleBack,
        handleUploadClick,
        handleFileChange
    };
};