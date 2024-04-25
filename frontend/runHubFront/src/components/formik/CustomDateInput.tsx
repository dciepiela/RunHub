import React from "react";
import { useField } from "formik";

interface CustomDateInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

const CustomDateInput: React.FC<CustomDateInputProps> = ({
  label,
  name,
  ...props
}) => {
  const [field, meta] = useField({ name, ...props });

  return (
    <>
      <label htmlFor={name} className="block text-gray-700">
        {label}
      </label>
      <input
        {...field}
        {...props}
        type="date"
        className={
          "mt-1 p-2 w-full border border-gray-300 rounded-md " +
          (meta.touched && meta.error ? "input-error" : "")
        }
      />
      {meta.touched && meta.error && (
        <div className="error-message">{meta.error}</div>
      )}
    </>
  );
};

export default CustomDateInput;
