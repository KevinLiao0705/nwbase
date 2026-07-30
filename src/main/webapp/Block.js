/* 
 * 若要變更此授權標頭，請使用專案設定中的標準樣板。
 * 若要變更此範本檔，請在編輯器中開啟對應設定。
 */


/* global KvLib, Layout, gr, Component, sys, Kext, Test, ani, mac, Md_editOptsLine, us */


//===========================================
class Block {
    constructor(_name, _type, _opts) {
        var self = this;
        this.name = _name;
        this.type = _type;
        var strA = this.type.split("~");
        this.blockType = strA[0];//模型 | 元件 | 版面配置
        this.baseType = strA[1];
        this.subType = strA[2];
        var strB = strA[2].split(".");
        this.subType0 = strB[0];
        this.subType1 = strB[1];
        this.setOpts = _opts;
        this.kid = KvLib.genKid();
        //=========================================
        //=========================================
        this.mdClass = eval("new " + this.baseType + "()");
        this.mdClass.md = this;
        this.opts = this.mdClass.initOpts(this);
        var subOpts = gr.blockSubOpts[this.type];
        if (subOpts) {
            KvLib.deepCoverObject(this.opts, subOpts);
        }
        KvLib.deepCoverObject(this.opts, _opts);
        //====================================
        this.setOpts = {};
        KvLib.deepCoverObject(this.setOpts, this.opts);
        this.fatherMd = null;
        this.cname = null;
        this.rname = null;
        this.stas = {};
        this.watch = {};
        this.elems = {};
        this.objs = {};
        this.blocks = {};
        this.layouts = {};
        this.blockRefs = {};
        this.layoutRefs = {};
        this.lyMaps = {};
        //====================================
        this.build();
    }

    static setBaseOpts(opts) {
        //=================
        opts.propertyWidth = 0;
        opts.propertyHeight = 0;
        opts.hidden_f = 0;
        opts.wAlign = "center";//靠左|置中:靠右
        opts.hAlign = "center";//頂端|置中:底部
        opts.baseColor = "#ccc";
        opts.iw = 9999;
        opts.ih = 9999;
        opts.disable_f = 0;
        opts.altColors = null;
        opts.altColorInx = 0;
        opts.pointerEvents = null;//"none"：停用指標事件
        opts.viewMouseUpDown_f = 0;
        opts.viewMouseOverOut_f = 0;
        opts.mouseOnBorderColor = null;
        opts.mouseOnBaseColor = null;
        opts.mouseOnTextColor = null;
        //=================
        opts.margin = 0;
        opts.tm = null;
        opts.rm = null;
        opts.bm = null;
        opts.lm = null;
        //=================
        opts["group~font"] = [0];
        opts.innerText = "";//"1234568<br>abcd"：測試文字範例
        opts.fontSize = "0.7rh";
        opts.maxFontSize = 35;
        //======================
        //opts.fontFamily="Impact";
        //opts.fontFamily="Monospace";//符合寬度
        //opts.fontFamily="Courier";//符合寬度
        opts.fontFamily = "Arial";//
        //opts.fontFamily="Arial Black";//
        //opts.fontFamily="Tahoma";
        //======================
        opts.fontWeight = "normal";//正常,粗體
        opts.fontStyle = "normal";//正常,斜體
        opts.maxByte = 0;
        opts.textAlign = "center";
        opts.textShadow = null;//"1px 1px 1px #fff"：文字陰影範例
        opts.innerTextColor = "#000";
        opts.disableTextColor = "#ccc";
        opts.textOverflow = "ellipsis";//裁切|省略
        opts.padding = 0;
        opts.lpd = null;
        opts.tpd = null;
        opts.rpd = null;
        opts.bpd = null;
        opts.whiteSpace = "pre";//正常|不換行|預格式
        opts.headIconWidth = 0;
        opts.checkBoxWidth = 0;

        //=================
        opts["group~border"] = [0];
        opts.borderType = "normal";//正常|按鈕按下|按鈕自由
        opts.borderRadius = null;
        opts.borderWidth = 0;
        opts.borderColor = "#fff";
        //=================
        opts["group~background"] = [0];
        opts.background = "";
        opts.backgroundInx = null;
        opts.backgroundColors = [];
        opts.backgroundImageUrls = [];
        opts.backgroundRepeat = "no-repeat"; //重複、水平重複、垂直重複、不要重複
        opts.backgroundImagePosition = "fit"; //延展、置中、符合、或自動
        opts.opacity = null;
        //=================
        opts["group~shadow"] = [0];
        opts.insideShadowBlur = null;
        opts.insideShadowColor = "#000";
        opts.insideShadowOffx = 0;
        opts.insideShadowOffy = 0;
        opts.outsideShadowColor = "#000";
        opts.outsideShadowBlur = null;
        opts.outsideShadowOffx = 10;
        opts.outsideShadowOffy = 10;
        opts.mouseOver_f = 0;
        opts.mouseOut_f = 0;
        opts.mouseUp_f = 0;
        opts.mouseDown_f = 0;
        opts.mouseClick_f = 0;
        opts.blur_f = 0;
        opts.keyPress_f;
        opts.actionFunc = null;
        //=================
        opts.inputRegs = [];
        opts.timerObj = {};
        opts.layouts = {};
        opts.blocks = {};
        opts.styles = null;

    }

    static getOpts(baseType, subType) {
        var opts = {};
        KvLib.deepCoverObject(opts, gr.modelBaseOpts);
        var bopts = gr.modelOpts[baseType];
        if (bopts) {
            KvLib.deepCoverObject(opts, bopts);
            if (bopts["delOpts"]) {
                var delOpts = bopts["delOpts"][subType];
                if (delOpts)
                    KvLib.deleteObjectMenber(opts, delOpts);
            }

            var sopts = bopts["subOpts"][subType];
            if (sopts)
                KvLib.deepCoverObject(opts, sopts);

            if (us.set.optsSet["Model~" + baseType]) {
                var uopts = us.set.optsSet["Model~" + baseType][subType];
                if (uopts)
                    KvLib.deepCoverObject(opts, uopts);
            }


        }
        return opts;
    }
    setBorder(elem) {
        var op = this.opts;
        var st = this.stas;
        if (!st.borderWidth)
            return;
        elem.style.borderStyle = "solid";
        if (op.borderRadius)
            elem.style.borderRadius = KvLib.transUnit(op.borderRadius, 10, st.cw, st.ch) + "px";
        if (op.altColors)
            elem.style.borderColor = op.altColors[op.altColorInx];
        else
            elem.style.borderColor = op.borderColor;
        if (!op.borderType)
            op.borderType = "normal";
        switch (op.borderType) {
            case "none":
                elem.style.borderWidth = "0px";
                break;
            case "normal":
                elem.style.borderWidth = st.borderWidth + "px";
                break;
            case "buttonFree":
                elem.style.borderTop = st.borderWidth + "px solid " + op.borderColor;
                elem.style.borderLeft = st.borderWidth + "px solid " + op.borderColor;
                elem.style.borderBottom = st.borderWidth + "px solid " + KvLib.darkColor(op.borderColor, 0.5);
                elem.style.borderRight = st.borderWidth + "px solid " + KvLib.darkColor(op.borderColor, 0.5);
                break;
            case "buttonPush":
                elem.style.borderTop = st.borderWidth + "px solid " + KvLib.darkColor(op.borderColor, 0.5);
                elem.style.borderLeft = st.borderWidth + "px solid " + KvLib.darkColor(op.borderColor, 0.5);
                elem.style.borderBottom = st.borderWidth + "px solid " + op.borderColor;
                elem.style.borderRight = st.borderWidth + "px solid " + op.borderColor;
                break;
            case "gridTr":
                elem.style.borderTop = st.borderWidth + "px solid " + op.borderColor;
                elem.style.borderRight = st.borderWidth + "px solid " + op.borderColor;
                elem.style.borderLeft = st.borderWidth + "px solid " + op.baseColor;
                elem.style.borderBottom = st.borderWidth + "px solid " + op.baseColor;
                break;
            case "gridT":
                elem.style.borderTop = st.borderWidth + "px solid " + op.borderColor;
                elem.style.borderRight = st.borderWidth + "px solid " + op.baseColor;
                elem.style.borderLeft = st.borderWidth + "px solid " + op.baseColor;
                elem.style.borderBottom = st.borderWidth + "px solid " + op.baseColor;
                break;

        }


    }

    static setTimer(opts, name, tCount, repeatCount, func) {
        if (!opts.timerObj)
            opts.timerObj = {};
        var tobj = {};
        tobj.tCount = tCount;
        tobj.cnt = 0;
        tobj.func = func;
        tobj.repeatCount = repeatCount;
        tobj.repeatCnt = 0;
        opts.timerObj[name] = tobj;
    }
    setTimer(name, tCount, repeatCount, func) {
        Block.setTimer(this.opts, name, tCount, repeatCount, func);
    }

