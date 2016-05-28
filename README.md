Epochtalk Websocket Server
=======================

Socket server for epochtalk notifications.

Configuration
-------------

```bash
cp example.env .env
```

### EpochTalk

```bash
WEBSOCKET_HOST    # specify the host to listen on
WEBSOCKET_PORT    # specify the port to expose
WEBSOCKET_API_KEY # used to validate the Epochtalk server
PRIVATE_KEY       # to reflect that of the Epochtalk server.
                  # used for JWT token authentication.
```

### Postgres

```bash
DATABASE_URL # the URL for the postgres instance
```

### Redis

```bash
REDIS_HOST # the redis host to connect to
REDIS_PORT # the redis port to connect to
REDIS_DB   # the number of the redis db
```

### SSL

```bash
WEBSOCKET_PROTOCOL  # http or https
WEBSOCKET_KEY_NAME  # corresponds to the file name of the key
WEBSOCKET_CERT_NAME # corresponds to the file name of the cert
WEBSOCKET_PASS      # the passphrase for the ssl private key
```

### Engine

You can specify [uws](https://www.npmjs.com/package/uws) as the engine

```bash
WEBSOCKET_ENGINE # ws (default) or uws
```



Running
-------

```
npm install

npm run serve
```
