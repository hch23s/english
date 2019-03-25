//从table中导出excel表
//function exec(){
//    exportExcel('tableId','名称','导出表的名称.xls');   
//}
//判断浏览器
var excel_id = "";
var idTmr; 
    function  getExplorer() { 
        var explorer = window.navigator.userAgent ; 
        
        //ie 
        if (explorer.indexOf("MSIE") >= 0|| (explorer.indexOf("Windows NT 6.1;") >= 0 && explorer.indexOf("Trident/7.0;") >= 0)) { 
            return 'ie'; 
        } 
        //firefox 
        else if (explorer.indexOf("Firefox") >= 0) { 
            return 'Firefox'; 
        } 
        //Chrome 
        else if(explorer.indexOf("Chrome") >= 0){ 
            return 'Chrome'; 
        } 
        //Opera 
        else if(explorer.indexOf("Opera") >= 0){ 
            return 'Opera'; 
        } 
        //Safari 
        else if(explorer.indexOf("Safari") >= 0){ 
            return 'Safari'; 
        } 
    } 
    function exportExcel(tableid,name,filename,id) {
        excel_id = id;
        //    alert(getExplorer());
        if(getExplorer()=='ie'){
            var curTbl = document.getElementById(tableid); 
            curTbl.style.border="1px";
            curTbl.style.backgroundClip="padding-box";
            curTbl.style.position="relative";
            
            var oXL; 
            try{
                oXL = new ActiveXObject("Excel.Application"); //创建AX对象excel  
            }catch(e){
                alert("无法启动Excel!\n\n如果您确信您的电脑中已经安装了Excel，"+"那么请调整IE的安全级别。\n\n具体操作：\n\n"+"工具 → Internet选项 → 安全 → 自定义级别 → 对没有标记为安全的ActiveX进行初始化和脚本运行 → 启用");  
                return false;  
            }
            var oWB = oXL.Workbooks.Add();
            var oSheet = oWB.ActiveSheet;
            var Lenr = curTbl.rows.length;
            for (i = 0; i < Lenr; i++){
                var Lenc = curTbl.rows(i).cells.length;
                for (j = 0; j < Lenc; j++){
                  oSheet.Cells(i + 1, j + 1).value = curTbl.rows(i).cells(j).innerText;  
      
                }  
      
            }
            oXL.Visible = true;
            
        }else{
            tableToExcel(tableid,name,filename) 
      } 
    } 
    function Cleanup() { 
        window.clearInterval(idTmr); 
        CollectGarbage(); 
    }
    var tableToExcel = (function() {
            var uri = 'data:application/vnd.ms-excel;base64,',
            template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html><meta charset="UTF-8">',
            base64 = function(s) {
                return window.btoa(unescape(encodeURIComponent(s)))
            },
            // 下面这段函数作用是：将template中的变量替换为页面内容ctx获取到的值
            format = function(s, c) {
                    return s.replace(/{(\w+)}/g,
                                    function(m, p) {
                                        return c[p];
                                    }
                    )
            };
            return function(table, name) {
                if (!table.nodeType) {
                    table = document.getElementById(table)
                }
                // 获取表单的名字和表单查询的内容
                var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML};
                // format()函数：通过格式操作使任意类型的数据转换成一个字符串
                // base64()：进行编码
                document.getElementById(excel_id).href = uri + base64(format(template, ctx))
                document.getElementById(excel_id).download = fileName;
                $("'#"+excel_id+"'").click();
            }
    })()