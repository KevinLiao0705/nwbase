class SipphoneWeb {
    constructor() {
        gr.hideWavePageElem = null;
        gr.sipphoneData = {};
        gr.socketRetPrgTbl["tick"] = function (sipphoneData) {
            var keys = Object.keys(sipphoneData);
            for (var i = 0; i < keys.length; i++) {
                var strA = keys[i].split("#");
                if (strA.length === 1) {
                    gr.sipphoneData[keys[i]] = sipphoneData[keys[i]];
                    continue;
                }
                if (strA.length === 2) {
                    var inx0 = KvLib.toInt(strA[1], 0);
                    gr.sipphoneData[strA[0]][inx0] = sipphoneData[keys[i]];
                    continue;
                }
            }
            gr.sipphoneData.rxed_f = 1;
            gr.webSocketConnectTime = 0;
            console.log("sipphoneData");
        };


    }

    initOpts(md)
    {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);
        return opts;
    }

    chkWatch() {
        var self = this;
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        ws.tick();
        st.watchDataA = ["", "", "", "", "", "", ""];
        if (gr.sipphoneData) {
            st.watchDataA[0] = gr.sipphoneData.realSipphoneIp;
            st.watchDataA[1] = gr.sipphoneData.realSipphoneMac;
            st.watchDataA[2] = gr.sipphoneData.sipName;
            st.watchDataA[3] = gr.sipphoneData.sipNo;
            st.watchDataA[4] = gr.sipphoneData.sipServerIp;
            st.watchDataA[5] = gr.sipphoneData.ntppServerIp;
            st.watchDataA[6] = gr.sipphoneData.version + "-" + gr.version;
        }
        gr.footBarStatus2 = "Connected " + (gr.webSocketConnectCnt % 10);
        gr.webSocketConnectTime++;
        if (gr.webSocketConnectTime >= 60) {
            if (gr.sipphoneData) {
                gr.sipphoneData.status = "";
                gr.sipphoneData.action = "";

            }

        }


    }

    setPrg(title) {
        var self = this;
        var md = self.md;
        var op = md.opts;
        var opts = {};
        var setOptsA = [];
        opts.ksObjWs = [9999];

        if (title === "電話使用介面") {
            var opts = {};
            opts.actionFunc = function (iobj) {
                console.log(iobj);
                var strA = iobj.key.split('#');
                if (strA[0] === "reDirect") {
                    if (gr.sipphoneData.phoneFlag & 1) {
                        var sipCmd = "Redirect -a off\n";
                        //ws.cmd("sipCommandDirect", [sipCmd]);
                        ws.cmd("phoneCommand", ["reDirect " + "reset"]);
                        return;
                    }
                    var opts = {};
                    opts.title = "無條件轉接號碼";
                    opts.actionFunc = function (iobj) {
                        console.log(iobj);
                        if (iobj.act === "padEnter") {
                            if (iobj.inputText.length !== 0) {
                                var sipCmd = "Redirect -t always " + iobj.inputText + "\n";
                                //ws.cmd("sipCommandDirect", [sipCmd]);
                                ws.cmd("phoneCommand", ["reDirect " + iobj.inputText]);
                                return;
                            }
                        }
                    };
                    box.intPadBox(opts);
                    return;
                }
                if (strA[0] === "transfer") {
                    var opts = {};
                    opts.title = "轉接號碼";
                    opts.actionFunc = function (iobj) {
                        console.log(iobj);
                        if (iobj.act === "padEnter") {
                            ws.cmd("phoneCommand", ["transferNumber " + iobj.inputText]);
                            return;
                        }
                    };
                    box.intPadBox(opts);
                    return;
                }
                ws.cmd("phoneCommand", [iobj.key]);
            };
            var kvObj = new Block("phoneBox", "Model~MdbPhoneBox~base.sys0", opts);
            mda.popObj(800, 9999, kvObj);
            return;
        }

        if (title === "電話設定") {
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "phoneType"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "sipName"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "sipNumber"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "ipType"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "systemIpAddress"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "systemNetMask"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "systemGateWay"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "sipServerAddress"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "sipServerPassword"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "ringTime"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "autoAnswer"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "autoAnswerWaitTime"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "earPhoneVolume"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "setPhoneVolume"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "broadcastContext"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "broadcastPort"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "roipDialNumber"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "roipDialPushCount"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "roipCutPushCount"}));
        }

        if (title === "系統設定") {
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "adminName"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "adminPassword"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "ntpServerAddress"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "ntpAdjTime"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "setAllCnt"}));

        }

        if (title === "快撥鍵設定") {
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "hotLineName#1"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "hotLineNumber#1"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "hotLineName#2"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "hotLineNumber#2"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "hotLineName#3"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "hotLineNumber#3"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "hotLineName#4"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "hotLineNumber#4"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "hotLineName#5"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "hotLineNumber#5"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "hotLineName#6"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "hotLineNumber#6"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "hotLineName#7"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "hotLineNumber#7"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "hotLineName#8"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "hotLineNumber#8"}));
            opts.ksObjWsR = {};
            opts.ksObjWsR.r0 = ["0.7rw", 9999];
            opts.ksObjWsR.r1 = ["0.7rw", 9999];
            opts.ksObjWsR.r2 = ["0.7rw", 9999];
            opts.ksObjWsR.r3 = ["0.7rw", 9999];
            opts.ksObjWsR.r4 = ["0.7rw", 9999];
            opts.ksObjWsR.r5 = ["0.7rw", 9999];
            opts.ksObjWsR.r6 = ["0.7rw", 9999];
            opts.ksObjWsR.r7 = ["0.7rw", 9999];
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

        };
        box.setLineBox(opts);
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
        layouts[cname] = {name: cname, type: "Layout~Ly_base~array.sys0", opts: opts};
        lyMaps["body"] = cname;
        var opts = {};
        md.setPns(opts);
        opts.mouseClick_f = 1;
        opts.baseColor = "#222";
        blocks[cname] = {name: "basePanel", type: "Component~Cp_base~plate.none", opts: opts};
        //======================================    
        var cname = lyMaps["body"] + "~" + 0;
        var opts = {};
        opts.yArr = [50, 70, 9999, 20];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["mainBody"] = cname;
        //==============================

        var cname = lyMaps["mainBody"] + "~" + 0;
        var actionPrg = function (iobj) {
            console.log(iobj);
            if (iobj.kvObj.opts.itemId === "save")
                mac.saveParaSetAll("responseDialogOk");
            if (iobj.kvObj.opts.itemId === "esc")
                window.close();
        };
        mac.setHeadTitleBar(md, cname, "JOSN SIP 電話系統", actionPrg, ["save", "esc"]);
        //==============================
        var cname = lyMaps["mainBody"] + "~" + 3;
        mac.setFootBar(md, cname);

        var cname = lyMaps["mainBody"] + "~" + 1;
        var opts = {};
        opts.buttons = ["電話設定", "系統設定", "快撥鍵設定", "電話使用介面"];
        opts.buttonIds = ["sipphoneSet", "sysSet", "hotlineSet", "phoneUi"];
        opts.actionFunc = function (iobj) {
            if (iobj.act !== "mouseClick")
                return;
            console.log(iobj);


            self.setPrg(iobj.buttonText);
            return;
            gr.appType = "Model~MdaMdTest~base.sys0";
            sys.dispWebPage();
            return;

        };
        opts.buttonAmt = 4;
        opts.fontSize = "0.5rh";
        blocks[cname] = {name: "headButtons", type: "Model~MdaButtons~base.sys0", opts: opts};
        //==============================

        var cname = lyMaps["mainBody"] + "~" + 2;
        //==============================
        var regName = "self.fatherMd.fatherMd.fatherMd.fatherMd.stas.watchDataA";
        var setOptsA = [];
        setOptsA.push(sopt.getParaSetOpts({paraSetName: "systemName"}));


        var setOpts = sopt.getParaSetOpts({paraSetName: "version"});
        var watchDatas = setOpts.watchDatas = [];
        watchDatas.push(["directReg", regName + "#6", "editValue", 1]);
        setOptsA.push(setOpts);
        //

        var setOpts = sopt.getParaSetOpts({paraSetName: "systemMacAddress"});
        var watchDatas = setOpts.watchDatas = [];
        watchDatas.push(["directReg", regName + "#1", "editValue", 1]);
        setOptsA.push(setOpts);

        setOptsA.push(sopt.getParaSetOpts({paraSetName: "systemId"}));

        var setOpts = sopt.getParaSetOpts({paraSetName: "sipName"});
        var watchDatas = setOpts.watchDatas = [];
        watchDatas.push(["directReg", regName + "#2", "editValue", 1]);
        setOptsA.push(setOpts);

        var setOpts = sopt.getParaSetOpts({paraSetName: "sipNumber"});
        var watchDatas = setOpts.watchDatas = [];
        watchDatas.push(["directReg", regName + "#3", "editValue", 1]);
        setOptsA.push(setOpts);


        var setOpts = sopt.getParaSetOpts({paraSetName: "systemIpAddress"});
        var watchDatas = setOpts.watchDatas = [];
        watchDatas.push(["directReg", regName + "#0", "editValue", 1]);
        setOptsA.push(setOpts);


        var setOpts = sopt.getParaSetOpts({paraSetName: "sipServerAddress"});
        var watchDatas = setOpts.watchDatas = [];
        watchDatas.push(["directReg", regName + "#4", "editValue", 1]);
        setOptsA.push(setOpts);

        var setOpts = sopt.getParaSetOpts({paraSetName: "ntpServerAddress"});
        var watchDatas = setOpts.watchDatas = [];
        watchDatas.push(["directReg", regName + "#5", "editValue", 1]);
        setOptsA.push(setOpts);


        var setObjs = [];
        var inx = 0;
        for (var ii = 0; ii < setOptsA.length; ii++) {
            var ksObj = {};
            ksObj.name = "setLine#" + ii;
            ksObj.type = "Model~MdaSetLine~base.sys0";
            var kopts = ksObj.opts = {};
            kopts.setOpts = setOptsA[ii];
            kopts.setOpts.setType = "inputText";
            kopts.setOpts.dataType = "str";
            kopts.setOpts.checkType = "str";
            kopts.setOpts.actButtons = [];
            kopts.setOpts.titleWidth = 400;
            kopts.setOpts.readOnly_f = 1;
            kopts.setOpts.editBaseColor = "#e8e8ff";
            setObjs.push(ksObj);
        }
        //================================
        var opts = {};
        opts.ksObjss = [];
        var inx = 0;
        for (var i = 0; i < setOptsA.length; i++) {
            var ksObjs = [];
            for (var j = 0; j < 1; j++) {
                if (inx >= setObjs.length)
                    break;
                var ksObj = setObjs[inx];
                ksObjs.push(ksObj);
                inx++;
            }
            if (j >= 1)
                opts.ksObjss.push(ksObjs);
        }
        opts.ksObjWs = [9999];
        var obj = mac.setLineBoxOpts(opts);
        obj.opts.title = "";
        blocks[cname] = {name: "infPanel", type: obj.type, opts: obj.opts};

    }
}




