const express = require('express');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const app = express();
const PORT = 3000;
const IMGS_ROOT = path.join(__dirname, 'public', 'imgs');

app.use(express.static('public'));

// 再帰的に画像ファイルを読み取る関数
function getImagesByCategory(dirPath, baseURL = 'imgs') {
  const result = {};

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  entries.forEach(entry => {
    const fullPath = path.join(dirPath, entry.name);
    const relativePath = path.relative(path.join(__dirname, 'public'), fullPath);

    if (entry.isDirectory()) {
      // 再帰的にサブフォルダを探索
      const category = path.join(baseURL, entry.name);
      const subResult = getImagesByCategory(fullPath, category);
      Object.assign(result, subResult);
    } else if (/\.(jpg|jpeg|png|gif|webp|bmp)$/i.test(entry.name)) {
      const category = baseURL;
      if (!result[category]) result[category] = [];
      result[category].push(relativePath.replace(/\\/g, '/')); // Windows対策
    }
  });

  return result;
}

// API: /api/images で画像一覧（カテゴリごと）を返す
app.get('/api/images', (req, res) => {
  try {
    const imageMap = getImagesByCategory(IMGS_ROOT);
    res.json(imageMap);
  } catch (err) {
    res.status(500).json({ error: '画像一覧の取得に失敗しました' });
  }
});

app.listen(PORT, () => {
  console.log(`サーバーが http://localhost:${PORT} で起動しました`);

  // Chromeコマンド（Windows用例）
  const chromePath = `"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"`;

  // シークレットモードでlocalhostを開くコマンド
  const url = `http://localhost:${PORT}`;
  const cmd = `${chromePath} --incognito --new-window ${url}`;

  exec(cmd, (error) => {
    if (error) {
      console.error('Chrome起動エラー:', error);
    } else {
      console.log('Chromeがシークレットモードで起動しました。');
    }
  });
});
