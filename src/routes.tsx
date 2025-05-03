import { createBrowserRouter } from "react-router";
import App from "./App.tsx";
import PlaceDetail from "./pages/PlaceDetailPage.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import SavedLocations from "./pages/SavedLocations.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> }, // index/default page
      { path: "/locations/:id", element: <PlaceDetail /> },
      { path: "/saved", element: <SavedLocations />},
    ],
  },
]);

export default router;
