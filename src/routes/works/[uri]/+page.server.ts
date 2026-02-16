import { EntityRequest } from '$lib/inventaire';
import { serverInventaireClient } from '$lib/inventaire/client';
import type { EntitiesResponse } from '$lib/inventaire/requests/entity/types/entity';
import { WikiDataTag } from '$lib/wikidata/types';
import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ params }) => {
	if (!params.uri) {
		throw new Error('Missing URI parameter');
	}

	try {
		const entityRequest = new EntityRequest({
			uris: params.uri.split('|') ?? [],
			lang: 'fr',
			relatives: [WikiDataTag.Author],
			attributes: ['info', 'labels', 'descriptions', 'image']
		});

		const response = await serverInventaireClient.execute(entityRequest);
		const results: EntitiesResponse = response.data;

		return {
			entity: results.entities[params.uri]
		};
	} catch (err) {
		console.error('Error fetching entities:', err);
		throw new Error('Failed to fetch entity');
	}
};
