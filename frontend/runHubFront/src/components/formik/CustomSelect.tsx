import { useField } from "formik";

const CustomSelect = ({ label, options, ...props }) => {
  const [field, meta] = useField(props);

  // console.log("field", field);
  // console.log("meta", meta);

  return (
    <>
      <label>{label}</label>
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
      {meta.touched && meta.error && <div className="error">{meta.error}</div>}
    </>
  );
};

export default CustomSelect;
