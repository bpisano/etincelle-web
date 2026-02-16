export interface InventaireIORequest<TResponse> {
	endpoint: string;
	method: 'GET' | 'POST';
	buildParams(): URLSearchParams;
	buildBody?(): URLSearchParams | FormData | Record<string, unknown>;
	parseResponse(data: unknown): TResponse;
}

export class InventaireIOError extends Error {
	constructor(
		message: string,
		public statusCode?: number,
		public originalError?: unknown
	) {
		super(message);
		this.name = 'InventaireIOError';
	}
}

export enum EntityType {
	Works = 'works',
	Humans = 'humans',
	Genres = 'genres',
	Publishers = 'publishers',
	Series = 'series',
	Collections = 'collections',
	Movements = 'movements'
}
