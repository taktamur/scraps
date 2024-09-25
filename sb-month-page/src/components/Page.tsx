// src/components/Page.tsx
import { useState } from "hono/jsx";
import { getMonthlyPage } from "../getMonthlyPage";

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

const getMonthText = (date: Date) => {
  // ダミーデータを返す
  return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}`;
};

export const MonthPage = (date: Date) => {
  const monthText = getMonthlyPage(date);

  // const handleCopy = () => {
  //   navigator.clipboard.writeText(monthText);
  //   alert("Copied to clipboard!");
  // };

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
