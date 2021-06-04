# Set the base image.
FROM mhart/alpine-node:14.16.1

# Create and define the application's working directory.
RUN mkdir /app
WORKDIR /app

# Install the application's dependencies into the node_modules directory.
COPY package.json ./
RUN npm install

# add app
COPY . ./

# start app
CMD ["npm", "start"]