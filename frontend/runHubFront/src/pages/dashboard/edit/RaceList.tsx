import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../../../app/stores/store";
import { Button, ListGroup, Select } from "flowbite-react";
import { Link } from "react-router-dom";
import { raceStatusOptions } from "../../../app/models/race";
import { toast } from "react-toastify";

export default observer(function RaceList() {
  const { raceStore } = useStore();
  const { loadHostingRaces, races, updateRaceStatus } = raceStore;

  useEffect(() => {
    loadHostingRaces();
  }, [loadHostingRaces]);

  const handleStatusChange = async (raceId: number, newStatus: number) => {
    await updateRaceStatus(raceId, newStatus);
    loadHostingRaces();
    toast.success(`Zmieniono status biegu`);
  };

  return (
    <div className="md:ml-[240px] mx-auto flex justify-center h-screen w-[100%] gap-4 mt-2">
      <div className="w-[100%] px-4">
        <ListGroup>
          {races.map((race) => (
            <ListGroup.Item
              key={race.raceId}
              className="flex flex-col items-center py-4 space-y-3"
            >
              <Select
                aria-label="Zmień status biegu"
                value={race.raceStatus}
                onChange={(e) =>
                  handleStatusChange(race.raceId, Number(e.target.value))
                }
                className="md:w-[25%]"
              >
                {raceStatusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </Select>
              <div className="text-center w-1/4">
                <Link to={`/races/${race.raceId}`}>
                  <h5 className="text-lg font-bold">{race.name}</h5>
                </Link>

                <p className="text-sm text-gray-500">
                  Data biegu:{" "}
                  {new Date(race.startDateRace!).toLocaleDateString()}
                </p>
              </div>
              <div className="flex flex-col w-full items-center space-y-2">
                {/* Column of buttons */}
                <Button
                  as={Link}
                  to={`/admin/dashboard/races/edit/${race.raceId}`}
                  color="warning"
                  className="w-3/4"
                >
                  Edytuj dane biegu
                </Button>
                <Button
                  as={Link}
                  to={`/admin/dashboard/photoUpload/${race.raceId}`}
                  color="warning"
                  className="w-3/4"
                >
                  Edytuj zdjęcie
                </Button>
                <Button
                  as={Link}
                  to={`/admin/dashboard/races/${race.raceId}/distances/view`}
                  color="blue"
                  className="w-3/4"
                >
                  Wyświetl dystanse
                </Button>
                <Button
                  as={Link}
                  to={`/admin/dashboard/races/${race.raceId}/sponsors/view`}
                  color="blue"
                  className="w-3/4"
                >
                  Wyświetl sponsorów
                </Button>
                <Button
                  as={Link}
                  to={`/admin/dashboard/races/${race.raceId}/sponsors/create`}
                  color="success"
                  className="w-3/4"
                >
                  Dodaj sponsora
                </Button>
                <Button
                  as={Link}
                  to={`/admin/dashboard/races/${race.raceId}/distances/create`}
                  color="success"
                  className="w-3/4"
                >
                  Dodaj dystans
                </Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  );
});
