# 🏗️ System Architecture

## 📊 High-Level Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         CRIME BEFORE CRIME                       │
│                  Environment-Based Crime Prediction              │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────┐         ┌──────────────────┐         ┌──────────────────┐
│                  │         │                  │         │                  │
│   CITIZEN        │────────▶│   WEB APP        │◀────────│   AUTHORITY      │
│   (Reporter)     │         │   (React)        │         │   (Monitor)      │
│                  │         │                  │         │                  │
└──────────────────┘         └────────┬─────────┘         └──────────────────┘
                                      │
                                      │ HTTP/WebSocket
                                      │
                             ┌────────▼─────────┐
                             │                  │
                             │   API SERVER     │
                             │   (Node.js)      │
                             │                  │
                             └────────┬─────────┘
                                      │
                    ┌─────────────────┼─────────────────┐
                    │                 │                 │
            ┌───────▼────────┐ ┌─────▼──────┐ ┌───────▼────────┐
            │                │ │            │ │                │
            │  RISK ENGINE   │ │  ZONES DB  │ │  ALERT SYSTEM  │
            │  (Algorithm)   │ │  (Memory)  │ │  (Real-time)   │
            │                │ │            │ │                │
            └────────────────┘ └────────────┘ └────────────────┘
```

## 🔄 Data Flow

### 1. Zone Monitoring Flow
```
Environmental Sensors (Simulated)
         │
         ▼
┌─────────────────────┐
│  Sensor Data        │
│  - Streetlight: 0/1 │
│  - Noise: L/M/H     │
│  - Crowd: L/M/H     │
│  - Time: D/E/N      │
│  - Weather: C/R/F   │
│  - Vehicle: Y/N     │
│  - Garbage: Y/N     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Risk Calculator    │
│  Weighted Algorithm │
│  Score: 0-100       │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Zone Risk Score    │
│  + Reasons List     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  WebSocket Broadcast│
│  to All Clients     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Map Updates        │
│  Color Changes      │
│  Info Windows       │
└─────────────────────┘
```

### 2. Simulation Flow
```
User Interaction (Simulation Panel)
         │
         ▼
┌─────────────────────┐
│  Select Zone        │
│  Modify Factor      │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  PATCH /api/zones   │
│  /:id/factors       │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Update Zone Data   │
│  Recalculate Risk   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Check Alert        │
│  Threshold (≥70)    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Broadcast Update   │
│  via WebSocket      │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  All Clients Update │
│  Instantly          │
└─────────────────────┘
```

### 3. Citizen Report Flow
```
Citizen Submits Report
         │
         ▼
┌─────────────────────┐
│  Report Form        │
│  - Zone ID          │
│  - Issue Type       │
│  - Description      │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  POST /api/reports  │
│  Anonymous          │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Store Report       │
│  Apply to Zone      │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Update Zone Factor │
│  (e.g., light=0)    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Recalculate Risk   │
│  Broadcast Update   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Map + Stats Update │
└─────────────────────┘
```

### 4. Alert Flow
```
Risk Score Calculated
         │
         ▼
    Score ≥ 70?
         │
    ┌────┴────┐
    │         │
   YES       NO
    │         │
    ▼         ▼
┌────────┐  ┌────────┐
│ Create │  │ Skip   │
│ Alert  │  │        │
└───┬────┘  └────────┘
    │
    ▼
┌─────────────────────┐
│  Alert Object       │
│  - Zone Name        │
│  - Risk Score       │
│  - Reasons List     │
│  - Timestamp        │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Add to Alert Log   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Broadcast          │
│  NEW_ALERT event    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Alert Panel Shows  │
│  with Animation     │
└─────────────────────┘
```

## 🧮 Risk Calculation Algorithm

```
function calculateRisk(factors):
    score = 0
    reasons = []
    
    // Streetlight (25 points)
    if factors.streetlight == 0:
        score += 25
        reasons.push("Broken streetlight")
    
    // Noise (0-20 points)
    if factors.noise == "high":
        score += 20
        reasons.push("High noise level")
    else if factors.noise == "medium":
        score += 10
        reasons.push("Medium noise level")
    
    // Crowd (0-15 points)
    if factors.crowd == "high":
        score += 15
        reasons.push("High crowd density")
    else if factors.crowd == "medium":
        score += 7
    
    // Time (0-20 points)
    if factors.timeOfDay == "night":
        score += 20
        reasons.push("Nighttime hours")
    else if factors.timeOfDay == "evening":
        score += 10
        reasons.push("Evening hours")
    
    // Weather (0-15 points)
    if factors.weather == "fog":
        score += 15
        reasons.push("Foggy conditions")
    else if factors.weather == "rain":
        score += 10
        reasons.push("Rainy conditions")
    
    // Abandoned Vehicle (10 points)
    if factors.abandonedVehicle:
        score += 10
        reasons.push("Abandoned vehicle detected")
    
    // Garbage (5 points)
    if factors.garbageOverflow:
        score += 5
        reasons.push("Garbage overflow")
    
    return {
        score: min(score, 100),
        reasons: reasons
    }
