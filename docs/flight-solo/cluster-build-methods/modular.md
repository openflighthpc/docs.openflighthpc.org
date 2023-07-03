---
title: Modular Cluster Workflow
---

## This page is experimenting with reducing the amount of noise from other platform info all being embedded in one place


Use the tabs below to assist in selection of the correct cluster build document.

??? question "Which cluster type?"
    === "SLURM"
        ??? question "Which cluster size?" 
            === "Standalone"
                ??? question "Which platform?"
                    === "AWS"
                        [Build SLURM Standalone on AWS](/flight-solo/cluster-build-methods/slurm-standalone-aws){ .md-button .md-button--primary }
                    === "Azure" 
                        [Build SLURM Standalone on Azure](/flight-solo/cluster-build-methods/slurm-standalone-azure){ .md-button .md-button--primary }
            === "Multinode"
                ??? question "Which platform?"
                    === "AWS"
                        [Build SLURM Multinode on AWS](/flight-solo/cluster-build-methods/slurm-multinode-aws){ .md-button .md-button--primary }
                    === "Azure"
                        [Build SLURM Multinode on Azure](/flight-solo/cluster-build-methods/slurm-multinode-azure){ .md-button .md-button--primary }
    === "Kubernetes"
        ??? question "Which cluster size?" 
            === "Multinode"
                ??? question "Which platform?"
                    === "AWS"
                        [Build Kubernetes Multinode on AWS](/flight-solo/cluster-build-methods/kubernetes-multinode-aws){ .md-button .md-button--primary }
                    === "Azure" 
                        [Build Kubernetes Multinode on Azure](/flight-solo/cluster-build-methods/kubernetes-multinode-azure){ .md-button .md-button--primary }
    === "Jupyter Lab"
        ??? question "Which cluster size?" 
            === "Standalone"
                ??? question "Which platform?"
                    === "AWS"
                        [Build Jupyter Lab Standalone on AWS](/flight-solo/cluster-build-methods/jupyter-lab-standalone-aws){ .md-button .md-button--primary }
                    === "Azure" 
                        [Build Jupyter Lab Standalone on Azure](/flight-solo/cluster-build-methods/jupyter-lab-standalone-azure){ .md-button .md-button--primary }

