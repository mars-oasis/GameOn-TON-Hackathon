<template>
	<view class="min-height">
		<z-tabs :list="tabs" active-color="#18AA5A" value-key="type" :current="current" @change="handleTabs"></z-tabs>
		<view class="color_bg_f8 p_l_r_15">
			<view class="flex-row-between flex_wrap">
				<view v-for="(item,index) in treeData" :key="item.id" class="m_l_r_5 m_b_30">
					<view class="border_radius_15 relative">
						<image v-if="item.img_url" :src="imgPath + item.img_url" mode="aspectFill" style="width: 350rpx;height: 350rpx;display: block;">></image>
						<image v-else src="../../static/images/tree.jpg" mode="aspectFill" style="width: 350rpx;height: 350rpx;display: block;">></image>
						<view class="flex-row-between color_bg_main font_size_16 color_white font_right p_10">
							<text>{{ item.name}}</text>
							<text>{{ item.cost_amount }} </text>
						</view>
						<!-- <view v-if="Number(item.status) >= 3 && Number(item.status) <= 6" class="tip">
							<view v-if="Number(item.status) === 0" class="color_white color_bg_e6 font_size_28 p_l_r_20 p_t_b_10">to be used</view>
							<view v-if="Number(item.status) === 1" class="color_white color_bg_main font_size_28 p_l_r_20 p_t_b_10">using</view>
						</view> -->
					</view>
					
					<view v-if="(Number(userInfo.energy_balance) < item.cost_amount)" class="m_t_15 color_bg_999 color_white text_align_cen p_t_b_10" @click="toBuy(item)">buy</view>
					<blockquote v-else>
						<view v-if="(item.good_type > 1 && item.good_type <100) && item.owner" class="m_t_15 color_bg_999 color_white text_align_cen p_t_b_10">
							swaped
						</view>
						<view v-else class="m_t_15 color_bg_main  color_white text_align_cen p_t_b_10" @click="toBuy(item)">buy</view>
					</blockquote>
				</view>
			</view>
		</view>
		<!-- v-if="popupShow" -->
		<uni-popup  ref="popupRef" type="center" :animation="true"> 
			<view class="flex-col-center p_30" style="background-color: #fff;box-sizing:border-box;border-radius: 50rpx 50rpx 0 0;">
				<image v-if="detail.img_url" :src="imgPath + detail.img_url" mode="aspectFill" style="width: 350rpx;height: 350rpx;display: block;">></image>
				<image v-else src="../../static/images/tree.jpg" mode="aspectFill" style="width: 350rpx;height: 350rpx;display: block;">></image>
				<view class="font_size_30 p_t_b_20">name: {{ detail.name}}</view>
					<view class="font_size_30 p_t_b_20">energy: {{ detail.cost_amount}}</view>
					<view v-if="detail.good_type != 1" class="font_size_30 p_t_b_20">generate energy: {{ detail.output_mul}}</view>
				<view class="flex_center flex">
					<view class="border p_t_b_10 p_l_r_30 m_r_30" @click="close">cancel</view>	
					<view class="color_bg_main color_white p_t_b_10 p_l_r_30" @click="payment">buy</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script setup>
	import { useStore } from '@/store/index.js'
	import { getGoodsData, paymentEnergy } from '@/api/index.js'
	import config from "@/config/index.js"
	import { getCurrentInstance, reactive, ref, computed, onMounted } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	import connect from '@/mixins/connect'
	const { openWallet, sendUsdtTransaction }  = connect
	const popupRef = ref(null)
	const { ctx } = getCurrentInstance()
	const store = useStore()
	const popupShow = ref(false)
	const current = ref(0)
	const imgPath  = config.IMG_PREFIX
	const treeData = ref([]) 
	const trees = ref({}) 
	const detail = ref({})
	const tabs = reactive([
		{index: 1,name: 'props', type: 1},
		{index: 2,name: 'tree', type: 2},
		{index: 3,name: 'sky', type:3},
		{index: 4,name: 'skin', type:4},
		{index: 5,name: 'ornament', type: 5},
		{index: 6,name: 'pet', type: 6},
		{index: 7,name: 'energy', type:100} // goods_type = 100
	])
	const userInfo = computed(() => store.info)
	const recharge = computed(() => store.recharge)
	const myAddress = computed(() => store.myAddress)
	const handleTabs =(index) => {
		current.value = index
		treeData.value = trees.value[tabs[current.value].type]
	}
	const getInitData = () => {
		getGoodsData({
			user_id: userInfo.value.user_id,
			is_store: 1
		}).then(res => {	
			trees.value = res.data
			treeData.value = res.data[tabs[current.value].type]
		})
	}
	
	const payment = () => {
		if (detail.value.good_type === 100) {
			if(myAddress.value) {
				console.log(detail.value.cost_amount)
				console.log(recharge.value)
				sendUsdtTransaction(detail.value.cost_amount, recharge.value)
			} else {
				uni.showModal({
					title: 'tip',
					content: 'go to connect',
					confirmText: 'connect',
					success: (res) => {
						if (res.confirm) {
							openWallet()
						}
					}
					
				})
			}
			
		
		} else {
			
			paymentEnergy({
				good_id: detail.value.good_id,
				user_id: userInfo.value.user_id,
			}).then(res => {
				console.log('res',res)
				uni.showToast({
					title: "Success",
					icon:'none',
				})
			
				getInitData()
				// store.setHomedata({ user_id: userInfo.value.user_id })
				setTimeout(() => {
					close()
				}, 1500)				
			})
		}
	}
	
	const toBuy = (item) => {
		if(Number(userInfo.value.energy_balance) < item.cost_amount) {
			uni.showToast({
				title:"not enough",
				icon: "none"
			})
			return
		}
		// if ((item.good_type > 1 && item.good_type < 100 ) && item.owner) {
		// 	uni.showToast({
		// 		title:"buy~~",
		// 		icon: "none"
		// 	})
		// 	return
		// }
		popupShow.value = true
		detail.value = item
		popupRef.value?.open('bottom')
	}
	const close = () => {
		popupShow.value = false
		// detail.value = {}
		popupRef.value.close()
	}
	
	onLoad(() => {
		getInitData()			
			// uni.showToast({
			// 		title: "success",
			// 		icon:'none',
			// 	})
	})
</script>

<style lang="scss" scoped>
	.content {
		width: 100%;
		height: 100vh;
		background: url('../../static/images/icon.jpg') center;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-clip: cover;
	}
	// .avter-image {
	// 	width: 148rpx;
	// 	height: 148rpx;
	// }
	.tip {
		position: absolute;
		top: 0rpx;
		left:0rpx
	}
	.border {
		border: 2rpx solid #18AA5A;
		border-radius:5rpx;
	}
	
	 
	     

</style>
