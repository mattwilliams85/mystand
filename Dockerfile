FROM dockerfile/nodejs

### Install npm packages with: 'fig run web npm install',
### because volumes do not persist data - https://docs.docker.com/userguide/dockervolumes/

# Example on how to install npm packages here:
# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
# ADD package.json /tmp/package.json
# RUN cd /tmp && npm install
# RUN mkdir -p /code && cp -a /tmp/node_modules /code/

WORKDIR /code
ADD . /code

CMD npm run dev
