# Modules Usage Example

Modules provides simple environment management. Tools and software to be used with modules will be compiled or installed outside of the modules environment.

## Creating and Using Ecosystem

Flight Env provides quick setup methods to create a modules software ecosystem.

To install and use modules:

- [Activate the flight system.](../../../environment-basics.md#activate-the-flight-environment)
- Create the modules installation for the user:
```bash
[flight@chead1 ~]$ flight env create modules
Creating environment modules@default
   > ✅ Verifying prerequisites
   > ✅ Fetching prerequisite (modules)
   > ✅ Extracting prerequisite (modules)
   > ✅ Building prerequisite (modules)
   > ✅ Installing prerequisite (modules)
   > ✅ Creating environment (modules@default)
Environment modules@default has been created
```
- Activate the modules ecosystem:
```bash
[flight@chead1 ~]$ flight env activate modules
<modules> [flight@chead1 ~]$
```
- Check that modules can be run:
```bash
<modules> [flight@chead1 ~]$ module --version
Modules Release 4.3.0 (2019-07-26)
```

## Installing Software - General Overview


Unlike the other [package ecosystems](index.md), Modules provides the ecosystem management tool but not any package management tools. Therefore, with the Modules ecosystem, you are free to compile and install software in a Module compatible manner.

Module files can be installed to `~/.local/share/flight/env/modules+default/modulefiles` (for local Modules ecosystems) or to `/opt/apps/flight/env/modules+global/modulefiles` (for global modules ecosystems).

!!!
    If the Modules ecosystem has been installed with a [custom ecosystem name](../usage.md#custom-ecosystem-names) then the path will not be `modules+default`/`modules+global` but instead `modules+mycustomname`

For more information on building software for Modules, see the [modulefile reference](https://modules.readthedocs.io/en/latest/modulefile.html) and build documentation for the chosen software.


## Installing and Running Perl


### Compile Perl from Source


- Download perl 5.30.1 source:
```bash
<modules> [flight@chead1 ~]$ wget https://www.cpan.org/src/5.0/perl-5.30.1.tar.gz
```
- Decompress the source files:
```bash
<modules> [flight@chead1 ~]$ tar -xzf perl-5.30.1.tar.gz
```
- Configure the software to install to a localperl directory:
```bash
<modules> [flight@chead1 ~]$ cd perl-5.30.1
<modules> [flight@chead1 ~]$ ./Configure -des -Dprefix=$HOME/localperl
```
- Compile and install perl:
```bash
<modules> [flight@chead1 ~]$ make
<modules> [flight@chead1 ~]$ make install
```

### Create Modulefile and Test

- Create the perl modulefile:
```bash
<modules> [flight@chead1 ~]$ cat << EOF > ~/.local/share/flight/env/modules+default/modulefiles/perl-5.30.1
#%Module1.0
proc ModulesHelp { } {
global dotversion

puts stderr "\tPerl 5.30.1"
}

module-whatis "Perl 5.30.1"
conflict perl
prepend-path PATH ~/localperl/bin
prepend-path LD_LIBRARY_PATH ~/localperl/lib
prepend-path LIBRARY_PATH ~/localperl/lib
prepend-path MANPATH ~/localperl/man
EOF
```
- Check install location:
```bash
<modules> [flight@chead1 ~]$ module load perl-5.30.1
<modules> [flight@chead1 ~]$ which perl
~/localperl/bin/perl
```
- Install perl library (this may prompt for initial `cpan` configuration, once configuration is complete then the library will be installed):
```bash
<modules> [flight@chead1 ~]$ cpan File::Slurp
Loading internal logger. Log::Log4perl recommended for better logging
Reading '/home/flight/.cpan/Metadata'
  Database was generated on Wed, 11 Mar 2020 15:29:03 GMT
<-- snip -->
Appending installation info to /home/flight/localperl/lib/5.30.1/x86_64-linux/perllocal.pod
  CAPOEIRAB/File-Slurp-9999.30.tar.gz
  /usr/bin/make install  -- OK
```
- Check installation worked:
```bash
<modules> [flight@chead1 ~]$ cpan File::Slurp
Loading internal logger. Log::Log4perl recommended for better logging
Reading '/home/flight/.cpan/Metadata'
  Database was generated on Wed, 11 Mar 2020 15:29:03 GMT
File::Slurp is up to date (9999.30).
```
