var express =require('express');
var app = express();
var AWS =require('aws-sdk');
AWS.config.region='ap-northeast-2';
var ec2 = new AWS.EC2({apiVersion: '2016-11-15'});
ec2.describeKeyPairs(function(err, data) {
   if (err) {
      console.log("Error", err);
   } else {
      console.log("Success", JSON.stringify(data.KeyPairs));
   }
});
