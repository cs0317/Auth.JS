CONTAINER_NAME = authjs
CONTAINER_FULLNAME = pmcao/authjs

build:
		docker build -t $(CONTAINER_FULLNAME) .

runc:
		-docker rm -f $(CONTAINER_NAME)
		-docker kill $(CONTAINER_NAME)
		# docker run -p 3000:3000 --name $(CONTAINER_NAME) --link authjs-php:authjs-platform -d $(CONTAINER_FULLNAME)
		docker run -p 80:80 --name $(CONTAINER_NAME) -d $(CONTAINER_FULLNAME)

shell:
		-docker rm -f $(CONTAINER_NAME)
		-docker kill $(CONTAINER_NAME)
		docker run -p 3000:3000 -p 80:80 -ti --name $(CONTAINER_NAME) $(CONTAINER_FULLNAME) /bin/bash
