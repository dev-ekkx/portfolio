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

const toGroup = (r: {
	id: string;
	name: string;
	note: string;
	items: string[];
}): StackGroup & { id: string } => ({ id: r.id, name: r.name, note: r.note, items: r.items });

const seed = async () => {
	for (const [i, g] of STACK.entries()) {
		await prisma.stackGroup.create({
			data: { name: g.name, note: g.note, items: g.items, order: i }
		});
	}
};

export const getStack = async (): Promise<(StackGroup & { id: string })[]> => {
	if (!isMongoConfigured()) throw new Error('DB_UNAVAILABLE');
	let rows = await prisma.stackGroup.findMany({ orderBy: { order: 'asc' } });
	if (!rows.length) {
		await seed();
		rows = await prisma.stackGroup.findMany({ orderBy: { order: 'asc' } });
	}
	return rows.map(toGroup);
};

export const createStackGroup = async (data: StackGroup): Promise<StackGroup & { id: string }> => {
	if (!isMongoConfigured()) throw new Error('DB_UNAVAILABLE');
	const count = await prisma.stackGroup.count();
	const row = await prisma.stackGroup.create({
		data: { name: data.name, note: data.note, items: data.items, order: count }
	});
	return toGroup(row);
};

export const updateStackGroup = async (
	id: string,
	data: StackGroup
): Promise<StackGroup & { id: string }> => {
	if (!isMongoConfigured()) throw new Error('DB_UNAVAILABLE');
	const row = await prisma.stackGroup.update({
		where: { id },
		data: { name: data.name, note: data.note, items: data.items }
	});
	return toGroup(row);
};

export const deleteStackGroup = async (id: string): Promise<void> => {
	if (!isMongoConfigured()) throw new Error('DB_UNAVAILABLE');
	await prisma.stackGroup.delete({ where: { id } });
};
