import "dotenv/config";
import express from "express";
import { middleware } from "@line/bot-sdk";
import pino from "pino";

const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  transport: {
    target: "pino-pretty",
  },
});

const lineConfig = { channelSecret: process.env.LINE_CHANNEL_SECRET };

const app = express();

// LINE webhook 以外に JSON パーサーを適用
app.use((req, res, next) => {
  if (req.path === "/webhooks/line") return next();
  express.json()(req, res, next);
});

// ヘルスチェック
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// LINE Webhook（署名検証付き）
app.post("/webhooks/line", middleware(lineConfig), (req, res) => {
  logger.info({ events: req.body.events }, "LINE webhook received");
  res.status(200).json({ status: "ok" });
});

// エラーハンドリングミドルウェア（Express は引数4つで認識するため _next 必須）
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {

  // LINE署名エラーは明示的に401にする
  if (
    err?.name === "SignatureValidationFailed" ||
    err?.type === "SignatureValidationFailed" ||
    err?.message?.includes("no signature")
  ) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  logger.error({ err }, "Unhandled error");
  return res.status(500).json({ error: "Internal Server Error" });
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  logger.info(`Server running: http://localhost:${port}`);
});
