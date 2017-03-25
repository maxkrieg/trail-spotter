# trail spotter

Trail documentation app with Google maps integration

React + Redux client with Flask API and PostgreSQL database.

### Development
The following will create a virtual env, install javascript and python dependencies, boot up postgresql, initialize the database tables, and start the front end and back end servers for development.
```shell
1) git clone https://github.com/maxkrieg/trail-spotter.git
2) cd trail-spotter
3) npm install  # OR yarn install
4) virtualenv venv
5) source venv/bin/activate
6) pip install -r requirements.txt
7) cp .env.example .env
8) createdb trailspotterdb
8) pg_ctl -D /usr/local/var/postgres -l /usr/local/var/postgres/server.log start
9) python server/initdb.py
10) npm start  # start webpack server for development
11) npm run server  # start gunicorn backend server
```

To build client-side production package with webpack:
```shell
npm run dist
```

Deploying to heroku
```
https://heroku.com/deploy?template=https://github.com/maxkrieg/wedding-app
```
