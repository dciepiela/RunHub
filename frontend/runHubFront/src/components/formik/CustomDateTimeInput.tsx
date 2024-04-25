import { useField } from "formik";
import DatePicker, {
  ReactDatePickerProps,
  registerLocale,
} from "react-datepicker";
import { pl } from "date-fns/locale/pl";
registerLocale("pl", pl);

interface CustomDateTimeInputProps extends Partial<ReactDatePickerProps> {
  labelText?: string;
}

export default function CustomDateTimeInput(props: CustomDateTimeInputProps) {
  const { labelText } = props;
  const [field, meta, helpers] = useField(props.name!);

  return (
    <>
      <label className="block font-bold text-deepBlack">{labelText}</label>
      <DatePicker
        {...field}
        {...props}
        selected={(field.value && new Date(field.value)) || null}
        onChange={(value) => helpers.setValue(value)}
        locale="pl"
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
}
