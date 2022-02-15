# Running in local
Run via Docker command, Self hosted in Visual studio 2022 <br />

To start via Docker, run follwing command in root <br />
```
docker build . --tag shipmgmt
docker run --env ASPNETCORE_ENVIRONMENT=Development -d -p 5050:80 shipmgmt:latest 
```
App URL : http://localhost:5050
Swagger Docker URL : http://localhost:5050/swagger/index.html   