class SipphoneUiWeb {
    constructor() {
        gr.sipphoneUiData = {};
        gr.socketRetPrgTbl["tick"] = function (sipphoneUiData) {
            var keys = Object.keys(sipphoneUiData);
            for (var i = 0; i < keys.length; i++) {
                var strA = keys[i].split("#");
                if (strA.length === 1) {
                    gr.sipphoneUiData[keys[i]] = sipphoneUiData[keys[i]];
                    continue;
                }
                if (strA.length === 2) {
                    var inx0 = KvLib.toInt(strA[1], 0);
                    gr.sipphoneUiData[strA[0]][inx0] = sipphoneUiData[keys[i]];
                    continue;
                }
            }
            gr.sipphoneUiData.rxed_f = 1;
            //console.log("sipphoneUiData");
        };


    }

    initOpts(md)
    {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);
        return opts;
    }

    chkWatch() {
        var self = this;
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        if (gr.paraSet.emulate !== 1)
            ws.tick();

        st.watchDataA = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
        if (gr.sipphoneUiData) {
            st.watchDataA[0] = gr.sipphoneUiData.realMac;
            if (gr.sipphoneUiData.ipMode) {
                st.watchDataA[1] = gr.sipphoneUiData.carTypeName;
                st.watchDataA[2] = gr.sipphoneUiData.carTypeNo;
            } else {
                st.watchDataA[1] = "---";
                st.watchDataA[2] = "---";

            }
            st.watchDataA[3] = gr.sipphoneUiData.sipName;
            st.watchDataA[4] = gr.sipphoneUiData.sipNo;
            st.watchDataA[5] = gr.sipphoneUiData.realIp;
            st.watchDataA[6] = gr.sipphoneUiData.sipPhoneIp;
            st.watchDataA[7] = gr.sipphoneUiData.sipServerIp;
            st.watchDataA[8] = gr.sipphoneUiData.switchIp;
            st.watchDataA[9] = gr.sipphoneUiData.ntpIp;
            st.watchDataA[10] = gr.sipphoneUiData.version + "-" + gr.version;

        }
        gr.footBarStatus2 = "Connected " + (gr.webSocketConnectCnt % 10);



    }

    setPrg(id, setId) {
        var self = this;
        var md = self.md;
        var op = md.opts;
        var opts = {};
        var setOptsA = [];
        opts.ksObjWs = [9999];
        if (id === "SIP電話設定") {
            screen.availWidth;
            screen.availHeight;
            var features = "width=" + screen.availWidth;
            features += ",height=" + screen.availHeight;
            features += ",resizable=yes";
            features += ",scrollbars=yes";
            window.open("http://" + gr.sipphoneUiData.sipPhoneIp, "myNewWindow", features);
            return;
            var opts = {};
            opts.actionFunc = function (iobj) {
                console.log(iobj);
                var strA = iobj.key.split('#');
                if (strA[0] === "reDirect") {
                    if (gr.sipphoneData.phoneFlag & 1) {
                        var sipCmd = "Redirect -a off\n";
                        ws.cmd("sipCommandDirect", [sipCmd]);
                        return;
                    }


                    var opts = {};
                    opts.title = "無條件轉接號碼";
                    opts.actionFunc = function (iobj) {
                        console.log(iobj);
                        if (iobj.act === "padEnter") {
                            if (iobj.inputText.length !== 0) {
                                var sipCmd = "Redirect -t always " + iobj.inputText + "\n";
                                ws.cmd("phoneCommand", [iobj.key + " " + iobj.inputText]);
                                //ws.cmd("sipCommandDirect", [sipCmd]);
                                return;
                            }
                        }
                        /*
                         sipCommand = "Redirect -t always " + Input.ret_str + "\n";
                         } else {
                         sipCommand = "Redirect -a off\n";
                         */


                    };
                    box.intPadBox(opts);
                    return;
                }
                ws.cmd("phoneCommand", [iobj.key]);
            };
            var kvObj = new Block("phoneBox", "Model~MdbPhoneBox~base.sys0", opts);
            mda.popObj(800, 9999, kvObj);

            return;

        }


        if (id === "車型設定") {
            var opts = {};
            opts.actionFunc = function (iobj) {
                console.log(iobj);
                if (iobj.act === "save") {
                    gr.paraSet.carTypeNames = iobj.names;
                    var fileName = "paraSet";
                    var content = JSON.stringify(gr.paraSet);
                    sv.saveStringToFile("responseDialogError", null, fileName, content);
                    MdaPopWin.popOffTo(iobj.sender.opts.popStackCnt);
                    return;

                }
                if (iobj.senderName === "setHeadTitleBar") {
                    if (iobj.act === "mouseClick") {
                        if (iobj.kvObj.opts.itemId === "esc")
                            MdaPopWin.popOffTo(iobj.sender.opts.popStackCnt);
                    }
                }
            };
            opts.names = gr.paraSet.carTypeNames;
            opts.title = id;
            opts.itemName = "車型名稱";
            var kvObj = new Block("mdaBox", "Model~NamesMenu~base.sys0", opts);
            mda.popObj(800, 600, kvObj);
            return;

        }

        if (id === "車號設定") {
            var opts = {};
            opts.kvTexts = gr.paraSet.carTypeNames;
            opts.actionFunc = function (iobj) {
                console.log(iobj);
                if (iobj.act === "selected") {
                    var carTypeNos = "carTypeNos#" + iobj.selectText;
                    var carTypeName = iobj.selectText;
                    var opts = {};
                    opts.actionFunc = function (iobj) {
                        console.log(iobj);
                        if (iobj.act === "actButtonClick") {
                            var carNo = iobj.kvObj.opts.setOpts.value;
                            self.setPrg("車號內容設定", "content#" + carTypeName + "#" + carNo);
                            return;
                        }
                        if (iobj.act === "save") {
                            gr.paraSet[carTypeNos] = iobj.names;
                            MdaPopWin.popOffTo(iobj.sender.opts.popStackCnt);
                            return;
                        }
                        if (iobj.senderName === "setHeadTitleBar") {
                            if (iobj.act === "mouseClick") {
                                if (iobj.kvObj.opts.itemId === "esc")
                                    MdaPopWin.popOffTo(iobj.sender.opts.popStackCnt);
                            }
                        }
                    };
                    opts.names = gr.paraSet[carTypeNos];
                    opts.title = iobj.selectText + " 車號設定";
                    opts.itemName = "車號名稱";
                    opts.actAble_f = 1;
                    var kvObj = new Block("mdaBox", "Model~NamesMenu~base.sys0", opts);
                    mda.popObj(800, 600, kvObj);
                    return;




                }
            };
            box.selectBox(opts);
            return;


        }

        if (id === "系統設定") {
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "adminName"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "adminPassword"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "settingPassword"}));




            var setOpts = sopt.getParaSetOpts({paraSetName: "ipMode"});
            var ipMode = setOpts.value;
            setOptsA.push(setOpts);
            if (ipMode === 0) {
                var buttons = [];
                var readOnly_f = 0;

            } else {
                var buttons = ["pull"];
                var readOnly_f = 1;
            }
            var setOpts = sopt.getParaSetOpts({paraSetName: "nowCarTypeName"});
            setOpts.enum = gr.paraSet["carTypeNames"];
            setOpts.actButtons = buttons;
            setOptsA.push(setOpts);

            var paraKey = "carTypeNos#" + gr.paraSet["nowCarTypeName"];
            var setOpts = sopt.getParaSetOpts({paraSetName: "nowCarTypeNo"});
            if (gr.paraSet[paraKey])
                setOpts.enum = gr.paraSet[paraKey];
            else
                setOpts.enum = [];
            setOpts.actButtons = buttons;
            setOptsA.push(setOpts);

            var setOpts = sopt.getParaSetOpts({paraSetName: "systemIpAddress"});
            setOpts.readOnly_f = readOnly_f;
            setOptsA.push(setOpts);

            var setOpts = sopt.getParaSetOpts({paraSetName: "switchIpAddress"});
            setOpts.readOnly_f = readOnly_f;
            setOptsA.push(setOpts);


            var setOpts = sopt.getParaSetOpts({paraSetName: "sipName"});
            setOpts.readOnly_f = readOnly_f;
            setOptsA.push(setOpts);

            var setOpts = sopt.getParaSetOpts({paraSetName: "sipNumber"});
            setOpts.readOnly_f = readOnly_f;
            setOptsA.push(setOpts);

            var setOpts = sopt.getParaSetOpts({paraSetName: "sipphoneIpAddress"});
            setOpts.readOnly_f = readOnly_f;
            setOptsA.push(setOpts);

            var setOpts = sopt.getParaSetOpts({paraSetName: "sipServerAddress"});
            setOpts.readOnly_f = readOnly_f;
            setOptsA.push(setOpts);


            var setOpts = sopt.getParaSetOpts({paraSetName: "ntpServerAddress"});
            setOpts.readOnly_f = readOnly_f;
            setOptsA.push(setOpts);



            setOptsA.push(sopt.getParaSetOpts({paraSetName: "ntpAdjTime"}));

            setOptsA.push(sopt.getParaSetOpts({paraSetName: "systemNetMask"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "systemGateWay"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "sipphoneNetMask"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "sipphoneGateWay"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "switchNetMask"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "switchGateWay"}));

            setOptsA.push(sopt.getParaSetOpts({paraSetName: "setAllCnt"}));


        }

        if (id === "車號內容設定") {
            var values = gr.paraSet[setId];
            if (!values)
                values = ["kevin", "100", "192.168.0.0", "192.168.0.0", "192.168.0.0", "192.168.0.0", "192.168.0.0"];
            //sipName,sipNumber,localIp,sipIp,sipServer,switchServer,ntpServer

            var setOpts = sopt.getOptsPara("ipStr");
            setOpts.title = "本機 IP";
            setOpts.value = values[2];
            setOptsA.push(setOpts);

            var setOpts = sopt.getOptsPara("ipStr");
            setOpts.title = "交換器 IP";
            setOpts.value = values[5];
            setOptsA.push(setOpts);


            var setOpts = sopt.getOptsPara("str");
            setOpts.title = "電話名稱";
            setOpts.value = values[0];
            setOptsA.push(setOpts);


            var setOpts = sopt.getOptsPara("natureStr");
            setOpts.title = "電話號碼";
            setOpts.value = values[1];
            setOptsA.push(setOpts);


            var setOpts = sopt.getOptsPara("ipStr");
            setOpts.title = "SIP電話 IP";
            setOpts.value = values[3];
            setOptsA.push(setOpts);

            var setOpts = sopt.getOptsPara("ipStr");
            setOpts.title = "SIP伺服器 IP";
            setOpts.value = values[4];
            setOptsA.push(setOpts);


            var setOpts = sopt.getOptsPara("ipStr");
            setOpts.title = "NTP伺服器 IP";
            setOpts.value = values[6];
            setOptsA.push(setOpts);


        }

        if (id === "快撥鍵設定") {
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "hotLineName#1"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "hotLineNumber#1"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "hotLineName#2"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "hotLineNumber#2"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "hotLineName#3"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "hotLineNumber#3"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "hotLineName#4"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "hotLineNumber#4"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "hotLineName#5"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "hotLineNumber#5"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "hotLineName#6"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "hotLineNumber#6"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "hotLineName#7"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "hotLineNumber#7"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "hotLineName#8"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "hotLineNumber#8"}));
            opts.ksObjWsR = {};
            opts.ksObjWsR.r0 = ["0.7rw", 9999];
            opts.ksObjWsR.r1 = ["0.7rw", 9999];
            opts.ksObjWsR.r2 = ["0.7rw", 9999];
            opts.ksObjWsR.r3 = ["0.7rw", 9999];
            opts.ksObjWsR.r4 = ["0.7rw", 9999];
            opts.ksObjWsR.r5 = ["0.7rw", 9999];
            opts.ksObjWsR.r6 = ["0.7rw", 9999];
            opts.ksObjWsR.r7 = ["0.7rw", 9999];
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
        opts.title = id;
        opts.w = "0.9rw";
        opts.h = "0.9rh";
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            if (iobj.act === "checkChanged") {
                if (iobj.setOptsObj.opts.setOpts.paraSetName === "ipMode") {
                    var readOnly_f = 1;
                    if (iobj.setOptsObj.opts.setOpts.value === 1)
                        readOnly_f = 0;
                    if (readOnly_f)
                        var buttons = [];
                    else
                        var buttons = ["pull"];
                    mac.setLineContainerSet(iobj.setOptsObj.fatherMd, "nowCarTypeName", {actButtons: buttons});
                    mac.setLineContainerSet(iobj.setOptsObj.fatherMd, "nowCarTypeNo", {actButtons: buttons});
                    readOnly_f ^= 1;
                    mac.setLineContainerSet(iobj.setOptsObj.fatherMd, "sipName", {readOnly_f: readOnly_f});
                    mac.setLineContainerSet(iobj.setOptsObj.fatherMd, "sipNumber", {readOnly_f: readOnly_f});
                    mac.setLineContainerSet(iobj.setOptsObj.fatherMd, "systemIpAddress", {readOnly_f: readOnly_f});
                    mac.setLineContainerSet(iobj.setOptsObj.fatherMd, "sipphoneIpAddress", {readOnly_f: readOnly_f});
                    mac.setLineContainerSet(iobj.setOptsObj.fatherMd, "sipServerAddress", {readOnly_f: readOnly_f});
                    mac.setLineContainerSet(iobj.setOptsObj.fatherMd, "switchIpAddress", {readOnly_f: readOnly_f});
                    mac.setLineContainerSet(iobj.setOptsObj.fatherMd, "ntpServerAddress", {readOnly_f: readOnly_f});
                }

                if (iobj.setOptsObj.opts.setOpts.paraSetName === "nowCarTypeName") {
                    var setLineContainer = iobj.setOptsObj.fatherMd;
                    //=================================================
                    var ksObjss = setLineContainer.opts.ksObjss;
                    var keys = Object.keys(setLineContainer.blockRefs);
                    for (var i = 0; i < keys.length; i++) {
                        var strA = keys[i].split("#");
                        if (strA[0] !== "setLine")
                            continue;
                        var setObj = setLineContainer.blockRefs[keys[i]];
                        if (setObj.opts.setOpts.paraSetName !== "nowCarTypeNo")
                            continue;
                        setObj.opts.setOpts.value = "";
                        var paraKey = "carTypeNos#" + iobj.value;
                        if (gr.paraSet[paraKey])
                            setObj.opts.setOpts.enum = gr.paraSet[paraKey];
                        else
                            setObj.opts.setOpts.enum = [];
                        setObj.reCreate();
                        return;
                    }
                    return;
                }
                return;
            }
            if (iobj.act !== "mouseClick")
                return;
            if (iobj.buttonId !== "ok")
                return;
            if (id === "車號內容設定") {
                var values = [];
                values.push(iobj.ksObjss[2][0].opts.setOpts.value);
                values.push(iobj.ksObjss[3][0].opts.setOpts.value);
                values.push(iobj.ksObjss[0][0].opts.setOpts.value);
                values.push(iobj.ksObjss[4][0].opts.setOpts.value);
                values.push(iobj.ksObjss[5][0].opts.setOpts.value);
                values.push(iobj.ksObjss[1][0].opts.setOpts.value);
                values.push(iobj.ksObjss[6][0].opts.setOpts.value);
                gr.paraSet[setId] = values;
            } else {
                mac.saveSetOpts(iobj.ksObjss, gr.paraSet);
            }
            //mac.saveParaSetAll();

        };
        box.setLineBox(opts);


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
        layouts[cname] = {name: cname, type: "Layout~Ly_base~array.sys0", opts: opts};
        lyMaps["body"] = cname;
        var opts = {};
        md.setPns(opts);
        opts.mouseClick_f = 1;
        opts.baseColor = "#222";
        blocks[cname] = {name: "basePanel", type: "Component~Cp_base~plate.none", opts: opts};
        //======================================    
        var cname = lyMaps["body"] + "~" + 0;
        var opts = {};
        opts.yArr = [50, 70, 9999, 20];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["mainBody"] = cname;
        //==============================

        var cname = lyMaps["mainBody"] + "~" + 0;
        var actionPrg = function (iobj) {
            console.log(iobj);

        };
        var actionPrg = function (iobj) {
            console.log(iobj);
            if (iobj.kvObj.opts.itemId === "esc") {
                window.close();
                return;
            }
            if (iobj.kvObj.opts.itemId !== "save")
                return;

            var keys = Object.keys(gr.paraSet);
            for (var i = 0; i < keys.length; i++) {
                var strA = keys[i].split("#");
                if (strA[0] !== "content")
                    continue;
                var names = gr.paraSet["carTypeNames"];
                var yes_f = 0;
                for (var j = 0; j < names.length; j++) {
                    if (names[j] === strA[1]) {
                        yes_f = 1;
                        break;
                    }
                }
                if (!yes_f) {
                    delete gr.paraSet[keys[i]];
                    continue;
                }

                var names = gr.paraSet["carTypeNos#" + strA[1]];
                var yes_f = 0;
                for (var j = 0; j < names.length; j++) {
                    if (names[j] === strA[2]) {
                        yes_f = 1;
                        break;
                    }
                }
                if (!yes_f) {
                    delete gr.paraSet[keys[i]];
                    continue;
                }
            }
            delete gr.paraSet["dec~end"];
            gr.paraSet["dec~end"] = 0;
            mac.saveParaSetAll("responseDialogOk");
            if (iobj.kvObj.opts.itemId === "esc")
                window.close();
        };
        mac.setHeadTitleBar(md, cname, "車載二合一 電話系統", actionPrg, ["save", "esc"]);

        //==============================
        var cname = lyMaps["mainBody"] + "~" + 3;
        mac.setFootBar(md, cname);

        var cname = lyMaps["mainBody"] + "~" + 1;
        var opts = {};
        opts.buttons = ["系統設定", "車型設定", "車號設定", "快撥鍵設定", "SIP電話設定"];
        //opts.buttons = ["系統設定", "車型設定", "車號設定", "快撥鍵設定"];
        opts.buttonIds = ["sipphoneSet", "sysSet", "hotlineSet", "phoneUi"];
        opts.actionFunc = function (iobj) {
            if (iobj.act !== "mouseClick")
                return;
            console.log(iobj);
            self.setPrg(iobj.buttonText);
            return;

        };
        opts.buttonAmt = 5;
        opts.fontSize = "0.5rh";
        blocks[cname] = {name: "headButtons", type: "Model~MdaButtons~base.sys0", opts: opts};
        //==============================

        var cname = lyMaps["mainBody"] + "~" + 2;
        //==============================
        var setOptsA = [];
        setOptsA.push(sopt.getParaSetOpts({paraSetName: "systemName"}));



        var regName = "self.fatherMd.fatherMd.fatherMd.fatherMd.stas.watchDataA";
        var setOpts = sopt.getParaSetOpts({paraSetName: "version"});
        var watchDatas = setOpts.watchDatas = [];
        watchDatas.push(["directReg", regName + "#10", "editValue", 1]);
        setOptsA.push(setOpts);


        //===============
        var setOpts = sopt.getParaSetOpts({paraSetName: "systemMacAddress"});
        var watchDatas = setOpts.watchDatas = [];
        watchDatas.push(["directReg", regName + "#0", "editValue", 1]);
        setOptsA.push(setOpts);

        setOptsA.push(sopt.getParaSetOpts({paraSetName: "systemId"}));


        var setOpts = sopt.getParaSetOpts({paraSetName: "nowCarTypeName"});
        var watchDatas = setOpts.watchDatas = [];
        watchDatas.push(["directReg", regName + "#1", "editValue", 1]);
        setOptsA.push(setOpts);

        var setOpts = sopt.getParaSetOpts({paraSetName: "nowCarTypeNo"});
        var watchDatas = setOpts.watchDatas = [];
        watchDatas.push(["directReg", regName + "#2", "editValue", 1]);
        setOptsA.push(setOpts);

        var setOpts = sopt.getParaSetOpts({paraSetName: "systemIpAddress"});
        var watchDatas = setOpts.watchDatas = [];
        watchDatas.push(["directReg", regName + "#5", "editValue", 1]);
        setOptsA.push(setOpts);

        var setOpts = sopt.getParaSetOpts({paraSetName: "switchIpAddress"});
        var watchDatas = setOpts.watchDatas = [];
        watchDatas.push(["directReg", regName + "#8", "editValue", 1]);
        setOptsA.push(setOpts);
        //===============================



        var setOpts = sopt.getParaSetOpts({paraSetName: "sipName"});
        var watchDatas = setOpts.watchDatas = [];
        watchDatas.push(["directReg", regName + "#3", "editValue", 1]);
        setOptsA.push(setOpts);

        var setOpts = sopt.getParaSetOpts({paraSetName: "sipNumber"});
        var watchDatas = setOpts.watchDatas = [];
        watchDatas.push(["directReg", regName + "#4", "editValue", 1]);
        setOptsA.push(setOpts);
        //========================
        //===============================
        var setOpts = sopt.getParaSetOpts({paraSetName: "sipphoneIpAddress"});
        var watchDatas = setOpts.watchDatas = [];
        watchDatas.push(["directReg", regName + "#6", "editValue", 1]);
        setOptsA.push(setOpts);
        //===============================
        var setOpts = sopt.getParaSetOpts({paraSetName: "sipServerAddress"});
        var watchDatas = setOpts.watchDatas = [];
        watchDatas.push(["directReg", regName + "#7", "editValue", 1]);
        setOptsA.push(setOpts);
        //===============================
        var setOpts = sopt.getParaSetOpts({paraSetName: "ntpServerAddress"});
        var watchDatas = setOpts.watchDatas = [];
        watchDatas.push(["directReg", regName + "#9", "editValue", 1]);
        setOptsA.push(setOpts);
        //===============================
        var setObjs = [];
        var inx = 0;
        for (var ii = 0; ii < setOptsA.length; ii++) {
            var ksObj = {};
            ksObj.name = "setLine#" + ii;
            ksObj.type = "Model~MdaSetLine~base.sys0";
            var kopts = ksObj.opts = {};
            kopts.setOpts = setOptsA[ii];
            kopts.setOpts.setType = "inputText";
            kopts.setOpts.dataType = "str";
            kopts.setOpts.checkType = "str";
            kopts.setOpts.actButtons = [];
            kopts.setOpts.titleWidth = 400;
            kopts.setOpts.readOnly_f = 1;
            kopts.setOpts.editBaseColor = "#e8e8ff";
            setObjs.push(ksObj);
        }
        //================================
        var opts = {};
        opts.ksObjss = [];
        var inx = 0;
        for (var i = 0; i < setOptsA.length; i++) {
            var ksObjs = [];
            for (var j = 0; j < 1; j++) {
                if (inx >= setObjs.length)
                    break;
                var ksObj = setObjs[inx];
                ksObjs.push(ksObj);
                inx++;
            }
            if (j >= 1)
                opts.ksObjss.push(ksObjs);
        }
        opts.ksObjWs = [9999];
        var obj = mac.setLineBoxOpts(opts);
        obj.opts.title = "";
        blocks[cname] = {name: "infPanel", type: obj.type, opts: obj.opts};

    }
}





