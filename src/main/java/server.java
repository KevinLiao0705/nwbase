import java.io.*;
import java.net.*;
import java.nio.file.*;
import java.sql.*;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.Date;
import java.util.jar.JarEntry;
import java.util.jar.JarFile;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;
import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import com.sun.net.httpserver.*;

//==============================================================================
// server 主伺服器類別 (必須在最前面以供 java server.java 執行)
//==============================================================================
public class server {
    private static final KvJson kj = new KvJson();

    private static File prepareRuntimeDirectory() throws Exception {
        File codeSource = new File(server.class.getProtectionDomain().getCodeSource().getLocation().toURI());
        File runtimeDir = codeSource.isFile() ? codeSource.getParentFile() : new File(System.getProperty("user.dir"));
        File webRoot = new File(runtimeDir, "src/main/webapp");
        if (codeSource.isFile()) {
            try (JarFile jar = new JarFile(codeSource)) {
                Enumeration<JarEntry> entries = jar.entries();
                while (entries.hasMoreElements()) {
                    JarEntry entry = entries.nextElement();
                    if (!entry.getName().startsWith("app-resources/src/")) continue;
                    String relativeName = entry.getName().substring("app-resources/".length());
                    File target = new File(runtimeDir, relativeName);
                    if (entry.isDirectory()) {
                        target.mkdirs();
                    } else {
                        File parent = target.getParentFile();
                        if (parent != null) parent.mkdirs();
                        try (InputStream input = jar.getInputStream(entry)) {
                            Files.copy(input, target.toPath(), StandardCopyOption.REPLACE_EXISTING);
                        }
                    }
                }
            }
        }
        if (!webRoot.isDirectory()) {
            throw new FileNotFoundException("Web resources not found: " + webRoot.getAbsolutePath());
        }
        return runtimeDir;
    }


    public static void main(String[] args) throws Exception {

        // 2. 啟動伺服器
        int port = 80;
        for (int i = 0; i < args.length; i++) {
            if ("--port".equals(args[i]) && i + 1 < args.length) {
                port = Integer.parseInt(args[i + 1]);
            } else if ("--paraSetPath".equals(args[i]) && i + 1 < args.length) {
                GB.argParaSetPath = args[i + 1];
            }
        }

        File runtimeDir = prepareRuntimeDirectory();
        GB.webRootPath = new File(runtimeDir, "src/main/webapp").getAbsolutePath();
        GB.rootPath = new File(runtimeDir, "src").getAbsolutePath() + File.separator;
        GB.exePath = runtimeDir.getAbsolutePath();

        System.out.println("project path = " + GB.exePath);
        System.out.println("web files path = " + GB.webRootPath);
        System.out.println("argParaSetPath = " + GB.argParaSetPath);
        System.out.println("Starting Java server on port " + port + "...");


        HttpServer serverInstance = HttpServer.create(new InetSocketAddress(port), 0);
        serverInstance.createContext("/", new MyHttpHandler());
        serverInstance.setExecutor(java.util.concurrent.Executors.newCachedThreadPool());

        serverInstance.start();
        Runtime.getRuntime().addShutdownHook(new Thread(() -> serverInstance.stop(0)));
        new java.util.concurrent.CountDownLatch(1).await();
    }

    static class MyHttpHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            String method = exchange.getRequestMethod();
            String path = exchange.getRequestURI().getPath();

