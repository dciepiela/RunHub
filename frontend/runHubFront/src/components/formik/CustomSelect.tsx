import { useField } from "formik";

interface Option {
  value: any;
  text: string;
}

interface CustomSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Option[];
  name: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  options,
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label className="block font-bold text-deepBlack">{label}</label>
      <select
        {...field}
        {...props}
        className={`mt-1 p-2 w-full border border-gray-300 rounded-md ${
          meta.touched && meta.error ? "input-error" : ""
        }`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
      {meta.touched && meta.error && (
        <div className="error-message">{meta.error}</div>
      )}
    </>
  );
};

export default CustomSelect;