class NamesMenu {
    constructor() {


    }

    initOpts(md)
    {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);
        opts.itemName = "itemName";
        opts.names = [];
        for (var i = 0; i < 33; i++)
            opts.names.push("name " + (i + 1));
        opts.titleWidth = 200;
        opts.dispNo_f = 1;
        opts.editAble_f = 1;
        opts.actAble_f = 0;
        opts.col = 1;
        opts.wsA = [9999];
        opts.checkWidth = 40;
        opts.noWidth = 40;
        return opts;
    }

    chkWatch() {

    }

    newSetOpts(value, no) {
        var self = this;
        var md = self.md;
        var op = md.opts;
        var sopts = sopt.getOptsPara("str");
        sopts.title = op.itemName;
        sopts.value = value;
        sopts.titleWidth = op.titleWidth;
        sopts.readOnly_f = 1;
        sopts.nullErr_f = 1;
        sopts.checkWidth = op.checkWidth;
        if (op.dispNo_f) {
            sopts.noWidth = op.noWidth;
            sopts.no = no;
        }
        sopts.editBaseColor = "#e8e8ff";
        sopts.actButtons = [];
        if (op.editAble_f)
            sopts.actButtons.push("edit");
        if (op.actAble_f)
            sopts.actButtons.push("act");
        return sopts;

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
        layouts[cname] = {name: cname, type: "Layout~Ly_base~array.sys0", opts: opts};
        lyMaps["body"] = cname;
        var opts = {};
        md.setPns(opts);
        opts.mouseClick_f = 1;
        opts.baseColor = "#222";
        blocks[cname] = {name: "basePanel", type: "Component~Cp_base~plate.none", opts: opts};
        //======================================    
        var cname = lyMaps["body"] + "~" + 0;
        var opts = {};
        opts.yArr = [50, 60, 9999];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["mainBody"] = cname;
        //==============================

        var cname = lyMaps["mainBody"] + "~" + 0;
        var actionPrg = function (iobj) {
            console.log(iobj);
            iobj.senderName = "setHeadTitleBar";
            iobj.sender = md;
            KvLib.exe(op.actionFunc, iobj);
        };
        mac.setHeadTitleBar(md, cname, op.title, actionPrg);
        //==============================

        var cname = lyMaps["mainBody"] + "~" + 1;


        var opts = {};
        opts.buttons = [];
        opts.buttonIds = [];
        opts.buttons.push('<i class="gf">&#xe834</i>');
        opts.buttonIds.push("selectAll");
        opts.buttons.push('<i class="gf">&#xe835</i>');
        opts.buttonIds.push("selectClear");
        opts.buttons.push('<i class="gf">&#xe5d8</i>');
        opts.buttonIds.push("selectUp");
        opts.buttons.push('<i class="gf">&#xe5db</i>');
        opts.buttonIds.push("selectDown");
        opts.buttons.push('<i class="gf">&#xe145</i>');
        opts.buttonIds.push("add");
        opts.buttons.push('<i class="gf">&#xe15b</i>');
        opts.buttonIds.push("sub");
        opts.buttons.push('<i class="gf">&#xe161</i>');
        opts.buttonIds.push("save");
        opts.iw = 60;
        opts.xm = 10;
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            if (iobj.act === "mouseClick") {
                var setLineBoxObj = md.blockRefs["setLineBox"];
                var containerObj = setLineBoxObj.blockRefs["mainMd"];
                var ksObjss = containerObj.opts.ksObjss;
                var oobj = {};
                oobj.act = "checkPreChange";
                oobj.sender = setLineBoxObj;
                var errStr = setLineBoxObj.opts.actionFunc(oobj);
                if (errStr)
                    return;
                setLineBoxObj.opts.ksObj.opts.ksObjss = containerObj.opts.ksObjss;

                if (iobj.buttonId === "selectAll" || iobj.buttonId === "selectClear") {
                    var ksObjAA = setLineBoxObj.opts.ksObj.opts.ksObjss;
                    for (var i = 0; i < ksObjAA.length; i++) {
                        var ksObjA = ksObjAA[i];
                        for (var j = 0; j < ksObjA.length; j++) {
                            var ksObj = ksObjA[j];
                            if (ksObj) {
                                if (iobj.buttonId === "selectAll")
                                    ksObj.opts.setOpts.checked_f = 1;
                                else
                                    ksObj.opts.setOpts.checked_f = 0;
                            }
                        }
                    }
                    setLineBoxObj.opts.ksObj.opts.rowStart = containerObj.stas.rowStart;
                    //setLineBoxObj.opts.ksObj.opts.rowStart = containerObj.stas.allLine - containerObj.stas.pageElemAmt + 1;
                    setLineBoxObj.reCreate();


                    return;
                }
                if (iobj.buttonId === "selectClear") {
                    for (var i = 0; i < ksObjss.length; i++) {
                        ksObjs = ksObjss[i];
                        for (var j = 0; j < ksObjs.length; j++) {
                            var setLineObj = containerObj.blockRefs[ksObjs[j].name];
                            setLineObj.opts.setOpts.checked_f = 0;
                            setLineObj.reCreate();
                        }
                    }
                    return;
                }
                var checkAmt = 0;
                var iCnt = 0;
                var jCnt = 0;
                if (iobj.buttonId === "selectUp" || iobj.buttonId === "selectDown") {
                    var setLineAA = setLineBoxObj.opts.ksObj.opts.ksObjss;
                    for (var i = 0; i < setLineAA.length; i++) {
                        var setLineA = setLineAA[i];
                        for (var j = 0; j < setLineA.length; j++) {
                            var setLineObj = setLineA[j];
                            if (setLineObj.opts.setOpts.checked_f) {
                                checkAmt++;
                                iCnt = i;
                                jCnt = j;
                            }
                        }
                    }
                    if (checkAmt !== 1)
                        return;
                    var setLineAA = setLineBoxObj.opts.ksObj.opts.ksObjss;
                    var obj1 = setLineAA[iCnt][jCnt];
                    if (iobj.buttonId === "selectUp")
                        var nextI = iCnt - 1;
                    else
                        var nextI = iCnt + 1;
                    if (nextI < 0)
                        return;
                    if (!setLineAA[nextI])
                        return;
                    var obj2 = setLineAA[nextI][jCnt];
                    if (!obj1 || !obj2)
                        return;
                    var obj1Opts = JSON.parse(JSON.stringify(obj1.opts.setOpts));
                    var obj1No = obj1.opts.setOpts.no;
                    var obj2Opts = JSON.parse(JSON.stringify(obj2.opts.setOpts));
                    var obj2No = obj2.opts.setOpts.no;
                    obj1.opts.setOpts = obj2Opts;
                    obj2.opts.setOpts = obj1Opts;
                    obj1.opts.setOpts.no = obj1No;
                    obj2.opts.setOpts.no = obj2No;
                    if (nextI < setLineBoxObj.opts.ksObj.opts.rowStart)
                        setLineBoxObj.opts.ksObj.opts.rowStart = nextI;
                    if (nextI >= containerObj.stas.rowStart + containerObj.stas.pageElemAmt)
                        setLineBoxObj.opts.ksObj.opts.rowStart = containerObj.stas.rowStart + 1;
                    setLineBoxObj.reCreate();
                    return;
                }
                if (iobj.buttonId === "save") {
                    var oobj = {};
                    oobj.act = "checkPreChange";
                    oobj.sender = setLineBoxObj;
                    var errStr = setLineBoxObj.opts.actionFunc(oobj);
                    if (errStr)
                        return;


                    oobj = {};
                    oobj.act = "save";
                    oobj.sender = md;
                    oobj.kvObj = iobj.kvObj;
                    oobj.names = [];
                    var ksObjAA = containerObj.opts.ksObjss;
                    for (var i = 0; i < ksObjAA.length; i++)
                        oobj.names.push(ksObjAA[i][0].opts.setOpts.value);
                    KvLib.exe(op.actionFunc, oobj);
                    return;

                }
                if (iobj.buttonId === "add") {
                    var opts = {};
                    opts.title = "新增";
                    opts.setOpts = sopt.getOptsStr({});
                    opts.actionFunc = function (iobj) {
                        console.log(iobj);
                        if (iobj.act === "padEnter") {
                            if (!iobj.inputText.trim()) {
                                box.errorBox({kvTexts: ["Input Format Error !!!"]});
                                return;

                            }
                            var ksObjAA = containerObj.opts.ksObjss;
                            for (var i = 0; i < ksObjAA.length; i++) {
                                var ksObjA = ksObjAA[i];
                                for (var j = 0; j < ksObjA.length; j++) {
                                    if (ksObjA[j].opts.setOpts.value === iobj.inputText) {
                                        box.errorBox({kvTexts: ["Input Name Is Existed !!!"]});
                                        return;
                                    }
                                }
                            }

                            var ksObj = {};
                            ksObj.type = "Model~MdaSetLine~base.sys0";
                            ksObj.name = "setLine#" + containerObj.opts.ksObjss.length + ".0";
                            ksObj.opts = {};
                            ksObj.opts.setOpts = self.newSetOpts(iobj.inputText, containerObj.opts.ksObjss.length + 1);


                            containerObj.opts.ksObjss.push([ksObj]);
                            setLineBoxObj.opts.ksObj.opts.ksObjss = containerObj.opts.ksObjss;
                            var rowStart = containerObj.stas.allLine - containerObj.stas.pageElemAmt + 1;
                            if (rowStart < 0)
                                rowStart = 0;
                            setLineBoxObj.opts.ksObj.opts.rowStart = rowStart;
                            setLineBoxObj.reCreate();
                        }
                    };
                    box.keyboardBox(opts);
                    return;



                }
                if (iobj.buttonId === "sub") {
                    var ksObjss = [];
                    var setLineAA = setLineBoxObj.opts.ksObj.opts.ksObjss;
                    var inx = 0;
                    for (var i = 0; i < setLineAA.length; i++) {
                        var setLine = setLineAA[i][0];
                        if (!setLine.opts.setOpts.checked_f) {
                            var newSetLine = {};
                            newSetLine.name = "setLine#" + inx + ".0";
                            newSetLine.opts = setLine.opts;
                            newSetLine.type = setLine.type;
                            newSetLine.opts.setOpts.no = (inx + 1);
                            inx++;
                            ksObjss.push([newSetLine]);
                        }
                    }
                    if (ksObjss.length === setLineAA.length)
                        return;
                    var opts = {};
                    opts.kvTexts = ["Delete All Selection ?"];
                    opts.actionFunc = function (iobj) {
                        console.log(iobj);
                        if (iobj.kvObj.name === "ok") {
                            setLineBoxObj.opts.ksObj.opts.ksObjss = ksObjss;
                            setLineBoxObj.reCreate();
                        }
                    };
                    box.checkBox(opts);
                    return;


                }
            }

        };
        opts.buttonAmt = 7;
        opts.fontSize = "0.9rh";
        blocks[cname] = {name: "headButtons", type: "Model~MdaButtons~base.sys0", opts: opts};

        //============================================================

        var cname = lyMaps["mainBody"] + "~" + 2;
        var row = Math.ceil(op.names.length / op.col);
        var setOptsAA = [];
        var inx = 0;
        for (var i = 0; i < row; i++) {
            var setOptsA = [];
            for (var j = 0; j < op.col; j++) {
                setOptsA.push(self.newSetOpts(op.names[inx], inx + 1));
                inx++;
            }
            setOptsAA.push(setOptsA);
        }
        //==============================================================
        var opts = {};
        opts.ksObjWs = op.wsA;
        opts.ksObjss = [];
        for (var i = 0; i < setOptsAA.length; i++) {
            var ksObjs = [];
            for (var j = 0; j < setOptsAA[i].length; j++) {
                var ksObj = {};
                ksObj.type = "Model~MdaSetLine~base.sys0";
                ksObj.name = "setLine#" + i + "." + j;
                ksObj.opts = {};
                ksObj.opts.setOpts = setOptsAA[i][j];
                ksObjs.push(ksObj);
            }
            opts.ksObjss.push(ksObjs);
        }
        var obj = mac.setLineBoxOpts(opts);
        obj.opts.title = "";
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            iobj.sender = md;
            KvLib.exe(op.actionFunc, iobj);

        };
        blocks[cname] = {name: "setLineBox", type: obj.type, opts: obj.opts};
    }
}





