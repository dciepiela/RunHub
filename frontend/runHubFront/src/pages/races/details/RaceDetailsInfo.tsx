import { useState } from "react";
import MyFormattedDate from "../../../app/common/MyFormattedDate";
import { RaceDto } from "../../../app/models/race";
import RaceDetailsDistances from "./RaceDetailsDistances";

interface RaceDetailsInfoProps {
  race: RaceDto;
}
function RaceDetailsInfo({ race }: RaceDetailsInfoProps) {
  const [registeredDistances, setRegisteredDistances] = useState<number[]>([]);

  const handleRegister = (distanceId: number) => {
    // Check if the distance is already registered
    if (!registeredDistances.includes(distanceId)) {
      // Add the distanceId to the registered distances list
      setRegisteredDistances([...registeredDistances, distanceId]);
      // Implement any other registration logic here, such as API calls, etc.
      console.log(`Registered for distance with ID: ${distanceId}`);
    } else {
      console.log(`Already registered for distance with ID: ${distanceId}`);
    }
  };
  return (
    <div className="w-full my-10">
      <div className="max-w-[1240px] mx-auto">
        <div className="text-center">
          <h2 className="text-5xl font-bold">Szczegóły</h2>
          <h3 className="text-3xl mt-8">Opis biegu</h3>
          <p className="text-xl py-6 text-gray-500">{race.description}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-1 px-2 text-center">
          <div className="border py-8 rounded-xl shadow-xl">
            <p className="text-3xl font-bold text-lightYellow">Informacje</p>
            <p className="text-mediumGray-400 mt-2">{race.name}</p>
            <p className="text-mediumGray-400 mt-2">
              Koniec rejestracji:{" "}
              <MyFormattedDate
                className="font-bold"
                dateString={race.registrationEndDate}
              />
            </p>
          </div>
          <div className="border py-8 rounded-xl shadow-xl">
            <p className="text-3xl font-bold text-lightYellow">
              Termin wydarzenia
            </p>
            <p className="text-mediumGray-400 mt-2">
              <MyFormattedDate
                className="font-bold"
                dateString={race.startDateRace}
              />
              <span className="mx-2">-</span>
              <MyFormattedDate
                className="font-bold"
                dateString={race.endDateRace}
              />
            </p>
          </div>
          <div className="border py-8 rounded-xl shadow-xl">
            <p className="text-3xl font-bold text-lightYellow">Lokalizacja</p>
            <p className="text-mediumGray-400 mt-2">
              {race.addressDto?.postalCode} {race.addressDto?.city},{" "}
              {race.addressDto?.street}
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-1 px-2 mt-4 justify-items-center">
          <h3 className="text-3xl mt-8 justify-self-center">
            Dostępne dystanse
          </h3>
          <RaceDetailsDistances race={race} handleRegister={handleRegister} />
        </div>
      </div>
    </div>
  );
}

export default RaceDetailsInfo;
