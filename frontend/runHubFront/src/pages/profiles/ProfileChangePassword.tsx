import { Formik, Form } from "formik";
import * as Yup from "yup";
import { observer } from "mobx-react-lite";
import { toast } from "react-toastify";
import LoadingButton from "../../components/button/LoadingButton";
import { useStore } from "../../app/stores/store";
import CustomInput from "../../components/formik/CustomInput";

const passwordChangeSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .min(6, "Hasło jest za krótkie - powinno mieć co najmniej 6 znaków.")
    .required("Aktualne hasło jest wymagane"),
  newPassword: Yup.string()
    .min(6, "Hasło jest za krótkie - powinno mieć co najmniej 6 znaków.")
    .required("Nowe hasło jest wymagane")
    .notOneOf(
      [Yup.ref("currentPassword")],
      "Nowe hasło musi być inne niż obecne hasło"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Hasła muszą się zgadzać")
    .required("Potwierdzenie hasła jest wymagane"),
});

function ProfileChangePassword() {
  const { userStore } = useStore();

  return (
    <Formik
      initialValues={{
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }}
      validationSchema={passwordChangeSchema}
      onSubmit={async (values, actions) => {
        await userStore.changePassword(values);
        actions.resetForm();
        actions.setSubmitting(false);
      }}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form className="max-w-[full] p-6 bg-white rounded-lg shadow-md grid">
          <CustomInput
            label="Aktualne hasło"
            name="currentPassword"
            type="password"
            placeholder="Aktualne hasło"
          />
          <CustomInput
            label="Nowe hasło"
            name="newPassword"
            type="password"
            placeholder="Nowe hasło"
          />
          <CustomInput
            label="Potwierdź nowe hasło"
            name="confirmPassword"
            type="password"
            placeholder="Potwierdź nowe hasło"
          />
          <LoadingButton
            className="mt-4 p-2 h-[30px]"
            type="submit"
            loading={isSubmitting}
            title="Aktualizuj hasło"
            disabled={!isValid || !dirty}
            size={30}
          />
        </Form>
      )}
    </Formik>
  );
}

export default observer(ProfileChangePassword);
