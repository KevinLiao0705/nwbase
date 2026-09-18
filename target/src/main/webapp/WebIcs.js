/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global gr, sys */



//===========================================
class Md_webIcs {

    static init() {
        var bobj = gr.modelOpts["Md_webIcs"] = {};
        var dsc = bobj["optsDsc"] = {};
        var sobj = bobj["subOpts"] = {};
        bobj.propertyWidth = 0;
        bobj.propertyHeight = 0;
        if ("sys") {
            var obj = sobj["sys"] = {};
            obj.afterCreat_f = 0;
            obj.slotLen = 14;
            obj.actInx = 0;
            obj.slotNames = [
                "slotNames#mainCtrMdA#銝剖亢蝟餌絞?批?剁慼",
                "slotNames#mainCtrMdA#銝剖亢蝟餌絞?批?剁慰",
                "slotNames#sipCtrMdA#嚗喉憬嚗圈閰梢??嚗?,
                "slotNames#sipCtrMdA#嚗喉憬嚗圈閰梢??嚗?,
                "slotNames#noneCtrMdA# ",
                "slotNames#t1e1CtrMdB#嚗湛?隤???剁慰",
                "slotNames#fxoCtrMdA#嚗佗撓嚗航??喲??嚗?,
                "slotNames#fxoCtrMdB#嚗佗撓嚗航??喲??嚗?,
                "slotNames#fxsCtrMdA#嚗佗撓嚗唾??喲??嚗?,
                "slotNames#fxsCtrMdB#嚗佗撓嚗唾??喲??嚗?,
                "slotNames#magPhCtrMdA#??餃?撠????剁慼",
                "slotNames#magPhCtrMdB#??餃?撠????剁慰",
                "slotNames#roipCtrMdA#?∠??餉??喲??嚗?,
                "slotNames#recorderCtrMdA#??批?剁慼"
            ];
            //=======================


            obj.testStatus = {};
            var wobj = obj.testStatus;
            wobj.testMode = "";
            wobj.testStep = 0;
            wobj.testStaA = []; //0: stop, 1: start, 2: test Ok, 3: test error 
            wobj.selfTestAllStart_f = 0;
            wobj.selfTestAllStop_f = 0;
            wobj.selfTestAllSta = 0;
            wobj.testLedA = [];
            for (var i = 0; i < 20; i++) {
                wobj.testLedA.push(0);
                wobj.testStaA.push(0);
            }
            var icsDatas = obj.icsDatas = {};

            var slotDatas = icsDatas.slotDatas = [];
            for (var i = 0; i < 14; i++) {
                var slotData = {};
                slotData["type"] = "";
                slotData["status"] = 0;
                slotData["count"] = 0;
                slotData["softVer"] = "0.0";
                slotData["firmVer"] = "0.0";
                slotData["inf"] = "";
                slotData["startTime"] = "";
                slotDatas.push(slotData);
            }
            var exStatusMap = icsDatas.exStatusMap = {};

            var sip0 = icsDatas.sipData0 = {};
            var sip1 = icsDatas.sipData1 = {};

            var initSip = function (sip) {
                sip.ioBuf = 0;
                sip.phoneSta = 0x00;
                sip.connectSta = 0x00;
                sip.handStatus = 0x00;
                sip.earSpeakerVol = 0x00;
                sip.phsetSpeakerVol = 0x00;
                sip.earMicSens = 0x00;
                sip.phsetMicSens = 0x00;
                sip.sipFlag = 0x00;
                sip.sipStatus = "";
                sip.sipAction = "";
                sip.callto = "callto";
                sip.callfrom = "callfrom";
            };
            initSip(sip0);
            initSip(sip1);
        }
    }

    transErrLed(sta, flag) {
        if (!sta.load_f)
            return 0;
        if (flag)
            return 2;
        return 1;
    }

    getSlotName(slotData) {
        var nameStr = "";
        if (slotData.type === "")
            return nameStr;
        if (slotData.type === "ctr")
            nameStr += "銝剖亢蝟餌絞?批??;
        if (slotData.type === "sip")
            nameStr += "嚗喉憬嚗圈閰梢??";
        if (slotData.type === "t1s")
            nameStr += "嚗湛?嚗唾??喲??";
        if (slotData.type === "fxo")
            nameStr += "嚗佗撓嚗航??喲??";
        if (slotData.type === "fxs")
            nameStr += "嚗佗撓嚗唾??喲??";
        if (slotData.type === "mag")
            nameStr += "??餃?撠?????;
        if (slotData.type === "roip")
            nameStr += "?∠??餉??喲??";
        if (slotData.type === "rec")
            nameStr += "??批??;
        nameStr += " ";
        if (slotData.count === 0)
            nameStr += "嚗?;
        if (slotData.count === 1)
            nameStr += "嚗?;
        if (slotData.count === 2)
            nameStr += "嚗?;
        if (slotData.count === 2)
            nameStr += "嚗?;
        return nameStr;
    }

    transIcsData() {
        var self = this;
        var md = self.md;
        var op = md.opts;
        var st = md.stas;
        var pageInx = op.pageInx;
        var icsDatas = op.icsDatas;
        var sipData0 = icsDatas.sipData0;
        var sipData1 = icsDatas.sipData1;
        var slotDatas = icsDatas.slotDatas;
        var exStatus = icsDatas.exStatusMap;

        if (sipData0.sipAction.includes("Ready")) {
            var selfEx = KvLib.getStrBetween(sipData0.sipAction, "<", ">");
            if (selfEx !== null) {
                md.stas.mainMenberEx = selfEx;
            }
        }
        if (sipData1.sipAction.includes("Ready")) {
            var selfEx = KvLib.getStrBetween(sipData1.sipAction, "<", ">");
            if (selfEx !== null) {
                md.stas.subMenberEx = selfEx;
            }
        }
        if (op.pageInx === 0 || op.pageInx === 3) {
            st.slotNames = [];
            st.slotLeds = [];
            st.slotLedHides = [];
            st.slotInfs = [];

            for (var i = 0; i < slotDatas.length; i++) {
                var slotData = slotDatas[i];
                if (slotData.type === "") {
                    st.slotNames.push("");
                    st.slotLeds.push(0);
                    st.slotLedHides.push(1);
                    st.slotInfs.push("");
                    continue;
                }
                var nameStr = "&nbsp";
                st.slotNames.push(nameStr + self.getSlotName(slotData));
                var ledInx = 0;//ngryb
                //status = 0;//0:none(dark), 1:exist(y blink) ,2: ready(y), 3:paraSet loaded(green blink), 4:pbx run(g), 5:error(red)
                if (slotData.status === 1) {
                    ledInx = 3;
                    if (gr.flash_f)
                        ledInx = 0;
                }
                if (slotData.status === 2) {
                    ledInx = 3;
                }
                if (slotData.status === 3) {
                    ledInx = 1;
                    if (gr.flash_f)
                        ledInx = 0;
                }
                if (slotData.status === 4) {
                    ledInx = 1;
                }
                if (slotData.status === 5) {
                    ledInx = 2;
                }
                if (op.testStatus.selfTestAllStart_f) {
                    ledInx = 4;
                }
                if (op.testStatus.testStaA[i] !== 0) {
                    ledInx = 4;
                    if (op.testStatus.testStaA[i] === 1) {
                        if (gr.flash_f)
                            ledInx = 0;
                    }
                    if (op.testStatus.testStaA[i] === 2)
                        ledInx = 1;
                    if (op.testStatus.testStaA[i] === 3)
                        ledInx = 2;
                }
                st.slotLeds.push(ledInx);
                st.slotLedHides.push(0);
                st.slotInfs.push(slotData.inf);
            }

            var tobj = st.testStatus = {};
            tobj.selfTestAllStart_f = op.testStatus.selfTestAllStart_f;
            tobj.testStopButtonText = "?芣葫?迫";
            if (op.testStatus.selfTestAllStart_f) {
                if (op.testStatus.selfTestAllStop_f === 0)
                    tobj.testStopButtonText = "?芣葫?怠?";
            }

        }
        if (op.pageInx === 3) {
            var exSta = st.exStatus = {};
            var keys = Object.keys(exStatus);
            for (var i = 0; i < keys.length; i++) {
                var obj = exStatus[keys[i]];
                exSta[keys[i]] = {};
                exSta[keys[i]]["callWith"] = obj.callWith;
                exSta[keys[i]]["inf"] = "撌脩??;
                exSta[keys[i]]["color"] = "#cfc";
                if (obj.status === 1) {
                    exSta[keys[i]]["inf"] = "撌脩??;
                    exSta[keys[i]]["color"] = "#cfc";
                }
                if (obj.status === 2) {
                    exSta[keys[i]]["inf"] = "撌脰酉??;
                    exSta[keys[i]]["color"] = "#0f0";
                }
                if (obj.status === 3) {
                    exSta[keys[i]]["inf"] = "???銝?;
                    exSta[keys[i]]["color"] = "#ff0";
                }
                if (obj.status === 4) {
                    exSta[keys[i]]["inf"] = "?亥?銝?;
                    exSta[keys[i]]["color"] = "#88f";
                }
                if (obj.status === 5) {
                    exSta[keys[i]]["inf"] = "?輸銝?;
                    exSta[keys[i]]["color"] = "#f88";
                }
                exSta[keys[i]]["callWith"] = obj.callWith;
            }
        }

        if (op.pageInx === 1) {
            var exSta = st.exStatus = {};
            var meetRooms = st.meetRooms = {};
            var meetGroups = gr.paraSet.meetGroups;
            for (var i = 0; i < meetGroups.length; i++) {
                var vstr = meetGroups[i];
                var strA = vstr.split("~");
                meetRooms[strA[0]] = "";
            }

            var broadRooms = st.broadRooms = {};
            var broadGroups = gr.paraSet.broadGroups;
            for (var i = 0; i < broadGroups.length; i++) {
                var vstr = broadGroups[i];
                var strA = vstr.split("~");
                broadRooms[strA[0]] = "";
            }


            var keys = Object.keys(exStatus);
            for (var i = 0; i < keys.length; i++) {
                var obj = exStatus[keys[i]];
                if (obj.callWith) {
                    if (meetRooms[obj.callWith] !== undefined) {
                        if (meetRooms[obj.callWith].length !== 0)
                            meetRooms[obj.callWith] += ",";
                        meetRooms[obj.callWith] += keys[i];
                    }

                    if (broadRooms[obj.callWith] !== undefined) {
                        if (broadRooms[obj.callWith].length !== 0)
                            broadRooms[obj.callWith] += ",";
                        broadRooms[obj.callWith] += keys[i];
                    }

                }
                exSta[keys[i]] = {};
                exSta[keys[i]]["callWith"] = obj.callWith;
                exSta[keys[i]]["inf"] = "撌脩??;
                exSta[keys[i]]["color"] = "#cfc";
                if (obj.status === 1) {
                    exSta[keys[i]]["inf"] = "撌脩??;
                    exSta[keys[i]]["color"] = "#cfc";
                }
                if (obj.status === 2) {
                    exSta[keys[i]]["inf"] = "撌脰酉??;
                    exSta[keys[i]]["color"] = "#0f0";
                }
                if (obj.status === 3) {
                    exSta[keys[i]]["inf"] = "???銝?;
                    exSta[keys[i]]["color"] = "#ff0";
                }
                if (obj.status === 4) {
                    exSta[keys[i]]["inf"] = "?亥?銝?;
                    exSta[keys[i]]["color"] = "#88f";
                }
                if (obj.status === 5) {
                    exSta[keys[i]]["inf"] = "?輸銝?;
                    exSta[keys[i]]["color"] = "#f88";
                }
            }

            if (md.stas.meetRoomObj) {
                var meetRoomObj = md.stas.meetRoomObj;
                if (meetRooms[meetRoomObj.opts.meetRoomName] !== undefined) {
                    var menberStr = meetRooms[meetRoomObj.opts.meetRoomName];
                    var menbers = menberStr.split(",");
                    for (var key in meetRoomObj.compRefs) {
                        var strA = key.split("#");
                        if (strA[0] === "sel") {
                            var color = "#aaa";
                            var sel = meetRoomObj.compRefs[key];
                            var strB = sel.opts.innerText.split(",");
                            for (var i = 0; i < menbers.length; i++) {
                                if (strB[1] === menbers[i])
                                    color = "#afa";
                            }
                            if (sel.opts.baseColor !== color) {
                                sel.opts.baseColor = color;
                                sel.reCreate();
                            }
                        }
                    }
                }
            }

            if (md.stas.broadRoomObj) {
                var broadRoomObj = md.stas.broadRoomObj;
                if (broadRooms[broadRoomObj.opts.broadRoomName] !== undefined) {
                    var menberStr = broadRooms[broadRoomObj.opts.broadRoomName];
                    var menbers = menberStr.split(",");
                    for (var key in broadRoomObj.compRefs) {
                        var strA = key.split("#");
                        if (strA[0] === "sel") {
                            var color = "#aaa";
                            var sel = broadRoomObj.compRefs[key];
                            if (sel.opts.innerText === "1011")
                                var ii = 0;
                            for (var i = 0; i < menbers.length; i++) {
                                if (sel.opts.innerText === menbers[i])
                                    color = "#afa";
                            }
                            if (sel.opts.baseColor !== color) {
                                sel.opts.baseColor = color;
                                sel.reCreate();
                            }
                        }
                    }
                }
            }




            /*
             if (md.stas.broadRoomObj) {
             var broadRoomObj = md.stas.broadRoomObj;
             if (broadRooms[broadRoomObj.opts.broadRoomName] !== undefined) {
             var menbers = broadRooms[broadRoomObj.opts.broadRoomName];
             if (menbers === "")
             var strA = [];
             else
             var strA = menbers.split(",");
             if (broadRoomObj.opts.selects.length !== strA.length) {
             broadRoomObj.opts.selects = [];
             for (var i = 0; i < strA.length; i++) {
             broadRoomObj.opts.selects.push(strA[i]);
             }
             md.stas.broadRoomObj = broadRoomObj.reCreate();
             }
             }
             }
             */

            var setPhoneStatusFunc = function (phoneSet) {
                if (phoneSet === 0) {
                    var sipData = sipData0;
                    var page1Phone = st.page1Phone0 = {};
                } else {
                    var sipData = sipData1;
                    var page1Phone = st.page1Phone1 = {};
                }

                if (sipData.sipFlag & 0x04) {//nowLine
                    var handStatus = sipData.handStatus >> 4;
                } else {
                    var handStatus = sipData.handStatus & 15;
                }
                if (handStatus === 0) {
                    page1Phone.earPhoneKey_baseColor = "#ccc";
                    page1Phone.speakerKey_baseColor = "#ccc";
                }
                if (handStatus === 1) {
                    page1Phone.earPhoneKey_baseColor = "#df8";
                    page1Phone.speakerKey_baseColor = "#ccc";
                }
                if (handStatus === 2) {
                    page1Phone.earPhoneKey_baseColor = "#ccc";
                    page1Phone.speakerKey_baseColor = "#df8";
                }



                var lineSta0 = sipData.connectSta & 15;
                var lineSta1 = (sipData.connectSta >> 4) & 15;
                var lineFlag0 = (sipData.sipFlag >> 8) & 255;
                var lineFlag1 = (sipData.sipFlag >> 16) & 255;



                page1Phone.holdKey_innerTextColor = "#000";
                page1Phone.muteKey_innerTextColor = "#000";
                page1Phone.dtmfKey_innerTextColor = "#000";
                if (sipData.sipFlag & 0x04) {//nowLine
                    //line2
                    page1Phone.line1Key_innerTextColor = "#000";
                    page1Phone.line2Key_innerTextColor = "#00f";
                    if (lineFlag1 & 0x01)
                        page1Phone.holdKey_innerTextColor = "#f44";
                    if (lineFlag1 & 0x02)
                        page1Phone.muteKey_innerTextColor = "#f44";
                    if (lineFlag1 & 0x04)
                        page1Phone.dtmfKey_innerTextColor = "#f44";

                } else {
                    //line 1
                    page1Phone.line1Key_innerTextColor = "#00f";
                    page1Phone.line2Key_innerTextColor = "#000";
                    if (lineFlag0 & 0x01)
                        page1Phone.holdKey_innerTextColor = "#f44";
                    if (lineFlag0 & 0x02)
                        page1Phone.muteKey_innerTextColor = "#f44";
                    if (lineFlag0 & 0x04)
                        page1Phone.dtmfKey_innerTextColor = "#f44";
                }


                if (lineSta0 > 0) {
                    if (lineSta0 < 3) {
                        if (gr.flash_f)
                            page1Phone.line1Key_baseColor = "#df8";
                        else
                            page1Phone.line1Key_baseColor = "#ccc";
                    } else {
                        page1Phone.line1Key_baseColor = "#df8";
                    }
                } else {
                    page1Phone.line1Key_baseColor = "#ccc";
                }

                if (lineSta1 > 0) {
                    if (lineSta1 < 3) {
                        if (gr.flash_f)
                            page1Phone.line2Key_baseColor = "#df8";
                        else
                            page1Phone.line2Key_baseColor = "#ccc";
                    } else {
                        page1Phone.line2Key_baseColor = "#df8";
                    }
                } else {
                    page1Phone.line2Key_baseColor = "#ccc";
                }



                if (sipData.sipFlag & 0x04) {//nowLine
                    var lineSta = lineSta1;
                } else {
                    var lineSta = lineSta0;
                }

                if (lineSta === 2) {
                    if (gr.flash_f)
                        page1Phone.phoneKeyS_backgroundInx = 1;
                    else
                        page1Phone.phoneKeyS_backgroundInx = 0;
                } else {
                    page1Phone.phoneKeyS_backgroundInx = 0;
                }

            };
            setPhoneStatusFunc(0);
            setPhoneStatusFunc(1);

            return;
        }

















    }

    systemParaSet(modeInx)
    {
        var self = this;
        var actionFunc = function (iobj) {
            var keys = Object.keys(iobj.value);
            for (var i = 0; i < keys.length; i++)
                gr.paraSet[keys[i]] = iobj.value[keys[i]];
            gr.serverCallBack = function (valueObj, mes) {
                if (mes.opts.status === "OK") {
                    self.loadParas();
                    var opts;
                    var obj = {};
                    obj["name"] = "loadUserParaMap";
                    obj["type"] = "";
                    obj["opts"] = {};
                    opts = obj["opts"];
                    opts["responseType"] = "response error";
                    opts["userName"] = gr.userName;
                    sv.callServer(JSON.stringify(obj));
                }
            };

            //self.saveParas();
            //return;

            var str = "{\n";
            var keys = Object.keys(gr.paraSet);
            for (var i = 0; i < keys.length; i++) {
                if (i === 0)
                    str += " ";
                else
                    str += ",";
                str += "\"" + keys[i] + "\" : ";
                str += "\"" + gr.paraSet[keys[i]] + "\"\n";
            }
            str += "}\n";
            Test.server_saveStringToFile("response error", "exeCallBackFunc", str, "user-" + gr.userName + "/paraSet.json");
        };



        var paraSet = gr.paraSet;
        var keys = Object.keys(paraSet);
        var setObjs = [];
        for (var i = 0; i < keys.length; i++) {
            var name = keys[i];
            var id = keys[i];
            var strA = name.split("#");
            if (modeInx === 0) {
                if (strA[0] === "pulseGenParaA")
                    continue;
                switch (id) {
                    case "localInputPowerMeterA":
                        name = "[?祆?頛詨??銵??]";
                        break;
                    case "remoteInputPowerMeterA":
                        name = "[?祆?頛詨??銵??]";
                        break;
                    case "preAmpPowerMeterA":
                        name = "[?蔭?曉之?典??” ?]";
                        break;
                    case "driveAmpPowerMeterA":
                        name = "[撽??曉之?典??” ?]";
                        break;
                    case "cwOutputPowerMeterA":
                        name = "[??頛詨??銵??]";
                        break;
                    case "ccwOutputPowerMeterA":
                        name = "[??頛詨??銵??]";
                        break;
                    case "attenuaterA":
                        name = "[銵唳??刻” ?]";
                        break;

                    case "pulseDutyLimitHigh":
                        name = "?郭?望?銝?(%)";
                        break;
                    case "pulseWidthLimitHigh":
                        name = "?郭撖砍漲銝?(us)";
                        break;
                    case "powerReflectLimitHigh":
                        name = "????銝?(DB)";
                        break;
                    case "powerSuplyVoltLimitHigh":
                        name = "?餅?靘????餃?銝?(V)";
                        break;
                    case "powerSuplyVoltLimitLow":
                        name = "?餅?靘????餃?銝?(V)";
                        break;
                    case "powerSuplyCurrentLimitHigh":
                        name = "?餅?靘????餅?銝?(A)";
                        break;
                    case "powerSuplyTemperatureLimitHigh":
                        name = "?餅?靘???皞怠漲銝?(簞C)";
                        break;
                    case "sspaInputPowerLimitHigh":
                        name = "?箸??曉之??頛詨??銝?(DB)";
                        break;
                    case "sspaInputPowerLimitLow":
                        name = "?箸??曉之??頛詨??銝?(DB)";
                        break;
                    case "sspaOutputPowerLimitHigh":
                        name = "?箸??曉之??頛詨??銝?(DB)";
                        break;
                    case "sspaOutputPowerLimitLow":
                        name = "?箸??曉之??頛詨??銝?(DB)";
                        break;
                    case "sspaTemperatureLimitHigh":
                        name = "?箸??曉之??皞怠漲銝?(簞C)";
                        break;
                    case "pulseGenMode":
                        name = "?祆??郭璅∪?";
                        break;
                    case "airFlowForceA":
                        name = "[?唳瘞??撘瑕]";
                        break;
                    case "waterTemperatureForceA":
                        name = "[?唳瘞湔?皞怠漲撘瑕]";
                        break;
                    case "waterFlowForceA":
                        name = "[?唳瘞湔?撘瑕]";
                        break;

                }
            }
            if (modeInx === 1) {
                if (strA[0] !== "pulseGenParaA")
                    continue;
                name = "[?郭蝺刻? " + strA[1] + "]";
            }
            var setObj = sys.setOptsSetFix(name, "str");
            setObj.value = paraSet[keys[i]];
            setObj.id = id;
            setObj.textAlign = "left";
            setObj.titleWidth = 400;
            setObj.nameFontSize = "0.6rh";
            setObjs.push(setObj);
        }

        var opts = {};
        opts.title = "蝟餌絞?閮剖?";
        opts.pageItems = 12;
        opts.actionFunc = actionFunc;
        opts.tagOn_f = 1;
        opts.setObjs = setObjs;
        var height = 12 * 40 + 100;
        var mod = new Model("", "Md_inputLineBox~sys", opts, {});
        sys.popModel(mod, 1000, height);
        //mac.setBox("蝟餌絞?閮剖?", setObjs, 1000, 12, actionFunc);
        return;




    }
    constructor() {
        this.tickTimeK = 5;
        this.tickTime = -20;
        this.webSocketConnTime = 0;
        this.webSocketConnetCnt = 0;
        this.webSocketConnectCntK = 10;
        this.webSocketConnect_f = 0;
        this.flashTime = 0;
        this.timeActObjs = [];
        this.timeOutObjs = [];


    }
    initOpts(md) {
        return Model.getOpts(md.baseType, md.subType);
    }

