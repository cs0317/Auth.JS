# FROM node:argon
# RUN mkdir -p /app
# WORKDIR /app
# ADD . /app
# RUN npm install
# EXPOSE 3000
# CMD [ "npm", "start" ]
FROM tutum/lamp
RUN apt-get update && apt-get install -yq git curl
# https://github.com/tutumcloud/lamp
################
# # node stuff #
################
WORKDIR /tmp
RUN apt-get install -yq xz-utils
RUN set -ex \
  && for key in \
    9554F04D7259F04124DE6B476D5A82AC7E37093B \
    94AE36675C464D64BAFA68DD7434390BDBE9B9C5 \
    0034A06D9D9B0064CE8ADF6BF1747F4AD2306D93 \
    FD3A5288F042B6850C66B31F09FE44734EB7990E \
    71DCFD284A79C3B38668286BC97EC7A07EDE3FC1 \
    DD8F2338BAE7501E3DD5AC78C273792F7D83545D \
    B9AE9905FFD7803F25714661B63B535A4C206CA9 \
    C4F0DFFF4E8C1A8236409D08E73BC641CC11F4C8 \
  ; do \
    gpg --keyserver ha.pool.sks-keyservers.net --recv-keys "$key"; \
  done
ENV NPM_CONFIG_LOGLEVEL info
ENV NODE_VERSION 4.4.3
RUN curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.xz" \
  && curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/SHASUMS256.txt.asc" \
  && gpg --batch --decrypt --output SHASUMS256.txt SHASUMS256.txt.asc \
  && grep " node-v$NODE_VERSION-linux-x64.tar.xz\$" SHASUMS256.txt | sha256sum -c - \
  && tar -xJf "node-v$NODE_VERSION-linux-x64.tar.xz" -C /usr/local --strip-components=1 \
  && rm "node-v$NODE_VERSION-linux-x64.tar.xz" SHASUMS256.txt.asc SHASUMS256.txt

####################
# php platform app #
####################
RUN rm -fr /app
WORKDIR /app
ADD ./platforms/php /app
RUN curl -sS https://getcomposer.org/installer | sudo php -- --install-dir=/usr/local/bin --filename=composer
# http://askubuntu.com/posts/165241/revisions
# RUN git clone https://github.com/cs0317/Auth.JS.git /tmp/Auth.JS
# RUN mv /tmp/Auth.JS/platforms/php/* /app
RUN composer self-update
RUN composer require bcosca/fatfree
############
# node app #
############
RUN rm -fr /node_app
WORKDIR /node_app
ADD . /node_app
RUN npm install
# start apache and mysql
ADD supervisord-node.conf /etc/supervisor/conf.d/supervisord-node.conf
EXPOSE 80 3000
CMD ["/run.sh"]
