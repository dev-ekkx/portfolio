import type { PageServerLoad } from './$types';
import { getWorkProjects } from '$lib/server/repositories/workProjects';
import { getExperience } from '$lib/server/repositories/experience';
import { getStack } from '$lib/server/repositories/stack';
import { getSitePerson } from '$lib/server/repositories/person';
import { PROJECTS } from '$lib/data/projects';
import { EXPERIENCE } from '$lib/data/experience';
import { STACK } from '$lib/data/stack';
import { PERSON, FACTS } from '$lib/data/person';

export const load: PageServerLoad = async () => {
	const [projectsResult, experienceResult, stackResult, personResult] = await Promise.allSettled([
		getWorkProjects(),
		getExperience(),
		getStack(),
		getSitePerson()
	]);

	const personData =
		personResult.status === 'fulfilled' ? personResult.value : { person: PERSON, facts: FACTS };

	return {
		projects: projectsResult.status === 'fulfilled' ? projectsResult.value : PROJECTS,
		experience: experienceResult.status === 'fulfilled' ? experienceResult.value : EXPERIENCE,
		stack: stackResult.status === 'fulfilled' ? stackResult.value : STACK,
		person: personData.person,
		facts: personData.facts
	};
};
