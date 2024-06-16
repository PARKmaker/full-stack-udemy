import { Outlet, redirect, useNavigate, useNavigation } from "react-router-dom";
import Wrapper from "@/assets/wrappers/Dashboard.js";
import { BigSidebar, Navbar, SmallSidebar } from "@/components/index.js";
import { createContext, useEffect, useState } from "react";
import { checkDefaultTheme } from "@/App.jsx";
import customFetch from "@/utils/custom-fetch.js";
import { toast } from "react-toastify";
import Loading from "@/components/loading.jsx";
import { useQuery } from "@tanstack/react-query";
import { response } from "express";

export const DashboardContext = createContext();

const userQuery = {
  queryKey: ["user"],
  queryFn: async () => {
    const { data } = await customFetch("/users/current-user");
    return data;
  },
};

export const loader = (queryClient) => async () => {
  try {
    return await queryClient.ensureQueryData(userQuery);
  } catch (error) {
    return redirect("/");
  }
};

// eslint-disable-next-line react/prop-types
export default function DashboardLayout({ queryClient }) {
  const { user } = useQuery(userQuery).data;

  const navigate = useNavigate();

  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";

  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());
  const [isAuthError, setIsAuthError] = useState(false);

  function toggleDarkTheme() {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle("dark-theme", newDarkTheme);
    localStorage.setItem("darkTheme", newDarkTheme);
  }

  function toggleSidebar() {
    setShowSidebar(!showSidebar);
  }

  async function logoutUser() {
    navigate("/");
    await customFetch.get("/auth/logout");
    queryClient.invalidateQueries();
    toast.success("Logout...");
  }

  customFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error?.response?.status === 401) {
        setIsAuthError(true);
      }
      return Promise.reject(error);
    },
  );

  useEffect(() => {
    if (!isAuthError) return;

    logoutUser();
  }, [isAuthError]);

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className={"dashboard"}>
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              {isPageLoading ? <Loading /> : <Outlet context={{ user }} />}
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
}
