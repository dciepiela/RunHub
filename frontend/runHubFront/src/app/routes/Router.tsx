import { RouteObject, createBrowserRouter } from "react-router-dom";
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
        element: <Events />,
      },
      { path: "races/:raceId", element: <RaceDetailsPage /> },

      {
        path: "results",
        element: <Results />,
      },
      {
        path: "about",
        element: (
          <ProtectedRoute>
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
        // path: "/dashboard",
        // element: (
        //   <ProtectedRoute>
        //     <Dashboard />
        //   </ProtectedRoute>
        // ),
      },
      { path: "*", element: <Home /> },
    ],
  },
  {
    path: "/admin/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/admin/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/admin/dashboard/upload",
        element: <UploadRace />,
      },
      {
        path: "/admin/dashboard/manage",
        element: <ManageRaces />,
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
