<!DOCTYPE html>
<head>
    <meta charset="utf-8">
    <title>做题情况</title>
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1">
    <script type="text/javascript" src="/jquery/jquery-3.2.1.js"></script>
    <script src="/layui/layui.js" charset="utf-8"></script>
    <link rel="stylesheet" href="/layui/css/layui.css" media="all">
    <script src="/js/common/page_static.js" charset="utf-8"></script>

   
  <script type="text/javascript">
      
  </script>
      
      
</head>
<#include "../head.ftl">
	<br>
	<div class="layui-form" style="margin-left:35px;margin-right:500px">
	 <#if num==1>
	 听力近7天的做题情况
	 <#elseif num==2>
	 阅读近7天的做题情况
	 <#elseif num==3>
	 作文近7天的做题情况
	 </#if>
	<table class="layui-table" lay-size="sm" lay-even lay-skin="row" lay-size="lg">
	    <thead>
	    <colgroup>
	    <col width="60">
	    <col width="60">
	    <col width="150">
	    <col width="150">
	    <col width="150">
	    <col>
	  </colgroup>
	    <tr>
	        <th style="text-align:center;">序号</th>
	        <th style="text-align:center;">做题时间</th>
	        <th style="text-align:center;">做题总数</th>
	        <#if num==1||num==2>
	        <th style="text-align:center;">正确数</th>
	        <th style="text-align:center;">正确率</th>
	        </#if>
	    </tr>
	    </thead>
	    <tbody>
	        <#list list as item>
			<tr>
				<td style="text-align:center;" >${item_index+1}</td>
				<td style="text-align:center;" >${(item.studyTime?string("yyyy-MM-dd")!'')}</td>
				<td style="text-align:center;" >${item.topicNum!}</td>
				<#if num==1||num==2>
				<td style="text-align:center;" >${item.successNum!}</td>
				<td style="text-align:center;" >${item.accuracy!}%</td>
				</#if>
			</tr>
			</#list>
	    </tbody>
	    
	    
	    
	</table>
	</div>
</body>
</html>