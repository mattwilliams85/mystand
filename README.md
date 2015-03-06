# myStand

a [Sails](http://sailsjs.org) application

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
fig build && fig run web npm install
```

Start application:

```bash
fig up
```

App will be accessible on port 3000 with an ip that you can get by running this command:

```bash
boot2docker ip
```

Run test suite:

```bash
fig run web npm test
```

Install dependencies(when package.json gets changed):
```bash
fig run web npm install
```

Access postgres console:

```bash
fig run db psql -h db -U postgres
```


## Deploying
