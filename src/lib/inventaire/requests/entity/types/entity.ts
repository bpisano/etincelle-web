import type { EntityType } from '$lib/inventaire/types';

export interface EntityImage {
	url: string;
	file?: string;
	credits?: {
		text: string;
		url: string;
	};
}

export interface Entity {
	uri: string;
	lastrevid: number;
	type: EntityType;
	originalLang?: string;
	labels: Record<string, string>;
	descriptions: Record<string, string>;
	image?: EntityImage;
	claims?: Record<string, unknown>;
}

export interface EntitiesResponse {
	entities: Record<string, Entity>;
	redirects: Record<string, string>;
}
