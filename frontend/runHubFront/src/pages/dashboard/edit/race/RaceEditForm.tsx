import { useEffect } from "react";
import { Formik, Form } from "formik";
import { useStore } from "../../../../app/stores/store";
import { Button } from "flowbite-react";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../../components/LoadingComponent";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CustomInput from "../../../../components/formik/CustomInput";
import * as Yup from "yup";
import CustomTextarea from "../../../../components/formik/CustomTextarea";
import CustomDateTimeInput from "../../../../components/formik/CustomDateTimeInput";
import CustomSelect from "../../../../components/formik/CustomSelect";
import {
  RaceFormValues,
  raceStatusOptions,
  raceTypeOptions,
} from "../../../../app/models/race";

interface Props {
  raceId: number;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Nazwa biegu jest wymagana"),
  description: Yup.string().required("Opis biegu jest wymagany"),
  registrationEndDate: Yup.date()
    .max(
      Yup.ref("startDateRace"),
      "Data zakończenia rejestracji musi być przed datą rozpoczęcia"
    )
    .min(new Date(), "Data zakończenia rejestracji nie może być z przeszłości")
    .required("Data zakończenia rejestracji jest wymagana"),
  startDateRace: Yup.date()
    .min(new Date(), "Data rozpoczęcia biegu nie może być z przeszłości")
    .required("Data rozpoczęcia biegu jest wymagana"),
  endDateRace: Yup.date()
    .min(
      Yup.ref("startDateRace"),
      "Data zakończenia biegu musi być późniejsza niż data rozpoczęcia"
    )
    .min(new Date(), "Data zakończenia biegu nie może być z przeszłości")
    .required("Data zakończenia biegu jest wymagana"),
});

export default observer(function RaceEditForm({ raceId }: Props) {
  const navigate = useNavigate();
  const { raceStore } = useStore();
  const { loadRace, updateRace, selectedRace } = raceStore;

  useEffect(() => {
    if (raceId) {
      loadRace(raceId);
    }
  }, [raceId, loadRace]);

  if (!selectedRace) return <LoadingComponent content="Ładowanie biegu" />;

  return (
    <div className="mt-10 mb-10 flex flex-col w-[55vw] lg:w-[80vw]">
      <h2 className="text-2xl font-semibold text-center text-deepBlack mb-6">
        Edytuj dane {selectedRace.name}
      </h2>
      <Formik
        initialValues={selectedRace}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={(values) => {
          updateRace(raceId, values as RaceFormValues).then(() => {
            toast.success("Zaaktualizowano dane biegu");
            navigate(-1);
          });
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4 text-black">
            <div>
              <CustomInput
                name="name"
                placeholder="Nazwa biegu"
                label="Nazwa biegu"
              />
            </div>
            <div>
              <CustomTextarea
                name="description"
                placeholder="Opis dystansu"
                label="Opis dystansu"
              />
            </div>
            <div>
              <CustomDateTimeInput
                labelText="Data końca zapisów"
                placeholderText="Koniec zapisów"
                name="registrationEndDate"
                showTimeSelect
                timeCaption="time"
                dateFormat="MMMM d, yyyy HH:mm"
              />
            </div>
            <div>
              <CustomDateTimeInput
                labelText="Data początku biegu"
                placeholderText="Początek biegu"
                name="startDateRace"
                showTimeSelect
                timeCaption="time"
                dateFormat="MMMM d, yyyy HH:mm"
              />
            </div>
            <div>
              <CustomDateTimeInput
                labelText="Data końca biegu"
                placeholderText="Zakończenie biegu"
                name="endDateRace"
                showTimeSelect
                timeCaption="time"
                dateFormat="MMMM d, yyyy HH:mm"
              />
            </div>
            <div>
              <CustomSelect
                name="raceStatus"
                label="Status biegu"
                options={raceStatusOptions}
              />
            </div>
            <div>
              <CustomSelect
                name="raceType"
                label="Rodzaj biegu"
                options={raceTypeOptions}
              />
            </div>

            <div className="flex justify-center ">
              <h1 className="text-xl font-bold">Lokalizacja</h1>
            </div>
            <div>
              <CustomInput
                name="addressDto.city"
                placeholder="Miasto"
                label="Miasto"
              />
            </div>

            <div>
              <CustomInput
                name="addressDto.street"
                placeholder="Ulica"
                label="Ulica"
              />
            </div>

            <div>
              <CustomInput
                name="addressDto.postalCode"
                placeholder="Kod pocztowy"
                label="Kod pocztowy"
              />
            </div>
            <Button
              type="submit"
              color="success"
              disabled={isSubmitting}
              className="w-full text-white py-2 rounded-md transition duration-200"
            >
              Zapisz zmiany
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
