/**
 * 分页工具类
 * @param name    div名称
 * @param count   总条数
 * @param curr    当前页
 * @param limit   每页显示条数
 * @param groups  连续显示分页数
 * @param handler 回调方法
 * @returns
 */
function PageRender(name,count,curr,limit,groups,handler){
	layui.use(['laypage'], function(){
		layui.laypage.render({
		    elem: name,
		    layout: ['count', 'prev', 'page', 'next', 'limit', 'skip'],
		    count:count,
		    curr: curr, //定位当前页号
		    limit:limit,//每页显示数据的条数
		    groups: groups, //连续显示分页数
		    jump: function(obj, first){
		    	handler(obj,first);
		    }
		  });
	});
	
}