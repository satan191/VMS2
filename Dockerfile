# 构建阶段
FROM node:18-alpine as build-stage

# 设置工作目录
WORKDIR /app

# 复制依赖文件
COPY package*.json ./

# 安装依赖
# 如果国内构建慢，可以考虑设置淘宝镜像，但 Zeabur 海外构建通常很快，这里保持默认
RUN npm install

# 复制项目源代码
COPY . .

# 执行构建
RUN npm run build

# 生产运行阶段
FROM nginx:alpine as production-stage

# 复制构建产物到 Nginx 目录
COPY --from=build-stage /app/dist /usr/share/nginx/html

# 复制自定义 Nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露 8080 端口
EXPOSE 8080

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]
