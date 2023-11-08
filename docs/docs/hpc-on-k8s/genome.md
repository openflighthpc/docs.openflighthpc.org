# Genome Workload
FastQC is a widely used tool for assessing the quality of genome sequence data. It provides a comprehensive overview of various quality metrics that are crucial for ensuring the reliability and accuracy of genomic data. 


## Steps to Execute Job
Below is the example manifest file for performing genome quality checks in a Kubernetes cluster.
```yaml
# job.yaml
---
apiVersion: batch/v1
kind: Job
metadata:
  generateName: fastqc-
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
        image: shubhamdang/fastqc_python_image:latest
        command: [ "/bin/bash", "-c", "python3 /app/script.py && echo '' && ls / && ls /app/ &&cat /app/sample_data_fastqc.html " ]
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
            value: "genome"
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
    For More Information about scripts, Dockerfile and yaml files, Follow Link: [Genome](https://github.com/openflighthpc/hpc-on-k8s/tree/main/workloads/genome)