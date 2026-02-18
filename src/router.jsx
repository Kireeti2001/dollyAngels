import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/Landing/LandingPage";
import HomePage from "./pages/Home/HomePage";
import GalleryPage from "./pages/Gallery/GalleryPage";
import Layout from "./pages/Layout/Layout";
import ErrorPage from "./pages/Error/ErrorPage";
import AboutPage from "./pages/About/AboutPage";
import ContactPage from "./pages/Contact/ContactPage";
import AdminGalleryPage from "./pages/Admin/AdminGalleryPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin/gallery",
    element: <AdminGalleryPage />,
  },
  {
    element: <Layout />,
    children: [
      { path: "/home", element: <HomePage /> },
      { path: "/gallery", element: <GalleryPage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/contact", element: <ContactPage /> },
    ],
  },
]);

export default router;