            if ("GET".equalsIgnoreCase(method)) {
                doGet(exchange, path);
            } else if ("POST".equalsIgnoreCase(method)) {
                doPost(exchange, path);
            } else {
                exchange.sendResponseHeaders(405, -1);
            }
        }

        private void doGet(HttpExchange exchange, String path) throws IOException {
            if (path.startsWith("/")) {
                path = path.substring(1);
            }
            if (path.isEmpty() || "index.jsp".equals(path)) {
                path = "root.html";
                // 初始化系統
                try {
                    HashMap<String, String> headers = new HashMap<>();
                    for (Map.Entry<String, List<String>> entry : exchange.getRequestHeaders().entrySet()) {
                        headers.put(entry.getKey(), entry.getValue().get(0));
                    }
                    //GB.loaded_f = 0; // 重置加載狀態以確保再次初始化
                    new Root(headers, GB.webRootPath);
                } catch (Exception ex) {
                    System.out.println("Initialization Error in GET: " + ex);
                }
            }

            File file = new File(GB.webRootPath, path);
            if (!file.exists() || file.isDirectory()) {
                sendError(exchange, 404, "File Not Found");
                return;
            }

            String mime = getMimeType(path);
            byte[] bytes = Files.readAllBytes(file.toPath());
            
            exchange.getResponseHeaders().set("Content-Type", mime);
            exchange.sendResponseHeaders(200, bytes.length);
            try (OutputStream os = exchange.getResponseBody()) {
                os.write(bytes);
            }
        }

        private void doPost(HttpExchange exchange, String path) throws IOException {
            if (!path.endsWith("/hello") && !path.endsWith("/HelloServlet") && !path.endsWith("/helloServlet")) {
                sendError(exchange, 404, "Not Found");
                return;
            }

            // 讀取 POST body
            StringBuilder bodyBuilder = new StringBuilder();
            try (BufferedReader reader = new BufferedReader(new InputStreamReader(exchange.getRequestBody(), "UTF-8"))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    bodyBuilder.append(line);
                }
            }

            String postData = bodyBuilder.toString();
            JSONObject webOutJo = new JSONObject();

            try {
                if (postData.startsWith("{")) {
                    JSONObject webInJo = new JSONObject(postData);
                    if ("command".equals(webInJo.getString("type"))) {
                        if (webInJo.has("retOpts")) {
                            webOutJo.put("retOpts", webInJo.get("retOpts"));
                        }
                        anaJo(webInJo, webOutJo);
                    } else {
                        webOutJo.put("act", "none");
                        webOutJo.put("type", "response");
                        webOutJo.put("status", "error");
                        webOutJo.put("message", "Command Format Error !!!");
                    }
                } else {
                    webOutJo.put("act", "none");
                    webOutJo.put("type", "response");
                    webOutJo.put("status", "error");
                    webOutJo.put("message", "Command Format Error !!!");
                }
            } catch (Exception ex) {
                webOutJo.put("act", "none");
                webOutJo.put("type", "response");
                webOutJo.put("status", "error");
                webOutJo.put("message", ex.getMessage());
                ex.printStackTrace();
            }

            byte[] responseBytes = webOutJo.toString().getBytes("UTF-8");
            exchange.getResponseHeaders().set("Content-Type", "application/json;charset=utf-8");
            exchange.sendResponseHeaders(200, responseBytes.length);
            try (OutputStream os = exchange.getResponseBody()) {
                os.write(responseBytes);
            }
        }

        private void sendError(HttpExchange exchange, int code, String msg) throws IOException {
            byte[] bytes = msg.getBytes("UTF-8");
            exchange.sendResponseHeaders(code, bytes.length);
            try (OutputStream os = exchange.getResponseBody()) {
                os.write(bytes);
            }
        }

        private String getMimeType(String filename) {
            String lowercase = filename.toLowerCase();
            if (lowercase.endsWith(".html") || lowercase.endsWith(".htm")) return "text/html; charset=utf-8";
            if (lowercase.endsWith(".js")) return "application/javascript; charset=utf-8";
            if (lowercase.endsWith(".css")) return "text/css; charset=utf-8";
            if (lowercase.endsWith(".png")) return "image/png";
            if (lowercase.endsWith(".jpg") || lowercase.endsWith(".jpeg")) return "image/jpeg";
            if (lowercase.endsWith(".gif")) return "image/gif";
            if (lowercase.endsWith(".json")) return "application/json; charset=utf-8";
            return "application/octet-stream";
        }
    }

    //==========================================================================
    // API 分發與實作
    //==========================================================================
    private static void loadOutJoResponseError(JSONObject inOptsJo, JSONObject outJo, String errStr) {
        String responseType = "response none";
        String rt = inOptsJo.getString("responseType");
        if (rt != null) {
            responseType = rt;
        }
        switch (responseType) {
            case "responseDialogOk":
            case "responseDialogError":
            case "responseDialogErrorMessageOk":
                outJo.put("responseType", "dialogError");
                break;
            case "messageOk":
            case "messageError":
                outJo.put("responseType", "messageError");
                break;
            default:
                outJo.put("responseType", responseType);
                break;
        }
        outJo.put("responseMessage", errStr);
    }

    private static void loadOutJoResponseOk(JSONObject optsJso, JSONObject outJso, String okStr) {
        String responseType = optsJso.getString("responseType");
        if (responseType == null) {
            outJso.put("responseType", "response none");
        } else {
            switch (responseType) {
                case "responseDialogOk":
                    outJso.put("responseType", "dialogOk");
                    break;
                case "responseErrorMessageOk":
                case "messageOk":
                    outJso.put("responseType", "messageOk");
                    break;
                default:
                    outJso.put("responseType", "responseNone");
                    break;
            }
        }
        outJso.put("responseMessage", okStr);
    }

    private static HashMap<String, Object> getParas(String systemName) {
        HashMap<String, Object> paraMap = new HashMap<>();
        String fileName = GB.getParaSetPath(systemName);
        File file = new File(fileName);
        if (file.exists() && !file.isDirectory()) {
            String jsonStr = Lib.readStringFile(fileName);
            if (jsonStr == null) return paraMap;
            try {
                JSONObject jsObj = new JSONObject(jsonStr);
                for (String key : jsObj.keySet()) {
                    paraMap.put(key, jsObj.get(key));
                }
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }
        return paraMap;
    }

    private static HashMap<String, String> getUsreParaMap(String userName) {
        HashMap<String, String> paraMap = new HashMap<>();
        String fileName = GB.webRootPath + "user-" + userName + "/paraSet.json";
        File file = new File(fileName);
        if (file.exists() && !file.isDirectory()) {
            String jsonStr = Lib.readStringFile(fileName);
            if (jsonStr == null) return paraMap;
            try {
                JSONObject jsObj = new JSONObject(jsonStr);
                for (String key : jsObj.keySet()) {
                    Object val = jsObj.get(key);
                    paraMap.put(key, val == null ? "" : val.toString());
                }
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }
        return paraMap;
    }

    private static int getIntFromObject(Object o) {
        if (o instanceof Number) return ((Number) o).intValue();
        return Integer.parseInt(o.toString());
    }

    public static void anaJo(JSONObject inJo, JSONObject outJo) {
        String action;
        JSONObject inOptsJo;
        JSONObject outOptsJo = new JSONObject();
        String outStr;
        String fileName;
        String systemName;
        String userName;
        String password;
        String content;
        String initDir;

        try {
            action = inJo.getString("act");
            inOptsJo = new JSONObject(inJo.getString("opts"));
            
            kj.wStr(outJo, "act", action);
            kj.wStr(outJo, "type", "response");
            kj.wStr(outJo, "status", "error");

            switch (action) {
                case "login":
                    kj.wStr(outJo, "message", "login Error !!!");
                    kj.jobj = inOptsJo;

                    if (kj.rStr("systemName")) return;
                    systemName = kj.valueStr;

                    if (kj.rStr("userName")) return;
                    userName = kj.valueStr;

                    if (kj.rStr("password")) return;
                    password = kj.valueStr;

                    fileName = GB.webRootPath + "user-" + systemName + "/systemSet.json";
                    RetClass retc = Lib.readFileToString(fileName);
                    if (retc.errorF) {
                        kj.wStr(outJo, "message", "Read 'systemSet.json' error !!!");
                        return;
                    }
                    String systemSetContent = retc.valueStr;

                    fileName = GB.webRootPath + "user-" + systemName + "/userSet.json";
                    retc = Lib.readFileToString(fileName);
                    if (retc.errorF) {
                        kj.wStr(outJo, "message", "Read 'userSet.json' error !!!");
                        return;
                    }
                    String userSetContent = retc.valueStr;

                    GB.systemName = systemName;
                    fileName = GB.getParaSetPath(systemName);
                    System.out.println("paraSetPath = " + fileName);
                    //fileName = GB.argParaSetPath + "/paraSet.json";
                    retc = Lib.readFileToString(fileName);
                    if (retc.errorF) {
                        fileName = GB.webRootPath + "user-" + systemName + "/paraSet.json";
                        System.out.println("*** use default paraSetPath = " + fileName);
                        retc = Lib.readFileToString(fileName);
                        if(retc.errorF) {
                            kj.wStr(outJo, "message", "Read 'paraSet' error !!!");
                            return;
                        }
                    }
                    String paraSetContent = retc.valueStr;
                    GB.paraSetMap = getParas(systemName);

                    JSONObject systemSetJo = new JSONObject(systemSetContent);
                    JSONObject paraSetJo = new JSONObject(paraSetContent);
                    JSONObject userSetJo = new JSONObject(userSetContent);

                    ArrayList<String> acounts = new ArrayList<>();
                    Object nameObj = GB.paraSetMap.get("adminName");
                    Object passwordObj = GB.paraSetMap.get("adminPassword");
                    if (nameObj != null && passwordObj != null) {
                        acounts.add(nameObj.toString() + "~0~" + passwordObj.toString());
                    }

                    kj.jobj = systemSetJo;
                    if (!kj.rStrA("systemAcounts")) {
                        acounts.addAll(kj.strAL);
                    }
                    kj.jobj = paraSetJo;
                    if (!kj.rStrA("userAcounts")) {
                        acounts.addAll(kj.strAL);
                    }

                    int pass = 0;
                    int user = 0;
                    for (String acc : acounts) {
                        user = 0;
                        String[] strA = acc.split("~");
                        if (strA.length != 3) continue;
                        if (!strA[0].equals(userName)) continue;
                        user = 1;
                        if (!strA[2].equals(password)) break;
                        pass = 1;
                        break;
                    }

                    if (user == 0 && pass == 0) {
                        kj.wStr(outJo, "message", "Login Error !!!");
                        return;
                    }
                    if (user == 1 && pass == 0) {
                        kj.wStr(outJo, "message", "Password Error !!!");
                        return;
                    }

                    kj.wObj(outOptsJo, "userSet", userSetJo);
                    kj.wStr(outOptsJo, "paraSet", paraSetContent);
                    kj.wObj(outOptsJo, "webIp", GB.nowIp_str);
                    kj.wObj(outJo, "opts", outOptsJo);
                    kj.wStr(outJo, "status", "ok");
                    kj.wStr(outJo, "message", "Login OK.");
                    break;

                case "readFile":
                    kj.wStr(outJo, "message", "login Error !!!");
                    kj.jobj = inOptsJo;
                    if (kj.rStr("fileName")) return;
                    fileName = GB.webRootPath + kj.valueStr;
                    retc = Lib.readFileToString(fileName);
                    if (retc.errorF) {
                        kj.wStr(outJo, "message", "Read '" + fileName + "' error !!!");
                        return;
                    }
                    kj.wStr(outOptsJo, "fileContent", retc.valueStr);
                    kj.wObj(outJo, "opts", outOptsJo);
                    kj.wStr(outJo, "status", "ok");
                    kj.wStr(outJo, "message", "Read File OK.");
                    break;

                case "saveStringToFile":
                    kj.wStr(outJo, "message", "Command Format Error !!!");
                    kj.jobj = inOptsJo;
                    if (kj.rStr("systemName")) return;
                    systemName = kj.valueStr;
                    if (kj.rStr("fileName")) return;
                    fileName = kj.valueStr;
                    if ("paraSet".equals(fileName)) {
                        fileName = GB.getParaSetPath(systemName);
                    }
                    if (kj.rStr("content")) return;
                    content = kj.valueStr;

                    System.out.println("Write String To File: " + fileName);

                    File outfFile = new File(fileName);
                    outfFile.getParentFile().mkdirs();
                    try (BufferedWriter outf = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(outfFile), "UTF-8"))) {
                        outf.write(content);
                    }
                    kj.wObj(outJo, "opts", outOptsJo);
                    kj.wStr(outJo, "status", "ok");
                    kj.wStr(outJo, "message", "Write File OK.");
                    if (fileName.endsWith("paraSet.json")) {
                        GB.paraSetMap = getParas(systemName);
                    }
                    break;

                case "writeImageFile":
                    loadOutJoResponseError(inOptsJo, outJo, "writeImageFile Error !!!");
                    String path = inOptsJo.getString("path");
                    if (path == null) break;
                    String fullPath = GB.webRootPath + path;
                    String valStr = inOptsJo.getString("value");
                    if (valStr == null) break;

                    JSONObject imageJso = new JSONObject(valStr);
                    String imgFileName = imageJso.getString("fileName");
                    if (imgFileName == null) break;

                    String[] strA = imgFileName.split("\\.");
                    String fullImageName = fullPath + "/" + strA[0] + ".png";

                    int imageWidth = getIntFromObject(imageJso.get("width"));
                    int imageHeight = getIntFromObject(imageJso.get("height"));
                    
                    JSONObject imageData = imageJso.getJSONObject("data");
                    int[] rgbaA = new int[imageWidth * imageHeight];
                    int imageDataLen = imageWidth * imageHeight;
                    for (int i = 0; i < imageDataLen; i++) {
                        int btr = getIntFromObject(imageData.get("" + (i * 4 + 0)));
                        int btg = getIntFromObject(imageData.get("" + (i * 4 + 1)));
                        int btb = getIntFromObject(imageData.get("" + (i * 4 + 2)));
                        int bta = getIntFromObject(imageData.get("" + (i * 4 + 3)));
                        rgbaA[i] = (bta << 24) | (btr << 16) | (btg << 8) | btb;
                    }

                    if (!ImageHandle.createBmpFile(rgbaA, imageWidth, imageHeight, fullImageName)) {
                        break;
                    }

                    outJo.put("responseMessage", "Write OK");
                    outJo.put("responseStatus", "ok");
                    outJo.put("status", "ok");
                    outJo.put("opts", outOptsJo);
                    break;

                case "sonprg":
                    loadOutJoResponseError(inOptsJo, outJo, "sonprg Error !!!");
                    break;

                case "zipDir":
                    loadOutJoResponseError(inOptsJo, outJo, "zip file Error !!!");
                    String zDir = inOptsJo.getString("dirName");
                    String zName = inOptsJo.getString("zipName");
                    if (zDir == null || zName == null) break;
                    Lib.zipDir(GB.webRootPath + zDir, GB.webRootPath + zName);
                    outOptsJo.put("value", "{'status':'zip ok'}");
                    outJo.put("responseMessage", "Zip Dir OK");
                    outJo.put("responseStatus", "ok");
                    outJo.put("status", "ok");
                    outJo.put("opts", outOptsJo);
                    break;

                case "copyFile":
                    outJo.put("responseMessage", "Copy File Error!");
                    String fromFile = inOptsJo.getString("fromFileName");
                    String toFile = inOptsJo.getString("toFileName");
                    if (fromFile == null || toFile == null) break;
                    String fullFrom = GB.webRootPath + fromFile;
                    String fullTo = GB.webRootPath + toFile;
                    File fSrc = new File(fullFrom);
                    if (!fSrc.exists()) {
                        outJo.put("responseMessage", "File Source Is Not Exist !!!");
                        break;
                    }
                    String overWrite = inOptsJo.getString("overWrite");
                    if (overWrite == null) {
                        File fDest = new File(fullTo);
                        if (fDest.exists() && !fDest.isDirectory()) {
                            outJo.put("responseMessage", "File Destination Is Exist !!!");
                            break;
                        }
                    }
                    if (Lib.copyFile(fullFrom, fullTo) != 0) {
                        break;
                    }
                    outJo.put("responseMessage", "Copy File OK");
                    outJo.put("responseStatus", "ok");
                    outJo.put("status", "ok");
                    outJo.put("opts", outOptsJo);
                    break;

                case "testServerResponse":
                    outJo.put("responseMessage", "Test Server OK");
                    outJo.put("status", "ok");
                    outJo.put("opts", outOptsJo);
                    break;

                case "readFileNames":
                    outJo.put("responseMessage", "Read File Names Error!");
                    initDir = inOptsJo.getString("initDir");
                    String comp = inOptsJo.getString("compareNames");
                    if (initDir == null || comp == null) return;
                    String[] compareNames = comp.split(",");
                    ArrayList<String> alFileNames = Lib.readFileNames(GB.webRootPath + initDir, compareNames);
                    outStr = Lib.stringListToString(alFileNames);
                    outJo.put("responseMessage", "Read File Names OK");
                    outOptsJo.put("value", outStr);
                    outJo.put("status", "ok");
                    outJo.put("opts", outOptsJo);
                    break;

                case "loadUserParaMap":
                    outJo.put("responseMessage", "loadUserParaMap Error!");
                    userName = inOptsJo.getString("userName");
                    if (userName == null) break;
                    GB.userParaMap = getUsreParaMap(userName);
                    outOptsJo.put("status", "OK");
                    outJo.put("responseMessage", "loadUserParaMap OK");
                    outJo.put("status", "ok");
                    outJo.put("opts", outOptsJo);
                    break;

                case "readFilexxx":
                    outJo.put("responseMessage", "Read File Error!");
                    fileName = inOptsJo.getString("fileName");
                    if (fileName == null) break;
                    String outName = inOptsJo.getString("outName");
                    String fileCont = Lib.readStringFile(GB.webRootPath + fileName);
                    if (fileCont == null) {
                        outJo.put("responseMessage", "Read File \"" + fileName + "\" Error !!!");
                        break;
                    }
                    outOptsJo.put("value", fileCont);
                    if (outName != null) {
                        outOptsJo.put("outName", outName);
                    }
                    outJo.put("responseMessage", "Read File OK!");
                    outJo.put("responseStatus", "ok");
                    outJo.put("status", "ok");
                    outJo.put("opts", outOptsJo);
                    break;

                case "deleteFilesInDir":
                    outJo.put("responseMessage", "Delete File Error !!!");
                    String delDir = inOptsJo.getString("dir");
                    String delFiles = inOptsJo.getString("fileNames");
                    if (delDir == null || delFiles == null) return;
                    JSONArray jaFileNames = new JSONArray(delFiles);
                    String[] fileNames = Lib.toStringArray(jaFileNames);
                    ArrayList<String> fileNameList = new ArrayList<>();

                    for (String fname : fileNames) {
                        File delFile = new File(GB.webRootPath + delDir + "/" + fname);
                        if (delFile.exists() && !delFile.isDirectory()) {
                            delFile.delete();
                            fileNameList.add(fname);
                        }
                    }
                    outStr = Lib.stringListToString(fileNameList);
                    outJo.put("responseMessage", "Delete Files OK.");
                    outOptsJo.put("value", outStr);
                    outJo.put("status", "ok");
                    outJo.put("opts", outOptsJo);
                    break;
            }
        } catch (Exception ex) {
            String msg = ex.toString();
            if (msg.contains("Exception:")) {
                outJo.put("message", msg.split("Exception:")[1]);
            } else {
                outJo.put("message", msg);
            }
            ex.printStackTrace();
        }
    }
}

