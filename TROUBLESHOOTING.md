# 🔧 Troubleshooting Guide

## Common Issues & Solutions

### 🗺️ Map Issues

#### Map not loading / blank gray area
**Problem**: Google Maps API key not configured or invalid

**Solutions**:
1. Check if you replaced `YOUR_GOOGLE_MAPS_API_KEY` in `client/src/components/MapView.jsx`
2. Verify API key is correct (no extra spaces)
3. Ensure "Maps JavaScript API" is enabled in Google Cloud Console
4. Check browser console for specific error messages
5. Verify API key has no restrictions blocking localhost

**Quick Fix**:
```javascript
// In MapView.jsx, line ~30
<LoadScript googleMapsApiKey="YOUR_ACTUAL_KEY_HERE">
```

#### Map loads but zones don't appear
**Problem**: Backend not running or zones data not loading

**Solutions**:
1. Check Terminal 1 - server should show "Server running on port 4000"
2. Open browser console, check for API errors
3. Visit http://localhost:4000/api/zones directly - should show JSON data
4. Restart backend server

### 🔌 Connection Issues

#### "WebSocket connection failed"
**Problem**: Backend server not running or port blocked

**Solutions**:
1. Ensure backend is running: `cd server && npm start`
2. Check if port 4000 is available: `netstat -ano | findstr :4000`
3. Check firewall settings
4. Try restarting both servers

#### Changes not updating in real-time
**Problem**: WebSocket disconnected

**Solutions**:
1. Check browser console for WebSocket errors
2. Refresh the page to reconnect
3. Restart backend server
4. Check if multiple instances of server are running

### 🖥️ Server Issues

#### "Port 4000 already in use"
**Problem**: Another process using port 4000

**Solutions**:
```bash
# Windows - Find and kill process
netstat -ano | findstr :4000
taskkill /PID <PID_NUMBER> /F

# Or change port in server/index.js
const PORT = process.env.PORT || 4001;  # Change to 4001

# And update client/src/App.jsx
const API_URL = 'http://localhost:4001/api';
const WS_URL = 'ws://localhost:4001';
```

#### "Cannot find module 'express'"
**Problem**: Dependencies not installed

**Solutions**:
```bash
cd server
npm install
```

### 💻 Client Issues

#### "Port 5173 already in use"
**Problem**: Another Vite instance running

**Solutions**:
```bash
# Kill the process or change port in vite.config.js
server: {
  port: 5174,  # Change port
  open: true
}
```

#### Blank white screen
**Problem**: JavaScript error or build issue

**Solutions**:
1. Check browser console for errors
2. Clear browser cache (Ctrl+Shift+Delete)
3. Delete `node_modules` and reinstall:
```bash
cd client
rm -rf node_modules
npm install
```

#### "Cannot find module '@react-google-maps/api'"
**Problem**: Dependencies not installed

**Solutions**:
```bash
cd client
npm install @react-google-maps/api axios
```

### 🎨 UI Issues

#### Styles not loading / ugly appearance
**Problem**: CSS files not imported

**Solutions**:
1. Check all CSS imports in component files
2. Clear browser cache
3. Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

#### Components overlapping or misaligned
**Problem**: Browser zoom or responsive issue

**Solutions**:
1. Reset browser zoom to 100%
2. Try different browser
3. Check browser console for CSS errors
4. Resize window to trigger responsive layout

### 📊 Data Issues

#### Risk scores not calculating
**Problem**: Backend calculation error

**Solutions**:
1. Check server terminal for errors
2. Verify zone data structure in `server/index.js`
3. Test API directly: http://localhost:4000/api/zones
4. Restart server

#### Alerts not appearing
**Problem**: Risk threshold not reached or alert logic issue

**Solutions**:
1. Ensure risk score is ≥ 70
2. Check Alert Panel is visible (scroll right panel)
3. Check browser console for errors
4. Verify WebSocket connection

#### Citizen reports not working
**Problem**: Form validation or API error

**Solutions**:
1. Ensure both zone and type are selected
2. Check browser console for errors
3. Verify backend is running
4. Check Network tab for failed requests

### 🌐 Browser Issues

#### Works in Chrome but not Firefox/Safari
**Problem**: Browser compatibility

