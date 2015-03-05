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
fig build
```

Start an app:

```bash
fig up
```

App will be accessible on port 3000 with an ip that you can get by running this command:

```bash
boot2docker ip
```

To run any command on the VM image (for example 'npm test'):

```bash
fig run web npm test
```

Access postgres console:

```bash
fig run db psql -h db -U postgres
```


## Deploying
