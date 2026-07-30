
class Macro {
    constructor() {
    }

    // ---------- 伺服器讀檔輔助 ----------
    // 發送 readFile 指令，並把回傳內容轉成字串陣列。
    /**
     * 從伺服器讀檔，並交由既有 responseAction: toStringArray 處理。
     * @param {string} fileName 伺服器端檔案路徑（相對 web root 或既定規則）。
     * @param {string} outName 前端接收結果要寫入的變數名稱。
     * @returns {void}
     */
    readServerFileToArray(fileName, outName) {
        var opts;
        var obj = {};
        obj["act"] = "readFile";
        obj["type"] = "command";
        var retOpts = obj["retOpts"] = {};
        retOpts["cmdInx"] = sv.cmdInx;
        retOpts["responseType"] = "responseError";
        retOpts["messageTime"] = 1000;//(ms)
        retOpts["callBackFunc"] = "";
        retOpts["responseAction"] = "toStringArray";
        obj["opts"] = {};
        opts = obj["opts"];
        //=================================
        opts["fileName"] = fileName;
        opts["outName"] = outName;
        sv.callServer(JSON.stringify(obj));
    }

    // 發送 readFile 指令，將原始文字交由 callback 處理。
    /**
     * 從伺服器讀檔，並由 server callback 流程處理回傳內容。
     * @param {string} fileName 伺服器端檔案路徑（相對 web root 或既定規則）。
     * @returns {void}
     */
    readServerFile(fileName) {
        var opts;
        var obj = {};
        obj["act"] = "readFile";
        obj["type"] = "command";
        var retOpts = obj["retOpts"] = {};
        retOpts["cmdInx"] = sv.cmdInx;
        retOpts["responseType"] = "responseError";
        retOpts["messageTime"] = 1000;//(ms)
        retOpts["callBackFunc"] = "";
        retOpts["responseAction"] = "exeCallBackFunc";
        obj["opts"] = {};
        opts = obj["opts"];
        //=================================
        opts["fileName"] = fileName;
        sv.callServer(JSON.stringify(obj));
    }

    // 將 gr.logMessage 的新訊息逐筆追加到 editor 區塊。
    messageEditor(md) {
        var st = md.stas;
        if (st.messageCnt === undefined)
            st.messageCnt = gr.logMessage.messages.length;
        for (; ;) {
            if (st.messageCnt >= gr.logMessage.messages.length)
                break;
            var kvObj = md.blockRefs["editor"];
            var mes = gr.logMessage.messages[st.messageCnt];
            var type = "";
            var color = "";
            if (mes.type === "cmd")
                type = "[cmd ]:";
            if (mes.type === "info")
                type = "[info]:";
            if (mes.type === "infoOk") {
                color = "green";
                type = "[info]:";
            }
            if (mes.type === "infoErr") {
                color = "red";
                type = "[info]:";
            }
            var str = "";
            if (type) {
                str += KvLib.getDateTime();
                str += " ";
            }
            str += type + mes.text;
            KvLib.endInputEditor(kvObj, str, color);
            st.messageCnt++;
        }
    }

    // ---------- ParaSet 持久化 ----------
    // 先更新記憶體中的單一 paraSet 欄位，再寫回伺服器檔案。
    /**
     * 更新單一 paraSet 欄位並立即持久化。
     * @param {string} name paraSet 欄位名稱。
     * @param {*} value 欄位值。
     * @returns {void}
     */
    saveParaSet(name, value) {
        if (name) {
            gr.paraSet[name] = value;
        }
        var fileName = "paraSet";
        var content = JSON.stringify(gr.paraSet);
        sv.saveStringToFile("responseDialogError", "null", fileName, content);
    }

    // 將整份 paraSet 寫回伺服器；可自訂回應型態。
    /**
     * 將目前 gr.paraSet 全量寫回伺服器。
     * @param {string=} responseType 回應顯示模式，預設為 responseDialogError。
     * @returns {void}
     */
    saveParaSetAll(responseType) {
        var fileName = "paraSet";
        var content = JSON.stringify(gr.paraSet);
        if (!responseType)
            responseType = "responseDialogError";
        sv.saveStringToFile(responseType, "null", fileName, content);
    }

    // 依 paraSetName 對應，把元件 setOpts 的值回寫到 paraSet。
    saveSetOpts(ksObjss, paraSet) {
        for (var i = 0; i < ksObjss.length; i++) {
            var ksObjs = ksObjss[i];
            for (var j = 0; j < ksObjs.length; j++) {
                var ksObj = ksObjs[j];
                var setOpts = ksObj.opts.setOpts;
                if (setOpts.paraSetName) {
                    if (paraSet[setOpts.paraSetName] !== undefined) {
                        paraSet[setOpts.paraSetName] = setOpts.value;
                    }
                }
            }
        }
    }

    // ---------- 瀏覽器本地檔案輔助 ----------
    // 由既有 URL/檔案路徑觸發瀏覽器下載。
    saveFileToLocal(fileName, outName) {
        let a = document.createElement('a');
        a.href = fileName;
        a.download = outName;
        a.click();
    }

    // 開啟本機檔案選擇器，讀到文字後回傳給 callback。
    /**
     * 讓使用者選擇本機文字檔，讀取後回傳內容。
     * @param {(content: string) => void} actionFunc 讀檔完成後的回呼。
     * @param {string=} accept 檔案類型限制，例如 ".json,.txt"。
     * @returns {void}
     */
    readLocalTextFile(actionFunc, accept) {
        var input = document.createElement('input');
        input.id = "file-uploader";
        input.dataTarget = "file-uploader";
        input.accept = "*.json";
        if (accept)
            input.accept = accept;
        input.type = 'file';
        input.onchange = e => {
            var files = e.target.files;
            var reader = new FileReader();
            reader.readAsText(input.files[0], 'utf8'); // input.files[0]为第一个文件
            reader.onload = () => {
                var content = reader.result;  // reader.result为获取结果
                if (actionFunc)
                    actionFunc(content);
            };
        };
        input.click();
    }

    // 透過 data URL 將字串另存為本機檔案。
    saveStringToLocalFile(fileName, dataStr) {
        let a = document.createElement('a');
        a.href = "data:application/octet-stream," + encodeURIComponent(dataStr);
        a.download = fileName;
        a.click();
    }

    // ---------- 版面配置工具 ----------
    // 建立依列/欄比例切分的 y/x 陣列配置。
    /**
     * 依 row/col 計算比例，填入布局需要的 yArr 與 xyArr。
     * @param {Object} opts 目標設定物件，會被寫入 yArr/xyArr。
     * @param {number} rowCount 列數。
     * @param {number=} col 欄數；未提供時每列使用 [9999]。
     * @returns {void}
     */
    setXyArr(opts, rowCount, col) {
        var yr = (1 / rowCount).toFixed(3);
        opts.yArr = [];
        opts.xyArr = [];
        for (var i = 0; i < rowCount; i++) {
            opts.yArr.push(yr + "rh");
            if (!col)
                opts.xyArr.push([9999]);
            else {
                var xr = (1 / col).toFixed(3);
                var arr = [];
                for (var j = 0; j < col; j++) {
                    arr.push(xr + "rw");
                }
                opts.xyArr.push(arr);
            }
        }
    }

    // 建立共用底部狀態/訊息列，並綁定 watch。
    /**
     * 建立底部訊息列與三個狀態欄位，並綁定全域狀態文字顯示。
     * @param {Object} md 目前頁面/模型物件（需含 lyMaps、opts.blocks、opts.layouts）。
     * @param {string} cname 目標 layout 名稱。
     * @returns {void}
     */
    setFootBar(md, cname) {
        var lyMaps = md.lyMaps;
        var blocks = md.opts.blocks;
        var layouts = md.opts.layouts;
        //======================
        var opts = {};
        opts.xArr = [9999, 100, 120, 120];
        layouts[cname] = { name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts };
        lyMaps["footBar"] = cname;
        //============
        var cname = lyMaps["footBar"] + "~" + 0;
        var opts = {};
        opts.textAlign = "left";
        opts.lpd = 5;
        var watchReg = "gr.footBarMessageText";
        md.setInputWatch(opts, "directReg", watchReg, "innerText", 1);
        var watchReg = "gr.footBarMessageColor";
        md.setInputWatch(opts, "directReg", watchReg, "innerTextColor", 1);
        blocks[cname] = { name: "message", type: "Component~Cp_base~label.sys0", opts: opts };
        //============
        var cname = lyMaps["footBar"] + "~" + 1;
        var opts = {};
        var watchReg = "gr.footBarStatus0";
        md.setInputWatch(opts, "directReg", watchReg, "innerText", 1);
        blocks[cname] = { name: "footBarStatus0", type: "Component~Cp_base~label.sys0", opts: opts };
        //============
        var cname = lyMaps["footBar"] + "~" + 2;
        var opts = {};
        var watchReg = "gr.footBarStatus1";
        md.setInputWatch(opts, "directReg", watchReg, "innerText", 1);
        blocks[cname] = { name: "footBarStatus1", type: "Component~Cp_base~label.sys0", opts: opts };
        //============
        var cname = lyMaps["footBar"] + "~" + 3;
        var opts = {};
        var watchReg = "gr.footBarStatus2";
        md.setInputWatch(opts, "directReg", watchReg, "innerText", 1);
        blocks[cname] = { name: "footBarStatus2", type: "Component~Cp_base~label.sys0", opts: opts };
    }

    // 建立標準標題列，並可附加動作按鈕。
    /**
     * 建立標題列 Layout 與標題/按鈕元件，並掛上按鈕事件。
     * @param {Object} md 目前頁面/模型物件（需含 lyMaps、opts.blocks、opts.layouts）。
     * @param {string} cname 目標 layout 名稱。
     * @param {string} title 標題文字。
     * @param {Function} actionPrg 按鈕共用事件處理函式。
     * @param {Array<string>=} buttons 按鈕清單（例如 ["esc","set","save"]），預設 ["esc"]。
     * @returns {void}
     */
    setHeadTitleBar(md, cname, title, actionPrg, buttons, op) {
        var lyMaps = md.lyMaps;
        var blocks = md.opts.blocks;
        var layouts = md.opts.layouts;
        //======================
        if (!buttons)
            var buttons = ["esc"];
        var opts = {};
        opts.xArr = [0, 9999];
        for (var i = 0; i < buttons.length; i++) {
            opts.xArr.push(100);
        }
        if (op) {
            if (op.headIconWidth)
                opts.xArr[0] = op.headIconWidth;
        }
        opts.xm = 4;
        opts.margin=0;
        layouts[cname] = { name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts };
        lyMaps["headTitleBar"] = cname;

        if (op) {
            if (op.headIconWidth) {
                var cname = lyMaps["headTitleBar"] + "~" + 0;
                var opts = {};
                opts.innerText = "";
                opts.headIconWidth = op.headIconWidth;
                opts.imageUrls = [op.headIconUrl];
                blocks[cname] = { name: "headIcon", type: "Component~Cp_base~plate.none", opts: opts };
            }
        }

        //============
        var cname = lyMaps["headTitleBar"] + "~" + 1;
        var opts = {};
        opts.innerText = title;
        opts.textAlign = "left";
        opts.lpd = 10;
        blocks[cname] = { name: "headTitleBarTitle", type: "Component~Cp_base~label.title", opts: opts };
        //============
        for (var i = 0; i < buttons.length; i++) {
            var cname = lyMaps["headTitleBar"] + "~" + (2 + i);
            var opts = {};
            if (buttons[i] === "esc")
                opts.innerText = "ESC";
            if (buttons[i] === "set")
                opts.innerText = '<i class="gf">&#xe8b8;</i>';
            if (buttons[i] === "save")
                opts.innerText = 'SAVE';
            opts.itemId = buttons[i];
            opts.actionFunc = actionPrg;
            opts.margin=2;
            blocks[cname] = { name: "buttn#" + i, type: "Component~Cp_base~button.sys0", opts: opts };
        }
        //============
    }