//==============================================================================
// JSON 核心解析器
//==============================================================================
class MyJson {
    public static Object parse(String json) {
        if (json == null) return null;
        return new Parser(json).parse();
    }

    private static class Parser {
        private final String src;
        private int pos = 0;

        Parser(String src) {
            this.src = src;
        }

        private void skipWhitespace() {
            while (pos < src.length() && Character.isWhitespace(src.charAt(pos))) {
                pos++;
            }
        }

        Object parse() {
            skipWhitespace();
            if (pos >= src.length()) return null;
            char c = src.charAt(pos);
            if (c == '{') return parseObject();
            if (c == '[') return parseArray();
            if (c == '"') return parseString();
            if (c == 't' || c == 'f') return parseBoolean();
            if (c == 'n') return parseNull();
            if (Character.isDigit(c) || c == '-') return parseNumber();
            throw new RuntimeException("Unexpected character: " + c + " at position " + pos);
        }

        private JSONObject parseObject() {
            pos++; // skip '{'
            JSONObject jsonObj = new JSONObject();
            while (true) {
                skipWhitespace();
                if (pos < src.length() && src.charAt(pos) == '}') {
                    pos++;
                    return jsonObj;
                }
                skipWhitespace();
                if (pos >= src.length() || src.charAt(pos) != '"') {
                    throw new RuntimeException("Expected string key at position " + pos);
                }
                String key = parseString();
                skipWhitespace();
                if (pos >= src.length() || src.charAt(pos) != ':') {
                    throw new RuntimeException("Expected ':' at position " + pos);
                }
                pos++; // skip ':'
                Object value = parse();
                jsonObj.put(key, value);
                skipWhitespace();
                if (pos < src.length() && src.charAt(pos) == ',') {
                    pos++;
                } else if (pos < src.length() && src.charAt(pos) == '}') {
                    pos++;
                    return jsonObj;
                } else {
                    throw new RuntimeException("Expected ',' or '}' at position " + pos);
                }
            }
        }

