import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const calculateYearsOfExperience = (
	startExperience: number = 0,
	startYear: number = 2021
): number => {
	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();
	const anniversaryThisYear = new Date(currentYear, 3, 6);

	let yearsPassed = currentYear - startYear;
	
	// If April 6th hasn't occurred this year yet, don't count it
	if (currentDate < anniversaryThisYear) {
		yearsPassed--;
	}

	return startExperience + yearsPassed;
};
