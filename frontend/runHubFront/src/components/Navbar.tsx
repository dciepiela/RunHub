import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import logo from "../assets/logo.svg";
import avatar from "../assets/avatar.jpg";
import { NavLink } from "react-router-dom";
import { useAuth } from "../app/context/useAuth";

const navLinks = [
  { name: "Strona główna", route: "/" },
  { name: "Biegi", route: "/races" },
  { name: "Wyniki", route: "/results" },
  { name: "O nas", route: "/about" },
  { name: "Kontakt", route: "/contact" },
];

function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();
  const [nav, setNav] = useState(false);

  // const [navBg, setNavBg] = useState("bg-[#15151580]");

  // const location = useLocation();

  const handleClick = () => setNav(!nav);

  return (
    <div className="w-screen h-[80px] z-10 bg-whiteNeutral fixed drop-shadow-lg">
      <div className="px-2 flex justify-between items-center w-full h-full sm:text-xs md:text-xl text-lightYellow font-bold">
        <div className="flex items-center ">
          <NavLink to="/">
            <h1 className="text-3xl font-bold mr-4 text-black">RunHub</h1>
          </NavLink>
          <NavLink to="/">
            <img src={logo} alt="logo" className="w-16" />
          </NavLink>

          {/* desktop */}
          <ul className="hidden lg:flex ml-4 justify-between">
            {navLinks.map((link) => (
              <li key={link.route}>
                <NavLink to={link.route}>{link.name}</NavLink>
              </li>
            ))}
            {/* <li>
              <ThemeProvider theme={theme}>
                <div>
                  <Switch onChange={() => setIsDarkMode(!isDarkMode)} />
                </div>
              </ThemeProvider>
            </li> */}
          </ul>
        </div>

        {/* based on user */}
        {isLoggedIn() ? (
          <div className="flex items-center justify-center pr-4 lg:mr-6 text-sm md:text-xl">
            {user?.role === "Organizer" && (
              <NavLink to="/dashboard" className="ml-4 sm:mr-4">
                Panel organizatora
              </NavLink>
            )}

            <h1 className="mr-2 sm:mr-10 text-center">
              Witaj, {user?.displayName}
            </h1>
            <img
              src={avatar}
              alt="avatar"
              className="h-[40px] w-[40px] rounded-full"
            />
            <NavLink
              to="/"
              onClick={logout}
              className="text-deepBlack px-4 py-3 bg-lightYellow rounded-md ml-4"
            >
              Wyloguj
            </NavLink>
          </div>
        ) : (
          <div className="hidden md:flex pr-4">
            <button className="border-none bg-transparent mr-4 hover:text-mediumGray">
              <NavLink to="/login">Zaloguj się</NavLink>
            </button>
            <button className="px-8 py-3 hover:bg-mediumGray">
              <NavLink to="/registerCompetitor">Załóż konto</NavLink>
            </button>
          </div>
        )}

        <div className="lg:hidden mr-4" onClick={handleClick}>
          {!nav ? (
            <Bars3Icon className="w-5 text-black" />
          ) : (
            <XMarkIcon className="w-5" />
          )}
        </div>
      </div>

      {/* mobile */}
      <ul className={!nav ? "hidden" : "absolute bg-whiteNeutral w-full px-8"}>
        {navLinks.map((link) => (
          <li key={link.route} className="border-b-2 border-mediumGray w-full">
            <NavLink to={link.route}>{link.name}</NavLink>
          </li>
        ))}

        {/* based on user */}
        <div className="flex flex-col my-4">
          {user ? null : isLoggedIn() ? (
            <button className="bg-transparent border-lightYellow px-8 py-3 mb-4">
              <NavLink to="/login">Zaloguj się</NavLink>
            </button>
          ) : (
            <button className="px-8 py-3 border-lightYellow">
              <NavLink to="/register">Załóż konto</NavLink>
            </button>
          )}

          {/* {user && (
            <li>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
          )} */}
        </div>
      </ul>
    </div>
  );
}

export default Navbar;
