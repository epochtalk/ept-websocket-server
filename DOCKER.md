#Running with Docker

##Setup

Do everything in the [README](./README.md)

Edit the `.env` file with the correct parameters (probably just edit the
`WEBSOCKET_HOST` variable to bind to the correct address).

##Running

Build the docker container.

`docker build -t [container_name] .`

Run the docker container as a daemon.

`docker run -d -P --name [name] [container_name]`
