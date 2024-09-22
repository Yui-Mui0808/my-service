const fs = require('fs');

// フォントファイルのパスを引数から指定できるように変更
const fontPath = process.argv[2];  // コマンドライン引数からファイルパスを取得

// エラーチェック: 引数がない場合
if (!fontPath) {
    console.error("エラー: フォントファイルのパスを指定してください。");
    process.exit(1);
}

// 出力ファイルのパスを指定
const outputFilePath = './src/fonts/encoded-font.txt';  // Base64文字列を保存するファイル

// フォントファイルを読み込んでBase64に変換
fs.readFile(fontPath, (err, data) => {
    if (err) {
        console.error('エラーが発生しました:', err);
        return;
    }

    // Base64形式に変換
    const base64Data = data.toString('base64');

    // 改行を削除して1行に整形（念のため）
    const oneLineBase64 = base64Data.replace(/\n/g, '').replace(/\r/g, '');

    // Base64文字列をファイルに保存
    fs.writeFile(outputFilePath, oneLineBase64, (err) => {
        if (err) {
            console.error('ファイルの書き込み中にエラーが発生しました:', err);
            return;
        }
        console.log(`Base64エンコードされたデータが ${outputFilePath} に保存されました。`);
    });
});