    socketPrg() {
        var md = gr.icsMd;
        var self = md.mdClass;
        var op = self.md.opts;
        if (gr.wsok)
            return;
        var test = gr.webIp;
        //gr.ws = new WebSocket('ws://' + gr.webIp + ':' + gr.webSocketPort + '/websocket');
        //gr.ws = new WebSocket('ws://' + "127.0.0.1" + ':' + gr.webSocketPort + '/websocket');
        //gr.ws = new WebSocket('ws://192.168.0.10:80/websocket');
        //gr.ws = new WebSocket('ws://' + "127.0.0.1" + ':' + gr.webSocketPort + '/websocket');
        //gr.ws = new WebSocket('ws://' + gr.webIp + ':' + gr.webSocketPort );
        //gr.ws = new WebSocket('ws://' + "127.0.0.1" + ':' + gr.webSocketPort);
        //gr.ws = new WebSocket('ws://' + "192.168.191.9" + ':' + gr.webSocketPort);
        //gr.ws = new WebSocket('ws://' + "192.168.191.9" + ':' + gr.webSocketPort + '/websocket');
        //gr.ws = new WebSocket('ws://' + "192.168.0.28" + ':' + gr.webSocketPort + '/websocket');
        //gr.ws = new WebSocket('ws://' + "127.0.0.1" + ':' + gr.webSocketPort + '/websocket');
        try {
            //gr.ws = new WebSocket('ws://' + "127.0.0.1" + ':' + gr.webSocketPort + '/websocket');
            //gr.ws = new WebSocket('ws://' + "192.168.0.28" + ':' + gr.webSocketPort + '/websocket');
            //gr.ws = new WebSocket('ws://' + "192.168.191.9" + ':' + gr.webSocketPort + '/websocket');
            //gr.ws = new WebSocket('ws://' + gr.webSocketAddress + ':' + gr.webSocketPort + '/websocket');
            gr.ws = new WebSocket('ws://' + gr.webSocketAddress + ':' + gr.webSocketPort);
        } catch (ex) {
            console.log(ex);
        }
        gr.wsok = null;
        gr.ws.onopen = function ()
        {
            gr.wsok = gr.ws;
            console.log("WebSocket on Open");
        };
        gr.ws.onclose = function ()
        {
            gr.wsok = null;
            console.log("WebSocket Disconnect...");
        };
        gr.ws.onmessage = function (evt)
        {
            var md = gr.icsMd;
            var self = md.mdClass;
            var op = self.md.opts;
            if (self.webSocketConnect_f === 0) {
                self.webSocketConnect_f = 1;
            }
            self.webSocketConnectCnt = 0;
            var received_msg = evt.data;
            var recObj = JSON.parse(received_msg);
            var wsSysObj = JSON.parse(recObj.wsSysJson);
            gr.status1 = "Connected " + (wsSysObj.serialTime % 10);
            gr.status2 = "" + op.icsDatas.debugCnt;
            if (gr.socketRetPrgTbl[recObj.act])
                gr.socketRetPrgTbl[recObj.act](recObj);
            if (recObj.tickBackValue) {
                //console.log(recObj.tickBackValue);
                var tickBackValue = JSON.parse(recObj.tickBackValue);
                if (gr.socketRetPrgTbl[tickBackValue.actName])
                    gr.socketRetPrgTbl[tickBackValue.actName](tickBackValue);
            }

            if (recObj.testBackValue) {
                console.log(recObj.testBackValue);
            }


            if (recObj.icsDatas) {
                op.icsDatas = JSON.parse(recObj.icsDatas);
                self.transIcsData();
            }
            //console.log(recObj);
        };
        return;
    }
    closeSocket() {
        if (gr.wsok) {
            gr.wsok.close();
        }

    }

    sendSocket(obj) {
        var self = this;
        if (!gr.wsok) {
            self.webSocketConnTime++;
            if (self.webSocketConnTime >= 10) {
                self.webSocketConnTime = 0;
                self.socketPrg();
            }
            return;
        }
        obj.deviceId = "icsUi";
        obj.userName = gr.userName;
        try {
            if (gr.wsok.readyState)
                gr.wsok.send(JSON.stringify(obj));
        } catch (ex) {
            //gr.wsok=null;
            console.log(ex);
        }
    }

    afterCreate() {
        var self = this;
        var md = self.md;
        var op = md.opts;
        var st = md.stas;
        op.afterCreate_f = 1;
        gr.icsMd = md;
        var mesObj = md.compRefs["message"];
        gr.messageKobj = mesObj;
        var sta3Obj = md.compRefs["status3"];
        sys.setInputWatch(sta3Obj, "directName", "gr.status3", "innerText");
        var sta2Obj = md.compRefs["status2"];
        sys.setInputWatch(sta2Obj, "directName", "gr.status2", "innerText");
        var sta1Obj = md.compRefs["status1"];
        sys.setInputWatch(sta1Obj, "directName", "gr.status1", "innerText");
        self.loadParas();
        self.socketPrg();
        if (op.pageInx === 0) {
            var tobj = md.compRefs["testStartButton"];
            if (tobj)
                sys.setInputWatch(tobj, "directName", "self.fatherMd.stas.testStatus.selfTestAllStart_f", "disable_f", 1);
            var tobj = md.compRefs["testStopButton"];
            if (tobj)
                sys.setInputWatch(tobj, "directName", "self.fatherMd.stas.testStatus.testStopButtonText", "innerText", 1);
            //
            for (var i = 0; i < op.slotLen; i++) {
                var slotObj = md.compRefs["slot#" + i];
                var str = "self.fatherMd.stas.slotNames[" + i + "]";
                if (slotObj)
                    sys.setInputWatch(slotObj, "directName", str, "innerText", 1);
                var ledObj = md.compRefs["slotLed#" + i];
                var str0 = "self.fatherMd.stas.slotLeds[" + i + "]";
                var str1 = "self.fatherMd.stas.slotLedHides[" + i + "]";
                if (ledObj) {
                    sys.setInputWatch(ledObj, "directName", str0, "backgroundInx", 1);
                    sys.setInputWatch(ledObj, "directName", str1, "hidden_f", 1);
                }

            }

            return;
        }
        if (op.pageInx === 1) {
            var mdObj = md.modelRefs["phone0"];
            var lcdObj = mdObj.compRefs["lcdLine1"];
            sys.setInputWatch(lcdObj, "directName", "self.fatherMd.fatherMd.opts.icsDatas.sipData0.sipStatus", "innerText");
            var lcdObj = mdObj.compRefs["lcdLine2"];
            sys.setInputWatch(lcdObj, "directName", "self.fatherMd.fatherMd.opts.icsDatas.sipData0.sipAction", "innerText");
            var sobj = mdObj.compRefs["phoneKeyButton#1"];
            sys.setInputWatch(sobj, "directName", "self.fatherMd.fatherMd.stas.page1Phone0.earPhoneKey_baseColor", "baseColor");
            var sobj = mdObj.compRefs["phoneKeyButton#2"];
            sys.setInputWatch(sobj, "directName", "self.fatherMd.fatherMd.stas.page1Phone0.speakerKey_baseColor", "baseColor");
            var sobj = mdObj.compRefs["phoneKeyS"];
            sys.setInputWatch(sobj, "directName", "self.fatherMd.fatherMd.stas.page1Phone0.phoneKeyS_backgroundInx", "backgroundInx", 1);
            var sobj = mdObj.compRefs["funcButton#14"];
            sys.setInputWatch(sobj, "directName", "self.fatherMd.fatherMd.stas.page1Phone0.holdKey_innerTextColor", "innerTextColor");
            var sobj = mdObj.compRefs["funcButton#15"];
            sys.setInputWatch(sobj, "directName", "self.fatherMd.fatherMd.stas.page1Phone0.muteKey_innerTextColor", "innerTextColor");
            var sobj = mdObj.compRefs["funcButton#16"];
            sys.setInputWatch(sobj, "directName", "self.fatherMd.fatherMd.stas.page1Phone0.dtmfKey_innerTextColor", "innerTextColor");

            var sobj = mdObj.compRefs["funcButton#12"];
            sys.setInputWatch(sobj, "directName", "self.fatherMd.fatherMd.stas.page1Phone0.line1Key_baseColor", "baseColor");
            sys.setInputWatch(sobj, "directName", "self.fatherMd.fatherMd.stas.page1Phone0.line1Key_innerTextColor", "innerTextColor");
            var sobj = mdObj.compRefs["funcButton#13"];
            sys.setInputWatch(sobj, "directName", "self.fatherMd.fatherMd.stas.page1Phone0.line2Key_baseColor", "baseColor");
            sys.setInputWatch(sobj, "directName", "self.fatherMd.fatherMd.stas.page1Phone0.line2Key_innerTextColor", "innerTextColor");

            var mdObj = md.modelRefs["phone1"];
            var lcdObj = mdObj.compRefs["lcdLine1"];
            sys.setInputWatch(lcdObj, "directName", "self.fatherMd.fatherMd.opts.icsDatas.sipData1.sipStatus", "innerText");
            var lcdObj = mdObj.compRefs["lcdLine2"];
            sys.setInputWatch(lcdObj, "directName", "self.fatherMd.fatherMd.opts.icsDatas.sipData1.sipAction", "innerText");

            var sobj = mdObj.compRefs["phoneKeyButton#1"];
            sys.setInputWatch(sobj, "directName", "self.fatherMd.fatherMd.stas.page1Phone1.earPhoneKey_baseColor", "baseColor");
            var sobj = mdObj.compRefs["phoneKeyButton#2"];
            sys.setInputWatch(sobj, "directName", "self.fatherMd.fatherMd.stas.page1Phone1.speakerKey_baseColor", "baseColor");
            var sobj = mdObj.compRefs["phoneKeyS"];
            sys.setInputWatch(sobj, "directName", "self.fatherMd.fatherMd.stas.page1Phone1.phoneKeyS_backgroundInx", "backgroundInx", 1);
            var sobj = mdObj.compRefs["funcButton#14"];
            sys.setInputWatch(sobj, "directName", "self.fatherMd.fatherMd.stas.page1Phone1.holdKey_innerTextColor", "innerTextColor");
            var sobj = mdObj.compRefs["funcButton#15"];
            sys.setInputWatch(sobj, "directName", "self.fatherMd.fatherMd.stas.page1Phone1.muteKey_innerTextColor", "innerTextColor");
            var sobj = mdObj.compRefs["funcButton#16"];
            sys.setInputWatch(sobj, "directName", "self.fatherMd.fatherMd.stas.page1Phone1.dtmfKey_innerTextColor", "innerTextColor");

            var sobj = mdObj.compRefs["funcButton#12"];
            sys.setInputWatch(sobj, "directName", "self.fatherMd.fatherMd.stas.page1Phone1.line1Key_baseColor", "baseColor");
            sys.setInputWatch(sobj, "directName", "self.fatherMd.fatherMd.stas.page1Phone1.line1Key_innerTextColor", "innerTextColor");
            var sobj = mdObj.compRefs["funcButton#13"];
            sys.setInputWatch(sobj, "directName", "self.fatherMd.fatherMd.stas.page1Phone1.line2Key_baseColor", "baseColor");
            sys.setInputWatch(sobj, "directName", "self.fatherMd.fatherMd.stas.page1Phone1.line2Key_innerTextColor", "innerTextColor");





        }


    }

    cmdPrg(cmd) {
        var self = this;
        var md = self.md;
        var op = md.opts;
        if (cmd.act === "clearEditor") {
            var kvObj = md.compRefs["editor"];
            if (!kvObj)
                return;
            var editor = kvObj.objs["editor"];
            KvLib.clearEditorMaker(editor);
            editor.getSession().setValue("");
            return;
        }
        if (cmd.act === "insertEditor") {
            var kvObj = md.compRefs["editor"];
            if (!kvObj)
                return;
            var editor = kvObj.objs["editor"];
            editor.insert(cmd.text);
            return;
        }
        if (cmd.act === "setMaker") {
            var kvObj = md.compRefs["editor"];
            if (!kvObj)
                return;
            var editor = kvObj.objs["editor"];
            KvLib.setEditorMaker(editor, cmd.color);
            return;
        }

        if (cmd.act === "gotoEnd") {
            var kvObj = md.compRefs["editor"];
            if (!kvObj)
                return;
            var editor = kvObj.objs["editor"];
            var row = editor.session.getLength() - 1;
            var column = editor.session.getLine(row).length; // or simply Infinity
            editor.gotoLine(row + 1, column);
        }
    }

    timeOutObjsPrg() {
        var self = this;
        for (var i = 0; i < self.timeOutObjs.length; i++) {
            var tobj = self.timeOutObjs[i];
            if (tobj.time) {
                tobj.time--;
                if (!tobj.time) {
                    tobj.timeOutPrg(self, tobj);
                }
            }
            if (!tobj.time)
                self.timeOutObjs.splice(i, 1);
        }
    }

    timeActObjsPrg() {
        var self = this;
        for (var i = 0; i < self.timeActObjs.length; i++) {
            var tobj = self.timeActObjs[i];
            if (tobj.time) {
                tobj.time--;
                tobj.timeActPrg(self, tobj);
                if (!tobj.time)
                    self.timeActObjs.splice(i, 1);
            }
        }
    }

    getRecordFile_tact(self, tobj) {
        var md = self.md;
        var op = md.opts;
        if (tobj.step === 0) {
            tobj.step = 1;
            tobj.time = 40 * 60;
            //======================================
            var sockOutobj = {};
            sockOutobj.act = "getRecordFile";
            sockOutobj.userName = gr.userName;
            sockOutobj.actInx = ++op.actInx;
            sockOutobj.fileName = tobj.fileName;
            sockOutobj.exNumber = tobj.exNumber;
            gr.socketRetPrgTbl[sockOutobj.act + "~react"] = function (mesObj) {
                delete gr.socketRetPrgTbl[sockOutobj.act + "~react"];
                gr.socketRetPrgTbl["getRecordFile"] = function (jobj) {
                    console.log(jobj);
                    sys.popOff(2);
                    delete gr.socketRetPrgTbl["getRecordFile"];
                    tobj.step = 2;
                    tobj.time = 1;
                    var escFunc = function (iobj) {
                        console.log(iobj);
                    };
                    var obj = {};
                    obj.fileName = jobj.path + jobj.outFileName;
                    obj.width = 800;
                    obj.height = 200;
                    obj.actionFunc = escFunc;
                    var mobj = sys.audioPlayBox(obj);



                };
                return;
            };
            self.sendSocket(sockOutobj);
            var escFunc = function (iobj) {
                tobj.step = 2;
                tobj.time = 1;
            };
            sys.mesBox("cy~Get File", 500, "Please Wait .....", ["ESC"], escFunc);
        }
        if (tobj.step === 1) {
            tobj.time--;
            if (tobj.time > 0) {
                return;
            }
            sys.popOff(2);
            sys.mesBox("cr~Error", 500, "蝟餌絞?∪???!!!", ["ESC"], null);
            tobj.step = 2;
            tobj.time = 1;
            return;
        }
        if (tobj.step === 2) {
            tobj.time = 0;
            return;
        }

    }

    getExRecordNames_tact(self, tobj) {
        var md = self.md;
        var op = md.opts;
        if (tobj.step === 0) {
            tobj.step = 1;
            tobj.time = 4 * 60;
            //======================================
            var sockOutobj = {};
            sockOutobj.act = "getExRecordNames";
            sockOutobj.userName = gr.userName;
            sockOutobj.exNumber = tobj.exNumber;
            sockOutobj.actInx = ++op.actInx;
            gr.socketRetPrgTbl[sockOutobj.act + "~react"] = function (mesObj) {
                delete gr.socketRetPrgTbl[sockOutobj.act + "~react"];
                gr.socketRetPrgTbl["getExRecordNames"] = function (iobj) {
                    console.log(iobj);
                    sys.popOff(2);
                    delete gr.socketRetPrgTbl["getExRecordNames"];
                    var strB = JSON.parse(iobj.fileNames);
                    strB.sort();
                    var strA = [];
                    for (var i = 0; i < strB.length; i++) {
                        strA.push(strB[strB.length - i - 1]);
                    }

                    gr.urlSelectObj.urls = JSON.parse(JSON.stringify(strA));
                    var obj = {};
                    obj.selects = strA;
                    obj.yc = 16;
                    obj.xc = 2;
                    obj.selectEsc_f = 0;
                    obj.title = "?豢?瑼?";
                    obj.actionFunc = function (sobj) {
                        console.log(sobj);
                        if (sobj.act !== "selected")
                            return;
                        var nobj = {};
                        nobj.id = "getRecordFile";
                        nobj.fileName = iobj.path + "/" + sobj.text;
                        nobj.exNumber = tobj.exNumber;
                        nobj.time = 1;
                        nobj.step = 0;
                        nobj.timeActPrg = self.getRecordFile_tact;
                        self.timeActObjs.push(nobj);


                        /*
                         gr.serverResponseFunc = function (iobj) {
                         console.log(iobj);
                         };    
                         var sockOutobj = {};
                         sockOutobj.act = "getRecordFile";
                         sockOutobj.actInx = ++op.actInx;
                         sockOutobj.fileName = iobj.path+"/"+sobj.text;
                         sockOutobj.exNumber = tobj.exNumber;
                         self.sendSocket(sockOutobj);
                         var escFunc = function (iobj) {
                         tobj.step = 2;
                         tobj.time = 1;
                         };
                         sys.mesBox("cy~Get File", 500, "Please Wait .....", ["ESC"], escFunc);
                         */


                        /*    
                         var jobj = {};
                         jobj.sonprgName = "Ics";
                         jobj.act = "transGsmToMp3";
                         jobj.path = "./user-webIcs/record/";
                         jobj.inFileName = "test1.gsm";
                         jobj.outFileName = "test1.mp3";
                         var jsonStr = JSON.stringify(jobj);
                         
                         var escFunc = function (iobj) {
                         console.log(iobj);
                         };
                         gr.serverResponseFunc = function (iobj) {
                         console.log(iobj);
                         if (iobj.type === "Son Command OK") {
                         var escFunc = function (iobj) {
                         console.log(iobj);
                         };
                         var obj = {};
                         obj.fileName = jobj.path + jobj.outFileName;
                         obj.width = 800;
                         obj.height = 200;
                         obj.actionFunc = escFunc;
                         var mobj = sys.audioPlayBox(obj);
                         }
                         };
                         Test.server_sonprg("response none", null, jsonStr);
                         return;
                         */

                    };
                    var mod = new Model("", "Md_selectBox", obj, {});
                    var hh = gr.clientH - 20;
                    var ww = gr.clientW - 20;
                    sys.popModel(mod, ww, hh);
                    KvLib.deleteObjsId(self.timeActObjs, "getExRecordNames");
                    return;
                };
                return;
            };
            self.sendSocket(sockOutobj);
            var escFunc = function (iobj) {
                tobj.step = 2;
                tobj.time = 1;
            };
            sys.mesBox("cy~Get Files", 500, "Please Wait .....", ["ESC"], escFunc);
        }
        if (tobj.step === 1) {
            tobj.time--;
            if (tobj.time > 0) {
                return;
            }
            sys.popOff(2);
            sys.mesBox("cr~Error", 500, "蝟餌絞?∪???!!!", ["ESC"], null);
            tobj.step = 2;
            tobj.time = 1;
            return;
        }
        if (tobj.step === 2) {
            tobj.time = 0;
            return;
        }
    }

    selfTestAll_tact(self, tobj) {
        var md = self.md;
        var op = md.opts;
        if (tobj.step === 0) {
            tobj.inx = 0;
            tobj.step = 1;
            tobj.time = 1 * 60;
            self.cmdPrg({act: "clearEditor"});
            var str = "======== ?函頂蝯望葫閰阡?憪?========";
            self.cmdPrg({act: "insertEditor", text: str});
            self.cmdPrg({act: "gotoEnd"});
            for (var i = 0; i < 20; i++) {
                op.testStatus.testStaA[i] = 0;
            }
            op.testStatus.selfTestAllStart_f = 1;
            op.testStatus.selfTestAllStop_f = 0;
            return;
        }
        //slot test
        if (tobj.step === 1) {
            tobj.time--;
            if (tobj.time > 0) {
                return;
            }
            var slotDatas = op.icsDatas.slotDatas;
            if (tobj.inx >= slotDatas.length) {
                tobj.step = 3;
                tobj.time = 1;
                return;
            }
            var slotData = slotDatas[tobj.inx];
            var slotName = self.getSlotName(slotData);
            if (slotName === "") {
                tobj.inx++;
                tobj.time = 1;
                return;
            }
            op.testStatus.testStaA[tobj.inx] = 1;
            tobj.step = 2;
            tobj.time = 20 * 60;
            tobj.infBuf = op.icsDatas.actionInf;
            //======================================
            var str = "\n\nSlot " + (tobj.inx + 1) + "  " + slotName;
            self.cmdPrg({act: "insertEditor", text: str});
            self.cmdPrg({act: "gotoEnd"});
            var sockOutobj = {};
            sockOutobj.act = "selfTest";
            sockOutobj.subAct = "slotTest";
            sockOutobj.slotCnt = tobj.inx;
            tobj.actInx = ++op.actInx;
            sockOutobj.actInx = tobj.actInx;
            gr.socketRetPrgTbl[sockOutobj.act + "~react"] = function (mesObj) {
                delete gr.socketRetPrgTbl[sockOutobj.act + "~react"];
                var str = " ==> 皜祈岫??";
                self.cmdPrg({act: "insertEditor", text: str});
                self.cmdPrg({act: "gotoEnd"});
                op.testStatus.testStaA[tobj.inx] = 1;
                console.log(mesObj);
            };
            self.sendSocket(sockOutobj);
        }
        if (tobj.step === 2) {
            tobj.time--;
            if (tobj.time > 0) {
                if (op.icsDatas.actionInx === tobj.actInx) {
                    if (op.icsDatas.actionStatus < 2) {
                        if (op.icsDatas.actionInf !== tobj.infBuf) {
                            tobj.infBuf = op.icsDatas.actionInf;
                            self.cmdPrg({act: "insertEditor", text: tobj.infBuf});
                            self.cmdPrg({act: "gotoEnd"});
                        }
                        return;
                    } else {
                        op.icsDatas.actionStatus = 2;
                        op.testStatus.testStaA[tobj.inx] = op.icsDatas.actionStatus;
                        if (op.icsDatas.actionStatus === 2)
                            self.printInfColor(op.icsDatas.actionInf, "green");
                        if (op.icsDatas.actionStatus === 3)
                            self.printInfColor(op.icsDatas.actionInf, "red");
                        tobj.inx++;
                        tobj.step = 1;
                        tobj.time = 200;
                        return;
                    }
                }
                return;
            }
            op.testStatus.testStaA[tobj.inx] = 3;
            self.printSystemNoAnswer();
            tobj.inx++;
            tobj.step = 1;
            tobj.time = 200;
            return;
        }
        if (tobj.step === 3) {
            str = "\n\n======== 皜祈岫蝯? ========";
            self.cmdPrg({act: "insertEditor", text: str});
            self.cmdPrg({act: "gotoEnd"});
            op.testStatus.selfTestAllStop_f = 1;
            return;
        }
    }

    clearSelfTest() {
        var self = this;
        var op = self.md.opts;
        //
        self.sendSocket({act: "selfTestAllStop"});
        //
        self.cmdPrg({act: "clearEditor"});
        op.testStatus.selfTestAllStart_f = 0;
        KvLib.deleteObjsId(self.timeActObjs, "selfTestAll");
        for (var i = 0; i < 20; i++) {
            op.testStatus.testStaA[i] = 0;
        }
    }
    printSystemNoAnswer = function () {
        var self = this;
        var str = "\n蝟餌絞?∪???!!!";
        self.cmdPrg({act: "insertEditor", text: str});
        self.cmdPrg({act: "setMaker", color: "red"});
        self.cmdPrg({act: "gotoEnd"});
    }

    printInfColor = function (str, color) {
        var self = this;
        self.cmdPrg({act: "insertEditor", text: str});
        self.cmdPrg({act: "setMaker", color: color});
        self.cmdPrg({act: "gotoEnd"});
    }

    setTestLed(status, flashTime) {
        if (!status) {
            return 0;
        }
        if (status === 1) {
            if (flashTime > 10)
                return 0;
            else {
                return 3;
            }
            return;
        }
        if (status === 2) {
            return 1;
        }
        if (status === 3) {
            return 2;
        }
    }
    chkWatch() {
        var self = this;
        var md = self.md;
        var op = md.opts;
        var st = md.stas;
        if (!op.afterCreate_f)
            return;
        //=============================
        var self = this;
        if (++self.tickTime >= self.tickTimeK) {
            self.tickTime = 0;
            var obj = {};
            obj.act = "tick";
//          console.log("tick");
            self.sendSocket(obj);
        }

        //=============================
        gr.status3 = ani.dispFs;

        this.flashTime++;
        if (this.flashTime > 20)
            this.flashTime = 0;
        //self.syncConnectTx();
        self.timeOutObjsPrg();
        self.timeActObjsPrg();
        //self.transSyncData();

        return;

    }

    loadParas() {
        var self = this;
        var md = self.md;
        var op = md.opts;
        var paraSet = gr.paraSet;
        return;
    }

