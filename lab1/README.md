# Lab 1: IFC

[Report](./Report.md)

# To run the code, firstly mount the direcory in the docker container:
```bash
docker run -it --entrypoint=/bin/bash -v "${PWD}:/work/" ghcr.io/troupelang/troupe
```

Here we mount it on `/work/` 

The makefile contains both the server and client commands (Alice and Bob), as well as the malicious clients (mal and malliam). It's defaulted to our own trustmap.
To use the KTH trustmap, change the server trustmap in the makefile to `../trustmaps/GoT.json` and uncomment line 103 in the server, which calls the dispatch server.

To run both the server and the clients at the same time, we ran new docker containers simultaneously, one for each code instance.