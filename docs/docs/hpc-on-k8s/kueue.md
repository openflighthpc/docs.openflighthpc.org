# Installing Kueue

To install a released version of Kueue in your cluster, run the following command:

```bash
VERSION=v0.5.1
kubectl apply --server-side -f https://github.com/kubernetes-sigs/kueue/releases/download/$VERSION/manifests.yaml
```


Once Kueue is installed, you can proceed to configure it. Create resource flavors, a cluster queue, and a local queue for the following namespace: default, bio, and physics.

Apply the provided YAML file kueue-resources.yaml:

```bash
# kueue-resources.yaml
# Creating bio namespace
---
apiVersion: v1
kind: Namespace
metadata:
  name: bio

# Creating physics namespace
---
apiVersion: v1
kind: Namespace
metadata:
  name: physics

# Creating kueue resource flavor
---
apiVersion: kueue.x-k8s.io/v1beta1
kind: ResourceFlavor
metadata:
  name: "default-flavor"

# Creating kueue cluster queue
---
apiVersion: kueue.x-k8s.io/v1beta1
kind: ClusterQueue
metadata:
  name: "cluster-queue"
spec:
  namespaceSelector: {}
  resourceGroups:
  - coveredResources: ["cpu", "memory"]
    flavors:
    - name: "default-flavor"
      resources:
      - name: "cpu"
        nominalQuota: 9
      - name: "memory"
        nominalQuota: 36Gi


# Creating keueue local queue that is mapped to default namespace.
---
apiVersion: kueue.x-k8s.io/v1beta1
kind: LocalQueue
metadata:
  namespace: "default"
  name: "user-queue"
spec:
  clusterQueue: "cluster-queue"


# Creating keueue local queue that is mapped to bio namespace.
---
apiVersion: kueue.x-k8s.io/v1beta1
kind: LocalQueue
metadata:
  namespace: "bio"
  name: "bio-queue"
spec:
  clusterQueue: "cluster-queue"

# Creating keueue local queue that is mapped to physics namespace.
---
apiVersion: kueue.x-k8s.io/v1beta1
kind: LocalQueue
metadata:
  namespace: "physics"
  name: "physics-queue"
spec:
  clusterQueue: "cluster-queue"
```

```bash
kubectl apply -f kueue-resources.yaml
```
!!! note
    For more details, follow link: [Kueue](https://kueue.sigs.k8s.io/docs/installation/)

