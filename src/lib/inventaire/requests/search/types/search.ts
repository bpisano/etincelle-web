import type { EntityType } from '$lib/inventaire/types';

export interface SearchEntity {
	id: string;
	type: EntityType;
	uri: string;
	label: string;
	description?: string;
	image?: string;
	claims?: Record<string, unknown>;
	_score: number;
	_popularity: number;
}

export interface InventaireSearchResponse {
	results: SearchEntity[];
	total: number;
	continue?: number;
}
