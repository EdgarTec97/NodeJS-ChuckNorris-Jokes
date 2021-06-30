You must have docker and docker-compose installed on your computer

from the root of the project execute the following commands in order

docker-compose up -d

docker exec -it mongodb bash

mongo -u root -p root

db.getSiblingDB ('challenge'). createUser ({user: 'root', pwd: 'root', roles: [{role: 'readWrite', db: 'challenge'}]});

wait 5-10 seconds

that's for user creation, after that you can already quit the bash and use the API