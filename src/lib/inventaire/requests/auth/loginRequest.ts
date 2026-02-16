import type { InventaireIORequest } from '$lib/inventaire/types';

export interface LoginRequestParams {
	username: string;
	password: string;
}

export class LoginRequest implements InventaireIORequest<void> {
	endpoint = 'auth';
	method = 'POST' as const;

	constructor(private params: LoginRequestParams) {}

	buildParams(): URLSearchParams {
		return new URLSearchParams({
			action: 'login'
		});
	}

	buildBody(): Record<string, unknown> {
		return {
			username: this.params.username,
			password: this.params.password
		};
	}

	parseResponse(_: unknown): void {}
}
