import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import { ToastContainer } from "react-toastify";

export default function DashboardLayout() {
  return (
    <div className="flex gap-4 flex-col md:flex-row">
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <SideBar />
      <Outlet />
    </div>
  );
}