    setMargin(opts) {
        var op = this.opts;
        opts.margin = op.margin;
        opts.lm = op.lm;
        opts.tm = op.tm;
        opts.rm = op.rm;
        opts.bm = op.bm;

    }
    setPns(opts) {
        var op = this.opts;
        opts.innerTextColor = op.innerTextColor;
        opts.baseColor = op.baseColor;
        opts.background = op.background;
        opts.borderWidth = op.borderWidth;
        opts.borderColor = op.borderColor;
        opts.basePanel_f = 1;
    }

    setDialogFrame(opts, type) {
        if (!type)
            type = "sys0";
        if (type === "sys0") {
            opts.borderWidth = 1;
            opts.borderColor = "#fff";
            opts.outsideShadowColor = "#000";
            opts.outsideShadowBlur = 10;
            opts.outsideShadowOffx = 10;
            opts.outsideShadowOffy = 10;
            opts.pns = {};
            opts.pns["c0"] = { baseColor: "#ccc" };

        }
        if (type === "sys1") {
            opts.borderWidth = 0;
            opts.pns = {};
            opts.pns["c0"] = { baseColor: "#ddd" };
        }
    }

    setBackground(elem) {
        var op = this.opts;
        var st = this.stas;
        elem.style.backgroundColor = op.baseColor;
        var self = this;
        var op = self.opts;
        if (op.opacity)
            elem.style.opacity = op.opacity;
        if (op.backgroundInx === undefined || op.backgroundInx === null || op.backgroundInx < 0) {
            elem.style.backgroundColor = op.baseColor;
            if (op.background) {
                elem.style.background = op.background;
            }
            return;
        } else {
            if (op.backgroundImageUrls.length) {
                elem.style.backgroundColor = op.baseColor;
                if (op.background) {
                    elem.style.background = op.background;
                }
                elem.style.backgroundRepeat = op.backgroundRepeat;
                elem.style.backgroundImage = "url('" + op.backgroundImageUrls[op.backgroundInx] + "')";
                switch (op.backgroundImagePosition) {
                    case "fit":
                        elem.style.backgroundPosition = "center";
                        elem.style.backgroundSize = "contain";
                        break;
                    case "auto":
                        elem.style.backgroundPosition = "center";
                        elem.style.backgroundSize = "auto";
                        break;
                    case "center":
                        elem.style.backgroundPosition = "center";
                        elem.style.backgroundSize = this.stas.cw + "px " + this.stas.ch + "px";
                        break;
                    case "extend":
                        elem.style.backgroundSize = this.stas.xw + "px " + this.stas.xh + "px";
                        break;
                    default:
                        break;
                }
                return;
            }
            if (op.backgroundColors.length) {
                elem.style.backgroundColor = op.backgroundColors[op.backgroundInx];
                return;
            }
        }



    }
    parseStyles(styles) {
        // 只接受物件或 JSON 字串，讓樣式覆寫保持純資料。
        if (!styles)
            return null;
        if (typeof styles === "object")
            return styles;
        if (typeof styles !== "string")
            return null;
        try {
            return JSON.parse(styles);
        } catch (e) {
            return null;
        }
    }
    setInnerText(elem) {
        var op = this.opts;
        var st = this.stas;
        var lines = st.innerText.split("<br>").length;
        if (!op.writingMode)
            elem.style.lineHeight = (st.ch / lines) + "px";
        else {
            elem.style.writingMode = op.writingMode;
            elem.style.lineHeight = (st.cw - 8) + "px";
        }
        elem.style.verticalAlign = "center";
        elem.style.fontFamily = op.fontFamily;
        elem.style.fontWeight = op.fontWeight;
        elem.style.fontStyle = op.fontStyle;
        if (op.maxFontSize) {
            if (op.maxFontSize < st.fontSize)
                st.fontSize = op.maxFontSize;
        }
        elem.style.fontSize = st.fontSize + "px";
        elem.style.whiteSpace = op.whiteSpace;
        elem.style.textAlign = op.textAlign;
        elem.style.textOverflow = op.textOverflow;
        elem.style.paddingLeft = (st.lpd) + "px";
        elem.style.paddingRight = st.rpd + "px";
        elem.style.paddingTop = st.tpd + "px";
        elem.style.paddingBottom = st.bpd + "px";
        if (op.altColors)
            elem.style.color = op.altColors[op.altColorInx];
        else
            elem.style.color = op.innerTextColor;
        if (op.disable_f) {
            if (op.disableTextColor)
                elem.style.color = op.disableTextColor;
        }
        if (op.textShadow)
            elem.style.textShadow = op.textShadow;
        elem.innerHTML = st.innerText;



    }

    setBoxShadow(elem) {
        var op = this.opts;
        var self = this;
        var str = self.getShadowStr();
        if (str.length)
            elem.style.boxShadow = str;

    }

    mouseOverFunc(event) {
        var elem = event.target;
        var self = this.md;
        var op = self.opts;
        if (gr.mouseDisable_f)
            return;
        if (self.opts.viewMouseOverOut_f) {
            if (op.mouseOnBorderColor)
                elem.style.borderColor = op.mouseOnBorderColor;
            if (op.mouseOnBaseColor)
                elem.style.backgroundColor = op.mouseOnBaseColor;
            if (op.mouseOnTextColor)
                elem.style.color = op.mouseOnTextColor;


        }
        if (self.opts.mouseOver_f) {
            if (self.opts.actionFunc) {
                var obj = {};
                obj.act = "mouseOver";
                obj.kvObj = self;
                obj.event = event;
                self.opts.actionFunc(obj);
                return;
            }
        }
    }

    mouseOutFunc(event) {
        var elem = event.target;
        var self = this.md;
        var op = self.opts;
        if (gr.mouseDisable_f)
            return;
        if (self.opts.viewMouseOverOut_f) {
            if (op.mouseOnBorderColor)
                self.setBorder(elem);
            if (op.mouseOnBaseColor)
                self.setBackground(elem);
            if (op.mouseOnTextColor)
                self.setInnerText(elem);
            elem.style.fontSize = (self.stas.fontSize) + "px";
            self.setBoxShadow(elem);
        }
        if (self.opts.mouseOut_f) {
            if (self.opts.actionFunc) {
                var obj = {};
                obj.act = "mouseOut";
                obj.kvObj = self;
                obj.event = event;
                self.opts.actionFunc(obj);
                return;
            }
        }
    }

    mouseUpFunc(event) {
        var elem = event.target;
        var self = this.md;
        if (self.opts.viewMouseUpDown_f) {
            elem.style.fontSize = (self.stas.fontSize) + "px";
            self.setBoxShadow(elem);
        }
        if (self.opts.mouseUp_f) {
            if (self.opts.actionFunc) {
                var obj = {};
                obj.act = "mouseUp";
                obj.kvObj = self;
                obj.event = event;
                self.opts.actionFunc(obj);
                return;
            }
        }
    }
    mouseDownFunc(event) {
        var elem = event.target;
        var self = this.md;
        if (elem.id !== self.elemId)
            return;
        if (self.opts.viewMouseUpDown_f) {
            elem.style.fontSize = (self.stas.fontSize * 0.9) + "px";
            elem.style.boxShadow = "";
        }
        if (self.opts.mouseDown_f) {
            if (self.opts.actionFunc) {
                var obj = {};
                obj.act = "mouseDown";
                obj.kvObj = self;
                obj.event = event;
                self.opts.actionFunc(obj);

                return;
            }
        }

        if (self.opts.mousePushCon_f) {
            self.stas.mousePushAct_f = 1;
            self.stas.mousePushActTime = -30;
            var obj = {};
            obj.act = "mousePush";
            obj.kvObj = self;
            self.opts.actionFunc(obj);
            //if (self.opts.actionFunc(obj))
            //    event.stopPropagation();

            return;
        }
    }

    blurFunc(event) {
        var elem = event.target;
        var self = this.md;
        if (self.opts.actionFunc) {
            var obj = {};
            obj.act = "blur";
            obj.kvObj = self;
            if (self.opts.actionFunc(obj))
                event.stopPropagation();
            return;
        }
    }

    mouseWheelFunc(event) {
        var elem = event.target;
        var self = this.md;
        if (self.opts.actionFunc) {
            var obj = {};
            obj.act = "wheel";
            obj.kvObj = self;
            obj.event = event;
            if (self.opts.actionFunc(obj))
                event.stopPropagation();
            return;
        }
    }

    valueChangeFunc(event) {
        var elem = event.target;
        var self = this.md;
        if (self.opts.actionFunc) {
            var obj = {};
            obj.act = "valueChange";
            obj.kvObj = self;
            obj.event = event;
            obj.value = KvLib.toNumber(elem.value, elem.value);
            if (self.opts.actionFunc(obj))
                event.stopPropagation();
            return;
        }
    }

