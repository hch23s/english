
function tbodyHeight() { // 函数：获取尺寸
	var searchHeight = document.getElementById("searchDiv").offsetHeight;
	var h = 0;

	h = 0;
	if (window.innerHeight)
		h = window.innerHeight;
	else if ((document.body) && (document.body.clientHeight))
		h = document.body.clientHeight;
	// 通过Document对body进行检测，获取浏览器可视化高度
	if (document.documentElement && document.documentElement.clientHeight)
		h = document.documentElement.clientHeight;
	var tableHeight = h-searchHeight-210;
	if(tableHeight<285)
		tableHeight = 285;
	$("#tbody").css("height",tableHeight);
};