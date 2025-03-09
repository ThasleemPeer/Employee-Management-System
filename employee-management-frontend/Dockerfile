FROM node:20

WORKDIR /employee-management-frontend

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm","run","dev"]
