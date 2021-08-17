FROM openjdk:8
EXPOSE 8080
ADD target/home-assignment.jar home-assignment.jar 
ENTRYPOINT ["java","-jar","/home-assignment.jar"]