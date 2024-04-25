import { Formik, Form, FieldArray } from "formik";
import { observer } from "mobx-react-lite";
import "./CreateRaceForm.css"; // Import the CSS file
import { useStore } from "../../../app/stores/store";
import { raceValidationSchema } from "./raceFormSchema";
import CustomInput from "../../../components/formik/CustomInput";
import CustomTextarea from "../../../components/formik/CustomTextarea";
import CustomDateTimeInput from "../../../components/formik/CustomDateTimeInput";
import CustomSelect from "../../../components/formik/CustomSelect";
import {
  RaceFormValues,
  raceStatusOptions,
  raceTypeOptions,
} from "../../../app/models/race";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "flowbite-react";
import { toast } from "react-toastify";

export default observer(function CreateRaceForm() {
  const { raceStore } = useStore();
  const { createRace, loadRace } = raceStore;

  const navigate = useNavigate();
  const { raceId } = useParams();

  const [race, setRace] = useState<RaceFormValues>(new RaceFormValues());

  useEffect(() => {
    if (raceId) {
      loadRace(parseInt(raceId)).then((loadedRace) =>
        setRace(new RaceFormValues(loadedRace))
      );
    }
  }, [raceId, loadRace]);

  const handleFormSubmit = async (values: any) => {
    try {
      const savedRace = await createRace(values); // Assume createRace returns the saved race with an ID
      toast.success("Bieg został utworzony!");
      navigate(`/admin/dashboard/photoUpload/${savedRace}`); // Navigate to photo upload with raceId
    } catch (error) {
      toast.error("Problem z utworzeniem biegu!");
    }
  };

  return (
    <div className="w-full mx-auto">
      <Formik
        initialValues={race}
        validationSchema={raceValidationSchema}
        enableReinitialize
        onSubmit={handleFormSubmit}
      >
        {({ values, isSubmitting }) => (
          <Form className="md:ml-[250px] max-w-[full] p-6 bg-white rounded-lg shadow-md grid">
            {/* Race Details */}
            <h1 className="mb-5 text-center text-3xl font-bold">
              Informacje o biegu
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Race Details - Column 1 */}
              <div className="col-span-1">
                <div className="mb-4">
                  <CustomInput
                    label="Nazwa"
                    name="name"
                    type="text"
                    placeholder="Wprowadź nazwę biegu"
                  />
                </div>

                <div className="mb-4">
                  <CustomTextarea
                    label="Opis biegu"
                    name="description"
                    placeholder="Wprowadź opis biegu"
                    rows={8}
                  />
                </div>
              </div>

              {/* Race Details - Column 2 */}

              <div className="col-span-1">
                <div className="mb-4">
                  <div className="mb-4">
                    <CustomDateTimeInput
                      labelText="Data początku biegu"
                      placeholderText="Początek biegu"
                      name="startDateRace"
                      showTimeSelect
                      timeCaption="time"
                      dateFormat="MMMM d, yyyy HH:mm"
                    />
                  </div>

                  <div className="mb-4">
                    <CustomDateTimeInput
                      labelText="Data końca biegu"
                      placeholderText="Zakończenie biegu"
                      name="endDateRace"
                      showTimeSelect
                      timeCaption="time"
                      dateFormat="MMMM d, yyyy HH:mm"
                    />
                  </div>

                  <div className="mb-4">
                    <CustomDateTimeInput
                      labelText="Koniec zapisów"
                      placeholderText="Koniec zapisów"
                      name="registrationEndDate"
                      showTimeSelect
                      timeIntervals={15}
                      timeCaption="time"
                      dateFormat="MMMM d, yyyy HH:mm"
                    />
                  </div>
                </div>
              </div>

              {/* Race Details - Column 3 */}
              <div className="col-span-1">
                <div className="mb-4">
                  <CustomSelect
                    label="Status biegu"
                    name="raceStatus"
                    options={raceStatusOptions}
                  />
                </div>

                <div className="mb-4">
                  <CustomSelect
                    label="Rodzaj biegu"
                    name="raceType"
                    options={raceTypeOptions}
                  />
                </div>
              </div>
            </div>

            {/* Address Details */}
            <div>
              <h1 className="mt-10 text-center text-3xl font-bold">
                Adres biegu
              </h1>
              <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="mb-4">
                  <CustomInput
                    label="Miejscowość"
                    name="addressDto.city"
                    type="text"
                    placeholder="Wprowadź miejscowość wydarzenia"
                  />
                </div>

                <div className="mb-4">
                  <CustomInput
                    label="Ulica"
                    name="addressDto.street"
                    type="text"
                    placeholder="Wprowadź ulicę wydarzenia"
                  />
                </div>

                <div className="mb-4">
                  <CustomInput
                    label="Kod pocztowy"
                    name="addressDto.postalCode"
                    type="text"
                    placeholder="Wprowadź kod pocztowy wydarzenia"
                    maxLength={6}
                  />
                </div>
              </div>
            </div>

            {/* Distance Details */}
            <FieldArray name="distances">
              {({ insert, remove }) => (
                <div>
                  <h1 className="mt-10 mb-5 text-center text-2xl font-bold">
                    Informacje o dystansach
                  </h1>
                  {values.distances.map((distance, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
                    >
                      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 mt-2 bg-gray-100 rounded"> */}
                      <div>
                        <CustomInput
                          label="Nazwa dystansu"
                          name={`distances.${index}.name`}
                          type="text"
                          placeholder="Wprowadź nazwę dystansu"
                        />
                      </div>
                      <div>
                        <CustomInput
                          label="Długość dystansu"
                          name={`distances.${index}.lengthInKilometers`}
                          type="text"
                          placeholder="Wprowadź długość (km) dystansu"
                        />
                      </div>
                      <div>
                        <CustomInput
                          label="Dostępne miejsca"
                          name={`distances.${index}.availableSlots`}
                          type="number"
                          placeholder="Wprowadź liczbę dostępnych miejsc"
                        />
                      </div>

                      <div>
                        <CustomInput
                          label="Ilosć wszystkich slotów"
                          name={`distances.${index}.totalSlots`}
                          type="number"
                          placeholder="Wprowadź liczbę wszystkich slotów"
                        />
                      </div>
                      <div>
                        <CustomInput
                          label="Cena"
                          name={`distances.${index}.price`}
                          type="text"
                          placeholder="Wprowadź cenę dla dystansu"
                        />
                      </div>
                      <div>
                        <CustomTextarea
                          label="Opis dystansu"
                          name={`distances.${index}.description`}
                          placeholder="Wprowadź krótki opis dystansu"
                          rows={4}
                        />
                      </div>
                    </div>
                  ))}
                  {values.distances.length < 2 && (
                    <Button
                      type="button"
                      onClick={() =>
                        insert(values.distances.length, {
                          name: "",
                          lengthInKilometers: 0,
                          description: "",
                          availableSlots: 0,
                          totalSlots: 0,
                          price: 0,
                        })
                      }
                      color="success"
                      className="mb-2"
                    >
                      Dodaj dystans
                    </Button>
                  )}
                  {/* Pozwól na usuwanie dystansów tylko jeśli jest ich więcej niż jeden */}
                  {values.distances.length > 1 && (
                    <Button
                      type="button"
                      onClick={() => remove(values.distances.length - 1)}
                      color="failure"
                    >
                      Usuń dystans
                    </Button>
                  )}
                </div>
              )}
            </FieldArray>

            {/* Sponsor Details */}
            <FieldArray name="sponsors">
              {({ insert, remove }) => (
                <div>
                  <h1 className="mt-10 mb-5 text-center text-2xl font-bold">
                    Informacje o sponsorach
                  </h1>
                  {values.sponsors.map((sponsor, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
                    >
                      <div>
                        <CustomInput
                          label="Nazwa sponsora"
                          name={`sponsors.${index}.name`}
                          type="text"
                          placeholder="Wprowadź nazwę sponsora"
                        />
                      </div>

                      <div>
                        <CustomInput
                          label="Logo"
                          name={`sponsors.${index}.logo`}
                          type="text"
                          placeholder="Wprowadź logo sponsora"
                        />
                      </div>

                      <div>
                        <CustomInput
                          label="Strona www sponsora"
                          name={`sponsors.${index}.webPageUrl`}
                          type="text"
                          placeholder="Wprowadź stronę WWW sponsora"
                        />
                      </div>

                      <div>
                        <CustomInput
                          label="Kwota wsparcia"
                          name={`sponsors.${index}.amount`}
                          type="text"
                          placeholder="Wprowadź kwotę sponsora"
                        />
                      </div>

                      <div>
                        <CustomInput
                          label="Rodzaj wsparcia"
                          name={`sponsors.${index}.supportType`}
                          type="text"
                          placeholder="Wprowadź rodzaj wsparcia"
                        />
                      </div>
                      <div>
                        <CustomTextarea
                          label="Opis sponsora"
                          name={`sponsors.${index}.description`}
                          rows={4}
                          placeholder="Wprowadź krótki opis sponsora"
                        />
                      </div>
                    </div>
                  ))}
                  <Button
                    type="button"
                    onClick={() =>
                      insert(values.sponsors.length, {
                        sponsorId: 0,
                        name: "",
                        logo: "",
                        description: "",
                        webPageUrl: "",
                        amount: 0,
                        supportType: "",
                      })
                    }
                    color="success"
                    className="mb-2"
                  >
                    Dodaj sponsora
                  </Button>
                  {values.sponsors.length > 1 && (
                    <Button
                      type="button"
                      onClick={() => remove(values.sponsors.length - 1)}
                      color="failure"
                    >
                      Usuń sponsora
                    </Button>
                  )}
                </div>
              )}
            </FieldArray>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="mt-8 px-4 py-2 rounded-md"
              color="success"
            >
              Dodaj nowy bieg
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
});
