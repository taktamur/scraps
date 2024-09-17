// test/index.spec.ts
import { describe, it, expect, vi } from 'vitest';
import { date202409, date202501 } from './const';
import { SELF } from 'cloudflare:test';

// For now, you'll need to do something like this to get a correctly-typed
// `Request` to pass to `worker.fetch()`.
const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

describe('月次ページ作成worker', () => {
	it('date指定なし', async () => {
		// new Date() をモックする
		const mockDate = date202409.date;
		const OriginalDate = Date;
		vi.spyOn(global, 'Date').mockImplementation((...args: ConstructorParameters<typeof Date>) => {
			if ((args as any[]).length === 0) {
				return mockDate;
			}
			return new OriginalDate(...args);
		});

		const response = await SELF.fetch('https://example.com');
		expect(await response.text()).toMatchInlineSnapshot(`"${date202409.expected}"`);

		// モックを解除する
		vi.restoreAllMocks();
	});
	it('date指定あり', async () => {
		const response = await SELF.fetch('https://example.com/?date=2025-01');
		expect(await response.text()).toMatchInlineSnapshot(`"${date202501.expected}"`);

		// モックを解除する
		vi.restoreAllMocks();
	});
});
