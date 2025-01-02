# Sử dụng Node.js phiên bản ổn định
FROM node:23.3.0

# Đặt thư mục làm việc
WORKDIR /jarvis-helpdesk-plugin-api

# Copy các file về dependencies
COPY package.json yarn.lock ./

# Cài đặt dependencies (chỉ cài cho production để giảm kích thước image)
RUN yarn install

# Copy toàn bộ mã nguồn vào container
COPY . .

# Build ứng dụng NestJS từ TypeScript thành JavaScript
RUN yarn build

# Chạy lệnh migration và start server trong chế độ production
CMD ["sh", "-c", "yarn migration:run:prod && yarn start:prod"]
