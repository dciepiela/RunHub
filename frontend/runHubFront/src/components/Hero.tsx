import bgImg from "../assets/runners.jpg";
import { ReactTyped } from "react-typed";
import { SiElastic } from "react-icons/si";
import { IoMdSpeedometer } from "react-icons/io";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { GrSecure } from "react-icons/gr";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="w-full h-screen bg-whiteNeutral flex flex-col justify-between">
      <div className="grid md:grid-cols-2 max-w-[1240px] m-auto">
        <div className="flex flex-col items-center justify-center md:items-start w-full px-2 py-8 text-center sm:text-left">
          <ReactTyped
            className="py-4 md:text-4xl sm:text-3xl text-xl font-bold pl-1 text-[#F2C46D]"
            strings={["PODEJMIJ WYZWANIE", "WYSTARTUJ", "ZWYCIĘŻAJ"]}
            typeSpeed={120}
            backSpeed={140}
            loop
          />
          <h1 className="py-3 text-5xl sm:text-7xl font-bold ">
            System zapisów
          </h1>
          <p className="text-2xl">
            RunHub to bezpieczna i szybka rejestracja na biegi, oferty
            organizatorów z całej Polski dla osób aktywnych.
          </p>
          <Link to="/races">
            <button className="py-3 px-6 my-4 uppercase">Zobacz biegi</button>
          </Link>
        </div>
        <div>
          <img className="w-full rounded-lg shadow-lg" src={bgImg} alt="" />
        </div>
        <div className="absolute flex flex-col py-8 md:min-w-[760px] bottom-[5%] mx-1 sm:left-1/2 transform sm:-translate-x-1/2 bg-whiteNeutral border border-mediumGray rounded-xl text-center shadow-xl">
          <p className="font-bold uppercase">System obsługujący biegi masowe</p>
          <div className="flex justify-between flex-wrap px-4 pt-4">
            <p className="flex px-4 py-2 text-darkGray">
              <IoPhonePortraitOutline className="size-6 mr-2 text-lightYellow" />
              Wygoda
            </p>
            <p className="flex px-4 py-2 text-darkGray">
              <IoMdSpeedometer className="size-6 mr-2 text-lightYellow" />
              Szybkość
            </p>
            <p className="flex px-4 py-2 text-darkGray">
              <SiElastic className="size-6 mr-2 text-lightYellow" />
              Elastyczność
            </p>
            <p className="flex px-4 py-2 text-darkGray">
              <GrSecure className="size-6 mr-2 text-lightYellow" />
              Bezpieczeństwo
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
