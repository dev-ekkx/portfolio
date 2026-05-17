import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { defaultProjects } from '$lib/data/projects';
import { createProject, getProjects } from '$lib/server/repositories/projects';
import type { Project } from '$lib/interfaces';

export const GET: RequestHandler = async () => {
	try {
		const projects = await getProjects();
		return json(projects);
	} catch {
		const fallback = defaultProjects.map((project, index) => ({ ...project, id: `fallback-${index + 1}` }));
		return json(fallback);
	}
};

export const POST: RequestHandler = async ({ request }) => {
	try {
		const payload = (await request.json()) as Omit<Project, 'id'>;
		const project = await createProject(payload);
		return json(project, { status: 201 });
	} catch {
		return json({ error: 'Database unavailable' }, { status: 503 });
	}
};