    // ---------- 文字中介資料封裝 ----------
    // 建立 UI 工廠 API 使用的文字物件描述。
    /**
     * 建立文字描述物件（含多語系與圖片設定）。
     * @param {string} eng 英文預設文字。
     * @param {string=} id 顯示 ID，未提供時沿用 eng。
     * @param {string=} img 文字對應圖片資源名稱。
     * @param {string=} chnT 中文文字。
     * @returns {Object} textObj 描述物件。
     */
    setKvText(eng, id, img, chnT) {
        var obj = {};
        obj.objName = "textObj";
        obj.type = "text";
        obj.id = eng;
        obj.eng = eng;
        if (id)
            obj.id = id;
        if (chnT)
            obj.chnT = chnT;
        if (img) {
            obj.image = img;
        }
        return obj;
    }

    // 依指定文字型別建立描述物件。
    /**
     * 建立指定 type 的文字描述物件（不帶預設文字內容）。
     * @param {string} type 文字型別。
     * @param {string=} id 顯示 ID。
     * @returns {Object} textObj 描述物件。
     */
    setKvTextType(type, id) {
        var obj = {};
        obj.objName = "textObj";
        obj.type = type;
        obj.id = "";
        obj.eng = "";
        if (id)
            obj.id = id;
        return obj;
    }

