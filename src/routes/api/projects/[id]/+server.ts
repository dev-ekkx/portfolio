import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { deleteProject, updateProject } from '$lib/server/repositories/projects';
import type { Project } from '$lib/interfaces';

export const PUT: RequestHandler = async ({ request, params }) => {
	try {
		const payload = (await request.json()) as Omit<Project, 'id'>;
		const project = await updateProject(params.id, payload);
		return json(project);
	} catch {
		return json({ error: 'Database unavailable' }, { status: 503 });
	}
};

export const DELETE: RequestHandler = async ({ params }) => {
	try {
		await deleteProject(params.id);
		return new Response(null, { status: 204 });
	} catch {
		return json({ error: 'Database unavailable' }, { status: 503 });
	}
};
