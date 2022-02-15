FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build

# Setup NodeJs for react
RUN apt-get update && \
    apt-get install -y wget && \
    apt-get install -y gnupg2 && \
    wget -qO- https://deb.nodesource.com/setup_16.x | bash - && \
    apt-get install -y build-essential nodejs
# End setup

WORKDIR /src
COPY ["ShipManagement/ShipManagement.csproj", "ShipManagement/"]
RUN dotnet restore "ShipManagement/ShipManagement.csproj"
COPY . .
WORKDIR "/src/ShipManagement"
RUN dotnet build "ShipManagement.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ShipManagement.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ShipManagement.dll"]