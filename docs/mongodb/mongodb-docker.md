# run
docker run --name mymongo -d -p 27017:27017 mongo:latest

# Check if the container is running:
docker ps

# Connect to the MongoDB container:
docker exec -it mymongo mongosh

# Verify connection from the host machine:
mongosh mongodb://localhost:27017