import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../pages/HomePage";
import PageLayout from "../layout/PageLayout";
import NotFound from "../pages/NotFound";
import IdeasPage from "../pages/IdeasPage";
import WorkPage from "../pages/WorkPage";
import AboutPage from "../pages/AboutPage";
import ServicesPage from "../pages/ServicesPage";
import CareersPage from "../pages/CareersPage";
import ContactPage from "../pages/ContactPage";

const createRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <PageLayout>
        <HomePage />
      </PageLayout>
    ),
  },
  {
    path: "/work",
    element: (
      <PageLayout>
        <WorkPage />
      </PageLayout>
    ),
  },
  {
    path: "/about",
    element: (
      <PageLayout>
        <AboutPage />
      </PageLayout>
    ),
  },
  {
    path: "/services",
    element: (
      <PageLayout>
        <ServicesPage />
      </PageLayout>
    ),
  },
  {
    path: "/ideas",
    element: (
      <PageLayout>
        <IdeasPage />
      </PageLayout>
    ),
  },
  {
    path: "/careers",
    element: (
      <PageLayout>
        <CareersPage />
      </PageLayout>
    ),
  },
  {
    path: "/contact",
    element: (
      <PageLayout>
        <ContactPage />
      </PageLayout>
    ),
  },
  {
    path: "*",
    element: (
      <PageLayout>
        <NotFound />
      </PageLayout>
    ),
  },
]);

const Routes = () => {
  return <RouterProvider router={createRouter} />;
};

export default Routes;
