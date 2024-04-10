import MyFormattedDate from "../../../app/common/MyFormattedDate";
import { RaceDto } from "../../../app/models/race";
import bgImg from "../../../assets/raceDetails.jpg";
import defaultImage from "../../../assets/defaultImageRace.jpg";

interface RaceDetailsBannerProps {
  race: RaceDto;
}

const handleImageError = (
  event: React.SyntheticEvent<HTMLImageElement, Event>
) => {
  const target = event.target as HTMLImageElement;
  target.src = defaultImage;
};

function RaceDetailsBanner({ race }: RaceDetailsBannerProps) {
  return (
    <div
      className="bg-cover bg-center bg-no-repeat w-full h-[50%] bg-whiteNeutral flex flex-col justify-between"
      style={{
        backgroundImage: `linear-gradient(to top, rgba(255, 163, 64), rgba(100, 100, 100, 0.4)), url(${bgImg})`,
      }}
    >
      <div className="grid md:grid-cols-2 max-w-[1240px] m-auto p-14 mt-12 ">
        <div className="flex justify-center items-center">
          <img
            className=" rounded-lg shadow-lg w-[60%] items-center"
            src={race.image || defaultImage}
            alt={race.image ? "race" : "default"}
            onError={handleImageError}
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