    saveParas() {
        var self = this;
        var str = "{\n";
        var keys = Object.keys(gr.paraSet);
        for (var i = 0; i < keys.length; i++) {
            if (i === 0)
                str += " ";
            else
                str += ",";
            str += "\"" + keys[i] + "\" : ";
            if (Array.isArray(gr.paraSet[keys[i]])) {
                var ary = gr.paraSet[keys[i]];
                str += "[\n";
                for (var j = 0; j < ary.length; j++) {
                    if (j === 0)
                        str += "     ";
                    else
                        str += "    ,";
                    str += "\"" + ary[j] + "\"\n";
                }
                str += "    ]\n";
            } else {
                str += "\"" + gr.paraSet[keys[i]] + "\"\n";
            }
        }
        str += "}\n";
        gr.serverCallBack = function (iobj, mes) {
            if (mes.opts.status === "OK") {
                console.log(mes);
                var obj = {};
                obj.act = "reloadParaSet";
                self.sendSocket(obj);
            }
        };
        Test.server_saveStringToFile("response error", "exeCallBackFunc", str, "user-" + gr.systemName + "/paraSet.json");
    }
    //return err_f
    checkCombineGroup(value) {
        var strA = value.trim().split(",");
        if (strA.length === 0)
            return 1;
        if (value.trim() === "all")
            return 0;
        for (var i = 0; i < strA.length; i++) {
            var trimStr = strA[i].trim();
            if (trimStr.length < 1)
                return 1;
            var err_f = KvLib.checkFont(trimStr, "0123456789*");
            if (err_f) {
                var exNoGroups = gr.paraSet['exNoGroups'];
                var exist = 0;
                for (var j = 0; j < exNoGroups.length; j++) {
                    var strB = exNoGroups[j].split('~');
                    if (trimStr === strB[0]) {
                        exist = 1;
                        break;
                    }
                }
                if (!exist)
                    return 1;
            }
        }
        return 0;
    }

