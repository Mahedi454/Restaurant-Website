import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

interface FieldWrapperProps {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}

export function FieldWrapper({
  label,
  htmlFor,
  error,
  required,
  children,
  className,
}: FieldWrapperProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        htmlFor={htmlFor}
        className="text-xs font-medium uppercase tracking-[0.16em] text-charcoal"
      >
        {label}
        {required ? <span className="ml-1 text-terracotta">*</span> : null}
      </label>
      {children}
      {error ? (
        <p role="alert" className="text-xs text-terracotta-dark">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const controlClasses =
  "w-full rounded-xl border border-charcoal/15 bg-cream-light px-4 text-charcoal placeholder:text-stone/70 transition-colors duration-300 focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/25 disabled:cursor-not-allowed disabled:opacity-60";

export function FormInput({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(controlClasses, "h-12", className)}
    />
  );
}

export function FormSelect({
  className,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cn(controlClasses, "h-12 appearance-none", className)}
    >
      {children}
    </select>
  );
}

export function FormTextArea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(controlClasses, "resize-y py-3", className)}
    />
  );
}