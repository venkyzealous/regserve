var express = require("express");

(function(){
	var app = express();

	function handleValidationRequest(request,response){
		var inputData = request.body.data;
		var result = validate(inputData);
		response.end(result);
	}

	app.post('/validate',handleValidationRequest);

	function validate(inputData){
		//todo:validate
		return { isValid:true };
	}

	var server = app.listen(8082,function(){
		var host = server.address().address;
		var port = server.address().port;	
		console.log("listening at http://%s:%s/",host,port);
	});

})(express);