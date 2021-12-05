const {
    CreateTagsCommand,
    RunInstancesCommand
} = require("@aws-sdk/client-ec2");
import { ec2Client } from "./libs/ec2Client";

// Set the parameters
const instanceParams = {
    ImageId: "AMI_ID", //AMI_ID
    InstanceType: "t2.micro",
    KeyName: "KEY_PAIR_NAME", //KEY_PAIR_NAME
    MinCount: 1,
    MaxCount: 1,
};

const run = async () => {
    try {
        const data = await ec2Client.send(new RunInstancesCommand(instanceParams));
        console.log(data.Instances[0].InstanceId);
        const instanceId = data.Instances[0].InstanceId;
        console.log("Created instance", instanceId);
        // Add tags to the instance
        const tagParams = {
            Resources: [instanceId],
            Tags: [
                {
                    Key: "Name",
                    Value: "SDK Sample",
                },
            ],
        };
        try {
            const data = await ec2Client.send(new CreateTagsCommand(tagParams));
            console.log("Instance tagged");
        } catch (err) {
            console.log("Error", err);
        }
    } catch (err) {
        console.log("Error", err);
    }
};
run();
