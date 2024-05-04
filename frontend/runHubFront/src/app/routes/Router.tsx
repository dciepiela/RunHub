import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../../App";
import Home from "../../pages/home/Home";
import Contact from "../../pages/contact/Contact";
import About from "../../pages/about/About";
import Results from "../../pages/results/Results";
import Login from "../../pages/login/Login";
import RegisterCompetitor from "../../pages/register/RegisterCompetitor";
import RegisterOrganizer from "../../pages/register/RegisterOrganizer";
import DashboardLayout from "../../pages/dashboard/DashboardLayout";
import TestErrors from "../../pages/errors/TestError";
import NotFound from "../../pages/errors/NotFound";
import ServerError from "../../pages/errors/ServerError";
import RaceDetails from "../../pages/races/details/RaceDetails";
import Races from "../../pages/races/Races";
import CreateRaceForm from "../../pages/dashboard/add/CreateRaceForm";
import ProfilePage from "../../pages/profiles/ProfilePage";
import ResetPasswordForm from "../../pages/login/ResetPasswordForm";
import ForgotPasswordForm from "../../pages/login/ForgotPasswordForm";
import PaymentSuccessPage from "../../components/payment/PaymentSuccessPage";
import ResultsDetail from "../../pages/results/distances/ResultsDetail";
import DashboardResult from "../../pages/dashboard/results/DashboardResult";
import DistanceResultDetails from "../../pages/dashboard/results/DistanceResultDetails";
import RaceList from "../../pages/dashboard/edit/RaceList";
import RaceEdit from "../../pages/dashboard/edit/race/RaceEdit";
import DistanceEdit from "../../pages/dashboard/edit/distance/DistanceEdit";
import SponsorEdit from "../../pages/dashboard/edit/sponsor/SponsorEdit";
import DistanceDisplay from "../../pages/dashboard/edit/distance/DistanceDisplay";
import SponsorDisplay from "../../pages/dashboard/edit/sponsor/SponsorDisplay";
import AddAttendanceManually from "../../pages/dashboard/edit/attendanceManually/AddAttendanceManually";
import DashboardMain from "../../pages/dashboard/DashboardMain";
import PhotoUploadForm from "../../pages/dashboard/add/PhotoUploadForm";
import EditProfile from "../../pages/login/EditProfile";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
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
      { path: "fillData/:userName", element: <EditProfile /> },
      {
        path: "results",
        element: <Results />,
      },
      {
        path: "results/:distanceId",
        element: <ResultsDetail />,
      },
      {
        path: "about",
        element: <About />,
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
      //dashboard
      {
        path: `/admin/dashboard`,
        element: <DashboardLayout />,
        children: [
          {
            path: "/admin/dashboard",
            element: <DashboardMain />,
          },
          {
            path: "/admin/dashboard/results",
            element: <DashboardResult />,
          },
          {
            path: "/admin/dashboard/results/:distanceId",
            element: <DistanceResultDetails />,
          },
          {
            path: "/admin/dashboard/races",
            element: <RaceList />,
          },
          {
            path: "/admin/dashboard/races/:raceId/distances/view",
            element: <DistanceDisplay />,
          },
          {
            path: "/admin/dashboard/races/:raceId/sponsors/view",
            element: <SponsorDisplay />,
          },
          {
            path: "/admin/dashboard/create",
            element: <CreateRaceForm key="create" />,
          },
          {
            path: "/admin/dashboard/photoUpload/:raceId",
            element: <PhotoUploadForm />,
          },
          {
            path: "/admin/dashboard/races/:raceId/distances/create",
            element: <DistanceEdit key="create" />,
          },
          {
            path: "/admin/dashboard/races/:raceId/sponsors/create",
            element: <SponsorEdit key="create" />,
          },
          {
            path: "/admin/dashboard/races/edit/:raceId",
            element: <RaceEdit />,
          },
          {
            path: "/admin/dashboard/races/:raceId/distances/edit/:distanceId",
            element: <DistanceEdit key="edit" />,
          },
          {
            path: "/admin/dashboard/races/:raceId/sponsors/edit/:sponsorId",
            element: <SponsorEdit key="edit" />,
          },
          {
            path: "/admin/dashboard/races/:raceId/distances/:distanceId/addCompetitor",
            element: <AddAttendanceManually />,
          },
        ],
      },
      { path: "*", element: <Navigate replace to="/not-found" /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
