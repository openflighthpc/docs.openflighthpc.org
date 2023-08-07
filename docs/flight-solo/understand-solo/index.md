# Understanding Flight Solo 

Flight Solo is a combination of tools, process and knowledge with the aim of providing a streamlined solution to launching HPC systems. It broadly consists of:

- HPC-Optimised Rocky 8 OS
- Cloud-Init Integration
- Flight Environment

## HPC Optimised Rocky 8 OS

Flight Solo is built of a clean Rocky EL8 image. This image has been tweaked to be ready to do HPC through:

- Kernel drivers set to support most virtualisation platforms
- Suitable security settings

## Cloud-Init Integration

[Cloud-Init](https://cloudinit.readthedocs.io/en/latest/index.html) provides the ability to inject runtime information and configuration into the OS of cloud systems. It can be used to perform many different setup tasks, detailing this setup is outside the scope of this documentation. Information 

More information on using Cloud-Init in the context of Flight Solo can be found in the [User Data documentation](user-data.md).

## Flight Environment 

Flight Solo comes with the complete [Flight Environment](../../flight-environment/index.md) installed by default along with suitable configuration modifications to get the most out of the tools from the get-go. 

