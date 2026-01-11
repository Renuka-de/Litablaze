const express = require("express");
const XLSX = require("xlsx");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const FILE = "registrations.xlsx";

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

app.listen(3000, () =>
  console.log("✅ Backend running on http://localhost:3000")
);
