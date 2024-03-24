import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RaceDetails from "./RaceDetails"; // Adjust the path as per your project structure
import { RaceDto } from "../../../app/models/race";
import raceService from "../../../app/services/raceService";

function RaceDetailsPage() {
  const { raceId } = useParams<{ raceId: string }>();
  const [race, setRace] = useState<RaceDto | null>(null);

  useEffect(() => {
    const fetchRace = async () => {
      try {
        const response = await raceService.getRaceById(
          parseInt(raceId ?? "", 10)
        );
        if (response) {
          setRace(response);
        } else {
          // Handle race not found
        }
      } catch (error) {
        // Handle error
      }
    };
    fetchRace();
  }, [raceId]);

  const handleRegister = (distanceId: number) => {
    console.log(`Registering for distance with ID: ${distanceId}`);
    // Implement your registration logic here
  };

  return (
    <div className="w-full">
      {race && <RaceDetails race={race} handleRegister={handleRegister} />}
    </div>
  );
}

export default RaceDetailsPage;
