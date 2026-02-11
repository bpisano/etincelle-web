import { serverInventaireClient } from '$lib/inventaire/client';
import { EntityRequest } from '$lib/inventaire/requests/entity/entity';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const uris = url.searchParams.get('uris');

	if (!uris) {
		return error(400, 'Missing uris parameter');
	}

	try {
		const entityRequest = new EntityRequest({
			uris: uris.split('|'),
			lang: 'fr',
			relatives: ['wdt:P50'], // Author relationship
			attributes: ['info', 'labels', 'descriptions', 'image']
		});

		const results = await serverInventaireClient.execute(entityRequest);

		return json(results);
	} catch (err) {
		console.error('Error fetching entities:', err);
		return error(500, 'Failed to fetch entities');
	}
};
