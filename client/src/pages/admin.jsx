import customFetch from "@/utils/custom-fetch.js";
import { toast } from "react-toastify";
import { redirect, useLoaderData } from "react-router-dom";
import Wrapper from "@/assets/wrappers/StatsContainer.js";
import StatItem from "@/components/stat-item.jsx";
import { FaCalendarCheck, FaSuitcaseRolling } from "react-icons/fa";

export const loader = async () => {
  try {
    const response = await customFetch.get("/users/admin/app-stats");
    console.log(response);
    return response.data;
  } catch (error) {
    toast.error("You are not authorized to view this page");
    return redirect("/dashboard");
  }
};

export default function Admin() {
  const { userCount, jobCount } = useLoaderData();
  return (
    <Wrapper>
      <StatItem
        title="current users"
        count={userCount}
        color="#e9b949"
        bcg="#fcefc7"
        icon={<FaSuitcaseRolling />}
      />
      <StatItem
        title="total jobs"
        count={jobCount}
        color="#647acb"
        bcg="#e0e8f9"
        icon={<FaCalendarCheck />}
      />
    </Wrapper>
  );
}
