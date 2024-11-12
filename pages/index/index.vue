<template>
	<view class="relative page-home">

		<p class="langInner" @click="handleCh($i18n)">
			中文
		</p>
		<view class="langInner" @click="handleEn($i18n)">
			英文
		</view>
		<view class="p_t_40 font_size_32" @click="closeWallet">
			{{ $t("r_renwu")}}
		</view>
		<view class="p_t_40 font_size_32" @click="closeWallet">
			{{ $i18n.locale}}
		</view>
		<image src="../../static/icon/home.jpg" mode="aspectFill" class="home_bg"></image>

		<view class="flex_1">
			<view class="flex-row-between p_30">
				<view class="relative flex-row-left">
					<image src="../../static/icon/avatar-bg.png" mode="aspectFill"
						style="width: 302rpx; height: 169rpx;"></image>
					<image src="../../static/img/energy.png" mode="aspectFill" class="avatar"></image>
					<view class="font_size_20 color_eb avatar-title">{{ userInfo.first_name }}</view>
					<view class="color_001 font_size_17 avatar-text">UID: {{ userInfo.invite_code }}</view>
					<view v-if="myAddress" class="avatar-connect flex-row-left p_15" @click="closeWallet">
						<image src="../../static/icon/link.png" mode="aspectFill" style="width: 10rpx;height: 10rpx;">
						</image>
						<view class="font_size_17 color_1d p_l_10">Ton Connect</view>
					</view>
					<view v-else class="avatar-connect flex-row-left p_15" @click="openWallet">
						<image src="../../static/icon/disconnect.png" mode="aspectFill"
							style="width: 10rpx;height: 10rpx;"></image>
						<view class="font_size_17 color_1d p_l_10">Ton Connect</view>
					</view>
				</view>
				<view class="">
					<view class="oxygen flex-row-left p_t_b_20 p_l_r_30">
						<image src="../../static/icon/oxygen.png" mode="aspectFill" style="width: 16rpx;height: 16rpx;">
						</image>
						<view class="color_223 font_size_17 p_l_10">{{ oxygen_balance.toFixed(2) }}</view>
					</view>
					<view class="oxygen flex-row-left p_t_b_20 p_l_r_30">
						<image src="../../static/icon/energy.png" mode="aspectFill" style="width: 16rpx;height: 16rpx;">
						</image>
						<view class="color_223 font_size_17 p_l_10">{{ userInfo.energy_balance }}</view>
					</view>
				</view>

			</view>
			<view class="" style="height: 200rpx;">

			</view>
			<view class="relative nav">
				<view class="btn store" @click="toStrore">
					<image src="../../static/icon/store.png" mode="aspectFill" class="store-icon"></image>
				</view>
				<view class="btn backpack" @click="toBackpack">
					<image src="../../static/icon/backpack.png" mode="aspectFill" class="backpack-icon"></image>
				</view>
				<view class="btn invite">
					<image src="../../static/icon/invite.png" mode="aspectFill" class="invite-icon"></image>
				</view>
			</view>
		</view>

		<!-- <view class="">
			
			<view class="font_size_32 p_t_30">
				姓名：{{ userInfo.first_name }}
			</view>
			<view class="font_size_32 p_t_30">
				邀请码：{{ userInfo.invite_code }}
			</view>
			<view class="font_size_32 p_t_30">
				氧气：{{ oxygen_balance.toFixed(2) }}
			</view>
			<view class="font_size_32 p_t_30">
				能量：{{ userInfo.energy_balance }}
			</view>
			<view v-if="myGoodList.length > 0"  class="font_size_32 p_t_30">
				天空：{{ storeGoodsList[myGoodList[3].good_id].name || 0}}
			</view>
			<view v-if="myGoodList.length > 0"  class="font_size_3宠物2 p_t_30">
				皮肤：{{ storeGoodsList[myGoodList[4].good_id].name || 0}}
			</view>
			<view v-if="myGoodList.length > 0"  class="font_size_32 p_t_30">
				挂饰：{{ storeGoodsList[myGoodList[5].good_id].name || 0}}
			</view>
			<view v-if="myGoodList.length > 0"  class="font_size_32 p_t_30">
				宠物：{{ storeGoodsList[myGoodList[6].good_id].name || 0}}
			</view>
			
			<view v-if="myAddress" class="p_t_40 font_size_32 color_99">
				钱包地址: {{ myAddress }}
			</view>
			<view v-if="!myAddress" class="p_t_40 font_size_32"  @click="openWallet">
				去链接
			</view>
			<view v-else class="p_t_40 font_size_32"  @click="closeWallet">
				断开连接
			</view>
			<view class="p_t_40 font_size_32"  @click="sendTonTransaction(0.00001,recharge)">
				转账TON
			</view>
			<view class="p_t_40 font_size_32"  @click="sendUsdtTransaction(0.00001,recharge)">
				转账USDT
			</view>
		
			<view class="p_t_40">
				<view class="color_white btn-default p_t_b_20" @click="toStrore">
					商店
				</view>
				<view class="color_white btn-default p_t_b_20 m_t_20" @click="toBackpack">
					背包
				</view>
			</view>
		</view> -->
		<!-- 占位符 -->
		<!-- <view style="height: 200rpx;"></view> -->
		<!-- 自定义导航栏 -->
		<tabber-list></tabber-list>
	</view>
