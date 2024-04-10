import React, { useState } from "react";
import { RaceDto, RaceStatus } from "../../../app/models/race";
import AttendeesList from "./attendees/AttendeesList";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import SponsorsList from "./sponsors/SponsorsList";

interface Props {
  race: RaceDto;
}

export default observer(function DistanceDetails({ race }: Props) {
  const [activeTab, setActiveTab] = useState<"distance" | "sponsor">(
    "distance"
  );

  const [selectedDistance, setSelectedDistance] = useState<number | null>(null);
  const { raceStore } = useStore();
  const { updateAttendance, selectDistance } = raceStore;

  const handleAttendeesButtonClick = (distanceId: number) => {
    selectDistance(distanceId); // Highlight the distance in the store
    setSelectedDistance(selectedDistance === distanceId ? null : distanceId);
  };

  const handleTabClick = (tabId: "distance" | "sponsor") => {
    setActiveTab(tabId);
  };

  const handleSelectDistance = (distanceId: number) => {
    setSelectedDistance(distanceId);
  };

  const selectedDistanceDetails = race.distances?.find(
    (distance) => distance.distanceId === selectedDistance
  );

  return (
    <div className="w-full my-6">
      {race.distances!.length > 0 && (
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
                  onClick={() => handleTabClick("distance")}
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
                  onClick={() => handleTabClick("sponsor")}
                  aria-selected={activeTab === "sponsor"}
                >
                  Sponsorzy
                </button>
              </li>
            </ul>
          </div>

          {/* Distance details */}
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
                        <th className="px-2 md:px-4 py-2">Zapisz się</th>
                      )}
                      <th className="px-2 md:px-4 py-2">Lista startowa</th>
                    </tr>
                  </thead>
                  <tbody>
                    {race.distances &&
                      race.distances.map((distance) => (
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
                            ${distance.price}
                          </td>
                          {race.raceStatus === RaceStatus.RegistrationOpen && (
                            <td className="border px-2 md:px-4 py-2 text-center">
                              <button
                                className="text-deepBlack font-bold py-2 px-4 rounded"
                                onClick={() => {
                                  updateAttendance(distance.distanceId);
                                  // selectDistance(distance.distanceId);
                                }}
                                // disabled={loading}
                                disabled={raceStore.loading}
                                type="button"
                              >
                                {distance.isGoing ? "Wypisz się" : "Dołącz"}
                              </button>
                            </td>
                          )}
                          <td className="border px-2 md:px-4 py-2 text-center">
                            <button
                              onClick={() => {
                                handleAttendeesButtonClick(distance.distanceId);
                              }}
                              className={`text-deepBlack font-bold py-2 px-4 rounded w-full ${
                                selectedDistance === distance.distanceId
                                  ? "bg-mediumGray"
                                  : ""
                              }`}
                              style={{ whiteSpace: "nowrap" }}
                            >
                              {selectedDistance === distance.distanceId
                                ? "Schowaj"
                                : "Lista startowa"}
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                {selectedDistance && (
                  // race.distances?.map((distance) => (
                  <AttendeesList
                    key={selectedDistanceDetails!.distanceId}
                    distance={selectedDistanceDetails}
                    attendees={selectedDistanceDetails.distanceAttendees || []}
                  />
                )}
                {/* <AttendeesList
                    key={selectedDistance.distanceId}
                    distance={distance}
                    attendees={selectedDistance.distanceAttendees || []}
                  /> */}
                {/* )} */}
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
