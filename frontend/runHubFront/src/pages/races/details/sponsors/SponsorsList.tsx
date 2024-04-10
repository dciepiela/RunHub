import { observer } from "mobx-react-lite";
import { RaceDto } from "../../../../app/models/race";

interface Props {
  race: RaceDto;
}

export default observer(function SponsorsList({ race }: Props) {
  return (
    <>
      {race.sponsors && race.sponsors.length > 0 && (
        <div className="w-full">
          <div className="bg-white shadow-md rounded-md p-4 mx-auto md:max-w-[1240px]">
            <h2 className="text-3xl font-bold text-center text-lightYellow">
              Sponsorzy biegu
            </h2>

            {race.sponsors.map((sponsor) => (
              <div key={sponsor.sponsorId} className="text-center">
                <p className="text-xl py-6 font-bold text-deepBlack">
                  {sponsor.name}
                </p>
                <div className="grid md:grid-cols-2 gap-4 px-2 text-center">
                  <div className="border py-8 rounded-xl shadow-xl">
                    <p className="text-2xl font-bold text-lightYellow">
                      Informacje o sponsorze
                    </p>
                    <p className="text-mediumGray-400 mt-2">
                      <b>Opis: </b>
                      {sponsor.description}
                    </p>
                    <p className="text-mediumGray-400 mt-2">
                      <b>Link do strony: </b>
                      <a
                        href={sponsor.webPageUrl}
                        className="text-lightYellow hover:underline"
                      >
                        {sponsor.name}
                      </a>
                    </p>
                    <p className="text-mediumGray-400 mt-2">
                      <b>Wsparcie: </b> {sponsor.supportType}
                    </p>
                  </div>
                  <div className="border py-8 rounded-xl shadow-xl">
                    <img
                      src={sponsor.logo}
                      alt={sponsor.name}
                      className="mx-auto h-48"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
});
