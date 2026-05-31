const express = require('express');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// --- Initial Zone Data (Madurai landmarks) ---
const zones = [
  {
    id: 'zone1',
    name: 'Meenakshi Amman Temple',
    lat: 9.9195,
    lng: 78.1193,
    factors: { streetlight: 1, noise: 'high', crowd: 'high', timeOfDay: 'day', weather: 'clear', abandonedVehicle: false, garbageOverflow: false }
  },
  {
    id: 'zone2',
    name: 'Madurai Railway Station',
    lat: 9.9261,
    lng: 78.1198,
    factors: { streetlight: 1, noise: 'medium', crowd: 'high', timeOfDay: 'day', weather: 'clear', abandonedVehicle: false, garbageOverflow: false }
  },
  {
    id: 'zone3',
    name: 'Mattuthavani Bus Stand',
    lat: 9.9583,
    lng: 78.1063,
    factors: { streetlight: 1, noise: 'medium', crowd: 'medium', timeOfDay: 'day', weather: 'clear', abandonedVehicle: false, garbageOverflow: false }
  },
  {
    id: 'zone4',
    name: 'Anna Nagar',
    lat: 9.9312,
    lng: 78.1108,
    factors: { streetlight: 1, noise: 'low', crowd: 'low', timeOfDay: 'day', weather: 'clear', abandonedVehicle: false, garbageOverflow: false }
  },
  {
    id: 'zone5',
    name: 'Goripalayam',
    lat: 9.9142,
    lng: 78.1098,
    factors: { streetlight: 0, noise: 'medium', crowd: 'low', timeOfDay: 'day', weather: 'clear', abandonedVehicle: true, garbageOverflow: false }
  },
  {
    id: 'zone6',
    name: 'Tallakulam',
    lat: 9.9378,
    lng: 78.1245,
    factors: { streetlight: 1, noise: 'low', crowd: 'low', timeOfDay: 'day', weather: 'clear', abandonedVehicle: false, garbageOverflow: false }
  },
  {
    id: 'zone7',
    name: 'KK Nagar',
    lat: 9.9456,
    lng: 78.0987,
    factors: { streetlight: 1, noise: 'low', crowd: 'low', timeOfDay: 'day', weather: 'clear', abandonedVehicle: false, garbageOverflow: false }
  },
  {
    id: 'zone8',
    name: 'Vishalnagar',
    lat: 9.9089,
    lng: 78.1312,
    factors: { streetlight: 0, noise: 'high', crowd: 'medium', timeOfDay: 'day', weather: 'clear', abandonedVehicle: true, garbageOverflow: true }
  }
];

// Citizen reports stored in memory
let citizenReports = [];
let alertLog = [];

// --- Risk Score Calculator ---
function calculateRisk(factors) {
  let score = 0;
  const reasons = [];

  // Streetlight: broken = +25
  if (factors.streetlight === 0) { score += 25; reasons.push('Broken streetlight'); }

  // Noise level
  if (factors.noise === 'high') { score += 20; reasons.push('High noise level'); }
  else if (factors.noise === 'medium') { score += 10; reasons.push('Medium noise level'); }

  // Crowd density
  if (factors.crowd === 'high') { score += 15; reasons.push('High crowd density'); }
  else if (factors.crowd === 'medium') { score += 7; }

  // Time of day
  if (factors.timeOfDay === 'night') { score += 20; reasons.push('Nighttime hours'); }
  else if (factors.timeOfDay === 'evening') { score += 10; reasons.push('Evening hours'); }

  // Weather
  if (factors.weather === 'fog') { score += 15; reasons.push('Foggy conditions'); }
  else if (factors.weather === 'rain') { score += 10; reasons.push('Rainy conditions'); }

  // Abandoned vehicle
  if (factors.abandonedVehicle) { score += 10; reasons.push('Abandoned vehicle detected'); }

  // Garbage overflow
  if (factors.garbageOverflow) { score += 5; reasons.push('Garbage overflow'); }

  return { score: Math.min(score, 100), reasons };
}

function getZonesWithScores() {
  return zones.map(z => {
    const { score, reasons } = calculateRisk(z.factors);
    return { ...z, score, reasons };
  });
}

function broadcast(data) {
  const msg = JSON.stringify(data);
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) client.send(msg);
  });
}

