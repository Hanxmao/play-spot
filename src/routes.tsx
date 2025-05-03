import { createBrowserRouter } from "react-router";
import App from "./App.tsx";
import PlaceDetail from "./pages/PlaceDetailPage.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import HomePage from "./pages/HomePage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> }, // index/default page
      { path: "/locations/:id", element: <PlaceDetail /> },
    ],
  },
]);

export default router;
