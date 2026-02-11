import { InventaireIOClient } from '$lib/inventaire/client';
import { SearchRequest } from '$lib/inventaire/requests/search/search';
import { EntityType } from '$lib/inventaire/types';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const serverClient = new InventaireIOClient(
	'https://inventaire.io/api',
	'Etincelle-Web/1.0 (https://github.com/etincelle)'
);

export const GET: RequestHandler = async ({ url }) => {
	const q = url.searchParams.get('q');

	if (!q || q.trim().length < 2) {
		return error(400, 'Missing or invalid search query');
	}

	try {
		const searchRequest = new SearchRequest({
			query: q.trim(),
			limit: 10,
			lang: 'fr',
			types: [EntityType.Humans, EntityType.Works]
		});

		const results = await serverClient.execute(searchRequest);

		return json(results);
	} catch (err) {
		console.error('Error searching:', err);
		return error(500, 'Failed to search');
	}
};