    keyPressFunc(event) {
        var elem = event.target;
        var self = this.md;
        if (self.opts.actionFunc) {
            if (event.keyCode === 13) {
                console.log("keycode");
                var obj = {};
                obj.act = "pressEnter";
                if (elem.value !== self.opts.editValue)
                    obj.valueChange = 1;
                self.opts.editValue = elem.value;
                obj.kvObj = self;
                obj.value = self.opts.editValue;
                if (self.opts.actionFunc(obj))
                    event.stopPropagation();
            }
        }
    }

    mouseClickFunc(event) {
        var self = this.md;
        if (self.checkBoxClick) {
            self.checkBoxClick();
            if (self.opts.actionFunc) {
                var obj = {};
                obj.act = "checkChanged";
                obj.kvObj = self;
                if (self.opts.actionFunc(obj))
                    event.stopPropagation();
                return;
            }
        }

        if (self.opts.actionFunc) {
            var obj = {};
            obj.act = "mouseClick";
            obj.kvObj = self;
            obj.event = event;
            if (self.opts.actionFunc(obj))
                event.stopPropagation();
            return;
        }
    }

    setAction(elem) {
        var self = this;
        var op = this.opts;
        if (!op.disable_f) {
            if (op.mouseOver_f || op.viewMouseOverOut_f)
                elem.addEventListener("mouseover", self.mouseOverFunc);
            if (op.mouseOut_f || op.viewMouseOverOut_f)
                elem.addEventListener("mouseout", self.mouseOutFunc);
            if (op.mouseDown_f || op.viewMouseUpDown_f || op.mousePushCon_f)
                elem.addEventListener("mousedown", self.mouseDownFunc);
            if (op.mouseUp_f || op.viewMouseUpDown_f)
                elem.addEventListener("mouseup", self.mouseUpFunc);
            if (op.mouseClick_f)
                elem.addEventListener("click", self.mouseClickFunc);
            if (op.mouseWheel_f)
                elem.addEventListener("wheel", self.mouseWheelFunc);
            if (op.keyPress_f)
                elem.addEventListener('keyup', self.keyPressFunc);


        }
    }

    getOutsideShadowStr() {
        var self = this;
        var st = self.stas;
        var op = self.opts;
        var color = op.outsideShadowColor;
        if (op.altColors) {
            color = op.altColors[op.altColorInx];
            if (!op.altColorInx)
                st.outsideShadowBlur = 0;
        }
        var str = "";
        if (st.outsideShadowBlur) {
            str += st.outsideShadowOffx + "px ";
            str += st.outsideShadowOffy + "px ";
            str += st.outsideShadowBlur + "px ";
            str += color;

        }
        return str;
    }
    getInsideShadowStr() {
        var self = this;
        var st = self.stas;
        var op = self.opts;
        var color = op.insideShadowColor;
        if (op.altColors) {
            color = op.altColors[op.altColorInx];
            if (!op.altColorInx)
                st.insideShadowBlur = 0;
        }
        if (op.disable_f)
            st.insideShadowBlur = 0;
        var str = "";
        if (st.insideShadowBlur) {
            str += st.insideShadowOffx + "px ";
            str += st.insideShadowOffy + "px ";
            str += st.insideShadowBlur + "px ";
            str += color;
            str += " inset";

        }
        return str;
    }
    getShadowStr() {
        var str0 = this.getInsideShadowStr();
        var str1 = this.getOutsideShadowStr();
        if (str0.length !== 0 && str1.length !== 0)
            return str0 + "," + str1;
        else
            return str0 + str1;
    }

    //fxywh：設定外框
    //xywh：預設外框
    //rxywh：依 whr 調整外框
    //ixywh：依邊界調整外框
    //cxywh：依邊框與對齊調整外框

    transData(fhid, x, y, w, h) {
        var self = this;
        var st = self.stas;
        var op = self.opts;
        var felem = document.getElementById(fhid);
        st.fx = x;
        st.fy = y;
        st.fw = w;
        st.fh = h;
        //==============================
        if ("setStxywh") {
            if (x === undefined || x === null)
                x = 0;
            if (y === undefined || y === null)
                y = 0;
            if (w === undefined || w === null) {
                w = felem.clientWidth;
                if (!w)
                    w = 0;
            }
            if (h === undefined || h === null) {
                h = felem.clientHeight;
                if (!h)
                    h = 0;
            }
            if (w === 0)
                w = felem.clientWidth;
            if (h === 0)
                w = felem.clientHeight;
            st.x = x;
            st.y = y;
            st.w = w;
            st.h = h;
        }
        //=====================================
        x = st.x;
        y = st.y;
        w = st.w;
        h = st.h;



        //======================================
        if (op.whr) {
            var ww = (h * op.whr);
            var hh = (w / op.whr);
            if (ww > w)
                ww = w;
            if (hh > h)
                hh = h;
            x += ((w - ww) / 2);
            y += ((h - hh) / 2);
            w = ww;
            h = hh;
        }
        st.rx = x;
        st.ry = y;
        st.rw = w;
        st.rh = h;
        //======================================
        st.kvText = KvLib.getKvText(op.innerText, "");
        st.innerText = st.kvText.text;
        //======================================
        var margin = KvLib.transUnit(op.margin, 0);
        st.lm = margin;
        st.tm = margin;
        st.rm = margin;
        st.bm = margin;
        if (op.tm !== null)
            st.tm = KvLib.transUnit(op.tm, 0, st.rw, st.rh);
        if (op.rm !== null)
            st.rm = KvLib.transUnit(op.rm, 0, st.rw, st.rh);
        if (op.bm !== null)
            st.bm = KvLib.transUnit(op.bm, 0, st.rw, st.rh);
        if (op.lm !== null)
            st.lm = KvLib.transUnit(op.lm, 0, st.rw, st.rh);
        if (op.xm !== null)
            st.xm = KvLib.transUnit(op.xm, 0, st.rw, st.rh);
        if (op.ym !== null)
            st.ym = KvLib.transUnit(op.ym, 0, st.rw, st.rh);


        //================================================    
        st.ix = st.rx + st.lm;
        st.iy = st.ry + st.tm;
        //================================================    
        var maxIw = st.rw - (st.lm + st.rm);
        var maxIh = st.rh - (st.tm + st.bm);
        st.iw = KvLib.transUnit(op.iw, 0, st.rw, st.rh);
        st.ih = KvLib.transUnit(op.ih, 0, st.rw, st.rh);
        st.offx = KvLib.transUnit(op.offx, 0, st.rw, st.rh);
        st.offy = KvLib.transUnit(op.offy, 0, st.rw, st.rh);


        if (op.iw === null || op.iw === undefined)
            st.iw = maxIw;
        if (op.ih === null || op.ih === undefined)
            st.ih = maxIh;
        if (st.iw === 9999)
            st.iw = maxIw;
        if (st.ih === 9999)
            st.ih = maxIh;

        //if (st.iw > maxIw)
        //    st.iw = maxIw;
        //if (st.ih > maxIh)
        //    st.ih = maxIh;


        if (op.wAlign === "center") {
            st.ix += (maxIw - st.iw) / 2;
        }
        if (op.wAlign === "right") {
            st.ix += maxIw - st.iw;
        }
        if (op.hAlign === "center") {
            st.iy += (maxIh - st.ih) / 2;
        }
        if (op.hAlign === "bottom") {
            st.iy += maxIh - st.ih;
        }


        st.cx = st.ix;
        st.cy = st.iy;
        st.cw = st.iw;
        st.ch = st.ih;
        //======================================
        st.borderWidth = KvLib.transUnit(op.borderWidth, 0, st.iw, st.ih);
        if (st.iw === 0 || st.ih === 0)
            st.borderWidth = 0;
        st.xx = st.cx;
        st.xy = st.cy;
        st.xw = st.cw - st.borderWidth * 2;
        st.xh = st.ch - st.borderWidth * 2;

        var padding = KvLib.transUnit(op.padding, 0, st.iw, st.ih);
        st.lpd = padding;
        st.tpd = padding;
        st.rpd = padding;
        st.bpd = padding;
        if (op.tpd !== null)
            st.tpd = KvLib.transUnit(op.tpd, 0, st.iw, st.ih);
        if (op.rpd !== null)
            st.rpd = KvLib.transUnit(op.rpd, 0, st.iw, st.ih);
        if (op.bpd !== null)
            st.bpd = KvLib.transUnit(op.bpd, 0, st.iw, st.ih);
        if (op.lpd !== null)
            st.lpd = KvLib.transUnit(op.lpd, 0, st.iw, st.ih);
        st.headIconWidth = KvLib.transUnit(op.headIconWidth, 0, ww, hh);
        st.headIconLpd = KvLib.transUnit(op.headIconLpd, 0, ww, hh);
        st.lpd += st.headIconWidth + st.headIconLpd;
        st.checkBoxWidth = KvLib.transUnit(op.checkBoxWidth, 0, ww, hh);
        st.lpd += st.checkBoxWidth;



        var ccw = st.xw - st.lpd - st.rpd;
        var cch = st.xh - st.tpd - st.bpd;
        if (ccw < 0) {
            st.lpd = (st.cw - st.borderWidth * 2) / 2;
            st.rpd = (st.cw - st.borderWidth * 2) / 2;
            ccw = st.cw - st.borderWidth * 2 - st.lpd - st.rpd;
        }
        if (cch < 0) {
            st.tpd = (st.ch - st.borderWidth * 2) / 2;
            st.bpd = (st.ch - st.borderWidth * 2) / 2;
            cch = st.ch - st.borderWidth * 2 - st.tpd - st.bpd;
        }
        st.cw = ccw;
        st.ch = cch;
        if (st.cw < 0)
            st.cw = 0;
        if (st.ch < 0)
            st.ch = 0;
        //======================================
        var ww = st.iw;
        var hh = st.ih;
        st.insideShadowBlur = KvLib.transUnit(op.insideShadowBlur, 0, ww, hh);
        st.insideShadowOffx = KvLib.transUnit(op.insideShadowOffx, 0, ww, hh);
        st.insideShadowOffy = KvLib.transUnit(op.insideShadowOffy, 0, ww, hh);
        st.outsideShadowBlur = KvLib.transUnit(op.outsideShadowBlur, 0, ww, hh);
        st.outsideShadowOffx = KvLib.transUnit(op.outsideShadowOffx, 0, ww, hh);
        st.outsideShadowOffy = KvLib.transUnit(op.outsideShadowOffy, 0, ww, hh);
        //==============================================
        st.fontSizeObj = {};
        st.fontSizeObj.w = 0;
        st.fontSizeObj.h = st.ch;
        if (st.innerText) {
            if (!op.fontSize)
                op.fontSize = "fixWidth";
            if (op.fontSize === "fixWidth") {
                st.fontSize = KvLib.transUnit("0.9rh", 10, st.cw, st.ch);
                var testText = st.innerText;
                if (op.maxByte) {
                    testText = 0;
                    for (var i = 0; i < op.maxByte; i++) {
                        testText += "W";
                    }
                }
                st.fontSizeObj = KvLib.measureText(testText, st.fontSize, op.fontWeight, op.fontFamily);
                if (st.fontSizeObj.w > st.cw) {
                    st.fontSize = (st.fontSize * st.cw / st.fontSizeObj.w);
                    st.fontSize -= 3;
                    st.fontSize = KvLib.minMax(st.fontSize, gr.minFontSize, gr.maxFontSize);
                }
            } else {
                st.fontSize = KvLib.transUnit(op.fontSize, 10, st.cw, st.ch);
                st.fontSize = KvLib.minMax(st.fontSize, gr.minFontSize, gr.maxFontSize);
                st.fontSizeObj = KvLib.measureText(st.innerText, st.fontSize, op.fontWeight, op.fontFamily);
            }
        }

        if (op.shrinkX_f) {
            if (op.maxW) {
                st.maxW = KvLib.transUnit(op.maxW, st.cw, st.cw, st.ch);
            }
            st.cw = st.fontSizeObj.w;//+ op.shrinkSpaceX;
            if (st.cw >= st.maxW)
                st.cw = st.maxW;

            /*
             var ws = st.cw + st.borderWidth * 2 + st.lm + st.rm + st.lpd + st.rpd;
             if (st.iw) {
             //ws = st.iw + st.borderWidth * 2 + st.lm + st.rm + st.lpd + st.rpd;
             //st.cw = st.iw;
             }
             st.shrinkX = st.w - ws;
             st.rw = ws;
             */
        }

        if (op.shrinkY_f) {
            var hs = st.ih + st.tm + st.bm + st.tpd + st.bpd;
            st.ch = st.ih;
            st.shrinkY = st.h - hs;
            st.cy -= 0;
            st.rh = hs;
        }
    }

