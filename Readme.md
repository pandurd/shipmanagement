# Running in local
Run via Docker config, Self hosted in Visual studio 2022 <br />

To start via Docker, run follwing command in root <br />
```
docker build . --tag shipmgmt
docker run -d -p 5050:80 shipmgmt:latest
```

App URL  : http://localhost:5050
Swagger Docker URL : http://localhost:5050/swagger/index.html   

