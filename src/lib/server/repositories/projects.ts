import { defaultProjects } from '$lib/data/projects';
import type { Project } from '$lib/interfaces';
import { prisma } from '$lib/server/prisma';

const validStatuses = new Set(['Shipped', 'Scaling', 'In Discovery', 'Archived'] as const);
const DB_UNAVAILABLE = 'DB_UNAVAILABLE';

const isMongoConfigured = () => {
	const url = process.env.MONGODB_URL?.trim();
	if (!url) return false;
	if (url.includes('user:password@')) return false;
	try {
		const parsed = new URL(url);
		if (parsed.protocol !== 'mongodb:' && parsed.protocol !== 'mongodb+srv:') return false;
		if (parsed.protocol === 'mongodb+srv:' && parsed.hostname === 'cluster.mongodb.net') return false;
		return true;
	} catch {
		return false;
	}
};

const assertDbAvailable = () => {
	if (!isMongoConfigured()) {
		throw new Error(DB_UNAVAILABLE);
	}
};

const normalizeProject = (project: {
	id: string;
	title: string;
	summary: string;
	role: string;
	impact: string;
	year: string;
	status: string;
	stack: string[];
}): Project => ({
	id: project.id,
	title: project.title,
	summary: project.summary,
	role: project.role,
	impact: project.impact,
	year: project.year,
	status: validStatuses.has(project.status as Project['status'])
		? (project.status as Project['status'])
		: 'In Discovery',
	stack: project.stack
});

const seedDefaults = async () => {
	for (const project of defaultProjects) {
		await prisma.project.create({
			data: {
				title: project.title,
				summary: project.summary,
				role: project.role,
				impact: project.impact,
				year: project.year,
				status: project.status,
				stack: project.stack
			}
		});
	}
};

export const getProjects = async (): Promise<Project[]> => {
	assertDbAvailable();
	let projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });

	if (!projects.length) {
		await seedDefaults();
		projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });
	}

	return projects.map(normalizeProject);
};

export const createProject = async (data: Omit<Project, 'id'>): Promise<Project> => {
	assertDbAvailable();
	const created = await prisma.project.create({
		data: {
			title: data.title,
			summary: data.summary,
			role: data.role,
			impact: data.impact,
			year: data.year,
			status: data.status,
			stack: data.stack
		}
	});

	return normalizeProject(created);
};

export const updateProject = async (id: string, data: Omit<Project, 'id'>): Promise<Project> => {
	assertDbAvailable();
	const updated = await prisma.project.update({
		where: { id },
		data: {
			title: data.title,
			summary: data.summary,
			role: data.role,
			impact: data.impact,
			year: data.year,
			status: data.status,
			stack: data.stack
		}
	});

	return normalizeProject(updated);
};

export const deleteProject = async (id: string): Promise<void> => {
	assertDbAvailable();
	await prisma.project.delete({ where: { id } });
};

export const resetProjects = async (): Promise<Project[]> => {
	assertDbAvailable();
	await prisma.project.deleteMany({});
	await seedDefaults();
	const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });
	return projects.map(normalizeProject);
};
