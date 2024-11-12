<script setup>
	import { useStore } from '@/store/index.js'
	const store = useStore()
	// import { getComeDappTimestamp, login } from '@/api/login.js'
	import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
		onLaunch(() => {
			console.log('App Launch')
			 store.getlogin().then(res => {
				 const { owner } = res
				 if(Number(owner.is_new) === 1) {
					 uni.reLaunch({
					 	url: '/pages/index/guide'
					 })
				 } else if(Number(owner.is_new) === 0) {
					 uni.switchTab({
					 	url: '/pages/index/index'
					 })
				 }
				 console.log('app' ,res)
			 })
		}) 
		
		onShow(() => {
			console.log('App Show')	
		})
		
		onHide(() => {
			console.log('App Hide')
		})
</script>

<style>

	@import "@/static/style/index.scss";
</style>
