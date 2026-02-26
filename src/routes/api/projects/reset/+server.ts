import { json } from '@sveltejs/kit';
import { defaultProjects } from '$lib/data/projects';
import { resetProjects } from '$lib/server/repositories/projects';

export const POST = async () => {
	try {
		const projects = await resetProjects();
		return json(projects);
	} catch {
		const fallback = defaultProjects.map((project, index) => ({ ...project, id: `fallback-${index + 1}` }));
		return json(fallback);
	}
};
