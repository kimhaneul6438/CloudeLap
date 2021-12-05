var express =require('express');
var app = express();
var AWS =require('aws-sdk');
var template  = require('./lib/template.js');
AWS.config.region='ap-northeast-2';
var ec2 = new AWS.EC2({apiVersion: '2016-11-15'});
const prompt =require("prompt-sync")({sigint:true});


while(true){
template.MANU();
let name = prompt("enter an integer : ");
console.log(`${name}`);
	switch(name){
	case '1' :
		console.log("1");
		template.LIST();
		break;
	case '3' :
		template.START();
		break;
	case '5' :
		template.STOP();
		break;
	case '6' :
		template.CREATE();

	case '99' : 
		return;
	}

}
