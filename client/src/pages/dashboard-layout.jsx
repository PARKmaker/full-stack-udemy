import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
import Wrapper from "@/assets/wrappers/Dashboard.js";
import { BigSidebar, Navbar, SmallSidebar } from "@/components/index.js";
import { createContext, useState } from "react";
import { checkDefaultTheme } from "@/App.jsx";
import customFetch from "@/utils/custom-fetch.js";
import { toast } from "react-toastify";

export const DashboardContext = createContext();

export const loader = async () => {
  try {
    const { data } = await customFetch("/users/current-user");
    return data;
  } catch (error) {
    return redirect("/");
  }
};

// eslint-disable-next-line react/prop-types
export default function DashboardLayout() {
  const { user } = useLoaderData();
  const navigate = useNavigate();

  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());

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
    toast.success("Logout...");
  }

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
            <div className={"dashboard-page"}>
              <Outlet context={{ user }} />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
}
