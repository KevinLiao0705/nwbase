# 外部 Tomcat 部署指南

## 專案特性
- 本專案已設定為 `war` 套件。
- 使用 `jakarta.servlet`，因此外部 Tomcat 必須是 **Tomcat 10.1+**。
- 啟動入口 `App.java` 是嵌入式 Tomcat 用途；部署到外部 Tomcat 時不需要執行它。

## 先決條件
1. 安裝 JDK 12。
2. 安裝 Tomcat 10.1 或更新版本。
3. 確認 `JAVA_HOME` 與 `CATALINA_HOME` 已正確設定。

## 建置 WAR
在專案根目錄執行：

```bash
mvn clean package
```

成功後會產生：

- `target/ROOT.war`

## 部署到外部 Tomcat
1. 停止 Tomcat（如果正在執行）。
2. 將 `target/ROOT.war` 複製到 Tomcat 的 `webapps` 目錄。
3. 重新啟動 Tomcat。
4. Tomcat 會自動解壓並部署成 ROOT 應用。

## 訪問網址
- 主頁：`http://localhost:8080/`
- Servlet 測試：`http://localhost:8080/hello`
- 若你曾測試過舊路徑，`/helloServlet` 也有在 `HelloServlet` 上做相容映射，但外部部署時建議以 `/hello` 為主。

## 首頁說明
`web.xml` 目前的預設歡迎頁已設定為：
- `root.html`
- `index.jsp`

因此部署後進站會先進 `root.html`。

## 常見問題
### 1. 404 Not Found
- 檢查 Tomcat 是否已成功部署 `ROOT.war`。
- 確認使用的網址是 `/hello` 而不是舊的嵌入式路徑。
- 確認 Tomcat 版本是 10.1+。

### 2. 500 伺服器錯誤
- 檢查 Tomcat `logs` 目錄中的錯誤訊息。
- 確認 `json`、`log4j`、`sqlite-jdbc` 等依賴已包含在 WAR 內。

### 3. JSP 編譯錯誤
- 確認 `index.jsp` 沒有重複的 `contentType` directive。
- 確認 JSP 中引用的 `GB`、`Root` 已正確匯入 `com.example` 套件。

## 補充
如果你想把這個 WAR 部署成非 ROOT 應用，請把 `ROOT.war` 改名成你想要的檔名，例如：

- `myapp.war`

則訪問路徑會變成：

- `http://localhost:8080/myapp/`
