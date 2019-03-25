var tansport = function (options) {
	
    var transmissionModeObj = options.elems[0];
    var manufactorObj = options.elems[1];
    var modelObj = options.elems[2];

    // 初始化方法
    (function () {
        loadOptions(0, function () {
            loadOptions(1, function () {
                if (!!options.initFinish) {
                    options.initFinish();
                }
            });
        });
    })();

    function parseOptions(cache) {
        var options = '';
        for (var k in cache) {
            options += '<option value="' + k + '">' + k + '</option>';
        }
        return options;
    }

    // 加载代维单位和标段信息
    // type 0.代维单位 1.标段信息
    function loadOptions(type, success) {

        var url = '';
        var obj;
        switch (type) {
            case 0:
                url = '/areaDict/findTansportManufactor';
                obj = transmissionModeObj;
                break;
            case 1:
                url = '/areaDict/findTansportModel';
                obj = transmissionModeObj;
                break;
        }

        var transmissionModes = transmissionModeObj.val();
        if (transmissionModes instanceof String) {
            transmissionModes = [transmissionModes];
        }

        var manufactors = manufactorObj.val();
        if (manufactors instanceof String) {
            manufactors = [manufactors];
        }

        var cache = {};
        var modelCache = {};

        if (type == 1) {
            //传输方式
            if (transmissionModes.length == 0) {
                $.getJSON(url, {
                    transmissionMode: -1
                }, function (data) {
                    for (var j in data) {
                        var manufactor = data[j];
                        cache[manufactor.dictValue] = manufactor.dictValue;
                    }
                    manufactorObj.html(parseOptions(cache));
                    if (!!success) {
                        success();
                    }
                });
            } else {
                var totalAreaAjax = 0;
                var attr = "";
                for (var i in transmissionModes) {
                    attr += transmissionModes[i] + ",";
                }
                attr = attr.substring(0, attr.length - 1);
                $.getJSON(url, {
                    transmissionMode: attr,
                }, function (data) {
                    totalAreaAjax++;
                    for (var j in data) {
                        var manufactor = data[j];
                        cache[manufactor.dictValue] = manufactor.dictValue;
                    }
                    // if (totalAreaAjax == transmissionModes.length) {                }

                    manufactorObj.html(parseOptions(cache));
                    if (!!success) {
                        success();
                    }
                });
            }

        } else if (type == 0) {

            //设备厂家
            if (manufactors.length == 0) {
                var attr = "";
                for (var j in transmissionModes) {
                    attr += transmissionModes[j] + ",";
                }
                attr = attr.substring(0, attr.length - 1);

                $.getJSON(url, {
                    manufactor: -1,
                    transmissionMode: attr,
                }, function (data) {
                    for (var j in data) {
                        var model = data[j];
                        modelCache[model.dictValue] = model.dictValue;
                    }
                    modelObj.html(parseOptions(modelCache));
                    if (!!success) {
                        success();
                    }
                });
            } else {
                var totalAreaAjax = 0;
                var attr = "";
                for (var j in transmissionModes) {
                    attr += transmissionModes[j] + ",";
                }
                attr = attr.substring(0, attr.length - 1);

                var manufactorAttr = "";
                for (var i in manufactors) {
                    manufactorAttr += manufactors[i] + ",";
                }
                manufactorAttr = manufactorAttr.substring(0, manufactorAttr.length - 1);
                $.getJSON(url, {
                    manufactor: manufactorAttr,
                    transmissionMode: attr,
                }, function (data) {
                    totalAreaAjax++;
                    for (var j in data) {
                        var model = data[j];
                        modelCache[model.dictValue] = model.dictValue;
                    }
                    // if (totalAreaAjax == manufactors.length) {                }

                    modelObj.html(parseOptions(modelCache));
                    if (!!success) {
                        success();
                    }
                });
            }

        }


    }


    var onTransmissiongChange = function () {
        loadOptions(1);
        loadOptions(0);

    };

    var onManufactorChange = function () {
        loadOptions(0);
        // loadOptions(1);
    };


    transmissionModeObj.change(onTransmissiongChange);
    manufactorObj.change(onManufactorChange);

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