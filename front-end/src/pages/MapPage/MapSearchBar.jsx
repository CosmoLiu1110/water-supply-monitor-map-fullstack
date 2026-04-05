// src/pages/Map/MapSearchBar.jsx
function MapSearchBar({
  hasSelected,
  searchText,
  onSearchChange,
  onSubmit,
  statusFilter,
  onStatusFilterChange,
  placeSuggestions,
  facilitySuggestions,
  onPlaceClick,
  onFacilityClick,
}) {
  const searchClassName = "map-search" + (hasSelected ? " search-shift" : "");

  return (
    <div className={searchClassName}>
      <form onSubmit={onSubmit} className="map-search-form">
        <div className="map-search-input-wrapper">
          <input
            type="text"
            className="map-search-input"
            placeholder="Search area or facility..."
            value={searchText}
            onChange={onSearchChange}
          />
          <button type="submit" className="map-search-button">
            <span className="map-search-button-icon">🔍</span>
          </button>
        </div>

        <select
          className="map-filter-select"
          value={statusFilter}
          onChange={onStatusFilterChange}
        >
          <option value="all">All pumps statuses</option>
          <option value="green">Functional</option>
          <option value="yellow">Needs Maintenance</option>
          <option value="red">Damaged</option>
        </select>
      </form>

      {(placeSuggestions.length > 0 || facilitySuggestions.length > 0) && (
        <div className="map-search-suggestions">
          {placeSuggestions.map((p) => (
            <div
              key={p.place_id}
              className="map-suggestion-item"
              onClick={() => onPlaceClick(p)}
            >
              {p.description}
            </div>
          ))}

          {/* divider line */}
          {placeSuggestions.length > 0 && facilitySuggestions.length > 0 && (
            <div
              style={{
                borderTop: "1px solid #e5e7eb",
                margin: "4px 0",
              }}
            />
          )}

          {/* facility suggestions */}
          {facilitySuggestions.map((m) => (
            <div
              key={m.id}
              className="map-suggestion-item"
              onClick={() => onFacilityClick(m)}
            >
              {m.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MapSearchBar;