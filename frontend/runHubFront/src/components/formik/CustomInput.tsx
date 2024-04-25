import { useField } from "formik";
import React from "react";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

const CustomInput: React.FC<CustomInputProps> = ({ label, name, ...props }) => {
  const [field, meta] = useField({ name, ...props });

  // console.log("field", field);
  // console.log("meta", meta);

  return (
    <>
      <label className="block font-bold text-deepBlack">{label}</label>
      <input
        {...field}
        {...props}
        className={
          "w-full px-4 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-lightYellow focus:border-none" +
          (meta.touched && meta.error ? "input-error" : "")
        }
      />
      {meta.touched && meta.error && (
        <div className="error-message">{meta.error}</div>
      )}
    </>
  );
};

export default CustomInput;
