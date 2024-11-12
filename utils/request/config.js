import reqConfig from '@/config/request_config.js' 
const { proApi, devApi, preApi } = reqConfig
// #ifdef MP-WEIXIN
const accountInfo = wx.getAccountInfoSync()
const env = accountInfo.miniProgram.envVersion
// #endif

// #ifndef MP-WEIXIN
const env = 'release'
// #endif
const baseApi = devApi

const CONFIG = {

	development: {
		baseUrl: baseApi[env],
		formHeader: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
	},

	production: {
		baseUrl: baseApi[env],
		formHeader: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	}
}
export default CONFIG[process.env.NODE_ENV]
