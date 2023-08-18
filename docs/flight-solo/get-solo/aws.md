# Import Flight Solo Image to AWS

!!! tip
    If you are looking to evaluate the latest release of Flight Solo on AWS then it is recommended to utilise the [AWS Marketplace Image](https://alces-flight.com/solo/aws) - this is identical to the latest release and provides a streamlined launch process

## Prepare AWS Account for Image Import

### CLI Prerequisites

1. To set this up, you will need to install the AWS Command Line Interface(CLI). Confirm that you have the [prerequisites](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-prereqs.html) for the AWS CLI.

1. Install the AWS CLI by following the [AWS guide](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html).

1. Configure basic the basic AWS CLI by following [this guide](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-quickstart.html). There is more information about configuration in other parts of the [AWS documentation](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html#cli-quick-configuration).

### Setup a Bucket

1. Create a bucket as described in the [AWS Documentation](https://docs.aws.amazon.com/AmazonS3/latest/userguide/creating-bucket.html)
1. Create a directory within the bucket called `images`

### Create VM Import Policy

1. Create a `vmimport` policy file to enable vm import operations. Make a file called `trust-policy.json` with these contents:

    ```json
    {
    "Version": "2022-11-03",
    "Statement": [
      {
         "Effect": "Allow",
         "Principal": { "Service": "vmie.amazonaws.com" },
         "Action": "sts:AssumeRole",
         "Condition": {
            "StringEquals":{
               "sts:Externalid": "vmimport"
            }
         }
      }
    ]
    }
    ```

1. Create a role from the `vmimport` policy file.
    ```bash
    aws iam create-role --role-name vmimport --assume-role-policy-document "file://trust-policy.json"
    ```

1. Create a bucket association with the `vmimport` role in a file called `role-policy.json`, replacing `<bucketname>` with the name of your S3 bucket.
    ```json
    {
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:GetBucketLocation",
                "s3:GetObject",
                "s3:ListBucket",
                "s3:PutObject",
                "s3:GetBucketAcl"
            ],
            "Resource": [
                "arn:aws:s3:::<bucketname>",
                "arn:aws:s3:::<bucketname>/*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "ec2:ModifySnapshotAttribute",
                "ec2:CopySnapshot",
                "ec2:RegisterImage",
                "ec2:Describe*"
            ],
            "Resource": "*"
        }
    ]
    }
    ```

1. Apply the role policy.
    ```bash
    aws iam put-role-policy --role-name vmimport --policy-name vmimport --policy-document "file://role-policy.json"
    ```

## Upload Image

1. Download the Flight Solo AWS image [here](https://repo.openflighthpc.org/?prefix=images/FlightSolo/)

1. Upload the downloaded Flight Solo image to a directory called `images` in the S3 bucket with this command:
    ```bash
    aws s3 cp Flight_Solo_VERSION_aws.raw s3://<bucketname>/images/
    ```

1. Wait until it has finished uploaded before proceeding.

## Import Image As Snapshot 

1. Create a file called `containers.json` with raw disk image information. These are the contents (replace `<bucketname>` with your bucket name):

    ```json
    {
    "Description": "Flight_Solo_VERSION_aws.raw",
    "Format": "raw",
    "UserBucket": {
        "S3Bucket": "<bucketname>",
        "S3Key": "images/Flight_Solo_VERSION_aws.raw"
        }
    }
    ```

1. Import the raw image as a disk snapshot.
    ```bash
    aws ec2 import-snapshot --description "Flight_Solo_VERSION_aws.raw" --disk-container "file://containers.json"
    ```

1. Wait until the import is complete. You can check the progress with this command: (replace the import task ID with the ID output of the previous command)
    ```bash
    aws ec2 describe-import-snapshot-tasks --import-task-ids import-snap-00000000000000000
    ```

## Create AMI from Snapshot

1. Once imported, the snapshot can be registered as an AMI (replacing `VERSION` with the version of Flight Solo and `SNAPSHOT_ID` with the ID of the snapshot created in the previous section) 
    ```bash
    aws ec2 register-image --name "Flight Solo VERSION" --description "Flight Solo VERSION from snapshot" --block-device-mappings "[{\"DeviceName\": \"/dev/sda1\",\"Ebs\":{\"VolumeSize\":10, \"SnapshotId\":\"SNAPSHOT_ID\"}}]" --root-device-name "/dev/sda1" --architecture x86_64 --ena-support
    ```
