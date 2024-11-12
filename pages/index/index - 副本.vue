<template>
	<view class="p_30">
		<view class="">
			<view style="height: 200rpx;" class=""></view>
			
			<view class="font_size_32 p_t_30">
				姓名：{{ userInfo.username }}
			</view>
			<view class="font_size_32 p_t_30">
				邀请码：{{ userInfo.invite_code }}
			</view>
			<view class="font_size_32 p_t_30">
				氧气：{{ userInfo.oxygen_balance }}
			</view>
			<view class="font_size_32 p_t_30">
				能量：{{ userInfo.energy_balance }}
			</view>
			<view class="p_t_40 font_size_32 color_99">
				链接钱包显示地址
			</view>
			<view class="p_t_40 font_size_32"  @click="openWallet">
				链接钱包
			</view>
			<view style="height: 50rpx;" class=""></view>
			<view class="p_t_40 font_size_32"  @click="closeWallet">
				关闭钱包
			</view>
			
			<view style="height: 50rpx;" class=""></view>
			<view class="p_t_40 font_size_32"  @click="sendTonTransaction">
				转账TON
			</view>
			
			<view style="height: 50rpx;" class=""></view>
			<view class="p_t_40 font_size_32"  @click="sendUsdtTransaction">
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
		</view>
	</view>
</template>

