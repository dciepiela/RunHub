import { Button, Table } from "flowbite-react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useStore } from "../../../../app/stores/store";
import { ISponsorDto } from "../../../../app/models/sponsor";
import { observer } from "mobx-react-lite";

export default observer(function SponsorDisplay() {
  const navigate = useNavigate();
  const { sponsorStore } = useStore();
  const { loadSponsors, sponsors, deleteSponsor } = sponsorStore;
  const { raceId } = useParams<{ raceId: string }>();

  useEffect(() => {
    loadSponsors(Number(raceId));
  }, [loadSponsors, raceId]);

  const truncateDescription = (description: string, maxLength: number) => {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + "...";
    } else {
      return description;
    }
  };

  function handleDelete(sponsorId: number) {
    if (window.confirm("Jesteś pewny, że chcesz usunąć tego sponsora?")) {
      deleteSponsor(Number(raceId), sponsorId);
    }
  }
  return (
    <div className="mx-auto md:ml-[230px] w-[100%] flex justify-center items-center mt-14">
      <div className="w-full px-4">
        <Table>
          <Table.Head>
            <Table.HeadCell>Nazwa</Table.HeadCell>
            <Table.HeadCell className="hidden md:table-cell">
              Krótki opis
            </Table.HeadCell>
            <Table.HeadCell className="hidden md:table-cell">
              Strona www sponsora
            </Table.HeadCell>
            <Table.HeadCell>Kwota wsparcia</Table.HeadCell>
            <Table.HeadCell>Rodzaj wsparcia</Table.HeadCell>
            <Table.HeadCell className="hidden md:table-cell">
              Logo
            </Table.HeadCell>
            <Table.HeadCell>Edytuj sponsora</Table.HeadCell>
            <Table.HeadCell>Usuń sponsora</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {sponsors.map((sponsor: ISponsorDto) => (
              <Table.Row
                key={sponsor.sponsorId}
                className="bg-white  dark:border-deepBlack"
              >
                <Table.Cell className="hidden md:table-cell">
                  {sponsor.name}
                </Table.Cell>
                <Table.Cell>
                  {truncateDescription(sponsor.description!, 20)}
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  {sponsor.webPageUrl}
                </Table.Cell>
                <Table.Cell>{sponsor.amount}</Table.Cell>
                <Table.Cell>{sponsor.supportType}</Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  {sponsor.logo ? (
                    <img
                      src={sponsor.logo}
                      alt={sponsor.name}
                      className="h-10 w-10"
                    />
                  ) : (
                    "Brak logo"
                  )}
                </Table.Cell>
                <Table.Cell>
                  <Link
                    to={`/admin/dashboard/races/${raceId}/sponsors/edit/${sponsor.sponsorId}`}
                    className="font-medium text-yellow-300 hover:underline"
                  >
                    Edytuj sponsora
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <Button
                    color="failure"
                    onClick={() => handleDelete(sponsor.sponsorId!)}
                    className="text-whiteNeutral hover:text-whiteNeutral"
                  >
                    Usuń sponsora
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <Button
          type="button"
          onClick={() => navigate(-1)}
          color="failure"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md "
        >
          Wróć
        </Button>
      </div>
    </div>
  );
});
