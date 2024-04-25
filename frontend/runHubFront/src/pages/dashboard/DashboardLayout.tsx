import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import DashboardSideBar from "./DashboardSideBar";

export default function DashboardLayout() {
  return (
    <div className="flex gap-4 flex-col md:flex-row">
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <DashboardSideBar />
      <Outlet />
    </div>
  );
}
