import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { updateExperience, deleteExperience } from '$lib/server/repositories/experience';
import type { ExperienceItem } from '$lib/interfaces';

export const PUT: RequestHandler = async ({ request, params }) => {
	try {
		const payload = (await request.json()) as ExperienceItem;
		const item = await updateExperience(params.id, payload);
		return json(item);
	} catch {
		return json({ error: 'Database unavailable' }, { status: 503 });
	}
};

export const DELETE: RequestHandler = async ({ params }) => {
	try {
		await deleteExperience(params.id);
		return new Response(null, { status: 204 });
	} catch {
		return json({ error: 'Database unavailable' }, { status: 503 });
	}
};
