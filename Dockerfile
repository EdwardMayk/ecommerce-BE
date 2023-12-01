FROM node:16 as build

# Path: /app
WORKDIR /app

# Path: /app/package.json
COPY package*.json .

# Path: /app
RUN npm install

# Path: /app
COPY . .

# Path: /app
RUN npm run build



FROM node:16
WORKDIR /app
COPY package*.json .
RUN npm install --only=production
COPY --from=build /app/dist ./dist
CMD npm run start:prod
