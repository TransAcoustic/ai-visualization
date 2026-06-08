<script>
	import { WEBUI_BASE_URL } from '$lib/constants';
	import { shortCodesToEmojis } from '$lib/stores';
	import AuthImage from '$lib/components/common/AuthImage.svelte';
	import { DEFAULT_PROFILE_IMAGE } from '$lib/utils/profileImage';

	export let shortCode;
	export let className = 'size-4';
</script>

{#if $shortCodesToEmojis[shortCode]}
	<AuthImage
		src="{WEBUI_BASE_URL}/assets/emojis/{$shortCodesToEmojis[shortCode].toLowerCase()}.svg"
		alt={shortCode}
		className={className}
		fallback={DEFAULT_PROFILE_IMAGE}
	/>
{:else}
	<div>
		{shortCode}
	</div>
{/if}
