import type { StackGroup } from '$lib/interfaces';
import { STACK } from '$lib/data/stack';
import { prisma } from '$lib/server/prisma';

const isMongoConfigured = () => {
	const url = process.env.MONGODB_URL?.trim();
	if (!url) return false;
	if (url.includes('user:password@')) return false;
	try {
		const parsed = new URL(url);
		return parsed.protocol === 'mongodb:' || parsed.protocol === 'mongodb+srv:';
	} catch {
		return false;
	}
};

const seed = async () => {
	for (const [i, g] of STACK.entries()) {
		await prisma.stackGroup.create({
			data: { name: g.name, note: g.note, items: g.items, order: i }
		});
	}
};

export const getStack = async (): Promise<StackGroup[]> => {
	if (!isMongoConfigured()) throw new Error('DB_UNAVAILABLE');
	let rows = await prisma.stackGroup.findMany({ orderBy: { order: 'asc' } });
	if (!rows.length) {
		await seed();
		rows = await prisma.stackGroup.findMany({ orderBy: { order: 'asc' } });
	}
	return rows.map((r) => ({ name: r.name, note: r.note, items: r.items }));
};
