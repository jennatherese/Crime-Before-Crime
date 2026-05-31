# ⚡ Quick Reference Card

## 🚀 Start Commands (Copy-Paste Ready)

### Terminal 1 - Backend
```bash
cd crime-before-crime/server
npm start
```
**Expected output**: `Server running on port 4000`

### Terminal 2 - Frontend
```bash
cd crime-before-crime/client
npm run dev
```
**Expected output**: `Local: http://localhost:5173/`

### Browser
```
http://localhost:5173
```

---

## 🔑 Critical Setup Step

**BEFORE RUNNING**: Set Google Maps API Key

**File**: `client/src/components/MapView.jsx`

**Line 30**: Replace `YOUR_GOOGLE_MAPS_API_KEY` with your actual key

```javascript
<LoadScript googleMapsApiKey="AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX">
```

**Get key**: https://console.cloud.google.com/ → APIs & Services → Credentials

---

## 🎯 Demo Flow (5 minutes)

### 1. Show Map (30 sec)
- Point to 8 Madurai zones
- Click green zone → "Safe"
- Click red zone → "High risk - see why"

### 2. Simulation (2 min)
- Select "Anna Nagar"
- Break streetlight → +25 points
- Change to night → +20 points
- Add rain → +10 points
- Add abandoned vehicle → +10 points
- **Total: ~65-70 → Alert triggers!**

### 3. Alert (30 sec)
- Show alert panel
- Read: "HIGH RISK - Send Patrol"
- Point out: Location + Environment only

### 4. Report (1 min)
- Select any zone
- Choose "Broken Streetlight"
- Submit
- Watch score update

### 5. Stats (30 sec)
- Point to top bar
- "8 zones, X alerts, Y reports"
- "Safest: [name], Highest: [name]"

### 6. Close (30 sec)
- "We monitor PLACES, not FACES"
- "Zero human surveillance"
- "Environment-only crime prediction"

---

## 📊 Key Numbers

| Metric | Value |
|--------|-------|
| Zones | 8 (Madurai landmarks) |
| Risk Factors | 7 environmental |
| Risk Scale | 0-100 |
| Alert Threshold | 70 |
| Update Speed | Real-time (<100ms) |
| Privacy Violations | 0 |

---

## 🎨 Color Code

| Color | Risk Level | Score Range |
|-------|------------|-------------|
| 🟢 Green | Safe | 0-39 |
| 🟡 Yellow | Caution | 40-69 |
| 🔴 Red | High Risk | 70-100 |

---

## 🗺️ Madurai Zones

| # | Name | Initial Risk |
|---|------|--------------|
| 1 | Meenakshi Amman Temple | Low |
| 2 | Madurai Railway Station | Low |
| 3 | Mattuthavani Bus Stand | Low |
| 4 | Anna Nagar | Low ⭐ |
| 5 | Goripalayam | Medium-High |
| 6 | Tallakulam | Low |
| 7 | KK Nagar | Low |
| 8 | Vishalnagar | High ⭐ |

⭐ = Best for demo (Anna Nagar starts safe, Vishalnagar starts risky)

---

## ⚙️ Risk Factors & Weights

| Factor | Options | Weight |
|--------|---------|--------|
| Streetlight | Working/Broken | 0/+25 |
| Noise | Low/Med/High | 0/+10/+20 |
| Crowd | Low/Med/High | 0/+7/+15 |
| Time | Day/Eve/Night | 0/+10/+20 |
| Weather | Clear/Rain/Fog | 0/+10/+15 |
| Vehicle | No/Yes | 0/+10 |
| Garbage | No/Yes | 0/+5 |

**Max Score**: 100

---

## 🔌 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18 + Vite |
| Backend | Node.js + Express |
| Real-time | WebSocket (ws) |
| Maps | Google Maps API |
| Styling | Custom CSS |
| State | React Hooks |

---

## 📡 API Quick Reference

```bash
# Get all zones
GET http://localhost:4000/api/zones

# Update zone factors
PATCH http://localhost:4000/api/zones/zone1/factors
Body: { "streetlight": 0 }

# Get alerts
GET http://localhost:4000/api/alerts

# Submit report
POST http://localhost:4000/api/reports
Body: { "zoneId": "zone1", "type": "broken_streetlight" }

# Get stats
GET http://localhost:4000/api/stats
```

---

## 🐛 Quick Fixes

