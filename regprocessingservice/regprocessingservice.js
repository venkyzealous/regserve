var express = require("express");

(function(){
	var app = express();

	function handleProcessingRequest(request,response){
		var inputData = request.body.data;
		var result = process(inputData);
		response.end(result);
	}

	app.post('/process',handleProcessingRequest);

	function process(inputData){
		//todo:process
		return { isValid:true, result: {"m":10,"c":20} };
	}

	var server = app.listen(8083,function(){
		var host = server.address().address;
		var port = server.address().port;	
		console.log("listening at http://%s:%s/",host,port);
	});

})(express);