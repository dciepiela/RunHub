import { useEffect, useState } from "react";
import photo from "../../assets/image3.jpg";
import { Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import { RaceDto } from "../../app/models/race";
import raceService from "../../app/services/raceService";
import { PaginationRequestParams } from "../../app/models/pagination";
// import { Dropdown, Pagination } from "semantic-ui-react";
import "./Races.css";
// import "semantic-ui-css/components/dropdown.min.css";
// import "semantic-ui-css/components/item.min.css";
import "semantic-ui-css/components/container.min.css";
import { Pagination } from "semantic-ui-react";

enum RaceType {
  Street = 1,
  Mountain = 2,
  OCR = 3,
  Ultra = 4,
  Trail = 5,
  Other = 6,
}

const raceTypeLabels: Record<RaceType, string> = {
  [RaceType.Street]: "Bieg uliczny",
  [RaceType.Mountain]: "Bieg górski",
  [RaceType.OCR]: "OCR",
  [RaceType.Ultra]: "Bieg ultra",
  [RaceType.Trail]: "Bieg trailowy",
  [RaceType.Other]: "Inny",
};

function Races() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const [races, setRaces] = useState<RaceDto[]>([]);
  const [totalPageNumber, setTotalPagesNumber] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [paginationRequestParams, setPaginationRequestParams] =
    useState<PaginationRequestParams>({
      pageSize: pageSize,
      pageNumber: currentPage,
    });

  const handleHover = (index: any) => {
    setHoveredCard(index);
  };

  const fetchRaces = async () => {
    const paginationResult = await raceService.getAllRaces(
      paginationRequestParams
    );

    if (paginationResult.data) {
      const { data, paginationParams } = paginationResult;

      if (data && paginationParams) {
        setRaces(data);
        setTotalPagesNumber(paginationParams.totalPages);
        setCurrentPage(paginationParams.currentPage);
        setPageSize(paginationParams.itemsPerPage);
      }
    }
    // const fetchedRaces = await raceService.getRaces();
    // setRaces(fetchedRaces);
  };

  useEffect(() => {
    // const fetchDataAndSetInterval = async () => {
    //   // await fetchData();
    //   fetchRaces();
    //   const intervalId = setInterval(fetchRaces, 60000); // Odświeżanie co 60 sekund
    //   return () => clearInterval(intervalId); // Czyszczenie interwału po zakończeniu komponentu
    // };
    // fetchDataAndSetInterval(); // Wywołanie funkcji asynchronicznej
    fetchRaces();
  }, [paginationRequestParams]);

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newPageSize = Number(event.target.value);
    setPaginationRequestParams({
      ...paginationRequestParams,
      pageSize: newPageSize,
    });
  };

  const handlePageNumberChange = (
    _: React.MouseEvent<HTMLAnchorElement>,
    data: any
  ) => {
    const newPage = Number(data.activePage);
    if (newPage > 0 && newPage <= totalPageNumber) {
      setCurrentPage(newPage);
      setPaginationRequestParams({
        ...paginationRequestParams,
        pageNumber: newPage,
      });
    }
  };

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

  // Filtrowanie biegów, których data końca rejestracji jest późniejsza niż aktualna data
  // const filteredRaces = races.filter((race) => {
  //   const registrationEndDate = new Date(race.registrationEndDate!);
  //   const currentDate = new Date();
  //   return registrationEndDate > currentDate;
  // });

  console.log(races);

  return (
    <div className="w-full bg-whiteNeutral">
      <div className="md:min-h-[80vh] grid gap-5 items-center">
        <div className="max-w-[1240px]  mx-auto text-black mt-24">
          <h1 className="text-2xl text-center md:text-5xl text-lightYellow">
            Aktualne wydarzenia
          </h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-2 py-12 ">
            {races.map((race, index) => (
              <div
                key={index}
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
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-darkGray text-xs">
                      Pozostały czas rejestracji:{" "}
                      {formatTimeDifference(race.registrationEndDate!)}
                    </span>
                  </div>
                </div>
              </div>

              // <div>
              //   <Card key={index} item={race} />
              // </div>
            ))}
          </div>
          <div className=" flex justify-between items-center mb-4 px-2">
            <select
              value={pageSize}
              onChange={handlePageSizeChange}
              id="countries"
              className="w-1/4 p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500 h-[42px]"
            >
              <option selected>6</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="5">5</option>
              <option value="10">10</option>
            </select>

            <Pagination
              activePage={currentPage}
              totalPages={totalPageNumber}
              onPageChange={handlePageNumberChange}
              className="custom-pagination"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Races;
