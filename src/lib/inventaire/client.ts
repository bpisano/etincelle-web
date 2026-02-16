import type { InventaireIORequest } from './types';
import { InventaireIOError } from './types';

export type InventaireResponse<T> = {
	data: T;
	raw: Response;
};

export class InventaireIOClient {
	private baseURL: string;
	private userAgent: string;

	constructor(
		baseURL: string = 'https://inventaire.io/api',
		userAgent: string = 'Etincelle-Web/1.0'
	) {
		this.baseURL = baseURL;
		this.userAgent = userAgent;
	}

	async execute<TResponse>(
		request: InventaireIORequest<TResponse>,
		headers: Record<string, string> = {}
	): Promise<InventaireResponse<TResponse>> {
		try {
			const params = request.buildParams();
			const url = `${this.baseURL}/${request.endpoint}?${params.toString()}`;

			const fetchOptions: RequestInit = {
				method: request.method,
				headers: {
					'User-Agent': this.userAgent,
					Accept: 'application/json',
					...headers
				}
			};

			if (request.buildBody) {
				const body = request.buildBody();
				if (body instanceof URLSearchParams) {
					fetchOptions.body = body;
					fetchOptions.headers = {
						...fetchOptions.headers,
						'Content-Type':
							(fetchOptions.headers as Record<string, string>)['Content-Type'] ??
							'application/x-www-form-urlencoded'
					};
				} else if (body instanceof FormData) {
					fetchOptions.body = body;
				} else {
					fetchOptions.body = JSON.stringify(body);
					fetchOptions.headers = {
						...fetchOptions.headers,
						'Content-Type':
							(fetchOptions.headers as Record<string, string>)['Content-Type'] ?? 'application/json'
					};
				}
			}

			const response = await fetch(url, fetchOptions);

			if (!response.ok) {
				throw new InventaireIOError(`API request failed: ${response.statusText}`, response.status);
			}

			const data = await response.json();
			return {
				data: request.parseResponse(data),
				raw: response
			};
		} catch (error) {
			if (error instanceof InventaireIOError) {
				throw error;
			}

			throw new InventaireIOError('Failed to execute request', undefined, error);
		}
	}
}

export const serverInventaireClient = new InventaireIOClient('https://inventaire.io/api');
