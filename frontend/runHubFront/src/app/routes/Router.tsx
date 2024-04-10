import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../../App";
import Home from "../../pages/home/Home";
import Events from "../../pages/races/Races";
import Contact from "../../pages/contact/Contact";
import About from "../../pages/about/About";
import Results from "../../pages/results/Results";
import Login from "../../pages/login/Login";
import RegisterCompetitor from "../../pages/register/RegisterCompetitor";
import Dashboard from "../../pages/dashboard/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import RegisterOrganizer from "../../pages/register/RegisterOrganizer";
import DashboardLayout from "../../pages/dashboard/DashboardLayout";
import UploadRace from "../../pages/dashboard/UploadRace";
import ManageRaces from "../../pages/dashboard/ManageRaces";
import EditRaces from "../../pages/dashboard/EditRaces";
import RaceDetailsPage from "../../pages/races/details/RaceDetailsPage";
import TestErrors from "../../pages/errors/TestError";
import NotFound from "../../pages/errors/NotFound";
import ServerError from "../../pages/errors/ServerError";
import AttendeesList from "../../pages/races/details/attendees/AttendeesList";
import RaceDetails from "../../pages/races/details/RaceDetails";
import Races from "../../pages/races/Races";
import CreateRaceForm from "../../pages/dashboard/form/RaceForm";
import FormikTest from "../../pages/dashboard/FormikTest";
import ProfilePage from "../../pages/profiles/ProfilePage";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
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
        path: "contact",
        element: <Contact />,
      },
      {
        path: "login",
        element: <Login />,
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
        path: "/admin/dashboard/upload",
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
