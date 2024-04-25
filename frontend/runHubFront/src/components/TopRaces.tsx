/* eslint-disable react-hooks/exhaustive-deps */
import image from "../assets/races.jpg";
import { Link } from "react-router-dom";
import { Transition } from "@headlessui/react";
import { useEffect, useState } from "react";
import defaultImage from "../assets/defaultImageRace.jpg";
import { observer } from "mobx-react-lite";
import { useStore } from "../app/stores/store";
import { raceTypeOptions } from "../app/models/race";
import { format } from "date-fns";
import { pl } from "date-fns/locale";

export default observer(function TopRaces() {
  const { raceStore } = useStore();
  const { loadRaces, threeRaces } = raceStore;
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const handleHover = (index: any) => {
    setHoveredCard(index);
  };

  useEffect(() => {
    loadRaces();
  }, [loadRaces]);

  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const target = event.target as HTMLImageElement;
    target.src = defaultImage;
  };

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
          <h3 className="text-4xl font-bold py-6 text-center uppercase">
            Dopasuj bieg do własnych predyspozycji
          </h3>
          <p className="py-4 text-2xl text-mediumGray text-center">
            Nasza platforma oferuje aktualne biegi dostosowane do Twoich
            predyspozycji fizycznych. Znajdziesz tutaj różnorodne trasy i
            wydarzenia sportowe, które pomogą Ci efektywnie rozwijać swoje
            umiejętności i osiągać swoje cele fitnessowe
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 relative gap-x-8 gap-y-16 px-4 pt-12 sm:pt-20 text-black">
          {threeRaces.map((race, index) => (
            <div
              key={index}
              className={`relative hover:-translate-y-2 duration-150 hover:ring-[2px] hover:ring-lightYellow w-64 h-[100%] mx-auto rounded-lg shadow-lg overflow-hidden cursor-pointer`}
              onMouseEnter={() => handleHover(index)}
              onMouseLeave={() => handleHover(null)}
            >
              <div className="relative h-80">
                <div
                  className={`absolute inset-0 bg-black opacity-0 transition-opacity duration-300 ${
                    hoveredCard === index ? "opacity-60" : ""
                  }`}
                />
                <img
                  src={race.image || defaultImage}
                  alt={race.image ? race.name : defaultImage}
                  onError={handleImageError}
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
                  Lokalizacja:{" "}
                  {race.addressDto?.city ? race.addressDto!.city : ""}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-darkGray text-xs">
                    {format(race.startDateRace!, "dd MMM yyyy h:mm", {
                      locale: pl,
                    })}
                  </span>
                  <span className="text-mediumGray font-semibold">
                    {raceTypeOptions.find(
                      (option) => option.value === race.raceType
                    )?.text || "Nieznany status"}{" "}
                  </span>
                </div>
                <div className="flex items-center mt-8">
                  <span className="text-darkGray text-xs">
                    Koniec zapisów:{" "}
                    {format(race.registrationEndDate!, "dd MMM yyyy h:mm", {
                      locale: pl,
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Link to="/races">
          <button className="py-3 px-6 mx-auto mt-16 flex uppercase">
            Pokaż więcej biegów...
          </button>
        </Link>
      </div>
    </div>
  );
});
