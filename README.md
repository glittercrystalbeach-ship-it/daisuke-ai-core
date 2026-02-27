# daisuke-ai-core

共通APIテンプレート

## セットアップ

```bash
npm install
cp .env.example .env
```

## 起動

```bash
# 開発（ファイル変更で自動リロード）
npm run dev

# 本番
npm start
```

## 環境変数

| 変数名 | 説明 | デフォルト |
|--------|------|-----------|
| `PORT` | サーバーポート | `3000` |
| `LOG_LEVEL` | ログレベル（debug/info/warn/error） | `info` |
| `LINE_CHANNEL_SECRET` | LINEチャネルシークレット | - |
| `LINE_CHANNEL_ACCESS_TOKEN` | LINEチャネルアクセストークン | - |

## エンドポイント

| メソッド | パス | 説明 |
|---------|------|------|
| GET | `/health` | ヘルスチェック |
| POST | `/webhooks/line` | LINE Webhook受信（署名検証付き） |

## 署名検証

`/webhooks/line` は `@line/bot-sdk` の middleware で署名を検証します。
`LINE_CHANNEL_SECRET` が未設定、または署名が不正な場合は `401` を返します。

## スクリプト

```bash
npm run lint       # ESLintチェック
npm run lint:fix   # ESLint自動修正
npm run format     # Prettier整形
```
