<!DOCTYPE html>
<head>
    <meta charset="utf-8">
    <title>英语学习过程管理系统</title>
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1">
    <script type="text/javascript" src="/jquery/jquery-3.2.1.js"></script>
    <script src="/layui/layui.js" charset="utf-8"></script>
    <link rel="stylesheet" href="/layui/css/layui.css" media="all">

   
  <script type="text/javascript">
      $(function () {
          layui.use(['laypage', 'layer', 'form', 'upload', 'laydate'], function () {
              var laypage = layui.laypage;
              var form = layui.form;
              var layer = layui.layer;
              var laydate = layui.laydate;
              var upload = layui.upload;
              <#if message??>
		           layer.msg("${message}");
		      </#if>
              form.on('submit(search)', function (data) {
                
                  $('#form2').attr("action", "/index");
                  $('#form2').submit();
              });
              form.on('submit(add)', function (data) {
                  $('#form2').attr("action", "/addUser");
                  $('#form2').submit();
              });
             
          });
      });
  </script>
      
      
</head>

<body sytle="text-align:center;">
	<form id="form2" class="layui-form" method="post" style="margin-top:20px">
    	<div class="layui-form-item">
			<label class="layui-form-label">账号</label>
		    <div class="layui-input-inline">
		      <input type="text" name="userName" required  lay-verify="userName" placeholder="请输入账号" autocomplete="off" class="layui-input">
		    </div>
	    </div>
	  
	   <div class="layui-form-item">
		   <label class="layui-form-label">密码</label>
		   <div class="layui-input-inline">
		   		<input type="password" name="password" required lay-verify="password1" placeholder="请输入密码" autocomplete="off" class="layui-input">
		   </div>
	   </div>
	            
	   <div class="layui-form-item">
	    <div class="layui-input-block">
	    <button class="layui-btn layui-btn-sm" lay-submit lay-filter="search">登录</button>
	     <button class="layui-btn layui-btn-sm"   lay-submit lay-filter="add">注册</button>
	    </div>
	  </div>
    </form>
</body>
</html>