        private JSONArray parseArray() {
            pos++; // skip '['
            JSONArray jsonArr = new JSONArray();
            while (true) {
                skipWhitespace();
                if (pos < src.length() && src.charAt(pos) == ']') {
                    pos++;
                    return jsonArr;
                }
                Object value = parse();
                jsonArr.put(value);
                skipWhitespace();
                if (pos < src.length() && src.charAt(pos) == ',') {
                    pos++;
                } else if (pos < src.length() && src.charAt(pos) == ']') {
                    pos++;
                    return jsonArr;
                } else {
                    throw new RuntimeException("Expected ',' or ']' at position " + pos);
                }
            }
        }

        private String parseString() {
            pos++; // skip '"'
            StringBuilder sb = new StringBuilder();
            while (pos < src.length()) {
                char c = src.charAt(pos);
                if (c == '"') {
                    pos++;
                    return sb.toString();
                }
                if (c == '\\') {
                    pos++;
                    if (pos >= src.length()) throw new RuntimeException("Unterminated escape");
                    char escape = src.charAt(pos);
                    if (escape == '"') sb.append('"');
                    else if (escape == '\\') sb.append('\\');
                    else if (escape == '/') sb.append('/');
                    else if (escape == 'b') sb.append('\b');
                    else if (escape == 'f') sb.append('\f');
                    else if (escape == 'n') sb.append('\n');
                    else if (escape == 'r') sb.append('\r');
                    else if (escape == 't') sb.append('\t');
                    else if (escape == 'u') {
                        if (pos + 4 >= src.length()) throw new RuntimeException("Incomplete unicode escape");
                        String hex = src.substring(pos + 1, pos + 5);
                        sb.append((char) Integer.parseInt(hex, 16));
                        pos += 4;
                    } else sb.append(escape);
                } else {
                    sb.append(c);
                }
                pos++;
            }
            throw new RuntimeException("Unterminated string");
        }

        private Boolean parseBoolean() {
            if (src.startsWith("true", pos)) {
                pos += 4;
                return true;
            }
            if (src.startsWith("false", pos)) {
                pos += 5;
                return false;
            }
            throw new RuntimeException("Expected boolean");
        }

        private Object parseNull() {
            if (src.startsWith("null", pos)) {
                pos += 4;
                return null;
            }
            throw new RuntimeException("Expected null");
        }

        private Object parseNumber() {
            int start = pos;
            if (pos < src.length() && src.charAt(pos) == '-') {
                pos++;
            }
            boolean isDouble = false;
            while (pos < src.length()) {
                char c = src.charAt(pos);
                if (Character.isDigit(c)) {
                    pos++;
                } else if (c == '.' || c == 'e' || c == 'E' || c == '+' || c == '-') {
                    isDouble = true;
                    pos++;
                } else {
                    break;
                }
            }
            String numStr = src.substring(start, pos);
            if (isDouble) {
                return Double.parseDouble(numStr);
            } else {
                try {
                    return Integer.parseInt(numStr);
                } catch (NumberFormatException e) {
                    return Long.parseLong(numStr);
                }
            }
        }
    }

    public static String toJsonString(Object obj) {
        if (obj == null) return "null";
        if (obj instanceof String) {
            return "\"" + escapeString((String) obj) + "\"";
        }
        if (obj instanceof Boolean || obj instanceof Number) {
            return obj.toString();
        }
        if (obj instanceof Map) {
            StringBuilder sb = new StringBuilder("{");
            Map<?, ?> m = (Map<?, ?>) obj;
            boolean first = true;
            for (Map.Entry<?, ?> entry : m.entrySet()) {
                if (!first) sb.append(",");
                first = false;
                sb.append("\"").append(escapeString(entry.getKey().toString())).append("\":");
                sb.append(toJsonString(entry.getValue()));
            }
            sb.append("}");
            return sb.toString();
        }
        if (obj instanceof List) {
            StringBuilder sb = new StringBuilder("[");
            List<?> l = (List<?>) obj;
            boolean first = true;
            for (Object item : l) {
                if (!first) sb.append(",");
                first = false;
                sb.append(toJsonString(item));
            }
            sb.append("]");
            return sb.toString();
        }
        if (obj instanceof JSONObject) {
            return toJsonString(((JSONObject) obj).map);
        }
        if (obj instanceof JSONArray) {
            return toJsonString(((JSONArray) obj).list);
        }
        return "\"" + escapeString(obj.toString()) + "\"";
    }

