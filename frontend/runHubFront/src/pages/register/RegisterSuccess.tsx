import { toast } from "react-toastify";
import agent from "../../app/api/agent";
import useQuery from "../../app/util/hook";

export default function RegisterSuccess() {
  const email = useQuery().get("email") as string;

  function handleConfirmEmailResend() {
    agent.Account.resendEmailConfirm(email)
      .then(() => {
        toast.success(
          "Link do weryfikacji adresu e-mail został wysłany - proszę sprawdź swoją skrzynkę"
        );
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="mt-16 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 gap-8">
        <h1 className="text-3xl text-deepBlack uppercase pt-10 pb-5 text-center">
          Rejestracja przebiegła pomyślnie
        </h1>
        <p className="text-sm sm:text-lg text-darkGray">
          Proszę sprawdź swoją skrzynkę pocztową
        </p>
        {email && (
          <>
            <p className="text-sm sm:text-lg text-deepBlack">
              Nie otrzymałeś maila?{" "}
              <span className="font-bold">
                Kliknij przycisk poniżej, aby ponownie wysłać link weryfikacyjny
              </span>
            </p>
            <button
              className="px-2 py-2 w-[50%] mx-auto"
              onClick={handleConfirmEmailResend}
            >
              Wyślij ponownie link
            </button>
          </>
        )}
      </div>
    </div>
  );
}
