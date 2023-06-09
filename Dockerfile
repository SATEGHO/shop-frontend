FROM node:17 as builder

WORKDIR /app
COPY package.json package-lock.json ./

COPY . .

RUN npm install && npm run build

FROM nginx:alpine
# Set working directory to nginx asset directory
COPY nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=builder /app/dist .
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]

