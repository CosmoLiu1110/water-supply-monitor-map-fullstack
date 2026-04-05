// src/pages/Statistics.jsx

// I’m using React hooks to manage the charts
import React, { useEffect, useRef } from "react";
import pumpData from "../MockData/pumpData";
import "./Statistics.css";
import Chart from "chart.js/auto";

const Statistics = () => {
  // refs to the two <canvas> elements on the page
  const barCanvasRef = useRef(null);
  const pieCanvasRef = useRef(null);

  // I keep the actual Chart.js instances here so I can destroy/recreate them
  const barChartRef = useRef(null);
  const pieChartRef = useRef(null);

  // --- CALCULATE NUMBERS FROM pumpData ---------------------

  // months I care about for the bar chart
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

  // starting totals for each month + for each status
  const monthlyTotals = { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0, Jun: 0 };
  const statusCounts = { green: 0, yellow: 0, red: 0 };
  let totalReports = 0;

  // loop through every pump in the mock data and aggregate what I need
  pumpData.forEach((pump) => {
    // add up how many reports we have per month
    if (pump.monthlyReports) {
      months.forEach((m) => {
        const v = pump.monthlyReports[m] || 0; // fall back to 0 if missing
        monthlyTotals[m] += v;
        totalReports += v;
      });
    }

    // count how many pumps are green / yellow / red
    if (pump.level && statusCounts[pump.level] !== undefined) {
      statusCounts[pump.level] += 1;
    }
  });

  // simple total number of pumps in the system
  const totalPumps = pumpData.length;

  // --- CHARTS ------------------------------------------------
  // This effect runs once and turns the <canvas> elements into real charts
  useEffect(() => {
    const barCtx = barCanvasRef.current?.getContext("2d");
    const pieCtx = pieCanvasRef.current?.getContext("2d");

    // if for some reason the canvas isn’t ready, just bail out
    if (!barCtx || !pieCtx) return;

    // clean up old charts first – helps with hot reloading / re-mounting
    if (barChartRef.current) {
      barChartRef.current.destroy();
    }
    if (pieChartRef.current) {
      pieChartRef.current.destroy();
    }

    // data object for the bar chart (monthly totals)
    const barData = {
      labels: months,
      datasets: [
        {
          label: "Reports per month",
          data: months.map((m) => monthlyTotals[m]),
          backgroundColor: "#3498db",
        },
      ],
    };

    // data object for the pie chart (status breakdown)
    const pieData = {
      labels: ["Functional", "Needs Maintenance", "Damaged"],
      datasets: [
        {
          data: [
            statusCounts.green,
            statusCounts.yellow,
            statusCounts.red,
          ],
          backgroundColor: ["#2ecc71", "#f1c40f", "#e74c3c"],
        },
      ],
    };

    // actually create the bar chart and keep a reference to it
    barChartRef.current = new Chart(barCtx, {
      type: "bar",
      data: barData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true },
        },
        plugins: {
          title: {
            display: true,
            text: "Reports (Last 6 Months)",
          },
          legend: { display: false }, // I don’t need a legend for a single dataset
        },
      },
    });

    // and the pie chart for pump status
    pieChartRef.current = new Chart(pieCtx, {
      type: "pie",
      data: pieData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    // when the component unmounts, destroy both charts to avoid memory leaks
    return () => {
      if (barChartRef.current) barChartRef.current.destroy();
      if (pieChartRef.current) pieChartRef.current.destroy();
    };
    // pumpData is static mock data, so an empty dependency array is fine
  }, []); // runs once when the Statistics page mounts

  // --- JSX LAYOUT --------------------------------------------
  // Layout matches the Figma: title, two stat cards, row of charts, notice box
  return (
    <div className="statistics-page">
      <h1 className="statistics-title">Community Statistics</h1>

      {/* top grey boxes: total pumps + total reports */}
      <div className="stat-cards">
        <div className="stat-card">
          <div className="stat-label">Total Pumps</div>
          <div className="stat-value">{totalPumps}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Reports</div>
          <div className="stat-value">{totalReports}</div>
        </div>
      </div>

      {/* bar chart on the left, pie chart on the right */}
      <div className="charts-row">
        <div className="chart-wrapper">
          {/* Chart.js will draw the bar chart into this canvas */}
          <canvas ref={barCanvasRef} />
        </div>
        <div className="chart-wrapper">
          {/* Chart.js will draw the pie chart into this canvas */}
          <canvas ref={pieCanvasRef} />
        </div>
      </div>

      {/* fixed notice in the bottom-left corner, same text as spec */}
      <div className="data-notice-box">
        <strong>Data Notice:</strong>
        <br />
        To ensure you are viewing current information, all metrics on this
        dashboard are refreshed on a bi-weekly schedule.
      </div>
    </div>
  );
}

export default Statistics;
