import type { UseFormRegister, FieldErrors, UseFormHandleSubmit, UseFormWatch } from 'react-hook-form';

export interface SignUpFormValues {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    remember: boolean;
}

export interface UseSignUpReturn {
    register: UseFormRegister<SignUpFormValues>;
    errors: FieldErrors<SignUpFormValues>;
    handleSubmit: UseFormHandleSubmit<SignUpFormValues>;
    onSubmit: (data: SignUpFormValues) => Promise<void>;
    handleMezonSignUp: () => void;
    goToSignIn: () => void;
    watch: UseFormWatch<SignUpFormValues>;
}