    // ---------- 常用頁面巨集 ----------
    // 建立啟動畫面 Logo 頁，並以計時器自動關閉。
    /**
     * 建立啟動畫面頁面模型，顯示 Logo 後在指定時間觸發 action。
     * @param {Object=} _op 覆蓋設定（background/image/width/height/showTime/actionFunc...）。
     * @returns {Object} 可由外部 create() 的 Block 物件。
     */
    showLogo(_op) {
        var op = {};
        op.background = "linear-gradient(to top, #c5d5fa, #c3dc99)";
        op.image = gr.logoImage;
        op.width = gr.logoImageWidth;
        op.height = gr.logoImageHeight;
        op.showTime = 2000;//unit ms
        KvLib.deepCoverObject(op, _op);
        //=====================================================
        var opts = {};
        opts.baseColor = op.baseColor;
        opts.background = op.background;
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            var opts = {};
            opts.buttons = [];
            opts.baseColor = op.baseColor;
            opts.title = "";
            var ksObj = opts.ksObj = {};
            ksObj.name = "logoPanel";
            ksObj.type = "Component~Cp_base~images.sys0";
            var kopts = ksObj.opts = {};
            kopts.backgroundImageUrls = [op.image];
            var logoBox = new Block("logoBox", "Model~MdaBox~base.sys0", opts);
            logoBox.setTimer("logoTime", op.showTime / 16, 1, op.actionFunc);
            var mesObj = mda.popObj(op.width, op.height, logoBox);
        };
        var logoPage = new Block("logoPage", "Model~MdaBase~base.sys0", opts);
        return logoPage;
    }

    // 建立登入對話框巨集，並接上登入 callback 流程。
    /**
     * 建立登入頁 Block 設定，並處理登入成功/失敗流程。
     * @param {Object=} _op 外部覆蓋設定（寬高、背景、預設帳密等）。
     * @returns {Object} 回傳可供 create() 的 Block 物件。
     */
    loginBox(_op) {
        var op = {};
        op.background = "linear-gradient(to top, #c5d5fa, #c3dc99)";
        op.width = 600;
        op.height = 180;
        op.userName = gr.defaultUserName;
        op.password = gr.defaultUserPassword;
        if (!gr.defaultUserName) {
            var cookieObj = KvLib.anaString(document.cookie, ";", "=");
            if (gr.clearCookie_f)
                cookieObj = {};
            if (cookieObj.userName) {
                if (cookieObj.password) {
                    op.userName = cookieObj.userName;
                    op.password = cookieObj.password;
                }
            }
        }
        KvLib.deepCoverObject(op, _op);
        //=====================================================
        var loginPrg = function (userName, password) {
            var loginReturn = function (mes) {
                if (mes.status === "error") {
                    if (gr.defaultUserName) {
                        gr.defaultUserName = "";
                        gr.defaultUserPassword = "";
                        gr.appPageCnt = 1;
                        sys.dispWebPage();
                        return;
                    }
                    var opts = {};
                    opts.kvTexts = [mes.message];
                    opts.actionFunc = function (iobj) {
                        console.log(iobj);
                        gr.appPageCnt = 1;
                        sys.dispWebPage();
                    };
                    box.errorBox(opts);
                }
                if (mes.status === "ok") {
                    us.set = mes.opts.userSet;
                    gr.paraSet = JSON.parse(mes.opts.paraSet);
                    document.cookie = 'userName=' + userName + "; max-age=3600";
                    document.cookie = 'password=' + password + "; max-age=3600";
                    gr.userName = userName;
                    gr.password = password;
                    //gr.systemName=gr.paraSet.systemName;
                    gr.webIp = mes.opts.webIp;
                    gr.appPageCnt = 2;
                    if (gr.paraSet.appId !== undefined) {
                        gr.appId = gr.paraSet.appId;
                    }
                    GlobalRes.initApp(gr);
                    sys.dispWebPage();
                }
                return;
            };
            gr.serverCallBack = loginReturn;
            sv.serverLogin("responseDialogError", "exeCallBackFunc", userName, password);
            return;
        };
        if (gr.defaultUserName) {
            if (gr.defaultUserPassword) {
                loginPrg(gr.defaultUserName, gr.defaultUserPassword);
                return;
            }
        }

        var opts = {};
        opts.baseColor = op.baseColor;
        opts.background = op.background;
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            var opts = {};
            opts.ksObjss = [];
            for (var i = 0; i < 2; i++) {
                var ksObjs = [];
                for (var j = 0; j < 1; j++) {
                    var ksObj = {};
                    ksObj.name = "setLine#" + i + "." + j;
                    ksObj.type = "Model~MdaSetLine~base.sys0";
                    var kopts = ksObj.opts = {};
                    if (i === 0) {
                        kopts.setOpts = KvLib.copyObj(dsc.optsCopy.str, { title: syst.userName });
                        kopts.setOpts.image = "systemResource/icons8-user-40.png";
                        kopts.setOpts.value = op.userName;
                    }
                    if (i === 1) {
                        kopts.setOpts = KvLib.copyObj(dsc.optsCopy.str, { title: syst.password });
                        kopts.setOpts.image = "systemResource/icons8-key-64.png";
                        kopts.setOpts.value = op.password;
                        kopts.setOpts.password_f = 1;
                    }
                    kopts.setOpts.titleWidth = 200;
                    kopts.setOpts.iconWidth = 50;
                    ksObjs.push(ksObj);
                }
                opts.ksObjss.push(ksObjs);
            }
            opts.ksObjWs = [9999];
            opts.title = syst.login;
            opts.w = op.width;
            opts.h = op.height;
            opts.buttons = ["OK"];
            opts.buttonIds = ["ok"];

            opts.eBaseColor = "#ccc";
            opts.actionFunc = function (iobj) {
                console.log(iobj);
                if (iobj.act === "mouseClick") {
                    if (iobj.buttonId === "ok") {
                        var userName = iobj.ksObjss[0][0].opts.setOpts.value;
                        var password = iobj.ksObjss[1][0].opts.setOpts.value;
                        loginPrg(userName, password);
                    }
                }
            };
            box.setLineBox(opts);
        };
        var loginPage = new Block("loginPage", "Model~MdaBase~base.sys0", opts);
        return loginPage;
    }

    setLineContainerSet(setLineContainer, paraSetName, setOpts) {
        var ksObjss = setLineContainer.opts.ksObjss;
        var keys = Object.keys(setLineContainer.blockRefs);
        for (var i = 0; i < keys.length; i++) {
            var strA = keys[i].split("#");
            if (strA[0] !== "setLine")
                continue;
            var setObj = setLineContainer.blockRefs[keys[i]];
            if (setObj.opts.setOpts.paraSetName !== paraSetName)
                continue;
            KvLib.deepCoverObject(setObj.opts.setOpts, setOpts);
            setObj.reCreate();
            return;
        }
    }
    setLineBoxOpts(_op) {
        var op = {};
        op.ksObjss = [];
        for (var i = 0; i < 25; i++) {
            var ksObjs = [];
            for (var j = 0; j < 1; j++) {
                var ksObj = {};
                ksObj.name = "setLine#" + i + "." + j;
                ksObj.type = "Model~MdaSetLine~base.sys0";
                var kopts = ksObj.opts = {};
                var setOpts = kopts.setOpts = {};
                setOpts.setType = "inputText";
                setOpts.value = 56;
                setOpts.titleWidth = 200;
                setOpts.title = "title-" + i;
                setOpts.dataType = "int";
                setOpts.checkType = "int";
                setOpts.actButtons = ["inc", "dec", "pad"];
                setOpts.max = 100;
                setOpts.min = 0;
                ksObjs.push(ksObj);
            }
            op.ksObjss.push(ksObjs);
        }
        op.ksObjWs = [9999];
        op.title = "Test mda.setLineBox";
        op.w = 800;
        op.h = 600;
        op.eh = 40;
        op.xm = 4;
        op.ym = 4;
        op.etm = 8;
        op.ebm = 8;
        op.erm = 4;
        op.elm = 4;
        op.eBorderColor = "#ccc";
        op.eBorderWidth = 0;
        op.eBaseColor = "#222";
        op.headButtons = ["OK", "ESC"];
        op.headButtonIds = ["ok", "esc"];
        KvLib.deepCoverObject(op, _op);
        //=======================================================
        var opts = {};
        opts.title = op.title;
        opts.titleBaseColor = "#004";
        opts.headButtons = op.headButtons;
        opts.headButtonIds = op.headButtonIds;
        opts.buttons = op.buttons;
        opts.margin = 4;
        opts.ym = 4;
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            var preChangeFunc = function () {
                var mainMd = iobj.sender.blockRefs["mainMd"];
                for (var key in mainMd.blockRefs) {
                    var strA = key.split("#");
                    if (strA[0] === "setLine") {
                        var strB = strA[1].split(".");
                        var iInx = KvLib.toInt(strB[0], null);
                        var jInx = KvLib.toInt(strB[1], null);
                        if (iInx === null || jInx === null)
                            continue;
                        var setLine = mainMd.blockRefs[key];
                        var errStrs = setLine.mdClass.checkValue(1);
                        if (errStrs) {
                            box.errorBox({ kvTexts: errStrs });
                            return errStrs;
                        } else {
                            var ksObj = mainMd.opts.ksObjss[iInx][jInx];
                            ksObj.opts.setOpts.value = setLine.opts.setOpts.value;
                            ksObj.opts.setOpts.enum = setLine.opts.setOpts.enum;
                            ksObj.opts.setOpts.checked_f = setLine.opts.setOpts.checked_f;
                        }
                    }
                }
            };
            if (iobj.act === "expand") {
                var mdaBox = iobj.sender;
                var setLineObj = mdaBox.opts.ksObj.opts.ksObjss[iobj.index][0];
                setLineObj.opts.setOpts.value = 1;
                var setOptsObj = {};
                for (var i = 0; i < mdaBox.opts.ksObj.opts.ksObjss.length; i++) {
                    var setLineObj = mdaBox.opts.ksObj.opts.ksObjss[i][0];
                    setOptsObj[setLineObj.opts.setOpts.title] = setLineObj.opts.setOpts;
                }
                iobj.setOptsObj = setOptsObj;
                iobj.rowStart = mdaBox.opts.ksObj.opts.rowStart;
                KvLib.exeFunc(_op.actionFunc, iobj);
                return;
            }
            if (iobj.act === "collaps") {
                var mdaBox = iobj.sender;
                var setLineObj = mdaBox.opts.ksObj.opts.ksObjss[iobj.index][0];
                setLineObj.opts.setOpts.value = 0;
                var setOptsObj = {};
                for (var i = 0; i < mdaBox.opts.ksObj.opts.ksObjss.length; i++) {
                    var setLineObj = mdaBox.opts.ksObj.opts.ksObjss[i][0];
                    setOptsObj[setLineObj.opts.setOpts.title] = setLineObj.opts.setOpts;
                }
                iobj.setOptsObj = setOptsObj;
                iobj.rowStart = mdaBox.opts.ksObj.opts.rowStart;
                KvLib.exeFunc(_op.actionFunc, iobj);
                return;
            }
            if (iobj.act === "actButtonClick") {
                KvLib.exeFunc(_op.actionFunc, iobj);
                return;
            }


            if (iobj.act === "checkPreChange") {
                return preChangeFunc(iobj);
            }

            if (iobj.act === "setLineSave") {
                KvLib.exe(_op.actionFunc, iobj);
            }
            if (iobj.act === "checkChanged") {
                KvLib.exe(_op.actionFunc, iobj);
            }


            if (iobj.act === "mouseClick") {
                if (iobj.kvObj.opts.id === "ok") {
                    var errStr = preChangeFunc(iobj);
                    if (errStr)
                        return;
                    var mainMd = iobj.sender.blockRefs["mainMd"];
                    iobj.ksObjss = mainMd.opts.ksObjss;
                    iobj.buttonId = "ok";
                    KvLib.exeFunc(_op.actionFunc, iobj);
                    MdaPopWin.popOffTo(iobj.sender.opts.popStackCnt);
                    return;
                }
                if (iobj.kvObj.opts.id === "esc") {
                    iobj.buttonId = "esc";
                    KvLib.exeFunc(_op.actionFunc, iobj);
                    MdaPopWin.popOffTo(iobj.sender.opts.popStackCnt);
                    return;
                }
            }
        };
        //==============================================
        var ksObj = opts.ksObj = {};
        var kopts = ksObj.opts = {};
        ksObj.name = "mdaContainer";
        ksObj.type = "Model~MdaContainer~base.page";
        kopts.eh = op.eh;
        kopts.xm = op.xm;
        kopts.ym = op.ym;
        kopts.etm = op.etm;
        kopts.ebm = op.ebm;
        kopts.erm = op.erm;
        kopts.elm = op.elm;
        kopts.borderColor = op.eBorderColor;
        kopts.borderWidth = op.eBorderWidth;
        kopts.baseColor = op.eBaseColor;
        kopts.headTitleHeight = op.headTitleHeight;
        kopts.headTitles = op.headTitles;
        kopts.headTitleXArr = op.headTitleXArr;
        kopts.ksObjss = op.ksObjss;
        kopts.ksObjWs = op.ksObjWs;
        kopts.ksObjWsR = op.ksObjWsR;
        //=================
        return { type: "Model~MdaBox~base.sys0", opts: opts };
    }

    modelBoxOpts(_op, _sonOpts) {
        var opts = {};
        opts.title = "Model Box";
        opts.headButtons = ["ESC"];
        opts.headButtonIds = ["esc"];
        opts.modelType = "Model~MdaSelector~base.sys0";
        KvLib.deepCoverObject(opts, _op);
        var ksObj = opts.ksObj = {};
        var sonOpts = ksObj.opts = {};
        ksObj.name = "ksObj";
        ksObj.type = opts.modelType;
        KvLib.deepCoverObject(sonOpts, _sonOpts);
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            if (iobj.act === "mouseClick") {
                if (iobj.kvObj.opts.id === "esc") {
                    MdaPopWin.popOff(2);
                    return;
                }
            }
            KvLib.exeFunc(_op.actionFunc);
        };
        return { type: "Model~MdaBox~base.sys0", opts: opts };
    }

    blockSelectsBoxOpts(_op) {
        var op = {};
        KvLib.deepCoverObject(op, _op);
        var opts = {};
        opts.title = op.title;
        opts.baseColor = op.baseColor;
        opts.ym = op.ym;
        opts.headButtons = ["ESC"];
        opts.headButtonIds = ["esc"];
        opts.margin = 4;
        //=================
        var ksObj = opts.ksObj = {};
        var kopts = ksObj.opts = {};
        ksObj.name = "mdaContainer";
        ksObj.type = "Model~MdaContainer~base.page";
        kopts.ksObjss = op.ksObjss;
        kopts.ksObjWs = op.ksObjWs;
        kopts.eh = op.eh;
        kopts.xm = op.exm;
        kopts.ym = op.eym;
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            if (iobj.act === "mouseClick") {
                var id = iobj.kvObj.opts.id;
                if (id === "esc") {
                    MdaPopWin.popOff(2);
                    return;
                }
            }
            KvLib.exeFunc(op.actionFunc);
        };
        return { type: "Model~MdaBox~base.sys0", opts: opts };
    }

    setContainerBoxOpts(op1, op2) {
        if (!op1)
            op1 = {};
        if (!op2)
            op2 = {};
        var opts = {};
        opts.title = "Container Box";
        opts.titleColor = "#000";
        opts.headButtons = ["ESC"];
        opts.headButtonIds = ["esc"];
        opts.margin = 0;
        opts.tm = 10;
        opts.lm = 10;
        opts.rm = 10;
        opts.bm = 10;
        opts.innerType = "Model~MdaContainer~base.page";
        KvLib.deepCoverObject(opts, op1);
        var kobj = opts.ksObj = {};
        var kopts = kobj.opts = {};
        kobj.name = "mdaContainer";
        kobj.type = opts.innerType;
        //===================================
        kopts.eh = 50;
        kopts.rowAmt = 0;
        kopts.rowStart = 0;
        kopts.margin = 0;
        kopts.etm = 4;
        kopts.ebm = 4;
        kopts.erm = 4;
        kopts.elm = 4;
        kopts.xm = 4;
        kopts.ym = 4;
        kopts.baseColor = "#ccc";
        kopts.borderColor = "#fff";
        kopts.borderWidth = 1;
        kopts.ksObjss = op2.ksObjss;
        kopts.ksObjWs = op2.ksObjWs;
        KvLib.deepCoverObject(kopts, op2);
        return opts;
    }
    containerBoxOpts(_op) {
        var op = {};
        //===
        op.baseColor = "#cce";
        op.containerType = "Model~MdaContainer~base.page";
        op.title = "Container Box";
        op.titleColor = "#000";
        op.titleBaseColor = "#cce";
        op.rowAmt = 0;
        //===
        op.ksObjWs = [150, 200, 9999];
        op.rowStart = 0;
        //
        op.margin = 4;
        op.ym = 4;
        op.buttonXm = 10;
        op.headButtons = ["ESC"];
        op.headButtonIds = ["esc"];
        //
        op.listBodyColor = "#cce";
        op.listBorderColor = "#fff";
        op.listBorderWidth = 1;
        //===
        op.eh = 50;
        op.eMargin = 0;
        op.etm = 4;
        op.ebm = 4;
        op.erm = 4;
        op.elm = 4;
        op.exm = 4;
        op.eym = 4;
        //===
        KvLib.deepCoverObject(op, _op);
        //=====================================
        var opts = {};
        opts.title = op.title;
        opts.titleColor = op.titleColor;
        opts.headButtons = op.headButtons;
        opts.headButtonIds = op.headButtonIds;
        opts.buttons = op.buttons;
        opts.buttonIds = op.buttonIds;
        opts.baseColor = op.baseColor;
        opts.buttonXm = op.buttonXm;
        mda.setMargin(opts, op);
        opts.ym = op.ym;
        //=================
        var ksObj = opts.ksObj = {};
        var kopts = ksObj.opts = {};
        ksObj.name = "mdaContainer";
        ksObj.type = op.containerType;

        kopts.eh = op.eh;
        kopts.rowAmt = op.rowAmt;
        kopts.margin = op.eMargin;
        kopts.etm = op.etm;
        kopts.ebm = op.ebm;
        kopts.erm = op.erm;
        kopts.elm = op.elm;
        kopts.xm = op.exm;
        kopts.ym = op.eym;
        kopts.baseColor = op.listBodyColor;
        kopts.borderColor = op.listBorderColor;
        kopts.borderWidth = op.listBorderWidth;
        kopts.ksObjss = op.ksObjss;
        kopts.ksObjWs = op.ksObjWs;
        kopts.rowStart = op.rowStart;
        //=================
        opts.actionFunc = function (iobj) {
            if (iobj.act === "mouseClick") {
                MdaPopWin.popOffTo(iobj.sender.opts.popStackCnt);
                KvLib.exeFunc(op.actionFunc, iobj);
            }
        };
        return { type: "Model~MdaBox~base.sys0", opts: opts };
    }

}
var mac = new Macro();

class KvSetOpts {
    constructor() {
    }

