<!DOCTYPE html>
<head>
    <meta charset="utf-8">
    <title>用户管理</title>
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1">
    <script type="text/javascript" src="/jquery/jquery-3.2.1.js"></script>
    <script src="/layui/layui.js" charset="utf-8"></script>
    <link rel="stylesheet" href="/layui/css/layui.css" media="all">
    <script src="/js/common/page_static.js" charset="utf-8"></script>

   
  <script type="text/javascript">
  
        
      $(function () {
    	  PageRender('demo1',${(pageResult.totalCount?c)!'1'},${(pageResult.page?c)!'1'},${(pageResult.pageSize?c)!'1'}, 10, function (obj, first) {
              if (!first) {//首次不执行

                  $("#form2").attr("action", "/topic/query?pageNum=" + obj.curr + "&pageSize=" + obj.limit);
                  $("#form2").submit();
              }
          });
    	  
    	  layui.use(['laypage', 'layer', 'form', 'upload', 'laydate'], function () {
              var laypage = layui.laypage;
              var form = layui.form;
              var layer = layui.layer;
              var laydate = layui.laydate;
              var upload = layui.upload;
              <#if msg??>
              layer.msg("${msg}");
              </#if>
    	  })
    	  
      })
      //删除
      function del(id) {
    	  window.location.href="/delete?id="+id
      }
      
  </script>
      
      
</head>
<#include "head.ftl">
	<div class="layui-form" style="margin-left:35px;">
	管理用户信息
	<table class="layui-table" lay-size="sm" lay-even lay-skin="row" lay-size="lg">
	    <thead>
	    <colgroup>
	    <col width="60">
	    <col width="60">
	    <col width="150">
	    <col width="150">
	    <col>
	  </colgroup>
	    <tr>
	        <th style="text-align:center;">序号</th>
	        <th style="text-align:center;">账号</th>
	        <th style="text-align:center;">密码</th>
	        <th style="text-align:center;">操作</th>
	    </tr>
	    </thead>
	    <tbody>
	        <#list pageResult.rows as item>
			<tr>
				<td style="text-align:center;" >${item_index+1}</td>
				<td style="text-align:center;" >${item.userName!}</td>
				<td style="text-align:center;" >${item.password!}</td>
				<td style="text-align:center;" >
					<button class="layui-btn layui-btn-sm" onclick="del(${item.id?c})">删除</button>
				</td>
			</tr>
			</#list>
	    </tbody>
	    
	    
	</table>
	<div id="demo1" style="margin-top:10px;margin-left:10px"></div>
	</div>
</body>
</html>