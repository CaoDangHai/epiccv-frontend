import type { UseFormRegister, FieldErrors, UseFormHandleSubmit } from 'react-hook-form';

export interface SignInFormValues {
    email: string;
    password: string;
    remember: boolean;
}

export interface UseSignInReturn {
    register: UseFormRegister<SignInFormValues>;
    errors: FieldErrors<SignInFormValues>;
    handleSubmit: UseFormHandleSubmit<SignInFormValues>;
    onSubmit: (data: SignInFormValues) => Promise<void>;
    handleMezonSignIn: () => void;
    goToSignUp: () => void;
}