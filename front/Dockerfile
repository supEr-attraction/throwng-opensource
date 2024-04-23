# 1단계: 빌드 단계
FROM node:latest as build

# 작업 디렉토리 설정
WORKDIR /app

# 의존성 설치
COPY package*.json ./
RUN npm install --force

# 앱 소스 코드 복사
COPY . .

# # 앱 빌드
# RUN npm run build

# # 2단계: 실행 단계
# FROM nginx:alpine

# # Nginx 구성 파일 복사
# COPY --from=build /app/dist /usr/share/nginx/html

# 포트 노출
EXPOSE 5173

# 컨테이너 시작 시 실행할 명령
CMD ["npm", "run", "dev"]
