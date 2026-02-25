import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, "child"> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, "children"> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };

export const calculateYearsOfExperience = (
	startExperience: number = 0,
	startYear: number = 2021
): number => {
	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();
	const anniversaryThisYear = new Date(currentYear, 3, 6);

	let yearsPassed = currentYear - startYear;
	if (currentDate < anniversaryThisYear) yearsPassed--;

	return startExperience + yearsPassed;
};
