const express = require("express");
const XLSX = require("xlsx");
const fs = require("fs");
const cors = require("cors");
const https = require('https');

const app = express();
app.use(express.json());
app.use(cors());

const FILE = "registrations.xlsx";

// Google Script that currently holds registrations (read-only proxy)
const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwf04wXUqYDF05q6OFZME8Mrui5qa5MlixQLQ5vMoeuSFA792iFc7Av5k9-j46-cjH1/exec";

// CREATE FILE IF NOT EXISTS
if (!fs.existsSync(FILE)) {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet([]);
  XLSX.utils.book_append_sheet(wb, ws, "Registrations");
  XLSX.writeFile(wb, FILE);
}

// REGISTER ENDPOINT
app.post("/register", (req, res) => {
  const newEntry = {
    "LIT ID": req.body.litid,
    "Event": req.body.event,
    "Name": req.body.name,
    "College": req.body.college,
    "Email": req.body.email,
    "Phone": req.body.phone,
    "Time": new Date().toLocaleString()
  };

  const wb = XLSX.readFile(FILE);
  const ws = wb.Sheets["Registrations"];
  const data = XLSX.utils.sheet_to_json(ws);

  data.push(newEntry);

  wb.Sheets["Registrations"] = XLSX.utils.json_to_sheet(data);
  XLSX.writeFile(wb, FILE);

  res.json({ status: "success" });
});

// Proxy endpoint to fetch registrations from the Google Script server-side
// This avoids CORS issues when the client is served from file:// or other origins.
app.get('/proxy-registrations', (req, res) => {
  const email = req.query.email || '';
  const url = `${SCRIPT_URL}?email=${encodeURIComponent(email)}`;

  https.get(url, (gRes) => {
    let data = '';
    gRes.on('data', chunk => data += chunk);
    gRes.on('end', () => {
      try {
        const parsed = JSON.parse(data);
        res.json(parsed);
      } catch (err) {
        // If upstream didn't return JSON, forward raw
        res.send(data);
      }
    });
  }).on('error', (err) => {
    console.error('Proxy fetch error', err);
    res.status(502).json({ error: 'upstream_fetch_failed' });
  });
});

app.listen(3000, () =>
  console.log("✅ Backend running on http://localhost:3000")
);
