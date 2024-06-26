import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaTwitch,
  FaTwitter,
} from "react-icons/fa";

import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";

function Footer() {

  return (
    <footer className="w-full bg-[#F2C46D] text-[#0D0D0D] py-2 px-2 min-h-[30vh]">
      <div className="max-w-[1240px] mx-auto border-b-2 border-gray-600 py-8 flex flex-col md:flex-row items-center justify-between">
        <div className="md:flex items-center">
          <h6 className="font-bold uppercase pt-2 text-2xl text-center md:mr-4">
            Runhub
          </h6>
          <img src={logo} alt="logo" className="h-20 mx-auto" />
        </div>

        <ul className="list-none flex flex-col text-center justify-center md:flex-row ">
          <li className="mr-4 font-bold">
            <Link to="/" className="text-deepBlack hover:text-darkGray">
              Strona główna
            </Link>
          </li>
          <li className="mr-4">
            <Link to="/races" className="text-deepBlack hover:text-darkGray">
              Biegi
            </Link>
          </li>
          <li className="mr-4">
            <Link to="/results" className="text-deepBlack hover:text-darkGray">
              Wyniki
            </Link>
          </li>
          <li className="mr-4">
            <Link to="/about" className="text-deepBlack hover:text-darkGray">
              O nas
            </Link>
          </li>
          <li className="mr-4">
            <Link to="/contact" className="text-deepBlack hover:text-darkGray">
              Kontakt
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex flex-col max-w-[1240px] px-2 py-4 mx-auto justify-between sm:flex-row text-center text-gray-500">
        <p className="py-4">
          &copy; {new Date().getFullYear()} RunHub. Wszelkie Prawa Zastrzeżone.
        </p>
        <div className="flex justify-between sm:w-[300px] pt-4 text-2xl">
          <FaFacebook />
          <FaInstagram />
          <FaTwitter />
          <FaTwitch />
          <FaGithub />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
