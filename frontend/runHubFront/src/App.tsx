import { Outlet, ScrollRestoration } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./app/context/useAuth";
import { useStore } from "./app/stores/store";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51P5YyII1BRXK8HKtHP7ftnKMheOnCN1wE7r4l1kEUJacqdoQzIAmbkRdTrWSJUfxmysyUXU8rpt2sBq1hcH37sq600GfQS8sKt"
);

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

  console.log("Stripe Key:", stripePromise);

  return (
    <>
      <ScrollRestoration />
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <UserProvider>
        <Elements stripe={stripePromise}>
          <Navbar />
          <main>
            <Outlet />
          </main>
          {/* <Outlet /> */}
          <Footer />
        </Elements>
      </UserProvider>
    </>
  );
}

export default observer(App);
