/*
 * command table 
 * 0x----  low byte 00
 *  
 * 
 */


class DummyTargetMaster {
    constructor() {
        gr.hideWavePageElem = null;
        gr.socketRetPrgTbl["tick"] = function (radarData) {
            var keys = Object.keys(radarData);
            for (var i = 0; i < keys.length; i++) {
                var strA = keys[i].split("#");
                if (strA.length === 1) {
                    gr.radarData[keys[i]] = radarData[keys[i]];
                    continue;
                }
                if (strA.length === 2) {
                    var inx0 = KvLib.toInt(strA[1], 0);
                    gr.radarData[strA[0]][inx0] = radarData[keys[i]];
                    continue;
                }
            }
            var rd = gr.radarData;
            if (gr.viewDatas_f) {
                for (var i = 0; i < 64; i++) {
                    gr.viewDatas[i] = KvLib.trsIntToHexStrFix(gr.radarData.viewDatas[i]);
                }
            }


            if (rd.pulseFormAddBufA0) {
                if (gr.scope) {
                    if (gr.scope.opts.signalMode === 2 && gr.scope.opts.signalModeInx === 0) {
                        var len = rd.pulseFormAddBufA0.length;
                        if (rd.pulseFormAddBufA0.length) {
                            var values = [];
                            for (var i = 0; i < len; i++) {
                                var vv = rd.pulseFormAddBufA0[i];
                                var hf = vv & 1;
                                var tt = ((vv >> 1) * 6.25) | 0;
                                values.push(tt * 2 + hf);
                            }
                            gr.scope.mdClass.addBuf(0, values);
                        }
                    }
                }
            }
            rd.pulseFormAddBufA0 = null;


            if (gr.scope) {
                if (gr.scope.opts.signalMode === 3 && gr.scope.opts.signalModeInx === 0) {
                    if (gr.radarData.meterValueA) {
                        for (var i = 0; i < 4; i++) {
                            var values = [];
                            if (i === 0)
                                var vv = gr.radarData.meterValueA[2];
                            if (i === 1)
                                var vv = gr.radarData.meterValueA[3];
                            if (i === 2)
                                var vv = gr.radarData.meterValueA[4];
                            if (i === 3)
                                var vv = gr.radarData.meterValueA[5];
                            if (!vv)
                                vv = 0;
                            values.push(vv);
                            gr.scope.mdClass.addBuf(i, values);
                        }
                    }
                }
            }


            if (rd.pulseFormInf) {
                var plow = rd.pulseFormInf[0];
                var phigh = rd.pulseFormInf[1];
                var freq = rd.pulseFormInf[2];
                if (plow & phigh) {
                    var duty = phigh * 100 / (plow + phigh);
                    phigh = (phigh / 160).toFixed(1);
                    duty = duty.toFixed(1);
                    freq = ((freq + 290) / 100).toFixed(2);
                    gr.footBarMessageText = "Width:" + phigh + " us, Duty:" + duty + "%, Freq:" + freq + " GHz";
                    if ((gr.radarData.systemStatus0 >> 25) & 1)
                        gr.footBarMessageColor = "#f00";
                    else
                        gr.footBarMessageColor = "#00f";
                    gr.footBarMessageTime = 20;
                }
            }

            if (gr.degug_f)
                console.log("radarData");
        };


    }

    static paraSetPrg() {

        var setPrg = function () {
            var opts = {};
            opts.title = "設定";
            opts.xc = 2;
            opts.yc = 11;
            opts.h = 700;
            opts.w = 1000;
            opts.textAlign = "left";
            opts.lpd = 10;
            opts.kvTexts = [];
            opts.selectEsc_f = 0;
            if (gr.appId === 0) {
                opts.kvTexts.push("發射機信號參數設定");
                opts.kvTexts.push("同步參數設定");
                opts.kvTexts.push("GPS參數設定");
                opts.kvTexts.push("測試脈波設定");
                opts.kvTexts.push("");
                opts.kvTexts.push("進階設定");
                opts.kvTexts.push("下載記錄檔");
                opts.kvTexts.push("幫助");
                opts.kvTexts.push("下載設定檔");
                opts.kvTexts.push("上傳設定檔");
                opts.kvTexts.push("即時資料");
                opts.kvTexts.push("數位波形群組");
                opts.kvTexts.push("全螢幕開啟");
                opts.kvTexts.push("全螢幕關閉");
                opts.kvTexts.push("系統重啟");
                opts.kvTexts.push("邏輯分析儀");
                opts.kvTexts.push("離開");
                opts.kvTexts.push("關機");
            }
            if (gr.appId === 1) {
                opts.kvTexts.push("發射機信號參數設定");
                opts.kvTexts.push("同步參數設定");
                opts.kvTexts.push("GPS參數設定");
                opts.kvTexts.push("測試脈波設定");
                opts.kvTexts.push("");
                opts.kvTexts.push("進階設定");
                opts.kvTexts.push("下載記錄檔");
                opts.kvTexts.push("幫助");
                opts.kvTexts.push("下載設定檔");
                opts.kvTexts.push("上傳設定檔");
                opts.kvTexts.push("即時資料");
                opts.kvTexts.push("數位波形群組");
                opts.kvTexts.push("全螢幕開啟");
                opts.kvTexts.push("全螢幕關閉");
                opts.kvTexts.push("系統重啟");
                opts.kvTexts.push("邏輯分析儀");
                opts.kvTexts.push("離開");
                opts.kvTexts.push("關機");
            }
            if (gr.appId === 2) {
                opts.kvTexts.push("發射機參數設定");
                opts.kvTexts.push("電源參數設定");
                opts.kvTexts.push("固態放大器參數設定");
                opts.kvTexts.push("功率表參數設定");
                opts.kvTexts.push("脈波參數設定");
                opts.kvTexts.push("測試脈波設定");
                opts.kvTexts.push("脈波寬度設定");
                opts.kvTexts.push("進階設定");


                opts.kvTexts.push("下載記錄檔");
                opts.kvTexts.push("幫助");
                opts.kvTexts.push("下載設定檔");
                opts.kvTexts.push("上傳設定檔");
                opts.kvTexts.push("即時資料");
                opts.kvTexts.push("數位波形群組");
                opts.kvTexts.push("全螢幕開啟");
                opts.kvTexts.push("全螢幕關閉");
                opts.kvTexts.push("系統重啟");
                opts.kvTexts.push("邏輯分析儀");
                opts.kvTexts.push("離開");
                opts.kvTexts.push("關機");
            }
            opts.actionFunc = function (iobj) {
                console.log(iobj);
                var opts = {};
                opts.paraSet = gr.paraSet;
                opts.title = iobj.selectText;
                opts.setNames = [];


                if (iobj.selectText === "邏輯分析儀") {
                    MdaPopWin.popOff(2);
                    gr.gbcs.command({'act': "exeLogic"});
                    return;
                }
                if (iobj.selectText === "關機") {
                    MdaPopWin.popOff(2);
                    gr.gbcs.command({'act': "powerDown"});
                    return;
                }

                if (iobj.selectText === "離開") {
                    window.close();
                    return;
                }
                if (iobj.selectText === "全螢幕開啟") {
                    if (document.documentElement.requestFullscreen) {
                        document.documentElement.requestFullscreen();
                    } else if (document.documentElement.msRequestFullscreen) {
                        document.documentElement.msRequestFullscreen();
                    } else if (document.documentElement.mozRequestFullScreen) {
                        document.documentElement.mozRequestFullScreen();
                    } else if (document.documentElement.webkitRequestFullscreen) {
                        document.documentElement.webkitRequestFullscreen(
                                Element.ALLOW_KEYBOARD_INPUT,
                                );
                    }
                    return;
                }
                if (iobj.selectText === "全螢幕關閉") {
                    gr.gbcs.command({'act': "fullScreenOff"});
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.webkitExitFullscreen) {
                        document.webkitExitFullscreen();
                    }
                    return;
                }

                if (iobj.selectText === "幫助") {

                    if (
                            !document.fullscreenElement && // alternative standard method
                            !document.mozFullScreenElement &&
                            !document.webkitFullscreenElement &&
                            !document.msFullscreenElement
                            ) {
                        // current working methods
                        if (document.documentElement.requestFullscreen) {
                            document.documentElement.requestFullscreen();
                        } else if (document.documentElement.msRequestFullscreen) {
                            document.documentElement.msRequestFullscreen();
                        } else if (document.documentElement.mozRequestFullScreen) {
                            document.documentElement.mozRequestFullScreen();
                        } else if (document.documentElement.webkitRequestFullscreen) {
                            document.documentElement.webkitRequestFullscreen(
                                    Element.ALLOW_KEYBOARD_INPUT,
                                    );
                        }
                    } else {
                        if (document.exitFullscreen) {
                            document.exitFullscreen();
                        } else if (document.msExitFullscreen) {
                            document.msExitFullscreen();
                        } else if (document.mozCancelFullScreen) {
                            document.mozCancelFullScreen();
                        } else if (document.webkitExitFullscreen) {
                            document.webkitExitFullscreen();
                        }
                    }

                    return;














                    var opts = {};
                    opts.title = "HELP";
                    opts.readOnly_f = 1;
                    opts.hideNo_f = 0;
                    opts.nextRow = 20;
                    var editorBox = box.editorBox(opts);
                    var kvObj = editorBox.blockRefs["mainMd"];
                    KvLib.endInputEditor(kvObj, "IPC Connect Flag: W:webSocket, U1:UATr from FPGA to IPC, U2:control panel to IPC", "");
                    KvLib.endInputEditor(kvObj, "Fiber Connect Flag: CTR:1:, U1:UATr from FPGA to IPC, U2:control panel to IPC", "");
                    return;

                }
                if (iobj.selectText === "數位波形群組") {
                    var opts = {};
                    opts.paraSet = gr.paraSet;
                    opts.title = "數位波形群組";
                    opts.xc = 4;
                    opts.yc = 4;
                    opts.eh = 60;
                    opts.eym = 10;
                    opts.w = 800;
                    opts.h = 400;
                    opts.selectInx = gr.paraSet.laGroupCh;
                    opts.textAlign = "left";
                    opts.lpd = 10;
                    opts.kvTexts = [];
                    for (var i = 0; i < 16; i++)
                        opts.kvTexts.push("CH" + i);
                    opts.actionFunc = function (iobj) {
                        console.log(iobj);
                        gr.paraSet.laGroupCh = iobj.selectInx;
                        MdaPopWin.popOff(2);
                        var fileName = "paraSet";
                        var content = JSON.stringify(gr.paraSet);
                        sv.saveStringToFile("responseDialogError", "null", fileName, content);
                    };
                    box.selectBox(opts);
                    return;
                }


                if (iobj.selectText === "系統重啟") {
                    window.location.reload();
                    return;
                }
                if (iobj.selectText === "即時資料") {
                    gr.viewDatas = [];
                    for (var i = 0; i < 64; i++) {
                        gr.viewDatas.push("");
                    }
                    var op1 = {};
                    op1.title = iobj.selectText;
                    var op2 = {};



                    op2.ksObjWs = [9999];
                    op2.rowAmt = 32;
                    op2.eym = 2;
                    for (var i = 0; i < 8; i++) {
                        op2.ksObjWs.push("0.120rw");
                    }
                    op2.ksObjss = [];
                    var inx = 0;
                    for (var i = 0; i < 16; i++) {
                        var ksObjs = [];
                        for (var j = 0; j < 9; j++) {
                            var ksObj = {};
                            ksObj.name = "" + i + "#" + j;
                            //ksObj.type = "Component~Cp_base~label.view";
                            ksObj.type = "Component~Cp_base~plate.none";
                            var kopts = ksObj.opts = {};
                            if (j === 0) {
                                kopts.baseColor = "#ccc";
                                kopts.innerText = "" + (i >> 1) + "#" + ((i & 1) * 8);
                                ksObj.name = "" + (i >> 1) + "#" + ((i & 1) * 8);

                            } else {
                                kopts.baseColor = "#cff";
                                kopts.textAlign = "right";
                                kopts.rpd = 10;
                                kopts.fontFamily = "monospace";
                                var watchReg = "gr.viewDatas#" + inx;
                                //var watchReg = "gr.radarData.viewDatas#" + inx;
                                Block.setInputWatch(kopts, "directReg", watchReg, "innerText", 1);
                                inx++;
                            }
                            kopts.fontSize = "0.7rh";
                            ksObjs.push(ksObj);
                        }
                        op2.ksObjss.push(ksObjs);
                    }
                    op1.actionFunc = function (iobj) {
                        console.log(iobj);
                        gr.viewDatas_f = 0;
                    };
                    gr.viewDatas_f = 1;
                    box.containerPageBox(op1, op2);
                    return;
                }
                if (iobj.selectText === "脈波寬度設定") {
                    var opts = {};
                    opts.actionFunc = function (iobj) {
                        console.log(iobj);
                        KvLib.deepCoverObject(gr.paraSet, iobj.paraSet);
                        var fileName = "paraSet";
                        var content = JSON.stringify(gr.paraSet);
                        sv.saveStringToFile("responseDialogError", "null", fileName, content);
                    };
                    var op = {};
                    //======
                    var opts = {};
                    opts.title = iobj.selectText;
                    var pulsePara = gr.paraSet["localPulseWidthParas"];
                    opts.ksObjWs = ["0.5rw", 9999];
                    opts.ksObjss = [];
                    opts.xm = 20;
                    opts.eh = 50;
                    opts.etm = 0;
                    opts.headTitles = ["名稱", "波寬(us)"];
                    opts.headTitleXArr = [200, 9999];
                    opts.headTitleHeight = 24;
                    var ksObjs = [];
                    for (var i = 0; i < pulsePara.length; i++) {
                        if ((i % 2) === 0) {
                            var ksObjs = [];
                        }
                        var ksObj = {};
                        ksObj.name = "setLine#" + ((i / 2) | 0) + "." + (i % 2);
                        ksObj.type = "Model~MdaSetLine~base.sys0";
                        var kopts = ksObj.opts = {};
                        var setOpts = kopts.setOpts = sopt.getButtonActs();
                        setOpts.enum = [pulsePara[i]];
                        setOpts.value = 0;
                        setOpts.id = "" + i;
                        setOpts.titleWidth = 200;
                        setOpts.titleFontSize = 20;
                        setOpts.title = "脈波 " + (i);
                        setOpts.xArr = [9999];
                        setOpts.fontSize = 24;
                        ksObjs.push(ksObj);
                        if (i % 2)
                            opts.ksObjss.push(ksObjs);
                    }


                    opts.actionFunc = function (iobj) {
                        console.log(iobj);
                        if (iobj.act === "actButtonClick") {
                            var setLineObj = iobj.kvObj;
                            if (iobj.buttonInx === 0) {
                                var setOpts = sopt.getOptsFloat();
                                setOpts.min = gr.paraSet.pulseWidthMin;
                                setOpts.max = gr.paraSet.pulseWidthMax;
                            }
                            var butInx = iobj.buttonInx;
                            setOpts.value = KvLib.toNumber(setLineObj.opts.setOpts.enum[iobj.buttonInx], 0);
                            var opts = {};
                            opts.setOpts = setOpts;
                            opts.actionFunc = function (iobj) {
                                console.log(iobj);
                                if (iobj.act === "padEnter") {
                                    setLineObj.opts.setOpts.enum[butInx] = iobj.inputText;
                                    setLineObj.reCreate();
                                }
                            };
                            box.intPadBox(opts);
                            return;
                        }


                        if (iobj.act === "mouseClick" && iobj.buttonId === "ok") {
                            console.log(iobj);
                            var mdaBox = iobj.sender;
                            var container = mdaBox.blockRefs["mainMd"];
                            var ksObjss = container.opts.ksObjss;
                            var inx = 0;
                            var strA = [];
                            for (var i = 0; i < ksObjss.length; i++) {
                                var ksObjs = ksObjss[i];
                                for (var j = 0; j < ksObjs.length; j++) {
                                    var setOpts = ksObjs[j].opts.setOpts;
                                    var str = setOpts.enum[0];
                                    strA.push(str);
                                }
                            }
                            gr.paraSet["localPulseWidthParas"] = strA;
                            var fileName = "paraSet";
                            var content = JSON.stringify(gr.paraSet);
                            sv.saveStringToFile("responseDialogError", "null", fileName, content);
                        }
                    };
                    box.setLineBox(opts);
                    return;
                }
                if (iobj.selectText === "測試脈波設定") {
                    var opts = {};
                    opts.actionFunc = function (iobj) {
                        console.log(iobj);
                        KvLib.deepCoverObject(gr.paraSet, iobj.paraSet);
                        var fileName = "paraSet";
                        var content = JSON.stringify(gr.paraSet);
                        sv.saveStringToFile("responseDialogError", "null", fileName, content);
                    };
                    var op = {};
                    //======
                    var opts = {};
                    opts.title = iobj.selectText;
                    var pulsePara = gr.paraSet["localPulseGenParas"];
                    opts.ksObjWs = ["0.5rw", 9999];
                    opts.ksObjss = [];
                    opts.xm = 20;
                    opts.eh = 50;
                    opts.etm = 4;
                    opts.headTitles = ["名稱", "波寬(us)", "工作比(%)", "頻率(G)", "次數"];
                    opts.headTitleXArr = [240, 9999, 106, 80, 64];
                    opts.headTitleXArr = ["0.27rw", "0.25rw", "0.187rw", "0.14rw", "0.14rw"];
                    opts.headTitleHeight = 24;
                    var ksObjs = [];
                    for (var i = 0; i < pulsePara.length; i++) {
                        var strA = pulsePara[i].split(" ");
                        if ((i % 2) === 0) {
                            var ksObjs = [];
                        }
                        var ksObj = {};
                        ksObj.name = "setLine#" + ((i / 2) | 0) + "." + (i % 2);
                        ksObj.type = "Model~MdaSetLine~base.sys0";
                        var kopts = ksObj.opts = {};
                        var setOpts = kopts.setOpts = sopt.getButtonActs();
                        if (strA[0] === "1")
                            setOpts.checked_f = 1;
                        var pulseWidthInx = KvLib.toInt(strA[1], 0);
                        var pulseWidthStr = gr.paraSet["localPulseWidthParas"][pulseWidthInx];
                        setOpts.enum = [pulseWidthStr, strA[2], strA[3], strA[4]];
                        setOpts.value = 0;
                        setOpts.id = "" + i;
                        setOpts.titleWidth = "0.2rw";
                        setOpts.titleFontSize = 20;
                        setOpts.checkWidth = 40;
                        setOpts.title = "脈波 " + (i + 1);
                        setOpts.xArr = ["0.35rw", "0.25rw", "0.2rw", "0.2rw"];
                        setOpts.fontSize = 24;
                        ksObjs.push(ksObj);
                        if (i % 2)
                            opts.ksObjss.push(ksObjs);
                    }


                    opts.actionFunc = function (iobj) {
                        console.log(iobj);
                        if (iobj.act === "actButtonClick") {
                            var setLineObj = iobj.kvObj;
                            if (iobj.buttonInx === 0) {
                                var widthStr = iobj.setOptsObj.opts.setOpts.enum[0];
                                var widthInx = 0;
                                for (var i = 0; i < 32; i++) {
                                    if (widthStr === gr.paraSet["localPulseWidthParas"][i]) {
                                        widthInx = i;
                                        break;
                                    }
                                }

                                var opts = {};
                                opts.paraSet = gr.paraSet;
                                opts.title = "脈波寬度 (us)";
                                opts.xc = 4;
                                opts.yc = 8;
                                opts.eh = 60;
                                opts.eym = 10;
                                opts.w = 1000;
                                opts.h = 800;

                                opts.selectInx = widthInx;
                                opts.textAlign = "left";
                                opts.lpd = 10;
                                opts.kvTexts = [];
                                for (var i = 0; i < 32; i++)
                                    opts.kvTexts.push(i + ": " + gr.paraSet["localPulseWidthParas"][i]);
                                opts.actionFunc = function (iobj) {
                                    console.log(iobj);
                                    if (iobj.act === "selected") {
                                        setLineObj.opts.setOpts.enum[0] = gr.paraSet["localPulseWidthParas"][iobj.selectInx];
                                        setLineObj.reCreate();
                                    }
                                    //MdaPopWin.popOff(2);
                                };
                                box.selectBox(opts);
                                return;



                                var setOpts = sopt.getOptsFloat();
                                setOpts.min = gr.paraSet.pulseWidthMin;
                                setOpts.max = gr.paraSet.pulseWidthMax;
                            }
                            if (iobj.buttonInx === 1) {




                                var setOpts = sopt.getOptsFloat();
                                setOpts.min = gr.paraSet.pulseDutyMin;
                                setOpts.max = gr.paraSet.pulseDutyMax;
                            }
                            if (iobj.buttonInx === 2) {
                                var setOpts = sopt.getOptsFloat();
                                setOpts.min = gr.paraSet.pulseFreqMin;
                                setOpts.max = gr.paraSet.pulseFreqMax;
                            }
                            if (iobj.buttonInx === 3) {
                                var setOpts = sopt.getOptsNature();
                                setOpts.min = 1;
                                setOpts.max = 99;
                            }
                            var butInx = iobj.buttonInx;
                            setOpts.value = KvLib.toNumber(setLineObj.opts.setOpts.enum[iobj.buttonInx], 0);
                            var opts = {};
                            opts.setOpts = setOpts;
                            opts.actionFunc = function (iobj) {
                                console.log(iobj);
                                if (iobj.act === "padEnter") {
                                    setLineObj.opts.setOpts.enum[butInx] = iobj.inputText;
                                    setLineObj.reCreate();
                                }
                            };
                            box.intPadBox(opts);
                            return;
                        }


                        if (iobj.act === "mouseClick" && iobj.buttonId === "ok") {
                            console.log(iobj);
                            var mdaBox = iobj.sender;
                            var container = mdaBox.blockRefs["mainMd"];
                            var ksObjss = container.opts.ksObjss;
                            var inx = 0;
                            var strA = [];
                            for (var i = 0; i < ksObjss.length; i++) {
                                var ksObjs = ksObjss[i];
                                for (var j = 0; j < ksObjs.length; j++) {
                                    var setOpts = ksObjs[j].opts.setOpts;
                                    var str = "";
                                    if (setOpts.checked_f)
                                        str += "1";
                                    else
                                        str += "0";
                                    for (var k = 0; k < setOpts.enum.length; k++) {
                                        str += " ";
                                        if (k === 0) {
                                            var widthStr = setOpts.enum[0];
                                            var widthInx = 0;
                                            for (var m = 0; m < 32; m++) {
                                                if (widthStr === gr.paraSet["localPulseWidthParas"][m]) {
                                                    widthInx = m;
                                                    break;
                                                }
                                            }
                                            str += widthInx;
                                        } else
                                            str += setOpts.enum[k];
                                    }
                                    strA.push(str);
                                }
                            }
                            gr.paraSet["localPulseGenParas"] = strA;
                            var fileName = "paraSet";
                            var content = JSON.stringify(gr.paraSet);
                            sv.saveStringToFile("responseDialogError", "null", fileName, content);
                        }
                    };
                    box.setLineBox(opts);
                    return;
                }
                if (iobj.selectText === "進階設定") {
                    if (gr.appId >= 0) {
                        opts.setNames.push("version");
                        opts.setNames.push("appId");
                        opts.setNames.push("subNumber");
                        opts.setNames.push("emulate");
                        opts.setNames.push("paraSetPassword");
                        opts.setNames.push("emuSpSignal");

                    }
                }
                if (iobj.selectText === "發射機信號參數設定") {
                    if (gr.appId === 0) {
                        opts.setNames.push("mastPulseSource");
                        opts.setNames.push("mastToSub1CommType");
                        opts.setNames.push("mastToSub2CommType");
                        opts.setNames.push("mastToSub1SpeechEnable");
                        opts.setNames.push("mastToSub2SpeechEnable");
                        opts.setNames.push("radarStartAngle");
                        opts.setNames.push("radarEndAngle");
                        opts.setNames.push("radarScanRpm");
                        opts.setNames.push("radarFadeTime");
                    } else {
                        opts.setNames.push("sub1PulseSource");
                        opts.setNames.push("sub1CommType");
                    }
                }
                if (iobj.selectText === "發射機參數設定") {
                    opts.setNames.push("ctr1Remote");
                    opts.setNames.push("ctr1PulseSource");
                    opts.setNames.push("ctr1BatShort");
                    opts.setNames.push("ctr1TxLoad");
                }
                if (iobj.selectText === "電源參數設定") {
                    var preText = "ctr1";
                    opts.setNames.push(preText + "SspaPowerV50vOffs");
                    opts.setNames.push(preText + "SspaPowerV50vGain");
                    opts.setNames.push(preText + "SspaPowerV50vZero");
                    opts.setNames.push(preText + "SspaPowerV50vLimD");
                    opts.setNames.push(preText + "SspaPowerV50vLimU");
                    //
                    opts.setNames.push(preText + "SspaPowerV50iOffs");
                    opts.setNames.push(preText + "SspaPowerV50iGain");
                    opts.setNames.push(preText + "SspaPowerV50iZero");
                    opts.setNames.push(preText + "SspaPowerV50iLimD");
                    opts.setNames.push(preText + "SspaPowerV50iLimU");
                    //
                    opts.setNames.push(preText + "SspaPowerV50tOffs");
                    opts.setNames.push(preText + "SspaPowerV50tGain");
                    opts.setNames.push(preText + "SspaPowerV50tZero");
                    opts.setNames.push(preText + "SspaPowerV50tLimD");
                    opts.setNames.push(preText + "SspaPowerV50tLimU");
                    //
                    opts.setNames.push(preText + "SspaPowerV32vOffs");
                    opts.setNames.push(preText + "SspaPowerV32vGain");
                    opts.setNames.push(preText + "SspaPowerV32vZero");
                    opts.setNames.push(preText + "SspaPowerV32vLimD");
                    opts.setNames.push(preText + "SspaPowerV32vLimU");
                    //
                    opts.setNames.push(preText + "SspaPowerV32iOffs");
                    opts.setNames.push(preText + "SspaPowerV32iGain");
                    opts.setNames.push(preText + "SspaPowerV32iZero");
                    opts.setNames.push(preText + "SspaPowerV32iLimD");
                    opts.setNames.push(preText + "SspaPowerV32iLimU");
                    //
                    opts.setNames.push(preText + "SspaPowerV32tOffs");
                    opts.setNames.push(preText + "SspaPowerV32tGain");
                    opts.setNames.push(preText + "SspaPowerV32tZero");
                    opts.setNames.push(preText + "SspaPowerV32tLimD");
                    opts.setNames.push(preText + "SspaPowerV32tLimU");
                    //
                    opts.setNames.push(preText + "SspaPowerV32OnDly");
                    opts.setNames.push(preText + "SspaPowerV50OffDly");

                }
                if (iobj.selectText === "固態放大器參數設定") {
                    var preText = "ctr1";
                    opts.setNames.push(preText + "SspaModuleRfOutOffs");
                    opts.setNames.push(preText + "SspaModuleRfOutGain");
                    opts.setNames.push(preText + "SspaModuleRfOutZero");
                    opts.setNames.push(preText + "SspaModuleRfOutLimD");
                    opts.setNames.push(preText + "SspaModuleRfOutLimU");
                    opts.setNames.push(preText + "SspaModuleTemprOffs");
                    opts.setNames.push(preText + "SspaModuleTemprGain");
                    opts.setNames.push(preText + "SspaModuleTemprZero");
                    opts.setNames.push(preText + "SspaModuleTemprLimD");
                    opts.setNames.push(preText + "SspaModuleTemprLimU");
                }
                if (iobj.selectText === "功率表參數設定") {
                    var preText = "ctr1";
                    opts.setNames.push(preText + "InRfpowFilter");
                    opts.setNames.push(preText + "InRfpowOffs");
                    opts.setNames.push(preText + "InRfpowGain");
                    opts.setNames.push(preText + "InRfpowZero");
                    opts.setNames.push(preText + "InRfpowLimD");
                    opts.setNames.push(preText + "InRfpowLimU");
                    //
                    opts.setNames.push(preText + "PreAmpOutRfpowFilter");
                    opts.setNames.push(preText + "PreAmpOutRfpowOffs");
                    opts.setNames.push(preText + "PreAmpOutRfpowGain");
                    opts.setNames.push(preText + "PreAmpOutRfpowZero");
                    opts.setNames.push(preText + "PreAmpOutRfpowLimD");
                    opts.setNames.push(preText + "PreAmpOutRfpowLimU");
                    //
                    opts.setNames.push(preText + "DriverAmpOutRfpowFilter");
                    opts.setNames.push(preText + "DriverAmpOutRfpowOffs");
                    opts.setNames.push(preText + "DriverAmpOutRfpowGain");
                    opts.setNames.push(preText + "DriverAmpOutRfpowZero");
                    opts.setNames.push(preText + "DriverAmpOutRfpowLimD");
                    opts.setNames.push(preText + "DriverAmpOutRfpowLimU");
                    opts.setNames.push(preText + "DriverAmpOutRfpowAtt");
                    //
                    opts.setNames.push(preText + "CwAmpOutRfpowFilter");
                    opts.setNames.push(preText + "CwAmpOutRfpowOffs");
                    opts.setNames.push(preText + "CwAmpOutRfpowGain");
                    opts.setNames.push(preText + "CwAmpOutRfpowZero");
                    opts.setNames.push(preText + "CwAmpOutRfpowLimD");
                    opts.setNames.push(preText + "CwAmpOutRfpowLimU");
                    opts.setNames.push(preText + "CwAmpOutRfpowAtt");
                    //
                    opts.setNames.push(preText + "CcwAmpOutRfpowFilter");
                    opts.setNames.push(preText + "CcwAmpOutRfpowOffs");
                    opts.setNames.push(preText + "CcwAmpOutRfpowGain");
                    opts.setNames.push(preText + "CcwAmpOutRfpowZero");
                    opts.setNames.push(preText + "CcwAmpOutRfpowLimD");
                    opts.setNames.push(preText + "CcwAmpOutRfpowLimU");
                    opts.setNames.push(preText + "CcwAmpOutRfpowAtt");
                    //
                    opts.setNames.push(preText + "Attenuator");
                    opts.setNames.push("sp4tCnt");
                    opts.setNames.push("rfDriverOutChannel");




                }
                if (iobj.selectText === "脈波參數設定") {
                    opts.setNames.push("pulseWidthMin");
                    opts.setNames.push("pulseWidthMax");
                    opts.setNames.push("pulseDutyMin");
                    opts.setNames.push("pulseDutyMax");
                    opts.setNames.push("pulseFreqMin");
                    opts.setNames.push("pulseFreqMax");
                    opts.setNames.push("localPulseGenCh");
                    opts.setNames.push("preTrigTime");
                    opts.setNames.push("preRfOutTime");
                    opts.setNames.push("afterRfOutTime");
                    opts.setNames.push("wgProtectFlag");
                }
                if (iobj.selectText === "同步參數設定") {
                    if (gr.appId === 0) {
                        opts.setNames.push("commTestPacks");
                        opts.setNames.push("vgTimeDelay");
                        opts.setNames.push("sub1ChTimeFineTune");
                        opts.setNames.push("sub2ChTimeFineTune");
                        opts.setNames.push("sub1ChSyncType");
                        opts.setNames.push("sub2ChSyncType");
                        opts.setNames.push("sub1ChCommSet");
                        opts.setNames.push("sub2ChCommSet");
                        opts.setNames.push("sub1ChFiberDelay");
                        opts.setNames.push("sub2ChFiberDelay");
                        opts.setNames.push("sub1ChRfDelay");
                        opts.setNames.push("sub2ChRfDelay");
                        opts.setNames.push("sub1ChRfTxCh");
                        opts.setNames.push("sub1ChRfRxCh");
                        opts.setNames.push("sub2ChRfTxCh");
                        opts.setNames.push("sub2ChRfRxCh");
                    } else {
                        var preText = "sub1";
                        opts.setNames.push("commTestPacks");
                        opts.setNames.push("vgTimeDelay");
                        opts.setNames.push(preText + "ChFiberDelay");
                        opts.setNames.push(preText + "ChRfDelay");
                        opts.setNames.push("subChDelay");
                        opts.setNames.push("ctrChDelay");
                        opts.setNames.push("drvChDelay");
                        opts.setNames.push("meterChDelay");
                        opts.setNames.push(preText + "ChTimeFineTune");
                        opts.setNames.push(preText + "ChSyncType");
                        opts.setNames.push(preText + "ChCommSet");
                        opts.setNames.push(preText + "ChRfTxCh");
                        opts.setNames.push(preText + "ChRfRxCh");
                    }
                }
                if (iobj.selectText === "GPS參數設定") {
                    if (gr.appId === 0) {
                        opts.setNames.push("locationFromSource");
                        opts.setNames.push("mastLatitude");
                        opts.setNames.push("mastLongitude");
                        opts.setNames.push("mastAttitude");
                        opts.setNames.push("sub1Latitude");
                        opts.setNames.push("sub1Longitude");
                        opts.setNames.push("sub1Attitude");
                        opts.setNames.push("sub2Latitude");
                        opts.setNames.push("sub2Longitude");
                        opts.setNames.push("sub2Attitude");
                    }
                    if (gr.appId === 1) {
                        opts.setNames.push("locationFromSource");
                        opts.setNames.push("sub1Latitude");
                        opts.setNames.push("sub1Longitude");
                        opts.setNames.push("sub1Attitude");
                    }


                }
                if (iobj.selectText === "下載記錄檔") {
                    var fileName = "user-" + gr.systemName + "/paraSet.json";
                    var fileName = "log/syncSet.log";
                    mac.saveFileToLocal(fileName, "syncSet.log");
                    return;
                }
                if (iobj.selectText === "下載設定檔") {
                    var fileName = "paraSet.json";
                    var dataStr = JSON.stringify(gr.paraSet);
                    mac.saveStringToLocalFile(fileName, dataStr);
                    return;
                }
                if (iobj.selectText === "上傳設定檔") {
                    var actionFunc = function (content) {
                        gr.paraSet = JSON.parse(content);
                        mac.saveParaSet();
                    };
                    mac.readLocalTextFile(actionFunc, ".json");
                    return;
                }


                opts.actionFunc = function (iobj) {
                    console.log(iobj);
                    KvLib.deepCoverObject(gr.paraSet, iobj.paraSet);
                    var fileName = "paraSet";
                    var content = JSON.stringify(gr.paraSet);
                    sv.saveStringToFile("responseDialogError", "null", fileName, content);
                };
                box.paraEditBox(opts);
                return;

            }


            box.selectBox(opts);
        };
        setPrg();
        return;
        var opts = {};
        opts.title = "輸入密碼";
        opts.setOpts = sopt.getIntPassword({});
        opts.actionFunc = function (iobj) {

            var yes_f = 0;
            if (iobj.inputText === "16020039") {
                yes_f = 1;
            }
            if (iobj.inputText === gr.paraSet.paraSetPassword) {
                yes_f = 1;
            }
            yes_f = 1;
            if (!yes_f) {
                console.log(iobj);
                var opts = {};
                opts.kvTexts = ["密碼錯誤"];
                box.errorBox(opts);
                return;
            }
            MdaPopWin.popOff(2);
            setPrg();
        };
        box.intPadBox(opts);

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

