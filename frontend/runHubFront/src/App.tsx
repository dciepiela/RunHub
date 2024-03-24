import { Outlet } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./app/context/useAuth";
import ScrollToTop from "./app/helper/ScrollToTop";

function App() {
  return (
    <>
      <UserProvider>
        <ScrollToTop />
        <Navbar />
        <Outlet />
        <Footer />
        <ToastContainer />
      </UserProvider>
    </>
  );
}

export default App;