    build(md) {
        var self = this;
        this.md = md;
        var op = md.opts;
        var st = md.stas;
        var lyMap = md.lyMap;
        var comps = op.comps;
        var models = op.models;
        var layouts = op.layouts;
        var layoutGroups = op.layoutGroups;
        self.transIcsData();
        //======================================================================
        var opts = {};
        var cname = "c";
        opts.xc = 1;
        opts.yc = 2;
        opts.ihO = {};
        opts.ihO.c0 = 100;
        opts.ihO.c1 = 9999;
        opts.baseColor = "#222";
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("headBar", "c~0");
        lyMap.set("mainBody", "c~1");
        //======================================================================
        var pageInx = op.pageInx;
        if (pageInx === 0) {
            var cname = lyMap.get("mainBody");
            var opts = {};
            opts.yc = 3;
            opts.ihO = {};
            opts.ihO.c0 = 9999;
            opts.ihO.c1 = 200;
            opts.ihO.c2 = 24;
            opts.margin = 0;
            opts.ym = 10;
            layouts[cname] = {name: cname, type: "base", opts: opts};
            lyMap.set("pnMain", cname);
            //======================================================================
            var cname = lyMap.get("pnMain") + "~0";
            var opts = {};
            opts.whr = 2;
            layouts[cname] = {name: cname, type: "base", opts: opts};
            lyMap.set("pnMain00", cname);



            var cname = lyMap.get("pnMain00") + "~0";
            var opts = {};
            opts.xc = op.slotLen;
            layouts[cname] = {name: cname, type: "base", opts: opts};
            lyMap.set("pnMainUp", cname);
            //======================================================================

            for (var i = 0; i < op.slotLen; i++) {
                var cname = lyMap.get("pnMainUp") + "~" + i;
                var opts = {};
                opts.yc = 3;
                opts.ihO = {};
                opts.ihO.c0 = 9999;
                opts.ihO.c1 = 60;
                opts.ihO.c2 = 10;

                var strA = op.slotNames[i].split("#");

                layouts[cname] = {name: cname, type: "base", opts: opts};
                lyMap.set("pnMainUp" + i, cname);

                var cname = lyMap.get("pnMainUp" + i) + "~" + 1;
                var opts = {};
                opts.backgroundInx = 0;
                opts.zIndex = 10;
                opts.zzIndex = 10;

                comps[cname] = {name: "slotLed#" + i, type: "label~led", opts: opts};

                var cname = lyMap.get("pnMainUp") + "~" + i;
                var opts = {};
                opts.innerText = "";
                opts.backgroundInx = 0;
                opts.backgroundImageUrls = ['./systemResource/gray-sid1.bmp'];
                opts.writingMode = "vertical-lr";
                opts.fontSize = "0.4rw";
                opts.textAlign = "top";
                opts.textShadow = "1px 1px 1px #aaa";
                opts.zIndex = 1;
                opts.zzIndex = 1;
                comps[cname] = {name: "slot#" + i, type: "plate~none", opts: opts};
            }

            var cname = lyMap.get("pnMain") + "~1";
            var opts = {};
            opts.xc = 2;
            opts.iwO = {};
            opts.iwO.c0 = 9999;
            opts.iwO.c1 = 120;
            opts.xm = 10;
            layouts[cname] = {name: cname, type: "base", opts: opts};
            lyMap.set("pnMain1", cname);

            var cname = lyMap.get("pnMain1") + "~0";
            var opts = {};
            opts.hideNo_f = 0;
            opts.readOnly_f = 1;
            opts.wrapLine = 100;
            comps[cname] = {name: "editor", type: "editor~sys", opts: opts};




            var cname = lyMap.get("pnMain1") + "~1";
            var opts = {};
            opts.yc = 2;
            opts.ih = 80;
            opts.ym = 20;
            opts.hAlign = "center";
            layouts[cname] = {name: cname, type: "base", opts: opts};
            lyMap.set("pnMain1r", cname);

            var cname = lyMap.get("pnMain1r") + "~0";
            var opts = {};
            opts.innerText = "?芣葫??";
            opts.clickFunc = function () {
                self.timeActObjs.push({id: "selfTestAll", time: 1, step: 0, timeActPrg: self.selfTestAll_tact});
            };
            comps[cname] = {name: "testStartButton", type: "button~sys", opts: opts};
            var cname = lyMap.get("pnMain1r") + "~1";
            var opts = {};
            opts.innerText = "?芣葫?迫";
            opts.clickFunc = function () {
                self = md.mdClass;
                self.sendSocket({act: "selfTestAllStop"});
                if (op.testStatus.selfTestAllStop_f === 0) {
                    var str = "\n==== 皜祈岫?迫 ====";
                    self.cmdPrg({act: "insertEditor", text: str});
                    self.cmdPrg({act: "gotoEnd"});
                    for (var i = 0; i < 20; i++) {
                        if (op.testStatus.testStaA[i] === 1)
                            op.testStatus.testStaA[i] = 0;
                    }
                    op.testStatus.selfTestAllStop_f = 1;
                } else {
                    op.testStatus.selfTestAllStart_f = 0;
                    self.cmdPrg({act: "clearEditor"});
                    for (var i = 0; i < 20; i++)
                        op.testStatus.testStaA[i] = 0;
                }
                KvLib.deleteObjsId(self.timeActObjs, "selfTestAll");
            };
            comps[cname] = {name: "testStopButton", type: "button~sys", opts: opts};

            var cname = lyMap.get("pnMain") + "~" + 2;
            mac.setFootBar(layouts, lyMap, comps, cname);


        }

        if (pageInx === 1) {



            var infCallPrg = function (phoneSet) {
                var paraSet = gr.paraSet;
                var opts = {};
                var saveId = "phAHotlines";

                var setInf = {};
                setInf.wr = [50, 100, 9999, 220, 100, 220, 120];
                setInf.heads = ["蝺刻?", "憿?", "?迂", "???Ⅳ", "???, "???撠情", ""];
                setInf.itemTypes = ["label", "label", "label", "label", "label", "label", "button"];
                setInf.baseColors = ["#333", "#333", "#333", "#333", "#333", "#333", "#333"];
                setInf.values = ["", "", "", "", "fsfsd", "", "?交?"];
                opts.setInf = setInf;
                opts.valuesA = [];
                var phExNos = gr.paraSet.phExNos;
                for (var i = 0; i < phExNos.length; i++) {
                    var arr = ["", "roip", "kevin", "301", "", "", "?交?"];
                    var strA = phExNos[i].split("~");
                    arr[0] = "" + (i + 1);
                    arr[1] = strA[0] + "-" + (KvLib.toInt(strA[1], 0) + 1);
                    arr[2] = strA[2];
                    arr[3] = strA[3];
                    arr[4] = "NA";
                    opts.valuesA.push(arr);
                }
                //=====================================
                opts.title = "?餉店";
                opts.rowCnt = 16;
                opts.rowStart = 0;
                opts.rowButtonOn_f = 1;
                opts.iconDisableA = [1, 1, 1, 1, 1, 1, 1, 0];
                opts.saveId = saveId;
                opts.phoneSet = phoneSet;
                opts.actionFunc = function (iobj) {
                    console.log(iobj);
                    if (iobj.act === "reDraw") {
                        var setNames = md.stas.setNamesObj;
                        var setArray = setNames.modelRefs["setArrayPanel"];
                        if (setArray) {
                            for (var i = 0; i < setArray.opts.rowCnt; i++) {
                                var lineCtr = setArray.modelRefs["Md_lineCtr#" + i];
                                if (lineCtr) {
                                    var obj = lineCtr.compRefs["item#" + 4];
                                    if (obj) {
                                        var noStr = lineCtr.opts.values[3];
                                        var directName = "self.fatherMd.fatherMd.fatherMd.popOwner.stas.exStatus";
                                        directName += "[\"" + noStr + "\"][\"inf\"]";
                                        sys.setInputWatch(obj, "directName", directName, "innerText");
                                        var directName = "self.fatherMd.fatherMd.fatherMd.popOwner.stas.exStatus";
                                        directName += "[\"" + noStr + "\"][\"color\"]";
                                        sys.setInputWatch(obj, "directName", directName, "innerTextColor");
                                    }

                                    var obj = lineCtr.compRefs["item#" + 5];
                                    if (obj) {
                                        var noStr = lineCtr.opts.values[3];
                                        var directName = "self.fatherMd.fatherMd.fatherMd.popOwner.stas.exStatus";
                                        directName += "[\"" + noStr + "\"][\"callWith\"]";
                                        sys.setInputWatch(obj, "directName", directName, "innerText");
                                    }


                                }
                            }
                        }
                    }
                    if (iobj.act === "buttonClick") {
                        if (iobj.name === "item#6") {
                            var obj = {};
                            obj.act = "callNumber";
                            var setNames = md.stas.setNamesObj;
                            obj.phoneSet = setNames.opts.phoneSet;
                            var setArray = setNames.modelRefs["setArrayPanel"];
                            if (setArray) {
                                var lineCtr = setArray.modelRefs["Md_lineCtr#" + iobj.indexStr];
                                if (lineCtr) {
                                    if (lineCtr.opts.values[1] === "fxo-1")
                                        obj.number = "*9" + lineCtr.opts.values[3];
                                    if (lineCtr.opts.values[1] === "sip-1")
                                        obj.number = lineCtr.opts.values[3];

                                    self.sendSocket(obj);
                                }
                            }
                            gr.mdSystem.mdClass.popOff(2);
                        }
                    }
                };
                var mod = new Model("md_setNames", "MdaSetNames", opts, {});
                md.stas.setNamesObj = mod;
                mod.popOwner = md;
                var ww = gr.clientW - 1;
                var hh = gr.clientH;
                var opts = {};
                opts.kvObj = mod;
                opts.w = ww;
                opts.h = hh;
                opts.x = 0;
                opts.y = gr.clientH - hh;
                opts.center_f = 0;
                sys.popOnModel(opts);
                //sys.popModel(mod, ww-100, hh-100);
            };

            var meetInfPrg = function (phoneSet) {
                var chkMeetRoom = function (roomNumber) {
                    var opts = {};
                    opts.title = "?降摰?" + roomNumber + ")鈭箏";
                    opts.xc = 2;
                    opts.yc = 20;
                    opts.meetRoomName = roomNumber;


                    opts.selects = [];
                    var meetGroups = gr.paraSet.meetGroups;
                    for (var i = 0; i < meetGroups.length; i++) {
                        var vstr = meetGroups[i];
                        var strA = vstr.split("~");
                        if (strA[0] === roomNumber) {
                            var roomMenber = {};
                            var strB = strA[2].split(",");
                            var strC = strA[3].split(",");
                            if (strB[0] === "all" || strC[0] === "all") {
                                var exNos = gr.paraSet.phExNos;
                                for (var j = 0; j < exNos.length; j++) {
                                    var strA = exNos[j].split("~");
                                    roomMenber[strA[3]] = 1;

                                }
                                break;
                            }
                            if (strB.length === 1) {
                                var groups = gr.paraSet.exNoGroups;
                                for (var j = 0; j < groups.length; j++) {
                                    var strD = groups[j].split("~");
                                    if (strD[0] === strB[0]) {
                                        strB = strD[1].split(",");
                                        break;
                                    }
                                }
                            }

                            if (strC.length === 1) {
                                var groups = gr.paraSet.exNoGroups;
                                for (var j = 0; j < groups.length; j++) {
                                    var strD = groups[j].split("~");
                                    if (strD[0] === strC[0]) {
                                        strC = strD[1].split(",");
                                        break;
                                    }
                                }
                            }

                            for (var j = 0; j < strB.length; j++)
                                roomMenber[strB[j]] = 0;
                            for (var j = 0; j < strC.length; j++)
                                roomMenber[strC[j]] = 0;
                            break;
                        }
                    }

                    var exNos = gr.paraSet.phExNos;
                    for (var key in roomMenber) {
                        var name = " ";
                        for (var j = 0; j < exNos.length; j++) {
                            var strA = exNos[j].split("~");
                            if (key !== strA[3])
                                continue;
                            name += strA[2];
                            break;
                        }
                        opts.selects.push(name + "," + key);
                    }





                    opts.actionFunc = function (iobj) {
                        console.log(iobj);
                        if (iobj.act === "reDraw") {
                            //var setNames = md.stas.setNamesObj;
                        }
                        if (iobj.act === "cancle") {
                            md.stas.meetRoomObj = null;
                        }
                    };
                    //var selectObj = mac.selectBox(opts, 0, 0);
                    if (phoneSet === 0)
                        var cname = lyMap.get("pnMain01");
                    else
                        var cname = lyMap.get("pnMain00");
                    var layout = md.layouts[cname];
                    var rect = layout.stas.lyRects[0];

                    var mod = new Model("selectBox", "Md_selectBox~sys", opts, {});
                    var popOpts = {};
                    var opts = {};
                    popOpts.kvObj = mod;
                    popOpts.w = rect.w;
                    popOpts.h = rect.h;
                    popOpts.x = rect.x;
                    popOpts.y = rect.y;
                    popOpts.center_f = 0;
                    var selectObj = sys.popOnModel(popOpts);
                    selectObj.popOwner = md;
                    md.stas.meetRoomObj = selectObj;
                };

                var meetGroups = gr.paraSet.meetGroups;
                var exSta = md.stas.exStatus[md.stas.mainMenberEx];

                if (exSta) {
                    for (var i = 0; i < meetGroups.length; i++) {
                        var strA = meetGroups[i].split("~");
                        /*
                         if (exSta.callWith === strA[0]) {
                         chkMeetRoom(strA[0]);
                         return;
                         }
                         */
                    }
                }
                var opts = {};
                opts.title = "?豢??降摰?;
                opts.xc = 2;
                opts.yc = 10;
                opts.selects = [];
                var meetGroups = gr.paraSet.meetGroups;
                for (var i = 0; i < meetGroups.length; i++) {
                    var vstr = meetGroups[i];
                    var strA = vstr.split("~");
                    opts.selects.push(strA[0]);

                }
                opts.actionFunc = function (iobj) {
                    console.log(iobj);
                    if (iobj.act === "selected") {
                        chkMeetRoom(iobj.text);
                    }
                };
                var selectObj = mac.selectBox(opts, 600, 600);
            };



            var broadInfPrg = function (phoneSet) {
                var chkBroadRoom = function (roomNumber) {
                    var opts = {};
                    opts.title = "撱?蝢斤?(" + roomNumber + ")鈭箏";
                    opts.xc = 3;
                    opts.yc = 20;
                    opts.broadRoomName = roomNumber;

                    opts.selects = [];
                    var broadGroups = gr.paraSet.broadGroups;
                    for (var i = 0; i < broadGroups.length; i++) {
                        var vstr = broadGroups[i];
                        var strA = vstr.split("~");
                        if (strA[0] === roomNumber) {
                            var roomMenber = {};
                            var strB = strA[1].split(",");
                            var strC = strA[2].split(",");
                            if (strB[0] === "all" || strC[0] === "all") {
                                var exNos = gr.paraSet.phExNos;
                                for (var j = 0; j < exNos.length; j++) {
                                    var strA = exNos[j].split("~");
                                    roomMenber[strA[2]] = 1;

                                }
                                break;
                            }
                            if (strB.length === 1) {
                                var groups = gr.paraSet.exNoGroups;
                                for (var j = 0; j < groups.length; j++) {
                                    var strD = groups[j].split("~");
                                    if (strD[0] === strB[0]) {
                                        strB = strD[1].split(",");
                                        break;
                                    }
                                }
                            }

                            if (strC.length === 1) {
                                var groups = gr.paraSet.exNoGroups;
                                for (var j = 0; j < groups.length; j++) {
                                    var strD = groups[j].split("~");
                                    if (strD[0] === strC[0]) {
                                        strC = strD[1].split(",");
                                        break;
                                    }
                                }
                            }

                            for (var j = 0; j < strB.length; j++)
                                roomMenber[strB[j]] = 0;
                            for (var j = 0; j < strC.length; j++)
                                roomMenber[strC[j]] = 0;
                            break;
                        }
                    }
                    var exNos = gr.paraSet.phExNos;
                    for (var key in roomMenber) {
                        var name = " ";
                        for (var j = 0; j < exNos.length; j++) {
                            var strA = exNos[j].split("~");
                            if (key !== strA[3])
                                continue;
                            name += strA[2];
                            break;
                        }
                        opts.selects.push(name + "," + key);
                    }



                    opts.actionFunc = function (iobj) {
                        console.log(iobj);
                        if (iobj.act === "reDraw") {
                            //var setNames = md.stas.setNamesObj;
                        }
                        if (iobj.act === "cancle") {
                            md.stas.broadRoomObj = null;
                        }
                    };
                    //var selectObj = mac.selectBox(opts, 0, 0);
                    if (phoneSet === 0)
                        var cname = lyMap.get("pnMain01");
                    else
                        var cname = lyMap.get("pnMain00");
                    var layout = md.layouts[cname];
                    var rect = layout.stas.lyRects[0];

                    var mod = new Model("selectBox", "Md_selectBox~sys", opts, {});
                    var popOpts = {};
                    var opts = {};
                    popOpts.kvObj = mod;
                    popOpts.w = rect.w;
                    popOpts.h = rect.h;
                    popOpts.x = rect.x;
                    popOpts.y = rect.y;
                    popOpts.center_f = 0;
                    var selectObj = sys.popOnModel(popOpts);
                    selectObj.popOwner = md;
                    md.stas.broadRoomObj = selectObj;


                };

                var broadGroups = gr.paraSet.broadGroups;
                var exSta = md.stas.exStatus[md.stas.mainMenberEx];

                if (exSta) {
                    for (var i = 0; i < broadGroups.length; i++) {
                        var strA = broadGroups[i].split("~");
                        if (exSta.callWith === strA[0]) {
                            chkbroadRoom(strA[0]);
                            return;
                        }
                    }
                }
                var opts = {};
                opts.title = "撱?蝢斤?";
                opts.xc = 2;
                opts.yc = 10;
                opts.selects = [];
                var broadGroups = gr.paraSet.broadGroups;
                for (var i = 0; i < broadGroups.length; i++) {
                    var vstr = broadGroups[i];
                    var strA = vstr.split("~");
                    opts.selects.push(strA[0]);

                }
                opts.actionFunc = function (iobj) {
                    console.log(iobj);
                    if (iobj.act === "selected") {
                        chkBroadRoom(iobj.text);
                    }
                };
                var selectObj = mac.selectBox(opts, 600, 600);
            };


            var callNumberPrg = function (phoneSet, inx) {
                var lines = gr.paraSet.phAHotlines;
                if (phoneSet)
                    var lines = gr.paraSet.phBHotlines;
                var strB = lines[KvLib.toInt(inx, 0)].split("~");
                if (!strB[0].trim().length)
                    return;
                var number = strB[1];
                var obj = {};
                obj.phoneSet = phoneSet;
                obj.act = "callNumber";
                obj.number = number;
                self.sendSocket(obj);

            };

            var cname = lyMap.get("mainBody");
            var opts = {};
            opts.xc = 2;
            opts.margin = 10;
            opts.xm = 20;
            layouts[cname] = {name: cname, type: "base", opts: opts};
            lyMap.set("pnMain", cname);



            var cname = lyMap.get("pnMain") + "~0";
            var opts = {};
            opts.whr = 0.7;
            layouts[cname] = {name: cname, type: "base", opts: opts};
            lyMap.set("pnMain00", cname);


            var cname = lyMap.get("pnMain00") + "~0";
            var opts = {};
            opts.title = "銝餅?";
            opts.hotlines = gr.paraSet.phAHotlines;
            opts.actionFunc = function (iobj) {
                console.log(iobj);
                if (iobj.key === "set") {
                    infCallPrg(0);
                    return;
                }
                if (iobj.key === "meetInf") {
                    meetInfPrg(0);
                    return;
                }
                if (iobj.key === "broadInf") {
                    broadInfPrg(0);
                    return;
                }
                var strA = iobj.key.split("~");
                if (strA[0] === "hotline") {
                    callNumberPrg(0, strA[1]);
                    return;
                }
                iobj.phoneSet = 0;
                self.sendSocket(iobj);
            };
            models[cname] = {name: "phone0", type: "Md_phoneBox~sys", opts: opts};

            var cname = lyMap.get("pnMain") + "~1";
            var opts = {};
            opts.whr = 0.7;
            layouts[cname] = {name: cname, type: "base", opts: opts};
            lyMap.set("pnMain01", cname);


            var cname = lyMap.get("pnMain01") + "~0";
            var opts = {};
            opts.title = "?舀?";
            opts.hotlines = gr.paraSet.phBHotlines;
            opts.actionFunc = function (iobj) {
                console.log(iobj);
                if (iobj.key === "set") {
                    infCallPrg(1);
                    return;
                }
                if (iobj.key === "meetInf") {
                    meetInfPrg(1);
                    return;
                }
                if (iobj.key === "broadInf") {
                    broadInfPrg(1);
                    return;
                }
                var strA = iobj.key.split("~");
                if (strA[0] === "hotline") {
                    callNumberPrg(1, strA[1]);
                    return;
                }
                iobj.phoneSet = 1;
                self.sendSocket(iobj);
            };
            models[cname] = {name: "phone1", type: "Md_phoneBox~sys", opts: opts};


        }


        if (pageInx === 2) {
            var cname = lyMap.get("mainBody");
            var opts = {};
            opts.xc = 2;
            opts.yc = 8;
            opts.xm = 20;
            opts.ym = 20;
            opts.margin = 40;
            layouts[cname] = {name: cname, type: "base", opts: opts};
            lyMap.set("pnMain", cname);


            var texts = [];
            texts.push('閰望?嚗∠蝺身摰?);
            texts.push('閰望?嚗Ｙ蝺身摰?);
            texts.push('撣唾?蝞∠?');
            texts.push('??閮剖?');
            texts.push('銝?祉黎蝯身摰?);
            texts.push('撱?蝢斤?閮剖?');
            texts.push('?降蝢斤?閮剖?');
            texts.push('蝢文蝢斤?閮剖?');
            texts.push('?脤?閮剖?');
            texts.push('蝟餌絞??');
            texts.push('蝟餌絞??');
            texts.push('?餃');
            texts.push('PBX ??');
            texts.push('????');












            for (var i = 0; i < texts.length; i++) {
                var cname = lyMap.get("pnMain") + "~" + i;
                var opts = {};
                opts.innerText = texts[i];
                opts.fontSize = "0.5rh";
                opts.baseColor = "#ccf";
                opts.borderRadius = "4px";


                opts.clickFunc = function (iobj) {
                    console.log(iobj);
                    var name = iobj.kvObj.name;
                    var titleText = iobj.kvObj.opts.innerText;
                    var strA = name.split('#');


                    if (strA[1] === '0' || strA[1] === '1') {
                        var paraSet = gr.paraSet;
                        if (strA[1] === '0')
                            var saveId = "phAHotlines";
                        if (strA[1] === '1')
                            var saveId = "phBHotlines";
                        opts = {};
                        var setInf = {};
                        setInf.wr = [100, 9999, 200, 120];
                        setInf.heads = ["蝺刻?", "憿舐內?迂", "???Ⅳ", ""];
                        setInf.itemTypes = ["label", "label", "label", "button"];
                        setInf.baseColors = ["#333", "#333", "#333", "#333"];
                        setInf.values = ["", "", "", "閮剖?"];
                        opts.setInf = setInf;
                        opts.valuesA = [];
                        var hotLines = paraSet[saveId];
                        for (var i = 0; i < hotLines.length; i++) {
                            var sobj = JSON.parse(JSON.stringify(setInf.values));
                            opts.valuesA.push(sobj);
                        }
                        for (var i = 0; i < hotLines.length; i++) {
                            opts.valuesA[i][0] = "" + (i + 1);
                            var strA = hotLines[i].split("~");
                            opts.valuesA[i][1] = strA[0];
                            opts.valuesA[i][2] = strA[1];
                        }
                        //=====================================
                        opts.title = titleText;
                        opts.rowCnt = 16;
                        opts.rowStart = 0;
                        opts.rowButtonOn_f = 0;
                        opts.iconDisableA = [1, 1, 1, 1, 1, 1, 0, 0];
                        opts.saveId = saveId;
                        opts.actionFunc = function (iobj) {
                            console.log(iobj);
                            if (iobj.act === "reDraw")
                                return;
                            if (iobj.kvObj) {
                                if (iobj.kvObj.opts.itemId === "save") {
                                    var modObj = md.stas.setNamesObj;
                                    var valuesA = [];
                                    var va = modObj.opts.valuesA;
                                    for (var i = 0; i < va.length; i++) {
                                        var str = va[i][1] + "~" + va[i][2];
                                        valuesA.push(str);
                                    }
                                    gr.paraSet[modObj.opts.saveId] = valuesA;
                                    self.saveParas();
                                }
                                return;
                            }
                            var name = iobj.name;
                            if (!name)
                                return;
                            var strA = name.split("#");
                            var itemInx = parseInt(strA[1]);
                            var index = parseInt(iobj.indexStr);
                            if (itemInx === 3) {

                                var setObjs = [];
                                var names = ["?迂", "??"];
                                var ids = ["name", "number"];
                                var modObj = md.stas.setNamesObj;
                                var valuesA = modObj.opts.valuesA;


                                var values = [valuesA[index][1], valuesA[index][2]];
                                var types = ["nstr", "str"];
                                for (var i = 0; i < names.length; i++) {
                                    var setObj = sys.setOptsSetFix(names[i], types[i]);
                                    if (i === 1) {
                                        var setObj = sys.setOptsSetFix(names[i], "fontStyle");
                                        setObj.enum = [];
                                        setObj.setType = "inputSelect";
                                        setObj.padType = "phoneNumber";
                                        setObj.checkLegelType = "phoneNumber";
                                        setObj.titleWidth = 0;
                                        setObj.selectBox = {xc: 2, yc: 16};
                                        setObj.selectActionStr =
                                                `        
                                            var strA=inValue.split(" ");
                                            outValue=strA[0];
                                        `;

                                        for (var j = 0; j < paraSet['phExNos'].length; j++) {
                                            var strA = paraSet['phExNos'][j].split("~");
                                            setObj.enum.push(strA[3] + " (" + strA[2] + ")");
                                        }
                                    }
                                    setObj.value = values[i];
                                    setObj.id = ids[i];
                                    setObj.textAlign = "left";
                                    setObj.titleWidth = 200;
                                    setObj.showDataType_f = 0;
                                    setObj.nameFontSize = "0.6rh";
                                    setObjs.push(setObj);
                                }


                                var opts = {};
                                opts.title = titleText + " " + (index + 1);
                                opts.pageItems = 2;
                                opts.rowCount = 2;
                                opts.actionFunc = function (iobj) {
                                    console.log(iobj);
                                    var name = iobj.value.name.trim();
                                    var numStr = "" + iobj.value.number;
                                    var number = numStr.trim();
                                    if (name.length === 0 || number.length === 0) {
                                        //sys.mesBox("cy~warn", 500, "Input Error !!!", ["ESC"]);
                                        //return;
                                    }
                                    var modObj = md.stas.setNamesObj;
                                    modObj.opts.valuesA[index][1] = name;
                                    modObj.opts.valuesA[index][2] = "" + number;
                                    var newMod = modObj.reCreate();
                                    md.stas.setNamesObj = newMod;

                                };
                                opts.tagOn_f = 0;
                                opts.setObjs = setObjs;
                                var height = 230;

                                var mod = new Model("", "Md_inputLineBox~sys", opts, {});
                                sys.popModel(mod, 800, height);
                            }
                        };
                        var mod = new Model("md_setNames", "MdaSetNames", opts, {});
                        md.stas.setNamesObj = mod;
                        sys.popModel(mod, 0, 0);
                        return;
                    }

                    if (strA[1] === '2') {
                        var paraSet = gr.paraSet;
                        var saveId = "userAcounts";
                        opts = {};
                        var setInf = {};
                        setInf.wr = [50, 100, 9999, 200, 120];
                        setInf.heads = ["", "蝺刻?", "?迂", "甈?", ""];
                        setInf.itemTypes = ["button", "label", "label", "label", "button"];
                        //setInf.fixeds = [0, 0, 1, 1];
                        setInf.values = ["", "", "", "0", "閮剖?", "0000"];
                        opts.setInf = setInf;
                        opts.valuesA = [];
                        var acounts = paraSet[saveId];
                        for (var i = 0; i < acounts.length; i++) {
                            var sobj = JSON.parse(JSON.stringify(setInf.values));
                            opts.valuesA.push(sobj);
                        }
                        for (var i = 0; i < acounts.length; i++) {
                            opts.valuesA[i][1] = "" + (i + 1);
                            var strA = acounts[i].split("~");
                            opts.valuesA[i][2] = strA[0];
                            opts.valuesA[i][3] = strA[1];
                            opts.valuesA[i][5] = strA[2];
                        }
                        //=====================================
                        opts.title = titleText;
                        opts.rowCnt = 16;
                        opts.rowStart = 0;
                        opts.rowButtonOn_f = 1;
                        opts.iconDisableA = [0, 0, 0, 0, 0, 0, 0, 0];
                        opts.saveId = saveId;
                        opts.selectInx = 0;
                        opts.actionFunc = function (iobj) {
                            console.log(iobj);
                            if (iobj.act === "reDraw")
                                return;
                            var editNewFunc = function (values, index, edit_f) {
                                var modObj = md.stas.setNamesObj;
                                var setObjs = [];
                                var names = ["?迂", "甈?", "撖Ⅳ"];
                                var ids = ["name", "level", "password"];
                                var types = ["str", "num", "str"];
                                for (var i = 0; i < names.length; i++) {
                                    var setObj = sys.setOptsSetFix(names[i], types[i]);
                                    setObj.value = values[i];
                                    setObj.id = ids[i];
                                    setObj.textAlign = "left";
                                    setObj.titleWidth = 200;
                                    setObj.showDataType_f = 0;
                                    setObj.nameFontSize = "0.6rh";
                                    if (i === 1) {
                                        setObj.max = 9;
                                        setObj.min = 0;

                                    }
                                    setObjs.push(setObj);
                                }
                                var opts = {};
                                opts.title = titleText + " " + (index + 1);
                                opts.pageItems = 3;
                                opts.rowCount = 3;
                                opts.actionFunc = function (iobj) {
                                    console.log(iobj);
                                    var name = iobj.value.name.trim();
                                    var levelStr = "" + iobj.value.level;
                                    var password = "" + iobj.value.password;
                                    var name = name.trim();
                                    var levelStr = levelStr.trim();
                                    var password = password.trim();
                                    var modObj = md.stas.setNamesObj;
                                    for (var i = 0; i < modObj.opts.valuesA.length; i++) {
                                        if (i === index)
                                            continue;
                                        if (modObj.opts.valuesA[i][2] === name) {
                                            sys.mesBox("cy~warn", 500, "Input Name Is Existed !!!", ["ESC"]);
                                            return;
                                        }
                                    }

                                    if (!edit_f) {
                                        index = modObj.opts.valuesA.length;
                                        var sobj = JSON.parse(JSON.stringify(modObj.opts.setInf.values));
                                        sobj[1] = "" + (index + 1);
                                        modObj.opts.valuesA.push(sobj);
                                        if (index >= (modObj.opts.rowStart + modObj.opts.rowCnt))
                                            modObj.opts.rowStart = index;
                                    }
                                    modObj.opts.valuesA[index][2] = name;
                                    modObj.opts.valuesA[index][3] = "" + levelStr;
                                    modObj.opts.valuesA[index][5] = "" + password;
                                    var newMod = modObj.reCreate();
                                    md.stas.setNamesObj = newMod;
                                };
                                opts.tagOn_f = 0;
                                opts.setObjs = setObjs;
                                var height = 260;
                                var mod = new Model("", "Md_inputLineBox~sys", opts, {});
                                sys.popModel(mod, 800, height);

                            };


                            if (iobj.kvObj) {
                                if (iobj.kvObj.opts.itemId === "save") {
                                    var modObj = md.stas.setNamesObj;
                                    var valuesA = [];
                                    var va = modObj.opts.valuesA;
                                    for (var i = 0; i < va.length; i++) {
                                        var str = va[i][2] + "~" + va[i][3] + "~" + va[i][5];
                                        valuesA.push(str);
                                    }
                                    gr.paraSet[modObj.opts.saveId] = valuesA;
                                    self.saveParas();
                                }
                                if (iobj.kvObj.opts.itemId === "new") {
                                    var modObj = md.stas.setNamesObj;
                                    var vas = modObj.opts.setInf.values;
                                    var values = [vas[2], vas[3], vas[5]];
                                    editNewFunc(values, -1, 0);
                                }
                                return;
                            }

                            var name = iobj.name;
                            if (!name)
                                return;
                            var strA = name.split("#");
                            var itemInx = parseInt(strA[1]);
                            var index = parseInt(iobj.indexStr);
                            var modObj = md.stas.setNamesObj;
                            if (itemInx === 4) {
                                var valuesA = modObj.opts.valuesA;
                                var values = [valuesA[index][2], valuesA[index][3], valuesA[index][5]];
                                editNewFunc(values, index, 1);
                            }
                        };
                        var mod = new Model("md_setNames", "MdaSetNames", opts, {});
                        md.stas.setNamesObj = mod;
                        sys.popModel(mod, 0, 0);
                        return;
                    }


                    //set extention
                    if (strA[1] === '3') {
                        var obj = {};
                        obj.selects = [];
                        obj.selects.push("頠? ??");
                        obj.selects.push("SIP ??");
                        obj.selects.push("FXO ??");
                        obj.selects.push("ROIP-1 ??");
                        obj.selects.push("ROIP-2 ??");
                        obj.selects.push("FXS-1 ??");
                        obj.selects.push("FXS-2 ??");
                        obj.selects.push("T1S-1 ??");
                        obj.selects.push("T1S-2 ??");
                        obj.selects.push("蝤撠?-1 ??");
                        obj.selects.push("蝤撠?-2 ??");
                        obj.yc = 6;
                        obj.xc = 2;
                        obj.selectEsc_f = 0;
                        obj.title = "??閮剖?";
                        obj.actionFunc = function (iobj) {

                            console.log(iobj);
                            if (iobj.act !== "selected")
                                return;
                            var slotCnt = 0;
                            if (iobj.inx === 0)
                                var phType = "soft";
                            if (iobj.inx === 1)
                                var phType = "sip";
                            if (iobj.inx === 2)
                                var phType = "fxo";
                            if (iobj.inx === 3)
                                var phType = "roip";
                            if (iobj.inx === 4) {
                                var phType = "roip";
                                slotCnt = 1;
                            }
                            if (iobj.inx === 5)
                                var phType = "fxs";
                            if (iobj.inx === 6) {
                                var phType = "fxs";
                                slotCnt = 1;
                            }
                            if (iobj.inx === 7)
                                var phType = "t1s";
                            if (iobj.inx === 8) {
                                var phType = "t1s";
                                slotCnt = 1;
                            }
                            if (iobj.inx === 9)
                                var phType = "mag";
                            if (iobj.inx === 10) {
                                var phType = "mag";
                                slotCnt = 1;
                            }
                            var saveId = "phExNos";
                            var paraSet = gr.paraSet;
                            opts = {};
                            var setInf = {};
                            setInf.wr = [50, 100, 9999, 200, 120];
                            setInf.heads = ["", "蝺刻?", "?迂", "??", "閮剖?"];
                            setInf.itemTypes = ["button", "label", "label", "label", "button"];
                            setInf.values = ["", "", "", "100", "閮剖?", "", "", 0, ""];
                            opts.setInf = setInf;
                            opts.valuesA = [];
                            var exNos = paraSet[saveId];
                            var inx = 0;
                            for (var i = 0; i < exNos.length; i++) {
                                var strA = exNos[i].split("~");
                                if (strA[0] !== phType)
                                    continue;
                                if (strA[1] !== ("" + slotCnt))
                                    continue;
                                var sobj = JSON.parse(JSON.stringify(setInf.values));
                                inx++;
                                sobj[1] = "" + (inx);//no
                                sobj[2] = strA[2];//name
                                sobj[3] = strA[3];//no
                                sobj[4] = "閮剖?";
                                sobj[5] = strA[4];//chaneel
                                sobj[6] = strA[5];//pickupGroup
                                sobj[7] = strA[6];//jmpGroup
                                sobj[8] = strA[7];//jmpNumber
                                sobj[9] = strA[8];//password
                                sobj[10] = strA[9];//ring time

                                opts.valuesA.push(sobj);
                            }
                            //=====================================
                            opts.title = iobj.text;
                            opts.rowCnt = 16;
                            opts.rowStart = 0;
                            opts.rowButtonOn_f = 1;
                            opts.iconDisableA = [0, 0, 0, 0, 0, 0, 0, 0];
                            opts.saveId = saveId;
                            opts.selectInx = 0;

                            opts.actionFunc = function (iobj) {
                                var editNewFunc = function (values, index, edit_f) {
                                    var modObj = md.stas.setNamesObj;
                                    var setObjs = [];
                                    var names = ["?迂", "??", "隞?蝢斤?", "頝唾?蝢斤?", "?駁?撖Ⅳ", "?輸??"];
                                    var ids = ["name", "exNo", "pickupGroup", "jmpGroup", "loginPassword", "ringTime"];
                                    var types = ["str", "str", "nstr", "nstr", "nstr", "nature999"];
                                    var channel_f = 0;
                                    if (phType === "fxo") {
                                        var names = ["?迂", "??", "頧?Ⅳ", "?輸??"];
                                        var ids = ["name", "exNo", "jmpNumber", "ringTime"];
                                        var types = ["str", "str", "nstr", "nature999"];
                                    }
                                    if (phType === "fxs" || phType === "t1s") {
                                        var names = ["?迂", "??", "?駁?", "隞?蝢斤?", "頝唾?蝢斤?", "?輸??"];
                                        var ids = ["name", "exNo", "channel", "pickupGroup", "jmpGroup", "ringTime"];
                                        var types = ["str", "str", "nature999", "nstr", "nstr", "nature999"];
                                        channel_f = 1;
                                    }

                                    if (phType === "mag") {
                                        var names = ["?迂", "??", "?駁?", "?輸??"];
                                        var ids = ["name", "exNo", "channel", "ringTime"];
                                        var types = ["str", "str", "nature999", "nature999"];
                                        channel_f = 1;
                                    }
                                    if (phType === "roip") {
                                        var names = ["?迂", "??", "?駁?撖Ⅳ", "?輸??"];
                                        var ids = ["name", "exNo", "loginPassword", "ringTime"];
                                        var types = ["str", "str", "nstr", "nature999"];
                                    }


                                    for (var i = 0; i < names.length; i++) {
                                        var setObj = sys.setOptsSetFix(names[i], types[i]);
                                        setObj.titleWidth = 200;
                                        if (ids[i] === "pickupGroup" || ids[i] === "jmpGroup") {
                                            var setObj = sys.setOptsSetFix(names[i], "fontStyle");
                                            var exNoGroups = gr.paraSet["exNoGroups"];
                                            setObj.enum = [];
                                            setObj.setType = "inputSelect";
                                            setObj.titleWidth = 200;
                                            setObj.nullOk_f = 1;
                                            setObj.enum.push("");
                                            setObj.enum.push("all");
                                            for (var j = 0; j < exNoGroups.length; j++) {
                                                var strA = exNoGroups[j].split("~");
                                                setObj.enum.push(strA[0]);
                                            }
                                            setObj.padType = "phoneNumberArray";
                                            setObj.memo_f = 1;
                                            setObj.selectBox = {xc: 2, yc: 16};
                                        }
                                        setObj.value = values[i];
                                        setObj.id = ids[i];
                                        setObj.textAlign = "left";
                                        setObj.showDataType_f = 0;
                                        setObj.nameFontSize = "0.6rh";
                                        if (ids[i] === "exNo" || ids[i] === "jmpNumber") {
                                            setObj.padType = "phoneNumber";
                                            setObj.checkLegelType = "phoneNumber";
                                        }
                                        //setObj.disSetButton_f = 1;
                                        setObjs.push(setObj);
                                    }
                                    var opts = {};
                                    opts.title = titleText + " " + (index + 1);
                                    opts.pageItems = 6;
                                    opts.rowCount = 6;
                                    opts.actionFunc = function (iobj) {
                                        console.log(iobj);
                                        var exNo = iobj.value.exNo.trim();
                                        var exName = iobj.value.name.trim();
                                        var modObj = md.stas.setNamesObj;
                                        for (var i = 0; i < modObj.opts.valuesA.length; i++) {
                                            if (i === index)
                                                continue;
                                            if (modObj.opts.valuesA[i][3] === exNo) {
                                                sys.mesBox("cy~warn", 500, "???Ⅳ撌脣???!!!", ["ESC"]);
                                                return;
                                            }
                                            if (channel_f) {
                                                var channel = "" + iobj.value.channel;
                                                if (modObj.opts.valuesA[i][7] === channel) {
                                                    sys.mesBox("cy~warn", 500, "?駁??Ⅳ撌脣???!!!", ["ESC"]);
                                                    return;
                                                }
                                            }
                                        }
                                        var exNos = paraSet[saveId];
                                        for (var j = 0; j < exNos.length; j++) {
                                            var strB = exNos[j].split("~");
                                            if (strB[0] === phType && strB[1] === ("" + slotCnt))
                                                continue;
                                            if (strB[3] === exNo) {
                                                sys.mesBox("cy~warn", 500, "???Ⅳ撌脣???!!!", ["ESC"]);
                                                return;
                                            }
                                        }

                                        if (!edit_f) {
                                            index = modObj.opts.valuesA.length;
                                            var sobj = JSON.parse(JSON.stringify(modObj.opts.setInf.values));
                                            sobj[1] = "" + (index + 1);
                                            modObj.opts.valuesA.push(sobj);
                                            if (index >= (modObj.opts.rowStart + modObj.opts.rowCnt))
                                                modObj.opts.rowStart = index;
                                        }
                                        var channel = iobj.value.channel;
                                        if (!channel)
                                            channel = 0;
                                        var pickupGroup = iobj.value.pickupGroup;
                                        if (!pickupGroup)
                                            pickupGroup = "";
                                        var jmpGroup = iobj.value.jmpGroup;
                                        if (!jmpGroup)
                                            jmpGroup = "";
                                        var jmpNumber = iobj.value.jmpNumber;
                                        if (!jmpNumber)
                                            jmpNumber = "";
                                        var loginPassword = iobj.value.loginPassword;
                                        if (!loginPassword)
                                            loginPassword = "";
                                        var ringTime = iobj.value.ringTime;
                                        if (!ringTime)
                                            ringTime = "0";


                                        modObj.opts.valuesA[index][2] = iobj.value.name;
                                        modObj.opts.valuesA[index][3] = "" + iobj.value.exNo;
                                        modObj.opts.valuesA[index][5] = "" + channel;
                                        modObj.opts.valuesA[index][6] = "" + pickupGroup;
                                        modObj.opts.valuesA[index][7] = "" + jmpGroup;
                                        modObj.opts.valuesA[index][8] = "" + jmpNumber;
                                        modObj.opts.valuesA[index][9] = "" + loginPassword;
                                        modObj.opts.valuesA[index][10] = "" + ringTime;
                                        var newMod = modObj.reCreate();
                                        md.stas.setNamesObj = newMod;
                                    };
                                    opts.tagOn_f = 0;
                                    opts.setObjs = setObjs;
                                    var height = 350;
                                    var mod = new Model("", "Md_inputLineBox~sys", opts, {});
                                    sys.popModel(mod, 800, height);

                                };


                                console.log(iobj);
                                if (iobj.kvObj) {
                                    if (iobj.kvObj.opts.itemId === "save") {
                                        var valuesA = [];
                                        var exNos = paraSet[saveId];
                                        for (var i = 0; i < exNos.length; i++) {
                                            var strA = exNos[i].split("~");
                                            if (strA[0] !== phType && strA[0] !== ("" + slotCnt))
                                                valuesA.push(exNos[i]);
                                        }
                                        var modObj = md.stas.setNamesObj;
                                        var va = modObj.opts.valuesA;
                                        for (var i = 0; i < va.length; i++) {
                                            var str = phType + "~" + slotCnt + "~" + va[i][2] + "~" + va[i][3];
                                            str += "~" + va[i][5] + "~" + va[i][6] + "~" + va[i][7] + "~" + va[i][8];
                                            str += "~" + va[i][9] + "~" + va[i][10];
                                            valuesA.push(str);
                                        }
                                        gr.paraSet[modObj.opts.saveId] = valuesA;
                                        self.saveParas();
                                    }
                                    if (iobj.kvObj.opts.itemId === "new") {
                                        var modObj = md.stas.setNamesObj;
                                        var vas = modObj.opts.setInf.values;
                                        var values = ["", "", "", "", "123456789", "0"];
                                        if (phType === "fxo")
                                            var values = ["", "", "", "0"];
                                        if (phType === "mag" || phType === "fxs" || phType === "t1s") {
                                            var values = ["", "", "0", "", "", "0"];
                                        }
                                        editNewFunc(values, -1, 0);
                                    }
                                    return;
                                }

                                var name = iobj.name;
                                if (!name)
                                    return;
                                var strA = name.split("#");
                                var itemInx = parseInt(strA[1]);
                                var modObj = md.stas.setNamesObj;
                                var index = parseInt(iobj.indexStr) + modObj.opts.rowStart;
                                if (itemInx === 4) {
                                    var valuesA = modObj.opts.valuesA;
                                    var values = [valuesA[index][2], valuesA[index][3], valuesA[index][6], valuesA[index][7]];
                                    values.push(valuesA[index][9]);
                                    values.push(valuesA[index][10]);
                                    if (phType === "roip") {
                                        var values = [valuesA[index][2], valuesA[index][3]];
                                        values.push(valuesA[index][9]);
                                        values.push(valuesA[index][10]);
                                    }

                                    if (phType === "fxo") {
                                        var values = [valuesA[index][2], valuesA[index][3], valuesA[index][8]];
                                        values.push(valuesA[index][10]);
                                    }
                                    if (phType === "fxs" || phType === "t1s") {
                                        var values = [valuesA[index][2], valuesA[index][3], valuesA[index][5]];
                                        values.push(valuesA[index][6]);
                                        values.push(valuesA[index][7]);
                                        values.push(valuesA[index][10]);
                                    }

                                    if (phType === "mag") {
                                        var values = [valuesA[index][2], valuesA[index][3], valuesA[index][5]];
                                        values.push(valuesA[index][10]);
                                    }


                                    editNewFunc(values, index, 1);
                                }
                            };

                            var mod = new Model("md_setNames", "MdaSetNames", opts, {});
                            md.stas.setNamesObj = mod;
                            sys.popModel(mod, 0, 0);
                            return;



                        };

                        var mod = new Model("", "Md_selectBox", obj, {});
                        sys.popModel(mod, 800, 500);
                        return;






                    }

                    //set group
                    if (strA[1] === '4') {
                        var paraSet = gr.paraSet;
                        var saveId = "exNoGroups";
                        opts = {};
                        var setInf = {};
                        setInf.wr = [50, 100, 9999, 120];
                        setInf.heads = ["", "蝺刻?", "?迂", ""];
                        setInf.itemTypes = ["button", "label", "label", "button"];
                        //setInf.fixeds = [0, 0, 1, 1];
                        setInf.values = ["", "", "", "閮剖?", ""];
                        opts.setInf = setInf;
                        opts.valuesA = [];
                        var acounts = paraSet[saveId];
                        for (var i = 0; i < acounts.length; i++) {
                            var sobj = JSON.parse(JSON.stringify(setInf.values));
                            opts.valuesA.push(sobj);
                        }
                        for (var i = 0; i < acounts.length; i++) {
                            opts.valuesA[i][1] = "" + (i + 1);
                            var strA = acounts[i].split("~");
                            opts.valuesA[i][2] = strA[0];
                            opts.valuesA[i][4] = strA[1];
                        }
                        //=====================================
                        opts.title = titleText;
                        opts.rowCnt = 16;
                        opts.rowStart = 0;
                        opts.rowButtonOn_f = 1;
                        opts.iconDisableA = [0, 0, 0, 0, 0, 0, 0, 0];
                        opts.saveId = saveId;
                        opts.selectInx = 0;
                        opts.actionFunc = function (iobj) {
                            var editNewFunc = function (values, index, edit_f) {
                                var modObj = md.stas.setNamesObj;
                                var setObjs = [];
                                var names = ["?迂", "蝢斤??Ⅳ"];
                                var ids = ["name", "groupNumbers"];
                                var types = ["str", "str"];
                                for (var i = 0; i < names.length; i++) {
                                    var setObj = sys.setOptsSetFix(names[i], types[i]);
                                    setObj.value = values[i];
                                    setObj.id = ids[i];
                                    setObj.textAlign = "left";
                                    setObj.titleWidth = 200;
                                    setObj.showDataType_f = 0;
                                    if (i === 1) {
                                        setObj.padType = "phoneNumberArray";
                                        setObj.checkLegelType = "phoneNumberArray";
                                        setObj.memo_f = 1;
                                    }
                                    setObj.nameFontSize = "0.6rh";
                                    setObjs.push(setObj);
                                }
                                var opts = {};
                                opts.title = titleText + " " + (index + 1);
                                opts.pageItems = 2;
                                opts.rowCount = 2;
                                opts.actionFunc = function (iobj) {
                                    console.log(iobj);
                                    var name = iobj.value.name.trim();
                                    var groupNumbers = "" + iobj.value.groupNumbers.trim();
                                    var modObj = md.stas.setNamesObj;
                                    for (var i = 0; i < modObj.opts.valuesA.length; i++) {
                                        if (i === index)
                                            continue;
                                        //if (modObj.opts.valuesA[i][2] === name) {
                                        //    sys.mesBox("cy~warn", 500, "Input Name Is Existed !!!", ["ESC"]);
                                        //    return;
                                        //}
                                    }
                                    if (!edit_f) {
                                        index = modObj.opts.valuesA.length;
                                        var sobj = JSON.parse(JSON.stringify(modObj.opts.setInf.values));
                                        sobj[1] = "" + (index + 1);
                                        modObj.opts.valuesA.push(sobj);
                                        if (index >= (modObj.opts.rowStart + modObj.opts.rowCnt))
                                            modObj.opts.rowStart = index;
                                    }
                                    modObj.opts.valuesA[index][2] = name;
                                    modObj.opts.valuesA[index][4] = "" + groupNumbers;
                                    var newMod = modObj.reCreate();
                                    md.stas.setNamesObj = newMod;
                                };
                                opts.tagOn_f = 0;
                                opts.setObjs = setObjs;
                                var height = 220;
                                var mod = new Model("", "Md_inputLineBox~sys", opts, {});
                                sys.popModel(mod, 800, height);

                            };


                            console.log(iobj);
                            if (iobj.kvObj) {
                                if (iobj.kvObj.opts.itemId === "save") {
                                    var modObj = md.stas.setNamesObj;
                                    var valuesA = [];
                                    var va = modObj.opts.valuesA;
                                    for (var i = 0; i < va.length; i++) {
                                        var str = va[i][2] + "~" + va[i][4];
                                        valuesA.push(str);
                                    }
                                    gr.paraSet[modObj.opts.saveId] = valuesA;
                                    self.saveParas();
                                }
                                if (iobj.kvObj.opts.itemId === "new") {
                                    var modObj = md.stas.setNamesObj;
                                    var vas = modObj.opts.setInf.values;
                                    var values = [vas[2], vas[4]];
                                    editNewFunc(values, -1, 0);
                                }
                                return;
                            }

                            var name = iobj.name;
                            if (!name)
                                return;
                            var strA = name.split("#");
                            var itemInx = parseInt(strA[1]);
                            var index = parseInt(iobj.indexStr);
                            var modObj = md.stas.setNamesObj;
                            if (itemInx === 3) {
                                var valuesA = modObj.opts.valuesA;
                                var values = [valuesA[index][2], valuesA[index][4]];
                                editNewFunc(values, index, 1);
                            }
                        };
                        var mod = new Model("md_setNames", "MdaSetNames", opts, {});
                        md.stas.setNamesObj = mod;
                        sys.popModel(mod, 0, 0);
                        return;
                    }

                    //set broad group
                    if (strA[1] === '5') {
                        var paraSet = gr.paraSet;
                        var saveId = "broadGroups";
                        opts = {};
                        var setInf = {};
                        setInf.wr = [50, 100, 9999, 120];
                        setInf.heads = ["", "蝺刻?", "撱??Ⅳ", ""];
                        setInf.itemTypes = ["button", "label", "label", "button"];
                        //setInf.fixeds = [0, 0, 1, 1];
                        setInf.values = ["", "", "", "閮剖?", "", ""];
                        opts.setInf = setInf;
                        opts.valuesA = [];
                        var acounts = paraSet[saveId];
                        for (var i = 0; i < acounts.length; i++) {
                            var sobj = JSON.parse(JSON.stringify(setInf.values));
                            opts.valuesA.push(sobj);
                        }
                        for (var i = 0; i < acounts.length; i++) {
                            opts.valuesA[i][1] = "" + (i + 1);
                            var strA = acounts[i].split("~");
                            opts.valuesA[i][2] = strA[0];
                            opts.valuesA[i][4] = strA[1];
                            opts.valuesA[i][5] = strA[2];
                        }
                        //=====================================
                        opts.title = titleText;
                        opts.rowCnt = 16;
                        opts.rowStart = 0;
                        opts.rowButtonOn_f = 1;
                        opts.iconDisableA = [0, 0, 0, 0, 0, 0, 0, 0];
                        opts.saveId = saveId;
                        opts.selectInx = 0;
                        opts.actionFunc = function (iobj) {
                            var editNewFunc = function (values, index, edit_f) {
                                var modObj = md.stas.setNamesObj;
                                var setObjs = [];
                                var names = ["撱??Ⅳ", "撱??潸絲??, "撱?蝢斤?"];
                                var ids = ["broadcastNumber", "broadcaster", "broadcastGroup"];
                                var types = ["str", "str", "str"];
                                for (var i = 0; i < names.length; i++) {
                                    var setObj = sys.setOptsSetFix(names[i], types[i]);
                                    setObj.titleWidth = 200;
                                    if (i >= 1) {
                                        var setObj = sys.setOptsSetFix(names[i], "fontStyle");
                                        var exNoGroups = gr.paraSet["exNoGroups"];
                                        setObj.enum = [];
                                        setObj.setType = "inputSelect";
                                        setObj.titleWidth = 200;
                                        if (i === 1)
                                            setObj.enum.push("all");
                                        for (var j = 0; j < exNoGroups.length; j++) {
                                            var strA = exNoGroups[j].split("~");
                                            setObj.enum.push(strA[0]);
                                        }
                                        setObj.padType = "phoneNumberArray";
                                        setObj.memo_f = 1;
                                        setObj.selectBox = {xc: 2, yc: 16};
                                    }
                                    setObj.value = values[i];
                                    setObj.id = ids[i];
                                    setObj.textAlign = "left";
                                    setObj.showDataType_f = 0;
                                    setObj.nameFontSize = "0.6rh";
                                    if (i === 0) {
                                        setObj.padType = "phoneNumber";
                                        setObj.checkLegelType = "phoneNumber";
                                    }
                                    //setObj.disSetButton_f = 1;
                                    setObjs.push(setObj);
                                }
                                var opts = {};
                                opts.title = titleText + " " + (index + 1);
                                opts.pageItems = 3;
                                opts.rowCount = 3;
                                opts.actionFunc = function (iobj) {
                                    console.log(iobj);
                                    if (md.mdClass.checkCombineGroup(iobj.value.broadcaster)) {
                                        sys.mesBox("cy~warn", 600, "撱??潸絲??頛詨?航炊 !!!", ["ESC"]);
                                        return;
                                    }
                                    if (md.mdClass.checkCombineGroup(iobj.value.broadcastGroup)) {
                                        sys.mesBox("cy~warn", 600, "撱?蝢斤? 頛詨?航炊 !!!", ["ESC"]);
                                        return;
                                    }

                                    var number = iobj.value.broadcastNumber.trim();
                                    var modObj = md.stas.setNamesObj;
                                    for (var i = 0; i < modObj.opts.valuesA.length; i++) {
                                        if (i === index)
                                            continue;
                                        if (modObj.opts.valuesA[i][2] === number) {
                                            sys.mesBox("cy~warn", 500, "Input number Is Existed !!!", ["ESC"]);
                                            return;
                                        }
                                    }
                                    var exNos = paraSet["phExNos"];
                                    for (var i = 0; i < exNos.length; i++) {
                                        var strA = exNos[i].split("~");
                                        if (strA[3].trim() === number) {
                                            sys.mesBox("cy~warn", 500, "Input number Is Existed !!!", ["ESC"]);
                                            return;
                                        }
                                    }

                                    var exNos = paraSet["meetGroups"];
                                    for (var i = 0; i < exNos.length; i++) {
                                        var strA = exNos[i].split("~");
                                        if (strA[0].trim() === number) {
                                            sys.mesBox("cy~warn", 500, "Input number Is Existed !!!", ["ESC"]);
                                            return;
                                        }
                                    }

                                    var exNos = paraSet["groupCalls"];
                                    for (var i = 0; i < exNos.length; i++) {
                                        var strA = exNos[i].split("~");
                                        if (strA[0].trim() === number) {
                                            sys.mesBox("cy~warn", 500, "Input number Is Existed !!!", ["ESC"]);
                                            return;
                                        }
                                    }



                                    if (!edit_f) {
                                        index = modObj.opts.valuesA.length;
                                        var sobj = JSON.parse(JSON.stringify(modObj.opts.setInf.values));
                                        sobj[1] = "" + (index + 1);
                                        modObj.opts.valuesA.push(sobj);
                                        if (index >= (modObj.opts.rowStart + modObj.opts.rowCnt))
                                            modObj.opts.rowStart = index;
                                    }
                                    modObj.opts.valuesA[index][2] = iobj.value.broadcastNumber;
                                    modObj.opts.valuesA[index][4] = "" + iobj.value.broadcaster;
                                    modObj.opts.valuesA[index][5] = "" + iobj.value.broadcastGroup;
                                    var newMod = modObj.reCreate();
                                    md.stas.setNamesObj = newMod;
                                };
                                opts.tagOn_f = 0;
                                opts.setObjs = setObjs;
                                var height = 230;
                                var mod = new Model("", "Md_inputLineBox~sys", opts, {});
                                sys.popModel(mod, 800, height);

                            };





                            console.log(iobj);
                            if (iobj.kvObj) {
                                if (iobj.kvObj.opts.itemId === "save") {
                                    var modObj = md.stas.setNamesObj;
                                    var valuesA = [];
                                    var va = modObj.opts.valuesA;
                                    for (var i = 0; i < va.length; i++) {
                                        var str = va[i][2] + "~" + va[i][4] + "~" + va[i][5];
                                        valuesA.push(str);
                                    }
                                    gr.paraSet[modObj.opts.saveId] = valuesA;
                                    self.saveParas();
                                }
                                if (iobj.kvObj.opts.itemId === "new") {
                                    var modObj = md.stas.setNamesObj;
                                    var vas = modObj.opts.setInf.values;
                                    var values = [vas[2], vas[4], vas[5]];
                                    editNewFunc(values, -1, 0);
                                }
                                return;
                            }

                            var name = iobj.name;
                            if (!name)
                                return;
                            var strA = name.split("#");
                            var itemInx = parseInt(strA[1]);
                            var index = parseInt(iobj.indexStr);
                            var modObj = md.stas.setNamesObj;
                            if (itemInx === 3) {
                                var valuesA = modObj.opts.valuesA;
                                var values = [valuesA[index][2], valuesA[index][4], valuesA[index][5]];
                                editNewFunc(values, index, 1);
                            }
                        };
                        var mod = new Model("md_setNames", "MdaSetNames", opts, {});
                        md.stas.setNamesObj = mod;
                        sys.popModel(mod, 0, 0);
                        return;
                    }

                    //set meet group
                    if (strA[1] === '6') {
                        var paraSet = gr.paraSet;
                        var saveId = "meetGroups";
                        opts = {};
                        var setInf = {};
                        setInf.wr = [50, 100, 9999, 120];
                        setInf.heads = ["", "蝺刻?", "?降摰方?蝣?, ""];
                        setInf.itemTypes = ["button", "label", "label", "button"];
                        //setInf.fixeds = [0, 0, 1, 1];
                        setInf.values = ["", "", "", "閮剖?", "", "", ""];
                        opts.setInf = setInf;
                        opts.valuesA = [];
                        var acounts = paraSet[saveId];
                        for (var i = 0; i < acounts.length; i++) {
                            var sobj = JSON.parse(JSON.stringify(setInf.values));
                            opts.valuesA.push(sobj);
                        }
                        for (var i = 0; i < acounts.length; i++) {
                            opts.valuesA[i][1] = "" + (i + 1);
                            var strA = acounts[i].split("~");
                            opts.valuesA[i][2] = strA[0];
                            opts.valuesA[i][4] = strA[1];
                            opts.valuesA[i][5] = strA[2];
                            opts.valuesA[i][6] = strA[3];
                        }
                        //=====================================
                        opts.title = titleText;
                        opts.rowCnt = 16;
                        opts.rowStart = 0;
                        opts.rowButtonOn_f = 1;
                        opts.iconDisableA = [0, 0, 0, 0, 0, 0, 0, 0];
                        opts.saveId = saveId;
                        opts.selectInx = 0;
                        opts.actionFunc = function (iobj) {
                            var editNewFunc = function (values, index, edit_f) {
                                var modObj = md.stas.setNamesObj;
                                var setObjs = [];
                                var names = ["?降摰方?蝣?, "撖Ⅳ", "?潸絲?黎蝯?, "雿輻?黎蝯?];
                                var ids = ["meetNumber", "password", "builderGroup", "userGroup"];
                                var types = ["str", "nstr", "str", "str"];
                                for (var i = 0; i < names.length; i++) {
                                    var setObj = sys.setOptsSetFix(names[i], types[i]);
                                    setObj.titleWidth = 200;
                                    if (i >= 2) {
                                        var setObj = sys.setOptsSetFix(names[i], "fontStyle");
                                        var exNoGroups = gr.paraSet["exNoGroups"];
                                        setObj.enum = [];
                                        setObj.setType = "inputSelect";
                                        setObj.titleWidth = 200;
                                        setObj.enum.push("all");
                                        for (var j = 0; j < exNoGroups.length; j++) {
                                            var strA = exNoGroups[j].split("~");
                                            setObj.enum.push(strA[0]);
                                        }
                                        setObj.padType = "phoneNumberArray";
                                        setObj.memo_f = 1;
                                        setObj.selectBox = {xc: 2, yc: 16};
                                    }
                                    setObj.value = values[i];
                                    setObj.id = ids[i];
                                    setObj.textAlign = "left";
                                    setObj.showDataType_f = 0;
                                    setObj.nameFontSize = "0.6rh";
                                    if (i === 0) {
                                        setObj.padType = "phoneNumber";
                                        setObj.checkLegelType = "phoneNumber";
                                    }
                                    //setObj.disSetButton_f = 1;
                                    setObjs.push(setObj);
                                }
                                var opts = {};
                                opts.title = titleText + " " + (index + 1);
                                opts.pageItems = 4;
                                opts.rowCount = 4;
                                opts.actionFunc = function (iobj) {
                                    console.log(iobj);

                                    if (md.mdClass.checkCombineGroup(iobj.value.builderGroup)) {
                                        sys.mesBox("cy~warn", 600, "?潸絲?黎蝯?頛詨?航炊 !!!", ["ESC"]);
                                        return;
                                    }
                                    if (md.mdClass.checkCombineGroup(iobj.value.userGroup)) {
                                        sys.mesBox("cy~warn", 600, "雿輻?黎蝯?頛詨?航炊 !!!", ["ESC"]);
                                        return;
                                    }



                                    var number = iobj.value.meetNumber.trim();
                                    var modObj = md.stas.setNamesObj;
                                    for (var i = 0; i < modObj.opts.valuesA.length; i++) {
                                        if (i === index)
                                            continue;
                                        if (modObj.opts.valuesA[i][2] === number) {
                                            sys.mesBox("cy~warn", 500, "Input number Is Existed !!!", ["ESC"]);
                                            return;
                                        }
                                    }
                                    var exNos = paraSet["phExNos"];
                                    for (var i = 0; i < exNos.length; i++) {
                                        var strA = exNos[i].split("~");
                                        if (strA[3].trim() === number) {
                                            sys.mesBox("cy~warn", 500, "Input number Is Existed !!!", ["ESC"]);
                                            return;
                                        }
                                    }

                                    var exNos = paraSet["broadGroups"];
                                    for (var i = 0; i < exNos.length; i++) {
                                        var strA = exNos[i].split("~");
                                        if (strA[0].trim() === number) {
                                            sys.mesBox("cy~warn", 500, "Input number Is Existed !!!", ["ESC"]);
                                            return;
                                        }
                                    }

                                    var exNos = paraSet["groupCalls"];
                                    for (var i = 0; i < exNos.length; i++) {
                                        var strA = exNos[i].split("~");
                                        if (strA[0].trim() === number) {
                                            sys.mesBox("cy~warn", 500, "Input number Is Existed !!!", ["ESC"]);
                                            return;
                                        }
                                    }



                                    if (!edit_f) {
                                        index = modObj.opts.valuesA.length;
                                        var sobj = JSON.parse(JSON.stringify(modObj.opts.setInf.values));
                                        sobj[1] = "" + (index + 1);
                                        modObj.opts.valuesA.push(sobj);
                                        if (index >= (modObj.opts.rowStart + modObj.opts.rowCnt))
                                            modObj.opts.rowStart = index;
                                    }
                                    modObj.opts.valuesA[index][2] = iobj.value.meetNumber;
                                    modObj.opts.valuesA[index][4] = "" + iobj.value.password;
                                    modObj.opts.valuesA[index][5] = "" + iobj.value.builderGroup;
                                    modObj.opts.valuesA[index][6] = "" + iobj.value.userGroup;
                                    var newMod = modObj.reCreate();
                                    md.stas.setNamesObj = newMod;
                                };
                                opts.tagOn_f = 0;
                                opts.setObjs = setObjs;
                                var height = 280;
                                var mod = new Model("", "Md_inputLineBox~sys", opts, {});
                                sys.popModel(mod, 800, height);

                            };





                            console.log(iobj);
                            if (iobj.kvObj) {
                                if (iobj.kvObj.opts.itemId === "save") {
                                    var modObj = md.stas.setNamesObj;
                                    var valuesA = [];
                                    var va = modObj.opts.valuesA;
                                    for (var i = 0; i < va.length; i++) {
                                        var str = va[i][2] + "~" + va[i][4] + "~" + va[i][5] + "~" + va[i][6];
                                        valuesA.push(str);
                                    }
                                    gr.paraSet[modObj.opts.saveId] = valuesA;
                                    self.saveParas();
                                }
                                if (iobj.kvObj.opts.itemId === "new") {
                                    var modObj = md.stas.setNamesObj;
                                    var vas = modObj.opts.setInf.values;
                                    var values = [vas[2], vas[4], vas[5], vas[6]];
                                    editNewFunc(values, -1, 0);
                                }
                                return;
                            }

                            var name = iobj.name;
                            if (!name)
                                return;
                            var strA = name.split("#");
                            var itemInx = parseInt(strA[1]);
                            var index = parseInt(iobj.indexStr);
                            var modObj = md.stas.setNamesObj;
                            if (itemInx === 3) {
                                var valuesA = modObj.opts.valuesA;
                                var values = [valuesA[index][2], valuesA[index][4], valuesA[index][5], valuesA[index][6]];
                                editNewFunc(values, index, 1);
                            }
                        };
                        var mod = new Model("md_setNames", "MdaSetNames", opts, {});
                        md.stas.setNamesObj = mod;
                        sys.popModel(mod, 0, 0);
                        return;
                    }

                    //group call
                    if (strA[1] === '7') {
                        var paraSet = gr.paraSet;
                        var saveId = "groupCalls";
                        opts = {};
                        var setInf = {};
                        setInf.wr = [50, 100, 9999, 120];
                        setInf.heads = ["", "蝺刻?", "蝢文?Ⅳ", ""];
                        setInf.itemTypes = ["button", "label", "label", "button"];
                        //setInf.fixeds = [0, 0, 1, 1];
                        setInf.values = ["", "", "", "閮剖?", "", ""];
                        opts.setInf = setInf;
                        opts.valuesA = [];
                        var acounts = paraSet[saveId];
                        for (var i = 0; i < acounts.length; i++) {
                            var sobj = JSON.parse(JSON.stringify(setInf.values));
                            opts.valuesA.push(sobj);
                        }
                        for (var i = 0; i < acounts.length; i++) {
                            opts.valuesA[i][1] = "" + (i + 1);
                            var strA = acounts[i].split("~");
                            opts.valuesA[i][2] = strA[0];
                            opts.valuesA[i][4] = strA[1];
                            opts.valuesA[i][5] = strA[2];
                        }
                        //=====================================
                        opts.title = titleText;
                        opts.rowCnt = 16;
                        opts.rowStart = 0;
                        opts.rowButtonOn_f = 1;
                        opts.iconDisableA = [0, 0, 0, 0, 0, 0, 0, 0];
                        opts.saveId = saveId;
                        opts.selectInx = 0;
                        opts.actionFunc = function (iobj) {
                            var editNewFunc = function (values, index, edit_f) {
                                var modObj = md.stas.setNamesObj;
                                var setObjs = [];
                                var names = ["蝢文?Ⅳ", "蝢文蝢斤?", "?輸??"];
                                var ids = ["groupCallNumber", "groupCallGroup", "ringTime"];
                                var types = ["str", "str", "nature999"];
                                for (var i = 0; i < names.length; i++) {
                                    var setObj = sys.setOptsSetFix(names[i], types[i]);
                                    setObj.titleWidth = 200;
                                    if (i === 1) {
                                        var setObj = sys.setOptsSetFix(names[i], "fontStyle");
                                        var exNoGroups = gr.paraSet["exNoGroups"];
                                        setObj.enum = [];
                                        setObj.setType = "inputSelect";
                                        setObj.titleWidth = 200;
                                        if (i === 1)
                                            setObj.enum.push("all");
                                        for (var j = 0; j < exNoGroups.length; j++) {
                                            var strA = exNoGroups[j].split("~");
                                            setObj.enum.push(strA[0]);
                                        }
                                        setObj.padType = "phoneNumberArray";
                                        setObj.memo_f = 1;
                                        setObj.selectBox = {xc: 2, yc: 16};
                                    }
                                    setObj.value = values[i];
                                    setObj.id = ids[i];
                                    setObj.textAlign = "left";
                                    setObj.showDataType_f = 0;
                                    setObj.nameFontSize = "0.6rh";
                                    if (i === 0) {
                                        setObj.padType = "phoneNumber";
                                        setObj.checkLegelType = "phoneNumber";
                                    }
                                    //setObj.disSetButton_f = 1;
                                    setObjs.push(setObj);
                                }
                                var opts = {};
                                opts.title = titleText + " " + (index + 1);
                                opts.pageItems = 3;
                                opts.rowCount = 3;
                                opts.actionFunc = function (iobj) {
                                    console.log(iobj);
                                    if (md.mdClass.checkCombineGroup(iobj.value.groupCallGroup)) {
                                        sys.mesBox("cy~warn", 600, "蝢文蝢斤? 頛詨?航炊 !!!", ["ESC"]);
                                        return;
                                    }

                                    var number = iobj.value.groupCallNumber.trim();
                                    var modObj = md.stas.setNamesObj;
                                    for (var i = 0; i < modObj.opts.valuesA.length; i++) {
                                        if (i === index)
                                            continue;
                                        if (modObj.opts.valuesA[i][2] === number) {
                                            sys.mesBox("cy~warn", 500, "Input number Is Existed !!!", ["ESC"]);
                                            return;
                                        }
                                    }
                                    var exNos = paraSet["phExNos"];
                                    for (var i = 0; i < exNos.length; i++) {
                                        var strA = exNos[i].split("~");
                                        if (strA[3].trim() === number) {
                                            sys.mesBox("cy~warn", 500, "Input number Is Existed !!!", ["ESC"]);
                                            return;
                                        }
                                    }

                                    var exNos = paraSet["meetGroups"];
                                    for (var i = 0; i < exNos.length; i++) {
                                        var strA = exNos[i].split("~");
                                        if (strA[0].trim() === number) {
                                            sys.mesBox("cy~warn", 500, "Input number Is Existed !!!", ["ESC"]);
                                            return;
                                        }
                                    }

                                    var exNos = paraSet["broadGroups"];
                                    for (var i = 0; i < exNos.length; i++) {
                                        var strA = exNos[i].split("~");
                                        if (strA[0].trim() === number) {
                                            sys.mesBox("cy~warn", 500, "Input number Is Existed !!!", ["ESC"]);
                                            return;
                                        }
                                    }



                                    if (!edit_f) {
                                        index = modObj.opts.valuesA.length;
                                        var sobj = JSON.parse(JSON.stringify(modObj.opts.setInf.values));
                                        sobj[1] = "" + (index + 1);
                                        modObj.opts.valuesA.push(sobj);
                                        if (index >= (modObj.opts.rowStart + modObj.opts.rowCnt))
                                            modObj.opts.rowStart = index;
                                    }
                                    modObj.opts.valuesA[index][2] = iobj.value.groupCallNumber;
                                    modObj.opts.valuesA[index][4] = "" + iobj.value.groupCallGroup;
                                    modObj.opts.valuesA[index][5] = "" + iobj.value.ringTime;
                                    var newMod = modObj.reCreate();
                                    md.stas.setNamesObj = newMod;
                                };
                                opts.tagOn_f = 0;
                                opts.setObjs = setObjs;
                                var height = 230;
                                var mod = new Model("", "Md_inputLineBox~sys", opts, {});
                                sys.popModel(mod, 800, height);

                            };





                            console.log(iobj);
                            if (iobj.kvObj) {
                                if (iobj.kvObj.opts.itemId === "save") {
                                    var modObj = md.stas.setNamesObj;
                                    var valuesA = [];
                                    var va = modObj.opts.valuesA;
                                    for (var i = 0; i < va.length; i++) {
                                        var str = va[i][2] + "~" + va[i][4] + "~" + va[i][5];
                                        valuesA.push(str);
                                    }
                                    gr.paraSet[modObj.opts.saveId] = valuesA;
                                    self.saveParas();
                                }
                                if (iobj.kvObj.opts.itemId === "new") {
                                    var modObj = md.stas.setNamesObj;
                                    var vas = modObj.opts.setInf.values;
                                    var values = [vas[2], vas[4], "0"];
                                    editNewFunc(values, -1, 0);
                                }
                                return;
                            }

                            var name = iobj.name;
                            if (!name)
                                return;
                            var strA = name.split("#");
                            var itemInx = parseInt(strA[1]);
                            var index = parseInt(iobj.indexStr);
                            var modObj = md.stas.setNamesObj;
                            if (itemInx === 3) {
                                var valuesA = modObj.opts.valuesA;
                                var values = [valuesA[index][2], valuesA[index][4], valuesA[index][5]];
                                editNewFunc(values, index, 1);
                            }
                        };
                        var mod = new Model("md_setNames", "MdaSetNames", opts, {});
                        md.stas.setNamesObj = mod;
                        sys.popModel(mod, 0, 0);
                        return;
                    }

                    //advance setting
                    if (strA[1] === '8') {
                        var obj = {};
                        obj.selects = [];
                        obj.selects.push("ICS銝餌頂蝯?閮剖?");
                        obj.selects.push("撠?ICS蝢斤? 閮剖?");
                        obj.selects.push("雿輻????閮剖?");
                        obj.selects.push("");
                        obj.selects.push("銝餅?? 隞?∟身摰?);
                        obj.selects.push("銝餅?? 隞?∟身摰?);
                        obj.selects.push("SIP.1 隞?∟身摰?);
                        obj.selects.push("SIP.2 隞?∟身摰?);
                        obj.selects.push("FXO.1 隞?∟身摰?);
                        obj.selects.push("FXO.2 隞?∟身摰?);
                        obj.selects.push("FXS.1 隞?∟身摰?);
                        obj.selects.push("FXS.2 隞?∟身摰?);
                        obj.selects.push("T1S.1 隞?∟身摰?);
                        obj.selects.push("T1S.2 隞?∟身摰?);
                        obj.selects.push("ROIP.1 隞?∟身摰?);
                        obj.selects.push("ROIP.2 隞?∟身摰?);
                        obj.selects.push("撠?.1 隞?∟身摰?);
                        obj.selects.push("撠?.2 隞?∟身摰?);
                        obj.selects.push("閮???隞?∟身摰?);
                        obj.selects.push("");
                        obj.selects.push("");
                        obj.selects.push("");
                        obj.selects.push("ICS閮剖?瑼?頛");
                        obj.selects.push("ICS閮剖?瑼??脣?");
                        obj.yc = 16;
                        obj.xc = 2;
                        obj.selectEsc_f = 0;
                        obj.title = titleText;
                        obj.actionFunc = function (iobj) {
                            console.log(iobj);
                            if (iobj.inx === 0) {//"ICS銝餌頂蝯?閮剖?"
                                var icsSet = gr.paraSet.icsSet;
                                var strA = icsSet.split("~");
                                var setObjs = [];
                                var names = ["蝺刻?", "?迂", "???IP", "MASK", "GATEWAY", "PORT"];
                                var ids = ["no", "name", "outIp", "mask", "gateWay", "port"];
                                var types = ["nature999", "str", "str", "str", "str", "nature"];
                                for (var i = 0; i < names.length; i++) {
                                    var setObj = sys.setOptsSetFix(names[i], types[i]);
                                    setObj.value = strA[i];
                                    setObj.id = ids[i];
                                    setObj.textAlign = "left";
                                    setObj.titleWidth = 200;
                                    setObj.showDataType_f = 0;
                                    setObj.nameFontSize = "0.6rh";
                                    if (i === 2 || i === 3 || i === 4) {
                                        setObj.padType = "ipAddress";
                                        setObj.checkLegelType = "ipAddress";
                                    }
                                    setObjs.push(setObj);
                                }
                                var opts = {};
                                opts.title = iobj.text;
                                opts.pageItems = 6;
                                opts.rowCount = 6;
                                opts.actionFunc = function (iobj) {
                                    console.log(iobj);
                                    if (iobj.act === "valueChange") {
                                        var str = iobj.value.no;
                                        str += "~" + iobj.value.name;
                                        str += "~" + iobj.value.outIp;
                                        str += "~" + iobj.value.mask;
                                        str += "~" + iobj.value.gateWay;
                                        str += "~" + iobj.value.port;
                                        gr.paraSet.icsSet = str;
                                        self.saveParas();
                                    }
                                };
                                opts.tagOn_f = 0;
                                opts.setObjs = setObjs;
                                var height = 420;
                                var mod = new Model("", "Md_inputLineBox~sys", opts, {});
                                sys.popModel(mod, 800, height);
                                return;

                            }
                            if (iobj.inx === 1) {//"ICS蝢斤? 閮剖?"
                                var paraSet = gr.paraSet;
                                var saveId = "icsGroups";
                                opts = {};
                                var setInf = {};
                                setInf.wr = [50, 60, 140, 9999, 300, 120];
                                setInf.heads = ["", "蝺刻?", "ICS蝺刻?", "ICS?迂", "IP雿?", ""];
                                setInf.itemTypes = ["button", "label", "label", "label", "label", "button"];
                                //setInf.fixeds = [0, 0, 1, 1];
                                setInf.values = ["", "", "", "", "", "閮剖?", 1234, "*12", "JOSN-PBX", "admin", "0000"];
                                opts.setInf = setInf;
                                opts.valuesA = [];
                                var acounts = paraSet[saveId];
                                for (var i = 0; i < acounts.length; i++) {
                                    var sobj = JSON.parse(JSON.stringify(setInf.values));
                                    opts.valuesA.push(sobj);
                                }
                                for (var i = 0; i < acounts.length; i++) {
                                    opts.valuesA[i][1] = "" + (i + 1);
                                    var strA = acounts[i].split("~");
                                    opts.valuesA[i][2] = strA[0];
                                    opts.valuesA[i][3] = strA[1];
                                    opts.valuesA[i][4] = strA[2];
                                    opts.valuesA[i][6] = strA[3];
                                    opts.valuesA[i][7] = strA[4];
                                    opts.valuesA[i][8] = strA[5];
                                    opts.valuesA[i][9] = strA[6];
                                    opts.valuesA[i][10] = strA[7];
                                }
                                //=====================================
                                opts.title = iobj.text;
                                opts.rowCnt = 16;
                                opts.rowStart = 0;
                                opts.rowButtonOn_f = 1;
                                opts.iconDisableA = [0, 0, 0, 0, 0, 0, 0, 0];
                                opts.saveId = saveId;
                                opts.selectInx = 0;
                                opts.actionFunc = function (iobj) {
                                    console.log(iobj);
                                    var editNewFunc = function (values, index, edit_f) {
                                        var modObj = md.stas.setNamesObj;
                                        var setObjs = [];
                                        var names = ["ICS蝺刻?", "?交??蔭蝣?,"ICS?迂", "IP雿?", "PORT", "?亥?蔭蝣?, "??", "雿輻??, "撖Ⅳ"];
                                        var ids = ["icsNo", "txPreCode","icsName", "icsIp", "port", "preCode", "type", "user", "password"];
                                        var types = ["nature999", "nstr", "nstr", "str", "nature", "nstr", "str", "nstr", "nstr"];
                                        for (var i = 0; i < names.length; i++) {
                                            var setObj = sys.setOptsSetFix(names[i], types[i]);
                                            setObj.titleWidth = 200;
                                            if(i===0){
                                                var value=values[i];
                                            }
                                            if(i===1){
                                                if(values[0].length===1)
                                                    var value="*50"+values[0];
                                                else
                                                    var value="*5"+values[0];
                                                setObj.readOnly_f=1;
                                            }
                                            if(i>=2){
                                                var value=values[i-1];
                                            }
                                            setObj.value = value;
                                            setObj.id = ids[i];
                                            setObj.textAlign = "left";
                                            setObj.showDataType_f = 0;
                                            setObj.nameFontSize = "0.6rh";
                                            if (i === 3) {
                                                setObj.padType = "ipAddress";
                                                setObj.checkLegelType = "ipAddress";
                                            }
                                            if (i === 6) {
                                                setObj.enum = [];
                                                setObj.setType = "select";
                                                setObj.enum.push("JosnPbx");
                                                setObj.enum.push("OmniPbx");
                                                setObj.enum.push("SipPbx");
                                            }
                                            setObjs.push(setObj);
                                        }
                                        var opts = {};
                                        opts.title = "撠?ICS蝢斤?" + " " + (index + 1);
                                        opts.pageItems = 9;
                                        opts.rowCount = 9;
                                        opts.actionFunc = function (iobj) {
                                            if (!edit_f) {
                                                index = modObj.opts.valuesA.length;
                                                var sobj = JSON.parse(JSON.stringify(modObj.opts.setInf.values));
                                                sobj[1] = "" + (index + 1);
                                                modObj.opts.valuesA.push(sobj);
                                                if (index >= (modObj.opts.rowStart + modObj.opts.rowCnt))
                                                    modObj.opts.rowStart = index;
                                            }
                                            modObj.opts.valuesA[index][2] = "" + iobj.value.icsNo;
                                            modObj.opts.valuesA[index][3] = "" + iobj.value.icsName;
                                            modObj.opts.valuesA[index][4] = "" + iobj.value.icsIp;
                                            modObj.opts.valuesA[index][6] = "" + iobj.value.port;
                                            modObj.opts.valuesA[index][7] = "" + iobj.value.preCode;
                                            modObj.opts.valuesA[index][8] = "" + iobj.value.type;
                                            modObj.opts.valuesA[index][9] = "" + iobj.value.user;
                                            modObj.opts.valuesA[index][10] = "" + iobj.value.password;

                                            var newMod = modObj.reCreate();
                                            md.stas.setNamesObj = newMod;
                                        };
                                        opts.tagOn_f = 0;
                                        opts.setObjs = setObjs;
                                        var height = 470;
                                        opts.valueChangeFunc=function(iobj){
                                            console.log(iobj);
                                            if(iobj.kvObj.name==="mdEditOptsLine~0"){
                                                var fmd=iobj.kvObj.fatherMd;
                                                var md0=iobj.kvObj.fatherMd.modelRefs["mdEditOptsLine~0"];
                                                var inputObj=md0.compRefs["input"];
                                                var inputElem = inputObj.elems["input"];
                                                var inxStr=inputElem.value;
                                                
                                                var md1=iobj.kvObj.fatherMd.modelRefs["mdEditOptsLine~1"];
                                                var inputObj=md1.compRefs["input"];
                                                var inputElem = inputObj.elems["input"];
                                                if(inxStr.length===1){
                                                    inputElem.value="*50"+inxStr;
                                                }
                                                else{
                                                    inputElem.value="*5"+inxStr;
                                                }
                                                
                                                
                                                
                                                
                                            }
                                        };
                                        var mod = new Model("", "Md_inputLineBox~sys", opts, {});
                                        sys.popModel(mod, 800, height);

                                    };
                                    if (iobj.kvObj) {
                                        if (iobj.kvObj.opts.itemId === "save") {
                                            var modObj = md.stas.setNamesObj;
                                            var valuesA = [];
                                            var va = modObj.opts.valuesA;
                                            for (var i = 0; i < va.length; i++) {
                                                var str = va[i][2] + "~" + va[i][3] + "~" + va[i][4] + "~" + va[i][6] + "~" + va[i][7];
                                                str += "~" + va[i][8] + "~" + va[i][9] + "~" + va[i][10];
                                                valuesA.push(str);
                                            }
                                            gr.paraSet[modObj.opts.saveId] = valuesA;
                                            self.saveParas();
                                        }
                                        if (iobj.kvObj.opts.itemId === "new") {
                                            var modObj = md.stas.setNamesObj;
                                            var vas = modObj.opts.setInf.values;
                                            var values = [vas[2], vas[3], vas[4], vas[6], vas[7], vas[8], vas[9], vas[10]];
                                            editNewFunc(values, -1, 0);
                                        }
                                        return;
                                    }

                                    var name = iobj.name;
                                    if (!name)
                                        return;
                                    var strA = name.split("#");
                                    var itemInx = parseInt(strA[1]);
                                    var index = parseInt(iobj.indexStr);
                                    var modObj = md.stas.setNamesObj;
                                    if (itemInx === 5) {
                                        var valuesA = modObj.opts.valuesA;
                                        var values = [valuesA[index][2], valuesA[index][3], valuesA[index][4], valuesA[index][6], valuesA[index][7]];
                                        values.push(valuesA[index][8]);
                                        values.push(valuesA[index][9]);
                                        values.push(valuesA[index][10]);
                                        editNewFunc(values, index, 1);
                                    }
                                };
                                var mod = new Model("md_setNames", "MdaSetNames", opts, {});
                                md.stas.setNamesObj = mod;
                                sys.popModel(mod, 0, 0);
                                return;
                            }


                            if (iobj.inx === 2) {//"ICS雿輻????閮剖?"
                                var icsSet = gr.paraSet.icsUiSet;
                                var strA = icsSet.split("~");
                                var setObjs = [];
                                var names = ["銝餅??IP", "銝餅?閰望? IP", "?舀?閰望? IP"];
                                var ids = ["mainCtrIp", "mainSoftPhoneIp", "subSoftPhoneIp"];
                                var types = ["nstr", "nstr", "nstr"];
                                for (var i = 0; i < names.length; i++) {
                                    var setObj = sys.setOptsSetFix(names[i], types[i]);
                                    setObj.value = strA[i];
                                    setObj.id = ids[i];
                                    setObj.textAlign = "left";
                                    setObj.titleWidth = 200;
                                    setObj.showDataType_f = 0;
                                    setObj.nameFontSize = "0.6rh";
                                    setObj.padType = "ipAddress";
                                    setObj.checkLegelType = "ipAddress";
                                    setObjs.push(setObj);
                                }
                                var opts = {};
                                opts.title = iobj.text;
                                opts.pageItems = 5;
                                opts.rowCount = 5;
                                opts.actionFunc = function (iobj) {
                                    console.log(iobj);
                                    if (iobj.act === "valueChange") {
                                        var str = iobj.value.mainCtrIp;
                                        str += "~" + iobj.value.mainSoftPhoneIp;
                                        str += "~" + iobj.value.subSoftPhoneIp;
                                        gr.paraSet.icsUiSet = str;
                                        self.saveParas();
                                    }
                                };
                                opts.tagOn_f = 0;
                                opts.setObjs = setObjs;
                                var height = 380;
                                var mod = new Model("", "Md_inputLineBox~sys", opts, {});
                                sys.popModel(mod, 800, height);
                                return;

                            }



                            if (iobj.inx >= 4 && iobj.inx <= 18) {
                                var saveId = "none";
                                if (iobj.inx === 4)
                                    var saveId = "slotSet_ctr_0";
                                if (iobj.inx === 5)
                                    var saveId = "slotSet_ctr_1";
                                if (iobj.inx === 6)
                                    var saveId = "slotSet_sip_0";
                                if (iobj.inx === 7)
                                    var saveId = "slotSet_sip_1";
                                if (iobj.inx === 8)
                                    var saveId = "slotSet_fxo_0";
                                if (iobj.inx === 9)
                                    var saveId = "slotSet_fxo_1";
                                if (iobj.inx === 10)
                                    var saveId = "slotSet_fxs_0";
                                if (iobj.inx === 11)
                                    var saveId = "slotSet_fxs_1";
                                if (iobj.inx === 12)
                                    var saveId = "slotSet_t1s_0";
                                if (iobj.inx === 13)
                                    var saveId = "slotSet_t1s_1";
                                if (iobj.inx === 14)
                                    var saveId = "slotSet_roip_0";
                                if (iobj.inx === 15)
                                    var saveId = "slotSet_roip_1";
                                if (iobj.inx === 16)
                                    var saveId = "slotSet_mag_0";
                                if (iobj.inx === 17)
                                    var saveId = "slotSet_mag_1";
                                if (iobj.inx === 18)
                                    var saveId = "slotSet_rec_0";

                                var setStr = gr.paraSet[saveId];
                                var strA = setStr.split("~");
                                var setObjs = [];
                                var names = ["IP雿?", "Port"];
                                var ids = ["ipAddress", "port"];
                                var types = ["str", "natureNumber"];
                                for (var i = 0; i < names.length; i++) {
                                    var setObj = sys.setOptsSetFix(names[i], types[i]);
                                    setObj.value = strA[i];
                                    setObj.id = ids[i];
                                    setObj.textAlign = "left";
                                    setObj.titleWidth = 300;
                                    setObj.showDataType_f = 0;
                                    setObj.nameFontSize = "0.6rh";
                                    if (i === 0) {
                                        setObj.padType = "ipAddress";
                                        setObj.checkLegelType = "ipAddress";
                                    }
                                    setObjs.push(setObj);
                                }
                                var opts = {};
                                opts.title = iobj.text;
                                opts.pageItems = 5;
                                opts.rowCount = 5;
                                opts.actionFunc = function (iobj) {
                                    console.log(iobj);
                                    if (iobj.act === "valueChange") {
                                        var wstr = "";
                                        for (var i = 0; i < ids.length; i++) {
                                            if (i !== 0)
                                                wstr += "~";
                                            wstr += iobj.value[ids[i]];
                                        }
                                        gr.paraSet[saveId] = wstr;
                                        self.saveParas();
                                    }
                                };
                                opts.tagOn_f = 0;
                                opts.setObjs = setObjs;
                                var height = 300;
                                var mod = new Model("", "Md_inputLineBox~sys", opts, {});
                                sys.popModel(mod, 800, height);
                                return;
                            }


                            if (iobj.inx === 22) {//"ICS閮剖?瑼?頛"
                                var actionFunc = function (files) {
                                    sv.uploadFiles(files, "user-" + gr.systemName, "saveFileToDir", "paraTest.json");
                                };
                                mac.uploadeFiles(actionFunc, ".json");
                                return;
                            }

                            if (iobj.inx === 23) {//"ICS閮剖?瑼??脣?"
                                var fileName = "user-" + gr.systemName + "/paraSet.json";
                                mac.saveFileToLocal(fileName, "paraSet.json")
                                return;
                            }

                        };
                        var mod = new Model("", "Md_selectBox", obj, {});
                        var hh = gr.clientH - 20;
                        var ww = gr.clientW - 20;
                        sys.popModel(mod, ww, hh);
                        return;
                    }

                    //system shut down
                    if (strA[1] === "9") {
                        var actionFunc = function (iobj) {
                            console.log(iobj);
                            if (iobj.buttonName === "YES") {
                                gr.repaint_f = 1;
                                gr.showLogo_f = 1;
                                self.sendSocket({act: "icsShutDown"});
                            }
                        };
                        sys.mesBox("cy~霅血? !!!", 500, "蝣箏?蝟餌絞?????", ["NO", "YES"], actionFunc);
                        return;
                    }

                    //system restart
                    if (strA[1] === "10") {
                        var actionFunc = function (iobj) {
                            console.log(iobj);
                            if (iobj.buttonName === "YES") {
                                gr.repaint_f = 1;
                                gr.showLogo_f = 1;
                                self.sendSocket({act: "icsRestart"});
                            }
                        };
                        sys.mesBox("cy~霅血? !!!", 500, "蝣箏?蝟餌絞?????", ["NO", "YES"], actionFunc);
                        return;
                    }

                    //logout
                    if (strA[1] === "11") {
                        gr.repaint_f = 1;
                        gr.showLogo_f = 1;
                        document.cookie = 'userName=' + "" + "; max-age=3600";
                        document.cookie = 'password=' + "" + "; max-age=3600";

                        return;
                    }
                    //reloadIcs
                    if (strA[1] === "12") {
                        gr.repaint_f = 1;
                        gr.showLogo_f = 1;
                        self.sendSocket({act: "reloadIcsConf"});
                        return;
                    }

                    if (strA[1] === "12") {
                        gr.repaint_f = 1;
                        gr.showLogo_f = 1;
                        self.sendSocket({act: "reloadIcsExtensions"});
                        return;
                    }


                };

                comps[cname] = {name: "setButton#" + i, type: "button~sys", opts: opts};
            }

        }

        if (pageInx === 3) {
            var cname = lyMap.get("mainBody");
            var opts = {};
            opts.xc = 1;
            opts.yc = 8;
            opts.xm = 20;
            opts.ym = 20;
            opts.margin = 40;
            layouts[cname] = {name: cname, type: "base", opts: opts};
            lyMap.set("pnMain", cname);
            var texts = [];
            texts.push('蝟餌絞鞈?');
            texts.push('??鞈?');
            texts.push('??');
            texts.push('閮?瑼?閮?);
            texts.push('瑽賭????);
            texts.push('?????');

            for (var i = 0; i < texts.length; i++) {
                var cname = lyMap.get("pnMain") + "~" + i;
                var opts = {};
                opts.innerText = texts[i];
                opts.fontSize = "0.5rh";
                opts.baseColor = "#ccf";
                opts.borderRadius = "4px";

                opts.clickFunc = function (iobj) {
                    console.log(iobj);
                    var name = iobj.kvObj.name;
                    var titleText = iobj.kvObj.opts.innerText;
                    var strA = name.split('#');
                    if (strA[1] === "0") {
                        opts = {};
                        opts.objName = "Md_editorPanel~sys";
                        var sop = opts.objOpts = {};
                        sop.dataType = "txt";
                        sop.readOnly_f = 1;
                        var istr = "";
                        istr += KvLib.wSpaceName(50, "ICS 頠??");
                        istr += gr.version;
                        for (var i = 0; i < op.icsDatas.slotDatas.length; i++) {
                            var slotData = op.icsDatas.slotDatas[i];
                            var slotName = self.getSlotName(slotData);
                            if (!slotName)
                                continue;
                            istr += "\n\n" + slotName;
                            istr += KvLib.wSpaceName(50, "    頠??");
                            istr += slotData.softVer;
                            istr += KvLib.wSpaceName(50, "    ???");
                            istr += slotData.firmVer;
                            istr += KvLib.wSpaceName(50, "    ????");
                            istr += slotData.startTime;
                        }

                        sop.context = istr;



                        opts.title = titleText;
                        mac.viewBox(opts, 0, 0);

                    }

                    if (strA[1] === "1") {
                        var exInfPrg = function () {
                            var paraSet = gr.paraSet;
                            var opts = {};
                            var saveId = "phAHotlines";

                            var setInf = {};
                            setInf.wr = [50, 100, 9999, 220, 200, 220];
                            setInf.heads = ["蝺刻?", "憿?", "?迂", "???Ⅳ", "???, "?店撠情"];
                            setInf.itemTypes = ["label", "label", "label", "label", "label", "label"];
                            setInf.baseColors = ["#333", "#333", "#333", "#333", "#333", "#333"];
                            setInf.values = ["", "", "", "", "", ""];
                            opts.setInf = setInf;
                            opts.valuesA = [];
                            var phExNos = gr.paraSet.phExNos;
                            for (var i = 0; i < phExNos.length; i++) {
                                var arr = ["", "roip", "kevin", "301", "", ""];
                                var strA = phExNos[i].split("~");
                                arr[0] = "" + (i + 1);
                                arr[1] = strA[0] + "-" + (KvLib.toInt(strA[1], 0) + 1);
                                arr[2] = strA[2];
                                arr[3] = strA[3];
                                opts.valuesA.push(arr);
                            }
                            //=====================================
                            opts.title = "?餉店";
                            opts.rowCnt = 16;
                            opts.rowStart = 0;
                            opts.rowButtonOn_f = 1;
                            opts.iconDisableA = [1, 1, 1, 1, 1, 1, 1, 0];
                            opts.saveId = saveId;
                            opts.phoneSet = 0;
                            opts.actionFunc = function (iobj) {
                                console.log(iobj);
                                if (iobj.act === "reDraw") {
                                    var setNames = md.stas.setNamesObj;
                                    var setArray = setNames.modelRefs["setArrayPanel"];
                                    if (setArray) {
                                        for (var i = 0; i < setArray.opts.rowCnt; i++) {
                                            var lineCtr = setArray.modelRefs["Md_lineCtr#" + i];
                                            if (lineCtr) {
                                                var obj = lineCtr.compRefs["item#" + 4];
                                                if (obj) {
                                                    var noStr = lineCtr.opts.values[3];
                                                    var directName = "self.fatherMd.fatherMd.fatherMd.popOwner.stas.exStatus";
                                                    directName += "[\"" + noStr + "\"][\"inf\"]";
                                                    sys.setInputWatch(obj, "directName", directName, "innerText");
                                                    var directName = "self.fatherMd.fatherMd.fatherMd.popOwner.stas.exStatus";
                                                    directName += "[\"" + noStr + "\"][\"color\"]";
                                                    sys.setInputWatch(obj, "directName", directName, "innerTextColor");
                                                }
                                                var obj = lineCtr.compRefs["item#" + 5];
                                                if (obj) {
                                                    var noStr = lineCtr.opts.values[3];
                                                    var directName = "self.fatherMd.fatherMd.fatherMd.popOwner.stas.exStatus";
                                                    directName += "[\"" + noStr + "\"][\"callWith\"]";
                                                    sys.setInputWatch(obj, "directName", directName, "innerText");
                                                }



                                            }
                                        }
                                    }
                                }


                            };
                            var mod = new Model("md_setNames", "MdaSetNames", opts, {});
                            md.stas.setNamesObj = mod;
                            mod.popOwner = md;
                            var ww = gr.clientW - 1;
                            var hh = gr.clientH;
                            var opts = {};
                            opts.kvObj = mod;
                            opts.w = ww;
                            opts.h = hh;
                            opts.x = 0;
                            opts.y = gr.clientH - hh;
                            opts.center_f = 0;
                            sys.popOnModel(opts);
                            //sys.popModel(mod, ww-100, hh-100);
                        };
                        exInfPrg();
                        return;
                    }

                    if (strA[1] === "2") {
                        var exInfPrg = function () {
                            var paraSet = gr.paraSet;
                            var opts = {};

                            var setInf = {};
                            setInf.wr = [50, 100, 9999, 220, 200];
                            setInf.heads = ["蝺刻?", "憿?", "?迂", "???Ⅳ", ""];
                            setInf.itemTypes = ["label", "label", "label", "label", "button"];
                            setInf.baseColors = ["#333", "#333", "#333", "#333", "#333"];
                            setInf.values = ["", "", "", "", ""];
                            opts.setInf = setInf;
                            opts.valuesA = [];
                            var phExNos = gr.paraSet.phExNos;
                            for (var i = 0; i < phExNos.length; i++) {
                                var arr = ["", "", "", "", ""];
                                var strA = phExNos[i].split("~");
                                arr[0] = "" + (i + 1);
                                arr[1] = strA[0] + "-" + (KvLib.toInt(strA[1], 0) + 1);
                                arr[2] = strA[2];
                                arr[3] = strA[3];
                                arr[4] = "?豢?";
                                opts.valuesA.push(arr);
                            }


                            var meetGroups = gr.paraSet.meetGroups;
                            for (var i = 0; i < meetGroups.length; i++) {
                                var arr = ["", "", "", "", ""];
                                var strA = meetGroups[i].split("~");
                                arr[0] = "" + (i + 1);
                                arr[1] = "?降";
                                arr[2] = strA[0];
                                arr[3] = strA[0];
                                arr[4] = "?豢?";
                                opts.valuesA.push(arr);
                            }

                            var broadGroups = gr.paraSet.broadGroups;
                            for (var i = 0; i < broadGroups.length; i++) {
                                var arr = ["", "", "", "", ""];
                                var strA = broadGroups[i].split("~");
                                arr[0] = "" + (i + 1);
                                arr[1] = "撱?";
                                arr[2] = strA[0];
                                arr[3] = strA[0];
                                arr[4] = "?豢?";
                                opts.valuesA.push(arr);
                            }



                            //=====================================
                            opts.title = "?餉店";
                            opts.rowCnt = 16;
                            opts.rowStart = 0;
                            opts.rowButtonOn_f = 1;
                            opts.iconDisableA = [1, 1, 1, 1, 1, 1, 1, 0];
                            opts.phoneSet = 0;
                            opts.actionFunc = function (iobj) {
                                console.log(iobj);
                                if (iobj.act === "buttonClick") {
                                    if (iobj.name === "item#4") {
                                        var md = self.md;

                                        var setNames = md.stas.setNamesObj;
                                        var setArray = setNames.modelRefs["setArrayPanel"];
                                        var number = "";
                                        if (setArray) {
                                            var lineCtr = setArray.modelRefs["Md_lineCtr#" + iobj.indexStr];
                                            if (lineCtr) {
                                                number = lineCtr.opts.values[3];
                                            }
                                        }
                                        //var dirName = "./user-webIcs/record/" + number;
                                        //var filterName = "*.*";
                                        //gr.serverCallBack = fileLoaded;
                                        //Test.server_readFileNames("response error", "exeCallBackFunc", dirName, filterName);
                                        //self.sendSocket({act: "selfTestAllStop"});

                                        self.timeActObjs.push({id: "getExRecordNames", exNumber: number, time: 1, step: 0, timeActPrg: self.getExRecordNames_tact});
                                        return;

                                        /*                                
                                         var sockOutobj = {};
                                         sockOutobj.act = "loadExRecordNames";
                                         sockOutobj.subAct = "";
                                         sockOutobj.exNumber=iobj.value;
                                         sockOutobj.actInx = ++op.actInx;
                                         gr.socketRetPrgTbl[sockOutobj.act + "~react"] = function (mesObj) {
                                         delete gr.socketRetPrgTbl[sockOutobj.act + "~react"];
                                         console.log(mesObj);
                                         };
                                         self.sendSocket(sockOutobj);
                                         */







                                        var escFunc = function (iobj) {
                                            console.log(iobj);
                                        };
                                        sys.mesBox("cy~Get Files", 500, "Please Wait .....", ["ESC"], escFunc);
                                        return;





                                        //gr.mdSystem.mdClass.popOff(2);
                                    }
                                }


                            };
                            var mod = new Model("md_setNames", "MdaSetNames", opts, {});
                            md.stas.setNamesObj = mod;
                            mod.popOwner = md;
                            var ww = gr.clientW - 1;
                            var hh = gr.clientH;
                            var opts = {};
                            opts.kvObj = mod;
                            opts.w = ww;
                            opts.h = hh;
                            opts.x = 0;
                            opts.y = gr.clientH - hh;
                            opts.center_f = 0;
                            sys.popOnModel(opts);
                            //sys.popModel(mod, ww-100, hh-100);
                        };
                        exInfPrg();
                        return;
                    }

                    if (strA[1] === "3") {
                        var sockOutobj = {};
                        sockOutobj.act = "getTextFile";
                        sockOutobj.userName = gr.userName;
                        sockOutobj.actInx = ++op.actInx;
                        sockOutobj.fileName = "./log/pbxSet.log";
                        gr.socketRetPrgTbl[sockOutobj.act + "~react"] = function (mesObj) {
                            opts = {};
                            opts.objName = "Md_editorPanel~sys";
                            var sop = opts.objOpts = {};
                            sop.dataType = "txt";
                            sop.readOnly_f = 1;
                            sop.context = mesObj.context;
                            //sop.urls = ["./webIcs.log"];
                            opts.title = titleText;
                            mac.viewBox(opts, 0, 0);
                            return;
                        };
                        self.sendSocket(sockOutobj);
                        return;




                    }

                    if (strA[1] === "4") {
                        var exInfPrg = function () {
                            var paraSet = gr.paraSet;
                            var opts = {};
                            var setInf = {};
                            setInf.wr = [50, 300, 100, 9999];
                            setInf.heads = ["蝺刻?", "?迂", "???, "鞈?"];
                            setInf.itemTypes = ["label", "label", "led", "label"];
                            setInf.baseColors = ["#333", "#333", "#333", "#333"];
                            setInf.values = ["", "", "", "", ""];
                            opts.setInf = setInf;
                            opts.valuesA = [];
                            var slotDatas = op.icsDatas.slotDatas;
                            for (var i = 0; i < slotDatas.length; i++) {
                                var slotData = slotDatas[i];
                                var arr = ["", "", "", "", ""];
                                arr[0] = "" + (i + 1);
                                opts.valuesA.push(arr);
                            }
                            //=====================================
                            opts.title = "?餉店";
                            opts.rowCnt = 16;
                            opts.rowStart = 0;
                            opts.rowButtonOn_f = 1;
                            opts.iconDisableA = [1, 1, 1, 1, 1, 1, 1, 0];
                            opts.phoneSet = 0;
                            opts.actionFunc = function (iobj) {
                                console.log(iobj);

                                //st.slotNames.push("");
                                //st.slotLeds.push(0);
                                //st.slotLedHides.push(1);
                                //st.slotInfs.push("");


                                if (iobj.act === "reDraw") {
                                    var setNames = md.stas.setNamesObj;
                                    var setArray = setNames.modelRefs["setArrayPanel"];
                                    if (setArray) {
                                        for (var i = 0; i < setArray.opts.rowCnt; i++) {
                                            var lineCtr = setArray.modelRefs["Md_lineCtr#" + i];
                                            if (lineCtr) {
                                                var obj = lineCtr.compRefs["item#" + 1];
                                                if (obj) {
                                                    var directName = "self.fatherMd.fatherMd.fatherMd.popOwner.stas.slotNames";
                                                    directName += "[" + i + "]";
                                                    sys.setInputWatch(obj, "directName", directName, "innerText");
                                                }

                                                var ledObj = lineCtr.compRefs["item#" + 2];
                                                if (ledObj) {
                                                    var directName = "self.fatherMd.fatherMd.fatherMd.popOwner.stas.slotLeds";
                                                    directName += "[" + i + "]";
                                                    sys.setInputWatch(ledObj, "directName", directName, "backgroundInx", 1);
                                                    var directName = "self.fatherMd.fatherMd.fatherMd.popOwner.stas.slotLedHides";
                                                    directName += "[" + i + "]";
                                                    sys.setInputWatch(ledObj, "directName", directName, "hidden_f", 1);
                                                }
                                                var infObj = lineCtr.compRefs["item#" + 3];
                                                if (infObj) {
                                                    var directName = "self.fatherMd.fatherMd.fatherMd.popOwner.stas.slotInfs";
                                                    directName += "[" + i + "]";
                                                    sys.setInputWatch(infObj, "directName", directName, "innerText", 1);
                                                }





                                            }
                                        }
                                    }
                                }





                            };
                            var mod = new Model("md_setNames", "MdaSetNames", opts, {});
                            md.stas.setNamesObj = mod;
                            mod.popOwner = md;
                            var ww = gr.clientW - 1;
                            var hh = gr.clientH;
                            var opts = {};
                            opts.kvObj = mod;
                            opts.w = ww;
                            opts.h = hh;
                            opts.x = 0;
                            opts.y = gr.clientH - hh;
                            opts.center_f = 0;
                            sys.popOnModel(opts);
                            //sys.popModel(mod, ww-100, hh-100);
                        };
                        exInfPrg();
                        return;
                    }

                    if (strA[1] === "5") {
                        opts = {};
                        opts.title = "??豢?";
                        opts.xc = 4;
                        opts.yc = 20;
                        opts.selects = [];

                        var phExNos = gr.paraSet.phExNos;
                        for (var i = 0; i < phExNos.length; i++) {
                            var strA = phExNos[i].split("~");
                            opts.selects.push(strA[3] + " (" + strA[0] + "-" + (KvLib.toInt(strA[1], 0) + 1) + ")");
                        }


                        opts.actionFunc = function (iobj) {
                            console.log(iobj);
                            if (iobj.act === "reDraw") {
                                var kvObj = iobj.kvObj;
                                kvObj.popOwner = md;
                                var obj = kvObj.compRefs["titleLabel"];
                                var elem = obj.elems["base"];
                                var hstr = "";
                                hstr += "<span style=padding:4px'>?餉店??? </span>";
                                hstr += "<span style='background-color:#aaa;padding:4px'>?芰??/span>";
                                hstr += "<span style='background-color:#cfc;padding:4px'>撌脩??/span>";
                                hstr += "<span style='background-color:#0f0;padding:4px'>撌脰酉??/span>";
                                hstr += "<span style='background-color:#88f;padding:4px'>?亥?銝?/span>";
                                hstr += "<span style='background-color:#f88;padding:4px'>?輸銝?/span>";
                                hstr += "<span style='background-color:#ff0;padding:4px'>???銝?/span>";
                                elem.innerHTML = hstr;


                                var phExNos = gr.paraSet.phExNos;
                                var op = kvObj.opts;
                                var items = op.xc * op.yc;
                                var startInx = op.page * items;
                                for (var i = startInx; i < (items + startInx); i++) {
                                    var obj = kvObj.compRefs["sel#" + i];
                                    if (obj) {
                                        strA = obj.opts.innerText.split(" ");
                                        var phexNo = phExNos[strA[0]];
                                        for (var j = 0; j < phExNos.length; j++) {
                                            var strB = phExNos[j].split("~");
                                            if (strB[3] === strA[0]) {
                                                var directName = "self.fatherMd.popOwner.stas.exStatus";
                                                directName += "[\"" + strA[0] + "\"][\"color\"]";
                                                sys.setInputWatch(obj, "directName", directName, "baseColor", 1);
                                                break;
                                            }
                                        }
                                    }
                                }
                            }
                        };
                        var selectObj = mac.selectBox(opts, 0, 0);
                        selectObj.popOwner = md;
                        return;


                    }
                };

                comps[cname] = {name: "setButton#" + i, type: "button~sys", opts: opts};
            }

        }







        var buttonClickFunc = function (event) {
            var self = md.mdClass;
            self.clearSelfTest();
            var name = event.kvObj.name;
            md.opts.testStatus.testMode = "";
            var strA = name.split("~");
            md.opts.pageInx = parseInt(strA[1]);
            md.reCreate();
        };

        var cname = lyMap.get("headBar");
        var opts = {};
        opts.xc = 4;
        opts.margin = 4;
        opts.xm = 4;
        opts.iw = 200;
        opts.wAlign = "center";

        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("pnButton", cname);
        for (var i = 0; i < 4; i++) {
            var cname = lyMap.get("pnButton") + "~" + i;
            var opts = {};
            if (i === 0)
                opts.innerText = "銝駁???;
            if (i === 1)
                opts.innerText = "頠?閰望?";
            if (i === 2)
                opts.innerText = "蝟餌絞閮剖?";
            if (i === 3)
                opts.innerText = "蝟餌絞鞈?";
            if (pageInx === i) {
                opts.insideShadowColor = "#00f";
                opts.insideShadowBlur = "0.5rh";
            }
            opts.maxByte = 10;
            opts.fontSize = 0;
            opts.fontSize = "0.4rh";
            opts.clickFunc = buttonClickFunc;
            comps[cname] = {name: "mainKey~" + i, type: "button~sys", opts: opts};

        }



        /*
         for (var i = 0; i < op.kvObjs.length; i++) {
         var kvobj = op.kvObjs[i];
         if (kvobj.modelSet === "Layout")
         layouts[kvobj.cname] = {name: kvobj.cname, type: kvobj.templateSet + "~" + kvobj.typeSet, opts: kvobj.opts};
         if (kvobj.modelSet === "Component")
         comps[kvobj.cname] = {name: kvobj.cname, type: kvobj.templateSet + "~" + kvobj.typeSet, opts: kvobj.opts};
         if (kvobj.modelSet === "Model")
         models[kvobj.cname] = {name: kvobj.cname, type: kvobj.templateSet + "~" + kvobj.typeSet, opts: kvobj.opts};
         }
         * 
         */
    }
}
//===========================================






















class Md_icsLoginBox {
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var opts = {};
        opts.width = 500;
        opts.height = 120;
        opts.margin = 10;
        opts.nextPage = "webFramePage";
        opts.actionFunc = null;
        opts.borderWidth = 1;
        opts.baseColor = "#222";
        return opts;
    }
    afterCreate() {
        var self = this;
        var md = self.md;
    }

    build(md) {
        var self = this;
        this.md = md;
        var op = md.opts;
        var lyMap = md.lyMap;
        var comps = op.comps;
        var models = op.models;
        var layouts = op.layouts;
        var layoutGroups = op.layoutGroups;
        //======================================    
        var cname = "c";
        var opts = {};
        opts.xc = 1;
        opts.yc = 1;
        //opts.iw = op.width;
        //opts.ih = op.height;
        opts.hAlign = "center";
        md.setFarme(opts);
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("body", cname);
        //==============================
        var cname = lyMap.get("body") + "~" + 0;
        var opts = {};
        opts.xc = 1;
        opts.yc = 3;
        opts.ihO = {};
        opts.ihO.c0 = 40;
        opts.ihO.c1 = 9999;
        opts.ihO.c2 = 40;
        opts.margin = 10;

        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("mainBody", cname);
        //layoutGroups[cname] = {color: "#222",border:"1px solid #fff"};
        //==============================
        var cname = lyMap.get("mainBody") + "~" + 0;
        var opts = {};
        opts.innerText = "?餃";
        opts.innerTextColor = "#fff";
        comps[cname] = {name: "", type: "plate~none", opts: opts};
        //==============================
        var cname = lyMap.get("mainBody") + "~" + 1;
        var opts = {};
        opts.setObjs = [];
        //var setObj = sys.getOptsSet("userName", "");
        var setObj = sys.getOptsSet("nstr", "");
        setObj.showDataType_f = 1;
        setObj.name = "撣單";
        //setObj.nameFontSize="0.7rh";
        setObj.value = "";
        opts.setObjs.push(setObj);
        var setObj = sys.getOptsSet("password", "");
        setObj.showDataType_f = 1;
        setObj.name = "撖Ⅳ";
        setObj.value = "";
        opts.setObjs.push(setObj);
        opts.tagOn_f = 0;
        opts.ih = 35;
        opts.ym = 10;
        opts.margin = 10;
        models[cname] = {name: "setList", type: "Md_setList~light", opts: opts};
        //==============================
        var cname = lyMap.get("mainBody") + "~" + 2;
        var opts = {};
        opts.xc = 2;
        opts.xm = 10;
        opts.iw = 100;
        opts.wAlign = "center";
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("buttonPane", cname);
        var buttonClickFunc = function (iobj) {


            var oobj = {};
            oobj.act = iobj.kvObj.name;
            var setListObj = md.modelRefs['setList'];
            oobj.userName = setListObj.modelRefs["mdEditOptsLine~0"].opts.setObj.value;
            oobj.password = setListObj.modelRefs["mdEditOptsLine~1"].opts.setObj.value;
            if (op.actionFunc)
                op.actionFunc(oobj);

        };
        var cname = lyMap.get("buttonPane") + "~" + 0;
        var opts = {};
        opts.innerText = "ESC";
        opts.clickFunc = buttonClickFunc;
        comps[cname] = {name: "buttonEsc", type: "button~sys", opts: opts};
        var cname = lyMap.get("buttonPane") + "~" + 1;
        var opts = {};
        opts.innerText = "OK";
        opts.clickFunc = buttonClickFunc;
        comps[cname] = {name: "buttonOk", type: "button~sys", opts: opts};


    }
}




class Md_phoneBox {
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var opts = {};
        opts.width = 500;
        opts.height = 120;
        opts.margin = 10;
        opts.nextPage = "webFramePage";
        opts.actionFunc = null;
        opts.baseColor = "#222";
        opts.title = "title";
        opts.hotlines = [
            "name1~301"
                    , "name2~302"
                    , "name3~303"
                    , "name4~304"
                    , "name5~305"
                    , "name6~306"
                    , "name7~307"
                    , "name8~308"
                    , "name9~309"
        ];
        return opts;
    }
    afterCreate() {
        var self = this;
        var md = self.md;
    }

    keyClick(iobj) {
        var md = iobj.kvObj.fatherMd;
        if (md.opts.actionFunc) {
            var obj = {};
            obj.act = "phoneKeyClick";
            obj.key = iobj.kvObj.opts.itemId;
            md.opts.actionFunc(obj);
        }
    }

    build(md) {
        var self = this;
        this.md = md;
        var op = md.opts;
        var lyMap = md.lyMap;
        var comps = op.comps;
        var models = op.models;
        var layouts = op.layouts;
        var layoutGroups = op.layoutGroups;
        //======================================    
        var cname = "c";
        var opts = {};
        opts.xc = 1;
        opts.yc = 1;
        //opts.iw = op.width;
        //opts.ih = op.height;
        //opts.hAlign = "center";
        //md.setFarme(opts);
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("body", cname);
        //==============================
        var cname = lyMap.get("body") + "~" + 0;
        var opts = {};
        opts.backgroundInx = 0;
        opts.backgroundImageUrls = ['./systemResource/metal.bmp'];
        opts.insideShadowBlur = "0.2rh";
        opts.borderRadius = "20px";
        opts.borderWidth = 2;
        opts.borderColor = "#ccc";
        comps[cname] = {name: "phone", type: "plate~none", opts: opts};

        var cname = lyMap.get("body") + "~" + 0;
        var opts = {};
        opts.xc = 1;
        opts.yc = 6;
        opts.ihO = {};
        opts.ihO.c0 = "0.05rh";
        opts.ihO.c1 = "0.20rh";
        opts.ihO.c2 = "0.2rh";
        opts.ihO.c3 = 9999;
        opts.ihO.c4 = "0.1rh";
        opts.ihO.c5 = 8;
        opts.margin = 20;
        opts.tm = 4;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("mainBody", cname);


        var cname = lyMap.get("mainBody") + "~" + 0;
        var opts = {};
        opts.innerText = op.title;
        opts.fontSize = "0.6rh";
        opts.textAlign = "center";
        opts.textShadow = "2px 2px 2px #000";
        opts.innerTextColor = "#ccc";
        comps[cname] = {name: "title", type: "plate~none", opts: opts};



        var cname = lyMap.get("mainBody") + "~" + 1;
        var opts = {};
        opts.backgroundInx = 0;
        opts.backgroundImageUrls = ['./systemResource/lcd1.bmp'];
        opts.insideShadowBlur = "0.2rh";
        opts.borderRadius = "10px";
        opts.borderWidth = 1;
        opts.borderColor = "#777";
        opts.innerText = "";
        comps[cname] = {name: "lcd", type: "label~sys", opts: opts};

        var cname = lyMap.get("mainBody") + "~" + 1;
        var opts = {};
        opts.yc = 2;
        opts.margin = 30;
        opts.ym = 0;
        opts.tm = 40;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("pnLcdLine", cname);


        var cname = lyMap.get("pnLcdLine") + "~" + 0;
        var opts = {};
        opts.innerText = "";
        opts.fontSize = "0.6rh";
        //opts.textShadow = "2px 2px 2px #000";
        opts.innerTextColor = "#000";
        opts.textAlign = "left";
        comps[cname] = {name: "lcdLine1", type: "plate~none", opts: opts};

        var cname = lyMap.get("pnLcdLine") + "~" + 1;
        var opts = {};
        opts.innerText = "";
        opts.fontSize = "0.6rh";
        //opts.textShadow = "2px 2px 2px #000";
        opts.innerTextColor = "#000";
        opts.textAlign = "left";
        comps[cname] = {name: "lcdLine2", type: "plate~none", opts: opts};




        var cname = lyMap.get("mainBody") + "~" + 2;
        var opts = {};
        opts.xc = 6;
        opts.yc = 3;
        opts.margin = 10;
        opts.xm = 10;
        opts.ym = 10;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("pnFuncKey", cname);

        var texts = [
            "??, '??, "??, "??", "??", '<i class="gf">&#xe0e0</i>'
                    , "?", "?潘?", "?塚?儭?", '', '<i class="gf">&#xe61c</i>', '<i class="gf">&#xf233</i>'
                    , "??, "??, '<i class="gf">&#xe620</i>', '<i class="gf">&#xe02b</i>', "", '<i class="gf">&#xebba</i>'
        ];
        var ids = [
            "cancle", "up", "ok", "+", "-", "set"
                    , "left", "down", "right", "meet", "transfer", "meetInf"
                    , "line1", "line2", "hold", "mute", "", "broadInf"
        ];
        for (var i = 0; i < 18; i++) {
            var cname = lyMap.get("pnFuncKey") + "~" + i;
            var opts = {};
            opts.innerText = texts[i];
            opts.fontSize = "0.8rh";
            opts.clickFunc = self.keyClick;
            opts.itemId = ids[i];
            comps[cname] = {name: "funcButton#" + i, type: "button~sys", opts: opts};
        }


        //==============================
        var cname = lyMap.get("mainBody") + "~" + 3;
        var opts = {};
        opts.xc = 2;
        opts.yc = 1;
        opts.iwO = {};
        opts.iwO.c0 = 9999;
        opts.iwO.c1 = "0.3rw";
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("pnCenterKey", cname);


        var cname = lyMap.get("pnCenterKey") + "~" + 0;
        var opts = {};
        opts.xc = 3;
        opts.yc = 4;
        opts.margin = 10;
        opts.xm = 8;
        opts.ym = 8;

        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("pnNumKey", cname);


        var texts = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"];
        for (var i = 0; i < 12; i++) {
            var cname = lyMap.get("pnNumKey") + "~" + i;
            var opts = {};
            opts.fontSize = "0.8rh";
            opts.innerText = texts[i];
            opts.clickFunc = self.keyClick;
            opts.itemId = texts[i];
            comps[cname] = {name: "numKeyButton#" + i, type: "button~sys", opts: opts};
        }

        var cname = lyMap.get("pnCenterKey") + "~" + 1;
        var opts = {};
        opts.xc = 1;
        opts.yc = 6;
        opts.margin = 10;
        opts.xm = 10;
        opts.ym = 10;

        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("pnSetKey", cname);


        for (var i = 0; i < 6; i++) {
            var cname = lyMap.get("pnSetKey") + "~" + i;
            var opts = {};
            opts.fontSize = 0;
            var strA = op.hotlines[i].split("~");
            opts.innerText = strA[0];
            opts.clickFunc = self.keyClick;
            opts.itemId = "hotline~" + (i);
            comps[cname] = {name: "rightKeyButton#" + i, type: "button~sys", opts: opts};
        }



        //==============================



        var cname = lyMap.get("mainBody") + "~" + 4;
        var opts = {};
        opts.xc = 3;
        opts.yc = 1;
        opts.margin = 10;
        opts.xm = 10;
        opts.ym = 10;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("pnPhoneKey", cname);

        var texts = [];
        texts.push('<i class="gf">&#xe0b1</i>');
        texts.push('<i class="gf">&#xe61d</i>');
        texts.push('<i class="gf">&#xe050</i>');
        var ids = ['hangon', 'hangoff', 'speaker'];
        for (var i = 0; i < 3; i++) {
            var cname = lyMap.get("pnPhoneKey") + "~" + i;
            var opts = {};
            opts.fontSize = "0.8rh";
            opts.innerText = texts[i];
            opts.itemId = ids[i];
            opts.clickFunc = self.keyClick;
            comps[cname] = {name: "phoneKeyButton#" + i, type: "button~sys", opts: opts};
        }


        var cname = lyMap.get("mainBody") + "~" + 5;
        var opts = {};
        opts.backgroundInx = 0;
        comps[cname] = {name: "phoneKeyS", type: "label~ledBar", opts: opts};


        //==============================


    }
}





class Md_setArrayPanel {
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var opts = {};
        opts.width = 500;
        opts.height = 120;
        opts.margin = 10;
        opts.actionFunc = null;
        opts.baseColor = "#222";
        opts.title = "title";
        opts.valuesA = [];
        opts.rowCnt = 0;
        opts.rowStart = 0;
        opts.selectInx = -1;
        opts.infSet = {};
        return opts;
    }
    afterCreate() {
    }

    build(md) {
        var self = this;
        this.md = md;
        var op = md.opts;
        var lyMap = md.lyMap;
        var comps = op.comps;
        var models = op.models;
        var layouts = op.layouts;
        var layoutGroups = op.layoutGroups;
        //======================================    
        var cname = "c";
        var opts = {};
        opts.xc = 1;
        opts.yc = 1;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("body", cname);
        //==============================
        var cname = lyMap.get("body") + "~" + 0;
        var opts = {};
        opts.yc = op.rowCnt + 1;
        opts.xc = 1;
        opts.xm = 10;
        opts.ym = 2;
        opts.margin = 4;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("pnMainL", cname);
        //==============================================================================================
        var cname = lyMap.get("pnMainL") + "~" + (0);
        var opts = {};
        KvLib.deepCoverObject(opts, op.setInf);
        opts.head_f = 1;
        models[cname] = {name: "head~0", type: "Md_lineCtr~sys", opts: opts};

        for (var i = 0; i < op.rowCnt; i++) {
            var cname = lyMap.get("pnMainL") + "~" + (1 + i);
            var opts = {};
            KvLib.deepCoverObject(opts, op.setInf);
            if ((op.rowStart + i) < op.valuesA.length) {
                opts.values = op.valuesA[op.rowStart + i];
                opts.actionFunc = function (iobj) {
                    if (op.actionFunc) {
                        op.actionFunc(iobj);
                    }
                };
                models[cname] = {name: "Md_lineCtr#" + i, type: "Md_lineCtr~sys", opts: opts};
            }
        }
    }
}






class MdaSetNames {
    static init() {
        var obj = gr.modelOpts["MdaSetNames"] = {};
        var dsc = obj["optsDsc"] = {};
        var sobj = obj["subOpts"] = {};

        obj.propertyWidth = 500;
        obj.propertyHeight = 500;
        obj.title = "Title";
        dsc.title = sys.setOptsSet("title", "str", "inputText");
        obj.borderColor = "#fff";
        obj.borderWidth = 1;
        obj.readOnly_f = 0;
        //===================
        obj.menuSelectClear_f = 1;
        dsc.menuSelectClear_f = sys.setOptsSet("menuSelectClear_f", "flag", "inputBoolean");
        obj.menuSelectAll_f = 1;
        dsc.menuSelectAll_f = sys.setOptsSet("menuSelectAll_f", "flag", "inputBoolean");
        obj.menuNew_f = 1;
        dsc.menuNew_f = sys.setOptsSet("menuNew_f", "flag", "inputBoolean");
        obj.menuDelete_f = 1;
        dsc.menuDelete_f = sys.setOptsSet("menuDelete_f", "flag", "inputBoolean");
        obj.menuMoveUp_f = 1;
        dsc.menuMoveUp_f = sys.setOptsSet("menuMoveUp_f", "flag", "inputBoolean");
        obj.menuMoveDown_f = 1;
        dsc.menuMoveDown_f = sys.setOptsSet("menuMoveDown_f", "flag", "inputBoolean");
        obj.newInput_f = 0;
        dsc.newInput_f = sys.setOptsSet("newInput_f", "flag", "inputBoolean");
        obj.setObj = {};
        dsc.setObj = sys.setOptsSet("setObj", "object", "setObject");
        InitOpts.getSetObjDsc(dsc);


        obj.menuSave_f = 1;
        obj.menuEsc_f = 1;

        obj.iconDisableA = [1, 1, 1, 1, 1, 1, 0, 0];
        obj.iconHeight = 50;
        obj.titleHeight = 40;
        obj.buttonHeight = 50;

        obj.rowCnt = 16;
        obj.rowStart = 0;
        obj.rowButtonOn_f = 1;
        obj.end = 0;



        var setInf = {};
        setInf.wr = [50, 100, 9999, 200, 120];
        setInf.heads = ["", "蝺刻?", "?迂", "??", ""];
        setInf.headFontSizes = ["0.5rh", "0.5rh", "0.5rh", "0.5rh", "0.5rh", "0.5rh", "0.5rh", "0.5rh", "0.5rh"];
        setInf.valueFontSizes = ["0.5rh", "0.5rh", "0.5rh", "0.5rh", "0.5rh", "0.5rh", "0.5rh", "0.5rh", "0.5rh"];
        setInf.itemTypes = ["button", "label", "label", "label", "button"];
        setInf.limitLows = [null, null, null, null, null];
        setInf.limitHighs = [null, null, null, null, null];
        setInf.gressBarMaxes = [null, null, null, null, null];
        setInf.gressBarMins = [null, null, null, null, null];

        setInf.initColors = [null, null, 0, "#cfc", "#ccc"];
        setInf.loadColors = [null, null, 1, "#0f0", "#0f0"];
        setInf.lowColors = [null, null, 2, "#f00", "#f00"];
        setInf.highColors = [null, null, 2, "#f00", "#f00"];
        setInf.baseColors = ["#333", "#333", "#333", "#333", "#333"];
        setInf.fixeds = [0, 0, 0, 1, 1];
        setInf.values = [0, 0, 0, 0, 0];
        setInf.watchValues = [0, 0, 0, 0, 0];
        obj.setInf = setInf;
        obj.valuesA = [];



        //var sobj=sys.setOptsSet("offOn_f", "flag", "inputBoolean")
        //dsc.setObj.sons.push(sys.setOptsSet("offOn_f", "flag", "inputBoolean"));

        for (var i = 0; i < 50; i++) {
            var values = ["", "", "nassme", "301", "閮剖?"];
            obj.valuesA.push(values);
        }
        for (var i = 0; i < 50; i++) {
            obj.valuesA[i][1] = "" + (i + 1);
            obj.valuesA[i][2] = "Name" + (i + 1);
        }
        //=====================================
        obj.setObj = {};
        var setObj = obj.setObj;
        setObj.name = "title";
        setObj.value = "";
        setObj.dataType = "str";
        setObj.setType = "inputText";



        if ("sys") {
            var xobj = sobj["sys"] = {};
        }


        return;








    }
    constructor()
    {

    }
    initOpts(md) {
        return Model.getOpts(md.baseType, md.subType);
    }
    afterCreate() {
        var md = this.md;
        var op = md.opts;
        if (op.actionFunc)
            op.actionFunc({act: "reDraw"});
    }

    chkWatch() {
        var self = this;
        if (self.md.watch["optsChanged"]) {
            if (self.md.watch["xxselectInx"]) {
                delete self.md.watch["selectInx"];
                /*  action */
                return;
            }
            self.md.reCreate();
            self.setScroll(this.md.opts.topScroll);
            self.md.watch = {};
        }

    }

    menuFunc(obj) {
        var itemId = obj.kvObj.opts.itemId;
        var md = obj.kvObj.fatherMd;
        var op = md.opts;
        console.log(obj);
        console.log(itemId);


        var tag = "";
        switch (itemId) {
            case "selectAll":
                var tag = "??;
            case "selectClear":
                for (var i = 0; i < op.valuesA.length; i++)
                    op.valuesA[i][0] = tag;
                var mdObj = md.modelRefs["setArrayPanel"];
                mdObj.opts.valuesA = op.valuesA;
                mdObj.reCreate();
                break;
            case "new":
                if (op.actionFunc) {
                    op.actionFunc(obj);
                }
                break;



                var sobj = JSON.parse(JSON.stringify(op.setInf.values));
                op.valuesA.push(sobj);
                op.rowStart = op.valuesA.length - 1;
                for (i = 0; i < op.valuesA.length; i++) {
                    op.valuesA[i][1] = "" + (i + 1);
                }
                md.mdClass.reDrawPanel();
                break;
            case "delete":
                var deleteAllFunc = function (iobj) {
                    if (iobj.buttonName !== "YES")
                        return;
                    for (var i = 0; i < op.valuesA.length; ) {
                        if (op.valuesA[i][0] !== "") {
                            op.valuesA.splice(i, 1);
                            i = 0;
                            continue;
                        }
                        i++;
                    }
                    for (i = 0; i < op.valuesA.length; i++) {
                        op.valuesA[i][1] = "" + (i + 1);
                    }
                    md.mdClass.reDrawPanel();
                };
                var selected = 0;
                for (var i = 0; i < op.valuesA.length; i++) {
                    if (op.valuesA[i][0] !== "") {
                        selected = 1;
                        break;
                    }
                }
                if (!selected)
                    break;
                sys.mesBox("cy~warn", 500, "Delete all you selected ?", ["NO", "YES"], deleteAllFunc);
                break;

            case "moveUp":
                var selectCnt = 0;
                var selectInx = 0;
                for (var i = 0; i < op.valuesA.length; i++) {
                    if (op.valuesA[i][0] !== "") {
                        selectCnt++;
                        selectInx = i;
                    }
                }
                if (selectCnt !== 1) {
                    sys.mesBox("cy~warn", 500, "Please select one line to move !!!", ["ESC"]);
                    return;
                }
                if (selectInx === 0)
                    return;
                var cnt0 = selectInx - 1;
                var cnt1 = selectInx;
                var cnt0Obj = op.valuesA[cnt0];
                var cnt1Obj = op.valuesA[cnt1];
                op.valuesA.splice(cnt0, 1);
                op.valuesA.splice(cnt1, 0, cnt0Obj);
                for (i = 0; i < op.valuesA.length; i++) {
                    op.valuesA[i][1] = "" + (i + 1);
                }
                if (selectInx < (op.rowStart + 1)) {
                    op.rowStart -= 1;
                }


                md.mdClass.reDrawPanel();
                break;
            case "moveDown":
                var selectCnt = 0;
                var selectInx = 0;
                for (var i = 0; i < op.valuesA.length; i++) {
                    if (op.valuesA[i][0] !== "") {
                        selectCnt++;
                        selectInx = i;
                    }
                }
                if (selectCnt !== 1) {
                    sys.mesBox("cy~warn", 500, "Please select one line to move !!!", ["ESC"]);
                    return;
                }
                if (selectInx >= (op.valuesA.length - 1))
                    return;
                var cnt0 = selectInx;
                var cnt1 = selectInx + 1;
                var cnt0Obj = op.valuesA[cnt0];
                var cnt1Obj = op.valuesA[cnt1];
                op.valuesA.splice(cnt1, 1);
                op.valuesA.splice(cnt0, 0, cnt1Obj);
                for (i = 0; i < op.valuesA.length; i++) {
                    op.valuesA[i][1] = "" + (i + 1);
                }
                if (selectInx >= (op.rowStart + op.rowCnt - 1)) {
                    op.rowStart += 1;
                }
                md.mdClass.reDrawPanel();
                break;
            case "save":
                if (op.actionFunc) {
                    op.actionFunc(obj);
                }
                gr.mdSystem.mdClass.popOff(2);
                break;
            case "esc":
                gr.mdSystem.mdClass.popOff(2);
                break;

        }
    }
    actionFunc(obj) {
        console.log(obj);
        if (obj.act === "click") {
            switch (obj.kvObj.name) {
                case "chgModel":
                    break;
            }
        }
    }

    reDrawPanel(iobj) {
        var md = this.md;
        var op = md.opts;
        var mdObj = md.modelRefs["setArrayPanel"];
        mdObj.opts.rowStart = op.rowStart;
        mdObj.opts.valuesA = op.valuesA;
        mdObj.opts.rowCnt = op.rowCnt;
        mdObj.reCreate();
        var itemObj = md.compRefs["itemLabel"];
        itemObj.opts.innerText = "&nbsp;" + (op.rowStart + 1) + "/" + op.valuesA.length;
        itemObj.reCreate();
        if (op.actionFunc)
            op.actionFunc({act: "reDraw"});
        //====================


    }

    build(md) {
        var self = this;
        this.md = md;
        var op = md.opts;
        var lyMap = md.lyMap;
        var comps = op.comps;
        var models = op.models;
        var layouts = op.layouts;
        var layoutGroups = op.layoutGroups;
        //======================================    
        var cname = "c";
        var opts = {};
        opts.xc = 1;
        opts.yc = 4;
        opts.ihO = {};
        opts.ihO.c0 = op.iconHeight;
        opts.ihO.c1 = op.titleHeight;

        opts.ihO.c2 = 9999;
        opts.ihO.c3 = op.buttonHeight;
        op.rowButtonOn_f = 0;
        if (op.valuesA.length > op.rowCnt)
            op.rowButtonOn_f = 1;
        if (!op.rowButtonOn_f)
            opts.ihO.c3 = 0;
        //==============================
        md.setFarme(opts);
        //==============================
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("body", cname);
        //==============================
        var texts = [
            'selectClear, <i class="gf">&#xe835;</i>'
                    , 'selectAll, <i class="gf">&#xe834;</i>'
                    , 'new, <i class="gf">&#xe145;</i>'
                    , 'delete, <i class="gf">&#xe15b;</i>'
                    , 'moveUp, <i class="gf">&#xeacf;</i>'
                    , 'moveDown, <i class="gf">&#xead0;</i>'
                    , 'save, <i class="gf">&#xe161;</i>'
                    , 'esc, <i class="gf">&#xe14c;</i>'
        ];
        var cname = lyMap.get("body") + "~" + 0;
        var opts = {};
        opts.xc = texts.length;
        opts.yc = 1;
        opts.margin = 2;
        opts.xm = 10;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("pnIcon", cname);

        for (var i = 0; i < texts.length; i++) {
            var opts = {};
            var cname = lyMap.get("pnIcon") + "~" + i;
            var strA = texts[i].split(",");
            opts.itemId = strA[0];
            opts.innerText = strA[1];
            opts.disable_f = op.iconDisableA[i];
            opts.clickFunc = self.menuFunc;
            comps[cname] = {name: "iconButton#" + i, type: "button~sys", opts: opts};

        }

        var cname = lyMap.get("body") + "~" + 1;
        var opts = {};
        opts.fontWeight = "bold";
        opts.textAlign = "center";
        opts.innerText = op.title;
        comps[cname] = {name: "arrayName", type: "label~sys", opts: opts};
        //======================================================================

        var cname = lyMap.get("body") + "~" + 2;
        var opts = {};
        opts.setInf = op.setInf;
        opts.rowStart = op.rowStart;
        opts.rowCnt = op.rowCnt;
        opts.valuesA = op.valuesA;
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            var name = iobj.name;
            var strA = name.split("#");
            var itemInx = parseInt(strA[1]);
            var index = parseInt(iobj.indexStr);
            if (itemInx === op.selectInx) {
                var vInx = op.rowStart + index;
                var vstr = op.valuesA[vInx][0];
                if (vstr === "") {
                    op.valuesA[vInx][op.selectInx] = "儭?儭?;
                } else {
                    op.valuesA[vInx][op.selectInx] = "";
                }
                var mdObj = md.modelRefs["setArrayPanel"];
                mdObj.opts.valuesA = op.valuesA;
                mdObj.reCreate();
                return;
            }
            if (op.actionFunc) {
                op.actionFunc(iobj);
            }

        };
        models[cname] = {name: "setArrayPanel", type: "Md_setArrayPanel~sys", opts: opts};
        //======================================================================
        var cname = lyMap.get("body") + "~" + 3;
        var opts = {};
        opts.xc = 6;
        opts.yc = 1;
        opts.margin = 4;
        opts.xm = 10;
        layouts[cname] = {name: cname, type: "base", opts: opts};
        lyMap.set("pnButton", cname);




        var chgValueFunc = function (iobj) {
            var name = iobj.kvObj.name;
            var strA = name.split("#");
            if (strA[1] === '0') {
                if (op.rowStart > 0) {
                    op.rowStart -= 1;
                    md.mdClass.reDrawPanel();
                }
                return;
            }
            if (strA[1] === '1') {
                if (op.rowStart < (op.valuesA.length - 1)) {
                    op.rowStart += 1;
                    md.mdClass.reDrawPanel();
                }
                return;
            }
            if (strA[1] === '2') {
                if (op.rowStart > 0) {
                    op.rowStart -= op.rowCnt;
                    if (op.rowStart < 0)
                        op.rowStart = 0;
                    md.mdClass.reDrawPanel();
                }
                return;
            }

            if (strA[1] === '3') {
                if (op.rowStart < (op.valuesA.length - 1)) {
                    op.rowStart += op.rowCnt;
                    if (op.rowStart >= op.valuesA.length)
                        op.rowStart = op.valuesA.length - 1;
                    md.mdClass.reDrawPanel();
                }
                return;
            }



        };
        var chgTimerFunc = function (iobj) {
            if (!gr.mouseDown_f)
                return;
            chgValueFunc(iobj);
            var delay = 50;
            gr.chgTimer = setTimeout(function () {
                chgTimerFunc(iobj);
            }, delay);
        };
        var setChgTimer = function (iobj) {
            chgValueFunc(iobj);
            var delay = 500;
            clearTimeout(gr.chgTimer);
            gr.chgTimer = setTimeout(function () {
                chgTimerFunc(iobj);
            }, delay);
        };
        var stopTimer = function () {
            clearTimeout(gr.chgTimer);
        };


        var texts = ["??, "??];
        texts.push('<i class="gf">&#xeacf</i>');
        texts.push('<i class="gf">&#xead0</i>');
        for (var i = 0; i < 4; i++) {
            var cname = lyMap.get("pnButton") + "~" + (i + 1);
            var opts = {};
            opts.fontSize = "0.8rh";
            opts.innerText = texts[i];
            opts.mouseDownFunc = setChgTimer;
            opts.mouseUpFunc = stopTimer;
            opts.mouseOutFunc = stopTimer;
            comps[cname] = {name: "phoneKeyButton#" + i, type: "button~sys", opts: opts};
        }
        var cname = lyMap.get("pnButton") + "~" + (0);
        var opts = {};
        opts.fontSize = "0.4rh";
        opts.innerText = "&nbsp;" + (op.rowStart + 1) + "/" + op.valuesA.length;
        opts.innerTextColor = "#ccc";

        comps[cname] = {name: "itemLabel", type: "plane~none", opts: opts};



    }
}
//===========================================






