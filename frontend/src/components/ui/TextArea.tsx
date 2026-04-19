import React from "react";
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

// components/ui/TextArea.tsx
export const Textarea = ({ className, ...props }: any) => {
  return (
    <textarea
      className={`w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none transition-all ${className}`}
      {...props}
    />
  );
};

Textarea.displayName = "Textarea";
