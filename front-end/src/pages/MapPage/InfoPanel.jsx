function InfoPanel({ selectedMarker, onClose }) {
  const panelOpenClass = selectedMarker ? " info-panel--open" : "";

  return (
    <div className={"info-panel" + panelOpenClass}>
      <div className="info-panel-inner">
        <div className="info-panel-header">
          <h3>Facility Details</h3>
          <button className="info-close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        {selectedMarker ? (
          <>
            <div className="info-card">
              <div className="info-row">
                <span className="label">Name</span>
                <span className="value">{selectedMarker.name}</span>
              </div>
              <div className="info-row">
                <span className="label">Status</span>
                <span
                  className={`status-dot status-${selectedMarker.level}`}
                >
                  ●
                </span>
                <span className="value">{selectedMarker.statusText}</span>
              </div>
              <div className="info-row">
                <span className="label">Type</span>
                <span className="value">{selectedMarker.type}</span>
              </div>
              <div className="info-row">
                <span className="label">Pump Code</span>
                <span className="value">{selectedMarker.pumpCode}</span>
              </div>
              <div className="info-row">
                <span className="label">Updated</span>
                <span className="value">{selectedMarker.lastUpdated}</span>
              </div>
            </div>

            <div className="info-card">
              <h4>Location Details</h4>
              <div className="info-row">
                <span className="label">Address</span>
                <span className="value">{selectedMarker.address}</span>
              </div>
              <div className="info-row">
                <span className="label">Issue</span>
                <span className="value">{selectedMarker.issue}</span>
              </div>
              <div className="info-row">
                <span className="label">Created</span>
                <span className="value">{selectedMarker.reported}</span>
              </div>
              <div className="info-row">
                <span className="label">Backend Status</span>
                <span className="value">{selectedMarker.backendStatus}</span>
              </div>
            </div>
          </>
        ) : (
          <div className="info-empty">
            Click a marker to view facility details.
          </div>
        )}
      </div>
    </div>
  );
}

export default InfoPanel;
