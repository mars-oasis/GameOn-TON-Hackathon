<template>
	<view>
		<view class=" p_l_r_15 p_t_b_30 flex-row-between flex_wrap">
			<view v-for="(item,index) in treeData" :key="item.id" class="m_l_r_5 m_b_30">
				<view>
					<image v-if="item.img_url" :src="imgPath + item.img_url" class="border_radius_15" mode="aspectFill"
						style="width: 350rpx;height: 350rpx;display: block;">></image>
					<image v-else src="../../static/images/tree.jpg" mode="aspectFill"
						style="width: 350rpx;height: 350rpx;display: block;">></image>
				</view>
				<view class="border_radius_15 color_bg_main color_white p_10">
					<text class="">{{ item.name}}</text>
					<text v-if="item.owner" style="text-align:right" class="m_r_10">等级: {{ item.owner.tree_level }} </text>
				</view>

				<view v-if="item.owner">
					<view v-if="item.owner.tree_level === 20"
						class="m_t_15 color_bg_ffff color_main border_radius_15 border text_align_cen p_t_b_10">已达顶级</view>
					<view v-else class="m_t_15 border_radius_15 color_bg_main color_white text_align_cen p_t_b_10"
						@click="handleRefresh(item)">升级还需{{ upgradeTreeConfig[item.owner.tree_level + 1].cost_amount }}g
					</view>
				</view>
				<view v-else class="m_t_15 color_bg_999 color_white text_align_cen border_radius_15 p_t_b_10">未拥有</view>
			</view>
		</view>

		<!-- 占位符 -->
		<view style="height: 200rpx;"></view>
		<!-- 自定义导航栏 -->
		<tabber-list></tabber-list>
		<!-- v-if="popupShow" -->
		<uni-popup ref="popupRef" >
			<view class="flex-col-center p_30"
				style="width:500rpx; background-color: #fff;box-sizing:border-box;border-radius: 20rpx">
				<view class="font_size_30 p_t_20">提示: </view>
				<image v-if="detail.img_url" :src="imgPath + detail.img_url" mode="aspectFill"
					style="width: 350rpx;height: 350rpx;display: block;border-radius: 10rpx;">></image>
				<text lass="font_size_26 p_t_20">{{ detail.name}}</text>
				<view class="font_size_30 p_t_20">Lv.{{detail.owner.tree_level }} -->
					Lv.{{ detail.owner.tree_level +1 }}</view>
				<view class="font_size_30 p_t_20">
					氧气产出/每小时:{{ upgradeTreeConfig[detail.owner.tree_level].output_mul + detail.owner.init_output_mul }}
					--> {{ upgradeTreeConfig[detail.owner.tree_level +1].output_mul + detail.owner.init_output_mul }}
				</view>
				<view class="font_size_30 p_t_20">升级消耗能量:{{ upgradeTreeConfig[detail.owner.tree_level +1].cost_amount }}
				</view>
				<view class="flex_center flex p_t_20">
					<view class="border p_t_b_10 p_l_r_30 m_r_30" @click="close">取消</view>
					<view class="color_bg_main color_white p_t_b_10 p_l_r_30" @click="handleUse">
						{{ detail.good_type === 1 ? '使用': '装扮'}}</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script setup>
	import {
		useStore
	} from '@/store/index.js'
	import {
		getGoodsData,
		upGradeTree
	} from '@/api/index.js'
	import config from "@/config/index.js"
	import {
		getCurrentInstance,
		reactive,
		ref,
		computed,
		onMounted
	} from 'vue'
	import {
		onLoad
	} from '@dcloudio/uni-app'
	const popupRef = ref(null)
	const {
		ctx
	} = getCurrentInstance()
	const store = useStore()
	const popupShow = ref(false)
	const detail = ref({})
	const imgPath = config.IMG_PREFIX
	const treeData = ref([]) // 渲染数据
	const userInfo = computed(() => store.info)
	const upgradeTreeConfig = computed(() => store.upgradeTreeConfig)
	// 初始化数据
	const getInitData = () => {
		getGoodsData({
			user_id: userInfo.value.user_id,
			is_store: 3
		}).then(res => {
			treeData.value = res.data
			// treeData.value = res.data[tabs[current.value].type]
		})
	}

	const handleUse = () => {
		upGradeTree({
			user_id: userInfo.value.user_id,
			good_id: detail.value.good_id
		}).then(res => {
			uni.showToast({
				title: "升级成功",
				icon: 'none',
			})
			getInitData()
			store.setHomedata({
				user_id: userInfo.value.user_id
			})
			setTimeout(() => {
				close()
			}, 1500)
			console.log(res)
		})
	}

	// 装扮
	const handleRefresh = (item) => {
		popupShow.value = true
		detail.value = item
		// ctx.$forceUpdate()
		// ctx.$set(detail.value,)
		popupRef.value?.open('center')
	}
	const close = () => {
		popupShow.value = false
		popupRef.value.close()
		// detail.value = {}
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
		left: 0rpx;
		z-index: 10;
	}

	.border {
		border: 2rpx solid #18AA5A;
		border-radius: 5rpx;
	}
</style>