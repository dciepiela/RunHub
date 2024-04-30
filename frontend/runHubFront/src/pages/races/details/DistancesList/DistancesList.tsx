import { observer } from "mobx-react-lite";
import { useStore } from "../../../../app/stores/store";
import { useNavigate } from "react-router-dom";
import { DistanceStatus, IDistanceDto } from "../../../../app/models/distance";
import { RaceDto, RaceStatus } from "../../../../app/models/race";
import CheckoutForm from "../../../../components/payment/CheckoutForm";
import AttendeesList from "../attendees/AttendeesList";
import { useMediaQuery } from "react-responsive";

interface Props {
  race: RaceDto;
  distances: IDistanceDto[];
}

export default observer(function DistancesList({ race, distances }: Props) {
  const { userStore, distanceStore } = useStore();
  const { isLoggedIn } = userStore;

  const isMobile = useMediaQuery({ maxWidth: 768 });

  const navigate = useNavigate();
  const {
    setSelectedDistance,
    togglePaymentForm,
    toggleAttendeesList,
    selectedPaymentDistanceId,
    selectedAttendeesDistanceId,
  } = distanceStore;

  const isCancelled = (distance: IDistanceDto) =>
    distance.status === DistanceStatus.Cancelled;

  return (
    <div className="mt-4">
      <table className="mx-auto text-xs md:text-sm">
        <thead>
          <tr>
            <th className="px-2 md:px-4 py-2">Nazwa</th>
            <th className="px-2 md:px-4 py-2 hidden md:block">Opis</th>
            <th className="px-2 md:px-4 py-2">Dystans (km)</th>
            <th className="px-2 md:px-4 py-2 hidden md:block">
              Dostępne miejsca
            </th>
            <th className="px-2 md:px-4 py-2">Zapisani</th>
            <th className="px-2 md:px-4 py-2">Cena</th>
            {race.raceStatus === RaceStatus.RegistrationOpen && (
              <th className="px-2 md:px-4 py-2">Rejestracja</th>
            )}
            <th className="px-2 md:px-4 py-2">Lista startowa</th>
          </tr>
        </thead>
        <tbody>
          {distances.map((distance) => (
            <tr
              key={distance.distanceId}
              className={
                isCancelled(distance) ? "bg-red-500 text-gray-500" : ""
              }
            >
              <td className="border px-2 md:px-4 py-2 bg-gray-100">
                {!isCancelled(distance) ? (
                  <span>{distance.name}</span>
                ) : (
                  <span className="font-bold text-red-600">ODWOŁANY</span>
                )}
              </td>
              <td className="border px-2 md:px-4 py-2 hidden md:table-cell">
                {distance.description}
              </td>
              <td className="border px-2 md:px-4 py-2 text-center">
                {distance.lengthInKilometers}
              </td>
              <td className="border px-2 md:px-4 py-2 text-center hidden md:table-cell">
                {distance.availableSlots}/{distance.totalSlots}
              </td>
              <td className="border px-2 md:px-4 py-2 text-center">
                {distance.distanceAttendees &&
                distance.distanceAttendees.length > 0
                  ? distance.distanceAttendees?.length
                  : "Brak zapisanych"}
              </td>
              <td className="border px-2 md:px-4 py-2 text-center">
                {distance.price} zł
              </td>

              {/* PAYMENT */}
              {race.raceStatus === RaceStatus.RegistrationOpen && (
                <td className="border px-2 md:px-4 py-2 text-center">
                  {!isCancelled(distance) &&
                  distance.availableSlots > 0 &&
                  (!race.registrationEndDate ||
                    new Date(race.registrationEndDate) > new Date()) ? (
                    <>
                      {race.isHost ? (
                        <p className="text-red-500">
                          Jesteś organizatorem, nie możesz się zapisać
                        </p>
                      ) : (
                        <button
                          onClick={() => {
                            if (isLoggedIn) {
                              togglePaymentForm(distance.distanceId!);
                            } else {
                              navigate("/login");
                            }
                          }}
                          className={`text-deepBlack font-bold py-2 px-4 rounded w-full whitespace-nowrap ${
                            selectedPaymentDistanceId === distance.distanceId
                              ? "bg-mediumGray"
                              : ""
                          } ${distance.isGoing ? "no-hover" : ""}`}
                          disabled={distance.isGoing || race.isHost}
                        >
                          {selectedPaymentDistanceId === distance.distanceId
                            ? "Schowaj"
                            : distance.isGoing
                            ? "Jesteś już zapisany"
                            : "Zapisz się"}
                        </button>
                      )}
                    </>
                  ) : (
                    <p className="text-red-500">
                      {isCancelled(distance)
                        ? "Rejestracja jest zamknięta"
                        : "Brak miejsc dostępnych"}
                    </p>
                  )}
                </td>
              )}
              <td className="border px-2 md:px-4 py-2 text-center">
                {!isCancelled(distance) && (
                  <button
                    onClick={() => {
                      setSelectedDistance(race.raceId, distance.distanceId!);
                      toggleAttendeesList(distance.distanceId!);
                    }}
                    className={`text-deepBlack font-bold py-2 px-4 rounded w-full mt-2 ${
                      selectedAttendeesDistanceId === distance.distanceId
                        ? "bg-mediumGray"
                        : ""
                    }`}
                    style={{ whiteSpace: "nowrap" }}
                  >
                    {selectedAttendeesDistanceId === distance.distanceId
                      ? !isMobile
                        ? "Ukryj listę startową"
                        : "Ukryj"
                      : !isMobile
                      ? "Pokaż listę startową"
                      : "Pokaż"}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedPaymentDistanceId !== null &&
        distances.find((d) => d.distanceId === selectedPaymentDistanceId) && (
          <CheckoutForm
            raceId={race.raceId}
            distanceId={selectedPaymentDistanceId}
            price={
              distances.find((d) => d.distanceId === selectedPaymentDistanceId)!
                .price
            }
          />
        )}
      {selectedAttendeesDistanceId !== null && (
        <AttendeesList
          distance={
            distances.find((d) => d.distanceId === selectedAttendeesDistanceId)!
          }
          attendees={
            distances.find((d) => d.distanceId === selectedAttendeesDistanceId)!
              .distanceAttendees || []
          }
        />
      )}
    </div>
  );
});