    setWatch(self, optsName, value, reDraw_f) {
        if (reDraw_f)
            self.watch["_sysReDraw_f"] = 1;
        self.watch[optsName] = 1;
    }

    static setInputWatch(opts, type, regName, optName, redraw_f) {
        var ipObj = {};
        ipObj.cnt = 0;
        ipObj.period = 1;
        ipObj.type = type;
        ipObj.inputName = regName;
        ipObj.optName = optName;
        ipObj.redraw_f = redraw_f;
        if (!opts.inputRegs)
            opts.inputRegs = [];
        opts.inputRegs.push(ipObj);
    }
    static setInputWatch(opts, type, regName, optName, redraw_f) {
        var ipObj = {};
        ipObj.cnt = 0;
        ipObj.period = 1;
        ipObj.type = type;
        ipObj.inputName = regName;
        ipObj.optName = optName;
        ipObj.redraw_f = redraw_f;
        if (!opts.inputRegs)
            opts.inputRegs = [];
        opts.inputRegs.push(ipObj);

    }
    setInputWatch(opts, type, regName, optName, redraw_f) {
        Block.setInputWatch(opts, type, regName, optName, redraw_f);
    }

    chkInputWatch() {
        var self = this;
        for (var i = 0; i < self.opts.inputRegs.length; i++) {



            var ipObj = self.opts.inputRegs[i];
            ipObj.cnt++;
            if (ipObj.cnt < ipObj.period)
                continue;
            ipObj.cnt = 0;
            var value;
            var debug_f = 0;
            if (ipObj.inputName === "self.fatherMd.fatherMd.fatherMd.stas.selectValueA#2") {
                debug_f = 1;
            }
            if (ipObj.type === "directReg") {
                try {
                    var strA = ipObj.inputName.split('#');
                    var strB = strA[0].split('.');
                    if (strB[0] === "self") {
                        var reg = self;
                    } else {
                        var reg = window[strB[0]];
                    }
                    for (var j = 1; j < strB.length; j++) {
                        var reg = reg[strB[j]];
                    }
                    if (strA.length === 1)
                        var value = reg;
                    if (strA.length === 2)
                        var value = reg[parseInt(strA[1])];
                    if (strA.length === 3) {
                        var reg = reg[parseInt(strA[1])];
                        var value = reg[parseInt(strA[2])];
                    }
                } catch (except) {
                    continue;
                }
            }


            if (ipObj.type === "directName") {
                var value;
                var str = "value=" + ipObj.inputName;
                try {
                    eval(str);
                } catch (except) {
                    continue;
                }
            }



            if (value === undefined)
                continue;
            if (Array.isArray(value)) {
                if (value.length === self.opts[ipObj.optName].length) {
                    for (var j = 0; j < value.length; j++) {
                        if (self.opts[ipObj.optName][j] !== value[j]) {
                            if (debug_f === 1)
                                var xxx = 1;
                            self.opts[ipObj.optName][j] = value;
                            self.setWatch(self, ipObj.optName, value, ipObj.redraw_f);
                            break;
                        }
                    }
                }
            } else {
                var strA = ipObj.optName.split(".");
                var reg = self.opts;
                var optsName = strA[strA.length - 1];
                for (var j = 0; j < strA.length - 1; j++) {
                    var reg = reg[strA[j]];
                }
                if (reg[optsName] !== value) {
                    if (debug_f === 1)
                        var xxx = 1;
                    reg[optsName] = value;
                    self.setWatch(self, ipObj.optName, value, ipObj.redraw_f);
                }
            }

        }
    }

    chkTimer() {
        var md = this;

        for (var key in md.opts.timerObj) {
            var tobj = md.opts.timerObj[key];
            tobj.cnt++;
            if (tobj.cnt >= tobj.tCount) {
                tobj.cnt = 0;
                var func = KvLib.getFunc(tobj.func);
                if (func) {
                    tobj.func = func;
                    func(tobj, md);
                }
                if (tobj.repeatCount) {
                    tobj.repeatCnt++;
                    if (tobj.repeatCnt >= tobj.repeatCount) {
                        delete md.opts.timerObj[key];
                    }
                }
            }
        }
        for (var key in md.blocks) {
            var kobj = md.blocks[key];
            kobj.chkTimer();
        }
    }

    chkWatch(md) {
        var md = this;
        md.chkTimer();
        md.chkInputWatch();

        if (md.watch["_sysReDraw_f"])
            md = md.reCreate();
        if (md.mdClass.chkWatch)
            md.mdClass.chkWatch();
        for (var key in md.blocks) {
            var kobj = md.blocks[key];
            kobj.chkWatch();
        }
        if (md.stas.mousePushAct_f) {
            if (!gr.mouseDown_f)
                md.stas.mousePushAct_f = 0;
            md.stas.mousePushActTime++;
            if (!md.opts.mousePushActPrd)
                md.opts.mousePushActPrd = 1;
            if (md.stas.mousePushActTime >= md.opts.mousePushActPrd) {
                md.stas.mousePushActTime = 0;
                var iobj = {};
                iobj.act = "mousePush";
                iobj.kvObj = md;
                KvLib.exeFunc(md.opts.actionFunc, iobj);
            }

        }
    }

