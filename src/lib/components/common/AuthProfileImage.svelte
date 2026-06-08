<script lang="ts">
	import AuthImage from '$lib/components/common/AuthImage.svelte';
	import {
		DEFAULT_PROFILE_IMAGE,
		getModelProfileImageSrc,
		getUserProfileImageSrc,
		getWebhookProfileImageSrc
	} from '$lib/utils/profileImage';

	export let model: { id: string; info?: { meta?: { profile_image_url?: string } } } | null = null;
	export let userId: string | null = null;
	export let webhookId: string | null = null;
	export let src: string | null = null;
	export let lang: string | undefined = undefined;
	export let className = '';
	export let alt = '';
	export let fallback = DEFAULT_PROFILE_IMAGE;
	export let loading: 'lazy' | 'eager' | undefined = 'lazy';
	export let draggable: 'true' | 'false' | undefined = 'false';
	export let ariaHidden: boolean | undefined = undefined;

	$: imageSrc =
		src ??
		(model
			? getModelProfileImageSrc(model, lang)
			: userId
				? getUserProfileImageSrc(userId)
				: webhookId
					? getWebhookProfileImageSrc(webhookId)
					: fallback);
</script>

<AuthImage
	src={imageSrc}
	{fallback}
	{className}
	{alt}
	{loading}
	{draggable}
	{ariaHidden}
/>
