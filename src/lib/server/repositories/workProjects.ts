import { Prisma } from '../../../generated/prisma/client';
import type { WorkProject } from '$lib/interfaces';
import type { ProjectStat } from '$lib/types';
import { PROJECTS } from '$lib/data/projects';
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

const normalizeStats = (stats: Prisma.JsonValue): ProjectStat[] => {
	if (!Array.isArray(stats)) return [];
	return stats.map((s) => ({
		v: typeof (s as Record<string, unknown>).v === 'string' ? (s as { v: string }).v : '',
		l: typeof (s as Record<string, unknown>).l === 'string' ? (s as { l: string }).l : ''
	}));
};

const toWorkProject = (row: {
	id: string;
	slug: string;
	year: string;
	title: string;
	role: string;
	blurb: string;
	tags: string[];
	stack: string[];
	stats: Prisma.JsonValue;
	thumbVariant: string;
	thumbCaption: string;
}): WorkProject => ({
	id: row.slug,
	year: row.year,
	title: row.title,
	role: row.role,
	blurb: row.blurb,
	tags: row.tags,
	stack: row.stack,
	stats: normalizeStats(row.stats),
	thumbVariant: row.thumbVariant,
	thumbCaption: row.thumbCaption
});

const seed = async () => {
	for (const [i, p] of PROJECTS.entries()) {
		await prisma.workProject.upsert({
			where: { slug: p.id },
			update: {},
			create: {
				slug: p.id,
				year: p.year,
				title: p.title,
				role: p.role,
				blurb: p.blurb,
				tags: p.tags,
				stack: p.stack,
				stats: p.stats as unknown as Prisma.InputJsonValue,
				thumbVariant: p.thumbVariant,
				thumbCaption: p.thumbCaption,
				order: i
			}
		});
	}
};

export const getWorkProjects = async (): Promise<WorkProject[]> => {
	if (!isMongoConfigured()) throw new Error('DB_UNAVAILABLE');
	let rows = await prisma.workProject.findMany({ orderBy: { order: 'asc' } });
	if (!rows.length) {
		await seed();
		rows = await prisma.workProject.findMany({ orderBy: { order: 'asc' } });
	}
	return rows.map(toWorkProject);
};

export const createWorkProject = async (
	data: Omit<WorkProject, 'id'> & { slug: string }
): Promise<WorkProject> => {
	if (!isMongoConfigured()) throw new Error('DB_UNAVAILABLE');
	const count = await prisma.workProject.count();
	const row = await prisma.workProject.create({
		data: {
			slug: data.slug,
			year: data.year,
			title: data.title,
			role: data.role,
			blurb: data.blurb,
			tags: data.tags,
			stack: data.stack,
			stats: data.stats as unknown as Prisma.InputJsonValue,
			thumbVariant: data.thumbVariant,
			thumbCaption: data.thumbCaption,
			order: count
		}
	});
	return toWorkProject(row);
};

export const updateWorkProject = async (
	slug: string,
	data: Omit<WorkProject, 'id'> & { slug?: string }
): Promise<WorkProject> => {
	if (!isMongoConfigured()) throw new Error('DB_UNAVAILABLE');
	const row = await prisma.workProject.update({
		where: { slug },
		data: {
			...(data.slug && { slug: data.slug }),
			year: data.year,
			title: data.title,
			role: data.role,
			blurb: data.blurb,
			tags: data.tags,
			stack: data.stack,
			stats: data.stats as unknown as Prisma.InputJsonValue,
			thumbVariant: data.thumbVariant,
			thumbCaption: data.thumbCaption
		}
	});
	return toWorkProject(row);
};

export const deleteWorkProject = async (slug: string): Promise<void> => {
	if (!isMongoConfigured()) throw new Error('DB_UNAVAILABLE');
	await prisma.workProject.delete({ where: { slug } });
};
