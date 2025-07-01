FROM node:18 
WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install
RUN npm install -g ts-node-dev
CMD ["npm", "run", "start:dev"]
EXPOSE 4002 