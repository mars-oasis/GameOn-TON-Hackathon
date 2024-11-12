<template>
	<view class="">
		<z-tabs :list="tabs" active-color="#18AA5A" value-key="type" :current="current" @change="handleTabs"></z-tabs>
		<view class="p_30">
			<view v-for="(item,index) in list" :key="index" class="p_30 border_radius_15 hairline m_b_20" @click="transfer(item)">
				<view class="flex-row-between">
					<view class="flex-row-left">
						<text class="font_size_32 p_r_15">{{ item.name}} </text>
						<blockquote v-if="current > 0">
							<text v-if="item.status === -1" class="font_size_28 color_99">to be finished</text>
							<text v-if="item.status === 0" class="font_size_28 color_ff7">to be collected</text>
							<text v-if="item.status === 1" class="font_size_28 color_main">finished</text>
						</blockquote>
					</view>
					<view class="font_size_32 color_main">{{ item.energy }}g</view>
				</view>
				<view class="font_size_26 color_99 p_t_10">{{ item.describe || 'none'}}</view>
				<view class="flex-row-between p_t_10">
					<!-- <view v-if="Number(item.task_type) === 1" class="font_size_28 color_money p_t_10">process:{{ item.had_energy / item.energy }}</view> -->
					<view v-if="Number(item.task_type) === 1" class="font_size_28 color_money p_t_10">process:{{ item.had_energy }} / {{ item.energy }}</view>
					<!-- <view class="font_size_28 color_66">kpi: {{ item.require_value }}</view> -->
				</view>
				<blockquote v-if="Number(item.task_type) === 1 || Number(item.task_type) === 4" @click="toLink(item)">
					<view v-if="Number(item.task_id) != 101" class="font_size_26 color_purple p_t_10">link: {{ item.task_links }}</view>
				</blockquote>
				<view v-if="item.status === 0 && Number(item.task_type) != 1" class="color_white btn-default p_t_b_60 m_t_b_30" @click="toReceiveTask(item)">
				
				</view>
				<blockquote v-if="item.status === -1">
					<view v-if="Number(item.task_type)  === 4" class="color_white btn-default p_t_b_60 m_t_b_30" @click.stop="toCompleteTask(item)">
						
					</view>
					<view v-if="Number(item.task_type)  === 2" class="color_white btn-default p_t_b_60 m_t_b_30" @click.stop="transfer(item)">
					
					</view>
				</blockquote>
			</view>
		</view>
		
	
		<view style="height: 200rpx;"></view>

		<tabber-list></tabber-list>
		
		<uni-popup ref="popupRef" type="center" :animation="true">
			<view class="flex-col-center p_30" style="background-color: #fff;box-sizing:border-box;border-radius: 20rpx;width: 600rpx;">
				<uni-forms ref="form" :model="formData" :rules="rules" label-width="100">
					<uni-forms-item label="type" name="type" required>
						<uni-data-checkbox v-model="formData.type" :localdata="typeData" />
					</uni-forms-item>
					<uni-forms-item label="count" name="amount" required>
						<uni-easyinput type="text" v-model="formData.amount" placeholder="insert" />
					</uni-forms-item>
					<uni-forms-item label="address" name="address" required>
						<uni-easyinput type="textarea" v-model="formData.address" placeholder="insert address" />
					</uni-forms-item>
				</uni-forms>
				<view class="flex_center flex">
					<view class="border p_t_b_10 p_l_r_30 m_r_30" @click="close">cancel</view>	
					<view class="color_bg_main color_white p_t_b_10 p_l_r_30" @click="payment">buy</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script setup>
	import { taskList, receiveTask, completedTask } from '@/api/index.js'
	import { onLoad, onReady  } from '@dcloudio/uni-app'
	import { useStore } from '@/store/index.js'
	import { ref,computed, reactive, getCurrentInstance} from 'vue'
	import connect from '@/mixins/connect'
	const { sendTonTransaction, sendUsdtTransaction }  = connect
	
	const store = useStore()
	const userInfo = computed(() => store.info)
	
	const { ctx } = getCurrentInstance()
	const list = ref([])
	const taskData = ref([])
	const current =ref(0)
	const popupRef = ref(null)
	const tabs = ref([
		{index: 0,name: 'on-chain', type: 1},
		{index: 1,name: 'daily task', type:2},
		{index: 2,name: 'platform task', type:3},
		// {index: 3,name: 'social task', type: 4},
	])
	
	const typeData = reactive([{
		text: 'TON',
		value: 1
	}, {
		text: 'USDT',
		value: 2
	}])
	
	const formData = reactive({
		amount: 0,
		address: '',
		type: 1,
	})
	
	const rules = reactive({
		type: {
			rules: [{
				required: true,
				errorMessage: '1'
			}]
		},
		amount: {
			rules: [{
				required: true,
				errorMessage: '2'
			}]
		},
		address: {
			rules: [{
				required: true,
				errorMessage: '3'
			}]
		}
	})
	
	const toLink = ({ task_links }) => {
		console.log(task_links)
		uni.navigateTo({
			url: `/pages/task/web?url=${task_links}`
		})
	}
	
	
	
	const payment = () => {

		ctx.$refs.form.validate().then(res=>{
			
			if(form.type === 1) {
				sendTonTransaction(formData.amount, formData.address)
			} else if(form.type === 2) {
				sendUsdtTransaction(formData.amount, formData.address)
			}
		}).catch(err =>{
			console.log('表单错误信息：', err);
		})
	}
	const transfer = (item) => {
		if(Number(item.task_id) === 101) {
			// detail.value = item
			popupRef.value?.open('center')
		}
		if (Number(item.task_id) === 202 && Number(item.status) === -1) {
			uni.switchTab({
				url: '/pages/index/index'
			})
		}
		if (Number(item.task_id) === 203 && Number(item.status) === -1) {
			uni.switchTab({
				url: '/pages/friend/index'
			})
		}
	
	}
	const close = () => {
		
		popupRef.value.close()
	}
	
	const handleTabs = (index) => {
		current.value = index
		list.value = taskData.value[tabs.value[current.value].type]
	}
	
	const toCompleteTask =(item) => {
		if (Number(item.task_type) === 1) return
		completedTask({
			user_id:  userInfo.value.user_id,
			task_id: item.task_id
		}).then(res => {
			uni.showToast({
				title: res.data,
				icon:'none'
			})
			getInitData()
		})
	}
	
	const toReceiveTask = (item) => {
		console.log(item)
		receiveTask({
			user_id:  userInfo.value.user_id,
			task_id: item.task_id
		}).then(res => {
			uni.showToast({
				title: res.data,
				icon:'none'
			})
			getInitData()
		})
		
		
	}
	const getInitData = () => {
		taskList({
			user_id:  userInfo.value.user_id
		}).then(res => {
			// console.log(res)
			taskData.value = res.data
			list.value = res.data[tabs.value[current.value].type]
		})
	}
	onLoad(() => {
		getInitData()
	})
	
	onReady(() => {
		
		  ctx.$nextTick(() => {
			  ctx.$refs.form.setRules(rules)
		  })
	})
	
</script>

<style>
</style>
