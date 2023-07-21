
1. Find the Flight Solo image [here](https://alces-flight.com/solo/aws) or by searching the marketplace for "Flight Solo".

2. Click "Continue to Subscribe"

    ![](img/aws_continue_subscribe.png)

3. Read the terms and conditions, then click "Continue to Configuration"

    ![](img/aws_continue_configure.png)

4. Configure region, software version (if unsure use the latest), and fulfillment option (if unsure use the default). Then click "Continue to Launch". **Make sure the region is the same for all nodes to be used in a cluster.**

    ![](img/aws_continue_launch.png)

5. Click on "Usage Instructions" to see some instructions on how to get started, and a link to this documentation.

    ![](img/aws_launch_usage.png)


6. Select the "Launch from Website" action.

    ![](img/aws_launch_action.png)


7. Choose an instance type to use.

    ![](img/aws_instance_type.png)


8. Choose VPC settings. **Remember what VPC was used to create this instance**, as it should also **be used for any associated compute nodes.**

    ![](img/aws_vpc_settings.png)


9. Choose a subnet. **Remember what subnet was used to create this instance**, as it should also **be used for any associated compute nodes.**

    ![](img/aws_subnet_settings.png)

10. A security group is needed to associate with all nodes on the cluster. It is recommended to use a security group with rules limiting traffic through:

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

    !!! tip

        The seller's settings (shown below) can be used as a reference for creating a security group.

        ![](img/aws_seller_settings.png)

11. After a security group has been made, click "Select existing security group" select it from the drop down menu.

    ![](img/aws_security_group.png)

12. Choose what key pair to use. *It is good practice for this to be the same on all nodes in a cluster.*

    ![](img/aws_keypair_settings.png)

13. Click Launch

    ![](img/aws_login_launched.png)
