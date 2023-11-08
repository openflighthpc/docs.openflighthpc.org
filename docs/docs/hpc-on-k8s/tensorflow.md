# TensorFlow Workload
TensorFlow is an open-source end-to-end platform for machine learning. It has a comprehensive, flexible ecosystem of tools, libraries, and community resources that lets researchers push the state-of-the-art in ML and developers easily build and deploy ML-powered applications. 

## Steps to Execute Job
Below is the example manifest file for TensorFlow workload in a Kubernetes cluster.
```yaml
# job.yaml
---
apiVersion: batch/v1
kind: Job
metadata:
  generateName: tensorflow-
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
        image: shubhamdang/custom_tensorflow:1.15.5
        command: [ "/bin/sh", "-c", "python " ]
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
            value: "tensorflow"
        resources:
          requests:
            cpu: 500m
            memory: "2000Mi"
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
    For More Information about scripts, Dockerfile and yaml files, Follow Link: [TensorFlow](https://github.com/openflighthpc/hpc-on-k8s/tree/main/workloads/tensorflow)