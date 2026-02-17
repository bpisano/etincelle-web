import { redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	logout: async ({ cookies }) => {
		cookies.delete('inventaire:session', { path: '/' });
		cookies.delete('inventaire:session.sig', { path: '/' });
		cookies.delete('loggedIn', { path: '/' });

		throw redirect(302, '/');
	}
};
