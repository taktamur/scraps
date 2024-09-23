Deno を使って、URL を元に Web ページにアクセスし、その内容を PDF ファイルとして保存する仕組み

- ヘッドレスブラウザとして Pupetter を使う

- sitemap2text.ts sitemap.xml から url を抽出する
- URL の束を text 化して、url2pdf に標準入力で流し込む
- pdfs/\*.pdf を、pdftk を使って１つにまとめる

なんかとっ散らかったな、、、
