
export const copyText = (content:any) => {
		var input = document.createElement("input");
		input.value = content;
		document.body.appendChild(input);
		input.select();
		input.setSelectionRange(0, input.value.length);
		document.execCommand('Copy');
		document.body.removeChild(input);
		uni.showToast({
			title: "Success！" ,
			icon: 'none'
		})
		// alert('');
    }
