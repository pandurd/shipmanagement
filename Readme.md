# Running in local
Run via Docker config, Self hosted in Visual studio 2022 <br />

To start via Docker, run follwing command in root <br />
Azure SQL db is connected via hardcoded connection string (should be a secret injected via env variable) <br />

```
docker build . --tag shipmgmt
docker run -d -p 5050:80 shipmgmt:latest
```

Swagger Docker URL : http://localhost:5050/swagger/index.html   

![name-of-you-image](https://github.com/pandurd/DecisionAdventure/raw/master/DemoScreenshots/Swagger.jpg)
