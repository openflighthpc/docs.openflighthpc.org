# SimPy Workload
SimPy is a tool that helps you simulate real-world processes using Python. It's like building a virtual world where you can model how different things interact with each other, such as customers in a store, vehicles on a road, or agents in a network. It works by using Python's generator functions to define the behavior of the different components in your simulation. These components can be anything from individual customers to complex systems like traffic networks.


## Steps to Execute Job
Below is the example manifest file for SimPy workload in a Kubernetes cluster.
```yaml
# job.yaml
---
apiVersion: batch/v1
kind: Job
metadata:
  generateName: simpy-
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
        image: openflighthpc/simpy:latest
        command: [ "python", "main.py" ]
        env:
          - name: MINIO_IP
            value: <minio ip like "10.151.15.78">
          - name: MINIO_PORT
            value: <minio port like "31100">
          # Minio Access Key   
          - name: MINIO_AKEY
            value:<minio-access-key like "afdfAdsfslWssedsfsdjE">
          # Minio Secret Key   
          - name: MINIO_SKEY
            value: <minio-secret-key like "Zsfdslfjaslffafddfj">
          - name: BUCKET_NAME
            value: <minio bucket name like "simpy">
        resources:
          requests:
            cpu: 500m
            memory: "1000Mi"
      restartPolicy: Never
```

!!! note
    Steps to create minio access key and secret key can be found in minio docs, Follow Link: [minio](./minio.md#create-access-key-and-secret-key).

!!! note
    We are assuming here Kubernetes cluster is active with Minio(or any S3), Kueue and Longhorn(or any storage class) installed.

Command to execute genome in kubernetes cluster using Kueue.

```bash
kubectl create -f job.yaml
```

When the job status is Completed then check the S3/minio console to verify results.

!!! note
    For More Information about scripts, Dockerfile and yaml files, Follow Link: [SimPy](https://github.com/openflighthpc/hpc-on-k8s/tree/main/workloads/simpy)