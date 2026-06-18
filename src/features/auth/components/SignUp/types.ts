import type {
  UseFormRegister,
  FieldErrors,
  UseFormHandleSubmit,
  UseFormWatch,
} from "react-hook-form";
import type { TurnstileInstance } from "@marsidev/react-turnstile";

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
  setTurnstileToken: (token: string) => void;
  isLoading: boolean;
  turnstileRef: React.MutableRefObject<TurnstileInstance | null>;
}
