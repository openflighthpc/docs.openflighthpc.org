### Check Nodes Running/Ready

1. As the `default_username` (unless this was changed, it will be `flight`) check nodes are "Ready"
    ```bash
    kubectl get nodes
    ```
### Launching a "Pod"

1. Get test yaml file for the VM
    ```bash
    flight silo file pull openflight:kubernetes/pod-launch-test.yaml
    ```

1. Launch a pod (this will create an ubuntu VM that sleeps for 10 minutes then exits)
    ```bash
    kubectl apply -f pod-launch-test.yaml
    ```
1. Check that the pod is running
    ```bash
    kubectl get pods -o wide
    ```

1. The pod should be running without issues.

### Perform Network Test


1. Create yaml file for a `php-apache` service
    ```bash
    flight silo file pull openflight:kubernetes/php-apache.yaml
    ```
1. Launch pod service
    ```bash
    kubectl apply -f php-apache.yaml
    ```
1. Get yaml file for VM to verify connection from
    ```bash
    flight silo file pull openflight:kubernetes/busybox-wget.yaml
    ```
1. Launch pod
    ```bash
    kubectl apply -f busybox-wget.yaml
    ```
1. View output of `wget` pod (this should show `OK!`)
    ```bash
    kubectl logs busybox-wget
    ```
