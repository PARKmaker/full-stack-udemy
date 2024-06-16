import { useState } from "react";
import Wrapper from "@/assets/wrappers/ChartsContainer.js";
import BarChart from "@/components/bar-chart.jsx";
import AreaChart from "@/components/area-chart.jsx";

const ChartsContainer = ({ data }) => {
  const [barChart, setBarChart] = useState(true);

  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button type="button" onClick={() => setBarChart(!barChart)}>
        {barChart ? "Area Chart" : "Bar Chart"}
      </button>
      {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
    </Wrapper>
  );
};

export default ChartsContainer;
