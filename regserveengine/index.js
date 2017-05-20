const PubSub = require('@google-cloud/pubsub');
var datastore = require('@google-cloud/datastore')();

const projectId = 'regserve-168212';

const pubsubClient = PubSub({
  projectId: projectId
});
const topicName = 'regserve-validate';

module.exports.startEngine = function (engineRequestEvent,engineResponseCallback){

	var submessagestring = Buffer.from(engineRequestEvent.data.data, 'base64').toString();
  	var submessage = JSON.parse(submessagestring);
	var id = submessage.message.id;
	var inputData = submessage.message.data;


	var requestKey = datastore.key('request');

	var entity = {
		data:[
			{
				name:'id',
				value:id
			},
			{
				name:'data',
				value: JSON.stringify(inputData)
			}
		],
		key:requestKey
	}

	datastore.save(entity).then(() => {
		console.log("success insert of data");
	});

			
	var topic = pubsubClient.topic(topicName);
	topic.publish({
		message:{
			id:id
		}
	},function(err){
		console.log(error);
	});
	console.log("published topic regserve-validate successfully");

	engineResponseCallback();
}


