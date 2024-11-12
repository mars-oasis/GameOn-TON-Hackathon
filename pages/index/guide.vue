<template>
	<view class="p_30">
		<view class="">
			加上轮播图以及新手指引
		</view>
		<view class="p_t_40" @click="toHome">
			点击去首页
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