function checkAlerts(zonesWithScores) {
  zonesWithScores.forEach(z => {
    if (z.score >= 70) {
      const existing = alertLog.find(a => a.zoneId === z.id && !a.resolved);
      if (!existing) {
        const alert = {
          id: Date.now() + z.id,
          zoneId: z.id,
          zoneName: z.name,
          score: z.score,
          reasons: z.reasons,
          timestamp: new Date().toISOString(),
          resolved: false
        };
        alertLog.unshift(alert);
        if (alertLog.length > 50) alertLog = alertLog.slice(0, 50);
        broadcast({ type: 'NEW_ALERT', alert });
      }
    } else {
      // Auto-resolve if score drops below 70
      alertLog = alertLog.map(a => a.zoneId === z.id ? { ...a, resolved: true } : a);
    }
  });
}

// --- REST API ---
app.get('/api/zones', (req, res) => {
  res.json(getZonesWithScores());
});

app.patch('/api/zones/:id/factors', (req, res) => {
  const zone = zones.find(z => z.id === req.params.id);
  if (!zone) return res.status(404).json({ error: 'Zone not found' });
  Object.assign(zone.factors, req.body);
  const updated = getZonesWithScores();
  checkAlerts(updated);
  broadcast({ type: 'ZONES_UPDATE', zones: updated });
  res.json(updated.find(z => z.id === req.params.id));
});

app.get('/api/alerts', (req, res) => {
  res.json(alertLog.filter(a => !a.resolved));
});

app.post('/api/reports', (req, res) => {
  const { zoneId, type, description } = req.body;
  if (!zoneId || !type) return res.status(400).json({ error: 'zoneId and type required' });

  const report = {
    id: Date.now(),
    zoneId,
    type,
    description: description || '',
    timestamp: new Date().toISOString()
  };
  citizenReports.unshift(report);
  if (citizenReports.length > 200) citizenReports = citizenReports.slice(0, 200);

  // Apply report impact to zone factors
  const zone = zones.find(z => z.id === zoneId);
  if (zone) {
    if (type === 'broken_streetlight') zone.factors.streetlight = 0;
    if (type === 'abandoned_vehicle') zone.factors.abandonedVehicle = true;
    if (type === 'garbage_overflow') zone.factors.garbageOverflow = true;
    if (type === 'suspicious_object') zone.factors.noise = 'high';
  }

  const updated = getZonesWithScores();
  checkAlerts(updated);
  broadcast({ type: 'ZONES_UPDATE', zones: updated });
  broadcast({ type: 'NEW_REPORT', report });
  res.json(report);
});

app.get('/api/reports', (req, res) => {
  const today = new Date().toDateString();
  const todayReports = citizenReports.filter(r => new Date(r.timestamp).toDateString() === today);
  res.json({ all: citizenReports.slice(0, 20), todayCount: todayReports.length });
});

app.get('/api/stats', (req, res) => {
  const zonesWithScores = getZonesWithScores();
  const today = new Date().toDateString();
  const todayReports = citizenReports.filter(r => new Date(r.timestamp).toDateString() === today);
  const activeAlerts = alertLog.filter(a => !a.resolved);
  const safest = zonesWithScores.reduce((a, b) => a.score < b.score ? a : b);
  const highest = zonesWithScores.reduce((a, b) => a.score > b.score ? a : b);
  res.json({
    totalZones: zones.length,
    activeAlerts: activeAlerts.length,
    reportsToday: todayReports.length,
    safestZone: safest.name,
    highestRiskZone: highest.name,
    highestRiskScore: highest.score
  });
});

// WebSocket connection
wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.send(JSON.stringify({ type: 'ZONES_UPDATE', zones: getZonesWithScores() }));
  ws.on('close', () => console.log('Client disconnected'));
});

// Simulate live sensor fluctuations every 15s
setInterval(() => {
  const noiseOptions = ['low', 'medium', 'high'];
  zones.forEach(z => {
    // Small random fluctuation in noise
    if (Math.random() < 0.3) {
      const idx = Math.floor(Math.random() * noiseOptions.length);
      z.factors.noise = noiseOptions[idx];
    }
  });
  const updated = getZonesWithScores();
  checkAlerts(updated);
  broadcast({ type: 'ZONES_UPDATE', zones: updated });
}, 15000);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
