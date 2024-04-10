import photo from "../../assets/image3.jpg";
import { useStore } from "../../app/stores/store";

function Results() {
  const { raceStore } = useStore();
  const { racesByDate } = raceStore;

  return (
    <div className="md:min-h-[80vh] grid md:grid-cols-2 gap-5 max-w-[1240px] mx-auto items-center">
      {/* <h2>{distanceStore.title}</h2> */}
      <div>
        <img src={photo} alt="photo" />
      </div>

      <div className="max-w-[1240px] mx-auto text-whiteNeutral relative">
        <div className="px-2 py-12">
          <h2 className="text-3xl pt-8 text-deepBlack text-center uppercase py-12">
            RunHub - portal dla sportowców
          </h2>
          <p className="py-4 text-2xl sm:text-3xl text-darkGray text-center"></p>
        </div>
      </div>
      {/* <div>
        <ul>
          {distances.map((distance) => (
            <li key={distance.distanceId}>{distance.name} </li>
          ))}
        </ul>
      </div> */}

      <div>
        <ul>
          {racesByDate.map((race) => (
            <li key={race.raceId}>
              {race.name}, data: {race.startDateRace}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Results;
