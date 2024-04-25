import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { Button, Spinner, Table } from "flowbite-react";

export default observer(function DashboardMain() {
  const { userStore, distanceStore } = useStore();
  const { user } = userStore;
  const {
    loadAllExitsDistances,
    hostDistances,
    generateDistanceIncomeReport,
    reportByDistanceId,
    isLoadingReport,
  } = distanceStore;

  const [visibleReports, setVisibleReports] = useState(new Set<number>());

  useEffect(() => {
    if (hostDistances.length === 0) {
      loadAllExitsDistances();
    }
  }, [loadAllExitsDistances, hostDistances]);

  const toggleReportVisibility = (distanceId: number) => {
    const newVisibleReports = new Set(visibleReports);
    if (newVisibleReports.has(distanceId)) {
      newVisibleReports.delete(distanceId);
    } else {
      newVisibleReports.add(distanceId);
      if (!reportByDistanceId(distanceId)) {
        generateDistanceIncomeReport(distanceId);
      }
    }
    setVisibleReports(newVisibleReports);
  };

  const handleDownloadAttendees = (distanceId: number) => {
    const report = reportByDistanceId(distanceId);
    if (report && report.attendees) {
      const headers = "Nr;Imie;Nazwisko;Klub;Data urodzenia; Plec";

      const csvContent =
        "data:text/csv;charset=utf-8," +
        headers +
        "\n" +
        report.attendees
          .map(
            (e, index) =>
              `${index + 1};${e.firstName};${e.lastName};${e.club};${
                e.dateOfBirth
              };${e.gender}`
          )
          .join("\n");

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `${report.name}_listaStartowa.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  };
  return (
    <div className="w-full lg:ml-[250px] md:pr-2 mt-8">
      <div className="flex-grow p-2 md:p-6 bg-white rounded-lg shadow-md">
        <div className="max-w-full p-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 text-center">
              System Wspomagający Zarządzanie Biegami
            </h1>
            <p className="text-lg text-center">
              Zalogowany jako:{" "}
              <span className="font-bold">{user?.displayName}</span>
            </p>
          </div>

          {hostDistances.length !== 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-2">Raporty Dystansów</h2>
              {hostDistances.map((distance) => (
                <div key={distance.distanceId} className="mb-4">
                  <div className="flex items-center justify-between">
                    <span>
                      {distance.name} ({distance.lengthInKilometers} km) - data
                      biegu: {distance.date?.toLocaleDateString()}
                    </span>
                    {distance.registeredUser === 0 ? (
                      <Button
                        color="failure"
                        disabled
                        className="hover:bg-red-500 hover:text-white"
                      >
                        Brak zawodników
                      </Button>
                    ) : (
                      <Button
                        onClick={() =>
                          toggleReportVisibility(distance.distanceId!)
                        }
                        color="success"
                        disabled={distance.registeredUser === 0}
                      >
                        {isLoadingReport(distance.distanceId!) ? (
                          <Spinner size="sm" light={true} />
                        ) : visibleReports.has(distance.distanceId!) ? (
                          "Ukryj Raport"
                        ) : (
                          "Generuj Raport"
                        )}
                      </Button>
                    )}
                  </div>
                  {distance.distanceId &&
                    visibleReports.has(distance.distanceId) &&
                    reportByDistanceId(distance.distanceId!) && (
                      <Table striped={true} className="mt-2 text-center">
                        <Table.Head className="text-xs md:text-md">
                          <Table.HeadCell className="w-1/6 ">
                            Nazwa
                          </Table.HeadCell>
                          <Table.HeadCell className="hidden sm:table-cell w-1/6 ">
                            Długość
                          </Table.HeadCell>
                          <Table.HeadCell className="w-1/6 ">
                            Cena
                          </Table.HeadCell>
                          <Table.HeadCell className="w-1/6 ">
                            Liczba
                          </Table.HeadCell>
                          <Table.HeadCell className="w-1/6">
                            Łączny dochód
                          </Table.HeadCell>
                          <Table.HeadCell className="w-1/6 ">
                            Lista startowa
                          </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="text-xs">
                          <Table.Row>
                            <Table.Cell className="w-1/6">
                              {reportByDistanceId(distance.distanceId)?.name}
                            </Table.Cell>
                            <Table.Cell className="hidden sm:table-cell w-1/6 ">
                              {
                                reportByDistanceId(distance.distanceId)
                                  ?.lengthInKilometers
                              }{" "}
                              km
                            </Table.Cell>
                            <Table.Cell className="w-1/6">
                              {reportByDistanceId(distance.distanceId)?.price}{" "}
                              zł
                            </Table.Cell>
                            <Table.Cell className="w-1/6">
                              {
                                reportByDistanceId(distance.distanceId)
                                  ?.totalAttendees
                              }
                            </Table.Cell>
                            <Table.Cell className="w-1/6">
                              {
                                reportByDistanceId(distance.distanceId)
                                  ?.totalIncome
                              }{" "}
                              zł
                            </Table.Cell>
                            <Table.Cell className="w-1/6">
                              {visibleReports.has(distance.distanceId!) &&
                                distanceStore.reportByDistanceId(
                                  distance.distanceId!
                                ) && (
                                  <Button
                                    onClick={() =>
                                      handleDownloadAttendees(
                                        distance.distanceId!
                                      )
                                    }
                                    color="warning"
                                    className="mx-auto"
                                  >
                                    <span className="text-xs text-center">
                                      Pobierz
                                    </span>
                                  </Button>
                                )}
                            </Table.Cell>
                          </Table.Row>
                        </Table.Body>
                      </Table>
                    )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
