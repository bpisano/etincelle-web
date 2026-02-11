import type { SearchEntity } from '$lib/inventaire/requests/search/types/search';
import { writable } from 'svelte/store';

interface SearchState {
	query: string;
	results: SearchEntity[];
	isOpen: boolean;
	isLoading: boolean;
	error: string | null;
	selectedIndex: number;
}

function createSearchStore() {
	const { subscribe, set, update } = writable<SearchState>({
		query: '',
		results: [],
		isOpen: false,
		isLoading: false,
		error: null,
		selectedIndex: 0
	});

	let searchTimeout: ReturnType<typeof setTimeout>;

	return {
		subscribe,

		setQuery: (query: string) => {
			update((state) => ({ ...state, query }));

			// Clear existing timeout
			clearTimeout(searchTimeout);

			// Clear results if query too short
			if (query.trim().length < 2) {
				update((state) => ({
					...state,
					results: [],
					isOpen: false,
					error: null
				}));
				return;
			}

			// Debounce search
			update((state) => ({ ...state, isLoading: true, error: null }));
			searchTimeout = setTimeout(async () => {
				try {
					const response = await fetch(
						`/api/inventaire/search?q=${encodeURIComponent(query.trim())}`
					);

					if (!response.ok) {
						throw new Error(`Search failed: ${response.statusText}`);
					}

					const results: SearchEntity[] = await response.json();

					update((state) => ({
						...state,
						results,
						isLoading: false,
						isOpen: true,
						selectedIndex: 0
					}));
				} catch (err) {
					update((state) => ({
						...state,
						error: err instanceof Error ? err.message : 'Failed to search',
						results: [],
						isLoading: false
					}));
				}
			}, 300);
		},

		setOpen: (isOpen: boolean) => {
			update((state) => ({ ...state, isOpen }));
		},

		setSelectedIndex: (index: number) => {
			update((state) => ({ ...state, selectedIndex: index }));
		},

		incrementSelectedIndex: () => {
			update((state) => ({
				...state,
				selectedIndex:
					state.results.length > 0 ? (state.selectedIndex + 1) % state.results.length : 0
			}));
		},

		decrementSelectedIndex: () => {
			update((state) => ({
				...state,
				selectedIndex:
					state.results.length > 0
						? (state.selectedIndex - 1 + state.results.length) % state.results.length
						: 0
			}));
		},

		reset: () => {
			clearTimeout(searchTimeout);
			set({
				query: '',
				results: [],
				isOpen: false,
				isLoading: false,
				error: null,
				selectedIndex: 0
			});
		}
	};
}

export const searchStore = createSearchStore();
