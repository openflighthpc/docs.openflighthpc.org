# Installing Kubernetes Cluster with RKE

We are using RKE (Rancher Kubernetes Engine) to install a Kubernetes cluster.

## Types of Nodes in Kubernetes Installations

- **rke node (devops node):** This is the node where the RKE utility is installed, responsible for the installation of the Kubernetes cluster on other nodes.
- **k8s nodes (master/worker nodes):** These are the nodes that are part of the Kubernetes cluster where the installation takes place.

## Prerequisites (Master/Worker)

- Docker must be installed on all nodes of the Kubernetes cluster.
- Password-less SSH access must be set up from the rke node to all Kubernetes nodes.

```bash
curl https://releases.rancher.com/install-docker/20.10.sh | sh
sudo usermod -aG docker $USER
```


## Installing Kubernetes Cluster with RKE

In our case, we are using 2 nodes. `node1` will act as rke/k8s master/k8s worker node, whereas `node2` will act as a k8s master/k8s worker node 

Go to `node1` and install the RKE package:

```bash
mkdir rke
cd rke
wget https://github.com/rancher/rke/releases/download/v1.3.17/rke_linux-amd64 -O rke
sudo chmod +x rke
```

Once rke package is installed, then copy the cluster.yml in rke folder created above and update the IP of nodes.

Here is the sample `cluster.yml`
```bash
nodes:
- address: <node-1-ip>
  user: ubuntu
  role:
    - controlplane
    - etcd
    - worker
  hostname_override: mw1

- address: <node-2-ip>
  user: ubuntu
  role:
    - controlplane
    - etcd
    - worker
  hostname_override: mw2


kubernetes_version: v1.23.16-rancher2-3
network:
    plugin: calico
```
Next we need to run below command for the provision of k8s clusters from the rke node.

```bash
./rke up 
```

After the completion of k8s cluster, then copy the kubeconfig to ~/.kube/config folder

```bash
mkdir ~/.kube/config
cp kube_config_cluster.yml ~/.kube/config
```

Install kubectl to connect k8s cluster, follow the link below
[Install Kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/)


Verification of k8s cluster, if status of nodes are in READY state then k8s is ready to use.
```bash
kubectl get nodes 
```

After this step, install longhorn in k8s cluster to support storage class.

!!! note
    For more details, follow link: [RKE](https://rke.docs.rancher.com/installation)