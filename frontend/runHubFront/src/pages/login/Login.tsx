import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useStore } from "../../app/stores/store";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Logo from "../../assets/hero.jpg";
import CustomInput from "../../components/formik/CustomInput";
import { UserFormLogin } from "../../app/models/user";
import LoadingButton from "../../components/button/LoadingButton";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .required("Adres e-mail jest wymagany")
    .email("Nieprawidłowy adres email"),
  password: Yup.string().required("Hasło jest wymagane"),
});

export default function Login() {
  const { userStore } = useStore();
  const { login } = userStore;
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (values: UserFormLogin) => {
    await login(values);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-whiteNeutral">
      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 mt-24 md:mt-36">
        <div className="flex flex-col justify-center p-8 md:p-14">
          <h1 className="mb-3 text-4xl font-bold">Witaj ponownie</h1>
          <p className="font-light text-gray-400 mb-8">
            Witaj ponownie! Proszę podaj swoje dane do logowania.
          </p>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="py-4">
                  <CustomInput
                    name="email"
                    label="Adres e-mail"
                    type="email"
                    placeholder="Wprowadź adres e-mail"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="py-4">
                  <CustomInput
                    name="password"
                    label="Hasło"
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 grid place-content-center px-4 cursor-pointer"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                <div className="flex justify-between w-full py-4">
                  <Link to="/forgot-password" className="font-bold text-md">
                    Przypomnij hasło
                  </Link>
                </div>
                <LoadingButton
                  loading={isSubmitting}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#F2C46D] text-black p-2 rounded-lg mb-6 hover:text-lightYellow hover:border-whiteNeutral"
                  title="Zaloguj się"
                />
                <div className="text-center text-gray-400">
                  Nie masz jeszcze konta?{" "}
                  <Link
                    to="/registerCompetitor"
                    className="font-bold text-black"
                  >
                    Dołącz do nas całkowiecie za darmo!
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <div className="relative">
          <img
            src={Logo}
            alt="img"
            className="w-[450px] h-full hidden rounded-r-2xl md:block object-cover"
          />
        </div>
      </div>
    </div>
  );
}
