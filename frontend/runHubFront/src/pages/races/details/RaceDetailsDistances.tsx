import { Link, useNavigate } from "react-router-dom";
import { RaceDto } from "../../../app/models/race";
import { useState } from "react";
import { useStore } from "../../../app/stores/store";
import AttendeesList from "./attendees/AttendeesList";
import { DistanceDto } from "../../../app/models/distance";

interface Props {
  race: RaceDto;
  distance: DistanceDto;
}

function RaceDetailsDistances({ race, distance }: Props) {
  const { userStore, raceStore } = useStore();
  const { isLoggedIn } = userStore;


  
  return (
    <div className="mt-4 w-full">
      <table className="w-full table-auto ">
        <thead>
          <tr>
            <th className="px-4 py-2">Nazwa</th>
            <th className="px-4 py-2">Opis</th>
            <th className="px-4 py-2">Dystans (km)</th>
            <th className="px-4 py-2">Dostępne miejsca</th>
            <th className="px-4 py-2">Cena</th>
            <th className="px-4 py-2">Zapisz się</th>
            <th className="px-4 py-2">Lista startowa</th>
          </tr>
        </thead>
        <tbody>
          {race.distances &&
            race.distances.map((distance) => (
              <tr key={distance.distanceId}>
                <td className="border px-4 py-2 bg-gray-100">
                  {distance.name}
                </td>
                <td className="border px-4 py-2">{distance.description}</td>
                <td className="border px-4 py-2">
                  {distance.lengthInKilometers}
                </td>
                <td className="border px-4 py-2">
                  {distance.availableSlots}/{distance.totalSlots}
                </td>
                <td className="border px-4 py-2">${distance.price}</td>
                <td className="border px-4 py-2 text-center">
                  <button className="text-deepBlack font-bold py-2 px-4 rounded">
                    Dołącz
                  </button>
                </td>
                <td className="border px-4 py-2 text-center">
                  <Link
                    to={`/races/${race.raceId}/${distance.distanceId}/attendees`}
                  >
                    <button className="text-deepBlack font-bold py-2 px-4 rounded">
                      Lista startowa
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="mt-10">
        {/* <AttendeesList attendees={distance.distanceAttendees!} /> */}
        <h2>eloo</h2>
      </div>
    </div>
  );
}

export default RaceDetailsDistances;
