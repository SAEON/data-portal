<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Documentation Diagrams](#documentation-diagrams)
- [Mermaid](#mermaid)
  - [TODO](#todo)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Documentation Diagrams
A number of diagrams are provided with the aim of full coverage over the architecture, deployment, and use-cases of this source code. Diagrams are in reference to the [4 + 1 architectural view model](https://en.wikipedia.org/wiki/4%2B1_architectural_view_model).

Digrams are generated using the [Mermaid](https://mermaid-js.github.io/mermaid/#/) diagraming tools.

# Mermaid
Diagrams are generated using the [CLI](https://github.com/mermaidjs/mermaid.cli) via Docker.

```sh
docker pull minlag/mermaid-cli:latest
```

## TODO
The physical view can largely be produced automatically. To do this, read the source code and call mermaid cli with and input stream instead of a file input. Container image versions can be obtained from config. Containers themselves can be obtained from `docker-compose.yml`


Look at width problem
https://github.com/mermaid-js/mermaid/issues/204