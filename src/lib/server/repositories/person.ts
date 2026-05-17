import { Prisma } from '../../../generated/prisma/client';
import type { Person } from '$lib/interfaces';
import type { Fact } from '$lib/types';
import { PERSON, FACTS } from '$lib/data/person';
import { prisma } from '$lib/server/prisma';

const isMongoConfigured = () => {
	const url = process.env.MONGODB_URL?.trim();
	if (!url) return false;
	if (url.includes('user:password@')) return false;
	try {
		const parsed = new URL(url);
		return parsed.protocol === 'mongodb:' || parsed.protocol === 'mongodb+srv:';
	} catch {
		return false;
	}
};

const normalizeFacts = (facts: Prisma.JsonValue): Fact[] => {
	if (!Array.isArray(facts)) return [];
	return facts.map((f) => ({
		k: typeof (f as Record<string, unknown>).k === 'string' ? (f as { k: string }).k : '',
		v: typeof (f as Record<string, unknown>).v === 'string' ? (f as { v: string }).v : ''
	}));
};

export const getSitePerson = async (): Promise<{ person: Person; facts: Fact[] }> => {
	if (!isMongoConfigured()) throw new Error('DB_UNAVAILABLE');

	let row = await prisma.sitePerson.findFirst();
	if (!row) {
		row = await prisma.sitePerson.create({
			data: {
				name: PERSON.name,
				initials: PERSON.initials,
				role: PERSON.role,
				location: PERSON.location,
				email: PERSON.email,
				github: PERSON.links.github,
				linkedin: PERSON.links.linkedin,
				twitter: PERSON.links.twitter,
				available: PERSON.available,
				facts: FACTS as unknown as Prisma.InputJsonValue
			}
		});
	}

	const person: Person = {
		name: row.name,
		initials: row.initials,
		role: row.role,
		location: row.location,
		email: row.email,
		links: { github: row.github, linkedin: row.linkedin, twitter: row.twitter },
		available: row.available
	};

	return { person, facts: normalizeFacts(row.facts) };
};

export const updateSitePerson = async (
	data: Person & { facts?: Fact[] }
): Promise<{ person: Person; facts: Fact[] }> => {
	if (!isMongoConfigured()) throw new Error('DB_UNAVAILABLE');

	let row = await prisma.sitePerson.findFirst();
	const payload = {
		name: data.name,
		initials: data.initials,
		role: data.role,
		location: data.location,
		email: data.email,
		github: data.links.github,
		linkedin: data.links.linkedin,
		twitter: data.links.twitter,
		available: data.available,
		...(data.facts && { facts: data.facts as unknown as Prisma.InputJsonValue })
	};

	if (row) {
		row = await prisma.sitePerson.update({ where: { id: row.id }, data: payload });
	} else {
		row = await prisma.sitePerson.create({ data: payload });
	}

	const person: Person = {
		name: row.name,
		initials: row.initials,
		role: row.role,
		location: row.location,
		email: row.email,
		links: { github: row.github, linkedin: row.linkedin, twitter: row.twitter },
		available: row.available
	};

	return { person, facts: normalizeFacts(row.facts) };
};