    getRectObj(cname, layouts) {
        var strA = cname.split("~");
        var fatherLay = null;
        if (strA.length > 1) {
            var kstr = "";
            for (var j = 0; j < strA.length - 1; j++) {
                if (j !== 0)
                    kstr += "~";
                kstr += strA[j];
            }
            var fatherLay = layouts[kstr];
            var fatherLayCnt = KvLib.toInt(strA[strA.length - 1], 0);
            var lr = {};
            var rect = fatherLay.stas.rects[fatherLayCnt];
            if (!rect)
                var i = 0;
            if (rect.elemId) {
                lr.fhid = rect.elemId;
                lr.x = 0;
                lr.y = 0;
            } else {
                lr.fhid = fatherLay.elemId;
                lr.x = rect.x;
                lr.y = rect.y;
            }
            lr.w = rect.w;
            lr.h = rect.h;
            lr.z = rect.z;
            return lr;
        }
    }

    newLayout(cname, opts, blockType, mapName) {
        var md = this;
        md.opts.layouts[cname] = { name: cname, type: blockType, opts: opts };
        md.lyMaps[mapName] = cname;
        var lyObj = md.layoutBuild(md, cname);
        var posObj = md.getRectObj(cname, md.layouts);
        lyObj.elemId = posObj.fhid;
        lyObj.mdClass.create(posObj.fhid, posObj.x, posObj.y, posObj.w, posObj.h);
        return lyObj;
    }

    newBlock(cname, opts, blockType, blockName) {
        var md = this;
        md.opts.blocks[cname] = { name: blockName, type: blockType, opts: opts };
        md.blockBuild(md, cname);
        var block = md.blocks[cname];
        var posObj = md.getRectObj(block.rname, md.layouts);
        block.create(posObj.fhid, posObj.x, posObj.y, posObj.w, posObj.h);
        return block;
    }

    create(fhid, x, y, w, h) {
        var md = this;
        md.fhid = fhid;
        var st = md.stas;
        var op = md.opts;
        var posObj = {};
        posObj.fhid = fhid;
        posObj.x = x;
        posObj.y = y;
        posObj.w = w;
        posObj.h = h;
        md.posObj = posObj;



        if (this.blockType === "Model") {
            if (this.mdClass.preCreate)
                this.mdClass.preCreate();

            var mdRect = {};
            mdRect.fhid = fhid;
            mdRect.x = x;
            mdRect.y = y;
            mdRect.w = w;
            mdRect.h = h;
            md.mdRect = mdRect;
            //===============
            var layouts = this.layouts;
            var layoutKeys = Object.keys(layouts);
            layoutKeys.sort();
            var blocks = this.blocks;
            var blockKeys = Object.keys(blocks);

            for (var i = 0; i < layoutKeys.length; i++) {
                var cname = layoutKeys[i];
                var lay = layouts[cname];
                var posObj = this.getRectObj(cname, layouts);
                if (!posObj)
                    posObj = mdRect;
                lay.elemId = posObj.fhid;
                var layBlk = blocks[cname];
                if (layBlk && layBlk.opts.basePanel_f) {
                    layBlk.create(posObj.fhid, posObj.x, posObj.y, posObj.w, posObj.h);
                    posObj.fhid = layBlk.elemId;
                    //posObj.x = layBlk.stas.cx;
                    //posObj.y = layBlk.stas.cy;
                    posObj.x = 0;
                    posObj.y = 0;
                    posObj.w = layBlk.stas.cw;
                    posObj.h = layBlk.stas.ch;
                    lay.elemId = posObj.fhid;
                    if (cname === "c")
                        md.elemId = posObj.fhid;
                }
                lay.mdClass.create(posObj.fhid, posObj.x, posObj.y, posObj.w, posObj.h);
            }
            //===============
            for (var i = 0; i < blockKeys.length; i++) {
                var blkCname = blockKeys[i];
                var block = blocks[blkCname];
                if (block.elemId)
                    continue;
                var posObj = this.getRectObj(block.rname, layouts);
                if (!posObj) {
                    posObj = mdRect;
                }
                block.create(posObj.fhid, posObj.x, posObj.y, posObj.w, posObj.h);
            }
            if (this.mdClass.afterCreate)
                this.mdClass.afterCreate();
            return;
        }
        if (this.blockType === "Component") {
            var posObj = {};
            posObj.fhid = fhid;
            posObj.x = x;
            posObj.y = y;
            posObj.w = w;
            posObj.h = h;
            this.mdClass.create(posObj.fhid, posObj.x, posObj.y, posObj.w, posObj.h);
            if (this.mdClass.afterCreate)
                this.mdClass.afterCreate();
        }

    }

    clear(cname, all_f) {
        var self = this;
        if (!cname) {
            var fatherMd = self.fatherMd;
            var child = document.getElementById(self.elemId);
            var parent = document.getElementById(self.fhid);
            if (child && parent)
                parent.removeChild(child);
            if (!fatherMd) {
                return;
            }
            if (self.blockType === "Layout") {
                delete fatherMd.layouts[self.cname];
                delete fatherMd.opts.layouts[self.cname];
                return;
            }
            delete fatherMd.blocks[self.cname];
            delete fatherMd.blockRefs[self.name];
            delete fatherMd.opts.blocks[self.cname];
            return;
        }
        for (var key in self.blocks) {
            if (key.includes(cname + "~")) {
                var kobj = self.blocks[key];
                kobj.clear();
                continue;
            }
            if (key.includes(cname + "#")) {
                var kobj = self.blocks[key];
                kobj.clear();
                continue;
            }
            if (!all_f)
                continue;
            if (key === cname) {
                var kobj = self.blocks[key];
                kobj.clear();
                continue;
            }
        }
        for (var key in self.layouts) {
            if (key.includes(cname + "~")) {
                var kobj = self.layouts[key];
                kobj.clear();
            }
        }
        return;
    }

    clearOptsAll(cname, all_f) {
        this.clearOpts(cname, all_f);
        this.clear(cname);
    }

    clearOpts(cname, all_f) {
        var self = this;
        for (var key in self.opts.blocks) {
            if (key.includes(cname + "~")) {
                delete self.opts.blocks[key];
                continue;
            }
            if (key.includes(cname + "#")) {
                delete self.opts.blocks[key];
                continue;
            }
            if (!all_f)
                continue;
            if (key === cname) {
                delete self.opts.blocks[key];
                continue;
            }
        }
        for (var key in self.opts.layouts) {
            if (key.includes(cname + "~")) {
                delete self.opts.layouts[key];
            }
        }
    }

    clearLayout(cname) {
        var self = this;
        for (var key in self.blocks) {
            if (key === cname)
                continue;
            if (key.includes(cname)) {
                var kobj = self.blocks[key];
                kobj.clear();
            }
        }
        for (var key in self.layouts) {
            if (key === cname)
                continue;
            if (key.includes(cname)) {
                var kobj = self.layouts[key];
                kobj.clear();
            }
        }
        return;
    }

