# Hadoop Workflow Example

Hadoop is a scalable, distributed computing solution provided by Apache. Similar to queuing systems, Hadoop allows for distributed processing of large data sets.

This example sets up hadoop on a single node and processes an example data set. 

## Installing & Running Hadoop

!!! note
    The flight environment will need to be activated before the environments can be created so be sure to run `flight start` or [setup your environment to automatically activate the flight environment](../flight-environment/use-flight/environment-basics.md#activating-the-flight-system).

- Install dependencies for Hadoop:
    ```bash
    [flight@chead1 (mycluster1) ~]$ sudo yum install -y java-1.8.0-openjdk.x86_64 java-1.8.0-openjdk-devel.x86_64
    ```
- Set default Java version:
    ```bash
    [flight@chead1 (mycluster1) ~]$ sudo alternatives --set java java-1.8.0-openjdk.x86_64
    [flight@chead1 (mycluster1) ~]$ sudo alternatives --set javac java-1.8.0-openjdk.x86_64
    ```
- Download Hadoop v3.2.1:
    ```bash
    [flight@chead1 (mycluster1) ~]$ flight silo software pull --repo openflight hadoop 3.2.1
    ```

- Add the hadoop installation to the user's path along with the Java home (replacing `SILO_SOFTWARE_DIR` with the software directory used by silo in the download above, this can be done temporarily in the CLI or by adding to the user's `~/.bashrc`):
    ```bash
    export HADOOP_HOME=SILO_SOFTWARE_DIR/hadoop/3.2.1
    export PATH="$PATH:$HADOOP_HOME/bin/:$HADOOP_HOME/sbin/"
    export CLASSPATH="$HADOOP_HOME/share/hadoop/mapreduce/hadoop-mapreduce-client-core-3.2.1.jar:$HADOOP_HOME/share/hadoop/mapreduce/hadoop-mapreduce-client-common-3.2.1.jar:$HADOOP_HOME/share/hadoop/common/hadoop-common-3.2.1.jar:~/MapReduceTutorial/SalesCountry/*:$HADOOP_HOME/lib/*"
    ```

    !!! note
        If the above has been set in the `~/.bashrc` then a new session for the user will need to be started for the environment changes to take effect, otherwise the below commands will not be located

- Start the Hadoop distributed file system service:
    ```bash
    [flight@chead1 (mycluster1) ~]$ start-dfs.sh
    ```
- Start the resource manager, node manager and app manager service:
    ```bash
    [flight@chead1 (mycluster1) ~]$ start-yarn.sh
    ```

## Downloading the Hadoop Job

These steps help setup the Hadoop environment and download a spreadsheet of data which will Hadoop will sort into sales units per region.

- Create job directory:
    ```bash
    [flight@chead1 (mycluster1) ~]$ mkdir MapReduceTutorial
    ```
- Download job data:
    ```bash
    [flight@chead1 (mycluster1) ~]$ cd MapReduceTutorial
    [flight@chead1 (mycluster1) MapReduceTutorial]$ flight silo file pull openflight:hadoop/hdfiles.tar.gz
    [flight@chead1 (mycluster1) MapReduceTutorial]$ tar xf hdfiles.tar.gz
    ```
- Check that job data files are present:
    ```bash
    [flight@chead1 (mycluster1) MapReduceTutorial]$ ls
    Manifest.txt  SalesCountryDriver.java  SalesCountryReducer.java  SalesJan2009.csv  SalesMapper.java  desktop.ini  hdfiles.tar.gz
    ```

## Preparing the Hadoop Job

- Compile java for job:
    ```bash
    [flight@chead1 (mycluster1) MapReduceTutorial]$ javac -d . SalesMapper.java SalesCountryReducer.java SalesCountryDriver.java
    ```
- Compile the final java file for job:
    ```bash
    [flight@chead1 (mycluster1) MapReduceTutorial]$ jar cfm ProductSalePerCountry.jar Manifest.txt SalesCountry/*.class
    ```

## Loading Data into Hadoop

- Create directory for processing data and copy sales results in:
    ```bash
    [flight@chead1 (mycluster1) MapReduceTutorial]$ mkdir ~/inputMapReduce
    [flight@chead1 (mycluster1) MapReduceTutorial]$ cp SalesJan2009.csv ~/inputMapReduce/
    ```
- Check data can be seen in distributed file system: 
    ```bash
    [flight@chead1 (mycluster1) MapReduceTutorial]$ hdfs dfs -ls ~/inputMapReduce
    ```

## Running the Hadoop Job

- Execute the MapReduce job:
    ```bash
    [flight@chead1 (mycluster1) MapReduceTutorial]$ hadoop jar ProductSalePerCountry.jar ~/inputMapReduce ~/mapreduce_output_sales
    ```
- View the job results:
    ```bash
    [flight@chead1 (mycluster1) MapReduceTutorial]$ hdfs dfs -cat ~/mapreduce_output_sales/part-00000 | less
    ```
