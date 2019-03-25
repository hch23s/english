//title 格式 ：[{name:"主键",icon:0,column:"id",ishide:1},{name:"部门名称",icon:1,column:"name",ishide:0}]
layui.define(function(exports){ //提示：模块也可以依赖其它模块，如：layui.define('layer', callback);
  var obj = {
    init: function(e,title,data,btns,ischeck=false){
     	
     	var tr=$("<tr></tr>");
     	tr.appendTo($("#"+e));
     	if(ischeck){
     		var th=$('<th width="50px"></th>');
     		th.appendTo(tr);
     	}
     	//表头
     	$.each(title,function(index,item){
     		if(item.ishide==0){
     			var th=$('<th>'+item.name+'</th>');
     			th.appendTo(tr);
     		}
     	});
     	if(btns!=undefined&&btns!=''){
     		var th=$('<th>操作</th>');
     		th.appendTo(tr);
     	}
     	
     	//内容
     	this.node($("#"+e),title,data,btns,ischeck);
     	$("table td[name='name']").bind("click",function(){
     		var othis = $(this), 
			id = othis.parent().data('id'),
			expand = othis.parent().data('expand'),
			ischildren = othis.parent().data('ischildren');
     		console.log(expand);
			if(ischildren==0)
				return;
			if(expand==0){//未展开
				$("#"+e).find("tr[data-parentid="+id+"]").show();
				othis.parent().data("expand",1);
				othis.find("i[class='layui-icon'][name='tree-icon']").html("&#xe625;");
			}else{//展开
				$("#"+e).find("tr[data-parentid="+id+"]").hide();
				othis.parent().data("expand",0);
				console.log(othis.find("i[class='layui-icon']"));
				othis.find("i[class='layui-icon'][name='tree-icon']").html("&#xe623;");
			}
		});
    
     	
    },
    node:function(table,title,data,btns,ischeck){//节点
    	
    	$.each(data,function(index,item){
    		var ischildren  = 0;
    		
    		if(item.children!=undefined&&item.children.length>0)
    			ischildren = 1;
    		var tr=$('<tr id="'+item.id+'" data-id="'+item.id+'" data-expand="1" data-parentid="" data-ischildren="'+ischildren+'"></tr>');
     		tr.appendTo(table);
     		if(ischeck){
         		var td=$('<td ><input type="checkbox" name="check" value="'+item.id+'" lay-skin="primary"></td>');
         		td.appendTo(tr);
         	}
    		var icon = item.children!=undefined&&item.children.length>0?"&#xe623;":"&#xe625;";
    		$.each(title,function(index,t){
    			if(t.icon==1){
    				var td=$('<td name="name"><i name="tree-icon" class="layui-icon">'+icon+'</i>'+item[t.column]+'</td>');
    				td.appendTo(tr);
    			}else if(t.ishide==0){
    				var td=$('<td name="name">'+item[t.column]+'</td>');
    				td.appendTo(tr);
    			}
    			
    		});
    	
    		if(btns!=undefined&&btns!=''){
    			var btnsHtml = '';
    			$.each(btns,function(index,t){
        			btnsHtml += '<button class="layui-btn" onclick="'+t.method+'('+item.id+')">' + t.text + '</button>';
        			
        		});
         		var th=$('<th>'+btnsHtml+'</th>');
         		th.appendTo(tr);
         	}
    		
    		if(item.children!=undefined&&item.children.length>0){
    			obj.children(item.id,title,item.children,1,btns,ischeck);
    		}
     	});
     	
    },
     children:function(pid,title,data,level,btns,ischeck){//节点
     	var n = '';
     	for(var i=0;i<level;i++){
     		n +="&nbsp;&nbsp;&nbsp;&nbsp;";
     	}
    	$.each(data,function(index,item){
    		
    		var ischildren  = 0;
    		if(item.children!=undefined&&item.children.length>0)
    			ischildren = 1;
    		var tr=$('<tr id="'+item.id+'" data-id="'+item.id+'" data-expand="1" data-parentid="'+item.pid+'" data-ischildren="'+ischildren+'"></tr>');
     		$("#"+pid).after(tr);
     		if(ischeck){
         		var td=$('<td ><input type="checkbox" name="check" value="'+item.id+'" lay-skin="primary"></td>');
         		td.appendTo(tr);
         	}
    		var icon = item.children!=undefined&&item.children.length>0?"&#xe623;":"&#xe625;";
    		$.each(title,function(index,t){
    			
    			if(t.icon==1){
    				var td=$('<td name="name">'+n+'<i name="tree-icon" class="layui-icon">'+icon+'</i>'+item[t.column]+'</td>');
    				td.appendTo(tr);
    			}else if(t.ishide==0){
    				var td=$('<td name="name">'+item[t.column]+'</td>');
    				td.appendTo(tr);
    			}
    			
    		});
    		if(btns!=undefined&&btns!=''){
    			var btnsHtml = '';
    			$.each(btns,function(index,t){
        			btnsHtml += '<button class="layui-btn" onclick="'+t.method+'('+item.id+')">' + t.text + '</button>';
        			
        		});
         		var th=$('<th>'+btnsHtml+'</th>');
         		th.appendTo(tr);
         	}
    		if(item.children!=undefined&&item.children.length>0){
    			obj.children(item.id,title,item.children,level+1,'',ischeck);
    		}
     	});
    }
  };
  
  //输出test接口
  exports('treetable', obj);
});    