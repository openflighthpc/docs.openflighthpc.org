# PyTorch Workload
PyTorch is an open-source machine learning library based on the Torch library, used for natural language processing (NLP), computer vision, and other artificial intelligence (AI) tasks.


## Steps to Execute Job
Below is the example manifest file for PyTorch workload in a Kubernetes cluster.
```yaml
# job.yaml
---
apiVersion: kubeflow.org/v1
kind: PyTorchJob
metadata:
  name: pytorch-simple
  namespace: default
  labels:
    kueue.x-k8s.io/queue-name: user-queue
spec:
  pytorchReplicaSpecs:
    Master:
      replicas: 1
      restartPolicy: OnFailure
      template:
        spec:
          containers:
            - name: pytorch
              image: openflighthpc/pytorch:latest
              imagePullPolicy: Always
              command:
                - "python3"
                - "/opt/mnist/src/main.py"
              resources:
                requests:
                  cpu: 500m
                  memory: "1000Mi"
              env:
                - name: MINIO_IP
                  value: <minio ip like "10.151.15.78">
                - name: MINIO_PORT
                  value: <minio port like "31100">
                # Minio Access Key   
                - name: MINIO_AKEY
                  value: <minio-access-key>
                # Minio Secret Key   
                - name: MINIO_SKEY
                  value: <minio-secret-key>
                - name: BUCKET_NAME
                  value: <minio bucket name like "pytorch">

    Worker:
      replicas: 1
      restartPolicy: OnFailure
      template:
        spec:
          containers:
            - name: pytorch
              image: openflighthpc/pytorch:latest
              imagePullPolicy: Always
              command:
                - "python3"
                - "/opt/mnist/src/main.py"
              resources:
                requests:
                  cpu: 500m
                  memory: "1000Mi"
              env:
                - name: MINIO_IP
                  value: <minio ip like "10.151.15.78">
                - name: MINIO_PORT
                  value: <minio port like "31100">
                # Minio Access Key   
                - name: MINIO_AKEY
                  value: <minio-access-key>
                # Minio Secret Key   
                - name: MINIO_SKEY
                  value: <minio-secret-key>
                - name: BUCKET_NAME
                  value: <minio bucket name like "pytorch">

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
    For More Information about scripts, Dockerfile and yaml files, Follow Link: [PyTorch](https://github.com/openflighthpc/hpc-on-k8s/tree/main/workloads/pytorch)