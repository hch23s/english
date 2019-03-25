/**
 * 班组初始化和联动
 * initFinish: 数据初始化完成后的回调方法,可以执行诸如关闭Loading等一些善后工作
 * elems: 班组下拉的三个对象数组,格式如[${"#area"}, ${"#group"}, ${"#class"}]
 * @param {initFinish: function, elems: [area, group, class] } options 初始化参数
 */
var accessLevel = 0;
var deptName;
var groupName;

var AraeGroupClass = function (options) {

    deptTree = {};

    var areaObj = options.elems[0];
    var groupObj = options.elems[1];
    var classObj = options.elems[2];
    var urbanObj = options.elems[3];
    var mainType = options.elems[4];

    function initOptions() {
        var areaOptions = '';
        var groupOptions = '';
        var classOptions = '';
        var urbanOptions = '';

        var areas = getSelectedAreas();
        var groups = getDistinctGroup();
        var classes = getDistinctClass();
        var urbans = getUrban();

        if (accessLevel == 1||deptName=='动力'||deptName.indexOf("管线")!=-1) {
            for (var k in areas) {
                var area = areas[k];
                if (k >= 0) {
                    areaOptions += '<option value="' + area + '">' + area + '</option>';
                }
            }
        } else {
            areaOptions += '<option value="' + areas[0] + '" selected>' + areas[0] + '</option>';
        }

        if (groupName == '业管组' || groupName == '支撑组') {
            for (var k in groups) {
                if (k != "装维组" && k != "业管组" && k != "维护组" && k != "支撑组") {
                    groupOptions += '<option value="' + k + '">' + k + '</option>';
                }
            }
        } else if (accessLevel == 3||accessLevel == 5) {
            for (var k in groups) {
                groupOptions += '<option value="' + k + '" selected>' + k + '</option>';

            }
        } else {
            for (var k in groups) {
                if (k != "装维组" && k != "业管组" && k != "维护组" && k != "支撑组") {
                    groupOptions += '<option value="' + k + '">' + k + '</option>';
                }
            }
        }

        for (var k in classes) {
            classOptions += '<option value="' + k + '">' + k + '</option>';
        }

        for (var k in urbans) {
            urbanOptions += '<option value="' + k + '">' + k + '</option>';
        }

        areaObj.html(areaOptions);
        groupObj.html(groupOptions);
        classObj.html(classOptions);
        urbanObj.html(urbanOptions);
    };

    // 初始化方法
    //data.children[0].children
    (function () {
        $.getJSON('/dept/findDept', {
            name: "维护事业部"
        }, function (data) {

            var dept = JSON.parse(data.dept);
            var children = dept.children;
            for (var i in children) {
                var obj = children[i];
                if (obj.name == '东区' || obj.name == '南区' || obj.name == '西区' || obj.name == '北区' || obj.name == '通州'||obj.name=='动力') {
                    deptTree[obj.name] = obj;

                }

            }

            accessLevel = data.accessLevel;
            deptName = data.deptName;
            groupName = data.groupName;


            initOptions();

            if (!!options.initFinish) {
                options.initFinish();
            }
        });


    })();

    // 获取已经选择的区域中心
    function getSelectedAreas() {
        var areas = areaObj.val();
        if (!areas || areas.length == 0) {
            if (accessLevel == 1||deptName=="动力"||deptName.indexOf("管线")!=-1) {
                areas = ['东区', '南区', '西区', '北区', '通州','动力'];

            } else {
                areas = [deptName];
            }
        }
        if (areas instanceof String) {
            areas = [areas];
        }

        return areas;
    }

    // 获取已经选择的维护班
    function getSelectedGroups() {
        var groups = groupObj.val();
        if (!groups || groups.length == 0) {
            groups = getDistinctGroup();
        }
        if (groups instanceof String) {
            groups = [groups];
        }

        return groups;
    }

    // 获取已经选择的区域中心包含的所有维护组,并且去重
    function getDistinctGroup() {
        var areas = getSelectedAreas();
        var cache = {};
        var type = mainType.val();


        if (groupName == '业管组' || groupName == '支撑组') {
            for (var i in areas) {
                if (i >= 0) {
                    var area = areas[i];
                    var groups = deptTree[area].children;
                    for (var j in groups) {
                        var group = groups[j];
                        if (type == "合作") {

                            if (group.isType==2) {
                                cache[group.name] = group.name;
                            }

                        } else if (type == "自维") {

                            if (group.isType==1) {
                                cache[group.name] = group.name;
                            }

                        } else {
                            cache[group.name] = group.name;
                        }

                    }
                }

            }
        } else if (accessLevel == 3||accessLevel == 5) {

            cache[groupName] = groupName;
        } else {
            for (var i in areas) {
                if (i >= 0) {
                    var area = areas[i];
                    if(deptTree[area]!=undefined){
                    	 var groups = deptTree[area].children;
                         for (var j in groups) {
                             var group = groups[j];

                             if (type == "合作") {

                                 if (group.isType==2) {
                                     cache[group.name] = group.name;
                                 }

                             } else if (type == "自维") {

                                 if (group.isType==1) {
                                     cache[group.name] = group.name;
                                 }

                             } else {
                                 cache[group.name] = group.name;
                             }

                             // cache[group.name] = group.name;
                         }
                    }
                   
                }

            }
        }

        return cache;
    }

    function isInGroups(name, groups) {
        if (groups instanceof String) {
            return name == groups;
        }

        if (groups instanceof Array) {
            return ($.inArray(name, groups) > -1)
        }

        return (name in groups);
    }


    // 获取城区
    function getUrban() {
        var areas = getSelectedAreas();
        var cache = {};

        for (var i in areas) {
            if (i >= 0) {
                var area = areas[i];

                $.ajax({
                    type: 'get',
                    url: '/areaDict/findArea?areaCenter=' + area + '&${_csrf.parameterName}=${_csrf.token}',
                    async: false,
                    success: function (data) {
                        var list = eval(data);
                        $.each(list, function (index, item) {
                            cache[item.dictValue] = item.dictValue;
                        });
                    }
                });


            }

        }

        return cache;
    }

    // 获取已经选择的维护组包含的所有维护班,并且去重
    function getDistinctClass() {
        var areas = getSelectedAreas();
        var groups = getSelectedGroups();
        var cache = {};
        for (var i in areas) {
            if (i >= 0) {
                var area = areas[i];
                if( deptTree[area]!=undefined){
                	var childrenGroups = deptTree[area].children;
                    for (var j in childrenGroups) {
                        var group = childrenGroups[j];
                        if (isInGroups(group.name, groups)) {
                            var classes = group.children;
                            for (var m in classes) {
                                var clazz = classes[m];
                                cache[clazz.name] = clazz.name;
                            }
                        }
                    }
                }
                
            }

        }
        return cache;
    }

    var onAraeChange = function () {
        var groupOptions = '';
        var classOptions = '';
        var urbanOptions = '';

        var groups = getDistinctGroup();
        var classes = getDistinctClass();
        var urbans = getUrban();

        for (var k in groups) {

            if (k != "装维组" && k != "业管组" && k != "维护组" && k != "支撑组") {
                groupOptions += '<option value="' + k + '">' + k + '</option>';
            }
        }
        for (var k in classes) {
            classOptions += '<option value="' + k + '">' + k + '</option>';
        }

        for (var k in urbans) {
            urbanOptions += '<option value="' + k + '">' + k + '</option>';
        }

        groupObj.html(groupOptions);
        classObj.html(classOptions);
        urbanObj.html(urbanOptions);
    };

    var onGroupChange = function () {
        var classOptions = '';

        var classes = getDistinctClass();

        for (var k in classes) {
            classOptions += '<option value="' + k + '">' + k + '</option>';
        }

        classObj.html(classOptions);
    };

    var onMainTypeChange = function () {

        var groupOptions = '';

        var groups = getDistinctGroup();

        for (var k in groups) {

            if (k != "装维组" && k != "业管组" && k != "维护组" && k != "支撑组") {
                groupOptions += '<option value="' + k + '">' + k + '</option>';
            }
        }

        groupObj.html(groupOptions);
    };

    areaObj.change(onAraeChange);
    groupObj.change(onGroupChange);
    mainType.change(onMainTypeChange);

    return this;
}


// 使用方法(理论兼容单选,未经过测试)
// <script src="/js/common/area-group-class.js" charset="utf-8"></script>
// var options = {
// initFinish: function () {
// 	alert("初始化完成");
// },
// 	elems: [$('select[name="areaCenter"]'), $('select[name="maintenanceTeams"]'), $('select[name="maintenanceClass"]')]
// }
// var areaGroupClass = AraeGroupClass(options);