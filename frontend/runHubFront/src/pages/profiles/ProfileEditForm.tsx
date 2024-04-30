import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import * as Yup from "yup";
import CustomInput from "../../components/formik/CustomInput";
import LoadingButton from "../../components/button/LoadingButton";
import CustomTextarea from "../../components/formik/CustomTextarea";

interface Props {
  setEditMode: (editMode: boolean) => void;
}

export default observer(function ProfileEditForm({ setEditMode }: Props) {
  const { profileStore } = useStore();
  const { profile, updateProfile } = profileStore;

  const initialValues = {
    displayName: profile?.displayName || "",
    firstName: profile?.firstName || "",
    lastName: profile?.lastName || "",
    club: profile?.club || "",
    city: profile?.city || "",
    street: profile?.street || "",
    postalCode: profile?.postalCode || "",
    bio: profile?.bio || "",
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        updateProfile(values).then(() => {
          setEditMode(false);
        });
      }}
      validationSchema={Yup.object({
        displayName: Yup.string().required(
          "Wyświetlana nazwa użytkownika jest wymagana"
        ),
      })}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form className="max-w-[full] p-6 bg-white rounded-lg shadow-md grid">
          <CustomInput
            label="Wyświetlana nazwa użytkownika"
            name="displayName"
            type="text"
            placeholder="Wyświetlana nazwa"
          />
          <CustomInput
            label="Imię"
            name="firstName"
            type="text"
            placeholder="Wprowadź imię"
          />
          <CustomInput
            label="Nazwisko"
            name="lastName"
            type="text"
            placeholder="Wprowadź nazwisko"
          />
          <CustomInput
            label="Klub"
            name="club"
            type="text"
            placeholder="Wprowadź nazwę klubu"
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
          />
          <CustomTextarea
            label="Bio"
            name="bio"
            placeholder="Dodaj swój opis"
            rows={3}
          />
          <LoadingButton
            className="mt-4 p-2 h-[30px]"
            type="submit"
            loading={isSubmitting}
            title="Aktualizuj profil"
            disabled={!isValid || !dirty}
            size={30}
          />
        </Form>
      )}
    </Formik>
  );
});
