# Easybuild Usage Example

EasyBuild is a software build and installation framework that allows you to manage (scientific) software on High Performance Computing (HPC) systems in an efficient way.

## Creating and Using Ecosystem

Flight Env provides quick setup methods to create an easybuild software ecosystem.

To install and use easybuild:

- [Activate the flight system.](../../../environment-basics.md#activate-the-flight-environment)
- Create the easybuild installation for the user:

```bash
[flight@chead1 ~]$ flight env create easybuild
Creating environment easybuild@default
   > ✅ Verifying prerequisites
   > ✅ Fetching prerequisite (lua)
   > ✅ Extracting prerequisite (lua)
   > ✅ Building prerequisite (lua)
   > ✅ Installing prerequisite (lua)
   > ✅ Fetching prerequisite (tcl)
   > ✅ Extracting prerequisite (tcl)
   > ✅ Building prerequisite (tcl)
   > ✅ Installing prerequisite (tcl)
   > ✅ Fetching prerequisite (lmod)
   > ✅ Extracting prerequisite (lmod)
   > ✅ Configuring prerequisite (lmod)
   > ✅ Installing prerequisite (lmod)
   > ✅ Fetching prerequisite (easybuild)
   > ✅ Bootstrapping EasyBuild environment (easybuild@default)
Environment easybuild@default has been created
```

- Activate the easybuild ecosystem:
```bash
[flight@chead1 ~]$ flight env activate easybuild
<easybuild> [flight@chead1 ~]$
```
- Check that easybuild can be run:
```bash
<easybuild> [flight@chead1 ~]$ module load EasyBuild
<easybuild> [flight@chead1 ~]$ eb --version
This is EasyBuild 3.9.4 (framework: 3.9.4, easyblocks: 3.9.4) on host chead1.pri.basic.cluster.local.
```

## Installing and Running Perl

An example workflow using perl is demonstrated below.

- View available versions:
```bash
<easybuild> [flight@chead1 ~]$ eb -S perl
CFGS1=/home/flight/.local/share/flight/env/easybuild+default/software/EasyBuild/3.9.4/lib/python2.7/site-packages/easybuild_easyconfigs-3.9.4-py2.7.egg/easybuild/easyconfigs
 * $CFGS1/a/annovar/annovar-2016Feb01-foss-2016a-Perl-5.22.1.eb
 * $CFGS1/b/Bio-DB-HTS/Bio-DB-HTS-2.11-foss-2017b-Perl-5.26.0.eb
 * $CFGS1/b/Bio-DB-HTS/Bio-DB-HTS-2.11-foss-2018b-Perl-5.28.0.eb
 * $CFGS1/b/Bio-DB-HTS/Bio-DB-HTS-2.11-intel-2017b-Perl-5.26.0.eb
<-- snip -->
 * $CFGS1/p/Perl/Perl-5.26.1-GCCcore-6.4.0.eb
 * $CFGS1/p/Perl/Perl-5.26.1-foss-2018a-bare.eb
 * $CFGS1/p/Perl/Perl-5.26.1-foss-2018a.eb
 * $CFGS1/p/Perl/Perl-5.28.0-GCCcore-7.3.0.eb
 * $CFGS1/p/Perl/Perl-5.28.1-GCCcore-8.2.0.eb
<-- snip -->
 * $CFGS1/y/YAML-Syck/YAML-Syck-1.27-goolf-1.4.10-Perl-5.16.3.eb
 * $CFGS1/y/YAML-Syck/YAML-Syck-1.27-ictce-5.3.0-Perl-5.16.3.eb

Note: 9 matching archived easyconfig(s) found, use --consider-archived-easyconfigs to see them
```
- Install specific version:
```bash
<easybuild> [flight@chead1 ~]$ eb Perl-5.28.1-GCCcore-8.2.0.eb --robot
== temporary log file in case of crash /tmp/eb-MdohD2/easybuild-J6tjhZ.log
== resolving dependencies ...
== processing EasyBuild easyconfig /home/flight/.local/share/flight/env/easybuild+default/software/EasyBuild/3.9.4/lib/python2.7/site-packages/easybuild_easyconfigs-3.9.4-py2.7.egg/easybuild/easyconfigs/m/M4/M4-1.4.18.eb
== building and installing M4/1.4.18...
== fetching files...
== creating build dir, resetting environment...
== unpacking...
== patching...
== preparing...
== configuring...
== building...
<-- snip -->
```

- Check installation location:
```bash
<easybuild> [flight@chead1 ~]$ which perl
```
- Install perl library (this may prompt for initial ``cpan`` configuration, once configuration is complete then the library will be installed):
```bash
<easybuild> [flight@chead1 ~]$ cpan File::Slurp
Loading internal null logger. Install Log::Log4perl for logging messages
Reading '/home/flight/.cpan/Metadata'
  Database was generated on Mon, 09 Sep 2019 15:47:03 GMT
Running install for module 'File::Slurp'
<-- snip -->
```
- Check installation worked:
```bash
<easybuild> [flight@chead1 ~]$ cpan File::Slurp
Loading internal null logger. Install Log::Log4perl for logging messages
Reading '/home/flight/.cpan/Metadata'
  Database was generated on Mon, 09 Sep 2019 15:47:03 GMT
File::Slurp is up to date (9999.27).
```
