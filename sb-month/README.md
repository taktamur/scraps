# SB Month

## 概要

Cloudflare workers で、Cosense で使う月次ページを生成する実験

## ローカルでの動かし方

- `yarn dev` ローカル起動
  - wrangler が起動して、b 押下でブラウザが開く

## Mac から Cloudflare への push

- `wrangler login` でログイン
- `yarn deploy`で push
- https://dash.cloudflare.com/ の cloudflare のコンソールで確認
- https://cosense-month-page.taktamur.workers.dev/ に push される

## github actions で Cloudflare への push

- .github/workflows/sb-month-deploy.yaml でルール定義している
