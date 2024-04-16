import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { RaceDto, RaceStatus } from "../../../app/models/race";
import AttendeesList from "./attendees/AttendeesList";
import SponsorsList from "./sponsors/SponsorsList";
import CheckoutForm from "../../../components/payment/CheckoutForm";

interface Props {
  race: RaceDto;
}

const DistanceDetails2: React.FC<Props> = observer(({ race }) => {
  const [activeTab, setActiveTab] = useState<"distance" | "sponsor">(
    "distance"
  );

  const [selectedPaymentDistanceId, setSelectedPaymentDistanceId] = useState<
    number | null
  >(null);

  const [selectedAttendeesDistanceId, setSelectedAttendeesDistanceId] =
    useState<number | null>(null);

  const togglePaymentForm = (distanceId: number) => {
    setSelectedPaymentDistanceId(
      selectedPaymentDistanceId === distanceId ? null : distanceId
    );
  };

  const toggleAttendeesList = (distanceId: number) => {
    setSelectedAttendeesDistanceId(
      selectedAttendeesDistanceId === distanceId ? null : distanceId
    );
  };

  return (
    <div className="w-full my-6">
      {race.distances && race.distances.length > 0 && (
        <div className="max-w-[1240px] mx-auto">
          <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
            <ul
              className="flex -mb-px text-xs md:text-sm font-medium justify-center"
              role="tablist"
            >
              <li className="me-2" role="presentation">
                <button
                  className={`p-3 md:p-4 border-b-2 rounded-t-lg ${
                    activeTab === "distance"
                      ? "border-mediumGray"
                      : "border-transparent"
                  }`}
                  onClick={() => setActiveTab("distance")}
                  aria-selected={activeTab === "distance"}
                >
                  Dystanse
                </button>
              </li>
              <li className="me-2" role="presentation">
                <button
                  className={`p-3 md:p-4 border-b-2 rounded-t-lg ${
                    activeTab === "sponsor"
                      ? "border-mediumGray"
                      : "border-transparent"
                  }`}
                  onClick={() => setActiveTab("sponsor")}
                  aria-selected={activeTab === "sponsor"}
                >
                  Sponsorzy
                </button>
              </li>
            </ul>
          </div>

          <div id="default-tab-content">
            <div
              className={`p-4 rounded-lg ${
                activeTab === "distance" ? "block" : "hidden"
              } dark:bg-darkGray`}
            >
              <div className="mt-4">
                <table className="mx-auto text-xs md:text-sm">
                  <thead>
                    <tr>
                      <th className="px-2 md:px-4 py-2">Nazwa</th>
                      <th className="px-2 md:px-4 py-2 hidden md:block">
                        Opis
                      </th>
                      <th className="px-2 md:px-4 py-2">Dystans (km)</th>
                      <th className="px-2 md:px-4 py-2 hidden md:block">
                        Dostępne miejsca
                      </th>
                      <th className="px-2 md:px-4 py-2">Cena</th>
                      {race.raceStatus === RaceStatus.RegistrationOpen && (
                        <th className="px-2 md:px-4 py-2">Rejestracja</th>
                      )}
                      <th className="px-2 md:px-4 py-2">Lista startowa</th>
                    </tr>
                  </thead>
                  <tbody>
                    {race.distances.map((distance) => (
                      <tr key={distance.distanceId}>
                        <td className="border px-2 md:px-4 py-2 bg-gray-100">
                          {distance.name}
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
                          {distance.price} zł
                        </td>
                        {race.raceStatus === RaceStatus.RegistrationOpen && (
                          <td className="border px-2 md:px-4 py-2 text-center">
                            {(distance.availableSlots > 0 &&
                              !race.registrationEndDate) ||
                            new Date(race.registrationEndDate) > new Date() ? (
                              <button
                                onClick={() =>
                                  togglePaymentForm(distance.distanceId)
                                }
                                className={`text-deepBlack font-bold py-2 px-4 rounded w-full whitespace-nowrap ${
                                  selectedPaymentDistanceId ===
                                  distance.distanceId
                                    ? "bg-mediumGray"
                                    : ""
                                } ${distance.isGoing ? "no-hover" : ""}`}
                                disabled={distance.isGoing}
                              >
                                {selectedPaymentDistanceId ===
                                distance.distanceId
                                  ? "Schowaj"
                                  : distance.isGoing
                                  ? "Jesteś już zapisany"
                                  : "Zapisz się"}
                              </button>
                            ) : (
                              <span className="text-red-500 font-bold">
                                {race.registrationEndDate &&
                                new Date(race.registrationEndDate) <= new Date()
                                  ? "Zamknięte zapisy"
                                  : "Brak miejsc"}
                              </span>
                            )}
                          </td>
                        )}
                        <td className="border px-2 md:px-4 py-2 text-center">
                          <button
                            onClick={() =>
                              toggleAttendeesList(distance.distanceId)
                            }
                            className={`text-deepBlack font-bold py-2 px-4 rounded w-full mt-2 ${
                              selectedAttendeesDistanceId ===
                              distance.distanceId
                                ? "bg-mediumGray"
                                : ""
                            }`}
                            style={{ whiteSpace: "nowrap" }}
                          >
                            {selectedAttendeesDistanceId === distance.distanceId
                              ? "Ukryj listę startową"
                              : "Pokaż listę startową"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {selectedPaymentDistanceId !== null && (
                  <CheckoutForm
                    raceId={race.raceId}
                    distanceId={selectedPaymentDistanceId}
                    price={
                      race.distances.find(
                        (d) => d.distanceId === selectedPaymentDistanceId
                      )!.price
                    }
                  />
                )}
                {selectedAttendeesDistanceId !== null && (
                  <AttendeesList
                    distance={
                      race.distances.find(
                        (d) => d.distanceId === selectedAttendeesDistanceId
                      )!
                    }
                    attendees={
                      race.distances.find(
                        (d) => d.distanceId === selectedAttendeesDistanceId
                      )!.distanceAttendees || []
                    }
                  />
                )}
              </div>
            </div>
            <div
              className={`p-4 rounded-lg ${
                activeTab === "sponsor" ? "block" : "hidden"
              }`}
            >
              <SponsorsList race={race} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default DistanceDetails2;
