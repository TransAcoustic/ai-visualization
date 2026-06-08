import { WEBUI_API_BASE_URL, WEBUI_BASE_URL } from '$lib/constants';

export const DEFAULT_PROFILE_IMAGE = `${WEBUI_BASE_URL}/static/favicon.png`;
export const DEFAULT_USER_IMAGE = `${WEBUI_BASE_URL}/static/user.png`;

export const isApiProfileImageUrl = (url: string) => url.includes('/api/');

export const getModelProfileImageSrc = (
	model: { id: string; info?: { meta?: { profile_image_url?: string } } },
	lang?: string
): string => {
	const staticUrl = model?.info?.meta?.profile_image_url;

	if (staticUrl?.startsWith('/static/')) {
		return `${WEBUI_BASE_URL}${staticUrl}`;
	}

	if (staticUrl?.startsWith('data:')) {
		return staticUrl;
	}

	const params = new URLSearchParams({ id: model.id });
	if (lang) {
		params.set('lang', lang);
	}

	return `${WEBUI_API_BASE_URL}/models/model/profile/image?${params.toString()}`;
};

export const getUserProfileImageSrc = (userId: string): string => {
	return `${WEBUI_API_BASE_URL}/users/${userId}/profile/image`;
};

export const getWebhookProfileImageSrc = (webhookId: string): string => {
	return `${WEBUI_API_BASE_URL}/channels/webhooks/${webhookId}/profile/image`;
};

const inflightProfileImageRequests = new Map<string, Promise<string>>();

export const fetchAuthenticatedProfileImage = async (
	url: string,
	fallback = DEFAULT_PROFILE_IMAGE
): Promise<string> => {
	const existing = inflightProfileImageRequests.get(url);
	if (existing) {
		return existing;
	}

	const request = (async () => {
		const token = localStorage.token;

		if (!token) {
			return fallback;
		}

		try {
			const response = await fetch(url, {
				headers: { Authorization: `Bearer ${token}` },
				credentials: 'include'
			});

			if (!response.ok) {
				return fallback;
			}

			const blob = await response.blob();
			return URL.createObjectURL(blob);
		} catch {
			return fallback;
		}
	})();

	inflightProfileImageRequests.set(url, request);

	try {
		return await request;
	} finally {
		inflightProfileImageRequests.delete(url);
	}
};

export const handleProfileImageError = (event: Event) => {
	const target = event.currentTarget as HTMLImageElement | null;
	if (!target) {
		return;
	}

	const fallback = target.dataset.fallback ?? DEFAULT_PROFILE_IMAGE;

	if (target.src.endsWith(fallback) || target.dataset.fallbackApplied === 'true') {
		return;
	}

	target.dataset.fallbackApplied = 'true';
	target.src = fallback;
};

export const handleImageError = handleProfileImageError;
