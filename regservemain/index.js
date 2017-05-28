
var guid = require('guid');
const PubSub = require('@google-cloud/pubsub');
var datastore = require('@google-cloud/datastore')();

const projectId = 'regserve-168212';

const pubsubClient = PubSub({
  projectId: projectId
});
const topicName = 'regserve-request';



exports.regServe = function(request,response){
	var id = guid.raw();
	var topic = pubsubClient.topic(topicName);

	topic.publish({
		message:{
			id:id,
			data: request.body
		}
	},function(err){
		response.end("Request could not be accepted");
	});


	response.setHeader('Content-Type', 'application/json');

	response.end(JSON.stringify({
		result:"request queued successfully",
		statuslink:"/regServeStatus/id/"+id
	}));

}