# Water Supply Monitor Map Full-Stack

Standalone portfolio version of the map subsystem from the CS2701 group project.

This repo focuses on the part I primarily implemented:

- React-based interactive map UI
- Spring Boot REST APIs for pump management
- Geocoding service with database caching and OpenStreetMap fallback
- H2 schema design and Flyway migrations

## Structure

```text
.
├── front-end
└── back-end
```

## Frontend

The frontend is a Vite + React app centered on the map experience. It:

- loads pump markers from the backend
- supports local facility search
- supports place search via Google Places suggestions
- resolves searched locations through the backend geocode service
- shows map filtering, marker selection, and user geolocation

Create `front-end/.env.local` with:

```bash
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
VITE_API_BASE_URL=http://localhost:8080
```

Run:

```bash
cd front-end
npm install
npm run dev
```

## Backend

The backend is a Spring Boot service exposing:

- `GET /api/pumps`
- `GET /api/pumps/{id}`
- `GET /api/pumps/code/{pumpCode}`
- `POST /api/pumps`
- `PUT /api/pumps/{id}`
- `DELETE /api/pumps/{id}`
- `GET /api/geocode/resolve?query=...`

Run:

```bash
cd back-end
./mvnw spring-boot:run
```

## Notes

- The frontend build currently requires Node `20.19+` because the copied Vite version does not support the local Node `18.15.0` environment.
- The backend uses H2 in-memory storage with Flyway migrations applied on startup.
