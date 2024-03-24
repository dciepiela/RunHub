/* eslint-disable react-hooks/exhaustive-deps */
import image from "../assets/races.jpg";
import { Link } from "react-router-dom";
import { Transition } from "@headlessui/react";
import useAxiosFetch from "../app/hooks/useAxiosFetch";
import { useEffect, useState } from "react";
import photo from "../assets/avatar.jpg";

interface Race {
  raceId: number;
  image: string;
  name: string;
  raceType: RaceType;
  registrationEndDate: string;
  startDateRace: string;
  addressDto: {
    city: string;
  };
}

enum RaceType {
  Street = 1,
  Mountain = 2,
  OCR = 3,
  Ultra = 4,
  Trail = 5,
  Other = 6,
}

// const raceTypeLabels = {
//   1: "Bieg uliczny",
//   2: "Bieg góski",
//   3: "OCR",
//   4: "Ultra",
//   5: "Trail",
//   6: "Inny",
// };

const raceTypeLabels: Record<RaceType, string> = {
  [RaceType.Street]: "Bieg uliczny",
  [RaceType.Mountain]: "Bieg górski",
  [RaceType.OCR]: "OCR",
  [RaceType.Ultra]: "Bieg ultra",
  [RaceType.Trail]: "Bieg trailowy",
  [RaceType.Other]: "Inny",
};

function TopRaces() {
  const axiosFetch = useAxiosFetch();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [races, setRaces] = useState<Race[]>([]);

  const handleHover = (index: any) => {
    setHoveredCard(index);
  };

  const fetchData = async () => {
    await axiosFetch
      .get("/races?pageSize=3&pageNumber=1&SortBy=startDateRace")
      .then((res) => setRaces(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full mt-24 flex justify-center">
      <div className="w-full h-[700px] bg-gray-900/90 absolute">
        <img
          className="w-full h-full object-cover mix-blend-overlay"
          src={image}
          alt="/"
        />
      </div>

      <div className="max-w-[1240px] mx-auto text-whiteNeutral relative">
        <div className="px-2 py-12">
          <h2 className="text-3xl pt-8 text-mediumGray uppercase text-center">
            Aktualne wydarzenia
          </h2>
          <h3 className="text-5xl font-bold py-6 text-center uppercase">
            Dopasuj bieg do własnych predyspozycji
          </h3>
          <p className="py-4 text-3xl text-mediumGray text-center">
            Nasza platforma oferuje aktualne biegi dostosowane do Twoich
            predyspozycji fizycznych. Znajdziesz tutaj różnorodne trasy i
            wydarzenia sportowe, które pomogą Ci efektywnie rozwijać swoje
            umiejętności i osiągać swoje cele fitnessowe
          </p>
        </div>

        {/* <div className="grid grid-cols-1 lg:grid-cols-3 relative gap-x-8 gap-y-16 px-4 pt-12 sm:pt-20 text-black ">
          <div
            className="bg-white rounded-xl shadow-2xl relative min-h-[400px] bg-cover bg-center"
            style={{
              backgroundImage: `url(${image})`,
            }}
          >
            <div className="p-8 flex flex-col items-center">
              <h3 className="bg-lightYellow rounded-lg font-bold text-2xl my-2">
                20-05-2024
              </h3>
              <h3 className="bg-lightYellow rounded-lg font-bold text-2xl">
                Warszawa
              </h3>
            </div>
            <div className="flex flex-row items-end justify-center mt-10 text-center">
              <h3 className="bg-lightYellow rounded-xl shadow-2xl font-bold text-2xl ">
                Bieg Niepodległości
              </h3>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gray-200 py-4 text-center">
              <p className="flex items-center justify-center uppercase">
                <Link to="/details">
                  <button className="py-3 px-6 mx-auto flex uppercase">
                    Pokaż szczegóły
                    <GiClick className="ml-2 size-6" />
                  </button>
                </Link>
              </p>
            </div>
          </div>
          */}
        <div className="grid grid-cols-1 lg:grid-cols-3 relative gap-x-8 gap-y-16 px-4 pt-12 sm:pt-20 text-black">
          {races.map((race, index) => (
            <div
              key={index}
              className={`relative hover:-translate-y-2 duration-150 hover:ring-[2px] hover:ring-lightYellow w-64 h-[400px] mx-auto rounded-lg shadow-lg overflow-hidden cursor-pointer`}
              onMouseEnter={() => handleHover(index)}
              onMouseLeave={() => handleHover(null)}
            >
              <div className="relative h-60">
                <div
                  className={`absolute inset-0 bg-black opacity-0 transition-opacity duration-300 ${
                    hoveredCard === index ? "opacity-60" : ""
                  }`}
                />
                <img
                  src={race.image || photo}
                  alt=""
                  className="object-cover h-full w-full"
                />
                <Transition
                  show={hoveredCard === index}
                  enter="transition-opacity duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Link to={`/races/${race.raceId}`}>
                      <button className="px-4 py-2 text-white disabled::bg-red-300 bg-lightYellow duration-300 rounded hover:bg-whiteNeutral">
                        Pokaż szczegóły
                      </button>
                    </Link>
                  </div>
                </Transition>
              </div>
              {/* Details */}
              <div className="px-6 py-2">
                <h3 className="font-semibold mb-1">{race.name}</h3>
                <p className="text-mediumGray text-xs">
                  Lokalizacja: {race.addressDto.city}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-darkGray text-xs">
                    {race.startDateRace.slice(0, 10)}
                  </span>
                  <span className="text-mediumGray font-semibold">
                    {raceTypeLabels[race.raceType]}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-8">
                  <span className="text-darkGray text-xs">
                    Koniec zapisów:{" "}
                    {race.registrationEndDate.slice(0, 10) +
                      " " +
                      race.registrationEndDate.slice(11, 16)}
                  </span>
                </div>
              </div>
            </div>
            // <div>
            //   <Card key={index} item={race} />
            // </div>
          ))}
        </div>
        <Link to="/races">
          {" "}
          <button className="py-3 px-6 mx-auto mt-16 flex uppercase">
            Pokaż więcej biegów...
          </button>
        </Link>
      </div>
    </div>
  );
}

export default TopRaces;
