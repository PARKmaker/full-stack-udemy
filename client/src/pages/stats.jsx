import customFetch from "@/utils/custom-fetch.js";
import { useLoaderData } from "react-router-dom";
import StatsContainer from "@/components/stats-container.jsx";
import ChartsContainer from "@/components/charts-container.jsx";

export const loader = async () => {
  try {
    const response = await customFetch.get("/jobs/stats");
    return response.data;
  } catch (error) {
    return error;
  }
};

export default function Stats() {
  const { defaultStats, monthlyApplications } = useLoaderData();

  return (
    <>
      <StatsContainer defaultValue={defaultStats} />
      {monthlyApplications?.length > 0 && (
        <ChartsContainer data={monthlyApplications} />
      )}
    </>
  );
}
