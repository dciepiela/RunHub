import { Field, Formik, FormikHelpers } from "formik";
import { Form } from "react-router-dom";
import CustomInput from "../../components/formik/CustomInput";
import { advancedSchema } from "./form/raceFormSchema";
import CustomSelect from "../../components/formik/CustomSelect";
import CustomCheckbox from "../../components/formik/CustomCheckbox";

interface FormValues {
  username: string;
  jobType: string;
  acceptedTos: boolean;
}

const onSubmit = async (
  values: FormValues,
  actions: FormikHelpers<FormValues>
) => {
  await new Promise((resolve) => setTimeout(resolve, 10000));
  actions.resetForm();
};

export default function FormikTest() {
  return (
    <Formik
      initialValues={{ username: "", jobType: "", acceptedTos: false }}
      validationSchema={advancedSchema}
      onSubmit={onSubmit}
    >
      {(formikProps) => (
        <Form>
          <CustomInput
            label="Username"
            name="username"
            type="text"
            placeholder="Enter your username"
          />
          <CustomSelect
            label="Job type"
            name="jobType"
            placeholder="Prosze wybierz zawód"
          >
            <option value="">Proszeę wybierz zawód</option>
            <option value="developer">Developer</option>
            <option value="designer">Designer</option>
            <option value="manager">Product Manager</option>
            <option value="other">Other</option>
          </CustomSelect>

          <CustomCheckbox type="checkbox" name="acceptedTos" />
          {/* <Field type="text" name="name" placeholder="Name" /> */}
          <button disabled={formikProps.isSubmitting} type="submit">
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}
