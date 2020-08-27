FROM node:12-alpine
WORKDIR /tic-tac-toe
ENV PATH /tic-tac-toe/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm install
RUN npm install react-scripts -g
COPY . ./
CMD ["npm", "start"]