import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../app/context/useAuth";
import { RaceDto } from "../../../app/models/race";
import axios from "axios";
import { useState } from "react";
import distanceService from "../../../app/services/distanceService";

interface RaceDetailsDistancesProps {
  race: RaceDto;
  handleRegister: (distanceId: number) => void;
}
function RaceDetailsDistances({
  race,
  handleRegister,
}: RaceDetailsDistancesProps) {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [registeredDistances, setRegisteredDistances] = useState<number[]>([]);

  const handleClick = async (distanceId: number) => {
    if (isLoggedIn()) {
      try {
        // const response = await axios.post(
        //   `http://localhost:5000/api/distances/${race.raceId}/${distanceId}/attend`
        // );
        await distanceService.updateAttendance(race.raceId!, distanceId);
        // Handle success response here if needed
        // Handle success response here if needed
        // handleRegister(distanceId); // Call handleRegister if needed
        console.log("kliknięto");

        // Update registeredDistances state
        setRegisteredDistances([...registeredDistances, distanceId]);
        // Example: Show a success message
        alert("Successfully joined the race distance!");
      } catch (error) {
        // Handle error (e.g., show error message, redirect to login page)
        if (error.response.status === 401) {
          navigate("/login"); // Redirect to login page if not logged in
        } else {
          // Handle other errors
          console.error("Error:", error);
          alert(
            "An error occurred while joining the race distance. Please try again later."
          );
        }
      }
    } else {
      navigate("/login"); // Redirect to login page if not logged in
    }
  };

  const isRegistered = (distanceId: number) => {
    return registeredDistances.includes(distanceId);
  };

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
                  {isRegistered(distance.distanceId) ? ( // Check if the user is already registered
                    <button
                      className="text-deepBlack font-bold py-2 px-4 rounded cursor-not-allowed opacity-50"
                      disabled
                    >
                      Joined
                    </button>
                  ) : (
                    <button
                      className="text-deepBlack font-bold py-2 px-4 rounded"
                      onClick={() => handleClick(distance.distanceId)}
                    >
                      Dołącz
                    </button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default RaceDetailsDistances;
