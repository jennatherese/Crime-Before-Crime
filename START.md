# 🚀 Quick Start Guide

## Step 1: Get Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable "Maps JavaScript API"
4. Create credentials (API Key)
5. Copy your API key

## Step 2: Configure API Key

Open `client/src/components/MapView.jsx` and replace:
```javascript
<LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
```

With your actual key:
```javascript
<LoadScript googleMapsApiKey="AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX">
```

## Step 3: Start Backend Server

Open Terminal 1:
```bash
cd server
npm start
```

You should see: `Server running on port 4000`

## Step 4: Start Frontend

Open Terminal 2:
```bash
cd client
npm run dev
```

You should see: `Local: http://localhost:5173/`

## Step 5: Open Browser

Navigate to: `http://localhost:5173`

## 🎮 Demo Flow

1. **View Map** - See 8 Madurai zones with risk colors
2. **Click Zone** - View environmental factors
3. **Simulation Panel** - Select "Goripalayam" or "Vishalnagar" (pre-configured high risk)
4. **Break Streetlight** - Watch risk score jump
5. **Change to Night** - See risk increase
6. **Add Rain** - Risk goes higher
7. **Submit Report** - Use Citizen Report panel
8. **Watch Alerts** - When score hits 70+, alert appears

## 🎯 Presentation Script

"This is CRIME BEFORE CRIME - we predict crime by monitoring the ENVIRONMENT, not people.

Notice the banner: Zero Human Surveillance.

Here's Madurai with 8 zones. Green is safe, red is high risk.

Let me click this zone... see? It shows WHY it's risky - broken streetlight, high noise.

Now watch this simulation panel. I'll break a streetlight... BOOM! Risk jumps instantly.

Change to night... risk increases more.

Add rain... even higher.

When it crosses 70, an alert fires: 'Send Patrol to this LOCATION' - no person mentioned.

Citizens can report issues anonymously - broken lights, abandoned vehicles.

The stats show everything live - safest zone, highest risk, reports today.

We monitor PLACES, not FACES. Environment-only crime prediction."

## ⚠️ Troubleshooting

**Map not loading?**
- Check API key is correct
- Ensure Maps JavaScript API is enabled in Google Cloud
- Check browser console for errors

**WebSocket not connecting?**
- Ensure backend is running on port 4000
- Check firewall settings

**Zones not updating?**
- Refresh the page
- Check both terminals for errors

## 🎨 Customization

**Add more zones:**
Edit `server/index.js` - add to `zones` array with lat/lng

**Change risk weights:**
Edit `calculateRisk()` function in `server/index.js`

**Modify colors:**
Edit CSS files in `client/src/components/`

---

**Ready to present! Good luck with your hackathon! 🚀**
