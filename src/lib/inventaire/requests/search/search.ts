import type {
	InventaireSearchResponse,
	SearchEntity
} from '$lib/inventaire/requests/search/types/search';
import type { InventaireIORequest } from '../../types';
import { EntityType } from '../../types';

export interface SearchRequestParams {
	query: string;
	types?: EntityType[];
	limit?: number;
	lang?: string;
}

export class SearchRequest implements InventaireIORequest<SearchEntity[]> {
	endpoint = 'search';
	method = 'GET' as const;

	private params: SearchRequestParams;

	constructor(params: SearchRequestParams) {
		this.params = params;
	}

	buildParams(): URLSearchParams {
		const urlParams = new URLSearchParams({
			search: this.params.query,
			limit: (this.params.limit ?? 10).toString(),
			lang: this.params.lang ?? 'fr'
		});

		const types = this.params.types ?? Object.values(EntityType);
		types.forEach((type) => {
			urlParams.append('types', type);
		});

		return urlParams;
	}

	parseResponse(data: unknown): SearchEntity[] {
		const response = data as InventaireSearchResponse;
		return response.results;
	}
}
