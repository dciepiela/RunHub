import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="bg-whiteNeutral min-h-[70vh] flex flex-col justify-center items-center">
      <div className="max-w-md w-full p-6 bg-whiteNeutral rounded-lg shadow-lg">
        <div className="text-center">
          <FaSearch className="h-12 w-12 mx-auto text-lightYellow" />

          <h1 className="text-xl font-bold text-gray-800 mt-4">
            Ups! Szukaliśmy wszędzie, ale nie mogliśmy znaleźć tego, czego
            szukasz!
          </h1>
        </div>
        <div className="mt-6 flex justify-center">
          <Link
            to="/"
            className="text-white bg-lightYellow hover:bg-darkGray px-4 py-2 rounded-lg "
          >
            Wróć do strony głównej
          </Link>
        </div>
      </div>
    </div>
  );
}