| Problem | Solution |
|---------|----------|
| Map blank | Set API key in MapView.jsx |
| Port in use | Kill process or change port |
| Not updating | Refresh page, check WebSocket |
| Styles broken | Clear cache, hard refresh |
| Server error | Restart: Ctrl+C then npm start |

---

## 💬 Key Talking Points

1. **Privacy First**: "Zero facial recognition, zero people tracking"
2. **Environment Only**: "We monitor places, not faces"
3. **Real-time**: "Watch risk scores update instantly"
4. **Practical**: "Real Madurai locations, real factors"
5. **Scalable**: "Easy to add more cities"
6. **Anonymous**: "Citizen reports are completely anonymous"
7. **Transparent**: "Algorithm is open, explainable"

---

## 🎤 One-Liner Pitches

**30 seconds**:
"CRIME BEFORE CRIME predicts crime hotspots by monitoring environmental factors like broken streetlights and weather - not people. Zero surveillance, maximum safety."

**10 seconds**:
"Crime prediction without surveillance. We monitor places, not faces."

**5 seconds**:
"Environment-based crime prediction. Zero human tracking."

---

## ✅ Pre-Demo Checklist

- [ ] Both servers running
- [ ] API key configured
- [ ] Browser open to app
- [ ] Map loads with zones
- [ ] Tested simulation panel
- [ ] Tested citizen report
- [ ] Alerts working
- [ ] Stats showing
- [ ] Presentation script ready
- [ ] Backup plan prepared

---

## 🆘 Emergency Contacts

**Files to check**:
- Setup: `START.md`
- Full docs: `README.md`
- Presentation: `PRESENTATION.md`
- Troubleshooting: `TROUBLESHOOTING.md`
- Summary: `PROJECT_SUMMARY.md`

**Key files to edit**:
- API Key: `client/src/components/MapView.jsx` (line 30)
- Server Port: `server/index.js` (line 180)
- Client Port: `client/vite.config.js` (line 6)

---

## 🏆 Winning Points

1. ✅ **Complete working demo** (not just slides)
2. ✅ **Real locations** (Madurai, Tamil Nadu)
3. ✅ **Privacy-first** (zero human surveillance)
4. ✅ **Real-time** (WebSocket updates)
5. ✅ **Practical** (solves real problem)
6. ✅ **Scalable** (easy to expand)
7. ✅ **Polished UI** (professional design)
8. ✅ **Open algorithm** (transparent, explainable)

---

## 📱 Social Media Blurb

"Just built CRIME BEFORE CRIME for [hackathon name]! 🔍

Predicts crime by monitoring ENVIRONMENT, not people.
- Zero facial recognition ✅
- Zero human tracking ✅
- Real-time risk maps 🗺️
- Anonymous reporting 📢

We monitor PLACES, not FACES. Privacy-first public safety! 🚀

#hackathon #privacy #publicsafety #tech4good"

---

## 🎯 Judge Q&A Prep

**Q: How accurate is this?**
A: "This demo uses simulated data. In production, we'd integrate real IoT sensors for streetlights, noise meters, weather APIs, and city infrastructure data."

**Q: What about false positives?**
A: "Risk scores are adjustable thresholds. Authorities use this as one tool, not the only tool. Human judgment remains essential."

**Q: Cost to implement?**
A: "Much cheaper than camera surveillance. Uses existing city infrastructure sensors plus low-cost IoT devices. No expensive facial recognition systems."

**Q: Privacy concerns?**
A: "That's the point! We deliberately avoid any personal data. No cameras, no faces, no tracking. Just environmental sensors."

**Q: Can criminals game the system?**
A: "They'd need to manipulate physical environment (fix streetlights, reduce noise). That actually improves safety! Plus, patterns over time reveal anomalies."

**Q: What's next?**
A: "Machine learning for pattern detection, historical analysis, mobile app, multi-city deployment, and integration with city infrastructure."

---

## 🎬 Final Words

**Before you present**:
- Take a deep breath
- You built something amazing
- The concept is solid
- The demo works
- You've got this! 💪

**Remember**:
- Speak clearly
- Make eye contact
- Show enthusiasm
- Handle tech issues calmly
- Focus on the IDEA

**You're not just presenting code.**
**You're presenting a SOLUTION to a real problem.**

---

# 🚀 GO WIN THAT HACKATHON! 🏆