class Sip6In1UiWeb {
    constructor() {
        this.preKey = 0;
        var mdClass = this;
        gr.sipphoneUiData = {};
        gr.socketRetPrgTbl["tick"] = function (sipphoneUiData) {
            var keys = Object.keys(sipphoneUiData);
            for (var i = 0; i < keys.length; i++) {
                var strA = keys[i].split("#");
                if (strA.length === 1) {
                    gr.sipphoneUiData[keys[i]] = sipphoneUiData[keys[i]];
                    continue;
                }
                if (strA.length === 2) {
                    var inx0 = KvLib.toInt(strA[1], 0);
                    gr.sipphoneUiData[strA[0]][inx0] = sipphoneUiData[keys[i]];
                    continue;
                }
            }
            gr.sipphoneUiData.rxed_f = 1;
            var sd = gr.sipphoneUiData;
            if (sd.keyIn !== undefined) {
                if (gr.preKey !== sd.keyIn) {
                    gr.preKey = sd.keyIn;
                    var key = sd.keyIn & 255;
                    if (key !== 255) {
                        mdClass.emuKeyInPrg(key);
                    }
                }
            }
            if (sipphoneUiData["testResult"]) {
                console.log("testResult");
                if (gr.tabInx === 5) {
                    var pnTab5 = mdClass.md.blockRefs["pnTab5"];
                    pnTab5.mdClass.paraSetPrg("viewTest");

                }
            }


        };
    }
    emuKeyInPrg(keyId) {
        var self = this;
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        console.log(keyId);

        var pnTab5 = md.blockRefs["pnTab5"];
        if (pnTab5) {
            var keyPad = pnTab5.stas.keyPad;
            if (keyPad) {
                if (keyId === 25) {
                    MdaPopWin.popOff(2);
                    pnTab5.stas.keyPad = null;
                    return;
                }
                var mdaPad = keyPad.blockRefs["mainMd"];
                var tbl = [1, 2, 3, 5, 6, 7, 9, 10, 11, 14, 13, 25, 20];//1,2,3,4,5,enter
                var tblStr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", ".", "back", "enter"];
                for (var i = 0; i < tbl.length; i++) {
                    if (keyId === tbl[i]) {
                        mdaPad.mdClass.emuKey(tblStr[i]);
                        if (tblStr[i] === "enter")
                            pnTab5.stas.keyPad = null;
                        return;
                    }
                }
                return;
            }

            if (pnTab5.stas.pnSet) {
                if (keyId === 25 || keyId === 20) {
                    MdaPopWin.popOff(2);
                    pnTab5.stas.pnSet = null;
                    return;
                }
                if (keyId === 24) {
                    var kvObj = pnTab5.stas.pnSet;
                    if (kvObj.stas.newMd)
                        var kvObj = kvObj.stas.newMd;
                    if (kvObj.mdClass.prevPage) {
                        kvObj.mdClass.prevPage();
                    }
                    return;
                }
                if (keyId === 26) {
                    var kvObj = pnTab5.stas.pnSet;
                    if (kvObj.stas.newMd)
                        var kvObj = kvObj.stas.newMd;
                    if (kvObj.mdClass.nextPage) {
                        kvObj.mdClass.nextPage();
                    }
                    return;
                }
            }



            var setLineBoxObj = pnTab5.stas.setLineBoxObj;
            if (setLineBoxObj) {
                if (keyId === 25) {
                    MdaPopWin.popOff(2);
                    pnTab5.stas.setLineBoxObj = null;
                    return;
                }
                var tbl = [1, 2, 25, 20];//1,2,esc,enter
                var tblStr = ["1", "2", "esc", "enter"];
                var mainMd = setLineBoxObj.blockRefs["mainMd"];
                var setLineObj = mainMd.blockRefs["setLine#0.0"];
                for (var i = 0; i < tbl.length; i++) {
                    if (keyId === tbl[i]) {
                        if (tblStr[i] === "esc") {
                            MdaPopWin.popOff(2);
                            pnTab5.stas.setLineBoxObj = null;
                            return;
                        }
                        if (tblStr[i] === "enter") {
                            if (setLineObj.opts.setOpts.paraSetName) {
                                gr.paraSet[setLineObj.opts.setOpts.paraSetName] = setLineObj.mdClass.getValue(1);
                                mac.saveParaSetAll();
                            }
                            MdaPopWin.popOff(2);
                            pnTab5.stas.setLineBoxObj = null;
                            return;
                        }
                        if (tblStr[i] === "1") {
                            setLineObj.mdClass.setValue(0, 1);
                            setLineObj.reCreate();
                            return;
                        }
                        if (tblStr[i] === "2") {
                            setLineObj.mdClass.setValue(1, 1);
                            setLineObj.reCreate();
                            return;
                        }
                        return;
                    }
                }
                return;
            }


        }


        if (keyId === 27) {
            if (gr.tabSelect === 0) {
                gr.tabInx++;
                if (gr.tabInx >= 6)
                    gr.tabInx = 0;
                gr.repaint_f = 1;
                return;
            }
        }
        if (keyId === 25) {
            var pnTab5 = md.blockRefs["pnTab5"];
            if (!pnTab5 || pnTab5.opts.actInx===0) {
                gr.tabInx = 0;
                gr.repaint_f = 1;
                return;
            } 
        }



        if (gr.tabInx === 5) {
            if (gr.tabSelect === 0) {
                var tbl = [1, 2, 3, 5, 6, 7, 9, 10];//1,2,3,4,5
                var pnTab5 = md.blockRefs["pnTab5"];
                for (var i = 0; i < tbl.length; i++) {
                    if (keyId === tbl[i]) {
                        var selectObj = pnTab5.blockRefs["selectButtons"];
                        selectObj.mdClass.setSelect(i);
                        break;
                    }
                }
                if (keyId === 20) {//ok
                    var pnTab5 = md.blockRefs["pnTab5"];
                    pnTab5.mdClass.emuKeyIn("ok", 0);
                }
                if (keyId === 25) {//back
                    var pnTab5 = md.blockRefs["pnTab5"];
                    pnTab5.mdClass.emuKeyIn("back", 0);
                }
            }
        }
    }

