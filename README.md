# image_viewer
画像一覧できます。

### 必須
- Node.js: 画像を動的に見ていくのにローカルサーバが要ります。
- npm: expressライブラリを使うので要ります。
- chrome: chromeシークレットモードで立ち上がります。
  - 「server.js」内を適宜いじるなら不要です。最後のほうにある「app.listen(省略);」を以下に書き換えてください。
    ```
    app.listen(PORT, ()=>{
      console.log(`サーバーが http://localhost:${PORT} で起動しました`);
    });
    ```

### 初回起動
以下をコマンドプロンプト実行します。「your-project」は、「image_viewer」の絶対パスに読み替えてください。
```
cd your-project
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
### 備考
- 「start-server.bat」は、win + chrome環境の場合、クリックのみでサーバ立ち上げ→ブラウザ遷移まで実行するものです。ファイル内「your-project」を「image_viewer」の絶対パスに書き換えてください。