    private static String escapeString(String s) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);
            if (ch == '"') sb.append("\\\"");
            else if (ch == '\\') sb.append("\\\\");
            else if (ch == '\b') sb.append("\\b");
            else if (ch == '\f') sb.append("\\f");
            else if (ch == '\n') sb.append("\\n");
            else if (ch == '\r') sb.append("\\r");
            else if (ch == '\t') sb.append("\\t");
            else if (ch < ' ') {
                String hex = Integer.toHexString(ch);
                sb.append("\\u0000".substring(0, 6 - hex.length())).append(hex);
            } else {
                sb.append(ch);
            }
        }
        return sb.toString();
    }
}

//==============================================================================
// JSON 物件包裝
//==============================================================================
class JSONObject {
    final Map<String, Object> map;

    public JSONObject() {
        this.map = new LinkedHashMap<>();
    }

    @SuppressWarnings("unchecked")
    public JSONObject(String json) {
        Object parsed = MyJson.parse(json);
        if (parsed instanceof JSONObject) {
            this.map = ((JSONObject) parsed).map;
        } else if (parsed instanceof Map) {
            this.map = (Map<String, Object>) parsed;
        } else {
            this.map = new LinkedHashMap<>();
        }
    }

    public JSONObject(Map<String, Object> map) {
        this.map = map;
    }

    public boolean has(String key) {
        return map.containsKey(key);
    }

    public Object get(String key) {
        if (!map.containsKey(key)) return null;
        return map.get(key);
    }

    public String getString(String key) {
        Object o = get(key);
        return o == null ? null : o.toString();
    }

    public int getInt(String key) {
        Object o = get(key);
        if (o instanceof Number) return ((Number) o).intValue();
        return Integer.parseInt(o.toString());
    }

    @SuppressWarnings("unchecked")
    public JSONObject getJSONObject(String key) {
        Object o = get(key);
        if (o instanceof Map) return new JSONObject((Map<String, Object>) o);
        if (o instanceof JSONObject) return (JSONObject) o;
        return null;
    }

    @SuppressWarnings("unchecked")
    public JSONArray getJSONArray(String key) {
        Object o = get(key);
        if (o instanceof List) return new JSONArray((List<Object>) o);
        if (o instanceof JSONArray) return (JSONArray) o;
        return null;
    }

    public Set<String> keys() {
        return map.keySet();
    }

    public void put(String key, Object val) {
        map.put(key, val);
    }

    public Set<String> keySet() {
        return map.keySet();
    }

    @Override
    public String toString() {
        return MyJson.toJsonString(this.map);
    }
}

class JSONArray {
    final List<Object> list;

    public JSONArray() {
        this.list = new ArrayList<>();
    }

    @SuppressWarnings("unchecked")
    public JSONArray(String json) {
        Object parsed = MyJson.parse(json);
        if (parsed instanceof JSONArray) {
            this.list = ((JSONArray) parsed).list;
        } else if (parsed instanceof List) {
            this.list = (List<Object>) parsed;
        } else {
            this.list = new ArrayList<>();
        }
    }

    public JSONArray(List<Object> list) {
        this.list = list;
    }

    public int length() {
        return list.size();
    }

    public Object get(int index) {
        if (index < 0 || index >= list.size()) return null;
        return list.get(index);
    }

    public String getString(int index) {
        Object o = get(index);
        return o == null ? null : o.toString();
    }

    @SuppressWarnings("unchecked")
    public JSONObject getJSONObject(int index) {
        Object o = get(index);
        if (o instanceof Map) return new JSONObject((Map<String, Object>) o);
        if (o instanceof JSONObject) return (JSONObject) o;
        return null;
    }

    public void put(Object val) {
        list.add(val);
    }

    @Override
    public String toString() {
        return MyJson.toJsonString(this.list);
    }
}

//==============================================================================
// KvJson 封裝
//==============================================================================
class KvJson {
    public String messageStr = "Error";
    public String valueStr = "";
    public JSONObject valueJo;
    public boolean errorF = true;
    public JSONObject jobj;
    public JSONArray jary;
    public ArrayList<String> strAL = new ArrayList<>();

    public boolean rStrA(JSONObject iobj, String key) {
        jobj = iobj;
        return rStrA(key);
    }

    public boolean rStrA(String key) {
        errorF = true;
        try {
            Object obj = jobj.get(key);
            if (obj == null) return errorF;
            this.valueStr = obj.toString();
            jary = new JSONArray(this.valueStr);
            strAL.clear();
            for (int i = 0; i < jary.length(); i++) {
                Object item = jary.get(i);
                strAL.add(item == null ? "" : item.toString());
            }
        } catch (Exception ex) {
            messageStr = "Read Json(key:" + key + ") To String Array Error !!!";
            return errorF;
        }
        errorF = false;
        return errorF;
    }

    public boolean rStr(JSONObject iobj, String key) {
        jobj = iobj;
        return rStr(key);
    }

    public boolean rStr(String key) {
        errorF = true;
        try {
            Object obj = jobj.get(key);
            if (obj == null) return errorF;
            this.valueStr = obj.toString();
        } catch (Exception ex) {
            messageStr = "Read Json(key:" + key + ") To String Error !!!";
            return errorF;
        }
        errorF = false;
        return errorF;
    }

    public boolean rJo(JSONObject iobj, String key) {
        jobj = iobj;
        return rJo(key);
    }

    public boolean rJo(String key) {
        errorF = true;
        try {
            Object obj = jobj.get(key);
            if (obj == null) return errorF;
            this.valueJo = new JSONObject(obj.toString());
        } catch (Exception ex) {
            messageStr = "Read Json(key:" + key + ") To String Error !!!";
            return errorF;
        }
        errorF = false;
        return errorF;
    }

    public boolean wObj(JSONObject jo, String key, Object value) {
        errorF = true;
        try {
            jo.put(key, value);
        } catch (Exception ex) {
            messageStr = "Write Json(key:" + key + ") Error !!!";
            return errorF;
        }
        errorF = false;
        return errorF;
    }

    public boolean wStr(JSONObject jo, String key, String value) {
        errorF = true;
        try {
            jo.put(key, value);
        } catch (Exception ex) {
            messageStr = "Write Json(key:" + key + ") Error !!!";
            return errorF;
        }
        errorF = false;
        return errorF;
    }

    @SuppressWarnings("unchecked")
    public static String objToJson(Object inst) {
        if (inst == null) return "null";
        try {
            if (inst instanceof String) {
                return "\"" + ((String) inst).replace("\n", "\\n") + "\"";
            }
            if (inst instanceof Number || inst instanceof Boolean) {
                return inst.toString();
            }
            if (inst instanceof Map) {
                Map<?, ?> map = (Map<?, ?>) inst;
                StringBuilder sb = new StringBuilder("{");
                int kinx = 0;
                for (Map.Entry<?, ?> entry : map.entrySet()) {
                    if (kinx != 0) sb.append(",");
                    kinx++;
                    sb.append("\"").append(entry.getKey()).append("\": ");
                    sb.append(objToJson(entry.getValue()));
                }
                sb.append("}");
                return sb.toString();
            }
            if (inst instanceof List) {
                List<?> list = (List<?>) inst;
                StringBuilder sb = new StringBuilder("[");
                for (int i = 0; i < list.size(); i++) {
                    if (i != 0) sb.append(",");
                    sb.append(objToJson(list.get(i)));
                }
                sb.append("]");
                return sb.toString();
            }
            // 使用反射處理自訂類別的所有屬性
            java.lang.reflect.Field[] fields = inst.getClass().getDeclaredFields();
            StringBuilder sb = new StringBuilder("{");
            boolean first = true;
            for (java.lang.reflect.Field f : fields) {
                f.setAccessible(true);
                Object val = f.get(inst);
                if (val == null) continue;
                if (!first) sb.append(",");
                first = false;
                sb.append("\"").append(f.getName()).append("\": ");
                sb.append(objToJson(val));
            }
            sb.append("}");
            return sb.toString();
        } catch (Exception e) {
            return "null";
        }
    }
}

