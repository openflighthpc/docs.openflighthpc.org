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
- Ensure correct default branch being used by mike
  ```bash
  mike set-default latest
  ```
- Run development server
  ```bash
  mike serve
  ```

## Writing Docs

It's worth familiarising with the [available markdown formatting](https://www.mkdocs.org/user-guide/writing-your-docs/#writing-with-markdown) supported by mkdocs. This documentation has the following plugins installed:


## Deploying Docs

Using `mike` we can deploy documentation with version tagging... Maybe?

- Deploy WIP data to `staging` 
```
mike deploy --push --update-aliases 20XX.Y staging
```

- Deploy a new stable version of documentation
```
mike deploy --push --update-aliases 20XX.Y latest
```

## Content Things to Look Into

- Code Annotations (adds pop-ups with notes on commands/info) 
