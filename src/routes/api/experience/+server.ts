import { json } from '@sveltejs/kit';
import { getExperience, createExperience } from '$lib/server/repositories/experience';
import type { ExperienceItem } from '$lib/interfaces';

export const GET = async () => {
	try {
		const items = await getExperience();
		return json(items);
	} catch {
		return json({ error: 'Database unavailable' }, { status: 503 });
	}
};

export const POST = async ({ request }) => {
	try {
		const payload = (await request.json()) as ExperienceItem;
		const item = await createExperience(payload);
		return json(item, { status: 201 });
	} catch {
		return json({ error: 'Database unavailable' }, { status: 503 });
	}
};
