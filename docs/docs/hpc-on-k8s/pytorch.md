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
              image: shubhamdang/my_pytorch_image:latest
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
                  value: "10.151.15.78"
                - name: MINIO_PORT
                  value: "31252"
                - name: MINIO_AKEY
                  value: "Mq6wmeNk0NOc0vD9Efut"
                - name: MINIO_SKEY
                  value: "Z3ETBqC3GuIiU9PomjBbmmC5h8I5I7WgN1wNWlCG"
                - name: BUCKET_NAME
                  value: "pytorch"

    Worker:
      replicas: 1
      restartPolicy: OnFailure
      template:
        spec:
          containers:
            - name: pytorch
              image: shubhamdang/my_pytorch_image:latest
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
                  value: "10.151.15.78"
                - name: MINIO_PORT
                  value: "31252"
                - name: MINIO_AKEY
                  value: "Mq6wmeNk0NOc0vD9Efut"
                - name: MINIO_SKEY
                  value: "Z3ETBqC3GuIiU9PomjBbmmC5h8I5I7WgN1wNWlCG"
                - name: BUCKET_NAME
                  value: "pytorch"
```
!!! note
        We are assuming here Kubernetes cluster is active with Minio(or any S3), Kueue and Longhorn(or any storage class) installed.

Command to execute genome in kubernetes cluster using Kueue.

```bash
kubectl create -f job.yaml
```

When the job status is Completed then check the S3/minio console to verify results.

!!! note
    For More Information about scripts, Dockerfile and yaml files, Follow Link: [PyTorch](https://github.com/shubhamdang/hpc-on-k8s/tree/main/workloads/pytorch)