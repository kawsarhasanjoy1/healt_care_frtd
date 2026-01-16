"use client";
import { Loader2 } from "lucide-react"; 
import { TButtonProps } from "@/app/types/global";



const HCButton = ({
  children,
  type = "button",
  onClick,
  isLoading = false,
  disabled = false,
  variant = "primary",
  className = "",
  icon,
}: TButtonProps) => {

  const variants = {
    primary:
      "bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-indigo-200",
    secondary: "bg-slate-800 hover:bg-slate-900 text-white shadow-slate-200",
    danger: "bg-rose-700 hover:bg-rose-800 text-white shadow-rose-200",
    outline: "border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        relative overflow-hidden group
        h-11 px-6 rounded-xl text-sm font-bold transition-all duration-300
        active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed
        shadow-lg flex items-center justify-center gap-2
        ${variants[variant]}
        ${className}
      `}
    >
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />

      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          {icon && <span className="text-lg">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
};

export default HCButton;
