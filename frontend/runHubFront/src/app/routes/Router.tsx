import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../../App";
import Home from "../../pages/home/Home";
import Contact from "../../pages/contact/Contact";
import About from "../../pages/about/About";
import Results from "../../pages/results/Results";
import Login from "../../pages/login/Login";
import RegisterCompetitor from "../../pages/register/RegisterCompetitor";
import ProtectedRoute from "./ProtectedRoute";
import RegisterOrganizer from "../../pages/register/RegisterOrganizer";
import DashboardLayout from "../../pages/dashboard/DashboardLayout";
import EditRaces from "../../pages/dashboard/DashboardEditRaces";
import TestErrors from "../../pages/errors/TestError";
import NotFound from "../../pages/errors/NotFound";
import ServerError from "../../pages/errors/ServerError";
import RaceDetails from "../../pages/races/details/RaceDetails";
import Races from "../../pages/races/Races";
import CreateRaceForm from "../../pages/dashboard/form/RaceForm";
import FormikTest from "../../pages/dashboard/FormikTest";
import ProfilePage from "../../pages/profiles/ProfilePage";
import RequireAuth from "./RequireAuth";
import DashboardListRaces from "../../pages/dashboard/DashboardListRaces";
import ResetPasswordForm from "../../pages/login/ResetPasswordForm";
import ForgotPasswordForm from "../../pages/login/ForgotPasswordForm";
import PaymentForm from "../../components/payment/PaymentForm";
import PaymentSuccessPage from "../../components/payment/PaymentSuccessPage";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          {
            path: "contact",
            element: <Contact />,
          },
        ],
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "races",
        element: <Races />,
      },
      { path: "races/:raceId", element: <RaceDetails /> },
      { path: "profiles/:userName", element: <ProfilePage /> },
      // {
      //   path: "races/:raceId/:distanceId/attendees",
      //   element: <AttendeesList />,
      // },

      {
        path: "results",
        element: <Results />,
      },
      {
        path: "about",
        element: (
          <ProtectedRoute allowedRoles={["Organizer", "Competitor"]}>
            <About />
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPasswordForm />,
      },

      {
        path: "reset-password",
        element: <ResetPasswordForm />,
      },
      {
        path: "registerCompetitor",
        element: <RegisterCompetitor />,
      },
      {
        path: "registerOrganizer",
        element: <RegisterOrganizer />,
      },
      {
        path: "errors",
        element: <TestErrors />,
      },
      {
        path: "not-found",
        element: <NotFound />,
      },
      {
        path: "server-error",
        element: <ServerError />,
      },
      {
        path: "payment-success",
        element: <PaymentSuccessPage />,
      },
      {
        // path: "/dashboard",
        // element: (
        //   <ProtectedRoute>
        //     <Dashboard />
        //   </ProtectedRoute>
        // ),
      },

      { path: "*", element: <Navigate replace to="/not-found" /> },
    ],
  },
  {
    path: `/admin/dashboard`,
    element: (
      // <ProtectedRoute allowedRoles={["Organizer"]}>
      <DashboardLayout />
      // </ProtectedRoute>
    ),
    children: [
      {
        path: "/admin/dashboard/list",
        element: <DashboardListRaces />,
      },
      {
        path: "/admin/dashboard/create",
        element: <CreateRaceForm key="create" />,
      },
      {
        path: "/admin/dashboard/edit/:raceId",
        element: <CreateRaceForm key="edit" />,
      },
      {
        path: "/admin/dashboard/formikTest",
        element: <FormikTest />,
      },
      {
        path: "/admin/dashboard/edit-race/:id",
        element: <EditRaces />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/races/${params.id}`),
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
