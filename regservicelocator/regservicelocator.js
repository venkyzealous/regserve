
var yamljs = require('yamljs');
var fs = require('fs');

var contents = fs.read("config.yaml");
var config = yamljs.parse(contents);

module.exports.LocateService = function(serviceName){
	if(config["serviceName"] == null or config["serviceName"] == undefined)
		return null;
	else return { baseURL:config["serviceName"] };
}