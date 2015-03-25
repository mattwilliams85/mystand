# myStand

API Doc available [here](https://mystand.herokuapp.com/apidoc)

## Setting up Development environment

Install boot2docker, follow the instuctions here:

https://docs.docker.com/installation/mac/

Install fig, follow the instuctions here:

http://www.fig.sh/install.html

Start boot2docker:
```bash
boot2docker init
boot2docker up
```

Build a Docker image with fig:
```bash
fig build
```

Create .env and .env.test out of .env.example, make changes if necessary

Install back-end dependencies(listed in package.json):
```bash
fig run web npm install
```

Install front-end dependencies(listed in bower.json):
```bash
fig run web bower install --allow-root
```

Run migrations
```bash
fig run web npm run db-migrate up
```

Start application:
```bash
fig up
```

App will be accessible on port 3000 with an ip that you can get by running this command:
```bash
boot2docker ip
```

Install dependencies(when package.json gets changed):
```bash
fig run web npm install
```

## Database and Migrations

Access postgres console:
```bash
fig run db psql -h db -U postgres postgres
```

Reset database:
```bash
fig run db psql -h db -U postgres postgres -c "drop schema public cascade;create schema public"
```

Run migrations [more info](https://www.npmjs.com/package/db-migrate):
```bash
fig run web npm run db-migrate up
```

## Testing

Run All tests
```bash
fig run web grunt test
```

Run a test matching name regex
```bash
fig run web grunt test --grep uniqueness
```

## API Doc

Regenerate API Doc:
```bash
./node_modules/apidoc/bin/apidoc -i api/controllers/ -o assets/apidoc -t apidoc/apidoctemplate
```

## Deploying and Managing Heroku App

### Reset database
```bash
heroku pg:reset DATABASE_URL --confirm mystand-staging
```

### Access heroku pg console
```bash
heroku pg:psql --app mystand-staging
```


#### Things to know:

To use sass and compass heroku will need a ruby and sass installed. Because heroku detects package.json and assumes it is a NodeJS App it doesn't install Ruby, so the heroku multipack is required, and to properly deploy heroku env var and .buildpacks file are necessary:
```bash
cat .buildpacks
https://github.com/heroku/heroku-buildpack-nodejs.git
https://github.com/heroku/heroku-buildpack-ruby.git
```

```bash
heroku config:add BUILDPACK_URL=https://github.com/ddollar/heroku-buildpack-multi.git
```
