# Running in local
Run via Docker command, Self hosted in Visual studio 2022 <br />

To start via Docker, run follwing command in root folder <br />
```
docker build . --tag shipmgmt
docker run --env ASPNETCORE_ENVIRONMENT=Development -d -p 5050:80 shipmgmt:latest 
```
App URL : http://localhost:5050
Swagger Docker URL : http://localhost:5050/swagger/index.html   

Screenshot

![name-of-you-image](https://github.com/pandurd/shipmanagement/blob/2f9a72c64022b0fda745ca048ef34745d3d3d60c/Screenshot.png)

