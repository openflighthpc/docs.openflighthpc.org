# Steps to create bio-user in bio namespace

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

## Add configuration to `~/.kube/config`

```bash
kubectl config set-credentials bio-user --token=$(kubectl get secret -n bio $(kubectl get sa bio-user -n bio -o jsonpath='{.secrets[0].name}') -o jsonpath='{.data.token}' | base64 --decode)
kubectl config set-context bio-context --cluster=$(kubectl config view -o jsonpath='{.clusters[0].name}') --namespace=bio --user=bio-user
```


## Switch to bio-context

```bash
kubectl config use-context bio-context
```

## Steps to create physics-user in bio namespace

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
## Add configuration to `~/.kube/config`

```bash
kubectl config set-credentials physics-user --token=$(kubectl get secret -n physics $(kubectl get sa physics-user -n physics -o jsonpath='{.secrets[0].name}') -o jsonpath='{.data.token}' | base64 --decode)
kubectl config set-context physics-context --cluster=$(kubectl config view -o jsonpath='{.clusters[0].name}') --namespace=physics --user=physics-user
```
## Switch to physics-context

```bash
kubectl config use-context physics-context
```
##  Switch back to admin context

```yaml
kubectl config use-context local
```
