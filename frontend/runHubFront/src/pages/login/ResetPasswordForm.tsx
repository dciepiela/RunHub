import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useStore } from "../../app/stores/store";
import CustomInput from "../../components/formik/CustomInput";
import LoadingButton from "../../components/button/LoadingButton";
import { ResetPasswordFormDto } from "../../app/models/user";

const initialValues: ResetPasswordFormDto = {
  password: "",
  confirmPassword: "",
};

const validationSchema = Yup.object({
  password: Yup.string()
    .min(6, "Hasło musi mieć co najmniej 6 znaków")
    .required("Hasło jest wymagane"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Hasło musi pasować")
    .required("Potwierdzenia hasła jest wymagane"),
});

const ResetPasswordForm = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const { userStore } = useStore();
  const { resetPassword } = userStore;

  const handleSubmit = async (
    values: ResetPasswordFormDto,
    { setSubmitting }: FormikHelpers<ResetPasswordFormDto>
  ) => {
    if (!token || !email) {
      toast.error("Nie podano tokena ani adresu e-mail.");
      setSubmitting(false);
      return;
    }

    const resetPasswordDto = {
      token,
      email,
      newPassword: values.password,
    };

    await resetPassword(resetPasswordDto);
  };
  return (
    <div className="flex items-center justify-center min-h-[70vh] bg-whiteNeutral">
      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0  ">
        <div className="flex flex-col justify-center p-8 md:p-14">
          <h1 className="flex justify-center text-2xl mb-4">
            Ustaw swoje nowe hasło
          </h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <CustomInput
                  type="password"
                  placeholder="Nowe hasło"
                  label="Hasło"
                  name="password"
                />
                <CustomInput
                  type="password"
                  placeholder="Potwierdź nowe hasło"
                  label="Potwierdź hasło"
                  name="confirmPassword"
                />
                <LoadingButton
                  type="submit"
                  disabled={isSubmitting}
                  className="w-[full] bg-[#F2C46D] text-black p-2 rounded-lg mb-6 hover:text-lightYellow hover:border-whiteNeutral mt-4 mx-auto"
                  title="Ustaw nowe hasło"
                />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
