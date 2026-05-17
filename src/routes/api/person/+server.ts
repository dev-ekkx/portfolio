import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getSitePerson, updateSitePerson } from '$lib/server/repositories/person';
import type { Person } from '$lib/interfaces';
import type { Fact } from '$lib/types';

export const GET: RequestHandler = async () => {
	try {
		const data = await getSitePerson();
		return json(data);
	} catch {
		return json({ error: 'Database unavailable' }, { status: 503 });
	}
};

export const PUT: RequestHandler = async ({ request }) => {
	try {
		const payload = (await request.json()) as Person & { facts?: Fact[] };
		const data = await updateSitePerson(payload);
		return json(data);
	} catch {
		return json({ error: 'Database unavailable' }, { status: 503 });
	}
};