        if (gr.radarData.conRxA) {

            var str = "W";
            str += gr.webSocketConnectCnt & 7;
            str += "U";
            str += gr.radarData.conRxA[24] & 7;
            str += gr.radarData.conRxA[25] & 7;
            str += "P";
            str += gr.radarData.conRxA[0] & 7;
            str += gr.radarData.conRxA[2] & 7;
            gr.footBarStatus0 = str;

            var str = "S1:";
            str += gr.radarData.conRxA[1] & 7;
            str += " S2:";
            str += gr.radarData.conRxA[3] & 7;
            gr.footBarStatus1 = str;



            /*
             var str = "MST:";
             str += gr.radarData.conRxA[0] & 7;
             str += gr.radarData.conRxA[2] & 7;
             str += " CTR:";
             str += gr.radarData.conRxA[4] & 7;
             str += gr.radarData.conRxA[5] & 7;
             str += gr.radarData.conRxA[7] & 7;
             gr.footBarStatus1 = str;
             
             if (gr.radarData.conRxA[7] !== self.subRxFromCtrCnt) {
             self.subRxFromCtrCnt = gr.radarData.conRxA[7];
             self.subRxFromCtrTime = 0;
             self.subRxFromCtr_f = 1;
             }
             self.subRxFromCtrTime++;
             if (self.subRxFromCtrTime > 100)
             self.subRxFromCtr_f = 0;
             
             //gr.footBarStatus2 = str;
             */

        }



    }

    actionFunc(iobj) {
        console.log(iobj);
        if (iobj.act === "mouseClick") {
            if (iobj.keyId === "radarPaneSetButton") {
                var opts = {};
                opts.paraSet = gr.paraSet;
                opts.title = "主控發射機設定";
                opts.h = 300;
                opts.eh = 60;
                opts.ym = 10;
                opts.actionFunc = function (iobj) {
                    console.log(iobj);
                    KvLib.deepCoverObject(gr.paraSet, iobj.paraSet);
                    var fileName = "paraSet";
                    var content = JSON.stringify(gr.paraSet);
                    sv.saveStringToFile("responseDialogError", "null", fileName, content);
                };
                opts.setNames = [];
                opts.setNames.push("mastPulseSource");
                opts.setNames.push("mastToSub1CommType");
                opts.setNames.push("mastToSub2CommType");
                box.paraEditBox(opts);
                return;




            }

            var setF = 0;
            var preText = "Sub";
            if (iobj.keyId === "targetPane1SetButton") {
                setF = 1;
            }
            if (iobj.keyId === "targetPane2SetButton") {
                setF = 2;
            }
            if (setF) {
                var opts = {};
                opts.w = 1000;
                opts.h = 300;
                opts.headButtons = ["OK", "ESC"];
                opts.headButtonIds = ["ok", "esc"];



                var subStatus = 0;
                if (setF === 1) {
                    opts.title = "副控1發射機設定";
                    subStatus = gr.radarData.subStatusA[0];
                }
                if (setF === 2) {
                    opts.title = "副控2發射機設定";
                    subStatus = gr.radarData.subStatusA[1];
                }

                opts.setOptsA = [];
                var setOpts = sopt.getOptsPara("buttonSelect");
                setOpts.title = "脈波來源";
                setOpts.enum = ["無線", "光纖"];
                setOpts.value = (subStatus >> 5) & 1;
                opts.setOptsA.push(setOpts);

                var setOpts = sopt.getOptsPara("buttonSelect");
                setOpts.title = "脈波來源";
                setOpts.enum = ["同步脈波", "本機脈波"];
                setOpts.value = (subStatus >> 6) & 1;
                opts.setOptsA.push(setOpts);

                var setOpts = sopt.getOptsPara("buttonSelect");
                setOpts.title = "輸出裝置";
                setOpts.enum = ["假負載", "天線"];
                setOpts.value = (subStatus >> 7) & 1;
                opts.setOptsA.push(setOpts);

                var setOpts = sopt.getOptsPara("buttonSelect");
                setOpts.title = "戰備短路";
                setOpts.enum = ["關閉", "開啟"];
                setOpts.value = (subStatus >> 8) & 1;
                opts.setOptsA.push(setOpts);
                opts.actionFunc = function (iobj) {
                    console.log(iobj);
                    var value = 0;
                    for (var i = 0; i < iobj.ksObjss.length; i++) {
                        var kobj = iobj.ksObjss[i][0];
                        value += (kobj.opts.setOpts.value << i);
                    }
                    if (iobj.act === "mouseClick" && iobj.buttonId === "ok") {
                        gr.gbcs.command({'act': "mast" + preText + "RadarSet", "value": value, "idInx": (setF - 1)});
                    }
                };
                box.testSetLineBox(opts);
                return;
            }


            var setF = 0;
            var preText = "Sub";
            if (iobj.keyId === "targetPane1CtrButton") {
                setF = 1;
            }
            if (iobj.keyId === "targetPane2CtrButton") {
                setF = 2;
            }
            if (setF) {
                var opts = {};
                opts.paraSet = gr.paraSet;
                opts.title = "副控發射機控制";
                opts.xc = 2;
                opts.yc = 10;
                opts.eh = 60;
                opts.eym = 10;
                opts.h = 400;
                opts.kvTexts = [];
                opts.kvTexts.push("放大器電源 關閉");
                opts.kvTexts.push("放大器電源 開啟");
                opts.kvTexts.push("放大器致能 關閉");
                opts.kvTexts.push("放大器致能 開啟");
                opts.kvTexts.push("脈波輸出 關閉");
                opts.kvTexts.push("脈波輸出 開啟");
                opts.kvTexts.push("緊急停止 關閉");
                opts.kvTexts.push("緊急停止 開啟");
                opts.actionFunc = function (iobj) {
                    console.log(iobj);
                    MdaPopWin.popOff(2);
                    if (iobj.act !== "selected")
                        return;
                    gr.gbcs.command({'act': "mast" + preText + "RadarCtr", "value": iobj.selectInx, "idInx": (setF - 1)});
                };
                box.selectBox(opts);




                return;
            }



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
        var opts = {};
        opts.innerText = "主控發射機同步控制器";
        blocks[cname] = {name: "basePanel", type: "Component~Cp_base~label.title", opts: opts};
        //==============================
        var cname = lyMaps["mainBody"] + "~" + 3;
        mac.setFootBar(md, cname);




        var cname = lyMaps["mainBody"] + "~" + 1;
        var opts = {};
        opts.buttons = ["自測", "佈署", "同步", "波形", "通話", "設定"];
        opts.buttonIds = ["selfTest", "location", "sync", "wave", "call", "setting"];
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            if (iobj.buttonId === "location") {
                var opts = {};
                opts.actionFunc = function (iobj) {
                    console.log(iobj);
                    if (iobj.act === "esc")
                        MdaPopWin.popOff(2);
                };
                var kvObj = new Block("location", "Model~LocationTarget~base.sys0", opts);
                var mesObj = mda.popObj(0, 0, kvObj);
                return;
            }
            if (iobj.buttonId === "selfTest") {
                var opts = {};
                opts.actionFunc = function (iobj) {
                    console.log(iobj);
                    if (iobj.act === "mouseClick") {
                        if (iobj.kvObj.opts.itemId === "esc")
                            MdaPopWin.popOff(2);
                    }
                };
                var kvObj = new Block("selfTest", "Model~SelfTest~base.sys0", opts);
                var mesObj = mda.popObj(0, 0, kvObj);
                return;
            }
            if (iobj.buttonId === "sync") {
                var opts = {};
                opts.actionFunc = function (iobj) {
                    console.log(iobj);
                    if (iobj.act === "esc")
                        MdaPopWin.popOff(2);
                };
                var kvObj = new Block("syncTest", "Model~SyncTest~base.sys0", opts);
                var mesObj = mda.popObj(0, 0, kvObj);
                return;
            }
            if (iobj.buttonId === "wave") {
                var opts = {};
                opts.actionFunc = function (iobj) {
                    console.log(iobj);
                    if (iobj.act === "esc") {
                        var kvObj = iobj.sender;
                        if (!kvObj.opts.signalMode) {
                            gr.hideWavePageElem = null;
                            gr.wavePageObj = null;
                            MdaPopWin.popOffTo(kvObj.opts.popStackCnt);
                            return;
                        }
                        var basePanel = kvObj.fatherMd.blockRefs["basePanel#" + kvObj.opts.popStackCnt];
                        var elem = basePanel.elems["base"];
                        elem.style.visibility = "hidden";
                        gr.hideWavePageElem = elem;
                        gr.wavePageObj = kvObj;
                        return;
                    }
                };
                if (gr.hideWavePageElem) {
                    gr.hideWavePageElem.style.visibility = "visible";
                    return;
                }
                var kvObj = new Block("scope", "Model~MyNewScope~base.sys0", opts);
                //var mesObj = mda.popObj(0, 0, kvObj);
                opts.kvObj = kvObj;
                gr.scope = kvObj;
                kvObj.opts.popStackCnt = gr.mdSystem.mdClass.stackCnt;
                MdaPopWin.popObj(opts);
                return;
            }

            if (iobj.buttonId === "setting") {
                DummyTargetMaster.paraSetPrg();
                return;
                var opts = {};
                opts.title = "輸入密碼";
                opts.setOpts = sopt.getIntPassword({});
                opts.actionFunc = function (iobj) {

                    var yes_f = 0;
                    if (iobj.inputText === "16020039") {
                        yes_f = 1;
                    }
                    if (iobj.inputText === gr.paraSet.paraSetPassword) {
                        yes_f = 1;
                    }
                    yes_f = 1;
                    if (!yes_f) {
                        console.log(iobj);
                        var opts = {};
                        opts.kvTexts = ["密碼錯誤"];
                        box.errorBox(opts);
                        return;
                    }
                    MdaPopWin.popOff(2);
                    DummyTargetMaster.paraSetPrg();
                };
                box.intPadBox(opts);
            }

            if (iobj.buttonId === "call") {
                var opts = {};
                opts.actionFunc = function (iobj) {
                    console.log(iobj);
                    if (iobj.act === "esc")
                        MdaPopWin.popOff(2);
                };
                var kvObj = new Block("syncTest", "Model~MdbPhoneBox~base.sys0", opts);
                var mesObj = mda.popObj(0, 0, kvObj);
                return;
            }


        };
        opts.buttonAmt = 6;
        blocks[cname] = {name: "headButtons", type: "Model~MdaButtons~base.sys0", opts: opts};
        //==============================
        var cname = lyMaps["mainBody"] + "~" + 2;
        var opts = {};
        opts.xArr = [400, 9999];
        opts.xm = 10;
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["downBody"] = cname;
        //==============================
        var cname = lyMaps["downBody"] + "~" + 0;
        var opts = {};
        opts.yc = 2;
        opts.ym = 10;
        opts.margin = 0;
        layouts[cname] = {name: cname, type: "Layout~Ly_base~array.sys0", opts: opts};
        lyMaps["leftBody"] = cname;
        //==============================
        var cname = lyMaps["leftBody"] + "~" + 0;
        var opts = {};
        opts.title = "副控發射機 1";
        opts.actionFunc = self.actionFunc;
        opts.deviceInx = 0;
        blocks[cname] = {name: "targetPane1", type: "Model~TargetPane~base.sys0", opts: opts};
        //==============================
        var cname = lyMaps["leftBody"] + "~" + 1;
        var opts = {};
        opts.title = "副控發射機 2";
        opts.deviceInx = 1;
        opts.actionFunc = self.actionFunc;
        blocks[cname] = {name: "targetPane2", type: "Model~TargetPane~base.sys0", opts: opts};
        //==============================
        var cname = lyMaps["downBody"] + "~" + 1;
        var opts = {};
        opts.title = "主控發射機";
        opts.actionFunc = self.actionFunc;
        opts.baseColor = "#ccc";
        blocks[cname] = {name: "masterRadarPane", type: "Model~MasterRadarPane~base.sys0", opts: opts};
        //==============================



    }
}
class TargetPane {
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);
        this.subTypeOpts(opts);
        opts.title = "title";
        opts.baseColor = "#ccc";
        opts.xm = 30;
        opts.deviceInx = 0;//0:sub1,sub2
        return opts;
    }
    subTypeOpts(opts) {
        if (this.md.subType === "base.sys0") {
        }
    }
    chkWatch() {
        /*
         發射機狀態    0.0: 未連線, 0.1: 準備中, 0.2:本機備便, 0.3:發射備便, 0.4:發射中, 0.5:異常發生               
         環控        1.0: 未連線, 1.1:良好, 1.2: 異常 
         SSPA電源    2.0: 未連線, 2.1:良好, 2.2: 異常 
         SSPA放大器  3.0: 未連線, 3.1:良好, 3.2: 異常 
         SSPA功率    4.0: 未連線, 3.1:良好, 4.2: 異常 
         戰備狀態    5.0: 未連線, 5.1:關閉, 5.2: 開啟 
         遠端遙控    6.0: 未連線, 6.1:關閉, 6.2: 開啟 
         脈波來源    7.0: 未連線, 7.1: 主雷同步, 7.2: 本機脈波
         輸出裝置    8.0: 未連線, 8.1: 天線, 8.2:假負載 
         連線方式    9.0: 未連線, 9.1: 光纖, 9.2:無線, 9.3:自動 
         */

        //radarStatus.mastStatus = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        //radarStatus.sub1Status = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        //radarStatus.sub2Status = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        var self = this;
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        st.radarStatusText = [];
        st.radarStatusColor = [];
        st.radarStatusText.push("連線");
        st.radarStatusText.push("環控狀態");
        st.radarStatusText.push("電源狀態");
        st.radarStatusText.push("放大器狀態");
        st.radarStatusText.push("脈波狀態");
        st.radarStatusText.push("功率狀態");
        //====================================
        st.radarStatusText.push("連線方式:無線");
        st.radarStatusText.push("脈波來源:同步");
        st.radarStatusText.push("輸出裝置:假負載");
        st.radarStatusText.push("戰備狀態:關閉");
        //====================================
        st.radarStatusText.push("放大器電源");
        st.radarStatusText.push("固態放大器");
        st.radarStatusText.push("脈波輸出");
        st.radarStatusText.push("緊急停止");
        //====================================
        st.radarStatusText.push("遠端控制");


        st.radarStatusColor.push("#888");
        st.radarStatusColor.push("#888");
        st.radarStatusColor.push("#888");
        st.radarStatusColor.push("#888");
        st.radarStatusColor.push("#888");
        st.radarStatusColor.push("#888");
        st.radarStatusColor.push("#888");
        st.radarStatusColor.push("#888");
        st.radarStatusColor.push("#888");
        st.radarStatusColor.push("#888");
        st.radarStatusColor.push("#888");
        st.radarStatusColor.push("#888");
        st.radarStatusColor.push("#888");
        st.radarStatusColor.push("#888");
        st.radarStatusColor.push("#888");
        st.remoteDisable_f = 1;
        //gr.radarData.subStatusA=[0xffffffff,0x00000000];
        var rd = gr.radarData;
        if (!gr.radarData.subStatusA)
            return;



        var conOk = 0;
        var statusFlag = 0x00000000;

        if (op.deviceInx === 0) {
            if (rd.commOkRateA[0] > 500)
                conOk = 1;
            statusFlag = rd.subStatusA[0];
        }
        if (op.deviceInx === 1) {
            statusFlag = rd.subStatusA[1];
        }
        
        //<<debug
        conOk = 1;
        statusFlag |= 1 << 15;
        //statusFlag |= 1<<9;
        //statusFlag |= 1<<10;
        //statusFlag |= 1<<11;
        //statusFlag |= 1<<12;
        statusFlag |= 1 << 13;


        if (conOk === 1) {
            for (var i = 0; i < 14; i++)
                st.radarStatusColor[i + 1] = "#ccc";
            st.radarStatusColor[0] = "#cfc";
            //=============================
            if ((statusFlag >> 15) & 1) {
                for (var i = 0; i < 5; i++)
                    st.radarStatusColor[i + 1] = "#cfc";
                if ((statusFlag >> 0) & 1)
                    st.radarStatusColor[1] = "#fcc";
                if ((statusFlag >> 1) & 1)
                    st.radarStatusColor[2] = "#fcc";
                if ((statusFlag >> 2) & 1)
                    st.radarStatusColor[3] = "#fcc";
                if ((statusFlag >> 3) & 1)
                    st.radarStatusColor[4] = "#fcc";
                if ((statusFlag >> 4) & 1)
                    st.radarStatusColor[5] = "#fcc";
            }

            st.radarStatusColor[6] = "#fff";
            st.radarStatusColor[7] = "#fff";
            if ((statusFlag >> 5) & 1)
                st.radarStatusText[6] = "連線方式:光纖";
            if ((statusFlag >> 6) & 1)
                st.radarStatusText[7] = "脈波來源:本機";

            if ((statusFlag >> 15) & 1) {
                for (var i = 0; i < 7; i++)
                    st.radarStatusColor[i + 8] = "#fff";
                if ((statusFlag >> 7) & 1)
                    st.radarStatusText[8] = "輸出裝置:天線";
                if ((statusFlag >> 8) & 1)
                    st.radarStatusText[9] = "戰備狀態:開啟";
                if ((statusFlag >> 9) & 1)
                    st.radarStatusColor[10] = "#ccffcc";
                if ((statusFlag >> 10) & 1)
                    st.radarStatusColor[11] = "#cfc";
                if ((statusFlag >> 11) & 1)
                    st.radarStatusColor[12] = "#cfc";
                if ((statusFlag >> 12) & 1)
                    st.radarStatusColor[13] = "#fcc";
                if ((statusFlag >> 13) & 1) {
                    st.radarStatusColor[14] = "#cfc";
                    st.remoteDisable_f = 0;
                }
            }

        }

        /*
         if (conSet === 0)
         st.radarStatusText[9] = "連線方式: 光纖";
         else
         st.radarStatusText[9] = "連線方式: 無線";
         */

        return;
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
        md.setPns(opts);
        layouts[cname] = {name: cname, type: "Layout~Ly_base~array.sys0", opts: opts};
        lyMaps["body"] = cname;
        //======================================    
        var opts = {};
        md.setPns(opts);
        blocks[cname] = {name: "basePanel", type: "Component~Cp_base~plate.sys0", opts: opts};
        //======================================    
        var cname = lyMaps["body"] + "~" + 0;
        var opts = {};
        opts.margin = 6;
        opts.xm = 2;
        opts.ym = 4;
        var yr = (1 / 8).toFixed(3) + "rh";
        opts.yArr = [yr, yr, yr, yr, yr, yr, yr, yr, yr, yr];
        opts.xyArr = [[9999], ["0.33rw", "0.33rw", 9999], ["0.33rw", "0.33rw", 9999], ["0.5rw", 9999], ["0.5rw", 9999], ["0.5rw", 9999], ["0.5rw", 9999], ["0.33rw", "0.33rw", 9999], [9999]];
        var lyInx = 0;
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["mainBody"] = cname;
        var cname = lyMaps["mainBody"] + "~" + lyInx++;
        var opts = {};
        opts.innerText = op.title;
        blocks[cname] = {name: "basePanel", type: "Component~Cp_base~label.title", opts: opts};
        //==============================
        for (var i = 0; i < 15; i++) {
            var cname = lyMaps["mainBody"] + "~" + lyInx++;
            var opts = {};
            opts.fontSize = "0.5rh";
            opts.innerText = "";
            var watchReg = "self.fatherMd.stas.radarStatusText[" + i + "]";
            md.setInputWatch(opts, "directName", watchReg, "innerText", 1);
            var watchReg = "self.fatherMd.stas.radarStatusColor[" + i + "]";
            md.setInputWatch(opts, "directName", watchReg, "baseColor", 1);
            blocks[cname] = {name: "statusLabel#0", type: "Component~Cp_base~label.led", opts: opts};
        }
        var cname = lyMaps["mainBody"] + "~" + lyInx++;
        var opts = {};
        opts.innerText = "設定";
        opts.fontSize = "0.6rh";
        var watchReg = "self.fatherMd.stas.remoteDisable_f";
        md.setInputWatch(opts, "directName", watchReg, "disable_f", 1);
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            iobj.sender = md;
            iobj.keyId = md.name + "SetButton";
            KvLib.exe(op.actionFunc, iobj);
        };
        blocks[cname] = {name: "setButton", type: "Component~Cp_base~button.sys0", opts: opts};

        var cname = lyMaps["mainBody"] + "~" + lyInx++;
        var opts = {};
        opts.innerText = "控制";
        opts.fontSize = "0.6rh";
        var watchReg = "self.fatherMd.stas.remoteDisable_f";
        md.setInputWatch(opts, "directName", watchReg, "disable_f", 1);
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            iobj.sender = md;
            iobj.keyId = md.name + "CtrButton";
            KvLib.exe(op.actionFunc, iobj);
        };
        blocks[cname] = {name: "ctrButton", type: "Component~Cp_base~button.sys0", opts: opts};


        //==============================
    }
}
class MasterRadarPane {
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);
        this.subTypeOpts(opts);
        opts.title = "title";
        opts.buttonColor = "#ccf";
        opts.buttons = ["button1", "button2", "button3"];
        opts.layoutType = "row"; //row,collum,array
        opts.buttonIds = [];
        opts.iw = 9999;
        opts.ih = 9999;
        opts.borderWidth = 1;
        opts.xm = 30;
        opts.baseColor = "#cce";
        return opts;
    }
    subTypeOpts(opts) {
        if (this.md.subType === "base.sys0") {
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

    chkWatch() {
        var self = this;
        var md = this.md;
        var op = md.opts;
        var st = md.stas;

        st.radarStatus = [];

        /*
         SP發射機信號     0.0: 無信號, 0.1: 信號備便
         脈波來源       1.0: 主雷同步, 1.1: 本機脈波
         與副控1連線方式  2.0: 光纖, 2.1: 無線, 2.2: 自動 
         與副控2連線方式  2.0: 光纖, 2.1: 無線, 2.2: 自動 
         */

        var status = gr.radarData.systemStatus0 & 3;
        var ledInx = 0;
        if (status === 1)
            ledInx = 3;
        if (status === 2)
            ledInx = 1;
        if (status === 3)
            ledInx = 2;
        st.radarStatus.push(ledInx);
        ledInx = (gr.radarData.systemStatus1 >> 6) & 1;
        st.radarStatus.push(ledInx);
        ledInx = (gr.radarData.systemStatus1 >> 19) & 1;
        st.radarStatus.push(ledInx);
        mac.messageEditor(md);
        return;





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
        var actionPrg = function (iobj) {
            console.log(iobj);
            if (iobj.kvObj.name === "clrButton") {
                var kvObj = md.blockRefs["editor"];
                if (!kvObj)
                    return;
                var editor = kvObj.objs["editor"];
                KvLib.clearEditorMaker(editor);
                editor.getSession().setValue("");
                return;
            }
            if (iobj.buttonId === "pulseStart") {
                gr.gbcs.command({'act': "mastPulseEnable"});
                return;
            }
            if (iobj.buttonId === "pulseStop") {
                gr.gbcs.command({'act': "mastPulseDisable"});
                return;
            }



            var savePara_f = 0;
            if (iobj.setId === "mastToSub1CommType") {
                gr.paraSet[iobj.setId] = iobj.buttonInx;
                savePara_f = 1;
            }
            if (iobj.setId === "mastToSub2CommType") {
                gr.paraSet[iobj.setId] = iobj.buttonInx;
                savePara_f = 1;
            }
            if (iobj.setId === "mastPulseSource") {
                gr.paraSet[iobj.setId] = iobj.buttonInx;
                savePara_f = 1;
            }

            if (iobj.setId === "mastPulseSource") {
                if (gr.paraSet[iobj.setId] !== iobj.buttonInx)
                    mac.saveParaSet(iobj.setId, iobj.buttonInx);
                else {
                    if (iobj.buttonInx === 0)
                        return;
                    //gr.gbcs.command({'act': preText + "RadiationOnOff"});
                    var opts = {};
                    opts.title = iobj.buttonText;
                    opts.xc = 2;
                    opts.yc = 17;
                    opts.w = 1000;
                    opts.fontSize = "0.5rh";
                    opts.kvTexts = [];
                    var selectNo = [];

                    for (var i = 0; i < gr.paraSet.localPulseGenParas.length; i++) {
                        var strA = gr.paraSet.localPulseGenParas[i].split(" ");
                        if (strA[0] === "0")
                            continue;
                        var inx = KvLib.toInt(strA[1], 0);
                        var pw = gr.paraSet.localPulseWidthParas[inx];
                        var str = pw + "us ";
                        str += strA[2] + "% ";
                        str += strA[3] + "GHz ";
                        str += "X" + strA[4];
                        selectNo.push(i);
                        opts.kvTexts.push(str);
                    }
                    opts.kvTexts.push("隨機脈波");
                    opts.kvTexts.push("停止");
                    opts.actionFunc = function (iobj) {
                        console.log(iobj);
                        MdaPopWin.popOff(2);
                        if (iobj.act === "selected") {
                            if (iobj.selectText === "隨機脈波") {
                                gr.gbcs.command({'act': preText + "RadiationOn", "paras": [255]});
                                return;

                            }
                            if (iobj.selectText === "停止") {
                                gr.gbcs.command({'act': preText + "RadiationOn", "paras": [251]});//stop
                                return;
                            }
                            strA = iobj.selectText.split(" ");
                            var str = strA[0].slice(0, strA[0].length - 2);
                            var pulseWidth = KvLib.strToFloat(str, 100);
                            var pw = Math.round(pulseWidth * 1000);
                            var str = strA[1].slice(0, strA[1].length - 1);
                            var duty = KvLib.strToFloat(str, 5);
                            var pri = Math.round(pw * 100 / duty);
                            gr.gbcs.command({'act': preText + "RadiationOn", "paras": [selectNo[iobj.selectInx]]});
                            return;


                        }

                    };
                    var len = Math.round(opts.kvTexts.length / 2) + 1;
                    opts.h = len * 50;
                    opts.margin = 4;
                    opts.ym = 4;
                    opts.eh = 30;
                    opts.exm = 20;
                    opts.eym = 4;
                    box.selectBox(opts);
                    return;

                }
                return;
            }



            if (savePara_f) {
                var fileName = "paraSet";
                var content = JSON.stringify(gr.paraSet);
                sv.saveStringToFile("responseDialogError", null, fileName, content);
                return;
            }


            iobj.sender = md;
            iobj.keyId = md.name + iobj.kvObj.name;
            KvLib.exe(op.actionFunc, iobj);
        };
        //======================================    
        var cname = "c";
        var opts = {};
        md.setPns(opts);
        layouts[cname] = {name: cname, type: "Layout~Ly_base~array.sys0", opts: opts};
        lyMaps["body"] = cname;
        //======================================    
        var opts = {};
        md.setPns(opts);
        blocks[cname] = {name: "basePanel", type: "Component~Cp_base~plate.sys0", opts: opts};
        //======================================    
        var cname = lyMaps["body"] + "~" + 0;
        var opts = {};
        opts.margin = 6;
        opts.xm = 10;
        opts.ym = 8;
        opts.yArr = [45, 90, 90, 0, 9999];
        opts.xyArr = [
            [9999],
            ["0.5rw", 9999],
            ["0.33rw", "0.33rw", 9999],
            ["0.1rw", 9999],
            [9999]
        ];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["mainBody"] = cname;
        //===================================
        var lyInx = 0;
        var cname = lyMaps["mainBody"] + "~" + lyInx++;
        var opts = {};
        opts.innerText = op.title;
        blocks[cname] = {name: "basePanel", type: "Component~Cp_base~label.title", opts: opts};
        //==============================
        var preText = "mast";
        for (var i = 0; i < 7; i++) {
            var cname = lyMaps["mainBody"] + "~" + lyInx++;
            var opts = {};
            opts.setOptss = [];
            if (i === 0) {
                opts.title = "系統狀態";
                var setOpts = opts.setOpts = sopt.getOptsPara("led");
                var watchDatas = setOpts.watchDatas = [];
                var regName = "self.fatherMd.fatherMd.fatherMd.stas.radarStatus";
                watchDatas.push(["directReg", regName + "#0", "backgroundInx", 1]);
            }
            if (i === 1) {
                opts.title = "主發射機脈波信號";
                var setOpts = opts.setOpts = sopt.getOptsPara("led");
                var watchDatas = setOpts.watchDatas = [];
                var regName = "self.fatherMd.fatherMd.fatherMd.stas.radarStatus";
                watchDatas.push(["directReg", regName + "#1", "backgroundInx", 1]);
            }
            if (i === 2) {
                var setOpts = opts.setOpts = sopt.getOptsPara("buttonSelect");
                var para = sopt.getParaSetOpts({paraSetName: "mastToSub1CommType", titleWidth: 0, titleFontSize: "0.5rh"});
                opts.title = "主控與副控1連線方式";
                setOpts.enum = para.enum;
                setOpts.value = para.value;
                setOpts.id = "mastToSub1CommType";
            }
            if (i === 3) {
                var setOpts = opts.setOpts = sopt.getOptsPara("buttonSelect");
                var para = sopt.getParaSetOpts({paraSetName: "mastToSub2CommType", titleWidth: 0, titleFontSize: "0.5rh"});
                opts.title = "主控與副控2連線方式";
                setOpts.enum = para.enum;
                setOpts.value = para.value;
                setOpts.id = "mastToSub2CommType";
            }
            if (i === 4) {
                var setOpts = opts.setOpts = sopt.getOptsPara("buttonSelect");
                var para = sopt.getParaSetOpts({paraSetName: "mastPulseSource", titleWidth: 0, titleFontSize: "0.5rh"});
                opts.title = "脈波來源";
                setOpts.enum = ["SP", "本機"];
                setOpts.value = para.value;
                setOpts.id = "mastPulseSource";
            }

            if (i === 5) {
                continue;
                var regName = "self.fatherMd.stas.radarStatus#2";
                Block.setInputWatch(opts, "directReg", regName, "backgroundInx", 1);
                blocks[cname] = {name: "startLed", type: "Component~Cp_base~icons.led", opts: opts};
                continue;
                //===
            }

            if (i === 6) {
                continue;

                var setOpts = opts.setOpts = sopt.getOptsPara("buttonActs");
                setOpts.titleWidth = 0;
                setOpts.enum = ["脈波啟動", "脈波停止"];
                setOpts.enumId = ["pulseStart", "pulseStop"];
                setOpts.value = para.value;
                setOpts.baseColor = "#ccc";
                setOpts.borderWidth = 0;
                setOpts.fontSize = "0.6rh";
                opts.actionFunc = actionPrg;
                blocks[cname] = {name: "control", type: "Model~MdaSetLine~base.sys0", opts: opts};
                continue;

            }

            setOpts.titleWidth = 0;
            setOpts.baseColor = "#002";
            setOpts.borderWidth = 0;
            opts.setOptss.push(setOpts);
            opts.actionFunc = actionPrg;
            blocks[cname] = {name: "positionPanel", type: "Model~MdaSetGroup~base.sys0", opts: opts};
        }




        /*
         for (var i = 0; i < 4; i++) {
         var cname = lyMaps["mainBody"] + "~" + lyInx++;
         var opts = {};
         opts.fontSize = "0.5rh";
         opts.innerText = "";
         var watchReg = "self.fatherMd.stas.radarStatusText[" + i + "]";
         md.setInputWatch(opts, "directName", watchReg, "innerText", 1);
         var watchReg = "self.fatherMd.stas.radarStatusColor[" + i + "]";
         md.setInputWatch(opts, "directName", watchReg, "baseColor", 1);
         blocks[cname] = {name: "statusLabel#0", type: "Component~Cp_base~label.led", opts: opts};
         }
         */
        //==============================
        /*
         var cname = lyMaps["mainBody"] + "~" + lyInx++;
         var opts = {};
         opts.backgroundInx = 0;
         var watchReg = "self.fatherMd.stas.radarStatusColor[" + 4 + "]";
         md.setInputWatch(opts, "directName", watchReg, "backgroundInx", 1);
         blocks[cname] = {name: "startLed", type: "Component~Cp_base~icons.led", opts: opts};
         //===
         var cname = lyMaps["mainBody"] + "~" + lyInx++;
         var opts = {};
         opts.innerText = "脈波啟動";
         opts.baseColor = "#ccf";
         opts.actionFunc = function (iobj) {
         console.log(iobj);
         iobj.sender = md;
         iobj.keyId = md.name + "PulseStart";
         KvLib.exe(op.actionFunc, iobj);
         };
         blocks[cname] = {name: "pulseStartButton", type: "Component~Cp_base~button.sys0", opts: opts};
         //===
         var cname = lyMaps["mainBody"] + "~" + lyInx++;
         var opts = {};
         opts.innerText = "脈波停止";
         opts.baseColor = "#ccf";
         opts.actionFunc = function (iobj) {
         console.log(iobj);
         iobj.sender = md;
         iobj.keyId = md.name + "PulseStop";
         KvLib.exe(op.actionFunc, iobj);
         };
         blocks[cname] = {name: "pulseStopButton", type: "Component~Cp_base~button.sys0", opts: opts};
         //==============================
         var cname = lyMaps["mainBody"] + "~" + lyInx++;
         var opts = {};
         opts.innerText = "設定";
         opts.baseColor = "#ccf";
         opts.actionFunc = function (iobj) {
         console.log(iobj);
         iobj.sender = md;
         iobj.keyId = md.name + "SetButton";
         KvLib.exe(op.actionFunc, iobj);
         };
         blocks[cname] = {name: "setButton", type: "Component~Cp_base~button.sys0", opts: opts};
         */

        //==============================
        var cname = lyMaps["mainBody"] + "~" + lyInx++;
        var opts = {};
        opts.xm = 10;
        opts.yArr = [9999, 40];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["rightDownBody"] = cname;
        //===================================
        var cname = lyMaps["rightDownBody"] + "~" + 0;
        var opts = {};
        opts.readOnly_f = 1;
        blocks[cname] = {name: "editor", type: "Component~Cp_base~editor.sys0", opts: opts};
        //==
        var cname = lyMaps["rightDownBody"] + "~" + 1;
        var opts = {};
        opts.buttons = ['<i class="gf">&#xe316;</i>', '<i class="gf">&#xe313;</i>', "CLR"];
        opts.buttonAmt = 3;
        opts.buttonIds = ["upPage", "downPage", "clear"];
        //opts.layoutType = "collum";
        opts.margin = 4;
        opts.fontSize = "0.8rh";
        opts.xm = 4;
        opts.ym = 10;
        opts.iw = 100;
        opts.baseColor = "#444";
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            if (iobj.buttonId === "upPage") {
                var kvObj = md.blockRefs["editor"];
                KvLib.lineMoveEditor(kvObj, -8);
                return;
            }
            if (iobj.buttonId === "downPage") {
                var kvObj = md.blockRefs["editor"];
                KvLib.lineMoveEditor(kvObj, 8);
                return;
            }

            if (iobj.buttonId === "clear") {
                var kvObj = md.blockRefs["editor"];
                var editor = kvObj.objs["editor"];
                KvLib.clearEditorMaker(editor);
                editor.getSession().setValue("");
                return;
            }
        };
        blocks[cname] = {name: "headButtons", type: "Model~MdaButtons~base.sys0", opts: opts};




        //==============================
    }
}
class DummyTargetSub {
    constructor() {
        this.subRxFromCtrCnt = 0;
        this.subRxFromCtrTime = 0;
        this.subRxFromCtr_f = 0;
        var rd = gr.radarData;


        gr.hideWavePageElem = null;
        gr.socketRetPrgTbl["tick"] = function (radarData) {
            //console.log("radarData");
            var keys = Object.keys(radarData);
            for (var i = 0; i < keys.length; i++) {
                var strA = keys[i].split("#");
                if (strA.length === 1) {
                    gr.radarData[keys[i]] = radarData[keys[i]];
                    continue;
                }
                if (strA.length === 2) {
                    var inx0 = KvLib.toInt(strA[1], 0);
                    gr.radarData[strA[0]][inx0] = radarData[keys[i]];
                    continue;
                }
            }
            if (gr.viewDatas_f) {
                for (var i = 0; i < 64; i++) {
                    gr.viewDatas[i] = KvLib.trsIntToHexStrFix(gr.radarData.viewDatas[i]);
                }
            }

            if (rd.pulseFormAddBufA0) {
                if (gr.scope) {
                    if (gr.scope.opts.signalMode === 2 && gr.scope.opts.signalModeInx === 0) {
                        var len = rd.pulseFormAddBufA0.length;
                        if (rd.pulseFormAddBufA0.length) {
                            var values = [];
                            for (var i = 0; i < len; i++) {
                                var vv = rd.pulseFormAddBufA0[i];
                                var hf = vv & 1;
                                var tt = ((vv >> 1) * 6.25) | 0;
                                values.push(tt * 2 + hf);
                            }
                            gr.scope.mdClass.addBuf(0, values);
                        }
                    }
                }
            }
            rd.pulseFormAddBufA0 = null;


            if (gr.scope) {
                if (gr.scope.opts.signalMode === 3 && gr.scope.opts.signalModeInx === 0) {
                    if (gr.radarData.meterValueA) {
                        for (var i = 0; i < 4; i++) {
                            var values = [];
                            if (i === 0)
                                var vv = gr.radarData.meterValueA[2];
                            if (i === 1)
                                var vv = gr.radarData.meterValueA[3];
                            if (i === 2)
                                var vv = gr.radarData.meterValueA[4];
                            if (i === 3)
                                var vv = gr.radarData.meterValueA[5];
                            if (!vv)
                                vv = 0;
                            values.push(vv);
                            gr.scope.mdClass.addBuf(i, values);
                        }
                    }
                }
            }


            if (rd.pulseFormInf) {
                var plow = rd.pulseFormInf[0];
                var phigh = rd.pulseFormInf[1];
                var freq = rd.pulseFormInf[2];
                if (plow & phigh) {
                    var duty = phigh * 100 / (plow + phigh);
                    phigh = (phigh / 160).toFixed(1);
                    duty = duty.toFixed(1);
                    freq = ((freq + 290) / 100).toFixed(2);
                    gr.footBarMessageText = "Width:" + phigh + " us, Duty:" + duty + "%, Freq:" + freq + " GHz";
                    if ((gr.radarData.systemStatus0 >> 25) & 1)
                        gr.footBarMessageColor = "#f00";
                    else
                        gr.footBarMessageColor = "#00f";
                    gr.footBarMessageTime = 20;
                }
            }

            if (gr.degug_f)
                console.log("radarData");


        };

    }
    static globleTime() {
        gr.radarData.connectTime++;
        if (gr.radarData.connectTime >= 6) {
            gr.radarData.connectTime = 0;
            gr.radarData.connectCnt++;
        }
    }
    initOpts(md) {
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

        if (gr.radarData.conRxA) {

            var str = "W";
            str += gr.webSocketConnectCnt & 7;
            str += "U";
            str += gr.radarData.conRxA[24] & 7;
            str += gr.radarData.conRxA[25] & 7;
            str += "P";
            str += gr.radarData.conRxA[16] & 7;//syncRfPack
            str += gr.radarData.conRxA[17] & 7;//syncFiberPack
            str += gr.radarData.conRxA[18] & 7;//pulseFormData
            gr.footBarStatus0 = str;



            var str = "MST:";
            str += gr.radarData.conRxA[0] & 7;
            str += gr.radarData.conRxA[2] & 7;
            str += " CTR:";
            str += gr.radarData.conRxA[4] & 7;
            str += gr.radarData.conRxA[5] & 7;
            str += gr.radarData.conRxA[7] & 7;
            gr.footBarStatus1 = str;


            if (gr.radarData.conRxA[7] !== self.subRxFromCtrCnt) {
                self.subRxFromCtrCnt = gr.radarData.conRxA[7];
                self.subRxFromCtrTime = 0;
                self.subRxFromCtr_f = 1;
            }
            self.subRxFromCtrTime++;
            if (self.subRxFromCtrTime > 100)
                self.subRxFromCtr_f = 0;

            //gr.footBarStatus2 = str;


        }



        return;


    }

