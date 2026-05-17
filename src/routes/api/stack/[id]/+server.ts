import { json } from '@sveltejs/kit';
import { updateStackGroup, deleteStackGroup } from '$lib/server/repositories/stack';
import type { StackGroup } from '$lib/interfaces';

export const PUT = async ({ request, params }) => {
	try {
		const payload = (await request.json()) as StackGroup;
		const group = await updateStackGroup(params.id, payload);
		return json(group);
	} catch {
		return json({ error: 'Database unavailable' }, { status: 503 });
	}
};

export const DELETE = async ({ params }) => {
	try {
		await deleteStackGroup(params.id);
		return new Response(null, { status: 204 });
	} catch {
		return json({ error: 'Database unavailable' }, { status: 503 });
	}
};
