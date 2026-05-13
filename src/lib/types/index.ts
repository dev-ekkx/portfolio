export type Directions = 'up' | 'down' | 'left' | 'right';

export type Project = {
	id: string;
	title: string;
	summary: string;
	role: string;
	impact: string;
	year: string;
	status: 'Shipped' | 'Scaling' | 'In Discovery' | 'Archived';
	stack: string[];
};

export type Person = {
	name: string;
	initials: string;
	role: string;
	location: string;
	email: string;
	links: { github: string; linkedin: string; twitter: string };
	available: string;
};

export type ProjectStat = { v: string; l: string };

export type WorkProject = {
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
};

export type ExperienceItem = {
	when: string;
	role: string;
	co: string;
	body: string;
	place: string;
	current?: boolean;
};

export type StackGroup = {
	name: string;
	note: string;
	items: string[];
};

export type Fact = { k: string; v: string };

export type NavSection = { id: string; label: string; num: string };

export type CmdItem = {
	label: string;
	meta: string;
	ico: string;
	anchor?: string;
	href?: string;
};
