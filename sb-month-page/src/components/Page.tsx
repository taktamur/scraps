// src/components/Page.tsx
import { getMonthlyPage } from "../getMonthlyPage";
import { html } from "hono/html";

// Cosense(Scrapbox)の月次ページを生成するコンポーネント
// 仕様：
// - コンポーネント名：MonthPage
// - 初期表示：当月の月次ページを生成する
// - 画面は以下の要素で構成される
//   - ヘッダ部分
//     - 前月・次月へのナビゲーションリンクを表示する
//   - 月次ページのテキスト部分
//     - 月次ページのテキスト部分はtextboxで表示する
//     - 月次ページのテキスト部分にはダミーデータを表示する
//     - コピペ用ボタンを用意する

const formatDate = (date: Date): string => {
  return `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}`;
};

export const MonthPage = (date: Date) => {
  const monthText = getMonthlyPage(date);

  // dateオブジェクトから1ヶ月引いたDateオブジェクトを生成
  const prevDateStr = formatDate(
    new Date(date.getFullYear(), date.getMonth() - 1)
  );
  const nextDateStr = formatDate(
    new Date(date.getFullYear(), date.getMonth() + 1)
  );
  return (
    <div>
      <header>
        <a href={`/?date=${prevDateStr}`}>前月</a> ← →{" "}
        <a href={`/?date=${nextDateStr}`}>翌月</a>
      </header>
      <br />
      {html`
        <button
          onClick="navigator.clipboard.writeText(document.getElementById('monthpage').value); alert('Copied!')"
        >
          Copy to Clipboard
        </button>
      `}
      <br />
      <textarea
        id="monthpage"
        readOnly
        style={{ width: "400px", height: "400px" }}
      >
        {monthText}
      </textarea>
    </div>
  );
};