    getOptsPara(para) {
        switch (para) {
            case "str":
                return sopt.getOptsStr();
            case "nature":
                return sopt.getOptsNature();
            case "int":
                return sopt.getOptsInt();
            case "float":
                return sopt.getOptsFloat();
            case "strA":
                var opts = sopt.getOptsStr();
                opts.setType = "textArea";
                opts.array = 1;
                return opts;
            case "natureA":
                var opts = sopt.getOptsNature();
                opts.setType = "textArea";
                opts.array = 1;
                opts.actButtons = ["pad"];
                return opts;
            case "intA":
                var opts = sopt.getOptsInt();
                opts.setType = "textArea";
                opts.array = 1;
                return opts;
            case "floatA":
                var opts = sopt.getOptsFloat();
                opts.array = 1;
                opts.setType = "textArea";
                return opts;

            case "natureStr":
                var opts = sopt.getOptsNature();
                opts.dataType = "str";
                opts.checkType = "int";
                opts.actButtons = ["pad"];
                opts.nullErr_f = 0;
                opts.value = "0";
                return opts;

            case "ip":
            case "ipStr":
                var opts = sopt.getOptsFloat();
                opts.dataType = "str";
                opts.checkType = "ip";
                opts.nullErr_f = 0;
                opts.value = "0.0.0.0";
                return opts;

            case "intStr":
                var opts = sopt.getOptsInt();
                opts.dataType = "str";
                opts.nullErr_f = 0;
                opts.actButtons = ["pad"];
                opts.value = "0";
                return opts;

            case "floatStr":
                var opts = sopt.getOptsFloat();
                opts.dataType = "str";
                opts.nullErr_f = 0;
                opts.value = "0";
                return opts;
            case "floatStrA":
                return sopt.getOptsFloatStrA();
            case "intEnum":
                return sopt.getOptsIntEnum();
            case "incEnum":
                return sopt.getOptsIncEnum();
            case "pullEnum":
                return sopt.getOptsPullEnum();
            case "strEnum":
                return sopt.getOptsStrEnum();
            case "select":
                return sopt.getSelect();
            case "buttonRadio":
                return sopt.getOptsButtonRadio();
            case "button":
                return sopt.getOptsButton();
            case "buttonActs":
                return sopt.getOptsButtonActs();
            case "buttonSelect":
                return sopt.getOptsButtonSelect();
            case "buttonOnOffs":
                return sopt.getOptsButtonOnOffs();
            case "labelViews":
                return sopt.getOptsLabelViews();
            case "view":
                return sopt.getOptsView();
            case "intView":
                return sopt.getOptsIntView();
            case "strView":
                return sopt.getOptsStrView();
            case "led":
                return sopt.getOptsLed();
            case "ledView":
                return sopt.getOptsLedView();
            case "leds":
                return sopt.getOptsLeds();
            case "lcdView":
                return sopt.getOptsLcdView();
            default:
                return sopt.getOptsStr();
        }
    }

    getOptsButton(op) {
        var setOpts = {};
        setOpts.setType = "button";
        setOpts.enum = ["button"];
        setOpts.enumId = ["0"];
        setOpts.titleWidth = 0;
        setOpts.fontSize = "0.6rh";
        if (op) {
            KvLib.deepCoverObject(setOpts, op);
        }
        return setOpts;
    }

    getOptsLabelViews(op) {
        var setOpts = {};
        setOpts.setType = "labelViews";
        setOpts.enum = ["label1", "label2", "label3"];
        setOpts.enumColors = ["#eef", "#eef", "#eef"];
        setOpts.xm = 4;
        setOpts.lm = 0;
        setOpts.fontSize = 20;
        setOpts.titleFontSize = 20;
        setOpts.titleWidth = 200;
        setOpts.title = "labelViews";
        if (op) {
            KvLib.deepCoverObject(setOpts, op);
        }
        return setOpts;
    }

    getLabelViews(op) {
        var setOpts = {};
        setOpts.setType = "labelViews";
        setOpts.enum = ["label1", "label2", "label3"];
        setOpts.enumColors = ["#cfc", "#cfc", "#cfc"];
        setOpts.xm = 4;
        setOpts.lm = 0;
        setOpts.fontSize = 20;
        setOpts.titleFontSize = 20;
        setOpts.titleWidth = 200;
        setOpts.title = "labelViews";
        if (op) {
            KvLib.deepCoverObject(setOpts, op);
        }
        return setOpts;
    }

    getLabelView(op) {
        var setOpts = {};
        setOpts.setType = "inputText";
        setOpts.xm = 4;
        setOpts.lm = 0;
        setOpts.fontSize = 20;
        setOpts.titleFontSize = 20;
        setOpts.titleWidth = 200;
        setOpts.title = "labelViews";
        if (op) {
            KvLib.deepCoverObject(setOpts, op);
        }
        return setOpts;
    }

    getEditView(op) {
        var setOpts = {};
        setOpts.setType = "inputText";
        setOpts.dataType = "int";
        setOpts.checkType = "int";
        setOpts.xm = 4;
        setOpts.lm = 0;
        setOpts.fontSize = 20;
        setOpts.titleFontSize = 20;
        setOpts.titleWidth = 200;
        setOpts.title = "labelViews";
        setOpts.actButtons = ["pad"];
        setOpts.value = "";
        setOpts.readOnly_f = 1;
        if (op) {
            KvLib.deepCoverObject(setOpts, op);
        }
        return setOpts;
    }

    getButtonActs(op) {
        var setOpts = {};
        setOpts.setType = "buttonActs";
        setOpts.enum = ["button1", "button2", "button3"];
        setOpts.xm = 4;
        setOpts.lm = 0;
        setOpts.fontSize = 14;
        setOpts.titleFontSize = 20;
        setOpts.titleWidth = 200;
        setOpts.title = "buttonActs";
        if (op) {
            KvLib.deepCoverObject(setOpts, op);
        }
        return setOpts;
    }

    getButtonOnOffs(op) {
        var setOpts = {};
        setOpts.setType = "buttonOnOffs";
        setOpts.value = 5;
        setOpts.onColor = "#ccf";
        setOpts.onTextColor = "#000";
        setOpts.enum = ["button1", "button2", "button3"];
        setOpts.xm = 4;
        setOpts.lm = 0;
        setOpts.titleFontSize = 20;
        setOpts.fontSize = 14;
        setOpts.titleWidth = 200;
        setOpts.title = "buttonOnOffs";
        if (op) {
            KvLib.deepCoverObject(setOpts, op);
        }
        return setOpts;
    }

    getButtonSelect(op) {
        var setOpts = {};
        setOpts.setType = "buttonSelect";
        setOpts.value = 0;
        setOpts.onColor = "#ddf";
        setOpts.offColor = "#aaa";
        setOpts.onTextColor = "#000";
        setOpts.enum = ["button1", "button2", "button3"];
        setOpts.xm = 4;
        setOpts.lm = 0;
        setOpts.fontSize = 20;
        setOpts.titleFontSize = 20;
        setOpts.titleWidth = 200;
        setOpts.title = "buttonSelect";
        if (op) {
            KvLib.deepCoverObject(setOpts, op);
        }
        return setOpts;
    }

    getButtonChecks(op) {
        var setOpts = {};
        setOpts.setType = "buttonChecks";
        setOpts.value = 5;
        setOpts.onColor = "#ccf";
        setOpts.onTextColor = "#000";
        setOpts.enum = ["button1", "button2", "button3"];
        setOpts.xm = 4;
        setOpts.lm = 0;
        setOpts.fontSize = 24;
        setOpts.titleFontSize = 20;
        setOpts.titleWidth = 200;
        setOpts.title = "buttonChecks";
        return setOpts;
    }

    getButtonRadio(op) {
        var setOpts = {};
        setOpts.setType = "buttonRadio";
        setOpts.value = 0;
        setOpts.enum = ["button1", "button2", "button3"];
        setOpts.radioName = "group1";
        setOpts.xm = 4;
        setOpts.lm = 0;
        setOpts.fontSize = 24;
        setOpts.titleFontSize = 25;
        setOpts.titleWidth = 200;
        setOpts.title = "buttonRadio";
        if (op) {
            KvLib.deepCoverObject(setOpts, op);
        }
        return setOpts;
    }
    //=====================================

    getOptsStr(op) {
        var setOpts = {};
        setOpts.setType = "inputText";
        setOpts.dataType = "str";
        setOpts.checkType = "str";
        setOpts.actButtons = ["pad"];
        setOpts.value = "";
        return setOpts;
    }

    getOptsNature() {
        var setOpts = {};
        setOpts.setType = "inputText";
        setOpts.dataType = "int";
        setOpts.checkType = "int";
        setOpts.nullErr_f = 1;
        setOpts.min = 0;
        setOpts.actButtons = ["inc", "dec", "pad"];
        setOpts.value = 0;
        return setOpts;
    }

    getOptsInt() {
        var setOpts = {};
        setOpts.setType = "inputText";
        setOpts.dataType = "int";
        setOpts.checkType = "int";
        setOpts.nullErr_f = 1;
        setOpts.actButtons = ["inc", "dec", "pad"];
        setOpts.value = 0;
        return setOpts;
    }

    getOptsFloat() {
        var setOpts = {};
        setOpts.setType = "inputText";
        setOpts.dataType = "float";
        setOpts.checkType = "float";
        setOpts.nullErr_f = 1;
        setOpts.actButtons = ["pad"];
        setOpts.value = 0;
        return setOpts;
    }

    getOptsFloatStrA() {
        var opts = sopt.getOptsFloatStr();
        opts.array = 1;
        opts.setType = "textArea";
        return opts;
    }

    getOptsStrEnum() {
        var opts = sopt.getOptsStr();
        opts.readOnly_f = 1;
        opts.actButtons = ["pull"];
        opts.enum = ["string1", "string2"];
        return opts;
    }
    getOptsIntEnum() {
        var opts = sopt.getOptsInt();
        opts.readOnly_f = 1;
        opts.actButtons = ["pull"];
        opts.enum = [123, 456];
        return opts;
    }

    getOptsIncEnum() {
        var opts = sopt.getOptsNature();
        opts.setType = "incEnum";
        opts.actButtons = ["inc", "dec"];
        opts.enum = ["xxx", "string2", "string3", "string4", "string5"];
        return opts;
    }

    getOptsPullEnum() {
        var opts = sopt.getOptsNature();
        opts.setType = "pullEnum";
        opts.actButtons = ["pull"];
        opts.enum = ["xxx", "string2", "string3", "string4", "string5"];
        return opts;
    }

    getOptsButtonRadio() {
        var setOpts = {};
        setOpts.setType = "buttonRadio";
        setOpts.value = 0;
        setOpts.enum = ["select1", "select2", "select3"];
        setOpts.radioName = KvLib.genSer();
        setOpts.xm = 4;
        setOpts.lm = 0;
        setOpts.fontSize = 24;
        setOpts.titleWidth = 0;
        return setOpts;
    }

    getOptsButtonActs(op) {
        var setOpts = {};
        setOpts.setType = "buttonActs";
        setOpts.enum = ["button1", "button2", "button3"];
        setOpts.xm = 10;
        setOpts.lm = 0;
        setOpts.fontSize = "0.6rh";
        setOpts.titleFontSize = "0.4rh";
        setOpts.titleWidth = 200;
        setOpts.title = "buttonActs";
        if (op) {
            KvLib.deepCoverObject(setOpts, op);
        }
        return setOpts;
    }

