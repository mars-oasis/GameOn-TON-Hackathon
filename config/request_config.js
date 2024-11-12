// const DEV = 'apiPrefix'
// const PRE = 'apiPrefix'
// const PRO = 'apiPrefix'
//线上
const DEV = "https://ton.robot68.online"
const PRE = "https://ton.robot68.online"
const PRO = "https://ton.robot68.online"
// 测试
// const DEV = "http://127.0.0.1:25000"
// const PRE = "http://127.0.0.1:25000"
// const PRO = "http://127.0.0.1:25000"
export default {
	// 开发版和体验版都是连的开发环境
	devApi: {
		// 开发版
		develop: DEV,
		// 体验版
		trial: DEV,
		// 正式版
		release: PRO,
	},
	// 开发版和体验版都是连的都是预生产环境
	preApi: {
		// 开发版
		develop: PRE,
		// 体验版
		trial: PRE,
		// 正式版
		release: PRO,
	},
	// 生产环境
	proApi: {
		// 开发版
		develop: DEV,
		// 体验版
		trial: PRE,
		// 正式版
		release: PRO,
	}
}