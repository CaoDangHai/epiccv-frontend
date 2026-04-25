import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import type { SignUpFormValues, UseSignUpReturn } from './types';

export const useSignUp = (): UseSignUpReturn => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<SignUpFormValues>({
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
            remember: false,
        },
    });

    const onSubmit = async (data: SignUpFormValues) => {
        console.log('Payload Đăng ký:', data);

        // Giả lập gọi API thành công
        toast.success('Đăng ký tài khoản thành công!');

        // Tự động điều hướng về trang Sign In
        setTimeout(() => {
            navigate('/sign-in');
        }, 1500);
    };

    const handleMezonSignUp = () => {
        /// [PLACEHOLDER] Logic redirect sang Mezon OAuth2
        console.log('Triggering Mezon OAuth2 Registration...');
    };

    const goToSignIn = () => {
        navigate('/sign-in');
    };

    return {
        register,
        errors,
        handleSubmit,
        onSubmit,
        handleMezonSignUp,
        goToSignIn,
        watch,
    };
};