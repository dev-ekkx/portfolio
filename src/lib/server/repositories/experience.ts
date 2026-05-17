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

const toItem = (r: {
	id: string;
	when: string;
	role: string;
	co: string;
	body: string;
	place: string;
	current: boolean;
}): ExperienceItem & { id: string } => ({
	id: r.id,
	when: r.when,
	role: r.role,
	co: r.co,
	body: r.body,
	place: r.place,
	current: r.current
});

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

export const getExperience = async (): Promise<(ExperienceItem & { id: string })[]> => {
	if (!isMongoConfigured()) throw new Error('DB_UNAVAILABLE');
	let rows = await prisma.experienceItem.findMany({ orderBy: { order: 'asc' } });
	if (!rows.length) {
		await seed();
		rows = await prisma.experienceItem.findMany({ orderBy: { order: 'asc' } });
	}
	return rows.map(toItem);
};

export const createExperience = async (
	data: ExperienceItem
): Promise<ExperienceItem & { id: string }> => {
	if (!isMongoConfigured()) throw new Error('DB_UNAVAILABLE');
	const count = await prisma.experienceItem.count();
	const row = await prisma.experienceItem.create({
		data: {
			when: data.when,
			role: data.role,
			co: data.co,
			body: data.body,
			place: data.place,
			current: data.current ?? false,
			order: count
		}
	});
	return toItem(row);
};

export const updateExperience = async (
	id: string,
	data: ExperienceItem
): Promise<ExperienceItem & { id: string }> => {
	if (!isMongoConfigured()) throw new Error('DB_UNAVAILABLE');
	const row = await prisma.experienceItem.update({
		where: { id },
		data: {
			when: data.when,
			role: data.role,
			co: data.co,
			body: data.body,
			place: data.place,
			current: data.current ?? false
		}
	});
	return toItem(row);
};

export const deleteExperience = async (id: string): Promise<void> => {
	if (!isMongoConfigured()) throw new Error('DB_UNAVAILABLE');
	await prisma.experienceItem.delete({ where: { id } });
};
