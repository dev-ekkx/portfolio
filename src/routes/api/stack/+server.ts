import { json } from '@sveltejs/kit';
import { getStack, createStackGroup } from '$lib/server/repositories/stack';
import type { StackGroup } from '$lib/interfaces';

export const GET = async () => {
	try {
		const groups = await getStack();
		return json(groups);
	} catch {
		return json({ error: 'Database unavailable' }, { status: 503 });
	}
};

export const POST = async ({ request }) => {
	try {
		const payload = (await request.json()) as StackGroup;
		const group = await createStackGroup(payload);
		return json(group, { status: 201 });
	} catch {
		return json({ error: 'Database unavailable' }, { status: 503 });
	}
};
