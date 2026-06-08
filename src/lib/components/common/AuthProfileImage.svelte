<script lang="ts">
	import { onDestroy } from 'svelte';

	import {
		DEFAULT_PROFILE_IMAGE,
		DEFAULT_USER_IMAGE,
		fetchAuthenticatedProfileImage,
		getModelProfileImageSrc,
		getUserProfileImageSrc,
		handleProfileImageError,
		isApiProfileImageUrl
	} from '$lib/utils/profileImage';

	export let model: { id: string; info?: { meta?: { profile_image_url?: string } } } | null = null;
	export let userId: string | null = null;
	export let lang: string | undefined = undefined;
	export let className = '';
	export let alt = '';
	export let fallback = DEFAULT_PROFILE_IMAGE;

	let src = fallback;
	let objectUrl: string | null = null;
	let requestId = 0;

	const revokeObjectUrl = () => {
		if (objectUrl) {
			URL.revokeObjectURL(objectUrl);
			objectUrl = null;
		}
	};

	const load = async () => {
		const currentRequest = ++requestId;
		revokeObjectUrl();

		let nextSrc = fallback;

		if (model) {
			nextSrc = getModelProfileImageSrc(model, lang);
		} else if (userId) {
			nextSrc = getUserProfileImageSrc(userId);
		}

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

		src = nextSrc;
	};

	$: model, userId, lang, fallback, load();

	onDestroy(() => {
		revokeObjectUrl();
	});
</script>

<img
	{src}
	{alt}
	class={className}
	data-fallback={fallback}
	on:error={handleProfileImageError}
/>
