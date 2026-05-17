import type { PageServerLoad } from './$types';
import { getProjects } from '$lib/server/repositories/projects';
import { getWorkProjects } from '$lib/server/repositories/workProjects';
import { getExperience } from '$lib/server/repositories/experience';
import { getStack } from '$lib/server/repositories/stack';
import { getSitePerson } from '$lib/server/repositories/person';

const EMPTY = {
	user: null,
	projects: [],
	workProjects: [],
	experience: [],
	stack: [],
	person: null,
	facts: [],
	dbConnected: false
} as const;

export const load: PageServerLoad = async ({ locals }) => {
	const { user } = locals;
	const adminEmail = process.env.ADMIN_EMAIL;

	if (!user || user.email !== adminEmail) {
		return { ...EMPTY, user };
	}

	const [projects, workProjects, experience, stack, personResult] = await Promise.allSettled([
		getProjects(),
		getWorkProjects(),
		getExperience(),
		getStack(),
		getSitePerson()
	]);

	return {
		user,
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
