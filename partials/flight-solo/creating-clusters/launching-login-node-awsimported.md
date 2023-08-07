
To set up a cluster, you will need to [import a Flight Solo image](../get-solo/index.md).

1. Go the EC2 instance [console](https://eu-west-2.console.aws.amazon.com/ec2/home?region=eu-west-2#Instances:v=3;$case=tags:true%5C,client:false;$regex=tags:false%5C,client:false)

    ![](img/aws_ec2_console_overview.png)

1. Click "Launch" to go to the EC2 instance setup page.

    ![](img/aws_ec2.png)

1. Set the number of instances to 1, and name of instance to something descriptive.

    ![](img/aws_ec2_single_instance.png)

1. Confirm that the region(top right, next to username) is correct.

    ![](img/aws_region.png)

1. In the "Application and OS Images" section choose the "My AMIs" tab and select your imported solo AMI.

    ![](img/aws_ec2_appandOS_myami.png)

1. In the "Instance type" section, choose the required instance size.

    ![](img/aws_ec2_instance_type.png)

1. In the "Keypair" section, select a keypair to use. *It is good practice to use the same keypair for the login and compute nodes.*

    ![](img/aws_ec2_keypair.png)

1. In the "Network settings" sections, click the "Edit" button to set the network and subnet. **Remember what these are**, as they should be the same **for any associated compute nodes.**

    ![](img/aws_ec2_security.png)

    ![](img/aws_ec2_security_edit.png)


1. Another thing needed is a security group to associate with all nodes on the cluster. It is recommended to use a security group with rules limiting traffic through:

    - HTTP
    - HTTPS
    - SSH
    - Port 8888
    - Ports 5900 - 5903
    - All traffic from within the security group should be allowed. (This rule can only be added after creation)


    !!! note

        If you already have a security group which does this, use it here and **make sure to use it again for the compute nodes.** Otherwise, a security group can be made from the launch page, or through the [security groups page](https://eu-west-2.console.aws.amazon.com/ec2/home?region=eu-west-2#SecurityGroups:)

        Describing exactly how to create a security group is out of scope for this documentation, but covered by the [AWS documentation](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-security-groups.html?icmpid=docs_ec2_console#creating-security-group).

        However, here is an example security group that might be used for a Flight Solo cluster:

        ![](img/aws_security_group_example.png)

1. After a security group has been made, click "Choose Existing" select it from the drop down menu.

1. In the "Configure Storage" section, allocate as much memory as needed. 8GB is the minimum required for Flight Solo, so it is likely the compute nodes will not need much more than that, as the login node hosts most data.

    ![](img/aws_ec2_storage.png)

1. Finally, click "Launch Instance".
