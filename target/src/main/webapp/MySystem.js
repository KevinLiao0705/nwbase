/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global gr, KvLib, Kext, Component, ani, MyPlot, InitOpts */

//################################################################################
class MySystem {
    constructor() {
    }
    webInit() {
        // 依目前視窗大小重置根容器，並清除舊畫面狀態。
        var gr = window.gr;
        var elem = document.getElementById('rootBody');
        //===========================================================
        elem.style.width = gr.clientW + 'px';
        elem.style.height = gr.clientH + 'px';
        elem.innerHTML = "";
        //============================================================
        gr.mouseFuncPara = null;
        //============================================================
        gr.scrollWidth = KvLib.getScrollbarWidth();
        //=======================================================
    }

    dispWebPage(modelType) {
        // 依 appPageCnt 控制頁面流程：Logo -> Login -> 主畫面。
        var self = this;
        let gr = window.gr;
        if (modelType)
            gr.nowAppType = modelType;
        else
            gr.nowAppType = gr.appType;
        self.webInit();
        gr.mdSystem = new Block("mdSystem", "Model~MdaPopWin~sys0", {});
        gr.mdSystem.create("rootBody", -1000, -1000, 0, 0);
        if (gr.appPageCnt === 0) {
            if (gr.showLogo_f) {
                var opts = {};
                opts.actionFunc = function () {
                    console.log("logoTimeUp");
                    gr.appPageCnt = 1;
                    self.dispWebPage();
                    return;
                };
                gr.mdMain = mac.showLogo(opts);
                gr.mdMain.create("rootBody");
                return;
            }
            gr.appPageCnt = 1;
        }
        if (gr.appPageCnt === 1) {
            if (gr.enabelLogin_f) {
                var opts = {};
                gr.mdMain = mac.loginBox(opts);
                if (gr.mdMain)
                    gr.mdMain.create("rootBody");
                return;

            }
            gr.appPageCnt = 2;
            self.dispWebPage();
            return;
        }
        if (gr.appPageCnt === 2) {
            var opts = {};
            opts.actionFunc = function (iobj) {
                console.log(iobj);
            };
            gr.mdMain = new Block("mdMain", gr.nowAppType, opts);
            gr.mdMain.create("rootBody");
            return;
        }





    }

    repaint(para)
    {
        // 監看視窗尺寸變化，必要時觸發整頁重繪。
        var self = this;
        var gr = window.gr;
        var repaint_f = gr.repaint_f;
        gr.repaint_f = 0;
        while (1) {
            if (gr.window_innerWidth_old !== window.innerWidth)
            {
                gr.window_innerWidth_old = window.innerWidth;
                repaint_f = 1;
                console.log("window.innerWidth change");
            }
            if (gr.window_innerHeight_old !== window.innerHeight)
            {
                gr.window_innerHeight_old = window.innerHeight;
                repaint_f = 1;
                console.log("window.innerHeight change");
            }
            if (gr.window_innerHeight_old === -1 || gr.window_innerWidth_old === -1)
                repaint_f = 0;
            break;
        }
        gr.clientH = window.innerHeight - 1;
        gr.clientW = window.innerWidth - 1;
        //======================================================
        if (para === 1)
            repaint_f = 1;
        if (repaint_f !== 0)
            self.dispWebPage();

    }

