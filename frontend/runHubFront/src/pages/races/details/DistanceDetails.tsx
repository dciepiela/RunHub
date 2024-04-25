import { useState } from "react";
import { observer } from "mobx-react-lite";
import { RaceDto } from "../../../app/models/race";
import SponsorsList from "./sponsors/SponsorsList";
import { IDistanceDto } from "../../../app/models/distance";
import DistancesList from "./DistancesList/DistancesList";

interface Props {
  race: RaceDto;
  distances: IDistanceDto[];
}

export default observer(function DistanceDetails({ race, distances }: Props) {
  // const { selectedDistance, setSelectedDistance } = distanceStore;

  const [activeTab, setActiveTab] = useState<"distance" | "sponsor">(
    "distance"
  );

  return (
    <div className="w-full my-6">
      {distances.length > 0 && (
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
              <DistancesList race={race} distances={distances} />
            </div>

            <div
              className={`p-4 rounded-lg ${
                activeTab === "sponsor" ? "block" : "hidden"
              }`}
            >
              <SponsorsList sponsors={race.sponsors || []} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
