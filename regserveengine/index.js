var http = require("http");
var express = require("express");
var regression = require("regression");
var yamljs = require("yamljs");
var fs = require("fs");

//var bodyParser = require('body-parser');
//var multer  = require('multer');



var app = express();





app.get("/regserve",function(,req,res){
	res.send("Welcome to Regserve");
});

/*enable if file processing is needed*/
//app.use(express.static('public'));
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(multer({ dest: '/tmp/'}));

app.post("/regserve",function(req,res){

	var validationService = regServiceLocator.Locate("regvalidationservice");
	var processingService = regServiceLocator.Locate("regprocessingservice");
	
	//var dataService = regServiceLocator.Locate("DataService");
	//var rulesService = regServiceLocator.Locate("RulesService");
	//var configurationService = regServiceLocator.Locator("configurationService");



	var inputData = req.Data;
	var result = validationService.Validate(inputData);
	if(result.isValid)
	{
		var message = {};
		message.isError = 1;
		message.ErrorMessage = "Input Data Invalid."
		message.ErrorDetails = result.Details;
		console.log(message);
		res.send(JSON.stringify(message));
	}

	result = processingService.Process(inputData);
	res.send(JSON.stringify(message));

});





var server = app.listen(8081,function(){
	var host = server.address().address;
	var port = server.address().port;	

	console.log("listening at http://%s:%s/",host,port);
})




http.createServer(function(request,response){
	response.writeHead(200,{'Content-Type':'text/plain'});
	response.end('Hello World\n');
}).listen(8081);



console.log("Server running at http://127.0.0.1:8081/");