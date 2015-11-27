<% if(!coreclr){ %>FROM microsoft/aspnet:1.0.0-rc1-final<% } %><% if(coreclr){ %>FROM microsoft/aspnet:1.0.0-rc1-final-coreclr<% } %>

COPY . /app
WORKDIR /app
RUN ["dnu", "restore"]

EXPOSE 5000/tcp
ENTRYPOINT ["dnx", "-p", "project.json", "web"]
