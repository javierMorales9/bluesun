FROM ubuntu:rolling
WORKDIR /app

COPY package.json index.js ./

RUN apt-get -y update
RUN apt-get -y upgrade
RUN apt-get install -y ffmpeg

ENV NODE_VERSION=20.13.1
RUN apt install -y curl
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"
RUN node --version
RUN npm --version
RUN npm init -y
RUN npm install

VOLUME /public

CMD ["node", "index.js"]
