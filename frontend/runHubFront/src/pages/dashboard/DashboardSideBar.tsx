import { Button, Sidebar } from "flowbite-react";
import { HiChartPie, HiHome, HiMenu, HiX } from "react-icons/hi";
import { FaRunning } from "react-icons/fa";
import RunHubLogo from "../../assets/logo.svg";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { MdSportsScore } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import { FcSportsMode } from "react-icons/fc";

export default observer(function DashboardSideBar() {
  const {
    userStore: { user },
  } = useStore();
  const [isOpen, setIsOpen] = useState(true); // Domyślnie pasek otwarty
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);

  // Aktualizacja stanu isMobile w zależności od szerokości okna
  // Function to handle resizing and adjust sidebar visibility
  const handleResize = () => {
    const mobile = window.innerWidth < 1000;
    setIsMobile(mobile);
    // Automatically open the sidebar when the screen size is larger than mobile width and was previously set to closed on mobile
    if (!mobile && !isOpen) {
      setIsOpen(true);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    // updateMedia(); // Wywołanie przy montowaniu
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      {/* Przycisk tylko dla urządzeń mobilnych */}
      {isMobile && (
        <Button
          onClick={() => setIsOpen(!isOpen)} // Poprawne opóźnienie zmiany stanu
          className={`fixed top-4 left-[${
            isOpen ? "240px" : "16px"
          }] z-20 transition-all duration-300`}
        >
          {isOpen ? <HiX size={20} /> : <HiMenu size={20} />}
        </Button>
      )}

      <Sidebar
        aria-label="Sidebar with logo branding example"
        className={`bg-lightYellow h-auto ${
          isOpen ? "w-[250px]" : "w-0"
        } fixed left-0 top-0 bottom-0 overflow-y-auto z-10 transition-width duration-300`}
      >
        <Sidebar.Logo
          href="/admin/dashboard"
          img={user?.image ? user?.image : RunHubLogo}
          imgAlt="RunHub logo"
          className="justify-center"
        >
          <p className="ml-4">{user?.displayName}</p>
        </Sidebar.Logo>
        <Sidebar.Items>
          <Sidebar.ItemGroup className="flex flex-col justify-start items-start flex-wrap">
            <Sidebar.Item href="/admin/dashboard" icon={HiChartPie}>
              <p>Panel zarządzania</p>
            </Sidebar.Item>
            <Sidebar.Item href="/races" icon={FaRunning}>
              <p>Wszystkie biegi</p>
            </Sidebar.Item>
            <Sidebar.Item href="/admin/dashboard/create" icon={IoMdAdd}>
              <p>Utwórz nowy bieg</p>
            </Sidebar.Item>
            <Sidebar.Item href="/admin/dashboard/results" icon={MdSportsScore}>
              <p>Uzupełnij wyniki</p>
            </Sidebar.Item>
            <Sidebar.Item href="/admin/dashboard/races" icon={FcSportsMode}>
              <p>Edytuj istniejące biegi</p>
            </Sidebar.Item>
            <Sidebar.Item href="/" icon={HiHome}>
              <p>Strona główna</p>
            </Sidebar.Item>
            <Sidebar.Item href="/logout" icon={CiLogout}>
              <p>Wyloguj</p>
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </>
  );
});
