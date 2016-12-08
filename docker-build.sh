docker build -t epochtalk-websocket .
docker tag epochtalk-websocket:latest 137987671913.dkr.ecr.us-west-2.amazonaws.com/epochtalk-websocket:latest
$(aws ecr get-login)
docker push 137987671913.dkr.ecr.us-west-2.amazonaws.com/epochtalk-websocket:latest
