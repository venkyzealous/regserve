var express = require("express");
var yamljs = require("yamljs");
var request = require('request');
var events = require("events");
var serviceLocator = require("regservicelocator");


(function(express,yamljs,request,events){
	var eventEmitter = new events.EventEmitter();

	var services = {
		"regvalidationservice":null,
		"regprocessingservice":null
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

	function initEngine(){ //async initialization of services
		for(var service in this.services){
			initService(service);
		}
	}

	function initService(serviceName){
		var serviceUrl = serviceLocator.LocateService(serviceName,function(serviceUrl){
			this.services[serviceName] = new Service(serviceUrl);
			if(engineReady()){
				startEngine(); // all set, let's go
			}
		});
	}
	function engineReady{
		for(var service in this.services){
			if(this.services[service] == null)
				return false;
		}
		return true;
	}

	function startEngine(){
		var app = express();
		app.get("/regserve",function(req,res){
			res.send("Welcome to Regserve");
		});

		app.post("/regserve",function(req,res){

			function sendResponse(result){
				res.send(JSON.stringify(result));
			}

			//validation and processing chain
			validateData(req.body.Data,sendResponse);

		});

		var server = app.listen(8081,function(){
			var host = server.address().address;
			var port = server.address().port;	
			console.log("listening at http://%s:%s/",host,port);
		});
	}

	function validateData(inputData,sendResponse){

		function getValidationResult(validationResult){

			if(!validationResult.isValid){
				var message = {};
				message.isError = 1;
				message.ErrorMessage = "Input Data Invalid"
				message.ErrorDetails = validationResult.details;
				console.log("Input Data Invalid: %s",validationResult.details);
				sendResponse(message);
			}
			else{
				processData(inputData,sendResponse);
			}
		}
		this.services["regvalidationservice"].serve('/validate',inputData,getValidationResult);
	}

	function processData(inputData,sendResponse){
		
		function getProcessingResult(processingResult){
			if(!processingResult.isValid){
				var message = {};
				message.isError = 0;
				message.result = processingResult;
				console.log("Successfully processed");
				sendResponse(message);
			}
			else{
				var message = {};
				message.isError = 1;
				message.ErrorMessage = "Processing Input Data Failed"
				message.ErrorDetails = processingResult.details;
				console.log("Input Data Invalid: %s",processingResult.details);
				sendResponse(message);
			}
		}
		this.services["regprocessingservice"].serve('/process',inputData,getProcessingResult);
	}

	var app = express();
	var config_contents = fs.read("config.yaml");
	var config = yamljs.parse(config_contents);
	initEngine();

})(express,yamljs,request,events);


