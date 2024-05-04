import { Form, Formik } from "formik";
import CustomSelect from "../../components/formik/CustomSelect";
import CustomDateInput from "../../components/formik/CustomDateInput";
import * as Yup from "yup";
import CustomInput from "../../components/formik/CustomInput";
import { observer } from "mobx-react-lite";
import LoadingButton from "../../components/button/LoadingButton";
import { useStore } from "../../app/stores/store";

const today = new Date();
const maxDate = new Date(
  today.getFullYear() - 14,
  today.getMonth(),
  today.getDate()
);

const validationSchema = Yup.object({
  club: Yup.string(),
  dateOfBirth: Yup.date()
    .max(maxDate, "Musisz mieć co najmniej 14 lat.")
    .required("Data urodzenia jest wymagana"),
  gender: Yup.string()
    .oneOf(["M", "K"], "Niepoprawna wartość")
    .required("Płeć jest wymagana"),
  city: Yup.string(),
  street: Yup.string(),
  postalCode: Yup.string(),
});

export default observer(function EditProfileForm() {
  const { profileStore } = useStore();
  const { profile, updateProfileAfterGoogleLogin, loading } = profileStore;

  const initialValues = {
    club: profile?.club || "",
    dateOfBirth: profile?.dateOfBirth || "",
    gender: profile?.gender || "",
    city: profile?.city || "",
    street: profile?.street || "",
    postalCode: profile?.postalCode || "",
  };

  const genderOptions = [
    { value: "", text: "Wybierz płeć" },
    { value: "M", text: "Mężczyzna" },
    { value: "K", text: "Kobieta" },
  ];

  return (
    <div className="mt-16 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 gap-8">
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            updateProfileAfterGoogleLogin(values);
          }}
          validationSchema={validationSchema}
        >
          {() => (
            <Form className="max-w-[full] p-6 bg-white rounded-lg shadow-md grid">
              <CustomDateInput label="Data urodzenia" name="dateOfBirth" />
              <CustomInput
                label="Klub"
                name="club"
                type="text"
                placeholder="Wprowadź klub"
              />
              <CustomSelect
                label="Płeć"
                name="gender"
                options={genderOptions}
              />
              <CustomInput
                label="Miasto"
                name="city"
                type="text"
                placeholder="Wprowadź miasto"
              />
              <CustomInput
                label="Ulica"
                name="street"
                type="text"
                placeholder="Wprowadź ulicę"
              />
              <CustomInput
                label="Kod pocztowy"
                name="postalCode"
                type="text"
                placeholder="Wprowadź kod pocztowy"
                maxLength={6}
              />
              <LoadingButton
                className="mt-4 px-2 py-2"
                type="submit"
                loading={loading}
                title="Aktualizuj dane"
                size={30}
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
});
