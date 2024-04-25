import { observer } from "mobx-react-lite";
import { useStore } from "../../../../app/stores/store";
import { Formik, Form } from "formik";
import { Button } from "flowbite-react";
import { DistanceDto, IDistanceDto } from "../../../../app/models/distance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "../../../../components/LoadingComponent";
import * as Yup from "yup";
import CustomInput from "../../../../components/formik/CustomInput";
import CustomTextarea from "../../../../components/formik/CustomTextarea";
import { useState } from "react";

interface Props {
  raceId: number;
  distanceId?: number;
}

export default observer(function DistanceEditForm({
  raceId,
  distanceId,
}: Props) {
  const navigate = useNavigate();
  const { distanceStore } = useStore();
  const { createDistance, updateDistance, distanceRegistry, loadingInitial } =
    distanceStore;

  const [formSubmitted, setFormSubmitted] = useState(false);

  const distance: IDistanceDto | undefined = distanceRegistry.get(distanceId!);

  const initialValues: IDistanceDto = {
    distanceId: distance?.distanceId ?? 0,
    name: distance?.name ?? "",
    description: distance?.description ?? "",
    lengthInKilometers: distance?.lengthInKilometers ?? 0,
    availableSlots: distance?.availableSlots ?? 0,
    totalSlots: distance?.totalSlots ?? 0,
    price: distance?.price ?? 0,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Pole nazwa jest wymagane"),
    description: Yup.string().required("Pole opis jest wymagane"),
    lengthInKilometers: Yup.number()
      .typeError("Niewłaściwy format liczby dla pola długość w kilometrach")
      .required("Pole długość w kilometrach jest wymagane"),
    availableSlots: Yup.number()
      .required("Pole dostępne miejsca jest wymagane")
      .min(0, "Dostępne miejsca nie mogą być mniejsze niż 0")
      .test(
        "available-slots",
        "Dostępne miejsca nie mogą być większe niż łączna liczba miejsc",
        function (value) {
          return value <= this.parent.totalSlots;
        }
      ),
    totalSlots: Yup.number().required(
      "Pole łączna liczba miejsc jest wymagane"
    ),
    price: Yup.number().required("Pole cena jest wymagane"),
  });

  if (loadingInitial) {
    return <LoadingComponent content="Ładowanie dystansów..." />;
  }

  return (
    <div className="sm:ml-24 md:w-[500px] lg:ml-0 lg:w-[1240px] mt-10">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
        {distance ? "Edytuj dystans" : "Utwórz dystans"}
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        // onSubmit={(values) => {
        //   updateDistance(Number(raceId), Number(distanceId), values);
        //   toast.success("Dystans został zaktualizowany pomyślnie!");
        // }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          const action = distance
            ? updateDistance(raceId, values.distanceId!, values)
            : createDistance(raceId, values as DistanceDto);

          action
            .then(() => {
              toast.success(
                `Dystans został ${
                  distance ? "zaktualizowany" : "utworzony"
                } pomyślnie!`
              );
              setFormSubmitted(true);

              // If in create mode, navigate back after creating the distance
              if (!distance) {
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
          <Form className="space-y-2">
            <CustomInput
              name="name"
              placeholder="Nazwa dystansu"
              label="Nazwa dystansu"
            />

            <div>
              <CustomTextarea
                name="description"
                placeholder="Opis"
                label="Krótki opis dystansu"
              />
            </div>

            <div>
              <CustomInput
                type="number"
                name="lengthInKilometers"
                placeholder="Długość dystansu (km)"
                label="Długość w kilometrach"
              />
            </div>

            <div>
              <CustomInput
                type="number"
                name="availableSlots"
                placeholder="Dostępne miejsca"
                label="Dostępne miejsca"
              />
            </div>

            <div>
              <CustomInput
                name="totalSlots"
                type="number"
                placeholder="Łączna liczba miejsc"
                label="Łączna liczba miejsc"
              />
            </div>
            <div>
              <CustomInput
                name="price"
                type="number"
                placeholder="Cena"
                label="Cena"
              />
            </div>

            <Button
              type="submit"
              color="success"
              disabled={isSubmitting || !dirty || formSubmitted}
              className="w-full text-white py-2 rounded-md transition duration-200"
            >
              {distance ? "Zapisz zmiany" : "Utwórz dystans"}
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
