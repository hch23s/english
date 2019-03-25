<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>注册/修改个人信息</title>
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <link rel="stylesheet" href="/layui/css/layui.css" media="all">
    <script type="text/javascript" src="/jquery/jquery-3.2.1.js"></script>
    <script src="/layui/layui.js" charset="utf-8"></script>

    <script>
    
	</script>
    <script type="text/javascript">
	    layui.use(['laypage', 'layer', 'form', 'upload', 'laydate'], function(){
	    	var laypage = layui.laypage;
            var form = layui.form;
            var layer = layui.layer;
            var laydate = layui.laydate;
            var upload = layui.upload;
	    	 <#if message??>
	    	 layer.msg("账号已存在");
	    	 </#if>
	    	 
	    	 
	    	  form.verify({
	              username: function (value) {
	                  if (value.length < 5) {
	                      return '账号至少得5个字符啊';
	                  }
	              }
	              , password1: [/(.+){6,12}$/, '密码必须6到12位']
	              , password2: [/(.+){6,12}$/, '密码必须6到12位']
	          });
	    	  //监听提交
	    	  form.on('submit(formDemo)', function(data){
	    		  if($("#password1").val()!=$("#password2").val()) {
	    			  layer.msg("密码必须一致");
	  	    	   	  return false;
	    		  }
	    		  $('#form2').attr("action", "/saveUser");
                  $('#form2').submit();
	    	  });
	    	 
	    	  
	    	});
	    function back() {
	    	window.location.href= "/back";
	    }
	    
	    
    </script>
</head>
	<body>
		<div style="margin-top:10px">
			<form class="layui-form"id="form2" method="post">
			
			
			  <#if user.id??>
			  <input type="hidden" name="id" value="${user.id?c}">
			  <div class="layui-form-item">
			    <label class="layui-form-label">账号</label>
			    <div class="layui-input-inline">
			      <input type="text" name="userName" value="${user.userName!''}" readonly required  lay-verify="username" placeholder="请输入账号" autocomplete="off" class="layui-input">
			    </div>
			  </div>
			  <#else>
				  <div class="layui-form-item">
				    <label class="layui-form-label">账号</label>
				    <div class="layui-input-inline">
				      <input type="text" name="userName"  required  lay-verify="username" placeholder="请输入账号" autocomplete="off" class="layui-input">
				    </div>
				  </div>
			  </#if>
			  
			  <div class="layui-form-item">
			    <label class="layui-form-label">密码</label>
			    <div class="layui-input-inline">
			      <input type="password"id="password1" name="password" required lay-verify="password1" placeholder="请输入密码" autocomplete="off" class="layui-input">
			    </div>
			  </div>
			  
			  <div class="layui-form-item">
			    <label class="layui-form-label">重复密码</label>
			    <div class="layui-input-inline">
			      <input type="password"id="password2" required lay-verify="password2" placeholder="请再次输入密码" autocomplete="off" class="layui-input">
			    </div>
			  </div>
			  
			  
			  
			  <div class="layui-form-item">
			    <div class="layui-input-block">
			      <button class="layui-btn" lay-submit lay-filter="formDemo">立即提交</button>
			    </div>
			  </div>
			  
			</form>
			<div class="layui-form-item">
		    <div class="layui-input-block">
		      <button   class="layui-btn layui-btn-primary"onclick="back()">返回登录</button>
		      </div>
			  </div>
		</div>
	</body>
</html>