/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


class MyNewScopeCtr {
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);
        this.subTypeOpts(opts);
        opts.title = "title";
        opts.baseColor = "#ccc";
        opts.tunerSetInx = -1;
        opts.xm = 30;
        opts.chSelectInx = 0;
        opts.bitSelectInx = 3;
        //=========================
        opts.signalMode = 0;
        opts.signalModeInx = 0;
        opts.chNames = ["測試信號", "脈波信號 A", "脈波信號 B", "輸出功率", "反射功率", "總電流"];
        if (gr.appId === 0)
            opts.chNames = ["關閉", "測試信號", "脈波信號"];
        if (gr.appId === 1)
            opts.chNames = ["關閉", "測試信號", "脈波信號"];
        if (gr.appId === 2)
            opts.chNames = ["關閉", "測試信號", "脈波信號", "功率信號", "電源信號", "放大器信號"];
        //==============
        opts.xScale = 8;
        opts.xOffset = 0;
        opts.yOffsets = [0, -50, 50, 100];
        opts.yScales = [1, 2, 3, 4];
        opts.netFadeInx = 0;
        opts.xRealScale = 100000;
        opts.adjInx = 0;
        opts.typeCnt = 0;
        opts.dispValue = 15;
        // 啟用新一代專業控制器（若未載入則自動回退到舊邏輯）。
        opts.useProfessionalController = true;
        opts.scopePreset = "default";
        
        opts.tunerNames = [
            
            '<i class="gf">&#xe402;</i>','<i class="gf">&#xea18;</i>' , '<i class="gf">&#xe5d8;</i>', '<i class="gf">&#xe3ec;</i>',
            "V1", "V2", "V3", "V4",
            "Y1", "Y2", "Y3", "Y4"
        ];
        opts.tunerIds = [
            "zoom", "xPos", "trigPos", "netFade",
            "vAmp#0", "vAmp#1", "vAmp#2", "vAmp#3",
            "yPos#0", "yPos#1", "yPos#2", "yPos#3"
        ];
        //==============
        return opts;
    }
    subTypeOpts(opts) {
        if (this.md.subType === "base.sys0") {
        }
    }
    chkWatch() {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        var scope = md.fatherMd;
        st.signalButtonColors = [];
        for (var si = 0; si < op.chNames.length; si++) {
            st.signalButtonColors.push("#ccf");
        }
        if (op.signalMode >= 0 && op.signalMode < st.signalButtonColors.length) {
            st.signalButtonColors[op.signalMode] = "#cfc";
        }
        //===========================================
        var watchDatas = st.watchDatas = ["#ccc", '<i class="gf">&#xe037</i>', "#ccc", 1, 3];
        if (scope.opts.run_f) {
            watchDatas[0] = "#ccf";
            watchDatas[1] = '<i class="gf">&#xe034</i>';
        }
        if (scope.opts.cursor_f) {
            watchDatas[2] = "#ccf";
        }
        if (scope.opts.grid_f) {
            watchDatas[3] = "#ccf";
        }
        if (scope.opts.net_f) {
            watchDatas[4] = "#ccf";
        }
//====================================
        st.adjButtonColors = ["#ccf", "#ccf", "#ccf", "#ccf", "#ccf", "#ccf", "#ccf", "#ccf", "#ccf", "#ccf", "#ccf", "#ccf"];
        st.adjButtonColors[op.adjInx ] = "#cfc";
        if (scope.opts.trig_f)
            watchDatas[5] = scope.opts.trigInx;
        else
            watchDatas[5] = -1;
        if (scope.opts.trigUpDown_f)
            watchDatas[6] = '<i class="gf">&#xe5db;</i>';
        else
            watchDatas[6] = '<i class="gf">&#xe5d8;</i>';
        var value = 0;
        for (var i = 0; i < scope.opts.lines.length; i++) {
            var line = scope.opts.lines[i];
            if (line.offOn_f) {
                value += 1 << i;
            }
        }
        watchDatas[7] = value;

        //========================================================
        // ProfessionalScopeController 整合（舊邏輯保留為 fallback）
        if (op.useProfessionalController && typeof ProfessionalScopeController === "function") {
            if (!st.scopeCtl) {
                st.scopeCtl = new ProfessionalScopeController({
                    onError: function (msg) {
                        console.log("[ProfessionalScopeController] " + msg);
                    }
                });
                st.scopeCtl.loadPreset(op.scopePreset || "default");
                st.lastScopePreset = op.scopePreset || "default";
            }
            var ctl = st.scopeCtl;
            if (st.lastScopePreset !== (op.scopePreset || "default")) {
                ctl.loadPreset(op.scopePreset || "default");
                st.lastScopePreset = op.scopePreset || "default";
            }
            ctl.state.run = !!scope.opts.run_f;
            ctl.state.display.cursor = !!scope.opts.cursor_f;
            ctl.state.display.grid = !!scope.opts.grid_f;
            ctl.state.display.persist = !!scope.opts.net_f;
            ctl.state.selectedChannel = op.chSelectInx;

            var syncLen = Math.min(scope.opts.lines.length, ctl.state.channels.length);
            for (var ci = 0; ci < syncLen; ci++) {
                var lineObj = scope.opts.lines[ci];
                var chObj = ctl.state.channels[ci];
                chObj.enabled = !!lineObj.offOn_f;
                if (lineObj.yScale !== undefined) {
                    chObj.scale = lineObj.yScale;
                }
                if (lineObj.offset !== undefined) {
                    chObj.offset = lineObj.offset;
                }
                if (lineObj.name) {
                    chObj.name = lineObj.name;
                }
            }

            var bind = ctl.toUiBindings();
            watchDatas[0] = bind.runColor;
            watchDatas[1] = ctl.state.run ? '<i class="gf">&#xe034</i>' : '<i class="gf">&#xe037</i>';
            watchDatas[2] = bind.cursorColor;
            watchDatas[3] = bind.gridColor;
            watchDatas[4] = ctl.state.display.persist ? "#ccf" : "#ccc";
            st.profScopeState = ctl.exportConfig();
        }
    }
    afterCreate() {
//this.setChAlign();
    }
    setChAlign() {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        var signalAdjust = md.blockRefs["signalAdjust"];
        var scope = md.fatherMd;
        var line = scope.opts.lines[op.chSelectInx];
        var setLine = signalAdjust.blockRefs["mdaSetLine#4"];
        var setOpts = setLine.opts.setOpts;
        setOpts.enum = line.yScaleTbl;
        setOpts.value = line.yScaleSet;
        setLine.reCreate();
        var setLine = signalAdjust.blockRefs["mdaSetLine#5"];
        var setOpts = setLine.opts.setOpts;
        setOpts.value = line.offset;
        setLine.reCreate();
        return;
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
        opts.yArr = ["0.23rh", 9999,"0.24rh", "0.29rh"];
        opts.tm = 10;
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["mainBody"] = cname;
        //=======================================

        //=======================================
        var cname = lyMaps["mainBody"] + "~" + 0;
        var opts = {};
        opts.title = "信號源";
        opts.setOptss = [];
        var setOptss = opts.setOptss;
        opts.yArr = ["0.33rh", "0.33rh", 9999];
        opts.xyArr = [
            ["0.5rw", 9999],
            ["0.5rw", 9999],
            ["0.5rw", 9999]
        ];
        //
        //================================================================
        var names = op.chNames;
        var ids = ["signal", "signal1", "signal2", "signal3", "signal4", "signal5"];
        var regDatas = "self.fatherMd.fatherMd.fatherMd.stas.signalButtonColors";
        for (var i = 0; i < names.length; i++) {
            var setOpts = sopt.getOptsPara("button");
            setOpts.enum = [names[i]];
            setOpts.enumId = [names[i]];
            setOpts.baseColor = "#008";
            setOpts.borderWidth = 0;
            setOpts.fontSize = "0.4rh";
            var watchDatas = setOpts.watchDatas = [];
            watchDatas.push(["directReg", regDatas + "#" + i, "baseColor", 1]);
            setOptss.push(setOpts);
        }
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            var mapPresetBySignal = function (signalMode) {
                // 將舊 signalMode 映射到新控制器 preset。
                if (signalMode === 2) {
                    return "pulse";
                }
                if (signalMode === 3) {
                    return "power";
                }
                return "default";
            };
            var setSignalPrg = function (selectText) {
                var scope = md.fatherMd;
                scope.mdClass.initLines(scope.opts);
                scope.opts.signalMode = op.signalMode;
                scope.opts.signalModeInx = op.signalModeInx;
                if (op.signalMode === 1) {
                    if (op.signalModeInx === 0) {
                        for (var i = 0; i < 4; i++) {
                            var lineObj = scope.opts.lines[i];
                            lineObj.sampleRate = 200000000;
                            lineObj.yScale = 20; //
                            lineObj.yScaleFixed = 0; //
                            lineObj.yScaleUnit = "mV"; //
                            lineObj.offOn_f = 1;
                            lineObj.typeCnt = 0;
                            lineObj.valueViewFixed = 2;
                            scope.opts.zoomTimeLen = 100 * 1000;
                            scope.opts.zoomTimeEnd = 0;
                            lineObj.name = "測試信號" + (op.signalModeInx + 1) + "-" + (i + 1);
                        }
                    }
                    if (op.signalModeInx === 1) {
                        for (var i = 0; i < 4; i++) {
                            var lineObj = scope.opts.lines[i];
                            lineObj.sampleRate = 20000000;
                            lineObj.offOn_f = 1;
                            lineObj.yScale = 10; //
                            lineObj.yScaleFixed = 0; //
                            lineObj.yScaleUnit = "mV"; //
                            lineObj.typeCnt = 0;
                            lineObj.valueViewFixed = 2;
                            scope.opts.zoomTimeLen = 100 * 1000;
                            scope.opts.zoomTimeEnd = 0;
                            lineObj.name = "測試信號" + (op.signalModeInx + 1) + "-" + (i + 1);
                        }
                        md = md.reCreate();
                    }
                    if (op.signalModeInx === 2) {
                        for (var i = 0; i < 4; i++) {
                            var lineObj = scope.opts.lines[i];
                            lineObj.sampleRate = 20000000;
                            lineObj.offOn_f = 1;
                            lineObj.yScale = 10; //
                            lineObj.yScaleFixed = 0; //
                            lineObj.yScaleUnit = "mV"; //
                            lineObj.typeCnt = 1;
                            lineObj.valueViewFixed = 0;
                            scope.opts.zoomTimeLen = 100 * 1000;
                            scope.opts.zoomTimeEnd = 0;
                            lineObj.name = "測試信號" + (op.signalModeInx + 1) + "-" + (i + 1);
                        }
                        md = md.reCreate();
                    }





                }
                if (op.signalMode === 2) {
                    for (var i = 0; i < 1; i++) {
                        var lineObj = scope.opts.lines[i];
                        lineObj.sampleRate = 1000000;
                        scope.opts.xScale = 18;
                        lineObj.offOn_f = 1;
                        if (i === 0) {
                            lineObj.name = "雷達脈波";
                            lineObj.offset = -10;
                        }
                        if (i === 1) {
                            lineObj.name = "遠端脈波";
                            lineObj.offset = -20;
                        }
                        lineObj.yScaleTbl = MyNewScope.yScaleVoltTbl;
                        lineObj.yScaleSet = 10;
                        lineObj.digit_f = 1;
                    }
                    md = md.reCreate();
                }
                if (op.signalMode === 3) {
                    for (var i = 0; i < 4; i++) {
                        var lineObj = scope.opts.lines[i];
                        lineObj.sampleRate = 200;
                        scope.opts.xScale = 29;
                        lineObj.offOn_f = 1;
                        if (i === 0) {
                            lineObj.name = "輸入功率";
                            lineObj.yScaleTbl = MyNewScope.yScaleDbTbl;
                            lineObj.yScaleSet = 0;
                            op.chSelectInx = 0;
                        }
                        if (i === 1) {
                            lineObj.yScaleTbl = MyNewScope.yScaleDbTbl;
                            lineObj.yScaleSet = 2;
                            lineObj.name = "驅動輸出功率";
                        }
                        if (i === 2) {
                            lineObj.name = "順向輸出功率";
                            lineObj.yScaleTbl = MyNewScope.yScaleDbTbl;
                            lineObj.yScaleSet = 4;
                        }
                        if (i === 3) {
                            lineObj.name = "反向輸出功率";
                            lineObj.yScaleTbl = MyNewScope.yScaleDbTbl;
                            lineObj.yScaleSet = 3;
                        }
                    }
                    md = md.reCreate();
                }
                if (op.signalMode === 4) {
                    for (var i = 0; i < 4; i++) {
                        var lineObj = scope.opts.lines[i];
                        lineObj.sampleRate = 200000000;
                        scope.opts.xScale = 8;
                        lineObj.offOn_f = 1;
                        if (i === 0)
                            lineObj.name = selectText + " 50V電壓";
                        if (i === 1)
                            lineObj.name = selectText + " 32V電壓";
                        if (i === 2)
                            lineObj.name = selectText + " 32V電流";
                        if (i === 3)
                            lineObj.name = selectText + " 溫度";
                    }
                }

                if (op.signalMode === 5) {
                    for (var i = 0; i < 2; i++) {
                        var lineObj = scope.opts.lines[i];
                        lineObj.sampleRate = 200000000;
                        scope.opts.xScale = 8;
                        lineObj.offOn_f = 1;
                        if (i === 0)
                            lineObj.name = selectText + " 射頻功率輸出";
                        if (i === 1)
                            lineObj.name = selectText + " 模組溫度";
                    }
                }




                var signalAdjust = md.blockRefs["signalAdjust"];
                var mdaSetLine = signalAdjust.blockRefs["mdaSetLine#1"];
                mdaSetLine.opts.setOpts.value = scope.opts.xScale;
                mdaSetLine.reCreate();
                var obj = {};
                obj.act = "signalChanged";
                obj.sender = md;
                obj.kvObj = md;
                KvLib.exe(op.actionFunc, obj);
            };
            var inx = KvLib.toInt(iobj.setOptsObj.name.split("#")[1], 0);
            if (inx === 0) {
                op.signalMode = 0;
                op.signalModeInx = 0;
                op.scopePreset = mapPresetBySignal(op.signalMode);
                var scope = md.fatherMd;
                scope.mdClass.setSignal(0, 0);
                return;
            }
            var opts = {};
            opts.title = "選擇信號源";
            opts.kvTexts = [];
            opts.xc = 1;
            if (inx === 1) {
                opts.yc = 3;
                opts.h = 250;
                opts.w = 500;
                opts.kvTexts.push("測試信號 1");
                opts.kvTexts.push("測試信號 2");
                opts.kvTexts.push("測試信號 3");
            }
            if (inx === 2) {
                op.signalMode = 2;
                op.signalModeInx = 0;
                op.scopePreset = mapPresetBySignal(op.signalMode);
                var scope = md.fatherMd;
                scope.mdClass.setSignal(2, 0);
                return;
            }
            if (inx === 3) {
                op.signalMode = 3;
                op.signalModeInx = 0;
                op.scopePreset = mapPresetBySignal(op.signalMode);
                var scope = md.fatherMd;
                scope.mdClass.setSignal(3, 0);
                return;
            }
            if (inx === 4 || inx === 5) {
                opts.xc = 4;
                opts.yc = 10;
                opts.w = 1000;
                opts.h = 600;
                var itemInx = 0;
                for (var j = 0; j < 10; j++) {
                    for (var i = 0; i < 4; i++) {
                        if (itemInx === 2 || itemInx === 3 || itemInx === 38 || itemInx === 39) {
                            opts.kvTexts.push(null);
                        } else {
                            if (inx === 4)
                                opts.kvTexts.push("電源模組" + (j + 1) + "-" + (i + 1));
                            else
                                opts.kvTexts.push("放大器模組" + (j + 1) + "-" + (i + 1));
                        }
                        itemInx++;
                    }
                }
            }

            opts.actionFunc = function (iobj) {
                console.log(iobj);
                op.signalMode = inx;
                op.signalModeInx = iobj.selectInx;
                op.scopePreset = mapPresetBySignal(op.signalMode);
                var scope = md.fatherMd;
                scope.mdClass.setSignal(inx, iobj.selectInx);
                return;
            };
            box.selectBox(opts);
            return;
        };
        blocks[cname] = {name: "signalSourcePanel", type: "Model~MdaSetGroup~base.sys0", opts: opts};
        //=========================


        var adjustActionPrg = function (iobj) {
            console.log(iobj);
            return;
            var sobj = iobj.setOptsObj;
            var strA = sobj.name.split("#");
            var setInx = KvLib.toInt(strA[1], -1);
            if (iobj.act === "mouseClick") {
                var strB = iobj.kvObj.name.split("#");
                var butInx = KvLib.toInt(strB[1], -1);
                if (strA[0] === "mdaSetLine") {
                    if (setInx === 3) {//ch select
                        op.chSelectInx = sobj.opts.setOpts.value;
                        md.mdClass.setChAlign();
                        return;
                    }
                }

            }

            if (iobj.act === "blur") {
                op.tunerSetInx = setInx;
                if (op.tunerSetInx === 0) {
                    var tuner = md.blockRefs["tuner"];
                    tuner.opts.addAngleMul = 0.02;
                }
                if (op.tunerSetInx === 2) {
                    var tuner = md.blockRefs["tuner"];
                    tuner.opts.addAngleMul = 0.1;
                }
                if (op.tunerSetInx === 5) {
                    var tuner = md.blockRefs["tuner"];
                    tuner.opts.addAngleMul = 0.1;
                }
                return;
            }


            if (iobj.act === "valueChanged" || iobj.act === "pressEnter") {
                var obj = {};
                if (setInx === 0)//grid
                    obj.act = "gridValueChanged";
                if (setInx === 1) {//xScale
                    obj.act = "xScaleChanged";
                    obj.valueText = MyNewScope.xScaleTbl[iobj.preValue];
                    var preValue = MyNewScope.transXScale(obj.valueText);
                    obj.valueText = MyNewScope.xScaleTbl[iobj.value];
                    var nowValue = MyNewScope.transXScale(obj.valueText);
                    var scale = preValue / nowValue;
                    var signalAdjust = md.blockRefs["signalAdjust"];
                    var setLine = signalAdjust.blockRefs["mdaSetLine#2"];
                    var setValue = Math.round(setLine.opts.setOpts.value * scale);
                    setLine.opts.setOpts.value = setValue;
                    setLine.reCreate();
                    obj.offsetValue = setValue;
                }
                if (setInx === 2) {//
                    obj.act = "xOffsetChanged";
                }
                if (setInx === 4) {//
                    obj.act = "yScaleChanged";
                }
                if (setInx === 5) {//
                    obj.act = "yOffsetChanged";
                }
                obj.chInx = op.chSelectInx;
                obj.sender = md;
                obj.kvObj = md;
                obj.value = iobj.setOptsObj.opts.setOpts.value;
                KvLib.exe(op.actionFunc, obj);
                return;
            }
        };
        var cname = lyMaps["mainBody"] + "~" + 1;
        var opts = {};
        opts.baseColor = "#002";
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            if (iobj.act === "rotated") {
                iobj.act = "tunerChange";
                iobj.tunerInx = op.adjInx;
                iobj.tunerId = op.tunerIds[op.adjInx];
                KvLib.exe(op.actionFunc, iobj);
                return;
            }
            if (iobj.act === "mousePress") {
                iobj.act = "tunerMousePress";
                iobj.tunerInx = op.adjInx;
                iobj.tunerId = op.tunerIds[op.adjInx];
                KvLib.exe(op.actionFunc, iobj);
                return;
            }
            if (iobj.act === "mouseUp") {
                iobj.act = "tunerMouseUp";
                iobj.tunerInx = op.adjInx;
                iobj.tunerId = op.tunerIds[op.adjInx];
                KvLib.exe(op.actionFunc, iobj);
                return;
            }




        };
        blocks[cname] = {name: "tuner", type: "Model~MyNewTuner~base.sys0", opts: opts};
        //=======================================



        var cname = lyMaps["mainBody"] + "~" + 2;
        var opts = {};
        opts.title = "調整";
        opts.setOptss = [];
        var setOptss = opts.setOptss;
        opts.yArr = ["0.33rh", "0.33rh", 9999];
        opts.xyArr = [
            ["0.25rw", "0.25rw", "0.25rw", 9999],
            ["0.25rw", "0.25rw", "0.25rw", 9999],
            ["0.25rw", "0.25rw", "0.25rw", 9999]
        ];
        //
        //================================================================
        var regDatas = "self.fatherMd.fatherMd.fatherMd.stas.adjButtonColors";
        for (var i = 0; i < 12; i++) {
            var setOpts = sopt.getOptsPara("button");
            setOpts.enum = [op.tunerNames[i]];
            setOpts.enumId = [op.tunerIds[i]];
            setOpts.baseColor = "#008";
            setOpts.borderWidth = 0;
            setOpts.fontSize = "0.6rh";
            var watchDatas = setOpts.watchDatas = [];
            watchDatas.push(["directReg", regDatas + "#" + i, "baseColor", 1]);
            setOptss.push(setOpts);
        }
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            op.adjInx = KvLib.strToInt(iobj.kvObj.name.split('#')[1], 0);
        };
        blocks[cname] = {name: "signalSourcePanel", type: "Model~MdaSetGroup~base.sys0", opts: opts};
        //=========================


        //=======================================
        var cname = lyMaps["mainBody"] + "~" + 3;
        var opts = {};
        opts.title = "控制";
        opts.setOptss = [];
        var setOptss = opts.setOptss;
        mac.setXyArr(opts, 4);
        opts.xyArr[0] = ["0.5rw", 9999];
        opts.xyArr[1] = ["0.5rw", 9999];
        opts.xyArr[2] = ["0.2rw", 9999];
        //
        var actionPrg = function (iobj) {
            console.log(iobj);
            if (iobj.act === "actButtonClick") {
                KvLib.exe(op.actionFunc, iobj);
                return;
            }
            if (iobj.act === "mouseClick") {
                KvLib.exe(op.actionFunc, iobj);
                return;
            }
        };
        var setOpts = sopt.getOptsPara("button");
        setOpts.titleWidth = 0;
        setOpts.enum = [""];
        setOpts.enumId = ['runStop'];
        setOpts.fontSize = "0.9rh";
        var watchDatas = setOpts.watchDatas = [];
        var regDatas = "self.fatherMd.fatherMd.fatherMd.stas.watchDatas";
        watchDatas.push(["directReg", regDatas + "#0", "baseColor", 1]);
        watchDatas.push(["directReg", regDatas + "#1", "innerText", 1]);
        setOptss.push(setOpts);
        var setOpts = sopt.getOptsPara("button");
        setOpts.titleWidth = 0;
        setOpts.enum = ['<i class="gf">&#xe762;</i>'];
        setOpts.enumId = ['cursor'];
        setOpts.fontSize = "0.9rh";
        var watchDatas = setOpts.watchDatas = [];
        var regDatas = "self.fatherMd.fatherMd.fatherMd.stas.watchDatas";
        watchDatas.push(["directReg", regDatas + "#2", "baseColor", 1]);
        setOptss.push(setOpts);
        var setOpts = sopt.getOptsPara("button");
        setOpts.titleWidth = 0;
        setOpts.enum = ['<i class="gf">&#xe228;</i>'];
        setOpts.enumId = ['grid'];
        setOpts.fontSize = "0.9rh";
        var watchDatas = setOpts.watchDatas = [];
        var regDatas = "self.fatherMd.fatherMd.fatherMd.stas.watchDatas";
        watchDatas.push(["directReg", regDatas + "#3", "baseColor", 1]);
        setOptss.push(setOpts);
        var setOpts = sopt.getOptsPara("button");
        setOpts.titleWidth = 0;
        setOpts.enum = ['<i class="gf">&#xe3ec;</i>'];
        setOpts.enumId = ['net'];
        setOpts.fontSize = "0.9rh";
        var watchDatas = setOpts.watchDatas = [];
        var regDatas = "self.fatherMd.fatherMd.fatherMd.stas.watchDatas";
        watchDatas.push(["directReg", regDatas + "#4", "baseColor", 1]);
        setOptss.push(setOpts);
        var setOpts = sopt.getOptsPara("button");
        setOpts.titleWidth = 0;
        setOpts.enum = ['<i class="gf">&#xe5db;</i>'];
        setOpts.enumId = ['trigUpDown'];
        setOpts.fontSize = "0.9rh";
        var watchDatas = setOpts.watchDatas = [];
        var regDatas = "self.fatherMd.fatherMd.fatherMd.stas.watchDatas";
        watchDatas.push(["directReg", regDatas + "#6", "innerText", 1]);
        setOptss.push(setOpts);
        var setOpts = sopt.getOptsPara("buttonSelect");
        setOpts.enum = ['1', '2', '3', '4'];
        setOpts.enumId = ['trigCh1', 'trigCh2', 'trigCh3', 'trigCh4'];
        setOpts.value = 0;
        setOpts.xm = 2;
        setOpts.titleWidth = 0;
        var watchDatas = setOpts.watchDatas = [];
        var regDatas = "self.fatherMd.fatherMd.stas.watchDatas";
        watchDatas.push(["directReg", regDatas + "#5", "setOpts.value", 1]);
        setOpts.fontSize = "0.5rh";
        setOptss.push(setOpts);
        var setOpts = sopt.getOptsPara("buttonOnOffs");
        //setOpts.titleWidth = 60;
        //setOpts.title = '<i class="gf">&#xe034</i>';
        setOpts.enum = ['CH1', 'CH2', 'CH3', 'CH4'];
        setOpts.enumId = ['ch1', 'ch2', 'ch3', 'ch4'];
        var watchDatas = setOpts.watchDatas = [];
        var regDatas = "self.fatherMd.fatherMd.stas.watchDatas";
        watchDatas.push(["directReg", regDatas + "#7", "setOpts.value", 1]);
        setOpts.value = 0;
        setOpts.fontSize = "fixWidth";
        //setOpts.iconWidth = 40;
        //setOpts.image = "systemResource/icons8-switch-80.png";
        setOpts.titleWidth = 0;
        setOptss.push(setOpts);
        opts.actionFunc = actionPrg;
        blocks[cname] = {name: "signalCtr", type: "Model~MdaSetGroup~base.sys0", opts: opts};
        return;
    }
}

