import { describe, expect, it } from 'vitest';
import { date202409, date202501 } from './const';
import { getMonthlyPage } from '../src/getMonthlyPage';

describe('getMonthlyPage', () => {
	it('2024/09の月次ページ', () => {
		expect(getMonthlyPage(date202409.date)).toBe(date202409.expected);
	});
	it('2025/01の月次ページ', () => {
		expect(getMonthlyPage(date202501.date)).toBe(date202501.expected);
	});
});
