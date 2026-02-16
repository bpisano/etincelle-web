import { serverInventaireClient } from '$lib/inventaire/client';
import { LoginRequest } from '$lib/inventaire/requests/auth/loginRequest';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import parseSetCookie from 'set-cookie-parser';

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const form: FormData = await request.formData();
		const username: string = form.get('username')?.toString() ?? '';
		const password: string = form.get('password')?.toString() ?? '';

		const loginRequest: LoginRequest = new LoginRequest({ username, password });

		try {
			const res = await serverInventaireClient.execute(loginRequest);

			const setCookieHeader: string | null = res.raw.headers.get('set-cookie');
			if (!setCookieHeader) {
				return fail(500, 'No session cookie received from server');
			}

			const parsedCookies = parseSetCookie(setCookieHeader, { map: true });
			const session = parsedCookies['inventaire:session']?.value;
			const sig = parsedCookies['inventaire:session.sig']?.value;
			const isLoggedIn = parsedCookies['loggedIn']?.value === 'true';
			if (!session || !sig) {
				return fail(500, 'Session cookies not found in server response');
			}

			cookies.set('inventaire:session', session, {
				path: '/',
				httpOnly: true,
				sameSite: 'lax',
				secure: true
			});
			cookies.set('inventaire:session.sig', sig, {
				path: '/',
				httpOnly: true,
				sameSite: 'lax',
				secure: true
			});
			cookies.set('loggedIn', isLoggedIn.toString(), {
				path: '/',
				httpOnly: true,
				sameSite: 'lax',
				secure: true
			});
		} catch (error) {
			console.error('Login failed:', error);
			return fail(401, 'Invalid username or password');
		}

		throw redirect(302, '/');
	}
};
