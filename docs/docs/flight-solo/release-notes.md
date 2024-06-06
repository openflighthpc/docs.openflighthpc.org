# Flight Solo Release Notes

It is recommended to use the latest version of Flight Solo listed here to ensure that the most up-to-date features, security patches and bug fixes are present in your environment. 

## 2024.1 
<div class="grid cards" markdown>
- :material-calendar: 07/02/2024 
- [:material-file-document: Documentation](https://openflighthpc.org/2024.1/docs/) 
- [:material-download: Images](https://repo.openflighthpc.org/?prefix=images/FlightSolo/2024.1/)
</div>

New Features:

- View the currently running configuration tasks along with durations in Flight Profile view
- Ability to migrate Silo software downloads to "archives" which can be re-applied to new instances of Flight Solo
- Rename and add descriptions to Silos

Improvements:

- Quicker Flight Profile configuration process with streamlined options
- General security & stability improvements
- Clear output from Flight Silo file list command
- Support for genders-style and regex node selection in Flight Hunter commands
- Flight Silo permissions checking and directory selection

Known Limitations:

- Azure: Kubernetes container DNS network does not resolve
- Flight Silo: Editing the details of a silo that's including in an archive may cause "Silo not found" errors
- Flight Silo: Removing a silo defined locally that is deleted upstream will result in an error
- Flight Hunter: Interactive parse text-box can scroll up the terminal window in sessions with few columns (low width)
- Flight Profile: Completed nodes show check tasks from subsequent runs in view output

## 2023.6
<div class="grid cards" markdown>
- :material-calendar: 13/10/2023 
- [:material-file-document: Documentation](https://openflighthpc.org/2023.6/docs/) 
- [:material-download: Images](https://repo.openflighthpc.org/?prefix=images/FlightSolo/2023.6/)
</div>

New Features:

- OS upgraded to EL9
- Multi-user support with IPA in SLURM Multinode cluster configurations
- Addition of auto-removal hooks for Flight Profile to allow compute nodes to

Improvements: 

- General improvements to execution speed of Flight tools
- General security & stability improvements

Known Issues: 

- Azure: Kubernetes container DNS network does not resolve
- Flight Hunter: Interactive parse textbox can scroll up the terminal window in sessions with few columns (low width)


## 2023.5
<div class="grid cards" markdown>
- :material-calendar: 24/08/2023 
- [:material-file-document: Documentation](https://openflighthpc.org/2023.5/docs/) 
- [:material-download: Images](https://repo.openflighthpc.org/?prefix=images/FlightSolo/2023.5/)
</div>

New Features:

- Added support for accepting comma-separated list of nodes in 'hunter remove-node'.
- Added apply restrictions/queues to profile.
- Added support for OpenStack to silo.
- Added support to trigger 'remove' command on head-node when a child node shuts down.
- Added support for timeout/retry service to hunter's 'send' command.


Improvements:

- Various stability and performance improvements in Profile, Silo and Console API.

## 2023.4
<div class="grid cards" markdown>
- :material-calendar: 28/06/2023
- [:material-file-document: Documentation](https://openflighthpc.org/2023.4/docs/) 
- [:material-download: Images](https://repo.openflighthpc.org/?prefix=images/FlightSolo/2023.4/)
</div>

New Features:

- Added support for square bracket expansion in Flight Profile action commands.
- Flight Profile Configure can now accurately guess what the answers should be.
- Added new supported way to watch profile application progress.
- Silo has a new file type called 'software', with specific commands.
- Silo can now create and delete files and silos.
- Default node hostnames are now more similar and simpler.
- Choosing a cluster type now locks you into that type. Also added a new command to reset the cluster type.
- Flight Profile can now accept configure options from json data.
- Added new user data to pass configure data and automatically apply identities.

Improvements:

- Increased stability between EL7 and EL8 nodes.
- Improvements to environments stability.
- Improved and updated openflighthpc documentation.
- General stability and process improvements across Flight Solo.

