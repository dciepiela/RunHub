import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { pl } from "date-fns/locale"; // Import Polish locale
import { Link } from "react-router-dom";
import { DEFAULT_RACE_URL } from "../../config";
import ClipLoader from "react-spinners/ClipLoader";
import { FaCalendar } from "react-icons/fa";

const panes = [
  {
    menuItem: "Odbyte biegi",
    pane: { key: "past" },
    condition: () => true,
  },
  {
    menuItem: "Przyszłe biegi",
    pane: { key: "future" },
    condition: () => true,
  },
  {
    menuItem: "Jesteś organizatorem",
    pane: { key: "hosting" },
    condition: (userRole) => userRole === "Organizer",
  },
];

export default observer(function ProfileDistances() {
  const {
    profileStore,
    userStore: { user },
  } = useStore();
  const { loadUserDistances, profile, loadingDistances, userDistances } =
    profileStore;

  const [activeTabIndex, setActiveTabIndex] = useState(0);

  useEffect(() => {
    if (profile) {
      loadUserDistances(profile.userName, panes[activeTabIndex].pane.key);
    }
  }, [loadUserDistances, profile, activeTabIndex]);

  //   const handleTabChange = (e: SyntheticEvent, data) => {
  //     loadUserDistances(
  //       profile!.userName,
  //       panes[data.activeIndex as number].pane.key
  //     );
  //   };

  const handleTabChange = (index: number) => {
    if (index === activeTabIndex) {
      return;
    }
    setActiveTabIndex(index); // Update the active tab index state
    loadUserDistances(profile!.userName, panes[index].pane.key);
  };

  if (loadingDistances) {
    return (
      <div className="flex justify-center items-center h-[100%]">
        <ClipLoader
          size={50} // Size of the spinner (width and height)
          loading={loadingDistances}
          color="#000000" // Color of the spinner
          aria-label="Loading Spinner"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1">
        <div className="flex justify-center items-center">
          <FaCalendar className="mr-2 md:mr-4" />
          <h1 className="font-bold text-md md:text-3xl">
            Informacje o {profile?.displayName}
          </h1>
        </div>
        <div>
          <div className="border-b border-gray-200">
            <ul className="flex -mb-px text-sm font-medium text-center text-gray-500 overflow-x-auto">
              {panes.map((pane, index) =>
                user?.role === "Organizer" || pane.condition(user?.role) ? (
                  <li key={index} className="mr-2">
                    <button
                      onClick={() => handleTabChange(index)}
                      className={`text-black inline-block p-2 md:p-4 rounded-t-lg border-b-2 ${
                        activeTabIndex === index
                          ? "bg-mediumGray text-black"
                          : "border-transparent hover:text-gray-600 hover:border-gray-300"
                      }`}
                      disabled={activeTabIndex === index}
                    >
                      {pane.menuItem}
                    </button>
                  </li>
                ) : null
              )}
            </ul>
          </div>
          <br />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            {userDistances.map((distance) => (
              <div
                key={distance.distanceId}
                className="rounded overflow-hidden shadow-lg"
              >
                <Link to={`/races/${distance.raceId}`}>
                  <img
                    className="w-full h-32 md:h-48 object-cover"
                    src={distance.image ? distance.image : DEFAULT_RACE_URL}
                    alt={distance.name}
                  />
                  <div className="px-6 py-4">
                    <div className="font-bold text-center mb-2">
                      {distance.name}
                    </div>
                    <p className="text-gray-700 text-sm md:text-base text-center">
                      {format(new Date(distance.date), "do LLL", {
                        locale: pl,
                      })}
                      <br />
                      {format(new Date(distance.date), "HH:mm", {
                        locale: pl,
                      })}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});