```

## 🗄️ Data Models

### Zone Object
```javascript
{
  id: "zone1",                    // Unique identifier
  name: "Meenakshi Amman Temple", // Display name
  lat: 9.9195,                    // Latitude
  lng: 78.1193,                   // Longitude
  factors: {                      // Environmental factors
    streetlight: 1,               // 0=broken, 1=working
    noise: "low",                 // low/medium/high
    crowd: "high",                // low/medium/high
    timeOfDay: "day",             // day/evening/night
    weather: "clear",             // clear/rain/fog
    abandonedVehicle: false,      // boolean
    garbageOverflow: false        // boolean
  },
  score: 35,                      // Calculated 0-100
  reasons: [                      // Why risky
    "High crowd density"
  ]
}
```

### Alert Object
```javascript
{
  id: "1234567890zone1",          // Unique ID
  zoneId: "zone1",                // Zone reference
  zoneName: "Meenakshi Temple",   // Display name
  score: 75,                      // Risk score
  reasons: [                      // Risk factors
    "Broken streetlight",
    "Nighttime hours"
  ],
  timestamp: "2026-05-29T18:30:00Z", // ISO format
  resolved: false                 // Status
}
```

### Report Object
```javascript
{
  id: 1234567890,                 // Unique ID
  zoneId: "zone1",                // Zone reference
  type: "broken_streetlight",     // Issue type
  description: "Near main gate",  // Optional details
  timestamp: "2026-05-29T18:30:00Z" // ISO format
}
```

### Stats Object
```javascript
{
  totalZones: 8,                  // Count
  activeAlerts: 2,                // High-risk zones
  reportsToday: 15,               // Citizen reports
  safestZone: "Anna Nagar",       // Lowest risk
  highestRiskZone: "Vishalnagar", // Highest risk
  highestRiskScore: 85            // Score value
}
```

## 🌐 API Endpoints

```
┌─────────────────────────────────────────────────────────┐
│                     REST API                            │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  GET    /api/zones                                      │
│         → Returns all zones with risk scores           │
│                                                         │
│  PATCH  /api/zones/:id/factors                          │
│         ← { streetlight: 0, noise: "high" }            │
│         → Returns updated zone                          │
│                                                         │
│  GET    /api/alerts                                     │
│         → Returns active alerts (resolved=false)        │
│                                                         │
│  POST   /api/reports                                    │
│         ← { zoneId, type, description }                │
│         → Returns created report                        │
│                                                         │
│  GET    /api/reports                                    │
│         → Returns recent reports + today count          │
│                                                         │
│  GET    /api/stats                                      │
│         → Returns dashboard statistics                  │
│                                                         │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                   WebSocket Events                      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Server → Client                                        │
│                                                         │
│  ZONES_UPDATE                                           │
│  { type: "ZONES_UPDATE", zones: [...] }                │
│  → Sent when any zone data changes                     │
│                                                         │
│  NEW_ALERT                                              │
│  { type: "NEW_ALERT", alert: {...} }                   │
│  → Sent when risk crosses threshold                    │
│                                                         │
│  NEW_REPORT                                             │
│  { type: "NEW_REPORT", report: {...} }                 │
│  → Sent when citizen submits report                    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## 🎨 Component Hierarchy

```
App
├── StatsBar
│   └── StatItem (×5)
│
├── MapView
│   ├── GoogleMap
│   ├── Circle (×8 zones)
│   └── InfoWindow
│
├── SimulationPanel
│   ├── ZoneSelector
│   ├── FactorControls (×7)
│   └── ScoreDisplay
│
├── AlertPanel
│   └── AlertItem (×N)
│
└── CitizenReportPanel
    └── ReportForm
```

## 🔐 Security & Privacy

```
┌─────────────────────────────────────────────────────────┐
│                   PRIVACY LAYERS                        │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ❌ NO Facial Recognition                               │
│  ❌ NO People Tracking                                  │
│  ❌ NO Personal Identifiers                             │
│  ❌ NO Biometric Data                                   │
│  ❌ NO Individual Behavior                              │
│                                                         │
│  ✅ Environment Only                                    │
│  ✅ Aggregate Data                                      │
│  ✅ Anonymous Reports                                   │
│  ✅ Location-Based Alerts                               │
│  ✅ Open Algorithm                                      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## 📈 Scalability Path

```
Phase 1: Demo (Current)
├── 8 zones
├── Simulated sensors
├── In-memory storage
└── Single server

Phase 2: Pilot
├── 50 zones
├── Real IoT sensors
├── MongoDB database
└── Load balancer

Phase 3: City-Wide
├── 500+ zones
├── City infrastructure integration
├── PostgreSQL + Redis
└── Microservices

Phase 4: Multi-City
├── Unlimited zones
├── ML predictions
├── Cloud deployment
└── API for partners
```

## 🔄 Real-Time Update Mechanism

```
Event Occurs
    │
    ▼
┌─────────────────┐
│ Server Updates  │
│ Zone Data       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Recalculate     │
│ Risk Score      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Check Alerts    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Broadcast via   │
│ WebSocket       │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌────────┐ ┌────────┐
│Client 1│ │Client 2│
│Updates │ │Updates │
└────────┘ └────────┘
```

## 🎯 Performance Metrics

```
┌─────────────────────────────────────────┐
│           Performance Targets           │
├─────────────────────────────────────────┤
│ Risk Calculation:      < 10ms           │
│ WebSocket Latency:     < 100ms          │
│ Map Render:            < 2s             │
│ API Response:          < 200ms          │
│ Concurrent Users:      100+             │
│ Zone Updates/sec:      50+              │
└─────────────────────────────────────────┘
```

## 🛠️ Technology Stack Details

```
Frontend
├── React 18.3.1
├── Vite 6.0.7
├── @react-google-maps/api 2.20.3
├── axios 1.7.9
└── Custom CSS

Backend
├── Node.js 22.18.0
├── Express 4.18.2
├── ws (WebSocket) 8.16.0
└── cors 2.8.5

Development
├── npm 10.9.3
├── ESLint
└── Git
```

---

**This architecture prioritizes:**
- ✅ Real-time responsiveness
- ✅ Privacy by design
- ✅ Scalability
- ✅ Transparency
- ✅ Simplicity
