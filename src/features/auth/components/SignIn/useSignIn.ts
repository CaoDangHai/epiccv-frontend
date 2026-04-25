import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import type { SignInFormValues, UseSignInReturn } from './types';
import toast from 'react-hot-toast';

/**
 * Helper sinh chuỗi ngẫu nhiên chính xác 11 ký tự alphanumeric
 * phục vụ cho tham số 'state' trong bảo mật OAuth2 của Mezon.
 */
const generateMezonState = (length: number = 11): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

export const useSignIn = (): UseSignInReturn => {
    const navigate = useNavigate();

    // Khởi tạo react-hook-form với các giá trị mặc định
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInFormValues>({
        defaultValues: {
            email: '',
            password: '',
            remember: false,
        },
    });

    /**
     * Xử lý logic đăng nhập bằng Email/Password truyền thống
     */
    const onSubmit = async (data: SignInFormValues) => {
        console.log('Dữ liệu đăng nhập gửi lên server:', data);
        // TODO: Gọi API đăng nhập qua axiosClient tại đây
        toast.success('Đăng nhập thành công!');
        setTimeout(() => {
            navigate('/home');
        }, 1000);
    };

    /**
     * Xử lý điều hướng sang cổng xác thực của Mezon (OAuth2 Step 1)
     */
    const handleMezonSignIn = () => {
        // Lấy thông tin cấu hình từ biến môi trường (.env)
        const clientId = import.meta.env.VITE_MEZON_CLIENT_ID || '';
        const redirectUri = import.meta.env.VITE_MEZON_REDIRECT_URI || '';

        // Tạo mã state bảo mật 11 ký tự
        const state = generateMezonState(11);

        // Xây dựng các tham số truy vấn cho URL Authorize
        const params = new URLSearchParams({
            client_id: clientId,
            redirect_uri: redirectUri,
            response_type: 'code',
            scope: 'openid offline',
            state: state,
        });

        const authUrl = `https://oauth2.mezon.ai/oauth2/auth?${params.toString()}`;

        // Chuyển hướng người dùng sang trang login của Mezon
        window.location.href = authUrl;
    };

    /**
     * Chuyển hướng sang màn hình Đăng ký tài khoản
     */
    const goToSignUp = () => {
        navigate('/sign-up');
    };

    return {
        register,
        errors,
        handleSubmit,
        onSubmit,
        handleMezonSignIn,
        goToSignUp,
    };
};