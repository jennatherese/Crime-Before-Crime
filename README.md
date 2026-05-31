CRIME BEFORE CRIME
Zero Human Surveillance — Total Public Safety

"We don't watch people. We watch the world they live in."


PROBLEM

Every crime prediction system watches humans — facial recognition, behavioral profiling, mass data collection. This violates privacy, enables racial profiling, and erodes civil liberties.

We asked a different question.
What if we predicted crime by watching the environment instead of people?


SOLUTION

Crime Before Crime is a real-time environmental crime risk prediction system. It monitors physical and environmental factors across 8 zones in Madurai, Tamil Nadu — and predicts crime risk without tracking a single human.

- No facial recognition
- No human tracking
- No personal data collection
- Real-time environmental monitoring
- Privacy-first architecture


HOW IT WORKS

Real data sources feed into a risk calculation engine:

1. Live weather data from OpenWeatherMap API
2. Time-of-day logic from real system clock
3. Anonymous citizen reports from form submissions

These three sources calculate a risk score from 0 to 100 for each zone.
When any zone crosses 70 — patrol is automatically dispatched.
No human decision needed. Environment triggered it.


RISK SCORE FORMULA

1. Rain                          +20 points
2. Thunderstorm                  +35 points
3. Fog or Mist                   +25 points
4. Late Night 11PM to 3AM        +35 points
5. Evening 8PM to 11PM           +20 points
6. Citizen Report - Streetlight  +25 points
7. Citizen Report - Suspicious   +30 points
8. Citizen Report - Vehicle      +15 points
9. Citizen Report - Noise        +20 points
10. Time Decay no recent report  -5 points per 30 minutes

Maximum score: 100


GLOBAL THREAT LEVELS

1. 0 to 25   - MINIMAL
2. 26 to 50  - MODERATE
3. 51 to 75  - HIGH
4. 76 to 100 - CRITICAL


PAGES

1. Dashboard     - Live map, zone risk overview, 6-hour prediction chart
2. Environment   - Real-time factor breakdown for all 8 zones
3. Threats       - Live alert log, pattern analysis, threat timeline
4. Patrol        - Auto dispatch system, unit tracking, dispatch log
5. Community     - Anonymous hazard reporting, impact tracker


TECH STACK

1. React.js          - Frontend framework
2. React Router      - Multi-page navigation
3. Leaflet.js        - Interactive map, no API key needed
4. Chart.js          - Crime prediction graph
5. OpenWeatherMap    - Real-time Madurai weather API
6. localStorage      - Anonymous report persistence


GETTING STARTED

1. Clone the repository
   git clone https://github.com/yourusername/crime-before-crime

2. Install dependencies
   cd crime-before-crime
   npm install

3. Add your API key
   Open src/config.js
   Replace YOUR_API_KEY_HERE with your OpenWeatherMap API key

4. Run the app
   npm start

Get a free API key at openweathermap.org


PRIVACY ARCHITECTURE

What we never collect:
1. No faces or biometric data
2. No personal identities
3. No phone numbers or emails
4. No individual location tracking
5. No behavioral profiling

What we monitor:
1. Weather conditions via live API
2. Time-based environmental risk patterns
3. Anonymous citizen hazard reports
4. Zone-level crowd density patterns


WHY THIS WORKS

Research in criminology shows crime correlates strongly with environmental conditions. This is known as Crime Prevention Through Environmental Design or CPTED.

1. Broken streetlights increase crime by 67 percent in that zone
2. Poor weather reduces visibility and increases vulnerability
3. Late night hours reduce public presence and increase risk
4. Abandoned vehicles signal neglected and unsafe zones

Our system quantifies these proven factors using real data in real time.


TRADITIONAL SURVEILLANCE VS CRIME BEFORE CRIME

Traditional approach:
1. Watch people 24 hours a day
2. Use facial recognition
3. Build behavioral profiles
4. Collect mass personal data
5. Risk of racial profiling

Crime Before Crime:
1. Watch the environment 24 hours a day
2. Use weather API
3. Use time-based patterns
4. Collect zero personal data
5. Zero profiling possible


FUTURE SCOPE

1. Integration with real IoT streetlight sensors
2. Smart city infrastructure data feeds
3. Expansion to more cities across India
4. Mobile app for citizen reporting
5. Government API integration for faster dispatch
6. Machine learning model on historical crime data


ZONES MONITORED

1. Meenakshi Amman Temple
2. Madurai Railway Station
3. Mattuthavani Bus Stand
4. Anna Nagar
5. Goripalayam
6. Tallakulam
7. KK Nagar
8. Vishalnagar


Built in 24 hours for the Mass Surveillance vs Public Safety Hackathon.

"Every smart city starts as software. We built the software. The sensors come next."