class MyNewScope {
    constructor() {



    }
    static  xScaleTblxxx = [
        "1 nS", "2 nS", "5 nS", "10 nS", "20 nS", "50 nS", "100 nS", "200 nS", "500 nS",
        "1 uS", "2 uS", "5 uS", "10 uS", "20 uS", "50 uS", "100 uS", "200 uS", "500 uS",
        "1 mS", "2 mS", "5 mS", "10 mS", "20 mS", "50 mS", "100 mS", "200 mS", "500 mS",
        "1 S", "2 S", "5 S", "10 S", "20 S", "50 S", "100 S"
    ];
    static  xScaleTbl = [
        5, 6, 7.5, 8, 10,
        12.5, 15, 20, 25, 30, 35, 40, 45, 50, 60, 75, 80, 100,
        125, 150, 200, 250, 300, 350, 400, 450, 500, 600, 750, 800, 1000,
        1250, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 6000, 7500, 8000, 10000,
        12500, 15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000, 60000, 75000, 80000, 100000,
        125000, 150000, 200000, 250000, 300000, 350000, 400000, 450000, 500000, 600000, 750000, 800000, 1000000,
        1250000, 1500000, 2000000, 2500000, 3000000, 3500000, 4000000, 4500000, 5000000, 6000000, 7500000, 8000000, 10000000,
        12500000, 15000000, 20000000, 25000000, 30000000, 35000000, 40000000, 45000000, 50000000, 60000000, 75000000, 80000000, 100000000,
        125000000, 150000000, 200000000, 250000000, 300000000, 350000000, 400000000, 450000000, 500000000, 600000000, 750000000, 800000000, 1000000000,
        1250000000, 1500000000, 2000000000, 2500000000, 3000000000, 3500000000, 4000000000, 4500000000, 5000000000, 6000000000, 7500000000, 8000000000, 10000000000
    ];
    static  yScaleTbl = [
        1, 1.25, 1.5, 2, 3, 4, 5, 7.5,
        10, 12.5, 15, 20, 30, 40, 50, 75,
        100, 125, 150, 200, 300, 400, 500, 750,
        1000, 1250, 1500, 2000, 3000, 4000, 5000, 7500,
        10000, 12500, 15000, 20000, 30000, 40000, 50000, 75000,
        100000, 125000, 150000, 200000, 300000, 400000, 500000, 750000
    ];
    static yScaleVoltTbl = ["1 mV", "2 mV", "5 mV", "10 mV", "20 mV", "50 mV", "100 mV", "200 mV", "500 mV", "1 V", "2 V", "5 V", "10 V", "20 V", "50 V", "100 V"];
    static yScaleAmpTbl = ["1 mA", "2 mA", "5 mA", "10 mA", "20 mA", "50 mA", "100 mA", "200 mA", "500 mA", "1 A", "2 A", "5 A", "10 A", "20 A", "50 A", "100 A"];
    static yScaleDbTbl = ["10 DB", "20 DB", "30 DB", "40 DB", "50 DB", "60 DB"];
    static yScaleDucTbl = ["20 ℃", "40 ℃", "60 ℃", "80 ℃", "100 ℃ ", "120 ℃", "140 ℃", "160 ℃", "180 ℃", "200 ℃"];
    static transXScale(inStr) {
        var strA = inStr.split(" ");
        if (strA.length !== 2)
            return 500;
        var ii = KvLib.toInt(strA[0], null);
        if (ii === null)
            return 500;
        if (strA[1] === "nS") {
            return ii;
        }
        if (strA[1] === "uS") {
            return ii * 1000;
        }
        if (strA[1] === "mS") {
            return ii * 1000000;
        }
        if (strA[1] === "S") {
            return ii * 1000000000;
        }
        return 500;
    }

