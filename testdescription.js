var express =require('express');
var app = express();
var AWS =require('aws-sdk');
AWS.config.region='ap-northeast-2';
var ec2 = new AWS.EC2({apiVersion: '2016-11-15'});



var params = {
  DryRun: false
};

// Call EC2 to retrieve policy for selected bucket
ec2.describeInstances(params, function(err, data) {
  if (err) {
    console.log("Error", err.stack);
  } else {
  console.log("Success",JSON.stringify(data));
 // const list = JSON.stringify(data,(key,value)=>{
//		  console.log(`key:${key},value:${value}`);
//		  return value;})
  
  //console.log(jsonObj);
  
  }
});