<script setup>
	import { computed, reactive, ref } from 'vue'
	import { onLoad } from "@dcloudio/uni-app"
	import { useStore } from '@/store/index.js'
	
	// store
	const store = useStore()
	const userInfo = computed(() => store.info)
	
	import TonWeb from "tonweb"
	const tonweb = new TonWeb()

	const usdtAddress = 'EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs'
	const jettonMinterUsdt = new TonWeb.token.jetton.JettonMinter(tonweb.provider, { address: new TonWeb.utils.Address(usdtAddress) });
	
	const myAddress = ref(null)
	const currentIsConnectedStatus = ref(0) // 0:钱包加载中，1:已链接，-1:已断开
	
	import { toNano } from '@ton/ton'
	import { TonConnectUI } from '@tonconnect/ui'
	
	// console.log('TonConnectUI:', TonConnectUI)
	const tonConnectUI = new TonConnectUI({
		manifestUrl: 'https://ton.robot68.online/image/tonconnect-manifest.json',
		// buttonRootId: '<YOUR_CONNECT_BUTTON_ANCHOR_ID>'
	})
	console.log('tonConnectUI:', tonConnectUI)
	const walletsList = tonConnectUI.getWallets()
	console.log('walletsList:', walletsList)
	
	const unsubscribe = tonConnectUI.onStatusChange(
		walletAndwalletInfo => {
			console.log('11111')
			console.log('walletAndwalletInfo:', walletAndwalletInfo)
			if (walletAndwalletInfo) {
				const currentModalState = tonConnectUI.modalState;
				console.log('currentModalState:', currentModalState)
				const currentWallet = tonConnectUI.wallet;
				const currentWalletInfo = tonConnectUI.walletInfo;
				const currentAccount = tonConnectUI.account;
				console.log('currentWallet:', currentWallet)
				console.log('currentWalletInfo:', currentWalletInfo)
				console.log('currentAccount:', currentAccount)
				myAddress.value = new TonWeb.utils.Address(currentAccount.address).toString(true)
				console.log("myAddress:", myAddress.value)
				currentIsConnectedStatus.value = 1
			} else {
				currentIsConnectedStatus.value = -1
			}
		}
	)
	

	
	const openWallet = async () => {
		if (currentIsConnectedStatus.value === -1 || currentIsConnectedStatus.value  === 0) {
			const { modal } = tonConnectUI;
			await modal.open();
		} else if (currentIsConnectedStatus.value == 1) {
			uni.showToast({
				title: "无需再次链接，已链接了钱包: " + myAddress.value,
				icon: 'none'
			})
		}
	}
	
	const closeWallet = async () => {
		if (currentIsConnectedStatus.value === 0) {
			uni.showToast({
				title: "钱包加载中" ,
				icon: 'none'
			})
		} else if (currentIsConnectedStatus.value === -1) {
			uni.showToast({
				title: "钱包未链接，无需断开" ,
				icon: 'none'
			})
		} else if (currentIsConnectedStatus.value === 1) {
			tonConnectUI.disconnect()
		}
	}
	
	
	const sendTonTransaction = async () => {
		let amount = 0.00012
		let to_address = "UQBGUeNGlCGdSDA3fITBXQYlo1_EsUhq5vxe7vZtp4jc6fcA"
		try {
			await tonweb.provider.getAddressInfo(to_address);
		} catch (error) {
			uni.showToast({
				title: "错误:" + error,
				icon: 'none'
			})
			return
		}
		
		try {
			let transaction = {
				validUntil: Math.floor(Date.now() / 1000) + 600, // 600 sec
				messages: [
					{
						address: to_address,
						amount: toNano(amount).toString()
					}
				]
			}
			const result = await tonConnectUI.sendTransaction(transaction)
			console.log("result : ", result)
			if (result && result['boc']) {
				console.log('转账成功', result['boc'])
			}
		} catch (e) {
			uni.showToast({
				title: e,
				icon: 'none'
			})
			console.error("sendTonTransaction catch:", e)
		}
		
	}
	
	const sendUsdtTransaction = async () => {
		// console.log("inpRefAmount.current?.value:", inpRefAmount.current?.value)
		// console.log("inpRefAddress.current?.value:", inpRefAddress.current?.value)
		let amount = 0.00013
		let to_address = "UQBGUeNGlCGdSDA3fITBXQYlo1_EsUhq5vxe7vZtp4jc6fcA"
		// let amount = inpRefAmount.current?.value ?? 0
		// var to_address = inpRefAddress.current?.value ?? ""
		try {
			await tonweb.provider.getAddressInfo(to_address)
		} catch (error) {
			uni.showToast({
				title: "错误:" + error,
				icon: 'none'
			})
			return
		}
	
		const jettonMinterAddress = await jettonMinterUsdt.getJettonWalletAddress(new TonWeb.utils.Address(myAddress.value))
		console.log("钱包的USDT合约地址jettonMinterAddress:", jettonMinterAddress.toString(true))
		const jettonWallet = new TonWeb.token.jetton.JettonWallet(tonweb.provider, {
			address: jettonMinterAddress
		});
	
		const seqno = Date.now()
		const jettonBody = {
			queryId: seqno,
			jettonAmount: amount * (10 ** 6),
			toAddress: new TonWeb.utils.Address(to_address),
			responseAddress: new TonWeb.utils.Address(myAddress.value)
		}
	
		console.log('🚧 jettonWallet.createTransferBody', jettonBody)
		let payload = await jettonWallet.createTransferBody(jettonBody)
		console.log('🚧 payload :', payload)
	
		let transaction = {
			validUntil: Math.floor(Date.now() / 1000) + 600, // 600 sec 
			messages: [
				{
					address: jettonMinterAddress.toString(true),
					amount: toNano(0.05).toString(),
					payload: TonWeb.utils.bytesToBase64(await payload.toBoc())
				},
			]
		}
		console.log("transaction:", transaction)
		try {
			const result = await tonConnectUI.sendTransaction(transaction);
			console.log("result : ", result)
			if (result && result['boc']) {
				console.log('转账成功', result['boc'])
			}
		} catch (e) {
			console.error("sendUsdtTransaction catch:", e);
			uni.showToast({
				title: e,
				icon: 'none'
			})
			// window.alert(e)
		}
	}

	const toStrore = () => {
		uni.navigateTo({
			url:'/pages/index/store'
		})
	}
	
	const toBackpack = () => {
		uni.navigateTo({
			url: '/pages/index/backpack'
		})
	}
	
	onLoad(() => {
		 store.getlogin().then(res => {
			store.setHomedata({ user_id: userInfo.value.user_id })
		}).catch(err => {
			console.log(err)
		})
	})
</script>

<style lang="scss" scoped>
</style>
