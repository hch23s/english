var areaAll = new Array("东区","西区","南区","北区","通州","动力");
var allGroup = new Array("VIP组","1组","2组","3组","4组","顺义组","怀柔组","平密组","房山组","门头沟组","昌平组","回龙观组","延庆组","通州1组","通州2组","大兴1组","大兴2组","电信维护1区","电信维护2区","电信维护3区","电信维护4区","电信维护5区","电信维护6区","电信维护7区","电信维护8区","电信维护9区","电信维护10区","电信维护11区","电信维护12区","电信维护13区","电信维护14区","电信维护15区","电信维护16区");
var dqGroup = new Array(  "VIP组","1组","2组","3组","4组","顺义组","怀柔组","平密组","电信维护1区","电信维护3区","电信维护9区","电信维护12区");
var nqGroup = new Array("VIP组","1组","2组","电信维护7区","电信维护11区");
var xqGroup = new Array("VIP组","1组","2组","房山组","门头沟组","电信维护5区","电信维护6区","电信维护8区","电信维护14区");
var bqGroup = new Array("VIP组","1组","2组","3组","4组","昌平组","回龙观组","延庆组","电信维护2区","电信维护4区","电信维护10区","电信维护13区");
var tzGroup = new Array("VIP组","通州1组","通州2组","大兴1组","大兴2组","电信维护15区","电信维护16区");
var jkGroup = new Array("传输调度组","无线调度组","交换调度组");
var gxGroup = new Array("线路干线组","线路西区组","线路东区组","线路南区组","线路北区组");
var xxGroup = new Array("服务调度组","视频维护组","云计算维护组","现场运维组","技术支持组","NOC组");
var dlGroup = new Array("监控平台组","母局维护组");
var kyGroup = new Array("永丰值守组","驻场服务组");
var dqClass = new Array("—","VIP1班","1班","2班","3班","4班","东四母局班","静安母局班","平谷1班","平谷2班","密云1班","密云2班");
var bqClass = new Array("—","VIP1班","1班","2班","3班","4班","西单母局班","德外母局班");
var nqClass = new Array("—","VIP1班","1班","2班","3班","4班");
var xqClass = new Array("—","VIP1班","1班","2班","3班","4班");
var tzClass = new Array("—","VIP1班","1班","2班","3班","4班");
var allClass = new Array("—","VIP1班","1班","2班","3班","4班","东四母局班","静安母局班","西单母局班","德外母局班","平谷1班","平谷2班","密云1班","密云2班");
var layForm;
function setArea(ele,groupEle,classEle,area,group,clazz){
	  layui.use([ 'layer','form'], function(){
		  layForm = layui.form;
		  layForm.on('select(onAreaCenter)', function(data){
			  $("#"+groupEle).empty();

			  setGroup(groupEle,$("#"+ele).val());
			  $("#"+classEle).empty();
			  setClass(classEle,$("#"+ele).val());
			  layForm.render();
		  });
		  layForm.on('select(onGroup)', function(data){

//			  alert($("#"+groupEle).val());
			  layForm.render();
		  });
	  });
	if(area.length>2)
		area = area.substring(0,2);
	switch(area){
	case "东区":
	case "西区":
	case "南区":
	case "北区":
	case "通州":{
		$("#"+ele).empty();
		$("#"+ele).append("<option value='-1'>维护部门</option>");
		$("#"+ele).append("<option value='"+area+"'>"+area+"</option>");
		if(group=="-1")
			setGroup(groupEle,area);
		else{
			$("#"+groupEle).empty();
			$("#"+groupEle).append("<option value='"+group+"'>"+group+"</option>");
		}
		if(clazz=="-1")
			setClass(classEle,area);
		else{

			$("#"+classEle).empty();
			$("#"+classEle).append("<option value='-1'>维护网格</option>");
			$("#"+classEle).append("<option value='"+clazz+"'>"+clazz+"</option>");
		}
		setClass(classEle,area);
		break;
	}

	default:{
		$.each(areaAll,function(index,item){
			$("#"+ele).append("<option value='"+item+"'>"+item+"</option>");
		});
		setGroup(groupEle,"-1");
		setClass(classEle,"-1");
		break;
	}

	}

	layForm.render();
}
function setGroup(ele,area){
	$("#"+ele).append("<option value='-1'>维护网格</option>");
	switch(area){
	case "东区":{
		$.each(dqGroup,function(index,item){

			$("#"+ele).append("<option value='"+item+"'>"+item+"</option>");
		});
		break;
	}
	case "西区":{
		$.each(xqGroup,function(index,item){
			$("#"+ele).append("<option value='"+item+"'>"+item+"</option>");
		});
		break;
	}
	case "南区":{
		$.each(nqGroup,function(index,item){
			$("#"+ele).append("<option value='"+item+"'>"+item+"</option>");
		});
		break;
	}
	case "北区":{
		$.each(bqGroup,function(index,item){
			$("#"+ele).append("<option value='"+item+"'>"+item+"</option>");
		});
		break;
	}
	case "通州":{
		$.each(tzGroup,function(index,item){
			$("#"+ele).append("<option value='"+item+"'>"+item+"</option>");
		});
		break;
	}

	default:{
		$.each(allGroup,function(index,item){
			$("#"+ele).append("<option value='"+item+"'>"+item+"</option>");
		});
		break;
	}

	}
	layForm.render();
}
function setClass(ele,area){
	$("#"+ele).append("<option value='-1'>维护班（全部）</option>");
	switch(area){
	case "东区":
		$.each(dqClass,function(index,item){
			$("#"+ele).append("<option value='"+item+"'>"+item+"</option>");
		});
		break;
	case "西区":
		$.each(xqClass,function(index,item){
			$("#"+ele).append("<option value='"+item+"'>"+item+"</option>");
		});
		break;
	case "南区":
		$.each(nqClass,function(index,item){
			$("#"+ele).append("<option value='"+item+"'>"+item+"</option>");
		});
		break;
	case "北区":
		$.each(bqClass,function(index,item){
			$("#"+ele).append("<option value='"+item+"'>"+item+"</option>");
		});
		break;
	case "通州":
		$.each(tzClass,function(index,item){
			$("#"+ele).append("<option value='"+item+"'>"+item+"</option>");
		});
		break;
	default:
		$.each(allClass,function(index,item){
			$("#"+ele).append("<option value='"+item+"'>"+item+"</option>");
		});
		break;
	}
	layForm.render();
}