const express = require("express");
const Database = require("better-sqlite3");
const cors = require("cors");
const auth = require("./auth");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/auth", auth);

// Datenbank erstellen/öffnen
const db = new Database("todos.db");

// Tabelle erstellen wenn nicht existiert
db.exec(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    erledigt INTEGER DEFAULT 0
  )
`);

// GET — alle Todos holen
app.get("/todos", (req, res) => {
  const todos = db.prepare("SELECT * FROM todos").all();
  res.json(todos);
});

// POST — neuen Todo erstellen
app.post("/todos", (req, res) => {
  const stmt = db.prepare("INSERT INTO todos (text) VALUES (?)");
  const result = stmt.run(req.body.text);
  res.json({ id: result.lastInsertRowid, text: req.body.text, erledigt: 0 });
});

// DELETE — Todo löschen
app.delete("/todos/:id", (req, res) => {
  db.prepare("DELETE FROM todos WHERE id = ?").run(req.params.id);
  res.json({ message: "Gelöscht!" });
});

// PUT — Todo togglen
app.put("/todos/:id", (req, res) => {
  const todo = db
    .prepare("SELECT * FROM todos WHERE id = ?")
    .get(req.params.id);
  const neuerWert = todo.erledigt === 0 ? 1 : 0;
  db.prepare("UPDATE todos SET erledigt = ? WHERE id = ?").run(
    neuerWert,
    req.params.id,
  );
  res.json({ ...todo, erledigt: neuerWert });
});

app.listen(3000, () => {
  console.log("Server läuft auf Port 3000");
});
