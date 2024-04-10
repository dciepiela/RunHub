import { useEffect, useState } from "react";
import defaultImage from "../../assets/defaultImageRace.jpg";
import { Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { PagingParams } from "../../app/models/pagination";
import "./Races.css";
import "semantic-ui-css/components/dropdown.min.css";
import "semantic-ui-css/components/menu.min.css";
import "semantic-ui-css/components/transition.min.css";
import { Dropdown, Pagination } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { RaceStatus, raceTypeOptions } from "../../app/models/race";
import LoadingComponent from "../../components/LoadingComponent";

const Races2 = observer(function Races2() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3); // Default pageSize

  const { raceStore } = useStore();
  const { raceRegistry, racesByDate, loadRaces, setPagingParams, pagination } =
    raceStore;

  const handleHover = (index: any) => {
    setHoveredCard(index);
  };

  useEffect(() => {
    setPagingParams(new PagingParams(currentPage, pageSize));
    loadRaces();
  }, [currentPage, pageSize, setPagingParams, loadRaces]);
  const formatTimeDifference = (endDate: string) => {
    const now = new Date();
    const endDateTime = new Date(endDate).getTime();
    const timeDifference = endDateTime - now.getTime();

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );

    if (days > 0) {
      return `${days} dni`;
    } else if (hours > 0) {
      return `${hours} godzin i ${minutes} minut`;
    } else {
      return `${minutes} minut`;
    }
  };

  // statusRace
  const getStatusText = (status: RaceStatus): string => {
    switch (status) {
      case RaceStatus.RegistrationOpen:
        return "Rejestracja otwarta";
      case RaceStatus.RegistrationClosed:
        return "Zamknięta rejestracja";
      case RaceStatus.Completed:
        return "Odbyte";
      case RaceStatus.Cancelled:
        return "Odwołane";
      case RaceStatus.InProgress:
        return "W trakcie";
      default:
        return "Unknown";
    }
  };

  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const target = event.target as HTMLImageElement;
    target.src = defaultImage;
  };

  if (raceStore.loadingInitial)
    return <LoadingComponent content="Ładowanie biegów" />;

  return (
    <div className="min-h-[100vh] w-full bg-whiteNeutral">
      <div className="md:min-h-[80vh] grid gap-5 items-center">
        <div className="max-w-[1240px]  mx-auto text-black mt-24">
          <h1 className="text-2xl text-center md:text-5xl text-lightYellow">
            Aktualne wydarzenia
          </h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-2 py-12 ">
            {racesByDate.map((race, index) => (
              <div
                key={race.raceId}
                className={`bg-white relative hover:-translate-y-2 duration-150 hover:ring-[2px] hover:ring-lightYellow w-64 h-[360px] mx-auto rounded-lg shadow-lg overflow-hidden cursor-pointer`}
                onMouseEnter={() => handleHover(index)}
                onMouseLeave={() => handleHover(null)}
              >
                <div className="relative h-52">
                  <div
                    className={`absolute inset-0 bg-deepBlack opacity-0 transition-opacity duration-300 ${
                      hoveredCard === index ? "opacity-60" : ""
                    }`}
                  />

                  <img
                    src={race.image || defaultImage}
                    alt={race.image ? race.name : defaultImage}
                    onError={handleImageError}
                    className="object-cover h-full w-full"
                  />
                  {race.raceStatus && (
                    <div className="absolute top-0 left-0 w-full text-center">
                      <span
                        className={`block text-white font-bold rounded px-2 py-1 ${
                          race.raceStatus === RaceStatus.RegistrationOpen
                            ? "bg-green-500"
                            : race.raceStatus === RaceStatus.RegistrationClosed
                            ? "bg-orange-400"
                            : race.raceStatus === RaceStatus.Cancelled
                            ? "bg-red-500 text-gray-700"
                            : ""
                        }`}
                      >
                        {getStatusText(race.raceStatus)}
                      </span>
                    </div>
                  )}
                  {race.raceStatus !== RaceStatus.Cancelled && (
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
                  )}
                </div>
                {/* Details */}
                <div className="px-6 py-2">
                  <h3 className="font-semibold mb-1">{race.name}</h3>
                  <p className="text-mediumGray text-xs">
                    Lokalizacja: {race.addressDto!.city}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-darkGray text-xs">
                      {race.startDateRace!.slice(0, 10)}
                    </span>
                    <span className="text-mediumGray font-semibold">
                      {raceTypeOptions.find(
                        (option) => option.value === race.raceType
                      )?.text || "Unknown Type"}{" "}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-darkGray text-xs">
                      Pozostały czas rejestracji:{" "}
                      {formatTimeDifference(race.registrationEndDate!)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className=" flex justify-between items-center mb-4 px-2">
            <Pagination
              activePage={currentPage}
              totalPages={pagination ? pagination.totalPages : 1}
              onPageChange={(e, { activePage }) =>
                setCurrentPage(activePage as number)
              }
            />

            <Dropdown
              selection
              options={[
                { key: 3, text: "3 per page", value: 3 },
                { key: 6, text: "6 per page", value: 6 },
                { key: 9, text: "9 per page", value: 9 },
              ]}
              value={pageSize}
              onChange={(e, { value }) => setPageSize(value as number)}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export default Races2;
