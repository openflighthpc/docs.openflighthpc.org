## Overview

A test of `mkdocs` for hosting the OpenFlight docs

## Setup

- Install mkdocs 
  ```bash
  pip install mkdocs
  ```
- Install mkdocs material theme (provides versioning and extensible features) 
  ```bash
  pip install mkdocs-material
  ```
- Install mike version manager (allows multiple versions of documentation to exist) 
  ```bash
  pip install mike
  ```
- Install includes plugin to support page partials
  ```bash
  pip install mkdocs-macros-plugin
  ```
- Ensure correct default branch being used by mike
  ```bash
  mike set-default latest
  ```

## Viewing Docs

To view your WIP documentation locally simply use `mkdocs serve` which will update as docs are changed. 

To view the versioned documentation (managed by `mike`) run `mike serve` (note: this will not auto-update as docs are changed and requires redeploying).

## Writing Docs

It's worth familiarising with the [available markdown formatting](https://www.mkdocs.org/user-guide/writing-your-docs/#writing-with-markdown) supported by mkdocs. This documentation has the following plugins installed:


## Deploying Docs

Using `mike` we can deploy documentation with version tagging

- Deploy WIP data to `staging` 
```
mike deploy --push --update-aliases 20XX.Y staging
```

- Deploy a new stable version of documentation
```
mike deploy --push --update-aliases 20XX.Y latest
```

- Resetting/removing a version 
```
mike delete --push 20XX.Y
```

## Content Things to Look Into

- Code Annotations (adds pop-ups with notes on commands/info) 
    - See "Code annotations" in material docs
- Rename sections to prettier naming
