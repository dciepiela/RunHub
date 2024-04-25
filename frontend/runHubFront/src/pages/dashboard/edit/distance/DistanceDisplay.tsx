import { useEffect } from "react";
import { useStore } from "../../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Table } from "flowbite-react";
import { distanceStatusOptions } from "../../../../app/models/distance";

export default observer(function DistanceDisplay() {
  const navigate = useNavigate();
  const { distanceStore } = useStore();
  const { loadDistances, distances, deleteDistance } = distanceStore;
  const { raceId } = useParams<{ raceId: string }>();

  useEffect(() => {
    loadDistances(Number(raceId));
  }, [loadDistances, raceId]);

  const truncateDescription = (description: string, maxLength: number) => {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + "...";
    } else {
      return description;
    }
  };

  function handleDelete(distanceId: number) {
    if (window.confirm("Jesteś pewny, że chcesz usunąć ten dystans?")) {
      deleteDistance(Number(raceId), distanceId);
    }
  }

  return (
    <div className="mx-auto md:ml-[230px] w-[100%] flex justify-center items-center mt-14">
      <div className="w-full px-4">
        <Table>
          <Table.Head>
            <Table.HeadCell>Nazwa</Table.HeadCell>
            <Table.HeadCell className="hidden md:table-cell">
              Opis
            </Table.HeadCell>
            <Table.HeadCell className="hidden md:table-cell">
              Długość (km)
            </Table.HeadCell>
            <Table.HeadCell>Dostępne miejsca</Table.HeadCell>
            <Table.HeadCell className="hidden md:table-cell">
              Łączna liczba miejsc
            </Table.HeadCell>
            <Table.HeadCell>Cena</Table.HeadCell>
            <Table.HeadCell>Liczba zapisanych</Table.HeadCell>
            <Table.HeadCell>Status dystansu</Table.HeadCell>
            <Table.HeadCell>Edytuj dystans</Table.HeadCell>
            <Table.HeadCell>Usuń dystans</Table.HeadCell>
            <Table.HeadCell>Dodaj zawodnika</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {distances.map((distance) => (
              <Table.Row
                key={distance.distanceId}
                className={`bg-white dark:border-deepBlack ${
                  distance.status === 1
                    ? "bg-red-500 text-gray-500 cursor-not-allowed"
                    : ""
                }`}
              >
                <Table.Cell>{distance.name}</Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  {distance.description &&
                    truncateDescription(distance.description, 20)}
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  {distance.lengthInKilometers}
                </Table.Cell>
                <Table.Cell>{distance.availableSlots}</Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  {distance.totalSlots}
                </Table.Cell>
                <Table.Cell>{distance.price}</Table.Cell>
                <Table.Cell>{distance.registeredUser}</Table.Cell>
                <Table.Cell>
                  {distanceStatusOptions.find(
                    (option) => option.value === distance.status
                  )?.text || "Unknown Status"}
                </Table.Cell>
                <Table.Cell>
                  {distance.status !== 1 && (
                    <Link
                      to={`/admin/dashboard/races/${raceId}/distances/edit/${distance.distanceId}`}
                      className="font-medium text-yellow-300 hover:underline"
                    >
                      Edytuj dystans
                    </Link>
                  )}
                </Table.Cell>
                <Table.Cell>
                  {distance.status !== 1 ? (
                    <Button
                      color="failure"
                      onClick={() => handleDelete(distance.distanceId!)}
                      className="text-whiteNeutral hover:text-whiteNeutral"
                    >
                      Usuń dystans
                    </Button>
                  ) : (
                    <Button color="failure">Dystans został usunięty</Button>
                  )}
                </Table.Cell>
                <Table.Cell>
                  {distance.status !== 1 && (
                    <Link
                      to={`/admin/dashboard/races/${raceId}/distances/${distance.distanceId}/addCompetitor`}
                      className="font-medium text-green-500 hover:underline"
                    >
                      Dodaj zawodnika
                    </Link>
                  )}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <Button
          type="button"
          onClick={() => navigate(-1)}
          color="failure"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md"
        >
          Wróć
        </Button>
      </div>
    </div>
  );
});
