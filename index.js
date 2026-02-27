import express from "express";

const app = express();
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("OK");
});

app.post("/webhook", (req, res) => {
  console.log("=== LINE webhook received ===");
  console.log(JSON.stringify(req.body, null, 2));
  res.status(200).send("OK");
});

app.listen(3000, () => {
  console.log("Server running: http://localhost:3000");
});