</template>


<script setup>
	import {
		computed,
		reactive,
		ref
	} from 'vue'
	import {
		onLoad,
		onShow
	} from "@dcloudio/uni-app"
	import {
		useStore
	} from '@/store/index.js'
	import connect from '@/mixins/connect'
	import tools from '@/utils/tools.js'
	const {
		openWallet,
		closeWallet,
		sendTonTransaction,
		sendUsdtTransaction
	} = connect

	// store
	const store = useStore()
	const userInfo = computed(() => store.info) // 用户个人信息
	const myAddress = computed(() => store.myAddress) // 我的钱包地址
	const recharge = computed(() => store.recharge) // 我的钱包地址
	const myGoodList = computed(() => store.my_goods_list) // 我购买的商品
	const storeGoodsList = computed(() => store.storeGoodsList) // 商店
	const timer = ref(null)
	const oxygen_balance = ref(0)

	const setTimer = () => {
		colseTimer()
		timer.value = setInterval(() => {
			const nowtime = new Date().getTime() / 1000
			oxygen_balance.value = userInfo.value.oxygen_balance + userInfo.value.oxygen_base * userInfo.value
				.oxygen_mul * (nowtime - userInfo.value.oxygen_update_time) / 3600
			// console.log(oxygen_balance.value)
		}, 1000)
	}

	const colseTimer = () => {
		clearInterval(timer.value)
	}

	const toStrore = () => {
		uni.navigateTo({
			url: '/pages/index/store'
		})
	}

	const toBackpack = () => {
		uni.navigateTo({
			url: '/pages/index/backpack'
		})
	}
	const handleCh = (i18n) => {
		tools.setSession('locale', 'zh-CN')
		i18n.locale = 'zh-CN'
	}
	const handleEn = (i18n) => {
		tools.setSession('locale', 'en-US')
		i18n.locale = 'en-US'
	}
	onLoad(() => {
		//  store.getlogin().then(res => {
		// 	// store.setHomedata({ user_id: userInfo.value.user_id })
		// 	setTimer()
		// }).catch(err => {
		// 	console.log(err)
		// })
	})

	onShow(() => {
		if (userInfo.value && userInfo.value.user_id) {
			store.setHomedata({
				user_id: userInfo.value.user_id
			})
			setTimer()
		}

	})
</script>

<style lang="scss" scoped>
	.avatar {
		position: absolute;
		left: 25rpx;
		top: 25rpx;
		z-index: 1;
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
	}

	.avatar-title {
		position: absolute;
		right: 30rpx;
		top: 30rpx;
	}

	.avatar-text {
		position: absolute;
		right: 40rpx;
		bottom: 73rpx;
	}

	.avatar-connect {
		position: absolute;
		right: 10rpx;
		bottom: 4rpx;
		background: url('../../static/icon/connect-btn.png') no-repeat;
		background-clip: cover;
		background-size: 100% 100%;
	}

	.page-home {
		height: 100vh;
		box-sizing: border-box;
		overflow-y: hidden;

	}

	.home_bg {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		width: 100%;
		height: 100%;
		// height: 100vh;
		z-index: -1;
		overflow: hidden;
	}

	.btn {
		background: url('../../static/icon/btn.png') no-repeat;
		background-clip: cover;
		background-size: 100% 100%;
	}

	.nav {
		height: calc(100vh - 800rpx);
	}

	.store {
		position: absolute;
		left: 30rpx;
		top: 0;
		padding: 25rpx 28rpx;

		.store-icon {
			width: 44rpx;
			height: 44rpx;
		}
	}

	.backpack {
		position: absolute;
		left: 30rpx;
		top: 170rpx;
		padding: 15rpx 28rpx;

		.backpack-icon {
			width: 45rpx;
			height: 55rpx;
		}
	}

	.invite {
		position: absolute;
		left: 30rpx;
		bottom: 0rpx;
		padding: 20rpx 28rpx;

		.invite-icon {
			width: 45rpx;
			height: 50rpx;
		}
	}

	.oxygen {
		background: url('../../static/icon/oxygen-btn-bg.png') no-repeat;
		background-clip: cover;
		background-size: 100% 100%;
	}
</style>