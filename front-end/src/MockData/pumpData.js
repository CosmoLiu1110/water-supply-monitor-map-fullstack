// front-end/src/MockData/pumpData.js

// Center of Rakai district (Uganda)
const CENTER = {
  lat: -0.7100686018036372,
  lng: 31.405992276227874,
};

const RANGE = 0.02; // smaller range around the center

// random helpers
const rand = (min, max) => Math.random() * (max - min) + min;
const randInt = (min, max) => Math.floor(rand(min, max + 1));
const choice = (arr) => arr[randInt(0, arr.length - 1)];

// pump status levels
const LEVELS = [
  { level: "green", statusText: "Functional" },
  { level: "yellow", statusText: "Needs Maintenance" },
  { level: "red", statusText: "Damaged" },
];

const TYPES = [
  "Submersible Pump",
  "Surface Pump",
  "Pressure Pump",
  "Centrifugal Pump",
];

// random date in the last ~2 weeks
function randomDate() {
  const now = new Date();
  const daysAgo = randInt(1, 15);
  const date = new Date(now - daysAgo * 24 * 3600 * 1000);
  return date.toISOString().slice(0, 16).replace("T", " ");
}

// generate Rakai markers
function generateRakaiMarkers(count) {
  const markers = [];

  for (let i = 0; i < count; i++) {
    const status = choice(LEVELS);

    markers.push({
      id: `rakai-${i + 1}`,
      name: `Rakai Pump Station ${i + 1}`,

      position: {
        lat: rand(CENTER.lat - RANGE, CENTER.lat + RANGE),
        lng: rand(CENTER.lng - RANGE, CENTER.lng + RANGE),
      },

      level: status.level,
      statusText: status.statusText,
      type: choice(TYPES),

      lastUpdated: randomDate(),
      issue:
        status.level === "red"
          ? "Critical Failure"
          : status.level === "yellow"
          ? "Performance Drop"
          : "None",

      reported: randomDate(),
      assignedTo: choice(["Team A", "Team B", "Team C"]),

      // used by the statistics page for charts
      monthlyReports: {
        Jan: randInt(1, 4),
        Feb: randInt(1, 4),
        Mar: randInt(1, 4),
        Apr: randInt(1, 4),
        May: randInt(1, 4),
        Jun: randInt(1, 4),
      },

      history: {
        fixed: randInt(10, 80),
        reported: randInt(10, 80),
      },
    });
  }

  return markers;
}

// generate 20–28 markers
const pumpData = generateRakaiMarkers(randInt(20, 28));

export default pumpData;