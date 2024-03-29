var express =require('express');
var app = express();
var AWS =require('aws-sdk');
AWS.config.region='ap-northeast-2';
var ec2 = new AWS.EC2({apiVersion: '2016-11-15'});

var params = {
  InstanceIds: [process.argv[3]],
  DryRun: true
};
console.log(params);
if (process.argv[2].toUpperCase() === "START") {
  // Call EC2 to start the selected instances
  ec2.startInstances(params, function(err, data) {
    if (err && err.code === 'DryRunOperation') {
      params.DryRun = false;
      ec2.startInstances(params, function(err, data) {
          if (err) {
            console.log("Error", err);
          } else if (data) {
            console.log("Success", data.StartingInstances);
          }
      });
    } else {
      console.log("You don't have permission to start instances.");
    }
  });
} else if (process.argv[2].toUpperCase() === "STOP") {
  // Call EC2 to stop the selected instances
  ec2.stopInstances(params, function(err, data) {
    if (err && err.code === 'DryRunOperation') {
      params.DryRun = false;
      ec2.stopInstances(params, function(err, data) {
          if (err) {
            console.log("Error", err);
          } else if (data) {
            console.log("Success", data.StoppingInstances);
          }
      });
    } else {
      console.log("You don't have permission to stop instances");
    }
  });
}

