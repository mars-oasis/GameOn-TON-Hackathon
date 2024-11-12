<template>
	<view class="p_30">
		<z-tabs :list="tabs" active-color="#18AA5A" value-key="type" :current="current" @change="handleTabs"></z-tabs>
		
		<!-- 添加好友 -->
		<view v-if="current === 0" class="">
			<uni-easyinput v-model="inviteCode" placeholder="输入好友UID" @input="handleSearch"></uni-easyinput>
			<view class="" style="height: 100rpx;"></view>
			<view v-if="JSON.stringify(detail) != '{}'"  class="p_20 flex-row-between m_b_20  p_t_40 hairline">
				<view class="flex-row-left">
					<image src="../../static/tabbars/me.png" mode="aspectFill" style="width: 40rpx;height: 40rpx;"></image>
					<view class="p_l_20">
						<!-- <view class="font_size_28">{{ detail.username }} {{detail.invite_code}}</view> -->
						<view class="font_size_28">{{ detail.username }}</view>
					</view>
				</view>
				<view class="font_size_26 color_bg_main color-white p_l_r_40 p_t_b_10" @click="add">发送申请</view>
			</view>
		</view>
		
		<!-- 我的好友申请 -->
		<view v-if="current != 0" class="p_30">
			<view v-for="(item,index) in list" :key="item.id" @longpress="remove(item)" class="p_20 flex-row-between m_b_20 hairline relative" @click="handleDetail(item)">
				<view class="flex-row-left">
					<view class="p_r_20 font_size_28">{{ index + 1 }}</view>
					<image src="../../static/tabbars/me.png" mode="aspectFill" style="width: 40rpx;height: 40rpx;"></image>
					<view class="p_l_20">
						<view class="font_size_28">{{ item.first_name }}</view>
					</view>
				</view>
				<view v-if="item.status === 0"  class="font_size_26 color_bg_main color-white p_l_r_40 p_t_b_10" @click.stop="agreeFriend(item)">通过好友</view>
				<view v-else class="font_size_26 color_99">{{ matchStatus(item.status)}}</view>
				<view v-if="current === 2" class="font_size_24" @click="remove(item)">删除</view>
			</view>
		</view>
		<uni-popup ref="popupRef" type="center" :animation="true">
			<view class="flex-col-center p_30" style="width:600rpx; background-color: #fff;box-sizing:border-box;border-radius: 20rpx">
				<view class="p_b_30">提示</view>
				<view v-if="current === 0" class="p_b_30 flex-row-left " style="width: 500rpx;">
					<view class="font_size_26 p_r_10">申请说明: </view>
					<uni-easyinput v-model="remark" placeholder="申请说明" class="flex_1" ></uni-easyinput>
				</view>
				
				<view v-if="current === 1" class="flex-row-left p_t_b_40">
					<view class="flex-row-left" @click="agree(1)">
						<uni-icons :type="agreeData === 1  ? 'checkbox': 'circle'" size="25" :color="agreeData === 1 ? '#18AA5A': '#999'"></uni-icons> 
						<view class="font_size_32 p_l_10">同意</view>
					</view>
					
					<view class="p_l_30 flex-row-left"  @click="agree(2)">
						<uni-icons :type="agreeData === 2 ? 'checkbox': 'circle'" size="25" :color="agreeData === 2 ? '#18AA5A': '#999'"></uni-icons>
						<view class="font_size_32 p_l_10">拒绝</view>
					</view>
				</view>
		
				<view class="flex_center flex p_t_20">
					<view class="border p_t_b_10 p_l_r_30 m_r_30" @click="close">取消</view>						
					<view class="color_bg_main color_white p_t_b_10 p_l_r_30" @click="submit">确定</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script setup>
	import { searchFriend, addFriend, getNewFriendList, removeFriend, agreeFriendAdd, getFriend } from '@/api/index.js'
	import { ref, computed } from 'vue'
	import { onShow } from '@dcloudio/uni-app'
	import { useStore } from '@/store/index.js'
	
	const inviteCode = ref('')
	const detail = ref({})
	const remark = ref('')
	const list = ref([])
	const popupShow = ref(false)
	const popupRef = ref(null)
	const current = ref(0)
	const agreeData = ref(1)
	const fromUserId = ref(0)
	const tabs =ref([
		{ id: 0, name: '添加好友'},
		{ id: 1, name: '申请好友'},
		{ id: 2, name: '删除好友'}
	])
	
	
	const store = useStore()
	const userInfo = computed(() => store.info)
	
	// 获取删除好友列表
	const getRemoveFriend = () => {
		getFriend({
			user_id: userInfo.value.user_id,
			friend_type: 3
		}).then(res => {
			console.log(res)
			list.value = res.data
		})
	}
	
	const matchStatus = (type) =>{
		const dataMap = {
			1: '已添加',
			2: '已拒绝',
			3: '已过期',
		}
		return dataMap[type]
	}
	// 删除
	const remove = (item) => {
		uni.showModal({
			title: '提示',
			content: '确定要删除吗?',
			success: (res) => {
				if(res.confirm) {
					removeFriend({
						user_id: userInfo.value.user_id,
						friend_user_id: item.user_id
					}).then((v) => {
						console.log(v)
						uni.showToast({
							title: '删除成功',
							icon:'none'
						})
						getRemoveFriend()
					})
				}
			}
		})
	}	
	
	const agree = (type) =>{
		agreeData.value = type
	}
	
	const agreeFriend = (item) => {
		fromUserId.value = item.from_user_id
		popupShow.value = true
		popupRef.value?.open('center')
	}
	// 获取好友申请
	const getNewFriendListData = () => {
		getNewFriendList({
			user_id: userInfo.value.user_id
		}).then(res => {
			// console.log(res)
			list.value = res.data
		})
	}
	// 切换tabs
	const handleTabs = (index) => {
		current.value = index
		if (current.value === 1) {
			getNewFriendListData()
		}
		if (current.value === 2) {
			getRemoveFriend()
		}
	}
	// 添加
	const add = (item) => {
		popupShow.value = true
		popupRef.value?.open('center')
	}
	
	// 提交
	const submit = () => {
		if(current.value === 0) {
			addFriend({
				user_id: userInfo.value.user_id,
				invite_code: inviteCode.value,
				remark: remark.value
			}).then(res => {
				uni.showToast({
					title: res.data,
					icon:'none'
				})
				close()
				// 更新数据
				// getNewFriendData() 
			}).catch(() => {
				close()
			})
		} else if (current.value === 1){
			agreeFriendAdd({
				user_id: userInfo.value.user_id,
				from_user_id: fromUserId.value,
				agree: agreeData.value,
			}).then((res) => {
				// console.log(res.data)
				uni.showToast({
					title: res.data,
					icon:'none'
				})
				getNewFriendListData() // 更新我的邀请好友列表
				close()
			})
		}
	}
	//搜索
	const handleSearch = (e) => {
		console.log(e)
		inviteCode.value = e
		if(inviteCode.value.length === 6) {
			searchFriend({
				invite_code: inviteCode.value
			}).then(res => {
				detail.value = res.data
			})
		}
	
	}
	// 关闭弹框
	const close = () => {
		popupShow.value = false
		// detail.value = {}
		popupRef.value.close()
	}
	
	onShow(() => {
		if (current.value === 2) {
			getRemoveFriend()
		}
	})
</script>

<style>
</style>