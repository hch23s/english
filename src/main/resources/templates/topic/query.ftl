<!DOCTYPE html>
<head>
    <meta charset="utf-8">
    <title>管理题目</title>
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
              <#if message??>
		           layer.msg("登录信息有误，账号或密码错误");
		      </#if>
              form.on('submit(search)', function (data) {
                
                  $('#form2').attr("action", "/topic/query");
                  $('#form2').submit();
              });
//  
              
          });
    	   $("#type option[value='${(topic.type)!''}']").attr("selected",true);
//           $("#type").append('<option value="${(topic.type)!''}">${(topic.type)!''}</option>');

      });
      //添加
      function add(num) {
    		window.location.href= "/topic/add?num="+num;
      }
      //修改
      function edit(id,num) {
    		 $('#form2').attr("action","/topic/add?id="+id+"&num="+num);
             $('#form2').submit();
      }
      //删除
      function del(id,num) {
  		 $('#form2').attr("action", "/topic/del?id="+id+"&num="+num);
         $('#form2').submit();
      }
      
  </script>
      
      
</head>
<#include "../head.ftl">
	<form id="form2" class="layui-form" method="post"style="margin-left:35px;margin-top:20px;">
		<input type="hidden" name="id" id="id">
		<div class="layui-input-inline">
		    <select id="type" name="type" >
		        <option value="听力">听力</option>
		        <option value="阅读">阅读</option>
		        <option value="作文">作文</option>
		    </select>
		</div>
		
		<div class="layui-input-inline">
		<input id="name" type="topicName" name="topicName"
		    placeholder="题目" class="layui-input"  value="${topic.topicName!''}"/>
		</div>	
	
		<button class="layui-btn layui-btn-sm" lay-submit lay-filter="search">查询</button>
	</form>
	<br>
	<div style="margin-left:35px;" >
		<button class="layui-btn layui-btn-sm" onclick="add(1)">添加听力</button>
		<button class="layui-btn layui-btn-sm" onclick="add(2)">添加阅读</button>
		<button class="layui-btn layui-btn-sm" onclick="add(3)">添加作文</button>
	</div>	
	<br>
	<div class="layui-form" style="margin-left:35px;margin-right:400px">
	<table class="layui-table" lay-size="sm" lay-even lay-skin="row" lay-size="lg">
	<#if num==1>
	    <thead>
	    <colgroup>
	    <col width="60">
	    <col width="60">
	    <col width="150">
	    <col width="150">
	    <col width="150">
	    <col width="150">
	    <col width="150">
	    <col width="150">
	    <col width="150">
	    <col>
	  </colgroup>
	    <tr>
	        <th style="text-align:center;">序号</th>
	        <th style="text-align:center;">类型</th>
	        <th style="text-align:center;">题目</th>
	        <th style="text-align:center;">答案A</th>
	        <th style="text-align:center;">答案B</th>
	        <th style="text-align:center;">答案C</th>
	        <th style="text-align:center;">正确答案</th>
	        <th style="text-align:center;">操作</th>
	    </tr>
	    </thead>
	    <tbody>
	        <#list pageResult.rows as item>
			<tr>
				<td style="text-align:center;" >${item_index+1}</td>
				<td style="text-align:center;" >${item.type!}</td>
				<td style="text-align:center;" >
					<audio controls="controls" >
			            <source src="/mp3/${item.topicName!}">
			        </audio>
			        </td>
				<td style="text-align:center;" >${item.a!}</td>
				<td style="text-align:center;" >${item.b!}</td>
				<td style="text-align:center;" >${item.c!}</td>
				<td style="text-align:center;" >${item.success!}</td>
				<td style="text-align:center;" >
					<button class="layui-btn layui-btn-sm" onclick="edit(${item.id?c},1)">修改</button>
					<button class="layui-btn layui-btn-sm" onclick="del(${item.id?c},1)">删除</button>

				</td>
			</tr>
			</#list>
	    </tbody>
	    <#elseif num==2>
	    <thead>
	    <colgroup>
	    <col width="60">
	    <col width="60">
	    <col width="300">
	    <col width="150">
	    <col width="150">
	    <col width="150">
	    <col width="150">
	    <col width="150">
	    <col width="150">
	    <col>
	  </colgroup>
	    <tr>
	        <th style="text-align:center;">序号</th>
	        <th style="text-align:center;">类型</th>
	        <th style="text-align:center;">题目</th>
	        <th style="text-align:center;">答案A</th>
	        <th style="text-align:center;">答案B</th>
	        <th style="text-align:center;">答案C</th>
	        <th style="text-align:center;">答案D</th>
	        <th style="text-align:center;">正确答案</th>
	        <th style="text-align:center;">操作</th>
	    </tr>
	    </thead>
	    <tbody>
	        <#list pageResult.rows as item>
			<tr>
				<td style="text-align:center;" >${item_index+1}</td>
				<td style="text-align:center;" >${item.type!}</td>
				<td style="text-align:center;" > ${item.topicName!}</td>
				<td style="text-align:center;" >${item.a!}</td>
				<td style="text-align:center;" >${item.b!}</td>
				<td style="text-align:center;" >${item.c!}</td>
				<td style="text-align:center;" >${item.d!}</td>
				<td style="text-align:center;" >${item.success!}</td>
				<td style="text-align:center;" >
					<button class="layui-btn layui-btn-sm" onclick="edit(${item.id?c},2)">修改</button>
					<button class="layui-btn layui-btn-sm" onclick="del(${item.id?c},2)">删除</button>

				</td>
			</tr>
			</#list>
	    </tbody>
	    
	    
	    <#elseif num==3>
	    <thead>
	    <colgroup>
	    <col width="60">
	    <col width="60">
	    <col width="300">
	    <col width="150">
	    <col>
	  </colgroup>
	    <tr>
	        <th style="text-align:center;">序号</th>
	        <th style="text-align:center;">类型</th>
	        <th style="text-align:center;">题目</th>
	        <th style="text-align:center;">操作</th>
	    </tr>
	    </thead>
	    <tbody>
	        <#list pageResult.rows as item>
			<tr>
				<td style="text-align:center;" >${item_index+1}</td>
				<td style="text-align:center;" >${item.type!}</td>
				<td style="text-align:center;" >
					${item.topicName!}
			        </td>
				<td style="text-align:center;" >
					<button class="layui-btn layui-btn-sm" onclick="edit(${item.id?c},3)">修改</button>
					<button class="layui-btn layui-btn-sm" onclick="del(${item.id?c},3)">删除</button>

				</td>
			</tr>
			</#list>
	    </tbody>
	    
	    
	    </#if>
	    
	</table>
	<div id="demo1" style="margin-top:10px;margin-left:10px"></div>
	</div>
</body>
</html>