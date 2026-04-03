# 親子の個性診断アプリ

シュタイナー4気質・MI理論・ユング理論を組み合わせた親子信頼関係診断アプリです。

## 技術スタック

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Vercel** (デプロイ)

## セットアップ

```bash
# 1. 依存関係インストール
npm install

# 2. 開発サーバー起動
npm run dev
```

ブラウザで `http://localhost:3000` を開く。

## GitHub → Vercel デプロイ手順

### 1. GitHubにプッシュ

```bash
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/shindan-app.git
git push -u origin main
```

### 2. Vercelでデプロイ

1. [vercel.com](https://vercel.com) にログイン
2. "New Project" → GitHubリポジトリを選択
3. Framework Preset: **Next.js** （自動検出される）
4. "Deploy" をクリック

環境変数は不要。そのままデプロイできます。

## ディレクトリ構成

```
shindan-app/
├── app/
│   ├── layout.tsx        # ルートレイアウト
│   ├── page.tsx          # トップ画面
│   ├── globals.css       # グローバルスタイル
│   ├── quiz/
│   │   └── page.tsx      # 診断画面（35問）
│   └── result/
│       └── page.tsx      # 結果表示画面
├── lib/
│   ├── types.ts          # TypeScript型定義
│   ├── questions.ts      # 全35問の設問データ
│   └── scoring.ts        # スコアリング＋アドバイスデータ
└── ...
```

## 診断の仕組み

| セクション | 問数 | フレームワーク |
|---|---|---|
| 子ども診断 | 20問 | シュタイナー8問 + MI8問 + ユング4問 |
| 親の診断 | 15問 | シュタイナー6問 + MI5問 + ユング4問 |

### スコアリング
- 各問：0〜3点（4択）
- シュタイナー：4気質のうち最高得点→主気質、2位→副気質
- MI理論：8知能のランキング上位3つを提示
- ユング：外向スコアvs内向スコアで判定

### 結果表示
- 子どものプロフィールカード（気質・知能・内外向）
- 親のプロフィールカード
- 親子の組み合わせアドバイス（16通り）
- 子どもの学び方・得意なこと
- 親自身のトリセツ（イライラ対策・セルフケア）
