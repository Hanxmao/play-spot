import { createBrowserRouter } from "react-router";
import App from "./App.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import LocationsPage from "./pages/LocationsPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> }, // index/default page
      { path: "/locations", element: <LocationsPage /> }, //example routes
    ],
  },
]);

export default router;