//==============================================================================
// RetClass
//==============================================================================
class RetClass {
    public String messageStr = "Error";
    public String valueStr = "";
    public boolean errorF = true;
}

//==============================================================================
// GB 全域參數定義
//==============================================================================
class GB {
    //public static String dummyTargetWinParaSet = "e:/kevin/myCode/webSet/syncSet/paraSet.json";
    public static String dummyTargetWinParaSet = "D:/kevinJosnPcSync/syncSet/paraSet.json";
    public static String dummyTargetLinuxParaSet = "/home/admintx/syncSetExe/paraSet.json";
    public static String josnSipPhoneWinParaSet = "e:/kevin/myCode/webSet/josnSipSet/paraSetSip.json";
    public static String josnSipPhoneLinuxParaSet = "/home/pi/kevin/sipphone/paraSetSip.json";
    public static String josnSipUiWinParaSet = "e:/kevin/myCode/webSet/josnSipSet/paraSetUi.json";
    public static String josnSipUiLinuxParaSet = "/home/pi/kevin/sipui2in1/paraSetUi.json";
    public static String webBuilderWinParaSet = "e:/kevin/myCode/webSet/webBuilderSet/paraSet.json";
    public static String webBuilderLinuxParaSet = "/home/pi/kevin/webBuilderSet/paraSet.json";
    public static String sip6In1UiWinParaSet = "e:/kevin/myCode/webSet/josnSip6In1Set/paraSetUi.json";
    public static String sip6In1UiLinuxParaSet = "/home/pi/kevin/sip6In1Ui/paraSetUi.json";
    public static String flyingEagleWinParaSet = "D:/kevinHomePcSync/flyingEagle/paraSet.json";
    public static String flyingEagleLinuxParaSet = "/home/kevin/flyingEagle/paraSet.json";
    public static String newTft15WinParaSet = "e:/kevin/myCode/webSet/newTft15Set/paraSet.json";
    public static String newTft15LinuxParaSet = "/home/pi/kevin/newTft15/paraSet.json";
    public static String newTft6WinParaSet = "e:/kevin/myCode/webSet/newTft6Set/paraSet.json";
    public static String newTft6LinuxParaSet = "/home/txa29/newA30Pc/paraSet.json";

    public static int min_js_f = 0;
    public static String systemName = "";
    public static String osName = "win";
    public static String interfaces_path = "";
    public static String appName = "webServeletBase";
    public static Map<String, Object> paraSetMap = new HashMap<>();
    
    public static int syssec_f = 0;
    public static int syssec_xor = 0x00;
    public static String nowIp_str = "";
    public static String nowSubmask_str = "";
    public static String nowMac_str = "";
    public static String macStr = "";
    public static String startTime = "";
    public static int loaded_f = 0;

    public static String webSrcPath = "";
    public static String rootPath = "";
    public static String webRootPath = "";
    public static String exePath = "";
    public static HashMap<String, String> requestPara = new HashMap<>();
    public static HashMap<String, String> paraMap = new HashMap<>();
    public static HashMap<String, String> userParaMap = new HashMap<>();
    public static String argParaSetPath = ".";

    public static void init() {
        String osNameProp = System.getProperty("os.name");
        if (osNameProp != null && osNameProp.toLowerCase().contains("win")) {
            GB.osName = "win";
        } else {
            GB.osName = "linux";
        }
    }

    public static String getParaSetPath(String sysName) {
        String os = System.getProperty("os.name");
        boolean isWin = (os != null && os.toLowerCase().contains("win"));
        if (isWin) {
            GB.osName = "win";
            if ("dummyTarget".equals(sysName)) return GB.dummyTargetWinParaSet;
            if ("josnSipPhone".equals(sysName)) return GB.josnSipPhoneWinParaSet;
            if ("josnSipUi".equals(sysName)) return GB.josnSipUiWinParaSet;
            if ("webBuilder".equals(sysName)) return GB.webBuilderWinParaSet;
            if ("sip6In1Ui".equals(sysName)) return GB.sip6In1UiWinParaSet;
            if ("flyingEagle".equals(sysName)) return GB.flyingEagleWinParaSet;
            if ("newTft15".equals(sysName)) return GB.newTft15WinParaSet;
            if ("newTft6".equals(sysName)) return GB.newTft6WinParaSet;
            return "";
        } else {
            GB.osName = "linux";
            if ("dummyTarget".equals(sysName)) return GB.dummyTargetLinuxParaSet;
            if ("josnSipPhone".equals(sysName)) return GB.josnSipPhoneLinuxParaSet;
            if ("josnSipUi".equals(sysName)) return GB.josnSipUiLinuxParaSet;
            if ("webBuilder".equals(sysName)) return GB.webBuilderLinuxParaSet;
            if ("sip6In1Ui".equals(sysName)) return GB.sip6In1UiLinuxParaSet;
            if ("flyingEagle".equals(sysName)) return GB.flyingEagleLinuxParaSet;
            if ("newTft15".equals(sysName)) return GB.newTft15LinuxParaSet;
            if ("newTft6".equals(sysName)) return GB.newTft6LinuxParaSet;
            return "";
        }
    }
}

//==============================================================================
// Lib 輔助函式庫
//==============================================================================
class Lib {
    public static void log(String inf) {
        System.out.println(inf);
    }

    public static String getStrBetween(String inStr, String stStr, String endStr) {
        int sti;
        int stLen;
        if (stStr == null) {
            sti = 0;
            stLen = 0;
        } else {
            sti = inStr.indexOf(stStr);
            if (sti < 0) return null;
            stLen = stStr.length();
        }

        int endi;
        if (endStr == null) {
            endi = inStr.length();
        } else {
            endi = inStr.indexOf(endStr, sti + stLen);
            if (endi < 0) return null;
        }
        return inStr.substring(sti + stLen, endi);
    }

