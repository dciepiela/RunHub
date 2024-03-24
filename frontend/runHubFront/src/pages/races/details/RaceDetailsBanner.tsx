import MyFormattedDate from "../../../app/common/MyFormattedDate";
import { RaceDto } from "../../../app/models/race";
import bgImg from "../../../assets/raceDetails.jpg";

interface RaceDetailsBannerProps {
  race: RaceDto;
}

function RaceDetailsBanner({ race }: RaceDetailsBannerProps) {
  return (
    <div
      className="bg-cover bg-center bg-no-repeat w-full h-[50vh] bg-whiteNeutral flex flex-col justify-between"
      style={{
        backgroundImage: `linear-gradient(to top, rgba(255, 163, 64), rgba(100, 100, 100, 0.4)), url(${bgImg})`,
      }}
    >
      <div className="grid md:grid-cols-2 max-w-[1240px] m-auto pt-14 mt-8">
        <div>
          <img
            className=" rounded-lg shadow-lg h-[25vsh] w-[25vh] mx-auto"
            src={race.image}
            alt=""
          />
        </div>
        <div className="flex flex-col items-center justify-center md:items-start w-full px-2 py-8 text-center sm:text-left">
          <h1 className="py-3 text-3xl sm:text-7xl font-bold ">{race.name} </h1>
          <p className="text-2xl">
            <MyFormattedDate dateString={race.startDateRace} />
          </p>
          {/* <Link to="/races">
            <button className="py-3 px-6 my-4 uppercase">Zobacz biegi</button>
          </Link> */}
        </div>
      </div>
    </div>
  );
}

export default RaceDetailsBanner;
