function MapControls({ locatorIcon, onZoomIn, onZoomOut, onRecenter }) {
  return (
    <>
      <div className="map-zoom-controls">
        <button className="zoom-btn" onClick={onZoomIn}>
          +
        </button>
        <div className="zoom-divider" />
        <button className="zoom-btn" onClick={onZoomOut}>
          -
        </button>
      </div>

      <button className="reset-view-btn" onClick={onRecenter}>
        <img src={locatorIcon} alt="Recenter" className="reset-icon" />
      </button>
    </>
  );
}

export default MapControls;
