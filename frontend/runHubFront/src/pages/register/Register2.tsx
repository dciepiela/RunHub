/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import { getName } from "country-list";
import PhoneNumberValidation from "./PhoneNumberValidation";

interface LoginData {
  email: string;
  password: string;
  repeatPassword: string;
}

interface BasicData {
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: string;
}

interface ContactData {
  city: string;
  postalCode: string;
  street: string;
  nationality: string | undefined;
  phoneNumber: string;
}

function Register() {
  const [selected, setSelected] = useState("");

  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
    repeatPassword: "",
  });

  const [basicData, setBasicData] = useState<BasicData>({
    firstName: "",
    lastName: "",
    gender: "",
    birthDate: "",
  });

  const [contactData, setContactData] = useState<ContactData>({
    city: "",
    postalCode: "",
    street: "",
    nationality: "" || undefined,
    phoneNumber: "",
  });

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBasicChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setBasicData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleContactChange = (name: string, value: string) => {
    const postalCodeRegex = /^\d{0,2}(-\d{0,3})?$/; // Zmienione wyrażenie regularne
    // const phoneNumberRegex = /^\d{9}$/;

    // Sprawdź, czy wartość kodu pocztowego pasuje do formatu
    if (name === "postalCode" && !postalCodeRegex.test(value)) {
      // Jeśli nie pasuje do formatu, nie aktualizuj stanu i wyjdź z funkcji
      return;
    }

    // // Sprawdź, czy wartość numeru kontaktowego pasuje do formatu
    // if (name === "phoneNumber" && !phoneNumberRegex.test(value)) {
    //   // Jeśli nie pasuje do formatu, nie aktualizuj stanu i wyjdź z funkcji
    //   return;
    // }

    // Aktualizuj stan, jeśli wartość pasuje do formatu lub nie jest to pole postalCode ani phoneNumber
    setContactData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectCountry = (countryCode: string) => {
    setSelected(countryCode);
    // Przekazanie wybranego kraju do stanu lub dalszego przetwarzania
    const countryName = getName(countryCode);
    setContactData((prevData) => ({
      ...prevData,
      nationality: countryName,
    }));
    console.log("Wybrany kraj:", countryName); // Wyświetlanie wybranego kraju w konsoli
  };

  // //phone
  // const formatPhoneNumber = (value: string) => {
  //   // Sprawdź, czy wartość jest niepustym ciągiem
  //   if (!value) return value;

  //   // Usuń wszystkie znaki niebędące cyframi
  //   const phoneNumber = value.replace(/\D/g, "");

  //   // Sprawdź, czy numer telefonu ma długość co najmniej 3 cyfr
  //   if (phoneNumber.length >= 3) {
  //     // Zwróć sformatowany numer telefonu
  //     return phoneNumber.replace(/(\d{3})(\d{3})(\d{3})/, "$1-$2-$3");
  //   }

  //   // Zwróć pierwotną wartość, jeśli numer telefonu jest krótszy niż 3 cyfry
  //   return phoneNumber;
  // };

  // const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   // Pobierz wartość wprowadzoną do pola numeru telefonu
  //   const { value } = e.target;

  //   // Sformatuj numer telefonu
  //   const formattedPhoneNumber = formatPhoneNumber(value);

  //   // Aktualizuj stan komponentu
  //   setContactData((prevData) => ({
  //     ...prevData,
  //     phoneNumber: formattedPhoneNumber,
  //   }));
  // };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Do something with the form data, like sending it to the server
    console.log("Login Data:", loginData);
    console.log("Basic Data:", basicData);
    console.log("Contact Data:", contactData);
  };

  return (
    <div className=" flex items-center justify-center min-h-screen bg-whiteNeutral">
      <div className="max-w-[1280px] mx-auto mt-24 p-4 lg:grid lg:grid-cols-2 lg:gap-10">
        {/* Left Column: Login Data */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Dane logowania</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block mb-1">
                Adres e-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={loginData.email}
                onChange={handleLoginChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-1">
                Hasło
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label htmlFor="repeatPassword" className="block mb-1">
                Powtórz hasło
              </label>
              <input
                type="password"
                id="repeatPassword"
                name="repeatPassword"
                value={loginData.repeatPassword}
                onChange={handleLoginChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </form>
        </div>

        {/* Right Column: Basic Data */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Dane podstawowe</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="firstName" className="block mb-1">
                Imię
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={basicData.firstName}
                onChange={handleBasicChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block mb-1">
                Nazwisko
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={basicData.lastName}
                onChange={handleBasicChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label htmlFor="gender" className="block mb-1">
                Płeć
              </label>
              <select
                id="gender"
                name="gender"
                value={basicData.gender}
                onChange={handleBasicChange}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">-- wybierz --</option>
                <option value="male">Mężczyzna</option>
                <option value="female">Kobieta</option>
              </select>
            </div>
            <div>
              <label htmlFor="birthDate" className="block mb-1">
                Data urodzenia
              </label>
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                value={basicData.birthDate}
                onChange={handleBasicChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </form>
        </div>

        {/* Below both columns: Contact Data */}
        <div className="col-span-2 mt-8">
          <h2 className="text-2xl font-semibold mb-4">Dane kontaktowe</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="city" className="block mb-1">
                Miasto
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={contactData.city}
                onChange={(e) =>
                  handleContactChange(e.target.name, e.target.value)
                }
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label htmlFor="postalCode" className="block mb-1">
                Kod pocztowy (np. 00-000)
              </label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                placeholder="00-000"
                value={contactData.postalCode}
                onChange={(e) =>
                  handleContactChange(e.target.name, e.target.value)
                }
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label htmlFor="street" className="block mb-1">
                Ulica i numer
              </label>
              <input
                type="text"
                id="street"
                name="street"
                value={contactData.street}
                onChange={(e) =>
                  handleContactChange(e.target.name, e.target.value)
                }
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label htmlFor="country" className="block mb-1">
                Kraj
              </label>
              <ReactFlagsSelect
                selected={selected}
                onSelect={handleSelectCountry}
                placeholder="Wybierz kraj"
                searchable
                searchPlaceholder="Wyszukaj"
              />
            </div>
            <PhoneNumberValidation
              onPhoneNumberChange={(phoneNumber) =>
                setContactData((prevData) => ({ ...prevData, phoneNumber }))
              }
            />
            {/* <label htmlFor="phoneNumber" className="block mb-1">
                Telefon kontaktowy (np. 123456789)
              </label> */}
            {/* <PhoneInput
                defaultCountry="PL"
                placeholder="Enter phone number"
                value={value}
                onChange={setValue}
                className="w-full border rounded px-3 py-2"
              /> */}
            {/* <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={contactData.phoneNumber}
                onChange={handlePhoneNumberChange}
                maxLength={11}
                className="w-full border rounded px-3 py-2"
              /> */}
          </form>
        </div>
        {/* Below both columns: Contact Data */}
        <div className="col-span-2 flex justify-center">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* your contact data form inputs */}
            <button className="uppercase bg-[#F2C46D] w-[200px] rounded-md font-medium mb-4 py-3 mt-8 md:mt-0 text-[#0D0D0D]">
              Zarejestruj
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
