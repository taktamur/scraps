/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { getMonthlyPage } from './getMonthlyPage';

export default {
	async fetch(request, env, ctx): Promise<Response> {
		// 引数dateから年月を取得し、Dateオブジェクトを生成する
		const url = new URL(request.url);
		const dateParam = url.searchParams.get('date');

		const date = dateParam ? new Date(dateParam) : new Date();

		return new Response(getMonthlyPage(date));
	},
} satisfies ExportedHandler<Env>;
