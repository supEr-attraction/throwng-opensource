FROM openjdk:11-jre-slim

ARG JAR_FILE=./build/libs/*.jar
ARG PROFILE
ENV PROFILE=${PROFILE}
ENV TZ=Asia/Seoul
ENV eureka.client.serviceUrl.defaultZone=http://back-discovery:8761/eureka

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY ${JAR_FILE} app.jar

ENTRYPOINT ["java", "-javaagent:/pinpoint/pinpoint-bootstrap-2.2.2.jar", "-Dpinpoint.agentId=quizAgent","-Dpinpoint.applicationName=throwng","-Dpinpoint.config=/pinpoint/pinpoint-root.config","-Dspring.profiles.active=${PROFILE}","-jar", "/app.jar"]