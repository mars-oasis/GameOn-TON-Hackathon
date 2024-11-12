<template>
	<view class="tabbar">
		<view v-for="(item,index) in tab" :key="index" @click="changeCheck(item,index)" :class="['flex-col-center', 'tabber-item', current === index ? 'button_bg_active' : 'button_bg']">
			<image :src="item.icon" mode="aspectFill" class="icon"></image>
			<view :class="['font_size_14', 'p_t_15', current === index ? 'color_9a': 'color_24']">{{ item.text }}</view>
		</view>
	</view>
</template>

<script setup>
	import { useStore } from '@/store/index.js'
	import { ref,computed } from 'vue'
	const store = useStore()
	const current = computed(() => store.currentTab)
	const tab = ref([{
		pagePath: "/pages/index/index",
		text: "HOME",
		icon: '../../static/tabbars/home.png',
		selectedIcon: ''
	},{
		pagePath: "/pages/forest/index",
		text: "TREES",
		icon: '../../static/tabbars/trees.png',
		selectedIcon: ''
	},{
		pagePath: "/pages/task/index",
		text: "TASKS",
		icon: '../../static/tabbars/tasks.png',
		selectedIcon: ''
	},{
		pagePath: "/pages/friend/index",
		text: "FRENS",
		icon: '../../static/tabbars/frens.png',
		selectedIcon: ''
	}, {
		pagePath: "/pages/wallet/index",
		text: "WALLET",
		icon: '../../static/tabbars/wallet.png',
		selectedIcon: ''
	}])
	
	const changeCheck = (item,index) => {
		store.SEt_CURRENT_TAB(index)
		// current.value = index
		uni.navigateTo({
			url: item.pagePath
		})
		// uni.navigateTo({
		// 	url: item.pagePath
		// })
	}
</script>

<style scoped lang="scss">
	.tabbar {
	  position: fixed;
		bottom: 30rpx;
		left: 30rpx; 	
		right: 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		z-index: 9999999;
		// padding-bottom: constant(safe-area-inset-bottom);/*兼容 IOS<11.2*/
		// padding-bottom: calc(30rpx + env(safe-area-inset-bottom)); /*兼容 IOS>11.2*/
		background: #EFEDD3;
		box-shadow: 0rpx 9rpx 0rpx 0rpx rgba(67,76,80,0.36);
		border-radius: 30rpx;
		border: 2px solid rgba(95,172,39,0.5);
		padding: 24rpx 30rpx;
		box-sizing: border-box;
	}
	.icon {
		// width: 58rpx;
		// height: 47rpx;
		width: 40rpx;
		height: 40rpx;
	}
	.tabber-item {
		padding: 15rpx 30rpx;
		box-sizing: border-box;
		// background: rgba(235,233,200,0);
		// box-shadow: 0rpx 6rpx 6rpx 0rpx rgba(0,0,0,0.25), 1rpx 1rpx 4rpx 0rpx rgba(0,0,0,0.5), 0rpx 5rpx 8rpx 0rpx rgba(145,134,132,0.35), 0rpx 5rpx 8rpx 0rpx rgba(145,134,132,0.35);
		border-radius: 24rpx;
	}
	.button_bg {
		background: url('../../static/icon/button-bg.png') no-repeat;
		background-clip: cover;
		background-size: 100% 100%;
	}
	.button_bg_active {
		background: url('../../static/icon/button-bg-active.png') no-repeat;
		background-clip: cover;
		background-size: 100% 100%;
	}
</style>