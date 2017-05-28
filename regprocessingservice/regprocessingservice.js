const PubSub = require('@google-cloud/pubsub');
var datastore = require('@google-cloud/datastore')();
const regression = require('regression');

const projectId = 'regserve-168212';

const pubsubClient = PubSub({
  projectId: projectId
});

//called by regserve-validate topic
module.exports.process = function(processRequestEvent,processResponseCallback){

	//get the request id from message
	var subscriptionmsgstr = Buffer.from(processRequestEvent.data.data, 'base64').toString();
	var subscriptionmessage = JSON.parse(subscriptionmsgstr);
	var id = subscriptionmessage.message.id;

	//fetch the data from datastore to process
	var query = datastore.createQuery('request')
	.filter('id','=',id);


	datastore.runQuery(query)
		.then((results) => {
			const request = results[0];
			console.log(request);
			var data = JSON.parse(request[0].data);
			getFittingLine(data);

			//Valid Data: publish topic for processing
			request[0].status = 'processed';
			request[0].description = lineData.details;
			if(lineData.success)
				request[0].result = {m:lineData.m,c:lineData.c};
			else
				request[0].result = null;

			datastore.update(request[0]).then(()=>{
			});
		});

		processResponseCallback();
}

var lineData = {
	m:0,
	c:0,
	success:false,
	details:''
}

function getFittingLine(data){

	var result = regression('linear',data);
	lineData.m = result.equation[0];
	lineData.c = result.equation[1];
	lineData.success = true;
	lineData.details = 'Regression analysis successful';
	return true;
}