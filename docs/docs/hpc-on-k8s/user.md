# User creation, mapping to specific namespace and kubeconfig update

The default kubeconfig provided after a Kubernetes installation grants access to all namespace. However, if the requirement is to restrict users to specific namespace for executing and viewing workloads, leveraging ServiceAccounts, Roles, and RoleBindings becomes essential.

The following steps outline the process of creating namespace, roles, role bindings, configuring user credentials in the admin kubeconfig, and generating kubeconfig for users with restricted access to `bio` and `physics` namespace.

## Steps to create bio-user in bio namespace

Apply the YAML file for `bio-user`:

```bash
# Creating physics namespace
---
apiVersion: v1
kind: Namespace
metadata:
    name: bio
---
apiVersion: v1
kind: ServiceAccount
metadata:
    name: bio-user
    namespace: bio
---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
    namespace: bio
    name: bio-role
rules:
  - apiGroups: ["*"]
    resources: ["*"]
    verbs: ["*"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
    namespace: bio
    name: bio-rolebinding
subjects:
  - kind: ServiceAccount
    name: bio-user
    namespace: bio
roleRef:
    kind: Role
    name: bio-role
    apiGroup: rbac.authorization.k8s.io
```

Create `bio-user` by applying the below command. 

```bash
kubectl apply -f bio-user.yaml
```

### Add configuration to `~/.kube/config`

```bash
kubectl config set-credentials bio-user --token=$(kubectl get secret -n bio $(kubectl get sa bio-user -n bio -o jsonpath='{.secrets[0].name}') -o jsonpath='{.data.token}' | base64 --decode)
kubectl config set-context bio-context --cluster=$(kubectl config view -o jsonpath='{.clusters[0].name}') --namespace=bio --user=bio-user
```


### Switch to bio-context and generate bio-users-kubeconfig

```bash
kubectl config use-context bio-context
kubectl config view --raw --minify=true > bio-users-kubeconfig.yaml
kubectl config use-context local
```

### Access resources

Steps to access resources of `bio` namespace.

```bash
kubectl --kubeconfig=bio-users-kubeconfig.yaml get pods
```

If a user attempts to access resources from other namespace, the following error will be encountered.

```bash
kubectl --kubeconfig=bio-users-kubeconfig.yaml  get pods -n default
Error from server (Forbidden): pods is forbidden: User "system:serviceaccount:bio:bio-user" cannot list resource "pods" in API group "" in the namespace "default"
```


## Steps to create physics-user in physics namespace

Apply the YAML file for `physics-user`:
```bash
# Creating physics namespace
---
apiVersion: v1
kind: Namespace
metadata:
  name: physics
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: physics-user
  namespace: physics
---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: physics
  name: physics-role
rules:
- apiGroups: ["*"]
  resources: ["*"]
  verbs: ["*"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  namespace: physics
  name: physics-rolebinding
subjects:
- kind: ServiceAccount
  name: physics-user
  namespace: physics
roleRef:
  kind: Role
  name: physics-role
  apiGroup: rbac.authorization.k8s.io
```

Create physics-user by applying the below command.

```bash
kubectl apply -f physics-user.yaml
```
### Add configuration to `~/.kube/config`

```bash
kubectl config set-credentials physics-user --token=$(kubectl get secret -n physics $(kubectl get sa physics-user -n physics -o jsonpath='{.secrets[0].name}') -o jsonpath='{.data.token}' | base64 --decode)
kubectl config set-context physics-context --cluster=$(kubectl config view -o jsonpath='{.clusters[0].name}') --namespace=physics --user=physics-user
```
### Switch to physics-context and generate physics-users-kubeconfig

```bash
kubectl config use-context physics-context
kubectl config view --raw --minify=true > physics-users-kubeconfig.yaml
kubectl config use-context local
```


### Access resources

Steps to access resources of `physics` namespace.

```bash
kubectl --kubeconfig=physics-users-kubeconfig.yaml get pods
```

If a user attempts to access resources from other namespace, the following error will be encountered.

```bash
kubectl --kubeconfig=physics-users-kubeconfig.yaml  get pods -n default
Error from server (Forbidden): pods is forbidden: User "system:serviceaccount:physics:physics-user" cannot list resource "pods" in API group "" in the namespace "default"
```


##  Switch back to admin context

```bash
kubectl config use-context local
```
