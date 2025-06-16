import { createBrowserRouter } from "react-router";
import App from "./App.tsx";
import PlaceDetail from "./pages/PlaceDetailPage.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import MapPage from "./pages/MapPage.tsx";
import SavedLocations from "./pages/SavedLocations.tsx";
import LocationsPage from "./pages/LocationsPage.tsx";
import AdminPage from "./pages/AdminPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> }, // index/default page
      { path: "admin", element: <AdminPage /> },
      { path: "map", element: <MapPage /> },
      { path: "locations", element: <LocationsPage /> },
      { path: "locations/:id", element: <PlaceDetail /> },
      { path: "saved", element: <SavedLocations />},
    ],
  },
]);

export default router;
