# Simple Servlet App

This is a minimal Java Servlet project built with Maven.

## Structure

- `src/main/java`: Java source code
- `src/main/webapp`: static web resources and deployment descriptor

## Build

```bash
mvn clean package
```

The packaged WAR file will be generated in `target/ROOT.war`.

## Run

Deploy the WAR file to a Jakarta Servlet compatible container such as Tomcat 10.1+.

After deployment, open:

- `/`
- `/hello`

## Debug In VS Code

You can debug this project directly in VS Code without installing an external Tomcat server.

1. Open the Run and Debug view.
2. Select `Debug Servlet App`.
3. Press `F5`.
4. Open `http://localhost:8080/hello`.

Set breakpoints in `src/main/java/com/example/web/HelloServlet.java` and the debugger will stop on incoming requests."# nwbase" 