    initOpts(md)
    {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);
        opts.tabInx = 1;
        opts.uiCmd = "";
        opts.uiCmdParas = 0;

        return opts;
    }
    chkWatch() {
        var self = this;
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        if (gr.paraSet.emulate !== 1)
            var obj = {};
        obj.act = "tick";
        obj.uiStatus = gr.tabInx;
        obj.uiCmd = op.uiCmd;
        obj.uiCmdParas = op.uiCmdParas;
        if (ws.tick(obj)) {
            op.uiCmd = "";
            op.uiCmdParas = 0;
        }
        st.headButtonColors = ["#ccc", "#ccc", "#ccc", "#ccc", "#ccc", "#ccc"];
        if (!gr.tabInx) {
            gr.tabInx = 0;
            gr.tabSelect = 0;
        }
        st.headButtonColors[gr.tabInx] = "#ccf";

        var sd = gr.sipphoneUiData;
        var lcdData = sd.sipLcdData;
        st.lcdDataStr = "";
        if (lcdData) {
            st.lcdDataStr = lcdData;
        }
        st.radioStatusStr = "未連線";
        st.handFreeStatusStr = "未連線";

        st.warningStr = sd.warning;
        if (!st.warningStr) {
            st.warningStr = "";
            st.warningColor = "#0c8";
        } else {
            if (sd.warningColor)
                st.warningColor = sd.warningColor;
        }
        st.messageStr = sd.message;

        //st.warningStr="發射架未連線,請檢查網路";

    }

    setPrg(id, setId) {
        var self = this;
        var md = self.md;
        var op = md.opts;
        var opts = {};
        var setOptsA = [];


    }
    afterCreate() {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        var kvObj = md.blockRefs["headButtons"];
        var regName = "self.fatherMd.fatherMd.stas.headButtonColors#";
        for (var i = 0; i < 6; i++) {
            var but = kvObj.blockRefs["button#" + i];
            Block.setInputWatch(but.opts, "directReg", regName + i, "baseColor", 1);
        }
        st.actInx = 0;


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
        layouts[cname] = {name: cname, type: "Layout~Ly_base~array.sys0", opts: opts};
        lyMaps["body"] = cname;
        var opts = {};
        md.setPns(opts);
        opts.mouseClick_f = 1;
        opts.baseColor = "#0c8";
        blocks[cname] = {name: "basePanel", type: "Component~Cp_base~plate.none", opts: opts};
        //======================================    
        var cname = lyMaps["body"] + "~" + 0;
        var opts = {};
        opts.yArr = [0, 50, 9999];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["mainBody"] = cname;
        //==============================

        var cname = lyMaps["mainBody"] + "~" + 0;
        var keyPrg = function (iobj) {
            console.log(iobj);

        };

        //==============================
        var cname = lyMaps["mainBody"] + "~" + 1;
        var opts = {};
        opts.buttons = ["語音", "手機", "無線電", "交換器", "序列埠", "系統"];
        opts.buttonIds = ["speech", "handSet", "radio", "switch", "serial", "system"];
        opts.actionFunc = function (iobj) {
            if (iobj.act !== "mouseClick")
                return;
            console.log(iobj);
            gr.tabInx = iobj.buttonInx;
            gr.tabSelect = 0;
            gr.repaint_f = 1;
            return;

        };
        opts.buttonAmt = 6;
        opts.fontSize = "0.5rh";
        opts.xm = 4;
        opts.buttonColor = "#ccc";
        blocks[cname] = {name: "headButtons", type: "Model~MdaButtons~base.sys0", opts: opts};
        //==============================


        if (!gr.tabInx) {
            var cname = lyMaps["mainBody"] + "~" + 2;
            var opts = {};
            opts.xArr = [9999, 200];
            layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
            lyMaps["centerBody"] = cname;
            //==============================
            var cname = lyMaps["centerBody"] + "~" + 1;
            var opts = {};
            opts.yc = 4;
            opts.ym = 30;
            opts.tm = 2;
            opts.bm = 20;
            layouts[cname] = {name: cname, type: "Layout~Ly_base~array.sys0", opts: opts};
            lyMaps["rightBody"] = cname;
            //==============================
            var rightButPrg = function (iobj) {
                console.log(iobj);
                if (iobj.kvObj.opts.id === "ptt") {
                    var opts = {};
                    opts.kvTexts = ["ICS:192.168.3.230", "連線中斷"];
                    box.errorBox(opts);
                    return;
                }
                if (iobj.kvObj.opts.id === "broadcast") {
                    var opts = {};
                    opts.kvTexts = ["ROUTER:192.168.3.230", "連線中斷"];
                    box.errorBox(opts);
                    return;

                }
                if (iobj.kvObj.opts.id === "meet") {

                }
                if (iobj.kvObj.opts.id === "general") {

                }

            };
            var cname = lyMaps["rightBody"] + "~" + 0;
            var opts = {};
            opts.innerText = "PTT";
            opts.id = "ptt";
            opts.baseColor = "#cf0";
            opts.actionFunc = rightButPrg;
            blocks[cname] = {name: "button#" + 0, type: "Component~Cp_base~button.sys0", opts: opts};

            var cname = lyMaps["rightBody"] + "~" + 1;
            var opts = {};
            opts.innerText = "廣播";
            opts.id = "broadcast";
            opts.baseColor = "#cf0";
            opts.actionFunc = rightButPrg;
            blocks[cname] = {name: "button#" + 1, type: "Component~Cp_base~button.sys0", opts: opts};

            var cname = lyMaps["rightBody"] + "~" + 2;
            var opts = {};
            opts.innerText = "會議";
            opts.id = "meet";
            opts.baseColor = "#cf0";
            opts.actionFunc = rightButPrg;
            blocks[cname] = {name: "button#" + 2, type: "Component~Cp_base~button.sys0", opts: opts};

            var cname = lyMaps["rightBody"] + "~" + 3;
            var opts = {};
            opts.innerText = "總機";
            opts.id = "general";
            opts.baseColor = "#cf0";
            opts.actionFunc = rightButPrg;
            blocks[cname] = {name: "button#" + 3, type: "Component~Cp_base~button.sys0", opts: opts};






            var cname = lyMaps["centerBody"] + "~" + 0;
            var opts = {};
            opts.margin = 6;
            opts.xm = 1;
            opts.ym = 1;
            opts.yArr = ["0.14rh", "0.2rh", "0.15rh", "0.14rh", "0.12rh", "0.12rh", "0.12rh"];
            opts.xyArr = [[9999], [9999], [9999], [9999], ["0.5rw", 9999], ["0.5rw", 9999], ["0.5rw", 9999]];
            layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
            lyMaps["listBody"] = cname;

            var cname = lyMaps["listBody"] + "~" + 0;
            var opts = {};
            opts.innerText = "語音通話";
            opts.innerTextColor = "#006";
            opts.textShadow = "1px 1px 1px #fff";
            opts.lpd = 10;
            blocks[cname] = {name: "title", type: "Component~Cp_base~plate.none", opts: opts};

            var cname = lyMaps["listBody"] + "~" + 1;
            var opts = {};
            opts.innerText = "系統準備中....";
            opts.baseColor = "#afa";
            opts.textAlign = "left";
            opts.fontSize = "0.4rh";
            opts.textShadow = "1px 1px 1px #fff";
            opts.innerTextColor = "#000";
            opts.lpd = 8;
            opts.fontWeight = "normal";
            opts.fontFamily = "monospace";
            opts.insideShadowBlur = "0.1rh";

            var regName = "self.fatherMd.stas.lcdDataStr";
            Block.setInputWatch(opts, "directReg", regName, "innerText", 1);
            blocks[cname] = {name: "lcd", type: "Component~Cp_base~images.lcd", opts: opts};
            //==========================================
            var cname = lyMaps["listBody"] + "~" + 2;
            var opts = {};
            opts.innerText = "";
            opts.baseColor = "#0c8";
            var regName = "self.fatherMd.stas.warningStr";
            Block.setInputWatch(opts, "directReg", regName, "innerText", 1);
            var regName = "self.fatherMd.stas.warningColor";
            Block.setInputWatch(opts, "directReg", regName, "baseColor", 1);
            blocks[cname] = {name: "pnWarning", type: "Component~Cp_base~plate.none", opts: opts};
            //==========================================



            var texts = [];
            texts.push("本機資訊");
            texts.push("本機號碼");
            texts.push(gr.paraSet.ipPhoneId);
            texts.push("本機 IP");
            texts.push(gr.paraSet.ipPhoneIp);
            texts.push("軟體版本");
            texts.push(gr.paraSet.version);
            for (var i = 0; i < 7; i++) {
                var cname = lyMaps["listBody"] + "~" + (i + 3);
                var opts = {};
                opts.innerText = texts[i];
                opts.borderType = "normal";//none|normal|buttonPush|buttonFree
                opts.borderWidth = 1;
                opts.borderColor = "#afa";
                blocks[cname] = {name: "list#" + i, type: "Component~Cp_base~plate.none", opts: opts};
            }
            return;
        }

        var regName = "self.fatherMd.fatherMd.fatherMd.fatherMd.stas.watchDataA";
        var cname = lyMaps["mainBody"] + "~" + 2;
        var opts = {};
        opts.margin = 6;
        opts.xm = 1;
        opts.ym = 1;
        opts.yArr = ["0.14rh", 9999];
        opts.xyArr = [[9999], [9999]];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["listBody"] = cname;

        var tabName = ["語音通話", "手持式話機", "無線電閘道器", "L3網路交換器", "RS422傳輸埠", "系統設定"];
        var cname = lyMaps["listBody"] + "~" + 0;
        var opts = {};
        opts.innerText = tabName[gr.tabInx];
        opts.innerTextColor = "#006";
        opts.textShadow = "1px 1px 1px #fff";
        opts.lpd = 10;
        blocks[cname] = {name: "title", type: "Component~Cp_base~plate.none", opts: opts};



        if (gr.tabInx === 5) {
            var cname = lyMaps["listBody"] + "~" + 1;
            var opts = {};
            blocks[cname] = {name: "pnTab5", type: "Model~Sip6In1Tab5~base.sys0", opts: opts};
            return;
        }
        if (gr.tabInx === 1) {
            var cname = lyMaps["listBody"] + "~" + 1;
            var setOptsA = [];
            var setOpts = sopt.getParaSetOpts({paraSetName: "handFreeId"});
            //var watchDatas = setOpts.watchDatas = [];
            //watchDatas.push(["directReg", regName + "#10", "editValue", 1]);
            setOptsA.push(setOpts);
            //===============
            var setOpts = sopt.getParaSetOpts({paraSetName: "handFreeIp"});
            //var watchDatas = setOpts.watchDatas = [];
            //watchDatas.push(["directReg", regName + "#0", "editValue", 1]);
            setOptsA.push(setOpts);
            if (gr.paraSet.handFreeStatus) {
                var setOpts = sopt.getInputIntSimple();
                setOpts.readOnly_f = 1;
                setOpts.title = "狀態";
                var watchDatas = setOpts.watchDatas = [];
                var regName = "self.fatherMd.fatherMd.fatherMd.fatherMd.stas.handFreeStatusStr";
                watchDatas.push(["directReg", regName, "editValue", 1]);
                setOptsA.push(setOpts);
            }



        }
        if (gr.tabInx === 2) {
            var cname = lyMaps["listBody"] + "~" + 1;
            var setOptsA = [];
            var setOpts = sopt.getParaSetOpts({paraSetName: "radioId"});
            setOptsA.push(setOpts);
            //===============
            var setOpts = sopt.getParaSetOpts({paraSetName: "radioIp"});
            setOptsA.push(setOpts);
            if (gr.paraSet.radioStatus) {
                var setOpts = sopt.getInputIntSimple();
                setOpts.readOnly_f = 1;
                setOpts.title = "狀態";
                var watchDatas = setOpts.watchDatas = [];
                var regName = "self.fatherMd.fatherMd.fatherMd.fatherMd.stas.radioStatusStr";
                watchDatas.push(["directReg", regName, "editValue", 1]);
                setOptsA.push(setOpts);
            }
            //===============
        }
        if (gr.tabInx === 3) {
            var cname = lyMaps["listBody"] + "~" + 1;
            var setOptsA = [];
            var setOpts = sopt.getParaSetOpts({paraSetName: "switchIp"});
            setOptsA.push(setOpts);
            //===============
            var setOpts = sopt.getParaSetOpts({paraSetName: "switchMask"});
            setOptsA.push(setOpts);
        }
        if (gr.tabInx === 4) {
            var cname = lyMaps["listBody"] + "~" + 1;
            var setOptsA = [];
            var setOpts = sopt.getParaSetOpts({paraSetName: "serialIp"});
            setOptsA.push(setOpts);
            //===============
            var setOpts = sopt.getParaSetOpts({paraSetName: "serialMask"});
            setOptsA.push(setOpts);
            //===============
        }

        //===============================
        var setObjs = [];
        var inx = 0;
        for (var ii = 0; ii < setOptsA.length; ii++) {
            var ksObj = {};
            ksObj.name = "setLine#" + ii;
            ksObj.type = "Model~MdaSetLine~base.sys0";
            var kopts = ksObj.opts = {};
            kopts.setOpts = setOptsA[ii];
            kopts.setOpts.setType = "inputText";
            kopts.setOpts.dataType = "str";
            kopts.setOpts.checkType = "str";
            kopts.setOpts.actButtons = [];
            kopts.setOpts.titleWidth = 400;
            kopts.setOpts.readOnly_f = 1;
            kopts.setOpts.editBaseColor = "#e8e8ff";
            setObjs.push(ksObj);
        }
        //================================
        var opts = {};
        opts.ksObjss = [];
        var inx = 0;
        for (var i = 0; i < setOptsA.length; i++) {
            var ksObjs = [];
            for (var j = 0; j < 1; j++) {
                if (inx >= setObjs.length)
                    break;
                var ksObj = setObjs[inx];
                ksObjs.push(ksObj);
                inx++;
            }
            if (j >= 1)
                opts.ksObjss.push(ksObjs);
        }
        opts.ksObjWs = [9999];
        var obj = mac.setLineBoxOpts(opts);
        obj.opts.baseColor = "#cfc";
        obj.opts.title = "";
        obj.opts.baseColor = "#0c8";
        obj.opts.ksObj.opts.baseColor = "#0c8";
        obj.opts.ksObj.opts.eh = 50;
        blocks[cname] = {name: "infPanel", type: obj.type, opts: obj.opts};




    }
}





