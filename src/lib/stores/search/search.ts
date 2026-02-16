import type { SearchEntity } from '$lib/inventaire/requests/search/types/search';
import { writable } from 'svelte/store';

interface SearchState {
	query: string;
	userInput: string; // Track user's actual typed input
	results: SearchEntity[];
	isOpen: boolean;
	isLoading: boolean;
	error: string | null;
	selectedIndex: number;
	isAutocompleting: boolean; // Track if we're showing autocomplete suggestion
}

function createSearchStore() {
	const { subscribe, set, update } = writable<SearchState>({
		query: '',
		userInput: '',
		results: [],
		isOpen: false,
		isLoading: false,
		error: null,
		selectedIndex: -1,
		isAutocompleting: false
	});

	let searchTimeout: ReturnType<typeof setTimeout>;

	return {
		subscribe,

		setQuery: (query: string) => {
			update((state) => ({
				...state,
				query,
				userInput: query,
				selectedIndex: -1,
				isAutocompleting: false
			}));

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
						selectedIndex: -1
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
			update((state) => {
				if (state.results.length === 0) return state;

				const newIndex =
					state.selectedIndex < 0 ? 0 : (state.selectedIndex + 1) % state.results.length;
				const selectedResult = state.results[newIndex];

				return {
					...state,
					selectedIndex: newIndex,
					query: selectedResult.label,
					isAutocompleting: true
				};
			});
		},

		decrementSelectedIndex: () => {
			update((state) => {
				if (state.results.length === 0) return state;

				// If nothing selected or on first item, deselect and restore user input
				if (state.selectedIndex <= 0) {
					return {
						...state,
						selectedIndex: -1,
						query: state.userInput,
						isAutocompleting: false
					};
				}

				// Otherwise move up one item
				const newIndex = state.selectedIndex - 1;
				const selectedResult = state.results[newIndex];

				return {
					...state,
					selectedIndex: newIndex,
					query: selectedResult.label,
					isAutocompleting: true
				};
			});
		},

		applyAutocomplete: (index: number) => {
			update((state) => {
				if (index < 0 || index >= state.results.length) return state;

				const selectedResult = state.results[index];
				return {
					...state,
					selectedIndex: index,
					query: selectedResult.label,
					isAutocompleting: true
				};
			});
		},

		reset: () => {
			clearTimeout(searchTimeout);
			set({
				query: '',
				userInput: '',
				results: [],
				isOpen: false,
				isLoading: false,
				error: null,
				selectedIndex: -1,
				isAutocompleting: false
			});
		}
	};
}

export const searchStore = createSearchStore();
