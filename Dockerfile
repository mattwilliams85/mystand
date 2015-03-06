FROM dockerfile/nodejs

# Install ruby(for sass)
RUN apt-get update && apt-get install -y ruby ruby-dev ruby-bundler
RUN gem install sass -v=3.4.13

RUN cd / && npm install -g bower

### Install npm packages with: 'fig run web npm install',
### because volumes do not persist data - https://docs.docker.com/userguide/dockervolumes/

WORKDIR /code
ADD . /code

CMD npm run dev