    actionFunc(iobj) {
        console.log(iobj);
        if (iobj.act === "mouseClick") {

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
        var opts = {};
        opts.innerText = "副控發射機 " + (gr.paraSet.subNumber + 1) + " 同步控制器";
        blocks[cname] = {name: "basePanel", type: "Component~Cp_base~label.title", opts: opts};
        //==============================
        var cname = lyMaps["mainBody"] + "~" + 1;
        var opts = {};
        opts.buttons = ["自測", "佈署", "同步", "波形", "通話", "設定"];
        opts.buttonIds = ["selfTest", "location", "sync", "wave", "call", "setting"];

        opts.actionFunc = function (iobj) {
            console.log(iobj);
            if (iobj.buttonId === "location") {
                var opts = {};
                opts.actionFunc = function (iobj) {
                    console.log(iobj);
                    if (iobj.act === "esc")
                        MdaPopWin.popOff(2);
                };
                var kvObj = new Block("location", "Model~LocationTarget~base.sys0", opts);
                var mesObj = mda.popObj(0, 0, kvObj);
                return;
            }
            if (iobj.buttonId === "selfTest") {
                var opts = {};
                opts.actionFunc = function (iobj) {
                    console.log(iobj);
                    if (iobj.act === "mouseClick") {
                        if (iobj.kvObj.opts.itemId === "esc")
                            MdaPopWin.popOff(2);
                    }
                };
                var kvObj = new Block("selfTest", "Model~SelfTest~base.sys0", opts);
                var mesObj = mda.popObj(0, 0, kvObj);
                return;
            }
            if (iobj.buttonId === "sync") {
                var opts = {};
                opts.actionFunc = function (iobj) {
                    console.log(iobj);
                    if (iobj.act === "esc")
                        MdaPopWin.popOff(2);
                };
                var kvObj = new Block("syncTest", "Model~SyncTest~base.sys0", opts);
                var mesObj = mda.popObj(0, 0, kvObj);
                return;
            }

            if (iobj.buttonId === "wave") {
                var opts = {};
                opts.actionFunc = function (iobj) {
                    console.log(iobj);
                    if (iobj.act === "esc") {
                        var kvObj = iobj.sender;
                        if (!kvObj.opts.signalMode) {
                            gr.hideWavePageElem = null;
                            gr.wavePageObj = null;
                            MdaPopWin.popOffTo(kvObj.opts.popStackCnt);
                            return;
                        }
                        var basePanel = kvObj.fatherMd.blockRefs["basePanel#" + kvObj.opts.popStackCnt];
                        var elem = basePanel.elems["base"];
                        elem.style.visibility = "hidden";
                        gr.hideWavePageElem = elem;
                        gr.wavePageObj = kvObj;
                        return;
                    }
                };
                if (gr.hideWavePageElem) {
                    gr.hideWavePageElem.style.visibility = "visible";
                    return;
                }
                var kvObj = new Block("scope", "Model~MyNewScope~base.sys0", opts);
                opts.kvObj = kvObj;
                gr.scope = kvObj;

                kvObj.opts.popStackCnt = gr.mdSystem.mdClass.stackCnt;
                MdaPopWin.popObj(opts);
                return;
            }


            if (iobj.buttonId === "setting") {
                DummyTargetMaster.paraSetPrg();
                return;
                var opts = {};
                opts.title = "輸入密碼";
                opts.setOpts = sopt.getIntPassword({});
                opts.actionFunc = function (iobj) {

                    var yes_f = 0;
                    if (iobj.inputText === "16020039") {
                        yes_f = 1;
                    }
                    if (iobj.inputText === gr.paraSet.paraSetPassword) {
                        yes_f = 1;
                    }
                    yes_f = 1;
                    if (!yes_f) {
                        console.log(iobj);
                        var opts = {};
                        opts.kvTexts = ["密碼錯誤"];
                        box.errorBox(opts);
                        return;
                    }
                    MdaPopWin.popOff(2);
                    DummyTargetMaster.paraSetPrg();
                };
                box.intPadBox(opts);
            }

            if (iobj.buttonId === "call") {
                var opts = {};
                opts.actionFunc = function (iobj) {
                    console.log(iobj);
                    if (iobj.act === "esc")
                        MdaPopWin.popOff(2);
                };
                var kvObj = new Block("syncTest", "Model~MdbPhoneBox~base.sys0", opts);
                var mesObj = mda.popObj(0, 0, kvObj);
                return;
            }



        };
        opts.buttonAmt = 6;
        blocks[cname] = {name: "headButtons", type: "Model~MdaButtons~base.sys0", opts: opts};
        //==============================
        var cname = lyMaps["mainBody"] + "~" + 3;
        mac.setFootBar(md, cname);




        var cname = lyMaps["mainBody"] + "~" + 2;
        var opts = {};
        opts.xArr = [0, 9999];
        opts.xm = 0;
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["downBody"] = cname;
        //==============================
        var cname = lyMaps["downBody"] + "~" + 0;
        var opts = {};
        opts.yc = 2;
        opts.ym = 10;
        opts.margin = 0;
        layouts[cname] = {name: cname, type: "Layout~Ly_base~array.sys0", opts: opts};
        lyMaps["leftBody"] = cname;
        //==============================
        //==============================
        //==============================
        var cname = lyMaps["downBody"] + "~" + 1;
        var opts = {};
        opts.title = "";
        opts.actionFunc = self.actionFunc;
        opts.baseColor = "#222";
        blocks[cname] = {name: "sub1RadarPane", type: "Model~SubRadarPane~base.sys0", opts: opts};
        //==============================



    }
}
class SubRadarPane {
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);
        this.subTypeOpts(opts);
        opts.title = "title";
        opts.buttonColor = "#ccf";
        opts.buttons = ["button1", "button2", "button3"];
        opts.layoutType = "row"; //row,collum,array
        opts.buttonIds = [];
        opts.iw = 9999;
        opts.ih = 9999;
        opts.borderWidth = 1;
        opts.xm = 30;
        opts.baseColor = "#222";
        return opts;
    }
    subTypeOpts(opts) {
        if (this.md.subType === "base.sys0") {
        }
    }
    chkWatch() {
        var self = this;
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        var sh = 0;
        var wa = md.stas.ledStatusA = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        var wb = md.stas.buttonInxA = [-1, -1, -1, -1, -1, -1, 0, 0, 0, 0];
        var wc = md.stas.buttonColorA = ["#888", "#888", "#888", "#888"];
        var rd = gr.radarData;
        if(rd.webReturnCmd){
            if(rd.webReturnCmd!==0){
                var cmd=rd.webReturnCmd;
                var para=rd.webReturnCmdPara&255;
                
                if(cmd===0x2020){
                    gr.gbcs.command({'act': "sub1SetFlags","index": para});
                }
                if(cmd===0x2021){
                    var cmdTbl=[];
                    cmdTbl.push("sub1SspaPowerOff");
                    cmdTbl.push("sub1SspaPowerOn");
                    cmdTbl.push("sub1SspaModuleOff");
                    cmdTbl.push("sub1SspaModuleOn");
                    cmdTbl.push("remoteRadOff");
                    cmdTbl.push("remoteRadOn");
                    cmdTbl.push("sub1EmergencyOff");
                    cmdTbl.push("sub1EmergencyOn");
                    gr.gbcs.command({'act': cmdTbl[para&7],"index": -1});
                }
                
                 rd.webReturnCmd=0;
            }
        }
        
        
        var sta = (rd.systemStatus0 >> 0) & 3;
        if (sta === 1)
            wa[0] = 3;
        if (sta === 2)
            wa[0] = 1;
        if (sta === 3)
            wa[0] = 2;
        //==================
        if ((rd.systemStatus1 >> 0) & 3) {
            wa[1] = 1;
            if ((rd.systemStatus1 >> 24) & 1)
                wa[2] = 1;
        }

        var commType = gr.paraSet["sub1CommType"];
        wb[0] = commType;
        var pulseSource = gr.paraSet["sub1PulseSource"];
        wb[1] = pulseSource;

        if (md.fatherMd.mdClass.subRxFromCtr_f) {
            wa[3] = ((rd.systemStatus1 >> 7) & 1) + 1;
            wa[4] = ((rd.systemStatus1 >> 8) & 1) + 1;
            wa[5] = ((rd.systemStatus1 >> 9) & 1) + 1;
            wa[6] = 1;
            if ((rd.systemStatus1 >> 10) & 3)
                wa[6] = 2;
            wa[7] = ((rd.systemStatus1 >> 17) & 1) + 1;

            //===================================
            wb[2] = (rd.systemStatus1 >> 20) & 1;
            wb[3] = (rd.systemStatus1 >> 22) & 1;
            //===================================
            wc[0] = "#ccc";
            if ((rd.systemStatus0 >> 23) & 1)
                wc[0] = "#ffc";
            wc[1] = "#ccc";
            if ((rd.systemStatus0 >> 24) & 1)
                wc[1] = "#ffc";
            wc[2] = "#ccc";
            if ((rd.systemStatus0 >> 25) & 1)
                wc[2] = "#ffc";
            wc[3] = "#ccc";
            if ((rd.systemStatus0 >> 26) & 1)
                wc[3] = "#fcc";
            //===================================
        }






        mac.messageEditor(md);

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
        var actionPrg = function (iobj) {
            console.log(iobj);
            if (iobj.kvObj.name === "clrButton") {
                var kvObj = md.blockRefs["editor"];
                if (!kvObj)
                    return;
                var editor = kvObj.objs["editor"];
                KvLib.clearEditorMaker(editor);
                editor.getSession().setValue("");
                return;
            }

            iobj.sender = md;
            iobj.keyId = md.name + iobj.kvObj.name;
            KvLib.exe(op.actionFunc, iobj);
        };
        //======================================    
        var cname = "c";
        var opts = {};
        md.setPns(opts);
        layouts[cname] = {name: cname, type: "Layout~Ly_base~array.sys0", opts: opts};
        lyMaps["body"] = cname;
        //======================================    
        var opts = {};
        md.setPns(opts);
        blocks[cname] = {name: "basePanel", type: "Component~Cp_base~plate.sys0", opts: opts};
        //======================================    
        var cname = lyMaps["body"] + "~" + 0;
        var opts = {};
        opts.margin = 6;
        opts.xm = 10;
        opts.ym = 4;
        opts.yArr = [0, 85, 85, 85, 85, 9999];
        var rw1 = "0.33rw";
        var rw2 = "0.2rw";
        var rw3 = "0.25rw";
        opts.xyArr = [
            [9999],
            [rw1, rw1, rw1],
            [rw2, rw2, rw2, rw2, rw2],
            [rw3, rw3, rw3, rw3],
            [rw3, rw3, rw3, rw3],
            [9999]
        ];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["mainBody"] = cname;
        //===================================
        var lyInx = 0;
        //var opts = {};
        //opts.innerText = op.title;
        //blocks[cname] = {name: "basePanel", type: "Component~Cp_base~label.title", opts: opts};
        lyInx++;
        //==============================

        var preText = "sub1";
        var preText1 = "ctr1";
        var actionPrg = function (iobj) {
            console.log(iobj);
            if (iobj.setId === preText + "CommType") {
                mac.saveParaSet(iobj.setId, iobj.buttonInx);
                return;
            }
            if (iobj.setId === preText + "PulseSource") {
                if (gr.paraSet[iobj.setId] !== iobj.buttonInx)
                    mac.saveParaSet(iobj.setId, iobj.buttonInx);
                else {
                    if (iobj.buttonInx === 0)
                        return;
                    //gr.gbcs.command({'act': preText + "RadiationOnOff"});
                    var opts = {};
                    opts.title = iobj.buttonText;
                    opts.xc = 2;
                    opts.yc = 17;
                    opts.w = 1000;
                    opts.fontSize = "0.5rh";
                    opts.kvTexts = [];
                    var selectNo = [];

                    for (var i = 0; i < gr.paraSet.localPulseGenParas.length; i++) {
                        var strA = gr.paraSet.localPulseGenParas[i].split(" ");
                        if (strA[0] === "0")
                            continue;
                        var inx = KvLib.toInt(strA[1], 0);
                        var pw = gr.paraSet.localPulseWidthParas[inx];
                        var str = pw + "us ";
                        str += strA[2] + "% ";
                        str += strA[3] + "GHz ";
                        str += "X" + strA[4];
                        selectNo.push(i);
                        opts.kvTexts.push(str);
                    }
                    opts.kvTexts.push("隨機脈波");
                    opts.kvTexts.push("停止");
                    opts.actionFunc = function (iobj) {
                        console.log(iobj);
                        MdaPopWin.popOff(2);
                        if (iobj.act === "selected") {
                            if (iobj.selectText === "隨機脈波") {
                                gr.gbcs.command({'act': preText + "RadiationOn", "paras": [255]});
                                return;

                            }
                            if (iobj.selectText === "停止") {
                                gr.gbcs.command({'act': preText + "RadiationOn", "paras": [251]});//stop
                                return;
                            }
                            strA = iobj.selectText.split(" ");
                            var str = strA[0].slice(0, strA[0].length - 2);
                            var pulseWidth = KvLib.strToFloat(str, 100);
                            var pw = Math.round(pulseWidth * 1000);
                            var str = strA[1].slice(0, strA[1].length - 1);
                            var duty = KvLib.strToFloat(str, 5);
                            var pri = Math.round(pw * 100 / duty);
                            gr.gbcs.command({'act': preText + "RadiationOn", "paras": [selectNo[iobj.selectInx]]});
                            return;


                        }

                    };
                    var len = Math.round(opts.kvTexts.length / 2) + 1;
                    opts.h = len * 50;
                    opts.margin = 4;
                    opts.ym = 4;
                    opts.eh = 30;
                    opts.exm = 20;
                    opts.eym = 4;
                    box.selectBox(opts);
                    return;

                }
                return;
            }
            if (iobj.setId === preText + "TxLoad") {
                gr.gbcs.command({'act': preText + "TxLoad", "paras": [iobj.buttonInx]});
                return;
            }
            if (iobj.setId === preText + "BatShort") {
                //gr.gbcs.command({'act': preText + "SetFlags", "index": 15});//<<deb
                gr.gbcs.command({'act': preText + "BatShort", "paras": [iobj.buttonInx]});
                return;
            }
            if (iobj.buttonText) {
                if (iobj.buttonText === "緊急停止") {
                    gr.gbcs.command({'act': preText + "EmergencyOnOff"});
                    return;
                }
                if((gr.radarData.systemStatus0>>26)&1)
                    return;
                
                if (iobj.buttonText === "放大器電源") {
                    gr.gbcs.command({'act': preText + "AllSspaPowerOnOff"});
                    return;
                }
                if (iobj.buttonText === "放大器致能") {
                    gr.gbcs.command({'act': preText + "AllSspaModuleOnOff"});
                    return;
                }
                if (iobj.buttonText === "脈波輸出") {
                    gr.gbcs.command({'act': "remoteRadOnOff"});
                    return;
                }


            }
        };

        for (var i = 0; i < 16; i++) {
            var cname = lyMaps["mainBody"] + "~" + lyInx++;
            var opts = {};
            opts.setOptss = [];
            var regName = "self.fatherMd.fatherMd.fatherMd.stas.ledStatusA";
            var regName1 = "self.fatherMd.fatherMd.stas.buttonInxA";
            var regName2 = "self.fatherMd.fatherMd.fatherMd.stas.buttonColorA";
            var inx = 0;
            if (i === inx++) {
                opts.title = "系統狀態";
                var setOpts = opts.setOpts = sopt.getOptsPara("led");
                var watchDatas = setOpts.watchDatas = [];
                watchDatas.push(["directReg", regName + "#0", "backgroundInx", 1]);
                opts.setOptss.push(setOpts);
                blocks[cname] = {name: "positionPanel#" + i, type: "Model~MdaSetGroup~base.sys0", opts: opts};
                continue;
            }
            if (i === inx++) {
                opts.title = "連線狀態";
                var setOpts = opts.setOpts = sopt.getOptsPara("led");
                var watchDatas = setOpts.watchDatas = [];
                watchDatas.push(["directReg", regName + "#1", "backgroundInx", 1]);
                opts.setOptss.push(setOpts);
                blocks[cname] = {name: "positionPanel#" + i, type: "Model~MdaSetGroup~base.sys0", opts: opts};
                continue;
            }
            if (i === inx++) {
                var setOpts = opts.setOpts = sopt.getOptsPara("led");
                opts.title = "主發射機脈波信號";
                var setOpts = opts.setOpts = sopt.getOptsPara("led");
                var watchDatas = setOpts.watchDatas = [];
                watchDatas.push(["directReg", regName + "#2", "backgroundInx", 1]);
                opts.setOptss.push(setOpts);
                blocks[cname] = {name: "positionPanel#" + i, type: "Model~MdaSetGroup~base.sys0", opts: opts};
                continue;
            }
            if (i === inx++) {
                opts.title = "環控狀態";
                var setOpts = opts.setOpts = sopt.getOptsPara("led");
                var watchDatas = setOpts.watchDatas = [];
                watchDatas.push(["directReg", regName + "#3", "backgroundInx", 1]);
                opts.setOptss.push(setOpts);
                blocks[cname] = {name: "positionPanel#" + i, type: "Model~MdaSetGroup~base.sys0", opts: opts};
                continue;
            }
            if (i === inx++) {
                opts.title = "SSPA電源";
                var setOpts = opts.setOpts = sopt.getOptsPara("led");
                var watchDatas = setOpts.watchDatas = [];
                watchDatas.push(["directReg", regName + "#4", "backgroundInx", 1]);
                opts.setOptss.push(setOpts);
                blocks[cname] = {name: "positionPanel#" + i, type: "Model~MdaSetGroup~base.sys0", opts: opts};
                continue;
            }
            if (i === inx++) {
                opts.title = "SSPA狀態";
                var setOpts = opts.setOpts = sopt.getOptsPara("led");
                var watchDatas = setOpts.watchDatas = [];
                watchDatas.push(["directReg", regName + "#5", "backgroundInx", 1]);
                opts.setOptss.push(setOpts);
                blocks[cname] = {name: "positionPanel#" + i, type: "Model~MdaSetGroup~base.sys0", opts: opts};
                continue;
            }
            if (i === inx++) {
                opts.title = "脈波狀態";
                var setOpts = opts.setOpts = sopt.getOptsPara("led");
                var watchDatas = setOpts.watchDatas = [];
                watchDatas.push(["directReg", regName + "#6", "backgroundInx", 1]);
                opts.setOptss.push(setOpts);
                blocks[cname] = {name: "positionPanel#" + i, type: "Model~MdaSetGroup~base.sys0", opts: opts};
                continue;
            }
            if (i === inx++) {
                opts.title = "功率輸出狀態";
                var setOpts = opts.setOpts = sopt.getOptsPara("led");
                var watchDatas = setOpts.watchDatas = [];
                watchDatas.push(["directReg", regName + "#7", "backgroundInx", 1]);
                opts.setOptss.push(setOpts);
                blocks[cname] = {name: "positionPanel#" + i, type: "Model~MdaSetGroup~base.sys0", opts: opts};
                continue;
            }
            if (i === inx++) {
                var setOpts = opts.setOpts = sopt.getOptsPara("buttonSelect");
                var para = sopt.getParaSetOpts({paraSetName: "sub1CommType", titleWidth: 0, titleFontSize: "0.5rh"});
                opts.title = "連線方式";
                setOpts.enum = para.enum;
                setOpts.id = "sub1CommType";
                setOpts.value = para.value;
                var watchDatas = setOpts.watchDatas = [];
                watchDatas.push(["directReg", regName1 + "#0", "setOpts.value", 1]);
            }
            if (i === inx++) {
                var setOpts = opts.setOpts = sopt.getOptsPara("buttonSelect");
                var para = sopt.getParaSetOpts({paraSetName: "sub1PulseSource", titleWidth: 0, titleFontSize: "0.5rh"});
                opts.title = "脈波來源";
                setOpts.enum = ["遙控脈波", "本機脈波"];
                setOpts.id = "sub1PulseSource";
                setOpts.value = para.value;
                var watchDatas = setOpts.watchDatas = [];
                watchDatas.push(["directReg", regName1 + "#1", "setOpts.value", 1]);
                setOpts.actViewNone_f = 1;
            }
            if (i === inx++) {
                var setOpts = opts.setOpts = sopt.getOptsPara("buttonSelect");
                var para = sopt.getParaSetOpts({paraSetName: preText1 + "TxLoad", titleWidth: 0, titleFontSize: "0.5rh"});
                opts.title = "輸出裝置";
                setOpts.enum = para.enum;
                setOpts.enumColors = ["#eef", "#ffc"];
                setOpts.value = para.value;
                setOpts.id = preText + "TxLoad";
                var watchDatas = setOpts.watchDatas = [];
                watchDatas.push(["directReg", regName1 + "#2", "setOpts.value", 1]);
                setOpts.actViewNone_f = 1;
            }
            if (i === inx++) {
                var setOpts = opts.setOpts = sopt.getOptsPara("buttonSelect");
                var para = sopt.getParaSetOpts({paraSetName: preText1 + "BatShort", titleWidth: 0, titleFontSize: "0.5rh"});
                opts.title = "戰備短路";
                setOpts.enum = para.enum;
                setOpts.enumColors = ["#eef", "#ffc"];
                setOpts.value = para.value;
                setOpts.id = preText + "BatShort";
                var watchDatas = setOpts.watchDatas = [];
                watchDatas.push(["directReg", regName1 + "#3", "setOpts.value", 1]);
                setOpts.actViewNone_f = 1;
            }
            var regName = "self.fatherMd.fatherMd.fatherMd.stas.buttonColorA";
            if (i === inx++) {
                var setOpts = opts.setOpts = sopt.getOptsPara("button");
                opts.title = "放大器電源";
                setOpts.enum = ["放大器電源"];
                var watchDatas = setOpts.watchDatas = [];
                watchDatas.push(["directReg", regName2 + "#0", "baseColor", 1]);


            }
            if (i === inx++) {
                var setOpts = opts.setOpts = sopt.getOptsPara("button");
                opts.title = "放大器致能";
                setOpts.enum = ["放大器致能"];
                var watchDatas = setOpts.watchDatas = [];
                watchDatas.push(["directReg", regName2 + "#1", "baseColor", 1]);
            }
            if (i === inx++) {
                var setOpts = opts.setOpts = sopt.getOptsPara("button");
                opts.title = "脈波輸出";
                setOpts.enum = ["脈波輸出"];
                var watchDatas = setOpts.watchDatas = [];
                watchDatas.push(["directReg", regName2 + "#2", "baseColor", 1]);
            }
            if (i === inx++) {
                var setOpts = opts.setOpts = sopt.getOptsPara("button");
                opts.title = "緊急停止";
                setOpts.enum = ["緊急停止"];
                var watchDatas = setOpts.watchDatas = [];
                watchDatas.push(["directReg", regName2 + "#3", "baseColor", 1]);
            }

            setOpts.titleWidth = 0;
            setOpts.baseColor = "#002";
            setOpts.borderWidth = 0;
            opts.setOptss.push(setOpts);
            opts.actionFunc = actionPrg;
            blocks[cname] = {name: "positionPanel#" + i, type: "Model~MdaSetGroup~base.sys0", opts: opts};
        }


        //==============================================
        var cname = lyMaps["mainBody"] + "~" + lyInx++;
        var opts = {};
        opts.ym = 2;
        opts.xArr = [9999, 100];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["rightDownBody"] = cname;
        //===================================
        var cname = lyMaps["rightDownBody"] + "~" + 0;
        var opts = {};
        opts.readOnly_f = 1;
        blocks[cname] = {name: "editor", type: "Component~Cp_base~editor.sys0", opts: opts};
        //===================================
        var cname = lyMaps["rightDownBody"] + "~" + 1;

        var opts = {};
        opts.buttons = ["上一頁", "下一頁", "清除"];
        opts.buttonAmt = 4;
        opts.buttonIds = ["upPage", "downPage", "clear"];
        opts.layoutType = "collum";
        opts.fontSize = "0.5rh";
        opts.ih = 200;
        opts.baseColor = "#444";

        opts.actionFunc = function (iobj) {
            console.log(iobj);
            if (iobj.buttonId === "upPage") {
                var kvObj = md.blockRefs["editor"];
                KvLib.lineMoveEditor(kvObj, -8);
                return;
            }
            if (iobj.buttonId === "downPage") {
                var kvObj = md.blockRefs["editor"];
                KvLib.lineMoveEditor(kvObj, 8);
                return;
            }
            if (iobj.buttonId === "clear") {
                var kvObj = md.blockRefs["editor"];
                var editor = kvObj.objs["editor"];
                KvLib.clearEditorMaker(editor);
                editor.getSession().setValue("");
                return;
            }
        };
        blocks[cname] = {name: "headButtons", type: "Model~MdaButtons~base.sys0", opts: opts};
    }
}



class SubRadarPane1 {
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);
        this.subTypeOpts(opts);
        opts.title = "title";
        opts.buttonColor = "#ccf";
        opts.buttons = ["button1", "button2", "button3"];
        opts.layoutType = "row"; //row,collum,array
        opts.buttonIds = [];
        opts.iw = 9999;
        opts.ih = 9999;
        opts.borderWidth = 1;
        opts.xm = 30;
        opts.baseColor = "#222";
        return opts;
    }
    subTypeOpts(opts) {
        if (this.md.subType === "base.sys0") {
        }
    }
    chkWatch() {
        var self = this;
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        var wb = md.stas.ledStatusA = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        var wc = md.stas.buttonColorA = ["#888", "#888", "#888", "#888"];
        var preText = "ctr1";

        var sysStatus = gr.radarData.systemStatus0 & 3;
        wb[0] = 0;
        if (sysStatus === 1) {//system warn up
            if (gr.flash_f)
                wb[0] = 0;
            else
                wb[0] = 1;
        }
        if (sysStatus === 2)//system ready
            wb[0] = 1;
        if (sysStatus === 3)//system error
            wb[0] = 2;
        //=====================================
        var preRfIn = (gr.radarData.systemStatus0 >> 22) & 1;
        wb[1] = preRfIn;
        //=====================================
        var enviErr = (gr.radarData.systemStatus1 >> 7) & 1;
        var powerErr = (gr.radarData.systemStatus1 >> 8) & 1;
        var moduleErr = (gr.radarData.systemStatus1 >> 9) & 1;
        var pulseWidthErr = (gr.radarData.systemStatus1 >> 10) & 1;
        var pulseDutyErr = (gr.radarData.systemStatus1 >> 11) & 1;
        var sspaPowerStatusA = gr.radarData.sspaPowerStatusAA;
        var sspaModuleStatusA = gr.radarData.sspaModuleStatusAA;
        var powerOn_f = 0;
        for (var i = 0; i < 36; i++) {
            if ((sspaPowerStatusA[i] >> 4) & 1)
                powerOn_f = 1;
        }
        var moduleOn_f = 0;
        for (var i = 0; i < 36; i++) {
            if ((sspaModuleStatusA[i] >> 1) & 1)
                moduleOn_f = 1;
        }
        moduleOn_f = (gr.radarData.systemStatus0 >> 24) & 1;

        var pulseErr = pulseWidthErr | pulseDutyErr;
        wb[2] = enviErr + 1;//envi status
        wb[3] = powerErr + 1;//power status
        wb[4] = moduleErr + 1;//sspa status
        wb[5] = pulseErr + 1;
        if (sysStatus <= 1) {
            wb[2] = 0;
            wb[3] = 0;
            wb[4] = 0;
            wb[5] = 0;
        }

        //=====================================
        if (powerOn_f)
            wc[0] = "#ffc";
        //
        if (moduleOn_f)
            wc[1] = "#ffc";
        //
        var radiationOn = (gr.radarData.systemStatus0 >> 25) & 1;
        if (radiationOn)
            wc[2] = "#ffc";
        //=====
        var emergencyOn = (gr.radarData.systemStatus0 >> 26) & 1;
        if (emergencyOn)
            wc[3] = "#fcc";

        mac.messageEditor(md);
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
        var actionPrg = function (iobj) {
            console.log(iobj);
            if (iobj.kvObj.name === "clrButton") {
                var kvObj = md.blockRefs["editor"];
                if (!kvObj)
                    return;
                var editor = kvObj.objs["editor"];
                KvLib.clearEditorMaker(editor);
                editor.getSession().setValue("");
                return;
            }

            iobj.sender = md;
            iobj.keyId = md.name + iobj.kvObj.name;
            KvLib.exe(op.actionFunc, iobj);
        };
        //======================================    
        var cname = "c";
        var opts = {};
        md.setPns(opts);
        layouts[cname] = {name: cname, type: "Layout~Ly_base~array.sys0", opts: opts};
        lyMaps["body"] = cname;
        //======================================    
        var opts = {};
        md.setPns(opts);
        blocks[cname] = {name: "basePanel", type: "Component~Cp_base~plate.sys0", opts: opts};
        //======================================    
        var cname = lyMaps["body"] + "~" + 0;
        var opts = {};
        opts.margin = 6;
        opts.xm = 10;
        opts.ym = 4;
        opts.yArr = [0, 120, 90, 100, 100, 9999, 20];
        var rw0 = (1 / 6).toFixed(3) + "rw";
        var rw1 = (1 / 4).toFixed(3) + "rw";
        var rw2 = (1 / 3).toFixed(3) + "rw";
        var rw3 = (1 / 5).toFixed(3) + "rw";
        opts.xyArr = [
            [9999],
            [rw1, rw1, rw1, rw1],
            [rw0, rw0, rw0, rw0, rw0, rw0],
            [rw1, rw1, rw1, rw1],
            [rw1, rw1, rw1, rw1],
            [9999, 140],
            [9999],
            ["0.1rw", 9999],
            [9999]
        ];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["mainBody"] = cname;
        //===================================
        var lyInx = 0;
        //var opts = {};
        //opts.innerText = op.title;
        //blocks[cname] = {name: "basePanel", type: "Component~Cp_base~label.title", opts: opts};
        lyInx++;
        //==============================

        var actionPrg = function (iobj) {
            console.log(iobj);
            var preText = "ctr1";
            if (iobj.act === "actButtonClick") {
                var inx = KvLib.toInt(iobj.sender.name.split('#')[1], -1);
                if (inx === 16) {
                    var opts = {};
                    opts.title = iobj.buttonText;
                    opts.xc = 2;
                    opts.yc = 17;
                    opts.w = 1000;
                    opts.fontSize = "0.5rh";
                    opts.kvTexts = [];
                    var selectNo = [];

                    for (var i = 0; i < gr.paraSet.localPulseGenParas.length; i++) {
                        var strA = gr.paraSet.localPulseGenParas[i].split(" ");
                        if (strA[0] === "0")
                            continue;
                        var str = strA[1] + "us ";
                        str += strA[2] + "% ";
                        str += strA[3] + "GHz ";
                        str += "X" + strA[4];
                        selectNo.push(i);
                        opts.kvTexts.push(str);
                    }
                    opts.kvTexts.push("隨機脈波");
                    opts.kvTexts.push("停止");
                    opts.actionFunc = function (iobj) {
                        console.log(iobj);
                        MdaPopWin.popOff(2);
                        if (iobj.act === "selected") {
                            if (iobj.selectText === "隨機脈波") {
                                gr.gbcs.command({'act': preText + "RadiationOn", "paras": [255]});
                                return;

                            }
                            if (iobj.selectText === "停止") {
                                gr.gbcs.command({'act': preText + "RadiationOn", "paras": [251]});//stop
                                return;
                            }
                            strA = iobj.selectText.split(" ");
                            var str = strA[0].slice(0, strA[0].length - 2);
                            var pulseWidth = KvLib.strToFloat(str, 100);
                            var pw = Math.round(pulseWidth * 1000);
                            var str = strA[1].slice(0, strA[1].length - 1);
                            var duty = KvLib.strToFloat(str, 5);
                            var pri = Math.round(pw * 100 / duty);
                            gr.gbcs.command({'act': preText + "RadiationOn", "paras": [selectNo[iobj.selectInx]]});
                            return;


                        }

                    };
                    var len = Math.round(opts.kvTexts.length / 2) + 1;
                    opts.h = len * 50;

                    opts.margin = 4;
                    opts.ym = 4;
                    opts.eh = 30;
                    opts.exm = 20;
                    opts.eym = 4;


                    box.selectBox(opts);





                    return;
                }



                if (inx === 14) {
                    gr.gbcs.command({'act': preText + "AllSspaPowerOnOff"});
                    return;
                }
                if (inx === 15) {
                    gr.gbcs.command({'act': preText + "AllSspaModuleOnOff"});
                    return;
                }
                if (inx === 16) {
                    gr.gbcs.command({'act': preText + "RadiationOnOff"});
                    return;
                }
                if (inx === 17) {
                    gr.gbcs.command({'act': preText + "EmergencyOnOff"});
                    return;
                }
                return;
            }
            if (iobj.act === "mouseClick") {
                var inx = KvLib.toInt(iobj.sender.name.split('#')[1], -1);
                if (inx === 10) {
                    mac.saveParaSet(preText + "Remote", iobj.buttonInx);
                    return;
                }
                if (inx === 11) {
                    mac.saveParaSet(preText + "PulseSource", iobj.buttonInx);
                    return;
                }
                if (inx === 12) {
                    mac.saveParaSet(preText + "TxLoad", iobj.buttonInx);
                    return;
                }
                if (inx === 13) {
                    mac.saveParaSet(preText + "BatShort", iobj.buttonInx);
                    return;
                }
                return;
            }

        };

        var preText = "ctr1";
        for (var i = 0; i < 18; i++) {
            var cname = lyMaps["mainBody"] + "~" + lyInx++;
            var opts = {};
            opts.setOptss = [];
            var inx = 0;
            var regName = "gr.radarData.meterValueTextA";
            var regName1 = "gr.radarData.meterValueColorA";
            if (i === inx++) {
                opts.title = "輸入功率";
                var setOpts = opts.setOpts = sopt.getOptsPara("lcdView");
                setOpts.value = "";//
                var watchDatas = setOpts.watchDatas = [];
                watchDatas.push(["directReg", regName + "#0", "innerText", 1]);
                watchDatas.push(["directReg", regName1 + "#0", "innerTextColor", 1]);
            }
            if (i === inx++) {
                opts.title = "順向輸出功率";
                var setOpts = opts.setOpts = sopt.getOptsPara("lcdView");
                setOpts.value = "";//
                var watchDatas = setOpts.watchDatas = [];
                watchDatas.push(["directReg", regName + "#4", "innerText", 1]);
                watchDatas.push(["directReg", regName1 + "#4", "innerTextColor", 1]);
            }
            if (i === inx++) {
                opts.title = "反向輸出功率";
                var setOpts = opts.setOpts = sopt.getOptsPara("lcdView");
                setOpts.value = "";//
                var watchDatas = setOpts.watchDatas = [];
                watchDatas.push(["directReg", regName + "#5", "innerText", 1]);
                watchDatas.push(["directReg", regName1 + "#5", "innerTextColor", 1]);
            }
            if (i === inx++) {
                opts.title = "放大器電源總電流";
                var setOpts = opts.setOpts = sopt.getOptsPara("lcdView");
                setOpts.value = "";//
                var watchDatas = setOpts.watchDatas = [];
                watchDatas.push(["directReg", regName + "#9", "innerText", 1]);
                watchDatas.push(["directReg", regName1 + "#9", "innerTextColor", 1]);
            }
            var regName = "self.fatherMd.fatherMd.fatherMd.stas.ledStatusA";
            if (i === inx++) {
                opts.title = "系統狀態";
                var setOpts = opts.setOpts = sopt.getOptsPara("led");
                var watchDatas = setOpts.watchDatas = [];
                watchDatas.push(["directReg", regName + "#0", "backgroundInx", 1]);
                opts.setOptss.push(setOpts);
                blocks[cname] = {name: "positionPanel", type: "Model~MdaSetGroup~base.sys0", opts: opts};
                continue;
            }
            if (i === inx++) {
                opts.title = "脈波輸入狀態";
                var setOpts = opts.setOpts = sopt.getOptsPara("led");
                var watchDatas = setOpts.watchDatas = [];
                watchDatas.push(["directReg", regName + "#1", "backgroundInx", 1]);
                opts.setOptss.push(setOpts);
                blocks[cname] = {name: "positionPanel", type: "Model~MdaSetGroup~base.sys0", opts: opts};
                continue;
            }
            if (i === inx++) {
                opts.title = "環控狀態";
                var setOpts = opts.setOpts = sopt.getOptsPara("led");
                var watchDatas = setOpts.watchDatas = [];
                watchDatas.push(["directReg", regName + "#2", "backgroundInx", 1]);
                opts.setOptss.push(setOpts);
                blocks[cname] = {name: "positionPanel", type: "Model~MdaSetGroup~base.sys0", opts: opts};
                continue;
            }
            if (i === inx++) {
                opts.title = "SSPA電源";
                var setOpts = opts.setOpts = sopt.getOptsPara("led");
                var watchDatas = setOpts.watchDatas = [];
                watchDatas.push(["directReg", regName + "#3", "backgroundInx", 1]);
                opts.setOptss.push(setOpts);
                blocks[cname] = {name: "positionPanel", type: "Model~MdaSetGroup~base.sys0", opts: opts};
                continue;
            }
            if (i === inx++) {
                opts.title = "SSPA狀態";
                var setOpts = opts.setOpts = sopt.getOptsPara("led");
                var watchDatas = setOpts.watchDatas = [];
                watchDatas.push(["directReg", regName + "#4", "backgroundInx", 1]);
                opts.setOptss.push(setOpts);
                blocks[cname] = {name: "positionPanel", type: "Model~MdaSetGroup~base.sys0", opts: opts};
                continue;
            }
            if (i === inx++) {
                opts.title = "脈波狀態";
                var setOpts = opts.setOpts = sopt.getOptsPara("led");
                var watchDatas = setOpts.watchDatas = [];
                watchDatas.push(["directReg", regName + "#5", "backgroundInx", 1]);
                opts.setOptss.push(setOpts);
                blocks[cname] = {name: "positionPanel", type: "Model~MdaSetGroup~base.sys0", opts: opts};
                continue;
            }
            preText = "ctr1";

            if (i === inx++) {
                var setOpts = opts.setOpts = sopt.getOptsPara("buttonSelect");
                var para = sopt.getParaSetOpts({paraSetName: preText + "Remote", titleWidth: 0, titleFontSize: "0.5rh"});
                opts.title = "遠端控制";
                setOpts.enum = para.enum;
                setOpts.value = para.value;
                setOpts.fontSize = "0.4rh";

            }

            if (i === inx++) {
                var setOpts = opts.setOpts = sopt.getOptsPara("buttonSelect");
                var para = sopt.getParaSetOpts({paraSetName: preText + "PulseSource", titleWidth: 0, titleFontSize: "0.5rh"});
                opts.title = "脈波來源";
                setOpts.fontSize = "0.5rh";
                setOpts.enum = ["遙控脈波", "本機脈波"];
                setOpts.value = para.value;
                setOpts.fontSize = "0.4rh";
            }
            if (i === inx++) {
                var setOpts = opts.setOpts = sopt.getOptsPara("buttonSelect");
                var para = sopt.getParaSetOpts({paraSetName: preText + "TxLoad", titleWidth: 0, titleFontSize: "0.5rh"});
                opts.title = "輸出裝置";
                setOpts.enum = para.enum;
                setOpts.enumColors = ["#eef", "#ffc"];
                setOpts.value = para.value;
                setOpts.fontSize = "0.4rh";
            }
            if (i === inx++) {
                var setOpts = opts.setOpts = sopt.getOptsPara("buttonSelect");
                var para = sopt.getParaSetOpts({paraSetName: preText + "BatShort", titleWidth: 0, titleFontSize: "0.5rh"});
                opts.title = "戰備短路";
                setOpts.enum = para.enum;
                setOpts.enumColors = ["#eef", "#ffc"];
                setOpts.value = para.value;
                setOpts.fontSize = "0.4rh";
            }
            var regName = "self.fatherMd.fatherMd.fatherMd.stas.buttonColorA";
            if (i === inx++) {
                var setOpts = opts.setOpts = sopt.getOptsPara("button");
                opts.title = "放大器電源";
                setOpts.enum = ["放大器電源"];
                var watchDatas = setOpts.watchDatas = [];
                watchDatas.push(["directReg", regName + "#0", "baseColor", 1]);
            }
            if (i === inx++) {
                var setOpts = opts.setOpts = sopt.getOptsPara("button");
                opts.title = "放大器致能";
                setOpts.enum = ["放大器致能"];
                var watchDatas = setOpts.watchDatas = [];
                watchDatas.push(["directReg", regName + "#1", "baseColor", 1]);
            }
            if (i === inx++) {
                var setOpts = opts.setOpts = sopt.getOptsPara("button");
                opts.title = "脈波輸出";
                setOpts.enum = ["脈波輸出"];
                var watchDatas = setOpts.watchDatas = [];
                watchDatas.push(["directReg", regName + "#2", "baseColor", 1]);
            }
            if (i === inx++) {
                var setOpts = opts.setOpts = sopt.getOptsPara("button");
                opts.title = "緊急停止";
                setOpts.enum = ["緊急停止"];
                var watchDatas = setOpts.watchDatas = [];
                watchDatas.push(["directReg", regName + "#3", "baseColor", 1]);
            }
            setOpts.titleWidth = 0;
            setOpts.baseColor = "#002";
            setOpts.borderWidth = 0;
            opts.setOptss.push(setOpts);
            opts.actionFunc = actionPrg;
            blocks[cname] = {name: "ctrElem#" + i, type: "Model~MdaSetGroup~base.sys0", opts: opts};
        }
        //==============================================
        var cname = lyMaps["mainBody"] + "~" + lyInx++;
        var opts = {};
        opts.readOnly_f = 1;
        blocks[cname] = {name: "editor", type: "Component~Cp_base~editor.sys0", opts: opts};
        //==============================================
        var cname = lyMaps["mainBody"] + "~" + lyInx++;

        var opts = {};
        opts.buttons = ["上一頁", "下一頁", "清除"];
        opts.buttonAmt = 4;
        opts.buttonIds = ["upPage", "downPage", "clear"];
        opts.layoutType = "collum";
        opts.fontSize = "0.5rh";
        opts.ih = 200;
        opts.baseColor = "#444";
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            if (iobj.buttonId === "upPage") {
                var kvObj = md.blockRefs["editor"];
                KvLib.lineMoveEditor(kvObj, -12);
                return;
            }
            if (iobj.buttonId === "downPage") {
                var kvObj = md.blockRefs["editor"];
                KvLib.lineMoveEditor(kvObj, 12);
                return;
            }
            if (iobj.buttonId === "clear") {
                var kvObj = md.blockRefs["editor"];
                var editor = kvObj.objs["editor"];
                KvLib.clearEditorMaker(editor);
                editor.getSession().setValue("");
                return;
            }
        };
        blocks[cname] = {name: "headButtons", type: "Model~MdaButtons~base.sys0", opts: opts};
        //==============================================
        var cname = lyMaps["mainBody"] + "~" + lyInx++;
        mac.setFootBar(md, cname);
        return;
    }
}