    static transTime(iv) {
        var vstr = "";
        if (iv >= 1000000000) {
            vstr = (iv / 1000000000).toFixed(3) + " S";
            return vstr;
        }
        if (iv >= 1000000) {
            vstr = (iv / 1000000).toFixed(3) + " mS";
            return vstr;
        }
        if (iv >= 1000) {
            vstr = (iv / 1000).toFixed(3) + " uS";
            return vstr;
        }
        return(iv.toFixed(0) + " nS");
    }

    static transYScale(op) {
        return;
        for (var i = 0; i < op.lines.length; i++) {
            var str = op.lines[i].yScaleTbl[op.lines[i].yScaleSet];
            var strA = str.split(" ");
            var yScale = 1000;
            op.lines[i].yScale = yScale;
            if (strA.length !== 2)
                continue;
            var ii = KvLib.toInt(strA[0], null);
            if (ii === null)
                continue;
            if (strA[1] === "mV" || strA[1] === "mA") {
                op.lines[i].yScale = ii;
                continue;
            }
            if (strA[1] === "V" || strA[1] === "A") {
                op.lines[i].yScale = ii * 1000;
                continue;
            } else {
                op.lines[i].yScale = ii;
            }
        }
    }

    initRightTags(opts) {
        opts.clearOn_f = 0;
        opts.run_f = 0;
        opts.trig_f = 0;
        opts.cursor_f = 0;
        opts.grid_f = 1;
        opts.net_f = 1;
        opts.rightTags = [];
        opts.rightTags.push('CLEAR~' + opts.clearOn_f);
        opts.rightTags.push('RUN~' + opts.run_f);
        opts.rightTags.push('TRIG ' + (opts.trigInx + 1) + '~' + opts.trig_f);
        opts.rightTags.push('CURSOR~' + opts.cursor_f);
        opts.rightTags.push('GRID~' + opts.grid_f);
        opts.rightTags.push('NET ' + opts.netFadeInx + '~' + opts.net_f);
        opts.rightTags.push('TST 1~0');
        opts.rightTags.push('TST 2~0');
        opts.rightTags.push('TST 3~0');
        opts.rightTags.push('SIG1~0');
        opts.rightTags.push('SIG2~0');
        opts.rightTags.push('SIG3~0');
        opts.rightTags.push('SIG4~0');
    }

    initOpts(md) {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);
        opts.title = "JOSN OSCILLOSCOPE";
        opts.baseColor = "#222";
        opts.clearOn_f = 0;
        opts.run_f = 0;
        opts.trig_f = 0;
        opts.trigViewTime = 0;
        opts.trigViewTimeX = 0;
        opts.trigOffsetX = 500; //total 1000;
        opts.trigInx = 0;
        opts.trigUpDown_f = 0;
        opts.cursor_f = 0;
        opts.grid_f = 1;
        opts.net_f = 1;
        opts.netFadeInx = 4;
        opts.signalMode = 0;
        opts.signalCnt = 0;
        opts.displayType = 0; //main|roll

        self.initRightTags(opts);
        opts.centerLine_f = 1;
        opts.axeWidth = 0.5;
        //===
        opts.mainAxeColor = "#aaa";
        opts.subAxeColorTbl = ["#000", "#111", "#222", "#333", "#444", "#555", "#666", "#777", "#888", "#999"];
        opts.centerLineColor = "#fff";
        //===============
        opts.xAxeOffs = 0;
        opts.xScale = 8; //unit=ns;
        opts.xRealScale = 100000; //ns;
        //=====================
        opts.xyOffx = 32; //total 1000    //origin point x 
        opts.xAxeLen = 900; //total 1000    //x axile len rate    
        opts.rightTag_f = 1;
        //=====================
        opts.xAxeGridAmt = 10;
        opts.xSubAxeGridAmt = 5;
        opts.xAxeOffsAmt = 400;
        //===============

