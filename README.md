# RainVault 🌧️

An interactive rainwater harvesting design and simulation tool. Built as an academic Full-Stack Development (FSD) project (Frontend Module).

## Overview
RainVault helps homeowners design right-sized rainwater harvesting systems. Users can search for their building on an interactive map, draw a polygon over their roof, and instantly simulate their annual water harvest, recommended tank size, and estimated cost savings based on local rainfall data.

## Features
- **Interactive Map Designer:** Search locations (powered by OpenStreetMap/Nominatim) and use polygon drawing tools to map out roof areas.
- **Dynamic Harvest Simulation:** Calculates square footage via Turf.js and estimates annual harvest yield based on local rainfall metrics (e.g., Bengaluru - 970mm).
- **Financial & System Estimates:** Recommends storage tank sizes, filters, recharge pits, and provides estimated installation costs and payback periods.
- **Liquid Glass UI:** Modern, fully responsive, dark-mode compatible interface built with Tailwind CSS and Framer Motion.

## Tech Stack
- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS + custom CSS animations
- **Mapping:** React-Leaflet, Leaflet.js, Leaflet-Draw, Leaflet-Geosearch
- **Geospatial Math:** Turf.js
- **Icons:** Lucide React
- **Routing:** React Router DOM

## How to Run Locally

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:5173` in your browser.

## Constraints & Scope
*Note: This repository currently contains the Frontend prototype developed for the weekly module submission. Backend, database, and authentication implementations are mocked pending future modules.*
