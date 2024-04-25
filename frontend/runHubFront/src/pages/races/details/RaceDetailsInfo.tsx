import { Link } from "react-router-dom";
import { RaceDto } from "../../../app/models/race";
import { pl } from "date-fns/locale";
import { format } from "date-fns";
import { observer } from "mobx-react-lite";

interface RaceDetailsInfoProps {
  race: RaceDto;
}
export default observer(function RaceDetailsInfo({
  race,
}: RaceDetailsInfoProps) {
  return (
    <div className="w-full my-10">
      <div className="max-w-[1240px] mx-auto">
        <div className="text-center">
          {race.isHost && (
            <div>
              <h2 className="text-2xl mb-2 font-bold text-green-500">
                Jesteś organizatorem tego wydarzenia
              </h2>
              <Link to={`/admin/dashboard/races/edit/${race.raceId}`}>
                <button className="px-2 py-2 mx-auto uppercase mb-2">
                  Edytuj
                </button>
              </Link>
            </div>
          )}

          <h2 className="text-5xl font-bold">Szczegóły</h2>
          <h3 className="text-3xl mt-8">Opis biegu</h3>
          <p className="text-xl py-6 text-gray-500">{race.description}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-1 px-2 text-center">
          <div className="border py-8 rounded-xl shadow-xl">
            <p className="text-3xl font-bold text-lightYellow">Informacje</p>
            <p className="text-mediumGray-400 mt-2">
              Nazwa: <span className="font-bold"> {race.name}</span>
            </p>
            <p className="text-mediumGray-400 mt-2 ">
              Koniec rejestracji:{" "}
              <span className="font-bold">
                {format(
                  race.registrationEndDate!,
                  "dd MMM yyyy', godz.' HH:mm",
                  {
                    locale: pl,
                  }
                )}
              </span>
            </p>
            <p className="text-mediumGray-400 mt-2">
              Organizator: <b>{race.hostUsername}</b>
            </p>
          </div>
          <div className="border py-8 rounded-xl shadow-xl">
            <p className="text-3xl font-bold text-lightYellow">
              Termin wydarzenia
            </p>
            <div className="text-mediumGray-400 mt-2 flex flex-col">
              {format(race.startDateRace!, "dd MMM yyyy 'godz.' HH:mm", {
                locale: pl,
              })}
              <span className="mx-2">-</span>
              {format(race.endDateRace!, "dd MMM yyyy 'godz.' HH:mm", {
                locale: pl,
              })}
            </div>
          </div>
          <div className="border py-8 rounded-xl shadow-xl">
            <p className="text-3xl font-bold text-lightYellow">Lokalizacja</p>
            <p className="text-mediumGray-400 mt-2">
              {race.addressDto && (
                <>
                  <a
                    href={`https://maps.google.com/maps?q=${encodeURIComponent(
                      race.addressDto.postalCode +
                        " " +
                        race.addressDto.city +
                        " " +
                        race.addressDto.street
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {race.addressDto.postalCode} {race.addressDto.city},{" "}
                    {race.addressDto.street}
                  </a>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});
