const express = require("express");
const app = express();

const todos = [
  { id: 1, text: "Einkaufen", erledigt: false },
  { id: 2, text: "Coden lernen", erledigt: false },
  { id: 3, text: "Schlafen", erledigt: true },
];

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.listen(3000, () => {
  console.log("Server läuft auf Port 3000");
});
