<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>做题目</title>
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <link rel="stylesheet" href="/layui/css/layui.css" media="all">
    <script src="/layui/layui.js" charset="utf-8"></script>

    <script type="text/javascript" src="/jquery/jquery-3.2.1.js"></script>

    <script>
    
	</script>
    <script type="text/javascript">
    $(function () {
	    layui.use('form', function(){
	    	  var form = layui.form;
	    	   $("#success option[value='${(topic.success)!''}']").attr("selected",true);
    	});
    });
    function save() {
    	
    	var success=$("input[name='success']:checked").val();
    	var success2= $('#success').val();
    	if(success  == success2) {
    		success="恭喜您,本题您做对了";
    	}else {
    		success="不好意思,本题您做错了";
    	}
    	if(${num}==3 && $('#success').val()=="") {
    		layer.msg("您的作文没有填写，请填写后再提交")
    		return false;
    	}
    	
    	if(${num}==3) {
    		layer.open({
                type:1,
                shade: 0,
                title:'答案',
                offset: '150px',
                area:['400px','360px'],
                shadeClose:true
                //点击遮罩关闭
                ,content:"本次作文您已做完"
                , cancel: function () {
    			$('#from2').attr("action", "/study/save");
                $('#from2').submit();
                }
            });
    	}else {
    	  layer.open({
              type:1,
              shade: 0,
              title:'答案',
              offset: '150px',
              area:['400px','360px'],
              shadeClose:true
              //点击遮罩关闭
              ,content:"本题答案是"+success2+success
              , cancel: function () {
            	  $('#from2').attr("action", "/study/save");
                  $('#from2').submit();
              }
          });
    	}
	  }
 
	function back() {
		window.location.href= "/study/topic?num="+${num};
	}
	    
    </script>
</head>
	<body>
	<#include "../head.ftl">
		<div style="margin-top:20px;margin-right:500px">
			<#if num==1>
				<#if topic??>
				
					<form class="layui-form" id="from2" action="">
						<input type="hidden" name="id" value="${topic.id?c}">
						<input type="hidden" name="num" value="${num}">
						<input type="hidden" id="success" name="success" value="${topic.success!}">
						<div class="layui-form-item">
						 <label class="layui-form-label">听力题</label>
						  <div align="left">
							<audio controls="controls" >
				            	<source src="/mp3/${topic.topicName!}">
				            </audio>
			              </div>
			            </div>
			            <div class="layui-form-item">
				            <div class="layui-input-block">
				              答案A<input type="radio"  name="success" value="A" title="${topic.a!}" checked>
				              <br>
				              答案B<input type="radio"    name="success" value="B" title="${topic.b!}" >
				              <br>
				              答案C<input type="radio"   name="success" value="C" title="${topic.c!}" >
				            </div>
			            </div>	
		          </form>
		          <div class="layui-form-item"style="margin-top:15px;">
				    <div class="layui-input-block">
		              <button class="layui-btn  layui-btn-sm" onclick="save()">提交</button>
				    <button class="layui-btn layui-btn-sm" onclick="back()">下一题</button>
				    </div>
				  </div>
		          
	          <#else>
				<div style="margin-top:20px;margin-left:35px">
				不好意思，暂时没有听力题，请联系管理员添加
				</div>
	          </#if >
			    <#elseif num==2>
			    	<#if topic??>
						<form class="layui-form" id="from2" action="">
						<input type="hidden" name="id" value="${topic.id?c}">
						<input type="hidden" name="num" value="${num}">
						<input type="hidden" id="success" name="success" value="${topic.success}">
						
						 <div class="layui-form-item layui-form-text">
						    <label class="layui-form-label">题目</label>
						    <div class="layui-input-block">
						      <textarea value="${topic.success!}"readonly placeholder="请输入内容" class="layui-textarea">  ${topic.topicName}</textarea>
						    </div>
						  </div>
						
			            <div class="layui-form-item">
				            <div class="layui-input-block">
				              答案A<input type="radio"  name="success" value="A" title="${topic.a!}" checked>
				              <br>
				              答案B<input type="radio"  name="success" value="B" title="${topic.b!}" >
				              <br>
				              答案C<input type="radio"  name="success" value="C" title="${topic.c!}" >
				              <br>
				              答案D<input type="radio"  name="success" value="D" title="${topic.d!}" >
				            </div>
			            </div>	
			            </form>
			            <div class="layui-form-item"style="margin-top:15px;">
						    <div class="layui-input-block">
				              <button class="layui-btn  layui-btn-sm" onclick="save()">提交</button>
						    <button class="layui-btn layui-btn-sm" onclick="back()">下一题</button>
						    </div>
					    </div>
	            <#else>
					<div style="margin-top:20px;margin-left:35px">
					不好意思，暂时没有阅读题，请联系管理员添加
					</div>
	          </#if >
	            
			    <#elseif num==3>
			    	<#if topic??>
				    <form class="layui-form" id="from2" action="">
					<input type="hidden" name="id" value="${topic.id?c}">
					<input type="hidden"  name="num" value="${num}">
					
					 <div class="layui-form-item layui-form-text">
					    <label class="layui-form-label">题目</label>
					    <div class="layui-input-block">
					      <textarea name="success" value="${topic.success!}"readonly placeholder="请输入内容" class="layui-textarea">  ${topic.topicName}</textarea>
					    </div>
					  </div>
					  <div class="layui-form-item layui-form-text">
					    <label class="layui-form-label">文本域</label>
					    <div class="layui-input-block">
					      <textarea name="success" id="success" value="${topic.success!}" placeholder="请输入内容" class="layui-textarea"></textarea>
					    </div>
					  </div>
	          </form>
	          <div class="layui-form-item"style="margin-top:15px;">
			    <div class="layui-input-block">
	            <button class="layui-btn  layui-btn-sm" onclick="save()">提交</button>
			    <button class="layui-btn layui-btn-sm" onclick="back()">下一题</button>
			    </div>
			  </div>
          <#else>
				<div style="margin-top:20px;margin-left:35px">
			不好意思，暂时没有作文，请联系管理员添加
			</div>
        </#if >
    </#if>
			   
			  
		</div>
	</body>
</html>