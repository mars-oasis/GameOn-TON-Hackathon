<template>
	<view class="p_30">
		<view class="">
			
		</view>
		<view class="p_t_40" @click="toHome">
		
		</view>
		
	</view>
</template>
 
<script setup>
	const toHome = () => {
		uni.switchTab({
			url:'/pages/index/index'
		})
	}
</script>

<style>
</style>
