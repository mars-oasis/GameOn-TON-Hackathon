
export const copyText = (content:any) => {
		/**
		 * H5端的复制逻辑
		 */
		var input = document.createElement("input");
		input.value = content;
		document.body.appendChild(input);
		input.select();
		input.setSelectionRange(0, input.value.length);
		document.execCommand('Copy');
		document.body.removeChild(input);
		uni.showToast({
			title: "复制成功！" ,
			icon: 'none'
		})
		// alert('');
    }