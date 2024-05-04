import React, { useEffect, useState } from "react";
import useQuery from "../../app/util/hook";
import agent from "../../app/api/agent";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function ConfirmEmail() {
  const email = useQuery().get("email") as string;
  const token = useQuery().get("token") as string;

  const Status = {
    Verifying: "Zweryfikowany",
    Failed: "Błąd",
    Success: "Sukces",
  };

  const [status, setStatus] = useState(Status.Verifying);

  function handleConfirmEmailResend() {
    agent.Account.resendEmailConfirm(email)
      .then(() => {
        toast.success(
          "Link do weryfikacji adresu e-mail został wysłany - proszę sprawdź swoją skrzynkę"
        );
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    agent.Account.verifyEmail(token, email)
      .then(() => {
        setStatus(Status.Success);
      })
      .catch(() => {
        setStatus(Status.Failed);
      });
  }, [email, token, Status.Success, Status.Failed]);

  function getBody() {
    switch (status) {
      case Status.Verifying:
        return <p>Verifying...</p>;
      case Status.Failed:
        return (
          <div>
            <p className="text-sm sm:text-lg text-deepBlack">
              Weryfikacja nie powiodła się. Możesz spróbować ponownie wysłać
              link weryfikacyjny na swój adres e-mail
            </p>
            <button
              className="px-2 py-2 w-[50%] mx-auto"
              onClick={handleConfirmEmailResend}
            >
              Wyślij ponownie link weryfikacjyny
            </button>
          </div>
        );
      case Status.Success:
        return (
          <div>
            <p className="text-sm sm:text-lg text-deepBlack">
              Adres e-mail został zweryfikowany - możesz się zalogować
            </p>
            <Link
              to="/login"
              className="bg-lightYellow px-2 py-2 w-[50%] mx-auto"
            >
              Zaloguj się
            </Link>
          </div>
        );
    }
  }

  return (
    <div className="mt-16 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 gap-8">
        <h1 className="text-3xl text-deepBlack uppercase pt-10 pb-5 text-center">
          Weryfikacja adresu e-mail
        </h1>
        <div>{getBody()}</div>
      </div>
    </div>
  );
}
