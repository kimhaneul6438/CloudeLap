
var express =require('express');
var app = express();
var AWS =require('aws-sdk');
AWS.config.region='ap-northeast-2';
var ec2 = new AWS.EC2({apiVersion: '2016-11-15'});
// AMI is amzn-ami-2011.09.1.x86_64-ebs
const prompt = require("prompt-sync")({sigint:true});

module.exports = {
LIST : function(){
var params = {
  DryRun: false
};
console.log("list");
// Call EC2 to retrieve policy for selected bucket
ec2.describeInstances(params, function(err, data) {
  if (err) {
    console.log("Error", err.stack);
  } else {
    console.log("Success", JSON.stringify(data));
  }
});
},

	   

MANU : function(){
		  console.log(`
-----------------------------------------------------------------------------------------
			Amazon AWS Control Panel using SDK
			Cloud Computing, Computer Science Department
							at Chungbuk National University
-----------------------------------------------------------------------------------------
	1. list instance				2. available zones
	3. start instance				4. available reginons
	5. stop instance				6. create instance 
	7. reboot instance				8.list images
								99.quit
------------------------------------------------------------------------------------------
`);
	  }
,
//START : function(){
	
START : function(){
var command = prompt("start?stop?");
var id = prompt("id?");
console.log(command);
console.log(id);
var params = {
  InstanceIds:id,
  DryRun: true
};
console.log(params);
if (command.toUpperCase() === "START") {
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
} else if (command.toUpperCase() === "STOP") {
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
},

STOP : function(){
	
var params = {
  InstanceIds: [process.argv[3]],
  DryRun: true
};

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
},



CREATE : function(){
	var instanceParams = {
   ImageId: 'ami-08919cd20d4b860ac', 
   InstanceType: 't2.micro',
   KeyName: 'awscloud',
   MinCount: 1,
   MaxCount: 1
};

// Create a promise on an EC2 service object
var instancePromise = new AWS.EC2({apiVersion: '2016-11-15'}).runInstances(instanceParams).promise();

// Handle promise's fulfilled/rejected states
instancePromise.then(
  function(data) {
    console.log(data);
    var instanceId = data.Instances[0].InstanceId;
    console.log("Created instance", instanceId);
    // Add tags to the instance
    tagParams = {Resources: [instanceId], Tags: [
       {
          Key: 'Name',
          Value: 'sample1'
       }
    ]};
    // Create a promise on an EC2 service object
    var tagPromise = new AWS.EC2({apiVersion: '2016-11-15'}).createTags(tagParams).promise();
    // Handle promise's fulfilled/rejected states
    tagPromise.then(
      function(data) {
        console.log("Instance tagged");
      }).catch(
        function(err) {
        console.error(err, err.stack);
      });
  }).catch(
    function(err) {
    console.error(err, err.stack);
  });
}
}
