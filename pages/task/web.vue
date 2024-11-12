<template>
	<view class="">
		
    <web-view :src="url"></web-view>
	</view>
</template>

<script setup>
	import { onLoad } from '@dcloudio/uni-app'
	
	import { ref } from 'vue';
	
	const url = ref('')
	
	onLoad((opt) => {
		url.value = opt.url
	})
</script>

<style>
</style>