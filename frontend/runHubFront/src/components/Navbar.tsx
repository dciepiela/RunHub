import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import logo from "../assets/logo.svg";
import { NavLink } from "react-router-dom";
import { useStore } from "../app/stores/store";
import { observer } from "mobx-react-lite";
import { useMediaQuery } from "react-responsive";
import { DEFAULT_PHOTO_URL } from "../config";

const navLinks = [
  { name: "Strona główna", route: "/" },
  { name: "Biegi", route: "/races" },
  { name: "Wyniki", route: "/results" },
  { name: "O nas", route: "/about" },
  { name: "Kontakt", route: "/contact" },
  { name: "Błędy", route: "/errors" },
];

export default observer(function Navbar() {
  const { userStore } = useStore();
  const { isLoggedIn, logout, user } = userStore;

  const [nav, setNav] = useState(false);
  const [open, setOpen] = useState(false);

  const isMobile = useMediaQuery({ maxWidth: 768 });

  const handleClick = () => setNav(!nav);

  const userMenuRef = useRef(null);
  const imgRef = useRef(null);

  window.addEventListener("click", (e) => {
    if (e.target !== userMenuRef.current && e.target !== imgRef.current) {
      setOpen(false);
    }
  });

  const userMenuMobile = [
    { name: "Profil", route: `/profiles/${user?.userName}` },
    { name: "Panel organizatora", route: "/admin/dashboard" },
    { name: "Ustawienia", route: "/settings" },
    { name: "Wyloguj", route: "/logout" },
  ];

  const userMenuDesktop = [
    { name: "Profil", route: `/profiles/${user?.userName}` },
    { name: "Ustawienia", route: "/settings" },
  ];
  return (
    <div className="w-screen h-[80px] z-10 bg-whiteNeutral fixed top-0 drop-shadow-lg">
      <div className="px-2 flex justify-between items-center gap-4 w-full h-full sm:text-xs md:text-xl text-lightYellow font-bold">
        <div className="flex items-center">
          <NavLink to="/">
            <h1 className="text-3xl font-bold mr-4 text-black">RunHub</h1>
          </NavLink>
          <NavLink to="/">
            <img src={logo} alt="logo" className="w-16" />
          </NavLink>

          {/* desktop */}
          <ul className="hidden lg:flex ml-4 justify-between ">
            {navLinks.map((link) => (
              <li key={link.route}>
                <NavLink
                  to={link.route}
                  className="text-lightYellow  hover:text-deepBlack"
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* based on user */}
        {isLoggedIn ? (
          <div className="flex items-center justify-center pr-4 lg:mr-6 text-sm md:text-xl ">
            {user?.role === "Organizer" && !isMobile && (
              <NavLink
                to="/admin/dashboard"
                className="ml-4 sm:mr-4 text-lightYellow hover:text-black"
              >
                Panel organizatora
              </NavLink>
            )}

            <span className="mr-2 sm:mr-5 md:text-lg text-lightYellow disabled">
              Witaj, {user?.displayName}
            </span>
            <div className="relative">
              <img
                ref={imgRef}
                onClick={() => setOpen(!open)}
                src={user?.image ? user?.image : DEFAULT_PHOTO_URL}
                alt="user"
                className="h-[40px] w-[40px] border-2 rounded-full border-lightYellow cursor-pointer"
              />
              {open && (
                <div
                  ref={userMenuRef}
                  className="bg-whiteNeutral p-4 w-30 shadow-lg absolute -left-14 top-[60px]"
                >
                  <ul className="flex flex-col">
                    {isMobile
                      ? userMenuMobile.map((menu) => (
                          <NavLink
                            to={menu.route}
                            onClick={() => {
                              setOpen(!open);
                              if (menu.route === "/") {
                                logout(); // Call logout action
                              }
                            }}
                            className="text-lightYellow p-2 text-sm md:text-lg cursor-pointer rounded hover:bg-lightYellow hover:text-deepBlack"
                            key={menu.route}
                          >
                            {menu.name}
                          </NavLink>
                        ))
                      : userMenuDesktop.map((menu) => (
                          <NavLink
                            to={menu.route}
                            onClick={() => setOpen(!open)}
                            className="text-lightYellow p-2 text-sm md:text-lg cursor-pointer rounded hover:bg-lightYellow hover:text-deepBlack"
                            key={menu.route}
                          >
                            {menu.name}
                          </NavLink>
                        ))}
                  </ul>
                </div>
              )}
            </div>
            {!isMobile && (
              <NavLink
                to="/"
                onClick={logout}
                className="text-deepBlack bg-lightYellow px-4 py-3 hover:bg-transparent hover:text-lightYellow rounded-md ml-4"
              >
                Wyloguj
              </NavLink>
            )}
          </div>
        ) : (
          <div className="hidden md:flex pr-4">
            <button className="text-deepBlack border-none bg-transparent mr-4 hover:text-mediumGray">
              <NavLink
                to="/login"
                className="text-deepBlack hover:text-lightYellow"
              >
                Zaloguj się
              </NavLink>
            </button>
            <button className="text-lightYellow px-8 py-3 hover:bg-darkGray">
              <NavLink
                to="/registerCompetitor"
                className="text-deepBlack hover:text-lightYellow"
              >
                Załóż konto
              </NavLink>
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
            <NavLink to={link.route} onClick={handleClick}>
              {link.name}
            </NavLink>
          </li>
        ))}

        {/* based on user */}
        <div className="flex flex-col my-4">
          {!isLoggedIn && (
            <>
              <button className="bg-transparent text-black border-lightYellow px-8 py-3 mb-4 hover:text-lightYellow">
                <NavLink
                  to="/login"
                  onClick={handleClick}
                  className="hover:text-lightYellow"
                >
                  Zaloguj się
                </NavLink>
              </button>
              <button className="px-8 py-3 text-black border-lightYellow hover:text-lightYellow">
                <NavLink to="/registerCompetitor" onClick={handleClick}>
                  Załóż konto
                </NavLink>
              </button>
            </>
          )}
        </div>
      </ul>
    </div>
  );
});