    reCreate(cname, newKvObj) {
        /*
         if (cname) {
         var md = md.blocks[cname];
         if (!md && newKvObj) {
         md = this;
         var lyObj = md.layouts[cname];
         newKvObj.build();
         var posObj = this.getRectObj(cname, md.layouts);
         newKvObj.fatherMd = md;
         newKvObj.cname = cname;
         newKvObj.rname = cname;
         md.blocks[cname] = newKvObj;
         md.blockRefs[newKvObj.name] = newKvObj;
         newKvObj.mdClass.create(posObj.fhid, posObj.x, posObj.y, posObj.w, posObj.h);
         return newKvObj;
         }
         }
         
         * 
         */
        var md = this;
        if (cname) {
            if (newKvObj) {
                md = this;
                var lyObj = md.layouts[cname];
                newKvObj.build();
                var posObj = this.getRectObj(cname, md.layouts);
                newKvObj.fatherMd = md;
                newKvObj.cname = cname;
                newKvObj.rname = cname;
                md.blocks[cname] = newKvObj;
                md.blockRefs[newKvObj.name] = newKvObj;
                newKvObj.mdClass.create(posObj.fhid, posObj.x, posObj.y, posObj.w, posObj.h);
                return newKvObj;
            } else {
                var mdRect = this.getRectObj(cname, md.layouts);
                var layouts = this.layouts;
                var layoutKeys = Object.keys(layouts);
                layoutKeys.sort();
                var blocks = this.blocks;
                var blockKeys = Object.keys(blocks);
                for (var i = 0; i < layoutKeys.length; i++) {
                    var ccname = layoutKeys[i];
                    if (ccname === cname)
                        continue;
                    if (!ccname.includes(cname))
                        continue;
                    var lay = layouts[ccname];
                    var posObj = this.getRectObj(ccname, layouts);
                    if (!posObj)
                        posObj = mdRect;
                    lay.elemId = posObj.fhid;
                    var layBlk = blocks[ccname];
                    if (layBlk && layBlk.opts.basePanel_f) {
                        layBlk.create(posObj.fhid, posObj.x, posObj.y, posObj.w, posObj.h);
                        posObj.fhid = layBlk.elemId;
                        posObj.x = 0;
                        posObj.y = 0;
                        posObj.w = layBlk.stas.cw;
                        posObj.h = layBlk.stas.ch;
                        lay.elemId = posObj.fhid;
                        if (cname === "c")
                            md.elemId = posObj.fhid;
                    }
                    lay.mdClass.create(posObj.fhid, posObj.x, posObj.y, posObj.w, posObj.h);
                }
                //===============
                for (var i = 0; i < blockKeys.length; i++) {
                    var blkCname = blockKeys[i];
                    if (!blkCname.includes(cname))
                        continue;
                    var block = blocks[blkCname];
                    if (block.elemId)
                        continue;
                    var posObj = this.getRectObj(block.rname, layouts);
                    if (!posObj) {
                        posObj = mdRect;
                    }
                    block.create(posObj.fhid, posObj.x, posObj.y, posObj.w, posObj.h);
                }
                if (this.mdClass.afterCreate)
                    this.mdClass.afterCreate();
                return;
            }
        } else {
            var md = this;
            var posObj = md.posObj;
            var fatherMd = md.fatherMd;
            var cname = md.cname;
            var rname = md.rname;
            var className = md.constructor.name;

            var name = md.name;
            var type = md.type;
            var nopts = {};
            md.opts.blocks = {};
            KvLib.deepCoverObject(nopts, md.opts);
            md.clear();
            var newMd = eval("new " + className + "(name,type,nopts);");
            //newMd.opts = nopts;
            //newMd.build();
            newMd.fatherMd = fatherMd;
            newMd.cname = cname;
            newMd.rname = rname;
            if (fatherMd) {
                fatherMd.blocks[cname] = newMd;
                fatherMd.blockRefs[name] = newMd;
                if (posObj)
                    newMd.create(posObj.fhid, posObj.x, posObj.y, posObj.w, posObj.h);
                else {
                    var ii = 0;
                }
            } else {
                newMd.create(posObj.fhid, posObj.x, posObj.y, posObj.w, posObj.h);
                if (posObj.fhid === "rootBody")
                    gr.mdMain = newMd;
            }
            return newMd;
        }
    }

    layoutBuild(md, cname) {
        var lyOpObj = md.opts.layouts[cname];
        var kvObj = new Block(lyOpObj.name, lyOpObj.type, lyOpObj.opts);
        md.layouts[cname] = kvObj;
        md.layouts[cname].fatherMd = md;
        md.layouts[cname].cname = cname;
        md.layouts[cname].rname = cname.split("#")[0];
        md.layoutRefs[kvObj.name] = md.layouts[cname];
        return kvObj;
    }
    blockBuild(md, cname) {
        var kvOpObj = md.opts.blocks[cname];
        var kvObj = new Block(kvOpObj.name, kvOpObj.type, kvOpObj.opts);
        md.blocks[cname] = kvObj;
        md.blocks[cname].fatherMd = md;
        md.blocks[cname].cname = cname;
        md.blocks[cname].rname = cname.split("#")[0];
        md.blockRefs[kvObj.name] = md.blocks[cname];
        return kvObj;
    }

    build() {
        var md = this;
        this.mdClass.build();
        //======================================================================
        for (var cname in md.opts.layouts) {
            this.layoutBuild(md, cname);
        }
        for (var cname in md.opts.blocks) {
            this.blockBuild(md, cname);
        }
        //======================================================================
    }

    buildPart(cname) {
        var md = this;
        //======================================================================
        for (var ccname in md.opts.layouts) {
            if (ccname === cname)
                continue;
            if (!ccname.includes(cname))
                continue;
            this.layoutBuild(md, ccname);
        }
        for (var ccname in md.opts.blocks) {
            if (!ccname.includes(cname))
                continue;
            this.blockBuild(md, ccname);
        }
        //======================================================================
    }

    setFarme(opts) {
        var op = this.opts;
        opts.borderWidth = op.borderWidth;
        opts.outsideShadowBlur = op.outsideShadowBlur;
        opts.outsideShadowOffx = op.outsideShadowOffx;
        opts.outsideShadowOffy = op.outsideShadowOffy;
        opts.outsideShadowColor = op.outsideShadowColor;
        opts.borderColor = op.borderColor;
        opts.color = op.baseColor;
    }
}




