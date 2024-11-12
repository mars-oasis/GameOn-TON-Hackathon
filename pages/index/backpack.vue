<template>
	<view class="min-height">
		<z-tabs :list="tabs" active-color="#18AA5A" value-key="type" :current="current" @change="handleTabs"></z-tabs>
		<view class="color_bg_f8 p_l_r_15">
			<view class="flex-row-between flex_wrap">
				<view v-for="(item,index) in treeData" :key="item.id" class="m_l_r_5 m_b_30">
					<view class="border_radius_15 relative">
						<image :src="matchValue(item.good_id, 2)" mode="aspectFill" style="width: 350rpx;height: 350rpx;display: block;">></image>
						<!-- <image v-else src="../../static/images/tree.jpg" mode="aspectFill" style="width: 350rpx;height: 350rpx;display: block;">></image> -->
						<view class="flex-row-between color_bg_main font_size_16 color_white font_right p_10">
							<text>{{ matchValue(item.good_id, 1) }}</text>
							<text v-if="item.good_type === 1">{{ item.use_count }} / {{item.all_count}} </text>
						</view>
						<!-- <view v-if="item.good_type != 1"  class="tip">
							<view v-if="Number(item.status) === 0" class="color_white color_bg_warning font_size_24 p_l_r_15 p_t_b_10">to be used</view>
							<view v-if="Number(item.status) === 1" class="color_white color_bg_main font_size_24 p_l_r_15 p_t_b_10">using</view>
						</view> -->
					</view>
					<blockquote v-if="item.good_type === 1">
						<view v-if="item.use_count >= item.all_count" class="m_t_15 color_bg_999 color_white text_align_cen p_t_b_10">none</view>
						<view v-else class="m_t_15 color_bg_main color_white text_align_cen p_t_b_10" @click="handleDress(item)">use</view>
					</blockquote>
					<blockquote v-else>
						<view v-if="Number(item.status) === 0"  class="m_t_15 color_bg_main color_white text_align_cen p_t_b_10" @click="handleDress(item)">decorate</view>
						<view v-if="Number(item.status) === 1" class="m_t_15 color_bg_999 color_white text_align_cen p_t_b_10" @click="handleDress(item)">cancel</view>
					</blockquote>
				</view>
			</view>
		</view>
		<!-- v-if="popupShow" -->
		<uni-popup ref="popupRef" type="center" :animation="true"> 
			<view class="flex-col-center p_30" style="width:500rpx; background-color: #fff;box-sizing:border-box;border-radius: 20rpx">
				<view class="">tip</view>
				<view class="flex_center flex p_t_20">
					<view class="border p_t_b_10 p_l_r_30 m_r_30" @click="close">cancel</view>						
					<view v-if="detail.good_type === 1" class="color_bg_main color_white p_t_b_10 p_l_r_30" @click="handleUse">use</view>
					<blockquote v-else>
						<view class="color_bg_main color_white p_t_b_10 p_l_r_30" @click="handleUse">{{ detail.status === 1 ? 'cancel': 'decorate'}}</view>
					</blockquote>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script setup>
	import { useStore } from '@/store/index.js'
	import { getGoodsData, paymentEnergy, useGoods } from '@/api/index.js'
	import config from "@/config/index.js"
	import { getCurrentInstance, reactive, ref, computed, onMounted } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	const popupRef = ref(null)
	const { ctx } = getCurrentInstance()
	const store = useStore()
	const popupShow = ref(false)
	const current = ref(0)
	const detail = ref({})
	const imgPath = config.IMG_PREFIX
	const treeData = ref([])
	const trees = ref({}) 
	const tabs = reactive([
		{index: 1,name: 'Trees', type: 1},
		{index: 3,name: 'Backgrounds', type:3},
		{index: 4,name: 'Skins', type:4},
		{index: 5,name: 'Ornament', type: 5},
		{index: 6,name: 'Pets', type: 6},
	])
	const userInfo = computed(() => store.info)
	const storeGoodsData = computed(() => store.storeGoodsList)
	

	const matchValue = (good_id, type) => {
		if (type === 1) {
			return storeGoodsData.value[good_id].name
		} else {
			return imgPath + storeGoodsData.value[good_id].img_url
		}
	}

	const handleTabs =(index) => {
		current.value = index
		treeData.value = trees.value[tabs[current.value].type]
	}

	const getInitData = () => {
		getGoodsData({
			user_id: userInfo.value.user_id,
			is_store: 2
		}).then(res => {	
			trees.value = res.data
			treeData.value = res.data[tabs[current.value].type]
		})
	}
	
	const handleUse = () => {
	
		useGoods({
			good_id: detail.value.good_id,
			user_id: userInfo.value.user_id,
			is_cancel: detail.value.good_type === 1 ? undefined : detail.value.status
		}).then(res => {
			console.log(res.data)
			uni.showToast({
				title: res.data,
				icon:'none'
			})
			
			getInitData()
			store.setHomedata({ user_id: userInfo.value.user_id })
			setTimeout(() => {
				close()
			}, 1500)
		})
	}
	
	
	const handleDress = (item) => {
		if (item.good_type === 1) {
			if (item.all_count <= item.use_count) return
		} 
		// else{
		// 	if(item.status === 1) return 
		// }
		popupShow.value = true
		detail.value = item
		popupRef.value?.open('center')
	}
	const close = () => {
		popupShow.value = false
		// detail.value = {}
		popupRef.value.close()
	}
	
	onLoad(() => {
		getInitData()
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
		left:0rpx;
		z-index: 10;
	}
	.border {
		border: 2rpx solid #18AA5A;
		border-radius:5rpx;
	}
	
	 
	     

</style>
