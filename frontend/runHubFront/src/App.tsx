import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import { UserProvider } from "./app/context/useAuth";
import { useStore } from "./app/stores/store";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { GoogleOAuthProvider } from "@react-oauth/google";

const stripePromise = loadStripe(
  "pk_test_51P5YyII1BRXK8HKtHP7ftnKMheOnCN1wE7r4l1kEUJacqdoQzIAmbkRdTrWSJUfxmysyUXU8rpt2sBq1hcH37sq600GfQS8sKt"
);

function App() {
  const { commonStore, userStore } = useStore();
  const location = useLocation();
  const isDashboardActive = location.pathname.startsWith("/admin/dashboard");

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
      <ScrollRestoration />
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />

      <UserProvider>
        <Elements stripe={stripePromise}>
          {!isDashboardActive && <Navbar />}
          <main>
            <Outlet />
          </main>
          {/* <Outlet /> */}
          {!isDashboardActive && <Footer />}
        </Elements>
      </UserProvider>
    </>
  );
}

export default observer(App);
