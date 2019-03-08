var mongoose = require('mongoose');

module.exports.connect = function() {
	productionDB = 'mongodb://oa-locations-app:08b8hbjPSnD7bQwLRtBTq76IUNsSgz5bLg0sf3ujyYo9bVAcLCCgtPV3FAjVpt1INtlIjh5WBQ3whBGK9d8j6Q%3D%3D@oa-locations-app.documents.azure.com:10255/?ssl=true'
	localDB = 'mongodb://localhost:27017/MEVN-boilerplate';
	mongoose.connect(productionDB);
	var db = mongoose.connection;
	db.on("error", console.error.bind(console, "connection error"));
	db.once("open", function(callback){
	  console.log("Connection Succeeded");
	});
	return db;
}