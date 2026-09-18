class Oscilloscope {
    // LineChart 負責示波器頁面的資料緩衝、互動控制與多層 Canvas 繪製。
    // 這個 class 本身不直接管理 DOM 佈局，而是掛載在 Block 系統建立的容器之上運作。
    constructor() {



    }
    // X 軸時間基準候選值（單位 ns），縮放時會在此表內尋找下一個合適刻度。
    static xScaleTbl = [
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
    // Y 軸倍率候選值（類似 1-2-5 工程刻度），對應通道垂直縮放。
    static yScaleTbl = [
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

    // 將 "10 mS" 這類字串刻度轉為 ns 數值，供內部統一時間運算。
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

    // 將 ns 時間值轉成可讀字串（nS/uS/mS/S），用於游標量測與提示資訊。
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
        return (iv.toFixed(0) + " nS");
    }


    // 初始化右側快速功能標籤文字與開關狀態。
    // 格式採用 "標籤~開關值"，後續繪製與事件命中都依賴此格式。
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

    // 初始化示波器核心參數：座標、網格、時間窗、取樣緩衝與通道預設。
    // 這是整個元件的「狀態模型」入口。
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
        opts.sampleAmt = 10000; // 每通道取樣數量
        opts.sampleBufSize = 2000000;// 每通道緩衝區大小
        opts.ySubAxeGridAmt = 5;
        self.initLines(opts);
        //=======================
        return opts;
    }

    // 建立 4 通道資料緩衝與每通道顯示/取樣屬性。
    // 每個通道使用 ring buffer，避免持續 push/shift 造成記憶體搬移成本。
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

    // 調整網格亮度等級（0~9），並標記需要重繪座標軸。
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

    // 切換觸發功能（或指定值），並觸發短暫觸發線顯示。
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

    // 切換游標量測模式（十字線與量測框顯示）。
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

    // 切換主網格顯示。
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

    // 切換背景細網格顯示。
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

    // 切換觸發斜率方向（上升/下降沿）。
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

    // 切換 run/stop。run 時會持續接收或模擬資料並更新畫面。
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

    // 切換信號來源模式，並重新初始化通道參數。
    // signalMode:
    // 1=測試訊號(TST1/2/3)
    // 2=SIG1
    // 3=SIG2
    // 4=SIG3
    // 5=SIG4
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

    // 依滑鼠滾輪縮放時間窗。
    // zoomPosRate 是滑鼠在 X 軸上的相對位置，縮放後會盡量保持該位置視覺對齊。
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

    // 開始水平拖曳（平移時間窗）前的狀態記錄。
    timePosStPrg(zoomPosRate) {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        st.dragPosOn_f = 1;
        st.zoomPosRateSt = zoomPosRate;
        st.zoomPosRateDt = 0;
        st.grapSpeed = 0;
    }

    // 結束水平拖曳，將拖曳暫存位移正式提交到 zoomTimeEnd。
    timePosEndPrg() {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        var deltaTime = md.stas.zoomPosRateDt * op.zoomTimeLen;
        op.zoomTimeEnd -= deltaTime;
        st.dragPosOn_f = 0;
    }

    // 拖曳過程中的即時時間窗位移（含邊界限制）。
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

    // 設定觸發電平位置。
    // delta_f=0: 以絕對比例設定；delta_f=1: 以增量方式調整。
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

    // 調整指定通道的 Y 倍率（從候選刻度表找下一級/上一級）。
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

    // 調整指定通道的垂直偏移。
    // delta_f=0 使用絕對位置，delta_f=1 使用增量偏移。
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

    // 元件建立後初始化：計算實際像素尺度、建立三層 Canvas、掛載滑鼠事件。
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
            // 滑鼠按下：
            // 1) 先建立 mouseup 監看回收暫態
            // 2) 檢查命中區（通道開關、右側按鈕、訊號來源）
            // 3) 若命中可拖曳區，進入時間窗或控制點拖曳模式
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
            // 滑鼠放開：提交拖曳期間暫存的時間位移，並清除拖曳旗標。
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
            // 滑鼠移動：
            // - 更新游標座標
            // - 更新命中矩形 bitmask
            // - 若在拖曳態，依類型執行 trig/通道位移/時間窗平移
            // - 非拖曳態則僅要求重繪，提供 hover 反饋
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
                    var left = (Math.floor(st.maxRecordLenTime + op.zoomTimeLen * 0.6)) * (-1);
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
            // 滾輪行為依命中區上下文決定：
            // - TRIG 區：切換觸發通道
            // - TRIG 箭頭：切換上升/下降沿
            // - NET 區：調網格亮度
            // - 通道區：調單通道 Y 縮放
            // - 其他區：調整時間縮放

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

    // 測試信號群組 1：多通道類比正弦。
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

    // 測試信號群組 2：多通道隨機擾動。
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

    // 測試信號群組 3：數位位元流（typeCnt=1）。
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

    // 實際場景 M3I0：功率相關曲線（DB）與長時間窗觀測。
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
            md.opts.zoomTimeLen = 1000 * 1000 * 1000;
            md.opts.zoomTimeEnd = 0;
            if (i === 0) {
                lineObj.name = "前置放大器輸出功率";
                lineObj.yScale = 20; //
            }
            if (i === 1) {
                lineObj.name = "驅動放大器輸出功率";
                lineObj.yScale = 40; //
            }
            if (i === 2) {
                lineObj.name = "順向輸出功率";
                lineObj.yScale = 60; //
            }
            if (i === 3) {
                lineObj.name = "反向輸出功率";
                lineObj.yScale = 40; //
            }
        }
    }


    // 實際場景 M2I0：偏向單主通道數位訊號顯示。
    setM2I0Signal() {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        op.signalMode = 2;
        op.signalModeInx = 0;
        for (var i = 0; i < 4; i++) {
            var lineObj = md.opts.lines[i];
            lineObj.sampleRate = 20000000;
            if (i === 0)
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



    // Block 監看回呼：每輪觸發 frameTimer，並同步外部狀態列資訊。
    chkWatch() {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        this.frameTimer();
        gr.footBarStatus2 = ani.dispFs;
    }

    // 只標記波形層待重繪，不立即繪圖（避免事件中重繪抖動）。
    reDrawBuf() {
        var self = this;
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        st.drawBuf_f = 1;
    }

    // 主循環（每幀）：
    // 1) 產生/接收資料
    // 2) 更新觸發提示與慣性平移
    // 3) 依旗標分層重繪（軸層 -> 波形層 -> 概覽條）
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

        if (!st.dragPosOn_f) {// 當未拖曳時，處理慣性平移。
            if (st.grapSpeed >= 2 || st.grapSpeed <= -2) {
                var rate = st.grapSpeed * 0.0004;
                var deltaTime = rate * op.zoomTimeLen;
                op.zoomTimeEnd -= deltaTime;
                var maxRight = Math.floor(op.zoomTimeLen * 0.6);
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

    // 將一批樣本寫入指定通道 ring buffer。
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

    // 測試資料產生器（僅 run 狀態下動作）。
    // 不同 signalMode 對應不同資料分佈與時間尺度。
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
                    var values = [];
                    for (var j = 0; j < 100; j++) {
                        values.push(Math.round(1000 * Math.random() + 100) * 2 + (j & 1));
                    }
                    self.addBuf(i, values);
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
    // 將資料併入固定長度視窗；超出時平移 stInx 實現滑動窗。
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
            lineObj.buffer[inx] = buf[j];
        }
    }

    // 清除上層繪圖緩衝。
    clearScr() {
        var st = this.md.stas;
        var ctx = st.ctx1;
        ctx.clearRect(0, 0, st.containerWidth, st.containerHeight);
    }

    // 清除所有畫布層。
    clearAll() {
        var st = this.md.stas;
        var ctx2 = st.ctx2;
        var ctx1 = st.ctx1;
        var ctx = st.ctx;
        ctx.clearRect(0, 0, st.containerWidth, st.containerHeight);
        ctx1.clearRect(0, 0, st.containerWidth, st.containerHeight);
        ctx2.clearRect(0, 0, st.containerWidth, st.containerHeight);
    }

    // 清除座標軸層。
    clearAxe() {
        var st = this.md.stas;
        var ctx = st.ctx;
        ctx.clearRect(0, 0, st.containerWidth, st.containerHeight);
    }
    // 清除波形層。
    clearBuf() {
        var st = this.md.stas;
        var ctx = st.ctx1;
        ctx.clearRect(0, 0, st.containerWidth, st.containerHeight);
    }

    // 將時間窗映射到通道緩衝，產生每個像素欄位要畫的點資料。
    // 核心任務：
    // - ring buffer 時間定位
    // - 類比內插 / 數位段解析
    // - 極值保留（避免降採樣吃掉尖峰）
    // - 可選觸發對齊檢測
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
        // 計算時間窗對應的像素欄位。
        var xzero = st.xyOffx | 0;
        var ycen = st.containerHeight - st.xyOffy - st.yAxeLen / 2;
        var yGridLen = st.yAxeLen / op.yAxeGridAmt;
        var yOffset = st.yAxeLen * opts.offset / 100;
        //============================================
        // 計算時間窗對應的像素欄位的相關變數。
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
        if (opts.typeCnt === 0) {// 類比型通道
            var recTimeLen = recLen * recSampTime;
            var recTimeStart = recTimeLen * -1;
        }
        if (opts.typeCnt === 1) {// 數位型通道
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
                // 類比模式：以時間比例定位樣本，並在像素跨度較大時回掃 max/min 保留尖峰。
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
                var inxBuf = recInx0;
                inxBuf++;
                if (inxBuf >= recBufSize)
                    inxBuf -= recBufSize;
                if (inxBuf === opts.endInx)
                    recInx1 = recInx0;

                var vv0 = opts.buffer[recInx0];
                var vv1 = opts.buffer[recInx1];
                var vv = (vv1 - vv0) * restRate + vv0;
                var trigV = opts.trigOffset;
            }
            if (opts.typeCnt === 1) {
                // 數位模式：buffer 值格式為 [時間長度<<1 | 電平bit]。
                // 先定位所在段，再解碼電平高度與段資訊。

                if (!first_f) {
                    var recInx = recEndInx;
                    if (--recInx < 0)
                        recInx = recBufSize - 1;
                    //=================================
                    var recTime = recTimeEnd;
                    for (var i = 0; i < recLen; i++) {
                        var tLen = opts.buffer[recInx] >> 1;
                        if ((recTime - tLen) < nowTime)
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
                if (nowTime < recTime - tLen) {
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
                // 觸發對齊：在觸發 X 附近檢測穿越門檻（依 trigUpDown_f 判斷上升或下降）。
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

    // 將 infDataA 畫成線段；若有 max/min，附加垂直線保留波峰/波谷。
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
    // 繪製軸層與互動命中區：
    // - 主/次網格與中心線
    // - 通道標籤與右側功能按鈕
    // - 觸發控制標記與游標量測浮框
    // 同時重建 st.noRectA 供事件命中使用。
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
        var value = Math.floor(op.zoomTimeLen / 10);
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
            ctx.strokeStyle = op.subAxeColorTbl[op.netFadeInx];
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
        // 左側通道位移操作箭頭與命中區塊。
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
        // 右側功能按鍵列（CLEAR/RUN/TRIG/CURSOR/GRID/NET/TST/SIG）。
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
        // 觸發水平門檻與垂直觸發時間位置控制。


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
            // 停止態下提供精準讀值：交叉線 + 各通道對應點值浮框。
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
            var infDataInx = Math.round(st.xAxeLen - (st.nowCurX - st.xyOffx) - 1);
            for (var i = 0; i < op.lines.length; i++) {
                var infDataA = op.lines[i].infDataA;
                if (!infDataA)
                    continue;
                var infData = infDataA[infDataInx];
                if (!infData)
                    continue;
                if (!op.lines[i].offOn_f)
                    continue;
                if (op.lines[i].typeCnt === 0) {
                    var textStr = infData.value.toFixed(op.lines[i].valueViewFixed);
                    textStr += " " + op.lines[i].yScaleUnit;
                }
                if (op.lines[i].typeCnt === 1) {
                    var time = infData.tValue >> 1;
                    var recInx = infData.recInx;
                    var j = 0;
                    for (; ;) {
                        j++;
                        var rightInfData = infDataA[infDataInx + j];
                        if (!rightInfData)
                            break;
                        if ((rightInfData.tValue ^ infData.tValue) & 1)
                            break;
                        if (rightInfData.recInx === recInx)
                            continue;
                        recInx = rightInfData.recInx;
                        time += rightInfData.tValue >> 1;
                    }
                    var recInx = infData.recInx;
                    var j = 0;
                    for (; ;) {
                        j++;
                        var leftInfData = infDataA[infDataInx - j];
                        if (!leftInfData)
                            break;
                        if ((leftInfData.tValue ^ infData.tValue) & 1)
                            break;
                        if (leftInfData.recInx === recInx)
                            continue;
                        recInx = leftInfData.recInx;
                        time += leftInfData.tValue >> 1;
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

    // 底部時間概覽條：顯示目前 zoom 視窗在全紀錄中的覆蓋範圍，並支援拖曳平移。
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
    // 對外動作回呼保留點（目前主要做 debug 觀察）。
    actionFunc(iobj) {
        console.log(iobj);
        if (iobj.act === "mouseClick") {
            if (iobj.keyId === "radarPaneSetButton") {
            }
        }

    }

    // 元件結構組裝：建立 layout 樹、主顯示區、控制區，並綁定控制器到對應業務方法。
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
        layouts[cname] = { name: cname, type: "Layout~Ly_base~array.sys0", opts: opts };
        lyMaps["body"] = cname;
        //======================================    
        var opts = {};
        md.setPns(opts);
        blocks[cname] = { name: "basePanel", type: "Component~Cp_base~plate.sys0", opts: opts };
        //=======================================
        var cname = lyMaps["body"] + "~" + 0;
        var opts = {};
        opts.yArr = [50, 9999, 20];
        layouts[cname] = { name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts };
        lyMaps["mainBody"] = cname;
        var cname = lyMaps["mainBody"] + "~" + 0;
        var opts = {};
        opts.xArr = [9999, 200];
        layouts[cname] = { name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts };
        lyMaps["upBody"] = cname;
        //=======================================
        var cname = lyMaps["mainBody"] + "~" + 1;
        var opts = {};
        opts.xArr = [9999, 300];
        layouts[cname] = { name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts };
        lyMaps["centerBody"] = cname;
        var cname = lyMaps["centerBody"] + "~" + 0;
        var opts = {};
        opts.baseColor = "#222";
        blocks[cname] = { name: "container", type: "Component~Cp_base~container.sys0", opts: opts };
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
        blocks[cname] = { name: "scopeCtr", type: "Model~MyNewScopeCtr~base.sys0", opts: opts };
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

// =============================================================================
// LineChart
// 這個類別是整個頁面的折線圖控制器，負責三件事：
// 1. 管理資料緩衝區，將串流資料寫入 ring buffer，避免頻繁搬移陣列。
// 2. 維護視窗狀態，包含目前顯示的資料區間、縮放區間與滑鼠互動狀態。
// 3. 將資料拆成三個 Canvas layer 繪製：座標軸、資料線、互動/提示層。
//
// 與較早期的 Oscilloscope 實作相比，這版刻意把渲染簡化成純 Canvas，
// 讓每個繪圖步驟都更可預測，也更容易針對 hover、拖曳與縮放做細部控制。
// =============================================================================
class LineChart {

    constructor() { }

    // Y 軸刻度直接沿用示波器的工程刻度表，確保不同圖表元件共用同一套尺度定義。
    static get yScaleTbl() { return Oscilloscope.yScaleTbl; }

    // 建立元件狀態初值：這裡定義的是「圖表控制模型」，不是 DOM。
    // 之後 afterCreate 只負責把這些狀態投影到實際 Canvas 與事件處理上。
    initOpts(md) {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);
        opts.title = "Line Chart";
        opts.baseColor = "#004";
        opts.chartBackgroundColor = "#222222";
        opts.canvasFontColor = "#cbd5e1";
        opts.gridColor = "rgba(148,163,184,0.20)";
        opts.axisColor = "#64748b";
        opts.sampleAmt = 20000; // 目前顯示的樣本數量，對應於「最近 totalLen 筆」資料。
        opts.sampleBufSize = 20000;
        // 可視窗口參數：viewStart/viewLen 作用在「最近 totalLen 筆」時間軸上。
        // viewStart 不是絕對資料序號，而是「相對於目前有效樣本尾端」的視圖起點。
        opts.viewStart = 0;
        opts.viewLen = opts.sampleAmt;
        opts.yAxisViewMinValue = null;
        opts.yAxisViewMaxValue = null;
        opts.run_f = 1;
        opts.drawHover_f = 1;
        self.initLines(opts);
        return opts;
    }

    // 建立 4 條通道與預設波形。
    // 這裡先塞入少量 seed 資料，讓圖表在首次載入時不會是空白畫面。
    initLines(opts) {
        opts.lines = [];
        var colorTbl = ["#0ea5e9", "#10b981", "#f59e0b", "#ef4444"];
        for (var i = 0; i < 4; i++) {
            var lineObj = {};
            var buffer = new Array(opts.sampleBufSize).fill(0);
            lineObj.name = "CH" + (i + 1);
            lineObj.color = colorTbl[i];
            lineObj.offOn_f = 1;
            lineObj.lineWidth = 1.8;
            lineObj.stInx = 0;
            lineObj.endInx = 0;
            lineObj.recordLen = 0;
            lineObj.buffer = buffer;
            lineObj.serialCnt = 0;
            lineObj.labelFixed = 0;
            lineObj.offset = 0;
            lineObj.gain = 1;

            // seedLen 控制預載資料量：不需要一次填滿整個 buffer，避免初始化成本過高。
            var seedLen = Math.min(opts.sampleAmt, 16000);
            for (var j = 0; j < seedLen; j++) {
                var v = 0;
                if (i === 0) {
                    v = Math.sin(j * 2 * Math.PI / 140) * 30;
                } else if (i === 1) {
                    v = Math.cos(j * 2 * Math.PI / 90) * 18 + Math.sin(j * 2 * Math.PI / 19) * 2;
                } else if (i === 2) {
                    v = Math.sin(j * 2 * Math.PI / 230) * 9;
                } else {
                    v = Math.cos(j * 2 * Math.PI / 270) * 7;
                }
                buffer[j] = v;
            }
            lineObj.endInx = seedLen;
            lineObj.recordLen = seedLen;
            lineObj.serialCnt = seedLen;
            opts.lines.push(lineObj);
        }
    }

    // afterCreate 是 DOM 與事件綁定入口：
    // 1. 找到容器
    // 2. 疊出三個 canvas layer
    // 3. 把滑鼠/視窗事件接上
    // 4. 進行第一次完整繪製
    afterCreate() {
        var self = this;
        var md = this.md;
        var op = md.opts;
        var st = md.stas;

        var plotObj = md.blockRefs["container"];
        var plotElem = plotObj.elems["base"];
        st.containerWidth = plotObj.stas.containerWidth;
        st.containerHeight = plotObj.stas.containerHeight;

        // 每一層 canvas 都絕對疊在容器上方，透過 z-index 控制先後順序。
        // 這種做法可以把「不需要頻繁重畫的內容」和「每次滑鼠移動都會變的內容」分層。
        var mkCanvas = function (idSuffix, zIndex) {
            var c = document.createElement("canvas");
            c.id = md.kid + idSuffix;
            c.width = st.containerWidth;
            c.height = st.containerHeight;
            c.style.position = "absolute";
            c.style.left = "0";
            c.style.top = "0";
            c.style.width = "100%";
            c.style.height = "100%";
            c.style.zIndex = String(zIndex);
            plotElem.appendChild(c);
            return c;
        };

        // 0: 座標軸層、1: 資料層、2: marker/tooltip/互動層。
        // 分層之後，滑鼠移動只需要重畫互動層，不必每次都重繪所有線段。
        st.canvasAxe = mkCanvas("_lineChartCanvasAxe", 0);
        st.canvasData = mkCanvas("_lineChartCanvasData", 1);
        st.canvasMark = mkCanvas("_lineChartCanvasMark", 2);

        st.ctxAxe = st.canvasAxe.getContext("2d");
        st.ctxData = st.canvasData.getContext("2d");
        st.ctxMark = st.canvasMark.getContext("2d");
        st.drawAxe_f = 1;
        st.drawData_f = 1;
        st.drawMark_f = 1;
        st.drawBuf_f = 1;
        st.hoverOn_f = 0;
        st.selecting_f = 0;
        st.xPanDrag_f = 0;
        st.winDragMode = "";
        st.yWinDragMode = "";

        // 在容器右上角提供一個快速還原縮放按鈕。
        // 使用獨立 DOM 元素可避免和 canvas 命中邏輯互相干擾。
        if (window.getComputedStyle(plotElem).position === "static") {
            plotElem.style.position = "relative";
        }
        var resetZoomBtn = document.createElement("button");
        resetZoomBtn.id = md.kid + "_lineChartResetZoomBtn";
        resetZoomBtn.textContent = "Origin Zoom";
        resetZoomBtn.title = "Return to origin zoom";
        resetZoomBtn.style.position = "absolute";
        resetZoomBtn.style.right = "12px";
        resetZoomBtn.style.top = "20px";
        resetZoomBtn.style.zIndex = "4";
        resetZoomBtn.style.padding = "4px 10px";
        resetZoomBtn.style.border = "1px solid #94a3b8";
        resetZoomBtn.style.borderRadius = "6px";
        resetZoomBtn.style.background = "rgba(255,255,255,0.92)";
        resetZoomBtn.style.color = "#0f172a";
        resetZoomBtn.style.cursor = "pointer";
        resetZoomBtn.style.font = "12px sans-serif";
        resetZoomBtn.addEventListener("click", function (event) {
            event.preventDefault(); // 阻止預設行為，避免表單提交或其他默認事件觸發
            event.stopPropagation(); // 阻止事件冒泡，避免觸發其他事件處理器 
            var totalLen = Math.max(1, st.totalLen || op.sampleAmt || 1);
            op.viewStart = 0;
            op.viewLen = Math.min(op.sampleAmt, totalLen);
            op.yAxisViewMinValue = null;
            op.yAxisViewMaxValue = null;
            st.drawAxe_f = 1;
            st.drawData_f = 1;
            st.drawMark_f = 1;
            st.drawBuf_f = 1;
        });
        plotElem.appendChild(resetZoomBtn);
        st.resetZoomBtn = resetZoomBtn;

        // Return Zoom 按鈕：還原到上一次縮放狀態（X + Y）。
        var retZoomBtn = document.createElement("button");
        retZoomBtn.id = md.kid + "_lineChartRetZoomBtn";
        retZoomBtn.textContent = "Return Zoom";
        retZoomBtn.title = "Return to previous zoom";
        retZoomBtn.style.position = "absolute";
        retZoomBtn.style.right = "110px";
        retZoomBtn.style.top = "20px";
        retZoomBtn.style.zIndex = "4";
        retZoomBtn.style.padding = "4px 10px";
        retZoomBtn.style.border = "1px solid #94a3b8";
        retZoomBtn.style.borderRadius = "6px";
        retZoomBtn.style.background = "rgba(255,255,255,0.92)";
        retZoomBtn.style.color = "#0f172a";
        retZoomBtn.style.cursor = "pointer";
        retZoomBtn.style.font = "12px sans-serif";
        retZoomBtn.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();
            if (!st.prevZoom) return;
            op.viewStart = st.prevZoom.viewStart;
            op.viewLen = st.prevZoom.viewLen;
            op.yAxisViewMinValue = st.prevZoom.yMin;
            op.yAxisViewMaxValue = st.prevZoom.yMax;
            st.prevZoom = null;
            st.drawAxe_f = 1;
            st.drawData_f = 1;
            st.drawMark_f = 1;
            st.drawBuf_f = 1;
        });
        plotElem.appendChild(retZoomBtn);
        st.retZoomBtn = retZoomBtn;

        // mousemove 同時處理兩種情境：
        // 1. 正在拖曳縮放視窗時，直接修改 viewStart/viewLen。
        // 2. 一般 hover 時，只更新游標與提示資訊。
        st.canvasMark.addEventListener("mousemove", function (event) {
            var rect = st.canvasMark.getBoundingClientRect();
            var x = event.clientX - rect.left;
            var y = event.clientY - rect.top;

            if (st.xPanDrag_f) {
                var totalLenForPan = Math.max(1, st.totalLen || op.sampleAmt || 1);
                var lenForPan = Math.max(2, Math.min(st.xPanDragStartLen || op.viewLen || totalLenForPan, totalLenForPan));
                var prPan = st.lastPlotRect;
                if (prPan && prPan.width > 0) {
                    var dxPan = x - st.xPanDragStartX;
                    var dSamplesPan = Math.round(dxPan / Math.max(1, prPan.width) * Math.max(1, lenForPan - 1));
                    var newPanStart = (st.xPanDragStartViewStart || 0) - dSamplesPan;
                    if (newPanStart < 0) newPanStart = 0;
                    if (newPanStart + lenForPan > totalLenForPan) newPanStart = totalLenForPan - lenForPan;
                    if (newPanStart < 0) newPanStart = 0;
                    op.viewStart = newPanStart;
                    op.viewLen = lenForPan;
                    st.drawAxe_f = 1;
                    st.drawData_f = 1;
                    st.drawMark_f = 1;
                    st.drawBuf_f = 1;
                }
                return;
            }

            if (st.winDragMode) {
                // 拖曳縮放視窗時，滑鼠位移要換算成 sample index 的變化量。
                // 這裡用 bar.width 當比例基準，確保拖曳行為與目前視窗寬度相容。
                var bar = st.windowBarRect;
                var totalLen = Math.max(1, st.totalLen || op.sampleAmt || 1);
                var start0 = st.winDragStartStart || 0;
                var len0 = st.winDragStartLen || Math.min(op.sampleAmt, totalLen);
                var minLen = 20;
                var dx = x - st.winDragStartX;
                var dSamples = Math.round(dx / Math.max(1, bar.width) * totalLen);

                if (st.winDragMode === "move") {
                    var ns = start0 + dSamples;
                    if (ns < 0) ns = 0;
                    if (ns + len0 > totalLen) ns = totalLen - len0;
                    op.viewStart = ns;
                    op.viewLen = len0;
                } else if (st.winDragMode === "left") {
                    var right = start0 + len0;
                    var ns2 = start0 + dSamples;
                    if (ns2 < 0) ns2 = 0;
                    if (right - ns2 < minLen) ns2 = right - minLen;
                    if (ns2 < 0) ns2 = 0;
                    op.viewStart = ns2;
                    op.viewLen = right - ns2;
                } else if (st.winDragMode === "right") {
                    var nr = start0 + len0 + dSamples;
                    if (nr > totalLen) nr = totalLen;
                    if (nr - start0 < minLen) nr = start0 + minLen;
                    if (nr > totalLen) nr = totalLen;
                    op.viewStart = start0;
                    op.viewLen = nr - start0;
                }

                st.drawAxe_f = 1;
                st.drawData_f = 1;
                st.drawMark_f = 1;
                st.drawBuf_f = 1;
                return;
            }

            if (st.yWinDragMode) {
                var yBar = st.yWindowBarRect;
                var fullY = st.yWindowFullBounds || st.lastAutoYBounds || st.lastYBounds || { min: -1, max: 1 };
                var fullMin = Number(fullY.min);
                var fullMax = Number(fullY.max);
                if (!isFinite(fullMin) || !isFinite(fullMax) || fullMin >= fullMax) {
                    fullMin = -1;
                    fullMax = 1;
                }
                var fullRange = Math.max(1e-9, fullMax - fullMin);
                var minRange = Math.max(fullRange * 0.02, 1e-6);
                var dy = y - st.yWinDragStartY;
                var dVal = -dy / Math.max(1, yBar.height) * fullRange;
                var min0 = st.yWinDragStartMin;
                var max0 = st.yWinDragStartMax;
                var newMin = min0;
                var newMax = max0;

                if (st.yWinDragMode === "move") {
                    newMin = min0 + dVal;
                    newMax = max0 + dVal;
                    if (newMin < fullMin) {
                        newMax += (fullMin - newMin);
                        newMin = fullMin;
                    }
                    if (newMax > fullMax) {
                        newMin -= (newMax - fullMax);
                        newMax = fullMax;
                    }
                } else if (st.yWinDragMode === "top") {
                    newMax = max0 + dVal;
                    if (newMax > fullMax) newMax = fullMax;
                    if (newMax < min0 + minRange) newMax = min0 + minRange;
                } else if (st.yWinDragMode === "bottom") {
                    newMin = min0 + dVal;
                    if (newMin < fullMin) newMin = fullMin;
                    if (newMin > max0 - minRange) newMin = max0 - minRange;
                }

                op.yAxisViewMinValue = newMin;
                op.yAxisViewMaxValue = newMax;
                st.drawAxe_f = 1;
                st.drawData_f = 1;
                st.drawMark_f = 1;
                st.drawBuf_f = 1;
                return;
            }

            // 一般 hover 狀態下，只記錄游標位置與 selection 終點。
            st.hoverX = x;
            st.hoverY = y;
            st.hoverOn_f = 1; // 這個 flag 會觸發 tooltip 顯示。

            if (st.selecting_f) {
                st.selectX1 = st.hoverX;
                st.selectY1 = st.hoverY;
            }
            st.drawMark_f = 1;
            st.drawBuf_f = 1;
        });

        st.canvasMark.addEventListener("mouseleave", function () {
            st.hoverOn_f = 0;
            if (!st.selecting_f) {
                st.drawMark_f = 1;
                st.drawBuf_f = 1;
            }
        });

        // 右鍵用於縮放手勢時，避免瀏覽器預設選單打斷互動流程。
        st.canvasMark.addEventListener("contextmenu", function (event) {
            event.preventDefault();
        });

        // mousedown 分成四條路徑：
        // 1. 左鍵命中 x-window bar -> 進入縮放/平移視窗模式。
        // 2. 左鍵命中右側 y-window bar -> 進入 Y 軸視窗拖曳模式。
        // 3. 左鍵命中圖表區 -> 進入 X 軸平移模式。
        // 4. 右鍵命中圖表區 -> 進行框選縮放。
        st.canvasMark.addEventListener("mousedown", function (event) {
            if (!st.lastPlotRect) return;
            var rect = st.canvasMark.getBoundingClientRect();
            var x = event.clientX - rect.left;
            var y = event.clientY - rect.top;
            var pr = st.lastPlotRect;

            if (event.button === 0) {
                // 左鍵先檢查 x 軸 window bar 命中，命中則進入拖曳視窗模式。
                if (st.windowBarRect && st.windowBarWinRect) {
                    var bar = st.windowBarRect;
                    var win = st.windowBarWinRect;
                    var hitBar = (x >= bar.left && x <= (bar.left + bar.width) && y >= bar.top && y <= (bar.top + bar.height));
                    if (hitBar) {
                        var grip = 8;
                        st.winDragMode = "";
                        if (Math.abs(x - win.left) <= grip) st.winDragMode = "left";
                        else if (Math.abs(x - win.right) <= grip) st.winDragMode = "right";
                        else if (x >= win.left && x <= win.right) st.winDragMode = "move";
                        if (st.winDragMode) {
                            st.winDragStartX = x;
                            st.winDragStartStart = op.viewStart || 0;
                            st.winDragStartLen = op.viewLen || Math.min(op.sampleAmt, st.totalLen || op.sampleAmt || 1);
                            st.drawMark_f = 1;
                            st.drawBuf_f = 1;
                            return;
                        }
                    }
                }

                // 左鍵再檢查 y 軸 window bar 命中，命中則進入垂直視窗拖曳模式。
                if (st.yWindowBarRect && st.yWindowBarWinRect) {
                    var yBar = st.yWindowBarRect;
                    var yWin = st.yWindowBarWinRect;
                    var hitYBar = (x >= yBar.left && x <= (yBar.left + yBar.width) && y >= yBar.top && y <= (yBar.top + yBar.height));
                    if (hitYBar) {
                        var yGrip = 8;
                        st.yWinDragMode = "";
                        if (Math.abs(y - yWin.top) <= yGrip) st.yWinDragMode = "top";
                        else if (Math.abs(y - yWin.bottom) <= yGrip) st.yWinDragMode = "bottom";
                        else if (y >= yWin.top && y <= yWin.bottom) st.yWinDragMode = "move";
                        if (st.yWinDragMode) {
                            var curBounds = (st.renderState && st.renderState.yBounds) ? st.renderState.yBounds : { min: -1, max: 1 };
                            var curMin = Number(op.yAxisViewMinValue);
                            var curMax = Number(op.yAxisViewMaxValue);
                            if (!isFinite(curMin) || !isFinite(curMax) || curMin >= curMax) {
                                curMin = curBounds.min;
                                curMax = curBounds.max;
                            }
                            var fullY = st.yWindowFullBounds || st.lastAutoYBounds || curBounds;
                            var fullMin = Number(fullY.min);
                            var fullMax = Number(fullY.max);
                            if (!isFinite(fullMin) || !isFinite(fullMax) || fullMin >= fullMax) {
                                fullMin = curMin;
                                fullMax = curMax;
                            }
                            if (curMin < fullMin) fullMin = curMin;
                            if (curMax > fullMax) fullMax = curMax;

                            st.yWinDragStartY = y;
                            st.yWinDragStartMin = curMin;
                            st.yWinDragStartMax = curMax;
                            st.yWindowFullBounds = { min: fullMin, max: fullMax };
                            st.drawMark_f = 1;
                            st.drawBuf_f = 1;
                            return;
                        }
                    }
                }

                if (x < pr.left || x > (pr.left + pr.width) || y < pr.top || y > (pr.top + pr.height)) return;
                var totalLenForPan = Math.max(1, st.totalLen || op.sampleAmt || 1);
                var lenForPan = Math.max(2, Math.min(op.viewLen || totalLenForPan, totalLenForPan));
                var startForPan = Math.max(0, Math.min(op.viewStart || 0, Math.max(0, totalLenForPan - lenForPan)));
                st.xPanDrag_f = 1;
                st.xPanDragStartX = x;
                st.xPanDragStartViewStart = startForPan;
                st.xPanDragStartLen = lenForPan;
                st.drawMark_f = 1;
                st.drawBuf_f = 1;
                return;
            }

            if (event.button !== 2) return;
            event.preventDefault();

            // 若沒有點到 window bar，就視為圖內區域選取。
            if (x < pr.left || x > (pr.left + pr.width) || y < pr.top || y > (pr.top + pr.height)) return;
            st.selecting_f = 1;
            st.selectX0 = x;
            st.selectY0 = y;
            st.selectX1 = x;
            st.selectY1 = y;
            st.drawMark_f = 1;
            st.drawBuf_f = 1;
        });

        // mouseup 是把暫存的拖曳/選取手勢收斂成實際視窗狀態的最後一步。
        st.canvasMark.addEventListener("mouseup", function () {
            if (st.xPanDrag_f) {
                st.prevZoom = { viewStart: st.xPanDragStartViewStart || op.viewStart, viewLen: st.xPanDragStartLen || op.viewLen, yMin: op.yAxisViewMinValue, yMax: op.yAxisViewMaxValue };
                st.xPanDrag_f = 0;
                st.drawMark_f = 1;
                st.drawBuf_f = 1;
                return;
            }
            if (st.winDragMode) {
                st.prevZoom = { viewStart: st.winDragStartStart || op.viewStart, viewLen: st.winDragStartLen || op.viewLen, yMin: op.yAxisViewMinValue, yMax: op.yAxisViewMaxValue };
                st.winDragMode = "";
                st.drawMark_f = 1;
                st.drawBuf_f = 1;
                return;
            }
            if (st.yWinDragMode) {
                st.prevZoom = { viewStart: op.viewStart, viewLen: op.viewLen, yMin: st.yWinDragStartMin, yMax: st.yWinDragStartMax };
                st.yWinDragMode = "";
                st.drawMark_f = 1;
                st.drawBuf_f = 1;
                return;
            }
            if (!st.selecting_f) return;
            st.selecting_f = 0;
            if (!st.lastPlotRect) {
                st.drawMark_f = 1;
                st.drawBuf_f = 1;
                return;
            }
            var pr = st.lastPlotRect;
            var x0 = Math.max(pr.left, Math.min(pr.left + pr.width, st.selectX0));
            var x1 = Math.max(pr.left, Math.min(pr.left + pr.width, st.selectX1));
            var y0 = Math.max(pr.top, Math.min(pr.top + pr.height, st.selectY0));
            var y1 = Math.max(pr.top, Math.min(pr.top + pr.height, st.selectY1));
            var dx = Math.abs(x1 - x0);
            var dy = Math.abs(y1 - y0);
            if (dx < 8 && dy < 8) {
                st.drawMark_f = 1;
                st.drawBuf_f = 1;
                return;
            }

            // 框選提交縮放前，先保存目前狀態供 Return Zoom 使用。
            st.prevZoom = { viewStart: op.viewStart, viewLen: op.viewLen, yMin: op.yAxisViewMinValue, yMax: op.yAxisViewMaxValue };

            // 1) X 軸縮放：依框選矩形左右邊界更新 viewStart/viewLen。
            if (dx >= 8) {
                var leftX = Math.min(x0, x1);
                var rightX = Math.max(x0, x1);
                var ratio0 = (leftX - pr.left) / Math.max(1, pr.width);
                var ratio1 = (rightX - pr.left) / Math.max(1, pr.width);
                var totalLen = Math.max(1, st.totalLen || op.sampleAmt || 1);
                var viewLen = Math.max(2, Math.min(op.viewLen || totalLen, totalLen));
                var viewStart = Math.max(0, Math.min(op.viewStart || 0, Math.max(0, totalLen - viewLen)));

                var startInView = Math.floor(ratio0 * (viewLen - 1));
                var endInView = Math.ceil(ratio1 * (viewLen - 1));
                var newStart = viewStart + startInView;
                var newLen = Math.max(20, endInView - startInView + 1);
                if (newLen > totalLen) newLen = totalLen;
                if (newStart + newLen > totalLen) newStart = totalLen - newLen;
                if (newStart < 0) newStart = 0;

                op.viewStart = newStart;
                op.viewLen = newLen;
            }

            // 2) Y 軸縮放：依框選矩形上下邊界更新固定 y 視窗範圍。
            if (dy >= 8) {
                var curY = (st.renderState && st.renderState.yBounds) ? st.renderState.yBounds : { min: -1, max: 1 };
                var yMin = Number(curY.min);
                var yMax = Number(curY.max);
                if (!isFinite(yMin) || !isFinite(yMax) || yMin >= yMax) {
                    yMin = -1;
                    yMax = 1;
                }
                var yRange = yMax - yMin;
                var topY = Math.min(y0, y1);
                var bottomY = Math.max(y0, y1);
                var topRatio = (topY - pr.top) / Math.max(1, pr.height);
                var bottomRatio = (bottomY - pr.top) / Math.max(1, pr.height);
                var newYMax = yMax - topRatio * yRange;
                var newYMin = yMax - bottomRatio * yRange;
                if (isFinite(newYMin) && isFinite(newYMax) && newYMin < newYMax) {
                    op.yAxisViewMinValue = newYMin;
                    op.yAxisViewMaxValue = newYMax;
                }
            }

            st.drawAxe_f = 1;
            st.drawData_f = 1;
            st.drawMark_f = 1;
            st.drawBuf_f = 1;
        });

        st.canvasMark.addEventListener("dblclick", function () {
            var totalLen = Math.max(1, st.totalLen || op.sampleAmt || 1);
            st.prevZoom = { viewStart: op.viewStart, viewLen: op.viewLen, yMin: op.yAxisViewMinValue, yMax: op.yAxisViewMaxValue };
            op.viewStart = 0;
            op.viewLen = Math.min(op.sampleAmt, totalLen);
            st.drawAxe_f = 1;
            st.drawData_f = 1;
            st.drawMark_f = 1;
            st.drawBuf_f = 1;
        });

        // 滾輪縮放以游標所在位置為錨點：
        // 這樣放大/縮小時，使用者注視的波形位置不會從畫面中間「飄走」。
        st.canvasMark.addEventListener("wheel", function (event) {
            if (!st.lastPlotRect) return;
            event.preventDefault();
            var rect = st.canvasMark.getBoundingClientRect();
            var x = event.clientX - rect.left;
            var y = event.clientY - rect.top;
            var pr = st.lastPlotRect;
            if (x < pr.left || x > (pr.left + pr.width) || y < pr.top || y > (pr.top + pr.height)) {
                return;
            }

            var totalLen = Math.max(1, st.totalLen || op.sampleAmt || 1);
            var curLen = Math.max(2, Math.min(op.viewLen || totalLen, totalLen));
            var curStart = Math.max(0, Math.min(op.viewStart || 0, Math.max(0, totalLen - curLen)));
            var zoomIn = event.deltaY < 0;
            var newLen = zoomIn ? Math.floor(curLen * 0.85) : Math.ceil(curLen * 1.15);
            if (newLen < 20) newLen = 20;
            if (newLen > totalLen) newLen = totalLen;
            if (newLen === curLen) return;

            st.prevZoom = { viewStart: op.viewStart, viewLen: op.viewLen, yMin: op.yAxisViewMinValue, yMax: op.yAxisViewMaxValue };

            var anchorRatio = (x - pr.left) / Math.max(1, pr.width);
            var anchorIndex = curStart + anchorRatio * (curLen - 1);
            var newStart = Math.round(anchorIndex - anchorRatio * (newLen - 1));
            if (newStart < 0) newStart = 0;
            if (newStart + newLen > totalLen) newStart = totalLen - newLen;

            op.viewStart = newStart;
            op.viewLen = newLen;
            st.drawAxe_f = 1;
            st.drawData_f = 1;
            st.drawMark_f = 1;
            st.drawBuf_f = 1;
        }, { passive: false });

        window.addEventListener("mouseup", function () {
            if (st.xPanDrag_f) {
                st.xPanDrag_f = 0;
                st.drawMark_f = 1;
            }
            if (st.winDragMode) {
                st.winDragMode = "";
                st.drawMark_f = 1;
            }
            if (st.yWinDragMode) {
                st.yWinDragMode = "";
                st.drawMark_f = 1;
            }
            if (!st.selecting_f) return;
            st.selecting_f = 0;
            st.drawMark_f = 1;
            st.drawBuf_f = 1;
        });

        // 視窗尺寸改變時，只重設 canvas 尺寸與重繪旗標。
        // 真正的繪圖工作仍然交給 _draw() 統一處理。
        window.addEventListener("resize", function () {
            var pObj = md.blockRefs["container"];
            if (!pObj || !pObj.stas) return;
            st.containerWidth = pObj.stas.containerWidth;
            st.containerHeight = pObj.stas.containerHeight;
            if (st.canvasAxe) {
                st.canvasAxe.width = st.containerWidth;
                st.canvasAxe.height = st.containerHeight;
            }
            if (st.canvasData) {
                st.canvasData.width = st.containerWidth;
                st.canvasData.height = st.containerHeight;
            }
            if (st.canvasMark) {
                st.canvasMark.width = st.containerWidth;
                st.canvasMark.height = st.containerHeight;
            }
            st.drawAxe_f = 1;
            st.drawData_f = 1;
            st.drawMark_f = 1;
            st.drawBuf_f = 1;
        });

        self._draw();

        var iobj = {};
        iobj.act = "afterCreate";
        iobj.sender = md;
        KvLib.exe(op.actionFunc, iobj);
    }

    // 從 ring buffer 取出最近 sampleAmt 筆資料，回傳的是「連續的陣列視圖」。
    // 這個 helper 適合做單通道的尾端取樣或計算，不需要補齊全域時間軸。
    _getRecentValues(lineObj, sampleAmt) {
        var recLen = Math.min(lineObj.recordLen, sampleAmt);
        if (recLen <= 0) return [];
        var out = new Array(recLen);
        var bufSize = lineObj.buffer.length;
        var startInx = lineObj.endInx - recLen;
        if (startInx < 0) startInx += bufSize;
        for (var j = 0; j < recLen; j++) {
            var inx = (startInx + j) % bufSize;
            out[j] = lineObj.buffer[inx];
        }
        return out;
    }

    // 將單一通道對齊到全域時間軸，回傳長度固定的可視區間。
    // 若某些前段資料還不存在，就以 null 補齊，讓不同通道在同一 x 軸索引上對齊。
    _getVisibleValues(lineObj, totalLen, viewStart, viewLen) {
        // 全域時間軸 totalLen 對齊：不足的前段補 null，確保所有通道同一 x 軸索引。
        var out = new Array(viewLen);
        if (viewLen <= 0) return out;

        var recLen = Math.min(lineObj.recordLen, lineObj.buffer.length);
        if (recLen <= 0) {
            for (var z = 0; z < viewLen; z++) out[z] = null;
            return out;
        }

        var bufSize = lineObj.buffer.length;
        var recStartInx = lineObj.endInx - recLen;
        if (recStartInx < 0) recStartInx += bufSize;

        var leadGap = totalLen - recLen;
        for (var i = 0; i < viewLen; i++) {
            var gi = viewStart + i;
            if (gi < leadGap || gi >= totalLen) {
                out[i] = null;
                continue;
            }
            var li = gi - leadGap;
            var bi = (recStartInx + li) % bufSize;
            out[i] = lineObj.buffer[bi];

        }
        return out;
    }

    // Y 軸範圍計算分兩層：
    // 1. 若外部已指定固定 min/max，就直接使用，讓圖表維持穩定尺度。
    // 2. 否則從目前可視資料動態推導邊界，並附加一點 padding 避免波形貼邊。
    _calcYBounds(activeSeries, op, autoYBounds) {
        if (!autoYBounds) autoYBounds = this._calcAutoYBounds(activeSeries);
        if (op.yAxisViewMinValue !== null && op.yAxisViewMinValue !== undefined &&
            op.yAxisViewMaxValue !== null && op.yAxisViewMaxValue !== undefined) {
            var minFix = Number(op.yAxisViewMinValue);//
            var maxFix = Number(op.yAxisViewMaxValue);
            if (isFinite(minFix) && isFinite(maxFix) && minFix < maxFix) {
                return { min: minFix, max: maxFix };
            }
        }

        return autoYBounds;
    }

    // 不考慮固定 y 視窗，純由可視資料計算 auto 範圍。
    _calcAutoYBounds(activeSeries) {
        var minV = Infinity;
        var maxV = -Infinity;
        for (var i = 0; i < activeSeries.length; i++) {
            var arr = activeSeries[i].values;
            for (var j = 0; j < arr.length; j++) {
                var v = arr[j];
                if (v < minV) minV = v;
                if (v > maxV) maxV = v;
            }
        }
        if (!isFinite(minV) || !isFinite(maxV)) {
            return { min: -1, max: 1 };
        }
        if (minV === maxV) {
            var pad0 = Math.abs(minV) * 0.2 + 1;
            return { min: minV - pad0, max: maxV + pad0 };
        }
        var pad = (maxV - minV) * 0.12;
        return { min: minV - pad, max: maxV + pad };
    }

    // 依刻度間距自動決定顯示精度，避免大範圍時小數過多、小範圍時又不夠細。
    _formatAxisValue(value, step) {
        var absStep = Math.abs(step);
        var decimals = 0;
        if (absStep > 0 && isFinite(absStep)) {
            decimals = Math.max(0, Math.ceil(-Math.log10(absStep)) + 1);
            if (decimals > 6) decimals = 6;
        }
        return Number(value).toFixed(decimals);
    }

    // 座標軸層只負責背景格線、外框、刻度與 Y 軸數值範圍。
    // 它和資料層分開，是因為軸標籤通常比波形本身更不容易變動。
    _drawAxes(ctx, w, h, op, plotRect, yBounds, viewStart, viewLen) {
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = op.chartBackgroundColor || "#f8fafc";
        ctx.fillRect(0, 0, w, h);
        var fontColor = op.canvasFontColor || "#334155";

        var left = plotRect.left;
        var top = plotRect.top;
        var pw = plotRect.width;
        var ph = plotRect.height;

        ctx.strokeStyle = op.gridColor || "rgba(148,163,184,0.20)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (var i = 0; i <= 10; i++) {
            var x = left + pw * i / 10;
            ctx.moveTo(x, top);
            ctx.lineTo(x, top + ph);
        }
        var yTickAmt = 6;
        for (var j = 0; j <= yTickAmt; j++) {
            var y = top + ph * j / yTickAmt;
            ctx.moveTo(left, y);
            ctx.lineTo(left + pw, y);
        }
        ctx.stroke();

        ctx.strokeStyle = op.axisColor || "#64748b";
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.rect(left, top, pw, ph);
        ctx.stroke();

        ctx.fillStyle = fontColor;
        ctx.font = "12px sans-serif";

        // X 軸座標值：依目前視窗(viewStart/viewLen)繪製刻度。
        // 這裡顯示的是視窗內索引，而不是原始 buffer 位置；對使用者來說更直觀。
        var tickAmt = 5;
        ctx.fillStyle = fontColor;
        ctx.font = "13px monospace";
        var xStep = (viewLen - 1) / tickAmt;
        for (var t = 0; t <= tickAmt; t++) {
            var tr = t / tickAmt;
            var tx = left + pw * tr;
            var xv = viewStart + (viewLen - 1) * tr;
            var s = this._formatAxisValue(xv, xStep);
            var tw = ctx.measureText(s).width;
            var dx = tx - tw / 2;
            if (dx < left) dx = left;
            if (dx + tw > left + pw) dx = left + pw - tw;
            ctx.fillText(s, dx, top + ph + 16);
        }

        // Y 軸刻度值：與水平格線對齊，顯示 7 個 bounds 值（含 max / min）。
        ctx.fillStyle = fontColor;
        ctx.font = "13px monospace";
        var yRange = yBounds.max - yBounds.min || 1;
        var yStep = yRange / yTickAmt;
        for (var yInx = 0; yInx <= yTickAmt; yInx++) {
            var yRatio = yInx / yTickAmt;
            var yValue = yBounds.max - yRange * yRatio;
            var yText = this._formatAxisValue(yValue, yStep);
            var yTw = ctx.measureText(yText).width;
            var yPos = top + ph * yRatio;
            ctx.fillText(yText, left - yTw - 4, yPos + 4);
        }
    }

    // 資料層負責真正的折線渲染。
    // 每條線都先依照可視區間轉成已對齊陣列，再用同一個 yBounds 映射到畫布座標。
    _drawSeries(ctx, activeSeries, plotRect, yBounds) {
        var left = plotRect.left;
        var top = plotRect.top;
        var pw = plotRect.width;
        var ph = plotRect.height;
        var yr = yBounds.max - yBounds.min || 1;// 避免除以零

        // 只在繪圖框內渲染資料線，避免超出上/下邊界時畫到框外。
        ctx.save();
        ctx.beginPath();
        ctx.rect(left, top, pw, ph);
        ctx.clip();

        for (var i = 0; i < activeSeries.length; i++) {
            var s = activeSeries[i];
            var arr = s.values;
            if (!arr.length) continue;
            ctx.strokeStyle = s.color;
            ctx.lineWidth = s.lineWidth;
            ctx.beginPath();
            var hasPath = 0;
            for (var j = 0; j < arr.length; j++) {
                // null / undefined / 非數值代表該點沒有資料，畫線時要斷開路徑。
                if (arr[j] === null || arr[j] === undefined || !isFinite(arr[j])) {
                    hasPath = 0;
                    continue;
                }
                var x = left + (arr.length <= 1 ? 0 : (pw * j / (arr.length - 1)));
                var y = top + ph - ((arr[j] - yBounds.min) / yr) * ph;
                if (!hasPath) {
                    ctx.moveTo(x, y);
                    hasPath = 1;
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.stroke();
        }

        ctx.restore();
    }

    // 圖例層把目前可見通道的名稱與顏色整理到畫面上方。
    // 這裡是「目前顯示哪些線」的視覺摘要，而不是資料本身。
    _drawLegend(ctx, activeSeries, plotRect, centerY) {
        var fontColor = (this.md && this.md.opts && this.md.opts.canvasFontColor) || "#0f172a";
        ctx.font = "24px sans-serif";
        var totalW = 0;
        for (var i = 0; i < activeSeries.length; i++) {
            var s0 = activeSeries[i];
            totalW += 24 + 10 + ctx.measureText(s0.name).width;
            if (i < activeSeries.length - 1) totalW += 36;
        }

        var x = plotRect.left + Math.max(0, (plotRect.width - totalW) / 2);
        var y = centerY;
        ctx.textBaseline = "middle";
        for (var i = 0; i < activeSeries.length; i++) {
            var s = activeSeries[i];
            ctx.fillStyle = s.color;
            ctx.fillRect(x, y - 12, 24, 24);
            ctx.fillStyle = fontColor;
            ctx.fillText(s.name, x + 34, y + 2);
            x += 24 + 10 + ctx.measureText(s.name).width + 36;
        }
        ctx.textBaseline = "alphabetic";
    }

    // 下方 window bar 是整體資料區間的縮略控制條。
    // 它讓使用者能看見目前檢視的是整段資料中的哪一小段，並提供拖曳/縮放手柄。
    _drawWindowBar(ctx, st, plotRect, totalLen, viewStart, viewLen) {
        var left = plotRect.left;
        var width = plotRect.width;
        var top = plotRect.top + plotRect.height + 34;
        var height = 8;

        var barLeft = left;
        var barTop = top;
        var barW = width;
        var barH = height;

        // 以全域 totalLen 為底，將視窗轉成條上的相對比例。
        var startRatio = viewStart / Math.max(1, totalLen);
        var endRatio = (viewStart + viewLen) / Math.max(1, totalLen);
        var winLeft = barLeft + barW * startRatio;
        var winRight = barLeft + barW * endRatio;
        if (winRight - winLeft < 12) winRight = winLeft + 12;
        if (winRight > barLeft + barW) {
            winRight = barLeft + barW;
            winLeft = Math.max(barLeft, winRight - 12);
        }

        st.windowBarRect = { left: barLeft, top: barTop, width: barW, height: barH };
        st.windowBarWinRect = { left: winLeft, right: winRight, top: barTop, bottom: barTop + barH };

        ctx.save();
        ctx.fillStyle = "rgba(100,116,139,0.25)";
        ctx.strokeStyle = "rgba(100,116,139,0.45)";
        ctx.lineWidth = 1;
        ctx.fillRect(barLeft, barTop, barW, barH);
        ctx.strokeRect(barLeft, barTop, barW, barH);

        ctx.fillStyle = "rgba(14,165,233,0.24)";
        ctx.strokeStyle = "rgba(14,165,233,0.95)";
        ctx.fillRect(winLeft, barTop, Math.max(0, winRight - winLeft), barH);
        ctx.strokeRect(winLeft, barTop, Math.max(0, winRight - winLeft), barH);

        var gripW = 3;
        ctx.fillStyle = "rgba(2,132,199,1)";
        ctx.fillRect(winLeft - gripW / 2, barTop - 2, gripW, barH + 4);
        ctx.fillRect(winRight - gripW / 2, barTop - 2, gripW, barH + 4);
        ctx.restore();
    }

    // 右側 y-window bar：顯示目前 y 可視範圍相對於自動值域的位置，並提供拖曳調整。
    _drawYWindowBar(ctx, st, plotRect, yBounds, autoYBounds) {
        var barLeft = plotRect.left + plotRect.width + 14;
        var barTop = plotRect.top;
        var barW = 8;
        var barH = plotRect.height;

        var fullMin = Number(autoYBounds.min);
        var fullMax = Number(autoYBounds.max);
        if (!isFinite(fullMin) || !isFinite(fullMax) || fullMin >= fullMax) {
            fullMin = Number(yBounds.min);
            fullMax = Number(yBounds.max);
        }

        // full 範圍必須至少涵蓋目前視窗，避免固定 y 視窗超出時 bar 比例失真。
        var curMin = Number(yBounds.min);
        var curMax = Number(yBounds.max);
        if (curMin < fullMin) fullMin = curMin;
        if (curMax > fullMax) fullMax = curMax;
        var fullRange = Math.max(1e-9, fullMax - fullMin);

        var topRatio = (fullMax - curMax) / fullRange;
        var bottomRatio = (fullMax - curMin) / fullRange;
        topRatio = Math.max(0, Math.min(1, topRatio));
        bottomRatio = Math.max(0, Math.min(1, bottomRatio));

        var winTop = barTop + barH * topRatio;
        var winBottom = barTop + barH * bottomRatio;
        if (winBottom - winTop < 14) {
            winBottom = winTop + 14;
            if (winBottom > barTop + barH) {
                winBottom = barTop + barH;
                winTop = Math.max(barTop, winBottom - 14);
            }
        }

        st.yWindowBarRect = { left: barLeft, top: barTop, width: barW, height: barH };
        st.yWindowBarWinRect = { left: barLeft, right: barLeft + barW, top: winTop, bottom: winBottom };
        st.yWindowFullBounds = { min: fullMin, max: fullMax };

        ctx.save();
        ctx.fillStyle = "rgba(100,116,139,0.25)";
        ctx.strokeStyle = "rgba(100,116,139,0.45)";
        ctx.lineWidth = 1;
        ctx.fillRect(barLeft, barTop, barW, barH);
        ctx.strokeRect(barLeft, barTop, barW, barH);

        ctx.fillStyle = "rgba(14,165,233,0.24)";
        ctx.strokeStyle = "rgba(14,165,233,0.95)";
        ctx.fillRect(barLeft, winTop, barW, Math.max(0, winBottom - winTop));
        ctx.strokeRect(barLeft, winTop, barW, Math.max(0, winBottom - winTop));

        var gripH = 3;
        ctx.fillStyle = "rgba(2,132,199,1)";
        ctx.fillRect(barLeft - 2, winTop - gripH / 2, barW + 4, gripH);
        ctx.fillRect(barLeft - 2, winBottom - gripH / 2, barW + 4, gripH);
        ctx.restore();
    }

    // Hover 層處理十字線、點位 marker 與 tooltip。
    // 這一層是最常變動的，所以單獨繪製，避免影響底下的資料與座標層。
    _drawHover(ctx, st, plotRect, yBounds, activeSeries) {
        var self = this;
        var md = this.md;
        var op = md.opts;


        var fontColor = (this.md && this.md.opts && this.md.opts.canvasFontColor) || "#0f172a";
        if (!st.hoverOn_f || !activeSeries.length) return;

        var left = plotRect.left;
        var top = plotRect.top;
        var right = plotRect.left + plotRect.width;
        var bottom = plotRect.top + plotRect.height;
        var x = Math.max(left, Math.min(right, st.hoverX));
        var y = Math.max(top, Math.min(bottom, st.hoverY));

        // 十字線先畫，讓使用者一眼就能定位目前指向的資料索引與 y 值。
        ctx.save();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, top);
        ctx.lineTo(x, bottom);
        ctx.moveTo(left, y);
        ctx.lineTo(right, y);
        ctx.stroke();

        var maxLen = 0;
        for (var i = 0; i < activeSeries.length; i++) {
            if (activeSeries[i].values.length > maxLen) maxLen = activeSeries[i].values.length;
        }
        if (maxLen <= 0) {
            ctx.restore();
            return;
        }

        var ratio = (x - left) / Math.max(1, (right - left));
        var idx = Math.round(ratio * Math.max(0, maxLen - 1));
        idx = Math.max(0, Math.min(maxLen - 1, idx));
        var yr = yBounds.max - yBounds.min || 1;

        // 在每條線對應點畫 marker。
        // 因為不同線可能有不同值域，這裡要用同一個 x index 去讀各自的樣本值。
        for (var j = 0; j < activeSeries.length; j++) {
            var s = activeSeries[j];
            if (idx >= s.values.length) continue;
            var vv = s.values[idx];
            if (vv === null || vv === undefined || !isFinite(vv)) continue;
            var py = top + plotRect.height - ((vv - yBounds.min) / yr) * plotRect.height;
            py = Math.max(top, Math.min(bottom, py));
            ctx.fillStyle = "#ffffff";
            ctx.strokeStyle = s.color;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(x, py, 3.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
        }

        // tooltip 文字：先列 index，再列每條可見線在該 index 的即時值。

        var lines = ["Index: " + idx];
        for (var k = 0; k < activeSeries.length; k++) {
            var ss = activeSeries[k];
            if (idx >= ss.values.length) continue;
            if (ss.values[idx] === null || ss.values[idx] === undefined || !isFinite(ss.values[idx])) continue;
            lines.push(ss.name + ": " + ss.values[idx].toFixed(op.lines[k].labelFixed));
        }
        if(op.tooltipFunc && typeof op.tooltipFunc === "function") {
            lines = op.tooltipFunc(lines); // 调用自定义的 tooltip 函数
        }

        

        ctx.font = "24px monospace";
        var bw = 0;
        for (var t = 0; t < lines.length; t++) {
            bw = Math.max(bw, ctx.measureText(lines[t]).width);
        }
        var lineH = 28;
        var pad = 12;
        var boxW = bw + pad * 2;
        var boxH = lines.length * lineH + pad * 2 - 4;
        var bx = x + 12;
        var by = y - 8;
        if (bx + boxW > right) bx = x - boxW - 12;
        if (by + boxH > bottom) by = bottom - boxH;
        if (by < top) by = top;

        ctx.fillStyle = "rgba(255,255,255,0.96)";
        ctx.strokeStyle = "rgba(100,116,139,0.8)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.rect(bx, by, boxW, boxH);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#222222";
        for (var m = 0; m < lines.length; m++) {
            ctx.fillText(lines[m], bx + pad, by + pad + 20 + m * lineH);
        }
        ctx.restore();
    }

    // _draw 是唯一的總繪圖入口：
    // 它會先整理可視資料與渲染快取，再根據 dirty flag 決定哪些 layer 需要重畫。
    _draw() {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        var ctxAxe = st.ctxAxe;
        var ctxData = st.ctxData;
        var ctxMark = st.ctxMark;
        if (!ctxAxe || !ctxData || !ctxMark) return;

        var w = st.containerWidth || (st.canvasAxe ? st.canvasAxe.width : 0);
        var h = st.containerHeight || (st.canvasAxe ? st.canvasAxe.height : 0);
        if (!w || !h) return;

        // 向後相容：若只打開 drawBuf_f，預設視為全層重繪。
        // 這避免舊程式只設 drawBuf_f 時，因為缺少其他旗標而出現畫面不更新。
        if (!st.drawAxe_f && !st.drawData_f && !st.drawMark_f) {
            st.drawAxe_f = 1;
            st.drawData_f = 1;
            st.drawMark_f = 1;
        }

        var needDataRecalc = st.drawAxe_f || st.drawData_f || !st.renderState;
        var activeSeries, totalLen, viewLen, viewStart, yBounds, autoYBounds, plotRect;
        if (needDataRecalc) {
            // 先找出目前所有開啟通道中，最短的有效資料長度。
            // 視窗必須以這個 totalLen 為界，避免某些通道資料比其他通道短時發生索引越界。
            activeSeries = [];
            totalLen = 0;
            for (var k = 0; k < op.lines.length; k++) {
                if (!op.lines[k].offOn_f) continue;
                var rl = Math.min(op.lines[k].recordLen, op.lines[k].buffer.length);
                if (rl > totalLen) totalLen = rl;
            }
            if (totalLen <= 0) totalLen = Math.min(op.sampleAmt, 1); // 至少要有 1 個索引，避免除以零。 

            // viewLen 會被夾回合理範圍，保證目前視窗永遠落在 totalLen 之內。
            viewLen = op.viewLen || Math.min(op.sampleAmt, totalLen);
            if (viewLen < 2) viewLen = Math.min(totalLen, 2);
            if (viewLen > totalLen) viewLen = totalLen;
            viewStart = op.viewStart || 0;
            if (viewStart < 0) viewStart = 0;
            if (viewStart + viewLen > totalLen) viewStart = totalLen - viewLen;
            if (viewStart < 0) viewStart = 0;
            op.viewStart = viewStart;
            op.viewLen = viewLen;
            st.totalLen = totalLen;
            // 把每條開啟中的 line 轉成可直接渲染的 series 物件，
            // 讓後續繪圖層不需要再關心 ring buffer 的結構。
            for (var i = 0; i < op.lines.length; i++) {
                var line = op.lines[i];
                if (!line.offOn_f) continue;
                activeSeries.push({
                    name: line.name,
                    color: line.color,
                    lineWidth: line.lineWidth || 1.5,
                    values: this._getVisibleValues(line, totalLen, viewStart, viewLen)
                });
            }

            autoYBounds = this._calcAutoYBounds(activeSeries);
            yBounds = this._calcYBounds(activeSeries, op, autoYBounds);
            st.lastAutoYBounds = autoYBounds;
            st.lastYBounds = yBounds;
            // plotRect 定義實際畫圖區域，會刻意留出左側與下方空間，給刻度與 window bar 使用。
            plotRect = {
                left: 58,
                top: 64,
                width: Math.max(10, w - 82),
                height: Math.max(10, h - 124)
            };
            st.lastPlotRect = plotRect;
            st.renderState = {
                activeSeries: activeSeries,
                totalLen: totalLen,
                viewLen: viewLen,
                viewStart: viewStart,
                yBounds: yBounds,
                autoYBounds: autoYBounds,
                plotRect: plotRect,
                w: w,
                h: h
            };
        } else {
            activeSeries = st.renderState.activeSeries;
            totalLen = st.renderState.totalLen;
            viewLen = st.renderState.viewLen;
            viewStart = st.renderState.viewStart;
            yBounds = st.renderState.yBounds;
            autoYBounds = st.renderState.autoYBounds || yBounds;
            plotRect = st.renderState.plotRect;
        }

        // layer 0: 座標軸。
        // 這層通常只有在視窗、縮放或尺寸變動時才需要重畫。
        if (st.drawAxe_f) {
            this._drawAxes(ctxAxe, w, h, op, plotRect, yBounds, viewStart, viewLen);
        }

        // layer 1: 資料。
        // 線條重畫成本最高，所以只在資料變更或縮放變更時更新。
        if (st.drawData_f) {
            ctxData.clearRect(0, 0, w, h);
            this._drawSeries(ctxData, activeSeries, plotRect, yBounds);
        }

        // layer 2: marker + 其他互動元素。
        // 因為這層包含 hover / selection / window bar，所以它的刷新頻率最高。
        if (st.drawMark_f || st.drawData_f || st.drawAxe_f) {
            ctxMark.clearRect(0, 0, w, h);
            var fontColor = op.canvasFontColor || "#334155";
            var topInfoY = 28;
            this._drawLegend(ctxMark, activeSeries, plotRect, topInfoY);
            if(op.drawHover_f)
                this._drawHover(ctxMark, st, plotRect, yBounds, activeSeries);
            this._drawWindowBar(ctxMark, st, plotRect, totalLen, viewStart, viewLen);
            this._drawYWindowBar(ctxMark, st, plotRect, yBounds, autoYBounds);

            if (st.selecting_f) { // 滑鼠拖曳選取區域時，畫出半透明矩形。
                var x0 = st.selectX0;
                var x1 = st.selectX1;
                var y0 = Math.max(plotRect.top, Math.min(plotRect.top + plotRect.height, st.selectY0));
                var y1 = Math.max(plotRect.top, Math.min(plotRect.top + plotRect.height, st.selectY1));
                var lx = Math.min(x0, x1);
                var lw = Math.abs(x1 - x0);
                var ty = Math.min(y0, y1);
                var lh = Math.abs(y1 - y0);
                ctxMark.save();
                ctxMark.fillStyle = "rgba(14,165,233,0.12)";
                ctxMark.strokeStyle = "rgba(14,165,233,0.85)";
                ctxMark.lineWidth = 1;
                ctxMark.fillRect(lx, ty, lw, lh);
                ctxMark.strokeRect(lx, ty, lw, lh);
                ctxMark.restore();
            }

            // 顯示目前縮放視窗資訊。
            // 這讓使用者可以直接知道目前看到的是哪一段資料索引範圍。
            ctxMark.save();
            ctxMark.fillStyle = fontColor;
            ctxMark.font = "22px monospace";
            ctxMark.textBaseline = "middle";
            ctxMark.fillText("view: " + viewStart + " - " + (viewStart + viewLen - 1) + " / " + (totalLen - 1), plotRect.left, topInfoY);
            ctxMark.restore();
        }

        st.drawAxe_f = 0;
        st.drawData_f = 0;
        st.drawMark_f = 0;
    }


    // 將一段新樣本追加到指定通道的 ring buffer。
    // 這是實際資料寫入的主入口，也是造成重繪的來源。
    addBuf(lineInx, values, opts) {
        var op = this.md.opts;
        var st = this.md.stas;
        var lineObj = op.lines[lineInx];
        if (opts) {
            if (opts.name)
                lineObj.name = opts.name;
            if (opts.realValue)
                lineObj.realValue = opts.realValue;
        }
        lineObj.endInx = 0;
        lineObj.recordLen = 0;
        lineObj.serialCnt = 0;
        var bufSize = lineObj.buffer.length;
        for (var j = 0; j < values.length; j++) {
            lineObj.buffer[lineObj.endInx] = values[j];
            lineObj.endInx++;
            if (lineObj.endInx >= bufSize) lineObj.endInx = 0;
            lineObj.recordLen++;
            lineObj.serialCnt++;
        }
        if (lineObj.recordLen >= bufSize) lineObj.recordLen = bufSize;
        // 寫入資料後直接標記三層都需要更新，因為 X/Y 軸、波形與互動資訊都可能受影響。
        st.drawAxe_f = 1;
        st.drawData_f = 1;
        st.drawMark_f = 1;
        st.drawBuf_f = 1;
    }

    // 由外部排程器呼叫的 watch/check 入口，實際上只是把控制權交給 frameTimer。
    chkWatch() {
        this.frameTimer();
    }

    // frameTimer 負責「有 dirty flag 才重畫」的節流邏輯。
    // 這代表多次 addBuf 可以合併成一次重畫，避免每筆資料都同步 repaint。
    frameTimer() {
        var st = this.md.stas;
        if (st.drawBuf_f) {
            this._draw();
            st.drawBuf_f = 0;
        }
    }

    // 預留給宿主系統的事件回呼，目前只做 console 輸出。
    actionFunc(iobj) {
        console.log(iobj);
    }

    // build 只組版面，不做任何資料計算。
    // 它建立的是：標題列 + 中央 Canvas 容器 + 底部狀態列，
    // 讓 afterCreate 與 _draw 能在一個乾淨的容器上工作。
    build() {
        var self = this;
        var md = self.md;
        var op = md.opts;
        var lyMaps = md.lyMaps;
        var blocks = op.blocks;
        var layouts = op.layouts;

        var cname = "c";
        var opts = {};
        md.setPns(opts);
        layouts[cname] = { name: cname, type: "Layout~Ly_base~array.sys0", opts: opts };
        lyMaps["body"] = cname;

        var opts = {};
        md.setPns(opts);
        blocks[cname] = { name: "basePanel", type: "Component~Cp_base~plate.sys0", opts: opts };

        var cname = lyMaps["body"] + "~" + 0;
        var opts = {};
        opts.yArr = [50, 9999, 20];
        layouts[cname] = { name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts };
        lyMaps["mainBody"] = cname;

        var cname = lyMaps["mainBody"] + "~" + 0;
        // 標題列上的退出/esc 行為會回呼到宿主 actionFunc。
        var actionPrg = function (iobj) {
            iobj.sender = md;
            iobj.act = "esc";
            KvLib.exe(op.actionFunc, iobj);
        };
        mac.setHeadTitleBar(md, cname, op.title, actionPrg);

        var cname = lyMaps["mainBody"] + "~" + 1;
        var opts = {};
        opts.baseColor = op.chartBackgroundColor || "#f8fafc";
        blocks[cname] = { name: "container", type: "Component~Cp_base~container.sys0", opts: opts };

        var cname = lyMaps["mainBody"] + "~" + 2;
        mac.setFootBar(md, cname);
    }
}

/**
 * Real-time oscilloscope based on LineChart.
 * Input: addBuf(channelIndex, values) or addSamples([ch1, ch2, ...]).
 * 
 * scope.model.setSampleRate(1000000);
 * 
 * 
 * scope.model.addBuf(0, values);
 * 
 * 
 * scope.model.addSamples([
    channel1Values,
    channel2Values
]);

scope.model.setTimeDiv(0.001);
scope.model.setVoltsDiv(1);

scope.model.setTrigger({
    mode: "single",
    source: 0,
    level: 0,
    slope: "rising",
    position: 0.3
});

scope.model.armTrigger();
 */
class LineScope extends LineChart {
    constructor() {
        super();
        this._lastTriggerValue = null;
        this._triggerPendingSamples = 0;
    }

    static get timeDivTable() {
        return [1e-9, 2e-9, 5e-9, 10e-9, 20e-9, 50e-9, 100e-9, 200e-9, 500e-9,
            1e-6, 2e-6, 5e-6, 10e-6, 20e-6, 50e-6, 100e-6, 200e-6, 500e-6,
            1e-3, 2e-3, 5e-3, 10e-3, 20e-3, 50e-3, 100e-3, 200e-3, 500e-3, 1];
    }

    static get voltsDivTable() {
        return [1e-3, 2e-3, 5e-3, 10e-3, 20e-3, 50e-3, 100e-3, 200e-3, 500e-3, 1, 2, 5, 10, 20, 50];
    }

    initOpts(md) {
        var opts = super.initOpts(md);
        opts.title = "Line Scope";
        opts.chartBackgroundColor = "#07110b";
        opts.canvasFontColor = "#b7f7c9";
        opts.gridColor = "rgba(57,255,20,0.16)";
        opts.axisColor = "rgba(126,255,151,0.55)";
        opts.xDivisions = 10;
        opts.yDivisions = 8;
        opts.sampleRate = 1000000;
        opts.timePerDiv = 1e-3;
        opts.voltsPerDiv = 1;
        opts.yCenter = 0;
        opts.sampleAmt = this._samplesPerScreen(opts);
        opts.sampleBufSize = Math.max(20000, opts.sampleAmt * 4);
        opts.viewLen = opts.sampleAmt;
        opts.run_f = 1;
        opts.followTail_f = 1;
        opts.triggerMode = "auto";
        opts.triggerSource = 0;
        opts.triggerLevel = 0;
        opts.triggerSlope = "rising";
        opts.triggerPosition = 0.30;
        opts.triggerArmed_f = 1;
        opts.triggered_f = 0;
        opts.showScopeControls_f = 1;

        // Built-in live signal generator. Set demo_f to 1 in the Block options,
        // or call setDemo(true), to start it.
        opts.demo_f = 1;
        opts.demoChunkSize = 256;
        opts.demoFrequencies = [1000, 500, 250, 125];
        opts.demoAmplitudes = [2, 1.5, 1, 0.7];
        this._demoSampleIndex = 0;
        this.initLines(opts);
        return opts;
    }

    initLines(opts) {
        opts.lines = [];
        var colors = ["#fff200", "#00e5ff", "#ff4fd8", "#72ff72"];
        var size = Math.max(1, opts.sampleBufSize || 20000);
        for (var i = 0; i < 4; i++) {
            opts.lines.push({
                name: "CH" + (i + 1), color: colors[i], offOn_f: i === 0 ? 1 : 0,
                lineWidth: 1.5, stInx: 0, endInx: 0, recordLen: 0,
                buffer: new Array(size).fill(0), serialCnt: 0, labelFixed: 3,
                offset: 0, gain: 1, coupling: "DC"
            });
        }
    }

    afterCreate() {
        super.afterCreate();
        if (this.md.opts.showScopeControls_f) this._createScopeControls();
        this._updateScopeControls();
    }

    _createScopeControls() {
        var self = this, md = this.md, op = md.opts, st = md.stas;
        var plotObj = md.blockRefs["container"];
        var host = plotObj && plotObj.elems ? plotObj.elems["base"] : null;
        if (!host || st.scopeControls) return;
        var panel = document.createElement("div");
        panel.id = md.kid + "_lineScopeControls";
        panel.style.cssText = "position:absolute;left:66px;top:38px;z-index:5;display:flex;gap:6px;align-items:center;font:12px monospace;color:#b7f7c9;background:rgba(3,15,7,.82);padding:5px 7px;border:1px solid rgba(126,255,151,.35);border-radius:4px";
        function button(text, title, click) {
            var b = document.createElement("button");
            b.textContent = text; b.title = title;
            b.style.cssText = "border:1px solid #397b49;background:#0b2412;color:#c8ffd5;border-radius:3px;padding:3px 7px;cursor:pointer;font:12px monospace";
            b.addEventListener("click", function (event) {
                event.preventDefault(); event.stopPropagation(); click();
            });
            panel.appendChild(b);
            return b;
        }
        st.scopeRunBtn = button("RUN", "Run / Stop", function () { self.setRunning(!op.run_f); });
        st.scopeSingleBtn = button("SINGLE", "Arm a single acquisition", function () {
            self.setTrigger({ mode: "single" }); self.armTrigger();
        });
        button("CLEAR", "Clear all channels", function () { self.clear(); });
        var status = document.createElement("span");
        status.style.marginLeft = "4px";
        panel.appendChild(status);
        st.scopeStatus = status; st.scopeControls = panel;
        host.appendChild(panel);
    }

    _updateScopeControls() {
        if (!this.md || !this.md.stas) return;
        var op = this.md.opts, st = this.md.stas;
        if (st.scopeRunBtn) {
            st.scopeRunBtn.textContent = op.run_f ? "STOP" : "RUN";
            st.scopeRunBtn.style.color = op.run_f ? "#72ff72" : "#ff8b8b";
        }
        if (st.scopeStatus) {
            var trig = op.triggerMode.toUpperCase();
            if (op.triggerMode !== "auto") trig += op.triggerArmed_f ? " ARMED" : (op.triggered_f ? " TRIGGERED" : " HOLD");
            st.scopeStatus.textContent = this._formatEngineering(op.timePerDiv, "s") + "/div  " +
                this._formatEngineering(op.voltsPerDiv, "V") + "/div  " + trig + (op.demo_f ? "  DEMO" : "");
        }
    }

    _samplesPerScreen(op) {
        return Math.max(20, Math.round(op.sampleRate * op.timePerDiv * op.xDivisions));
    }

    _formatEngineering(value, unit) {
        var abs = Math.abs(value);
        var scales = [{ n: 1, p: "" }, { n: 1e-3, p: "m" }, { n: 1e-6, p: "u" },
            { n: 1e-9, p: "n" }, { n: 1e-12, p: "p" }];
        for (var i = 0; i < scales.length; i++) {
            if (abs >= scales[i].n || i === scales.length - 1)
                return (value / scales[i].n).toFixed(3).replace(/\.000$/, "") + " " + scales[i].p + unit;
        }
        return value + " " + unit;
    }

    _invalidate() {
        if (!this.md || !this.md.stas) return;
        var st = this.md.stas;
        st.renderState = null;
        st.drawAxe_f = st.drawData_f = st.drawMark_f = st.drawBuf_f = 1;
    }

    setDemo(value) {
        var op = this.md.opts;
        op.demo_f = value ? 1 : 0;
        if (op.demo_f) {
            op.run_f = 1;
            op.followTail_f = 1;
            op.triggerArmed_f = 1;
            op.triggered_f = 0;
            this._triggerPendingSamples = 0;
            this._lastTriggerValue = null;
            for (var i = 0; i < op.lines.length; i++) op.lines[i].offOn_f = 1;
        }
        this._updateScopeControls();
        this._invalidate();
    }

    _generateDemoSignals() {
        var op = this.md.opts;
        if (!op.demo_f || !op.run_f) return;
        var count = Math.max(1, op.demoChunkSize | 0);
        var rate = Math.max(1, Number(op.sampleRate) || 1);
        var frequencies = op.demoFrequencies || [1000, 500, 250, 125];
        var amplitudes = op.demoAmplitudes || [2, 1.5, 1, 0.7];
        var channels = [new Array(count), new Array(count), new Array(count), new Array(count)];

        for (var i = 0; i < count; i++) {
            var sample = this._demoSampleIndex + i;
            var p0 = 2 * Math.PI * frequencies[0] * sample / rate;
            var p1 = 2 * Math.PI * frequencies[1] * sample / rate;
            var p2 = (frequencies[2] * sample / rate) % 1;
            var p3 = 2 * Math.PI * frequencies[3] * sample / rate;
            channels[0][i] = amplitudes[0] * Math.sin(p0);
            channels[1][i] = amplitudes[1] * (Math.sin(p1) >= 0 ? 1 : -1);
            channels[2][i] = amplitudes[2] * (1 - 4 * Math.abs(p2 - 0.5));
            channels[3][i] = amplitudes[3] * Math.sin(p3) + (Math.random() - 0.5) * 0.18;
        }
        this._demoSampleIndex += count;
        this.addSamples(channels);
    }
    setRunning(value) {
        var op = this.md.opts;
        op.run_f = value ? 1 : 0;
        if (op.run_f && op.triggerMode !== "auto") op.triggerArmed_f = 1;
        this._updateScopeControls(); this._invalidate();
    }

    armTrigger() {
        var op = this.md.opts;
        op.run_f = 1; op.triggerArmed_f = 1; op.triggered_f = 0;
        this._triggerPendingSamples = 0; this._lastTriggerValue = null;
        this._updateScopeControls(); this._invalidate();
    }

    setTrigger(config) {
        config = config || {};
        var op = this.md.opts;
        if (config.mode === "auto" || config.mode === "normal" || config.mode === "single") op.triggerMode = config.mode;
        if (config.source !== undefined) op.triggerSource = Math.max(0, Math.min(op.lines.length - 1, config.source | 0));
        if (config.level !== undefined && isFinite(Number(config.level))) op.triggerLevel = Number(config.level);
        if (config.slope === "rising" || config.slope === "falling") op.triggerSlope = config.slope;
        if (config.position !== undefined && isFinite(Number(config.position)))
            op.triggerPosition = Math.max(0.05, Math.min(0.95, Number(config.position)));
        if (op.triggerMode === "auto") { op.triggerArmed_f = 1; op.triggered_f = 0; }
        this._lastTriggerValue = null;
        this._updateScopeControls(); this._invalidate();
    }

    setTimeDiv(seconds) {
        seconds = Number(seconds);
        if (!isFinite(seconds) || seconds <= 0) return;
        var op = this.md.opts;
        op.timePerDiv = seconds;
        op.sampleAmt = this._samplesPerScreen(op);
        op.viewLen = Math.min(op.sampleAmt, Math.max(1, this.md.stas.totalLen || op.sampleAmt));
        op.followTail_f = 1;
        this._updateScopeControls(); this._invalidate();
    }

    setSampleRate(samplesPerSecond) {
        samplesPerSecond = Number(samplesPerSecond);
        if (!isFinite(samplesPerSecond) || samplesPerSecond <= 0) return;
        this.md.opts.sampleRate = samplesPerSecond;
        this.setTimeDiv(this.md.opts.timePerDiv);
    }

    setVoltsDiv(volts) {
        volts = Number(volts);
        if (!isFinite(volts) || volts <= 0) return;
        var op = this.md.opts;
        op.voltsPerDiv = volts;
        op.yAxisViewMinValue = op.yAxisViewMaxValue = null;
        this._updateScopeControls(); this._invalidate();
    }

    setChannel(channelIndex, config) {
        var line = this.md.opts.lines[channelIndex];
        if (!line) return;
        config = config || {};
        if (config.name !== undefined) line.name = String(config.name);
        if (config.color !== undefined) line.color = String(config.color);
        if (config.enabled !== undefined) line.offOn_f = config.enabled ? 1 : 0;
        if (config.offset !== undefined && isFinite(Number(config.offset))) line.offset = Number(config.offset);
        if (config.gain !== undefined && isFinite(Number(config.gain))) line.gain = Number(config.gain);
        if (config.coupling === "AC" || config.coupling === "DC") line.coupling = config.coupling;
        this._invalidate();
    }

    clear() {
        var op = this.md.opts;
        for (var i = 0; i < op.lines.length; i++) {
            op.lines[i].buffer.fill(0); op.lines[i].endInx = 0;
            op.lines[i].recordLen = 0; op.lines[i].serialCnt = 0;
        }
        op.viewStart = 0; op.triggered_f = 0;
        op.triggerArmed_f = op.triggerMode === "auto" ? 1 : 0;
        this._lastTriggerValue = null; this._triggerPendingSamples = 0;
        this._updateScopeControls(); this._invalidate();
    }

    _appendValues(line, values) {
        var size = line.buffer.length;
        for (var i = 0; i < values.length; i++) {
            var value = Number(values[i]);
            line.buffer[line.endInx] = isFinite(value) ? value : NaN;
            line.endInx = (line.endInx + 1) % size;
            if (line.recordLen < size) line.recordLen++;
            line.serialCnt++;
        }
    }

    _findTrigger(values) {
        var op = this.md.opts, previous = this._lastTriggerValue, found = -1;
        for (var i = 0; i < values.length; i++) {
            var current = Number(values[i]);
            if (!isFinite(current)) continue;
            if (previous !== null) {
                var crossed = op.triggerSlope === "falling"
                    ? previous > op.triggerLevel && current <= op.triggerLevel
                    : previous < op.triggerLevel && current >= op.triggerLevel;
                if (crossed && found < 0) found = i;
            }
            previous = current;
        }
        this._lastTriggerValue = previous;
        return found;
    }

    _afterInput(sampleCount, triggerIndex) {
        var op = this.md.opts, st = this.md.stas, totalLen = 0;
        for (var i = 0; i < op.lines.length; i++) totalLen = Math.max(totalLen, op.lines[i].recordLen);
        var viewLen = Math.max(1, Math.min(op.sampleAmt, totalLen || op.sampleAmt));
        op.viewLen = viewLen;
        if (op.triggerMode === "auto") {
            if (op.followTail_f) op.viewStart = Math.max(0, totalLen - viewLen);
        } else if (op.triggerArmed_f) {
            if (this._triggerPendingSamples > 0) {
                this._triggerPendingSamples -= sampleCount;
                if (this._triggerPendingSamples <= 0) this._completeTrigger(totalLen, viewLen);
            } else if (triggerIndex >= 0) {
                op.triggered_f = 1;
                var post = Math.round(viewLen * (1 - op.triggerPosition));
                this._triggerPendingSamples = Math.max(0, post - (sampleCount - triggerIndex - 1));
                if (this._triggerPendingSamples === 0) this._completeTrigger(totalLen, viewLen);
            }
        }
        st.totalLen = totalLen;
        this._updateScopeControls(); this._invalidate();
    }

    _completeTrigger(totalLen, viewLen) {
        var op = this.md.opts;
        op.viewStart = Math.max(0, totalLen - viewLen);
        op.triggerArmed_f = 0; op.run_f = 0;
        this._triggerPendingSamples = 0;
    }

    addBuf(lineInx, values, options) {
        var op = this.md.opts, line = op.lines[lineInx];
        if (!line || !op.run_f || !values || values.length === 0) return;
        options = options || {};
        if (options.name !== undefined) line.name = String(options.name);
        if (options.realValue !== undefined) line.realValue = options.realValue;
        var triggerIndex = lineInx === op.triggerSource ? this._findTrigger(values) : -1;
        this._appendValues(line, values);
        this._afterInput(values.length, triggerIndex);
    }

    // Preferred for synchronized multi-channel acquisition.
    addSamples(channelValues) {
        var op = this.md.opts;
        if (!op.run_f || !channelValues || !channelValues.length) return;
        var sourceValues = channelValues[op.triggerSource] || [];
        var triggerIndex = this._findTrigger(sourceValues), sampleCount = 0;
        for (var i = 0; i < op.lines.length; i++) {
            var values = channelValues[i];
            if (!values || !values.length) continue;
            this._appendValues(op.lines[i], values);
            sampleCount = Math.max(sampleCount, values.length);
        }
        if (sampleCount) this._afterInput(sampleCount, triggerIndex);
    }

    _getVisibleValues(line, totalLen, viewStart, viewLen) {
        var values = super._getVisibleValues(line, totalLen, viewStart, viewLen);
        var gain = isFinite(Number(line.gain)) ? Number(line.gain) : 1;
        var offset = isFinite(Number(line.offset)) ? Number(line.offset) : 0;
        var dc = 0, count = 0;
        if (line.coupling === "AC") {
            for (var i = 0; i < values.length; i++)
                if (values[i] !== null && isFinite(values[i])) { dc += values[i]; count++; }
            if (count) dc /= count;
        }
        for (var j = 0; j < values.length; j++)
            if (values[j] !== null && isFinite(values[j])) values[j] = (values[j] - dc) * gain + offset;
        return values;
    }

    _calcYBounds(activeSeries, op) {
        var halfRange = op.voltsPerDiv * op.yDivisions / 2;
        return { min: op.yCenter - halfRange, max: op.yCenter + halfRange };
    }

    _drawAxes(ctx, w, h, op, plotRect, yBounds) {
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = op.chartBackgroundColor; ctx.fillRect(0, 0, w, h);
        var left = plotRect.left, top = plotRect.top, pw = plotRect.width, ph = plotRect.height;
        var xd = op.xDivisions, yd = op.yDivisions;
        ctx.strokeStyle = op.gridColor; ctx.lineWidth = 1; ctx.beginPath();
        for (var i = 0; i <= xd; i++) { var x = left + pw * i / xd; ctx.moveTo(x, top); ctx.lineTo(x, top + ph); }
        for (var j = 0; j <= yd; j++) { var y = top + ph * j / yd; ctx.moveTo(left, y); ctx.lineTo(left + pw, y); }
        ctx.stroke();
        ctx.strokeStyle = op.axisColor; ctx.lineWidth = 1.4; ctx.strokeRect(left, top, pw, ph);
        ctx.beginPath(); ctx.moveTo(left + pw / 2, top); ctx.lineTo(left + pw / 2, top + ph);
        ctx.moveTo(left, top + ph / 2); ctx.lineTo(left + pw, top + ph / 2); ctx.stroke();
        ctx.fillStyle = op.canvasFontColor; ctx.font = "12px monospace";
        for (var xi = 0; xi <= xd; xi += 2) {
            var seconds = (xi - xd * op.triggerPosition) * op.timePerDiv;
            var text = this._formatEngineering(seconds, "s"), px = left + pw * xi / xd;
            var tw = ctx.measureText(text).width;
            ctx.fillText(text, Math.max(left, Math.min(left + pw - tw, px - tw / 2)), top + ph + 16);
        }
        for (var yi = 0; yi <= yd; yi++) {
            var value = yBounds.max - yi * op.voltsPerDiv;
            var label = this._formatEngineering(value, "V");
            ctx.fillText(label, Math.max(0, left - ctx.measureText(label).width - 5), top + ph * yi / yd + 4);
        }
    }

    _drawWindowBar(ctx, st, plotRect, totalLen, viewStart, viewLen) {
        super._drawWindowBar(ctx, st, plotRect, totalLen, viewStart, viewLen);
        var op = this.md.opts;
        var x = plotRect.left + plotRect.width * op.triggerPosition;
        var bounds = st.lastYBounds || this._calcYBounds([], op);
        var y = plotRect.top + plotRect.height - ((op.triggerLevel - bounds.min) /
            Math.max(1e-12, bounds.max - bounds.min)) * plotRect.height;
        ctx.save(); ctx.strokeStyle = ctx.fillStyle = "#ff9f1c"; ctx.lineWidth = 1; ctx.setLineDash([5, 5]);
        ctx.beginPath(); ctx.moveTo(x, plotRect.top); ctx.lineTo(x, plotRect.top + plotRect.height); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(plotRect.left, y); ctx.lineTo(plotRect.left + plotRect.width, y); ctx.stroke();
        ctx.setLineDash([]); ctx.beginPath(); ctx.moveTo(x - 6, plotRect.top); ctx.lineTo(x + 6, plotRect.top);
        ctx.lineTo(x, plotRect.top + 8); ctx.closePath(); ctx.fill(); ctx.restore();
    }

    frameTimer() {
        this._generateDemoSignals();
        super.frameTimer();
    }
    _drawYWindowBar() { }
}

