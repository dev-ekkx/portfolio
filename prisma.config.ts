// @ts-nocheck — compiled by Prisma directly; not part of the SvelteKit tsconfig
import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
	schema: './prisma/schema.prisma',
	engine: 'classic',
	datasource: {
		url: process.env.MONGODB_URL
	}
});
