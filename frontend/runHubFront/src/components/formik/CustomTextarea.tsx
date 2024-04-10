import { useField } from "formik";
import React from "react";

interface CustomTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
}

const CustomTextarea: React.FC<CustomTextareaProps> = ({
  label,
  name,
  ...props
}) => {
  const [field, meta] = useField({ name, ...props });

  //   console.log("field", field);
  //   console.log("meta", meta);

  return (
    <>
      <label className="block text-gray-700">{label}</label>
      <textarea
        {...field}
        {...props}
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

export default CustomTextarea;
