import { serverInventaireClient } from '$lib/inventaire/client';
import { LoginRequest } from '$lib/inventaire/requests/auth/loginRequest';
import { fail, redirect, type Actions } from '@sveltejs/kit';

const getCookieNamed = (cookieString: string, name: string): string | null => {
	const cookies = cookieString.split(';');
	for (const cookie of cookies) {
		const [cookieName, cookieValue] = cookie.trim().split('=');
		if (cookieName === name) {
			return cookieValue;
		}
	}
	return null;
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const form: FormData = await request.formData();
		const username: string = form.get('username')?.toString() ?? '';
		const password: string = form.get('password')?.toString() ?? '';

		const loginRequest: LoginRequest = new LoginRequest({ username, password });

		try {
			const res = await serverInventaireClient.execute(loginRequest);
			const sessionName: string = 'inventaire:session';

			const setCookieHeader: string | null = res.raw.headers.get('set-cookie');
			if (!setCookieHeader) {
				return fail(500, 'No session cookie received from server');
			}
			const sessionValue: string | null = getCookieNamed(setCookieHeader, sessionName);
			if (!sessionValue) {
				return fail(500, 'Session cookie not found in server response');
			}

			const cookiesArray = setCookieHeader.split(/,(?=\s*\w+=)/);
			cookiesArray.forEach((c) => {
				const match = c.match(/^\s*([^=]+)=([^;]+);?.*$/);
				if (match) {
					const [_, key, value] = match;
					cookies.set(key, value, {
						path: '/',
						httpOnly: true,
						sameSite: 'lax',
						secure: true
					});
				}
			});
		} catch (error) {
			console.error('Login failed:', error);
			return fail(401, 'Invalid username or password');
		}

		throw redirect(302, '/');
	}
};
