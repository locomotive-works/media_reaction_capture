# Privacy Policy — Media Reaction Capture

_Last updated: 2026-09-27_

**English** · [日本語](#プライバシーポリシー)

Media Reaction Capture does not collect, transmit, sell, or share any personal data.

## What the extension stores

While a recording session is active, the extension saves the following **only in your browser** (`chrome.storage.local`):

- The comments you type
- The media timestamp at which each comment was captured
- The URL and title of the page where the comment was captured
- The session name and start time

This data never leaves your device. It is deleted from the browser when you end the session (after the Markdown file is downloaded) or discard it.

## What the extension does not do

- No analytics, tracking, or telemetry
- No network requests to any server
- No remote code
- No reading of page content other than finding the `<video>` / `<audio>` element to pause

## Permissions

- **storage**: saves the in-progress session locally.
- **Access to all sites** (content script): lets the Space shortcut work on any page that plays media. The script does nothing unless you have started a session.

## Contact

Please open an issue at <https://github.com/locomotive-works/media_reaction_capture/issues>.

---

# プライバシーポリシー

_最終更新日: 2026-09-27_

Media Reaction Capture は、個人データを収集・送信・販売・共有しません。

## 保存するデータ

記録セッション中に、次の情報を**お使いのブラウザ内（`chrome.storage.local`）にのみ**保存します。

- 入力したコメント
- コメントを記録したときのメディアのタイムスタンプ
- コメントを記録したページの URL とタイトル
- セッション名と開始時刻

これらのデータが端末の外に送られることはありません。セッションを終了して Markdown をダウンロードしたとき、またはセッションを破棄したときに、ブラウザから削除されます。

## 行わないこと

- アクセス解析・トラッキング・テレメトリ
- サーバーへの通信
- リモートコードの実行
- 一時停止する `<video>` / `<audio>` 要素を探す以外の、ページ内容の読み取り

## 権限

- **storage**: 記録中のセッションをブラウザ内に保存するため
- **すべてのサイトへのアクセス**（コンテンツスクリプト）: メディアを再生するどのページでも Space キーを使えるようにするため。セッションを開始していないときは何もしません。

## お問い合わせ

<https://github.com/locomotive-works/media_reaction_capture/issues> に Issue を作成してください。
