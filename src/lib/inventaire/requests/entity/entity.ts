import type { EntitiesResponse } from '$lib/inventaire/requests/entity/types/entity';
import type { InventaireIORequest } from '$lib/inventaire/types';

export interface EntityRequestParams {
	uris: string[];
	lang?: string;
	relatives?: string[];
	attributes?: string[];
}

export class EntityRequest implements InventaireIORequest<EntitiesResponse> {
	endpoint = 'entities';
	method = 'GET' as const;

	constructor(private params: EntityRequestParams) {}

	buildParams(): URLSearchParams {
		const urlParams = new URLSearchParams({
			action: 'by-uris',
			uris: this.params.uris.join('|'),
			lang: this.params.lang ?? 'fr'
		});

		const attributes = this.params.attributes ?? ['info', 'labels', 'descriptions', 'image'];
		attributes.forEach((attr) => {
			urlParams.append('attributes', attr);
		});

		if (this.params.relatives) {
			this.params.relatives.forEach((rel) => {
				urlParams.append('relatives', rel);
			});
		}

		return urlParams;
	}

	parseResponse(data: unknown): EntitiesResponse {
		return data as EntitiesResponse;
	}
}
