import * as React from "react";
import { cn } from "../../../utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
  className?: string;
  allowedPattern?: RegExp;
  disallowedChars?: string[];
  maxLength?: number;

}

const Input = ({ hasError, className, type, allowedPattern, disallowedChars, maxLength = 30, ...props }: InputProps) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // 🔹 Regla 1: Bloqueo de caracteres: solo permite caracteres permitidos
    if (allowedPattern) {
      console.log("Entreee allowedPattern", allowedPattern)
      if (!allowedPattern.test(value)) {
        return;
      }
    }

    if (disallowedChars?.length) {
      const banned = new Set(disallowedChars);
      value = Array.from(value)
        .filter((ch) => !banned.has(ch))
        .join("");
    }

    // 🔹 Regla 3: Limitar longitud
    if (value.length > maxLength) {
      value = value.slice(0, maxLength);
    }

    e.target.value = value;
    props.onChange?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // 🔹 Regla 2: Trim automático: elimina espacios en blanco al perder el focus
    e.target.value = e.target.value.trim();
    props.onBlur?.(e);
  };


  return (
    <div className="relative w-full">
      <input
        type={inputType}
        className={cn(
          "flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:border-0 focus:ring-1 focus:outline-none focus:ring-blue-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          hasError && "bg-red-100 ring-red-200",
          className,
          isPassword && "pr-10"
        )}
        maxLength={maxLength}
        {...props}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
          )}
        </button>
      )}
    </div>
  );
}

export default Input;
