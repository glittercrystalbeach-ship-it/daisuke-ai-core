import "dotenv/config";
import express from "express";
import pino from "pino";

const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  transport: {
    target: "pino-pretty",
  },
});

const app = express();
app.use(express.json());

// ヘルスチェック
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// LINE Webhook
app.post("/webhooks/line", (req, res) => {
  logger.info({ body: req.body }, "LINE webhook received");
  res.status(200).json({ status: "ok" });
});

// エラーハンドリングミドルウェア（Express は引数4つで認識するため _next 必須）
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  logger.error({ err }, "Unhandled error");
  res.status(500).json({ error: "Internal Server Error" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  logger.info(`Server running: http://localhost:${port}`);
});
