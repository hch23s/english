var winHeight = 0;
var iframe;
function boxheight() { // 函数：获取尺寸
	// 获取浏览器窗口高度
	winHeight = 0;
	if (window.innerHeight)
		winHeight = window.innerHeight;
	else if ((document.body) && (document.body.clientHeight))
		winHeight = document.body.clientHeight;
	// 通过Document对body进行检测，获取浏览器可视化高度
	if (document.documentElement && document.documentElement.clientHeight)
		winHeight = document.documentElement.clientHeight;
	 winHeight = winHeight;
}

function changeFrameHeight(iframe) {
	boxheight();
	iframe.height = winHeight-180;
}
window.onresize = function() {
	//changeFrameHeight();
	boxheight();
	var iframes=document.getElementsByTagName("iframe");
	
	for(var i=0;i<iframes.length;i++){
		iframes[i].height = winHeight-180;
	}
}
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
	$("#tbody").css("height",tableHeight+"px");
};
function openHeight() { // 函数：获取尺寸
	var h = 0;
	h = 0;
	if (window.innerHeight)
		h = window.innerHeight;
	else if ((document.body) && (document.body.clientHeight))
		h = document.body.clientHeight;
	// 通过Document对body进行检测，获取浏览器可视化高度
	if (document.documentElement && document.documentElement.clientHeight)
		h = document.documentElement.clientHeight;
	var tableHeight = h-150;
	if(tableHeight<300)
		tableHeight = 300;
	$("#tbody").css("height",tableHeight+"px");
};