    public static boolean readSetdataFileToPara(String fileFullName, Map<String, String> hmap) {
        try (BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(fileFullName), "UTF-8"))) {
            String line;
            while ((line = br.readLine()) != null) {
                String str = line.trim();
                if (str.isEmpty() || str.charAt(0) == '#') continue;
                String paraN = getStrBetween(str, "[", "]");
                if (paraN == null) continue;
                paraN = paraN.trim();
                String paraV = getStrBetween(str, "<", ">");
                if (paraV == null) continue;
                hmap.put(paraN, paraV);
            }
            return true;
        } catch (Exception ex) {
            return false;
        }
    }

    public static RetClass readFileToString(String fileName) {
        RetClass ret = new RetClass();
        try {
            byte[] bytes = Files.readAllBytes(Paths.get(fileName));
            ret.valueStr = new String(bytes, "UTF-8");
            ret.errorF = false;
        } catch (Exception e) {
            ret.messageStr = e.getMessage();
            ret.errorF = true;
        }
        return ret;
    }

    public static String readStringFile(String fileName) {
        try {
            byte[] bytes = Files.readAllBytes(Paths.get(fileName));
            return new String(bytes, "UTF-8");
        } catch (Exception e) {
            return null;
        }
    }

    public static int copyFile(String sourceName, String destName) {
        try {
            File source = new File(sourceName);
            File dest = new File(destName);
            dest.getParentFile().mkdirs();
            Files.copy(source.toPath(), dest.toPath(), StandardCopyOption.REPLACE_EXISTING);
            return 0;
        } catch (Exception e) {
            log("CopyFileError: " + sourceName + " -> " + destName + " (" + e.getMessage() + ")");
            return 1;
        }
    }

    public static void zipDir(String dirName, String zipName) throws IOException {
        try (ZipOutputStream zipOut = new ZipOutputStream(new FileOutputStream(zipName))) {
            File fileToZip = new File(dirName);
            zipFile(fileToZip, fileToZip.getName(), zipOut);
        }
    }

    private static void zipFile(File fileToZip, String fileName, ZipOutputStream zipOut) throws IOException {
        if (fileToZip.isHidden()) return;
        if (fileToZip.isDirectory()) {
            if (fileName.endsWith("/")) {
                zipOut.putNextEntry(new ZipEntry(fileName));
                zipOut.closeEntry();
            } else {
                zipOut.putNextEntry(new ZipEntry(fileName + "/"));
                zipOut.closeEntry();
            }
            File[] children = fileToZip.listFiles();
            if (children != null) {
                for (File childFile : children) {
                    String zipName = childFile.getName();
                    if (zipName.endsWith(".kvzip") || zipName.endsWith(".kvbin")) {
                        continue;
                    }
                    zipFile(childFile, fileName + "/" + zipName, zipOut);
                }
            }
            return;
        }
        try (FileInputStream fis = new FileInputStream(fileToZip)) {
            ZipEntry zipEntry = new ZipEntry(fileName);
            zipOut.putNextEntry(zipEntry);
            byte[] bytes = new byte[1024];
            int length;
            while ((length = fis.read(bytes)) >= 0) {
                zipOut.write(bytes, 0, length);
            }
        }
    }

    public static int compareString(String orgStr, String cmpStr) {
        int olen = orgStr.length();
        int clen = cmpStr.length();
        int ibuf = cmpStr.indexOf('*');
        if (ibuf == -1) {
            return orgStr.equals(cmpStr) ? 1 : 0;
        }
        if (ibuf == 0) {
            if (clen == 1) return 1;
            if (cmpStr.endsWith("*")) {
                String sbuf = cmpStr.substring(1, clen - 1);
                return orgStr.contains(sbuf) ? 1 : 0;
            }
            String sbuf = cmpStr.substring(1);
            return orgStr.endsWith(sbuf) ? 1 : 0;
        }
        if (ibuf == clen - 1) {
            String sbuf = cmpStr.substring(0, clen - 1);
            return orgStr.startsWith(sbuf) ? 1 : 0;
        }
        String sbuf = cmpStr.substring(0, ibuf);
        String tbuf = cmpStr.substring(ibuf + 1);
        if (!orgStr.startsWith(sbuf) || !orgStr.endsWith(tbuf)) return 0;
        if (sbuf.length() + tbuf.length() > olen) return 0;
        return 1;
    }

    public static ArrayList<String> readFileNames(String initDir, String[] compareNames) {
        ArrayList<String> fileNameList = new ArrayList<>();
        File folder = new File(initDir);
        if (folder.exists() && folder.isDirectory()) {
            File[] listOfFiles = folder.listFiles();
            if (listOfFiles != null) {
                for (File file : listOfFiles) {
                    if (file.isFile()) {
                        String fileName = file.getName();
                        for (String pattern : compareNames) {
                            if (compareString(fileName, pattern.trim()) == 1) {
                                fileNameList.add(fileName);
                                break;
                            }
                        }
                    }
                }
            }
        }
        return fileNameList;
    }

    public static String stringListToString(List<String> list) {
        return String.join(",", list);
    }

    public static String[] toStringArray(JSONArray ja) {
        String[] arr = new String[ja.length()];
        for (int i = 0; i < ja.length(); i++) {
            arr[i] = ja.getString(i);
        }
        return arr;
    }

    public static void dechop(byte[] hop, byte[] enckey) {
        int i, j, ibuf, ibuf1;
        for (i = 0; i < 11; i++) {
            for (j = 0; j < 48; j++) {
                ibuf = 1;
                if ((hop[3] & 0x08) != 0) {
                    ibuf = 0x10;
                }
                if ((hop[2] & 0x01) != 0) {
                    ibuf <<= 2;
                }
                if ((hop[1] & 0x01) != 0) {
                    ibuf <<= 1;
                }
                if ((hop[4] & 0x40) != 0) {
                    ibuf1 = 0x5c;
                    if ((hop[4] & 0x02) != 0) {
                        ibuf1 = 0x3a;
                    }
                } else {
                    ibuf1 = 0x2e;
                    if ((hop[4] & 0x02) != 0) {
                        ibuf1 = 0x74;
                    }
                }
                ibuf = ibuf & ibuf1;
                if (ibuf != 0) {
                    ibuf = 0x80;
                }
                ibuf ^= hop[2];
                ibuf ^= hop[4];
                ibuf ^= enckey[1];
                ibuf = ibuf << 1;
                hop[1] = (byte) (hop[1] << 1);
                hop[2] = (byte) (hop[2] << 1);
                hop[3] = (byte) (hop[3] << 1);
                hop[4] = (byte) (hop[4] << 1);
                if ((ibuf & 0x100) != 0) {
                    hop[1]++;
                }
                if ((hop[1] & 0x100) != 0) {
                    hop[2]++;
                }
                if ((hop[2] & 0x100) != 0) {
                    hop[3]++;
                }
                if ((hop[3] & 0x100) != 0) {
                    hop[4]++;
                }
                enckey[0] <<= 1;
                enckey[1] <<= 1;
                enckey[2] <<= 1;
                enckey[3] <<= 1;
                enckey[4] <<= 1;
                enckey[5] <<= 1;
                enckey[6] <<= 1;
                enckey[7] <<= 1;
                if ((enckey[7] & 0x100) != 0) {
                    enckey[0]++;
                }
                if ((enckey[0] & 0x100) != 0) {
                    enckey[1]++;
                }
                if ((enckey[1] & 0x100) != 0) {
                    enckey[2]++;
                }
                if ((enckey[2] & 0x100) != 0) {
                    enckey[3]++;
                }
                if ((enckey[3] & 0x100) != 0) {
                    enckey[4]++;
                }
                if ((enckey[4] & 0x100) != 0) {
                    enckey[5]++;
                }
                if ((enckey[5] & 0x100) != 0) {
                    enckey[6]++;
                }
                if ((enckey[6] & 0x100) != 0) {
                    enckey[7]++;
                }
            }
        }
    }
}

//==============================================================================
// ImageHandle
//==============================================================================
class ImageHandle {
    public static boolean createBmpFile(int[] pixelData, int width, int height, String fileName) {
        try {
            BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_ARGB);
            image.setRGB(0, 0, width, height, pixelData, 0, width);
            File file = new File(fileName);
            file.getParentFile().mkdirs();
            ImageIO.write(image, "png", file);
            return true;
        } catch (IOException ex) {
            ex.printStackTrace();
        }
        return false;
    }
}

