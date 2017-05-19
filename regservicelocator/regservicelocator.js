
var yamljs = require('yamljs');
var fs = require('fs');


(function(){
	var contents = fs.read("config.yaml");
	var config = yamljs.parse(contents);

	module.exports.LocateService = function(serviceName, callback){
		var url = config["serviceName"];
		if(url == null || url == undefined)
		{
			callback(null);
			console.log("service " + serviceName + " not found!");
		}
		else callback(url);
	}

})(yamljs,fs);


