class FlyingEagleWeb {
    constructor() {
        var self = this;
        this.actId = 0;
        gr.hideWavePageElem = null;
        gr.flyingEagleData = {};
        gr.socketRetPrgTbl["tick~return"] = function (tickData) {
            if (tickData.consoleStrs && tickData.consoleStrs.length > 0) {
                console.log(tickData.consoleStrs);
                var md = self.md;
                var editor = md.blockRefs["editor"];
                var editorObj = editor.objs["editor"];
                for (var i = 0; i < tickData.consoleStrs.length; i++) {
                    KvLib.editorInsertColorStr(editorObj, tickData.consoleStrs[i].color, tickData.consoleStrs[i].str);
                }


            }

            var keys = Object.keys(tickData);
            for (var i = 0; i < keys.length; i++) {
                var strA = keys[i].split("#");
                if (strA.length === 1) {
                    gr.flyingEagleData[keys[i]] = tickData[keys[i]];
                    continue;
                }
                if (strA.length === 2) {
                    var inx0 = KvLib.toInt(strA[1], 0);
                    gr.flyingEagleData[strA[0]][inx0] = tickData[keys[i]];
                    continue;
                }
            }
            gr.flyingEagleData.rxed_f = 1;
            gr.webSocketConnectTime = 0;
            //console.log("flyingEagleData");
        };


    }

