
import { defineStore } from 'pinia'
import { getComeDappTimestamp, login } from '@/api/login.js'
import { getHomeData } from '@/api/index.js'
export const useStore = defineStore('counter', {
  state: () => {
    return { 
		currentTab: 0, 
		myAddress: null,
		currentIsConnectedStatus: 0, 
		recharge: '', 
		info: {}, 
		my_goods_list: [], 
		energy_list: [], 
		storeGoodsList: {}, 
		upgradeTreeConfig: [], 
	}
  },
  unistorage: true, 
  actions: {
	getlogin() {
		return new Promise((resolve, reject) => {
			const data = {
				timestamp: '1728969048',
				tg_id: '171807086', // 171807086  171807085
				username: 'age127',
				invite_code: '9jmjur'
			}
			console.log("data",data)
			login(data).then(res => {
				const {owner,my_goods_list,store_goods_list,upgrade_tree_config, config, tokenauth} = res.data
				this.recharge = config.recharge
				uni.setStorageSync("tokenauth", tokenauth)
				this.SET_INFO(owner)
				this.SET_MY_GOOGS_LIST(my_goods_list)
				this.SET_STORE_GOODS_LIST(store_goods_list)
				this.SET_UPGRADE_TREE_CONFIG(upgrade_tree_config)
				// setHomedata()
				resolve(res.data)
			}).catch(() => {
				reject(false)
				this.SET_INFO({})
				this.SET_MY_GOOGS_LIST([])
				this.SET_STORE_GOODS_LIST({})
				this.SET_UPGRADE_TREE_CONFIG([])
			})
			// getComeDappTimestamp().then(res => {
			// 	// console.log(res)
			// 	const data = {
			// 		timestamp: '1728969048',
			// 		tg_id: '171807086', //171807086 
			// 		username: 'age127',
			// 		invite_code: '9jmjur'
			// 	}
			// 	console.log("data",data)
			// 	login(data).then(res => {
			// 		const {owner,my_goods_list,store_goods_list,upgrade_tree_config} = res.data
			// 		this.SET_INFO(owner)
			// 		this.SET_MY_GOOGS_LIST(my_goods_list)
			// 		this.SET_STORE_GOODS_LIST(store_goods_list)
			// 		this.SET_UPGRADE_TREE_CONFIG(upgrade_tree_config)
			// 		// setHomedata()
			// 		resolve(true)
			// 	}).catch(() => {
			// 		reject(false)
			// 	})
			// })
		})
	},
	
	
	setHomedata(data) {
		getHomeData(data).then(res => {
			console.log('home', res)
			const { owner,my_goods_list,energy_list} = res.data
			this.SET_INFO(owner)
			this.SET_MY_GOOGS_LIST(my_goods_list)
			this.SET_ENERGY_LIST(energy_list)
		})
	},
	SEt_MY_WALLET_ADDRESS(data) {
		this.myAddress = data
	},
	SET_CURRENT_IS_CONNECT_STATUS(data) {
		this.currentIsConnectedStatus = data
	},
	
	SEt_CURRENT_TAB(data) {
		this.currentTab = data	
	},
	
    SET_INFO(data) {
		this.info = data	
	},
	SET_ENERGY_LIST(data) {
		this.energy_list = data	
	},
	SET_MY_GOOGS_LIST(data) {
		this.my_goods_list = data
	},
	SET_STORE_GOODS_LIST(data) {
		this.storeGoodsList = data
	},
	SET_UPGRADE_TREE_CONFIG(data) {
		this.upgradeTreeConfig = data
	}
  },
})