class LocationTarget {
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);
        opts.baseColor = "#000";
        return opts;
    }
    create() {
    }
    actionFunc(iobj) {
        console.log(iobj);
        if (iobj.act === "mouseClick") {
            if (iobj.keyId === "radarPaneSetButton") {
            }
        }

    }

    chkWatch() {
        var self = this;
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        var location = st.location = {};
        var gpsDatas = location.gpsDatas = [];
        for (var i = 0; i < 3; i++)
            gpsDatas.push(["---", "---", "---", "---", "---", "---", "---", "---", "---", "---", "---", "---", "---"]);

        var duTrans = function (iobj) {
            for (var i = 0; i < 8; i++) {
                if (iobj[i] === "---")
                    return null;
                if (iobj[i] === null)
                    return null;
            }
            var pos = [];
            var vv = iobj[0];
            vv += iobj[1] / 60;
            vv += iobj[2] / 3600;
            vv += iobj[3] / 360000;
            pos.push(vv);
            var vv = iobj[4];
            vv += iobj[5] / 60;
            vv += iobj[6] / 3600;
            vv += iobj[7] / 360000;
            pos.push(vv);
            pos.push(iobj[8]);
            return pos;
        };

        var angles = [0, 0, 0];
        var hides = [0, 0, 0];
        if (!gr.paraSet.locationFromSource) {
            var angles = [gr.paraSet.mastAttitude[1], gr.paraSet.sub1Attitude[1], gr.paraSet.sub2Attitude[1]];
            var latitudeA = gr.paraSet.mastLatitude;
            var longitudeA = gr.paraSet.mastLongitude;
            var attitudeA = gr.paraSet.mastAttitude;
            gpsDatas[0] = [
                latitudeA[0], latitudeA[1], latitudeA[2], latitudeA[3],
                longitudeA[0], longitudeA[1], longitudeA[2], longitudeA[3],
                attitudeA[0], attitudeA[1], "---", "---", "---"
            ];
            var latitudeA = gr.paraSet.sub1Latitude;
            var longitudeA = gr.paraSet.sub1Longitude;
            var attitudeA = gr.paraSet.sub1Attitude;
            gpsDatas[1] = [
                latitudeA[0], latitudeA[1], latitudeA[2], latitudeA[3],
                longitudeA[0], longitudeA[1], longitudeA[2], longitudeA[3],
                attitudeA[0], attitudeA[1], "---", "---", "---"
            ];
            var latitudeA = gr.paraSet.sub2Latitude;
            var longitudeA = gr.paraSet.sub2Longitude;
            var attitudeA = gr.paraSet.sub2Attitude;
            gpsDatas[2] = [
                latitudeA[0], latitudeA[1], latitudeA[2], latitudeA[3],
                longitudeA[0], longitudeA[1], longitudeA[2], longitudeA[3],
                attitudeA[0], attitudeA[1], "---", "---", "---"
            ];
        } else {
            for (var i = 0; i < 3; i++) {
                hides[i] = 1;
                if (!gr.radarData["gngga" + i]) {
                    continue;
                }
                var gngga = KvLib.bytes2String(gr.radarData["gngga" + i]);
                if (!gngga.length)
                    continue;
                var strA = gngga.split(",");
                if (strA[0] === "$GNGGA") {
                    var strB = strA[1].split(".");
                    var hour = KvLib.toInt(strB[0].substring(0, 2), 0) + 8;
                    var min = KvLib.toInt(strB[0].substring(2, 4), 0);
                    var sec = KvLib.toInt(strB[0].substring(4, 6), 0);
                    var strB = strA[2].split(".");
                    var nDegree = KvLib.toInt(strB[0].substring(0, 2), 0);
                    var nMin = KvLib.toInt(strB[0].substring(2, 4), 0);
                    var nMinRest = KvLib.toFloat("0." + strB[1], 0);
                    var nSec = (nMinRest * 60) | 0;
                    var nSecRest = nMinRest * 60 - nSec;
                    var nSecPercent = (nMinRest * 100) | 0;
                    var strB = strA[4].split(".");
                    var eDegree = KvLib.toInt(strB[0].substring(0, 3), 0);
                    var eMin = KvLib.toInt(strB[0].substring(3, 5), 0);
                    var eMinRest = KvLib.toFloat("0." + strB[1], 0);
                    var eSec = (eMinRest * 60) | 0;
                    var eSecRest = nMinRest * 60 - eSec;
                    var eSecPercent = (eMinRest * 100) | 0;
                    var posq = KvLib.toInt(strA[6], 0);
                    var satAmt = KvLib.toInt(strA[7], 0);
                    var height = KvLib.toFloat(strA[9], 0);
                    var posqTbl = ["未定位", "非差分定位", "差分定位", "---", "---", "---", "正在估算", "---", "---", "---"];
                    var posqStr = posqTbl[posq];
                    var ang = 0;
                    if (hour < 10)
                        hour = "0" + hour;
                    if (min < 10)
                        min = "0" + min;
                    if (sec < 10)
                        sec = "0" + sec;
                    var timeStr = "" + hour + ":" + min + ":" + sec;
                    gpsDatas[i] = [nDegree, nMin, nSec, nSecPercent, eDegree, eMin, eSec, eSecPercent, height, ang, posqStr, timeStr, satAmt];
                    hides[i] = 0;
                }
            }
        }
        st.mistRadarPos = duTrans(gpsDatas[0]);
        st.sub1RadarPos = duTrans(gpsDatas[1]);
        st.sub2RadarPos = duTrans(gpsDatas[2]);
        if (!st.mistRadarPos)
            hides[0] = 1;
        if (!st.sub1RadarPos)
            hides[1] = 1;
        if (!st.sub2RadarPos)
            hides[2] = 1;
        if (gr.paraSet.appId === 0) {
            if (hides[0]) {
                hides[1] = 1;
                hides[2] = 1;
            }
        }
        if (gr.paraSet.appId === 1) {
            if (gr.paraSet.subNumber === 0) {
                if (hides[0])
                    st.mistRadarPos = st.sub1RadarPos;
                if (hides[1]) {
                    hides[0] = 1;
                    hides[2] = 1;
                }
            }
            if (gr.paraSet.subNumber === 1) {
                if (hides[0])
                    st.mistRadarPos = st.sub2RadarPos;
                if (hides[1]) {
                    hides[0] = 1;
                    hides[1] = 1;
                }
            }

        }







        //===================================================================================
        var radarScanDatas = location.radarScanDatas = [];
        radarScanDatas.push(gr.paraSet.radarStartAngle);
        radarScanDatas.push(gr.paraSet.radarEndAngle);
        radarScanDatas.push(gr.paraSet.radarScanRpm);
        radarScanDatas.push(gr.paraSet.radarFadeTime);
        //===================================================================================
        var radarDirections = location.radarDirections = [null, null, null];
        var posOut = self.calPos(st.mistRadarPos, st.sub1RadarPos);
        st.posOutA = posOut;
        if (posOut) {
            var dir = (Math.pow(posOut[0] * posOut[0] + posOut[1] * posOut[1], 0.5)).toFixed(0);
            radarDirections[0] = dir;
            if (hides[0] || hides[1])
                radarDirections[0] = null;
        }
        var posOut = self.calPos(st.mistRadarPos, st.sub2RadarPos);
        st.posOutB = posOut;
        if (posOut) {
            var dir = (Math.pow(posOut[0] * posOut[0] + posOut[1] * posOut[1], 0.5)).toFixed(0);
            radarDirections[1] = dir;
            if (hides[0] || hides[2])
                radarDirections[1] = null;
        }
        var posOut = self.calPos(st.sub1RadarPos, st.sub2RadarPos);
        st.posOutC = posOut;
        if (posOut) {
            var dir = (Math.pow(posOut[0] * posOut[0] + posOut[1] * posOut[1], 0.5)).toFixed(0);
            radarDirections[2] = dir;
            if (hides[1] || hides[2])
                radarDirections[2] = null;
        }
        //===================================================================================
        var radarPositions = location.radarPositions = [];
        if (st.posOutA) {
            var pos0 = st.posOutA[0] | 0;
            var pos1 = st.posOutA[1] | 0;
        }
        if (st.posOutB) {
            var pos2 = st.posOutB[0] | 0;
            var pos3 = st.posOutB[1] | 0;
        }
        if (st.posOutC) {
            var pos4 = st.posOutC[0] | 0;
            var pos5 = st.posOutC[1] | 0;
        }
        var radarScreen = md.blockRefs["radarScreen"];
        var scale = radarScreen.opts.roomInTbl[radarScreen.opts.roomInInx];
        var sRate = radarScreen.stas.sRadius * 2 / radarScreen.stas.containerHeight;
        //======================
        var yRate = 0;
        var xRate = 0;
        if ((yRate * yRate + xRate * xRate) > 1)
            hides[0] = 1;
        var rateY = (sRate * yRate * 0.5 + 0.5);
        var rateX = (sRate * xRate * 0.5 + 0.5);
        var mastSym = [gr.paraSet.mastAttitude[1], rateX, rateY, hides[0]];
        //===============
        if (!st.posOutA) {
            pos0 = scale;
            pos1 = scale;
        }
        var yRate = pos0 / scale;
        var xRate = pos1 / scale;
        if ((yRate * yRate + xRate * xRate) > 1)
            hides[1] = 1;
        var rateY = (sRate * yRate * 0.5 + 0.5);
        var rateX = (sRate * xRate * 0.5 + 0.5);
        var sub1Sym = [gr.paraSet.sub1Attitude[1], rateX, rateY, hides[1]];
        //=====================================
        if (!st.posOutB) {
            pos2 = scale;
            pos3 = scale;
        }
        var yRate = pos2 / scale;
        var xRate = pos3 / scale;
        if ((yRate * yRate + xRate * xRate) > 1)
            hides[2] = 1;
        var rateY = (sRate * yRate * 0.5 + 0.5);
        var rateX = (sRate * xRate * 0.5 + 0.5);
        var sub2Sym = [gr.paraSet.sub2Attitude[1], rateX, rateY, hides[2]];

        var deltaX = 0;
        var deltaY = 0;
        if (gr.paraSet.appId === 1) {
            var deltaX = 0.5 - sub1Sym[1];
            var deltaY = 0.5 - sub1Sym[2];
            ;
            if (gr.paraSet.subNumber === 1) {
                var deltaX = 0.5 - sub2Sym[1];
                var deltaY = 0.5 - sub2Sym[2];
            }
        }
        mastSym[1] += deltaX;
        mastSym[2] += deltaY;
        sub1Sym[1] += deltaX;
        sub1Sym[2] += deltaY;
        sub2Sym[1] += deltaX;
        sub2Sym[2] += deltaY;

        if (mastSym[1] > 1 || mastSym[1] < 0)
            mastSym[3] = 1;
        if (mastSym[2] > 1 || mastSym[2] < 0)
            mastSym[3] = 1;
        if (sub1Sym[1] > 1 || sub1Sym[1] < 0)
            sub1Sym[3] = 1;
        if (sub1Sym[2] > 1 || sub1Sym[2] < 0)
            sub1Sym[3] = 1;
        if (sub2Sym[1] > 1 || sub2Sym[1] < 0)
            sub2Sym[3] = 1;
        if (sub2Sym[2] > 1 || sub2Sym[2] < 0)
            sub2Sym[3] = 1;





        var nowString = mastSym[0] + "~" + mastSym[1] + "~" + mastSym[2] + "~" + mastSym[3];
        if (radarScreen.opts.messages.mastRadar.preString !== nowString) {
            radarScreen.opts.messages.mastRadar.preString = nowString;
            radarScreen.opts.symbleEdit_f = 1;
            radarScreen.opts.messages.mastRadar.angle = mastSym[0];
            radarScreen.opts.messages.mastRadar.yr = 1 - mastSym[2];
            radarScreen.opts.messages.mastRadar.xr = mastSym[1];
            radarScreen.opts.messages.mastRadar.hide_f = mastSym[3];
        }
        //======================



        var nowString = sub1Sym[0] + "~" + sub1Sym[1] + "~" + sub1Sym[2] + "~" + sub1Sym[3];

        if (radarScreen.opts.messages.sub1Radar.preString !== nowString) {
            radarScreen.opts.messages.sub1Radar.preString = nowString;
            radarScreen.opts.symbleEdit_f = 1;
            radarScreen.opts.messages.sub1Radar.angle = sub1Sym[0];
            radarScreen.opts.messages.sub1Radar.yr = 1 - sub1Sym[2];
            radarScreen.opts.messages.sub1Radar.xr = sub1Sym[1];
            radarScreen.opts.messages.sub1Radar.hide_f = sub1Sym[3];
        }
        //======================
        var nowString = sub2Sym[0] + "~" + sub2Sym[1] + "~" + sub2Sym[2] + "~" + sub2Sym[3];
        if (radarScreen.opts.messages.sub2Radar.preString !== nowString) {
            radarScreen.opts.messages.sub2Radar.preString = nowString;
            radarScreen.opts.symbleEdit_f = 1;
            radarScreen.opts.messages.sub2Radar.angle = sub2Sym[0];
            radarScreen.opts.messages.sub2Radar.yr = 1 - sub2Sym[2];
            radarScreen.opts.messages.sub2Radar.xr = sub2Sym[1];
            radarScreen.opts.messages.sub2Radar.hide_f = sub2Sym[3];
        }







    }

    //out [x,y,z]
    calPos(gps0, gps1)
    {
        //////////////////////////////////////////////////////////
        //var gps0 = [24.0613733, 121.4508244, 0];
        //var gps1 = [25.0613733, 121.4508244, 0];
        if (!gps0)
            return null;
        if (!gps1)
            return null;

        var pos0 = [gps0[0] * Math.PI / 180, gps0[1] * Math.PI / 180, gps0[2]];
        var pos1 = [gps1[0] * Math.PI / 180, gps1[1] * Math.PI / 180, gps1[2]];
        var mid_lat = (pos0[0] + pos1[0]) / 2.0;
        var mid_h = (pos0[2] + pos1[2]) / 2.0;
        var a = 6378137.0;
        var b = 6356752.3142;
        var e2 = 1.0 - Math.pow((b / a), 2.0);
        var Rm = a * (1.0 - e2) / Math.pow((1.0 - e2 * Math.pow(Math.sin(mid_lat), 2.0)), 1.5);
        var Rn = a / Math.sqrt(1.0 - e2 * Math.pow(Math.sin(mid_lat), 2.0));
        var posOut = [];
        posOut.push(Math.round((pos1[0] - pos0[0]) * (Rm + mid_h)));
        posOut.push(Math.round((pos1[1] - pos0[1]) * (Rn + mid_h) * Math.cos(mid_lat)));
        posOut.push(Math.round(-1 * (pos0[2] - pos1[2])));


        return posOut;
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
        //================
        var opts = {};
        md.setPns(opts);
        blocks[cname] = {name: "basePanel", type: "Component~Cp_base~plate.none", opts: opts};
        //======================================    
        var cname = lyMaps["body"] + "~" + 0;
        var opts = {};
        opts.yArr = [50, 9999];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["mainBody"] = cname;
        //==============================
        var cname = lyMaps["mainBody"] + "~" + 0;
        var opts = {};
        opts.xArr = [9999, 150];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["titleBody"] = cname;
        //==============================
        var cname = lyMaps["titleBody"] + "~" + 0;
        var opts = {};
        opts.innerText = "發射機位置圖";
        opts.textAlign = "left";
        blocks[cname] = {name: "basePanel", type: "Component~Cp_base~label.title", opts: opts};
        var cname = lyMaps["titleBody"] + "~" + 1;
        var opts = {};
        opts.innerText = "離開";
        opts.baseColor = "#ccf";
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            iobj.act = "esc";
            KvLib.exe(op.actionFunc, iobj);
        };
        blocks[cname] = {name: "basePanel", type: "Component~Cp_base~button.sys0", opts: opts};
        //==========================
        var cname = lyMaps["mainBody"] + "~" + 1;
        var opts = {};
        opts.xArr = [530, 9999];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["centerBody"] = cname;
        //==============================
        var cname = lyMaps["centerBody"] + "~" + 0;
        var opts = {};
        opts.ym = 4;
        opts.yArr = ["0.1rh", "0.24rh", "0.24rh", "0.24rh", "0.18rh"];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["leftBody"] = cname;
        //==============================

        var cname = lyMaps["leftBody"] + "~" + 0;
        var opts = {};
        opts.title = "位置來源";
        opts.setOptss = [];
        var setOptss = opts.setOptss;
        opts.yArr = [9999];
        opts.xyArr = [
            [9999]
        ];

        var sop = sopt.getParaSetOpts({paraSetName: "locationFromSource", titleWidth: 0, titleFontSize: "0.5rh"});
        //var sop = sopt.getButtonRadio({enum: ["手動輸入", "GPS天線"]});
        //sop.value = gr.paraSet.locationFromSource;
        //sop.titleWidth=0;
        setOptss.push(sop);
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            if (iobj.act === "checkChanged") {
                var setLine = iobj.sender.blockRefs["mdaSetLine#0"];
                var value = setLine.opts.setOpts.value;
                gr.paraSet.locationFromSource = value;
                var fileName = "paraSet";
                var content = JSON.stringify(gr.paraSet);
                gr.serverCallBack = function (iobj) {
                    console.log(iobj);
                    md.reCreate();
                };
                sv.saveStringToFile("responseDialogError", "exeCallBackFunc", fileName, content);
            }

        };
        blocks[cname] = {name: "positionPanel", type: "Model~MdaSetGroup~base.sys0", opts: opts};
        //===============================================



        var optsGroupFunc = function (opts) {
            opts.fromGps_f = gr.paraSet.locationFromSource;
            //var gpsDatas = "self.fatherMd.fatherMd.fatherMd.stas.location.gpsDatas[" + opts.deviceInx + "]";
            var gpsDatas = "self.fatherMd.fatherMd.fatherMd.stas.location.gpsDatas#" + opts.deviceInx;
            opts.values = [
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0,
                ""
            ];
            opts.setOptss = [];
            var setOptss = opts.setOptss;
            opts.yArr = [40, 40, 40, 40, 9999];
            opts.xyArr = [
                [180, 90, 90, 9999],
                [180, 90, 90, 9999],
                ["0.40rw", "0.40rw", 9999],
                ["0.40rw", "0.35rw", 9999],
                [9999]
            ];
            var readOnly = 0;
            var editColor = "#fff";
            if (opts.fromGps_f) {
                readOnly = 1;
                editColor = "#cfc";
            }
            var values = opts.values;
            //
            var setOpts = {title: " 緯度:", titleWidth: 70, "unit": "度", value: values[0], max: 27, min: 21, readOnly_f: readOnly, editBaseColor: editColor};
            var watchDatas = setOpts.watchDatas = [];
            watchDatas.push(["directReg", gpsDatas + "#0", "editValue", 1]);
            setOptss.push(sopt.getEditUnit(setOpts));
            //
            var setOpts = {title: " 緯度:分", "unit": "分", value: values[1], max: 59, readOnly_f: readOnly, editBaseColor: editColor};
            var watchDatas = setOpts.watchDatas = [];
            watchDatas.push(["directReg", gpsDatas + "#1", "editValue", 1]);
            setOptss.push(sopt.getEditUnit(setOpts));
            //
            var setOpts = {title: " 緯度:秒", "unit": "秒", value: values[2], max: 59, readOnly_f: readOnly, editBaseColor: editColor};
            var watchDatas = setOpts.watchDatas = [];
            watchDatas.push(["directReg", gpsDatas + "#2", "editValue", 1]);
            setOptss.push(sopt.getEditUnit(setOpts));
            //
            var setOpts = {title: " 緯度:百分秒", "unit": "百分秒", unitWidth: 80, value: values[3], max: 99, readOnly_f: readOnly, editBaseColor: editColor};
            var watchDatas = setOpts.watchDatas = [];
            watchDatas.push(["directReg", gpsDatas + "#3", "editValue", 1]);
            setOptss.push(sopt.getEditUnit(setOpts));
            //
            var setOpts = {title: " 經度:", titleWidth: 70, "unit": "度", value: values[4], max: 123, min: 118, readOnly_f: readOnly, editBaseColor: editColor};
            var watchDatas = setOpts.watchDatas = [];
            watchDatas.push(["directReg", gpsDatas + "#4", "editValue", 1]);
            setOptss.push(sopt.getEditUnit(setOpts));
            //
            var setOpts = {title: " 經度:分", "unit": "分", value: values[5], max: 59, readOnly_f: readOnly, editBaseColor: editColor};
            var watchDatas = setOpts.watchDatas = [];
            watchDatas.push(["directReg", gpsDatas + "#5", "editValue", 1]);
            setOptss.push(sopt.getEditUnit(setOpts));
            //
            var setOpts = {title: " 經度:秒", "unit": "秒", value: values[6], max: 59, readOnly_f: readOnly, editBaseColor: editColor};
            var watchDatas = setOpts.watchDatas = [];
            watchDatas.push(["directReg", gpsDatas + "#6", "editValue", 1]);
            setOptss.push(sopt.getEditUnit(setOpts));
            //
            var setOpts = {title: " 經度:百分秒", "unit": "百分秒", unitWidth: 80, value: values[7], max: 99, readOnly_f: readOnly, editBaseColor: editColor};
            var watchDatas = setOpts.watchDatas = [];
            watchDatas.push(["directReg", gpsDatas + "#7", "editValue", 1]);
            setOptss.push(sopt.getEditUnit(setOpts));
            //
            var setOpts = {title: " 高度:", titleWidth: 70, "unit": "公尺", unitWidth: 60, value: values[8], readOnly_f: readOnly, editBaseColor: editColor};
            var watchDatas = setOpts.watchDatas = [];
            watchDatas.push(["directReg", gpsDatas + "#8", "editValue", 1]);
            setOptss.push(sopt.getEditUnit(setOpts));
            //
            var setOpts = {title: " 方位:", titleWidth: 70, "unit": "度", value: values[9], max: 360, readOnly_f: readOnly, editBaseColor: editColor};
            var watchDatas = setOpts.watchDatas = [];
            watchDatas.push(["directReg", gpsDatas + "#9", "editValue", 1]);
            setOptss.push(sopt.getEditUnit(setOpts));
            //
            if (opts.fromGps_f)
                setOptss.push(sopt.getButtonActs({titleWidth: 0, enum: ['<i class="gf">&#xe161</i>'], enumId: ["save"], fontSize: 30}));
            else
                setOptss.push(sopt.getButtonActs({titleWidth: 0, enum: ['<i class="gf">&#xf028</i>'], enumId: ["pad"], fontSize: 30}));
            //
            var setOpts = {title: " 狀態:", titleWidth: 70, value: values[10]};
            var watchDatas = setOpts.watchDatas = [];
            watchDatas.push(["directReg", gpsDatas + "#10", "editValue", 1]);
            setOptss.push(sopt.getView(setOpts));

            var setOpts = {title: " 時間:", titleWidth: 70, value: values[11]};
            var watchDatas = setOpts.watchDatas = [];
            watchDatas.push(["directReg", gpsDatas + "#11", "editValue", 1]);
            setOptss.push(sopt.getView(setOpts));

            var setOpts = {title: " 衛星:", titleWidth: 70, value: values[12]};
            var watchDatas = setOpts.watchDatas = [];
            watchDatas.push(["directReg", gpsDatas + "#12", "editValue", 1]);
            setOptss.push(sopt.getView(setOpts));

            //
        };
        var actionPrg = function (iobj) {
            console.log(iobj);

            var setOkPrg = function (iobj) {
                console.log(iobj);
                if (iobj.act !== "padEnter")
                    return;
                if (sender.name === "ladarLaunchPanel") {
                    if (setInx === 0)
                        var name0 = "radarStartAngle";
                    if (setInx === 1)
                        var name0 = "radarEndAngle";
                    if (setInx === 2)
                        var name0 = "radarScanRpm";
                    if (setInx === 3)
                        var name0 = "radarFadeTime";
                    gr.paraSet[name0] = iobj.inputText;
                } else {
                    if (sender.name === "ladarGpsPanel")
                        var name0 = "mast";
                    if (sender.name === "targetGpsPanel1")
                        var name0 = "sub1";
                    if (sender.name === "targetGpsPanel2")
                        var name0 = "sub2";
                    if (setInx <= 3) {
                        name0 += "Latitude";
                        var index = setInx;
                    } else if (setInx >= 8) {
                        name0 += "Attitude";
                        var index = setInx - 8;
                    } else {
                        name0 += "Longitude";
                        var index = setInx - 4;
                    }
                    gr.paraSet[name0][index] = KvLib.toInt(iobj.inputText, 0);
                }
                var fileName = "paraSet";
                var content = JSON.stringify(gr.paraSet);
                sv.saveStringToFile("responseDialogError", "null", fileName, content);
            };



            var sender = iobj.sender;
            if (iobj.act === "pressEnter") {
                iobj.act = "padEnter";
                iobj.sender.stas.blurObjName = iobj.setOptsObj.name;
                var setInx = KvLib.toInt(iobj.setOptsObj.name.split("#")[1], null);
                if (setInx === null)
                    return;
                iobj.inputText = iobj.value;
                setOkPrg(iobj);

            }
            if (iobj.act === "actButtonClick") {
                if (iobj.buttonId === "pad") {
                    var st = iobj.sender.stas;
                    if (st.blurObjName) {
                        console.log(st.blurObjName);
                        var setLine = iobj.sender.blockRefs[st.blurObjName];
                        if (setLine.opts.setOpts.readOnly_f)
                            return;
                        var setInx = KvLib.toInt(st.blurObjName.split("#")[1], null);
                        if (setInx === null)
                            return;
                        var opts = {};
                        opts.setOpts = {};
                        KvLib.deepCoverObject(opts.setOpts, setLine.opts.setOpts);
                        var inputTextObj = setLine.blockRefs["inputText"];
                        opts.setOpts.value = inputTextObj.elems["inputText"].value;
                        opts.setOpts.titleWidth = 0;
                        opts.setOpts.unitWidth = 0;
                        opts.title = opts.setOpts.title;
                        opts.actionFunc = setOkPrg;
                        box.intPadBox(opts);
                    }
                    return;
                }
                if (iobj.buttonId === "save") {
                    var opts = {};
                    opts.kvTexts = ["儲存設定值 ?"];
                    opts.actionFunc = function (iobj) {
                        console.log(iobj);
                        var values = [];
                        if (iobj.kvObj.name === "ok") {
                            for (var i = 0; i < 10; i++) {
                                var key = "mdaSetLine#" + i;
                                var setLineObj = sender.blockRefs[key];
                                var inputText = setLineObj.blockRefs["inputText"];
                                var value = inputText.elems["inputText"].value;
                                values.push(KvLib.strToInt(value, 0));
                            }


                            var latitude = [values[0], values[1], values[2], values[3]];
                            var longitude = [values[4], values[5], values[6], values[7]];
                            var attitude = [values[8], values[9]];



                            if (sender.name === "ladarGpsPanel") {
                                gr.paraSet.mastLatitude = latitude;
                                gr.paraSet.mastLongitude = longitude;
                                gr.paraSet.mastAttitude = attitude;
                            }
                            if (sender.name === "targetGpsPanel1") {
                                gr.paraSet.sub1Latitude = latitude;
                                gr.paraSet.sub1Longitude = longitude;
                                gr.paraSet.sub1Attitude = attitude;
                            }
                            if (sender.name === "targetGpsPanel2") {
                                gr.paraSet.sub2Latitude = latitude;
                                gr.paraSet.sub2Longitude = longitude;
                                gr.paraSet.sub2Attitude = attitude;
                            }

                            var fileName = "paraSet";
                            var content = JSON.stringify(gr.paraSet);
                            sv.saveStringToFile("responseDialogError", "null", fileName, content);
                        }
                    };
                    box.checkBox(opts);
                }
                if (iobj.buttonId === "map") {

                }
                if (iobj.buttonId === "roomIn") {
                    var locationTarget = iobj.sender.fatherMd;
                    var radarScreen = locationTarget.blockRefs["radarScreen"];
                    if (radarScreen.opts.roomInInx > 0)
                        radarScreen.opts.roomInInx--;
                    radarScreen.opts.messages.rangeText.text = "Range: " + radarScreen.opts.roomInTbl[radarScreen.opts.roomInInx];
                    radarScreen.opts.symbleEdit_f = 1;
                    return;
                }
                if (iobj.buttonId === "roomOut") {
                    var locationTarget = iobj.sender.fatherMd;
                    var radarScreen = locationTarget.blockRefs["radarScreen"];
                    if (radarScreen.opts.roomInInx < (radarScreen.opts.roomInTbl.length - 1))
                        radarScreen.opts.roomInInx++;
                    radarScreen.opts.messages.rangeText.text = "Range: " + radarScreen.opts.roomInTbl[radarScreen.opts.roomInInx];
                    radarScreen.opts.symbleEdit_f = 1;
                    return;
                }
                if (iobj.buttonId === "radarStart") {
                    var locationTarget = iobj.sender.fatherMd;
                    var radarScreen = locationTarget.blockRefs["radarScreen"];
                    radarScreen.opts.run_f = 1;
                    radarScreen.stas.scanAngle = 0;
                    return;
                }
                if (iobj.buttonId === "radarStop") {
                    var locationTarget = iobj.sender.fatherMd;
                    var radarScreen = locationTarget.blockRefs["radarScreen"];
                    radarScreen.opts.run_f = 0;
                    return;
                }
            }
        };
        var cname = lyMaps["leftBody"] + "~" + 1;
        var opts = {};
        opts.title = "主控發射機";
        opts.titleIconColor = "#f00";
        opts.titleIcon = "➤";
        opts.deviceInx = 0;
        opts.actionFunc = actionPrg;
        optsGroupFunc(opts);
        blocks[cname] = {name: "ladarGpsPanel", type: "Model~MdaSetGroup~base.sys0", opts: opts};
        //=========================
        var cname = lyMaps["leftBody"] + "~" + 2;
        var opts = {};
        opts.title = "副控發射機1";
        opts.titleIconColor = "#0f0";
        opts.titleIcon = "➤";
        opts.deviceInx = 1;
        opts.actionFunc = actionPrg;
        optsGroupFunc(opts);
        blocks[cname] = {name: "targetGpsPanel1", type: "Model~MdaSetGroup~base.sys0", opts: opts};
        //=========================
        var cname = lyMaps["leftBody"] + "~" + 3;
        var opts = {};
        opts.title = "副控發射機2";
        opts.titleIconColor = "#00f";
        opts.titleIcon = "➤";
        opts.deviceInx = 2;
        opts.actionFunc = actionPrg;
        optsGroupFunc(opts);
        blocks[cname] = {name: "targetGpsPanel2", type: "Model~MdaSetGroup~base.sys0", opts: opts};
        //=========================
        var cname = lyMaps["leftBody"] + "~" + 4;
        var opts = {};
        opts.title = "距離";
        opts.setOptss = [];
        var setOptss = opts.setOptss;
        opts.yArr = [35, 35, 35, 9999];
        opts.xyArr = [
            [9999],
            [9999],
            [9999],
            [9999]
        ];

        var radarDirections = "self.fatherMd.fatherMd.fatherMd.stas.location.radarDirections";
        var setOpts = {title: "發射機距副控1:", titleWidth: 200, unit: "公尺", unitWidth: 100};
        var watchDatas = setOpts.watchDatas = [];
        watchDatas.push(["directReg", radarDirections + "#0", "editValue", 1]);
        setOptss.push(sopt.getView(setOpts));

        var setOpts = {title: "發射機距副控2:", titleWidth: 200, unit: "公尺", unitWidth: 100};
        var watchDatas = setOpts.watchDatas = [];
        watchDatas.push(["directReg", radarDirections + "#1", "editValue", 1]);
        setOptss.push(sopt.getView(setOpts));

        var setOpts = {title: "副控1距副控2:", titleWidth: 200, unit: "公尺", unitWidth: 100};
        var watchDatas = setOpts.watchDatas = [];
        watchDatas.push(["directReg", radarDirections + "#2", "editValue", 1]);
        setOptss.push(sopt.getView(setOpts));



        blocks[cname] = {name: "rangePanel", type: "Model~MdaSetGroup~base.sys0", opts: opts};
        //=========================
        var cname = lyMaps["centerBody"] + "~" + 1;
        var opts = {};
        opts.ym = 4;
        opts.yArr = [9999, "0.18rh"];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["rightBody"] = cname;
        //==============================



        var cname = lyMaps["rightBody"] + "~" + 0;
        var opts = {};
        blocks[cname] = {name: "radarScreen", type: "Model~MyRadar~base.sys0", opts: opts};
        var cname = lyMaps["rightBody"] + "~" + 1;
        var opts = {};
        opts.title = "發射機模擬";
        opts.setOptss = [];
        var setOptss = opts.setOptss;
        opts.yArr = [40, 40, 40, 9999];
        opts.xyArr = [
            ["0.5rw", 9999],
            ["0.4rw", "0.4rw", 9999],
            [9999],
            [9999]
        ];
        var radarScanDatas = "self.fatherMd.fatherMd.fatherMd.stas.location.radarScanDatas";
        //
        var setOpts = sopt.getEditUnit({paraSetName: "radarStartAngle", titleWidth: 200, unitWidth: 40});
        var watchDatas = setOpts.watchDatas = [];
        watchDatas.push(["directName", radarScanDatas + "[0]", "editValue", 1]);
        setOptss.push(setOpts);
        //
        var setOpts = sopt.getEditUnit({paraSetName: "radarEndAngle", titleWidth: 200, unitWidth: 40});
        var watchDatas = setOpts.watchDatas = [];
        watchDatas.push(["directName", radarScanDatas + "[1]", "editValue", 1]);
        setOptss.push(setOpts);
        //
        var setOpts = sopt.getEditUnit({paraSetName: "radarScanRpm", titleWidth: 200, unitWidth: 40});
        var watchDatas = setOpts.watchDatas = [];
        watchDatas.push(["directName", radarScanDatas + "[2]", "editValue", 1]);
        setOptss.push(setOpts);
        //
        var setOpts = sopt.getEditUnit({paraSetName: "radarFadeTime", titleWidth: 200, unitWidth: 0});
        var watchDatas = setOpts.watchDatas = [];
        watchDatas.push(["directName", radarScanDatas + "[3]", "editValue", 1]);
        setOptss.push(setOpts);
        //


        setOptss.push(sopt.getButtonActs({titleWidth: 0, enum: ['<i class="gf">&#xf028</i>'], enumId: ["pad"], fontSize: 25}));
        setOptss.push(sopt.getButtonActs({titleWidth: 0, enum: ["地圖", '放大', '縮小', "啟動", "停止"], enumId: ["map", "roomIn", "roomOut", "radarStart", "radarStop"], fontSize: 25}));
        opts.editIndex = 3;
        /*
         opts.actionFunc = function (iobj) {
         console.log(iobj);
         if(iobj.act=== "actButtonClick"){
         var inxStr=iobj.kvObj.name.split('#')[1];
         if(inxStr==="3"){
         if(iobj.buttonInx===0){
         
         
         }
         
         
         }
         if(inxStr==="4"){
         
         }
         
         }
         if (iobj.nameId === "mdaSetLine#4") {
         if (iobj.buttonInx === 2) {//start
         md.blockRefs["radarScreen"].opts.run_f = 1;
         return;
         }
         if (iobj.buttonInx === 3) {//stop
         md.blockRefs["radarScreen"].opts.run_f = 0;
         return;
         }
         }
         };
         * 
         */
        opts.actionFunc = actionPrg;
        blocks[cname] = {name: "ladarLaunchPanel", type: "Model~MdaSetGroup~base.sys0", opts: opts};
        //=========================


    }
}
class MyRadar {
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);
        opts.sizeRate = 0.9;
        opts.baseColor = "#000";
        opts.setPanelWidth = 0;
        opts.bufferSize = 2000;
        opts.powerOn_f = 1;
        opts.run_f = 1;
        opts.axeWidth = 0.5;
        opts.angleTextFontSize = 12;
        opts.angleTextPeriod = 10;
        opts.symbleEdit_f = 1;
        opts.speedAmt = 1;
        opts.speedAngleDiv = 3600;
        opts.radarColor = 0x3000ff00;
        opts.roomInInx = 0;
        opts.roomInTbl = [500, 600, 800, 1000, 1200, 1600, 2000, 2400, 3000, 4000, 5000, 6000];
        //===============
        opts.messages = {};
        var mesObj = {};
        mesObj.xr = 0.05;
        mesObj.yr = 0.01;
        mesObj.text = "Range: " + opts.roomInTbl[opts.roomInInx];
        mesObj.color = "#0f0";
        mesObj.offY = 10;
        mesObj.fontSize = 12;
        mesObj.fontFamily = "monospace";
        mesObj.hide_f = 0;
        opts.messages.rangeText = mesObj;
        //===============
        var mesObj = {};
        mesObj.xr = 0.5;
        mesObj.yr = 0.5;
        mesObj.text = "➤";
        mesObj.color = "#f00";
        mesObj.offY = 11;
        mesObj.angle = 0;
        mesObj.fontSize = 32;
        mesObj.fontFamily = "monospace";
        mesObj.hide_f = 0;
        mesObj.preString = "";
        opts.messages.mastRadar = mesObj;
        //===============
        var mesObj = {};
        mesObj.xr = 0.65;
        mesObj.yr = 0.35;
        mesObj.text = "➤";
        mesObj.color = "#0f0";
        mesObj.offY = 11;
        mesObj.angle = 0;
        mesObj.fontSize = 32;
        mesObj.fontFamily = "monospace";
        mesObj.hide_f = 0;
        mesObj.preString = "";
        opts.messages.sub1Radar = mesObj;
        //===============
        var mesObj = {};
        mesObj.xr = 0.7;
        mesObj.yr = 0.8;
        mesObj.text = "➤";
        mesObj.color = "#00f";
        mesObj.offY = 11;
        mesObj.angle = 0;
        mesObj.fontSize = 32;
        mesObj.fontFamily = "monospace";
        mesObj.hide_f = 0;
        mesObj.preString = "";
        opts.messages.sub2Radar = mesObj;
        //===============








        return opts;
    }

    afterCreate() {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        //==
        var plotObj = md.blockRefs["container"];
        var plotElem = plotObj.elems["base"];
        st.containerWidth = plotObj.stas.containerWidth;
        st.containerHeight = plotObj.stas.containerHeight;
        //=======================================================

        //==========================================================
        var selem = document.createElement("canvas");
        selem.id = md.kid + "_canvas";
        selem.width = st.containerWidth;
        selem.height = st.containerHeight;
        selem.style.position = "absolute";
        selem.style.left = 0 + "px";
        selem.style.top = 0 + "px";
        selem.style.zIndex = "0";
        selem.style.width = "100%";
        selem.style.height = "100%";
        plotElem.appendChild(selem);
        st.canvasLy0 = selem;
        if (!op.powerOn_f)
            return;
        //=========================================
        var selem = document.createElement("canvas");
        selem.id = md.kid + "_canvasLy1";
        selem.width = st.containerWidth;
        selem.height = st.containerHeight;
        selem.style.position = "absolute";
        selem.style.left = 0 + "px";
        selem.style.top = 0 + "px";
        selem.style.zIndex = "1";
        selem.style.width = "100%";
        selem.style.height = "100%";
        plotElem.appendChild(selem);
        st.canvasLy1 = selem;
        //=========================================
        var selem = document.createElement("canvas");
        selem.id = md.kid + "_canvasLy1";
        selem.width = st.containerWidth;
        selem.height = st.containerHeight;
        selem.style.position = "absolute";
        selem.style.left = 0 + "px";
        selem.style.top = 0 + "px";
        selem.style.zIndex = "2";
        selem.style.width = "100%";
        selem.style.height = "100%";
        plotElem.appendChild(selem);
        st.canvasLy2 = selem;
        //=========================================
        if (!st.canvasLy0.getContext)
            return;
        if (!st.canvasLy1.getContext)
            return;
        if (!st.canvasLy2.getContext)
            return;
        st.ctxBase = st.canvasLy0.getContext('2d');
        st.ctxSymble = st.canvasLy1.getContext('2d');
        st.ctxRadar = st.canvasLy2.getContext('2d');
        this.createScope();
        //=========================================
        var iobj = {};
        iobj.act = "afterCreate";
        iobj.sender = md;
        KvLib.exe(op.actionFunc, iobj);
    }

    chkWatch(optName) {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        if (optName === "grid_f") {
            this.drawAxe(1);
        }
        this.frameTimer();
    }

    frameTimer() {
        var self = this;
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        self.drawSymble();
        self.drawFade();
        if (!op.run_f)
            return;
        self.drawScan();
    }

    createScope(editObj) {
        var self = this;
        self.drawAxe(1);
        self.clearRadar();
    }

    drawSymble() {
        var op = this.md.opts;
        var st = this.md.stas;
        if (!op.symbleEdit_f)
            return;
        op.symbleEdit_f = 0;
        st.ctxSymble.clearRect(0, 0, st.containerWidth, st.containerHeight);
        this.drawMessages();
    }

    clearAll() {
        var st = this.md.stas;
        st.ctxBase.clearRect(0, 0, st.containerWidth, st.containerHeight);
        st.ctxSymble.clearRect(0, 0, st.containerWidth, st.containerHeight);
        st.ctxRadar.clearRect(0, 0, st.containerWidth, st.containerHeight);
    }

    clearRadar() {
        var st = this.md.stas;
        st.ctxRadar.clearRect(0, 0, st.containerWidth, st.containerHeight);
    }

    drawFade() {
        var st = this.md.stas;
        if (!st.ctxRadarData)
            return;
        if (!st.fadeCnt)
            st.fadeCnt = 0;
        if (++st.fadeCnt < gr.paraSet.radarFadeTime) {
            return;
        }
        st.fadeCnt = 0;
        var st = this.md.stas;
        for (var yy = 0; yy < st.scanHeight; yy++) {
            for (var xx = 0; xx < st.scanWidth; xx++) {
                var index = (xx + yy * st.scanWidth) * 4 + 3;
                if (st.ctxRadarData.data[index])
                    st.ctxRadarData.data[index]--;
            }
        }
        st.ctxRadar.putImageData(st.ctxRadarData, st.scanOffX, st.scanOffY);
    }

    drawScan() {
        var st = this.md.stas;
        var op = this.md.opts;
        if (!st.ctxRadarData)
            return;
        var bb = (op.radarColor >> 0) & 255;
        var gg = (op.radarColor >> 8) & 255;
        var rr = (op.radarColor >> 16) & 255;
        var aa = (op.radarColor >> 24) & 255;
        var speed = gr.paraSet.radarScanRpm * op.speedAngleDiv / 3600;
        var speedAmt = speed | 0;
        if (!st.scrap)
            st.scrap = 0;
        st.scrap += speed - speedAmt;
        if (st.scrap >= 1) {
            st.scrap -= 1;
            speedAmt += 1;
        }
        for (var i = 0; i < speedAmt; i++) {
            st.scanAngle += 1;
            if (st.scanAngle >= op.speedAngleDiv) {
                st.scanAngle = 0;
            }
            var angle = (Math.PI * 2 * st.scanAngle / (op.speedAngleDiv)) - (Math.PI / 2);
            var startAngle = (Math.PI * 2 * gr.paraSet.radarStartAngle / 360) - (Math.PI / 2);
            var endAngle = (Math.PI * 2 * gr.paraSet.radarEndAngle / 360) - (Math.PI / 2);
            if (angle < startAngle)
                continue;
            if (angle > endAngle)
                continue;
            var sin = Math.sin(angle);
            var cos = Math.cos(angle);
            for (var j = 0; j < st.sRadius; j++) {
                var xx = ((j * cos) | 0) + st.sRadius;
                var yy = ((j * sin) | 0) + st.sRadius;
                var index = (xx + yy * st.scanWidth) * 4;
                st.ctxRadarData.data[index + 0] = rr;
                st.ctxRadarData.data[index + 1] = gg;
                st.ctxRadarData.data[index + 2] = bb;
                st.ctxRadarData.data[index + 3] = aa;
            }
        }


        st.ctxRadar.putImageData(st.ctxRadarData, st.scanOffX, st.scanOffY);
        var centerX = (st.containerWidth / 2) | 0;
        var centerY = (st.containerHeight / 2) | 0;
        var ctx = st.ctxRadar;
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 1;
        if ((Math.PI * 1.5) === angle)
            return;
        ctx.beginPath();
        ctx.arc(centerX, centerY, st.sRadius - 1, angle - 0.02, angle);
        ctx.stroke();
    }

    drawMessages() {
        var st = this.md.stas;
        var op = this.md.opts;
        var ctx = st.ctxSymble;
        var keys = Object.keys(op.messages);
        for (var i = 0; i < keys.length; i++) {
            var mesObj = op.messages[keys[i]];
            if (mesObj.hide_f)
                continue;
            ctx.save();
            ctx.fillStyle = mesObj.color;
            ctx.font = mesObj.fontSize + "px " + mesObj.fontFamily;
            var xx = (mesObj.xr * st.containerWidth) | 0;
            var yy = (mesObj.yr * st.containerHeight) | 0;
            var text = mesObj.text;
            //
            var metrics = ctx.measureText(text);
            ctx.translate(xx, yy);
            ctx.rotate(2 * Math.PI * (mesObj.angle - 90) / 360);
            ctx.fillText(text, -(metrics.width) / 2, mesObj.offY);
            //
            ctx.restore();
        }
    }

    drawAxe(clr) {
        var op = this.md.opts;
        var st = this.md.stas;
        var ctx = st.ctxBase;
        if (clr) {
            ctx.clearRect(0, 0, st.containerWidth, st.containerHeight);
        }
        var centerX = (st.containerWidth / 2) | 0;
        var centerY = (st.containerHeight / 2) | 0;
        var radius = (st.containerWidth * op.sizeRate / 2) | 0;
        var sRadius = radius - 12;
        var ssRadius = radius - 5;
        //===============================    
        st.centerX = centerX;
        st.centerY = centerY;
        st.sRadius = sRadius;
        st.scanWidth = (sRadius * 2 + 1) | 0;
        st.scanHeight = (sRadius * 2 + 1) | 0;
        st.scanOffX = ((st.containerWidth - st.scanWidth) / 2) | 0;
        st.scanOffY = ((st.containerHeight - st.scanHeight) / 2) | 0;
        st.ctxRadarData = st.ctxRadar.getImageData(st.scanOffX, st.scanOffY, st.scanWidth, st.scanHeight);
        st.scanAngle = 0;
        //===============================    
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = op.axeWidth;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.stroke();
        //======================
        ctx.strokeStyle = "#f00";
        ctx.lineWidth = op.axeWidth;
        ctx.beginPath();
        ctx.arc(centerX, centerY, sRadius * 0.25, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(centerX, centerY, sRadius * 0.5, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(centerX, centerY, sRadius * 0.75, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(centerX - sRadius + 2, centerY);
        ctx.lineTo(centerX + sRadius - 2, centerY);
        ctx.moveTo(centerX, centerY - sRadius + 2);
        ctx.lineTo(centerX, centerY + sRadius - 2);
        ctx.stroke();
        //======================
        ctx.strokeStyle = "#f00";
        ctx.lineWidth = op.axeWidth;
        ctx.beginPath();
        for (var i = 0; i < 360; ) {
            var sin = Math.sin(Math.PI * 2 * i / 360);
            var cos = Math.cos(Math.PI * 2 * i / 360);
            ctx.moveTo(radius * cos + centerX, radius * sin + centerY);
            ctx.lineTo(sRadius * cos + centerX, sRadius * sin + centerY);
            i += 5;
        }
        for (var i = 0; i < 360; ) {
            if (i % 5) {
                var sin = Math.sin(Math.PI * 2 * i / 360);
                var cos = Math.cos(Math.PI * 2 * i / 360);
                ctx.moveTo(radius * cos + centerX, radius * sin + centerY);
                ctx.lineTo(ssRadius * cos + centerX, ssRadius * sin + centerY);
            }
            i += 1;
        }
        ctx.stroke();
        //======================
        i = 0;
        var fontSize = op.angleTextFontSize;
        var radiusT = radius + 10;
        var startDeg = 90;
        for (var i = 0; i < 360; i += op.angleTextPeriod) {
            var sin = Math.sin(Math.PI * 2 * (startDeg - i) / 360);
            var cos = Math.cos(Math.PI * 2 * (startDeg - i) / 360);
            var text = "" + i;
            var metrics = ctx.measureText(text);
            ctx.save();
            ctx.fillStyle = "#0f0";
            ctx.font = fontSize + "px monospace";
            ctx.textAlign = 'center';
            ctx.textBaseline = "bottom";
            ctx.translate(radiusT * cos + centerX, centerY - radiusT * sin);
            ctx.rotate(2 * Math.PI * (i) / 360);
            ctx.fillText(text, 0, fontSize / 2);
            ctx.restore();
        }
    }

    actionFunc(iobj) {
        console.log(iobj);
        if (iobj.act === "mouseClick") {
            if (iobj.keyId === "radarPaneSetButton") {
            }
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
        md.setPns(opts);
        layouts[cname] = {name: cname, type: "Layout~Ly_base~array.sys0", opts: opts};
        lyMaps["body"] = cname;
        //======================================    
        var opts = {};
        md.setPns(opts);
        blocks[cname] = {name: "basePanel", type: "Component~Cp_base~plate.sys0", opts: opts};
        //=======================================
        var cname = lyMaps["body"] + "~" + 0;
        var opts = {};
        opts.xArr = [9999, op.setPanelWidth];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["mainBody"] = cname;
        var cname = lyMaps["mainBody"] + "~" + 0;
        var opts = {};
        opts.baseColor = "#000";
        opts.whr = 1;
        blocks[cname] = {name: "container", type: "Component~Cp_base~container.sys0", opts: opts};
        return;
    }
}
class SelfTest {
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);
        opts.baseColor = "#aaa";
        return opts;
    }
    chkWatch() {
        var self = this;
        var md = self.md;
        var op = md.opts;
        var st = md.stas;
        var slotDataA = gr.radarData.slotDataAA;
        st.slotNames = [];
        for (var i = 0; i < 12; i++) {
            var str = gr.syncSet.slotNameTbl[slotDataA[i] & 15];
            var slotCnt = (slotDataA[i] >> 4) & 15;
            if ((slotDataA[i] & 15) > 4) {
                str = str + " " + (gr.syncSet.numTbl[slotCnt]);
            }
            st.slotNames.push(str);
        }

        st.slotLeds = [];
        st.slotLedHides = [];
        /*
         0:none, 1:ready, 2:error 3:warn up, 4:preTest, 5:testing
         */
        for (var i = 0; i < 12; i++) {
            var inx = 0;
            var hide_f = 0;
            var status = (slotDataA[i] >> 8) & 3;
            var testStatus = (slotDataA[i] >> 10) & 3;
            if (st.slotNames[i] === "")
                hide_f = 1;
            if (status === 1)
                inx = 1;
            if (status === 2)
                if (gr.flash_f)
                    inx = 0;
                else
                    inx = 1;
            if (status === 3) {
                inx = 2;
            }
            if (testStatus) {
                inx = 4;
                if (testStatus === 2) {
                    if (gr.flash_f)
                        inx = 0;
                    else
                        inx = 4;
                }
            }

            st.slotLeds.push(inx);
            st.slotLedHides.push(hide_f);
        }

        mac.messageEditor(md);


    }
    create() {
    }
    actionFunc(iobj) {
        console.log(iobj);
        if (iobj.act === "mouseClick") {
            if (iobj.keyId === "radarPaneSetButton") {
            }
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
        //md.setPns(opts);
        layouts[cname] = {name: cname, type: "Layout~Ly_base~array.sys0", opts: opts};
        lyMaps["body"] = cname;
        //==
        var opts = {};
        md.setPns(opts);
        blocks[cname] = {name: "basePanel", type: "Component~Cp_base~plate.none", opts: opts};
        //======================================    
        var cname = lyMaps["body"] + "~" + 0;
        var opts = {};
        opts.yArr = [50, 9999, 400];
        opts.margin = 4;
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["mainBody"] = cname;
        //==============================
        var cname = lyMaps["mainBody"] + "~" + 0;
        var actionPrg = function (iobj) {
            console.log(iobj);
            gr.gbcs.command({'act': "selfTestEsc"});
            KvLib.exe(op.actionFunc, iobj);

        };
        mac.setHeadTitleBar(md, cname, "系統測試", actionPrg);

        /*
         var opts = {};
         opts.xArr = [9999, 150];
         layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
         lyMaps["headBody"] = cname;
         //===
         
         mac.setHeadTitleBar(md,)
         var cname = lyMaps["headBody"] + "~" + 0;
         var opts = {};
         opts.innerText = "系統測試";
         opts.textAlign = "left";
         blocks[cname] = {name: "titlePanel", type: "Component~Cp_base~label.title", opts: opts};
         //===
         var cname = lyMaps["headBody"] + "~" + 1;
         var opts = {};
         opts.innerText = "離開";
         opts.baseColor = "#ccf";
         opts.actionFunc = function (iobj) {
         console.log(iobj);
         iobj.act = "esc";
         KvLib.exe(op.actionFunc, iobj);
         };
         blocks[cname] = {name: "escButton", type: "Component~Cp_base~button.sys0", opts: opts};
         */
        //==============================
        var cname = lyMaps["mainBody"] + "~" + 1;
        var opts = {};
        opts.xc = 12;
        opts.margin = 10;
        opts.iw = 800;
        layouts[cname] = {name: cname, type: "Layout~Ly_base~array.sys0", opts: opts};
        lyMaps["slotBody"] = cname;
        //===
        for (var i = 0; i < 12; i++) {
            var cname = lyMaps["slotBody"] + "~" + i;
            var opts = {};
            opts.innerText = "";
            opts.backgroundImageUrls = ["systemResource/slot.bmp"];
            opts.writingMode = "vertical-lr";
            opts.fontSize = "0.4rw";
            opts.textAlign = "left";
            opts.tpd = 20;
            opts.fontSize = 30;
            opts.textShadow = "1px 1px 1px #aaa";
            opts.zIndex = "0";
            var watchReg = "self.fatherMd.stas.slotNames#" + i;
            md.setInputWatch(opts, "directReg", watchReg, "innerText", 1);
            blocks[cname + "#0"] = {name: "slotPanel#" + i, type: "Component~Cp_base~images.sys0", opts: opts};
            var opts = {};
            opts.backgroundInx = 0;
            opts.zIndex = "1";
            opts.iw = 50;
            opts.ih = 50;
            opts.hAlign = "bottom";
            opts.bm = 20;
            var watchReg = "self.fatherMd.stas.slotLeds#" + i;
            md.setInputWatch(opts, "directReg", watchReg, "backgroundInx", 1);
            var watchReg = "self.fatherMd.stas.slotLedHides#" + i;
            md.setInputWatch(opts, "directReg", watchReg, "hidden_f", 1);
            blocks[cname + "#1"] = {name: "startLed", type: "Component~Cp_base~icons.led", opts: opts};
        }



        var cname = lyMaps["mainBody"] + "~" + 2;
        var opts = {};
        opts.xArr = [9999, 150];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["footBody"] = cname;
        var cname = lyMaps["footBody"] + "~" + 0;
        var opts = {};
        opts.readOnly_f = 1;
        blocks[cname] = {name: "editor", type: "Component~Cp_base~editor.sys0", opts: opts};
        var cname = lyMaps["footBody"] + "~" + 1;
        var opts = {};
        opts.buttons = ["測試開始", "測試停止", "上一頁", "下一頁", "清除"];
        opts.buttonAmt = 6;
        opts.buttonIds = ["testStart", "testStop", "upPage", "downPage", "clear"];
        opts.layoutType = "collum";
        opts.margin = 4;
        opts.fontSize = "0.5rh";
        opts.xm = 4;
        opts.ym = 10;
        opts.baseColor = "#444";
        opts.actionFunc = function (iobj) {
            console.log(iobj);

            if (iobj.buttonId === "testStart") {
                gr.gbcs.command({'act': "selfTestStartAll"});
                return;
            }
            if (iobj.buttonId === "testStop") {
                gr.gbcs.command({'act': "selfTestStopAll"});
                return;
            }

            if (iobj.buttonId === "upPage") {
                var kvObj = md.blockRefs["editor"];
                KvLib.lineMoveEditor(kvObj, -12);
                return;
            }
            if (iobj.buttonId === "downPage") {
                var kvObj = md.blockRefs["editor"];
                KvLib.lineMoveEditor(kvObj, 12);
                return;
            }


            if (iobj.buttonId === "clear") {
                var kvObj = md.blockRefs["editor"];
                var editor = kvObj.objs["editor"];
                KvLib.clearEditorMaker(editor);
                editor.getSession().setValue("");
                return;
            }
        };
        blocks[cname] = {name: "headButtons", type: "Model~MdaButtons~base.sys0", opts: opts};
        //===




    }
}
class SyncTest {
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);
        opts.baseColor = "#222";
        return opts;
    }

    chkWatch() {
        var self = this;
        var md = self.md;
        var op = md.opts;
        var st = md.stas;
        //0 光纖連線狀態 0:未連線, 1:未連線 
        //1 RF連線狀態 0:未連線, 1:未連線 
        //2 1588修正時間  
        //3 封包發送數  
        //4 正確率
        //5 主控RF接收能量
        //6 副控RF接收能量
        for (var i = 0; i < 2; i++) {
            if (i === 0) {
                var commDatas = st.sub1CommDatas = ["未連線", "未連線", 0, 0, 0, 0, 0];
                var commColors = st.sub1CommColors = ["#eef", "#eef", "#eef", "#eef", "#eef", "#eef"];
            }
            if (i === 1) {
                var commDatas = st.sub2CommDatas = ["未連線", "未連線", 0, 0, 0, 0, 0];
                var commColors = st.sub2CommColors = ["#eef", "#eef", "#eef", "#eef", "#eef", "#eef"];
            }
            if (i === 0) {
                if (gr.radarData.systemStatus1 & (1)) {
                    commDatas[0] = "已連線";
                    commColors[0] = "#cfc";
                }
                if (gr.radarData.systemStatus1 & (1 << 1)) {
                    commDatas[1] = "已連線";
                    commColors[1] = "#cfc";
                }
                commDatas[5] = "" + gr.radarData.rfRxPowerA[0];
                commDatas[6] = "" + gr.radarData.rfRxPowerA[2];
            }
            if (i === 1) {
                if (gr.radarData.systemStatus1 & (1 << 2)) {
                    commDatas[0] = "已連線";
                    commColors[0] = "#cfc";
                }
                if (gr.radarData.systemStatus1 & (1 << 3)) {
                    commDatas[1] = "已連線";
                    commColors[1] = "#cfc";
                }
                commDatas[5] = "" + gr.radarData.rfRxPowerA[1];
                commDatas[6] = "" + gr.radarData.rfRxPowerA[3];
            }
            commDatas[2] = "" + gr.radarData.adjTimeOf1588A[i];
            commDatas[3] = "" + gr.radarData.commPackageCntA[i];
            if (gr.radarData.commOkRateA[i] === 0)
                commDatas[4] = "0.0 %";
            else {
                var retCnt = gr.radarData.commOkRateA[i] + 2;
                if (retCnt > 1000)
                    retCnt = 1000;
                commDatas[4] = "" + (retCnt / 10).toFixed(1) + " %";
            }

        }



    }

    actionFunc(iobj) {
        console.log(iobj);
        if (iobj.act === "mouseClick") {
            if (iobj.keyId === "radarPaneSetButton") {
            }
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
        //md.setPns(opts);
        layouts[cname] = {name: cname, type: "Layout~Ly_base~array.sys0", opts: opts};
        lyMaps["body"] = cname;
        //==
        var opts = {};
        md.setPns(opts);
        blocks[cname] = {name: "basePanel", type: "Component~Cp_base~plate.none", opts: opts};
        //======================================    
        var cname = lyMaps["body"] + "~" + 0;
        var opts = {};
        opts.yArr = [50, 180, 9999, 60];
        opts.ym = 10;
        opts.margin = 4;
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["mainBody"] = cname;
        //==============================
        var cname = lyMaps["mainBody"] + "~" + 0;
        var excActionPrg = function (iobj) {
            console.log(iobj);
            iobj.act = "esc";
            KvLib.exe(op.actionFunc, iobj);
        };
        mac.setHeadTitleBar(md, cname, "同步設定", excActionPrg);


        //==============================
        var cname = lyMaps["mainBody"] + "~" + 2;
        var opts = {};
        opts.xc = 2;
        opts.xm = 10;
        layouts[cname] = {name: cname, type: "Layout~Ly_base~array.sys0", opts: opts};
        lyMaps["centerBody"] = cname;
        //===
        var cname = lyMaps["mainBody"] + "~" + 3;
        var opts = {};
        opts.xArr = [9999, 150];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["footBody"] = cname;
        var cname = lyMaps["mainBody"] + "~" + 1;
        var opts = {};
        opts.title = "系統";
        opts.setOptss = [];
        var setOptss = opts.setOptss;
        opts.yArr = ["0.33rw", "0.33rw", "0.33rw"];
        opts.xm = 10;
        opts.ym = 5;
        opts.xyArr = [
            ["0.5rw", 9999],
            ["0.5rw", 9999]
        ];
        /*
         var setOpts = sopt.getParaSetOpts({paraSetName: "commTestPacks", titleWidth: 200, titleFontSize: "0.5rh"});
         var watchDatas = setOpts.watchDatas = [];
         watchDatas.push(["directName", "gr.paraSet." + "commTestPacks", "editValue", 1]);
         setOptss.push(setOpts);
         */

        var setOpts = sopt.getParaSetOpts({paraSetName: "vgTimeDelay", titleWidth: 200, titleFontSize: "0.5rh"});
        var watchDatas = setOpts.watchDatas = [];
        watchDatas.push(["directName", "gr.paraSet." + "vgTimeDelay", "editValue", 1]);
        setOptss.push(setOpts);
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            if (iobj.act === "itemMouseClick") {
                var setLine = iobj.setOptsObj;
                var value = setLine.opts.setOpts.value;
                gr.paraSet[setLine.opts.setOpts.paraSetName] = value;
                var fileName = "paraSet";
                var content = JSON.stringify(gr.paraSet);
                sv.saveStringToFile("responseDialogError", null, fileName, content);

            }

        };
        blocks[cname] = {name: "systemPanel", type: "Model~MdaSetGroup~base.sys0", opts: opts};

        var targFunc = function (opts) {
            opts.actionFunc = function (iobj) {
                console.log(iobj);
                if (iobj.act === "checkChanged" || iobj.act === "pressEnter") {
                    if (iobj.kvObj.baseType === "MdaSetLine")
                        var setLine = iobj.kvObj;
                    else
                        var setLine = iobj.kvObj.fatherMd;
                    var value = setLine.opts.setOpts.value;
                    gr.paraSet[setLine.opts.setOpts.paraSetName] = value;
                    var fileName = "paraSet";
                    var content = JSON.stringify(gr.paraSet);
                    sv.saveStringToFile("responseDialogError", null, fileName, content);
                }
            };
            opts.setOptss = [];
            var setOptss = opts.setOptss;

            opts.yArr = ["0.09rh", "0.09rh", "0.09rh", "0.09rh", "0.09rh", "0.09rh", "0.09rh", "0.09rh", "0.09rh", "0.09rh", "0.09rh"];
            opts.ym = 10;
            opts.xm = 8;
            if (opts.deviceInx === 0)
                var preText = "sub1";
            if (opts.deviceInx === 1)
                var preText = "sub2";
            opts.xyArr = [
                [9999],
                [9999],
                [9999],
                [9999],
                [9999],
                [9999],
                [9999],
                [9999],
                [9999],
                [9999],
                [9999],
                [9999],
                [9999],
                [9999],
                [9999],
                [9999],
                [9999]
            ];

            if (opts.deviceInx === 0) {
                var watchReg0 = "self.fatherMd.fatherMd.fatherMd.stas.sub1CommDatas";
                var watchReg1 = "self.fatherMd.fatherMd.fatherMd.stas.sub1CommColors";
            }
            if (opts.deviceInx === 1) {
                var watchReg0 = "self.fatherMd.fatherMd.fatherMd.stas.sub2CommDatas";
                var watchReg1 = "self.fatherMd.fatherMd.fatherMd.stas.sub2CommColors";
            }
            //===============
            var setOpts = sopt.getParaSetOpts({paraSetName: preText + "ChCommSet", titleWidth: 200, titleFontSize: "0.4rh"});
            var watchDatas = setOpts.watchDatas = [];
            watchDatas.push(["directName", gr.paraSet[preText + "ChCommSet"], "editValue", 1]);
            setOptss.push(setOpts);
            //===============
            if (opts.deviceInx === 0) {
                var setOpts = sopt.getParaSetOpts({paraSetName: "mastToSub1CommType", titleWidth: 200, titleFontSize: "0.4rh"});
                var watchDatas = setOpts.watchDatas = [];
                watchDatas.push(["directName", "gr.paraSet." + "mastToSub1CommType", "editValue", 1]);
            } else {
                var setOpts = sopt.getParaSetOpts({paraSetName: "mastToSub2CommType", titleWidth: 200, titleFontSize: "0.4rh"});
                var watchDatas = setOpts.watchDatas = [];
                watchDatas.push(["directName", "gr.paraSet." + "mastToSub2CommType", "editValue", 1]);
            }
            setOptss.push(setOpts);
            //===============
            /*
             var setOpts = sopt.getView({title: "光纖連線狀態:", titleWidth: 140, value: ""});
             var watchDatas = setOpts.watchDatas = [];
             watchDatas.push(["directName", watchReg0 + "[0]", "editValue", 1]);
             watchDatas.push(["directName", watchReg1 + "[0]", "editBaseColor", 1]);
             setOptss.push(setOpts);
             //===============
             var setOpts = sopt.getView({title: "RF連線狀態:", titleWidth: 140, value: ""});
             var watchDatas = setOpts.watchDatas = [];
             watchDatas.push(["directName", watchReg0 + "[1]", "editValue", 1]);
             watchDatas.push(["directName", watchReg1 + "[1]", "editBaseColor", 1]);
             setOptss.push(setOpts);
             //===============
             */
            var setOpts = sopt.getParaSetOpts({paraSetName: preText + "ChSyncType", titleWidth: 200, titleFontSize: "0.4rh"});
            var watchDatas = setOpts.watchDatas = [];
            watchDatas.push(["directName", "gr.paraSet." + preText + "ChSyncType", "editValue", 1]);
            setOptss.push(setOpts);
            //=======

            var setOpts = sopt.getParaSetOpts({paraSetName: preText + "ChTimeFineTune", titleWidth: 200, titleFontSize: "0.4rh"});
            //setOpts.actButtons = ["pad"];
            var watchDatas = setOpts.watchDatas = [];
            watchDatas.push(["directName", "gr.paraSet." + preText + "ChTimeFineTune", "editValue", 1]);
            setOptss.push(setOpts);
            //================


            var setOpts = sopt.getParaSetOpts({paraSetName: preText + "ChFiberDelay", titleWidth: 200, titleFontSize: "0.4rh"});
            //setOpts.actButtons = ["pad"];
            setOpts.unitWidth = 0;
            var watchDatas = setOpts.watchDatas = [];
            watchDatas.push(["directName", "gr.paraSet." + preText + "ChFiberDelay", "editValue", 1]);
            setOptss.push(setOpts);
            //========
            var setOpts = sopt.getParaSetOpts({paraSetName: preText + "ChRfDelay", titleWidth: 200, titleFontSize: "0.4rh"});
            //setOpts.actButtons = ["pad"];
            setOpts.unitWidth = 0;
            var watchDatas = setOpts.watchDatas = [];
            watchDatas.push(["directName", "gr.paraSet." + preText + "ChRfDelay", "editValue", 1]);
            setOptss.push(setOpts);
            //================





            var setOpts = sopt.getView({title: "1588修正時間:", titleWidth: 200, "unitWidth": 50, unit: "6.25ns", value: ""});
            var watchDatas = setOpts.watchDatas = [];
            watchDatas.push(["directName", watchReg0 + "[2]", "editValue", 1]);
            setOptss.push(setOpts);
            //=================


            var setOpts = sopt.getParaSetOpts({paraSetName: preText + "ChRfTxCh", titleWidth: 200, titleFontSize: "0.4rh"});
            //setOpts.actButtons = ["pad"];
            var watchDatas = setOpts.watchDatas = [];
            watchDatas.push(["directName", "gr.paraSet." + preText + "ChRfTxCh", "editValue", 1]);
            setOptss.push(setOpts);

            var setOpts = sopt.getParaSetOpts({paraSetName: preText + "ChRfRxCh", titleWidth: 200, titleFontSize: "0.4rh"});
            //setOpts.actButtons = ["pad"];
            var watchDatas = setOpts.watchDatas = [];
            watchDatas.push(["directName", "gr.paraSet." + preText + "ChRfRxCh", "editValue", 1]);
            setOptss.push(setOpts);

            //================
            var setOpts = sopt.getView({title: "封包發送數:", titleWidth: 200, value: ""});
            var watchDatas = setOpts.watchDatas = [];
            watchDatas.push(["directName", watchReg0 + "[3]", "editValue", 1]);
            setOptss.push(setOpts);
            //=================
            var setOpts = sopt.getView({title: "封包正確率:", titleWidth: 200, value: ""});
            var watchDatas = setOpts.watchDatas = [];
            watchDatas.push(["directName", watchReg0 + "[4]", "editValue", 1]);
            setOptss.push(setOpts);
            //=================

            /*
             var setOpts = sopt.getView({title: "主控RF接收能量:", titleWidth: 180, "unitWidth": 50, unit: "DB", value: ""});
             var watchDatas = setOpts.watchDatas = [];
             watchDatas.push(["directName", watchReg0 + "[5]", "editValue", 1]);
             setOptss.push(setOpts);
             //=================
             var setOpts = sopt.getView({title: "副控RF接收能量:", titleWidth: 180, "unitWidth": 50, unit: "DB", value: ""});
             var watchDatas = setOpts.watchDatas = [];
             watchDatas.push(["directName", watchReg0 + "[6]", "editValue", 1]);
             setOptss.push(setOpts);
             */

        };
        var cname = lyMaps["centerBody"] + "~" + 0;
        var opts = {};
        opts.title = "副控1";
        opts.deviceInx = 0;
        targFunc(opts);
        blocks[cname] = {name: "syncPanel#0", type: "Model~MdaSetGroup~base.sys0", opts: opts};
        var cname = lyMaps["centerBody"] + "~" + 1;
        var opts = {};
        opts.deviceInx = 1;
        opts.title = "副控2";
        targFunc(opts);
        blocks[cname] = {name: "syncPanel#1", type: "Model~MdaSetGroup~base.sys0", opts: opts};

        /*
         var cname = lyMaps["mainBody"] + "~" + 3;
         var opts = {};
         opts.buttons = ["傳輸開始", "傳輸停止", "邏輯分析", "波形顯示"];
         opts.buttonIds = ["location", "selfTest", "sync", "setting"];
         opts.actionFunc = function (iobj) {
         if (iobj.buttonId === "location") {
         gr.appType = "Model~LocationTarget~base.sys0";
         sys.dispWebPage();
         return;
         }
         if (iobj.buttonId === "selfTest") {
         gr.appType = "Model~SelfTest~base.sys0";
         sys.dispWebPage();
         return;
         }
         if (iobj.buttonId === "sync") {
         gr.appType = "Model~SyncTest~base.sys0";
         sys.dispWebPage();
         return;
         }
         };
         opts.buttonAmt = 4;
         blocks[cname] = {name: "headButtons", type: "Model~MdaButtons~base.sys0", opts: opts};
         */
    }
}
class StatusBar {
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);
        this.subTypeOpts(opts);
        opts.title = "title";
        opts.borderWidth = 1;
        opts.xm = 30;
        opts.baseColor = "#ccc";
        opts.headBar_f = 0;
        opts.itemTypes = ["check", "label", "led", "led", "led", "view", "view", "view", "view", "view", "view", "button"];
        //opts.xArr = [40, 50, 40, 40, 40, 58, 58, 58, 58, 58, 58, 9999];
        //
        opts.xArr = ["0.08rw", "0.08rw", "0.08rw", "0.08rw", "0.08rw", "0.08rw", "0.08rw", "0.08rw", "0.08rw", "0.08rw", "0.12rw", 9999];
        opts.itemValues = [0, "1-1", 0, 0, 0, "123", "4.6", "1.2", "30", "19", "28", '<i class="gf">&#xe8b8;</i>'];
        opts.itemTitles = ["", "編號", "故障", "50V", "32V", "50V<br>電壓", "50V<br>電流", "50V<br>溫度", "32V<br>電壓", "32V<br>電流", "32V<br>溫度", "設定"];
        opts.itemWatch = {};
        return opts;
    }
    subTypeOpts(opts) {
        if (this.md.subType === "base.sys0") {
        }
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
        var actionPrg = function (iobj) {
            console.log(iobj);
        };
        //======================================    
        var cname = "c";
        var opts = {};
        md.setPns(opts);
        layouts[cname] = {name: cname, type: "Layout~Ly_base~array.sys0", opts: opts};
        lyMaps["body"] = cname;
        //======================================    
        var opts = {};
        md.setPns(opts);
        blocks[cname] = {name: "basePanel", type: "Component~Cp_base~plate.sys0", opts: opts};
        //======================================    
        var cname = lyMaps["body"] + "~" + 0;
        var opts = {};
        opts.xArr = op.xArr;
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["mainBody"] = cname;

        for (var i = 0; i < op.itemTypes.length; i++) {
            var cname = lyMaps["mainBody"] + "~" + i;
            var opts = {};
            if (op.headBar_f) {
                opts.innerText = op.itemTitles[i];
                opts.fontSize = 14;
                opts.tpd = 4;
                opts.bpd = 2;
                opts.baseColor = op.baseColor;
                blocks[cname] = {name: "item#" + i, type: "Component~Cp_base~label.sys0", opts: opts};
                continue;
            }
            if (op.itemTypes[i] === "check") {
                opts.baseColor = op.baseColor;
                opts.checked_f = op.itemValues[i];
                opts.innerText = "";
                opts.checkBoxWidth = 20;
                opts.readOnly_f = 1;
                var watchReg = op.itemWatch["c" + i + "#0"];
                if (watchReg)
                    md.setInputWatch(opts, "directReg", watchReg, "checked_f", 1);
                blocks[cname] = {name: "item#" + i, type: "Component~Cp_base~checkBox.sys0", opts: opts};
            }
            if (op.itemTypes[i] === "label") {
                opts.innerText = op.itemValues[i];
                opts.fontSize = "0.4rh";
                opts.baseColor = op.baseColor;
                var watchReg = op.itemWatch["c" + i + "#0"];
                if (watchReg)
                    md.setInputWatch(opts, "directReg", watchReg, "baseColor", 1);
                blocks[cname] = {name: "item#" + i, type: "Component~Cp_base~label.sys0", opts: opts};
            }
            if (op.itemTypes[i] === "button") {
                opts.innerText = op.itemValues[i];
                opts.actionFunc = op.actionFunc;
                blocks[cname] = {name: "item#" + i, type: "Component~Cp_base~button.sys0", opts: opts};
            }
            if (op.itemTypes[i] === "led") {
                opts.fontSize = "0.5rh";
                opts.iw = 30;
                opts.ih = 30;
                opts.blackgroundInx = op.itemValues[i];
                var watchReg = op.itemWatch["c" + i + "#0"];
                if (watchReg)
                    md.setInputWatch(opts, "directReg", watchReg, "backgroundInx", 1);

                blocks[cname] = {name: "item#" + i, type: "Component~Cp_base~icons.led", opts: opts};
            }
            if (op.itemTypes[i] === "view") {
                opts.innerText = op.itemValues[i];
                opts.fontSize = "0.5rh";
                var watchReg = op.itemWatch["c" + i + "#0"];
                if (watchReg)
                    md.setInputWatch(opts, "directReg", watchReg, "innerText", 1);
                var watchReg = op.itemWatch["c" + i + "#1"];
                if (watchReg)
                    md.setInputWatch(opts, "directReg", watchReg, "baseColor", 1);
                blocks[cname] = {name: "item#" + i, type: "Component~Cp_base~label.view", opts: opts};
            }

        }

        //==============================
    }
}
//==================================================
class DummyTargetCtr {
    constructor() {
        gr.hideWavePageElem = null;
        gr.socketRetPrgTbl["tick"] = function (radarData) {
            var keys = Object.keys(radarData);
            for (var i = 0; i < keys.length; i++) {
                var strA = keys[i].split("#");
                if (strA.length === 1) {
                    gr.radarData[keys[i]] = radarData[keys[i]];
                    continue;
                }
                if (strA.length === 2) {
                    if (strA[0] === "paraSetStr") {
                        var newDatas = radarData[keys[i]];
                        var strC=strA[1].split("~");
                        for(var ii=0;ii<strC.length;ii++)
                            gr.paraSet[strC[ii]] = newDatas[strC[ii]];
                        continue;
                    }
                    var inx0 = KvLib.toInt(strA[1], 0);
                    gr.radarData[strA[0]][inx0] = radarData[keys[i]];
                    continue;
                }
            }
            if (gr.viewDatas_f) {
                for (var i = 0; i < 64; i++) {
                    gr.viewDatas[i] = KvLib.trsIntToHexStrFix(gr.radarData.viewDatas[i]);
                }
                for (var i = 0; i < 6; i++) {
                    gr.viewDatas[i + 64] = KvLib.trsShortToHexStrFix(gr.radarData.ioInA[i]);
                }



            }
            var rd = gr.radarData;
            //rd.pulseFormAddBufA0=[90*1000*2+0,10*1000*2+1];

            if (gr.appId === 2) {
                var wa = gr.radarData.meterValueTextA = ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"];
                var wac = gr.radarData.meterValueColorA = ["#ddd", "#ddd", "#ddd", "#ddd", "#ddd", "#ddd", "#ddd", "#ddd", "#ddd", "#ddd"];
                DummyTargetCtrPane.getMeterStatus(wa, wac);
            }


            if (rd.pulseFormAddBufA0) {
                if (gr.scope) {
                    if (gr.scope.opts.signalMode === 2 && gr.scope.opts.signalModeInx === 0) {
                        var len = rd.pulseFormAddBufA0.length;
                        if (rd.pulseFormAddBufA0.length) {
                            var values = [];
                            for (var i = 0; i < len; i++) {
                                var vv = rd.pulseFormAddBufA0[i];
                                var hf = vv & 1;
                                var tt = ((vv >> 1) * 6.25) | 0;
                                values.push(tt * 2 + hf);
                            }
                            gr.scope.mdClass.addBuf(0, values);
                        }
                    }
                }
            }
            rd.pulseFormAddBufA0 = null;


            if (gr.scope) {
                if (gr.scope.opts.signalMode === 3 && gr.scope.opts.signalModeInx === 0) {
                    for (var i = 0; i < 4; i++) {
                        var values = [];
                        if (i === 0)
                            var vv = gr.radarData.meterValueA[2];
                        if (i === 1)
                            var vv = gr.radarData.meterValueA[3];
                        if (i === 2)
                            var vv = gr.radarData.meterValueA[4];
                        if (i === 3)
                            var vv = gr.radarData.meterValueA[5];
                        if (!vv)
                            vv = 0;
                        values.push(vv);
                        gr.scope.mdClass.addBuf(i, values);
                    }
                }
            }


            if (rd.pulseFormInf) {
                var plow = rd.pulseFormInf[0];
                var phigh = rd.pulseFormInf[1];
                var freq = rd.pulseFormInf[2];
                if (plow & phigh) {
                    var duty = phigh * 100 / (plow + phigh);
                    phigh = (phigh / 160).toFixed(1);
                    duty = duty.toFixed(1);
                    freq = ((freq + 290) / 100).toFixed(2);
                    gr.footBarMessageText = "Width:" + phigh + " us, Duty:" + duty + "%, Freq:" + freq + " GHz";
                    if ((gr.radarData.systemStatus0 >> 25) & 1)
                        gr.footBarMessageColor = "#f00";
                    else
                        gr.footBarMessageColor = "#00f";
                    gr.footBarMessageTime = 20;
                }
            }

            if (gr.degug_f)
                console.log("radarData");

        };
    }
    initOpts(md) {
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


        if (gr.radarData.conRxA) {

            var str = "W";
            str += gr.webSocketConnectCnt & 7;
            str += "U";
            str += gr.radarData.conRxA[24] & 7;
            str += gr.radarData.conRxA[25] & 7;
            str += "P";
            str += gr.radarData.conRxA[16] & 7;
            str += gr.radarData.conRxA[17] & 7;
            str += gr.radarData.conRxA[18] & 7;


            gr.footBarStatus0 = str;

            var str = "SUB:";
            str += gr.radarData.conRxA[0] & 7;
            str += gr.radarData.conRxA[1] & 7;
            str += gr.radarData.conRxA[3] & 7;
            str += " MTR:";
            str += gr.radarData.conRxA[12] & 7;
            str += gr.radarData.conRxA[13] & 7;
            str += gr.radarData.conRxA[15] & 7;
            gr.footBarStatus1 = str;

            var str = "DRA:";
            str += gr.radarData.conRxA[4] & 7;
            str += gr.radarData.conRxA[5] & 7;
            str += gr.radarData.conRxA[7] & 7;
            str += " DRB:";
            str += gr.radarData.conRxA[8] & 7;
            str += gr.radarData.conRxA[9] & 7;
            str += gr.radarData.conRxA[11] & 7;
            gr.footBarStatus2 = str;


        }
        return;



    }
    actionFunc(iobj) {
        console.log(iobj);
        if (iobj.act === "mouseClick") {

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
        opts.yArr = [50, 70, 9999];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["mainBody"] = cname;
        //==============================
        var cname = lyMaps["mainBody"] + "~" + 0;
        var opts = {};
        opts.innerText = "發射機中央控制";
        blocks[cname] = {name: "basePanel", type: "Component~Cp_base~label.title", opts: opts};
        //==============================
        var cname = lyMaps["mainBody"] + "~" + 1;
        var opts = {};
        opts.buttons = ["自測", "發射機狀態", "電源狀態", "放大器狀態", "波形", "設定"];
        opts.buttonIds = ["selfTest", "radarStatus", "powerStatus", "sspaStatus", "wave", "setting"];
        opts.fontSize = "0.5rh";
        opts.xm = 4;


        opts.actionFunc = function (iobj) {
            console.log(iobj);
            var escPrg = function (iobj) {
                console.log(iobj);
                if (iobj.act === "esc") {
                    MdaPopWin.popOffTo(iobj.sender.opts.popStackCnt);
                    return;
                }
                if (iobj.act === "mouseClick" && iobj.kvObj.opts.itemId === "esc") {
                    MdaPopWin.popOff(2);
                    return;
                }
            };


            if (iobj.buttonId === "selfTest") {
                var opts = {};
                opts.actionFunc = escPrg;
                kvObj = new Block("selfTest", "Model~SelfTest~base.sys0", opts);
                var mesObj = mda.popObj(0, 0, kvObj);
                return;
            }
            if (iobj.buttonId === "radarStatus") {
                var opts = {};
                opts.actionFunc = escPrg;
                var kvObj = new Block("location", "Model~CtrRadarStatus~base.sys0", opts);
                var mesObj = mda.popObj(0, 0, kvObj);
                return;
            }
            if (iobj.buttonId === "powerStatus") {
                var opts = {};
                opts.actionFunc = escPrg;
                var kvObj = new Block("location", "Model~CtrSspaPowerStatus~base.sys0", opts);
                var mesObj = mda.popObj(0, 0, kvObj);
                return;
            }
            if (iobj.buttonId === "sspaStatus") {
                var opts = {};
                opts.actionFunc = escPrg;
                var kvObj = new Block("location", "Model~CtrSspaModuleStatus~base.sys0", opts);
                var mesObj = mda.popObj(0, 0, kvObj);
                return;
            }


            if (iobj.buttonId === "wave") {
                var opts = {};
                opts.actionFunc = function (iobj) {
                    console.log(iobj);
                    if (iobj.act === "esc") {
                        var kvObj = iobj.sender;
                        if (!kvObj.opts.signalMode) {
                            gr.hideWavePageElem = null;
                            gr.wavePageObj = null;
                            MdaPopWin.popOffTo(kvObj.opts.popStackCnt);
                            return;
                        }
                        var basePanel = kvObj.fatherMd.blockRefs["basePanel#" + kvObj.opts.popStackCnt];
                        var elem = basePanel.elems["base"];
                        elem.style.visibility = "hidden";
                        gr.hideWavePageElem = elem;
                        gr.wavePageObj = kvObj;
                        return;
                    }
                };
                if (gr.hideWavePageElem) {
                    gr.hideWavePageElem.style.visibility = "visible";
                    return;
                }
                var kvObj = new Block("scope", "Model~MyNewScope~base.sys0", opts);
                opts.kvObj = kvObj;
                gr.scope = kvObj;

                kvObj.opts.popStackCnt = gr.mdSystem.mdClass.stackCnt;
                MdaPopWin.popObj(opts);
                return;
            }

            if (iobj.buttonId === "setting") {
                DummyTargetMaster.paraSetPrg();
                return;
                var opts = {};
                opts.title = "輸入密碼";
                opts.setOpts = sopt.getIntPassword({});
                opts.actionFunc = function (iobj) {

                    var yes_f = 0;
                    if (iobj.inputText === "16020039") {
                        yes_f = 1;
                    }
                    if (iobj.inputText === gr.paraSet.paraSetPassword) {
                        yes_f = 1;
                    }
                    yes_f = 1;
                    if (!yes_f) {
                        console.log(iobj);
                        var opts = {};
                        opts.kvTexts = ["密碼錯誤"];
                        box.errorBox(opts);
                        return;
                    }
                    MdaPopWin.popOff(2);
                    DummyTargetMaster.paraSetPrg();
                };
                box.intPadBox(opts);
            }



        };
        opts.buttonAmt = 6;
        blocks[cname] = {name: "headButtons", type: "Model~MdaButtons~base.sys0", opts: opts};
        //==============================
        var cname = lyMaps["mainBody"] + "~" + 2;
        var opts = {};
        opts.xArr = [0, 9999];
        opts.xm = 0;
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["downBody"] = cname;
        //==============================
        var cname = lyMaps["downBody"] + "~" + 0;
        var opts = {};
        opts.yc = 2;
        opts.ym = 10;
        opts.margin = 0;
        layouts[cname] = {name: cname, type: "Layout~Ly_base~array.sys0", opts: opts};
        lyMaps["leftBody"] = cname;
        //==============================
        //==============================
        //==============================
        var cname = lyMaps["downBody"] + "~" + 1;
        var opts = {};
        opts.title = "";
        opts.actionFunc = self.actionFunc;
        opts.baseColor = "#222";
        blocks[cname] = {name: "subRadarPane", type: "Model~DummyTargetCtrPane~base.sys0", opts: opts};
        //==============================



    }
}
class DummyTargetCtrPane {
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);
        this.subTypeOpts(opts);
        opts.title = "title";
        opts.buttonColor = "#ccf";
        opts.buttons = ["button1", "button2", "button3"];
        opts.layoutType = "row"; //row,collum,array
        opts.buttonIds = [];
        opts.iw = 9999;
        opts.ih = 9999;
        opts.borderWidth = 1;
        opts.xm = 30;
        opts.baseColor = "#222";
        return opts;
    }
    subTypeOpts(opts) {
        if (this.md.subType === "base.sys0") {
        }
    }
    static getMeterStatus() {
        var daInx = 0;
        var preText = "ctr1";
        var rd = gr.radarData;
        var da = gr.radarData.meterStatusAA;
        var wa = gr.radarData.meterValueTextA = ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"];
        var wac = gr.radarData.meterValueColorA = ["#ddd", "#ddd", "#ddd", "#ddd", "#ddd", "#ddd", "#ddd", "#ddd", "#ddd", "#ddd"];
        var wv = gr.radarData.meterValueA = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        //======================================
        var prg = function (data, name, fixed, dinx) {
            if (data <= 0 || data > 1000)
                return["", "#ddd", 0];
            data = 1000 - data;
            var value = (data - gr.paraSet[preText + name + "Offs"]) * gr.paraSet[preText + name + "Gain"];
            if (value < gr.paraSet[preText + name + "Zero"])
                value = 0;
            else {
                var att = 0;
                if (gr.paraSet[preText + name + "Att"])
                    att = gr.paraSet[preText + name + "Att"];
                value += att;
            }
            //========================================
            if (dinx !== undefined) {
                var rd = gr.radarData;
                rd.meterFiterAA[dinx][rd.meterFiterInxA[dinx]] = value;
                var inx = rd.meterFiterInxA[dinx];
                rd.meterFiterInxA[dinx] += 1;
                if (rd.meterFiterInxA[dinx] >= 256)
                    rd.meterFiterInxA[dinx] = 0;
                var filterLen = gr.paraSet[preText + name + "Filter"];
                var sum = 0;
                for (var i = 0; i < filterLen; i++) {
                    inx &= 255;
                    sum += rd.meterFiterAA[dinx][inx];
                    inx--;
                }
                value = sum / filterLen;
                var delayLen = 10;
                if (rd.meterPreValueA[dinx] < value) {
                    rd.meterDelayCntA[dinx]++;
                    if (rd.meterDelayCntA[dinx] >= delayLen) {
                        rd.meterDelayCntA[dinx] = 0;
                        rd.meterPreValueA[dinx] += 0.1;
                    }
                } else if (rd.meterPreValueA[dinx] > value) {
                    rd.meterDelayCntA[dinx]++;
                    if (rd.meterDelayCntA[dinx] >= delayLen) {
                        rd.meterDelayCntA[dinx] = 0;
                        rd.meterPreValueA[dinx] -= 0.1;
                    }
                } else {
                    rd.meterDelayCntA[dinx] = 0;
                }
                var sumV = rd.meterPreValueA[dinx];


            }
            //========================================
            var valueStr = "" + value.toFixed(fixed);
            var valueColor = "#ddd";
            if (value < gr.paraSet[preText + name + "LimD"] && value !== 0)
                valueColor = "#fcf";
            if (value >= gr.paraSet[preText + name + "LimD"])
                valueColor = "#cfc";
            if (value > gr.paraSet[preText + name + "LimU"])
                valueColor = "#fcc";
            return [valueStr, valueColor, value];
        };
        //======================================
        var va = prg(da[0], "InRfpow", 1, 0);
        wa[0] = va[0];
        wac[0] = va[1];
        wv[0] = va[2];
        //======================================
        //======================================
        var va = prg(da[1], "PreAmpOutRfpow", 1, 2);
        wa[2] = va[0];
        wac[2] = va[1];
        wv[2] = va[2];
        //======================================
        var va = prg(da[2], "DriverAmpOutRfpow", 1, 3);
        wa[3] = va[0];
        wac[3] = va[1];
        wv[3] = va[2];
        //======================================
        var va = prg(da[3], "CwAmpOutRfpow", 1, 4);
        wa[4] = va[0];
        wac[4] = va[1];
        wv[4] = va[2];
        //======================================
        var va = prg(da[4], "CcwAmpOutRfpow", 1, 5);
        wa[5] = va[0];
        wac[5] = va[1];
        wv[5] = va[2];
        //======================================
        var cur = 0;
        for (var i = 0; i < 36; i++) {
            var value = gr.radarData["sspaPowerV32iAA"][i];
            value -= gr.paraSet[preText + "SspaPowerV32iOffs"];
            value *= gr.paraSet[preText + "SspaPowerV32iGain"];
            if (value < 0)
                value = 0;
            cur += value;
        }
        wa[9] = "" + cur.toFixed(1);
        if (cur > (gr.paraSet[preText + "SspaPowerV32iZero"] * 36))
            wac[9] = "#cfc";
        if (cur > gr.paraSet[preText + "SspaPowerAllV32iLimU"])
            wac[9] = "#fcc";
        wv[9] = cur;

    }
    chkWatch() {
        var self = this;
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        var wa = md.stas.meterStatusA = ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"];
        var wac = md.stas.meterColorA = ["#ddd", "#ddd", "#ddd", "#ddd", "#ddd", "#ddd", "#ddd", "#ddd", "#ddd", "#ddd"];


        var wb = md.stas.ledStatusA = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        var wc = md.stas.buttonColorA = ["#888", "#888", "#888", "#888"];
        var wd = md.stas.selectValueA = [0, 0, 0, 0];
        var preText = "ctr1";
        var sysStatus = gr.radarData.systemStatus0 & 3;
        wb[0] = 0;
        if (sysStatus === 1) {//system warn up
            if (gr.flash_f)
                wb[0] = 0;
            else
                wb[0] = 1;
        }
        if (sysStatus === 2)//system ready
            wb[0] = 1;
        if (sysStatus === 3)//system error
            wb[0] = 2;
        //=====================================
        var preRfIn = (gr.radarData.systemStatus0 >> 22) & 1;
        wb[1] = preRfIn;
        //=====================================
        var enviErr = (gr.radarData.systemStatus1 >> 7) & 1;
        var powerErr = (gr.radarData.systemStatus1 >> 8) & 1;
        var moduleErr = (gr.radarData.systemStatus1 >> 9) & 1;
        var pulseWidthErr = (gr.radarData.systemStatus1 >> 10) & 1;
        var pulseDutyErr = (gr.radarData.systemStatus1 >> 11) & 1;


        var sspaPowerStatusA = gr.radarData.sspaPowerStatusAA;
        var sspaModuleStatusA = gr.radarData.sspaModuleStatusAA;
        var powerOn_f = 0;
        for (var i = 0; i < 36; i++) {
            if ((sspaPowerStatusA[i] >> 4) & 1)
                powerOn_f = 1;
        }
        var moduleOn_f = 0;
        for (var i = 0; i < 36; i++) {
            if ((sspaModuleStatusA[i] >> 1) & 1)
                moduleOn_f = 1;
        }
        moduleOn_f = (gr.radarData.systemStatus0 >> 24) & 1;

        var pulseErr = pulseWidthErr | pulseDutyErr;
        wb[2] = enviErr + 1;//envi status
        wb[3] = powerErr + 1;//power status
        wb[4] = moduleErr + 1;//sspa status
        wb[5] = pulseErr + 1;
        if (sysStatus <= 1) {
            wb[2] = 0;
            wb[3] = 0;
            wb[4] = 0;
            wb[5] = 0;
        }

        //=====================================
        if (powerOn_f)
            wc[0] = "#ffc";
        //
        if (moduleOn_f)
            wc[1] = "#ffc";
        //
        var radiationOn = (gr.radarData.systemStatus0 >> 25) & 1;
        if (radiationOn)
            wc[2] = "#ffc";
        //=====
        var emergencyOn = (gr.radarData.systemStatus0 >> 26) & 1;
        if (emergencyOn)
            wc[3] = "#fcc";

        /*    
         var remoteLocal = (gr.radarData.systemStatus1 >> 26) & 1;
         wd[0] = remoteLocal;
         var loadType = (gr.radarData.systemStatus1 >> 20) & 1;
         wd[1] = loadType;
         */
        wd[2] = gr.paraSet["ctr1TxLoad"];
        wd[3] = gr.paraSet["ctr1BatShort"];

        //wd[2] = (gr.radarData.systemStatus1 >> 20) & 1;
        //wd[3] = (gr.radarData.systemStatus1 >> 22) & 1;

        mac.messageEditor(md);
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
        var actionPrg = function (iobj) {
            console.log(iobj);
            if (iobj.kvObj.name === "clrButton") {
                var kvObj = md.blockRefs["editor"];
                if (!kvObj)
                    return;
                var editor = kvObj.objs["editor"];
                KvLib.clearEditorMaker(editor);
                editor.getSession().setValue("");
                return;
            }

            iobj.sender = md;
            iobj.keyId = md.name + iobj.kvObj.name;
            KvLib.exe(op.actionFunc, iobj);
        };
        //======================================    
        var cname = "c";
        var opts = {};
        md.setPns(opts);
        layouts[cname] = {name: cname, type: "Layout~Ly_base~array.sys0", opts: opts};
        lyMaps["body"] = cname;
        //======================================    
        var opts = {};
        md.setPns(opts);
        blocks[cname] = {name: "basePanel", type: "Component~Cp_base~plate.sys0", opts: opts};
        //======================================    
        var cname = lyMaps["body"] + "~" + 0;
        var opts = {};
        opts.margin = 6;
        opts.xm = 10;
        opts.ym = 4;
        opts.yArr = [0, 120, 90, 100, 100, 9999, 20];
        var rw0 = (1 / 6).toFixed(3) + "rw";
        var rw1 = (1 / 4).toFixed(3) + "rw";
        var rw2 = (1 / 3).toFixed(3) + "rw";
        var rw3 = (1 / 5).toFixed(3) + "rw";
        opts.xyArr = [
            [9999],
            [rw1, rw1, rw1, rw1],
            [rw0, rw0, rw0, rw0, rw0, rw0],
            [rw1, rw1, rw1, rw1],
            [rw1, rw1, rw1, rw1],
            [9999, 140],
            [9999],
            ["0.1rw", 9999],
            [9999]
        ];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["mainBody"] = cname;
        //===================================
        var lyInx = 0;
        //var opts = {};
        //opts.innerText = op.title;
        //blocks[cname] = {name: "basePanel", type: "Component~Cp_base~label.title", opts: opts};
        lyInx++;
        //==============================

        var actionPrg = function (iobj) {
            console.log(iobj);
            var preText = "ctr1";
            var radiationOn = (gr.radarData.systemStatus0 >> 25) & 1;
            if (iobj.act === "actButtonClick") {
                var inx = KvLib.toInt(iobj.sender.name.split('#')[1], -1);
                if (inx === 16) {
                    if (radiationOn)
                        gr.gbcs.command({'act': preText + "RadiationOff"});
                    else {
                        gr.gbcs.command({'act': preText + "RadiationOn", "paras": [252]});
                    }
                    return;






                    if (gr.paraSet[preText + "PulseSource"] === 0) {
                        if (radiationOn)
                            gr.gbcs.command({'act': preText + "RadiationOff"});
                        else {
                            if (gr.paraSet["emuSpSignal"] === 1)
                                gr.gbcs.command({'act': preText + "RadiationOn", "paras": [253]});//puse from emusp
                            else
                                gr.gbcs.command({'act': preText + "RadiationOn", "paras": [254]});// puse frome sp
                        }
                        return;
                    }


                }



                if (inx === 14) {
                    gr.gbcs.command({'act': preText + "AllSspaPowerOnOff"});
                    return;
                }
                if (inx === 15) {
                    gr.gbcs.command({'act': preText + "AllSspaModuleOnOff"});
                    return;
                }
                if (inx === 16) {
                    gr.gbcs.command({'act': preText + "RadiationOnOff"});
                    return;
                }
                if (inx === 17) {
                    gr.gbcs.command({'act': preText + "EmergencyOnOff"});
                    return;
                }
                return;
            }
            if (iobj.act === "mouseClick") {
                var inx = KvLib.toInt(iobj.sender.name.split('#')[1], -1);
                if (inx === 10) {
                    mac.saveParaSet(preText + "Remote", iobj.buttonInx);
                    return;
                }
                if (inx === 11) {
                    if (gr.paraSet[preText + "PulseSource"] === 1 && iobj.buttonInx === 1) {
                        var opts = {};
                        opts.title = iobj.buttonText;
                        opts.xc = 2;
                        opts.yc = 17;
                        opts.w = 1000;
                        opts.fontSize = "0.5rh";
                        opts.kvTexts = [];
                        var selectNo = [];

                        for (var i = 0; i < gr.paraSet.localPulseGenParas.length; i++) {
                            var strA = gr.paraSet.localPulseGenParas[i].split(" ");
                            if (strA[0] === "0")
                                continue;
                            var inx = KvLib.toInt(strA[1], 0);
                            var pw = gr.paraSet.localPulseWidthParas[inx];
                            var str = pw + "us ";
                            str += strA[2] + "% ";
                            str += strA[3] + "GHz ";
                            str += "X" + strA[4];
                            selectNo.push(i);
                            opts.kvTexts.push(str);
                        }
                        opts.kvTexts.push("隨機脈波");
                        opts.kvTexts.push("停止");
                        opts.actionFunc = function (iobj) {
                            console.log(iobj);
                            MdaPopWin.popOff(2);
                            if (iobj.act === "selected") {
                                if (iobj.selectText === "隨機脈波") {
                                    gr.gbcs.command({'act': preText + "RadiationOn", "paras": [255]});
                                    return;

                                }
                                if (iobj.selectText === "停止") {
                                    gr.gbcs.command({'act': preText + "RadiationOn", "paras": [251]});//stop
                                    return;
                                }
                                strA = iobj.selectText.split(" ");
                                var str = strA[0].slice(0, strA[0].length - 2);
                                var pulseWidth = KvLib.strToFloat(str, 100);
                                var pw = Math.round(pulseWidth * 1000);
                                var str = strA[1].slice(0, strA[1].length - 1);
                                var duty = KvLib.strToFloat(str, 5);
                                var pri = Math.round(pw * 100 / duty);
                                gr.gbcs.command({'act': preText + "RadiationOn", "paras": [selectNo[iobj.selectInx]]});
                                return;
                            }

                        };
                        var len = Math.round(opts.kvTexts.length / 2) + 1;
                        opts.h = len * 50;

                        opts.margin = 4;
                        opts.ym = 4;
                        opts.eh = 30;
                        opts.exm = 20;
                        opts.eym = 4;


                        box.selectBox(opts);
                        return;

                    }
                    mac.saveParaSet(preText + "PulseSource", iobj.buttonInx);
                    return;
                }
                if (inx === 12) {
                    mac.saveParaSet(preText + "TxLoad", iobj.buttonInx);
                    return;
                }
                if (inx === 13) {
                    mac.saveParaSet(preText + "BatShort", iobj.buttonInx);
                    return;
                }
                return;
            }

        };

        var preText = "ctr1";
        for (var i = 0; i < 18; i++) {
            var cname = lyMaps["mainBody"] + "~" + lyInx++;
            var opts = {};
            opts.setOptss = [];
            var inx = 0;
            var regName = "gr.radarData.meterValueTextA";
            var regName1 = "gr.radarData.meterValueColorA";


            if (i === inx++) {
                opts.title = "輸入功率";
                var setOpts = opts.setOpts = sopt.getOptsPara("lcdView");
                setOpts.value = "";//
                var watchDatas = setOpts.watchDatas = [];
                watchDatas.push(["directReg", regName + "#0", "innerText", 1]);
                watchDatas.push(["directReg", regName1 + "#0", "innerTextColor", 1]);
            }
            if (i === inx++) {
                opts.title = "順向輸出功率";
                var setOpts = opts.setOpts = sopt.getOptsPara("lcdView");
                setOpts.value = "";//
                var watchDatas = setOpts.watchDatas = [];
                watchDatas.push(["directReg", regName + "#4", "innerText", 1]);
                watchDatas.push(["directReg", regName1 + "#4", "innerTextColor", 1]);
            }
            if (i === inx++) {
                opts.title = "反向輸出功率";
                var setOpts = opts.setOpts = sopt.getOptsPara("lcdView");
                setOpts.value = "";//
                var watchDatas = setOpts.watchDatas = [];
                watchDatas.push(["directReg", regName + "#5", "innerText", 1]);
                watchDatas.push(["directReg", regName1 + "#5", "innerTextColor", 1]);
            }
            if (i === inx++) {
                opts.title = "放大器電源總電流";
                var setOpts = opts.setOpts = sopt.getOptsPara("lcdView");
                setOpts.value = "";//
                setOpts.fontSize = "1.2rh";
                var watchDatas = setOpts.watchDatas = [];
                watchDatas.push(["directReg", regName + "#9", "innerText", 1]);
                watchDatas.push(["directReg", regName1 + "#9", "innerTextColor", 1]);
            }
            var regName = "self.fatherMd.fatherMd.fatherMd.stas.ledStatusA";
            if (i === inx++) {
                opts.title = "系統狀態";
                var setOpts = opts.setOpts = sopt.getOptsPara("led");
                var watchDatas = setOpts.watchDatas = [];
                watchDatas.push(["directReg", regName + "#0", "backgroundInx", 1]);
                opts.setOptss.push(setOpts);
                blocks[cname] = {name: "positionPanel", type: "Model~MdaSetGroup~base.sys0", opts: opts};
                continue;
            }
            if (i === inx++) {
                opts.title = "脈波輸入狀態";
                var setOpts = opts.setOpts = sopt.getOptsPara("led");
                var watchDatas = setOpts.watchDatas = [];
                watchDatas.push(["directReg", regName + "#1", "backgroundInx", 1]);
                opts.setOptss.push(setOpts);
                blocks[cname] = {name: "positionPanel", type: "Model~MdaSetGroup~base.sys0", opts: opts};
                continue;
            }
            if (i === inx++) {
                opts.title = "環控狀態";
                var setOpts = opts.setOpts = sopt.getOptsPara("led");
                var watchDatas = setOpts.watchDatas = [];
                watchDatas.push(["directReg", regName + "#2", "backgroundInx", 1]);
                opts.setOptss.push(setOpts);
                blocks[cname] = {name: "positionPanel", type: "Model~MdaSetGroup~base.sys0", opts: opts};
                continue;
            }
            if (i === inx++) {
                opts.title = "SSPA電源";
                var setOpts = opts.setOpts = sopt.getOptsPara("led");
                var watchDatas = setOpts.watchDatas = [];
                watchDatas.push(["directReg", regName + "#3", "backgroundInx", 1]);
                opts.setOptss.push(setOpts);
                blocks[cname] = {name: "positionPanel", type: "Model~MdaSetGroup~base.sys0", opts: opts};
                continue;
            }
            if (i === inx++) {
                opts.title = "SSPA狀態";
                var setOpts = opts.setOpts = sopt.getOptsPara("led");
                var watchDatas = setOpts.watchDatas = [];
                watchDatas.push(["directReg", regName + "#4", "backgroundInx", 1]);
                opts.setOptss.push(setOpts);
                blocks[cname] = {name: "positionPanel", type: "Model~MdaSetGroup~base.sys0", opts: opts};
                continue;
            }
            if (i === inx++) {
                opts.title = "脈波狀態";
                var setOpts = opts.setOpts = sopt.getOptsPara("led");
                var watchDatas = setOpts.watchDatas = [];
                watchDatas.push(["directReg", regName + "#5", "backgroundInx", 1]);
                opts.setOptss.push(setOpts);
                blocks[cname] = {name: "positionPanel", type: "Model~MdaSetGroup~base.sys0", opts: opts};
                continue;
            }
            preText = "ctr1";

            if (i === inx++) {
                var setOpts = opts.setOpts = sopt.getOptsPara("buttonSelect");
                var para = sopt.getParaSetOpts({paraSetName: preText + "Remote", titleWidth: 0, titleFontSize: "0.5rh"});
                opts.title = "遠端控制";
                setOpts.enum = para.enum;
                setOpts.value = para.value;
                setOpts.fontSize = "0.4rh";

            }

            if (i === inx++) {
                var setOpts = opts.setOpts = sopt.getOptsPara("buttonSelect");
                var para = sopt.getParaSetOpts({paraSetName: preText + "PulseSource", titleWidth: 0, titleFontSize: "0.5rh"});
                opts.title = "脈波來源";
                setOpts.fontSize = "0.5rh";
                setOpts.enum = ["遙控脈波", "本機脈波"];
                //var regName = "self.fatherMd.fatherMd.stas.selectValueA";
                //var watchDatas = setOpts.watchDatas = [];
                //watchDatas.push(["directReg", regName + "#0", "value", 1]);
                setOpts.value = para.value;
                setOpts.fontSize = "0.4rh";
            }

            /*
             if (i === inx++) {
             var setOpts = opts.setOpts = sopt.getOptsPara("buttonSelect");
             var para = sopt.getParaSetOpts({paraSetName:  + "ctr1TxLoad", titleWidth: 0, titleFontSize: "0.5rh"});
             opts.title = "輸出裝置";
             setOpts.enum = para.enum;
             setOpts.enumColors = ["#eef", "#ffc"];
             setOpts.value = para.value;
             setOpts.id = preText + "TxLoad";
             var watchDatas = setOpts.watchDatas = [];
             watchDatas.push(["directReg", regName1 + "#2", "setOpts.value", 1]);
             setOpts.actViewNone_f = 1;
             }
             if (i === inx++) {
             var setOpts = opts.setOpts = sopt.getOptsPara("buttonSelect");
             var para = sopt.getParaSetOpts({paraSetName:  "ctr1BatShort", titleWidth: 0, titleFontSize: "0.5rh"});
             opts.title = "戰備短路";
             setOpts.enum = para.enum;
             setOpts.enumColors = ["#eef", "#ffc"];
             setOpts.value = para.value;
             setOpts.id = preText + "BatShort";
             var watchDatas = setOpts.watchDatas = [];
             watchDatas.push(["directReg", regName1 + "#3", "setOpts.value", 1]);
             setOpts.actViewNone_f = 1;
             }
             */


            var regName = "self.fatherMd.fatherMd.stas.selectValueA";
            if (i === inx++) {
                var setOpts = opts.setOpts = sopt.getOptsPara("buttonSelect");
                var para = sopt.getParaSetOpts({paraSetName: preText + "TxLoad", titleWidth: 0, titleFontSize: "0.5rh"});
                opts.title = "輸出裝置";
                setOpts.enum = para.enum;
                setOpts.enumColors = ["#eef", "#ffc"];
                setOpts.value = para.value;
                setOpts.fontSize = "0.4rh";
                setOpts.id = preText + "TxLoad";



                var watchDatas = setOpts.watchDatas = [];
                watchDatas.push(["directReg", regName + "#2", "setOpts.value", 1]);
                setOpts.actViewNone_f = 1;


                //var regName = "self.fatherMd.stas.selectValueA";
                //md.setInputWatch(opts, "directReg", regName + "#2", "setOpts.value", 1);


            }
            if (i === inx++) {
                var setOpts = opts.setOpts = sopt.getOptsPara("buttonSelect");
                var para = sopt.getParaSetOpts({paraSetName: preText + "BatShort", titleWidth: 0, titleFontSize: "0.5rh"});
                opts.title = "戰備短路";
                setOpts.enum = para.enum;
                setOpts.enumColors = ["#eef", "#ffc"];
                setOpts.value = para.value;
                setOpts.fontSize = "0.4rh";
                setOpts.id = preText + "TxLoad";
                var watchDatas = setOpts.watchDatas = [];
                watchDatas.push(["directReg", regName + "#3", "setOpts.value", 1]);
                setOpts.actViewNone_f = 1;
            }


            var regName = "self.fatherMd.fatherMd.fatherMd.stas.buttonColorA";
            if (i === inx++) {
                var setOpts = opts.setOpts = sopt.getOptsPara("button");
                opts.title = "放大器電源";
                setOpts.enum = ["放大器電源"];
                var watchDatas = setOpts.watchDatas = [];
                watchDatas.push(["directReg", regName + "#0", "baseColor", 1]);
            }
            if (i === inx++) {
                var setOpts = opts.setOpts = sopt.getOptsPara("button");
                opts.title = "放大器致能";
                setOpts.enum = ["放大器致能"];
                var watchDatas = setOpts.watchDatas = [];
                watchDatas.push(["directReg", regName + "#1", "baseColor", 1]);
            }
            if (i === inx++) {
                var setOpts = opts.setOpts = sopt.getOptsPara("button");
                opts.title = "脈波輸出";
                setOpts.enum = ["脈波輸出"];
                var watchDatas = setOpts.watchDatas = [];
                watchDatas.push(["directReg", regName + "#2", "baseColor", 1]);
            }
            if (i === inx++) {
                var setOpts = opts.setOpts = sopt.getOptsPara("button");
                opts.title = "緊急停止";
                setOpts.enum = ["緊急停止"];
                var watchDatas = setOpts.watchDatas = [];
                watchDatas.push(["directReg", regName + "#3", "baseColor", 1]);
            }
            setOpts.titleWidth = 0;
            setOpts.baseColor = "#002";
            setOpts.borderWidth = 0;
            opts.setOptss.push(setOpts);
            opts.actionFunc = actionPrg;
            blocks[cname] = {name: "ctrElem#" + i, type: "Model~MdaSetGroup~base.sys0", opts: opts};
        }
        //==============================================
        var cname = lyMaps["mainBody"] + "~" + lyInx++;
        var opts = {};
        opts.readOnly_f = 1;
        blocks[cname] = {name: "editor", type: "Component~Cp_base~editor.sys0", opts: opts};
        //==============================================
        var cname = lyMaps["mainBody"] + "~" + lyInx++;

        var opts = {};
        opts.buttons = ["上一頁", "下一頁", "清除"];
        opts.buttonAmt = 4;
        opts.buttonIds = ["upPage", "downPage", "clear"];
        opts.layoutType = "collum";
        opts.margin = 4;
        opts.fontSize = "0.5rh";
        opts.xm = 4;
        opts.ym = 4;
        opts.ih = 200;
        opts.baseColor = "#444";
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            if (iobj.buttonId === "upPage") {
                var kvObj = md.blockRefs["editor"];
                KvLib.lineMoveEditor(kvObj, -12);
                return;
            }
            if (iobj.buttonId === "downPage") {
                var kvObj = md.blockRefs["editor"];
                KvLib.lineMoveEditor(kvObj, 12);
                return;
            }
            if (iobj.buttonId === "clear") {
                var kvObj = md.blockRefs["editor"];
                var editor = kvObj.objs["editor"];
                KvLib.clearEditorMaker(editor);
                editor.getSession().setValue("");
                return;
            }
        };
        blocks[cname] = {name: "headButtons", type: "Model~MdaButtons~base.sys0", opts: opts};
        //==============================================
        var cname = lyMaps["mainBody"] + "~" + lyInx++;
        mac.setFootBar(md, cname);
        return;
    }
}
class CtrRadarStatus {
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);
        this.subTypeOpts(opts);
        opts.title = "title";
        opts.buttonColor = "#ccf";
        opts.buttons = ["button1", "button2", "button3"];
        opts.layoutType = "row"; //row,collum,array
        opts.buttonIds = [];
        opts.iw = 9999;
        opts.ih = 9999;
        opts.borderWidth = 1;
        opts.xm = 30;
        opts.baseColor = "#222";
        return opts;
    }
    subTypeOpts(opts) {
        if (this.md.subType === "base.sys0") {
        }
    }
    chkWatch() {
        var self = this;
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        var wa = md.stas.meterStatusA = ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"];
        var wac = md.stas.meterColorA = ["#ddd", "#ddd", "#ddd", "#ddd", "#ddd", "#ddd", "#ddd", "#ddd", "#ddd", "#ddd"];
        var wb = md.stas.envLedStatusA = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        var wc = md.stas.pulseStatusA = [0, 0, 0];
        var wd = md.stas.sspaStatusA = [0, 0];
        var we = md.stas.sspaPowerStatusA = [
            0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0
        ];
        var wf = md.stas.sspaModuleStatusA = [
            0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0
        ];

        DummyTargetCtrPane.getMeterStatus(wa, wac);


        var preText = "ctr1";
        var inx = 0;
        //===========================================
        for (var i = 0; i < 10; i++) {
            wb[i] = (gr.radarData["enviStatusA"][inx] >> i) & 1;
        }
        //=========================================
        var sspaPowerStatusA = gr.radarData.sspaPowerStatusAA;
        var sspaModuleStatusA = gr.radarData.sspaModuleStatusAA;
        var rfDet = (gr.radarData.systemStatus0 >> 22) & 1;
        var overDuty = (gr.radarData.systemStatus1 >> 11) & 1;
        var overWidth = (gr.radarData.systemStatus1 >> 10) & 1;
        var sspaPowerErr = (gr.radarData.systemStatus1 >> 8) & 1;
        var sspaModuleErr = (gr.radarData.systemStatus1 >> 9) & 1;

        wc[0] = rfDet;  //rfPulse detected
        wc[1] = overDuty;  //over pulse duty
        wc[2] = overWidth;  //over pulse width
        wd[0] = sspaPowerErr;  //all sspaPower status
        wd[1] = sspaModuleErr;  //all sspaModule status
        //=========================================
        for (var i = 0; i < 36; i++) {
            we[i] = 0;
            if (!sspaPowerStatusA[i] & (1 << 0))//connect
                continue;
            if (sspaPowerStatusA[i] & (1 << 3))//v32en
                we[i] = 1;
            if (sspaPowerStatusA[i] & (1 << 1))//error flag
                we[i] = 2;
        }
        //=========================================
        for (var i = 0; i < 36; i++) {
            wf[i] = 0;
            if (!sspaModuleStatusA[i] & (1 << 0))//connect
                continue;
            if (sspaModuleStatusA[i] & (1 << 1))
                wf[i] = 1;
            if (sspaModuleStatusA[i] & 0x7c)
                wf[i] = 2;
        }
        //=========================================


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
        var escPrg = function (iobj) {
            console.log(iobj);
            if (iobj.act === "mouseClick") {
                if (iobj.kvObj.opts.itemId === "esc") {
                    MdaPopWin.popOff(2);
                    return;
                }
            }


        };

        var actionPrg = function (iobj) {
            console.log(iobj);
            if (iobj.kvObj.name === "clrButton") {
                var kvObj = md.blockRefs["editor"];
                if (!kvObj)
                    return;
                var editor = kvObj.objs["editor"];
                KvLib.clearEditorMaker(editor);
                editor.getSession().setValue("");
                return;
            }

            iobj.sender = md;
            iobj.keyId = md.name + iobj.kvObj.name;
            KvLib.exe(op.actionFunc, iobj);
        };
        //======================================    
        var cname = "c";
        var opts = {};
        md.setPns(opts);
        layouts[cname] = {name: cname, type: "Layout~Ly_base~array.sys0", opts: opts};
        lyMaps["body"] = cname;
        //======================================    
        var opts = {};
        md.setPns(opts);
        blocks[cname] = {name: "basePanel", type: "Component~Cp_base~plate.sys0", opts: opts};
        //======================================    
        var cname = lyMaps["body"] + "~" + 0;
        var opts = {};
        opts.margin = 6;
        opts.xm = 10;
        opts.ym = 4;
        opts.yArr = [50, 110, 110, 80, 80, 9999];
        var rw0 = (1 / 6).toFixed(3) + "rw";
        var rw1 = (1 / 4).toFixed(3) + "rw";
        var rw2 = (1 / 3).toFixed(3) + "rw";
        opts.xyArr = [
            [9999],
            [rw2, rw2, rw2],
            [rw2, 0, rw2, rw2],
            ["0.3rw", 9999, "0.15rw"],
            [9999, "0.4rw"],
            ["0.5rw", 9999],

            [rw0, rw0, rw0, rw0, rw0, rw0],
            [rw1, rw1, rw1, rw1],
            [rw2, rw2, rw2],
            [9999, 140],
            [9999],
            ["0.1rw", 9999],
            [9999]
        ];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["mainBody"] = cname;
        //===================================
        var lyInx = 0;
        var cname = lyMaps["mainBody"] + "~" + lyInx++;
        mac.setHeadTitleBar(md, cname, "發射機狀態", escPrg);
        //==============================

        var actionPrg = function (iobj) {
            console.log(iobj);
        };

        var preText = "ctr1";

        for (var i = 0; i < 14; i++) {
            var cname = lyMaps["mainBody"] + "~" + lyInx++;
            var opts = {};
            opts.setOptss = [];
            var inx = 0;
            var regName = "gr.radarData.meterValueTextA";
            var regName1 = "gr.radarData.meterValueColorA";

            if (i === inx++) {
                opts.title = "順向輸出功率";
                var setOpts = opts.setOpts = sopt.getOptsPara("lcdView");
                setOpts.value = "";//
                var watchDatas = setOpts.watchDatas = [];
                watchDatas.push(["directReg", regName + "#4", "innerText", 1]);
                watchDatas.push(["directReg", regName1 + "#4", "innerTextColor", 1]);
            }
            if (i === inx++) {
                opts.title = "反向輸出功率";
                var setOpts = opts.setOpts = sopt.getOptsPara("lcdView");
                setOpts.value = "";//
                var watchDatas = setOpts.watchDatas = [];
                watchDatas.push(["directReg", regName + "#5", "innerText", 1]);
                watchDatas.push(["directReg", regName1 + "#5", "innerTextColor", 1]);
            }
            if (i === inx++) {
                opts.title = "放大器電源總電流";
                var setOpts = opts.setOpts = sopt.getOptsPara("lcdView");
                setOpts.value = "";//
                var watchDatas = setOpts.watchDatas = [];
                watchDatas.push(["directReg", regName + "#9", "innerText", 1]);
                watchDatas.push(["directReg", regName1 + "#9", "innerTextColor", 1]);
            }
            if (i === inx++) {
                opts.title = "輸入功率";
                var setOpts = opts.setOpts = sopt.getOptsPara("lcdView");
                setOpts.value = "";//
                var watchDatas = setOpts.watchDatas = [];
                watchDatas.push(["directReg", regName + "#0", "innerText", 1]);
                watchDatas.push(["directReg", regName1 + "#0", "innerTextColor", 1]);
            }
            if (i === inx++) {
                continue;

            }
            if (i === inx++) {
                opts.title = "前置放大器輸出功率";
                var setOpts = opts.setOpts = sopt.getOptsPara("lcdView");
                setOpts.value = "";//
                var watchDatas = setOpts.watchDatas = [];
                watchDatas.push(["directReg", regName + "#2", "innerText", 1]);
                watchDatas.push(["directReg", regName1 + "#2", "innerTextColor", 1]);
            }
            if (i === inx++) {
                opts.title = "驅動放大器輸出功率";
                var setOpts = opts.setOpts = sopt.getOptsPara("lcdView");
                setOpts.value = "";//
                var watchDatas = setOpts.watchDatas = [];
                watchDatas.push(["directReg", regName + "#3", "innerText", 1]);
                watchDatas.push(["directReg", regName1 + "#3", "innerTextColor", 1]);
            }
            var regName = "self.fatherMd.fatherMd.fatherMd.stas.envLedStatusA";
            if (i === inx++) {
                opts.title = "環控氣流";
                var setOpts = opts.setOpts = sopt.getOptsPara("leds");
                setOpts.enum = ["AF左", "AF中", "AF右"];
                setOpts.value = [0, 0, 0];
                setOpts.fontSize = "0.4rh";
                var watchDatas = setOpts.watchDatas = [];
                watchDatas.push(["directReg", regName + "#0", "backgroundInx", 1]);
                watchDatas.push(["directReg", regName + "#1", "backgroundInx", 1]);
                watchDatas.push(["directReg", regName + "#2", "backgroundInx", 1]);
                opts.setOptss.push(setOpts);
                blocks[cname] = {name: "groupPanel#" + i, type: "Model~MdaSetGroup~base.sys0", opts: opts};
                continue;
            }

            if (i === inx++) {
                opts.title = "環控水流";
                var setOpts = opts.setOpts = sopt.getOptsPara("leds");
                setOpts.enum = ["WF1", "WF2", "WF3", "WF4", "WF5", "WF6"];
                setOpts.value = [0, 0, 0, 0, 0, 0];
                setOpts.fontSize = "0.4rh";
                var watchDatas = setOpts.watchDatas = [];
                watchDatas.push(["directReg", regName + "#3", "backgroundInx", 1]);
                watchDatas.push(["directReg", regName + "#4", "backgroundInx", 1]);
                watchDatas.push(["directReg", regName + "#5", "backgroundInx", 1]);
                watchDatas.push(["directReg", regName + "#6", "backgroundInx", 1]);
                watchDatas.push(["directReg", regName + "#7", "backgroundInx", 1]);
                watchDatas.push(["directReg", regName + "#8", "backgroundInx", 1]);
                opts.setOptss.push(setOpts);
                blocks[cname] = {name: "groupPanel#" + i, type: "Model~MdaSetGroup~base.sys0", opts: opts};
                continue;
            }
            if (i === inx++) {
                opts.title = "環控水溫";
                var setOpts = opts.setOpts = sopt.getOptsPara("leds");
                setOpts.enum = ["WT"];
                setOpts.value = [0];
                setOpts.fontSize = "0.4rh";
                var watchDatas = setOpts.watchDatas = [];
                watchDatas.push(["directReg", regName + "#9", "backgroundInx", 1]);
                opts.setOptss.push(setOpts);
                blocks[cname] = {name: "groupPanel#" + i, type: "Model~MdaSetGroup~base.sys0", opts: opts};
                continue;
            }

            var regName = "self.fatherMd.fatherMd.fatherMd.stas.pulseStatusA";
            if (i === inx++) {
                opts.title = "脈波狀態";
                var setOpts = opts.setOpts = sopt.getOptsPara("leds");
                setOpts.enum = ["脈波輸入", "週期過大", "脈波過寬"];
                setOpts.value = [0, 0, 0];
                var watchDatas = setOpts.watchDatas = [];
                watchDatas.push(["directReg", regName + "#0", "backgroundInx", 1]);
                watchDatas.push(["directReg", regName + "#1", "backgroundInx", 1]);
                watchDatas.push(["directReg", regName + "#2", "backgroundInx", 1]);
                opts.setOptss.push(setOpts);
                blocks[cname] = {name: "groupPanel#" + i, type: "Model~MdaSetGroup~base.sys0", opts: opts};
                continue;
            }

            var regName = "self.fatherMd.fatherMd.fatherMd.stas.sspaStatusA";
            if (i === inx++) {
                opts.title = "固態放大器狀態";
                var setOpts = opts.setOpts = sopt.getOptsPara("leds");
                setOpts.enum = ["放大器電源", "放大器模組"];
                setOpts.value = [0, 0];
                var watchDatas = setOpts.watchDatas = [];
                watchDatas.push(["directReg", regName + "#0", "backgroundInx", 1]);
                watchDatas.push(["directReg", regName + "#1", "backgroundInx", 1]);
                opts.setOptss.push(setOpts);
                blocks[cname] = {name: "groupPanel#" + i, type: "Model~MdaSetGroup~base.sys0", opts: opts};
                continue;
            }

            //=======================================================================
            var ser = 0;
            if (i === inx++) {
                opts.title = "放大器電源狀態";
                var rh = (1 / 10).toFixed(3) + "rh";
                var rw = (1 / 4).toFixed(3) + "rw";
                opts.yArr = [];
                opts.xyArr = [];
                opts.ym = 0;
                opts.lm = 50;
                for (var j = 0; j < 10; j++) {
                    opts.yArr.push(rh);
                    opts.xyArr.push([rw, rw, rw, rw]);
                }
                var regName = "self.fatherMd.fatherMd.fatherMd.stas.sspaPowerStatusA";
                var itemInx = 0;
                for (var j = 0; j < 40; j++) {
                    var setOpts = opts.setOpts = sopt.getOptsPara("leds");
                    if (j === 0 || j === 2 || j === 37 || j === 39) {
                        opts.setOptss.push(null);
                        continue;
                    }
                    var str1 = "" + (((j / 4) | 0) + 1);
                    var str2 = "-" + ((j % 4) + 1);
                    setOpts.enum = [str1 + str2];
                    setOpts.value = [0];
                    var watchDatas = setOpts.watchDatas = [];
                    watchDatas.push(["directReg", regName + "#" + itemInx, "backgroundInx", 1]);
                    opts.setOptss.push(setOpts);
                    itemInx++;
                }
                blocks[cname] = {name: "groupPanel#" + i, type: "Model~MdaSetGroup~base.sys0", opts: opts};
                continue;
            }

            var ser = 0;
            if (i === inx++) {
                opts.title = "放大器模組狀態";
                var rh = (1 / 10).toFixed(3) + "rh";
                var rw = (1 / 4).toFixed(3) + "rw";
                opts.yArr = [];
                opts.xyArr = [];
                opts.ym = 0;
                opts.lm = 50;
                for (var j = 0; j < 10; j++) {
                    opts.yArr.push(rh);
                    opts.xyArr.push([rw, rw, rw, rw]);
                }
                var regName = "self.fatherMd.fatherMd.fatherMd.stas.sspaModuleStatusA";
                var itemInx = 0;
                for (var j = 0; j < 40; j++) {
                    var setOpts = opts.setOpts = sopt.getOptsPara("leds");
                    if (j === 0 || j === 2 || j === 37 || j === 39) {
                        opts.setOptss.push(null);
                        continue;
                    }
                    var str1 = "" + (((j / 4) | 0) + 1);
                    var str2 = "-" + ((j % 4) + 1);
                    setOpts.enum = [str1 + str2];
                    setOpts.value = [0];
                    var watchDatas = setOpts.watchDatas = [];
                    watchDatas.push(["directReg", regName + "#" + itemInx, "backgroundInx", 1]);
                    opts.setOptss.push(setOpts);
                    itemInx++;
                }
                blocks[cname] = {name: "groupPanel#" + i, type: "Model~MdaSetGroup~base.sys0", opts: opts};
                continue;
            }
            setOpts.titleWidth = 0;
            setOpts.baseColor = "#002";
            setOpts.borderWidth = 0;
            opts.setOptss.push(setOpts);
            opts.actionFunc = actionPrg;
            blocks[cname] = {name: "groupPanel#" + i, type: "Model~MdaSetGroup~base.sys0", opts: opts};
        }

    }
}
class CtrSspaPowerStatus {
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);
        this.subTypeOpts(opts);
        opts.title = "title";
        opts.buttonColor = "#ccf";
        opts.buttons = ["button1", "button2", "button3"];
        opts.layoutType = "row"; //row,collum,array
        opts.buttonIds = [];
        opts.iw = 9999;
        opts.ih = 9999;
        opts.borderWidth = 1;
        opts.xm = 30;
        opts.baseColor = "#222";
        return opts;
    }
    subTypeOpts(opts) {
        if (this.md.subType === "base.sys0") {
        }
    }
    chkWatch() {
        var self = this;
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        var powerStatusA = gr.radarData.sspaPowerStatusAA;
        var powerV50vAA = gr.radarData.sspaPowerV50vAA;
        var preText = "ctr1";
        var watchAA = st.sspaPowerStatusAA = [];

        var prg = function (data, name, fixed) {
            var value = (data - gr.paraSet[preText + name + "Offs"]) * gr.paraSet[preText + name + "Gain"];
            if (value < gr.paraSet[preText + name + "Zero"])
                value = 0;
            var valueStr = "" + value.toFixed(fixed);
            var valueColor = "#eef";
            if (value < gr.paraSet[preText + name + "LimD"] && value !== 0)
                valueColor = "#f2f";
            if (value >= gr.paraSet[preText + name + "LimD"])
                valueColor = "#2f2";
            if (value > gr.paraSet[preText + name + "LimU"])
                valueColor = "#f22";
            return [valueStr, valueColor, value];
        };
        for (var i = 0; i < 36; i++) {
            //0 existCheck, 1 faultLed, 2:v50enLed, 3:v32enLed, 4:v50v, 5:v50i, 6:v50i, 7:v32v, 8:v32i, 9:v32t  
            var va = [0, "#ccc", 0, 0, 0, "---", "#eef", "---", "#eef", "---", "#eef", "---", "#eef", "---", "#eef", "---", "#eef"];
            va[0] = gr.paraSet[preText + "SspaPowerExistA"][i];
            if (!(powerStatusA[i] & 1) || !va[0]) {//connect flag
                watchAA.push(va);
                continue;
            }
            if (powerStatusA[i] & (1 << 4))
                va[1] = "#cfc";
            if (powerStatusA[i] & (1 << 1))
                va[2] = 2;
            if (powerStatusA[i] & (1 << 2))
                va[3] = 1;
            if (powerStatusA[i] & (1 << 3))
                va[4] = 1;
            var obj = prg(gr.radarData.sspaPowerV50vAA[i], "SspaPowerV50v", 1);
            va[5] = obj[0];
            va[6] = obj[1];
            var obj = prg(gr.radarData.sspaPowerV50iAA[i], "SspaPowerV50i", 1);
            va[7] = obj[0];
            va[8] = obj[1];
            var obj = prg(gr.radarData.sspaPowerV50tAA[i], "SspaPowerV50t", 0);
            va[9] = obj[0];
            if (!va[2])//
                obj[1] = "#eef";
            va[10] = obj[1];
            var obj = prg(gr.radarData.sspaPowerV32vAA[i], "SspaPowerV32v", 1);
            va[11] = obj[0];
            va[12] = obj[1];
            var obj = prg(gr.radarData.sspaPowerV32iAA[i], "SspaPowerV32i", 1);
            va[13] = obj[0];
            va[14] = obj[1];
            var obj = prg(gr.radarData.sspaPowerV32tAA[i], "SspaPowerV32t", 0);
            va[15] = obj[0];
            if (!va[3])//
                obj[1] = "#eef";
            va[16] = obj[1];
            watchAA.push(va);
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

        var actionPrg = function (iobj) {
            console.log(iobj);
            if (iobj.act === "mouseClick") {
                if (iobj.kvObj.opts.itemId === "esc") {
                    MdaPopWin.popOff(2);
                    return;
                }
                if (iobj.kvObj.opts.itemId === "set") {
                    var opts = {};
                    opts.title = "控制";
                    opts.xc = 1;
                    opts.yc = 11;
                    opts.h = 350;
                    opts.kvTexts = [];
                    opts.kvTexts.push("電源模組 全部開啟");
                    opts.kvTexts.push("電源模組 全部關閉");
                    opts.kvTexts.push("電源模組 全部加入");
                    opts.kvTexts.push("電源模組 全部移除");
                    opts.actionFunc = function (iobj) {
                        console.log(iobj);
                        MdaPopWin.popOff(2);
                        var preText = "ctr1";
                        switch (iobj.selectInx) {
                            case 0:
                                gr.gbcs.command({'act': preText + "SspaPowerOn", 'index': -1});
                                break;
                            case 1:
                                gr.gbcs.command({'act': preText + "SspaPowerOff", 'index': -1});
                                break;
                            case 2:
                                gr.gbcs.command({'act': preText + "SspaPowerInsert", 'index': -1});
                                break;
                            case 3:
                                gr.gbcs.command({'act': preText + "SspaPowerRemove", 'index': -1});
                                break;

                        }

                    };
                    box.selectBox(opts);
                }


            }
        };
        //======================================    
        var cname = "c";
        var opts = {};
        md.setPns(opts);
        layouts[cname] = {name: cname, type: "Layout~Ly_base~array.sys0", opts: opts};
        lyMaps["body"] = cname;
        //======================================    
        var opts = {};
        md.setPns(opts);
        blocks[cname] = {name: "basePanel", type: "Component~Cp_base~plate.sys0", opts: opts};
        //======================================    
        var cname = lyMaps["body"] + "~" + 0;
        var opts = {};
        opts.margin = 6;
        opts.xm = 10;
        opts.ym = 4;
        opts.yArr = [50, 9999];
        var rw0 = (1 / 6).toFixed(3) + "rw";
        var rw1 = (1 / 4).toFixed(3) + "rw";
        var rw2 = (1 / 3).toFixed(3) + "rw";
        opts.xyArr = [
            [9999],
            [9999],
            [9999]
        ];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["mainBody"] = cname;
        //===================================
        var lyInx = 0;
        var cname = lyMaps["mainBody"] + "~" + lyInx++;
        mac.setHeadTitleBar(md, cname, "放大器電源狀態", actionPrg, ['set', "esc"]);
        //=====================
        var cname = lyMaps["mainBody"] + "~" + lyInx++;

        var opts = {};
        opts.xm = 10;
        opts.ym = 2;
        opts.ksObjWs = ["0.5rw", "0.5rw"];
        opts.etm = 4;
        opts.eh = 40;
        opts.ebm = 4;
        opts.rowAmt = 19;

        opts.ksObjss = [];
        var colorInx = 1;
        var noInx = 0;
        var itemInx = 0;
        var regName = "self.fatherMd.fatherMd.fatherMd.stas.sspaPowerStatusAA";
        for (var i = 0; i < 19; i++) {
            var cInx = (i % 4);
            if (cInx < 2)
                var color = "#ccc";
            else
                var color = "#aaa";
            if (i === 0)
                var color = "#aaa";

            var ksObjs = [];
            for (var j = 0; j < 2; j++) {
                var ksObj = {};
                if (i === 0)
                    ksObj.name = "statusBar#title";
                else
                    ksObj.name = "statusBar#" + itemInx;
                ksObj.type = "Model~StatusBar~base.sys0";
                var kopt = ksObj.opts = {};
                kopt.baseColor = color;
                if (i === 0)
                    kopt.headBar_f = 1;
                var itemNo = "";
                if (!kopt.headBar_f) {
                    if (noInx === 2)
                        noInx += 2;
                    var noStr = (((noInx / 4) | 0) + 1) + "-" + ((noInx % 4) + 1);
                    if (noInx === 0)
                        noStr = "1-2";
                    if (noInx === 1)
                        noStr = "1-4";
                    if (noInx === 37)
                        noStr = "10-3";

                    var watch = kopt.itemWatch = {};
                    watch["c0#0"] = regName + "#" + itemInx + "#0";
                    watch["c1#0"] = regName + "#" + itemInx + "#1";
                    watch["c2#0"] = regName + "#" + itemInx + "#2";
                    watch["c3#0"] = regName + "#" + itemInx + "#3";
                    watch["c4#0"] = regName + "#" + itemInx + "#4";
                    watch["c5#0"] = regName + "#" + itemInx + "#5";
                    watch["c5#1"] = regName + "#" + itemInx + "#6";
                    watch["c6#0"] = regName + "#" + itemInx + "#7";
                    watch["c6#1"] = regName + "#" + itemInx + "#8";
                    watch["c7#0"] = regName + "#" + itemInx + "#9";
                    watch["c7#1"] = regName + "#" + itemInx + "#10";
                    watch["c8#0"] = regName + "#" + itemInx + "#11";
                    watch["c8#1"] = regName + "#" + itemInx + "#12";
                    watch["c9#0"] = regName + "#" + itemInx + "#13";
                    watch["c9#1"] = regName + "#" + itemInx + "#14";
                    watch["c10#0"] = regName + "#" + itemInx + "#15";
                    watch["c10#1"] = regName + "#" + itemInx + "#16";
                    noInx++;
                    itemInx++;
                }
                //kopt.xArr = [30, 35, 35, 35, 35, 42, 42, 42, 42, 42, 42, 9999];
                kopt.xArr = ["0.06rw", "0.08rw", "0.07rw", "0.07rw", "0.07rw", "0.09rw", "0.09rw", "0.09rw", "0.09rw", "0.09rw", "0.09rw", 9999];

                kopt.itemTypes = ["check", "label", "led", "led", "led", "view", "view", "view", "view", "view", "view", "button"];
                kopt.itemValues = [0, noStr, 0, 0, 0, "123", "4.6", "1.2", "30", "19", "28", '<i class="gf">&#xe8b8;</i>'];
                kopt.itemTitles = ["", "編號", "故障", "50V", "32V", "50V<br>電壓", "50V<br>電流", "50V<br>溫度", "32V<br>電壓", "32V<br>電流", "32V<br>溫度", "設定"];
                ksObjs.push(ksObj);
            }
            opts.ksObjss.push(ksObjs);
        }
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            if (iobj.act === "mouseClick") {
                var buttonInx = parseInt(iobj.kvObj.name.split("#")[1]);
                var barInx = parseInt(iobj.kvObj.fatherMd.name.split("#")[1]);
                if (buttonInx === 11) {
                    var opts = {};
                    opts.title = "控制";
                    opts.xc = 1;
                    opts.yc = 11;
                    opts.h = 350;
                    opts.kvTexts = [];
                    opts.kvTexts.push("電源模組 開啟");
                    opts.kvTexts.push("電源模組 關閉");
                    opts.kvTexts.push("電源模組 加入");
                    opts.kvTexts.push("電源模組 移除");
                    opts.actionFunc = function (iobj) {
                        console.log(iobj);
                        MdaPopWin.popOff(2);
                        var preText = "ctr1";
                        switch (iobj.selectInx) {
                            case 0:
                                gr.gbcs.command({'act': preText + "SspaPowerOn", "index": barInx});
                                break;
                            case 1:
                                gr.gbcs.command({'act': preText + "SspaPowerOff", "index": barInx});
                                break;
                            case 2:
                                gr.gbcs.command({'act': preText + "SspaPowerInsert", "index": barInx});
                                break;
                            case 3:
                                gr.gbcs.command({'act': preText + "SspaPowerRemove", "index": barInx});
                                break;

                        }

                    };
                    box.selectBox(opts);
                }
            }
        };
        blocks[cname] = {name: cname, type: "Model~MdaContainer~base.page", opts: opts};
        //==============================
    }
}
class CtrSspaModuleStatus {
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);
        this.subTypeOpts(opts);
        opts.title = "title";
        opts.buttonColor = "#ccf";
        opts.buttons = ["button1", "button2", "button3"];
        opts.layoutType = "row"; //row,collum,array
        opts.buttonIds = [];
        opts.iw = 9999;
        opts.ih = 9999;
        opts.borderWidth = 1;
        opts.xm = 30;
        opts.baseColor = "#222";
        return opts;
    }
    subTypeOpts(opts) {
        if (this.md.subType === "base.sys0") {
        }
    }
    chkWatch() {
        var self = this;
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        var preText = "ctr1";
        var moduleStatus = gr.radarData.sspaModuleStatusAA;
        var watchAA = st["sspaModuleStatusAA"] = [];
        //0:connect, 1:致能 2 保護觸發, 3:工作比過高, 4:脈寬過高, 5:溫度過高, 6:反射過高, 7:RF輸出, 8:溫度
        var prg = function (data, name, fixed) {
            var value = (data - gr.paraSet[preText + name + "Offs"]) * gr.paraSet[preText + name + "Gain"];
            if (value < gr.paraSet[preText + name + "Zero"])
                value = 0;
            var valueStr = "" + value.toFixed(fixed);
            var valueColor = "#eef";
            if (value < gr.paraSet[preText + name + "LimD"] && value !== 0)
                valueColor = "#f2f";
            if (value >= gr.paraSet[preText + name + "LimD"])
                valueColor = "#2f2";
            if (value > gr.paraSet[preText + name + "LimU"])
                valueColor = "#f22";
            return [valueStr, valueColor, value];
        };

        for (var i = 0; i < 36; i++) {
            var arr = [0, 0, 0, 0, 0, 0, 0, "---", "#eef", "---", "#eef"];
            if (moduleStatus[i] & (1 << 1))
                arr[1] = 1;
            arr[0] = gr.paraSet[preText + "SspaModuleExistA"][i];
            if (!(moduleStatus[i] & 1) || !gr.paraSet[preText + "SspaModuleExistA"][i]) {
                watchAA.push(arr);
                continue;
            }
            if (moduleStatus[i] & (1 << 2))
                arr[2] = 2;
            if (moduleStatus[i] & (1 << 3))
                arr[3] = 2;
            if (moduleStatus[i] & (1 << 4))
                arr[4] = 2;
            if (moduleStatus[i] & (1 << 5))
                arr[5] = 2;
            if (moduleStatus[i] & (1 << 6))
                arr[6] = 2;
            var obj = prg(gr.radarData.sspaModuleRfOutAA[i], "SspaModuleRfOut", 1);
            arr[7] = obj[0];
            if (arr[1])
                arr[8] = obj[1];
            var obj = prg(gr.radarData.sspaModuleTemprAA[i], "SspaModuleTempr", 0);
            arr[9] = obj[0];
            if (arr[1])
                arr[10] = obj[1];
            watchAA.push(arr);
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

        var actionPrg = function (iobj) {
            console.log(iobj);
            if (iobj.act === "mouseClick") {
                if (iobj.kvObj.opts.itemId === "esc") {
                    MdaPopWin.popOff(2);
                    return;
                }
                if (iobj.kvObj.opts.itemId === "set") {
                    var opts = {};
                    opts.title = "控制";
                    opts.xc = 1;
                    opts.yc = 11;
                    opts.h = 350;
                    opts.kvTexts = [];
                    opts.kvTexts.push("SSPA模組 全部致能");
                    opts.kvTexts.push("SSPA模組 全部除能");
                    opts.kvTexts.push("SSPA模組 全部加入");
                    opts.kvTexts.push("SSPA模組 全部移除");
                    opts.actionFunc = function (iobj) {
                        console.log(iobj);
                        MdaPopWin.popOff(2);
                        var preText = "ctr1";
                        switch (iobj.selectInx) {
                            case 0:
                                gr.gbcs.command({'act': preText + "SspaModuleOn", 'index': -1});
                                break;
                            case 1:
                                gr.gbcs.command({'act': preText + "SspaModuleOff", 'index': -1});
                                break;
                            case 2:
                                gr.gbcs.command({'act': preText + "SspaModuleInsert", 'index': -1});
                                break;
                            case 3:
                                gr.gbcs.command({'act': preText + "SspaModuleRemove", 'index': -1});
                                break;

                        }

                    };
                    box.selectBox(opts);
                }


            }
        };
        //======================================    
        var cname = "c";
        var opts = {};
        md.setPns(opts);
        layouts[cname] = {name: cname, type: "Layout~Ly_base~array.sys0", opts: opts};
        lyMaps["body"] = cname;
        //======================================    
        var opts = {};
        md.setPns(opts);
        blocks[cname] = {name: "basePanel", type: "Component~Cp_base~plate.sys0", opts: opts};
        //======================================    
        var cname = lyMaps["body"] + "~" + 0;
        var opts = {};
        opts.margin = 6;
        opts.xm = 10;
        opts.ym = 4;
        opts.yArr = [50, 9999];
        var rw0 = (1 / 6).toFixed(3) + "rw";
        var rw1 = (1 / 4).toFixed(3) + "rw";
        var rw2 = (1 / 3).toFixed(3) + "rw";
        opts.xyArr = [
            [9999],
            [9999],
            [9999]
        ];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["mainBody"] = cname;
        //===================================
        var lyInx = 0;
        var cname = lyMaps["mainBody"] + "~" + lyInx++;
        mac.setHeadTitleBar(md, cname, "放大器模組狀態", actionPrg, ['set', "esc"]);
        //=====================
        var cname = lyMaps["mainBody"] + "~" + lyInx++;
        var opts = {};
        opts.xm = 10;
        opts.ym = 2;
        opts.ksObjWs = ["0.5rw", "0.5rw"];
        opts.etm = 4;
        opts.eh = 34;
        opts.rowAmt = 19;
        opts.ebm = 4;

        opts.ksObjss = [];
        var colorInx = 1;
        var noInx = 0;
        var itemInx = 0;
        var regName = "self.fatherMd.fatherMd.fatherMd.stas.sspaModuleStatusAA";
        for (var i = 0; i < 19; i++) {
            var cInx = (i % 4);
            if (cInx < 2)
                var color = "#ccc";
            else
                var color = "#aaa";
            if (i === 0)
                var color = "#aaa";

            var ksObjs = [];
            for (var j = 0; j < 2; j++) {
                var ksObj = {};
                if (i === 0)
                    ksObj.name = "statusBar#title";
                else
                    ksObj.name = "statusBar#" + itemInx;
                ksObj.type = "Model~StatusBar~base.sys0";
                var kopt = ksObj.opts = {};
                kopt.baseColor = color;
                if (i === 0)
                    kopt.headBar_f = 1;
                var itemNo = "";
                if (!kopt.headBar_f) {
                    if (noInx === 2)
                        noInx += 2;
                    var noStr = (((noInx / 4) | 0) + 1) + "-" + ((noInx % 4) + 1);

                    if (noInx === 0)
                        noStr = "1-2";
                    if (noInx === 1)
                        noStr = "1-4";
                    if (noInx === 37)
                        noStr = "10-3";


                    var watch = kopt.itemWatch = {};
                    watch["c0#0"] = regName + "#" + itemInx + "#0";
                    watch["c2#0"] = regName + "#" + itemInx + "#1";
                    watch["c3#0"] = regName + "#" + itemInx + "#2";
                    watch["c4#0"] = regName + "#" + itemInx + "#3";
                    watch["c5#0"] = regName + "#" + itemInx + "#4";
                    watch["c6#0"] = regName + "#" + itemInx + "#5";
                    watch["c7#0"] = regName + "#" + itemInx + "#6";
                    watch["c8#0"] = regName + "#" + itemInx + "#7";
                    watch["c8#1"] = regName + "#" + itemInx + "#8";
                    watch["c9#0"] = regName + "#" + itemInx + "#9";
                    watch["c9#1"] = regName + "#" + itemInx + "#10";
                    noInx++;
                    itemInx++;
                }
                kopt.xArr = ["0.06rw", "0.08rw", "0.08rw", "0.08rw", "0.08rw", "0.08rw", "0.08rw", "0.08rw", "0.10rw", "0.10rw", 9999];
                kopt.itemTypes = ["check", "label", "led", "led", "led", "led", "led", "led", "view", "view", "button"];
                kopt.itemValues = [0, noStr, 0, 0, 0, 0, 0, 0, "", "", '<i class="gf">&#xe8b8;</i>'];
                kopt.itemTitles = ["", "編號", "致能", "保護<br>觸發", "工作比<br>過高", "脈寬<br>過高", "溫度<br>過高", "反射<br>過高", "RF<br>輸出", "溫度", "設定"];
                ksObjs.push(ksObj);
            }
            opts.ksObjss.push(ksObjs);
        }
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            if (iobj.act === "mouseClick") {
                var buttonInx = parseInt(iobj.kvObj.name.split("#")[1]);
                var barInx = parseInt(iobj.kvObj.fatherMd.name.split("#")[1]);
                if (buttonInx === 10) {
                    var opts = {};
                    opts.title = "控制";
                    opts.xc = 1;
                    opts.yc = 11;
                    opts.h = 350;
                    opts.kvTexts = [];
                    opts.kvTexts.push("SSPA模組 開啟");
                    opts.kvTexts.push("SSPA模組 關閉");
                    opts.kvTexts.push("SSPA模組 加入");
                    opts.kvTexts.push("SSPA模組 移除");
                    opts.actionFunc = function (iobj) {
                        console.log(iobj);
                        MdaPopWin.popOff(2);
                        var preText = "ctr1";
                        switch (iobj.selectInx) {
                            case 0:
                                gr.gbcs.command({'act': preText + "SspaModuleOn", "index": barInx});
                                break;
                            case 1:
                                gr.gbcs.command({'act': preText + "SspaModuleOff", "index": barInx});
                                break;
                            case 2:
                                gr.gbcs.command({'act': preText + "SspaModuleInsert", "index": barInx});
                                break;
                            case 3:
                                gr.gbcs.command({'act': preText + "SspaModuleRemove", "index": barInx});
                                break;

                        }

                    };
                    box.selectBox(opts);
                }
            }
        };
        blocks[cname] = {name: cname, type: "Model~MdaContainer~base.page", opts: opts};
        //==============================
    }
}
//==================================================
class Emulate {
    constructor() {
        //{act: actTime: actStep}
        //key=actName+"#"+index;
        //name:actName;
        //index=index;
        //step;
        //stepTime;
        this.connectTime = 0;
        this.connectCnt = 0;
        this.actTime = 0;
        this.actionObj = {};
        this.preNanoTime = 0;


    }
    ctrEmu() {
        var self = this;
        var preText = "ctr1";
        //============================================
        for (var i = 0; i < 36; i++) {
            gr.radarData.sspaModuleRfOutAA[i] = 0;
            gr.radarData.sspaModuleTemprAA[i] = 25;
        }

        if (gr.radarData.systemStatus0 & (1 << 22)) {//rfpulse detected
            for (var i = 0; i < 36; i++) {
                if (gr.radarData.sspaModuleStatusAA[i] & 3) {
                    gr.radarData.sspaModuleRfOutAA[i] = 35.2;
                    gr.radarData.sspaModuleTempr[i] = 100;
                }
            }
        }
        if (gr.radarData.systemStatus0 & (1 << 27)) {//rfpulse detected
            for (var i = 0; i < 36; i++) {
                if (gr.radarData.sspaModuleStatusAA[i] & 3) {
                    gr.radarData.sspaModuleRfOutAA[i] = 35.2;
                    gr.radarData.sspaModuleTempr[i] = 100;
                }
            }
        }

        //==========================================
        //==========================================
        //============================================



        //============================================
        var keys = Object.keys(self.actionObj);
        for (var i = 0; i < keys.length; i++) {
            var strA = keys[i].split("#");
            var obj = self.actionObj[keys[i]];
            if (obj.stepTime) {
                obj.stepTime--;
                continue;
            }
        }
        //============================================
        if (gr.wavePageObj) {
            var wopts = gr.wavePageObj.opts;
            var prg = function (data, name) {
                var value = (data - gr.paraSet[preText + name + "Offs"]) * gr.paraSet[preText + name + "Gain"];
                if (value < gr.paraSet[preText + name + "Zero"])
                    value = 0;
                return value;
            };
            if (wopts.signalMode) {
                if (wopts.signalMode === 3) {
                    var buf0 = [];
                    var buf1 = [];
                    for (var i = 0; i < 3; i++) {
                        var ran = Math.round(100 * Math.random() - 50);
                        //buf0.push(prg(gr.syncData[preText + "MeterStatusA"][4] + ran, "CwAmpOutRfpow"));
                        var ran = Math.round(100 * Math.random() - 50);
                        //buf1.push(prg(gr.syncData[preText + "MeterStatusA"][5] + ran, "CcwAmpOutRfpow"));
                    }
                    gr.wavePageObj.mdClass.addLineBuf(buf0, 0);
                    gr.wavePageObj.mdClass.addLineBuf(buf1, 1);
                    //wopts.lines.a

                }

            }
        }

    }
    timer() {
        var self = this;
        var rd = gr.radarData;

        /*
         if (!self.firstEntry_f) {
         self.firstEntry_f = 1;
         rd.slotDataAA = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
         for (var i = 0; i < 36; i++) {
         rd.sspaPowerStatusAA[i] |= 1;
         rd.sspaModuleStatusAA[i] |= 1;
         }
         self.preNanoTime = (performance.now() * 1000000) | 0;
         
         }
         if (self.actTime === 10) {
         for (var j = 0; j < 12; j++) {
         rd.slotDataAA[j] &= 0xf0ff;
         rd.slotDataAA[j] |= 0x0300;
         }
         rd.systemStatus0 &= 0xffc00000;
         rd.systemStatus0 |= 0x00155555;
         }
         if (self.actTime === 50) {
         for (var j = 0; j < 12; j++) {
         rd.slotDataAA[j] &= 0xf0ff;
         rd.slotDataAA[j] |= 0x0100;
         }
         rd.systemStatus0 &= 0xffc00000;
         rd.systemStatus0 |= 0x002aaaaa;
         }
         if (++self.connectTime >= 6) {
         self.connectTime = 0;
         self.connectCnt++;
         gr.footBarStatus0 = "Connect " + (self.connectCnt % 10);
         gr.footBarStatus1 = "Emulation";
         gr.footBarStatus2 = ani.dispFs;
         self.actTime++;
         
         }
         if (gr.appId === 2)
         self.ctrEmu();
         */










    }
    setAction(name, index) {
        var self = this;
        if (index === undefined)
            var key = name;
        else
            var key = name + "#" + index;
        var obj = self.actionObj[key] = {};
        obj.name = key;
        if (index !== undefined)
            obj.index = index;
        obj.stepTime = 0;
        obj.step = 0;
    }
    command(iobj) {
        console.log(iobj);
        var self = this;
        var rd = gr.radarData;
        if (gr.appId === 1)
            var preText = "sub1";
        if (gr.appId === 2) {
            var preText = "ctr1";
            var preInx = 0;
            var status0 = rd.systemStatus0 >> 22;
            var shift = 22;
            var powerStatusA = rd.sspaPowerStatusAA[0];
            var moduleStatusA = rd.sspaModuleStatusAA[0];
        }

        /*
        var powerOn_f = 0;
        var moduleOn_f = 0;
        for (var i = 0; i < 36; i++) {
            if ((powerStatusA[i] >> 4) & 1)
                powerOn_f = 1;
            if ((moduleStatusA[i] >> 1) & 1)
                moduleOn_f = 1;
        }
        */                                                                    
        var powerOn_f = (gr.radarData.systemStatus0 >> 23) & 1;
        var moduleOn_f = (gr.radarData.systemStatus0 >> 24) & 1;
        var emergency = gr.radarData.systemStatus0 & (1 << (shift + 4));
        var ready_f = rd.systemStatus0 & 3;


        var messageId = iobj.act;
        if (iobj.act === "selfTestStartAll") {
            gr.logMessage.messages.push({type: "cmd", text: "全系統測試"});
            //
            gr.logMessage.messages.push({type: "info", text: "測試開始........"});
            self.selfTestStartAll_f = 1;
            self.selfTestTime = 0;
            self.selfTestInx = 0;
            for (var i = 0; i < 12; i++) {
                rd.slotDataAA[i] &= 0x03ff;
                rd.slotDataAA[i] |= 0x0400;
            }

            //gr.syncData.slotTestStatusA[i] = 1;
            return;
            //
        }
        if (iobj.act === "selfTestStopAll") {
            gr.logMessage.messages.push({type: "cmd", text: "測試停止"});
            //
            gr.logMessage.messages.push({type: "info", text: "測試停止........"});
            //for (var i = 0; i < 12; i++)
            //    gr.syncData.slotTestStatusA[i] = 0;
            self.selfTestStartAll_f = 0;
            return;
        }
        if (iobj.act === "selfTestEsc") {
            self.selfTestStartAll_f = 0;
            //for (var i = 0; i < 12; i++)
            //    gr.syncData.slotTestStatusA[i] = 0;
            return;
        }


        if (iobj.act === preText + "AllSspaPowerOnOff") {
            if (powerOn_f)
                gr.gbcs.command({'act': preText + "SspaPowerOff", 'index': -1});
            else
                gr.gbcs.command({'act': preText + "SspaPowerOn", 'index': -1});
            return;
        }
        if (iobj.act === preText + "AllSspaModuleOnOff") {
            if (moduleOn_f)
                gr.gbcs.command({'act': preText + "SspaModuleOff", 'index': -1});
            else
                gr.gbcs.command({'act': preText + "SspaModuleOn", 'index': -1});
            return;
        }
        if (iobj.act === preText + "RadiationOnOff") {
            if (status0 & 0x08)
                gr.gbcs.command({'act': preText + "RadiationOff"});
            else
                gr.gbcs.command({'act': preText + "RadiationOn"});
            return;
        }
        if (iobj.act === preText + "EmergencyOnOff") {
            if (status0 & 0x10)
                gr.gbcs.command({'act': preText + "EmergencyOff"});
            else
                gr.gbcs.command({'act': preText + "EmergencyOn"});
            return;
        }
        //=====================================================================
        if (iobj.act === preText + "SspaPowerOn") {
            if ((ready_f !== 2) || emergency)
                return;
            if (iobj.index >= 0) {
                gr.logMessage.messages.push({type: "cmd", text: "開啟電源模組 " + iobj.index});
                powerStatusA[iobj.index] |= 0x1d;
                return;
            }
            gr.logMessage.messages.push({type: "cmd", text: "開啟全部電源模組"});
            for (var i = 0; i < 36; i++) {
                powerStatusA[i] |= 0x1d;
            }
            return;
        }
        if (iobj.act === preText + "SspaPowerOff") {
            if (iobj.index >= 0) {
                gr.logMessage.messages.push({type: "cmd", text: "關閉電源模組 " + iobj.index});
                powerStatusA[iobj.index] &= 0x10 ^ 0xffffffff;
                return;
            }
            gr.logMessage.messages.push({type: "cmd", text: "關閉全部電源模組"});
            for (var i = 0; i < 36; i++) {
                powerStatusA[i] &= 0x10 ^ 0xffffffff;
            }
            return;
        }
        if (iobj.act === preText + "SspaPowerInsert") {
            if (iobj.index < 0) {
                gr.logMessage.messages.push({type: "cmd", text: "加入全部電源模組"});
                for (var i = 0; i < 36; i++) {
                    gr.paraSet[preText + "SspaPowerExistA"][i] = 1;
                }
                mac.saveParaSet();
                return;
            }
            gr.logMessage.messages.push({type: "cmd", text: "加入電源模組 " + (iobj.index + 1)});
            gr.paraSet[preText + "SspaPowerExistA"][iobj.index] = 1;
            mac.saveParaSet();
            return;
        }
        if (iobj.act === preText + "SspaPowerRemove") {
            if (iobj.index < 0) {
                gr.logMessage.messages.push({type: "cmd", text: "移除全部電源模組"});
                for (var i = 0; i < 36; i++) {
                    gr.paraSet[preText + "SspaPowerExistA"][i] = 0;
                }
                mac.saveParaSet();
                return;
            }
            gr.logMessage.messages.push({type: "cmd", text: "移除電源模組 " + (iobj.index + 1)});
            gr.paraSet[preText + "SspaPowerExistA"][iobj.index] = 0;
            mac.saveParaSet();
            return;
        }


        //=====================================================================


        if (iobj.act === preText + "SspaModuleOn") {
            if ((ready_f !== 2) || emergency)
                return;
            if (iobj.index >= 0) {
                gr.logMessage.messages.push({type: "cmd", text: "開啟SSPA模組 " + iobj.index});
                moduleStatusA[iobj.index] |= 0x2;
                return;
            }
            gr.logMessage.messages.push({type: "cmd", text: "開啟全部SSPA模組"});
            for (var i = 0; i < 36; i++) {
                moduleStatusA[i] |= 0x02;
            }
            return;
        }
        if (iobj.act === preText + "SspaModuleOff") {
            if (iobj.index >= 0) {
                gr.logMessage.messages.push({type: "cmd", text: "關閉SSPA模組 " + iobj.index});
                moduleStatusA[iobj.index] &= 0x2 ^ 0xffffffff;
                return;
            }
            gr.logMessage.messages.push({type: "cmd", text: "關閉全部SSPA模組"});
            for (var i = 0; i < 36; i++) {
                moduleStatusA[i] &= 0x02 ^ 0xffffffff;
            }
            return;
        }


        if (iobj.act === preText + "RadiationOn") {
            if ((ready_f !== 2) || emergency)
                return;
            gr.logMessage.messages.push({type: "cmd", text: "脈波開啟"});
            gr.radarData.systemStatus0 |= (1 << (shift + 3));
            return;
        }
        if (iobj.act === preText + "RadiationOff") {
            gr.logMessage.messages.push({type: "cmd", text: "脈波關閉"});
            gr.radarData.systemStatus0 &= (1 << (shift + 3)) ^ 0xffffffff;
            return;
        }
        if (iobj.act === preText + "EmergencyOn") {
            gr.logMessage.messages.push({type: "cmd", text: "緊急停止開啟"});
            gr.radarData.systemStatus0 |= (1 << (shift + 4));
            for (var i = 0; i < 36; i++) {
                powerStatusA[i] &= (1 << 4) ^ 0xffffffff;
                moduleStatusA[i] &= (1 << 1) ^ 0xffffffff;
            }
            gr.radarData.systemStatus0 &= (1 << (shift + 3)) ^ 0xffffffff;
            return;
        }
        if (iobj.act === preText + "EmergencyOff") {
            gr.logMessage.messages.push({type: "cmd", text: "緊急停止關閉"});
            gr.radarData.systemStatus0 &= (1 << (shift + 4)) ^ 0xffffffff;
            return;
        }


        //=========================================================================



        gr.logMessage.messages.push({type: "cmd", text: iobj.act});

    }
}
emu = new Emulate();
class SyncGloble {
    constructor() {
        gr.pulseFormAA = [];
        gr.pulseLevelAA = [];
        gr.pulseFormInxA = [];
        gr.pulseFormLenA = [];
        gr.pulseFormAddInxA = [0, 0, 0, 0];
        gr.pulseFormAddPreInxA = [0, 0, 0, 0];
        gr.pulseFormAddBufAA = [];
        gr.prePulse_f = 0;
        gr.signalMode = 0;
        gr.signalModeInx = 0;
        gr.plotValue = [0, 0, 0, 0];




        for (var i = 0; i < 4; i++) {
            var arr = [];
            var levels = [];
            var bufs = [];
            for (var j = 0; j < 10000; j++) {
                arr.push(0);
                levels.push(0);
                bufs.push(0);
            }
            gr.pulseFormAA.push(arr);
            gr.pulseLevelAA.push(levels);
            gr.pulseFormInxA.push(0);
            gr.pulseFormLenA.push(0);
            gr.pulseFormAddBufAA.push(bufs);
        }

        gr.logMessage = {inx: 0, messages: []};
        gr.syncCommand = {};
        var rd = gr.radarData = {};
        var syncSet = gr.syncSet = {};

        syncSet.slotNameTbl = [
            "",
            "ＩＰＣ控制模組",
            "ＦＰＧＡ控制模組",
            "ＩＯ控制模組",
            "邏輯分析模組",
            "光纖傳輸模組",
            "ＲＦ傳輸模組	",
            "語音通信模組",
            "SSPA驅動模組"
        ];
        syncSet.numTbl = ["１", "２", "３", "４", "５", "６", "７", "８"];

        rd.connectTime = 0;
        rd.connectCnt = 0;

        /*
         array 0:mast, 1:sub1, 2:sub2, 3:ctr1, 4:ctr2, 5:drv1a, 6:drv1b, 7:drv2a, 8:drv2b
         *** slotId[3:0] ==>
         "none 				id=0;
         "ＩＰＣ控制模組",     	id=1;
         "ＦＰＧＡ控制模組",    id=2;
         "ＩＯ控制模組",       id=3;
         "邏輯分析模組",       id=4;
         "光纖傳輸模組",     	id=5;
         "ＲＦ傳輸模組	",     	id=6;
         "語音通信模組",   	id=7;
         "SSPA驅動模組",   	id=8;
         *** slotSerNo		7:4
         *** slotStatus	9:8 ==> 0:none, 1:ready, 2:error 3:warn up
         *** slotTestStatus 11:10 ==> 0:none, 1:PreTest, 2:testing;
         */
        rd.slotDataAA = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        /*=================================================
         mast mainStatus[1:0] 		==> 0:none, 1:warn up, 2:ready, 3:error
         sub1 mainStatus[3:2] 		==> 0:none, 1:warn up, 2:ready, 3:error
         sub2 mainStatus[5:4] 		==> 0:none, 1:warn up, 2:ready, 3:error
         ctr1 mainStatus[7:6] 		==> 0:none, 1:warn up, 2:ready, 3:error
         ctr2 mainStatus[9:8] 		==> 0:none, 1:warn up, 2:ready, 3:error
         drv1a mainStatus[11:10] 	==> 0:none, 1:warn up, 2:ready, 3:error
         drv1b mainStatus[13:12] 	==> 0:none, 1:warn up, 2:ready, 3:error
         drv2a mainStatus[15:14] 	==> 0:none, 1:warn up, 2:ready, 3:error
         drv2b mainStatus[17:16] 	==> 0:none, 1:warn up, 2:ready, 3:error
         ctr1Meter mainStatus[19:18] 	==> 0:none, 1:warn up, 2:ready, 3:error
         ctr2Meter mainStatus[21:20] 	==> 0:none, 1:warn up, 2:ready, 3:error
         //===
         ctr1 rfPulse detect flag[22] ==> 0:none  1:OK
         ctr1 電源啟動[23] 			==> 0:停止 1:啟動
         ctr1 SSPA致能[24] 			==> 0:停止 1:啟動
         ctr1 本地脈波啟動[25] 			==> 0:停止 1:啟動
         ctr1 緊急停止[26] 			==> 0:備便 1:停止
         //===
         ctr2 rfPulse detect flag[27] ==> 0:none  1:OK
         ctr2 電源啟動[28] 			==> 0:停止 1:啟動
         ctr2 SSPA致能[29] 			==> 0:停止 1:啟動
         ctr2 本地脈波啟動[30] 			==> 0:停止 1:啟動
         ctr2 緊急停止[31] 			==> 0:備便 1:停止
         */
        rd.systemStatus0 = 0;
        /*=================================================
         sub1 光纖連線狀態[0]	 ==> 0:未連線, 1:未連線
         sub1 RF連線狀態[1] 	==> 0:未連線, 1:未連線
         sub2 光纖連線狀態[2] 	==> 0:未連線, 1:未連線
         sub2 RF連線狀態[3] 	==> 0:未連線, 1:未連線
         ctr1 遠端遙控[4]      ==> 0:關閉, 1:開啟
         ctr2 遠端遙控[5]      ==> 0:關閉, 1:開啟
         mast spPulseExist[6]	==  0:none 1:exist
         */
        rd.systemStatus1 = 0;
        /* enviStatus every item is 2 bit
         value 0:none, 1:ok, 2:error
         airFlow left
         airFlow middle
         airFlow right
         waterFlow 1
         waterFlow 2
         waterFlow 3
         waterFlow 4
         waterFlow 5
         waterFlow 6
         waterFlow temperature
         */
        rd.enviStatusA = [0, 0];
        //==========================
        /*
         0:input rf power
         1:
         2:pre amp output rf power
         3:driver amp output rf power
         4:cw output rf power
         5:ccw output rf power
         */
        //=====================
        //0 connectFlag, 1 faultLed, 2:v50enLed, 3:v32enLed, 4:v50v, 5:v50i, 6:v50t, 7:v32v, 8:v32i, 9:v32t
        //===========================
        //0:connect, 1:致能, 2 保護觸發, 3:工作比過高, 4:脈寬過高, 5:溫度過高, 6:反射過高, 7:RF輸出, 8:溫度
        //===========================
        var va36 = [];
        for (var i = 0; i < 36; i++) {
            va36.push(0);
        }
        rd.meterStatusAA = [0, 0, 0, 0, 0, 0];
        rd.sspaPowerStatusAA = KvLib.copyObj(va36);
        rd.sspaPowerV50vAA = KvLib.copyObj(va36);
        rd.sspaPowerV50iAA = KvLib.copyObj(va36);
        rd.sspaPowerV50tAA = KvLib.copyObj(va36);
        rd.sspaPowerV32vAA = KvLib.copyObj(va36);
        rd.sspaPowerV32iAA = KvLib.copyObj(va36);
        rd.sspaPowerV32tAA = KvLib.copyObj(va36);
        rd.sspaModuleStatusAA = KvLib.copyObj(va36);
        rd.sspaModuleRfOutAA = KvLib.copyObj(va36);
        rd.sspaModuleTemprAA = KvLib.copyObj(va36);

        rd.gpsDataAA = [];//0:mast, 1sub1, 2sub2
        for (var i = 0; i < 3; i++)
            rd.gpsDataAA.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        rd.adjTimeOf1588A = [0, 0];
        rd.commPackageCntA = [1000, 1000];
        rd.commOkRateA = [0, 0];
        rd.rfRxPowerA = [0, 0, 0, 0];//mast rx1,mast rx1,sub1 rx sub2 rx
        rd.pulseFormAddBufA0 = [];



        rd.meterFiterAA = [];
        for (var j = 0; j < 9; j++) {
            var ibuf = [];
            for (var i = 0; i < 256; i++) {
                ibuf.push(0);
            }
            rd.meterFiterAA.push(ibuf);
        }
        rd.meterFiterInxA = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        rd.meterDelayCntA = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        rd.meterPreValueA = [0, 0, 0, 0, 0, 0, 0, 0, 0];


    }
    timer() {
        //if (gr.paraSet.emulate === 1) {
        emu.timer();
        //}
        var rd = gr.radarData;
        var testEndTime = 200;//unit 0.1s
        if (gr.selfTestStartAll_f) {
            gr.selfTestTime++;
            if ((gr.selfTestTime === 6 * 1)) {
                var slotId = rd.slotDataAA[gr.selfTestInx] &= 0x0f;
                if (slotId === 0) {
                    gr.selfTestTime = 9999;
                    return;
                }
                if (rd.slotDataAA[gr.selfTestInx] & 0x000f) {
                    if (gr.paraSet.emulate === 1) {
                        rd.slotDataAA[gr.selfTestInx] &= 0xf3ff;
                        rd.slotDataAA[gr.selfTestInx] |= 0x0800;
                    }
                    var slotDataA = gr.radarData.slotDataAA;
                    var str = gr.syncSet.slotNameTbl[slotDataA[gr.selfTestInx] & 15];
                    var slotCnt = (slotDataA[gr.selfTestInx] >> 4) & 15;
                    if ((slotDataA[gr.selfTestInx] & 15) > 4) {
                        str = str + " " + (gr.syncSet.numTbl[slotCnt]);
                    }
                    str = str + " ====> 開始測試";
                    gr.logMessage.messages.push({type: "info", text: str});
                    ws.cmd("selfTestSlot", [gr.selfTestInx]);

                } else {
                    self.selfTestTime = 9999;
                }
                return;
            }
            if (gr.selfTestTime < 6 * (testEndTime - 10)) {
                if (gr.selfTestTime > 6 * 10) {
                    var status = (rd.slotDataAA[gr.selfTestInx] >> 10) & 3;
                    if (status === 0) {
                        gr.selfTestTime = 6 * (testEndTime - 10);
                    }
                }
            }

            if (gr.selfTestTime === 6 * (testEndTime - 10)) {
                rd.slotDataAA[gr.selfTestInx] &= 0xf3ff;
                var status = (rd.slotDataAA[gr.selfTestInx] >> 8) & 3;
                if (status === 2) {
                    str = "測試成功";
                    gr.logMessage.messages.push({type: "infoOk", text: str});
                } else {
                    str = "測試失敗";
                    gr.logMessage.messages.push({type: "infoOk", text: str});
                }
                return;
            }
            if (gr.selfTestTime > 6 * testEndTime) {
                gr.selfTestTime = 0;
                gr.selfTestInx++;

                if (gr.selfTestInx >= 12) {
                    gr.selfTestStartAll_f = 0;
                    gr.logMessage.messages.push({type: "info", text: "測試完畢"});
                }
                return;
            }



        }
    }
    command(iobj) {
        if (gr.paraSet.emulate === 1) {
            emu.command(iobj);




            return;
        }
        var rd = gr.radarData;
        var powerStatusA = rd.sspaPowerStatusAA;
        var moduleStatusA = rd.sspaModuleStatusAA;
        if (gr.appId === 1) {
            var preText = "sub1";
            var preInx = 0;
            var status0 = rd.systemStatus0 >> 22;
            var shift = 22;
        }
        if (gr.appId === 2) {
            var preText = "ctr1";
            var preInx = 0;
            var status0 = rd.systemStatus0 >> 22;
            var shift = 22;
        }

        if (gr.appId === 1) {
            var powerOn_f = (rd.systemStatus0 >> 23)&1;
            var moduleOn_f = (rd.systemStatus0 >> 24)&1;
        }


        if (gr.appId === 2) {
            var powerOn_f = 0;
            var moduleOn_f = 0;
            for (var i = 0; i < 36; i++) {
                if ((powerStatusA[i] >> 4) & 1)
                    powerOn_f = 1;
                if ((moduleStatusA[i] >> 1) & 1)
                    moduleOn_f = 1;

            }
        }
        moduleOn_f = (gr.radarData.systemStatus0 >> 24) & 1;
        var emergency = gr.radarData.systemStatus0 & (1 << (shift + 4));
        var ready_f = rd.systemStatus0 & 3;


        if (iobj.act === "selfTestStartAll") {
            gr.logMessage.messages.push({type: "cmd", text: "全系統測試"});
            ws.cmd(iobj.act);
            //
            gr.logMessage.messages.push({type: "info", text: "測試開始........"});
            gr.selfTestStartAll_f = 1;
            gr.selfTestTime = 0;
            gr.selfTestInx = 0;
            if (gr.paraSet.emulate === 1) {
                for (var i = 0; i < 12; i++) {
                    rd.slotDataAA[i] &= 0x03ff;
                    rd.slotDataAA[i] |= 0x0400;
                }
            }
            return;
        }
        if (iobj.act === "selfTestStopAll") {
            gr.logMessage.messages.push({type: "cmd", text: "測試停止"});
            ws.cmd(iobj.act);
            gr.selfTestStartAll_f = 0;
            return;
        }


        if (gr.appId === 0) {

            if (iobj.act === "mastSubRadarSet") {
                var str = "副控1";
                if (iobj.idInx === 1)
                    str = "副控2";
                str+="裝置設定 "+ iobj.value;
                gr.logMessage.messages.push({type: "cmd", text: str});
                ws.cmd(iobj.act, [iobj.value + iobj.idInx * 256]);
                return;
            }
            if (iobj.act === "mastSubRadarCtr") {
                var str = "副控1";
                if (iobj.idInx === 1)
                    str = "副控2";
                var strTbl=[];
                strTbl.push("放大器電源 關閉");
                strTbl.push("放大器電源 開啟");
                strTbl.push("放大器致能 關閉");
                strTbl.push("放大器致能 開啟");
                strTbl.push("脈波輸出 關閉");
                strTbl.push("脈波輸出 開啟");
                strTbl.push("緊急停止 關閉");
                strTbl.push("緊急停止 開啟");
                str+=strTbl[iobj.value];
                
                gr.logMessage.messages.push({type: "cmd", text: str});
                ws.cmd(iobj.act, [iobj.value + iobj.idInx * 256]);
                return;
            }




            if (iobj.act === "mastRadiationOn") {
                gr.logMessage.messages.push({type: "cmd", text: "脈波開啟"});
                ws.cmd(iobj.act, iobj.paras);

                return;
            }
            if (iobj.act === "mastRadiationOff") {
                gr.logMessage.messages.push({type: "cmd", text: "脈波開啟"});
                ws.cmd(iobj.act, iobj.paras);
                return;
            }


            if (iobj.act === "mastCtr1RadarSet") {
                var str = "副控1參數設定";
                for (var i = 0; i < 3; i++) {
                    if ((iobj.value >> i) & 1)
                        str += " 1";
                    else
                        str += " 0";
                }
                gr.logMessage.messages.push({type: "cmd", text: str});
                ws.cmd(iobj.act, [iobj.value]);
                return;
            }
            if (iobj.act === "mastCtr2RadarSet") {
                var str = "副控2參數設定";
                for (var i = 0; i < 3; i++) {
                    if ((iobj.value >> i) & 1)
                        str += " 1";
                    else
                        str += " 0";
                }
                gr.logMessage.messages.push({type: "cmd", text: str});
                ws.cmd(iobj.act, [iobj.value]);
                return;
            }
            if (iobj.act === "mastPulseEnable") {
                gr.logMessage.messages.push({type: "cmd", text: "脈波致能"});
                ws.cmd(iobj.act);
                return;
            }
            if (iobj.act === "mastPulseDisable") {
                gr.logMessage.messages.push({type: "cmd", text: "脈波停止"});
                ws.cmd(iobj.act);
                return;
            }

            if (iobj.act === "mastCtr1SspaPowerOn") {
                gr.logMessage.messages.push({type: "cmd", text: "開啟副控1電源模組"});
                ws.cmd(iobj.act);
                return;
            }
            if (iobj.act === "mastCtr1SspaPowerOff") {
                gr.logMessage.messages.push({type: "cmd", text: "關閉副控1電源模組"});
                ws.cmd(iobj.act);
                return;
            }
            if (iobj.act === "mastCtr1RadiationOn") {
                gr.logMessage.messages.push({type: "cmd", text: "副控1脈波開啟"});
                ws.cmd(iobj.act);
                return;
            }
            if (iobj.act === "mastCtr1RadiationOff") {
                gr.logMessage.messages.push({type: "cmd", text: "副控1脈波關閉"});
                ws.cmd(iobj.act);
                return;
            }
            if (iobj.act === "mastCtr1SystemReset") {
                gr.logMessage.messages.push({type: "cmd", text: "副控1系統重啟"});
                ws.cmd(iobj.act);
                return;
            }
            if (iobj.act === "mastCtr2SspaPowerOn") {
                gr.logMessage.messages.push({type: "cmd", text: "開啟副控2電源模組"});
                ws.cmd(iobj.act);
                return;
            }
            if (iobj.act === "mastCtr2SspaPowerOff") {
                gr.logMessage.messages.push({type: "cmd", text: "關閉副控2電源模組"});
                ws.cmd(iobj.act);
                return;
            }
            if (iobj.act === "mastCtr2RadiationOn") {
                gr.logMessage.messages.push({type: "cmd", text: "副控2脈波開啟"});
                ws.cmd(iobj.act);
                return;
            }
            if (iobj.act === "mastCtr2RadiationOff") {
                gr.logMessage.messages.push({type: "cmd", text: "副控2脈波關閉"});
                ws.cmd(iobj.act);
                return;
            }
            if (iobj.act === "mastCtr2SystemReset") {
                gr.logMessage.messages.push({type: "cmd", text: "副控2系統重啟"});
                ws.cmd(iobj.act);
                return;
            }
        }



        if (iobj.act === preText + "AllSspaPowerOnOff") {
            if (powerOn_f)
                gr.gbcs.command({'act': preText + "SspaPowerOff", 'index': -1});
            else
                gr.gbcs.command({'act': preText + "SspaPowerOn", 'index': -1});
            return;
        }
        if (iobj.act === preText + "AllSspaModuleOnOff") {
            if (moduleOn_f)
                gr.gbcs.command({'act': preText + "SspaModuleOff", 'index': -1});
            else
                gr.gbcs.command({'act': preText + "SspaModuleOn", 'index': -1});
            return;
        }
        if (iobj.act === preText + "RadiationOnOff") {
            if (status0 & 0x08)
                gr.gbcs.command({'act': preText + "RadiationOff"});
            else
                gr.gbcs.command({'act': preText + "RadiationOn"});
            return;
        }
        if (iobj.act === "remoteRadOnOff") {
            if (status0 & 0x08) {
                gr.logMessage.messages.push({type: "cmd", text: "遙控脈波關閉"});
                ws.cmd("remoteRadOff");
            } else {
                gr.logMessage.messages.push({type: "cmd", text: "遙控脈波開啟"});
                ws.cmd("remoteRadOn");
            }
            return;
        }
        if (iobj.act === "remoteRadOff") {
            gr.logMessage.messages.push({type: "cmd", text: "遙控脈波關閉"});
            ws.cmd("remoteRadOff");
            return;
        }
        if (iobj.act === "remoteRadOn") {
            gr.logMessage.messages.push({type: "cmd", text: "遙控脈波開啟"});
            ws.cmd("remoteRadOn");
            return;
        }



        if (iobj.act === preText + "EmergencyOnOff") {
            if (status0 & 0x10)
                gr.gbcs.command({'act': preText + "EmergencyOff"});
            else
                gr.gbcs.command({'act': preText + "EmergencyOn"});
            return;
        }


        //=====================================================================
        if (iobj.act === preText + "SspaPowerOn") {
            if ((ready_f !== 2) || emergency)
                return;
            if (iobj.index >= 0)
                gr.logMessage.messages.push({type: "cmd", text: "開啟電源模組 " + iobj.index});
            else
                gr.logMessage.messages.push({type: "cmd", text: "開啟全部電源模組"});
            ws.cmd(iobj.act, [iobj.index]);
            return;
        }
        if (iobj.act === preText + "SspaPowerOff") {
            if (iobj.index >= 0)
                gr.logMessage.messages.push({type: "cmd", text: "開啟電源模組 " + iobj.index});
            else
                gr.logMessage.messages.push({type: "cmd", text: "關閉全部電源模組"});
            ws.cmd(iobj.act, [iobj.index]);
            return;
        }
        if (iobj.act === preText + "SspaPowerInsert") {
            if (iobj.index < 0) {
                gr.logMessage.messages.push({type: "cmd", text: "加入全部電源模組"});
                for (var i = 0; i < 36; i++) {
                    gr.paraSet[preText + "SspaPowerExistA"][i] = 1;
                }
                mac.saveParaSet();
                return;
            }
            gr.logMessage.messages.push({type: "cmd", text: "加入電源模組 " + (iobj.index + 1)});
            gr.paraSet[preText + "SspaPowerExistA"][iobj.index] = 1;
            mac.saveParaSet();
            return;
        }
        if (iobj.act === preText + "SspaPowerRemove") {
            if (iobj.index < 0) {
                gr.logMessage.messages.push({type: "cmd", text: "移除全部電源模組"});
                for (var i = 0; i < 36; i++) {
                    gr.paraSet[preText + "SspaPowerExistA"][i] = 0;
                }
                mac.saveParaSet();
                return;
            }
            gr.logMessage.messages.push({type: "cmd", text: "移除電源模組 " + (iobj.index + 1)});
            gr.paraSet[preText + "SspaPowerExistA"][iobj.index] = 0;
            mac.saveParaSet();
            return;
        }
        //=====================================================================
        if (iobj.act === preText + "SspaModuleOn") {
            if ((ready_f !== 2) || emergency)
                return;
            if (iobj.index >= 0)
                gr.logMessage.messages.push({type: "cmd", text: "開啟SSPA模組 " + iobj.index});
            else
                gr.logMessage.messages.push({type: "cmd", text: "開啟全部SSPA模組"});
            ws.cmd(iobj.act, [iobj.index]);
            return;
        }
        if (iobj.act === preText + "SspaModuleOff") {
            if (iobj.index >= 0)
                gr.logMessage.messages.push({type: "cmd", text: "關閉SSPA模組 " + iobj.index});
            else
                gr.logMessage.messages.push({type: "cmd", text: "關閉全部SSPA模組"});
            ws.cmd(iobj.act, [iobj.index]);
            return;
        }
        if (iobj.act === preText + "RadiationOn") {
            if ((ready_f !== 2) || emergency)
                return;
            gr.logMessage.messages.push({type: "cmd", text: "脈波開啟"});
            ws.cmd(iobj.act, iobj.paras);
            return;
        }

        if (iobj.act === preText + "RadiationOff") {
            gr.logMessage.messages.push({type: "cmd", text: "脈波關閉"});
            ws.cmd(iobj.act, iobj.paras);
            return;
        }
        if (iobj.act === preText + "EmergencyOn") {
            gr.logMessage.messages.push({type: "cmd", text: "緊急停止開啟"});
            ws.cmd(iobj.act);
            return;
        }
        if (iobj.act === preText + "EmergencyOff") {
            gr.logMessage.messages.push({type: "cmd", text: "緊急停止關閉"});
            ws.cmd(iobj.act);
            return;
        }
        if (iobj.act === "closeUi") {
            gr.logMessage.messages.push({type: "cmd", text: "closeUi"});
            ws.cmd(iobj.act);
            return;
        }
        if (iobj.act === "exeLogic") {
            gr.logMessage.messages.push({type: "cmd", text: "exeLogic"});
            ws.cmd(iobj.act);
            return;
        }
        if (iobj.act === "powerDown") {
            gr.logMessage.messages.push({type: "cmd", text: "powerDown"});
            ws.cmd(iobj.act);
            return;
        }
        if (iobj.act === "fullScreenOff") {
            gr.logMessage.messages.push({type: "cmd", text: "iobj.act"});
            ws.cmd(iobj.act);
            return;
        }



        //=====================================================================
        if (iobj.act === preText + "PulseSource") {
            gr.logMessage.messages.push({type: "cmd", text: "脈波來源 " + iobj.paras[0]});
            ws.cmd(iobj.act, iobj.paras);
            return;
        }
        if (iobj.act === preText + "TxLoad") {
            gr.logMessage.messages.push({type: "cmd", text: "輸出裝置 " + iobj.paras[0]});
            ws.cmd(iobj.act, iobj.paras);
            return;
        }
        if (iobj.act === preText + "BatShort") {
            gr.logMessage.messages.push({type: "cmd", text: "戰備短路 " + iobj.paras[0]});
            ws.cmd(iobj.act, iobj.paras);
            return;
        }
        if (iobj.act === preText + "SetFlags") {
            gr.logMessage.messages.push({type: "cmd", text: "裝置設定 " + iobj.index});
            ws.cmd(iobj.act, [iobj.index]);
            gr.paraSet["sub1CommType"] = iobj.index&1;
            gr.paraSet["sub1PulseSource"] = (iobj.index>>1)&1;
            var fileName = "paraSet";
            var content = JSON.stringify(gr.paraSet);
            sv.saveStringToFile("responseDialogError", "null", fileName, content);
                
                
            /*
            if (iobj.setId === preText + "PulseSource") {
                if (gr.paraSet[iobj.setId] !== iobj.buttonInx)
                    mac.saveParaSet(iobj.setId, iobj.buttonInx);
            */
            return;
        }








        console.log(iobj);

        //============================================================================================================

    }
}
gr.gbcs = new SyncGloble();
