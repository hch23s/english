function Dictionary(){
	var o = new Object();
	
	o.setRoomDict = function(data){
		window.sessionStorage.setItem('DICT_ROOM',data);
	};
	o.getRoomDict = function(){
		var dict =  window.sessionStorage.getItem('DICT_ROOM');
		return JSON.parse(dict);
	};
	return o;
};