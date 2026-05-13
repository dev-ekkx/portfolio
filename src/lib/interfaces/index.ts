import type { ProjectStat } from '$lib/types';

export interface Project {
	id: string;
	title: string;
	summary: string;
	role: string;
	impact: string;
	year: string;
	status: 'Shipped' | 'Scaling' | 'In Discovery' | 'Archived';
	stack: string[];
}

export interface Person {
	name: string;
	initials: string;
	role: string;
	location: string;
	email: string;
	links: { github: string; linkedin: string; twitter: string };
	available: string;
}

export interface CmdItem {
	label: string;
	meta: string;
	ico: string;
	anchor?: string;
	href?: string;
}

export interface WorkProject {
	id: string;
	year: string;
	title: string;
	role: string;
	blurb: string;
	tags: string[];
	stack: string[];
	stats: ProjectStat[];
	thumbVariant: string;
	thumbCaption: string;
}

export interface ExperienceItem {
	when: string;
	role: string;
	co: string;
	body: string;
	place: string;
	current?: boolean;
}

export interface StackGroup {
	name: string;
	note: string;
	items: string[];
}
