package com.example;

import java.io.File;
import org.apache.catalina.Context;
import org.apache.catalina.startup.Tomcat;
import com.example.web.HelloServlet;

// 應用程式入口：啟動嵌入式 Tomcat，並掛載 HelloServlet。
public class App {

    // 讀取埠號與 webapp 路徑，建立並啟動伺服器。
    public static void main(String[] args) throws Exception {
        // 預設使用 8080，可透過 server.port 系統參數覆蓋。
        int port = Integer.parseInt(System.getProperty("server.port", "8080"));
        // 指向本專案的前端資源目錄。
        String webappPath = new File("src/main/webapp").getAbsolutePath();

        // 建立 Tomcat，並先初始化 connector。
        Tomcat tomcat = new Tomcat();
        tomcat.setPort(port);
        tomcat.getConnector();

        // 將 webapp 掛到根路徑，並手動註冊 HelloServlet。
        Context context = tomcat.addWebapp("", webappPath);
        Tomcat.addServlet(context, "helloServlet", new HelloServlet());
        // 將前端呼叫的 /hello 對應到 helloServlet。
        context.addServletMappingDecoded("/hello", "helloServlet");

        System.out.println("Server started: http://localhost:" + port + "/hello");

        // 啟動伺服器並等待請求。
        tomcat.start();
        tomcat.getServer().await();
    }
}