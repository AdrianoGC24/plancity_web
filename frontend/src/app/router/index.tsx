import { createBrowserRouter } from "react-router-dom";

import App from "../../App";
import PublicLayout from "../../shared/layouts/PublicLayout";
import FavoritesPage from "../../features/favorites/pages/favorites";
import EventsPage from "../../features/events/pages/eventPages";
import CreateEventPage from "../../features/events/pages/createEvent";
import CreateCategoryPage from "../../features/categories/pages/categoryPages";
import LoginPage from "../../features/auth/pages/login";
import EventDetailPage from "../../features/events/pages/eventDetail";
import ProtectedRoute from "../../shared/components/ProtectedRoute";
import AdminRoute from "../../shared/components/AdminRoute";
import RegisterPage from "../../features/auth/pages/registerPages";
import DashboardLayout from "../../shared/layouts/DashboardLayout";
import AdminEvents from "../../features/admin/pages/AdminEvents";
import EditEvent from "../../features/events/pages/editEvent";
import AdminCategories from "../../features/admin/pages/AdminCategories";
import EditCategory from "../../features/categories/pages/editCategory";
import AdminDashboard from "../../features/admin/pages/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <PublicLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
          },
          {
            path: "events",
            element: <EventsPage />,
          },
          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "register",
            element: <RegisterPage />,
          },
          {
            path: "events/:id",
            element: <EventDetailPage />,
          },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "favorites",
            element: <FavoritesPage />,
          },
        ],
      },
      {
        element: <AdminRoute />,
        children: [
          {
            element: <DashboardLayout />,
            children: [
              {
                path: "admin",
                element: <AdminDashboard />,
              },
              {
                path: "admin/events",
                element: <AdminEvents />,
              },
              {
                path: "admin/events/create",
                element: <CreateEventPage />,
              },
              {
                path: "admin/categories/create",
                element: <CreateCategoryPage />,
              },
              {
                path: "admin/events/edit/:id",
                element: <EditEvent />,
              },
              {
                path: "admin/categories",
                element: <AdminCategories />,
              },
              {
                path: "admin/categories/edit/:id",
                element: <EditCategory />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
