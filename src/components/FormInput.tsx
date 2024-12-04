import React from "react";

interface FormInputProps {
  label: string
  value: string
  onChange: (value: string) => void
  type?: "text" | "file"
  id: string
  required?: boolean
}

const FormInput: React.FC<FormInputProps> = ({ label, value, onChange, type = "text", id, required }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-bold text-gray-700 mb-2">
      {label}
    </label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="block px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
      required={required}
    />
  </div>
);

export default FormInput;
