const fs = require('fs');

// src/fonts/NotoSansJP-Regular.ttf にパスを指定
const fontPath = './src/fonts/NotoSansJP-Regular.ttf';

// Base64 形式に変換
fs.readFile(fontPath, (err, data) => {
    if (err) {
        console.error('エラーが発生しました:', err);
        return;
    }
    const base64Data = data.toString('base64');
    console.log(base64Data);  // 変換された Base64 データを出力
});
