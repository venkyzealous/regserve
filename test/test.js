//const url = require('url');
const urlpattern = require('url-pattern');
var myurl = 'https://us-central1-regserve-168212.cloudfunctions.net/regServeStatus/id/8454135d-df33-9dec-0a0a-5249354f952d';


//var urlObj = url.parse(myurl,false,true);
try{
var pattern = new urlpattern('http(s)\\://(:subdomain.):domain.:tld(\\::port)/regServeStatus/id/:id');
}
catch(err){
	console.log("Invalid request");
}
var match = pattern.match(myurl);
console.log(match.id);
