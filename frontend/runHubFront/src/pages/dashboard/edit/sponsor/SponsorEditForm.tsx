import { useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../../app/stores/store";
import { Formik, Form } from "formik";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "../../../../components/LoadingComponent";
import { toast } from "react-toastify";
import CustomInput from "../../../../components/formik/CustomInput";
import CustomTextarea from "../../../../components/formik/CustomTextarea";
import * as Yup from "yup";
import { ISponsorDto } from "../../../../app/models/sponsor";

interface Props {
  raceId: number;
  sponsorId?: number;
}

export default observer(function SponsorEditForm({ raceId, sponsorId }: Props) {
  const navigate = useNavigate(); // Use the useNavigate hook

  const { sponsorStore } = useStore();
  const { createSponsor, updateSponsor, sponsorRegistry, loadingInitial } =
    sponsorStore;

  const [formSubmitted, setFormSubmitted] = useState(false);

  const sponsor: ISponsorDto | undefined = sponsorRegistry.get(sponsorId!);

  const initialValues: ISponsorDto = {
    sponsorId: sponsor?.sponsorId ?? 0,
    name: sponsor?.name ?? "",
    logo: sponsor?.logo ?? "",
    description: sponsor?.description ?? "",
    webPageUrl: sponsor?.webPageUrl ?? "",
    amount: sponsor?.amount ?? 0,
    supportType: sponsor?.supportType ?? "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Nazwa sponsora jest wymagana"),
    logo: Yup.string()
      // .url("Wprowadź poprawny URL")
      .required("URL logo sponsora jest wymagany"),
    webPageUrl: Yup.string().required("Strona www sponsora jest wymagana"),
    amount: Yup.number()
      .typeError("Kwota wsparcia musi być liczbą")
      .required("Kwota wsparcia jest wymagana")
      .positive("Kwota wsparcia musi być liczbą dodatnią"),
    supportType: Yup.string().required("Rodzaj wsparcia jest wymagany"),
    description: Yup.string().max(50, "Opis nie może przekroczyć 50 znaków"),
  });

  if (loadingInitial) {
    return <LoadingComponent content="Ładowanie sponsorów..." />;
  }

  return (
    <div className="sm:ml-24 md:w-[500px] lg:ml-0 lg:w-[1240px] mt-10">
      <h2 className="text-2xl font-semibold text-center text-deepBlack mb-6">
        {sponsor ? "Edytuj dystans" : "Utwórz dystans"}
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          const action = sponsor
            ? updateSponsor(raceId, values.sponsorId!, values)
            : createSponsor(raceId, values as ISponsorDto);

          action
            .then(() => {
              toast.success(
                `Dystans został ${
                  sponsor ? "zaktualizowany" : "utworzony"
                } pomyślnie!`
              );
              setFormSubmitted(true);

              // If in create mode, navigate back after creating the distance
              if (!sponsor) {
                navigate(-1);
              }
            })
            .catch((error) => {
              toast.error(`Error: ${error.message}`);
            })
            .finally(() => {
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting, dirty }) => (
          <Form className="space-y-4 text-black">
            <div>
              <CustomInput
                label="Nazwa sponsora"
                name="name"
                type="text"
                placeholder="Nazwa sponsora"
              />
            </div>
            <div>
              <CustomInput
                name="logo"
                type="text"
                placeholder="URL logo sponsora"
                label="Link do logo sponsora"
              />
            </div>
            <div>
              <CustomTextarea
                name="description"
                placeholder="Opis biegu"
                label="Krótki opis sponsora (max 50 znaków)"
              />
            </div>
            <div>
              <CustomInput
                name="webPageUrl"
                type="text"
                placeholder="Storna www sposnosra"
                label="Strona www sponsora"
              />
            </div>
            <div>
              <CustomInput
                name="amount"
                type="number"
                placeholder="Kwota wsparcia"
                label="Kwota wsparcia"
              />
            </div>
            <div>
              <CustomInput
                name="supportType"
                type="text"
                placeholder="Rodzaj wsparcia"
                label="Rodzaj wsparcia"
              />
            </div>
            <Button
              type="submit"
              color="success"
              disabled={isSubmitting || !dirty || formSubmitted}
              className="w-full text-white py-2 rounded-md transition duration-200"
            >
              {sponsor ? "Zapisz zmiany" : "Utwórz sponsora"}
            </Button>
            <Button
              type="button"
              color="failure"
              onClick={() => navigate(-1)}
              className="w-full text-white py-2 px-4 rounded"
            >
              Wróć
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
});
