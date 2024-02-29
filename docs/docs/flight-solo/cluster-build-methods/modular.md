---
title: Modular Cluster Workflow
---

Use the tabs below to assist in selection of the correct cluster build document.

???+ question "Which cluster type?"
    === "SLURM"
        ???+ question "Which cluster size?" 
            === "Standalone"
                ???+ question "Which platform?"
                    === ":fontawesome-brands-aws: AWS"
                        [Build SLURM Standalone on AWS](slurm-standalone-aws.md){ .md-button .md-button--primary }
                    === ":simple-microsoftazure: Azure" 
                        [Build SLURM Standalone on Azure](slurm-standalone-azure.md){ .md-button .md-button--primary }
                    === ":simple-openstack: OpenStack" 
                        [Build SLURM Standalone on OpenStack](slurm-standalone-openstack.md){ .md-button .md-button--primary }
                    === ":custom-alces-cloud: Alces Cloud" 
                        [Build SLURM Standalone on Alces Cloud](slurm-standalone-alces-cloud.md){ .md-button .md-button--primary }
            === "Multinode"
                ???+ question "Which platform?"
                    === ":fontawesome-brands-aws: AWS"
                        [Build SLURM Multinode on AWS](slurm-multinode-aws.md){ .md-button .md-button--primary }
                    === ":simple-microsoftazure: Azure"
                        [Build SLURM Multinode on Azure](slurm-multinode-azure.md){ .md-button .md-button--primary }
                    === ":simple-openstack: OpenStack"
                        [Build SLURM Multinode on OpenStack](slurm-multinode-openstack.md){ .md-button .md-button--primary }
                    === ":custom-alces-cloud: Alces Cloud" 
                        [Build SLURM Multinode on Alces Cloud](slurm-multinode-alces-cloud.md){ .md-button .md-button--primary }
    === "Kubernetes"
        ???+ question "Which cluster size?" 
            === "Multinode"
                ???+ question "Which platform?"
                    === ":fontawesome-brands-aws: AWS"
                        [Build Kubernetes Multinode on AWS](kubernetes-multinode-aws.md){ .md-button .md-button--primary }
                    === ":simple-microsoftazure: Azure" 
                        [Build Kubernetes Multinode on Azure](kubernetes-multinode-azure.md){ .md-button .md-button--primary }
                    === ":simple-openstack: OpenStack" 
                        [Build Kubernetes Multinode on OpenStack](kubernetes-multinode-openstack.md){ .md-button .md-button--primary }
                    === ":custom-alces-cloud: Alces Cloud"
                        [Build Kubernetes Multinode on Alces Cloud](kubernetes-multinode-alces-cloud.md){ .md-button .md-button--primary }
    === "Jupyter Lab"
        ???+ question "Which cluster size?" 
            === "Standalone"
                ???+ question "Which platform?"
                    === ":fontawesome-brands-aws: AWS"
                        [Build Jupyter Lab Standalone on AWS](jupyter-lab-standalone-aws.md){ .md-button .md-button--primary }
                    === ":simple-microsoftazure: Azure" 
                        [Build Jupyter Lab Standalone on Azure](jupyter-lab-standalone-azure.md){ .md-button .md-button--primary }
                    === ":simple-openstack: OpenStack" 
                        [Build Jupyter Lab Standalone on OpenStack](jupyter-lab-standalone-openstack.md){ .md-button .md-button--primary }
                    === ":custom-alces-cloud: Alces Cloud" 
                        [Build Jupyter Lab Standalone on Alces Cloud](jupyter-lab-standalone-alces-cloud.md){ .md-button .md-button--primary }