    //period= Animate.period, unit: ms, about 16ms.
    baseTimer() {
        // 系統主循環：更新閃爍狀態、定時器、重繪與動畫檢查。
        var self = window.sys;
        if (!self.baseTimerCnt)
            self.baseTimerCnt = 0;
        self.baseTimerCnt++;
        self.baseTimerFlag = self.baseTimerCnt ^ self.baseTimerBuf;
        self.baseTimerBuf = self.baseTimerCnt;
        if (self.baseTimerFlag & 0x10)
            gr.flash_f ^= 1;
        if (gr.flash_f)
            gr.flashColor0 = "#fff";
        else
            gr.flashColor0 = "#000";

        var nowTime = performance.now();
        var deltaTime = nowTime - self.sysTimerNow;
        self.sysTimerNow = nowTime;
        if (deltaTime > 30)
            console.log("baseTimer Over 30ms: " + deltaTime.toFixed(2));
        //=================

        if (gr.footBarMessageTime) {
            gr.footBarMessageTime--;
            if (gr.footBarMessageTime === 0) {
                gr.footBarMessageText = "";
            }
        }


        self.repaint(0);

        gr.gbcs.timer();

        if (gr.mdMain) {
            gr.mdMain.chkWatch();
        }
        if (gr.mdSystem)
            gr.mdSystem.chkWatch();
        ani.check();
        if (this.hintKvObj) {
            var elem = document.getElementById(this.hintKvObj);
            if (!elem) {
                self.delKvHint();
            }
        }
    }

    sysTimer() {
        // 輕量計時器：保留給測試/診斷用的節拍。
        var self = window.sys;
        self.sysTimerCnt++;
        self.sysTimerFlag = self.sysTimerCnt ^ self.sysTimerBuf;
        self.sysTimerBuf = self.sysTimerCnt;
        if (self.sysTimerFlag & 0x10)
            gr.flash_f ^= 1;
        var nowTime = performance.now();
        var deltaTime = nowTime - self.sysTimerNow;
        self.sysTimerNow = nowTime;
        if (deltaTime > 30)
            console.log(deltaTime.toFixed(2));
        //if (gr.ws)
        //    gr.ws.send("testData");
    }

    setKvHint(kvObj, hint) {
        // 顯示元件提示訊息，並以動畫方式淡入與定位。
        var len = ani.animates.length;
        for (var i = len - 1; i >= 0; i--) {
            var aobj = ani.animates[i];
            if (aobj.elemId === "hintId") {
                ani.animates.splice(i, 1);
            }
        }
        var elem = kvObj.elems["base"];
        if (!elem)
            return;
        var pos = KvLib.getPosition(elem);
        var size = KvLib.hint(hint, -9999, pos.y);
        this.hintKvObj = kvObj.elems["base"].id;
        size.w += 4;

        var stx = pos.x + kvObj.stas.rw - size.w;
        var endx = stx + size.w;
        if ((endx + size.w) > gr.clientW) {
            stx = pos.x;
            endx = stx - size.w;
        }

        ani.setT("hintId", "moveX", endx, endx, 200, 1000);
        ani.setT("hintId", "opacity", 0, 1, 200, 1000);
    }
    delKvHint() {
        // 刪除目前提示框並清空關聯狀態。
        var hint = document.getElementById("hintId");
        if (hint) {
            document.body.removeChild(hint);
        }
        this.hintKvObj = null;
    }

    indexLoaded() {
        // index 載入後初始化 rootBody 與動畫計時器，並動態載入 Google Map script。
        //InitOpts.initModelOpts();
        //InitOpts.initComponentOpts();
        //MyPlot.init();
        var elem = document.getElementById("rootBody");
        elem.style.position = "absolute";
        elem.style.overflow = "hidden";
        elem.style.backgroundColor = gr.baseColor;
        elem.style.left = "0px";
        elem.style.top = "0px";
        elem.style.width = window.innerWidth + "px";
        elem.style.height = window.innerHeight + "px";
        ani.setTimer();
        //gr.googleMapKeys = ["AIzaSyDOlTL0xvlXJGN1gnqcV4zxEPhQW5rmd8Q"];
        for (let k = 0; k < gr.googleMapKeys.length; k++) {
            var script = document.createElement('script');
            //script.src = "https://maps.googleapis.com/maps/api/js?key=" + gr.googleMapKeys[k];//AIzaSyDOlTL0xvlXJGN1gnqcV4zxEPhQW5rmd8Q
            script.src = "https://maps.googleapis.com/maps/api/js?key=" + gr.googleMapKeys[k] + "&callback=initMap";
            document.head.appendChild(script); //or something of the likes            
        }
        //gr.sysTimerId = setInterval(sys.sysTimer, 20);
    }

