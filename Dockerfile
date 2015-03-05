FROM dockerfile/nodejs
ADD . /code
WORKDIR /code
RUN npm -g install sails
RUN npm install
CMD sails lift
