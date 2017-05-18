var express = require("express");
var yamljs = require("yamljs");
var request = require('request');
var events = require("events");

var validationService = null;
var processingService = null;
var eventEmitter = new events.EventEmitter();

var services = {
	"regvalidationservice":null,
	"regprocessingservice":null
}

function ServiceEnumerator(){
	nextService = function(name){
		if(isLastService(name)){
			return services[index + 1];
		}
		else
			return null;
	},
	getServiceIndex = function(name){
		var names = Object.keys(services);
		return names.indexOf(name);
	},
	isLastService = function(index){
		var index = getServiceIndex(name);
		return ((index + 1) < names.length);
	},
	firstService = function(){
		return Object.keys(services)[0];
	}
}

function ServiceLocator(url)
{
	this.url = url;
	this.LocateAsync =  function(serviceName, callback){
		request(this.url+'/service/'+ serviceName + '/url',function(error,response,body){
			if(error == null){
				var result = JSON.parse(body);
				services[serviceName] = new Service(result.url);
				callback(result.url);
			}
			else{
				console.log("Locating "+ serviceName + " Failed");
				console.error(error);
			}
		});
	}
}

function Service(url)
{
	this.url = url,
	this.serve = function(path,inputData,callback){
		request({
			url: this.url+path,
			json:true,
			method: 'POST',
			multipart: {
				chunked:false,
				data:[
					{
						'content-type': 'application/json',
						body:inputData
					}
				]
			}
		},function(error,response,body){
			if(error == null){
				var result = JSON.parse(body);
				callback(result.url,inputData);
			}
			else{
				console.log("Service "+ serviceName + " Failed");
				console.error(error);
			}
		});
	}

}

function initializeEngine(serviceLocatorURL){
	var firstService = (new ServiceEnumerator()).firstService();
	initializeService(firstService);
}

eventEmitter.on('serviceLoaded',function(serviceName){
	var serviceEnumerator = new ServiceEnumerator(serviceName);
	var next = serviceEnumerator.nextService();
	if(next != null)
		initializeService(next);
	else
		eventEmitter.emit('serviceLoadComplete');
})

function initializeService(serviceName){
	locator.LocateAsync(serviceName,function(url){
		services[serviceName] = new Service(url);
		eventEmitter.emit('serviceLoaded',serviceName);
	});
}

eventEmitter.on('serviceLoadComplete',function(){
	startEngine();
})


function startEngine(){

	app.get("/regserve",function(req,res){
		res.send("Welcome to Regserve");
	});

	app.post("/regserve",function(req,res){

		validateData(req.body.Data, function(result){
			res.send(JSON.stringify(message));
		});

	});

	var server = app.listen(8081,function(){
		var host = server.address().address;
		var port = server.address().port;	

		console.log("listening at http://%s:%s/",host,port);
	});
}

function validateData(inputData,callback){
	services["regvalidationservice"].serve('/validate',inputData,processData);
}

function processData(result,inputData){
	if(!result.isValid){
		var message = {};
		message.isError = 1;
		message.ErrorMessage = "Input Data Invalid."
		message.ErrorDetails = result.details;
		console.log("Input Data Invalid: %s",result.details);
		callback(message);
	}
	else{
		services["regprocessingservice"].serve('/process',inputData,function(result,inputData){
		var message = {};
		message.isError = 0;
		message.result = result;
		console.log("Successfully processed");
		callback(message);
		});
	}
}

var app = express();
var config_contents = fs.read("config.yaml");
var config = yamljs.parse(config_contents);
var serviceLocatorURL = config["regservicelocator_url"];
 
initializeEngine(serviceLocatorURL);
