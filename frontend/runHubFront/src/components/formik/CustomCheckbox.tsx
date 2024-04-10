//rafce

import { useField } from "formik";

const CustomCheckbox = ({ ...props }) => {
  const [field, meta] = useField(props);

  //   console.log("field", field);
  //   console.log("meta", meta);

  return (
    <>
      <div className="checkbox">
        <input
          {...field}
          {...props}
          className={meta.touched && meta.error ? "input-error" : ""}
        />
        <span>I accept the therms of service</span>
      </div>

      {meta.touched && meta.error && <div className="error">{meta.error}</div>}
    </>
  );
};

export default CustomCheckbox;
