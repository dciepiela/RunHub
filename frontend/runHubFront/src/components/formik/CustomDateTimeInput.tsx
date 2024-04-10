import { useField } from "formik";
import React from "react";

interface CustomDateTimeInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

const CustomDateTimeInput: React.FC<CustomDateTimeInputProps> = ({
  label,
  name,
  ...props
}) => {
  const [field, meta] = useField({ name, ...props });

  // Function to format the date string
  const formatDateString = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDateString = date.toISOString().slice(0, 16); // Format as yyyy-MM-ddThh:mm
    return formattedDateString;
  };

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-gray-700">
        {label}
      </label>
      <input
        id={name}
        {...field}
        {...props}
        type="datetime-local"
        value={field.value ? formatDateString(field.value) : ""} // Format the value before passing it
        onChange={(e) => {
          field.onChange(e);
        }}
        className={`mt-1 p-2 w-full border border-gray-300 rounded-md ${
          meta.touched && meta.error ? "input-error" : ""
        }`}
      />
      {meta.touched && meta.error && (
        <div className="error-message">{meta.error}</div>
      )}
    </div>
  );
};

export default CustomDateTimeInput;