        opts.xAxeTotalV = 500;
        opts.yAxeOffsV = -100;
        opts.yAxeTotalV = 200;
        opts.trigOffset = 15;
        opts.xyOffy = 30; //total 1000    //origin point y 
        opts.yAxeLen = 940;
        opts.yAxeGridAmt = 10;
        opts.ySubAxeGridAmt = 5;
        opts.zoomTimeEnd = 0;
        opts.zoomTimeLen = 100 * 1000;
        //===============
        opts.messages = [];
        var mesObj = {};
        mesObj.x = 500;
        mesObj.y = 20;
        mesObj.text = "title";
        mesObj.color = "#0f0";
        mesObj.font = "20px monospace";
        opts.messages.push(mesObj);
        //===============
        opts.sampleUnit = "ns";
        opts.sampleAmt = 10000;
        opts.sampleBufSize = 2000000;
        opts.ySubAxeGridAmt = 5;
        self.initLines(opts);
        //=======================
        return opts;
    }
    initLines(opts) {
        opts.lines = [];
        //===============
        var colorTbl = ["#f66", "#8f8", "#ff0", "#0ff"];
        for (var i = 0; i < 4; i++) {
            var lineObj = {};
            var buffer = [];
            for (var j = 0; j < opts.sampleBufSize; j++) {
                buffer.push(0);
            }
            lineObj.name = "CH" + (i + 1);
            lineObj.color = colorTbl[i];
            lineObj.offset = -30 + 20 * i;
            lineObj.offOn_f = 0;
            lineObj.digit_f = 0;
            //================    
            lineObj.typeCnt = 0;
            lineObj.yScale = 20; //
            lineObj.yScaleFixed = 0; //
            lineObj.yScaleUnit = "mV"; //
            lineObj.trigOffset = 0;
            lineObj.yScaleSet = 4; //
            lineObj.yScaleTbl = MyNewScope.yScaleVoltTbl;
            lineObj.stInx = 0;
            lineObj.endInx = 0;
            lineObj.recordLen = 0;
            lineObj.buffer = buffer;
            lineObj.sampleRate = 200000000;
            lineObj.lineWidth = 1;
            lineObj.serialCnt = 0;
            lineObj.valueViewFixed = 2;
            opts.lines.push(lineObj);
        }


    }

    netFadeAdd(addV) {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        op.netFadeInx += addV;
        if (op.netFadeInx > 9) {
            op.netFadeInx = 9;
        }
        if (op.netFadeInx < 0) {
            op.netFadeInx = 0;
        }
        op.rightTags[5] = 'NET ' + op.netFadeInx + '~' + op.net_f;
        st.drawAxe_f = 1;
    }

    trigOnOff(value) {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        op.trig_f ^= 1;
        if (value !== undefined)
            op.trig_f = value;
        op.rightTags[2] = 'TRIG ' + (op.trigInx + 1) + '~' + op.trig_f;
        op.trigViewTime = 30;
        st.drawAxe_f = 1;
    }
    cursorOnOff(value) {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        op.cursor_f ^= 1;
        if (value !== undefined)
            op.cursor_f = value;
        op.rightTags[3] = "CURSOR~" + op.cursor_f;
        st.drawAxe_f = 1;
    }

    gridOnOff(value) {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        op.grid_f ^= 1;
        if (value !== undefined)
            op.grid_f = value;
        op.rightTags[3] = "GRID~" + op.grid_f;
        st.drawAxe_f = 1;
    }

    netOnOff(value) {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        op.net_f ^= 1;
        if (value !== undefined)
            op.net_f = value;
        op.rightTags[3] = "NET~" + op.net_f;
        st.drawAxe_f = 1;
    }

    trigUpDown(value) {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        op.trigUpDown_f ^= 1;
        if (value !== undefined)
            op.trigUpDown_f = value;
        op.rightTags[3] = "NET~" + op.net_f;
        st.drawAxe_f = 1;
    }

    runOnOff(value) {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        op.run_f ^= 1;
        if (value !== undefined)
            op.run_f = value;
        op.rightTags[1] = "RUN~" + op.run_f;
        st.drawAxe_f = 1;
    }

    setSignal(signalMode, signalModeInx) {
        var self = this;
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        for (var j = 0; j < 7; j++) {
            var strB = op.rightTags[6 + j].split("~");
            op.rightTags[6 + j] = strB[0] + '~' + 0;
        }
        op.signalMode = signalMode;
        op.signalModeInx = signalModeInx;
        var inx = 0;
        if (signalMode === 1) {
            inx = 6 + signalModeInx;
        }
        if (signalMode === 2) {
            inx = 9;
        }
        if (signalMode === 3) {
            inx = 10;
        }
        if (signalMode === 4) {
            inx = 11;
        }
        if (signalMode === 5) {
            inx = 12;
        }
        op.run_f = 0;
        if (signalMode) {
            op.run_f = 1;
            var strA = op.rightTags[inx].split("~");
            op.rightTags[inx] = strA[0] + '~' + 1;
        }
        st.drawAxe_f = 1;
        self.initLines(op);
        if (signalMode === 1) {
            if (signalModeInx === 0)
                self.setTest1Signal();
            if (signalModeInx === 1)
                self.setTest2Signal();
            if (signalModeInx === 2)
                self.setTest3Signal();
        }
        if (signalMode === 2) {
            self.setM2I0Signal();
        }
        if (signalMode === 3) {
            self.setM3I0Signal();
        }
        op.rightTags[1] = "RUN~" + op.run_f;
        st.drawAxe_f = 1;
        st.drawBuf_f = 1;
    }

    timeZoomPrg(zoomPosRate, value) {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        if (zoomPosRate < 0)
            return;
        if (zoomPosRate > 1)
            return;
        var zoomTimeStart = op.zoomTimeEnd - op.zoomTimeLen;
        var zoomPosTime = zoomTimeStart + op.zoomTimeLen * zoomPosRate;
        var newZoomTimeLen = op.zoomTimeLen;
        for (var i = 0; i < MyNewScope.xScaleTbl.length; i++) {
            if (value > 0) {
                var vv = MyNewScope.xScaleTbl[i] * 10;
                if (vv > op.zoomTimeLen) {
                    newZoomTimeLen = vv;
                    break;
                }
            } else {
                var vv = MyNewScope.xScaleTbl[MyNewScope.xScaleTbl.length - i - 1] * 10;
                if (vv < op.zoomTimeLen) {
                    newZoomTimeLen = vv;
                    break;
                }
            }
        }
        var rightLen = Math.floor(newZoomTimeLen * (1 - zoomPosRate));
        op.zoomTimeEnd = zoomPosTime + rightLen;
        op.zoomTimeLen = newZoomTimeLen;
        st.drawAxe_f = 1;
        st.drawBuf_f = 1;
    }

    timePosStPrg(zoomPosRate) {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        st.dragPosOn_f = 1;
        st.zoomPosRateSt = zoomPosRate;
        st.zoomPosRateDt = 0;
        st.grapSpeed = 0;
    }
    timePosEndPrg() {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        var deltaTime = md.stas.zoomPosRateDt * op.zoomTimeLen;
        op.zoomTimeEnd -= deltaTime;
        st.dragPosOn_f = 0;
    }

    timePosMovePrg(zoomPosRate) {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        var zoomTimeStart = op.zoomTimeEnd - op.zoomTimeLen;
        var zoomPos = zoomTimeStart + op.zoomTimeLen * zoomPosRate;
        md.stas.zoomPosRateDt = zoomPosRate - md.stas.zoomPosRateSt;
        //=========================================
        var deltaTime = (md.stas.zoomPosRateDt * op.zoomTimeLen);
        var zoomTimeEnd = op.zoomTimeEnd - deltaTime;
        var zoomTimeStart = zoomTimeEnd - op.zoomTimeLen;
        var maxRight = Math.floor(0.6 * op.zoomTimeLen);
        var minLeft = st.maxRecordLenTime * (-1) - (0.6 * op.zoomTimeLen);
        if (zoomTimeEnd > maxRight) {
            md.stas.zoomPosRateDt = (op.zoomTimeEnd - maxRight) / op.zoomTimeLen;
        }
        if (zoomTimeEnd - op.zoomTimeLen < minLeft) {
            md.stas.zoomPosRateDt = (op.zoomTimeEnd - (minLeft + op.zoomTimeLen)) / op.zoomTimeLen;
        }
        st.drawAxe_f = 1;
        st.drawBuf_f = 1;
        return;
    }

    setTrigOffset(yRate, delta_f) {
        var self = this;
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        var lineOpts = op.lines[op.trigInx];
        if (!delta_f)
            lineOpts.trigOffset = yRate * lineOpts.yScale;
        else {
            var rate = lineOpts.trigOffset / lineOpts.yScale;
            rate += yRate;
            lineOpts.trigOffset = rate * lineOpts.yScale;
        }
        op.trigViewTime = 30;
        st.drawAxe_f = 1;
        st.drawBuf_f = 1;
    }

    setYScale(addV, inx) {
        var self = this;
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        var opts = op.lines[inx];
        for (var j = 0; j < MyNewScope.yScaleTbl.length; j++) {
            if (addV > 0) {
                var vv = MyNewScope.yScaleTbl[j];
                if (vv > opts.yScale) {
                    opts.yScale = vv;
                    break;
                }
            } else {
                var vv = MyNewScope.yScaleTbl[MyNewScope.yScaleTbl.length - j - 1];
                if (vv < opts.yScale) {
                    opts.yScale = vv;
                    break;
                }
            }
        }
        st.drawAxe_f = 1;
        st.drawBuf_f = 1;
    }

    setYPos(posRate, inx, delta_f) {
        var self = this;
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        if (!delta_f) {
            var kk = ((0.5 - posRate) * 100) | 0;
            op.lines[inx].offset = kk;
        } else {
            op.lines[inx].offset += posRate;
        }
        st.drawAxe_f = 1;
        st.drawBuf_f = 1;
    }

    afterCreate() {
        var self = this;
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        //==
        var plotObj = md.blockRefs["container"];
        var plotElem = plotObj.elems["base"];
        st.containerWidth = plotObj.stas.containerWidth;
        st.containerHeight = plotObj.stas.containerHeight;
        //=======================================================
        st.wRate = st.containerWidth / 1000.0;
        st.hRate = st.containerHeight / 1000.0;
        st.xAxeLen = op.xAxeLen * st.wRate;
        st.yAxeLen = op.yAxeLen * st.hRate;
        st.xyOffx = op.xyOffx * st.wRate;
        st.xyOffy = op.xyOffy * st.hRate;
        //==
        st.xPixelDivUnit = (st.xAxeLen - 10) / (op.xAxeTotalV);
        //==
        st.yPixelDivUnit = (st.yAxeLen - 10) / (op.yAxeTotalV);
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
        st.canvas = selem;
        //=========================================
        var canvasClickFunc = function (iobj) {
            console.log(iobj);
        };
        
        var canvasPressFunc = function (iobj) {
            var checkMouseUpFunc = function () {
                if (gr.mouseDown_f) {
                    setTimeout(checkMouseUpFunc, 100);
                    return;
                }
                var plotObj = md.blockRefs["container"];
                var plotElem = plotObj.elems["base"];
                plotElem.style.cursor = "";
                st.dragPosOn_f = 0;
                st.noRectADragFlag = 0;
                st.dutyBarRectDrag_f = 0;
                st.zoomTimeDelta = 0;
                op.clearOn_f = 0;
                op.rightTags[0] = "CLEAR~" + op.clearOn_f;
                st.drawAxe_f = 1;
                st.drawBuf_f = 1;
            };
            setTimeout(checkMouseUpFunc, 100, md);
            var rectPos = op.lines.length;
            for (var i = 0; i < op.lines.length; i++) {
                if (st.noRectAOnFlag & (1 << rectPos)) {
                    op.lines[i].offOn_f ^= 1;
                    st.drawAxe_f = 1;
                    st.drawBuf_f = 1;
                    return;
                }
                rectPos++;
            }

            if (st.noRectAOnFlag & (1 << rectPos)) {
                self.initRightTags(op);
                op.clearOn_f = 1;
                op.rightTags[0] = "CLEAR~" + op.clearOn_f;
                self.initLines(op);
                op.signalMode = 0;
                op.signalModeInx = 0;
                st.drawAxe_f = 1;
                st.drawBuf_f = 1;
                var scopeCtr = md.blockRefs["scopeCtr"];
                scopeCtr.opts.signalMode = op.signalMode;
                scopeCtr.opts.signalModeInx = op.signalModeInx;
                scopeCtr.reCreate();
                return;
            }

            rectPos++;
            if (st.noRectAOnFlag & (1 << rectPos)) {
                self.runOnOff();
                return;
            }

            rectPos++;
            if (st.noRectAOnFlag & (1 << rectPos)) {
                self.trigOnOff();
                return;
            }

            rectPos++;
            if (st.noRectAOnFlag & (1 << rectPos)) {
                self.cursorOnOff();
                return;
            }

            rectPos++;
            if (st.noRectAOnFlag & (1 << rectPos)) {
                self.gridOnOff();
                return;
            }

            rectPos++;
            if (st.noRectAOnFlag & (1 << rectPos)) {
                self.netOnOff();
                return;
            }
            var ok_f = 0;
            rectPos++;
            for (var i = 0; i < 7; i++) {
                var strA = op.rightTags[6 + i].split("~");
                if (st.noRectAOnFlag & (1 << rectPos)) {
                    if (i === 0)
                        self.setSignal(1, 0);
                    if (i === 1)
                        self.setSignal(1, 1);
                    if (i === 2)
                        self.setSignal(1, 2);
                    if (i === 3)
                        self.setSignal(2, 0);
                    if (i === 4)
                        self.setSignal(3, 0);
                    if (i === 5)
                        self.setSignal(4, 0);
                    if (i === 6)
                        self.setSignal(5, 0);
                    var scopeCtr = md.blockRefs["scopeCtr"];
                    scopeCtr.opts.signalMode = op.signalMode;
                    scopeCtr.opts.signalModeInx = op.signalModeInx;
                    scopeCtr.reCreate();
                    break;
                }
                rectPos++;
            }
            if (ok_f)
                return;
            st.xAxeLen = op.xAxeLen * st.wRate;
            st.xyOffx = op.xyOffx * st.wRate;
            var zoomPosRateX = (iobj.offsetX - st.xyOffx) / st.xAxeLen;
            var zoomPosRateY = (iobj.offsetY - st.xyOffy) / st.yAxeLen;
            var grap_f = 0;
            if (zoomPosRateX > 0.02 && zoomPosRateX < 0.98) {
                if (zoomPosRateY > 0.02 && zoomPosRateY < 0.98) {
                    self.timePosStPrg(zoomPosRateX);
                    grap_f = 1;
                }
            }
            if (st.noRectAOnFlag) {
                st.noRectADragFlag = st.noRectAOnFlag;
                grap_f = 1;
            }
            if (st.dutyBarRect_f) {
                st.dutyBarRectDrag_f = 1;
                st.dutyBarPreX = iobj.offsetX;
                st.zoomTimeDelta = 0;
                grap_f = 1;
            }
            if (!grap_f)
                return;
            var plotObj = md.blockRefs["container"];
            var plotElem = plotObj.elems["base"];
            plotElem.style.cursor = "grab";
            self.reDrawBuf();
        };
        var canvasUpFunc = function (iobj) {
            var plotObj = md.blockRefs["container"];
            var plotElem = plotObj.elems["base"];
            plotElem.style.cursor = "";
            st.noRectADragFlag = 0;
            if (st.dutyBarRectDrag_f) {
                if (!st.zoomTimeDelta)
                    st.zoomTimeDelta = 0;
                op.zoomTimeEnd -= st.zoomTimeDelta;
            }
            if (md.stas.dragPosOn_f) {
                self.timePosEndPrg();
            }
            md.stas.dragPosOn_f = 0;
            st.dutyBarRectDrag_f = 0;
            st.zoomTimeDelta = 0;
            self.reDrawBuf();
        };
        var canvasMoveFunc = function (iobj) {
            st.xAxeLen = op.xAxeLen * st.wRate;
            st.xyOffx = op.xyOffx * st.wRate;
            st.nowCurY = iobj.offsetY;
            st.nowCurX = iobj.offsetX;
            st.drawAxe_f = 1;
            var noRectAOnFlag = 0;
            if (st.noRectA) {
                for (var i = 0; i < st.noRectA.length; i++) {
                    var obj = st.noRectA[i];
                    if (obj.xl === undefined)
                        continue;
                    if (iobj.offsetX < obj.xl)
                        continue;
                    if (iobj.offsetX >= obj.xr)
                        continue;
                    if (iobj.offsetY < obj.yt)
                        continue;
                    if (iobj.offsetY >= obj.yb)
                        continue;
                    noRectAOnFlag += (1 << i);
                }
            }
            if (st.noRectAOnFlag === undefined)
                st.noRectAOnFlag = noRectAOnFlag;
            if (st.noRectAOnFlag !== noRectAOnFlag) {
                st.noRectAOnFlag = noRectAOnFlag;
                st.drawAxe_f = 1;
            }





            st.dutyBarRect_f = 1;
            if (st.dutyBarRect) {
                if (st.dutyBarRect[0] > iobj.offsetX)
                    st.dutyBarRect_f = 0;
                if (st.dutyBarRect[2] < iobj.offsetX)
                    st.dutyBarRect_f = 0;
                if (st.dutyBarRect[1] > iobj.offsetY)
                    st.dutyBarRect_f = 0;
                if (st.dutyBarRect[3] < iobj.offsetY)
                    st.dutyBarRect_f = 0;
            }

            var rectPos = op.lines.length * 2 + 13; //trig
            if (st.noRectAOnFlag & (1 << rectPos)) //trig
                op.trigViewTime = 30;
            if (st.noRectADragFlag) {
                var posRate = (iobj.offsetY - st.xyOffy) / st.yAxeLen;
                if (posRate < 0)
                    posRate = 0;
                if (posRate > 1)
                    posRate = 1;
                if (st.noRectADragFlag & (1 << rectPos)) {//trig
                    var lineOpts = op.lines[op.trigInx];
                    var ycen = st.containerHeight - st.xyOffy - st.yAxeLen / 2;
                    var yGridLen = st.yAxeLen / op.yAxeGridAmt;
                    var yOffset = st.yAxeLen * lineOpts.offset / 100;
                    var ylen = ycen - yOffset - iobj.offsetY;
                    self.setTrigOffset(ylen / yGridLen);
                    return;
                }
                //console.log(posRate);//move line
                for (var i = 0; i < op.lines.length; i++) {
                    if (st.noRectADragFlag & (1 << i)) {
                        self.setYPos(posRate, i);
                        return;
                    }
                }
            }


            var rectPos = op.lines.length * 2 + 14; //trigX
            if (st.noRectAOnFlag & (1 << rectPos))
                op.trigViewTimeX = 30;
            if (st.noRectADragFlag) {
                var posRate = (iobj.offsetX - st.xyOffx) / st.xAxeLen;
                if (posRate < 0)
                    posRate = 0;
                if (posRate > 1)
                    posRate = 1;
                if (st.noRectADragFlag & (1 << rectPos)) {//trigX
                    op.trigViewTimeX = 30;
                    op.trigOffsetX = (1000 * posRate) | 0;
                    st.drawAxe_f = 1;
                    st.drawBuf_f = 1;
                    return;
                }
            }




            if (st.dutyBarRectDrag_f) {
                var deltaX = st.dutyBarPreX - iobj.offsetX;
                if (st.maxRecordLenTime) {
                    var zoomTimeDelta = st.maxRecordLenTime * deltaX / st.xAxeLen;
                    var zoomTimeEnd = op.zoomTimeEnd - zoomTimeDelta;
                    var zoomTimeStart = zoomTimeEnd - op.zoomTimeLen;
                    var left = (Math.floor(st.maxRecordLenTime + op.zoomTimeLen * 0.6) ) * (-1);
                    var right = Math.floor(op.zoomTimeLen * 0.6);
                    if (zoomTimeStart < left) {
                        zoomTimeDelta = op.zoomTimeEnd - (op.zoomTimeLen + left);
                    }
                    if (zoomTimeEnd > right) {
                        zoomTimeDelta = op.zoomTimeEnd - right;
                    }

                    st.zoomTimeDelta = zoomTimeDelta;
                }
                st.drawAxe_f = 1;
                st.drawBuf_f = 1;
                return;
            }

            if (st.dragPosOn_f) {
                if (st.preCursorX === undefined)
                    st.preCursorX = iobj.offsetX;
                st.grapSpeed = iobj.offsetX - st.preCursorX;
                st.preCursorX = iobj.offsetX;
                var zoomPosRate = (iobj.offsetX - st.xyOffx) / st.xAxeLen;
                if (zoomPosRate < 0)
                    zoomPosRate = 0;
                if (zoomPosRate > 1)
                    zoomPosRate = 1;
                self.timePosMovePrg(zoomPosRate);
                return;
            }
            st.drawAxe_f = 1;
            st.drawBuf_f = 1;
        };
        var canvasWheelFunc = function (iobj) {

            var rectPos = op.lines.length * 2 + 2;
            if (st.noRectAOnFlag & (1 << rectPos)) {
                if (iobj.deltaY < 0) {
                    op.trigInx++;
                    if (op.trigInx >= op.lines.length)
                        op.trigInx = op.lines.length - 1;
                } else {
                    op.trigInx--;
                    if (op.trigInx < 0)
                        op.trigInx = 0;
                }
                op.rightTags[2] = 'TRIG ' + (op.trigInx + 1) + '~' + op.trig_f;
                op.trigViewTime = 30;
                st.drawAxe_f = 1;
                return;
            }

            var rectPos = op.lines.length * 2 + 13; //trigUpDown
            if (st.noRectAOnFlag & (1 << rectPos)) {
                self.trigUpDown();
                return;
            }



            var rectPos = op.lines.length * 2 + 5;
            if (st.noRectAOnFlag & (1 << rectPos)) {
                if (iobj.deltaY < 0) {
                    self.netFadeAdd(1);
                } else {
                    self.netFadeAdd(-1);
                }
                return;
            }


            if (st.noRectAOnFlag) {
                for (var i = 0; i < op.lines.length; i++) {
                    if (st.noRectAOnFlag & (1 << i)) {
                        self.setYScale(iobj.deltaY, i);
                    }
                }
                return;
            }



            st.xAxeLen = op.xAxeLen * st.wRate;
            st.xyOffx = op.xyOffx * st.wRate;
            var zoomPosRate = (iobj.offsetX - st.xyOffx) / st.xAxeLen;
            self.timeZoomPrg(zoomPosRate, iobj.deltaY);
        };
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
        //selem.addEventListener("click", canvasClickFunc);
        //selem.addEventListener("wheel", canvasWheelFunc);
        //selem.addEventListener("mousedown", canvasPressFunc);
        //selem.addEventListener("mouseup", canvasUpFunc);
        //selem.addEventListener("mousemove", canvasMoveFunc);
        plotElem.appendChild(selem);
        st.canvasLy1 = selem;
        var selem = document.createElement("canvas");
        selem.id = md.kid + "_canvasLy2";
        selem.width = st.containerWidth;
        selem.height = st.containerHeight;
        selem.style.position = "absolute";
        selem.style.left = 0 + "px";
        selem.style.top = 0 + "px";
        selem.style.zIndex = "1";
        selem.style.width = "100%";
        selem.style.height = "100%";
        selem.addEventListener("click", canvasClickFunc);
        selem.addEventListener("wheel", canvasWheelFunc);
        selem.addEventListener("mousedown", canvasPressFunc);
        selem.addEventListener("mouseup", canvasUpFunc);
        selem.addEventListener("mousemove", canvasMoveFunc);
        plotElem.appendChild(selem);
        st.canvasLy2 = selem;
        //=========================================
        if (!st.canvas.getContext)
            return;
        if (!st.canvasLy1.getContext)
            return;
        if (!st.canvasLy2.getContext)
            return;
        st.ctx = st.canvas.getContext('2d');
        st.ctx1 = st.canvasLy1.getContext('2d');
        st.ctx2 = st.canvasLy2.getContext('2d');
        st.drawAxe_f = 1;
        st.drawBuf_f = 1;
        //===
        var iobj = {};
        iobj.act = "afterCreate";
        iobj.sender = md;
        KvLib.exe(op.actionFunc, iobj);
    }

    setTest1Signal() {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        op.signalMode = 1;
        op.signalModeInx = 0;
        for (var i = 0; i < 4; i++) {
            var lineObj = md.opts.lines[i];
            lineObj.sampleRate = 200000000;
            lineObj.yScale = 20; //
            lineObj.yScaleFixed = 0; //
            lineObj.yScaleUnit = "mV"; //
            lineObj.offOn_f = 1;
            lineObj.typeCnt = 0;
            lineObj.valueViewFixed = 2;
            md.opts.zoomTimeLen = 100 * 1000;
            md.opts.zoomTimeEnd = 0;
            lineObj.name = "測試信號" + (op.signalModeInx + 1) + "-" + (i + 1);
        }
    }

    setTest2Signal() {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        op.signalMode = 1;
        op.signalModeInx = 1;
        for (var i = 0; i < 4; i++) {
            var lineObj = md.opts.lines[i];
            lineObj.sampleRate = 20000000;
            lineObj.offOn_f = 1;
            lineObj.yScale = 10; //
            lineObj.yScaleFixed = 0; //
            lineObj.yScaleUnit = "mV"; //
            lineObj.typeCnt = 0;
            lineObj.valueViewFixed = 2;
            md.opts.zoomTimeLen = 100 * 1000;
            md.opts.zoomTimeEnd = 0;
            lineObj.name = "測試信號" + (op.signalModeInx + 1) + "-" + (i + 1);
        }
    }

    setTest3Signal() {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        op.signalMode = 1;
        op.signalModeInx = 2;
        for (var i = 0; i < 4; i++) {
            var lineObj = md.opts.lines[i];
            lineObj.sampleRate = 20000000;
            lineObj.offOn_f = 1;
            lineObj.yScale = 10; //
            lineObj.yScaleFixed = 0; //
            lineObj.yScaleUnit = "mV"; //
            lineObj.typeCnt = 1;
            lineObj.levelSize = 10;
            lineObj.valueViewFixed = 0;
            md.opts.zoomTimeLen = 100 * 1000;
            md.opts.zoomTimeEnd = 0;
            lineObj.name = "測試信號" + (op.signalModeInx + 1) + "-" + (i + 1);
        }
    }

    setM3I0Signal() {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        op.signalMode = 3;
        op.signalModeInx = 0;
        for (var i = 0; i < 4; i++) {
            var lineObj = md.opts.lines[i];
            lineObj.sampleRate = 60;
            lineObj.offOn_f = 1;
            lineObj.yScale = 10; //
            lineObj.yScaleFixed = 0; //
            lineObj.yScaleUnit = "DB"; //
            lineObj.typeCnt = 0;
            lineObj.valueViewFixed = 1;
            md.opts.zoomTimeLen = 1000 * 1000 *1000;
            md.opts.zoomTimeEnd = 0;
            if(i===0){
                lineObj.name = "前置放大器輸出功率";
                lineObj.yScale = 20; //
            }    
            if(i===1){
                lineObj.name = "驅動放大器輸出功率";
                lineObj.yScale = 40; //
            }    
            if(i===2){
                lineObj.name = "順向輸出功率";
                lineObj.yScale = 60; //
            }    
            if(i===3){
                lineObj.name = "反向輸出功率";
                lineObj.yScale = 40; //
            }    
        }
    }


    setM2I0Signal() {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        op.signalMode = 2;
        op.signalModeInx = 0;
        for (var i = 0; i < 4; i++) {
            var lineObj = md.opts.lines[i];
            lineObj.sampleRate = 20000000;
            if(i===0)
                lineObj.offOn_f = 1;
            else
                lineObj.offOn_f = 0;
            lineObj.yScale = 10; //
            lineObj.yScaleFixed = 0; //
            lineObj.yScaleUnit = "mV"; //
            lineObj.typeCnt = 1;
            lineObj.levelSize = 15;
            lineObj.valueViewFixed = 0;
            lineObj.offset = -7, 5;
            md.opts.zoomTimeLen = 1000 * 1000;
            md.opts.zoomTimeEnd = 0;
            lineObj.name = "測試信號" + (op.signalModeInx + 1) + "-" + (i + 1);
        }
    }



    chkWatch() {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        this.frameTimer();
        gr.footBarStatus2 = ani.dispFs;
    }

    reDrawBuf() {
        var self = this;
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        st.drawBuf_f = 1;
    }

    frameTimer() {
        var self = this;
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        self.emuTestWave();
        if (op.trigViewTime) {
            op.trigViewTime--;
            if (op.trigViewTime === 0)
                st.drawAxe_f = 1;
        }
        if (op.trigViewTimeX) {
            op.trigViewTimeX--;
            if (op.trigViewTimeX === 0)
                st.drawAxe_f = 1;
        }

        if (!st.dragPosOn_f) {
            if (st.grapSpeed >= 2 || st.grapSpeed <= -2) {
                var rate = st.grapSpeed * 0.0004;
                var deltaTime = rate * op.zoomTimeLen;
                op.zoomTimeEnd -= deltaTime;
                var maxRight = Math.floor(op.zoomTimeLen * 0.6) ;
                var minLeft = st.maxRecordLenTime * (-1) - (op.zoomTimeLen * 0.6);
                if (op.zoomTimeEnd > maxRight)
                    op.zoomTimeEnd = maxRight;
                if ((op.zoomTimeEnd - op.zoomTimeLen) < minLeft)
                    op.zoomTimeEnd = minLeft + op.zoomTimeLen;
                st.drawBuf_f = 1;
                if (st.grapSpeedTime === undefined)
                    st.grapSpeedTime = 9999;
                st.grapSpeedTime++;
                if (st.grapSpeedTime >= 3) {
                    st.grapSpeedTime = 0;
                    if (st.grapSpeed > 0)
                        st.grapSpeed--;
                    else
                        st.grapSpeed++;
                }
            }
        }
        if (st.drawAxe_f) {
            self.drawAxe();
            st.drawAxe_f = 0;
        }
        if (st.drawBuf_f) {
            self.clearBuf();
            if (op.run_f)
                op.test = 1;
            if (!op.run_f && op.test)
                op.test++;
            if (op.run_f) {
                st.zoomTimeTrig = 0;
                var opts = op.lines[op.trigInx];
                self.getBufs(opts, 1);
            } else {
                op.test++;
            }
            var opts = op.lines[0];
            self.getBufs(opts);
            var opts = op.lines[1];
            self.getBufs(opts);
            var opts = op.lines[2];
            self.getBufs(opts);
            var opts = op.lines[3];
            self.getBufs(opts);
            st.jjj = st.zoomTimeTrig;
            var opts = op.lines[0];
            self.drawBufs(opts);
            var opts = op.lines[1];
            self.drawBufs(opts);
            var opts = op.lines[2];
            self.drawBufs(opts);
            var opts = op.lines[3];
            self.drawBufs(opts);
            self.drawDutyBar();
            st.drawBuf_f = 0;
        }

    }

    addBuf(lineInx, values) {
        var self = this;
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        if (!op.run_f)
            return;
        var lineObj = op.lines[lineInx];
        if (!lineObj.offOn_f)
            return;
        var bufSize = lineObj.buffer.length;
        var angOff = 0;
        var len = values.length;
        for (var j = 0; j < len; j++) {
            lineObj.buffer[lineObj.endInx] = values[j];
            lineObj.endInx++;
            if (lineObj.endInx >= bufSize)
                lineObj.endInx = 0;
            lineObj.recordLen++;
            lineObj.serialCnt++;
        }
        if (lineObj.recordLen >= bufSize)
            lineObj.recordLen = bufSize;
        st.drawBuf_f = 1;
    }
    
    emuTestWave() {
        var self = this;
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        if (!op.run_f)
            return;
        if (!st.phaseSpeed)
            st.phaseSpeed = 0;
        st.phaseSpeed += 2;
        if (st.phaseSpeed >= 1000)
            st.phaseSpeed -= 1000;
        gr.signalMode = op.signalMode;
        gr.signalModeInx = op.signalModeInx;


        if (op.signalMode === 1) {
            for (var i = 0; i < 4; i++) {
                var lineObj = op.lines[i];
                if (!lineObj.offOn_f)
                    continue;
                st.drawBuf_f = 1;
                var bufSize = lineObj.buffer.length;
                if (op.signalModeInx === 0) {
                    var angOff = 0;
                    for (var j = 0; j < 100 + i * 10; j++) {
                        var sin = Math.sin((Math.PI * 2 * lineObj.serialCnt * (i + 1) / 2000) + angOff);
                        lineObj.buffer[lineObj.endInx] = sin * 10;
                        lineObj.endInx++;
                        if (lineObj.endInx >= bufSize)
                            lineObj.endInx = 0;
                        lineObj.recordLen++;
                        lineObj.serialCnt++;
                    }
                    if (lineObj.recordLen >= bufSize)
                        lineObj.recordLen = bufSize;
                    continue;
                }
                if (op.signalModeInx === 1) {
                    var angOff = 0;
                    for (var j = 0; j < 100; j++) {
                        lineObj.buffer[lineObj.endInx] = Math.round(10 * Math.random() - 5);
                        lineObj.endInx++;
                        if (lineObj.endInx >= bufSize)
                            lineObj.endInx = 0;
                        lineObj.recordLen++;
                        lineObj.serialCnt++;
                    }
                    if (lineObj.recordLen >= bufSize)
                        lineObj.recordLen = bufSize;
                    continue;
                }

                if (op.signalModeInx === 2) {
                    var values=[];
                    for (var j = 0; j < 100; j++) {
                        values.push(Math.round(1000 * Math.random() + 100) * 2 + (j & 1));
                    }
                    self.addBuf(i,values);
                    continue;
                }



            }
        }
        if (op.signalMode === 2 && op.signalModeInx === 0) {
            
            return;
            st.drawBuf_f = 1;
            var totalTime = op.xRealScale;
            var sampleTime = (totalTime * 10) / op.sampleAmt;
            var lineObj = op.lines[op.trigInx];
            lineObj.sampleRate = 1000000000 / sampleTime;
            lineObj.stInx = 0;
            var nowPinx = gr.pulseFormInxA[op.trigInx];
            var nextLen = gr.pulseFormAA[op.trigInx][nowPinx];
            var level = gr.pulseLevelAA[op.trigInx][nowPinx];
            var allTime = 0;
            var trigRestTime = 0;
            if (op.trig_f) {
                var pinx = gr.pulseFormInxA[op.trigInx];
                var helfTime = totalTime * 5;
                while (true) {
                    if (gr.pulseFormAA[op.trigInx][pinx] === 0)
                        break;
                    if (allTime < helfTime) {
                        allTime += gr.pulseFormAA[op.trigInx][pinx];
                        pinx--;
                        if (pinx < 0)
                            pinx = gr.pulseFormAA[op.trigInx].length - 1;
                        continue;
                    }
                    if (gr.pulseLevelAA[op.trigInx][pinx] > 0) {
                        allTime += gr.pulseFormAA[op.trigInx][pinx];
                    }
                    trigRestTime = allTime - helfTime;
                    break;
                }
            }


            for (var k = 0; k < 1; k++) {
                var lineObj = op.lines[k];
                lineObj.sampleRate = 1000000000 / sampleTime;
                lineObj.stInx = 0;
                var nowPinx = gr.pulseFormInxA[k];
                var nextLen = gr.pulseFormAA[k][nowPinx];
                var allTime = 0;
                var restTime = trigRestTime;
                pinx = gr.pulseFormInxA[k];
                while (restTime >= gr.pulseFormAA[k][pinx]) {
                    if (gr.pulseFormAA[k][pinx] === 0)
                        break;
                    restTime -= gr.pulseFormAA[k][pinx];
                    pinx--;
                    if (pinx < 0)
                        pinx = gr.pulseFormAA[k].length - 1;
                }
                nowPinx = pinx;
                nextLen = gr.pulseFormAA[k][pinx] - restTime;
                //==============================================
                var nowTime = 0;
                var len = 0;
                for (var j = op.sampleAmt - 1; j > 0; j--) {
                    if (nextLen === 0)
                        break;
                    if (len >= gr.pulseFormLenA[k])
                        break;
                    var level = gr.pulseLevelAA[k][nowPinx];
                    var inx = lineObj.stInx + j;
                    if (inx >= op.sampleBufSize)
                        inx -= op.sampleBufSize;
                    lineObj.buffer[inx] = level;
                    nowTime += sampleTime;
                    if (nowTime < nextLen)
                        continue;
                    nowTime -= nextLen;
                    nowPinx--;
                    if (nowPinx < 0)
                        nowPinx = gr.pulseFormAA[k].length - 1;
                    nextLen = gr.pulseFormAA[k][nowPinx];
                    len++;
                }
                lineObj.recordLen = op.sampleAmt;
            }


        }
        if (op.signalMode === 3) {
            for (var i = 0; i < 4; i++) {
                var lineObj = op.lines[i];
                if (!lineObj.offOn_f)
                    continue;
                st.drawBuf_f = 1;
                if (op.signalModeInx === 0) {
                    if (!lineObj.sampleRest)
                        lineObj.sampleRest = 0;
                    var timef = lineObj.sampleRate / 62;
                    var timei = Math.floor(timef);
                    lineObj.sampleRest += timef - timei;
                    if (lineObj.sampleRest >= 1) {
                        lineObj.sampleRest - 1;
                        timei++;
                    }
                    var buf = [];
                    for (var j = 0; j < timei; j++) {
                        buf.push(gr.plotValue[i]);
                    }
                    self.addLineBuf(buf, i);
                }
            }
        }



    }
    addLineBuf(buf, inx) {
        var self = this;
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        st.drawBuf_f = 1;
        var lineObj = op.lines[inx];
        for (var j = 0; j < buf.length; j++) {
            if (lineObj.recordLen >= (op.sampleAmt + 1)) {
                lineObj.stInx++;
                if (lineObj.stInx >= op.sampleBufSize)
                    lineObj.stInx -= op.sampleBufSize;
                var inx = lineObj.stInx + lineObj.recordLen;
            } else {
                var inx = lineObj.stInx + lineObj.recordLen;
                lineObj.recordLen++;
            }
            if (inx >= op.sampleBufSize)
                inx -= op.sampleBufSize;
            if (buf[j] === 0)
                var debugV = 0;
            lineObj.buffer[inx] = buf[j];
        }
    }

    clearScr() {
        var st = this.md.stas;
        var ctx = st.ctx1;
        ctx.clearRect(0, 0, st.containerWidth, st.containerHeight);
    }

    clearAll() {
        var st = this.md.stas;
        var ctx2 = st.ctx2;
        var ctx1 = st.ctx1;
        var ctx = st.ctx;
        ctx.clearRect(0, 0, st.containerWidth, st.containerHeight);
        ctx1.clearRect(0, 0, st.containerWidth, st.containerHeight);
        ctx2.clearRect(0, 0, st.containerWidth, st.containerHeight);
    }

    clearAxe() {
        var st = this.md.stas;
        var ctx = st.ctx;
        ctx.clearRect(0, 0, st.containerWidth, st.containerHeight);
    }
    clearBuf() {
        var st = this.md.stas;
        var ctx = st.ctx1;
        ctx.clearRect(0, 0, st.containerWidth, st.containerHeight);
    }

    getBufs(opts, trigPrg_f) {
        var op = this.md.opts;
        var st = this.md.stas;
        var md = this.md;
        if (!opts.offOn_f)
            return;
        //var ctx = st.ctx1;
        //ctx.strokeStyle = opts.color;
        //ctx.lineWidth = opts.lineWidth;
        //ctx.beginPath();
        var xzero = st.xyOffx | 0;
        var ycen = st.containerHeight - st.xyOffy - st.yAxeLen / 2;
        var yGridLen = st.yAxeLen / op.yAxeGridAmt;
        var yOffset = st.yAxeLen * opts.offset / 100;
        //============================================
        var maxY = st.containerHeight - st.xyOffy;
        var minY = st.containerHeight - st.xyOffy - st.yAxeLen;
        var lenY = st.yAxeLen | 0;
        var lenX = st.xAxeLen | 0;
        var sampleTime = 1000000000 / opts.sampleRate;
        //============================================
        var recBufSize = opts.buffer.length;
        var recSampTime = 1000000000 / opts.sampleRate;
        var recEndInx = opts.endInx;
        var recLen = opts.recordLen;
        var recStartInx = recEndInx - recLen;
        if (recStartInx < 0)
            recStartInx += recBufSize;
        //============================================
        if (opts.typeCnt === 0) {
            var recTimeLen = recLen * recSampTime;
            var recTimeStart = recTimeLen * -1;
        }
        if (opts.typeCnt === 1) {
            var recTimeLen = 0;
            var recInx = recStartInx;
            for (var i = 0; i < recLen; i++) {
                recTimeLen += opts.buffer[recInx++] >> 1;
                if (recInx >= recBufSize)
                    recInx -= recBufSize;
            }
            var recTimeStart = recTimeLen * -1;
        }
        var recTimeEnd = 0;
        if (!st.zoomTimeDelta)
            st.zoomTimeDelta = 0;
        var zoomTimeLen = op.zoomTimeLen;
        if (!op.trig_f)
            st.zoomTimeTrig = 0;
        var zoomTimeEnd = op.zoomTimeEnd - st.zoomTimeDelta - st.zoomTimeTrig;
        var zoomTimeStart = zoomTimeEnd - op.zoomTimeLen;
        if (md.stas.dragPosOn_f) {
            var deltaTime = md.stas.zoomPosRateDt * zoomTimeLen;
            zoomTimeEnd -= deltaTime;
            zoomTimeStart -= deltaTime;
        }
        opts.recTimeLen = recTimeLen;
        opts.recTimeStart = recTimeStart;
        var pointTime = zoomTimeLen / lenX;
        var nowTime = zoomTimeEnd;
        var first_f = 0;
        var infDataA = [];
        var preV = null;
        var trigV = null;
        var trigX = Math.round(lenX * op.trigOffsetX / 1000);
        var preRecInxPos = null;
        var maxLen = lenX;
        if (trigPrg_f) {
            maxLen += lenX;
        }
        for (var ii = 0; ii < maxLen; ii++, nowTime -= pointTime) {
            var infData = null;
            if (nowTime >= recTimeEnd) {
                infDataA.push(infData);
                continue;
            }

            if (nowTime < recTimeStart)
                break;
            var nowX = (lenX - ii - 1);
            infData = {};
            var max = null;
            var min = null;
            if (opts.typeCnt === 0) {
                var posRecTime = nowTime - recTimeStart;
                var recInxPos = (posRecTime / recTimeLen) * recLen + recStartInx;
                //================================================
                var recInx0 = recInxPos | 0;
                //===================================================
                if (preRecInxPos === null) {
                    preRecInxPos = recInx0;
                }
                var deltaInxLen = preRecInxPos - recInx0;
                if (deltaInxLen < 0)
                    deltaInxLen += recBufSize;
                if (deltaInxLen > 2) {
                    var pos = preRecInxPos;
                    var chkTimes = deltaInxLen - 1;
                    for (var jj = 0; jj < chkTimes; jj++) {
                        pos--;
                        if (pos < 0)
                            pos += recBufSize;
                        vv = opts.buffer[pos];
                        if (max === null)
                            max = vv;
                        if (min === null)
                            min = vv;
                        if (vv > max)
                            max = vv;
                        if (vv < min)
                            min = vv;
                    }
                }
                preRecInxPos = recInx0;
                //===================================================

                var restRate = (recInxPos - recInx0);
                if (recInx0 >= recBufSize)
                    recInx0 -= recBufSize;
                var recInx1 = recInx0 + 1;
                if (recInx1 >= recBufSize)
                    recInx1 -= recBufSize;
                var inxBuf=recInx0;
                inxBuf++;
                if (inxBuf >= recBufSize)
                    inxBuf -= recBufSize;
                if(inxBuf=== opts.endInx)
                    recInx1=recInx0;
                
                var vv0 = opts.buffer[recInx0];
                var vv1 = opts.buffer[recInx1];
                var vv = (vv1 - vv0) * restRate + vv0;
                var trigV = opts.trigOffset;
            }
            if (opts.typeCnt === 1) {

                if (!first_f) {
                    var recInx = recEndInx;
                    if (--recInx < 0)
                        recInx = recBufSize - 1;
                    //=================================
                    var recTime=recTimeEnd;
                    for (var i = 0; i < recLen; i++) {
                        var tLen = opts.buffer[recInx] >> 1;
                        if ((recTime-tLen) < nowTime )
                            break;
                        recTime -= tLen;
                        if (--recInx < 0)
                            recInx = recBufSize - 1;
                    }
                }
                //===========================
                if (preRecInxPos === null) {
                    preRecInxPos = recInx;
                }
                var deltaInxLen = preRecInxPos - recInx;
                if (deltaInxLen < 0)
                    deltaInxLen += recBufSize;
                if (deltaInxLen >= 2) {
                    max = opts.levelSize;
                    min = 0;
                }
                preRecInxPos = recInx;
                //===========================
                var tValue = opts.buffer[recInx];
                var tLen = tValue >> 1;
                if (nowTime < recTime-tLen) {
                    recTime = recTime - tLen;
                    if (--recInx < 0)
                        recInx = recBufSize - 1;
                    tValue = opts.buffer[recInx];
                }
                infData.tValue = tValue;
                infData.recInx = recInx;
                var vv = 0;
                if (tValue & 1)
                    vv = opts.levelSize;
                var trigV = opts.levelSize / 2;
            }

            if (max !== null) {
                var ylen = max * yGridLen / opts.yScale;
                var realY = ycen - ylen - yOffset;
                if (realY > maxY)
                    realY = maxY;
                if (realY < minY)
                    realY = minY;
                max = realY;
            }
            if (min !== null) {
                var ylen = min * yGridLen / opts.yScale;
                var realY = ycen - ylen - yOffset;
                if (realY > maxY)
                    realY = maxY;
                if (realY < minY)
                    realY = minY;
                min = realY;
            }




            var ylen = vv * yGridLen / opts.yScale;
            var realY = ycen - ylen - yOffset;
            if (realY > maxY)
                realY = maxY;
            if (realY < minY)
                realY = minY;
            if (trigPrg_f) {
                if (nowX <= trigX) {
                    if (preV !== null && trigV !== null) {
                        var ok_f = 0;
                        if (!op.trigUpDown_f) {
                            if (preV > trigV && trigV > vv)
                                ok_f = 1;
                        } else {
                            if (vv > trigV && trigV > preV)
                                ok_f = 1;
                        }
                        if (ok_f) {
                            st.zoomTimeTrig = (trigX - nowX) * pointTime;
                            return;
                        }
                    }
                }
            }
            preV = vv;
            infData.value = vv;
            infData.x = xzero + nowX;
            infData.y = realY;
            infData.max = max;
            infData.min = min;
            infData.nowTime = nowTime;
            infDataA.push(infData);
            first_f = 1;
        }
        opts.infDataA = infDataA;
        return;
    }

    drawBufs(opts) {
        var op = this.md.opts;
        var st = this.md.stas;
        var md = this.md;
        var ctx = st.ctx1;
        var lenX = st.xAxeLen;
        var trigTimeX = -1 * op.zoomTimeLen / 2;
        ctx.strokeStyle = opts.color;
        ctx.lineWidth = opts.lineWidth;
        ctx.beginPath();
        var infDataA = opts.infDataA;
        if (!opts.offOn_f)
            return;
        var first_f = 0;
        for (var ii = 0; ii < lenX; ii++) {
            var infData = infDataA[ii];
            if (!infData)
                continue;
            if (!first_f)
                ctx.moveTo(infData.x, infData.y);
            else {
                ctx.lineTo(infData.x, infData.y);
                if (infData.max !== null)
                    ctx.lineTo(infData.x, infData.max);
                if (infData.min !== null)
                    ctx.lineTo(infData.x, infData.min);
            }
            first_f = 1;
        }
        ctx.stroke();
    }
    drawAxe() {
        var op = this.md.opts;
        var st = this.md.stas;
        var ctx = st.ctx;
        var ctx2 = st.ctx2;
        ctx.clearRect(0, 0, st.containerWidth, st.containerHeight);
        ctx2.clearRect(0, 0, st.containerWidth, st.containerHeight);
        op.messages = [];
        var mesObj = {};
        var mesObj = {};
        mesObj.x = -1 + st.xyOffx + st.xAxeLen / 2;
        mesObj.y = st.containerHeight - st.xyOffy - st.yAxeLen - 4;
        mesObj.text = "▶︎";
        mesObj.color = "#fff";
        mesObj.font = "12px sans-serif";
        op.messages.push(mesObj);
        var mesObj = {};
        mesObj.x = -9 + st.xyOffx + st.xAxeLen * 6 / 10;
        mesObj.y = st.containerHeight - st.xyOffy - st.yAxeLen - 4;
        mesObj.text = "◀︎︎";
        mesObj.color = "#fff";
        mesObj.font = "12px sans-serif";
        op.messages.push(mesObj);
        var mesObj = {};
        var unit = "ns";
        var value = Math.floor(op.zoomTimeLen / 10) ;
        if (value >= 1000) {
            unit = "us";
            value = value / 1000;
            if (value >= 1000) {
                unit = "ms";
                value = value / 1000;
                if (value >= 1000) {
                    unit = "s";
                    value = value / 1000;
                }
            }
        }
        if (value < 10)
            var vStr = value.toFixed(2);
        else if (value < 100)
            var vStr = value.toFixed(1);
        else
            var vStr = value.toFixed(0);
        mesObj.text = vStr + " " + unit;
        mesObj.font = "12px sans-serif";
        ctx.font = mesObj.font;
        var size = ctx.measureText(mesObj.text);
        var offs = ((st.xAxeLen / 10) - size.width) / 2;
        mesObj.x = offs + st.xyOffx + st.xAxeLen * 5 / 10;
        mesObj.y = st.containerHeight - st.xyOffy - st.yAxeLen - 4;
        mesObj.color = "#fff";
        op.messages.push(mesObj);
        x = st.xyOffx;
        for (var i = 0; i < op.lines.length; i++) {
            var opts = op.lines[i];
            if (!opts.offOn_f)
                continue
            var mesObj = {};
            //var vStr = op.lines[i].yScaleTbl[opts.yScaleSet];
            vStr = opts.yScale.toFixed(opts.yScaleFixed);
            vStr += opts.yScaleUnit;
            mesObj.x = x;
            mesObj.y = st.containerHeight - st.xyOffy - st.yAxeLen - 4;
            mesObj.text = vStr;
            mesObj.color = opts.color;
            mesObj.font = "12px sans-serif";
            ctx.font = mesObj.font;
            op.messages.push(mesObj);
            var size = ctx.measureText(mesObj.text);
            x += size.width + 20;
        }



        x = st.xyOffx;
        for (var i = 0; i < op.lines.length; i++) {
            var opts = op.lines[i];
            if (!opts.offOn_f)
                continue
            var mesObj = {};
            var vStr = opts.name;
            mesObj.x = x;
            mesObj.y = st.containerHeight - st.xyOffy + 16;
            mesObj.text = (i + 1) + ":" + vStr;
            mesObj.color = opts.color;
            mesObj.font = "14px sans-serif";
            ctx.font = mesObj.font;
            op.messages.push(mesObj);
            var size = ctx.measureText(mesObj.text);
            x += size.width + 30;
        }







        if (op.messages) {
            for (var i = 0; i < op.messages.length; i++) {
                var mesObj = op.messages[i];
                ctx.fillStyle = mesObj.color;
                ctx.font = mesObj.font;
                ctx.fillText(mesObj.text, mesObj.x, mesObj.y);
            }
        }


//===============================
        if (op.net_f) {
            ctx.strokeStyle = op.subAxeColorTbl[op.netFadeInx ];
            ctx.lineWidth = op.axeWidth;
            ctx.beginPath();
            var x = st.xyOffx;
            var y = st.containerHeight - st.xyOffy;
            var xSubAmt = op.xAxeGridAmt * op.xSubAxeGridAmt;
            var ySubAmt = op.yAxeGridAmt * op.ySubAxeGridAmt;
            var xadd = st.xAxeLen / xSubAmt;
            var yadd = st.yAxeLen / ySubAmt;
            for (var i = 0; i < ySubAmt + 1; i++) {
                ctx.moveTo(x, y - i * yadd);
                ctx.lineTo(x + st.xAxeLen, y - i * yadd);
            }
            for (var i = 0; i < xSubAmt + 1; i++) {
                ctx.moveTo(x + xadd * i, y);
                ctx.lineTo(x + xadd * i, y - st.yAxeLen);
            }
            ctx.stroke();
        }
//===============================
        ctx.strokeStyle = op.mainAxeColor;
        ctx.lineWidth = op.axeWidth;
        ctx.beginPath();
        var x = st.xyOffx;
        var y = st.containerHeight - st.xyOffy;
        var xadd = st.xAxeLen / op.xAxeGridAmt;
        var yadd = st.yAxeLen / op.yAxeGridAmt;
        for (var i = 0; i < op.xAxeGridAmt + 1; i++) {
            if (!op.grid_f && i !== 0 && i !== op.xAxeGridAmt)
                continue;
            ctx.moveTo(x + xadd * i, y);
            ctx.lineTo(x + xadd * i, y - st.yAxeLen);
        }
        for (var i = 0; i < op.yAxeGridAmt + 1; i++) {
            if (!op.grid_f && i !== 0 && i !== op.xAxeGridAmt)
                continue;
            ctx.moveTo(x, y - i * yadd);
            ctx.lineTo(x + st.xAxeLen, y - i * yadd);
        }
        ctx.stroke();
        //===============================
        if (op.centerLine_f && op.grid_f) {
            ctx.strokeStyle = op.centerLineColor;
            ctx.lineWidth = op.axeWidth;
            ctx.beginPath();
            var x = st.xyOffx;
            var y = st.containerHeight - st.xyOffy;
            var xadd = st.xAxeLen / 2;
            var yadd = st.yAxeLen / 2;
            ctx.moveTo(x + xadd * 1, y);
            ctx.lineTo(x + xadd * 1, y - st.yAxeLen);
            ctx.moveTo(x, y - 1 * yadd);
            ctx.lineTo(x + st.xAxeLen, y - 1 * yadd);
            ctx.stroke();
        }
//===============================
        /*
         */




//draw 1> 2> 3> 4> 
        st.noRectA = [];
        var nextPos = 0;
        for (var i = 0; i < op.lines.length; i++) {
            var noRect = {};
            if (op.lines[i].offOn_f) {
                var fontSize = 16;
                ctx.font = "" + fontSize + "px monospace";
                ctx.fillStyle = op.lines[i].color;
                var str = (i + 1) + "\u27a4";
                var size = ctx.measureText(str);
                if (st.noRectAOnFlag & (1 << nextPos))
                    ctx.fillStyle = "#fff";
                var offset = op.lines[i].offset;
                if (offset > 50)
                    offset = 50;
                if (offset < -50)
                    offset = -50;
                var fh = size.actualBoundingBoxAscent + size.actualBoundingBoxDescent;
                var xx = st.xyOffx - 2;
                var yy = st.containerHeight - st.xyOffy - st.yAxeLen / 2 - offset * st.yAxeLen / 100;
                var yd = 0;
                ctx.fillText(str, xx - size.width, yy + fh / 2 + yd);
                noRect.width = size.width;
                noRect.height = size.height;
                noRect.xl = xx - size.width - 10;
                noRect.yb = yy + fh / 2 + yd + 10;
                noRect.xr = xx + 10;
                noRect.yt = yy - fh / 2 + yd - 10;
            }
            nextPos++;
            st.noRectA.push(noRect);
        }
//==========================================
        if (!op.rightTag_f)
            return;
        //onoff square
        var tagX = st.xyOffx + st.xAxeLen + 6;
        var tagW = st.containerWidth - tagX - 4;
        var tagM = 10;
        var tagY = st.containerHeight - st.xyOffy - 22;
        var tagH = 20;
        for (var i = 0; i < op.lines.length; i++) {
            var opts = op.lines[i];
            ctx.strokeStyle = '#000';
            if (opts.offOn_f) {
                ctx.fillStyle = opts.color;
                if (st.noRectAOnFlag & (1 << (nextPos)))
                    ctx.strokeStyle = "#fff";
            } else
                ctx.fillStyle = "#222";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.rect(tagX, tagY, tagW, tagH);
            var noRect = {};
            noRect.width = tagW;
            noRect.height = tagH;
            noRect.xl = tagX;
            noRect.yt = tagY;
            noRect.xr = tagX + tagW;
            noRect.yb = tagY + tagH;
            st.noRectA.push(noRect);
            ctx.fill();
            ctx.stroke();
            tagY -= tagM + tagH;
            nextPos++;
        }

//===========================================
//draw tags
        tagY = st.xyOffy;
        var tagS = 14;
        for (var i = 0; i < op.rightTags.length; i++) {
            var fontHeight = 14;
            ctx.font = "" + fontHeight + "px monospace";
            var strA = op.rightTags[i].split("~");
            var size = ctx.measureText(strA[0]);
            var fh = size.actualBoundingBoxAscent + size.actualBoundingBoxDescent;
            var tagH = fh + tagS;
            ctx.strokeStyle = '#000';
            if (st.noRectAOnFlag & (1 << (nextPos)))
                ctx.strokeStyle = "#fff";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.strokeRect(tagX, tagY, tagW, tagH);
            ctx.fill();
            ctx.stroke();
            var noRect = {};
            noRect.width = tagW;
            noRect.height = tagH;
            noRect.xl = tagX;
            noRect.yt = tagY;
            noRect.xr = tagX + tagW;
            noRect.yb = tagY + tagH;
            st.noRectA.push(noRect);
            if (strA[1] === "1")
                ctx.fillStyle = '#fff';
            else
                ctx.fillStyle = '#666';
            ctx.fillText(strA[0], tagX + (tagW - size.width) / 2, tagY + (tagH / 2) + (fh / 2));
            tagY += tagM + tagH;
            if (i === 5)
                tagY += tagM + tagH;
            nextPos++;
        }
//==========================================

//draw trig


        if (op.lines[op.trigInx].offOn_f && op.trig_f) {
            var lineOpts = op.lines[op.trigInx];
            var tagX = st.xyOffx;
            var fontSize = 16;
            ctx.font = "" + fontSize + "px monospace";
            ctx.fillStyle = lineOpts.color;
            var str = "T▲︎";
            if (op.trigUpDown_f)
                var str = "T▼︎";
            var size = ctx.measureText(str);
            var fh = size.actualBoundingBoxAscent + size.actualBoundingBoxDescent;
            if (st.noRectAOnFlag & (1 << nextPos))
                ctx.fillStyle = "#fff";
            var ycen = st.containerHeight - st.xyOffy - st.yAxeLen / 2;
            var yGridLen = st.yAxeLen / op.yAxeGridAmt;
            var yOffset = st.yAxeLen * lineOpts.offset / 100;
            var vv = lineOpts.trigOffset;
            var ylen = vv * yGridLen / lineOpts.yScale;
            var realY = ycen - ylen - yOffset;
            if (realY > (st.yAxeLen + st.xyOffy - fh))
                realY = st.yAxeLen + st.xyOffy - fh;
            if (realY < st.xyOffy + fh)
                realY = st.xyOffy + fh;
            var tagY = realY;
            ctx.fillText(str, tagX, tagY + fh / 2 - 1);
            var noRect = {};
            noRect.width = size.width;
            noRect.height = fh + 20;
            noRect.xl = tagX - 10;
            noRect.yb = tagY + fh / 2 + 10;
            noRect.xr = tagX + size.width + 10;
            noRect.yt = tagY - fh / 2 - 10;
            st.noRectA.push(noRect);
            if (op.trigViewTime) {
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(tagX + size.width, tagY);
                ctx.lineTo(tagX + st.xAxeLen, tagY);
                ctx.stroke();
            }

        }
        nextPos++;
        if (op.trig_f) {
            var lineOpts = op.lines[op.trigInx];
            var fontSize = 24;
            ctx.font = "" + fontSize + "px monospace";
            ctx.fillStyle = "#00f";
            var str = "▼︎";
            var size = ctx.measureText(str);
            var fh = size.actualBoundingBoxAscent + size.actualBoundingBoxDescent;
            if (st.noRectAOnFlag & (1 << nextPos))
                ctx.fillStyle = "#fff";
            var tagX = st.xyOffx + st.xAxeLen * op.trigOffsetX / 1000;
            tagX -= size.width / 2;
            var tagY = 1 + st.xyOffy + fh / 2;
            ctx.fillText(str, tagX, tagY + fh / 2 - 1);
            var noRect = {};
            noRect.width = size.width;
            noRect.height = fh + 20;
            noRect.xl = tagX - 10;
            noRect.yb = tagY + fh / 2 + 10;
            noRect.xr = tagX + size.width + 10;
            noRect.yt = tagY - fh / 2 - 10;
            st.noRectA.push(noRect);
            if (op.trigViewTimeX) {
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(tagX + size.width / 2, tagY + fh / 2);
                ctx.lineTo(tagX + size.width / 2, st.xyOffy + st.yAxeLen);
                ctx.stroke();
            }

        }
        nextPos++;
        var ctx = st.ctx2;
        if (op.cursor_f && !op.run_f) {
            if (st.nowCurY !== undefined) {
                ctx.beginPath();
                ctx.strokeStyle = "#ccc";
                ctx.lineWidth = 1;
                ctx.moveTo(0, st.nowCurY);
                ctx.lineTo(st.containerWidth, st.nowCurY);
                ctx.moveTo(st.nowCurX, 0);
                ctx.lineTo(st.nowCurX, st.containerHeight);
                ctx.stroke();
            }

            var first_f = 0;
            var infDataInx=Math.round(st.xAxeLen - (st.nowCurX - st.xyOffx) - 1);
            for (var i = 0; i < op.lines.length; i++) {
                var infDataA = op.lines[i].infDataA;
                if (!infDataA)
                    continue;
                var infData = infDataA[infDataInx];
                if (!infData)
                    continue;
                if (!op.lines[i].offOn_f)
                    continue;
                if (op.lines[i].typeCnt === 0){
                    var textStr = infData.value.toFixed(op.lines[i].valueViewFixed);
                    textStr+=" "+ op.lines[i].yScaleUnit;
                }    
                if (op.lines[i].typeCnt === 1){
                    var time=infData.tValue>>1;
                    var recInx=infData.recInx;
                    var j=0;
                    for(;;){
                        j++;
                        var rightInfData = infDataA[infDataInx+j];
                        if(!rightInfData)
                            break;
                        if((rightInfData.tValue^infData.tValue)&1)
                            break;
                        if(rightInfData.recInx===recInx)
                            continue;
                        recInx=rightInfData.recInx;
                        time+=rightInfData.tValue>>1;
                    }
                    var recInx=infData.recInx;
                    var j=0;
                    for(;;){
                        j++;
                        var leftInfData = infDataA[infDataInx-j];
                        if(!leftInfData)
                            break;
                        if((leftInfData.tValue^infData.tValue)&1)
                            break;
                        if(leftInfData.recInx===recInx)
                            continue;
                        recInx=leftInfData.recInx;
                        time+=leftInfData.tValue>>1;
                    }
                    var textStr = MyNewScope.transTime(time);
                }    
                ctx.font = "12px monospace";
                var size = ctx.measureText(textStr);
                var fh = size.actualBoundingBoxAscent + size.actualBoundingBoxDescent;
                var tagH = fh + 4;
                var tagW = size.width + 8;
                ctx.strokeStyle = '#000';
                ctx.fillStyle = op.lines[i].color;
                ctx.lineWidth = 1;
                var tagX = st.nowCurX + 10;
                if (st.nowCurX > (st.xyOffx + st.xAxeLen / 2))
                    var tagX = st.nowCurX - tagW - 10;
                tagY = infData.y;
                tagH = fh + 8;
                ctx.beginPath();
                ctx.rect(tagX, tagY - tagH / 2, tagW, tagH);
                ctx.fill();
                ctx.stroke();
                ctx.fillStyle = "#222";
                ctx.fillText(textStr, tagX + (tagW - size.width) / 2, tagY + fh / 2);
                //=======================================
                continue;
                if (!first_f) {
                    first_f = 1;
                    var iv = (infData.nowTime * -1);
                    if (iv > 0) {
                        var textStr = MyNewScope.transTime(iv);
                        ctx.font = "12px monospace";
                        var size = ctx.measureText(textStr);
                        var h = 12;
                        var w = size.width + 4;
                        ctx.strokeStyle = '#000';
                        ctx.fillStyle = '#fff';
                        ctx.lineWidth = 1;
                        x = st.nowCurX + 10;
                        if (st.nowCurX > (st.xyOffx + st.xAxeLen / 2))
                            x = st.nowCurX - w - 10;
                        y = st.xyOffy + 2;
                        ctx.beginPath();
                        ctx.rect(x - 2, y - 2, w + 4, h + 4);
                        ctx.fill();
                        ctx.stroke();
                        ctx.fillStyle = "#222";
                        ctx.fillText(textStr, x + 2, y + h - 2);
                    }
                }

            }

        }










    }

    drawDutyBar() {
        var op = this.md.opts;
        var st = this.md.stas;
        var ctx = st.ctx2;
        ctx.strokeStyle = "#888";
        ctx.lineWidth = 6;
        ctx.beginPath();
        var x = st.xyOffx;
        var y = st.containerHeight - st.xyOffy - 2;
        ctx.moveTo(x, y);
        x += st.xAxeLen;
        ctx.lineTo(x, y);
        ctx.stroke();
        var recLenTime = 0;
        for (var i = 0; i < op.lines.length; i++) {
            var len = op.lines[i].recTimeLen;
            if (len > recLenTime)
                recLenTime = len;
        }
        st.maxRecordLenTime = recLenTime;
        if (recLenTime) {
            var recStartTime = recLenTime * -1;
            var recEndTime = 0;
            var zoomTimeEnd = op.zoomTimeEnd - st.zoomTimeDelta;
            var zoomTimeStart = zoomTimeEnd - op.zoomTimeLen;
            if (zoomTimeStart < recStartTime)
                zoomTimeStart = recStartTime;
            if (zoomTimeEnd > recEndTime)
                zoomTimeEnd = recEndTime;
            var startPos = st.xAxeLen * (zoomTimeStart - recStartTime) / recLenTime;
            var endPos = st.xAxeLen * (zoomTimeEnd - recStartTime) / recLenTime;
            if (startPos > (st.xAxeLen - 20))
                startPos = (st.xAxeLen - 20);
            if (endPos - startPos < 20)
                endPos = startPos + 20;
            if (st.dutyBarRect_f)
                ctx.strokeStyle = "#fff";
            else
                ctx.strokeStyle = "#88f";
            ctx.lineWidth = 6;
            ctx.beginPath();
            var x1 = st.xyOffx + startPos;
            ctx.moveTo(x1, y);
            var x2 = st.xyOffx + endPos;
            ctx.lineTo(x2, y);
            ctx.stroke();
            var y1 = y - 8;
            var y2 = y1 + 12;
            st.dutyBarRect = [x1, y1, x2, y2];
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
        var st = md.stas;
        var lyMaps = md.lyMaps;
        var blocks = op.blocks;
        var layouts = op.layouts;
        //st.xScale = MyNewScope.transXScale(MyNewScope.xScaleTbl[op.xScale]);
        MyNewScope.transYScale(op);
        gr.wavePageObj = md;
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
        opts.yArr = [50, 9999, 20];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["mainBody"] = cname;
        var cname = lyMaps["mainBody"] + "~" + 0;
        var opts = {};
        opts.xArr = [9999, 200];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["upBody"] = cname;
        //=======================================
        var cname = lyMaps["mainBody"] + "~" + 1;
        var opts = {};
        opts.xArr = [9999, 300];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["centerBody"] = cname;
        var cname = lyMaps["centerBody"] + "~" + 0;
        var opts = {};
        opts.baseColor = "#222";
        blocks[cname] = {name: "container", type: "Component~Cp_base~container.sys0", opts: opts};
        var cname = lyMaps["centerBody"] + "~" + 1;
        var opts = {};
        opts.baseColor = "#222";
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            if (iobj.act === "tunerMousePress") {
                self.timePosStPrg(0.5);
            }
            if (iobj.act === "tunerMouseUp") {
                self.timePosEndPrg();
            }
            if (iobj.act === "tunerChange") {
                var deltaAngle = iobj.dragAngle - iobj.sender.stas.checkAngle;
                if (iobj.tunerId === "netFade") {
                    if (deltaAngle > 30) {
                        self.netFadeAdd(1);
                        iobj.sender.stas.checkAngle = iobj.dragAngle;
                    }
                    if (deltaAngle < -30) {
                        self.netFadeAdd(-1);
                        iobj.sender.stas.checkAngle = iobj.dragAngle;
                    }
                    return;
                }
                if (iobj.tunerId === "zoom") {
                    if (deltaAngle > 10) {
                        self.timeZoomPrg(0.5, 1);
                        iobj.sender.stas.checkAngle = iobj.dragAngle;
                    }
                    if (deltaAngle < -10) {
                        self.timeZoomPrg(0.5, -1);
                        iobj.sender.stas.checkAngle = iobj.dragAngle;
                    }
                    return;
                }
                if (iobj.tunerId === "xPos") {
                    self.timePosMovePrg(iobj.dragAngle / 720 + 0.5);
                    iobj.sender.stas.checkAngle = iobj.dragAngle;
                    return;
                }
                if (iobj.tunerId === "trigPos") {
                    if (deltaAngle > 10) {
                        self.setTrigOffset(0.05, 1);
                        iobj.sender.stas.checkAngle = iobj.dragAngle;
                    }
                    if (deltaAngle < -10) {
                        self.setTrigOffset(-0.05, 1);
                        iobj.sender.stas.checkAngle = iobj.dragAngle;
                    }
                    return;
                }


                if (iobj.tunerId.includes("vAmp#")) {
                    var inx = KvLib.trsIntStrToInt(iobj.tunerId.split("#")[1], 0);
                    if (deltaAngle > 30) {
                        self.setYScale(1, inx);
                        iobj.sender.stas.checkAngle = iobj.dragAngle;
                    }
                    if (deltaAngle < -30) {
                        self.setYScale(-1, inx);
                        iobj.sender.stas.checkAngle = iobj.dragAngle;
                    }
                    return;
                }

                if (iobj.tunerId.includes("yPos#")) {
                    var inx = KvLib.trsIntStrToInt(iobj.tunerId.split("#")[1], 0);
                    if (deltaAngle > 10) {
                        self.setYPos(1, inx, 1);
                        iobj.sender.stas.checkAngle = iobj.dragAngle;
                    }
                    if (deltaAngle < -10) {
                        self.setYPos(-1, inx, 1);
                        iobj.sender.stas.checkAngle = iobj.dragAngle;
                    }
                    return;
                }


            }



            if (iobj.act === "signalChanged") {
                st.drawAxe_f = 1;
                st.drawBuf_f = 1;
                return;
            }
            if (iobj.act === "gridValueChanged") {
                op.netFadeInx = iobj.value;
                st.drawAxe_f = 1;
                return;
            }
            if (iobj.act === "xScaleChanged") {
                op.xScale = iobj.value;
                op.xAxeOffs = iobj.offsetValue;
                st.drawAxe_f = 1;
                st.drawBuf_f = 1;
                return;
            }
            if (iobj.act === "xOffsetChanged") {
                op.xAxeOffs = iobj.value;
                st.drawAxe_f = 1;
                st.drawBuf_f = 1;
                return;
            }
            if (iobj.act === "yScaleChanged") {
                op.lines[iobj.chInx].yScaleSet = iobj.value;
                st.drawAxe_f = 1;
                st.drawBuf_f = 1;
                return;
            }
            if (iobj.act === "yOffsetChanged") {
                op.lines[iobj.chInx].offset = iobj.value;
                st.drawAxe_f = 1;
                st.drawBuf_f = 1;
                return;
            }


            if (iobj.act === "actButtonClick") {
                if (iobj.buttonId === "runStop") {
                    md.mdClass.runOnOff();
                    return;
                }
                if (iobj.buttonId === "cursor") {
                    md.mdClass.cursorOnOff();
                    return;
                }
                if (iobj.buttonId === "grid") {
                    md.mdClass.gridOnOff();
                    return;
                }
                if (iobj.buttonId === "net") {
                    md.mdClass.netOnOff();
                    return;
                }
                if (iobj.buttonId === "trigUpDown") {
                    md.mdClass.trigUpDown();
                    return;
                }
            }
            if (iobj.act === "mouseClick") {
                if (iobj.buttonId === "dispTypeMain") {
                    md.opts.displayType = 0;
                    return;
                }
                if (iobj.buttonId === "dispTypeRoll") {
                    md.opts.displayType = 1;
                    return;
                }
                if (iobj.buttonId.includes("trigCh")) {
                    if (md.opts.trig_f) {
                        if (md.opts.trigInx === iobj.buttonInx) {
                            md.mdClass.trigOnOff();
                        } else {
                            md.opts.trigInx = iobj.buttonInx;
                            md.mdClass.trigOnOff(1);
                        }
                    } else {
                        md.opts.trigInx = iobj.buttonInx;
                        md.mdClass.trigOnOff();
                    }
                    return;
                }
                if (iobj.buttonId === "ch1") {
                    if (iobj.setOptsObj.opts.setOpts.value & 1)
                        op.lines[0].offOn_f = 1;
                    else
                        op.lines[0].offOn_f = 0;
                    st.drawAxe_f = 1;
                    st.drawBuf_f = 1;
                    return;
                }
                if (iobj.buttonId === "ch2") {
                    if (iobj.setOptsObj.opts.setOpts.value & 2)
                        op.lines[1].offOn_f = 1;
                    else
                        op.lines[1].offOn_f = 0;
                    st.drawAxe_f = 1;
                    st.drawBuf_f = 1;
                    return;
                }
                if (iobj.buttonId === "ch3") {
                    if (iobj.setOptsObj.opts.setOpts.value & 4)
                        op.lines[2].offOn_f = 1;
                    else
                        op.lines[2].offOn_f = 0;
                    st.drawAxe_f = 1;
                    st.drawBuf_f = 1;
                    return;
                }
                if (iobj.buttonId === "ch4") {
                    if (iobj.setOptsObj.opts.setOpts.value & 8)
                        op.lines[3].offOn_f = 1;
                    else
                        op.lines[3].offOn_f = 0;
                    st.drawAxe_f = 1;
                    st.drawBuf_f = 1;
                    return;
                }

            }
        };
        //=========================
        opts.signalMode = 0;
        opts.chNames = op.chNames;
        //==============
        opts.xScale = op.xScale;
        opts.yOffsets = [0, -50, 50, 100];
        opts.xOffset = op.xAxeOffs;
        //
        opts.yScales = [];
        opts.yOffsets = [];
        for (var i = 0; i < op.lines.length; i++) {
            opts.yScales.push(op.lines[i].yScaleSet);
            opts.yOffsets.push(op.lines[i].offset);
        }
        opts.netFadeInx = op.netFadeInx;
        opts.run_f = op.run_f;
        opts.typeCnt = 0;
        opts.trig_f = 0;
        opts.trigInx = 0;
        opts.dispValue = 15;
        blocks[cname] = {name: "scopeCtr", type: "Model~MyNewScopeCtr~base.sys0", opts: opts};
        //=======================================
        var cname = lyMaps["mainBody"] + "~" + 0;
        var actionPrg = function (iobj) {
            console.log(iobj);
            iobj.sender = md;
            iobj.act = "esc";
            KvLib.exe(op.actionFunc, iobj);
        };
        mac.setHeadTitleBar(md, cname, op.title, actionPrg);
        var cname = lyMaps["mainBody"] + "~" + 2;
        mac.setFootBar(md, cname);
    }
}