//==============================================================================
// Root 系統核心邏輯
//==============================================================================
class Root {
    public Root(HashMap<String, String> requestPara, String realPath) {
        if (GB.loaded_f != 0) return;
        GB.loaded_f = 1;
        GB.requestPara = requestPara;
        
        String normalizedRealPath = realPath.replace("\\", "/");
        if (!normalizedRealPath.endsWith("/")) {
            normalizedRealPath += "/";
        }
        GB.webRootPath = normalizedRealPath;

        String[] strA = normalizedRealPath.split("/");
        StringBuilder srcPath = new StringBuilder();
        for (int i = 0; i < strA.length - 2; i++) {
            srcPath.append(strA[i]).append("/");
        }
        GB.rootPath = srcPath.toString();
        GB.webSrcPath = GB.rootPath + "web/";
        GB.exePath = System.getProperty("user.dir");

        System.out.println("webRootPath = " + GB.webRootPath);
        System.out.println("exePath = " + GB.exePath);

        File logDir = new File(GB.webRootPath + "log/");
        if (!logDir.exists()) {
            logDir.mkdirs();
        }

        System.out.println("Web Base Program Start");
        GB.init();
        GB.paraMap.clear();
        Lib.readSetdataFileToPara(GB.rootPath + "setdata.xml", GB.paraMap);
        
        Connection con = dbConnect();
        readDatabaseToPara(con);
        netInf(1, con);

        SimpleDateFormat formatter = new SimpleDateFormat("yyyy/dd/MM HH:mm:ss");
        GB.startTime = formatter.format(new Date());
        if (con != null) {
            try { con.close(); } catch (Exception e) {}
        }
    }

    public static Connection dbConnect() {
        try {
            String dbPath = GB.rootPath + "setdata.db";
            File dbFile = new File(dbPath);
            File parentDir = dbFile.getParentFile();
            if (parentDir != null && !parentDir.exists()) {
                parentDir.mkdirs();
            }
            Class.forName("org.sqlite.JDBC");
            Connection newCon = DriverManager.getConnection("jdbc:sqlite:" + dbPath);
            newCon.setAutoCommit(false);
            try (Statement stmt = newCon.createStatement()) {
                stmt.executeUpdate("CREATE TABLE IF NOT EXISTS paraTable (paraName TEXT PRIMARY KEY, paraValue TEXT)");
            }
            newCon.commit();
            return newCon;
        } catch (Exception ex) {
            System.out.println("Connect Database Error !!! " + ex);
        }
        return null;
    }

    public static void readDatabaseToPara(Connection con) {
        if (con == null) return;
        try (Statement stmt = con.createStatement();
             ResultSet rs = stmt.executeQuery("SELECT * FROM paraTable;")) {
            while (rs.next()) {
                GB.paraMap.put(rs.getString("paraName"), rs.getString("paraValue"));
            }
        } catch (Exception ex) {
            System.out.println("readDatabaseToPara !!! " + ex);
        }
    }

    public static boolean editNewDb(Connection con, String name, String value) {
        if (con == null) return false;
        try {
            int line;
            try (PreparedStatement updateStmt = con.prepareStatement("UPDATE paraTable set paraValue = ? where paraName = ?")) {
                updateStmt.setString(1, value);
                updateStmt.setString(2, name);
                line = updateStmt.executeUpdate();
            }
            if (line == 0) {
                try (PreparedStatement insertStmt = con.prepareStatement("INSERT INTO paraTable (paraName, paraValue) VALUES (?, ?)")) {
                    insertStmt.setString(1, name);
                    insertStmt.setString(2, value);
                    insertStmt.executeUpdate();
                }
            }
            con.commit();
            return true;
        } catch (Exception ex) {
            System.out.println("editNewDb Error !!! " + ex);
            return false;
        }
    }

    public String netInf(int ww, Connection con) {
        String str = null;
        String localIp = null;
        try {
            Enumeration<NetworkInterface> e = NetworkInterface.getNetworkInterfaces();
            boolean found = false;
            while (e.hasMoreElements()) {
                NetworkInterface n = e.nextElement();
                Enumeration<InetAddress> ee = n.getInetAddresses();
                while (ee.hasMoreElements()) {
                    InetAddress ia = ee.nextElement();
                    str = ia.getHostAddress();
                    if (str.indexOf("192.168.") >= 0) {
                        localIp = str;
                        found = true;
                        break;
                    }
                }
                if (found) break;
            }
            if (localIp == null) {
                // fallback
                localIp = InetAddress.getLocalHost().getHostAddress();
            }
            GB.nowIp_str = localIp;

            InetAddress ip = InetAddress.getByName(localIp);
            NetworkInterface network = NetworkInterface.getByInetAddress(ip);
            if (network != null && !network.getInterfaceAddresses().isEmpty()) {
                short prflen = network.getInterfaceAddresses().get(0).getNetworkPrefixLength();
                int shft = 0xffffffff << (32 - prflen);
                int oct1 = ((shft & 0xff000000) >> 24) & 0xff;
                int oct2 = ((shft & 0x00ff0000) >> 16) & 0xff;
                int oct3 = ((shft & 0x0000ff00) >> 8) & 0xff;
                int oct4 = shft & 0x000000ff & 0xff;
                GB.nowSubmask_str = oct1 + "." + oct2 + "." + oct3 + "." + oct4;
                
                byte[] mac = network.getHardwareAddress();
                if (mac != null) {
                    StringBuilder sb = new StringBuilder();
                    for (int i = 0; i < mac.length; i++) {
                        if (i != 0) sb.append("-");
                        sb.append(String.format("%02X", mac[i]));
                    }
                    GB.nowMac_str = sb.toString();

                    GB.macStr = "" + (mac[0] & 255);
                    for (int i = 1; i < mac.length; i++) {
                        GB.macStr += "." + (mac[i] & 255);
                    }

                    String syssec = GB.paraMap.get("syssec");
                    str = encSyssec(mac);
                    if (str.equals(syssec)) {
                        GB.syssec_f = 1;
                    } else {
                        if (ww != 0 && con != null) {
                            if (editNewDb(con, "syssec", str)) {
                                GB.paraMap.put("syssec", str);
                            }
                        }
                    }
                } else {
                    GB.syssec_f = 1;
                }
            } else {
                GB.nowSubmask_str = "255.255.255.0";
                GB.syssec_f = 1;
            }
        } catch (Exception ex) {
            System.out.println("NetInf Error !!! " + ex);
        }
        return str;
    }

    public String encSyssec(byte[] mac) {
        byte[] enckey = new byte[8];
        byte[] hop = new byte[8];
        hop[1] = (byte) (mac[0] & 255);
        hop[2] = (byte) (mac[1] & 255);
        hop[3] = (byte) (mac[2] & 255);
        hop[4] = (byte) (mac[3] & 255);
        enckey[0] = (byte) (mac[0] & 255);
        enckey[1] = (byte) (mac[1] & 255);
        enckey[2] = (byte) (mac[2] & 255);
        enckey[3] = (byte) (mac[3] & 255);
        enckey[4] = (byte) (mac[4] & 255);
        enckey[5] = (byte) (mac[5] & 255);
        enckey[6] = (byte) (GB.syssec_xor);
        enckey[7] = (byte) (GB.syssec_xor);
        Lib.dechop(hop, enckey);
        String str = "";
        str += Integer.toString(hop[1] & 255);
        str += Integer.toString(hop[2] & 255);
        str += Integer.toString(hop[3] & 255);
        str += Integer.toString(hop[4] & 255);
        return str;
    }
}
