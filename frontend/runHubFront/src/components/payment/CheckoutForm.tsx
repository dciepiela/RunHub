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
interface Props {
  raceId: number;
  distanceId: number;
  price: number;
}

export default function CheckoutForm({ raceId, distanceId, price }: Props) {
  const stripe = useStripe();
  const elements = useElements();
  const {
    raceStore: { registerAttendeeWithPayment },
  } = useStore();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!stripe || !elements) {
      setErrorMessage("Stripe has not loaded yet.");
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
              className="block text-sm font-medium mb-1"
            >
              Card Number
            </label>
            <CardNumberElement
              id="card-nr"
              className="text-sm text-gry-600 bg-white border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label
              htmlFor="card-exp"
              id="card-exp"
              className="block text-sm font-medium mb-1"
            >
              Card Number
            </label>
            <CardExpiryElement
              id="card-exp"
              className="text-sm text-gry-600 bg-white border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label
              htmlFor="card-cvc"
              id="card-cvc"
              className="block text-sm font-medium mb-1"
            >
              Card CVC
            </label>
            <CardCvcElement
              id="card-cvc"
              className="text-sm text-gry-600 bg-white border border-gray-300 rounded px-3 py-2"
            />
          </div>
          {errorMessage && (
            <label className="my-2 text-xs text-red-500">{errorMessage}</label>
          )}
          <div className="flex items-center justify-between">
            <LoadingButton
              disabled={loading || !stripe}
              title={loading ? "Przetwarzanie..." : "Zapłać teraz"}
              type="submit"
              className="flex items-center justify-center bg-lightYellow px-3 py-2 text-white rounded w-full text-center"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
