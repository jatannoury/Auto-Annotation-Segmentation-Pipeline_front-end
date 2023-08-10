import React from "react";
import { PieChart, Pie } from "recharts";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  Cell,
} from "recharts";

const Charts = ({ chartType }) => {
  const pie_data = [
    {
      name: "Processe",
      value: 20,
    },
    {
      name: "Unprocessed",
      value: 10,
    },
  ];
  const line_data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  const bar_data = [
    { name: ".jpg", students: 400 },
    { name: ".avif", students: 700 },
    { name: ".png", students: 200 },
    { name: ".test", students: 10000 },
  ];
  let COLORS = ["#8884d8", "white"];
  const pie_chart = (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width="100%" height="100%">
        <Pie
          stroke="#8884d8"
          // strokeWidth=""
          data={pie_data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="white"
          // label
        >
          {pie_data.map((entry, index) => (
            <Cell fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
        <Tooltip
          contentStyle={{ color: "white" }}
          labelStyle={{ color: "white" }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
  const horizontal_bar_chart = (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={bar_data}
        layout="vertical"
        margin={{
          right: 20,
          top: 20,
        }}
      >
        <CartesianGrid strokeDasharray="4 4" stroke="#8884d8" />
        <YAxis dataKey="name" type="category" tick={{ fill: "#8884d8" }} />
        <XAxis type="number" tick={{ fill: "#8884d8" }} />
        <Tooltip
          contentStyle={{ color: "#8884d8" }}
          labelStyle={{ color: "#8884d8" }}
        />
        <Bar dataKey="students" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
  const vertical_bar_chart = (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={bar_data}
        margin={{
          right: 20,
          top: 20,
        }}
      >
        <CartesianGrid strokeDasharray="4 4" stroke="#8884d8" />
        <YAxis tick={{ fill: "#8884d8" }} />
        <XAxis dataKey="name" tick={{ fill: "#8884d8" }} />
        <Tooltip
          contentStyle={{ color: "#8884d8" }}
          labelStyle={{ color: "#8884d8" }}
        />
        <Bar dataKey="students" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
  const line_chart = (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        width={500}
        height={300}
        data={line_data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={{ fill: "white" }} />
        <YAxis tick={{ fill: "white" }} />
        <Tooltip
          contentStyle={{ color: "white" }}
          labelStyle={{ color: "white" }}
        />
        <Line
          type="monotone"
          dataKey="pv"
          stroke="white"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );

  switch (chartType) {
    case "pie":
      return pie_chart;
    case "horizontal_bar":
      return horizontal_bar_chart;
    case "vertical_bar":
      return vertical_bar_chart;
    case "line":
      return line_chart;
    default:
      return <></>;
  }
};

export default Charts;
