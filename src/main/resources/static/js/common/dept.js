var dept;
var areaReg=new RegExp("东区|西区|南区|北区|通州|动力|监控调度中心|管线维护中心|信息服务中心|客户业务中心|工程管理部|运维管理部|营装维中心");
var groupReg=new RegExp("VIP组|1组|2组|3组|4组|顺义组|怀柔组|平密组|房山组|门头沟组|昌平组|回龙观组|延庆组|通州1组|通州2组|大兴1组|大兴2组|" +
	"电信维护1区|电信维护2区|电信维护3区|电信维护4区|电信维护5区|电信维护6区|电信维护7区|电信维护8区|电信维护9区|电信维护10区|电信维护11区|电信维护12区|电信维护13区|电信维护14区|电信维护15区|电信维护16区|城北移动（西）|联通二区|联通三区|昌平移动|城北移动（北）");
function initDept(){
	 $.ajax({
	        type: 'get',
	        url: '/dept/queryTreeJson?${_csrf.parameterName}=${_csrf.token}',
	        async: false,
	        success: function (data) {
				console.log("initdept---"+data);
	        	dept = eval(data);              	
	        }
	    })
}
function setGroup(areaCenter){
	   	
        	var list=[];
			$("#maintenanceTeams").empty();      
			
          	$.each(dept[0].children,function(index,item){
          			console.log(item);        
          		if(areaCenter!='-1'&&item.name==areaCenter){

          			$.each(item.children,function(index,item1){
							
          				if(list.indexOf(item1.name)==-1&&item1.name.match(groupReg)){
          					// console.log(areaCenter+item1.name);
          					list.push(item1.name);
          				}
						
          			});
          		}
          		else if(areaCenter=='-1'&&item.name.match(areaReg)){
          			
          			$.each(item.children,function(index,item1){
						if(list.indexOf(item1.name)==-1&&item1.name.match(groupReg)){
							// console.log(areaCenter+item1.name);
          					list.push(item1.name);
          				}
						
          			});
          		}
          	});
          	if(list.lenght!=1)
          		$("#maintenanceTeams").append("<option value='-1'>维护网格</option>");
          	$.each(list,function(index,item1){
				
          		$("#maintenanceTeams").append("<option value='"+item1+"'>"+item1+"</option>");
          	});
        
}
function setClass(areaCenter,maintenanceTeams){
		
        	var list=[];
        	$("#maintenanceClass").empty();
          	$.each(dept[0].children,function(index,item){
          		//判断区域中心是否符合
          		if(item.name==areaCenter){		
          			$.each(item.children,function(index,item1){	//组循环
          				//判断组是否符合
          				if(item1.name==maintenanceTeams){
          					$.each(item1.children,function(index,item2){
          						if(list.indexOf(item2.name)==-1){//判断班是否存在
          					
                  					list.push(item2.name);
                  				}
          						//$("#maintenanceClass").append("<option value='"+item2.name+"'>"+item2.name+"</option>");
          					});
          				}else if(maintenanceTeams=='-1'&&item1.name.match(groupReg)){//选择全部租
          					$.each(item1.children,function(index,item2){
          						if(list.indexOf(item2.name)==-1){
          					
                  					list.push(item2.name);
                  				}
          						//$("#maintenanceClass").append("<option value='"+item2.name+"'>"+item2.name+"</option>");
          					});
          				}
						
          			});
          		}else if(areaCenter=="-1"&&item.name.match(areaReg)){//如果选择的是全部区域中心
          			$.each(item.children,function(index,item1){	//组循环
          				if(item1.name==maintenanceTeams){
          					
          					$.each(item1.children,function(index,item2){
          					
          						if(list.indexOf(item2.name)==-1){
          					
                  					list.push(item2.name);
                  				}
          					});
          				}else if(maintenanceTeams=='-1'&&item1.name.match(groupReg)){
          					$.each(item1.children,function(index,item2){
          						if(list.indexOf(item2.name)==-1){
          					
                  					list.push(item2.name);
                  				}
          						//$("#maintenanceClass").append("<option value='"+item2.name+"'>"+item2.name+"</option>");
          					});
          				}
						
          			});
          		}
          		
          	});
          	if(list.lenght!=1)
          		$("#maintenanceClass").append("<option value='-1'>维护班（全部）</option>");
          	$.each(list,function(index,item1){
				
          		$("#maintenanceClass").append("<option value='"+item1+"'>"+item1+"</option>");
          	});
        

}