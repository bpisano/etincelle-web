import type { User } from '$lib/stores/user/models/user';
import { writable, type Writable } from 'svelte/store';

export type UserStoreState = {
	user: User | null;
};

function createUserStore() {
	const { subscribe, set, update }: Writable<UserStoreState> = writable({
		user: null
	});

	return {
		subscribe,
		setUser: (user: User) => set({ user }),
		clearUser: () => set({ user: null })
	};
}

export const userStore = createUserStore();
