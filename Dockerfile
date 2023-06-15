FROM ubuntu:22.04

WORKDIR /app

COPY "./server.exe/" "./"
COPY "./dist/" "./dist/"

EXPOSE 5000

ENTRYPOINT "./server.exe"
