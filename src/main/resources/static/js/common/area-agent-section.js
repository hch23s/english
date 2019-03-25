/**
 * 标段信息初始化和联动
 * initFinish: 数据初始化完成后的回调方法,可以执行诸如关闭Loading等一些善后工作
 * elems: 班组下拉的三个对象数组,格式如[${"#area"}, ${"#agent"}, ${"#section"}]
 * @param {initFinish: function, elems: [area, agent, section] } options 初始化参数
 */
var AraeAgentSection = function (options) {

	var areaObj = options.elems[0];
	var agentObj = options.elems[1];
	var sectionObj = options.elems[2];

	// 初始化方法
	(function () {
		loadOptions(0, function () { // 代维单位
			loadOptions(1, function () { // 标段信息
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
				url = '/areaDict/findAgentUnit';
				obj = agentObj;
				break;
			case 1:
				url = '/areaDict/findSectionInfo';
				obj = sectionObj;
				break;
		}

		var areas = areaObj.val();
		if (areas instanceof String) {
			areas = [areas];
		}
		var cache = {};

		if (areas.length == 0) {
			$.getJSON(url, {
				areaCenter: -1
			}, function (data) {
				for (var j in data) {
					var agent = data[j];
					cache[agent.dictValue] = agent.dictValue;
				}
				obj.html(parseOptions(cache));
				if (!!success) {
					success();
				}
			});
		} else {
			var totalAreaAjax = 0;
			for (var i in areas) {
				$.getJSON(url, {
					areaCenter: areas[i]
				}, function (data) {
					totalAreaAjax++;
					for (var j in data) {
						var agent = data[j];
						cache[agent.dictValue] = agent.dictValue;
					}
					if (totalAreaAjax == areas.length) {
						obj.html(parseOptions(cache));
						if (!!success) {
							success();
						}
					}
				});
			}
		}
	}

	var onAraeChange = function () {
		loadOptions(0);
		loadOptions(1);
	};

	// var onGroupChange = function () {
	// 	loadSectionOptions();
	// };

	areaObj.change(onAraeChange);
	// agentObj.change(onGroupChange);

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