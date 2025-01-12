// components/Input.tsx
import React from "react";

interface InputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const Input: React.FC<InputProps> = ({
  label,
  type = "text",
  value,
  onChange,
}) => {
  return (
    <div className="mb-4">
      <label className="block mb-2 font-semibold">{label}:</label>
      {type === "textarea" ? (
        <textarea
          value={value}
          onChange={onChange}
          className="w-full h-32 p-2 border rounded resize-none"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          className="w-full p-2 border rounded"
        />
      )}
    </div>
  );
};

export default Input;
