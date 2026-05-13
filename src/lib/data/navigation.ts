import type { CmdItem, NavSection } from '$lib/types';
import { PERSON } from './person';

export const NAV_SECTIONS: NavSection[] = [
	{ id: 'work', label: 'Work', num: '01' },
	{ id: 'about', label: 'About', num: '02' },
	{ id: 'experience', label: 'Experience', num: '03' },
	{ id: 'stack', label: 'Stack', num: '04' },
	{ id: 'contact', label: 'Contact', num: '05' }
];

export const CMD_ITEMS: CmdItem[] = [
	{ label: 'View selected work', anchor: 'work', meta: '→', ico: 'code' },
	{ label: 'Read about Emmanuel', anchor: 'about', meta: '→', ico: 'sparkles' },
	{ label: 'Browse experience', anchor: 'experience', meta: '→', ico: 'briefcase' },
	{ label: 'See the stack', anchor: 'stack', meta: '→', ico: 'package' },
	{ label: 'Get in touch', anchor: 'contact', meta: '→', ico: 'mail' },
	{ label: 'GitHub profile', href: PERSON.links.github, meta: '↗', ico: 'github' },
	{ label: 'LinkedIn profile', href: PERSON.links.linkedin, meta: '↗', ico: 'linkedin' }
];

export const BUDGETS = ['< $5k', '$5–15k', '$15–40k', 'Just chatting'];