class Sip6In1Tab5 {
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);
        opts.actInx = 0;
        opts.setParaPass_f = 3;
        this.subTypeOpts(opts);
        return opts;
    }
    subTypeOpts(opts) {
        if (this.md.subType === "base.sys0") {
        }
    }

    pageViewPrg() {


    }

    paraSetPrg(title) {
        var self = this;
        var md = self.md;
        var op = md.opts;
        var opts = {};
        var setOptsA = [];
        opts.ksObjWs = [9999];


        if (title === "paraSet") {
            opts.title = "參數設定";
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "ipPhoneId"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "ipPhoneIp"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "uiIp"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "uiMask"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "uiGate"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "icsIp"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "radioId"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "radioIp"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "handFreeId"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "handFreeIp"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "switchIp"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "switchMask"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "serialIp"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "serialMask"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "setPassword"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "handFreeStatus", "titleWidth": 300}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "radioStatus", "titleWidth": 300}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "linkTestPointName#1"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "linkTestPointIp#1"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "linkTestPointName#2"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "linkTestPointIp#2"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "linkTestPointName#3"}));
            setOptsA.push(sopt.getParaSetOpts({paraSetName: "linkTestPointIp#3"}));
            if (op.setParaPass_f >= 3)
                setOptsA.push(sopt.getParaSetOpts({paraSetName: "translateTbl"}));
        }

        if (title === "viewTest") {
            opts.title = "測試結果";
            var testResult = gr.sipphoneUiData["testResult"];
            var strA = testResult.split("~");


            for (var i = 0; i < strA.length; i++) {
                var setOpts = sopt.getOptsStrView({"value": strA[i], "titleWidth": 0});
                if (strA[i].includes("ERROR"))
                    setOpts.editBaseColor = "#f88";
                else
                    setOpts.editBaseColor = "#8f8";
                setOptsA.push(setOpts);
            }

        }


        var setObjs = [];
        var inx = 0;
        for (var ii = 0; ii < setOptsA.length; ii++) {
            var ksObj = {};
            ksObj.type = "Model~MdaSetLine~base.sys0";
            var kopts = ksObj.opts = {};
            kopts.setOpts = setOptsA[ii];
            if (kopts.setOpts.titleWidth === undefined)
                kopts.setOpts.titleWidth = 300;
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
        opts.w = "0.9rw";
        opts.h = "0.9rh";
        opts.actionFunc = function (iobj) {
            if (iobj.act !== "mouseClick")
                return;
            if (iobj.buttonId === "esc") {
                md.stas.pnSet = null;
                return;
            }
            if (iobj.buttonId === "ok") {
                md.stas.pnSet = null;
                if (title === "paraSet")
                    mac.saveSetOpts(iobj.ksObjss, gr.paraSet);
            }

        };
        md.stas.pnSet = box.setLineBox(opts);
    }

    setPrg(setParaName) {
        var self = this;
        var md = self.md;
        var op = md.opts;
        var opts = {};
        opts.setOpts = sopt.getParaSetOpts({paraSetName: setParaName});
        opts.title = opts.setOpts.title;
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            if (iobj.act === "padEnter") {
                gr.paraSet[setParaName] = iobj.inputText;
                mac.saveParaSetAll();
            }
        };
        md.stas.keyPad = box.intPadBox(opts);
        return;
    }

    emuKeyIn(numId, iobj) {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        var selectObj = md.blockRefs["selectButtons"];
        var actInx = -1;
        if (numId === "ok") {
            var actInx = op.actInx * 10 + selectObj.opts.selectInx + 1;
            if (selectObj.opts.selectInx < 0)
                return;
            if (actInx === 1) {//shutdown
                md.fatherMd.opts.uiCmd = "shutdown";
                return;
            }
            if (actInx === 2) {//reboot
                md.fatherMd.opts.uiCmd = "reboot";
                return;
            }
            if (actInx === 4) {//self test
                md.fatherMd.opts.uiCmd = "selfTest";
                return;
            }
            if (actInx === 5) {//reset voip
                md.fatherMd.opts.uiCmd = "resetVoip";
                return;
            }

            if (actInx === 31) {
                md.mdClass.setPrg("icsIp");
                return;
            }
            if (actInx === 321) {
                md.mdClass.setPrg("uiIp");
                return;
            }
            if (actInx === 322) {
                md.mdClass.setPrg("uiMask");
                return;
            }
            if (actInx === 323) {
                md.mdClass.setPrg("uiGate");
                return;
            }
            if (actInx === 331) {
                md.mdClass.setPrg("handFreeId");
                return;
            }
            if (actInx === 332) {
                md.mdClass.setPrg("handFreeIp");
                return;
            }
            if (actInx === 341) {
                md.mdClass.setPrg("radioId");
                return;
            }
            if (actInx === 342) {
                md.mdClass.setPrg("radioIp");
                return;
            }
            if (actInx === 351) {
                md.mdClass.setPrg("switchIp");
                return;
            }
            if (actInx === 352) {
                md.mdClass.setPrg("switchMask");
                return;
            }
            if (actInx === 361) {
                md.mdClass.setPrg("serialIp");
                return;
            }
            if (actInx === 362) {
                md.mdClass.setPrg("serialMask");
                return;
            }
            if (actInx === 371) {
                md.mdClass.setPrg("ipPhoneId");
                return;
            }
            if (actInx === 372) {
                md.mdClass.setPrg("ipPhoneIp");
                return;
            }
            var setLineName = "";
            if (actInx === 381) {
                setLineName = "handFreeStatus";
            }
            if (actInx === 382) {
                setLineName = "radioStatus";
            }
            if (setLineName) {
                var opts = {};
                opts.ksObjss = [];
                for (var i = 0; i < 1; i++) {
                    var ksObjs = [];
                    for (var j = 0; j < 1; j++) {
                        var ksObj = {};
                        ksObj.name = "setLine#" + i + "." + j;
                        ksObj.type = "Model~MdaSetLine~base.sys0";
                        var kopts = ksObj.opts = {};
                        kopts.setOpts = sopt.getParaSetOpts({paraSetName: setLineName});
                        ;
                        opts.title = kopts.setOpts.title;
                        ksObjs.push(ksObj);
                    }
                    opts.ksObjss.push(ksObjs);
                }
                opts.ksObjWs = [9999];
                opts.w = op.width;
                opts.h = op.height;
                opts.buttons = ["OK"];
                opts.buttonIds = ["ok"];

                opts.eBaseColor = "#ccc";
                opts.actionFunc = function (iobj) {
                    console.log(iobj);
                    if (iobj.act === "mouseClick") {
                        if (iobj.buttonId === "ok") {
                            var mainMd = md.stas.setLineBoxObj.blockRefs["mainMd"];
                            var setLineObj = mainMd.blockRefs["setLine#0.0"];
                            gr.paraSet[setLineName] = setLineObj.mdClass.getValue(1);
                            mac.saveParaSetAll();
                            md.stas.setLineBoxObj = null;
                        }
                        if (iobj.buttonId === "esc") {
                            md.stas.setLineBoxObj = null;
                        }
                    }
                };
                opts.h = 150;
                opts.eh = 50;
                md.stas.setLineBoxObj = box.setLineBox(opts);
                return;
            }


            selectObj.opts.selectInx = -1;

        }
        if (numId === "back") {
            var actInx = (op.actInx / 10) | 0;
            selectObj.opts.selectInx = (op.actInx % 10) - 1;
        }

        if (actInx < 0)
            return;
        if (actInx === 0) {
            selectObj.opts.kvTexts = [];
            selectObj.opts.kvTexts.push("1. 關機");
            selectObj.opts.kvTexts.push("2. 重新開機");
            selectObj.opts.kvTexts.push("3. 參數設定");
            selectObj.opts.kvTexts.push("4. 系統自測");
            selectObj.opts.kvTexts.push("5. VOIP重新連線");
            selectObj.reCreate();
            op.actInx = actInx;
            return;
        }
        if (actInx === 32) {
            selectObj.opts.kvTexts = [];
            selectObj.opts.kvTexts.push("1. 人機界面 IP位址");
            selectObj.opts.kvTexts.push("2. 人機界面 網路遮罩");
            selectObj.opts.kvTexts.push("3. 人機界面 預設閘道器");
            selectObj.reCreate();
            op.actInx = actInx;
            return;
        }




        if (actInx === 33) {
            selectObj.opts.kvTexts = [];
            selectObj.opts.kvTexts.push("1. 手機電話 號碼");
            selectObj.opts.kvTexts.push("2. 手機電話 IP位址");
            selectObj.reCreate();
            op.actInx = actInx;
            return;
        }

        if (actInx === 34) {
            selectObj.opts.kvTexts = [];
            selectObj.opts.kvTexts.push("1. 無線電 號碼");
            selectObj.opts.kvTexts.push("2. 無線電 IP位址");
            selectObj.reCreate();
            op.actInx = actInx;
            return;
        }

        if (actInx === 35) {
            selectObj.opts.kvTexts = [];
            selectObj.opts.kvTexts.push("1. 閘道器 IP位址");
            selectObj.opts.kvTexts.push("2. 閘道器 網路遮罩");
            selectObj.reCreate();
            op.actInx = actInx;
            return;
        }

        if (actInx === 36) {
            selectObj.opts.kvTexts = [];
            selectObj.opts.kvTexts.push("1. 序列埠 IP位址");
            selectObj.opts.kvTexts.push("2. 序列埠 網路遮罩");
            selectObj.reCreate();
            op.actInx = actInx;
            return;
        }

        if (actInx === 37) {
            selectObj.opts.kvTexts = [];
            selectObj.opts.kvTexts.push("1. 本機 號碼");
            selectObj.opts.kvTexts.push("2. 本機 IP位址");
            selectObj.reCreate();
            op.actInx = actInx;
            return;
        }


        if (actInx === 38) {
            if (op.setParaPass_f === 1) {
                selectObj.opts.kvTexts = [];
                selectObj.opts.kvTexts.push("1. 手機 狀態設定");
                selectObj.opts.kvTexts.push("2. 無線電 狀態設定");
                selectObj.reCreate();
                op.actInx = actInx;
            }
            if (op.setParaPass_f >= 2) {
                md.mdClass.paraSetPrg("paraSet");
                selectObj.opts.selectInx = 7;

            }
            return;
        }


        if (actInx === 3) {
            if (op.setParaPass_f) {
                selectObj.opts.kvTexts = [];
                selectObj.opts.kvTexts.push("1. ICS IP設定");
                selectObj.opts.kvTexts.push("2. 人機界面 設定");
                selectObj.opts.kvTexts.push("3. 手機界面 設定");
                selectObj.opts.kvTexts.push("4. 無線電分機 設定");
                selectObj.opts.kvTexts.push("5. 交換機 設定");
                selectObj.opts.kvTexts.push("6. 序列埠 設定");
                selectObj.opts.kvTexts.push("7. 本機 設定");
                selectObj.opts.kvTexts.push("8. 其他 設定");
                selectObj.reCreate();
                op.actInx = actInx;
                return;
            } else {
                md.stas.tmpIobj = iobj;
                var opts = {};
                opts.title = "請輸入密碼";
                opts.setOpts = {};
                opts.setOpts.password_f = 1;
                opts.actionFunc = function (iobj) {
                    console.log(iobj);
                    if (iobj.act === "padEnter") {
                        if (iobj.inputText === gr.paraSet.setPassword)
                            op.setParaPass_f = 1;
                        if (iobj.inputText === gr.paraSet.adminPassword)
                            op.setParaPass_f = 2;
                        if (iobj.inputText === gr.paraSet.josnPassword)
                            op.setParaPass_f = 3;

                        if (op.setParaPass_f) {
                            md.mdClass.emuKeyIn("ok", iobj);
                            md.stas.keyPad = null;
                            return;
                        } else {
                            var opts = {};
                            opts.kvTexts = ["密碼錯誤"];
                            box.errorBox(opts);
                            op.actInx = 0;
                            const timeoutId = setTimeout(() => {
                                MdaPopWin.popOff(2);
                                md.stas.keyPad = null;
                            }, 1500);
                        }
                    }
                };
                md.stas.keyPad = box.intPadBox(opts);
            }
        }



    }

    afterCreate() {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        var iobj = {};
        iobj.act = "afterCreate";
        iobj.sender = md;
        KvLib.exe(op.actionFunc, iobj);
    }
    build() {
        var self = this;
        var md = self.md;
        var op = md.opts;
        var st = md.stas;
        var lyMaps = md.lyMaps;
        var blocks = op.blocks;
        var layouts = op.layouts;
        //======================================    
        var cname = "c";
        var opts = {};
        layouts[cname] = {name: cname, type: "Layout~Ly_base~array.sys0", opts: opts};
        lyMaps["body"] = cname;
        //======================================    
        var opts = {};
        md.setPns(opts);
        opts.mouseClick_f = 1;
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            return 1;
        };
        blocks[cname] = {name: "basePanel", type: "Component~Cp_base~plate.sys0", opts: opts};


        var actPrg = function (iobj) {
            console.log(iobj);
            if (iobj.act === "mouseClick") {
                var selectObj = md.blockRefs["selectButtons"];
                var numId = iobj.kvObj.opts.buttonId;
                md.mdClass.emuKeyIn(numId, iobj);
                return;
            }
        };

        var cname = lyMaps["body"] + "~" + 0;
        var opts = {};
        opts.yArr = [9999, "0.1rh", "0.13rh"];
        opts.xyArr = [[9999], [9999], [9999]];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["centerBody"] = cname;

        var cname = lyMaps["centerBody"] + "~" + 0;
        var opts = {};
        opts.margin = 10;
        opts.xm = 10;
        opts.ym = 10;
        opts.xc = 2;
        opts.yc = 4;
        opts.baseColor = "#ff0";
        opts.kvTexts = [];
        opts.kvTexts.push("1. 關機");
        opts.kvTexts.push("2. 重新開機");
        opts.kvTexts.push("3. 參數設定");
        opts.kvTexts.push("4. 系統自測");
        opts.kvTexts.push("5. VOIP重新連線");
        opts.textAlign = "left";
        opts.tm = 10;
        opts.lpd = 10;
        opts.selectEsc_f = 0;
        opts.selectAble_f = 1;
        blocks[cname] = {name: "selectButtons", type: "Model~MdaSelector~base.sys0", opts: opts};

        var cname = lyMaps["centerBody"] + "~" + 1;
        var opts = {};
        opts.innerText = "數字鍵選擇欲執行之命令，按OK鍵執行，按<鍵離開";
        opts.innerTextColor = "#006";
        opts.textShadow = "1px 1px 1px #fff";
        opts.lpd = 10;
        blocks[cname] = {name: "title", type: "Component~Cp_base~plate.none", opts: opts};



        var cname = lyMaps["centerBody"] + "~" + 2;
        var opts = {};
        opts.xArr = [9999, "0.15rw", "0.15rw"];
        opts.xyArr = [[9999], [9999], [9999]];
        opts.xm = 4;
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["downBody"] = cname;

        var cname = lyMaps["downBody"] + "~" + 0;
        var opts = {};
        opts.innerText = "";
        opts.lpd = 10;
        opts.textAlign = "left";
        opts.baseColor = "#cff";
        opts.fontSize = "0.5rh";
        opts.textShadow = "1px 1px 1px #fff";
        var regName = "self.fatherMd.fatherMd.stas.messageStr";
        Block.setInputWatch(opts, "directReg", regName, "innerText", 1);
        blocks[cname] = {name: "statusBar", type: "Component~Cp_base~plate.none", opts: opts};


        var cname = lyMaps["downBody"] + "~" + 1;
        var opts = {};
        opts.innerText = "<";
        opts.buttonId = "back";
        opts.actionFunc = actPrg;
        blocks[cname] = {name: "backButton", type: "Component~Cp_base~button.sys0", opts: opts};

        var cname = lyMaps["downBody"] + "~" + 2;
        var opts = {};
        opts.innerText = "OK";
        opts.buttonId = "ok";
        opts.actionFunc = actPrg;
        blocks[cname] = {name: "okButton", type: "Component~Cp_base~button.sys0", opts: opts};




    }
}
