import type { PageServerLoad } from './$types';
import { getWorkProjects } from '$lib/server/repositories/workProjects';
import { getExperience } from '$lib/server/repositories/experience';
import { getStack } from '$lib/server/repositories/stack';
import { getSitePerson } from '$lib/server/repositories/person';
import { PROJECTS } from '$lib/data/projects';
import { EXPERIENCE } from '$lib/data/experience';
import { STACK } from '$lib/data/stack';
import { PERSON, FACTS } from '$lib/data/person';

export const load: PageServerLoad = () => ({
	personData: getSitePerson().catch(() => ({ person: PERSON, facts: FACTS })),
	projects: getWorkProjects().catch(() => PROJECTS),
	experience: getExperience().catch(() => EXPERIENCE),
	stack: getStack().catch(() => STACK)
});
