# Hadoop Workload
Hadoop is an open-source framework that efficiently processes and stores vast amounts of data across distributed computing clusters. It breaks down large datasets into manageable chunks and distributes them across multiple computers, allowing for parallel processing and analysis. This distributed approach makes it possible to handle massive amounts of data that would be impractical to process on a single machine.


## Steps to Execute Job
Below is the example manifest file for Hadoop Mapreduce workload in a Kubernetes cluster.
```yaml
# job.yaml
---
apiVersion: batch/v1
kind: Job
metadata:
  generateName: hadoop-
  namespace: default
  labels:
    kueue.x-k8s.io/queue-name: user-queue
spec:
  parallelism: 1
  completions: 1
  suspend: true
  template:
    spec:
      containers:
      - name: dummy-job
        image: shubhamdang/my_hadoop_image:latest
        command: [ "python3", "/opt/main.py" ]
        env:
          - name: MINIO_IP
            value: "10.151.15.78"
          - name: MINIO_PORT
            value: "31252"
          - name: MINIO_AKEY
            value: "Mq6wmeNk0NOc0vD9Efut"
          - name: MINIO_SKEY
            value: "Z3ETBqC3GuIiU9PomjBbmmC5h8I5I7WgN1wNWlCG"
          - name: BUCKET_NAME
            value: "hadoop"
        resources:
          requests:
            cpu: 500m
            memory: "1000Mi"
      restartPolicy: Never
```
!!! note
        We are assuming here Kubernetes cluster is active with Minio(or any S3), Kueue and Longhorn(or any storage class) installed.

Command to execute genome in kubernetes cluster using Kueue.

```bash
kubectl create -f job.yaml
```

When the job status is Completed then check the S3/minio console to verify results.

!!! note
    For More Information about scripts, Dockerfile and yaml files, Follow Link: [Hadoop](https://github.com/openflighthpc/hpc-on-k8s/tree/main/workloads/hadoop)