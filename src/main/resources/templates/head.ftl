<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>系统页面</title>
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <link rel="stylesheet" href="/layui/css/layui.css" media="all">
    <script type="text/javascript" src="/jquery/jquery-3.2.1.js"></script>
    <script src="/layui/layui.js" charset="utf-8"></script>

    <script>
    
	  </script>
    <script type="text/javascript">
    //注意：选项卡 依赖 element 模块，否则无法进行功能性操作
	  layui.use('element', function(){
	    var element = layui.element;
	    
	    //…
	  });
    </script style="margin:auto">
			<ul class="layui-nav" lay-filter=""style="margin:auto">
			  <li class="layui-nav-item">
			  	<a href="javascript:;">题库模块</a>
			  	<dl class="layui-nav-child"> <!-- 二级菜单 -->
			      <dd><a href="/study/topic?num=1">听力</a></dd>
			      <dd><a href="/study/topic?num=2">阅读</a></dd>
			      <dd><a href="/study/topic?num=3">作文</a></dd>
			    </dl>
			  </li>
			  <li class="layui-nav-item">
			    <a href="javascript:;">可视化</a>
			    <dl class="layui-nav-child"> <!-- 二级菜单 -->
			      <dd><a href="/study/accuracy?num=1">听力</a></dd>
			      <dd><a href="/study/accuracy?num=2">阅读</a></dd>
			      <dd><a href="/study/accuracy?num=3">作文</a></dd>
			    </dl>
			  </li>
			  <li class="layui-nav-item">
			  	 <a href="javascript:;">个人信息(${user.userName!''})</a>
			  	 <dl class="layui-nav-child"> <!-- 二级菜单 -->
				      <dd><a href="/detail">修改密码</a></dd>
				      <dd><a href="/logout">退出</a></dd>
			     </dl>
			  </li>
			  <#if "${user.userName!''}"=="123456"> <!--当登录人账号是123456时，显示管理员模块-->
			  <li class="layui-nav-item">
			  	  <a href="javascript:;">管理员模块</a>
				  <dl class="layui-nav-child"> <!-- 二级菜单 -->
				      <dd><a href="/topic/query?num=1">管理听力</a></dd>
				      <dd><a href="/topic/query?num=2">管理阅读</a></dd>
				      <dd><a href="/topic/query?num=3">管理作文</a></dd>
				      <dd><a href="/userList">管理人员</a></dd>
				    </dl>
			  </li>
			  </#if>
			</ul>
		</div>
	</body>
</html>