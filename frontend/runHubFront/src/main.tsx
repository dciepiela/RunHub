import ReactDOM from "react-dom/client";
import "./index.css";
import "react-toastify/dist/ReactToastify.min.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/routes/Router.tsx";
import { StoreContext, store } from "./app/stores/store.ts";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId="341309497182-2ck0l2qb6q4l9heimnkkbk6k34fkma19.apps.googleusercontent.com">
    {/* <React.StrictMode> */}
    <StoreContext.Provider value={store}>
      <RouterProvider router={router} />
    </StoreContext.Provider>
    {/* </React.StrictMode> */}
  </GoogleOAuthProvider>
);
