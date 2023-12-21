# Installing Longhorn
Install Longhorn on any Kubernetes cluster using this command:

```bash
kubectl apply -f https://raw.githubusercontent.com/longhorn/longhorn/v1.2.3/deploy/longhorn.yaml
```

!!! note
    Sometimes `open-iscsi` is not installed on the nodes, so we can run below command to install on red hat and debian based systems.

    ```bash
    # red hat based systems
    sudo dnf install iscsi-initiator-utils
    sudo systemctl start iscsid
    sudo systemctl enable iscsid

    # debian bases system
    sudo apt-get install open-iscsi
    sudo systemctl start iscsid
    sudo systemctl enable iscsid
    ```

    
One way to monitor the progress of the installation is to watch pods being created in the longhorn-system namespace:

```bash
kubectl get pods \
--namespace longhorn-system \
--watch
```

Check that the deployment was successful:

```bash
kubectl -n longhorn-system get pod
NAME                                                READY   STATUS    RESTARTS   AGE
longhorn-ui-b7c844b49-w25g5                         1/1     Running   0          2m41s
longhorn-manager-pzgsp                              1/1     Running   0          2m41s
longhorn-driver-deployer-6bd59c9f76-lqczw           1/1     Running   0          2m41s
longhorn-csi-plugin-mbwqz                           2/2     Running   0          100s
csi-snapshotter-588457fcdf-22bqp                    1/1     Running   0          100s
csi-snapshotter-588457fcdf-2wd6g                    1/1     Running   0          100s
csi-provisioner-869bdc4b79-mzrwf                    1/1     Running   0          101s
csi-provisioner-869bdc4b79-klgfm                    1/1     Running   0          101s
csi-resizer-6d8cf5f99f-fd2ck                        1/1     Running   0          101s
csi-provisioner-869bdc4b79-j46rx                    1/1     Running   0          101s
csi-snapshotter-588457fcdf-bvjdt                    1/1     Running   0          100s
csi-resizer-6d8cf5f99f-68cw7                        1/1     Running   0          101s
csi-attacher-7bf4b7f996-df8v6                       1/1     Running   0          101s
csi-attacher-7bf4b7f996-g9cwc                       1/1     Running   0          101s
csi-attacher-7bf4b7f996-8l9sw                       1/1     Running   0          101s
csi-resizer-6d8cf5f99f-smdjw                        1/1     Running   0          101s
instance-manager-b34d5db1fe1e2d52bcfb308be3166cfc   1/1     Running   0          114s
engine-image-ei-df38d2e5-cv6nc 
```

!!! note
    For more details, follow link: [Longhorn](https://longhorn.io/docs/1.5.2/deploy/install/install-with-kubectl/)