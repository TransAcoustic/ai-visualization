<script lang="ts">
	import { onDestroy } from 'svelte';

	import {
		DEFAULT_PROFILE_IMAGE,
		fetchAuthenticatedProfileImage,
		getModelProfileImageSrc
	} from '$lib/utils/profileImage';

	export let model: { id: string; info?: { meta?: { profile_image_url?: string } } } | null = null;
	export let lang: string | undefined = undefined;
	export let className = '';

	let backgroundImage = '';
	let objectUrl: string | null = null;
	let loadedKey = '';

	const load = async () => {
		if (!model?.id) {
			backgroundImage = '';
			return;
		}

		const key = `${model.id}:${lang ?? ''}`;
		if (key === loadedKey) {
			return;
		}

		if (objectUrl) {
			URL.revokeObjectURL(objectUrl);
			objectUrl = null;
		}

		const apiUrl = `${getModelProfileImageSrc(model, lang)}&voice=true`;
		const nextSrc = await fetchAuthenticatedProfileImage(apiUrl, DEFAULT_PROFILE_IMAGE);

		if (nextSrc.startsWith('blob:')) {
			objectUrl = nextSrc;
		}

		backgroundImage = nextSrc ? `url('${nextSrc}')` : '';
		loadedKey = key;
	};

	$: model, lang, load();

	onDestroy(() => {
		if (objectUrl) {
			URL.revokeObjectURL(objectUrl);
		}
	});
</script>

<div
	class="{className} rounded-full bg-cover bg-center bg-no-repeat"
	style={backgroundImage ? `background-image: ${backgroundImage};` : undefined}
/>
