FROM tomcat:9-jre11

# Remove the default Tomcat webapp
RUN rm -rf /usr/local/tomcat/webapps/*

# Copy your WAR file into the Tomcat webapps directory
COPY target/todo-backend.war /usr/local/tomcat/webapps/todo-backend.war

EXPOSE 8080