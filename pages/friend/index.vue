<template>
	<view class="color_bg_f8 min-height">
		<z-tabs :list="tabs" active-color="#18AA5A" value-key="type" :current="current" @change="handleTabs"></z-tabs>
		<view v-if="current < 2" class="p_30">
			<view v-for="(item,index) in list" :key="item.id" @longpress="remove(item)" class="p_20 flex-row-between m_b_20 hairline relative" @click="handleDetail(item)">
				<view class="flex-row-left">
					<view v-if="current != 2"  class="p_r_20 font_size_28">{{ index + 1 }}</view>
					<image src="../../static/tabbars/me.png" mode="aspectFill" style="width: 40rpx;height: 40rpx;"></image>
					<view class="p_l_20">
						<view class="font_size_28">{{ item.first_name }}</view>
					</view>
				</view>
				<view v-if="current != 2" class="font_size_28">{{ item.oxygen_balance.toFixed(2)}}</view>
				<!-- 0: 没有可偷取的能量球，1:有可偷取的能量球 -->
				<image v-if="current === 0 && item.now_can_steal === 1"  src="../../static/images/shou.png" mode="aspectFill" class="tip-icon"></image>
			</view>
		</view>
		
		<view v-else class="p_l_r_30">
			<view class="color_bg_f8 border_radius_20">
				<view class="p_30 m_b_30 color_bg_white">我的要求奖励: {{allEnerger}}</view>
				<view class="p_30 color_bg_white">
					<view class="font_size_44">通过链接邀请</view>
					<view class="flex-row-between p_b_30 hairline_bottom">
						<view class="font_size_28 p_t_20">链接:  https://t.me/my1gametestbot/mygame1?startapp=eem9cl</view>
						<view class="color_main font_size_28 flex_shrink" @click="copy(1)">复制</view>
					</view>
					<view class="flex-row-between p_b_30 hairline_bottom">
						<view class="font_size_28 p_t_20">邀请码:  {{ userInfo.invite_code }}</view>
						<view class="color_main font_size_28" @click="copy(2)">复制</view>
					</view>
				</view>
				
				<view class="p_30 color_bg_white">
					<view class="font_size_44">通过记录</view>
					<view class="flex-row-between">
						<view class="font_size_28 flex_1">
							UID
						</view>
						<view class="font_size_28 flex_1">
							结算时间
						</view>
						<view class="font_size_28 flex_1">
							获得氧气
						</view>
					</view>
					<view v-if="list.length > 0"  class="">
						<view  v-for="item in list" :key="item.tx_id"  class="flex-row-between">
							<view class="font_size_28 flex_1">
								{{ item.invite_code }}
							</view>
							<view class="font_size_28 flex_1">
								{{ item.create_time }}
							</view>
							<view class="font_size_28 flex_1">
								{{ item.oxygen_to_super }}
							</view>
						</view>
					</view>
					<view v-else class="color_99 p_t_30">
						暂无邀请数据
					</view>
				</view>
			</view>
		</view>
		
		<uni-fab
			:pattern="
				{
					color: '#fff',
					backgroundColor: '#18AA5A',
					selectedColor: '#18AA5A',
					buttonColor: '#18AA5A',
					iconColor: '#fff'
				}
			"
			vertical="bottom"
			horizontal="right"
			@fabClick="fabClick"
		></uni-fab>
		<!-- 占位符 -->
		<view style="height: 200rpx;"></view>
		<!-- 自定义导航栏 -->
		<tabber-list></tabber-list>
	</view>
</template>
<script setup>
	import { ref,computed } from 'vue';
	import { onLoad, onShow } from '@dcloudio/uni-app'
	import { useStore } from '@/store/index.js'
	import { copyText } from "@/mixins/copy"
	import {getFriend, agreeFriendAdd, myinvatedList } from '@/api/index.js'

	const popupShow = ref(false)
	const popupRef = ref(null)
	const current = ref(0)
	const list = ref([])
	let allEnerger = ref(0)

	const tabs =ref([
		{ id: 0, name: '好友榜单'},
		{ id: 1, name: '世界榜单'},
		{ id: 2, name: '邀请好友'}
	])
	
	const store = useStore()
	const userInfo = computed(() => store.info)
	
	const copy = (type) => {
		let data = ''
		if (type === 1) {
			data = ' https://t.me/my1gametestbot/mygame1?startapp=eem9cl'
		} else {
			data = userInfo.value.invite_code
		}
		copyText(data)
		console.log(type)
	}
	
	const handleDetail = (item) => {
		if(current.value === 1) return
		uni.navigateTo({
			url:`/pages/friend/detail?userId=${item.user_id}&protectExpiredTime=${item.protect_expired_time}`
		})
	}
	
	const fabClick = () => {
		// console.log('add')
		uni.navigateTo({
			url: '/pages/friend/add'
		})
	}
	
	// 通过好友
	const agreeFriend = (item) => {
		popupShow.value = true
		detail.value = item
		popupRef.value?.open('center')
	}
	
	// 切换tabs
	const handleTabs = (index) => {
		list.value = []
		current.value = index
		// 重新获取数据
		if (current.value <=1) {
			getFriendData()
		} else {
			getMyinvatedData()
		}
	}
	
	// 获取好友列表
	const getFriendData = () => {
		const friend_type = 
		getFriend({
			user_id: userInfo.value.user_id,
			friend_type: current.value === 0 ? 1: 2, // 1 我的好友 2 全网用户
		}).then(res => { 
			list.value = res.data
		})
	}
	// 获取申请的好友
	const getMyinvatedData = () => {
		myinvatedList({
			user_id: userInfo.value.user_id
		}).then(res => {
			if(res.data.length > 0 && current.value === 2) {
				res.data.forEach((item) => {
					allEnerger.value = allEnerger.value + item.oxygen_to_super
				})
			}
		})
	}
	
	onShow(() => {
		if (current.value <=1) {
			getFriendData()
		} else {
			getMyinvatedData()
		}
	})
	
	// onLoad(() => {
	
	// })
	
	
</script>

<style lang="scss" scoped>
	.tip-icon {
		width: 40rpx;
		height: 40rpx;
		position: absolute;
		top: 0;
		right: 0rpx;
	}
</style>