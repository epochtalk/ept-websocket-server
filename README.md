Epochtalk Socket Server
=======================

Socket server for epochtalk notifications.

Configuration
-------------

`cp example.env .env`

Edit `.env`:

* `DATABASE_URL` is the URL for the postgres instance.

* `PRIVATE_KEY` to reflect that of the Epochtalk server.

  * This is used for JWT token authentication.

* Provide a `WEBSOCKET_API_KEY` to validate the Epochtalk server.

Running
-------

```
npm install

npm run serve
```
