/**
 * 分页工具类
 * @param name    div名称
 * @param type   类型
 * @param rang    日期范围标识符
 * @returns
 */
function DateRang(name,type,rang){
    layui.use('laydate', function () {
        var laydate = layui.laydate;
        laydate.render({
            elem: name
            , type: type
            , range: rang
            ,min: '2000-1-1'
            ,max:0
        });

    })
	
}