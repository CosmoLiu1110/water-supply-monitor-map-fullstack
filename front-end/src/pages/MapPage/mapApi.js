const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080"
).replace(/\/$/, "");

const STATUS_META = {
  ACTIVE: {
    level: "green",
    statusText: "Functional",
    issue: "None",
  },
  NEEDS_REPAIR: {
    level: "yellow",
    statusText: "Needs Repair",
    issue: "Maintenance Required",
  },
  IN_MAINTENANCE: {
    level: "yellow",
    statusText: "In Maintenance",
    issue: "Under Maintenance",
  },
  OUT_OF_SERVICE: {
    level: "red",
    statusText: "Out of Service",
    issue: "Unavailable",
  },
};

function formatTimestamp(value) {
  if (!value) {
    return "N/A";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export async function fetchPumps() {
  const response = await fetch(`${API_BASE_URL}/api/pumps`);

  if (!response.ok) {
    throw new Error(`Failed to load pumps (${response.status})`);
  }

  const pumps = await response.json();

  return pumps.map((pump) => {
    const statusMeta = STATUS_META[pump.status] || {
      level: "red",
      statusText: pump.status || "Unknown",
      issue: "Unknown",
    };

    return {
      id: pump.id,
      name: pump.name || pump.pumpCode || "Unnamed Pump",
      position: {
        lat: Number(pump.latitude),
        lng: Number(pump.longitude),
      },
      level: statusMeta.level,
      statusText: statusMeta.statusText,
      type: "Water Pump",
      lastUpdated: formatTimestamp(pump.updatedAt),
      issue: statusMeta.issue,
      reported: formatTimestamp(pump.createdAt),
      assignedTo: "Field Team",
      address: pump.address || "N/A",
      pumpCode: pump.pumpCode || "N/A",
      backendStatus: pump.status,
    };
  });
}

export async function resolveLocation(query) {
  const url = new URL(`${API_BASE_URL}/api/geocode/resolve`);
  url.searchParams.set("query", query);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to resolve location (${response.status})`);
  }

  return response.json();
}
