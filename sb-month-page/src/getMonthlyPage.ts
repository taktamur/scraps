/**
 * Cosense月次ページ生成スクリプト
 *
 * 概要:
 * このスクリプトは、現在の月のCosense風月次ページを文字列として生成します。
 * 前月・次月へのナビゲーションリンク、月の日付と曜日のリストを表示し、最後に指定されたURLのリンクを出力します。
 *
 * 関数:
 * - generateMonthString(date): 指定された日付の年と月を "YYYY/MM" 形式で返します。
 * - generateDateString(year, month, day): 指定された年月日を " [YYYY/MM/DD] (曜日)" の形式で返します。
 * - getMonthlyPage(): 現在の月のカレンダーページを生成し、文字列として返します。
 *
 * 出力例:
 *  2024/09
 *  [2024/08] ← →[2024/10]
 *
 *   [2024/09/01] (日)
 *   [2024/09/02] (月)
 *   [2024/09/03] (火)
 *   ...
 *   [2024/09/30] (月)
 *
 *  生成ページ https://cosense-month-page.taktamur.workers.dev/
 *
 * 使い方:
 * - getMonthlyPage() を呼び出すことで、現在の月のページを生成して文字列として返します。
 *
 * 注意事項:
 * - Date オブジェクトの月は0始まり（1月が0、12月が11）なので、月の計算時に注意してください。
 * - 曜日は日本語表記を使用しています。
 *
 */

// 年と月の文字列を生成する関数
function generateMonthString(date: Date): string {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0'); // 月は0から始まるため+1
	return `${year}/${month}`;
}

// 日付と曜日の文字列を生成する関数
function generateDateString(year: number, month: number, day: number): string {
	const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
	const date = new Date(year, month - 1, day); // 月は0始まりのため-1
	const weekday = weekdays[date.getDay()]; // 曜日を取得
	return ` [${year}/${String(month).padStart(2, '0')}/${String(day).padStart(2, '0')}] (${weekday})\n`;
}

// メインの月次ページを生成する関数
export function getMonthlyPage(now: Date): string {
	// 現在の日付を取得
	// const now = new Date();
	const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate(); // 今月の最終日

	// ヘッダー部分を作成
	let output = `${generateMonthString(now)}\n`;
	output += `[${generateMonthString(new Date(now.getFullYear(), now.getMonth() - 1, 1))}] ← →[${generateMonthString(
		new Date(now.getFullYear(), now.getMonth() + 1, 1)
	)}]\n\n`; // 前月・次月を直接出力に追加

	// 各日の情報を出力
	for (let day = 1; day <= lastDayOfMonth; day++) {
		output += generateDateString(now.getFullYear(), now.getMonth() + 1, day);
	}

	// 最後に改行2つとリンクを追加
	output += `\n\n生成ページ https://cosense-month-page.taktamur.workers.dev/`;

	return output;
}
