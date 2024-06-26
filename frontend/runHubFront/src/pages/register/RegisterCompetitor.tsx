import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Resolver, useForm } from "react-hook-form";
import { UserFormRegister } from "../../app/models/user";
import ReactFlagsSelect from "react-flags-select";
import { useState } from "react";
import { getName } from "country-list";
import { LiaCitySolid } from "react-icons/lia";
import { MdOutlinePersonPin } from "react-icons/md";
import {
  FaInfoCircle,
  FaRegAddressCard,
  FaRegUser,
  FaRunning,
  FaStreetView,
} from "react-icons/fa";
import { CiFlag1, CiPhone, CiLogin } from "react-icons/ci";
import { BsCalendarDate, BsGenderMale } from "react-icons/bs";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineMail } from "react-icons/ai";
import "react-datepicker/dist/react-datepicker.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useStore } from "../../app/stores/store";

const validation = Yup.object().shape({
  username: Yup.string().required("Nazwa użytkownika jest wymagana"),
  email: Yup.string()
    .required("Adres e-mail jest wymagany")
    .email("Niepoprawny e-mail"),
  firstName: Yup.string().required("Imię jest wymagane"),
  lastName: Yup.string().required("Nazwisko jest wymagane"),
  gender: Yup.string().required("Płeć jest wymagana"),
  dateOfBirth: Yup.string().required("Data urodzenia jest wymagana"),
  contactNumber: Yup.string().required("Numer kontaktowy jest wymagany"),
  club: Yup.string(),
  password: Yup.string()
    .required("Hasło jest wymagane")
    .min(6, "Hasło musi zawierać minimum 6 znaków"),

  confirmPassword: Yup.string()
    .label("confirmPassword")
    .required("Potwierdzenie hasła jest wymagane")
    .oneOf([Yup.ref("password")], "Hasło musi być takie samo"),

  addressDto: Yup.object().shape({
    // city: Yup.string().required("City is required"),
    // postalCode: Yup.string().matches(/^\d{2}-\d{3}$/, "Niepoprawny format"),
    // country: Yup.string().required("Country is required"),
    // street: Yup.string().required("Street is required"),
  }),
});
function RegisterCompetitor() {
  const { userStore } = useStore();
  const { registerUser } = userStore;
  // const { registerUser } = useAuth();
  const [selectedCountry, setSelectedCountry] = useState("PL");
  // const [date, setDate] = useState<Date | null>(null);
  const [phone, setPhone] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormRegister>({
    resolver: yupResolver(validation) as Resolver<UserFormRegister | any>,
  });

  const handleRegister = (form: UserFormRegister) => {
    form.nationality = getName(selectedCountry);
    form.contactNumber = phone;
    console.log(form);
    registerUser(form, "Competitor");
  };

  const handlePostalCodeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value.replace(/\D/g, ""); // Usunięcie niecyfrowych znaków
    const formattedPostalCode = inputValue.replace(
      /^(\d{2})(\d{0,3})$/,
      "$1-$2"
    );

    setPostalCode(formattedPostalCode);
  };

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-whiteNeutral">
        <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:space-y-0 mt-24 md:mt-36 pb-10">
          <h1 className="text-3xl font-bold mt-6 text-center md:text-5xl text-lightYellow">
            Zarejestruj się jako zawodnik
          </h1>
          <form onSubmit={handleSubmit(handleRegister)}>
            <div className="flex flex-col justify-center pl-8 pr-8 lg:p-8 md:grid md:grid-cols-2 md:gap-6">
              {/* First column */}
              <div className="md:mt-8">
                <h2 className="text-2xl font-semibold mb-4 text-center md:text-left">
                  <CiLogin className="inline-block mb-1 mr-2" />
                  Dane logowania
                </h2>
                <div className="py-2">
                  <span className="mb-2 text-md">
                    <FaRegUser className="inline-block mb-1 mr-2" />
                    Nazwa użytkownika *
                  </span>
                  <input
                    type="text"
                    id="username"
                    placeholder="Podaj nazwe użytkownika"
                    className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                    {...register("username")}
                  />
                  {errors.username ? (
                    <div
                      className="flex items-center p-4 mb-4 text-sm rounded-lg dark:bg-red-100 dark:text-red-500"
                      role="alert"
                    >
                      <FaInfoCircle className="mr-2" />
                      <div>
                        <span className="font-medium">
                          {errors.username.message}
                        </span>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="py-2">
                  <span className="mb-2 text-md">
                    <AiOutlineMail className="inline-block mb-1 mr-2" />
                    Adres e-mail *
                  </span>
                  <input
                    type="text"
                    id="email"
                    placeholder="Podaj e-mail"
                    className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                    {...register("email")}
                  />
                  {errors.email ? (
                    <div
                      className="flex items-center p-4 mb-4 text-sm rounded-lg dark:bg-red-100 dark:text-red-500"
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
                  )}
                </div>

                <div className="py-2">
                  <span className="mb-2 text-md">
                    <RiLockPasswordLine className="inline-block mb-1 mr-2" />
                    Hasło *
                  </span>
                  <input
                    type="password"
                    id="password"
                    placeholder="Podaj hasło"
                    className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                    {...register("password")}
                  />
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
                  )}
                </div>

                <div className="py-2">
                  <span className="mb-2 text-md">
                    <RiLockPasswordLine className="inline-block mb-1 mr-2" />
                    Potwierdź hasło *
                  </span>
                  <input
                    type="password"
                    id="confirmPassword"
                    placeholder="Podaj ponownie hasło"
                    className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                    {...register("confirmPassword")}
                  />
                  {errors.confirmPassword ? (
                    <div
                      className="flex items-center p-4 mb-4 text-sm rounded-lg dark:bg-red-100 dark:text-red-500"
                      role="alert"
                    >
                      <FaInfoCircle className="mr-2" />
                      <div>
                        <span className="font-medium">
                          {errors.confirmPassword.message}
                        </span>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              {/* Second column */}

              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4 text-center md:text-left">
                  <MdOutlinePersonPin className="inline-block mb-1 mr-2" />
                  Dane podstawowe
                </h2>

                <div className="py-2">
                  <span className="mb-2 text-md">
                    <FaRegUser className="inline-block mb-1 mr-2" />
                    Imie *
                  </span>
                  <input
                    type="text"
                    id="firstName"
                    placeholder="Podaj imie"
                    className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                    {...register("firstName")}
                  />
                  {errors.firstName ? (
                    <div
                      className="flex items-center p-4 mb-4 text-sm rounded-lg dark:bg-red-100 dark:text-red-500"
                      role="alert"
                    >
                      <FaInfoCircle className="mr-2" />
                      <div>
                        <span className="font-medium">
                          {errors.firstName.message}
                        </span>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <div className="py-2">
                  <span className="mb-2 text-md">
                    <FaRegUser className="inline-block mb-1 mr-2" />
                    Nazwisko *
                  </span>
                  <input
                    type="text"
                    id="lastName"
                    placeholder="Podaj nazwisko"
                    className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                    {...register("lastName")}
                  />
                  {errors.lastName ? (
                    <div
                      className="flex items-center p-4 mb-4 text-sm rounded-lg dark:bg-red-100 dark:text-red-500"
                      role="alert"
                    >
                      <FaInfoCircle className="mr-2" />
                      <div>
                        <span className="font-medium">
                          {errors.lastName.message}
                        </span>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <div className="py-2">
                  <span className="mb-2 text-md">
                    <CiFlag1 className="inline-block mb-1 mr-2" />
                    Narodowość *
                  </span>
                  <ReactFlagsSelect
                    id="nationality"
                    customLabels={{ PL: "Polska" }}
                    selected={selectedCountry}
                    onSelect={(nationality) => {
                      setSelectedCountry(nationality); // Update selectedCountry directly
                    }}
                    placeholder="Wybierz kraj"
                    searchable
                    searchPlaceholder="Wyszukaj"
                    selectButtonClassName="h-[42px]"
                  />
                  {errors.nationality ? (
                    <div
                      className="flex items-center p-4 mb-4 text-sm rounded-lg dark:bg-red-100 dark:text-red-500"
                      role="alert"
                    >
                      <FaInfoCircle className="mr-2" />
                      <div>
                        <span className="font-medium">
                          {errors.nationality.message}
                        </span>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <div className="py-2">
                  <span className="mb-2 text-md">
                    <BsGenderMale className="inline-block mb-1 mr-2" />
                    Płeć *
                  </span>
                  <select
                    id="gender"
                    className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500 h-[42px]"
                    {...register("gender")}
                  >
                    <option value="">Wybierz płeć</option>
                    <option value="M">Mężczyzna</option>
                    <option value="K">Kobieta</option>
                  </select>
                  {errors.gender ? (
                    <div
                      className="flex items-center p-4 mb-4 text-sm rounded-lg dark:bg-red-100 dark:text-red-500"
                      role="alert"
                    >
                      <FaInfoCircle className="mr-2" />
                      <div>
                        <span className="font-medium">
                          {errors.gender.message}
                        </span>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <div className="py-2">
                  <span className="mb-2 text-md">
                    <BsCalendarDate className="inline-block mb-1 mr-2" />
                    Data urodzenia *
                  </span>
                  <input
                    type="date"
                    id="dateOfBirth"
                    className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                    placeholder="dd "
                    {...register("dateOfBirth")}
                  />
                  {/* <div className="w-full rounded-md">
                    <DatePicker
                      wrapperClassName="w-full"
                      id="dateOfBirth"
                      placeholderText="MM/DD/YYYY"
                      className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500 "
                      showPopperArrow={false}
                      selected={date}
                      showIcon
                      onChange={(date) => {
                        setDate(date!);
                        register("dateOfBirth", {
                          value: date!,
                        });
                      }}
                    />
                  </div> */}
                  {errors.dateOfBirth ? (
                    <div
                      className="flex items-center p-4 mb-4 text-sm rounded-lg dark:bg-red-100 dark:text-red-500"
                      role="alert"
                    >
                      <FaInfoCircle className="mr-2" />
                      <div>
                        <span className="font-medium">
                          {errors.dateOfBirth.message}
                        </span>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <div className="py-2">
                  <span className="mb-2 text-md">
                    <CiPhone className="inline-block mb-1 mr-2" />
                    Numer kontaktowy *
                  </span>
                  <PhoneInput
                    country={"pl"}
                    enableSearch={true}
                    searchPlaceholder="Wyszukaj kraj"
                    value={phone}
                    onChange={(phone) => {
                      setPhone(phone);
                      register("contactNumber", {
                        // required: "Pole numeru telefonu jest wymagane",
                        value: phone,
                      });
                    }}
                    inputStyle={{
                      width: "100%",
                      height: 42,
                    }}
                  />

                  {errors.contactNumber ? (
                    <div
                      className="flex items-center p-4 mb-4 text-sm rounded-lg dark:bg-red-100 dark:text-red-500"
                      role="alert"
                    >
                      <FaInfoCircle className="mr-2" />
                      <div>
                        <span className="font-medium">
                          {errors.contactNumber.message}
                        </span>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <div className="py-2">
                  <span className="mb-2 text-md">
                    <FaRunning className="inline-block mb-1 mr-2" />
                    Klub
                  </span>
                  <input
                    type="text"
                    id="club"
                    placeholder="Podaj do jakiego kluby należysz"
                    className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                    {...register("club")}
                  />
                </div>
              </div>

              {/* Third column */}
              <div className="col-span-2 mt-8">
                <h2 className="text-2xl font-semibold mb-4 text-center md:text-left">
                  <FaRegAddressCard className="inline-block mb-1 mr-2" />
                  Adres zamieszkania
                </h2>
                <div className="py-2">
                  <span className="mb-2 text-md">
                    <LiaCitySolid className="inline-block mb-1 mr-2" />
                    Miejscowość
                  </span>
                  <input
                    type="text"
                    id="city"
                    placeholder="Podaj miejsce zamieszkania"
                    className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                    {...register("addressDto.city")}
                  />
                </div>

                <div className="py-2">
                  <span className="mb-2 text-md">
                    <FaRegAddressCard className="inline-block mb-1 mr-2" />
                    Kod pocztowy (np. 00-000)
                  </span>
                  <input
                    type="text"
                    id="postalCode"
                    placeholder="Podaj kod pocztowy"
                    className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                    value={postalCode}
                    maxLength={6}
                    {...register("addressDto.postalCode")}
                    onChange={handlePostalCodeChange}
                  />
                  {errors.addressDto?.postalCode ? (
                    <div
                      className="flex items-center p-4 mb-4 text-sm rounded-lg dark:bg-red-100 dark:text-red-500"
                      role="alert"
                    >
                      <FaInfoCircle className="mr-2" />
                      <div>
                        <span className="font-medium">
                          {errors.addressDto.postalCode.message}
                        </span>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <div className="py-2">
                  <span className="mb-2 text-md">
                    <FaStreetView className="inline-block mb-1 mr-2" />
                    Ulica i numer
                  </span>
                  <input
                    type="text"
                    id="street"
                    placeholder="Podaj ulice oraz numer"
                    className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                    {...register("addressDto.street")}
                  />
                </div>
                {/* <div className="py-2">
                  <span className="mb-2 text-md">
                    <CiFlag1 className="inline-block mb-1 mr-2" />
                    Kraj
                  </span>
                  <input
                    type="text"
                    id="country"
                    placeholder="Podaj kraj"
                    className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                    {...register("addressDto.country")}
                  />
                </div> */}
              </div>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="mt-4 lg:mt-0 w-[50%] bg-[#F2C46D] text-black p-2 rounded-lg mb-6 hover:text-lightYellow hover:border-whiteNeutral"
              >
                Zarejestruj się
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterCompetitor;