**Solutions**:
1. Update browser to latest version
2. Check browser console for specific errors
3. Try disabling browser extensions
4. Use Chrome/Edge for demo (best compatibility)

#### Mobile view broken
**Problem**: Responsive CSS issue

**Solutions**:
1. This is a desktop-first demo
2. For mobile demo, use landscape orientation
3. Or present on desktop/laptop

### 🚀 Performance Issues

#### App is slow or laggy
**Problem**: Too many updates or memory leak

**Solutions**:
1. Refresh the page
2. Close other browser tabs
3. Restart both servers
4. Check for console errors
5. Reduce simulation frequency in `server/index.js` (line ~180)

#### Map is slow to load
**Problem**: Google Maps API or network

**Solutions**:
1. Check internet connection
2. Wait a few seconds for initial load
3. Refresh page
4. Check Google Maps API quota

### 📦 Installation Issues

#### npm install fails
**Problem**: Network or permission issue

**Solutions**:
```bash
# Clear npm cache
npm cache clean --force

# Try again
npm install

# Or use --legacy-peer-deps
npm install --legacy-peer-deps
```

#### "Permission denied" errors
**Problem**: File permissions

**Solutions**:
```bash
# Windows - Run terminal as Administrator
# Or change directory permissions
```

### 🔥 Emergency Fixes

#### Everything is broken, start fresh
```bash
# Stop all servers (Ctrl+C in both terminals)

# Backend
cd server
rm -rf node_modules
npm install
npm start

# Frontend (new terminal)
cd client
rm -rf node_modules
npm install
npm run dev
```

#### Demo in 5 minutes and it's not working
**Backup Plan**:
1. Take screenshots of working app beforehand
2. Record a video of the demo
3. Use screenshots to present concept
4. Explain technical architecture verbally
5. Show code structure instead

### 🐛 Debugging Tips

#### Check Backend Health
```bash
# Visit these URLs in browser:
http://localhost:4000/api/zones
http://localhost:4000/api/stats
http://localhost:4000/api/alerts

# Should return JSON data
```

#### Check Frontend Console
```javascript
// Open browser console (F12)
// Look for errors (red text)
// Check Network tab for failed requests
// Check WebSocket connection in Network > WS
```

#### Check Server Logs
```bash
# Server terminal should show:
Server running on port 4000
Client connected
# (when you open the app)
```

### 📞 Quick Diagnostic Checklist

Run through this list:
- [ ] Node.js installed? `node --version`
- [ ] npm installed? `npm --version`
- [ ] Backend dependencies? `cd server && ls node_modules`
- [ ] Frontend dependencies? `cd client && ls node_modules`
- [ ] Backend running? Check Terminal 1
- [ ] Frontend running? Check Terminal 2
- [ ] Google Maps API key set? Check MapView.jsx
- [ ] Browser console clear? Press F12
- [ ] Correct URLs? localhost:5173 for app
- [ ] Firewall blocking? Check settings

### 🎯 Pre-Demo Test

Run this 2 minutes before presenting:
1. ✅ Open http://localhost:5173
2. ✅ Map loads with zones
3. ✅ Click a zone - info appears
4. ✅ Select zone in simulation panel
5. ✅ Change a factor - score updates
6. ✅ Submit a report - success message
7. ✅ Check stats bar - numbers showing
8. ✅ Open in second browser tab - updates sync

If all ✅ pass → You're ready! 🚀

### 🆘 Last Resort

If nothing works:
1. Use the PRESENTATION.md to explain the concept
2. Show the code structure
3. Walk through the architecture
4. Explain the algorithm
5. Discuss the privacy benefits
6. Show the README documentation

**Remember**: Judges care about the IDEA and EXECUTION, not just the demo!

---

## 💡 Pro Tips

1. **Test before demo**: Run through entire flow 30 minutes before
2. **Have backup**: Screenshots, video, or slides
3. **Know your ports**: 4000 (backend), 5173 (frontend)
4. **Check API key**: Most common issue
5. **Restart fixes 80%**: When in doubt, restart both servers
6. **Browser console**: Your best debugging friend
7. **Stay calm**: Technical issues happen, explain the concept instead

---

**Need more help? Check the code comments in each file!**
