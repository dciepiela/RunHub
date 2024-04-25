import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useNavigate, useParams } from "react-router-dom";
import { useStore } from "../../../../app/stores/store";
import * as Yup from "yup";
import { toast } from "react-toastify";
import CustomInput from "../../../../components/formik/CustomInput";
import CustomDateInput from "../../../../components/formik/CustomDateInput";
import CustomSelect from "../../../../components/formik/CustomSelect";
import { Button } from "flowbite-react";

export default observer(function AddAttendanceManually() {
  const navigate = useNavigate();
  const { raceId, distanceId } = useParams();
  const { distanceStore } = useStore();
  const { manualRegister } = distanceStore;

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Imię jest wymagane"),
    lastName: Yup.string().required("Nazwisko jest wymagane"),
    club: Yup.string(),
    dateOfBirth: Yup.date().required("Data urodzenia jest wymagana"),
    gender: Yup.string()
      .oneOf(["M", "K"], "Niepoprawna wartość")
      .required("Płeć jest wymagana"),
  });

  const genderOptions = [
    { value: "", text: "Wybierz płeć" },
    { value: "M", text: "Mężczyzna" },
    { value: "K", text: "Kobieta" },
  ];

  return (
    <div className="mx-auto max-w-[1240px] mt-[100px]">
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          club: "",
          dateOfBirth: "",
          gender: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            await manualRegister(Number(raceId), Number(distanceId), values);
            toast.success("Dodano pomyślnie zawodnika");
            resetForm();
          } catch (error) {
            toast.error("Nieudana rejestracja na zawody");
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div>
              <CustomInput
                className="block text-sm font-medium text-gray-700"
                label="Imię"
                name="firstName"
              />
            </div>

            <div>
              <CustomInput
                className="block text-sm font-medium text-gray-700"
                label="Nazwisko"
                name="lastName"
              />
            </div>

            <div>
              <CustomInput
                className="block text-sm font-medium text-gray-700"
                label="Klub"
                name="club"
              />
            </div>

            <div>
              <CustomDateInput label="Data urodzenia" name="dateOfBirth" />
            </div>

            <div>
              <CustomSelect
                label="Płeć"
                name="gender"
                options={genderOptions}
              />
            </div>

            <div>
              <Button
                type="submit"
                color="success"
                disabled={isSubmitting}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md"
              >
                {isSubmitting ? "Dodawanie zawodnika..." : "Dodaj"}
              </Button>
            </div>
            <Button
              type="button"
              onClick={() => navigate(-1)}
              color="failure"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md "
            >
              Wróć
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
});
