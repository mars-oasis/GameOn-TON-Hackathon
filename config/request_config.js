// const DEV = 'apiPrefix'
// const PRE = 'apiPrefix'
// const PRO = 'apiPrefix'

const DEV = "https://ton.robot68.online"
const PRE = "https://ton.robot68.online"
const PRO = "https://ton.robot68.online"

// const DEV = "http://127.0.0.1:25000"
// const PRE = "http://127.0.0.1:25000"
// const PRO = "http://127.0.0.1:25000"
export default {
	
	devApi: {
		
		develop: DEV,
		
		trial: DEV,
		
		release: PRO,
	},
	
	preApi: {
		
		develop: PRE,
		
		trial: PRE,
		
		release: PRO,
	},
	
	proApi: {
		
		develop: DEV,
		
		trial: PRE,
		
		release: PRO,
	}
}
