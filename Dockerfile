FROM dockerfile/nodejs

# Install ruby(for sass)
RUN apt-get update && apt-get install -y ruby ruby-dev ruby-bundler
RUN gem install sass -v=3.4.13


### Selenium Setup
# Install Java
# RUN apt-get install default-jre
# RUN apt-get install -y openjdk-7-jre

# RUN apt-get install unzip
# RUN wget -N http://chromedriver.storage.googleapis.com/2.15/chromedriver_linux64.zip -P /tmp
# RUN unzip /tmp/chromedriver_linux64.zip -d /tmp
# RUN chmod +x /tmp/chromedriver
# RUN mv -f /tmp/chromedriver /usr/local/share/chromedriver
# RUN ln -s /usr/local/share/chromedriver /usr/local/bin/chromedriver
# RUN ln -s /usr/local/share/chromedriver /usr/bin/chromedriver
###


RUN cd / && npm install -g bower grunt-cli protractor

### Install npm packages with: 'fig run web npm install',
### because volumes do not persist data - https://docs.docker.com/userguide/dockervolumes/

WORKDIR /code
ADD . /code

CMD npm run dev
