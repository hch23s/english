//标段信息
function onSectionInfo(ele,areaCenter){
	$("#"+ele).empty();
	$("#"+ele).append("<option value='-1'>标段信息（全部）</option>");
	 $.ajax({
	        type: 'get',
	        url: '/areaDict/findSectionInfo?areaCenter='+areaCenter+'&${_csrf.parameterName}=${_csrf.token}',
	        async: false,
	        success: function (data) {
	        	var list = eval(data);    
	        	$.each(list,function(index,item){
	        		$("#"+ele).append("<option value='"+item.dictValue+"'>"+item.dictValue+"</option>");
	        	});
	        }
	 });
}
//代维单位
function onAgentUnit(ele,areaCenter){
	$("#"+ele).empty();
	$("#"+ele).append("<option value='-1'>代维单位（全部）</option>");
	 $.ajax({
	        type: 'get',
	        url: '/areaDict/findAgentUnit?areaCenter='+areaCenter+'&${_csrf.parameterName}=${_csrf.token}',
	        async: false,
	        success: function (data) {
	        	var list = eval(data);    
	        	$.each(list,function(index,item){
	        		$("#"+ele).append("<option value='"+item.dictValue+"'>"+item.dictValue+"</option>");
	        	});
	        }
	 });
}
//行政区域
function onArea(ele,areaCenter){
	$("#"+ele).empty();
	$("#"+ele).append("<option value='-1'>行政区域（全部）</option>");
	 $.ajax({
	        type: 'get',
	        url: '/areaDict/findArea?areaCenter='+areaCenter+'&${_csrf.parameterName}=${_csrf.token}',
	        async: false,
	        success: function (data) {
	        	var list = eval(data);    
	        	$.each(list,function(index,item){
	        		$("#"+ele).append("<option value='"+item.dictValue+"'>"+item.dictValue+"</option>");
	        	});
	        }
	 });
}
//局站属性
function onOfficeAttr(ele,netType){
	$("#"+ele).append("<option value='-1'>局站属性（全部）</option>");
    if(netType==""||netType==undefined||netType==null){
        netType=-1;
    }else if(netType==0){
        netType="固网";
    } else if(netType==1){
        netType="C网";
    }
	$("#"+ele).empty();
	 $.ajax({
	        type: 'get',
	        url: '/areaDict/findOfficeAttr?netType='+netType+'&${_csrf.parameterName}=${_csrf.token}',
	        async: false,
	        success: function (data) {
	        	var list = eval(data);    
	        	$.each(list,function(index,item){
	        		$("#"+ele).append("<option value='"+item.dictValue+"'>"+item.dictValue+"</option>");
	        	});
	        }
	 });
}
