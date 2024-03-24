import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";

interface PhoneNumberValidationProps {
  onPhoneNumberChange: (phoneNumber: string) => void;
}

function PhoneNumberValidation({
  onPhoneNumberChange,
}: PhoneNumberValidationProps) {
  const [phoneNumberState, setPhoneNumberState] = useState("");
  const [valid, setValid] = useState(true);

  const handleChange = (value: any) => {
    setPhoneNumberState(value);
    setValid(validatePhoneNumber(value));
    onPhoneNumberChange(value);
  };

  const validatePhoneNumber = (phoneNumber: any) => {
    const phoneNumberPattern = /^\d{11}$/;
    return phoneNumberPattern.test(phoneNumber);
  };
  return (
    <div>
      <label htmlFor="phoneNumber" className="block mb-1 ">
        Telefon kontaktowy
        <PhoneInput
          country={"pl"}
          value={phoneNumberState}
          onChange={handleChange}
          inputProps={{ required: true }}
          inputStyle={{
            width: "100%",
            borderRadius: "rounded",
          }}
        />
      </label>
      {!valid && <p className="text-red-600">Wprowadź poprawny numer</p>}
    </div>
  );
}
export default PhoneNumberValidation;
