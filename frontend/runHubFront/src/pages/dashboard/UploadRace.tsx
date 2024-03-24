import {
  Datepicker,
  DropdownProps,
  Label,
  Select,
  TextInput,
  Textarea,
} from "flowbite-react";
import React, { ChangeEvent, useEffect, useState } from "react";
import {
  RaceDto,
  raceStatusOptions,
  raceTypeOptions,
} from "../../app/models/race";
import raceService from "../../app/services/raceService";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import MyDateInput from "../../app/common/MyDate";

function UploadRace() {
  // const [selectedRaceType, setSelectedRaceType] = useState(raceType[0]);
  // const [selectedRaceStatus, setSelectedRaceStatus] = useState(raceStatus[0]);

  // const handleChangeSelectedRaceType = (
  //   event: React.FormEvent<HTMLSelectElement>
  // ) => {
  //   console.log(event.target.value);
  //   setSelectedRaceType(event.target.value);
  // };

  // const handleChangeSelectedRaceStatus = (event) => {
  //   console.log(event.target.value);
  //   setSelectedRaceStatus(event.target.value);
  // };

  // const handleRaceSubmit = (event) => {
  //   event.preventDefault();
  //   const form = event.target;
  //   const race = form.bookTitle.value;

  //   fetch("http://localhost:5000/race/edit")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       // console.log(data)
  //       alert("Book uploaded");
  //     });
  // };

  const { id } = useParams();
  const navigate = useNavigate();

  const [race, setRace] = useState<RaceDto>({
    raceId: undefined,
    name: "",
    description: "",
    registrationEndDate: undefined,
    startDateRace: undefined,
    endDateRace: undefined,
    image: "",
    raceStatus: undefined,
    raceType: undefined,
    addressDto: undefined,
  });

  useEffect(() => {
    if (id) {
      raceService.getRaceById(id).then((race) => {
        // race!.registrationEndDate = race!.endDateRace?.split("T")[0];
        // race!.startDateRace = race!.endDateRace?.split("T")[0];
        // race!.endDateRace = race!.endDateRace?.split("T")[0];
        // race!.creationDate = race!.endDateRace?.split("T")[0];
        // race!.lastUpdateDate = race!.endDateRace?.split("T")[0];

        setRace(race!);
      });
    }
  }, [id]);

  // function handleSubmit() {
  //   if (!race.raceId) {
  //     // raceService.createRace(race).then(() => {
  //     //   toast.success("Bieg został doday pomyślnie!");
  //     // });
  //     console.log(race);
  //   } else {
  //     raceService.editRace(race).then(() => navigate("/"));
  //   }
  // }

  function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Log the race object to the console
    console.log(race);

    // Optionally, you can submit the form data to the server here
    // For example, you can call raceService.createRace(race) if needed

    // Clear the form or perform any other necessary actions
  }
  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setRace({ ...race, [name]: value });

    // Split the name by dot to handle nested properties
    const [, nestedFieldName] = name.split(".");

    if (nestedFieldName) {
      // If nested property exists, update the nested state
      setRace(
        (prevRace) =>
          ({
            ...prevRace,
            addressDto: {
              ...prevRace.addressDto,
              [nestedFieldName]: value,
            },
          } as RaceDto)
      );
    } else {
      // Otherwise, update the top-level property
      setRace((prevRace) => ({
        ...prevRace,
        [name]: value,
      }));
    }
  }

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const { name, value } = event.target;
    setRace((prevRace) => ({
      ...prevRace,
      [name]: value,
    }));
  }

  function handleDateTimeChange(name: string, value: Date | Date[] | null) {
    if (value instanceof Date) {
      // Sprawdź, czy wartość jest pojedynczym obiektem Date
      // Ustaw datę w formacie zgodnym z Twoją bazą danych
      const formattedDate = value.toISOString();
      // Ustaw datę w stanie komponentu
      setRace((prevRace) => ({
        ...prevRace,
        [name]: formattedDate,
      }));
    } else {
      // W przypadku null lub tablicy dat, ustaw null w stanie komponentu
      setRace((prevRace) => ({
        ...prevRace,
        [name]: null,
      }));
    }
  }

  return (
    <div className="px-4 my-12">
      <h2 className="mb-8 text-3xl font-bold">Aktualizuj biegi</h2>

      <form
        className="flex lg:w-[1240px] flex-col flex-wrap gap-4"
        onSubmit={handleSubmit}
      >
        <div className="flex gap-8">
          {/* race name */}
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="name" value="Nazwa biegu" />
            </div>
            <TextInput
              id="name"
              name="name"
              type="text"
              placeholder="Nazwa biegu"
              value={race.name || ""}
              onChange={handleInputChange}
            />
          </div>

          {/* image */}
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="image" value="Zdjęcie" />
            </div>
            <TextInput
              name="image"
              placeholder="Zdjęcie"
              value={race.image || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>
        {/* second row */}
        <div className="flex gap-8">
          {/* startDateRace */}
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="startDateRace" value="Data rozpoczęcia biegu" />
            </div>
            <Datepicker
              name="startDateRace"
              // value={race.startDateRace || null}
              // onChange={(value) => handleDateTimeChange("startDateRace", value)}
            />
          </div>

          {/* endDateRace */}
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="endDateRace" value="Data zakończenia biegu" />
            </div>
            <MyDateInput
              placeholderText="Date"
              name="date"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
            />
            {/* <MyDateInput
              name="endDateRace"
              value={race.endDateRace || null}
              onChange={(value) => handleDateTimeChange("endDateRace", value)}
            /> */}
          </div>

          {/* registrationEndDate */}
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label
                htmlFor="registrationEndDate"
                value="Data końca rejestracji"
              />
            </div>
            <DateTimePicker
              name="registrationEndDate"
              value={race.registrationEndDate || null}
              onChange={(value) =>
                handleDateTimeChange("registrationEndDate", value)
              }
            />
          </div>
        </div>
        {/* third row */}
        <div className="flex gap-8">
          {/* raceType */}
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="raceType" value="Rodzaj biegu" />
            </div>
            <Select
              id="raceType"
              name="raceType"
              className="w-full rounded"
              value={race.raceType || ""}
              onChange={handleSelectChange}
            >
              {raceTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
              ))}
            </Select>
          </div>

          {/* raceStatus */}
          {/* <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="raceStatus" value="Status biegu" />
            </div>
            <Select
              id="raceStatus"
              name="raceStatus"
              className="w-full rounded"
              value={race.raceStatus || ""}
              onChange={handleSelectChange}
            >
              {raceStatusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
              ))}
            </Select>
          </div> */}
        </div>
        {/* fourth row */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="description" value="Opis biegu" />
          </div>
          <Textarea
            id="description"
            name="description"
            placeholder="Podaj więcej informacji o biegu"
            required
            rows={6}
            onChange={handleInputChange}
          />
        </div>
        {/* fifth row */}
        <h3 className="text-xl font-bold text-lightYellow text-center uppercase">
          Adres wydarzenia
        </h3>
        <div className="flex gap-8">
          {/* city */}
          <div className="lg:w-1/4">
            <div className="mb-2 block">
              <Label htmlFor="addressDto.city" value="Miejscowość" />
            </div>
            <TextInput
              id="addressDto.city"
              name="addressDto.city"
              type="text"
              placeholder="Miejscowość"
              value={race.addressDto?.city || ""}
              onChange={handleInputChange}
            />
          </div>

          {/* street */}
          <div className="lg:w-1/4">
            <div className="mb-2 block">
              <Label htmlFor="addressDto.street" value="Ulica i numer" />
            </div>
            <TextInput
              name="addressDto.street"
              placeholder="Ulica i numer"
              value={race.addressDto?.street || ""}
              onChange={handleInputChange}
            />
          </div>

          <div className="lg:w-1/4">
            <div className="mb-2 block">
              <Label htmlFor="addressDto.postalCode" value="Kod pocztowy" />
            </div>
            <TextInput
              name="addressDto.postalCode"
              type="text"
              placeholder="Kod pocztowy"
              value={race.addressDto?.postalCode || ""}
              onChange={handleInputChange}
            />
          </div>

          {/* country */}
          <div className="lg:w-1/4">
            <div className="mb-2 block">
              <Label htmlFor="addressDto.country" value="Kraj" />
            </div>
            <TextInput
              name="addressDto.country"
              type="text"
              placeholder="Kraj"
              value={race.addressDto?.country || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <button
          type="submit"
          className="py-3 px-6 my-4 uppercase bg-lightYellow"
        >
          Utwórz bieg
        </button>
      </form>
    </div>
  );
}

export default UploadRace;
