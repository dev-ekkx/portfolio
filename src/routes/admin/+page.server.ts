import type { PageServerLoad } from './$types';
import { getProjects } from '$lib/server/repositories/projects';
import { getWorkProjects } from '$lib/server/repositories/workProjects';
import { getExperience } from '$lib/server/repositories/experience';
import { getStack } from '$lib/server/repositories/stack';
import { getSitePerson } from '$lib/server/repositories/person';

export const load: PageServerLoad = async () => {
	const [projects, workProjects, experience, stack, personResult] = await Promise.allSettled([
		getProjects(),
		getWorkProjects(),
		getExperience(),
		getStack(),
		getSitePerson()
	]);

	return {
		projects: projects.status === 'fulfilled' ? projects.value : [],
		workProjects: workProjects.status === 'fulfilled' ? workProjects.value : [],
		experience: experience.status === 'fulfilled' ? experience.value : [],
		stack: stack.status === 'fulfilled' ? stack.value : [],
		person: personResult.status === 'fulfilled' ? personResult.value.person : null,
		facts: personResult.status === 'fulfilled' ? personResult.value.facts : [],
		dbConnected:
			projects.status === 'fulfilled' ||
			workProjects.status === 'fulfilled' ||
			experience.status === 'fulfilled'
	};
};
