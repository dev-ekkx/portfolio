import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { updateWorkProject, deleteWorkProject } from '$lib/server/repositories/workProjects';
import type { WorkProject } from '$lib/interfaces';

export const PUT: RequestHandler = async ({ request, params }) => {
	try {
		const payload = (await request.json()) as Omit<WorkProject, 'id'> & { slug?: string };
		const project = await updateWorkProject(params.slug, payload);
		return json(project);
	} catch {
		return json({ error: 'Database unavailable' }, { status: 503 });
	}
};

export const DELETE: RequestHandler = async ({ params }) => {
	try {
		await deleteWorkProject(params.slug);
		return new Response(null, { status: 204 });
	} catch {
		return json({ error: 'Database unavailable' }, { status: 503 });
	}
};
