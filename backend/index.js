// backend/index.js
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

app.post("/message", (req, res) => {
  const { message } = req.body;
  res.json({ reply: `Server says: "${message}"` });
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
