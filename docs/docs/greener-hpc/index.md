# Greener HPC

Taking steps towards greener HPC solutions reduces impact on the planet, encourages more effective use of resources and develops positive evolution in the industry. 

Demand for HPC resources grows year after year and, with that, so does interest in minimising environmental impact of said resources. Minimising environmental impact can be approached from many different angles and this documentation aims to provide considerations for optimising your HPC utilisation.

## Considerations 

The impacts of resources on the environment come from two areas:

- **Embedded**: These impacts are the environmental damages from the obtaining of materials,  manufacturer and transport of the various hardware components in the system
- **Usage**: These impacts come from the running of the resources throughout it's lifetime

### Embedded Impacts

Manufacturers are becoming more transparent with reporting the embedded impacts of their servers which allows for evaluation of the latest HPC compute resources before a HPC solution is purchased. Alternatively, cloud platforms provide access to resources and utilising these when resources are required will share the impact of the embedded costs as the responsibility of the underlying hardware is elsewhere.

Understanding the resource requirements will allow for resources to be specified to suit the workloads that will be run on them. Having a system with far more resources than needed leads to unnecessary manufacture and also wasted power.

### Usage Impacts

The usage of the resources is mainly effected by the power consumed by the server. More power is drawn by the system when the utilisation of it is higher. It is therefore vital to have understanding of the workload efficiency and power source for the HPC solution.

The source of power for the HPC resource majorly influences the environmental impact and largely depends on the fuel types providing electricity to the HPC resources.

Understanding the workloads that are to be executed on the HPC resources will provide insight into optimisation of usage which, in turn, will reduce wasted power. Some things to consider about workloads:  

- Is the workloads utilising all the resources that are reserved?
    - For example, a SLURM job script for executing a CFD workload may reserve an entire compute node but only utilises 50% of the resources within it
- Does the workload's resource utilisation fluctuate?
    - For example, a workload could have stages for preparing the data for evaluation and processing the data before output. These stages could use a lot less of the resources and would be more efficient to separate out into smaller, separate workloads

