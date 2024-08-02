import React from 'react';

interface InputFieldProps {
  name: string;
  value: number | string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  labelText: string;
  type: 'text' | 'number';
  id: string;
}

function InputField({ name, value, onChange, placeholder, id, labelText, type }: InputFieldProps) {
  return (
    <div className="mb-4">
      <label className="block font-semibold mb-1" htmlFor={id}>
        {labelText}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value ?? ''}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-2 border rounded-md text-right"
      />
    </div>
  );
}

export default InputField;
