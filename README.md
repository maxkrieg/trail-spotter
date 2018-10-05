# trail spotter

Trail documentation app with Google maps integration

React + Redux client with Flask API and PostgreSQL database.

### Development
The following will create a virtual env, install javascript and python dependencies, boot up postgresql, initialize the database tables, and start the front end and back end servers for development.
```shell
git clone https://github.com/maxkrieg/trail-spotter.git
cd trail-spotter
npm install  # OR yarn install
virtualenv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
pg_ctl -D /usr/local/var/postgres -l /usr/local/var/postgres/server.log start
createdb trailspotterdb
python server/initdb.py
npm start  # start webpack server for development
npm run server  # start gunicorn backend server
```

To build client-side production package with webpack:
```shell
npm run dist
```

Deploying to heroku
```
https://heroku.com/deploy?template=https://github.com/maxkrieg/wedding-app
```