    getOptsButtonSelect(op) {
        var setOpts = {};
        setOpts.setType = "buttonSelect";
        setOpts.enum = ["button1", "button2", "button3"];
        setOpts.onColor = "#fff";
        setOpts.offColor = "#666";
        setOpts.xm = 10;
        setOpts.lm = 0;
        setOpts.fontSize = "0.6rh";
        setOpts.titleFontSize = 20;
        setOpts.titleWidth = 200;
        setOpts.title = "buttonSelect";
        setOpts.value = 0;
        if (op) {
            KvLib.deepCoverObject(setOpts, op);
        }
        return setOpts;
    }

    getOptsButtonOnOffs(op) {
        var setOpts = {};
        setOpts.setType = "buttonOnOffs";
        setOpts.enum = ["button1", "button2", "button3"];
        setOpts.selectColor = "#cfc";
        setOpts.xm = 4;
        setOpts.lm = 0;
        setOpts.fontSize = 14;
        setOpts.titleFontSize = 20;
        setOpts.titleWidth = 200;
        setOpts.title = "buttonSelect";
        setOpts.onColor = "#cfc";
        setOpts.value = 0;
        if (op) {
            KvLib.deepCoverObject(setOpts, op);
        }
        return setOpts;
    }

    //====================================

    getInputSelect(op) {
        var setOpts = {};
        setOpts.setType = "inputSelect";
        setOpts.dataType = "str";
        setOpts.checkType = "str";
        setOpts.value = "select 1";
        setOpts.titleWidth = 200;
        setOpts.title = "inputSelect";
        setOpts.titleFontSize = 20;
        setOpts.actButtons = ["pull", "pad"];
        setOpts.enum = ["select 1", "select 2", "select 3"];
        if (op) {
            KvLib.deepCoverObject(setOpts, op);
        }
        return setOpts;
    }

    getSelect(op) {
        var setOpts = {};
        setOpts.setType = "select";
        setOpts.value = "select 1";
        setOpts.titleWidth = 200;
        setOpts.title = "select";
        setOpts.titleFontSize = 20;
        setOpts.dataType = "str";
        setOpts.actButtons = ["pull"];
        setOpts.enum = ["select 1", "select 2", "select 3"];
        if (op) {
            KvLib.deepCoverObject(setOpts, op);
        }
        return setOpts;
    }

    getIntInputText(op) {
        var setOpts = {};
        setOpts.setType = "inputText";
        setOpts.dataType = "int";
        setOpts.checkType = "int";
        setOpts.value = 0;
        setOpts.titleWidth = 200;
        setOpts.title = "inputText";
        setOpts.titleFontSize = 20;
        setOpts.actButtons = ["inc", "dec", "pad"];
        if (op) {
            KvLib.deepCoverObject(setOpts, op);
        }
        return setOpts;
    }

    getStrInputText(sop) {
        var setOpts = {};
        setOpts.setType = "inputText";
        setOpts.dataType = "str";
        setOpts.checkType = "str";
        setOpts.value = "";
        setOpts.titleWidth = 200;
        setOpts.title = "inputText str";
        setOpts.titleFontSize = 20;
        setOpts.actButtons = ["pad"];
        if (sop) {
            KvLib.deepCoverObject(setOpts, sop);
        }
        return setOpts;
    }

    getInputSimple(sop) {
        var setOpts = {};
        setOpts.setType = "inputText";
        setOpts.dataType = "str";
        setOpts.checkType = "str";
        setOpts.value = "";
        setOpts.titleWidth = 200;
        setOpts.title = "inputText simple";
        setOpts.titleFontSize = 20;
        setOpts.actButtons = ["pad"];
        if (sop) {
            KvLib.deepCoverObject(setOpts, sop);
        }
        return setOpts;
    }

    getIntPassword(op) {
        var setOpts = {};
        setOpts.setType = "inputText";
        setOpts.dataType = "str";
        setOpts.checkType = "int";
        setOpts.value = "";
        setOpts.titleWidth = 400;
        setOpts.title = "inputText password";
        setOpts.titleFontSize = 0;
        setOpts.password_f = 1;
        setOpts.actButtons = ["pad"];
        setOpts.min = 0;
        setOpts.max = 99999999;
        if (op) {
            KvLib.deepCoverObject(setOpts, op);
        }
        return setOpts;
    }

    getInputIntSimple(op) {
        var setOpts = {};
        setOpts.setType = "inputText";
        setOpts.dataType = "int";
        setOpts.checkType = "int";
        setOpts.value = "";
        setOpts.titleWidth = 0;
        setOpts.title = "";
        setOpts.titleFontSize = 20;
        setOpts.actButtons = [];
        if (op) {
            KvLib.deepCoverObject(setOpts, op);
        }
        return setOpts;
    }

    getParaSetOpts(op) {
        var kopts = {};
        if (op.paraSetName) {
            var dscObj = gr.paraSet["dsc~" + op.paraSetName];
            if (dscObj) {
                if (dscObj.getType) {
                    kopts = sopt.getOptsPara(dscObj.getType);
                    kopts.paraSetName = op.paraSetName;
                    KvLib.deepCoverObject(kopts, dscObj);
                    kopts.value = gr.paraSet[op.paraSetName];
                }
            }
        }
        KvLib.deepCoverObject(kopts, op);
        kopts.paraSetName = op.paraSetName;
        return kopts;
    }

    getEditUnit(op) {
        var kopts = {};
        if (op.paraSetName) {
            var dscObj = gr.paraSet["dsc~" + op.paraSetName];
            if (dscObj) {
                if (dscObj.getType) {
                    kopts = sopt.getOptsPara(dscObj.getType);
                    KvLib.deepCoverObject(kopts, dscObj);
                    kopts.value = gr.paraSet[op.paraSetName];
                    kopts.actButtons = [];
                }
            }
        }
        KvLib.deepCoverObject(kopts, op);
        var setOpts = {};
        setOpts.setType = "inputText";
        setOpts.dataType = "int";
        setOpts.checkType = "int";
        setOpts.value = 0;
        setOpts.min = 0;
        setOpts.titleFontSize = 20;
        setOpts.actButtons = [];
        setOpts.unitWidth = 40;
        setOpts.unit = "unit";
        KvLib.deepCoverObject(setOpts, kopts);
        return setOpts;
    }
    getView(op) {
        var setOpts = {};
        setOpts.setType = "inputText";
        setOpts.dataType = "int";
        setOpts.checkType = "int";
        setOpts.value = 0;
        setOpts.min = 0;
        setOpts.titleFontSize = 20;
        setOpts.actButtons = [];
        setOpts.readOnly_f = 1;
        setOpts.editBaseColor = "#eeeeff";
        if (op) {
            KvLib.deepCoverObject(setOpts, op);
        }
        return setOpts;
    }

    getOptsView(op) {
        var setOpts = {};
        setOpts.setType = "inputText";
        setOpts.dataType = "int";
        setOpts.checkType = "int";
        setOpts.value = 0;
        setOpts.min = 0;
        setOpts.titleFontSize = 20;
        setOpts.actButtons = [];
        setOpts.readOnly_f = 1;
        setOpts.editBaseColor = "#eeeeff";
        if (op) {
            KvLib.deepCoverObject(setOpts, op);
        }
        return setOpts;
    }

    getOptsIntView(op) {
        var setOpts = {};
        setOpts.setType = "inputText";
        setOpts.dataType = "int";
        setOpts.checkType = "int";
        setOpts.value = 0;
        setOpts.min = 0;
        setOpts.titleFontSize = 20;
        setOpts.actButtons = [];
        setOpts.readOnly_f = 1;
        setOpts.editBaseColor = "#eeeeff";
        if (op) {
            KvLib.deepCoverObject(setOpts, op);
        }
        return setOpts;
    }

    getOptsLedView(op) {
        var setOpts = {};
        setOpts.setType = "ledView";
        setOpts.dataType = "str";
        setOpts.checkType = "str";
        setOpts.value = "";
        setOpts.titleFontSize = "0.5rh";
        setOpts.actButtons = [];
        setOpts.readOnly_f = 1;
        setOpts.editBaseColor = "#eeeeff";
        if (op) {
            KvLib.deepCoverObject(setOpts, op);
        }
        return setOpts;
    }
    getOptsStrView(op) {
        var setOpts = {};
        setOpts.setType = "inputText";
        setOpts.dataType = "str";
        setOpts.checkType = "str";
        setOpts.value = "";
        setOpts.titleFontSize = "0.5rh";
        setOpts.actButtons = [];
        setOpts.readOnly_f = 1;
        setOpts.editBaseColor = "#e8e8ff";
        if (op) {
            KvLib.deepCoverObject(setOpts, op);
        }
        return setOpts;
    }

    getOptsLcdView(op) {
        var setOpts = {};
        setOpts.setType = "lcdView";
        setOpts.dataType = "str";
        setOpts.checkType = "str";
        setOpts.value = "";
        setOpts.fontSize = "1.0rh";
        setOpts.actButtons = [];
        setOpts.readOnly_f = 1;
        setOpts.editTextColor = "#ddd";
        if (op) {
            KvLib.deepCoverObject(setOpts, op);
        }
        return setOpts;
    }

    getOptsLed(op) {
        var setOpts = {};
        setOpts.setType = "led";
        setOpts.dataType = "nature";
        setOpts.checkType = "nature";
        setOpts.value = 0;
        setOpts.max = 4;
        setOpts.baseColor = "#002";
        setOpts.actButtons = [];
        setOpts.borderWidth = 0;
        setOpts.value = 0;
        if (op) {
            KvLib.deepCoverObject(setOpts, op);
        }
        return setOpts;
    }

    getOptsLeds(op) {
        var setOpts = {};
        setOpts.setType = "leds";
        setOpts.dataType = "natureA";
        setOpts.checkType = "natureA";
        setOpts.enum = ["Led1", "Led2", "Led3"];
        setOpts.value = [0, 1, 2];
        setOpts.max = 4;
        setOpts.baseColor = "#002";
        setOpts.actButtons = [];
        setOpts.borderWidth = 0;
        setOpts.editTextColor = "#fff";
        setOpts.fontSize = "0.5rh";
        if (op) {
            KvLib.deepCoverObject(setOpts, op);
        }
        return setOpts;
    }

    getTextArea(op) {
        var opts = {};
        var setOpts = {};
        setOpts.setType = "textArea";
        setOpts.value = "content.....";
        setOpts.titleWidth = 0;
        setOpts.dataType = "str";
        setOpts.actButtons = [];
        if (op) {
            KvLib.deepCoverObject(setOpts, op);
        }
        return setOpts;
    }

}
var sopt = new KvSetOpts;

class KvBox {
    constructor() {
    }
    /*
     * 
     * @param {kvTexts:<string array>}
     * @returns null
     */
    warnBox(op) {
        var opts = {};
        opts.title = "Warnning";
        opts.titleBaseColor = "#ff0";
        KvLib.deepCoverObject(opts, op);
        this.mesBox(opts);
    }

    /*
     * 
     * @param {kvTexts:<string array>}
     * @returns null
     */
    errorBox(op) {
        var opts = {};
        opts.title = "Error";
        opts.titleBaseColor = "#f88";
        KvLib.deepCoverObject(opts, op);
        this.mesBoxBase(opts);
    }

