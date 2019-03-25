var equipments = function (options) {
	
	console.log("1234:"+options);
    var type = options.elems[0];
    console.log("type:"+type);
    var equipType = options.elems[1];
    console.log("equipType:"+equipType);
    // 初始化方法
    (function () {
//        loadOptions(0, function () {    });
            loadOptions(1, function () {
                if (!!options.initFinish) {
                    options.initFinish();
                }
            });
    
    })();

    function parseOptions(cache) {
        var options = '';
        for (var k in cache) {
            options += '<option value="' + k + '">' + k + '</option>';
        }
        return options;
    }

  
    function loadOptions(qw, success) {
		console.log("1a"+qw);
		
        var url = '';
//        var obj;
        switch (qw) {
            case 1:
                url = '/equipments/findByType';
//                obj = type;
                break;
          
        }

        var transmissionModes = type.val();
        console.log("transmissionModes1:"+transmissionModes);
        if (transmissionModes instanceof String) {
            transmissionModes = [transmissionModes];
             console.log("transmissionModes2:"+transmissionModes);
        }
         var manufactors = equipType.val();
         console.log("manufactors1:"+manufactors);
        if (manufactors instanceof String) {
            manufactors = [manufactors];
            console.log("manufactors2:"+manufactors);
        }

     
        var cache = {};
        var modelCache = {};

        if (qw == 1) {
			console.log("123456");
            //设备型号
            if (manufactors.length == 0) {
            	console.log("1234567");
                var attr = "";
                for (var j in transmissionModes) {
                    attr += transmissionModes[j] + ",";
                }
                attr = attr.substring(0, attr.length - 1);
				console.log("attr"+attr);
                $.getJSON(url, {                    
                    type: attr
                }, function (data) {
                	console.log("1"+ data);
                    for (var j in data) {
                    	console.log("11"+ data);
                        var model = data[j];
                        console.log("111"+ model);
                        modelCache[model.model] = model.model;
                    }
                    equipType.html(parseOptions(modelCache));
                    if (!!success) {
                        success();
                    }
                });
            } else {
            	console.log("12345678");
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
                    type: attr
                }, function (data) {
                    totalAreaAjax++;
                    console.log("2"+ data);
                    for (var j in data) {
                    	console.log("22"+ data);
                        var model = data[j];
                        modelCache[model.model] = model.model;
                    }

                    equipType.html(parseOptions(modelCache));
                    if (!!success) {
                        success();
                    }
                });
            }

        }


    }


    var onTransmissiongChange = function () {
       loadOptions(1);
       // loadOptions(0);

    };

//    var onManufactorChange = function () {
//        loadOptions(0);
//        // loadOptions(1);
//    };


    type.change(onTransmissiongChange);
    //manufactorObj.change(onManufactorChange);

    return this;
}

