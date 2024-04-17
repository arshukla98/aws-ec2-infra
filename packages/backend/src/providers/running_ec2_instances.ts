import express from 'express';
import Router from 'express-promise-router';
import { RouterOptions } from '@premise/plugin-form-data-backend';
// yarn add --cwd packages/backend aws-sdk from Project root 
import AWS from 'aws-sdk'; 

// Function to get instance name from tags
function getInstanceName(instance: AWS.EC2.Instance): string {
    const nameTag = instance.Tags?.find(tag => tag.Key === 'Name');
    return nameTag?.Value || 'Unnamed';
}

export async function runningEC2Router(options: RouterOptions): Promise<express.Router> {
    const { logger } = options;
    const router = Router();
    router.get('/all', async (_, response) => {
        logger.info('Fetching All EC2 Instances...');
        try {
            // Set AWS credentials from environment variables
            const credentials = new AWS.EnvironmentCredentials('AWS');
            
            // Set the region
            AWS.config.update({ region: 'ap-south-1', credentials: credentials }); // replace 'your-region' with your AWS region
            
            // Create EC2 service object
            const ec2 = new AWS.EC2();
            
            // Define parameters for describing EC2 instances
            const params: AWS.EC2.DescribeInstancesRequest = {};
            
            // Fetch running EC2 instances
            const data = await new Promise<AWS.EC2.DescribeInstancesResult>((resolve, reject) => {
                ec2.describeInstances(params, (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
            });
            
            // Extract instance IDs and names
            const instances: string[] = [];
            if (data && data.Reservations) {
                data.Reservations.forEach(reservation => {
                    reservation.Instances?.forEach(instance => {
                        const instanceID = instance.InstanceId;
                        const instanceName = getInstanceName(instance);
                        const instancePublicIP = instance.PublicIpAddress;
                        const instanceState = instance.State?.Name;
                        const instanceInfo = `${instanceID} : ${instanceName} : ${instancePublicIP} : ${instanceState}`;
                        instances.push(instanceInfo);
                    });
                });
            }
            //logger.info('Running EC2 Instances:', instances);
            response.json(instances);
        } catch (error) {
            logger.error('Error fetching EC2 instances:', error);
            response.status(500).json({ error: 'Internal server error' });
        }
    });
    return router;
}
