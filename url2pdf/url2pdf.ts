// see: https://deno.land/x/puppeteer@16.2.0

import { readAll } from "https://deno.land/std@0.93.0/io/util.ts";
import puppeteer from "https://deno.land/x/puppeteer@16.2.0/mod.ts";
import { Command } from "https://deno.land/x/cliffy@v0.19.2/command/mod.ts";

// セットアップ用コマンド
// PUPPETEER_PRODUCT=chrome deno run -A --unstable https://deno.land/x/puppeteer@16.2.0/install.ts

// 標準入力からpathのリストを受け取る
async function readPathsFromStdin(): Promise<string[]> {
  const decoder = new TextDecoder("utf-8");
  const input = await readAll(Deno.stdin);
  const inputText = decoder.decode(input).trim();
  return inputText.split("\n");
}

async function convertUrlsToPdf(urls: string[] = []) {
  // pathからpdfのパスを生成する
  function generatePdfPath(url: string) {
    const pageName = url.replace(/\//g, "_");
    return `./pdfs/${pageName}.pdf`;
  }
  // 処理済みのpdfを取得しておく(チェック用)
  async function findExistingPdfPaths(urls: string[]): Promise<Set<string>> {
    const existingPdfPaths = new Set<string>();
    for (const url of urls) {
      const pdfPath = generatePdfPath(url);
      if (
        await Deno.stat(pdfPath)
          .then(() => true)
          .catch(() => false)
      ) {
        existingPdfPaths.add(pdfPath);
      }
    }
    return existingPdfPaths;
  }

  const existingPdfPaths = await findExistingPdfPaths(urls);

  const browser = await puppeteer.launch();
  for (const [i, url] of urls.entries()) {
    const pdfPath = generatePdfPath(url);
    if (existingPdfPaths.has(pdfPath)) {
      console.log(`skip ${url}`);
      continue;
    }
    console.log(`[${i + 1}/${urls.length}] ${url}`);

    // ヘッドレスブラウザでページを開いてPDFに変換する
    const page = await browser.newPage();
    await page.goto(url);
    await page.pdf({ path: pdfPath, format: "A4" });
  }
  await browser.close();
}

if (import.meta.main) {
  await new Command()
    .name("url2pdf")
    .version("0.1.0")
    .description("Convert URLs to PDF files.")
    .action(async (_options) => {
      const paths = await readPathsFromStdin();
      convertUrlsToPdf(paths);
    })
    .parse(Deno.args);
}
