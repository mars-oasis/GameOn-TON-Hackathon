const pattern = {
	website:() => /[(https?|ftp|file)://][-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/,

	landLine:() => /^[0][1-9]{2,3}-[0-9]{5,10}$/,

	Video: (e) => /^.*\.(mp|MP)4$/.test(e),

	Audio: (e) => /^.*\.(mp|MP)3$/.test(e),
	
	Word: (e) => /^.*\.(doc|docx)$/.test(e),

	Excel: (e) => /^.*\.(xlsx|xls)$/.test(e),

	Pdf: (e) => /^.*\.(pdf)$/.test(e),

	Image: (e) => /^.*\.(jpg|jpeg|png|gif)$/.test(e),
}

export default pattern
