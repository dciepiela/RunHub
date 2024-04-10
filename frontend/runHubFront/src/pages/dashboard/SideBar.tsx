import { Sidebar } from "flowbite-react";
import { HiChartPie, HiHome, HiTable } from "react-icons/hi";
import { FaEdit, FaEtsy, FaRunning } from "react-icons/fa";
import RunHubLogo from "../../assets/avatar.jpg";

function SideBar() {
  return (
    <Sidebar
      aria-label="Sidebar with logo branding example"
      className="bg-lightYellow h-auto fixed left-0 top-0 bottom-0 overflow-y-auto"
      // Adjust width as needed
    >
      <Sidebar.Logo
        href="#"
        img={RunHubLogo}
        imgAlt="RunHub logo"
        className="justify-center"
      >
        <p className="ml-4">RunHub</p>
      </Sidebar.Logo>
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col justify-start items-start flex-wrap">
          <Sidebar.Item href="/admin/dashboard" icon={HiChartPie}>
            <p>Panel zarządzania</p>
          </Sidebar.Item>
          <Sidebar.Item href="/admin/dashboard/manage" icon={FaRunning}>
            <p>Utwórz bieg</p>
          </Sidebar.Item>
          <Sidebar.Item href="/admin/dashboard/formikTest" icon={FaEtsy}>
            <p>Test Formik</p>
          </Sidebar.Item>
          <Sidebar.Item href="/admin/dashboard/upload" icon={FaEdit}>
            <p>Zarządzaj biegami</p>
          </Sidebar.Item>

          <Sidebar.Item href="/" icon={HiHome}>
            <p>Strona główna</p>
          </Sidebar.Item>
          <Sidebar.Item href="/logout" icon={HiTable}>
            <p>Wyloguj</p>
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default SideBar;
