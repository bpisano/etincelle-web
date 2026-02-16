import { serverInventaireClient } from '$lib/inventaire/client';
import { GetUserRequest } from '$lib/inventaire/requests/user/getUserRequest';
import type { Handle } from '@sveltejs/kit';

const fetchUser = async (sessionCookie: string, sigCookie: string) => {
	const request: GetUserRequest = new GetUserRequest();
	const response = await serverInventaireClient.execute(request, {
		cookie: `inventaire:session=${sessionCookie}; inventaire:session.sig=${sigCookie}`
	});
	return response.data;
};

export const handle: Handle = async ({ event, resolve }) => {
	const sessionCookie = event.cookies.get('inventaire:session');
	const sigCookie = event.cookies.get('inventaire:session.sig');

	if (sessionCookie && sigCookie) {
		try {
			const user = await fetchUser(sessionCookie, sigCookie);
			event.locals.user = user;
		} catch (error) {
			console.error('Error fetching user:', error);
			event.cookies.delete('inventaire:session', { path: '/' });
			event.cookies.delete('inventaire:session.sig', { path: '/' });
		}
	}

	return resolve(event);
};
