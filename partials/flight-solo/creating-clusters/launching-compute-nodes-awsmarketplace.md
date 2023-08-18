
1. Go to the EC2 instance setup page through marketplace.

    1. Find the Flight Solo image [here](https://alces-flight.com/solo/aws) or by searching the marketplace for "Flight Solo".

    1. Click "Continue to Subscribe"

        ![](img/aws_continue_subscribe.png)

    1. Read the terms and conditions, then click "Continue to Configuration"

        ![](img/aws_continue_configure.png)

    1. Configure region, software version (if unsure use the latest), and fulfillment option (if unsure use the default). Then click "Continue to Launch". **Make sure the region is the same for all nodes to be used in a cluster.**

        ![](img/aws_continue_launch.png)

    1. Click on "Usage Instructions" to see some instructions on how to get started, and a link to this documentation.

        ![](img/aws_launch_usage.png)

    1. Select the "Launch from EC2" action

        ![](img/aws_launch_action_ec2.png)

    1. Click "Launch" to go to the EC2 instance setup page.

        ![](img/aws_ec2.png)

1. Set the instance name and number of instances.

    ![](img/aws_ec2_num_instances.png)

1. Confirm that the region(top right, next to username) **is the same as the region the login node was created in.**

    ![](img/aws_region.png)

1. In the "Application and OS Images" section, confirm that Flight Solo is the selected AMI.

    ![](img/aws_ec2_appandOS.png)

1. In the "Instance type" section, choose the required instance size.

    ![](img/aws_ec2_instance_type.png)

1. In the "Keypair" section, select a keypair to use. *It is good practice to use the same keypair for the login and compute nodes.*

    ![](img/aws_ec2_keypair.png)

1. In the "Network settings" section, **select the same network, subnet, and security group as the login node.**

    ![](img/aws_ec2_security.png)

    1. To change the network and subnet, click the "Edit" button, and then use the drop downs to find the correct network and subnet.

        ![](img/aws_ec2_security_edit.png)

1. In the "Configure Storage" section, allocate as much memory as needed. 8GB is the minimum required for Flight Solo, so it is likely the compute nodes will not need much more than that, as the login node hosts most data.

    ![](img/aws_ec2_storage.png)

1. In the "Advanced details" section there are many settings, but at the bottom is a text box labeled "User data".

    ![](img/aws_ec2_userdata.png)

    1. Write a cloud init script in the user data section, see [here](/cluster_build_methods/user_data/) for details:

    1. To get the information necessary for the cloud init script. Go to the [EC2 console](https://eu-west-2.console.aws.amazon.com/ec2/v2/home?region=eu-west-2#Instances:). **Make sure your region is set to the one used for login and compute nodes.**

    1. Select the created login node to see more details about it, including the private ip.

        ![](img/aws_ec2_console.png)

    1. [Log in](../../hpc-environment-basics/linux-usage/cli-basics/logging-in.md) to the login node.

    1. [Become the root user](../../hpc-environment-basics/linux-usage/cli-basics/becoming-root.md) and open the file `~/.ssh/id_alcescluster.pub`, copy the contents to the cloud init script.

        !!! tip
            If the login node is launched using the [`SHAREPUBKEY`](../understand-solo/user-data.md#sharepubkey) then there is no need to perform steps `d` and `e` as this will be performed by the systems.

1. Back on the compute node creation page, click "Launch Instance".

!!! note
    Repeat this process for any other types of nodes that need to be added to the cluster.

