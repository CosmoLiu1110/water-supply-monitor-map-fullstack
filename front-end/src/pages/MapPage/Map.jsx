import { useEffect, useMemo, useRef, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import locatorIcon from "/src/assets/icons/locator.png";
import InfoPanel from "./InfoPanel";
import Legend from "./Legend";
import "./Map.css";
import { fetchPumps, resolveLocation } from "./mapApi";
import MapControls from "./MapControls";
import MapSearchBar from "./MapSearchBar";

const darkMapStyles = [
  { elementType: "geometry", stylers: [{ color: "#0b1220" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#e5e7eb" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#020617" }] },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#111827" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#e5e7eb" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#020617" }],
  },
  {
    featureType: "poi",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "transit",
    stylers: [{ visibility: "off" }],
  },
];

function Map() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries: ["places"],
  });

  const defaultCenter = useMemo(
    () => ({
      lat: 51.5321,
      lng: -0.4729,
    }),
    []
  );

  const mapRef = useRef(null);
  const autocompleteServiceRef = useRef(null);

  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [placeSuggestions, setPlaceSuggestions] = useState([]);
  const [facilitySuggestions, setFacilitySuggestions] = useState([]);
  const [searchLocation, setSearchLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [dataError, setDataError] = useState("");
  const [isLoadingPumps, setIsLoadingPumps] = useState(true);
  const [isResolvingLocation, setIsResolvingLocation] = useState(false);

  const filteredMarkers =
    statusFilter === "all"
      ? markers
      : markers.filter((marker) => marker.level === statusFilter);

  useEffect(() => {
    let isActive = true;

    async function loadPumps() {
      try {
        setIsLoadingPumps(true);
        setDataError("");
        const nextMarkers = await fetchPumps();

        if (!isActive) {
          return;
        }

        setMarkers(nextMarkers);
      } catch (error) {
        if (!isActive) {
          return;
        }

        setDataError(
          error instanceof Error
            ? error.message
            : "Failed to load map data from backend."
        );
      } finally {
        if (isActive) {
          setIsLoadingPumps(false);
        }
      }
    }

    loadPumps();

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    if (!selectedMarker) {
      return;
    }

    const markerStillVisible = markers.some((marker) => marker.id === selectedMarker.id);
    if (!markerStillVisible) {
      setSelectedMarker(null);
    }
  }, [markers, selectedMarker]);

  const handleMapLoad = (map) => {
    mapRef.current = map;

    if (
      !autocompleteServiceRef.current &&
      window.google &&
      window.google.maps &&
      window.google.maps.places
    ) {
      autocompleteServiceRef.current =
        new window.google.maps.places.AutocompleteService();
    }
  };

  const panToPosition = (pos, zoom = 13) => {
    if (!mapRef.current) {
      return;
    }

    mapRef.current.panTo(pos);
    mapRef.current.setZoom(zoom);
  };

  const handleZoomIn = () => {
    if (!mapRef.current) {
      return;
    }

    const currentZoom = mapRef.current.getZoom() || 13;
    mapRef.current.setZoom(currentZoom + 1);
  };

  const handleZoomOut = () => {
    if (!mapRef.current) {
      return;
    }

    const currentZoom = mapRef.current.getZoom() || 13;
    mapRef.current.setZoom(currentZoom - 1);
  };

  const handleRecenter = () => {
    const target = userLocation || defaultCenter;
    panToPosition(target, 13);
    setSearchLocation(null);
  };

  const getFacilityIcon = (level) => {
    if (!window.google || !window.google.maps) {
      return undefined;
    }

    const colorMap = {
      green: "#22c55e",
      yellow: "#eab308",
      red: "#ef4444",
    };

    return {
      path: window.google.maps.SymbolPath.CIRCLE,
      scale: 8,
      fillColor: colorMap[level] || "#ffffff",
      fillOpacity: 1,
      strokeColor: "#ffffff",
      strokeWeight: 2,
    };
  };

  useEffect(() => {
    if (!isLoaded || !navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        setUserLocation(location);
        panToPosition(location, 13);
      },
      (error) => {
        console.warn("Geolocation error:", error);
      }
    );
  }, [isLoaded]);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchText(value);
    setSearchLocation(null);

    if (!value.trim()) {
      setPlaceSuggestions([]);
      setFacilitySuggestions([]);
      return;
    }

    const normalized = value.trim().toLowerCase();
    const facilityMatches = filteredMarkers.filter((marker) => {
      const name = marker.name.toLowerCase();
      const address = marker.address.toLowerCase();
      const pumpCode = marker.pumpCode.toLowerCase();

      return (
        name.includes(normalized) ||
        address.includes(normalized) ||
        pumpCode.includes(normalized)
      );
    });

    setFacilitySuggestions(facilityMatches.slice(0, 6));

    if (!autocompleteServiceRef.current) {
      setPlaceSuggestions([]);
      return;
    }

    autocompleteServiceRef.current.getPlacePredictions(
      { input: value },
      (predictions, status) => {
        if (
          status === window.google.maps.places.PlacesServiceStatus.OK &&
          predictions
        ) {
          setPlaceSuggestions(predictions.slice(0, 5));
        } else {
          setPlaceSuggestions([]);
        }
      }
    );
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
    setSelectedMarker(null);
  };

  const handleFacilitySelect = (marker) => {
    setStatusFilter("all");
    panToPosition(marker.position, 14);
    setSelectedMarker(marker);
    setSearchText(marker.name);
    setPlaceSuggestions([]);
    setFacilitySuggestions([]);
    setSearchLocation(null);
  };

  const resolveAndPanToQuery = async (query) => {
    try {
      setIsResolvingLocation(true);
      setDataError("");
      const result = await resolveLocation(query);
      const nextPosition = {
        lat: Number(result.latitude),
        lng: Number(result.longitude),
      };

      panToPosition(nextPosition, 13);
      setSelectedMarker(null);
      setSearchLocation(nextPosition);
      setSearchText(result.formattedAddress || query);
      setPlaceSuggestions([]);
      setFacilitySuggestions([]);
    } catch (error) {
      setDataError(
        error instanceof Error
          ? error.message
          : "Unable to resolve this location right now."
      );
    } finally {
      setIsResolvingLocation(false);
    }
  };

  const handlePlaceSuggestionClick = async (prediction) => {
    await resolveAndPanToQuery(prediction.description);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    const query = searchText.trim();

    if (!query) {
      return;
    }

    const localMatch = markers.find((marker) => {
      const normalized = query.toLowerCase();
      return (
        marker.name.toLowerCase().includes(normalized) ||
        marker.address.toLowerCase().includes(normalized) ||
        marker.pumpCode.toLowerCase().includes(normalized)
      );
    });

    if (localMatch) {
      handleFacilitySelect(localMatch);
      return;
    }

    await resolveAndPanToQuery(query);
  };

  if (!apiKey) {
    return (
      <div style={{ padding: 16 }}>
        ERROR: Google Maps API key is not set. Please set the
        `VITE_GOOGLE_MAPS_API_KEY` env variable.
      </div>
    );
  }

  if (loadError) {
    return (
      <div style={{ padding: 16 }}>Map load error: {loadError.message}</div>
    );
  }

  if (!isLoaded) {
    return <div style={{ padding: 16 }}>Loading map...</div>;
  }

  const hasSelected = !!selectedMarker;

  return (
    <div className="map-page">
      <div className="map-container">
        <GoogleMap
          mapContainerClassName="map-canvas"
          center={defaultCenter}
          zoom={13}
          onLoad={handleMapLoad}
          options={{
            disableDefaultUI: true,
            styles: darkMapStyles,
          }}
        >
          {filteredMarkers.map((marker) => (
            <Marker
              key={marker.id}
              position={marker.position}
              icon={getFacilityIcon(marker.level)}
              title={marker.name}
              onClick={() => {
                setSelectedMarker(marker);
                panToPosition(marker.position, 14);
                setSearchLocation(null);
              }}
            />
          ))}

          {searchLocation && (
            <Marker
              position={searchLocation}
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
              }}
            />
          )}

          {userLocation && window.google && window.google.maps && (
            <Marker
              position={userLocation}
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
              }}
            />
          )}
        </GoogleMap>

        <MapSearchBar
          hasSelected={hasSelected}
          searchText={searchText}
          onSearchChange={handleSearchChange}
          onSubmit={handleSearchSubmit}
          statusFilter={statusFilter}
          onStatusFilterChange={handleStatusFilterChange}
          placeSuggestions={placeSuggestions}
          facilitySuggestions={facilitySuggestions}
          onPlaceClick={handlePlaceSuggestionClick}
          onFacilityClick={handleFacilitySelect}
        />

        <InfoPanel
          selectedMarker={selectedMarker}
          onClose={() => setSelectedMarker(null)}
        />

        <Legend hasSelected={hasSelected} />

        <MapControls
          locatorIcon={locatorIcon}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onRecenter={handleRecenter}
        />

        {(isLoadingPumps || isResolvingLocation || dataError) && (
          <div className="map-status-banner">
            {isLoadingPumps && <span>Loading pump data from backend...</span>}
            {isResolvingLocation && <span>Resolving location...</span>}
            {!isLoadingPumps && !isResolvingLocation && dataError && (
              <span>{dataError}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Map;
