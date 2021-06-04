# Set the base image.
FROM mhart/alpine-node:14.16.1

# Create and define the application's working directory.
RUN mkdir /app
WORKDIR /app

# Install the application's dependencies into the node_modules directory.
COPY package.json ./

RUN apk --no-cache add --virtual native-deps git g++ gcc libgcc libstdc++ linux-headers make python3
RUN npm config set python /usr/bin/python3
RUN npm install node-gyp
RUN npm install
RUN npm rebuild bcrypt --build-from-source
RUN npm cache clean --force
RUN apk del native-deps

# add app
COPY . ./

# start app
CMD ["npm", "start"]