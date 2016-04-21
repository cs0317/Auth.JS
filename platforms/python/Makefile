post:
		curl -X POST http://localhost:5000/ -d {"message":"Hello Data"}'
run_local:
		python3 index.py

build:
		docker build -t authjs-python .

shell:
		docker run -ti authjs-python /bin/bash

run_container:
		docker run -d -p 80:80 authjs-python
