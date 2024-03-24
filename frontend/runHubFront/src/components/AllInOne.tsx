import { CheckIcon } from "@heroicons/react/24/outline";

function AllInOne() {
  return (
    <div className="w-full my-16">
      <div className=" px-2">
        <h2 className="text-5xl font-bold text-center">
          Dlaczego warto do nas dołączyć?
        </h2>
        {/* <p className="text-2xl py-8 text-gray-500 text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
          quisquam, dolorem officia iure nihil ullam consectetur cupiditate, non
          rem voluptas id aliquid repudiandae vel voluptates illum. Vel quo
          voluptas laboriosam?
        </p> */}
      </div>

      <div className="max-w-[1240px] mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10 pt-2">
        <div className="flex">
          <div>
            <CheckIcon className="w-7 mr-4 text-lightYellow" />
          </div>
          <div>
            <h3 className="font-bold text-lg">Szybka rejestracja</h3>
            <p className="text-lg pt-2 pb-4">
              Czy wypełnianie ciągłych formularzy zgłoszeniowych sprawia Ci
              trudność? Dzięki naszemu systemowi oszczędzisz czas podczas
              rejestracji. Wystarczy, że raz wprowadzisz dane teleadresowe, a
              kolejne rejestracje będą tylko formalnością.
            </p>
          </div>
        </div>

        <div className="flex">
          <div>
            <CheckIcon className="w-7 mr-4 text-lightYellow" />
          </div>
          <div>
            <h3 className="font-bold text-lg">Bezstresowa wygoda</h3>
            <p className="text-lg pt-2 pb-4">
              Nie tracisz już czasu na przeszukiwanie Internetu w poszukiwaniu
              informacji o imprezach. Każda impreza na naszej platformie ma swój
              wyjątkowy profil, zawierający wszystkie istotne informacje, które
              Cię interesują.
            </p>
          </div>
        </div>

        <div className="flex">
          <div>
            <CheckIcon className="w-7 mr-4 text-lightYellow" />
          </div>
          <div>
            <h3 className="font-bold text-lg">Innowacyjne rozwiązania</h3>
            <p className="text-lg pt-2 pb-4">
              Jako zarejestrowany użytkownik RunHub masz dostęp do szeregu
              innowacyjnych usług. Dzięki współpracy z naszymi partnerami
              oferujemy unikalne rozwiązania w dziedzinie biegów.
            </p>
          </div>
        </div>

        <div className="flex">
          <div>
            <CheckIcon className="w-7 mr-4 text-lightYellow" />
          </div>
          <div>
            <h3 className="font-bold text-lg"> Dostępność 24/7 </h3>
            <p className="text-lg pt-2 pb-4">
              RunHub umożliwia rejestrację i przeglądanie wydarzeń o dowolnej
              porze. Nie musisz martwić się o godziny otwarcia czy niedostępność
              systemu - jesteśmy zawsze dostępni, aby ułatwić Ci korzystanie z
              naszej platformy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllInOne;
