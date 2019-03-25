<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>添加/修改题目</title>
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
	    	  
	    	  form.on('submit(search)', function (data) {
	    		   if($("#topicName").val()==null||$("#topicName").val()=="") {
	    			   layer.msg("题目不能为空");
	    			   return false;
	    		   }
	    		 
	    		   
	    		   if($("#type").val()!="作文" ) {
	    			   if($("#a").val()==null||$("#a").val()=="") {
		    			   layer.msg("题目a不能为空");
		    			   return false;
		    		   }
		    		   if($("#b").val()==null||$("#b").val()=="") {
		    			   layer.msg("题目b不能为空");
		    			   return false;
		    		   }
		    		   if($("#c").val()==null||$("#c").val()=="") {
		    			   layer.msg("题目c不能为空");
		    			   return false;
		    		   }
	    			   if($("#success").val()==null ||$("#success").val()=="") {
		    			   layer.msg("正确答案不能为空");
		    			   return false;
		    		   }
	    		   }
    			   
                  $('#from1').attr("action", "/topic/save1");
                  $('#from1').submit();
                  
                  $('#from2').attr("action", "/topic/save2");
                  $('#from2').submit();
              });
	    	   $("#success option[value='${(topic.success)!''}']").attr("selected",true);

	    	});
    });
    function back() {
    	window.location.href= "/topic/back";
    }
	
	    
    </script>
</head>
	<body>
	<#include "../head.ftl">

	</form>
		<div style="margin-top:20px;margin-right:500px">
		

				<#if num==1>
				<form id="from1"  action=""  method="post" enctype="multipart/form-data">
				<input type="hidden" name="id" value="${id!''}">
				<input type="hidden" name="type" value="听力">
				<input type="hidden" name="num" value="1">

					<div class="layui-form-item">
					    <label class="layui-form-label">上传听力题</label>
					    <div class="layui-input-block">
							<input type="file" id="topicName" name="name" value="${topic.topicName!''}"  lay-verify="required" placeholder="请上传听力题" >
						</div>
				   </div>
						  
					<div class="layui-form-item">
					    <label class="layui-form-label">答案A</label>
					    <div class="layui-input-block">
					      <input type="text"id="a" name="a" value="${topic.a!''}"  lay-verify="required" placeholder="请输入A的答案" autocomplete="off" class="layui-input">
					    </div>
					</div>
				  
				  <div class="layui-form-item">
				    <label class="layui-form-label">答案B</label>
				    <div class="layui-input-block">
				      <input type="text"id="b" name="b" value="${topic.b!''}"  lay-verify="required" placeholder="请输入B的答案" autocomplete="off" class="layui-input">
				    </div>
				  </div>
				  
				  <div class="layui-form-item">
				    <label class="layui-form-label">答案C</label>
				    <div class="layui-input-block">
				      <input type="text"id="c" name="c" value="${topic.c!''}"  lay-verify="required" placeholder="请输入C的答案" autocomplete="off" class="layui-input">
				    </div>
				  </div>
				  
				  <div class="layui-form-item">
				    <label class="layui-form-label">正确答案</label>
				    <div class="layui-input-block">
					    <select id="success" name="success"class="layui-input" >
				        	<option value="">正确答案</option>
					        <option value="A">A</option>
					        <option value="B">B</option>
					        <option value="C">C</option>
					    </select>
				    </div>
				  </div>
				  <div class="layui-form-item"style="margin-top:15px;">
				    <div class="layui-input-block">
				    <button class="layui-btn layui-btn-sm" lay-submit lay-filter="search">保存</button>

				    </div>
				  </div>
				  
				</form>
			    <#elseif num==2>
			    <form id="from2" action=""  method="post">
				<input type="hidden" name="type" value="阅读">
				<input type="hidden" name="id" value="${id!''}">
				<input type="hidden" name="num" value="2">
				
				
				<div class="layui-form-item layui-form-text">
			    <label class="layui-form-label">题目</label>
			    <div class="layui-input-block">
			      <textarea  placeholder="请输入题目"id="topicName" name="topicName"value="${topic.topicName!''}"required lay-verify="required"  class="layui-textarea"> ${topic.topicName!''}</textarea>
			    </div>
			  </div>

					  
					  <div class="layui-form-item">
					    <label class="layui-form-label">答案A</label>
					    <div class="layui-input-block">
					      <input type="text"id="a" name="a"value="${topic.a!''}" required lay-verify="required" placeholder="请输入A的答案" autocomplete="off" class="layui-input">
					    </div>
					  </div>
				  
					  <div class="layui-form-item">
					    <label class="layui-form-label">答案B</label>
					    <div class="layui-input-block">
					      <input type="text"id="b" name="b"value="${topic.b!''}" required lay-verify="required" placeholder="请输入B的答案" autocomplete="off" class="layui-input">
					    </div>
					  </div>
					  
					  <div class="layui-form-item">
					    <label class="layui-form-label">答案C</label>
					    <div class="layui-input-block">
					      <input type="text"id="c" name="c"value="${topic.c!''}" required lay-verify="required" placeholder="请输入C的答案" autocomplete="off" class="layui-input">
					    </div>
					  </div>
					  
					  <div class="layui-form-item">
					    <label class="layui-form-label">答案D</label>
					    <div class="layui-input-block">
					      <input type="text"id="d" name="d"value="${topic.d!''}" required lay-verify="required" placeholder="请输入D的答案" autocomplete="off" class="layui-input">
					    </div>
					  </div>
					  
					  <div class="layui-form-item">
					    <label class="layui-form-label">正确答案</label>
					    <div class="layui-input-block">
						    <select id="success" name="success" class="layui-input">
					        	<option value="">正确答案</option>
						        <option value="A">A</option>
						        <option value="B">B</option>
						        <option value="C">C</option>
						        <option value="D">D</option>
						    </select>
					    </div>
					  </div>
					  
					  <div class="layui-form-item"style="margin-top:15px;">
					    <div class="layui-input-block">
					    <button class="layui-btn layui-btn-sm" lay-submit lay-filter="search">保存</button>

					    </div>
					  </div>
					  
					</form>
					  
			    <#elseif num==3>
			    <form id="from2"action=""  method="post">
				<input type="hidden" id="type" name="type" value="作文">
				<input type="hidden" name="id" value="${id!''}">
				<input type="hidden" name="num" value="3">
				
				<div class="layui-form-item layui-form-text">
			    <label class="layui-form-label">题目</label>
			    <div class="layui-input-block">
			      <textarea  placeholder="请输入题目"id="topicName"required lay-verify="required" name="topicName"value="${topic.topicName!''}"  class="layui-textarea"> ${topic.topicName!''}</textarea>
			    </div>
			  </div>
			  
				    <div class="layui-form-item"style="margin-top:15px;">
				    <div class="layui-input-block">
				    <button class="layui-btn layui-btn-sm" lay-submit lay-filter="search">保存</button>

				    </div>
				  </div>
				  
					</form>
			    </#if>
			  
			</form>
				  
			
		</div>
	</body>
</html>