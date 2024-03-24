import MyFormattedDate from "../../../app/common/MyFormattedDate";
import { RaceDto } from "../../../app/models/race";
import RaceDetailsBanner from "./RaceDetailsBanner";
import RaceDetailsDistances from "./RaceDetailsDistances";
import RaceDetailsInfo from "./RaceDetailsInfo";

interface RaceDetailsProps {
  race: RaceDto;
}

function RaceDetails({ race }: RaceDetailsProps) {
  return (
    <div>
      <RaceDetailsBanner race={race} />

      <RaceDetailsInfo race={race} />

      {race.sponsors && race.sponsors.length > 0 && (
        <>
          <h3 className="text-xl font-bold mt-4">Sponsors:</h3>
          <ul className="list-disc pl-4">
            {race.sponsors.map((sponsor) => (
              <li key={sponsor.sponsorId} className="mb-4">
                <p>
                  <span className="font-bold">Name:</span> {sponsor.name}
                </p>
                <p>
                  <span className="font-bold">Description:</span>{" "}
                  {sponsor.description}
                </p>
                <p>
                  <span className="font-bold">Website:</span>{" "}
                  <a href={sponsor.webPageUrl}>{sponsor.webPageUrl}</a>
                </p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default RaceDetails;
