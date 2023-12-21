# Deploying Minio in Kubernetes

To deploy Minio in our Kubernetes cluster, we utilize Helm charts. Prior to installation, it's crucial to ensure that the Helm CLI is properly set up and the kubeconfig file is located in the designated directory.

For this installation, we've opted for the default namespace, employing the following configurations:

- `global.storageClass:` The Storage Class for the Persistent Volume Claim (PVC) associated with MinIO's data volume.
- `auth.rootUser:` The root username for MinIO.
- `auth.rootPassword:` The root password for MinIO.
- `service.type:` The service type for MinIO.
- `service.nodePorts.api:` Specify the MinIO API nodePort value for both LoadBalancer and NodePort service types.
- `service.nodePorts.console:` Specify the MinIO Console nodePort value for the LoadBalancer and NodePort service types.
- `persistence.size:` The Persistent Volume Claim (PVC) storage size request for MinIO's data volume.

```bash
helm repo add bitnami https://charts.bitnami.com/bitnami

helm install -n default  --set global.storageClass=longhorn --set auth.rootUser=admin --set auth.rootPassword=test123456 --set service.type=NodePort --set service.nodePorts.api=31100 --set service.nodePorts.console=31101 --set persistence.size=2Gi my-minio bitnami/minio --version 12.9.4
```

!!! note
    The `persistence.size` parameter is configured with a value of 2Gi. It's advisable to set the size of the persistence volume considering the requirements of the file system storage.

## Accessing Minio Console

After the installation process concludes, the Minio console becomes accessible via the URL `http://<k8s-master-node-ip>:<console-nodeort-value>`. For instance, if the Kubernetes master node IP is 11.11.11.34 and the console node port value is 31101, the URL will be `http://11.11.11.34:31101`.

It's important to note that all Kubernetes workloads will employ the Minio API port for uploading their results to the Minio storage system. This seamless integration ensures a streamlined process for storing and managing workload outcomes.


!!! note
    For more details, follow link: [Minio](https://artifacthub.io/packages/helm/bitnami/minio)


## Create Access Key and Secret Key

- Login to minio console, then click on 'Access Keys' in the User Section.
- Click on 'Create Access Key', it will show Access Key and Secret Key and then click on Create to create keys. 