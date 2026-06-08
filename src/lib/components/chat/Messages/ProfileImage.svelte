<script lang="ts">
	import AuthImage from '$lib/components/common/AuthImage.svelte';
	import { DEFAULT_PROFILE_IMAGE } from '$lib/utils/profileImage';
	import { safeImageUrl } from '$lib/utils/safeImageUrl';

	export let className = 'size-8';
	export let src = DEFAULT_PROFILE_IMAGE;

	$: safeSrc = safeImageUrl(src);
</script>

<AuthImage
	src={safeSrc}
	className="{className} object-cover rounded-full"
	alt="profile"
	ariaHidden={true}
	loading={undefined}
	draggable="false"
/>