    initOpts(md) {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);
        opts.testIndex = 0;
        opts.modeIndex = 0;
        return opts;
    }

    chkWatch() {
        var self = this;
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        ws.tick();
        st.watchDataA = ["", "", "", "", "", "", ""];
        gr.footBarStatus2 = "Connected " + (gr.webSocketConnectCnt % 10);
        gr.webSocketConnectTime++;
        if (gr.webSocketConnectTime >= 60) {
            gr.webSocketConnectTime = 0;
        }
        st.testIndexStr = "TestIndex: " + op.testIndex;
        st.modeIndexStr = "ModeIndex: " + op.modeIndex;


    }

    setPrg(title, buttonId) {
        var self = this;
        var md = self.md;
        var op = md.opts;
        if (title === "系統設定") {
            var setFunc = function (iobj) {
                console.log(iobj);
                var opts = {};
                var setOptsA = [];
                opts.ksObjWs = [9999];

                if (iobj.selectText === "進階設定") {
                    setOptsA.push(sopt.getParaSetOpts({ paraSetName: "systemName" }));
                    setOptsA.push(sopt.getParaSetOpts({ paraSetName: "version" }));
                    setOptsA.push(sopt.getParaSetOpts({ paraSetName: "webSocketAddr" }));
                }
                if (iobj.selectText === "檔案來源設定") {
                    setOptsA.push(sopt.getParaSetOpts({ paraSetName: "secFilesPath" }));
                    setOptsA.push(sopt.getParaSetOpts({ paraSetName: "modelsPath" }));
                    setOptsA.push(sopt.getParaSetOpts({ paraSetName: "learnFilesSet" }));
                    setOptsA.push(sopt.getParaSetOpts({ paraSetName: "evalueFilesSet" }));
                    setOptsA.push(sopt.getParaSetOpts({ paraSetName: "testFilesSet" }));
                }
                if (iobj.selectText === "資料來源設定") {
                    setOptsA.push(sopt.getParaSetOpts({ paraSetName: "rowStartEndInx" }));
                    setOptsA.push(sopt.getParaSetOpts({ paraSetName: "rowStartSub" }));
                    setOptsA.push(sopt.getParaSetOpts({ paraSetName: "rowEndSub" }));
                    setOptsA.push(sopt.getParaSetOpts({ paraSetName: "segStartSub" }));
                    setOptsA.push(sopt.getParaSetOpts({ paraSetName: "segEndSub" }));

                }
                if (iobj.selectText === "學習參數設定") {
                    setOptsA.push(sopt.getParaSetOpts({ paraSetName: "saveModelInx" }));
                    setOptsA.push(sopt.getParaSetOpts({ paraSetName: "loadModelInx" }));
                    setOptsA.push(sopt.getParaSetOpts({ paraSetName: "learnFilterSteps" }));
                    setOptsA.push(sopt.getParaSetOpts({ paraSetName: "learnFilterActSteps" }));
                    setOptsA.push(sopt.getParaSetOpts({ paraSetName: "learnParaSteps" }));
                    setOptsA.push(sopt.getParaSetOpts({ paraSetName: "learnMarginEscapeTime" }));
                    setOptsA.push(sopt.getParaSetOpts({ paraSetName: "learnSeed" }));
                    setOptsA.push(sopt.getParaSetOpts({ paraSetName: "dropOutRate" }));
                    setOptsA.push(sopt.getParaSetOpts({ paraSetName: "regularizers" }));
                    setOptsA.push(sopt.getParaSetOpts({ paraSetName: "epochs" }));
                    setOptsA.push(sopt.getParaSetOpts({ paraSetName: "batchSize" }));
                    setOptsA.push(sopt.getParaSetOpts({ paraSetName: "learnLayers" }));

                }
                if (iobj.selectText === "利潤參數設定") {
                    setOptsA.push(sopt.getParaSetOpts({ paraSetName: "marginActLatch_f" }));
                    setOptsA.push(sopt.getParaSetOpts({ paraSetName: "marginXchBuySell_f" }));
                    setOptsA.push(sopt.getParaSetOpts({ paraSetName: "mga1_en" }));
                    setOptsA.push(sopt.getParaSetOpts({ paraSetName: "mga1_name" }));
                    setOptsA.push(sopt.getParaSetOpts({ paraSetName: "mga1_valueFilter_len" }));
                    setOptsA.push(sopt.getParaSetOpts({ paraSetName: "mga1_slopeCheck_len" }));
                    setOptsA.push(sopt.getParaSetOpts({ paraSetName: "mga1_maxWavePrice_th" }));
                    setOptsA.push(sopt.getParaSetOpts({ paraSetName: "mga1_avgSlope_th" }));
                    setOptsA.push(sopt.getParaSetOpts({ paraSetName: "mga1_slopePeak_len" }));
                    setOptsA.push(sopt.getParaSetOpts({ paraSetName: "mga1_accPrice_th" }));
                    setOptsA.push(sopt.getParaSetOpts({ paraSetName: "mga1_actTrig_len" }));
                    setOptsA.push(sopt.getParaSetOpts({ paraSetName: "mga2_en" }));
                    setOptsA.push(sopt.getParaSetOpts({ paraSetName: "mga2_name" }));
                    setOptsA.push(sopt.getParaSetOpts({ paraSetName: "mga2_preChk_len" }));
                    setOptsA.push(sopt.getParaSetOpts({ paraSetName: "mga2_threshRate" }));
                    setOptsA.push(sopt.getParaSetOpts({ paraSetName: "mga2_threshValue" }));
                    setOptsA.push(sopt.getParaSetOpts({ paraSetName: "mga2_continue_len" }));
                    setOptsA.push(sopt.getParaSetOpts({ paraSetName: "mgu1_en" }));
                    setOptsA.push(sopt.getParaSetOpts({ paraSetName: "mgu1_name" }));
                    setOptsA.push(sopt.getParaSetOpts({ paraSetName: "mgu1_actTime_th" }));
                    setOptsA.push(sopt.getParaSetOpts({ paraSetName: "mgu2_en" }));
                    setOptsA.push(sopt.getParaSetOpts({ paraSetName: "mgu2_name" }));
                    setOptsA.push(sopt.getParaSetOpts({ paraSetName: "mgu2_valueFilter_len" }));
                    setOptsA.push(sopt.getParaSetOpts({ paraSetName: "mgu2_maxWavePrice_th" }));
                    setOptsA.push(sopt.getParaSetOpts({ paraSetName: "mgu3_en" }));
                    setOptsA.push(sopt.getParaSetOpts({ paraSetName: "mgu3_name" }));
                    setOptsA.push(sopt.getParaSetOpts({ paraSetName: "mgu3_threshValue" }));
                    setOptsA.push(sopt.getParaSetOpts({ paraSetName: "mgu3_continue_len" }));
                }
                var setObjs = [];
                var inx = 0;
                for (var ii = 0; ii < setOptsA.length; ii++) {
                    var ksObj = {};
                    ksObj.type = "Model~MdaSetLine~base.sys0";
                    var kopts = ksObj.opts = {};
                    kopts.setOpts = setOptsA[ii];
                    if (!kopts.setOpts.titleWidth)
                        kopts.setOpts.titleWidth = 400;
                    setObjs.push(ksObj);
                }
                //================================
                opts.ksObjss = [];
                var inx = 0;
                for (var i = 0; i < setOptsA.length; i++) {
                    var wsA = opts.ksObjWs;
                    if (opts.ksObjWsR) {
                        if (opts.ksObjWsR["r" + i])
                            wsA = opts.ksObjWsR["r" + i];
                    }
                    var ksObjs = [];
                    for (var j = 0; j < wsA.length; j++) {
                        if (inx >= setObjs.length)
                            break;
                        var ksObj = setObjs[inx];
                        ksObj.name = "setLine#" + i + "." + j;
                        ksObjs.push(ksObj);
                        inx++;
                    }
                    if (j >= 1)
                        opts.ksObjss.push(ksObjs);
                }
                opts.title = title;
                opts.w = "0.9rw";
                opts.h = "0.9rh";
                opts.actionFunc = function (iobj) {
                    if (iobj.act !== "mouseClick")
                        return;
                    if (iobj.buttonId !== "ok")
                        return;
                    mac.saveSetOpts(iobj.ksObjss, gr.paraSet);
                    mac.saveParaSetAll();

                };
                box.setLineBox(opts);
            };
            var opts = {};
            opts.paraSet = gr.paraSet;
            opts.title = title;
            opts.xc = 2;
            opts.yc = 3;
            opts.eh = 40;
            opts.eym = 10;
            opts.w = 800;
            opts.h = 250;
            opts.textAlign = "left";
            opts.lpd = 10;
            opts.kvTexts = [];
            opts.kvTexts.push("進階設定");
            opts.kvTexts.push("檔案來源設定");
            opts.kvTexts.push("資料來源設定");
            opts.kvTexts.push("學習參數設定");
            opts.kvTexts.push("利潤參數設定");
            opts.kvTexts.push("帳戶參數設定");
            opts.kvTexts.push("");
            opts.kvTexts.push("");
            opts.actionFunc = setFunc;
            box.selectBox(opts);
            return;
        }
        if (buttonId === "testIndex") {
            if (event && event.shiftKey) {
                md.opts.testIndex--;
            } else {
                md.opts.testIndex++;
            }
            return;
        }
        if (buttonId === "modeIndex") {
            if (event && event.shiftKey) {
                md.opts.modeIndex--;
            } else {
                md.opts.modeIndex++;
            }
            return;
        }


        if (title === "Clear All") {
            var editor = md.blockRefs["editor"];
            var editorObj = editor.objs["editor"];
            editorObj.setValue("", -1);
            KvLib.clearEditorMarker(editorObj);
            return;
        }
        if (title === "Page Up") {
            var editor = md.blockRefs["editor"];
            var editorObj = editor.objs["editor"];
            KvLib.editorPageUP(editorObj);
            return;
        }
        if (title === "Page Down") {
            var editor = md.blockRefs["editor"];
            var editorObj = editor.objs["editor"];
            KvLib.editorPageDown(editorObj);
            return;
        }
        if (title === "Test Editor") {
            var editor = md.blockRefs["editor"];
            var editorObj = editor.objs["editor"];
            // Overwrites selected text or inserts at cursor
            //KvLib.endInputEditor(editor, "Your string here","red");
            KvLib.editorInsertColorStr(editorObj, "green", "Your string here");
            //KvLib.applyColorToSelection(editorObj, "red");
            //editorObj.insert("Your string here");

            //editorObj.setValue("Your new content string", -1);
            return;

        }
        if (title === "Test Editor Ok") {
            var editor = md.blockRefs["editor"];
            var editorObj = editor.objs["editor"];
            // Overwrites selected text or inserts at cursor
            //KvLib.endInputEditor(editor, "Your string here","red");
            KvLib.editorInsertColorStr(editorObj, "white", "\nYour string here");
            //KvLib.applyColorToSelection(editorObj, "red");
            //editorObj.insert("Your string here");

            //editorObj.setValue("Your new content string", -1);
            return;
        }

    }

    afterCreate() {
        var self = this;
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        var downButtonsObj = md.blockRefs["downButtons"];
        if (downButtonsObj) {
            var button_0 = downButtonsObj.blockRefs["button#0"];
            var watchReg = "self.fatherMd.fatherMd.stas.testIndexStr";
            Block.setInputWatch(button_0.opts, "directReg", watchReg, "innerText", 1);

            var button_1 = downButtonsObj.blockRefs["button#1"];
            var watchReg = "self.fatherMd.fatherMd.stas.modeIndexStr";
            Block.setInputWatch(button_1.opts, "directReg", watchReg, "innerText", 1);

        }

    }
    build() {
        var self = this;
        var md = self.md;
        var op = md.opts;
        var lyMaps = md.lyMaps;
        var blocks = op.blocks;
        var layouts = op.layouts;
        //======================================    
        var cname = "c";
        var opts = {};
        layouts[cname] = { name: cname, type: "Layout~Ly_base~array.sys0", opts: opts };
        lyMaps["body"] = cname;
        var opts = {};
        md.setPns(opts);
        opts.mouseClick_f = 1;
        opts.baseColor = "#222";
        blocks[cname] = { name: "basePanel", type: "Component~Cp_base~plate.none", opts: opts };
        //======================================    
        var cname = lyMaps["body"] + "~" + 0;
        var opts = {};
        opts.yArr = [40, 9999, 80, 20];
        layouts[cname] = { name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts };
        lyMaps["mainBody"] = cname;
        //==============================
        var cname = lyMaps["mainBody"] + "~" + 1;
        var opts = {};
        opts.xArr = [250, 9999];
        layouts[cname] = { name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts };
        lyMaps["centerBody"] = cname;
        //==============================




        var cname = lyMaps["mainBody"] + "~" + 0;
        var actionPrg = function (iobj) {
            console.log(iobj);
            if (iobj.kvObj.opts.itemId === "save")
                mac.saveParaSetAll("okDialog");
            if (iobj.kvObj.opts.itemId === "esc")
                window.close();
        };
        var opts = {};
        opts.headIconWidth = 50;
        opts.headIconUrl = "systemResource/flying_eagle_icon_64.png";
        mac.setHeadTitleBar(md, cname, "FlyingEagle", actionPrg, ["esc"], opts);

        //==============================
        var cname = lyMaps["mainBody"] + "~" + 3;
        mac.setFootBar(md, cname);
        //==============================
        var cname = lyMaps["centerBody"] + "~" + 0;
        var opts = {};
        opts.buttons = [];
        opts.buttonIds = [];
        for (var i = 0; i < 20; i++) {
            opts.buttons.push("");
            opts.buttonIds.push("LeftButtons#" + (i + 1));

        }
        opts.buttons[0] = "系統設定";
        opts.buttonIds[0] = "systemSettings";
        opts.buttons[1] = "SaveModel";
        opts.buttonIds[1] = "saveModel";
        opts.buttons[2] = "LoadModel";
        opts.buttonIds[2] = "loadModel";
        opts.buttons[3] = "PlotSecData";
        opts.buttonIds[3] = "plotSecData";
        opts.buttons[4] = "DeepLearning";
        opts.buttonIds[4] = "deepLearning";
        opts.buttons[5] = "TestPrediction";
        opts.buttonIds[5] = "testPrediction";
        opts.buttons[6] = "ShioajiBox";
        opts.buttonIds[6] = "shioajiBox";
        opts.buttons[19] = "StopAll";
        opts.buttonIds[19] = "stopAll";
        opts.yc = 20;
        opts.xc = 1;
        opts.xm = 2;
        opts.ym = 2;
        opts.actionFunc = function (iobj) {
            if (iobj.act !== "mouseClick")
                return;
            console.log(iobj);
            if (iobj.buttonText == "系統設定") {
                self.setPrg(iobj.buttonText, iobj.buttonId);
                return;
            }

            if (iobj.buttonText == "SaveModel") {
                var opts = {};
                const path = gr.paraSet['modelsPath']
                const newPath = path.replace("${homeDir}", gr.paraSet['homeDir'])
                const fileName = newPath + "/myModel_" + gr.paraSet['saveModelInx'];
                opts.kvTexts = fileName.split("\n");
                opts.fontSize = 20;
                opts.actionFunc = function (iobj) {
                    console.log(iobj);
                    if (iobj.kvObj.opts.innerText === "OK") {
                        var opts = {};
                        opts.act = "saveModel";
                        opts.responseType = "errorDialog";
                        //opts.responseWaitTime = 2000;
                        ws.sendSocket(opts);
                    }
                }
                opts.title = "Save Model";
                box.checkBox(opts);
                return;
            }

            if (iobj.buttonText == "LoadModel") {
                var opts = {};
                const path = gr.paraSet['modelsPath']
                const newPath = path.replace("${homeDir}", gr.paraSet['homeDir'])
                const fileName = newPath + "/myModel_" + gr.paraSet['loadModelInx'];
                opts.kvTexts = fileName.split("\n");
                opts.fontSize = 20;
                opts.actionFunc = function (iobj) {
                    console.log(iobj);
                    if (iobj.kvObj.opts.innerText === "OK") {
                        var opts = {};
                        opts.act = "loadModel";
                        opts.responseType = "errorDialog";
                        //opts.responseWaitTime = 2000;
                        ws.sendSocket(opts);
                    }
                }
                opts.title = "Load Model";
                box.checkBox(opts);
                return;
            }

            if (iobj.buttonText == "PlotSecData") {
                var opts = {};
                opts.act = "plotSecData";
                opts.responseType = "errorDialog";
                opts.paras = { testIndex: md.opts.testIndex, modeIndex: md.opts.modeIndex };
                ws.sendSocket(opts);
                var timer = setTimeout(() => {
                    delete gr.socketRetPrgTbl["ret~plotSecData"];
                }, 3000);
                gr.socketRetPrgTbl["ret~plotSecData"] = function (retData) {
                    console.log("retData");
                    delete gr.socketRetPrgTbl["ret~plotSecData"];
                    clearTimeout(timer);

                    var opts = {};
                    opts.actionFunc = function (iobj) {
                        console.log(iobj);
                        if (iobj.act === "esc") {
                            MdaPopWin.popOffTo(iobj.sender.opts.popStackCnt);
                        }
                    };

                    var kvObj = new Block("testBox", "Model~LineChart~base.sys0", opts);

                    var dataSets = {};
                    dataSets["nowPrice"] = [];
                    dataSets["deltaAmt"] = [];
                    dataSets["buySell"] = [];
                    var priceMax = Math.round(retData.payload.priceMax / 100);
                    var priceMin = Math.round(retData.payload.priceMin / 100);
                    var priceAvg = Math.round(retData.payload.priceAvg / 100);
                    var maxDelta = Math.max(priceMax - priceAvg, priceAvg - priceMin);
                    priceMax = priceAvg + maxDelta;
                    priceMin = priceAvg - maxDelta;
                    var priceRange = priceMax - priceMin;
                    if (priceRange < 100)
                        priceRange = 100;
                    var priceOffset = Math.round(priceRange / 4);
                    var testData = [];
                    for (var i = 0; i < retData.payload.nowPrice.length; i++) {
                        dataSets["nowPrice"].push(Math.round(retData.payload.nowPrice[i] / 100));
                        dataSets["deltaAmt"].push(retData.payload.deltaAmt[i] * 0.001 + priceAvg - priceOffset);
                        dataSets["buySell"].push(retData.payload.buySell[i] * 0.001 + priceAvg + priceOffset);
                        testData.push(Math.round(retData.payload.nowPrice[i] / 100));
                    }
                    kvObj.mdClass.addBuf(0, dataSets["nowPrice"], { name: "nowPrice" });
                    kvObj.mdClass.addBuf(1, dataSets["deltaAmt"], { name: "deltaAmt" });
                    kvObj.mdClass.addBuf(2, dataSets["buySell"], { name: "buySell" });
                    kvObj.opts.lines[0].offOn_f = 1;
                    kvObj.opts.lines[1].offOn_f = 1;
                    kvObj.opts.lines[2].offOn_f = 1;
                    kvObj.opts.lines[3].offOn_f = 0;
                    kvObj.opts.lines[1].labelFixed = 3;
                    kvObj.opts.lines[2].labelFixed = 3;




                    kvObj.opts.tooltipFunc = function (lines) {
                        var newLines = [];
                        for (var i = 0; i < lines.length; i++) {
                            var parts = lines[i].split(": ");
                            if (parts.length === 2) {
                                if (parts[0] === "Index") {
                                    var index = parseInt(parts[1]);
                                    newLines.push("Index: " + index);
                                    continue;
                                }
                                if (parts[0] === "deltaAmt") {
                                    var value = parseFloat(parts[1]);
                                    value = (value - priceAvg + priceOffset) * 1000;
                                    newLines.push("deltaAmt: " + value.toFixed(0));
                                    continue;
                                }
                                if (parts[0] === "buySell") {
                                    var value = parseFloat(parts[1]);
                                    value = (value - priceAvg - priceOffset) * 1000;
                                    newLines.push("buySell: " + value.toFixed(0));
                                    continue;
                                }
                                newLines.push(lines[i]);
                            }
                        }
                        return newLines;
                    }



                    mda.popObj(9999, 9999, kvObj, 1);
                    return;





                }
                return;
            }
            if (iobj.buttonText == "DeepLearning") {
                var opts = {};
                opts.act = "deepLearning";
                opts.responseType = "errorDialog";
                opts.paras = { testIndex: md.opts.testIndex, modeIndex: md.opts.modeIndex };
                ws.sendSocket(opts);
                return;
            }
            if (iobj.buttonText == "StopAll") {
                var opts = {};
                opts.act = "stopAll";
                opts.responseType = "errorDialog";
                opts.paras = { testIndex: md.opts.testIndex, modeIndex: md.opts.modeIndex };
                ws.sendSocket(opts);
                return;
            }

            return;
        };
        opts.buttonAmt = 20;
        opts.fontSize = "0.5rh";
        blocks[cname] = { name: "leftButtons", type: "Model~MdaButtons~base.sys0", opts: opts };
        //===========================================================================
        var cname = lyMaps["mainBody"] + "~" + 2;
        var opts = {};
        opts.buttons = [];
        opts.buttonIds = [];
        for (var i = 0; i < 16; i++) {
            opts.buttons.push("");
            opts.buttonIds.push("DownButtons#" + (i + 1));

        }
        opts.buttons[0] = "TestIndex";
        opts.buttonIds[0] = "testIndex";
        opts.buttons[1] = "ModeIndex";
        opts.buttonIds[1] = "modeIndex";
        opts.buttons[6] = "Clear All";
        opts.buttonIds[6] = "clearAll";
        opts.buttons[7] = "Page Up";
        opts.buttonIds[7] = "pageUp";
        opts.buttons[13] = "Test Editor Ok";
        opts.buttonIds[13] = "testEditorOk";
        opts.buttons[14] = "Test Editor";
        opts.buttonIds[14] = "testEditor";
        opts.buttons[15] = "Page Down";
        opts.buttonIds[15] = "pageDown";


        opts.xc = 8;
        opts.yc = 2;
        opts.xm = 2;
        opts.ym = 2;
        opts.actionFunc = function (iobj) {
            if (iobj.act !== "mouseClick")
                return;
            console.log(iobj);
            self.setPrg(iobj.buttonText, iobj.buttonId);

        };
        opts.buttonAmt = 8;
        opts.fontSize = "0.5rh";
        blocks[cname] = { name: "downButtons", type: "Model~MdaButtons~base.sys0", opts: opts };
        //===========================================================================




        var cname = lyMaps["centerBody"] + "~" + 1;
        //================================

        /*
        var ksObj = opts.ksObj = {};
        var kopts = ksObj.opts = {};
        ksObj.name = "editor";
        ksObj.type = "Component~Cp_base~editor.sys0";
        kopts.readOnly_f = op.readOnly_f;
        kopts.hideNo_f = op.hideNo_f;
        kopts.exName = op.exName;
        kopts.wrapSize = op.wrapSize;
        kopts.nextRow = op.nextRow;
        */

        var opts = {};
        //opts.readOnly_f = 1;
        opts.borderWidth = 1;
        opts.margin = 2;
        opts.editType = "CodeMirror";
        opts.fontSize = 16;
        blocks[cname] = { name: "editor", type: "Component~Cp_base~editor.sys0", opts: opts };
        //====================================================================================



    }
}




