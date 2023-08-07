# Spack Usage Example

Spack is a package manager for supercomputers, Linux, and macOS. It makes installing scientific software easy. With Spack, you can build a package with multiple versions, configurations, platforms, and compilers, and all of these builds can coexist on the same machine.

## Creating and Using Ecosystem

Flight Env provides quick setup methods to create a spack software ecosystem.

To install and use spack:

- [Activate the flight system.](../../../environment-basics.md#activate-the-flight-environment)
- Create the spack installation for the user:
```bash
[flight@chead1 ~]$ flight env create spack
Creating environment spack@default
   > ✅ Verifying prerequisites
   > ✅ Fetching prerequisite (spack)
   > ✅ Extracting Spack hierarchy (spack@default)
   > ✅ Bootstrapping Spack environment (spack@default)
Environment spack@default has been created
```
- Activate the spack ecosystem:
```bash
[flight@chead1 ~]$ flight env activate spack
<spack> [flight@chead1 ~]$
```
- Check that spack can be run:
```bash
<spack> [flight@chead1 ~]$ spack --version
spack 0.12.1
```

## Installing and Running Perl


An example workflow using perl is demonstrated below.

- View available versions:
```bash
<spack> [flight@chead1 ~]$ spack list perl
==> 148 packages.
perl                          perl-extutils-pkgconfig     perl-math-cdf                    perl-sub-uplevel
perl-algorithm-diff           perl-file-copy-recursive    perl-math-cephes                 perl-svg
perl-app-cmd                  perl-file-listing           perl-math-matrixreal             perl-swissknife
perl-array-utils              perl-file-pushd             perl-module-build                perl-task-weaken
perl-b-hooks-endofscope       perl-file-sharedir-install  perl-module-implementation       perl-term-readkey
<-- snip -->

<spack> [flight@chead1 ~]$ spack info perl
Package:   perl

Description:
    Perl 5 is a highly capable, feature-rich programming language with over
    27 years of development.

Homepage: http://www.perl.org

Tags:
    None

Preferred version:
    5.26.2     http://www.cpan.org/src/5.0/perl-5.26.2.tar.gz

Safe versions:
    5.28.0     http://www.cpan.org/src/5.0/perl-5.28.0.tar.gz
    5.26.2     http://www.cpan.org/src/5.0/perl-5.26.2.tar.gz
```
- Install specific version:
```bash
<spack> [flight@chead1 ~]$ spack install perl@5.26.2
==> Installing pkgconf
==> Searching for binary cache of pkgconf
==> Warning: No Spack mirrors are currently configured
==> No binary for pkgconf found: installing from source
==> Fetching http://distfiles.alpinelinux.org/distfiles/pkgconf-1.4.2.tar.xz
<-- snip -->
==> Successfully installed perl
  Fetch: 0.83s.  Build: 2m 31.21s.  Total: 2m 32.04s.
[+] /home/flight/.local/share/flight/env/spack+default/opt/spack/linux-centos7-x86_64/gcc-4.8.5/perl-5.26.2-wavwojlef7lshvx2awf4zze2lrx5l7l4
```
- Check installation location:
```bash
<spack> [flight@chead1 ~]$ module load perl-5.26.2-gcc-4.8.5-wavwojl
<spack> [flight@chead1 ~]$ which perl
~/.local/share/flight/env/spack+default/opt/spack/linux-centos7-x86_64/gcc-4.8.5/perl-5.26.2-wavwojlef7lshvx2awf4zze2lrx5l7l4/bin/perl
```
- Install perl library (this may prompt for initial `cpan` configuration, once configuration is complete then the library will be installed):
```bash
<spack> [flight@chead1 ~]$ cpan File::Slurp
Loading internal null logger. Install Log::Log4perl for logging messages
Reading '/home/flight/.cpan/Metadata'
  Database was generated on Wed, 11 Sep 2019 14:41:02 GMT
Running install for module 'File::Slurp'
<-- snip -->
```
- Check installation worked:
```bash
<spack> [flight@chead1 ~]$ cpan File::Slurp
Loading internal null logger. Install Log::Log4perl for logging messages
Reading '/home/flight/.cpan/Metadata'
  Database was generated on Wed, 11 Sep 2019 14:41:02 GMT
File::Slurp is up to date (9999.27).
```
