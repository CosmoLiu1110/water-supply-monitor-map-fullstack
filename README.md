# Water Supply Monitor Map System

A standalone portfolio version of the map subsystem I built for a group software engineering project focused on community water facility monitoring.

This repo highlights the part I primarily owned end-to-end:

- interactive React map interface
- Spring Boot backend for pump data management
- geocoding service with database caching
- relational schema design and Flyway migrations

## Project Overview

The system is designed to help users explore and manage water facility information through a map-based interface. It combines frontend map interaction, backend APIs, and structured storage for pump and geocoding data.

Core capabilities:

- display water pump markers on an interactive map
- filter facilities by operational status
- search by facility metadata and location
- resolve location queries through a backend geocoding service
- cache repeated geocoding results in the database

## My Contribution

I took primary ownership of the map-related full-stack components:

- built the React map page and supporting UI components
- integrated multi-source search using Google Places and backend geocoding
- implemented REST APIs for pump data retrieval, lookup, update, and filtering
- built a geocode service with local cache lookup and OpenStreetMap fallback
- designed the database schema for `pumps` and `geocode_cache`
- added indexing and Flyway migrations for maintainable schema evolution

## Tech Stack

Frontend:

- React
- Vite
- Google Maps JavaScript API
- Google Places API

Backend:

- Java 21
- Spring Boot
- Spring Web
- Spring Data JPA
- Bean Validation

Database:

- H2
- Flyway

## Architecture

```text
Frontend (React Map UI)
        |
        v
Backend REST APIs
  - /api/pumps
  - /api/geocode/resolve
        |
        v
H2 Database
  - pumps
  - geocode_cache
```

## Backend Features

### Pump API

The backend exposes CRUD and lookup endpoints for pump records:

- `GET /api/pumps`
- `GET /api/pumps/{id}`
- `GET /api/pumps/code/{pumpCode}`
- `POST /api/pumps`
- `PUT /api/pumps/{id}`
- `DELETE /api/pumps/{id}`

### Geocoding API

The backend resolves user-entered location queries through a cache-first workflow:

1. normalize the query
2. check `geocode_cache`
3. fall back to OpenStreetMap Nominatim if needed
4. store the resolved result for future reuse

Endpoint:

- `GET /api/geocode/resolve?query=...`

## Database Design

Two core tables support the map workflow:

- `pumps`
- `geocode_cache`

The schema includes:

- indexed status and lookup fields
- unique pump code constraint
- Flyway versioned migrations
- seeded sample data for local development

## Frontend Features

The map UI includes:

- dynamic marker rendering from backend pump data
- status-based filtering
- marker selection and details panel
- search suggestions
- location resolution
- browser geolocation and recenter controls

## Local Setup

### Frontend

Create `front-end/.env.local`:

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

### Backend

Run:

```bash
cd back-end
./mvnw spring-boot:run
```

## Validation Notes

- Backend tests start successfully and apply Flyway migrations against H2.
- Frontend lint passes aside from one pre-existing warning copied from the original group project.
- Frontend production build requires Node `20.19+` because of the Vite version used in this repo.

## Why This Repo Exists

The original coursework repository was a multi-person group project. This standalone version isolates the map-focused frontend, backend, and database work that I implemented so it can be reviewed as an individual portfolio project.
