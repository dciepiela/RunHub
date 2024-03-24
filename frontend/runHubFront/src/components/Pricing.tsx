import { CheckIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

function Pricing() {
  return (
    <div className="w-full text-white mt-10">
      <div className="w-full h-[600px] bg-whiteNeutral absolute">
        <h3 className="text-5xl mt-10 font-bold text-lightYellow py-8 text-center uppercase">
          Organizuj lub bierz udział w biegu!
        </h3>
      </div>

      <div className="max-w-[1240px] mx-auto">
        <div className="text-center py-8 text-mediumGray">
          <h2 className="text-3xl uppercase ">Pricing</h2>

          <p className="text-3xl">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia
            laudantium odio ullam inventore aliquid ipsum quasi tenetur velit
            voluptatum iste.
          </p>
        </div>

        <div className="grid md:grid-cols-2">
          <div className="bg-white text-black m-4 p-8 rounded-xl shadow-2xl relative">
            <span className="uppercase px-3 py-1 bg-lightYellow rounded-2xl text-sm font-bold">
              Zawodnik
            </span>
            <p className="text-xl py-8 text-darkGray text-justify">
              Załóż teraz swoje konto, aby mieć dostęp do rejestracji na
              wydarzenia, informacji o trasach biegów oraz monitorowania
              wyników.
            </p>
            <div className="text-2xl">
              <p className="flex py-4">
                <CheckIcon className="w-8 mr-5 text-green-600" />
                Rejestracja online
              </p>
              <p className="flex py-4">
                <CheckIcon className="w-8 mr-5 text-green-600" />
                Informacje o biegu
              </p>
              <p className="flex py-4">
                <CheckIcon className="w-8 mr-5 text-green-600" />
                Monitorowanie wyników
              </p>
              <p className="flex py-4">
                <CheckIcon className="w-8 mr-5 text-green-600" />
                Komunikacja z organizatorami
              </p>
              <Link to="registerCompetitor">
                <button className="w-full py-4 my-4 md:text-lg uppercase font-bold">
                  Dołącz jako Zawodnik
                </button>
              </Link>
            </div>
          </div>

          <div className="bg-white text-black m-4 p-8 rounded-xl shadow-2xl relative">
            <span className="uppercase px-3 py-1 bg-lightYellow rounded-2xl text-sm font-bold">
              Organizator
            </span>

            <p className="text-xl py-8 text-darkGray text-justify">
              Skorzystaj już teraz z systemu do zarządzania rejestracją, trasą
              biegu, komunikacją z uczestnikami i publikacją wyników.
            </p>
            <div className="text-2xl">
              <p className="flex py-4">
                <CheckIcon className="w-8 mr-5 text-green-600" />
                Zarządzanie rejestracją
              </p>
              <p className="flex py-4">
                <CheckIcon className="w-8 mr-5 text-green-600" />
                Zarządzanie wynikami
              </p>
              <p className="flex py-4">
                <CheckIcon className="w-8 mr-5 text-green-600" />
                Bezpieczeństwo
              </p>
              <p className="flex py-4">
                <CheckIcon className="w-8 mr-5 text-green-600" />
                Obsługa dużej ilości uczestników
              </p>
              <Link to="registerOrganizer">
                <button className="w-full py-4 my-4 md:text-lg uppercase font-bold">
                  Dołącz jako Organizator
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
