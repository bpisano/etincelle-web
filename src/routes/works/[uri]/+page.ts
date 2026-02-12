import { EntityRequest } from '$lib/inventaire';
import { WikiDataTag } from '$lib/wikidata/types';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	const request = new EntityRequest({
		uris: [params.uri],
		lang: 'fr',
		relatives: [WikiDataTag.Author],
		attributes: ['info', 'labels', 'descriptions', 'image']
	});

	const response = await fetch(`/api/inventaire/entities?uris=${encodeURIComponent(params.uri)}`);

	if (!response.ok) {
		throw new Error(`Failed to fetch entity: ${response.statusText}`);
	}

	const data = await response.json();
	const entity = data.entities[params.uri];

	if (!entity) {
		throw new Error('Entity not found');
	}

	return {
		entity
	};
};
