import { useContext } from "react";
import { DashboardContext } from "@pages/dashboard-layout.jsx";

export function useDashboardContext() {
  return useContext(DashboardContext);
}