class Cp_base {
    static init() {
        var i = 0;
    }
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);
        return opts;
    }
    afterCreate() {
        var self = this;
        var md = self.md;
        md.setInputWatch(md, "directName", "gr.flashColor0", "innerTextColor", 0);
    }
    build() {
    }
    chkWatch() {
        var md = this.md;
        if (md.watch["innerTextColor"]) {
            var elem = md.elems["base"];
            elem.style.color = md.opts.innerTextColor;
            delete md.watch["innerTextColor"];
        }
    }

    setHeadIcon(elem) {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        if (!st.headIconWidth)
            return;
        var iconElem = document.createElement("div");
        iconElem.id = this.kid + "~headIcon";
        st.headIconElemId = iconElem.id;
        iconElem.style.position = "absolute";
        iconElem.style.overflow = "hidden";
        //=====================================
        var xx = (st.cw - st.fontSizeObj.w) / 2;
        var yy = (st.ch - st.fontSizeObj.h) / 2;
        if (op.textAlign === "left") {
            xx = st.headIconLpd;
        }
        iconElem.style.left = (xx) + "px";
        iconElem.style.top = (yy) + "px";
        iconElem.style.width = (st.headIconWidth) + "px";
        iconElem.style.height = (st.fontSizeObj.h) + "px";
        iconElem.style.backgroundColor = "rgba(0,0,0,0)";
        iconElem.style.backgroundRepeat = "no-repeat"; //重複、水平重複、垂直重複、不要重複;;
        iconElem.style.pointerEvents = "none";
        var inx = op.backgroundInx;
        if (!inx)
            inx = 0;
        iconElem.style.backgroundImage = "url('" + op.imageUrls[inx] + "')";
        iconElem.style.backgroundSize = "contain";
        iconElem.style.backgroundPosition = "center";
        if (op.headIconPosition)
            iconElem.style.backgroundPosition = op.headIconPosition;
        elem.appendChild(iconElem);
        md.elems["headIcon"] = iconElem;
    }

    setCheckBox(elem) {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        if (!st.checkBoxWidth)
            return;
        md.checkBoxClick = function () {
            if (op.readOnly_f)
                return;
            var checkElem = md.elems["checkBox"];
            if (md.opts.radioName) {
                checkElem.checked = true;
                return;
            }
            if (checkElem.checked)
                checkElem.checked = false;
            else
                checkElem.checked = true;
        };
        var sonElem = document.createElement("input");
        if (op.radioName) {
            sonElem.type = "radio";
            sonElem.name = op.radioName;
        } else {
            sonElem.type = "checkbox";
        }
        sonElem.id = md.kid + "~checkBox";
        st.checkBoxElemId = sonElem.id;
        sonElem.style.position = "absolute";
        sonElem.style.overflow = "hidden";
        if (op.pointerEvents)
            sonElem.style.pointerEvents = op.pointerEvents;
        //=====================================
        var yy = (st.ch - st.fontSizeObj.h) / 2;
        if (op.textAlign === "center") {
            var xx = (st.cw - st.fontSizeObj.w) / 2;
        } else {
            var xx = 0;
        }
        sonElem.style.left = (xx) + "px";
        sonElem.style.top = (yy) + "px";
        sonElem.style.width = (st.checkBoxWidth) + "px";
        sonElem.style.height = (st.fontSizeObj.h - 5) + "px";
        sonElem.style.backgroundColor = "rgba(0,0,0,0)";
        sonElem.style.pointerEvents = "none";

        if (op.checked_f)
            sonElem.checked = true;
        sonElem.md = md;
        elem.appendChild(sonElem);
        md.elems["checkBox"] = sonElem;
    }

    setInputText(elem) {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        if (md.subType0 !== "inputText")
            return;
        var sonElem = document.createElement("input");
        sonElem.type = "text";
        sonElem.id = md.kid + "~inputText";
        st.inputTextElemId = sonElem.id;
        sonElem.style.position = "absolute";
        sonElem.style.overflow = "hidden";
        //=====================================
        st.titleWidth = st.fontSizeObj.w;
        if (op.titleWidth)
            st.titleWidth = KvLib.transUnit(op.titleWidth, 100, st.cw, st.ch);
        var yy = (st.ch - st.fontSizeObj.h) / 2;
        var xx = st.titleWidth + st.lpd + st.rpd;
        var paddingLeft = KvLib.setValue(op.inputPaddinLeft, 10);
        sonElem.style.left = (xx) + "px";
        sonElem.style.top = (0) + "px";
        sonElem.style.width = (st.cw - st.titleWidth - 6 - paddingLeft) + "px";
        sonElem.style.height = (st.ch - 6) + "px";
        sonElem.style.fontSize = KvLib.transUnit(op.editFontSize, 20, st.cw, st.ch) + "px";
        sonElem.autocomplete = "none";
        if (op.editBaseColor)
            sonElem.style.backgroundColor = op.editBaseColor;
        sonElem.name = md.kid + Math.floor(Date.now() / 1000);//停用自動填入
        if (op.password_f) {
            sonElem.type = "text";
            sonElem.style["-webkit-text-security"] = "disc";
        }
        if (op.editFontFamily)
            sonElem.style.fontFamily = op.editFontFamily;
        if (op.readOnly_f) {
            sonElem.readOnly = true;
            if (op.editBaseColor)
                sonElem.style.backgroundColor = op.editBaseColor;
            else
                sonElem.style.backgroundColor = "#eee";
        }
        if (op.blur_f)
            sonElem.addEventListener('blur', md.blurFunc);
        //if (op.keyPress_f)
        //    sonElem.addEventListener('keyup', md.keyPressFunc);
        sonElem.value = op.editValue;
        sonElem.md = md;
        sonElem.style.paddingLeft = "10px";

        elem.appendChild(sonElem);
        md.elems["inputText"] = sonElem;
    }

    setTextArea(elem) {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        if (md.subType0 !== "textArea")
            return;
        var sonElem = document.createElement("textArea");
        sonElem.id = md.kid + "~textArea";
        st.inputTextElemId = sonElem.id;
        sonElem.style.position = "absolute";
        sonElem.style.overflow = "hidden";
        //=====================================
        sonElem.style.left = (0) + "px";
        sonElem.style.top = (0) + "px";
        sonElem.style.width = (st.cw) + "px";
        sonElem.style.height = (st.ch) + "px";
        sonElem.style.fontSize = KvLib.transUnit(op.editFontSize, 20, st.cw, st.ch) + "px";
        if (op.editFontFamily)
            sonElem.style.fontFamily = op.editFontFamily;
        if (op.readOnly_f) {
            sonElem.readOnly = true;
            sonElem.style.backgroundColor = "#eee";
        }
        if (op.blur_f)
            sonElem.addEventListener('blur', md.blurFunc);
        if (op.keyPress_f)
            sonElem.addEventListener('keyup', md.keyPressFunc);
        var paddingLeft = KvLib.setValue(op.inputPadding, 4);
        sonElem.value = op.editValue;
        sonElem.md = md;
        sonElem.style.padding = paddingLeft + "px";
        sonElem.style.overflowY = "scroll";
        elem.appendChild(sonElem);
        md.elems["textArea"] = sonElem;
    }

    setEditor(elem) {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        if (md.subType0 !== "editor")
            return;
        var sonElem = document.createElement("div");
        sonElem.id = md.kid + "_editorDiv";
        sonElem.style.position = "absolute";
        sonElem.style.left = 0;
        sonElem.style.top = 0;
        sonElem.style.right = 0;
        sonElem.style.bottom = 0;
        sonElem.style.backgroundColor = op.baseColor;
        sonElem.style.fontSize = op.fontSize;
        sonElem.style.color = op.innerTextColor;
        sonElem.style.textAlign = "left";
        sonElem.style.lineHeight = "1.2em";


        md.elems["editor"] = sonElem;
        elem.appendChild(sonElem);

        var retFunc = function (data) {
            if (!data)
                data = "";
            //var elem = md.elems["editor"];
            //elem.innerHTML = data;
            var mode = "text/plain";
            if (op.exName === "js")
                var mode = "javascript";
            if (op.exName === "css")
                var mode = "css";
            if (op.exName === "html")
                var mode = "htmlmixed";
            if (op.exName === "txt")
                var mode = null;
            if (op.exName === "xml")
                var mode = "application/xml";
            if (op.exName === "json")
                var mode = "application/json";
            if (!op.wrapSize)
                op.wrapSize = 80;

            var hideNo = true;
            if (op.hideNo_f)
                hideNo = false;

            if (op.editType === "CodeMirror") {
                // 使用 CodeMirror 初始化編輯器
                var editor = CodeMirror(md.elems["editor"], {
                    value: data.toString() || "",
                    mode: mode,
                    theme: "monokai",
                    lineNumbers: hideNo,
                    indentUnit: 4,
                    tabSize: 4,
                    indentWithTabs: false,
                    lineWrapping: true,
                    readOnly: op.readOnly_f || false,
                    viewportMargin: Infinity
                });
                if (op.fontSize) {
                    var cmFontSize = op.fontSize;
                    if (typeof cmFontSize === "number")
                        cmFontSize = cmFontSize + "px";
                    editor.getWrapperElement().style.fontSize = cmFontSize;
                }
                editor.setSize("100%", "100%");
                editor.refresh();
                md.objs["editor"] = editor;
                return;
            }

            var editor = ace.edit(md.elems["editor"].id, {
                //maxLines: 30, // 最大行數，超過會自動出現捲軸
                //minLines: 10, // 最小行數，尚未達到最大行數時，編輯器會自動伸縮大小
                fontSize: op.fontSize, // 編輯器內字體大小
                //fontSize: st.fontSize, // 編輯器內字體大小
                theme: "ace/theme/monokai", // 預設主題
                mode: mode, // 預設語言模式
                //value: data.toString(),
                wrap: op.wrapSize, //op.wrapLine,
                //useWrapMode: true,   // 文字自動換行顯示
                indentedSoftWrap: true,
                behavioursEnabled: false, // 停用括號與標籤自動配對
                showLineNumbers: hideNo, // 隱藏行號欄                        

                tabSize: 4 // 將 tab 設為 4 個空格
            });
            //editor.session.setMode("ace/mode/custom");
            //var kkk = editor.session.getMode("ace/mode/custom");
            //var modes = ace.require('ace/ext/modelist');
            if (op.readOnly_f) {
                editor.setReadOnly(true);
                editor.renderer.$cursorLayer.element.style.display = "none";
            } else {
                editor.setReadOnly(false);
            }
            editor.setShowPrintMargin(false);
            //editor.getSession().getValue();
            //editor.setOptions({readOnly: true, highlightActiveLine: false, highlightGutterLine: false});
            editor.setOptions({
                autoScrollEditorIntoView: true,
                copyWithEmptySelection: true
            });

            editor.getSession().setValue(data.toString());
            md.objs["editor"] = editor;

            //var Range = ace.require('ace/range').Range;
            //editor.session.addMarker(new Range(0, 0, 1, 1), "myRedMarker", "fullLine");


        };
        if (op.urls)
            KvLib.getTextFileFromServer(op.urls[op.urlsInx], retFunc);
        else {
            retFunc(op.editValue);
        }

    }

    setContainer(elem) {
        if (this.md.subType0 !== "container")
            return;
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        st.containerWidth = st.cw;
        st.containerHeight = st.ch;
        st.containerBaseId = md.kid;
        return;
    }
    setCanvas(elem) {
        if (this.md.subType0 !== "canvas")
            return;
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        var selem = document.createElement("canvas");
        selem.id = md.kid + "_canvas";
        selem.width = st.cw;
        selem.height = st.ch;
        selem.style.position = "absolute";
        selem.style.left = 0 + "px";
        selem.style.top = 0 + "px";
        selem.style.width = "100%";
        selem.style.height = "100%";
        selem.style.backgroundColor = op.baseColor;
        elem.appendChild(selem);
        md.elems["canvas"] = selem;
        md.opts.canvasId = selem.id;
    }

    setYouTube(elem) {
        if (this.md.subType0 !== "youTube")
            return;
        var md = this.md;
        var op = md.opts;
        if (op.wwwUrls[op.urlsInx]) {
            var url = op.wwwUrls[op.urlsInx];
            var strA = url.split("/");
            var id = strA[strA.length - 1];
            if (!op.startTime)
                op.startTime = 0;
            url += "?start=" + op.startTime;
            if (op.endTime)
                url += "&end=" + op.endTime;
            if (op.autoPlay_f)
                url += "&autoplay=1";
            if (op.controls_f)
                url += "&controls=1";
            if (op.loop_f)
                url += "&loop=1&playlist=" + id;

            this.setIframe(elem, url);
        }
    }

    setUrlReader(elem) {
        if (this.md.subType0 !== "urlReader")
            return;
        var md = this.md;
        var op = md.opts;
        if (op.urls[op.urlsInx]) {
            var url = op.urls[op.urlsInx];
            this.setIframe(elem, url);
        }
    }

    setIframe(elem, url) {
        var md = this.md;
        var op = md.opts;
        var selem = document.createElement("iframe");
        selem.id = md.kid + "_iframe";
        selem.style.position = "absolute";
        selem.style.display = "block";
        selem.style.left = 0 + "px";
        selem.style.top = 0 + "px";
        selem.style.width = "100%";
        selem.style.height = "100%";
        selem.style.backgroundColor = op.baseColor;
        var iframeUrl = url+"?parentElemId=" + md.elemId;
        op.iframeNoCache_f=1;//<debug>iframeNoCache_f=1</debug>
        if (op.iframeNoCache_f !== 0) {
            iframeUrl += (iframeUrl.indexOf("?") >= 0 ? "&" : "?") + "_cb=" + Date.now();
        }
        selem.src = iframeUrl;
        selem.allow = "autoplay";
        elem.appendChild(selem);
        md.elems["iframe"] = selem;
        md.opts.iframeId = selem.id;
    }

    setInputRange(elem) {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        if (md.subType0 !== "inputRange")
            return;
        md.inputBoxClick = function () {
        };
        var sonElem = document.createElement("input");
        sonElem.type = "range";
        sonElem.id = md.kid + "~inputRange";
        st.inputTextElemId = sonElem.id;
        sonElem.min = op.min;
        sonElem.max = op.max;
        sonElem.value = op.editValue;
        sonElem.style.position = "absolute";
        sonElem.style.overflow = "hidden";
        //=====================================
        st.titleWidth = st.fontSizeObj.w;
        if (op.titleWidth)
            st.titleWidth = KvLib.transUnit(op.titleWidth, 100, st.cw, st.ch);
        var yy = (st.ch - st.fontSizeObj.h) / 2;
        var xx = st.titleWidth + st.lpd + st.rpd;
        sonElem.style.left = (xx) + "px";
        sonElem.style.top = (0) + "px";
        sonElem.style.width = (st.cw - st.titleWidth - 6) + "px";
        sonElem.style.height = (st.ch - 6) + "px";
        sonElem.addEventListener('input', md.valueChangeFunc);
        sonElem.md = md;
        elem.appendChild(sonElem);
        md.elems["inputRange"] = sonElem;
    }

    create(fhid, x, y, w, h) {
        var felem = document.getElementById(fhid);
        if (!felem)
            return;
        //=======================================
        var self = this;
        var md = self.md;
        var st = md.stas;
        var op = md.opts;
        md.transData(fhid, x, y, w, h);
        var preCreateFunc = KvLib.getFunc(op.preCreateFunc);
        if (preCreateFunc) {
            preCreateFunc(md);
        }
        //=====================================
        if ("setBaseElem") {
            if (md.subType0 === "none")
                return;
            var elem = document.createElement("div");
            elem.id = md.kid;
            md.elemId = elem.id;
            st.baseElemId = elem.id;
            elem.setAttribute("tabIndex", "-1");
            elem.style.position = "absolute";
            elem.style.overflow = "hidden";
            if (op.pointerEvents)
                elem.style.pointerEvents = op.pointerEvents;
            //=====================================
            st.ex = st.cx + st.offx;
            st.ey = st.cy + st.offy;
            elem.style.left = (st.ex) + "px";
            elem.style.top = (st.ey) + "px";
            elem.style.width = (st.cw) + "px";
            elem.style.height = (st.ch) + "px";
            if (op.zIndex)
                elem.style.zIndex = "" + op.zIndex;
            if (op.hidden_f)
                elem.style.visibility = "hidden";
            //=====================================
            elem.style.userSelect = "none";
            //=====================================
            if (op.cursor) {
                if (!op.disable_f)
                    elem.style.cursor = op.cursor;
            }
            if (op.hint) {
                if (op.hint !== "kvd:disable") {
                    elem.title = op.hint;
                }
            } else {
                if (st.fontSizeObj) {
                    if ((st.fontSizeObj.w) > st.cw)
                        elem.title = st.innerText;
                }
            }


            //=====================================
            md.setInnerText(elem);
            md.setBorder(elem);
            md.setBackground(elem);
            md.setBoxShadow(elem);
            md.setAction(elem);
            self.setHeadIcon(elem);
            self.setCheckBox(elem);
            self.setInputText(elem);
            self.setInputRange(elem);
            self.setTextArea(elem);
            if (op.styles) {
                var styles = self.parseStyles(op.styles);
                if (styles && styles.base) {
                    KvLib.deepCoverObject(elem.style, styles.base);
                }
            }
            elem.md = md;
            felem.appendChild(elem);
            md.elems["base"] = elem;
            self.setEditor(elem);
            self.setContainer(elem);
            self.setCanvas(elem);
            self.setYouTube(elem);
            self.setUrlReader(elem);

        }


    }
}












