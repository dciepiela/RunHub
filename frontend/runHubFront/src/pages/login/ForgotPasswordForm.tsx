import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useStore } from "../../app/stores/store";
import CustomInput from "../../components/formik/CustomInput";
import LoadingButton from "../../components/button/LoadingButton";
import { ForgotPasswordDto } from "../../app/models/user";
import { useState } from "react";

const initialValues: ForgotPasswordDto = {
  email: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .required("Adres e-mail jest wymagany")
    .email("Nieprawidłowy adres email"),
});

export default function ForgotPasswordForm() {
  const { userStore } = useStore();
  const { resetPasswordRequest } = userStore;
  const [emailSent, setEmailSent] = useState(false); // State to track whether the email has been sent

  const handleReset = async (
    values: ForgotPasswordDto,
    { setSubmitting }: FormikHelpers<ForgotPasswordDto>
  ) => {
    await resetPasswordRequest(values);
    setEmailSent(!emailSent);
    setSubmitting(false);
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh] bg-whiteNeutral">
      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0  ">
        <div className="flex flex-col justify-center p-8 md:p-14">
          {emailSent ? (
            <p>
              Jeśli istnieje użytkownik o podanym adresie e-mail, został wysłany
              link do zresetowania hasła.
            </p>
          ) : (
            <>
              <h1 className="flex justify-center text-2xl mb-4">
                Przypomnij hasło
              </h1>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleReset}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <CustomInput
                      type="email"
                      placeholder="Wprowadź swój email"
                      label="Adres e-mail"
                      name="email"
                    />
                    <LoadingButton
                      type="submit"
                      disabled={isSubmitting}
                      loading={isSubmitting}
                      className="w-full bg-[#F2C46D] text-black p-2 rounded-lg mb-6 hover:text-lightYellow hover:border-whiteNeutral mt-4"
                      title="Przypomnij hasło"
                      size={30}
                    />
                  </Form>
                )}
              </Formik>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
