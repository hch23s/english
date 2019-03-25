var LayuiElement = window.parent.element;
// 使用示例 首先在子页面引入该js文件,然后使用如下方法添加标签页
// LayuiElement.tabAdd('title', {
// 	title: '选项卡的标题',
// 	content: '选项卡的内容', //支持传入html
// 	id: '选项卡标题的lay-id属性值'
// });

var Layer = window.parent.layer;
function closeOpen(){
	
		   
   	Layer.close(Layer.index);
   
}
var HomeHeight = $(window).height();
var HomeWidth = $(window).width();