import { Link, useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Logo from "../../assets/hero.jpg";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../../app/context/useAuth";
import { useForm } from "react-hook-form";
import { IoMdSquareOutline } from "react-icons/io";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaInfoCircle } from "react-icons/fa";

type LoginFormsInputs = {
  email: string;
  password: string;
};

const validation = Yup.object().shape({
  email: Yup.string().required("Adres e-mail jest wymagany"),
  password: Yup.string().required("Hasło jest wymagane"),
});

function Login() {
  // const handleSubmit = () => {
  //   const email = document.getElementById("email").value;
  //   const password = document.getElementById("pass").value;
  //   console.log("Email:", email);
  //   console.log("Password:", password);
  // };
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { loginUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormsInputs>({ resolver: yupResolver(validation) });

  const handleLogin = async (form: LoginFormsInputs) => {
    await loginUser(form);
    navigate(location.state?.from);
  };

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-whiteNeutral">
        <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
          {/* <!-- left side --> */}
          <div className="flex flex-col justify-center p-8 md:p-14">
            <span className="mb-3 text-4xl font-bold">Witaj ponownie</span>
            <span className="font-light text-gray-400 mb-8">
              Witaj ponownie! Proszę podaj swoje dane do logowania.
            </span>
            <form onSubmit={handleSubmit(handleLogin)}>
              <div className="py-4">
                <span className="mb-2 text-md">Adres e-mail</span>
                <input
                  type="text"
                  id="email"
                  placeholder="Wprowadź adres e-mail"
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                  {...register("email")}
                />
                {errors.email ? (
                  <div
                    className="flex items-center p-4  text-sm rounded-lg dark:bg-red-100 dark:text-red-500"
                    role="alert"
                  >
                    <FaInfoCircle className="mr-2" />
                    <div>
                      <span className="font-medium">
                        {errors.email.message}
                      </span>
                    </div>
                  </div>
                ) : (
                  ""
                )}{" "}
              </div>
              <div className="">
                <span className="mb-2 text-md">Hasło</span>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="pass"
                    placeholder="********"
                    className="w-full p-2 border border-gray-300 rounded-md placeholder-font-light placeholder-text-gray-500"
                    {...register("password")}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 grid place-content-center px-4 cursor-pointer"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                {errors.password ? (
                  <div
                    className="flex items-center p-4 mb-4 text-sm rounded-lg dark:bg-red-100 dark:text-red-500"
                    role="alert"
                  >
                    <FaInfoCircle className="mr-2" />
                    <div>
                      <span className="font-medium">
                        {errors.password.message}
                      </span>
                    </div>
                  </div>
                ) : (
                  ""
                )}{" "}
              </div>
              <div className="flex justify-between w-full py-4">
                <div className="mr-24">
                  <input type="checkbox" name="ch" id="ch" className="mr-2" />
                  <span className="text-md">Zapamiętaj</span>
                </div>
                <span className="font-bold text-md">Zapomniałeś hasła?</span>
              </div>
              <button
                type="submit"
                className="w-full bg-[#F2C46D] text-black p-2 rounded-lg mb-6 hover:text-lightYellow hover:border-whiteNeutral"
              >
                Zaloguj się
              </button>
              <button className="w-full border border-whiteNeutral text-md p-2 rounded-lg mb-6 hover:bg-whiteNeutral hover:text-lightYellow">
                <FcGoogle className="w-6 h-6 inline mr-2" />
                Zaloguj się z Google
              </button>
              <div className="text-center text-gray-400">
                Nie masz jeszcze konta?{" "}
                <span className="font-bold text-black">
                  <Link to="/registerCompetitor">
                    Dołącz do nas całkowiecie za darmo!
                  </Link>
                </span>
              </div>
            </form>
          </div>

          {/* <!-- right side --> */}
          <div className="relative">
            <img
              src={Logo}
              alt="img"
              className="w-[450px] h-full hidden rounded-r-2xl md:block object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
