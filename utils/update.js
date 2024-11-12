function autoUpdate() {
	
	if (wx.canIUse('getUpdateManager')) {
		
		const updateManager = wx.getUpdateManager()
		
		updateManager.onCheckForUpdate((res) => {
			
			if (res.hasUpdate) {
				
				wx.showModal({
					title: 'tip',
					content: 'reload',
					success: (res) => {
						if (res.confirm) {
							
							downLoadAndUpdate(updateManager)
						} else if (res.cancel) {
					
							wx.showModal({
								title: 'tip',
								content: 'update',
								showCancel: false, 
								confirmText: 'update now',
								success: (res) => {
									if (res.confirm) {
									
										downLoadAndUpdate(updateManager)
									}
								}
							})
						}
					}
				})
			}
		})
	} else {

		wx.showModal({
			title: 'tip',
			content: 'update',
		})
	}
}

function downLoadAndUpdate(updateManager) {

	updateManager.onUpdateReady(() => {
		wx.hideLoading()

		updateManager.applyUpdate()
	})

	updateManager.onUpdateFailed(() => {
	
		wx.showModal({
			title: 'already has new vision',
			content: 'done',
		})
	})
}
export default {
	autoUpdate
}
