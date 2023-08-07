# Singularity Usage Example

Singularity is high-performance container technology specifically designed to enhance Enterprise Performance Computing by building containers that support HPC, analytics, artificial intelligence, machine learning, and deep learning to provide "intelligence anywhere".

## Creating and Using Ecosystem

Flight Env provides quick setup methods to create a singularity software ecosystem.

To install and use singularity:

!!! warning
    If installing singularity for a user then there are a number of restrictions and additional steps to consider in configuring the environment. See the `Personal Environment` section of `flight env info singularity`.

- [Activate the flight system.](../../../environment-basics.md#activate-the-flight-environment)
- Create the singularity installation for the user:
```bash
[flight@chead1 ~]$ flight env create singularity
Creating environment singularity@default
   > ✅ Verifying prerequisites
   > ✅ Fetching prerequisite (squashfs)
   > ✅ Extracting prerequisite (squashfs)
   > ✅ Building prerequisite (squashfs)
   > ✅ Installing prerequisite (squashfs)
   > ✅ Fetching prerequisite (go)
   > ✅ Extracting prerequisite (go)
   > ✅ Fetching prerequisite (singularity)
   > ✅ Extracting prerequisite (singularity)
   > ✅ Building prerequisite (singularity)
   > ✅ Installing prerequisite (singularity)
   > ✅ Creating environment (singularity@default)
Environment singularity@default has been created
```
- Activate the singularity ecosystem:
```bash
[flight@chead1 ~]$ flight env activate singularity
<singularity> [flight@chead1 ~]$
```
- Check that singularity can be run:
```bash
<singularity> [flight@chead1 ~]$ singularity --version
singularity version 3.2.1
```

## Installing and Running Perl


An example workflow using perl is demonstrated below.

!!! note
    The perl container is built from a docker container which can be searched for in the [docker hub](https://hub.docker.com/). To search the singularity container library, use `singularity search SEARCHTERM`.

- Install specific version:
```bash
<singularity> [flight@chead1 ~]$ singularity build --sandbox perl_5.30.simg docker://perl:5.30
INFO:    Starting build...
Getting image source signatures
Copying blob sha256:4ae16bd4778367b46064f39554128dd2fda2803a5747fddeff74059f353391c9
 48.05 MiB / 48.05 MiB [====================================================] 0s
Copying blob sha256:bbab4ec87ac4f89eaabdf68dddbd1dd930e3ad43bded38d761b89abf9389a893
 7.44 MiB / 7.44 MiB [======================================================] 0s
<-- snip -->
Writing manifest to image destination
Storing signatures
INFO:    Creating sandbox directory...
INFO:    Build complete: perl_5.30.simg
```
- Check installation location:
```bash
<singularity> [flight@chead1 ~]$ singularity exec perl_5.30.simg which perl
/usr/local/bin/perl
```
- Install perl library (this may prompt for initial `cpan` configuration, once configuration is complete then the library will be installed):
```bash
<singularity> [flight@chead1 ~]$ singularity exec -w perl_5.30.simg cpan File::Slurp
INFO:    Convert SIF file to sandbox...
perl: warning: Setting locale failed.
perl: warning: Please check that your locale settings:
    LANGUAGE = (unset),
    LC_ALL = (unset),
    LC_CTYPE = "en_GB.UTF-8",
    LANG = "en_GB.UTF-8"
    are supported and installed on your system.
perl: warning: Falling back to the standard locale ("C").
Loading internal null logger. Install Log::Log4perl for logging messages
Reading '/home/flight/.cpan/Metadata'
  Database was generated on Wed, 11 Sep 2019 13:29:02 GMT
Running install for module 'File::Slurp'
<-- snip -->
```
- Check installation worked:
```bash
<singularity> [flight@chead1 ~]$ singularity exec perl_5.30.simg cpan File::Slurp
perl: warning: Setting locale failed.
perl: warning: Please check that your locale settings:
    LANGUAGE = (unset),
    LC_ALL = (unset),
    LC_CTYPE = "en_GB.UTF-8",
    LANG = "en_GB.UTF-8"
    are supported and installed on your system.
perl: warning: Falling back to the standard locale ("C").
Loading internal logger. Log::Log4perl recommended for better logging
Reading '/home/flight/.cpan/Metadata'
  Database was generated on Wed, 11 Sep 2019 13:29:02 GMT
File::Slurp is up to date (9999.27).
```
