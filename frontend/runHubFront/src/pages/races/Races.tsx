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
import {
  RaceStatus,
  raceStatusOptions,
  raceTypeOptions,
} from "../../app/models/race";
import LoadingComponent from "../../components/LoadingComponent";
import { format } from "date-fns";
import { pl } from "date-fns/locale";

export default observer(function Races() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  //search
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>("");

  //date
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { raceStore } = useStore();
  const {
    racesByDate,
    loadRaces,
    setPagingParams,
    pagination,
    loadingInitial,
  } = raceStore;

  const handleHover = (index: any) => {
    setHoveredCard(index);
  };

  useEffect(() => {
    setPagingParams(new PagingParams(currentPage, pageSize));
    loadRaces();
  }, [currentPage, pageSize, setPagingParams, loadRaces]);

  const filteredRaces = racesByDate.filter((race) => {
    const raceDate = new Date(race.startDateRace!);
    const start = startDate ? new Date(startDate) : new Date(-8640000000000000); // Use a very early date if no start date is set
    const end = endDate ? new Date(endDate) : new Date(8640000000000000); // Use a very late date if no end date is set

    return (
      race.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedStatus === "" || race.raceType === selectedStatus) &&
      raceDate >= start &&
      raceDate <= end
    );
  });

  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const target = event.target as HTMLImageElement;
    target.src = defaultImage;
  };

  if (loadingInitial) return <LoadingComponent content="Ładowanie biegów" />;

  return (
    <div className="min-h-[100vh] w-full bg-whiteNeutral">
      <div className="md:min-h-[80vh] grid gap-5 items-center">
        <div className="max-w-[1240px] mx-auto text-black mt-24">
          <h1 className="text-2xl text-center md:text-5xl text-lightYellow">
            Aktualne wydarzenia
          </h1>

          <div className="mt-5 mb-5 flex flex-col gap-2 md:flex-row justify-center items-center">
            <input
              type="text"
              placeholder="Szukaj biegu"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-bordered w-full max-w-xs rounded"
            />
            <Dropdown
              selection
              placeholder="Wybierz rodzaj"
              options={[
                { key: "all", text: "Wszystkie", value: "" },
                ...raceTypeOptions,
              ]}
              value={selectedStatus}
              onChange={(_, { value }) =>
                setSelectedStatus((value as string) ?? "")
              }
              className="ml-4 mr-4"
            />
            <div className="flex flex-col md:flex-row gap-2">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="input input-bordered rounded"
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="input input-bordered rounded"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-2 py-12 ">
            {filteredRaces.map((race, index) => (
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
                    src={race.photo ? race.photo?.url : defaultImage}
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
                        {raceStatusOptions.find(
                          (option) => option.value === race.raceStatus
                        )?.text || "Unknown Status"}
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
                    Lokalizacja:{" "}
                    {race.addressDto ? race.addressDto.city : "Brak"}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-darkGray text-xs">
                      {format(race.startDateRace!, "dd MMM yyyy HH:mm", {
                        locale: pl,
                      })}
                    </span>
                    <span className="text-mediumGray font-semibold">
                      {raceTypeOptions.find(
                        (option) => option.value === race.raceType
                      )?.text || "Unknown Type"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-darkGray text-xs">
                      Koniec zapisów:{" "}
                      {/* {formatTimeDifference(race.registrationEndDate!)} */}
                      {format(race.registrationEndDate!, "dd MMM yyyy HH:mm", {
                        locale: pl,
                      })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-2">
            <Pagination
              activePage={currentPage}
              totalPages={pagination ? pagination.totalPages : 1}
              onPageChange={(_, { activePage }) =>
                setCurrentPage(activePage as number)
              }
            />

            <Dropdown
              selection
              options={[
                { key: 3, text: "3 na stronę", value: 3 },
                { key: 6, text: "6 na stronę", value: 6 },
                { key: 9, text: "9 na stronę", value: 9 },
              ]}
              value={pageSize}
              onChange={(_, { value }) => setPageSize(value as number)}
            />
          </div>
        </div>
      </div>
    </div>
  );
});
