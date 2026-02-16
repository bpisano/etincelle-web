import type { InventaireIORequest } from '$lib/inventaire/types';
import type { User } from '$lib/stores/user/models/user';

export class GetUserRequest implements InventaireIORequest<User> {
	endpoint = 'user';
	method = 'GET' as const;

	buildParams(): URLSearchParams {
		return new URLSearchParams();
	}

	parseResponse(data: unknown): User {
		return data as User;
	}
}
