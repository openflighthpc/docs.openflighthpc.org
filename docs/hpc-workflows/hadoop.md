# Hadoop Workflow Example

Hadoop is a scalable, distributed computing solution provided by Apache. Similar to queuing systems, Hadoop allows for distributed processing of large data sets.

## Installing Hadoop Manually to Shared Filesystem

!!! note
    The flight environment will need to be activated before the environments can be created so be sure to run `flight start` or [setup your environment to automatically activate the flight environment](../flight-environment/use-flight/environment-basics.md#activating-the-flight-system).

- Install dependencies for Hadoop:
    ```bash
    [flight@chead1 (mycluster1) ~]$ sudo yum install -y java-1.8.0-openjdk.x86_64 java-1.8.0-openjdk-devel.x86_64
    ```
- Download Hadoop v3.2.1:
    ```bash
    [flight@chead1 (mycluster1) ~]$ flight silo software pull --repo openflight hadoop 3.2.1
    ```

!!! tip
    If you are using a different version of java, the version may be changed on line 54 in `hadoop-3.2.1/etc/hadoop/hadoop-env.sh`


## Downloading the Hadoop Job

These steps help setup the Hadoop environment and download a spreadsheet of data which will Hadoop will sort into sales units per region.

- Download and source Hadoop environment variables:
    ```bash
    [flight@chead1 (mycluster1) ~]$ flight silo file pull openflight:hadoop/hadoopenv
    [flight@chead1 (mycluster1) ~]$ source hadoopenv
    ```

!!! tip
    Be sure to update line 1 in `hadoopenv` if you are setting this up in a different location.
    If using a different version of java, update line 3.

- Create job directory:
    ```bash
    [flight@chead1 (mycluster1) ~]$ mkdir MapReduceTutorial
    [flight@chead1 (mycluster1) ~]$ chmod 777 MapReduceTutorial
    ```
- Download job data:
    ```bash
    [flight@chead1 (mycluster1) ~]$ cd MapReduceTutorial
    [flight@chead1 (mycluster1) MapReduceTutorial]$ flight silo file pull openflight:hadoop/hdfiles.zip
    [flight@chead1 (mycluster1) MapReduceTutorial]$ unzip -j hdfiles.zip
    ```
- Check that job data files are present:
    ```bash
    [flight@chead1 (mycluster1) MapReduceTutorial]$ ls
    desktop.ini  hdfiles.zip  SalesCountryDriver.java  SalesCountryReducer.java  SalesJan2009.csv  SalesMapper.java
    ```

## Preparing the Hadoop Job

- Compile java for job:
    ```bash
    [flight@chead1 (mycluster1) MapReduceTutorial]$ javac -d . SalesMapper.java SalesCountryReducer.java SalesCountryDriver.java
    ```
- Create a manifest file:
    ```bash
    [flight@chead1 (mycluster1) MapReduceTutorial]$ echo "Main-Class: SalesCountry.SalesCountryDriver" >> Manifest.txt
    ```
- Compile the final java file for job:
    ```bash
    [flight@chead1 (mycluster1) MapReduceTutorial]$ jar cfm ProductSalePerCountry.jar Manifest.txt SalesCountry/*.class
    ```

## Starting the Hadoop Environment

- Start the Hadoop distributed file system service:
    ```bash
    [flight@chead1 (mycluster1) MapReduceTutorial]$ $HADOOP_HOME/sbin/start-dfs.sh
    ```
- Start the resource manager, node manager and app manager service:
    ```bash
    [flight@chead1 (mycluster1) MapReduceTutorial]$ $HADOOP_HOME/sbin/start-yarn.sh
    ```
- Create directory for processing data and copy sales results in:
    ```bash
    [flight@chead1 (mycluster1) MapReduceTutorial]$ mkdir ~/inputMapReduce
    [flight@chead1 (mycluster1) MapReduceTutorial]$ cp SalesJan2009.csv ~/inputMapReduce/
    ```
- Load the data into the distributed file system:
    ```bash
    [flight@chead1 (mycluster1) MapReduceTutorial]$ $HADOOP_HOME/bin/hdfs dfs -ls ~/inputMapReduce
    ```

## Running the Hadoop Job

- Execute the MapReduce job:
    ```bash
    [flight@chead1 (mycluster1) MapReduceTutorial]$ $HADOOP_HOME/bin/hadoop jar ProductSalePerCountry.jar ~/inputMapReduce ~/mapreduce_output_sales
    ```
- View the job results:
    ```bash
    [flight@chead1 (mycluster1) MapReduceTutorial]$ $HADOOP_HOME/bin/hdfs dfs -cat ~/mapreduce_output_sales/part-00000 | more
    ```
