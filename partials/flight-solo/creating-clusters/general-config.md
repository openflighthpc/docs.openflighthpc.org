
### Create Node Inventory

1. Parse your node(s) with the command `flight hunter parse`.

    1. This will display a list of hunted nodes, for example
        ```bash 
        [flight@login-node.novalocal ~]$ flight hunter parse
        Select nodes: (Scroll for more nodes)
        ‣ ⬡ login-node.novalocal - 10.10.0.1
          ⬡ compute-node-1.novalocal - 10.10.101.1
        ```

    1. Select the desired node to be parsed with ++space++, and you will be taken to the label editor
        ```bash
        Choose label: login-node.novalocal
        ```

    1. Here, you can edit the label like plain text
        ```bash
        Choose label: login1
        ```

        !!! tip
            You can clear the current node name by pressing ++down++ in the label editor.

    1. When done editing, press ++enter++ to save. The modified node label will appear next to the ip address and original node label.
        ```bash
        Select nodes: login-node.novalocal - 10.10.0.1 (login1) (Scroll for more nodes)
        ‣ ⬢ login-node.novalocal - 10.10.0.1 (login1)
          ⬡ compute-node-1.novalocal - 10.10.101.1
        ```

    1. From this point, you can either hit ++enter++ to finish parsing and process the selected nodes, or continue changing nodes. Either way, you can return to this list by running `flight hunter parse`.

    1. Save the node inventory before moving on to the next step.

        !!! tip
            See `flight hunter parse -h` for more ways to parse nodes.

### Add genders

1. **Optionally**, you may add genders to the newly parsed node. For example, in the case that the node should have the gender `cluster` and `all` then run the command:
    ```bash
    flight hunter modify-groups --add cluster,all login1
    ```
