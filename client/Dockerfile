FROM node:20-alpine as build


# Set environment variables during the build process
ENV VITE_Cloudinary=$VITE_Cloudinary
ENV VITE_SERVER=$VITE_SERVER
ENV VITE_GOOGLE_CLIENT_ID=$VITE_GOOGLE_CLIENT_ID

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


EXPOSE 4173

CMD ["npm", "run", "preview"]
