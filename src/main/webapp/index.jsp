<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@page import="java.util.HashMap"%>
<%@page import="java.io.FileReader"%>
<%@page import="java.io.BufferedReader"%>
<%@page import="java.io.FileInputStream"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.Enumeration"%>
<%@page import="com.example.GB"%>
<%@page import="com.example.Root"%>

    <%

        String strPath;
        String webRootPath = application.getRealPath("/").replace('\\', '/');
        String str = "";
        
        Enumeration<String> headerNames = request.getHeaderNames();
        HashMap<String, String> requestPara = new HashMap<>();
        while (headerNames.hasMoreElements()) {
            String paraName = (String) headerNames.nextElement();
            String paraValue = request.getHeader(paraName);
            requestPara.put(paraName, paraValue);
        }
        GB.requestPara = requestPara;
        GB.webRootPath = webRootPath;
        new Root(requestPara, webRootPath);

        //=================================
        String file = webRootPath + "root.html";
        //String file = webRootPath + "index.html";
        StringBuilder stringBuilder = new StringBuilder();
        
        try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
            String line = null;
            String ls = System.getProperty("line.separator");
            while ((line = reader.readLine()) != null) {
                stringBuilder.append(line);
                stringBuilder.append(ls);
            }
        }
        
        if (stringBuilder.length() > 0) {
            stringBuilder.deleteCharAt(stringBuilder.length() - 1);
        }
        
        String content = stringBuilder.toString();
        out.println(content);
        //=================================
%>     

