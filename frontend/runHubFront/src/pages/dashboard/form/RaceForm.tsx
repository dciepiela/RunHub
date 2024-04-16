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

const CreateRaceForm = () => {
  const { raceStore } = useStore(); // Initialize RaceStore
  const { createRace, updateRace, loadRace, updateDistance, updateSponsor } =
    raceStore;

  const navigate = useNavigate();
  const { raceId } = useParams();

  const [race, setRace] = useState<RaceFormValues>(new RaceFormValues());
  const [expandedDistanceId, setExpandedDistanceId] = useState(null); // To track which distance is expanded
  const [expandedSponsorId, setExpandedSponsorId] = useState(null); // To track which sponsor is expanded

  useEffect(() => {
    if (raceId) {
      loadRace(parseInt(raceId)).then((loadedRace) =>
        setRace(new RaceFormValues(loadedRace))
      );
    }
  }, [raceId, loadRace]);

  // function handleFormSubmit(race: RaceFormValues) {
  //   if (!race.raceId) {
  //     createRace(race).then(() => {
  //       navigate(`/races/${race.raceId}`);
  //     });
  //   } else {
  //     updateRace(race).then(() => {
  //       navigate(`/races/${race.raceId}`);
  //     });
  //   }
  // }

  const handleFormSubmit = async (values) => {
    if (!values.raceId) {
      await createRace(values).then((newRaceId) => {
        navigate(`/races/${newRaceId}`);
      });
    } else {
      // If raceId exists, it's an update to an existing race
      await updateRace(values);
      navigate(`/races/${values.raceId}`);
    }
  };

  // const handleUpdateDistance = (values, distance, index) => {
  //   const distanceData = values.distances[index];
  //   const raceId = values.raceId; // Assuming this is already populated
  //   const distanceId = distance.distanceId; // Make sure this is defined for existing distances

  //   if (raceId && distanceId) {
  //     raceStore
  //       .updateDistance(raceId, distanceId, distanceData)
  //       .then(() => {
  //         console.log("Distance updated");
  //         // You may want to refresh the race data here or handle UI feedback
  //       })
  //       .catch((error) => {
  //         console.error("Error updating distance", error);
  //         // Handle error (e.g., show an error message)
  //       });
  //   }
  // };

  const handleUpdateDistance = async (raceId, distanceId, distanceData) => {
    await updateDistance(raceId, distanceId, distanceData);
    alert("Distance updated successfully"); // Add proper UI feedback instead of alert
  };

  const handleUpdateSponsor = async (raceId, sponsorId, sponsorData) => {
    await updateSponsor(raceId, sponsorId, sponsorData);
    alert("Distance updated successfully"); // Add proper UI feedback instead of alert
  };

  const toggleDistanceExpansion = (distanceId) => {
    setExpandedDistanceId(
      expandedDistanceId === distanceId ? null : distanceId
    );
  };

  const toggleSponsorExpansion = (sponsorId) => {
    setExpandedSponsorId(expandedSponsorId === sponsorId ? null : sponsorId);
  };
  return (
    <div className="w-full">
      <Formik
        initialValues={race}
        validationSchema={raceValidationSchema}
        enableReinitialize
        onSubmit={handleFormSubmit}
      >
        {({ values, isSubmitting, setFieldValue }) => (
          <Form className="ml-[250px] max-w-[full] p-6 bg-white rounded-lg shadow-md grid">
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
                      label="Data rozpoczęcia biegu"
                      name="startDateRace"
                    />
                  </div>

                  <div className="mb-4">
                    <CustomDateTimeInput
                      label="Data zakończenia biegu"
                      name="endDateRace"
                    />
                  </div>

                  <div className="mb-4">
                    <CustomDateTimeInput
                      label="Koniec rejestracji"
                      name="registrationEndDate"
                    />
                  </div>
                </div>
              </div>

              {/* Race Details - Column 3 */}
              <div>
                <div className="mb-4">
                  <CustomInput label="Zdjęcie" name="image" type="text" />
                </div>
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
              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    label="Państwo"
                    name="addressDto.country"
                    type="text"
                    placeholder="Wprowadź kraj wydarzenia"
                  />
                </div>

                <div className="mb-4">
                  <CustomInput
                    label="Kod pocztowy"
                    name="addressDto.postalCode"
                    type="text"
                    placeholder="Wprowadź kod pocztowy wydarzenia"
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
                      {distance.distanceId ? (
                        <>
                          <button
                            type="button"
                            onClick={() =>
                              toggleDistanceExpansion(distance.distanceId)
                            }
                            className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded inline-flex items-center"
                          >
                            {distance.name} (Toggle Details)
                          </button>
                          {expandedDistanceId === distance.distanceId && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 mt-2 bg-gray-100 rounded">
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
                              <div className="flex justify-center items-center">
                                <button
                                  type="button"
                                  className="bg-lightYellow text-white font-bold py-2 px-4 rounded h-[40px]"
                                  onClick={() =>
                                    handleUpdateDistance(
                                      values.raceId,
                                      distance.distanceId,
                                      values.distances[index]
                                    )
                                  }
                                >
                                  Aktualizuj dystans
                                </button>
                              </div>
                            </div>
                          )}
                        </>
                      ) : (
                        <>
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
                            <div className="flex justify-center items-center">
                              <button
                                type="button"
                                className="bg-lightYellow text-white font-bold py-2 px-4 rounded h-[40px]"
                                onClick={() =>
                                  handleUpdateDistance(
                                    values.raceId,
                                    distance.distanceId,
                                    values.distances[index]
                                  )
                                }
                              >
                                Aktualizuj dystans
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                  <button
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
                    className="bg-green-500 text-white px-4 py-2 rounded-md"
                  >
                    Dodaj dystans
                  </button>
                  {values.distances.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(values.distances.length - 1)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md"
                    >
                      Usuń dystans
                    </button>
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
                      {sponsor.sponsorId ? (
                        <>
                          <button
                            type="button"
                            onClick={() =>
                              toggleSponsorExpansion(sponsor.sponsorId)
                            }
                            className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded inline-flex items-center"
                          >
                            {sponsor.name} (Toggle Details)
                          </button>
                          {expandedSponsorId === sponsor.sponsorId && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 mt-2 bg-gray-100 rounded">
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
                              <div className="flex justify-center items-center">
                                <button
                                  type="button"
                                  className="bg-lightYellow text-white font-bold py-2 px-4 rounded h-[40px]"
                                  onClick={() =>
                                    handleUpdateSponsor(
                                      values.raceId,
                                      sponsor.sponsorId,
                                      values.sponsors[index]
                                    )
                                  }
                                >
                                  Aktualizuj Sponsora
                                </button>
                              </div>
                            </div>
                          )}
                        </>
                      ) : (
                        <>
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
                        </>
                      )}
                    </div>
                  ))}
                  <button
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
                    className="bg-green-500 text-white px-4 py-2 rounded-md"
                  >
                    Dodaj sponsora
                  </button>
                  {values.sponsors.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(values.sponsors.length - 1)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md"
                    >
                      Usuń sponsora
                    </button>
                  )}
                </div>
              )}
            </FieldArray>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-8 bg-lightYellow text-white px-4 py-2 rounded-md"
            >
              Dodaj nowy bieg
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default observer(CreateRaceForm);