    /*
     * 
     * @param {kvTexts:<string array>}
     * @returns null
     */
    okBox(op) {
        var opts = {};
        opts.title = "OK";
        opts.titleBaseColor = "#0f0";
        KvLib.deepCoverObject(opts, op);
        this.mesBoxBase(opts);
    }

    /*
     * 
     * @param {kvTexts:<string array>}
     * @returns {act:"mouseClick",kvObj.name:<buttton id>}
     */
    checkBox(_op) {
        var opts = {};
        opts.title = "Warnning";
        opts.titleBaseColor = "#ff0";
        opts.buttons = ["OK", "ESC"];
        opts.buttonIds = ["ok", "esc"];
        KvLib.deepCoverObject(opts, _op);
        this.mesBoxBase(opts);
    }

    /*
     * 
     * @param {kvTexts:<string array>}
     * @returns null
     */
    mesBox(_op) {
        var opts = {};
        KvLib.deepCoverObject(opts, _op);
        this.mesBoxBase(opts);
    }

    /*
     * 
     * @param {kvTexts:<string array>,...} ref inner opts 
     * @returns {act:"mouseClick",kvObj.name:<buttton id>}
     */
    mesBoxBase(_op) {
        if (gr.mesBoxOn_f)
            return;
        var op = {};
        op.kvTexts = ["This is message1", "This is message2", "This is message2", "This is message2"];
        op.title = "Message";
        op.buttons = ["ESC"];
        op.buttonIds = ["esc"];
        op.titleBaseColor = "#444";
        op.titleColor = "#fff";
        op.buttonXm = 100;
        op.w = 800;
        op.h = 220;
        op.bm = 10;
        op.ym = 10;
        op.fontSize = 28;
        KvLib.deepCoverObject(op, _op);
        op.h = 160 + 40 * op.kvTexts.length;
        if (_op.h)
            op.h = _op.h;
        //=====================================
        var opts = {};
        opts.title = op.title;
        opts.titleColor = op.titleColor;
        opts.titleBaseColor = op.titleBaseColor;
        opts.buttons = op.buttons;
        opts.buttonIds = op.buttonIds;
        opts.buttonsOn_f = 1;
        mda.setMargin(opts, op);
        opts.ym = op.ym;
        opts.eh = op.kvTexts.length * 40;
        //=================
        var ksObj = opts.ksObj = {};
        var kopts = ksObj.opts = {};
        kopts.innerText = "";
        for (var i = 0; i < op.kvTexts.length; i++) {
            if (i !== 0)
                kopts.innerText += "<br>";
            kopts.innerText += op.kvTexts[i];
        }
        kopts.fontSize = op.fontSize;
        ksObj.name = "message";
        ksObj.type = "Component~Cp_base~plate.none";
        //=================
        var timer;
        if (op.waitTime) {
            timer = setTimeout(() => {
                MdaPopWin.popOff(2);
                gr.mesBoxOn_f = 0;
            }, op.waitTime);
        }
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            if (iobj.act === "mouseClick") {
                MdaPopWin.popOffTo(iobj.sender.opts.popStackCnt);
                gr.mesBoxOn_f = 0;
                if (timer) clearTimeout(timer);
                KvLib.exeFunc(_op.actionFunc, iobj);
            }
        };
        var kvObj = new Block("mdaBox", "Model~MdaBox~base.sys0", opts);
        var mesObj = mda.popObj(op.w, op.h, kvObj);
        var bobj = kvObj.blockRefs["esc"];
        gr.mesBoxOn_f = 1;
        bobj.elems["base"].focus();


    }

    /*
     * 
     * @param {color:<default color>}
     * @returns {act:"colorSelected",color:<color>}
     */
    pickColorBox(_op) {
        var op = {};
        op.w = 400;
        op.h = 500;
        op.title = "Set Color";
        op.color = "#000";
        KvLib.deepCoverObject(op, _op);
        //=====================================
        var opts = {};
        opts.title = op.title;
        opts.headButtons = ["OK", "ESC"];
        opts.headButtonIds = ["ok", "esc"];
        opts.buttons = [];
        mda.setMargin(opts, op);
        //=================
        var ksObj = opts.ksObj = {};
        var kopts = ksObj.opts = {};
        ksObj.name = "mdaColorPicker";
        ksObj.type = "Model~MdaColorPicker~base.sys0";
        kopts.color = op.color;

        //=================
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            if (iobj.act === "afterCreate") {
                return;
            }
            if (iobj.act === "colorSelected") {
                KvLib.exeFunc(_op.actionFunc, iobj);
            }
            if (iobj.act === "mouseClick") {
                if (iobj.kvObj.opts.id === "ok") {
                    var mdaBox = iobj.sender;
                    var colorPicker = mdaBox.blockRefs["mainMd"];
                    iobj.act = "colorSelected";
                    iobj.color = colorPicker.mdClass.getColor();
                    KvLib.exeFunc(_op.actionFunc, iobj);
                }
            }
            MdaPopWin.popOffTo(iobj.sender.opts.popStackCnt);
        };
        var kvObj = new Block("mdaBox", "Model~MdaBox~base.sys0", opts);
        mda.popObj(op.w, op.h, kvObj);
    }

    selectPageOkBox(op) {
        var opts = {};
        op.selectEsc_f = 0;
        op.selectAble_f = 1;
        op.selectInx = 0;
        op.headButtons = ["OK", "ESC"];
        op.headButtonIds = ["ok", "ESC"];
        KvLib.deepCoverObject(opts, op);
        this.selectPageBox(opts);
    }

    selectOkBox(op) {
        var opts = {};
        opts.selectEsc_f = 0;
        opts.selectAble_f = 1;
        opts.selectInx = 1;
        opts.headButtons = ["OK", "ESC"];
        opts.headButtonIds = ["ok", "esc"];
        opts.buttons = [];
        opts.buttonIds = [];
        opts.buttonOn_f = 0;
        KvLib.deepCoverObject(opts, op);
        this.selectPageBox(opts);

    }

    /*
     * 
     * @param {kvTexts:<stirng array>}
     * @returns {act:"colorSelected",color:<color>}
     */
    selectBox(op) {
        var opts = {};
        opts.headButtons = ["ESC"];
        opts.headButtonIds = ["esc"];
        opts.buttons = [];
        opts.buttonIds = [];
        opts.textAlign = "center";
        opts.lpd = 0;
        opts.buttonOn_f = 0;
        KvLib.deepCoverObject(opts, op);
        this.selectPageBox(opts);

    }

    selectPageBox(_op) {
        var op = {};
        op.kvTexts = [];
        for (var i = 0; i < 100; i++)
            op.kvTexts.push("Select " + i);
        op.xc = 2;
        op.w = 800;
        op.h = 600;
        op.margin = 10;
        op.ym = 10;
        op.eh = 35;
        op.exm = 20;
        op.eym = 5;
        op.baseColor = "#222";
        op.buttonXm = 20;
        op.selectAble_f = 0;
        op.selectInx = -1;
        op.selectEsc_f = 1;
        op.viewPage_f = 0;
        op.title = "Selector";
        op.titleBaseColor = "#004";
        op.textAlign = "center";
        op.lpd = 0;
        op.buttonOn_f = 1;
        op.headButtons = ["ESC"];
        op.headButtonIds = ["esc"];

        KvLib.deepCoverObject(op, _op);
        //=====================================
        var opts = {};
        opts.title = op.title;
        opts.titleBaseColor = op.titleBaseColor;
        opts.viewPage_f = op.viewPage_f;
        opts.headButtons = op.headButtons;
        opts.headButtonIds = op.headButtonIds;
        opts.buttons = op.buttons;
        opts.buttonIds = op.buttonIds;
        opts.buttonXm = op.buttonXm;
        opts.baseColor = op.baseColor;
        opts.ym = op.ym;
        opts.buttonsOn_f = op.buttonOn_f;

        mda.setMargin(opts, op);
        //=================
        var ksObj = opts.ksObj = {};
        var kopts = ksObj.opts = {};
        ksObj.name = "mdaSelector";
        ksObj.type = "Model~MdaSelector~base.sys0";
        kopts.margin = 0;
        kopts.baseColor = op.baseColor;
        kopts.xc = op.xc;
        kopts.xm = op.exm;
        kopts.ym = op.eym;
        kopts.eh = op.eh;
        kopts.textAlign = op.textAlign;
        kopts.lpd = op.lpd;
        kopts.selectAble_f = op.selectAble_f;
        kopts.selectEsc_f = op.selectEsc_f;
        kopts.selectInx = op.selectInx;
        kopts.kvTexts = op.kvTexts;
        //=================
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            if (iobj.act === "selected") {
                if (iobj.kvObj) {
                    if (iobj.kvObj.fatherMd.opts.selectEsc_f)
                        MdaPopWin.popOffTo(iobj.sender.opts.popStackCnt);
                }
                KvLib.exeFunc(_op.actionFunc, iobj);
                return;
            }
            if (iobj.act === "mouseClick") {
                if (iobj.kvObj.opts.id === "ok") {
                    KvLib.exeFunc(_op.actionFunc, iobj);
                }
                MdaPopWin.popOffTo(iobj.sender.opts.popStackCnt);
            }
        };
        var kvObj = new Block("mdaBox", "Model~MdaBox~base.sys0", opts);
        mda.popObj(op.w, op.h, kvObj);
    }

    editorBox(_op) {
        var op = {};
        op.w = 9999;
        op.h = 9999;
        op.margin = 10;
        op.ym = 10;
        op.baseColor = "#222";
        op.buttonXm = 20;
        op.title = "Editor";
        op.titleBaseColor = "#004";
        op.lpd = 0;
        op.buttonOn_f = 1;
        op.headButtons = ["ESC"];
        op.headButtonIds = ["esc"];
        op.exName = "txt";//js|css|html|txt|xml|json
        op.readOnly_f = 0;
        op.hideNo_f = 1;
        op.wrapSize = 80;
        op.nextRow = 20;


        KvLib.deepCoverObject(op, _op);
        //=====================================
        var opts = {};
        opts.title = op.title;
        opts.titleBaseColor = op.titleBaseColor;
        opts.headButtons = op.headButtons;
        opts.headButtonIds = op.headButtonIds;
        opts.buttons = op.buttons;
        opts.buttonIds = op.buttonIds;
        opts.buttonXm = op.buttonXm;
        opts.baseColor = op.baseColor;
        opts.ym = op.ym;
        opts.buttonsOn_f = op.buttonOn_f;
        mda.setMargin(opts, op);
        //=================
        var ksObj = opts.ksObj = {};
        var kopts = ksObj.opts = {};
        ksObj.name = "editor";
        ksObj.type = "Component~Cp_base~editor.sys0";
        kopts.readOnly_f = op.readOnly_f;
        kopts.hideNo_f = op.hideNo_f;
        kopts.exName = op.exName;
        kopts.wrapSize = op.wrapSize;
        kopts.nextRow = op.nextRow;

        //=================
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            if (iobj.act === "mousePush") {
                if (iobj.kvObj.opts.id === "nextButton") {
                    var kvObj = iobj.sender.blockRefs["mainMd"];
                    KvLib.lineMoveEditor(kvObj, kvObj.opts.nextRow);

                    return;
                }
                if (iobj.kvObj.opts.id === "prevButton") {
                    var kvObj = iobj.sender.blockRefs["mainMd"];
                    KvLib.lineMoveEditor(kvObj, 0 - kvObj.opts.nextRow);
                    return;
                }
            }
            if (iobj.act === "mouseClick") {
                if (iobj.kvObj.opts.id === "ok") {
                }
                MdaPopWin.popOffTo(iobj.sender.opts.popStackCnt);
                return;
            }
        };
        var kvObj = new Block("mdaBox", "Model~MdaBox~base.sys0", opts);
        mda.popObj(op.w, op.h, kvObj);
        return kvObj;
    }

    intPadBox(_op) {
        var op = {};
        op.setOpts = sopt.getIntInputText();
        KvLib.deepCoverObject(op, _op);
        op.headButtons = ["ESC"];
        op.headButtonIds = ["esc"];
        return this.intHexPadBox(op);
    }

    hexPadBox(_op) {
        var op = {};
        op.setOpts = dsc.optsCopy.hex;
        KvLib.deepCoverObject(op, _op);
        op.headButtons = ["ESC"];
        op.headButtonIds = ["esc"];
        this.intHexPadBox(op);
    }

    colorPadBox(_op) {
        var op = {};
        op.modelType = "Model~MdaPad~base.sys0";
        KvLib.deepCoverObject(op, _op);
        this.intHexPadBox(op);
    }

    floatPadBox(_op) {
        var op = {};
        op.setOpts = dsc.optsCopy.float;
        KvLib.deepCoverObject(op, _op);
        op.headButtons = ["ESC"];
        op.headButtonIds = ["esc"];
        this.intHexPadBox(op);
    }

    intHexPadBox(_op) {
        var op = {};
        op.title = "InputTitle";
        op.headButtons = ["Dec", "Hex", "ESC"];
        op.headButtonIds = ["dec", "hex", "esc"];
        op.headButtonWidthes = [100, 100, 100];
        op.titleBaseColor = "#004";
        op.buttonXm = 100;
        op.w = 600;
        op.h = 400;
        op.setOpts = {};
        KvLib.deepCoverObject(op.setOpts, dsc.optsCopy.int);
        KvLib.deepCoverObject(op, _op);
        op.setOpts.title = "";
        op.setOpts.titleWidth = 0;
        //=====================================
        if (op.setOpts.setType === "textArea")
            op.h = 600;
        else
            op.h = 400;
        var opts = {};
        opts.title = op.title;
        opts.titleColor = "#000";
        opts.titleBaseColor = op.titleBaseColor;
        opts.headButtons = op.headButtons;
        opts.headButtonIds = op.headButtonIds;
        opts.headButtonWidthes = op.headButtonWidthes;
        opts.buttons = [];
        mda.setMargin(opts, op);
        opts.ym = op.ym;
        //=================
        var ksObj = opts.ksObj = {};
        ksObj.name = "mdaPad";
        ksObj.type = "Model~MdaPad~base.sys0";
        var kopts = ksObj.opts = {};
        kopts.setOpts = op.setOpts;
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            if (iobj.act === "afterCreate") {
                var kvObj = iobj.sender;
                var decBut = kvObj.blockRefs["headButton#0"];
                if (decBut.opts.innerText !== "Dec") {
                    return;
                }
                Block.setInputWatch(decBut.opts, "directName", "self.fatherMd.opts.decButColor", "baseColor", 1);
                var hexBut = kvObj.blockRefs["headButton#1"];
                Block.setInputWatch(hexBut.opts, "directName", "self.fatherMd.opts.hexButColor", "baseColor", 1);
                if (kvObj.opts.ksObj.opts.setOpts.checkType === "hex") {
                    kvObj.opts.decButColor = "#ccc";
                    kvObj.opts.hexButColor = "#aaf";
                } else {
                    kvObj.opts.decButColor = "#aaf";
                    kvObj.opts.hexButColor = "#ccc";
                }
                return;
            }
            if (iobj.act === "padEnter") {
                var md = iobj.sender;
                var mdaPad = md.blockRefs["mainMd"];
                var setLine = mdaPad.blockRefs["lcd"];
                var errStr = setLine.mdClass.checkValue(1);
                if (errStr) {
                    box.errorBox({ kvTexts: [errStr] });
                    return;
                }
                MdaPopWin.popOff(2);
                KvLib.exeFunc(_op.actionFunc, iobj);
                return;

            }
            if (iobj.act === "escape") {
                MdaPopWin.popOff(2);
                return;
            }
            if (!iobj.kvObj)
                return;
            var id = iobj.kvObj.opts.id;
            if (id === "esc") {
                MdaPopWin.popOff(2);
                return;
            }
            var md = iobj.sender;
            var mdaPad = md.blockRefs["mainMd"];
            if (!mdaPad) {
                return;
            }
            var setLine = mdaPad.blockRefs["lcd"];
            if (setLine.opts.setOpts.setType === "inputText") {
                var inputText = setLine.blockRefs["inputText"];
                var inputElem = inputText.elems["inputText"];
            } else {
                var inputText = setLine.blockRefs["textArea"];
                var inputElem = inputText.elems["textArea"];
            }
            var valueStr = inputElem.value;
            if (id === "hexDec") {
                if (iobj.sender.opts.ksObj.opts.setOpts.checkType !== "hex") {
                    iobj.sender.opts.ksObj.opts.setOpts.checkType = "hex";
                    iobj.sender.opts.ksObj.opts.setOpts.actButtons = [];
                    var kvObj = iobj.sender.reCreate();
                    var mdaPad = kvObj.blockRefs["mainMd"];
                    mdaPad.mdClass.intHexConvert(valueStr, 1);
                } else {
                    iobj.sender.opts.ksObj.opts.setOpts.checkType = "int";
                    iobj.sender.opts.ksObj.opts.setOpts.actButtons = ["inc", "dec"];
                    var kvObj = iobj.sender.reCreate();
                    var mdaPad = kvObj.blockRefs["mainMd"];
                    mdaPad.mdClass.intHexConvert(valueStr, 0);
                }

                return;
            }

            if (id === "dec") {
                if (iobj.sender.opts.ksObj.opts.setOpts.checkType !== "int") {
                    iobj.sender.opts.ksObj.opts.setOpts.checkType = "int";
                    iobj.sender.opts.ksObj.opts.setOpts.actButtons = ["inc", "dec"];
                    var kvObj = iobj.sender.reCreate();
                    var mdaPad = kvObj.blockRefs["mainMd"];
                    mdaPad.mdClass.intHexConvert(valueStr, 0);
                }
                return;
            }
            if (id === "hex") {
                if (iobj.sender.opts.ksObj.opts.setOpts.checkType !== "hex") {
                    iobj.sender.opts.ksObj.opts.setOpts.checkType = "hex";
                    iobj.sender.opts.ksObj.opts.setOpts.actButtons = [];
                    var kvObj = iobj.sender.reCreate();
                    var mdaPad = kvObj.blockRefs["mainMd"];
                    mdaPad.mdClass.intHexConvert(valueStr, 1);
                }
                return;
            }


            //MdaPopWin.popOff(2);
        };
        var kvObj = new Block("mdaBox", "Model~MdaBox~base.sys0", opts);
        mda.popObj(op.w, op.h, kvObj);
        return kvObj;
    }

    strPadBox(_op) {
        var op = {};
        op.kvTexts = ["This is message1", "This is message2"];
        op.title = "InputTitle";
        op.headButtons = ["ESC"];
        op.headButtonIds = ["esc"];
        op.headButtonWidthes = [100, 100];
        op.titleBaseColor = "#444";
        op.buttonXm = 100;
        op.modelType = "Model~MdaPad~base.sys0";
        if (_op.setOpts.setType === "textArea")
            op.h = 600;
        else
            op.h = 400;
        op.value = "";
        KvLib.deepCoverObject(op, _op);
        //=====================================
        var opts = {};
        opts.title = op.title;
        opts.titleColor = "#000";
        opts.titleBaseColor = op.titleBaseColor;
        opts.headButtons = op.headButtons;
        opts.headButtonIds = op.headButtonIds;
        opts.headButtonWidthes = op.headButtonWidthes;
        opts.buttons = [];
        mda.setMargin(opts, op);
        opts.ym = op.ym;
        //=================
        var ksObj = opts.ksObj = {};
        ksObj.name = "mdaPad";
        ksObj.type = op.modelType;
        var kopts = ksObj.opts = {};
        var setOpts = kopts.setOpts = {};
        kopts.setOpts = op.setOpts;
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            var actionEnter = function () {
                var md = iobj.sender;
                var mdaPad = md.blockRefs["mainMd"];
                var setLine = mdaPad.blockRefs["lcd"];
                var errStr = setLine.mdClass.checkValue(1);
                if (errStr) {
                    box.errorBox({ kvTexts: [errStr] });
                    return;
                }
                MdaPopWin.popOff(2);
                KvLib.exeFunc(op.actionFunc, iobj);
                return;

            };

            if (iobj.act === "pressEnter") {
                actionEnter(iobj);
                return;
            }
            if (iobj.act === "escape") {
                MdaPopWin.popOff(2);
                return;
            }
            if (!iobj.kvObj)
                return;
            var id = iobj.kvObj.opts.id;
            if (id === "esc") {
                MdaPopWin.popOff(2);
                return;
            }
            if (id === "enter") {
                actionEnter(iobj);
                return;
            }
        };
        var kvObj = new Block("mdaBox", "Model~MdaBox~base.sys0", opts);
        mda.popObj(op.w, op.h, kvObj);
    }

    keyboardBox(_op) {
        var op = {};
        op.kvTexts = ["This is message1", "This is message2"];
        op.title = "InputTitle";
        op.buttonXm = 100;
        if (_op.setOpts.setType === "textArea")
            op.h = 700;
        else
            op.h = 500;
        op.w = gr.clientW - 10;
        op.setOpts = dsc.optsCopy.str;
        KvLib.deepCoverObject(op, _op);
        //=====================================
        var opts = {};
        opts.title = op.title;
        opts.titleColor = "#000";
        opts.titleBaseColor = "#444";
        opts.headButtons = ["OK", "ESC"];
        opts.headButtonIds = ["ok", "esc"];
        opts.headButtonWidthes = [100, 100];
        opts.buttons = [];
        mda.setMargin(opts, op);
        opts.ym = op.ym;
        //opts.eh = op.kvTexts.length * 40;
        //=================
        var ksObj = opts.ksObj = {};
        ksObj.name = "mdaPad";
        ksObj.type = "Model~MdaPad~base.sys0";
        var kopts = ksObj.opts = {};
        var setOpts = kopts.setOpts = {};
        kopts.setOpts = op.setOpts;
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            if (iobj.act === "afterCreate") {
                return;
            }
            if (iobj.act === "pressEnter") {
                var md = iobj.sender;
                var mdaPad = md.blockRefs["mainMd"];
                var setLine = mdaPad.blockRefs["lcd"];
                var errStr = setLine.mdClass.checkValue(1);
                if (errStr) {
                    box.errorBox({ kvTexts: [errStr] });
                    return;
                }
            }
            if (iobj.act === "escape") {
                MdaPopWin.popOff(2);
                return;

            }

            if (iobj.act === "padEnter") {
                MdaPopWin.popOff(2);
                KvLib.exeFunc(_op.actionFunc, iobj);
                return;
            }
            if (!iobj.kvObj)
                return;
            var id = iobj.kvObj.opts.id;
            if (iobj.act === "checkPreChange") {
                return;
            }
            if (id === "esc") {
                MdaPopWin.popOff(2);
                return;
            }
            if (id === "ok") {
                var md = iobj.sender;
                var mdaPad = md.blockRefs["mainMd"];
                mdaPad.mdClass.enterPrg();
                return;
            }
            MdaPopWin.popOff(2);
            KvLib.exeFunc(_op.actionFunc, iobj);
        };
        var kvObj = new Block("mdaBox", "Model~MdaBox~base.sys0", opts);
        mda.popObj(op.w, op.h, kvObj);
    }

    containerFreeBox(_op1, _op2) {
        var op1 = {};
        var op2 = {};


        op1.innerType = "Model~MdaContainer~base.free";
        op2.ksObjWs = [150, 200, 150, 500, 9999];

        op2.ksObjss = [];
        for (var i = 0; i < 30; i++) {
            var ksObjs = [];
            for (var j = 0; j < 10; j++) {
                var ksObj = {};
                ksObj.name = "name#" + i + "." + j;
                ksObj.type = "Component~Cp_base~button.sys0";
                ksObj.opts = {};
                ksObjs.push(ksObj);
            }
            op2.ksObjss.push(ksObjs);
        }
        op2.ksObjss[2][1].iw = 50;
        op2.ksObjss[3][0].ih = 100;


        KvLib.deepCoverObject(op1, _op1);
        KvLib.deepCoverObject(op2, _op2);
        return box.containerPageBox(op1, op2);


    }

    containerTableBox(_op1, _op2) {
        var op1 = {};
        var op2 = {};
        op1.innerType = "Model~MdaContainer~base.table";
        op2.ksObjWs = [150, 200, 150, 500, 100, 300, 200];
        KvLib.deepCoverObject(op1, _op1);
        KvLib.deepCoverObject(op2, _op2);
        return box.containerPageBox(op1, op2);
    }

    containerPageBox(_op1, _op2) {
        var op1 = {};
        var op2 = {};
        op1.innerType = "Model~MdaContainer~base.page";
        op2.ksObjWs = [150, 200, 150, 500, 9999];
        op2.ksObjss = [];
        for (var i = 0; i < 30; i++) {
            var ksObjs = [];
            for (var j = 0; j < 10; j++) {
                var ksObj = {};
                ksObj.name = "name#" + i + "." + j;
                ksObj.type = "Component~Cp_base~button.sys0";
                ksObj.opts = {};
                ksObj.opts.innerText = ksObj.name;
                ksObjs.push(ksObj);
            }
            op2.ksObjss.push(ksObjs);
        }
        KvLib.deepCoverObject(op1, _op1);
        KvLib.deepCoverObject(op2, _op2);
        var opts = mac.setContainerBoxOpts(op1, op2);
        opts.actionFunc = function (iobj) {
            if (iobj.act === "mouseClick") {
                if (iobj.kvObj.opts.id === "esc")
                    MdaPopWin.popOffTo(iobj.sender.opts.popStackCnt);
                if (op1)
                    KvLib.exeFunc(op1.actionFunc, iobj);
            }
        };
        var kvObj = new Block("containerBox", "Model~MdaBox~base.sys0", opts);
        return mda.popObj(0, 0, kvObj);
    }

    setOptsBox(_op) {
        _op.setOptsObj = dsc.optsBase;
        var setOptsFunc = function (setOptss) {
            var nowGroup = "";
            var ksObjss = [];
            var i = 0;
            for (var objKey in setOptss) {
                var ksObjs = [];
                var ksObj = {};
                ksObj.name = "setLine#" + i + "." + 0;
                ksObj.type = "Model~MdaSetLine~base.sys0";
                var kopts = ksObj.opts = {};
                var setOpts = kopts.setOpts = setOptss[objKey];
                if (setOpts.setType === "group") {
                    nowGroup = setOpts.group;
                    if (setOpts.value)
                        nowGroup = "";
                } else {
                    if (setOpts.group !== nowGroup)
                        nowGroup = "";
                    else
                        continue;
                }
                setOpts.title = objKey;
                setOpts.titleWidth = 300;
                setOpts.iconWidth = 25;
                //setOpts.noWidth = 25;
                setOpts.expandWidth = 30;
                setOpts.no = "" + (i + 1);
                setOpts.titleFontSize = 16;
                ksObjs.push(ksObj);
                ksObjss.push(ksObjs);
                i++;
            }
            return ksObjss;


        };
        var opts = {};
        opts.eh = 30;
        opts.etm = 1;
        opts.ebm = 1;
        opts.erm = 1;
        opts.elm = 1;
        opts.xm = 0;
        opts.ym = 1;
        opts.setOptsObj = {};
        KvLib.deepCoverObject(opts, _op);
        opts.ksObjss = setOptsFunc(opts.setOptsObj);
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            if (iobj.act === "expand" || iobj.act === "collaps") {
                var mdaBox = iobj.sender;
                //mdaBox.opts.ksObjss=setOptsFunc(iobj.setOptsObj);
                KvLib.deepCoverObject(opts.setOptsObj, iobj.setOptsObj);
                mdaBox.opts.ksObj.opts.ksObjss = setOptsFunc(opts.setOptsObj);
                var rowStart = mdaBox.blockRefs["mainMd"].stas.rowStart;
                mdaBox.opts.ksObj.opts.rowStart = rowStart;
                mdaBox.reCreate();
            }
        };
        box.setLineBox(opts);
    }

    setLineBox(_op) {
        var obj = mac.setLineBoxOpts(_op);
        var kvObj = new Block("setLineBox", obj.type, obj.opts);
        mda.popObj(_op.w, _op.h, kvObj);
        return kvObj;
    }

    paraEditBox(_op) {
        var op = {};
        op.w = 1000;
        op.h = 9999;
        op.titleWidth = 300;
        op.titleFontSize = 20;
        op.noWidth = 50;
        op.title = "box.paraEditBox";
        op.paraSet = {};
        KvLib.deepCoverObject(op, _op);


        var opts = {};
        opts.w = op.w;
        opts.h = op.h;
        opts.title = op.title;
        opts.eh = op.eh;
        opts.ym = op.ym;

        opts.ksObjss = [];
        var keys = op.setNames;
        //keys.sort();
        var index = 0;
        for (var i = 0; i < keys.length; i++) {
            var strA = keys[i].split("~");
            if (strA[0] === "dsc")
                continue;
            var ksObjs = [];
            for (var j = 0; j < 1; j++) {
                var ksObj = {};
                ksObj.name = "setLine#" + index + "." + j;
                ksObj.type = "Model~MdaSetLine~base.sys0";
                var kopts = ksObj.opts = {};
                var setOpts = kopts.setOpts = sopt.getOptsInt();
                var dscObj = op.paraSet["dsc~" + keys[i]];
                if (dscObj) {
                    if (dscObj.getType) {
                        var setOpts = kopts.setOpts = sopt.getOptsPara(dscObj.getType);
                        KvLib.deepCoverObject(setOpts, dscObj);
                    } else {
                        KvLib.deepCoverObject(setOpts, dscObj);
                    }
                }
                setOpts.value = op.paraSet[keys[i]];
                setOpts.id = keys[i];

                if (setOpts.dataType === "str" && setOpts.array === 1) {
                    var array = op.paraSet[keys[i]];
                    setOpts.value = "";
                    for (var k = 0; k < array.length; k++) {
                        if (k !== 0) {
                            setOpts.value += ",";
                            setOpts.value += "\n";
                        }
                        setOpts.value += "\"";
                        setOpts.value += array[k];
                        setOpts.value += "\"";
                    }
                }
                setOpts.titleWidth = op.titleWidth;
                setOpts.titleFontSize = op.titleFontSize;
                setOpts.noWidth = op.noWidth;
                setOpts.id = keys[i];
                if (!setOpts.title)
                    setOpts.title = keys[i];
                setOpts.no = index + 1;
                ksObjs.push(ksObj);
                index++;
            }
            opts.ksObjss.push(ksObjs);
        }
        opts.actionFunc = function (iobj) {
            if (iobj.act === "mouseClick" && iobj.buttonId === "ok") {
                console.log(iobj);
                var paraSet = {};
                for (var i = 0; i < iobj.ksObjss.length; i++) {
                    var obj = iobj.ksObjss[i][0];
                    var setOpts = obj.opts.setOpts;
                    var checkType = setOpts.checkType;
                    paraSet[setOpts.id] = setOpts.value;
                }
                var obj = {};
                obj.act = "paraSetOk";
                obj.paraSet = paraSet;
                KvLib.exe(_op.actionFunc, obj);
            }

        };
        box.setLineBox(opts);
    }

    testSetLineBox(_opts) {
        var opts = {};
        opts.w = 1000;
        opts.h = 800;
        opts.title = "title";
        opts.headButtons = ["ESC"];
        opts.headButtonIds = ["esc"];
        opts.eh = 50;
        opts.ym = 10;
        opts.setOptsA = [];
        var setOpts = sopt.getOptsPara("buttonActs");
        setOpts.enum = ["脈波啟動", "脈波停止"];
        //setOpts.borderWidth = 1;
        //setOpts.fontSize = "0.6rh";
        //setOpts.titleFontSize = "0.9rh";
        setOpts.titleWidth = 200;
        setOpts.title = "Title";
        //setOpts.baseColor="#222";
        opts.setOptsA.push(setOpts);

        var setOpts = sopt.getOptsPara("buttonSelect");
        setOpts.enum = ["脈波啟動", "脈波停止"];
        opts.setOptsA.push(setOpts);
        KvLib.deepCoverObject(opts, _opts);


        opts.ksObjss = [];
        for (var i = 0; i < opts.setOptsA.length; i++) {
            var ksObjs = [];
            for (var j = 0; j < 1; j++) {
                var ksObj = {};
                ksObj.name = "setLine#" + i + "." + j;
                ksObj.type = "Model~MdaSetLine~base.sys0";
                var kopts = ksObj.opts = {};
                //kopts.baseColor="rgba(0,0,0,0)";
                kopts.setOpts = opts.setOptsA[i];
                ksObjs.push(ksObj);
            }
            opts.ksObjss.push(ksObjs);
        }
        opts.actionFunc = function (iobj) {
            if (iobj.act === "mouseClick" && iobj.buttonId === "ok") {
                console.log(iobj);
                KvLib.exeFunc(_opts.actionFunc, iobj);
            }
        };
        box.setLineBox(opts);
        return;


    }
}
var box = new KvBox();

