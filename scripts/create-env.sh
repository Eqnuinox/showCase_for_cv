#!/bin/bash
echo "creating ../.env file"
echo "NODE_ENV=development" >> ../.env
echo "DB_USERNAME=root" >> ../.env
echo "DB_PASSWORD=root" >> ../.env
echo "DB_DATABASE=dev_db_startup" >> ../.env
echo "DB_DRIVER=mysql" >> ../.env
echo "DB_HOST=localhost" >> ../.env
echo "DB_PORT=8889" >> ../.env
echo "PORT=8080" >> ../.env
echo "API_VERSION=v1" >> ../.env
