/**
 * options.url 数据请求地址
 * options.elem 表格加载的选择器,默认table
 * options.heads 数组
 * options.heads[0].filed 字段名
 * options.heads[0].name 表头
 * options.heads[0].width 表格宽度
 * options.heads[0].format 函数(返回要显示的字符串) 自定义表格中的显示数据
 * 使用示例 见文件尾
 */
var DataTable = function(options) {
	
	var curr = 1; // 记录当前页,修改删除之后刷新用
	
    var elem = 'table';
    if (options && options.elem) {
        elem = options.elem;
    }
    if (!options.params) {
    	options.params = {};
    }
    var heads = options.heads;

    (function() {
        var html = '';
        html += '<colgroup></colgroup>';
        html += '<thead></thead>';
        html += '<tbody></tbody>';
        
        $(elem).html(html);
        if(!$(elem).siblings("#pagination").length){
        	$(elem).after('<div id="pagination"></div>');
        }
    })();

    var cols = '',
        thead = '<tr>';
    for (var i in heads) {
        if (heads[i].width) {
            cols += '<col width="' + heads[i].width + '">';
        } else {
            cols += '<col>'
        }
        if (heads[i].name) {
            thead += '<th>' + heads[i].name + '</th>';
        } else {
            thead += '<th></th>';
        }
    }
    thead += '</tr>';

    $(elem + ' colgroup').html(cols);
    $(elem + ' thead').html(thead);

    var reload = function(data) {
        var tbody = '';
        for (var i in data) {
            tbody += '<tr>';
            for (var j in heads) {
                if (heads[j].format) {
                    tbody += '<td>' + heads[j].format(data[i]) + '</td>';
                } else {
                    tbody += '<td>' + data[i][heads[j].filed] + '</td>';
                }
            }
            tbody += '</tr>';
        }
        $(elem + ' tbody').html(tbody);
    }

    var loading = function() {
        $(elem + ' tbody').html('<div style="text-align: center;">加载中...<div>');
    }
    
    this.reload = function(){
    	layui.use(['laypage', 'layer'], function() {
    		var laypage = layui.laypage;
    		
    		$.post(options.url, options.params, function(data) {
    			if(!data || !data.pageCount || data.pageCount == 0){
    				$(elem + ' tbody').html('<div style="color: red;">没有相关数据<div>');
    				return;
    			}
    			laypage({
    				cont: 'pagination',
    				layout: ['count', 'prev', 'page', 'next', 'limit', 'skip'],
    				count: data.totalData, // 总条数
//    				groups: 5, // 连续显示分页数
    				curr: curr,
    				jump: function(obj, first) {
    					curr = obj.curr;
    					options.params.page = obj.curr;
    					loading();
    					if(first){
    						reload(data.rows);
    					} else {
    						$.post(options.url, options.params, function(data) {
    							reload(data.rows);
    						}, 'json');
    					}
    				}
    			});
    		}, 'json');
    	});
    }
    
    this.reload();
    
    return this;

}


// 使用示例
// 首先页面中添加<table class="layui-table"></table>
// 若有两个table添加id并指定options.elem
//var options = {
//    heads: [{
//        filed: "id",
//        name: "ID",
//        width: "100px",
//    }, {
//        filed: "name",
//        name: "姓名",
//        width: "100px",
//        format: function(obj){
//        	return '<a href="#">'+obj.id+'</a>';
//        }
//    }],
//    url: "/sender/sms/task-list?${_csrf.parameterName}=${_csrf.token}",
//    // elem: "table",
//}
//DataTable(options);