class Ly_base {
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);
        opts.xc = 1;
        opts.yc = 1;
        opts.userLys = [];
        opts.pns = {};
        return opts;
    }
    build() {
    }

    create(fhid, x, y, w, h) {
        var felem = document.getElementById(fhid);
        if (!felem)
            return;
        //=======================================
        var self = this;
        var md = self.md;
        var st = md.stas;
        var op = md.opts;
        self.fhid = fhid;
        md.transData(fhid, x, y, w, h);
        st.ew = KvLib.transUnit(op.ew, 0, st.rw, st.rh);
        st.eh = KvLib.transUnit(op.eh, 0, st.rw, st.rh);


        //=====================================
        st.rects = [];
        if (md.subType0 === "array") {
            if (!op.xc)
                op.xc = 1;
            if (!op.yc)
                op.yc = 1;
            st.layoutAmt = op.xc * op.yc;
            var ew = (st.cw - st.xm * (op.xc - 1)) / op.xc;
            var eh = (st.ch - st.ym * (op.yc - 1)) / op.yc;
            if (st.ew) {
                if (st.ew < ew) {
                    if (op.wAlign === "center") {
                        ew = st.ew;
                        var ncw = ew * op.xc + st.xm * (op.xc - 1);
                        st.cx += (st.cw - ncw) / 2;
                    }
                    if (op.wAlign === "right") {
                        ew = st.ew;
                        var ncw = ew * op.xc + st.xm * (op.xc - 1);
                        st.cx += (st.cw - ncw);
                    }
                }
            }
            if (st.eh) {
                if (st.eh < eh) {
                    if (op.hAlign === "center") {
                        eh = st.eh;
                        var nch = eh * op.yc + st.ym * (op.yc - 1);
                        st.cy += (st.ch - nch) / 2;
                    }
                    if (op.hAlign === "bottom") {
                        eh = st.eh;
                        var nch = eh * op.yc + st.ym * (op.yc - 1);
                        st.cy += (st.ch - nch);
                    }



                }
            }


            var k = 0;
            for (var j = 0; j < op.yc; j++) {
                for (var i = 0; i < op.xc; i++) {
                    var box = {};
                    var userLy = op.userLys[md.name + "~" + k];
                    if (userLy) {
                        box.x = KvLib.transUnit(userLy.x, 0, st.cw, st.ch);
                        box.y = KvLib.transUnit(userLy.y, 0, st.cw, st.ch);
                        box.w = KvLib.transUnit(userLy.w, 0, st.cw, st.ch);
                        box.h = KvLib.transUnit(userLy.h, 0, st.cw, st.ch);
                        if (box.w >= 9999)
                            box.w = st.cw + box.w - 9999;
                        if (box.h >= 9999)
                            box.h = st.ch + box.h - 9999;

                        box.z = userLy.z;
                    } else {
                        box.x = st.cx + ew * i;
                        if (i > 0)
                            box.x += st.xm * i;
                        box.w = ew;
                        box.y = st.cy + eh * j;
                        if (j > 0)
                            box.y += st.ym * j;
                        box.h = eh;
                        box.z = 0;
                    }
                    st.rects.push(box);
                    k++;
                }
            }
        }
        if (md.subType0 === "xyArray") {
            var yArr = op.yArr;
            var xArr = op.xArr;
            var xyArr = op.xyArr;
            for (; ;) {
                if (!yArr && !xArr) {
                    yArr = [9999];
                    xyArr = [[9999]];
                    break;
                }
                if (yArr && !xArr) {
                    if (!xyArr) {
                        xyArr = [];
                        for (var i = 0; i < yArr.length; i++)
                            xyArr.push([9999]);
                    }
                    break;
                }
                if (xArr && !yArr) {
                    yArr = [9999];
                    xyArr = [xArr];
                    break;
                }
                break;
            }

            var k = 0;
            var nowY = st.cy;
            st.layoutAmt = 0;
            var hs = KvLib.getAllUnit(yArr, 0, st.ch, st.ym);
            for (var i = 0; i < hs.length; i++) {
                if (!xyArr[i])
                    continue;
                var nowX = st.cx;
                var ws = KvLib.getAllUnit(xyArr[i], 0, st.cw, st.xm);
                for (var j = 0; j < ws.length; j++) {
                    var box = {};
                    box.x = nowX;
                    box.y = nowY;
                    box.w = ws[j];
                    box.h = hs[i];
                    st.rects.push(box);
                    nowX += st.xm + box.w;
                    k++;
                    st.layoutAmt++;
                }
                nowY += st.ym + hs[i];
            }
        }

    }
}
