import { json } from '@sveltejs/kit';
import { getWorkProjects, createWorkProject } from '$lib/server/repositories/workProjects';
import type { WorkProject } from '$lib/interfaces';

export const GET = async () => {
	try {
		const projects = await getWorkProjects();
		return json(projects);
	} catch {
		return json({ error: 'Database unavailable' }, { status: 503 });
	}
};

export const POST = async ({ request }) => {
	try {
		const payload = (await request.json()) as Omit<WorkProject, 'id'> & { slug: string };
		const project = await createWorkProject(payload);
		return json(project, { status: 201 });
	} catch {
		return json({ error: 'Database unavailable' }, { status: 503 });
	}
};
