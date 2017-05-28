var datastore = require('@google-cloud/datastore')();
const urlpattern = require('url-pattern');

//const pattern = 'http(s)\\://(:subdomain.):domain.:tld(\\::port)/regServeStatus/id/:id';
const pattern = '/id/:id';
exports.regServeStatus = function(request,response)
{

	var match = null;
	try
	{
		var extractor = new urlpattern(pattern);
		match = extractor.match(request.url);
	}
	catch(err)
	{
		response.json({error:"Invalid request"});
	}

	var id = match.id;
	console.log(id);
	var query = datastore.createQuery('request')
	.filter('id','=',id);

	datastore.runQuery(query)
		.then(
			(results) =>
				{
					if(results[0].length > 0)
					{
						console.log(JSON.stringify(results));
						response.json({
								id: id,
								result: results[0][0].result,
								status: results[0][0].status,
								description: results[0][0].description
							});
					}
					else
						response.json({error:"Invalid ID"});
				}
		);
}