FROM openjdk:11-jre-slim

ARG JAR_FILE=./build/libs/*.jar
ENV TZ=Asia/Seoul

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY ${JAR_FILE} app.jar

EXPOSE 8761
ENTRYPOINT ["java", "-jar", "/app.jar"]