import { FormEvent, useState } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import LoadingButton from "../button/LoadingButton";
import { StripeCardNumberElement } from "@stripe/stripe-js";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";

interface Props {
  raceId: number;
  distanceId: number;
  price: number;
}

export default observer(function CheckoutForm({
  raceId,
  distanceId,
  price,
}: Props) {
  const stripe = useStripe();
  const elements = useElements();
  const {
    distanceStore: { registerAttendeeWithPayment },
  } = useStore();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!stripe || !elements || !distanceId) {
      setErrorMessage("Nieprawidłowe dane do płatności");
      return;
    }

    const cardElement = elements.getElement(CardNumberElement);
    const { token, error } = await stripe.createToken(
      cardElement as StripeCardNumberElement
    );

    if (error) {
      setErrorMessage(error.message!);
      return;
    }

    setLoading(true);
    await registerAttendeeWithPayment(raceId, distanceId, token.id, price);
    setLoading(false);
  };

  return (
    <div className="relative mt-10 px-4 max-w-lg mx-auto">
      <div className="bg-white px-8 py-6 rounded-lg shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label
              htmlFor="card-nr"
              id="card-nr"
              className="block text-md font-bold mb-1"
            >
              Numer karty
            </label>
            <CardNumberElement
              id="card-nr"
              className="text-sm text-deepBlack bg-white border border-darkGray rounded px-3 py-2"
            />
          </div>
          <div>
            <label
              htmlFor="card-exp"
              id="card-exp"
              className="block text-md font-bold mb-1"
            >
              Data ważności karty
            </label>
            <CardExpiryElement
              id="card-exp"
              className="text-sm text-deepBlack bg-white border border-darkGray rounded px-3 py-2"
            />
          </div>
          <div>
            <label
              htmlFor="card-cvc"
              id="card-cvc"
              className="block text-md font-bold mb-1"
            >
              CVC
            </label>
            <CardCvcElement
              id="card-cvc"
              className="text-sm text-deepBlack bg-white border border-darkGray rounded px-3 py-2"
            />
          </div>
          {errorMessage && (
            <label className="error-message">{errorMessage}</label>
          )}
          <div className="flex items-center justify-between">
            <LoadingButton
              disabled={loading || !stripe}
              title={loading ? "Przetwarzanie..." : `Zapłać ${price} zł`}
              type="submit"
              className="flex items-center justify-center bg-lightYellow px-3 py-2 text-whiteNeutral rounded w-full text-center"
            />
          </div>
        </form>
      </div>
    </div>
  );
});
