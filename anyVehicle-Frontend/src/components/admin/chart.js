import React, { useEffect, useContext } from "react";
import superAgent from "superagent";
import "../../Styles/App.css";

// Using Recharts package to draw chart
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { myContext } from "../../context/context";

function Chart() {
  const { setAllRequests, allRequests, token } = useContext(myContext);
  // Get all the requests once the component did mount
  useEffect(() => {
    superAgent
      .get("http://localhost:3030/all-requests")
      .set({
        Authorization: `Bearer ${token}`,
      })
      .then((response) => {
        console.log(response.body);
        setAllRequests(response.body);
      })
      .catch((e) => console.error(e));
  }, []);

  //   To count how many request for each status
  let accepted = 0;
  let pending = 0;
  let dismissed = 0;
  allRequests.forEach((req) => {
    if (req.requestStatus === "Accepted") {
      accepted++;
    } else if (req.requestStatus === "Pending") {
      pending++;
    } else if (req.requestStatus === "Dismissed") {
      dismissed++;
    }
  });

  // New formatted array for the chart
  let newData = [
    { status: "Accepted", count: accepted },
    { status: "Dismissed", count: dismissed },
    { status: "Pending", count: pending },
  ];

  return (
    <ResponsiveContainer width={700} height={400} className="chart">
      <BarChart
        width={600}
        height={350}
        data={newData}
        // margin={{ left: "auto", right: "auto" }}
      >
        <XAxis dataKey="status" axisLine={false} tickCount={4} />
        <YAxis dataKey="count" axisLine={false} />
        <Bar dataKey="count" width={200} fill="#DF7A20" />
        <Tooltip />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default Chart;
