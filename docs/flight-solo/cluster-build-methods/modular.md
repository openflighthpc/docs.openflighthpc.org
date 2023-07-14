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
                        [Build SLURM Standalone on AWS](slurm-standalone-aws.md){ .md-button .md-button--primary }
                    === "Azure" 
                        [Build SLURM Standalone on Azure](slurm-standalone-azure.md){ .md-button .md-button--primary }
            === "Multinode"
                ??? question "Which platform?"
                    === "AWS"
                        [Build SLURM Multinode on AWS](slurm-multinode-aws.md){ .md-button .md-button--primary }
                    === "Azure"
                        [Build SLURM Multinode on Azure](slurm-multinode-azure.md){ .md-button .md-button--primary }
    === "Kubernetes"
        ??? question "Which cluster size?" 
            === "Multinode"
                ??? question "Which platform?"
                    === "AWS"
                        [Build Kubernetes Multinode on AWS](kubernetes-multinode-aws.md){ .md-button .md-button--primary }
                    === "Azure" 
                        [Build Kubernetes Multinode on Azure](kubernetes-multinode-azure.md){ .md-button .md-button--primary }
    === "Jupyter Lab"
        ??? question "Which cluster size?" 
            === "Standalone"
                ??? question "Which platform?"
                    === "AWS"
                        [Build Jupyter Lab Standalone on AWS](jupyter-lab-standalone-aws.md){ .md-button .md-button--primary }
                    === "Azure" 
                        [Build Jupyter Lab Standalone on Azure](jupyter-lab-standalone-azure.md){ .md-button .md-button--primary }

