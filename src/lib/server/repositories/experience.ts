import type { ExperienceItem } from '$lib/interfaces';
import { EXPERIENCE } from '$lib/data/experience';
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
	for (const [i, e] of EXPERIENCE.entries()) {
		await prisma.experienceItem.create({
			data: {
				when: e.when,
				role: e.role,
				co: e.co,
				body: e.body,
				place: e.place,
				current: e.current ?? false,
				order: i
			}
		});
	}
};

export const getExperience = async (): Promise<ExperienceItem[]> => {
	if (!isMongoConfigured()) throw new Error('DB_UNAVAILABLE');
	let rows = await prisma.experienceItem.findMany({ orderBy: { order: 'asc' } });
	if (!rows.length) {
		await seed();
		rows = await prisma.experienceItem.findMany({ orderBy: { order: 'asc' } });
	}
	return rows.map((r) => ({
		when: r.when,
		role: r.role,
		co: r.co,
		body: r.body,
		place: r.place,
		current: r.current
	}));
};
