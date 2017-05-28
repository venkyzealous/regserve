const PubSub = require('@google-cloud/pubsub');
var datastore = require('@google-cloud/datastore')();

const projectId = 'regserve-168212';

const pubsubClient = PubSub({
  projectId: projectId
});
const topicName = 'regserve-process';

//called by regserve-validate topic
module.exports.validate = function(validatorRequestEvent,validatorResponseCallback){

	//get the request id from message
	var subscriptionmsgstr = Buffer.from(validatorRequestEvent.data.data, 'base64').toString();
	var subscriptionmessage = JSON.parse(subscriptionmsgstr);
	var id = subscriptionmessage.message.id;

	console.log("venky id: -");
	console.log(id);
	//fetch the data from datastore to validate

	var query = datastore.createQuery('request')
	.filter('id','=',id);


	datastore.runQuery(query)
		.then((results) => {
			const request = results[0];
			var data = request[0].data;
			if(isFormatOkay(data)){
				//Valid Data: publish topic for processing
				request[0].status = 'valid';
				datastore.update(request[0]).then(()=>{
					var topic = pubsubClient.topic(topicName);
					topic.publish({
						message:{
							id:id
						}
					},function(err){
						console.log(JSON.stringify(err));
					});

				});
			}
			else{
				//Invalid Data: update the message status and done
				request[0].status = 'invalid'
				request[0].description = 'validation error details'
				datastore.update(request[0]);
			}

		});

		validatorResponseCallback();
}


function isFormatOkay(data){
	return true;
}