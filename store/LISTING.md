# Chrome Web Store 掲載情報

Developer Dashboard（https://chrome.google.com/webstore/devconsole）の各フォームに貼り付ける内容です。

## パッケージ

```sh
./scripts/package.sh   # → dist/media_reaction_capture-<version>.zip
```

## ストアの掲載情報（Store listing）

| 項目 | 内容 |
|---|---|
| 名前 / 概要 | `manifest.json` と `_locales` から自動で入ります |
| カテゴリ | Productivity（仕事効率化） |
| 言語 | English（デフォルト）, 日本語 |
| ストアアイコン | パッケージ内の `icons/icon128.png` |
| スクリーンショット（1280×800） | `screenshot-1-<lang>.png` 〜 `screenshot-3-<lang>.png` |
| プロモーションタイル（小, 440×280） | `promo-small-<lang>.png` |
| ホームページ URL | https://github.com/locomotive-works/media_reaction_capture |
| サポート URL | https://github.com/locomotive-works/media_reaction_capture/issues |

### 詳しい説明 — English

```
Capture your reactions while you watch or listen — without breaking your flow.

Start a recording session, then press Space on any page with video or audio. The media pauses and a small comment box appears with the current timestamp. Type your thought, press Enter, and playback resumes. When you're done, end the session to download everything as a tidy Markdown file.

FEATURES
• Space to pause and comment — works on YouTube and any page with HTML5 video or audio
• Every comment is saved with its timestamp, page title, and URL
• YouTube timestamps become links that jump straight back to the moment
• Sessions can span multiple videos; the export groups comments by page
• Space behaves normally when no session is active or when you're typing in a text field
• English and Japanese UI

KEYBOARD
• Space — pause and open the comment box
• Enter — save and resume
• Shift+Enter — new line
• Esc — cancel

PRIVACY
Everything stays in your browser. No accounts, no analytics, no network requests. Data is cleared when you end or discard a session.

Open source (MIT): https://github.com/locomotive-works/media_reaction_capture
```

### 詳しい説明 — 日本語

```
見ながら・聴きながら、その場のリアクションを流れを止めずに記録できます。

記録セッションを開始して、動画や音声のあるページで Space を押すだけ。メディアが一時停止し、現在のタイムスタンプ付きのコメント欄が表示されます。感想を入力して Enter を押すと再生が再開。セッションを終了すると、すべての記録を Markdown ファイルとしてダウンロードできます。

主な機能
• Space で一時停止してコメント — YouTube はもちろん、HTML5 の動画・音声があるページならどこでも
• コメントはタイムスタンプ・ページタイトル・URL と一緒に保存
• YouTube のタイムスタンプは、その瞬間へ戻れるリンクに
• 1つのセッションで複数の動画を見ても OK。書き出し時はページごとに整理
• セッション外や入力欄では、Space はふだんどおりに動作
• 日本語・英語に対応

キー操作
• Space — 一時停止してコメント欄を開く
• Enter — 保存して再開
• Shift+Enter — 改行
• Esc — キャンセル

プライバシー
データはすべてブラウザ内に保存されます。アカウント登録・アクセス解析・外部通信は一切ありません。セッションを終了または破棄すると削除されます。

オープンソース（MIT）: https://github.com/locomotive-works/media_reaction_capture
```

## プライバシーへの取り組み（Privacy practices）

### 単一用途（Single purpose）

```
Lets users pause the media on a page with the Space key during a recording session, attach a timestamped comment, and export the session's comments as a Markdown file.
```

### 権限の使用理由（Permission justification）

**storage**
```
Stores the in-progress recording session (comments, media timestamps, page URL and title) locally so it survives page navigation until the user ends the session and downloads it. Nothing is transmitted.
```

**Host permission — content script on `<all_urls>`**
```
The content script listens for the Space key so users can pause and comment on media on any site that plays HTML5 video or audio (YouTube, course platforms, podcasts, etc.). It does nothing unless the user has started a session, and it only reads the page's <video>/<audio> elements, URL and title.
```

### リモートコード

`いいえ、リモートコードは使用していません`（No, I am not using remote code）

### データの使用

- 収集するユーザーデータ: **どれにもチェックしない**（データは端末外に送信されないため）
- 3つの開示事項（第三者への販売・譲渡をしない／単一用途に無関係な目的で使用・譲渡しない／信用力の判断や融資目的で使用・譲渡しない）: **すべてにチェック**

### プライバシーポリシー URL

```
https://github.com/locomotive-works/media_reaction_capture/blob/main/PRIVACY.md
```
