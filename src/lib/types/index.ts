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
