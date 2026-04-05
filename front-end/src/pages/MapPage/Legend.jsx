// src/pages/Map/Legend.jsx
function Legend({ hasSelected }) {
  const legendClassName = "map-legend" + (hasSelected ? " legend-shift" : "");

  return (
    <div className={legendClassName}>
      <div className="legend-title">Legend</div>
      <div className="legend-item">
        <span className="legend-dot green" /> Functional
      </div>
      <div className="legend-item">
        <span className="legend-dot yellow" /> Needs Maintenance
      </div>
      <div className="legend-item">
        <span className="legend-dot red" /> Damaged
      </div>
    </div>
  );
}

export default Legend;