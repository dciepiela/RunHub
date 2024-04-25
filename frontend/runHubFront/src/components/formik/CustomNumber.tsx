import { useField } from "formik";
import React from "react";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

const CustomNumber: React.FC<CustomInputProps> = ({
  label,
  name,
  ...props
}) => {
  const [field, meta] = useField({ name, ...props });

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const sanitizedValue = value.replace(",", ".");
    field.onChange({
      target: {
        name: field.name,
        value: sanitizedValue,
      },
    });
  };

  return (
    <>
      <label className="block font-bold text-deepBlack">{label}</label>
      <input
        {...field}
        {...props}
        onInput={handleInput}
        className={
          "w-full px-4 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-lightYellow focus:border-none" +
          (meta.touched && meta.error ? " input-error" : "")
        }
      />
      {meta.touched && meta.error && (
        <div className="error-message">{meta.error}</div>
      )}
    </>
  );
};

export default CustomNumber;
