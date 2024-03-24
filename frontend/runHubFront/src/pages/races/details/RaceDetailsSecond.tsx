import { useEffect } from "react";
import Runners from "../../../assets/raceDetails.jpg"; // Assuming this is the correct path to your image
import { useParams } from "react-router-dom";
// import RaceDetailsHero from "./RaceDetailsBanner";
import RaceDetailsInfo from "./RaceDetailsInfo";

export default function RaceDetailsSecond() {
  const { id } = useParams();

  useEffect(() => {
    console.log(id);
  }, [id]);

  return (
    <div>
      {/* <RaceDetailsHero /> */}
      <RaceDetailsInfo />
      <div className="mx-auto max-w-[1240px] md:gap-0 py-4 h-[50vh] pl-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-80">
          <div className="flex items-center justify-center md:justify-start h-full">
            <img className="w-auto h-full" src={Runners} alt="jpg" />
          </div>
          <div className="flex flex-col justify-end md:justify-start">
            <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold mb-4">
              Bieg (tytuł)
            </h1>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1240px] md:gap-0 py-4 bg-white pl-10">
        <div className="mb-4">
          <h3 className="font-bold">Status wydarzenia</h3>
          <p>Rejestracja otwarta</p>
          <p>Do zakończenia zapisów zostało: 0d 0g 32min</p>
        </div>
        <div className="mb-4">
          <h3 className="font-bold">Ilość uczestników</h3>
          <p>277</p>
        </div>
        <div className="mb-4">
          <h3 className="font-bold">Lokalizacja</h3>
          <p>Ruda Śląska</p>
        </div>
        <div className="mb-4">
          <h3 className="font-bold">Start</h3>
          <p>16.03.2024 11:00</p>
        </div>
        <div className="mb-4">
          <h3 className="font-bold">Organizator</h3>
          <p>MOSiR Ruda Śląska</p>
          <p>
            E-mail organizatora:{" "}
            <a href="mailto:augustjakubik@op.pl">augustjakubik@op.pl</a>
          </p>
          <p>Telefon organizatora: 506334584</p>
        </div>
        <div className="mb-4">
          <h3 className="font-bold">Klasyfikacje</h3>
          <div className="mb-2">
            <h4 className="font-bold">Bieg Główny</h4>
            <p>Dystans: 21 km</p>
            <p>Płeć: K,M</p>
            <p>Wiek: 0-100</p>
            <p>Ilość uczestników: 108</p>
            <p>Opłaty: Do 13.03.2024 - 30.00 zł</p>
          </div>
          <div className="mb-2">
            <h4 className="font-bold">Nordic Walking</h4>
            <p>Dystans: 12.6 km</p>
            <p>Płeć: K,M</p>
            <p>Wiek: 0-100</p>
            <p>Ilość uczestników: 67</p>
            <p>Opłaty: Do 13.03.2024 - 30.00 zł</p>
          </div>
          <div className="mb-2">
            <h4 className="font-bold">Bieg dzieci</h4>
            <p>Dystans: 1 km</p>
            <p>Płeć: K,M</p>
            <p>Wiek: 0-15</p>
            <p>Ilość uczestników: 102</p>
            <p>Opłaty: Do 13.03.2024 - 15.00 zł</p>
          </div>
        </div>
        <div>
          <h3 className="font-bold mb-2">Mapa</h3>
          <ul>
            <li>Bieg Główny</li>
            <li>Nordic Walking</li>
            <li>Bieg dzieci</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
