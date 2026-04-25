import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    // Có thể mở rộng thêm icon Left/Right ở đây sau này
}

export const Input: React.FC<InputProps> = ({ className = '', ...props }) => {
    const baseClass = "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all";

    return (
        <input className={`${baseClass} ${className}`.trim()} {...props} />
    );
};