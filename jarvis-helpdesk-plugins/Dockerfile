# Stage 1: build ứng dụng
FROM node:23.3.0 AS build-stage

WORKDIR /jarvis-helpdesk-plugins

# Copy các file để cài dependencies
COPY package.json yarn.lock ./
COPY apps/admin/package.json ./apps/admin/
COPY packages ./packages
# Cài đặt các package cần thiết
RUN yarn install



# Copy tất cả file qua bên máy ảo
COPY . .

# # Build ứng dụng
RUN yarn workspace @jarvis-helpdesk-plugins/admin build

# Stage 2: chạy ứng dụng bằng nginx
FROM nginx:latest
# Copy file build từ stage 1 qua stage 2
COPY --from=build-stage /jarvis-helpdesk-plugins/apps/admin/dist /usr/share/nginx/html
# Copy file cấu hình nginx
COPY  nginx.conf /etc/nginx/nginx.conf
# Chạy nginx khi container được khởi động
CMD ["nginx", "-g", "daemon off;"]
