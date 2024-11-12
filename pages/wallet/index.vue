<template>
	<view class="p_30">
		<!-- <view class="font_size_48 color_99 p_40" @click="openWallet">连接钱包</view> -->
		<!-- <view class="font_size_48 color_99 p_40" @click="closeWallet">关闭</view> -->
		<!-- <view class="font_size_48 color_main p_40" @click="sendTonTransaction">转账ton</view> -->
	
		<view class="flex-row-between">
			<view class="font_size_28 flex_1">
				交易类型
			</view>
			<view class="font_size_28 flex_1">
				交易对象
			</view>
			<view class="font_size_28 flex_1">
				金额
			</view>
			<view class="font_size_28 flex_1">
				产出能量值
			</view>
			<view class="font_size_28 flex_1">
				交易时间
			</view>
		</view>
		<view v-if="list.length > 0"  class="">
			<view  v-for="item in list" :key="item.tx_id"  class="flex-row-between">
				<view class="font_size_28 flex_1">
					{{ taskNameList[item.task_id] }}
				</view>
				<view class="font_size_28 flex_1 flex_wrap p_l_r_10">
					{{ item.tx_detail.name }}
				</view>
				<view class="font_size_28 flex_1 flex_wrap p_l_r_10">
					{{ item.tx_detail.out_msg.amount }}{{ item.tx_detail.out_msg.name  }}
				</view>
				<view class="font_size_28 flex_1">
					{{ item.all_energy }}
				</view>
				<view class="font_size_28 flex_1">
					{{ item.tx_timestamp}}
				</view>
			</view>
		</view>
		<view v-else class="color_99 p_t_30">
			暂无交易数据
		</view>
		<!-- 占位符 -->
		<view style="height: 200rpx;"></view>
		<!-- 自定义导航栏 -->
		<tabber-list></tabber-list>
	</view>
</template>

<script setup>
	import { txsList } from '@/api/index.js'
	import { ref, computed } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	import { useStore } from '@/store/index.js'
	import connect from '@/mixins/connect'
	const { openWallet }  = connect
	// store
	const store = useStore()
	const userInfo = computed(() => store.info)
	const myAddress = computed(() => store.myAddress)
	const list = ref([])
	const taskNameList = ref({})
	
	const getInitData = () => {
		 // myAddress.value
		txsList({
			user_id: userInfo.value.user_id,
			address: 'UQAkc-TU-GqvELbNdr6oYR-MZX9hALvz6prJAz3DaRIeSS20' // 当前联机的钱包地址
		}).then(res=> {
			console.log(res)
			taskNameList.value = res.data.task_name_list
			list.value = [...res.data.tx_list.map((item, index) => {
				console.log(index)
				console.log(item.tx_id)
				console.log(JSON.parse(item.tx_detail))
				console.log('amount',JSON.parse(item.tx_detail).out_msg.amount)
				
				item.tx_detail = JSON.parse(item.tx_detail)
				return item
			})]
			console.log(list.value)
		})
	}
	
	onLoad(() => {
		console.log('钱包', myAddress.value)
		if(myAddress.value) {
			getInitData()
		} else {
			uni.showModal({
				title: '温馨提示',
				content: '你没有链接钱包地址，请现在去链接钱包',
				confirmText: '链接钱包',
				success: (res) => {
					if (res.confirm) {
						openWallet()
					}
				}
				
			})
		}
	})
	
</script>

<style>
</style>