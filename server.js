const express = require("express");
const app = express();

app.use(express.json());

let todos = [
  { id: 1, text: "Einkaufen", erledigt: false },
  { id: 2, text: "Coden lernen", erledigt: false },
];

// GET — alle Todos holen
app.get("/todos", (req, res) => {
  res.json(todos);
});

// POST — neuen Todo erstellen
app.post("/todos", (req, res) => {
  const neuerTodo = {
    id: todos.length + 1,
    text: req.body.text,
    erledigt: false,
  };
  todos.push(neuerTodo);
  res.json(neuerTodo);
});

// DELETE — Todo löschen
app.delete("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter((todo) => todo.id !== id);
  res.json({ message: "Gelöscht!" });
});

app.listen(3000, () => {
  console.log("Server läuft auf Port 3000");
});
