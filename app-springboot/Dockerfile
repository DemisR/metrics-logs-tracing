FROM maven:3.6.3-jdk-11 AS build  
COPY src /usr/src/app/src  
COPY pom.xml /usr/src/app  
RUN mvn -f /usr/src/app/pom.xml clean package

FROM adoptopenjdk:11-jre-hotspot
RUN mkdir /usr/app
COPY --from=build /usr/src/app/target/app-springboot-1.0.0.jar /usr/app/app-springboot-1.0.0.jar  
EXPOSE 8080  
ENTRYPOINT ["java","-jar","/usr/app/app-springboot-1.0.0.jar"]  
