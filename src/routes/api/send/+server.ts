import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const payload = await request.json();

	// Wire to Resend: set RESEND_API_KEY in your environment.
	// Then replace the block below with:
	//   const res = await fetch('https://api.resend.com/emails', {
	//     method: 'POST',
	//     headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
	//     body: JSON.stringify(payload),
	//   });
	//   return json({ ok: res.ok }, { status: res.status });

	console.log('[contact form]', payload);
	return json({ ok: true });
};
