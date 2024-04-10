import { Outlet } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./app/context/useAuth";
import ScrollToTop from "./app/helper/ScrollToTop";
import { useStore } from "./app/stores/store";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";

function App() {
  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);

  // if (!commonStore.appLoaded) {
  //   return <LoadingComponent content="Ładowanie aplikacji.." />;
  // }

  return (
    <>
      <UserProvider>
        <ScrollToTop />
        <Navbar />
        <main>
          <Outlet />
        </main>
        {/* <Outlet /> */}
        <Footer />
        <ToastContainer
          position="bottom-right"
          hideProgressBar
          theme="colored"
        />
      </UserProvider>
    </>
  );
}

export default observer(App);