class MyNewTuner {
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);
        this.subTypeOpts(opts);
        opts.title = "title";
        opts.baseColor = "#002";
        opts.xm = 30;
        opts.addAngleMul = 10;
        return opts;
    }
    subTypeOpts(opts) {
        if (this.md.subType === "base.sys0") {
        }
    }
    chkWatch() {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
    }
    afterCreate() {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        //=======================================================
        st.nowAngle = 0;
        st.preAngle = 0;
        var plotObj = md.blockRefs["container"];
        var plotElem = plotObj.elems["base"];
        st.containerWidth = plotObj.stas.containerWidth;
        st.containerHeight = plotObj.stas.containerHeight;
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
        var canvas = st.canvas = selem;
        canvas.style.pointerEvents = "none";
        st.ctx = canvas.getContext('2d');
        st.img = new Image();
        st.img.src = "systemResource/knob.png";
        st.img.onload = function () {
            var img = st.img;
            st.ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, st.containerWidth, st.containerHeight);
            st.imageLoaded_f = 1;
        };
        var pressFunc = function (curX, curY) {
            var xx = curX - (st.containerWidth / 2);
            var yy = (st.containerHeight / 2) - curY;
            var rr = st.containerWidth / 2;
            var dd2 = xx * xx + yy * yy;
            if (dd2 > (rr * rr))
                return;
            if (dd2 < (10 * 10))
                return;
            md.stas.actionOn_f = 1;
            var ang = KvLib.atan(xx, yy);
            md.stas.preAngle = ang;
            md.stas.addTmp = 0;
            if (md.stas.rotateAng) {
                ang = ang - st.rotateAng;
                if (ang < 0)
                    ang += 360;
            }
            md.stas.nowAngle = ang;
            md.stas.starAngle = ang;
            md.stas.dragAngle = 0;
            md.stas.checkAngle = 0;
            var obj = {};
            obj.act = "mousePress";
            KvLib.exe(op.actionFunc, obj);
        }
        var knobPressFunc = function (event) {
            pressFunc(event.offsetX, event.offsetY);
            var checkMouseUpFunc = function () {
                if (gr.mouseDown_f) {
                    setTimeout(checkMouseUpFunc, 100);
                    return;
                }
                md.stas.actionOn_f = 0;
            };
        };
        var knobUpFunc = function (event) {
            md.stas.actionOn_f = 0;
            var obj = {};
            obj.act = "mouseUp";
            KvLib.exe(op.actionFunc, obj);
        };

        var moveFunc = function (curX, curY) {
            var xx = curX - (st.containerWidth / 2);
            var yy = (st.containerHeight / 2) - curY;
            var dd2 = xx * xx + yy * yy;
            if (dd2 < (10 * 10))
                return;
            var ang = KvLib.atan(xx, yy);
            var addAngle = ang - md.stas.preAngle;
            if (addAngle < -270) {
                addAngle = ang + 360 - md.stas.preAngle;
            } else if (addAngle > 270) {
                addAngle = (360 - ang + md.stas.preAngle) * -1;
            } else {
            }
            md.stas.dragAngle += addAngle;
            md.stas.preAngle = ang;
            var rotateAng = ang - md.stas.nowAngle;
            md.stas.rotateAng = rotateAng;
            KvLib.drawRotated(rotateAng, st.canvas, st.ctx, st.img, "ccw");
            var obj = {};
            obj.act = "rotated";
            obj.angle = ang | 0;
            obj.dragAngle = md.stas.dragAngle;
            obj.sender = md;
            KvLib.exe(op.actionFunc, obj);


        };
        var knobMoveFunc = function (event) {
            if (!md.stas.actionOn_f)
                return;
            if (!gr.mouseDown_f)
                return;
            moveFunc(event.offsetX, event.offsetY);
        };
        plotElem.addEventListener("mousedown", knobPressFunc);
        plotElem.addEventListener("mouseup", knobUpFunc);
        plotElem.addEventListener("mousemove", knobMoveFunc);
        //===============

        plotElem.addEventListener('touchstart', (e) => {
            st.isDragging = true;
            var xyObj=KvLib.getPosition(plotElem);
            const touch = e.touches[0]; // Get the first touch point
            var xx = touch.clientX - xyObj.x;
            var yy = touch.clientY - xyObj.y;
            pressFunc(xx, yy);
            e.preventDefault(); // Prevent default browser behavior (like scrolling)
        });

        plotElem.addEventListener('touchmove', (e) => {
            if (!st.isDragging)
                return;
            var xyObj=KvLib.getPosition(plotElem);
            const touch = e.touches[0];
            var xx = touch.clientX - xyObj.x;
            var yy = touch.clientY - xyObj.y;
            moveFunc(xx, yy);
            e.preventDefault();
        });

        plotElem.addEventListener('touchend', () => {
            knobUpFunc();
            st.isDragging = false;
        });

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
        opts.baseColor = op.baseColor;
        opts.whr = 1;
        blocks[cname] = {name: "container", type: "Component~Cp_base~container.sys0", opts: opts};
        return;
    }
}
