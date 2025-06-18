# image_viewer
画像一覧できます。

### 必須
- Node.js: 画像を動的に見ていくのにローカルサーバが要ります。
- npm: expressライブラリを使うので要ります。

### 初回起動
以下をコマンドプロンプト実行します。「your-project」は、「image_viewer」の絶対パスに読み替えてください。
```
cd your-project
npm init -y
npm install express
node server.js
```
その後ブラウザでポート3000にアクセスしてください。
http://localhost:3000/

### 2回目以降の起動
以下をコマンドプロンプト実行します。「your-project」は、「image_viewer」の絶対パスに読み替えてください。
```
cd your-project
node server.js
```
その後ブラウザでポート3000にアクセスしてください。
http://localhost:3000/
