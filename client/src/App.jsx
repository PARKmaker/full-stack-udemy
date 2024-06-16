import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeLayout from "./pages/home-layout.jsx";
import {
  AddJob,
  Admin,
  AllJobs,
  DashboardLayout,
  EditJob,
  Error,
  Landing,
  Login,
  Profile,
  Register,
  Stats,
} from "@pages";

import { action as registerAction } from "@/pages/register.jsx";
import { action as loginAction } from "@/pages/login.jsx";
import { action as addJobAction } from "@/pages/add-job.jsx";
import { action as editJobAction } from "@/pages/edit-job.jsx";
import { action as deleteAction } from "@/pages/delete-job.jsx";
import { action as profileAction } from "@/pages/profile.jsx";

import { loader as dashboardLayoutLoader } from "@/pages/dashboard-layout.jsx";
import { loader as allJobsLoader } from "@/pages/all-jobs.jsx";
import { loader as editJobLoader } from "@/pages/edit-job.jsx";
import { loader as adminLoader } from "@/pages/admin.jsx";
import { loader as statsLoader } from "@/pages/stats.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ErrorElement from "@/components/error-element.jsx";

export function checkDefaultTheme() {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);

  return isDarkTheme;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction(queryClient),
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        loader: dashboardLayoutLoader(queryClient),
        children: [
          {
            index: true,
            element: <AddJob />,
            action: addJobAction(queryClient),
          },
          {
            path: "stats",
            element: <Stats />,
            loader: statsLoader(queryClient),
            errorElement: <ErrorElement />,
          },
          {
            path: "all-jobs",
            element: <AllJobs />,
            loader: allJobsLoader(queryClient),
          },
          {
            path: "profile",
            element: <Profile />,
            action: profileAction(queryClient),
          },
          {
            path: "admin",
            element: <Admin />,
            loader: adminLoader(queryClient),
          },
          {
            path: "edit-job/:id",
            element: <EditJob />,
            action: editJobAction(queryClient),
            loader: editJobLoader(queryClient),
          },
          { path: "delete-job/:id", action: deleteAction(queryClient) },
        ],
      },
    ],
  },
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
