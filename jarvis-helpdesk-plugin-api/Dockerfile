FROM node:23.3.0

WORKDIR /jarvis-helpdesk-plugin-api

# copy các file về dependencies
COPY package.json yarn.lock ./
# cài đặt dependencies (node_modules)
RUN yarn install
# copy tất cả các file trong thư mục hiện tại vào thư mục làm việc
COPY . .
# chạy lệnh migration để tạo bảng trong database và chạy server
CMD ["sh", "-c", "yarn migration:run:dev && yarn start:dev"]
