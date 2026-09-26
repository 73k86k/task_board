# CLAUDE.md

このファイルは、このリポジトリで作業する Claude Code (claude.ai/code) 向けのガイドです。

## プロジェクト概要

**task_board** — タスクを管理するためのタスクボードアプリケーション。

## デプロイ先

https://73k86k.github.io/task_board/

- GitHub Pages で公開している。`main` へのプッシュで `.github/workflows/deploy.yml` が lint → build → Pages へのデプロイを自動実行する。
- 本番ビルドのベースパスは `/task_board/`（`vite.config.js`）。リポジトリ名を変えた場合はここも変更すること。

## 技術スタック

| 分類 | 使用技術 |
| --- | --- |
| 言語 | JavaScript（ES Modules）/ JSX（TypeScript は未使用） |
| UI ライブラリ | React 19（関数コンポーネント + Hooks） |
| ビルドツール | Vite 8（`@vitejs/plugin-react`） |
| Lint | oxlint（設定: `.oxlintrc.json`） |
| スタイル | 素の CSS（`src/index.css` にグローバル、`src/App.css` にコンポーネント用） |
| 状態管理 | React の `useState`（外部ライブラリなし） |
| データ保存 | localStorage（キー: `task_board.tasks`）。リロード後もタスクを保持する |
| CI / ホスティング | GitHub Actions + GitHub Pages |
| 実行環境 | Node.js 24 |

## 開発環境

### コマンド

```bash
npm install      # 依存パッケージのインストール
npm run dev      # 開発サーバー起動
npm run build    # 本番ビルド（dist/ に出力）
npm run lint     # Lint
```

### ディレクトリ構成

- `src/App.jsx` — タスク一覧の state と追加・完了切替・削除のロジック
- `src/components/TaskForm.jsx` — タスク追加用の入力フォーム
- `src/components/TaskItem.jsx` — タスク1件の表示（チェックボックス・削除ボタン）
- `src/App.css` / `src/index.css` — スタイル

## コンポーネントの命名規約

### ファイル・コンポーネント名

- コンポーネントは **PascalCase** で命名し、ファイル名もコンポーネント名と一致させる（例: `TaskItem` → `TaskItem.jsx`）。
- 拡張子は `.jsx`。1ファイルに1コンポーネントとする。
- ルートの `App.jsx` 以外のコンポーネントは `src/components/` に置く。
- 名前は「対象 + 役割」の形にする（例: `TaskForm`、`TaskItem`、今後なら `TaskList`、`TaskFilter`）。

### 定義の書き方

- `function ComponentName({ prop1, prop2 }) { ... }` の関数宣言で定義し、props は引数で分割代入する。
- ファイル末尾で `export default ComponentName` する。
- import 時は拡張子まで書く（例: `import TaskItem from './components/TaskItem.jsx'`）。

### props・関数名

- 親から渡すイベント用の props は **`on` + 動詞**（例: `onAdd`、`onToggle`、`onDelete`）。
- コンポーネント内のイベントハンドラは **`handle` + イベント**（例: `handleSubmit`）。
- state を更新する関数は **動詞 + 対象**（例: `addTask`、`toggleTask`、`deleteTask`）。
- 真偽値のフィールドは形容詞・過去分詞にする（例: `completed`）。

### CSS クラス名

- **BEM 風**の `block__element--modifier` 形式にする。
- block はコンポーネント名を kebab-case にしたもの（例: `TaskItem` → `task-item`）。ただし `App` の外枠は `board` とする。
- 例: `task-item`、`task-item__title`、`task-item--completed`、`task-form__input`

## 開発ルール

- 既存コードのスタイル・命名規則・ディレクトリ構成に合わせて実装する。
- 変更は小さく保ち、1つの変更には1つの目的だけを持たせる。
- テストがある場合は、コミット前に必ず実行して通ることを確認する。

## Git 運用ルール

### コード変更のたびに GitHub へプッシュする

コードを変更したら、**その都度コミットして GitHub へプッシュすること。** 変更をローカルに溜め込まない。

```bash
git add <変更したファイル>
git commit -m "<変更内容の要約>"
git push
```

- 1つの作業単位（機能追加・バグ修正・リファクタリングなど）が終わるごとにコミット＆プッシュする。
- プッシュが失敗した場合（リモートが先に進んでいる等）は、`git pull --rebase` で取り込んでから再度プッシュする。コンフリクトが発生した場合は、勝手に解決せずユーザーに報告する。
- `git push --force` や履歴の書き換えは、ユーザーの明示的な指示がない限り行わない。

### コミットメッセージ

- 日本語または英語で、何を・なぜ変更したかを簡潔に書く。
- 1行目は要約（50文字程度まで）、必要に応じて空行の後に詳細を書く。
- 例: `タスクの並び替え機能を追加`、`Fix: 完了タスクが一覧に残る不具合を修正`

### コミットしないもの

- `.env` などの秘密情報・認証情報
- `node_modules/` などの依存パッケージやビルド成果物
- これらは `.gitignore` に記載しておくこと。