    setIpObj(type, inputName, optName) {
        // 建立輸入參數描述物件，供後續監看與更新流程使用。
        var ipObj = {};
        ipObj.type = type;
        ipObj.inputName = inputName;
        ipObj.optName = optName;
        ipObj.period = 1;
        ipObj.cnt = 0;
        return ipObj;
    }

    setWatch(self, optsName, value) {
        // 標記指定欄位需重繪；innerText 例外避免不必要重繪。
        //self.watch["_sysReDraw_f"] = 1;
        if (optsName !== "innerText")
            self.watch["_sysReDraw_f"] = 1;
        self.watch[optsName] = 1;
        /*
         if (value !== undefined)
         self.opts[optsName] = value;
         */
    }
    setReDraw(self, optsName, value) {
        // 強制觸發重繪，並可選擇同步更新 opts 的值。
        self.watch["_sysReDraw_f"] = 1;
        if (!optsName)
            return;
        self.watch[optsName] = 1;
        if (value !== undefined)
            self.opts[optsName] = value;
    }

}


var sys = new MySystem();


class Kext {
    constructor(_id, _title, _chinese, _opts) {
        // 多語系文字容器：保存標題、子標、描述與提示等語言內容。
        this.type = "kext";
        this.id = _id;
        this.text = {};
        this.text.english = _title;
        this.text.chinese = _chinese;
        this.sub = {};
        this.dsc = {};
        this.hint = {};
        if (_opts) {
            this.preText = _opts.preText;
            this.afterText = _opts.afterText;
            this.hint["english"] = _opts.enHint;
            this.hint["chinese"] = _opts.chHint;
            this.sub["english"] = _opts.enSub;
            this.sub["chinese"] = _opts.chSub;
            this.dsc["english"] = _opts.enDsc;
            this.dsc["chinese"] = _opts.chDsc;
        }
        /*
         var obj=this.obj={};
         obj.id=this.id;
         obj.type=this.type;
         obj.text=this.text;
         obj.sub=this.sub;
         obj.hint=this.sub;
         obj.desc=this.sub;
         * 
         */



    }
    static newEzStr(en, ch, id) {
        // 快速建立 kext JSON 字串。
        var obj = {};
        obj.type = "kext";
        var text = obj.text = {};
        text["english"] = en;
        text["chinese"] = ch;
        if (id)
            obj.id = id;
        return JSON.stringify(obj);
    }

    static newEzObj(en, ch, id) {
        // 快速建立 kext 物件。
        var obj = {};
        obj.type = "kext";
        var text = obj.text = {};
        text["english"] = en;
        text["chinese"] = ch;
        if (id)
            obj.id = id;
        return obj;
    }

    static chkKextStr(kextStr) {
        // 驗證字串是否為合法 kext JSON。
        try {
            var kextObj = JSON.parse(kextStr);
            if (kextObj.type === "kext")
                return kextObj;
            return;
        } catch (e) {
            return;
        }
    }

    static getText(kext) {
        // 依目前語言取文字，無對應時回退到英文。
        var value = kext.text[gr.language];
        if (!value)
            value = kext.text["english"];
        if (!value)
            value = "";
        return value;
    }

    static getText(kext) {
        var value = kext.text[gr.language];
        if (!value)
            value = kext.text["english"];
        if (!value)
            value = "";
        return value;
    }

    static getSub(kext) {
        // 取得子標文字，語言回退規則同上。
        var value = kext.sub[gr.language];
        if (!value)
            value = kext.sub["english"];
        if (!value)
            value = "";
        return value;
    }
    static getDsc(kext) {
        // 取得描述文字，語言回退規則同上。
        var value = kext.dsc[gr.language];
        if (!value)
            value = kext.dsc["english"];
        if (!value)
            value = "";
        return value;
    }
    static getHint(kext) {
        // 取得提示文字，語言回退規則同上。
        var value = kext.hint[gr.language];
        if (!value)
            value = kext.hint["english"];
        if (!value)
            value = "";
        return value;
    }

}

