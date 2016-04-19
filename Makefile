CONTAINER_NAME = authjs

build:
		docker build -t $(CONTAINER_NAME) .

runc:
		-docker rm -f $(CONTAINER_NAME)
		-docker kill $(CONTAINER_NAME)
		docker run --name $(CONTAINER_NAME) -d $(CONTAINER_NAME)

shell:
		-docker rm -f $(CONTAINER_NAME)
		-docker kill $(CONTAINER_NAME)
		docker run -ti --name $(CONTAINER_NAME) $(CONTAINER_NAME) /bin/bash

runc:
		-docker rm -f $(CONTAINER_NAME)
		-docker kill $(CONTAINER_NAME)
		docker run --name $(CONTAINER_NAME) -d $(CONTAINER_NAME)
