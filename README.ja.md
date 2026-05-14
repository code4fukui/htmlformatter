# htmlformatter

HTMLコードを適切なインデントと閉じタグで整形する、依存関係のない軽量なJavaScriptツールおよびモジュールです。

## デモ

実際に試してみる: **[https://code4fukui.github.io/htmlformatter](https://code4fukui.github.io/htmlformatter)**

上部のテキストエリアに整形前のHTMLを貼り付けると、下部のテキストエリアに即座に整形結果が表示されます。

## 特徴

- **適切なインデント:** 一貫した2スペースのインデントでHTMLを自動的に整形します。
- **正しいタグの補完:** 欠けている閉じタグを追加し、空要素（void要素）を正しく処理します。
- **カスタム要素とSVGのサポート:** カスタム要素（例: `<qr-code>`）やネストされたSVGコンテンツを解釈し、適切に整形します。
- **MDNベースのタグ検証:** Mozilla Developer Network（MDN）からスクレイピングした有効なHTMLタグのリストを使用して、標準要素を識別します。

## 使い方

### ウェブインターフェース

1. [デモページ](https://code4fukui.github.io/htmlformatter)を開きます。
2. 整形したいHTMLコードを上部のテキストエリアに貼り付けます。
3. 整形されたHTMLが下部のテキストエリアに自動的に表示されます。

### JavaScriptモジュールとして

本フォーマッターは、ブラウザ、Deno、Node.js環境においてESモジュールとしてインポートできます。

```javascript
import { formatHTML } from "https://code4fukui.github.io/htmlformatter/formatHTML.js";

const messyHTML = `<body style="abc"><div class="a"><b>abc</b><br><img>あ</div></body>`;
const formattedHTML = formatHTML(messyHTML);

console.log(formattedHTML);
/* 出力:
<body style="abc">
  <div class="a">
    <b>
      abc
    </b>
    <br>
    <img>
    あ
  </div>
</body>
*/
```

## データソース

本フォーマッターは、どの要素が空要素（自己閉じ要素）であるかを判別するために、標準HTMLタグのリストを使用しています。このリストは、MDNのHTML要素リファレンスをスクレイピングして自動生成されたものです。

生成されたデータはこちらで公開されています: [htmltags.csv](https://code4fukui.github.io/htmltags.csv)

## ライセンス

[MIT](LICENSE)
