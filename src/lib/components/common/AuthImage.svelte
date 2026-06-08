<script lang="ts">
	import { onDestroy } from 'svelte';

	import { WEBUI_BASE_URL } from '$lib/constants';
	import {
		DEFAULT_PROFILE_IMAGE,
		fetchAuthenticatedProfileImage,
		handleProfileImageError,
		isApiProfileImageUrl
	} from '$lib/utils/profileImage';

	export let src = '';
	export let fallback = DEFAULT_PROFILE_IMAGE;
	export let className = '';
	export let alt = '';
	export let loading: 'lazy' | 'eager' | undefined = 'lazy';
	export let draggable: 'true' | 'false' | undefined = 'false';
	export let ariaHidden: boolean | undefined = undefined;

	let resolvedSrc = fallback;
	let objectUrl: string | null = null;
	let loadedKey = '';
	let requestId = 0;

	const normalizeSrc = (url: string) => {
		if (!url) {
			return fallback;
		}

		if (url.startsWith('/') && !url.startsWith('//')) {
			return `${WEBUI_BASE_URL}${url}`;
		}

		return url;
	};

	const revokeObjectUrl = () => {
		if (objectUrl) {
			URL.revokeObjectURL(objectUrl);
			objectUrl = null;
		}
	};

	const load = async () => {
		const normalized = normalizeSrc(src);
		if (!normalized || normalized === loadedKey) {
			return;
		}

		const currentRequest = ++requestId;
		revokeObjectUrl();

		let nextSrc = normalized;

		if (isApiProfileImageUrl(nextSrc)) {
			nextSrc = await fetchAuthenticatedProfileImage(nextSrc, fallback);
		}

		if (currentRequest !== requestId) {
			if (nextSrc.startsWith('blob:')) {
				URL.revokeObjectURL(nextSrc);
			}
			return;
		}

		if (nextSrc.startsWith('blob:')) {
			objectUrl = nextSrc;
		}

		resolvedSrc = nextSrc;
		loadedKey = normalized;
	};

	$: src, fallback, load();

	onDestroy(() => {
		revokeObjectUrl();
	});
</script>

<img
	src={resolvedSrc}
	{alt}
	class={className}
	data-fallback={fallback}
	aria-hidden={ariaHidden}
	{loading}
	{draggable}
	on:error={handleProfileImageError}
/>
