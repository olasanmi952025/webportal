type AuthType = "username" | "email" | "rut";


export type LoginTemplateProps = {
  title?: string;
  authLabel?: string;
  authType?: AuthType;
  subtitle?: string;
  logo?: React.ReactNode;
  showRememberMe?: boolean;
  showClearButton?: boolean;
  onSubmit: (email: string, password: string, rememberMe: boolean) => void;
  loading?: boolean;
  error?: string | null;
  success?: string | null;
  onForgotPassword?: () => void;
  onSignUp?: () => void;
  socialLogin?: {
    provider: string;
    icon: React.ReactNode;
    onClick: () => void;
  }[];
  footer?: React.ReactNode;
  expandedLeftContent?: React.ReactNode;

  mode?: "centered" | "expanded";
}
