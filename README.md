# Media Reaction Capture

記録セッション中に **Space** を押すと、再生中の動画・音声を一時停止して、タイムスタンプ付きのコメントを記録できる Chrome 拡張機能です。セッションを終えると、記録を Markdown ファイルとしてダウンロードできます。

A Chrome extension: during a recording session, press **Space** to pause the playing media and capture a timestamped comment. End the session to download everything as Markdown.

## 使い方

1. ツールバーのアイコンをクリックし、（任意で）セッション名を入れて **記録セッションを開始** を押す
2. 動画や音声のあるページで **Space** を押す → メディアが一時停止し、コメント欄が表示される
   - **Enter**: 保存して再生を再開
   - **Shift+Enter**: 改行
   - **Esc**: キャンセル（記録しない）
3. ポップアップの **終了して Markdown をダウンロード** を押すと、`.md` ファイルがダウンロードフォルダに保存される

セッション中でなければ、Space はふだんどおり動きます。入力欄にフォーカスがあるときも、Space は普通の文字として入力されます。

## 出力例

```markdown
# 映画リアクション

- 開始: 2026/9/27 13:19:05
- 終了: 2026/9/27 13:45:10
- 記録数: 2

## [動画のタイトル - YouTube](https://www.youtube.com/watch?v=xxxx)

- [**03:12**](https://www.youtube.com/watch?v=xxxx&t=192s) ここ最高！
- [**12:48**](https://www.youtube.com/watch?v=xxxx&t=768s) 伏線回収きた
```

YouTube ではタイムスタンプがその瞬間へのリンクになります。セッション中に複数のページを見た場合は、ページごとに見出しが分かれます。

## インストール（開発版）

1. このリポジトリをクローンする
2. `chrome://extensions` を開き、右上の **デベロッパーモード** をオンにする
3. **パッケージ化されていない拡張機能を読み込む** からこのフォルダを選ぶ

## 多言語対応 / i18n

Chrome 標準の [`chrome.i18n`](https://developer.chrome.com/docs/extensions/reference/api/i18n) を使っています。ブラウザの表示言語に合わせて、UI・コメント欄・Markdown の見出しが切り替わります。

| ロケール | ファイル |
|---|---|
| English（デフォルト） | `_locales/en/messages.json` |
| 日本語 | `_locales/ja/messages.json` |

言語を追加するときは、`_locales/<locale>/messages.json` を `en` と同じキーで作ってください。

## デザイン

配色は [Creator Transformation Railcar](https://github.com/locomotive-works) のブランドパレットに合わせています（primary `#7c3aed` / `#8b5cf6` → `#6d28d9` のグラデーション、slate 系のニュートラル）。アイコンの元データは `icons/icon.svg` です。

## Chrome Web Store 向けのパッケージ

```sh
./scripts/package.sh   # → dist/media_reaction_capture-<version>.zip
```

ストア掲載用の文章・権限の説明・スクリーンショットは [`store/`](store/LISTING.md) にあります。

## 補足

- 記録は `chrome.storage.local` にだけ保存され、外部には送信されません（[プライバシーポリシー](PRIVACY.md)）
- iframe に埋め込まれたプレーヤーでは、プレーヤーをクリックしてフォーカスしてから Space を押してください
- 動画要素そのものが全画面表示になっているサイトでは、コメント欄が見えないことがあります（YouTube などプレーヤー全体が全画面になるサイトでは表示されます）

## License

[MIT](LICENSE)
