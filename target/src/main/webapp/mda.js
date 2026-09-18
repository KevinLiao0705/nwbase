/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
class Mda {
    constructor() {
        // UI 模組入口：管理本檔所有 Mda 類別型別映射與共用工具。
        // 外部可依名稱動態建立對應類別實例。
        this.MdaMenu = "Class";
        this.MdaList = "Class";
        this.MdaListItem = "Class";
        this.MdaContainer = "Class";
        this.MdaScroll = "Class";
        this.MdaPopWin = "Class";
        this.MdaBase = "Class";
        this.MdaBox = "Class";
        this.MdaSelector = "Class";
        this.MdaArray = "Class";
        this.MdaBlockSelect = "Class";
        this.MdaSetLine = "Class";
        this.MdaPad = "Class";
        this.MdaColorPicker = "Class";
        this.MdaBlockView = "Class";
        this.MdaBlocksSelect = "Class";
        this.MdaSetGroup = "Class";
        this.MdaButtons = "Class";
        this.MdaHeadTitle = "Class";
        this.MdaSetNames = "Class";
    }

    setMargin(opts, op) {
        opts.margin = op.margin;
        opts.tm = op.tm;
        opts.lm = op.lm;
        opts.rm = op.rm;
        opts.bm = op.bm;
    }

    setEMargin(opts, op) {
        opts.margin = op.eMargin;
        opts.tm = op.etm;
        opts.lm = op.elm;
        opts.rm = op.erm;
        opts.bm = op.ebm;
    }

    popObj(width, height, kvObj, maskOff_f) {
        // 以遮罩方式彈出指定 kvObj，並記錄目前堆疊層級供關閉時回復。
        kvObj.opts.popStackCnt = gr.mdSystem.mdClass.stackCnt;

        width = KvLib.transUnit(width, 9999, gr.clientW, gr.clientH);
        height = KvLib.transUnit(height, 9999, gr.clientW, gr.clientH);

        if (!width)
            width = 9999;
        if (!height)
            height = 9999;



        var obj = {};
        obj.w = width;
        obj.h = height;
        obj.kvObj = kvObj;
        obj.borderColor = "#fff";
        obj.borderWidth = 1;
        if (maskOff_f) {
            obj.actionFunc = function (iobj) {
                MdaPopWin.popOffTo(kvObj.opts.popStackCnt);
            };
        }
        obj.maskColor = "rgba(0,0,0,0.5)";
        obj.center_f = 1;
        obj.outsideShadowBlur = 10;
        MdaPopWin.popMaskObjA(obj);
    }

    popObjOpts(opts) {
        // 由外部 opts 建立彈窗，支援遮罩點擊即關閉。
        opts.kvObj.opts.popStackCnt = gr.mdSystem.mdClass.stackCnt;
        var obj = {};
        obj.w = 9999;
        obj.h = 9999;
        obj.borderColor = "#fff";
        obj.borderWidth = 1;
        obj.center_f = 1;
        obj.maskColor = "rgba(0,0,0,0.5)";
        obj.maskOff_f = 1;
        KvLib.coverObject(obj, opts);
        if (obj.maskOff_f) {
            obj.actionFunc = function (iobj) {
                MdaPopWin.popOffTo(obj.kvObj.opts.popStackCnt);
            };
        }
        MdaPopWin.popMaskObjA(obj);
    }

    setLineButtonActs(_op) {
        var opts = {};
        opts.actionFunc = function (iobj) {
            console.log(iobj);
        };
        opts.setOpts = sopt.getButtonActs();
        var kvObj = new Block("testSetLine", "Model~MdaSetLine~base.sys0", opts);
        mda.popObj(800, 50, kvObj, 1);
    }

    setLineButtonOnOffs(_op) {
        var opts = {};
        opts.actionFunc = function (iobj) {
            console.log(iobj);
        };
        opts.setOpts = sopt.getButtonOnOffs();
        var kvObj = new Block("testSetLine", "Model~MdaSetLine~base.sys0", opts);
        mda.popObj(800, 50, kvObj, 1);
    }

    setLineButtonSelect(_op) {
        var opts = {};
        opts.setOpts = sopt.getButtonSelect();
        var kvObj = new Block("testSetLine", "Model~MdaSetLine~base.sys0", opts);
        mda.popObj(800, 50, kvObj, 1);
    }

    setLineButtonChecks(_op) {
        var opts = {};
        opts.setOpts = sopt.getButtonChecks();
        var kvObj = new Block("testSetLine", "Model~MdaSetLine~base.sys0", opts);
        mda.popObj(800, 50, kvObj, 1);
    }

    setLineButtonRadio(_op) {
        var opts = {};
        opts.setOpts = sopt.getButtonRadio();
        var kvObj = new Block("testList", "Model~MdaSetLine~base.sys0", opts);
        mda.popObj(800, 50, kvObj, 1);
    }

    setLineIntInputText() {
        var opts = {};
        opts.setOpts = sopt.getIntInputText();
        var kvObj = new Block("testList", "Model~MdaSetLine~base.sys0", opts);
        mda.popObj(800, 50, kvObj, 1);
    }

    setLineStrInputText() {
        var opts = {};
        opts.setOpts = sopt.getStrInputText();
        var kvObj = new Block("testList", "Model~MdaSetLine~base.sys0", opts);
        mda.popObj(800, 50, kvObj, 1);
    }

    setLineIntPassword() {
        var opts = {};
        opts.setOpts = sopt.getIntPassword();
        var kvObj = new Block("testList", "Model~MdaSetLine~base.sys0", opts);
        mda.popObj(800, 50, kvObj, 1);
    }

    setLineTextArea() {
        var opts = {};
        opts.setOpts = sopt.getTextArea();
        var kvObj = new Block("testList", "Model~MdaSetLine~base.sys0", opts);
        mda.popObj(800, 200, kvObj, 1);
    }

    setLineSelect(_op) {
        var opts = {};
        opts.setOpts = sopt.getSelect();
        var kvObj = new Block("testList", "Model~MdaSetLine~base.sys0", opts);
        mda.popObj(800, 50, kvObj, 1);
    }

    setLineInputSelect(_op) {
        var opts = {};
        opts.setOpts = sopt.getInputSelect();
        var kvObj = new Block("testList", "Model~MdaSetLine~base.sys0", opts);
        mda.popObj(800, 50, kvObj, 1);
    }

    setLineLabelViews(_op) {
        var opts = {};
        opts.setOpts = sopt.getLabelViews();
        var kvObj = new Block("testList", "Model~MdaSetLine~base.sys0", opts);
        mda.popObj(800, 50, kvObj, 1);
    }

    popKv(op) {
        // 直接彈出既有 kv 物件，並在動作完成後回收對應 pop stack。
        var actionFunc = function (iobj) {
            console.log(iobj);
            KvLib.exeFunc(op.actionFunc, iobj);
            MdaPopWin.popOffTo(iobj.sender.opts.popStackCnt);
        };
        var opts = {};
        opts.actionFunc = actionFunc;
        //====================================
        if (!op.w)
            op.w = 9999;
        if (!op.h)
            op.h = 9999;
        mda.popObj(op.w, op.h, op.kvObj);
    }

    popKs(op) {
        // 依 name/type/opts 動態建立 Block 再彈出。
        var actionFunc = function (iobj) {
            console.log(iobj);
            KvLib.exeFunc(op.actionFunc, iobj);
            MdaPopWin.popOffTo(iobj.sender.opts.popStackCnt);
        };
        var opts = {};
        opts.actionFunc = actionFunc;
        var kvObj = new Block(op.name, op.type, op.opts);
        //====================================
        if (!op.w)
            op.w = 9999;
        if (!op.h)
            op.h = 9999;
        mda.popObj(op.w, op.h, kvObj, 1);
    }

}

var mda = new Mda();


class MdaMenu {
    constructor() {
    }
    initOpts(md) {
        // 建立選單預設樣式與互動參數。
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);
        opts.menus = dbg.getTestMenus();
        opts.menuHeight = 24;
        opts.menuMaxWidth = 100;
        opts.headIconWidth = 50;
        opts.fontSize = "0.6rh";
        opts.fontWeight = "bold";
        opts.fontFamily = "Arial";
        opts.lpd = 10;
        opts.rpd = 10;
        opts.headIconTextLpd = 0;
        opts.shrinkSpaceX = 4;
        this.subTypeOpts(opts);
        return opts;
    }
    subTypeOpts(opts) {
        // 依子型別切換亮/暗主題色。
        if (this.md.subType === "base.sys0") {
            opts.baseColor = "#ddf";
            opts.innerTextColor = "#333";
            opts.menuOnBaseColor = "#00f";
            opts.menuOnTextColor = "#eee";
            opts.mouseOnBaseColor = "#999";
            opts.mouseOnTextColor = "#000";
        }
        if (this.md.subType === "base.sys1") {
            opts.baseColor = "#224";
            opts.innerTextColor = "#ccc";
            opts.menuOnBaseColor = "#00f";
            opts.menuOnTextColor = "#eee";
            opts.mouseOnBaseColor = "#999";
            opts.mouseOnTextColor = "#000";
        }
    }
    build() {
        // 生成選單主體與各項目，並處理滑鼠互動與子選單彈出。
        var self = this;
        var md = self.md;
        var op = md.opts;
        var lyMaps = md.lyMaps;
        var blocks = op.blocks;
        var layouts = op.layouts;
        //======================================    
        var maskClickFunc = function () {
            MdaPopWin.popOffTo(md.opts.popStackCnt);
            for (var i = 0; i < op.menus.kvTexts.length; i++) {
                var kobj = md.blockRefs["item#" + i];
                kobj.stas.menuOn_f = 0;
                var bElem = kobj.elems["base"];
                bElem.style.backgroundColor = op.baseColor;
                bElem.style.color = op.innerTextColor;
            }
            md.stas.menuOn_f = 0;
        };
        //======================================    
        var cname = "c";
        var opts = {};
        layouts[cname] = { name: cname, type: "Layout~Ly_base~array.sys0", opts: opts };
        lyMaps["body"] = cname;
        var opts = {};
        md.setPns(opts);
        opts.actionFunc = maskClickFunc;
        blocks[cname] = { name: "basePanel", type: "Component~Cp_base~plate.none", opts: opts };

        //======================================    

        /*
         var cname = lyMaps["body"] + "~" + 0;
         var opts = {};
         opts.actionFunc = maskClickFunc;
         opts.baseColor="rgba(0,0,0,0)";
         blocks[cname] = {name: "itemBase", type: "Component~Cp_base~button.none", opts: opts};
         */

        //======================================    
        var inx = 0;
        for (var i = 0; i < op.menus.kvTexts.length; i++) {
            var cname = lyMaps["body"] + "~" + 0 + "#" + inx;
            var opts = {};
            opts.wAlign = "left";
            var kvText = KvLib.getKvText(op.menus.kvTexts[i]);
            opts.id = kvText.id;
            opts.innerText = kvText;
            opts.shrinkX_f = 1;
            opts.shrinkSpaceX = op.shrinkSpaceX;
            opts.textAlign = "left";
            opts.fontSize = op.fontSize;
            opts.fontWeight = op.fontWeight;
            opts.fontFamily = op.fontFamily;
            opts.maxW = op.menuMaxWidth;
            opts.lpd = op.lpd;
            opts.rpd = op.rpd;
            if (kvText.image) {
                opts.headIconWidth = op.headIconWidth;
                opts.headIconLpd = op.lpd;
                opts.headIconPosition = "left";
                opts.imageUrls = [kvText.image];
                opts.backgroundImagePosition = "extend";
                opts.lpd = op.headIconTextLpd - 12;
            }
            opts.preCreateFunc = function (smd) {
                var strA = smd.name.split("#");
                var itemCnt = KvLib.toInt(strA[1], 0);
                if (!itemCnt)
                    return;
                itemCnt--;
                var fmd = smd.fatherMd;
                var pmd = fmd.blockRefs["item#" + itemCnt];
                if (pmd.stas.headIconWidth)
                    smd.stas.offx = pmd.stas.ex + pmd.stas.cw + pmd.stas.headIconLpd + pmd.stas.lpd + pmd.stas.rpd - 6;
                else
                    smd.stas.offx = pmd.stas.ex + pmd.stas.cw + pmd.stas.lpd + pmd.stas.rpd + pmd.opts.shrinkSpaceX;
            };
            opts.mouseOver_f = 1;
            opts.mouseOut_f = 1;
            opts.mouseClick_f = 1;
            opts.actionFunc = function (iobj) {
                var baseElem = iobj.kvObj.elems["base"];
                if (iobj.act === "mouseOver") {
                    if (md.stas.menuOn_f) {
                        maskClickFunc();
                        md.stas.menuOn_f = 0;
                        iobj.act = "mouseOverClick";
                    } else {
                        baseElem.style.backgroundColor = op.mouseOnBaseColor;
                        baseElem.style.color = op.mouseOnTextColor;
                        iobj.kvObj.stas.menuOn_f = 0;
                        return;
                    }
                }
                if (iobj.act === "mouseOut") {
                    if (!md.stas.menuOn_f) {
                        baseElem.style.backgroundColor = op.baseColor;
                        baseElem.style.color = op.innerTextColor;
                        iobj.kvObj.stas.menuOn_f = 0;
                    }
                    return;
                }
                if (iobj.act === "mouseClick" || iobj.act === "mouseOverClick") {
                    if (iobj.kvObj.stas.menuOn_f) {
                        maskClickFunc();
                        baseElem.style.backgroundColor = op.mouseOnBaseColor;
                        baseElem.style.color = op.mouseOnTextColor;
                        return;
                    }
                    console.log(iobj);
                    var strA = iobj.kvObj.name.split("#");
                    var inx = KvLib.toInt(strA[1], 0);
                    var kvText = KvLib.getKvText(op.menus.kvTexts[inx]);
                    if (!kvText.menus) {
                        iobj.itemId = op.menus.id + "~" + kvText.id;
                        iobj.keyId = op.menus.id + "~" + kvText.id;
                        KvLib.exeFunc(op.actionFunc, iobj);
                        return;
                    }
                    md.stas.menuOn_f = 1;
                    baseElem.style.backgroundColor = op.menuOnBaseColor;
                    baseElem.style.color = op.menuOnTextColor;
                    iobj.kvObj.stas.menuOn_f = 1;
                    //========================================================
                    var elemId = md.layouts["c"].elemId;
                    var elem = document.getElementById(elemId);
                    var rect = md.layouts["c"].stas.rects[0];
                    var pos = KvLib.getPosition(elem);
                    var box = { x1: pos.x, y1: pos.y, x2: pos.x + rect.w, y2: pos.y + rect.h };
                    md.opts.popStackCnt = gr.mdSystem.mdClass.stackCnt;
                    var obj = {};
                    obj.box = box;
                    obj.maskColor = "rgba(0,0,0,0)";
                    //obj.maskColor = "#f00";
                    obj.actionFunc = maskClickFunc;
                    MdaPopWin.popMaskAround(obj);
                    //========================================================
                    var ebox = KvLib.getPosition(baseElem);
                    ebox.x2 = iobj.kvObj.stas.cw + ebox.x;
                    ebox.y2 = iobj.kvObj.stas.ch + ebox.y;
                    var opts = {};
                    opts.actionFunc = function (iobj) {
                        console.log(iobj);
                        maskClickFunc();
                        iobj.sender = md;
                        KvLib.exeFunc(op.actionFunc, iobj);
                    };
                    opts.menus = kvText.menus;
                    var kvObj = new Block(md.name + "~" + kvText.id, "Model~MdaList~base." + md.subType1, opts);
                    kvObj.stas.listSize = kvObj.mdClass.getListSize(kvObj.setOpts);
                    var obj = {};
                    obj.x = ebox.x;
                    obj.y = ebox.y2;
                    obj.w = kvObj.stas.listSize.w;
                    obj.h = kvObj.stas.listSize.h;
                    if ((obj.x + obj.w) >= (gr.clientW - 2))
                        obj.x = gr.clientW - obj.w - 2;

                    obj.kvObj = kvObj;
                    obj.center_f = 0;
                    obj.outsideShadowBlur = 10;

                    MdaPopWin.popObj(obj);
                }
            };
            opts.baseColor = op.baseColor;
            opts.borderColor = op.baseColor;
            opts.innerTextColor = op.innerTextColor;
            blocks[cname] = { name: "item#" + inx, type: "Component~Cp_base~button.menu0", opts: opts };
            inx++;
        }
    }
}

class MdaList {
    // 清單元件：負責項目尺寸估算、滑鼠互動與子清單彈出。
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);
        opts.headIconWidth = 20;
        opts.hotkeyWidth = 50;
        opts.nextIconWidth = 20;
        opts.listHeight = 24;
        opts.lineHeight = 1;
        opts.lineSpace = 2;
        opts.lpd = 2;
        opts.baseColor = "#ddd";
        opts.borderWidth = 1;
        opts.borderColor = "#000";
        opts.innerTextColor = "#222";
        opts.disableTextColor = "#999";
        opts.mouseOnBaseColor = "#00f";
        opts.mouseOnTextColor = "#eee";
        opts.listMaxWidth = 400;
        opts.listMinWidth = 160;
        opts.listMaxHeight = 600;
        opts.listMinHeight = 40;
        opts.tm = 8;
        opts.bm = 8;
        opts.xm = 1;
        opts.ym = 1;
        opts.menus = dbg.getMenus("listTest", 8);
        this.subTypeOpts(opts);
        return opts;
    }
    subTypeOpts(opts) {
        if (this.md.subType === "base.sys0") {
            opts.baseColor = "#eee";
            opts.innerTextColor = "#222";
            opts.borderColor = "#444";
            opts.disableTextColor = "#888";
            opts.mouseOnBaseColor = "#00f";
            opts.mouseOnTextColor = "#fff";
        }
        if (this.md.subType === "base.sys1") {
            opts.baseColor = "#222";
            opts.innerTextColor = "#ccc";
            opts.borderColor = "#aaa";
            opts.disableTextColor = "#666";
            opts.mouseOnBaseColor = "#00f";
            opts.mouseOnTextColor = "#fff";
        }
    }

    getListSize(iop) {
        var self = this;
        var md = self.md;
        var op = md.opts;
        var st = md.stas;
        var headIcon_f = 0;
        var hotkey_f = 0;
        var nextKey_f = 0;
        var maxW = 0;
        var maxH = 0;
        for (var i = 0; i < op.menus.kvTexts.length; i++) {
            var kvText = KvLib.getKvText(op.menus.kvTexts[i]);
            if (kvText.image)
                headIcon_f = 1;
            if (kvText.hotkeyText)
                hotkey_f = 1;
            if (kvText.menus)
                nextKey_f = 1;
            var fontSize = KvLib.transUnit(op.fontSize, 10, 200, op.listHeight);
            var fontSizeObj = KvLib.measureText(kvText.text, fontSize, op.fontWeight, op.fontFamily);
            if (fontSizeObj.w > maxW)
                maxW = fontSizeObj.w;

            if (kvText.type === "text")
                maxH += iop.listHeight;
            else
                maxH += op.lineHeight + op.lineSpace * 2;
        }
        maxH += iop.tm + iop.bm + iop.ym * (op.menus.kvTexts.length - 1);
        if (!headIcon_f)
            iop.headIconWidth = 10;
        if (!hotkey_f)
            iop.hotkeyWidth = 0;
        if (!nextKey_f)
            iop.nextIconWidth = 0;
        maxW += iop.headIconWidth;
        maxW += iop.hotkeyWidth;
        maxW += iop.nextIconWidth;
        maxW += 8;
        if (maxW >= op.listMaxWidth)
            maxW = op.listMaxWidth;
        if (maxW <= op.listMinWidth)
            maxW = op.listMinWidth;
        if (maxH >= op.listMaxHeight)
            maxH = op.listMaxHeight;
        if (maxH <= op.listMinHeight)
            maxH = op.listMinHeight;
        return { w: maxW, h: maxH };
    }

    afterCreate() {
        var md = this.md;
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
        layouts[cname] = { name: cname, type: "Layout~Ly_base~array.sys0", opts: opts };
        lyMaps["body"] = cname;

        var opts = {};
        md.setPns(opts);
        opts.tm = 0;
        opts.bm = 0;
        blocks[cname] = { name: "basePanel", type: "Component~Cp_base~plate.none", opts: opts };





        //======================================    
        var kvTexts = [];
        for (var i = 0; i < op.menus.kvTexts.length; i++) {
            var kvText = KvLib.getKvText(op.menus.kvTexts[i]);
            if (kvText.type === "hLine")
                kvText.disable_f = 1;
            kvTexts.push(kvText);
        }


        var cname = lyMaps["body"] + "~" + 0;
        var opts = {};
        opts.tm = op.tm;
        opts.bm = op.bm;
        opts.xm = op.xm;
        opts.ym = op.ym;
        opts.yArr = [];
        for (var i = 0; i < kvTexts.length; i++) {
            if (kvTexts[i].type === "text")
                opts.yArr.push(op.listHeight);
            else
                opts.yArr.push(op.lineHeight + op.lineSpace * 2);
        }
        opts.yArr.push(9999);
        layouts[cname] = { name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts };
        lyMaps["body0"] = cname;


        st.listSize = this.getListSize(md.setOpts);
        for (var i = 0; i < kvTexts.length; i++) {
            var cname = lyMaps["body0"] + "~" + i;
            var opts = {};
            KvLib.deepCoverObject(opts, md.setOpts);
            opts.margin = 0;
            opts.lm = null;
            opts.tm = null;
            opts.rm = null;
            opts.bm = null;
            opts.kvText = kvTexts[i];
            opts.borderWidth = 0;
            opts.innerTextColor = op.innerTextColor;
            opts.actionFunc = function (iobj) {
                console.log(iobj);
                if (iobj.act === "itemMouseClick") {
                    if (iobj.kvText.kvTexts)
                        return;
                    iobj.sender = md;
                    iobj.itemId = md.name + "~" + iobj.kvText.id;
                    iobj.keyId = op.menus.id + "~" + iobj.kvText.id;
                    KvLib.exeFunc(op.actionFunc, iobj);
                    return;
                }
                if (iobj.act === "itemMouseOver") {
                    if (md.stas.timeOutId)
                        clearTimeout(md.stas.timeOutId);

                    if (md.stas.popOnItem) {
                        if (md.stas.popOnItem.kid === iobj.kvObj.kid)
                            return;
                    }
                    var timerFunc = function () {
                        var listItem = iobj.kvObj;
                        if (!listItem.opts.kvText.menus || !listItem.opts.kvText.menus.kvTexts.length)
                            return;
                        var opts = {};
                        opts.actionFunc = function (iobj) {
                            console.log(iobj);
                            KvLib.exeFunc(op.actionFunc, iobj);
                        };
                        opts.menus = listItem.opts.kvText.menus;
                        var name = listItem.fatherMd.name + "~" + listItem.opts.kvText.id;
                        var kvObj = new Block(name, "Model~MdaList~base." + md.subType1, opts);
                        kvObj.stas.fatherList = md;
                        var elem = document.getElementById(listItem.elemId);
                        var box = KvLib.getPosition(elem);
                        var itemBase = iobj.kvObj.blockRefs["itemBase"];
                        box.x2 = itemBase.stas.cw + box.x;
                        box.y2 = itemBase.stas.ch + box.y;
                        var obj = {};
                        obj.w = kvObj.stas.listSize.w;
                        obj.h = kvObj.stas.listSize.h;
                        obj.x = box.x2 - 4;
                        obj.y = box.y - op.tm - 1;

                        if ((obj.x + obj.w) >= (gr.clientW - 2)) {
                            obj.x = box.x - kvObj.stas.listSize.w;
                        }

                        obj.kvObj = kvObj;
                        obj.center_f = 0;
                        obj.outsideShadowBlur = 10;

                        md.opts.popStackCnt = gr.mdSystem.mdClass.stackCnt;
                        MdaPopWin.popObj(obj);
                        md.stas.popOnItem = listItem;
                    };
                    md.stas.timeOutId = setTimeout(timerFunc, 200);
                    if (md.stas.popOnItem) {
                        MdaPopWin.popOffTo(md.opts.popStackCnt);
                        var elem = document.getElementById(md.stas.popOnItem.elemId);
                        elem.style.color = op.innerTextColor;
                        elem.style.backgroundColor = op.baseColor;
                        md.stas.popOnItem = null;
                    }
                    var elem = document.getElementById(iobj.kvObj.elemId);
                    elem.style.color = op.mouseOnTextColor;
                    elem.style.backgroundColor = op.mouseOnBaseColor;
                    return;
                }
                if (iobj.act === "itemMouseOut") {
                    if (md.stas.timeOutId) {
                        clearTimeout(md.stas.timeOutId);
                        md.stas.timeOutId = null;
                    }
                    if (md.stas.popOnItem) {
                        if (iobj.outDirection === "right")
                            return;
                        if (iobj.outDirection === "left")
                            return;
                    }
                    var elem = document.getElementById(iobj.kvObj.elemId);
                    elem.style.color = op.innerTextColor;
                    elem.style.backgroundColor = op.baseColor;
                    if (md.stas.popOnItem) {
                        MdaPopWin.popOffTo(md.opts.popStackCnt);
                        md.stas.popOnItem = null;
                    }
                    return;
                }
            };
            blocks[cname] = { name: "listItem#" + i, type: "Model~MdaListItem~base." + md.subType1, opts: opts };
            //blocks[cname] = {name: "listItem#" + i, type: "Component~Cp_base~button.sys0", opts: {}};
        }
    }
}

class MdaListItem {
    // 清單列項目：處理文字/圖示顯示與 hover/click 互動狀態。
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);
        opts.headIconWidth = 28;
        opts.hotkeyWidth = 20;
        opts.nextIconWidth = 20;
        opts.listHeight = 24;
        opts.lpd = 0;
        opts.baseColor = "#ddd";
        opts.borderWidth = 0;
        opts.borderColor = "#f00";
        opts.baseColor = "#ddd";
        opts.innerTextColor = "#000";
        opts.disableTextColor = "#999";
        opts.mouseOnBaseColor = "#00f";
        opts.mouseOnTextColor = "#ccc";
        opts.itemType = "menuList";//list | menuList
        opts.nextText = '<i class="gf">&#xe5e1;</i>';
        opts.kvText = {};
        this.subTypeOpts(opts);
        return opts;
    }
    subTypeOpts(opts) {
        if (this.md.subType === "base.sys0") {
            opts.baseColor = "#eee";
            opts.innerTextColor = "#222";
            opts.borderColor = "#444";
            opts.disableTextColor = "#888";
            opts.mouseOnBaseColor = "#00f";
            opts.mouseOnTextColor = "#fff";
        }
        if (this.md.subType === "base.sys1") {
            opts.baseColor = "#222";
            opts.innerTextColor = "#ccc";
            opts.borderColor = "#aaa";
            opts.disableTextColor = "#444";
            opts.mouseOnBaseColor = "#00f";
            opts.mouseOnTextColor = "#fff";
        }
    }

    create() {
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
        blocks[cname] = { name: "basePanel", type: "Component~Cp_base~plate.none", opts: opts };

        //======================================    
        var kvText = KvLib.getKvText(op.kvText);
        if (kvText.type === "hLine") {
            var opts = {};
            opts.baseColor = op.innerTextColor;
            opts.tm = op.lineSpace;
            opts.bm = op.lineSpace;
            blocks[cname] = { name: "itemBase", type: "Component~Cp_base~plate.none", opts: opts };
            return;
        }

        var cname = lyMaps["body"] + "~" + 0;
        var opts = {};
        opts.innerText = "";
        opts.disable_f = kvText.disable_f;
        opts.mouseOnBaseColor = op.mouseOnBaseColor;
        opts.zIndex = 0;
        opts.mouseClick_f = 1;
        opts.mouseOver_f = 1;
        opts.mouseOut_f = 1;

        opts.actionFunc = function (iobj) {
            if (iobj.act === "mouseClick") {
                console.log(iobj);
                var obj = {};
                obj.act = "itemMouseClick";
                obj.kvObj = iobj.kvObj;
                obj.sender = md;
                obj.kvText = KvLib.getKvText(op.kvText);
                KvLib.exeFunc(op.actionFunc, obj);
                return;
            }
            if (iobj.act === "mouseOver") {
                if (md.opts.itemType === "list") {
                    var elem = document.getElementById(md.elemId);
                    elem.style.color = op.mouseOnTextColor;
                    elem.style.backgroundColor = op.mouseOnBaseColor;
                    return;

                }
                if (md.opts.itemType === "menuList") {
                    var obj = {};
                    obj.act = "itemMouseOver";
                    obj.kvObj = md;
                    obj.kvText = KvLib.getKvText(op.kvText);
                    KvLib.exeFunc(op.actionFunc, obj);
                    return;
                }
            }
            if (iobj.act === "mouseOut") {
                if (md.opts.itemType === "list") {
                    var elem = document.getElementById(md.elemId);
                    elem.style.color = op.innerTextColor;
                    elem.style.backgroundColor = op.baseColor;
                    return;
                }
                if (md.opts.itemType === "menuList") {
                    var obj = {};
                    obj.act = "itemMouseOut";
                    obj.kvObj = md;
                    obj.kvText = KvLib.getKvText(op.kvText);
                    var elem = document.getElementById(md.elemId);
                    var curPos = KvLib.getCursorPosition();
                    var box = KvLib.getPosition(elem);
                    box.x2 = iobj.kvObj.stas.cw + box.x;
                    box.y2 = iobj.kvObj.stas.ch + box.y;
                    obj.outDirection = "upDown";
                    if (curPos.y < box.y2 || curPos.y > box.y) {
                        var dx = box.x2 - curPos.x;
                        if (dx < 10 && dx > -10) {
                            obj.outDirection = "right";
                        }
                        var dx = box.x - curPos.x;
                        if (dx < 10 && dx > -10) {
                            obj.outDirection = "left";
                        }
                    }
                    KvLib.exeFunc(op.actionFunc, obj);
                    return;
                }
            }
        };
        blocks[cname] = { name: "itemBase", type: "Component~Cp_base~button.none", opts: opts };



        //======================================
        var cname = lyMaps["body"] + "~" + 0;
        var opts = {};
        opts.xArr = [op.headIconWidth, 9999, op.hotkeyWidth, op.nextIconWidth];
        layouts[cname] = { name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts };
        lyMaps["mainBody"] = cname;





        if (kvText.image) {
            var cname = lyMaps["mainBody"] + "~" + 0;
            var opts = {};
            opts.pointerEvents = "none";
            opts.zIndex = 1;
            opts.backgroundImageUrls = [kvText.image];
            blocks[cname + "#0"] = { name: "icon", type: "Component~Cp_base~icons.sys0", opts: opts };
            if (kvText.disable_f) {
                var opts = {};
                opts.pointerEvents = "none";
                opts.zIndex = 2;
                opts.baseColor = op.baseColor;
                opts.opacity = 0.7;
                blocks[cname + "#1"] = { name: "iconMask", type: "Component~Cp_base~plate.none", opts: opts };
            }
        }
        var cname = lyMaps["mainBody"] + "~" + 1;
        var opts = {};
        opts.innerText = op.kvText;
        opts.textAlign = "left";
        opts.pointerEvents = "none";
        opts.fontSize = "0.64rh";
        opts.lpd = op.lpd;
        opts.innerTextColor = "inherit";
        opts.disable_f = kvText.disable_f;
        opts.disableTextColor = op.disableTextColor;
        opts.zIndex = 1;
        blocks[cname] = { name: "title", type: "Component~Cp_base~plate.none", opts: opts };

        if (kvText.hotkeyText) {
            var cname = lyMaps["mainBody"] + "~" + 2;
            var opts = {};
            opts.innerText = kvText.hotkeyText;
            opts.pointerEvents = "none";
            opts.fontSize = "0.6rh";
            opts.innerTextColor = "inherit";
            opts.disable_f = kvText.disable_f;
            opts.disableTextColor = op.disableTextColor;
            opts.zIndex = 1;
            blocks[cname] = { name: "hotkey", type: "Component~Cp_base~plate.none", opts: opts };
        }
        if (kvText.menus) {
            if (kvText.menus.kvTexts.length) {
                var cname = lyMaps["mainBody"] + "~" + 3;
                var opts = {};
                opts.innerText = op.nextText;
                opts.pointerEvents = "none";
                opts.fontSize = "0.6rh";
                opts.textAlign = "right";
                opts.innerTextColor = "inherit";
                opts.disable_f = kvText.disable_f;
                opts.disableTextColor = op.disableTextColor;
                opts.zIndex = 1;
                blocks[cname] = { name: "nextChar", type: "Component~Cp_base~plate.none", opts: opts };
            }
        }
    }
}

class MdaContainer {
    // 容器元件：統一處理 page/table/free 三種佈局與滾動行為。
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);
        opts.xm = 10;
        opts.ym = 10;
        opts.eh = 40;
        opts.rowAmt = 0;
        opts.ew = 200;
        opts.etm = 0;
        opts.ebm = 0;
        opts.erm = 0;
        opts.elm = 0;
        opts.yPosRate = 0.0;
        opts.xPosRate = 0.0;
        opts.rowStart = 0;
        opts.lineHRate = 0;
        opts.lineWRate = 0;
        opts.startElemCnt = 0;
        opts.scrollWidth = 16;
        opts.layoutAmt = 64;
        opts.borderWidth = 1;
        opts.borderColor = "#fff";
        opts.disVScroll_f = 0;
        opts.disHScroll_f = 0;
        opts.layoutType = "page";//page,table,free
        opts.ksObjWs = [];
        opts.ksObjss = [];
        opts.headTitleHeight = 0;
        opts.baseColor = "#ccc";

        for (var i = 0; i < 1000; i++) {
            var ksObjs = [];
            for (var j = 0; j < 10; j++) {
                var ksObj = {};
                ksObj.name = "name#" + i + "." + j;
                ksObj.type = "Component~Cp_base~button.sys0";
                ksObj.opts = {};
                ksObj.opts.innerText = ksObj.name;
                ksObjs.push(ksObj);
            }
            opts.ksObjss.push(ksObjs);
        }

        this.subTypeOpts(opts);
        return opts;
    }

    subTypeOpts(opts) {
        if (this.md.subType0 === "base") {
            opts.baseColor = "#ddd";
            opts.innerTextColor = "#222";
            opts.borderColor = "#000";
            opts.disableTextColor = "#888";
        }
        if (this.md.subType0 === "dark") {
            opts.baseColor = "#222";
            opts.innerTextColor = "#ccc";
            opts.borderColor = "#aaa";
            opts.disableTextColor = "#666";
        }
        if (this.md.subType1 === "page") {
            opts.layoutType = "page";
            opts.ksObjWs = [150, 200, 9999];
            opts.rowStart = 0;
        }
        if (this.md.subType1 === "table") {
            opts.layoutType = "table";
            opts.ksObjWs = [150, 200, 40, 250, 250, 80, 100];
        }
        if (this.md.subType1 === "free") {
            opts.layoutType = "free";
            opts.ksObjWs = [150, 200, 40, 250, 250, 80, 100];
            opts.ksObjss[2][1].iw = 50;
            opts.ksObjss[3][0].ih = 100;
        }
    }

    newScroll() {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        if (!op.disVScroll_f) {
            if (st.hWinRate < 1) {
                var cname = md.lyMaps["main"] + "~" + 1;
                var opts = {};
                opts.winRate = st.hWinRate;
                opts.posRate = op.yPosRate;
                opts.lineRate = st.lineHRate;
                opts.vhScroll_f = 1;
                if (st.wWinRate < 1) {
                    opts.bm = op.scrollWidth;
                }
                opts.actionFunc = function (iobj) {
                    if (iobj.act === "posChange") {
                        md.opts.yPosRate = iobj.posRate;
                        md.mdClass.newPage();
                    }
                    if (iobj.act === "checkPreChange") {
                        return KvLib.exeFunc(op.actionFunc, iobj);
                    }
                };
                md.newBlock(cname, opts, "Model~MdaScroll~base." + md.subType1, "vScroll");
            }
        }

        if (!op.disHScroll_f) {
            if (st.wWinRate < 1) {
                var cname = md.lyMaps["listBody"] + "~" + 2;
                var opts = {};
                opts.winRate = st.wWinRate;
                opts.posRate = op.xPosRate;
                opts.lineRate = st.lineWRate;
                opts.vhScroll_f = 0;
                opts.actionFunc = function (iobj) {
                    if (iobj.act === "posChange") {
                        md.opts.xPosRate = iobj.posRate;
                        md.mdClass.newPage();
                    }
                    if (iobj.act === "checkPreChange") {
                        return KvLib.exe(op.actionFunc, iobj);
                    }
                };
                md.newBlock(cname, opts, "Model~MdaScroll~base." + md.subType1, "hScroll");
            }
        }


    }

    savePage() {
        console.log("save page");
        return ["testsfdsfsdfsd"];
    }

    nextPage() {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        if (op.layoutType === "page") {
            op.rowStart = Math.round(op.yPosRate * (st.allLine - st.yc));
            op.rowStart += st.yc;
            //if (op.rowStart >= (op.ksObjss.length - st.yc))
            //    op.rowStart = op.ksObjss.length - st.yc+1;
            op.yPosRate = op.rowStart / (st.allLine - st.yc);
            this.newPage();
            this.newScroll();
        } else {
            op.yPosRate += st.lineHRate * (st.yc - 1);
            if (op.yPosRate > 1)
                op.yPosRate = 1;
            this.newPage();
            this.newScroll();
        }
    }

    prevPage() {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        if (op.layoutType === "page") {
            op.rowStart = Math.round(op.yPosRate * (st.allLine - st.yc));
            op.rowStart -= st.yc;
            if (op.rowStart < 0)
                op.rowStart = 0;
            op.yPosRate = op.rowStart / (st.allLine - st.yc);
            this.newPage();
            this.newScroll();
        } else {
            op.yPosRate -= st.lineHRate * (st.yc - 1);
            if (op.yPosRate < 0)
                op.yPosRate = 0;
            this.newPage();
            this.newScroll();
        }
    }

    newPage() {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        var ksObjAction = function (iobj) {
            console.log(iobj);
            iobj.sender = md;
            KvLib.exeFunc(op.actionFunc, iobj);
        };

        if (op.layoutType === "page") {
            var cname = md.lyMaps["listPanelBody"] + "~" + 0;
            md.clearOptsAll(cname);
            var posObj = md.getRectObj(cname, md.layouts);
            var winH = posObj.h;
            var row = (winH + op.ym - op.etm - op.ebm) / (op.eh + op.ym);
            var rowCnt = Math.round(row);
            if (op.rowAmt) {
                rowCnt = op.rowAmt;
                op.eh = (winH + op.ym - op.etm - op.ebm) / rowCnt - op.ym;
            }

            var newEh = (winH + op.ym - op.etm - op.ebm) / rowCnt - op.ym;
            st.xc = op.ksObjWs.length;
            st.yc = rowCnt;
            st.pageElemAmt = st.xc * st.yc;
            st.rowStart = Math.round(op.yPosRate * (st.allLine - st.yc));
            if (op.rowStart !== null && op.rowStart !== undefined) {
                st.rowStart = op.rowStart;
                op.rowStart = null;
                if ((st.allLine - st.yc) > 0)
                    op.yPosRate = st.rowStart / ((st.allLine - st.yc));
                else
                    op.yPosRate = 0;

            }
            if (st.rowStart < 0)
                st.rowStart = 0;
            if (op.yPosRate < 0)
                op.yPosRate = 0;
            var opts = {};
            opts.tm = op.etm;
            opts.bm = op.ebm;
            opts.xm = op.xm;
            opts.ym = op.ym;
            opts.lm = op.elm;
            opts.rm = op.erm;

            opts.yArr = [];
            for (var i = 0; i < rowCnt; i++) {
                opts.yArr.push(newEh);
            }

            var xc = op.ksObjWs.length;
            opts.xyArr = [];
            for (var i = 0; i < rowCnt; i++) {
                var wsA = op.ksObjWs;
                if (op.ksObjWsR) {
                    if (op.ksObjWsR["r" + i])
                        var wsA = op.ksObjWsR["r" + i];
                }
                opts.xyArr.push(wsA);
            }
            md.newLayout(cname, opts, "Layout~Ly_base~xyArray.sys0", "listArrayBody");

            var inx = st.rowStart;
            var amt = 0;
            for (var i = 0; i < rowCnt; i++) {
                if (inx >= op.ksObjss.length)
                    break;
                var ksObjs = op.ksObjss[inx];
                for (var j = 0; j < ksObjs.length; j++) {
                    var ksObj = ksObjs[j];
                    if (!ksObj)
                        continue;
                    var cname = md.lyMaps["listArrayBody"] + "~" + amt;
                    var nopts = ksObj.opts;
                    nopts.actionFunc = ksObjAction;
                    md.newBlock(cname + "#" + (i), nopts, ksObj.type, ksObj.name);
                    amt++;
                }
                inx++;
            }
        }

        if (op.layoutType === "table") {
            var cname = md.lyMaps["listPanelBody"] + "~" + 0;
            md.clear(cname);
            var opts = {};
            var allH = st.allH - st.winH;
            var posY = op.yPosRate * allH;
            var allW = st.allW - st.winW;
            var posX = op.xPosRate * allW;
            if (posX < 0)
                posX = 0;
            if (posY < 0)
                posY = 0;
            //===========================
            var yy = op.etm;
            var allW = 0;
            var maxIh = 0;
            var start_f = 0;
            var end_f = 0;
            var offY = 0;
            var rowStart = 0;
            var rowEnd = st.allLine - 1;


            for (var i = 0; i < st.allLine; i++) {
                if (!start_f) {
                    if ((yy + op.eh) >= posY) {
                        start_f = 1;
                        rowStart = i;
                        offY = yy - posY;
                    }
                }
                yy += op.ym;
                yy += op.eh;
                if (start_f && !end_f) {
                    if (yy >= (posY + st.winH)) {
                        end_f = 1;
                        rowEnd = i;
                        break;
                    }
                }
            }

            st.xc = op.ksObjWs.length;
            st.yc = rowEnd - rowStart + 1;
            st.rowStart = rowStart;
            st.rowEnd = rowEnd;
            st.pageElemAmt = st.xc * st.yc;

            var yy = offY;
            var eInx = 0;
            for (var i = rowStart; i < (rowEnd + 1); i++) {
                xx = op.elm;
                var maxIh = 0;
                var wsA = op.ksObjWs;
                if (op.ksObjWsR) {
                    if (op.ksObjWsR["r" + i])
                        var wsA = op.ksObjWsR["r" + i];
                }
                for (var j = 0; j < wsA.length; j++) {
                    var ksObj = op.ksObjss[i][j];
                    if (!ksObj)
                        break;
                    var cname = md.lyMaps["listPanelBody"] + "~" + 0;
                    var opts = ksObj.opts;
                    opts.tm = yy;
                    opts.ih = op.eh;
                    opts.iw = wsA[j];
                    if (xx + opts.iw < posX) {
                        xx += opts.iw + op.xm;
                        continue;
                    }
                    if (xx >= (posX + st.winW)) {
                        xx += opts.iw + op.xm;
                        continue;
                    }
                    opts.lm = xx - posX;
                    xx += opts.iw + op.xm;
                    opts.wAlign = "left";
                    opts.hAlign = "top";
                    opts.actionFunc = ksObjAction;
                    //opts.innerText = ksObj.name;
                    md.newBlock(cname + "#" + eInx, opts, ksObj.type, ksObj.name);
                    eInx++;
                }
                yy += op.eh + op.ym;
            }
        }

        if (op.layoutType === "free") {
            var cname = md.lyMaps["listPanelBody"] + "~" + 0;
            md.clear(cname);
            var opts = {};
            var allH = st.allH - st.winH;
            var posY = op.yPosRate * allH;
            var allW = st.allW - st.winW;
            var posX = op.xPosRate * allW;
            if (posX < 0)
                posX = 0;
            if (posY < 0)
                posY = 0;

            //===========================
            var yy = op.etm;
            var allW = 0;
            var maxIh = 0;
            var start_f = 0;
            var end_f = 0;
            var offY = 0;
            var rowStart = 0;
            var rowEnd = op.ksObjss.length - 1;
            for (var i = 0; i < op.ksObjss.length; i++) {
                var ksObjs = op.ksObjss[i];
                var xx = op.elm;
                var maxIh = 0;
                for (var j = 0; j < ksObjs.length; j++) {
                    var ksObj = ksObjs[j];
                    var eh = op.eh;
                    if (ksObj.ih)
                        eh = ksObj.ih;
                    if (eh > maxIh)
                        maxIh = eh;
                    if (j !== 0)
                        xx += op.xm;
                    if (ksObj.iw)
                        xx += ksObj.iw;
                    else
                        xx += op.ew;
                }
                xx += op.erm;
                if (allW < xx)
                    allW = xx;
                yy += maxIh;
                if (!start_f) {
                    if (yy >= posY) {
                        start_f = 1;
                        rowStart = i;
                        offY = yy - maxIh - posY;
                    }
                }
                if (i !== 0)
                    yy += op.ym;
                if (start_f && !end_f) {
                    if (yy >= (posY + st.winH)) {
                        end_f = 1;
                        rowEnd = i;
                        break;
                    }
                }
            }

            st.xc = op.ksObjWs.length;
            st.yc = rowEnd - rowStart + 1;
            st.rowStart = rowStart;
            st.rowEnd = rowEnd;

            var yy = offY;
            var eInx = 0;
            for (var i = rowStart; i < (rowEnd + 1); i++) {
                var ksObjs = op.ksObjss[i];
                xx = op.elm;
                var maxIh = 0;
                for (var j = 0; j < ksObjs.length; j++) {
                    var ksObj = ksObjs[j];
                    var cname = md.lyMaps["listPanelBody"] + "~" + 0;
                    var opts = ksObj.opts;
                    opts.tm = yy;
                    opts.ih = op.eh;
                    opts.iw = op.ew;
                    opts.ih = op.eh;
                    if (ksObj.ih)
                        opts.ih = ksObj.ih;
                    opts.iw = op.ew;
                    if (ksObj.iw)
                        opts.iw = ksObj.iw;
                    if (maxIh < opts.ih)
                        maxIh = opts.ih;

                    if (xx + opts.iw < posX) {
                        xx += opts.iw + op.xm;
                        continue;
                    }
                    if (xx >= (posX + st.winW)) {
                        xx += opts.iw + op.xm;
                        continue;
                    }

                    opts.lm = xx - posX;
                    xx += opts.iw + op.xm;
                    opts.actionFunc = function (iobj) {
                        console.log(iobj);
                        return 1;
                    };
                    opts.wAlign = "left";
                    opts.hAlign = "top";
                    opts.actionFunc = ksObjAction;
                    //opts.innerText = ksObj.name;
                    md.newBlock(cname + "#" + eInx, opts, ksObj.type, ksObj.name);
                    eInx++;
                }
                yy += maxIh + op.ym;
            }



        }

        var obj = {};
        obj.act = "newPage";
        obj.rowStart = st.rowStart;
        obj.totalRow = op.ksObjss.length;
        obj.yPosRate = op.yPosRate;
        obj.pageRowAmt = st.yc;
        obj.pageAll = Math.floor((op.ksObjss.length - 0.001) / st.yc) + 1;
        obj.pageIndex = Math.floor((st.rowStart - 0.001) / st.yc) + 1;
        st.pageAll = obj.pageAll;
        KvLib.exeFunc(op.actionFunc, obj);


    }

    afterCreate() {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        //================
        st.allLine = op.ksObjss.length;
        var cname = md.lyMaps["body"] + "~" + 0;
        md.clearOptsAll(cname);
        var cname = md.lyMaps["body"] + "~" + 0;
        var opts = {};
        opts.yArr = [0, 9999];
        md.newLayout(cname, opts, "Layout~Ly_base~xyArray.sys0", "mainBody");

        var cname = md.lyMaps["mainBody"] + "~" + 1;
        var posObj = md.getRectObj(cname, md.layouts);
        var listBodyH = posObj.h// - op.headTitleHeight;
        var listBodyW = posObj.w;
        var vScrollWidth = op.scrollWidth;
        var hScrollWidth = op.scrollWidth;


        //===========================
        if (op.layoutType === "free") {
            var allH = op.etm;
            var allW = 0;
            var maxIh = 0;
            for (var i = 0; i < op.ksObjss.length; i++) {
                var ksObjs = op.ksObjss[i];
                var xx = op.elm;
                var maxIh = 0;
                for (var j = 0; j < ksObjs.length; j++) {
                    var ksObj = ksObjs[j];
                    var eh = op.eh;
                    if (ksObj.ih)
                        eh = ksObj.ih;
                    if (eh > maxIh)
                        maxIh = eh;
                    if (j !== 0)
                        xx += op.xm;
                    if (ksObj.iw)
                        xx += ksObj.iw;
                    else
                        xx += op.ew;
                }
                xx += op.erm;
                if (allW < xx)
                    allW = xx;
                allH += maxIh;
                if (i !== 0)
                    allH += op.ym;
            }
            allH += op.ebm - op.ym;
            st.allH = allH;
            st.allW = allW;
            st.lineHRate = 1 / st.allLine;
        }
        if (op.layoutType === "table") {
            var allH = op.etm + op.ebm + op.eh * st.allLine + op.ym * (st.allLine - 1);
            var allW = op.elm;
            for (var i = 0; i < op.ksObjWs.length; i++) {
                allW += op.ksObjWs[i] + op.xm;
            }
            allW += op.erm - op.xm;
            st.allH = allH;
            st.allW = allW;
            st.lineHRate = 1 / st.allLine;
        }
        if (op.layoutType === "page") {
            hScrollWidth = 0;
            st.allW = listBodyW;
            st.allH = listBodyH;
            var row = (listBodyH + op.ym - op.etm - op.ebm) / (op.eh + op.ym);
            var rowCnt = Math.round(row);
            if (op.rowAmt) {
                rowCnt = op.rowAmt;
            }
            op.eh = (listBodyH + op.ym - op.etm - op.ebm) / rowCnt - op.ym;
            if (op.ksObjss.length <= rowCnt)
                vScrollWidth = 0;
            else {
                st.allH = Math.ceil(op.ksObjss.length / rowCnt) * listBodyH;
            }
            st.lineHRate = 1 / (st.allLine - rowCnt);
        }



        st.scrollV_f = 0;
        st.scrollH_f = 0;
        if (op.disVScroll_f)
            vScrollWidth = 0;
        if (op.disHScroll_f)
            hScrollWidth = 0;

        if (st.allH > listBodyH) {
            listBodyW = listBodyW - vScrollWidth;
            st.scrollV_f = 1;
            if (st.allW > listBodyW) {
                listBodyH = listBodyH - hScrollWidth;
                st.scrollH_f = 1;
            }
        } else {
            if (st.allW > listBodyW) {
                listBodyH = listBodyH - hScrollWidth;
                st.scrollH_f = 1;
                if (st.allH > listBodyH) {
                    listBodyW = listBodyW - vScrollWidth;
                    st.scrollV_f = 1;
                }
            }
        }
        st.winH = listBodyH;
        st.winW = listBodyW;


        st.lineWRate = 20 / st.allW;
        if (op.lineHRate)
            st.lineHRate = op.lineHRate;
        if (op.lineWRate)
            st.lineWRate = op.lineWRate;

        st.hWinRate = st.winH / st.allH;
        if (st.hWinRate > 1)
            st.hWinRate = 1;
        st.wWinRate = st.winW / st.allW;
        if (st.wWinRate > 1)
            st.wWinRate = 1;

        if (!st.scrollV_f)
            vScrollWidth = 0;
        if (!st.scrollH_f)
            hScrollWidth = 0;

        //var cname = md.lyMaps["mainBody"] + "~" + 1;
        //md.clear(cname);

        var cname = md.lyMaps["mainBody"] + "~" + 1;
        var opts = {};
        opts.xArr = [9999, vScrollWidth];
        md.newLayout(cname, opts, "Layout~Ly_base~xyArray.sys0", "main");
        //===================================================================

        var cname = md.lyMaps["main"] + "~" + 0;
        var opts = {};
        opts.yArr = [op.headTitleHeight, 9999, hScrollWidth];
        var lyObj = md.newLayout(cname, opts, "Layout~Ly_base~xyArray.sys0", "listBody");

        if (!op.ksObjss[0])
            var xcLen = 1;
        else
            var xcLen = op.ksObjss[0].length;

        var cname = md.lyMaps["listBody"] + "~" + 0;
        var opts = {};

        opts.xc = xcLen;
        opts.lm = op.elm;
        opts.rm = op.erm;
        opts.xm = op.xm;
        var lyObj = md.newLayout(cname, opts, "Layout~Ly_base~array.sys0", "headTitleBody");


        for (var i = 0; i < xcLen; i++) {
            var cname = md.lyMaps["headTitleBody"] + "~" + i;
            var opts = {};
            opts.xArr = op.headTitleXArr;
            opts.headTitles = op.headTitles;
            md.newBlock(cname, opts, "Model~MdaHeadTitle~base.sys0", "headTitle#" + i);
        }


        var cname = md.lyMaps["listBody"] + "~" + 1;
        var opts = {};
        var lyObj = md.newLayout(cname, opts, "Layout~Ly_base~xyArray.sys0", "listPanelBody");


        var cname = md.lyMaps["listPanelBody"] + "~" + 0;
        var opts = {};
        opts.basePanel_f = 1;
        var plateObj = md.newBlock(cname, opts, "Component~Cp_base~plate.none", "listPanel");
        lyObj.stas.rects[0].elemId = plateObj.elemId;




        md.mdClass.newPage();
        md.mdClass.newScroll();
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
        layouts[cname] = { name: cname, type: "Layout~Ly_base~array.sys0", opts: opts };
        lyMaps["body"] = cname;
        //======================================    
        var opts = {};
        md.setPns(opts);
        opts.mouseClick_f = 1;
        opts.mouseWheel_f = 1;
        opts.actionFunc = function (iobj) {
            var op = md.opts;
            var st = md.stas;
            if (iobj.act !== "wheel")
                return;
            if (st.allH <= st.winH)
                return;
            console.log("yPosRate:" + op.yPosRate);
            var obj = {};
            obj.act = "checkPreChange";
            obj.kvObj = md;
            obj.sender = md;
            var errStr = KvLib.exeFunc(op.actionFunc, obj);
            if (errStr) {
                var elem = iobj.kvObj.elems["base"];
                elem.blur();
                return;
            }
            var deltaY = iobj.event.deltaY;
            if (deltaY < 0) {
                op.yPosRate -= st.lineHRate;
                if (op.yPosRate < 0)
                    op.yPosRate = 0;
                md.mdClass.afterCreate();
                return;
            }
            if (deltaY > 0) {
                op.yPosRate += st.lineHRate;
                if (op.yPosRate >= 1)
                    op.yPosRate = 1;
                md.mdClass.afterCreate();
                return;
            }
        };
        blocks[cname] = { name: "basePanel", type: "Component~Cp_base~plate.none", opts: opts };
    }
}

class MdaScroll {
    constructor() {
    }

    initOpts(md) {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);
        opts.vhScroll_f = 1;
        opts.minCursorH = 30;
        opts.posRate = 0.0;
        opts.winRate = 0.1;
        opts.lineRate = 0.1;
        this.subTypeOpts(opts);
        return opts;
    }

    subTypeOpts(opts) {
        if (this.md.subType === "base.sys0") {
            opts.vhScroll_f = 1;
            opts.baseColor = "#bbb";
        }
        if (this.md.subType === "base.sys1") {
            opts.vhScroll_f = 1;
            opts.baseColor = "#888";
        }
        if (this.md.subType === "base.sys2") {
            opts.vhScroll_f = 0;
            opts.baseColor = "#bbb";
        }
        if (this.md.subType === "base.sys3") {
            opts.vhScroll_f = 0;
            opts.baseColor = "#888";
        }
    }

    afterCreate() {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        this.setScroll();
    }

    checkPreChange() {
        var md = this.md;
        var op = md.opts;
        var obj = {};
        obj.act = "checkPreChange";
        obj.kvObj = md;
        obj.sender = md;
        return KvLib.exeFunc(op.actionFunc, obj);
    }

    chkWatch() {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        if (st.cursorDrag_f) {
            if (!gr.mouseDown_f) {
                var curObj = md.blockRefs["cursor"];
                var curElem = document.getElementById(curObj.elemId);
                curElem.style.backgroundColor = op.baseColor;
                st.cursorDrag_f = 0;
                return;
            }
            if (op.vhScroll_f) {
                var nowPos = gr.cursorY;
                if (nowPos === st.preCursorPos)
                    return;
                st.preCursorPos = nowPos;
                var cname = md.lyMaps["main"] + "~" + 1;
                var posObj = md.getRectObj(cname, md.layouts);
                var totalH = posObj.h - st.cursorH;
                var upObj = md.blockRefs["upButton"];
                var upElem = document.getElementById(upObj.elemId);
                var pos = KvLib.getPosition(upElem);
                var upLimit = pos.y + upObj.stas.rh;
                var dnLimit = upLimit + totalH;
                var posY = gr.cursorY - st.deltaY;
                if (posY < upLimit)
                    posY = upLimit;
                if (posY > dnLimit)
                    posY = dnLimit;
                var nowPosY = posY - upLimit;
                if (nowPosY < 0)
                    nowPosY = 0;
                op.posRate = nowPosY / totalH;
                md.mdClass.setScroll();
            } else {
                var nowPos = gr.cursorX;
                if (nowPos === st.preCursorPos)
                    return;
                st.preCursorPos = nowPos;
                var cname = md.lyMaps["main"] + "~" + 1;
                var posObj = md.getRectObj(cname, md.layouts);
                var totalW = posObj.w - st.cursorH;
                var upObj = md.blockRefs["upButton"];
                var upElem = document.getElementById(upObj.elemId);
                var pos = KvLib.getPosition(upElem);
                var upLimit = pos.x + upObj.stas.rw;
                var dnLimit = upLimit + totalW;
                var posX = gr.cursorX - st.deltaX;
                if (posX < upLimit)
                    posX = upLimit;
                if (posX > dnLimit)
                    posX = dnLimit;
                var nowPosX = posX - upLimit;
                if (nowPosX < 0)
                    nowPosX = 0;
                op.posRate = nowPosX / totalW;
                md.mdClass.setScroll();

            }


            var obj = {};
            obj.act = "posChange";
            obj.kvObj = md;
            obj.posRate = op.posRate;
            KvLib.exeFunc(op.actionFunc, obj);
        }
    }

    setScroll() {
        var self = this;
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        var cname = md.lyMaps["main"] + "~" + 1;
        md.clear(cname, 1);
        var posRate = op.posRate;
        if (posRate >= 1)
            posRate = 1;
        var posObj = md.getRectObj(cname, md.layouts);
        if (op.vhScroll_f)
            st.cursorH = posObj.h * op.winRate;
        else
            st.cursorH = posObj.w * op.winRate;
        if (st.cursorH < op.minCursorH)
            st.cursorH = op.minCursorH;

        if (op.vhScroll_f)
            var totalH = posObj.h - st.cursorH;
        else
            var totalH = posObj.w - st.cursorH;
        var nowPos = totalH * posRate;

        var opts = {};
        //opts.mouseClick_f = 1;
        opts.baseColor = op.baseColor;

        if (op.vhScroll_f) {
            opts.hAlign = "top";
            opts.tm = nowPos;
            opts.ih = st.cursorH;
        } else {
            opts.wAlign = "left";
            opts.lm = nowPos;
            opts.iw = st.cursorH;
        }
        opts.mouseUp_f = 1;
        opts.mouseDown_f = 1;
        opts.mouseOver_f = 1;
        opts.mouseOut_f = 1;
        opts.viewMouseUpDown_f = 0;
        opts.viewMouseOverOut_f = 0;
        if (st.cursorDrag_f)
            opts.baseColor = "#ccf";

        opts.actionFunc = function (iobj) {
            console.log(iobj);
            if (iobj.act === "mouseOver") {
                var elemCur = document.getElementById(iobj.kvObj.elemId);
                elemCur.style.backgroundColor = "#eee";
                return;
            }
            if (iobj.act === "mouseOut") {
                var elemCur = document.getElementById(iobj.kvObj.elemId);
                elemCur.style.backgroundColor = op.baseColor;
                return;
            }

            if (iobj.act === "mouseDown") {
                if (self.checkPreChange())
                    return;
                st.cursorDrag_f = 1;
                st.cursorY = gr.cursorY;
                st.preCursorY = st.cursorY;
                var elemCur = document.getElementById(iobj.kvObj.elemId);
                elemCur.style.backgroundColor = "#ccf";
                var pos = KvLib.getPosition(elemCur);
                md.stas.deltaY = gr.cursorY - pos.y;
                md.stas.deltaX = gr.cursorX - pos.x;
                gr.mouseDisable_f = 1;
            }
            return 1;
        };
        md.newBlock(cname, opts, "Component~Cp_base~button.sys4", "cursor");
        //blocks[cname] = {name: "downBotton", type: "Component~Cp_base~plate.sys0", opts: opts};


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
        var posChange = function (addValue) {
            console.log("posChg");
            md.opts.posRate += md.opts.lineRate * addValue;
            if (md.opts.posRate > 1)
                md.opts.posRate = 1;
            if (md.opts.posRate < 0)
                md.opts.posRate = 0;
            md.mdClass.setScroll();
            var obj = {};
            obj.act = "posChange";
            obj.kvObj = md;
            obj.posRate = op.posRate;
            KvLib.exeFunc(op.actionFunc, obj);
        };



        var cname = "c";
        var opts = {};
        layouts[cname] = { name: cname, type: "Layout~Ly_base~array.sys0", opts: opts };
        lyMaps["body"] = cname;
        //======================================    
        var opts = {};
        md.setPns(opts);
        opts.mousePushCon_f = 1;
        opts.mousePushActPrd = 10;
        opts.actionFunc = function (iobj) {
            if (self.checkPreChange()) {
                iobj.kvObj.stas.mousePushAct_f = 0;
                return;
            }
            if (iobj.act === "mousePush") {
                gr.mouseDisable_f = 1;
                var curObj = md.blockRefs["cursor"];
                var curElem = document.getElementById(curObj.elemId);
                var pos = KvLib.getPosition(curElem);
                if (op.vhScroll_f) {
                    if (gr.cursorY < pos.y)
                        posChange(-2);
                    if (gr.cursorY > pos.y + curObj.stas.ih)
                        posChange(2);
                } else {
                    if (gr.cursorX < pos.x)
                        posChange(-2);
                    if (gr.cursorX > pos.x + curObj.stas.iw)
                        posChange(2);
                }
            }
            return 1;
        };
        blocks[cname] = { name: "basePanel", type: "Component~Cp_base~plate.sys0", opts: opts };
        //======================================    
        var cname = lyMaps["body"] + "~" + 0;
        var opts = {};
        if (op.vhScroll_f)
            opts.yArr = [20, 9999, 20];
        else
            opts.xArr = [20, 9999, 20];
        layouts[cname] = { name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts };
        lyMaps["main"] = cname;

        var cname = lyMaps["main"] + "~" + 0;
        var opts = {};
        if (op.vhScroll_f)
            opts.innerText = '<i class="gf">&#xe316</i>';
        else
            opts.innerText = '<i class="gf">&#xe314</i>';
        opts.mousePushCon_f = 1;
        opts.mousePushActPrd = 10;
        opts.baseColor = op.baseColor;
        opts.actionFunc = function (iobj) {
            if (self.checkPreChange()) {
                iobj.kvObj.stas.mousePushAct_f = 0;
                return;
            }
            if (iobj.act === "mousePush") {
                gr.mouseDisable_f = 1;
                posChange(-1);
            }
            return 1;
        };
        blocks[cname] = { name: "upButton", type: "Component~Cp_base~button.sys4", opts: opts };

        var cname = lyMaps["main"] + "~" + 2;
        var opts = {};
        if (op.vhScroll_f)
            opts.innerText = '<i class="gf">&#xe313</i>';
        else
            opts.innerText = '<i class="gf">&#xe315</i>';

        opts.mousePushCon_f = 1;
        opts.mousePushActPrd = 10;
        opts.baseColor = op.baseColor;
        opts.actionFunc = function (iobj) {
            if (self.checkPreChange()) {
                iobj.kvObj.stas.mousePushAct_f = 0;
                return;
            }
            if (iobj.act === "mousePush") {
                gr.mouseDisable_f = 1;
                posChange(1);
            }
            return 1;
        };
        blocks[cname] = { name: "downButton", type: "Component~Cp_base~button.sys4", opts: opts };

    }
}

class MdaPopWin {
    constructor() {
        this.stackCnt = 0;
        this.kvObjs = [];
    }
    initOpts(md) {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);
        opts.baseColor = "rgba(0,0,0,0)";


        return opts;
    }

    static popMaskObjA(opts) {
        MdaPopWin.popMaskObj(opts);
    }

    static popMaskAround(op) {
        var obj = {};
        obj.maskX = 0;
        obj.maskY = 0;
        obj.maskW = op.box.x1;
        obj.maskH = 9999;
        obj.maskColor = op.maskColor;
        obj.actionFunc = op.actionFunc;
        MdaPopWin.popMask(obj);

        var obj = {};
        obj.maskX = 0;
        obj.maskY = 0;
        obj.maskW = 9999;
        obj.maskH = op.box.y1;
        obj.maskColor = op.maskColor;
        obj.actionFunc = op.actionFunc;
        MdaPopWin.popMask(obj);

        var obj = {};
        obj.maskX = op.box.x2;
        obj.maskY = 0;
        obj.maskW = gr.clientW - op.box.x2;
        obj.maskH = 9999;
        obj.maskColor = op.maskColor;
        obj.actionFunc = op.actionFunc;
        MdaPopWin.popMask(obj);

        var obj = {};
        obj.maskX = 0;
        obj.maskY = op.box.y2;
        obj.maskW = 9999;
        obj.maskH = gr.clientH - op.box.t2;
        obj.maskColor = op.maskColor;
        obj.actionFunc = op.actionFunc;
        MdaPopWin.popMask(obj);


    }
    static popMask(op) {
        var maskClickFunc = function () {
            gr.mdSystem.mdClass.popOff(2);
        };
        var opts = {};
        opts.baseColor = "rgba(0,0,0,0.5)";
        if (op.maskColor)
            opts.baseColor = op.maskColor;
        if (op.actionFunc) {
            opts.actionFunc = op.actionFunc;
            opts.mouseClick_f = 1;
        }
        var comp = new Block("mask#" + gr.mdSystem.mdClass.stackCnt, "Component~Cp_base~plate.none", opts);
        var opts = {};
        if (!op.maskX)
            op.maskX = 0;
        if (!op.maskY)
            op.maskY = 0;
        if (op.maskW === null || op.maskW === undefined)
            op.maskW = 9999;
        if (op.maskH === null || op.maskH === undefined)
            op.maskH = 9999;
        var opts = {
            kvObj: comp,
            x: op.maskX,
            y: op.maskY,
            w: op.maskW,
            h: op.maskH,
            center_f: 0
        };
        MdaPopWin.popObj(opts);
    }

    static popMaskObj(_opts) {
        MdaPopWin.popMask(_opts);
        MdaPopWin.popObj(_opts);
    }

    static popObj(_opts) {
        var md = gr.mdSystem;
        var opts = {
            kvObj: null,
            x: 0,
            y: 0,
            w: 9999,
            h: 9999,
            shadow_f: 0,
            center_f: 1
        };
        KvLib.coverObject(opts, _opts);
        if (md.mdClass.stackCnt >= 16) {
            console.error("Pop panel stack over flow !!!");
            return;
        }
        var cname = "c~" + md.mdClass.stackCnt;
        var rects = md.layouts["c"].stas.rects;
        var rect = rects[md.mdClass.stackCnt];
        rect.w = gr.clientW;
        rect.h = gr.clientH;
        if (opts.w < 0)
            rect.w += opts.w;
        if (opts.h < 0)
            rect.h += opts.h;
        if (opts.w < 9000)
            rect.w = opts.w;
        if (opts.h < 9000)
            rect.h = opts.h;
        if (!opts.center_f) {
            rect.x = opts.x;
            rect.y = opts.y;
        } else {
            rect.x = ((gr.clientW - rect.w) / 2);
            rect.y = ((gr.clientH - rect.h) / 2);

        }
        rect.z = md.mdClass.stackCnt;
        var elem = md.blocks[cname].elems["base"];

        md.mdClass.editElem(elem, rect, _opts);
        var cname = "c~" + md.mdClass.stackCnt;

        md.mdClass.stackCnt++;
        if (opts.kvObj) {
            cname = cname + "#1";
            md.blocks[cname] = opts.kvObj;
            md.blockRefs[opts.kvObj.name] = opts.kvObj;
            opts.kvObj.cname = cname;
            opts.kvObj.rname = cname.split("#")[0];
            opts.kvObj.fatherMd = md;
            opts.kvObj.create(elem.id, 0, 0, rect.w, rect.h);
        }
    }

    getLastKvObj() {
    }

    static popOffTo(popCnt) {
        if (popCnt === null || popCnt === undefined)
            return;
        var md = gr.mdSystem;
        for (var i = 0; i < 16; i++) {
            if (md.mdClass.stackCnt <= popCnt) {
                return;
            }
            MdaPopWin.popOff(1);
        }
    }

    static popOff(times) {
        var md = gr.mdSystem;
        if (!times)
            times = 1;
        while (times) {
            if (md.mdClass.stackCnt <= 0) {
                return;
            }
            md.mdClass.stackCnt--;
            var cname = "c~" + md.mdClass.stackCnt;
            md.clearOptsAll(cname, 1);
            var rects = md.layouts["c"].stas.rects;
            var rect = rects[md.mdClass.stackCnt];
            rect.x = -1000;
            rect.y = -1000;
            rect.w = 0;
            rect.h = 0;
            var elem = md.blocks[cname].elems["base"];
            md.mdClass.editElem(elem, rect, { borderWidth: 0 });
            times--;
        }
    }

    editElem(elem, rectObj, opts) {
        elem.style.position = "absolute";
        elem.style.overflow = "hidden";
        //=====================================
        elem.style.left = (rectObj.x) + "px";
        elem.style.top = (rectObj.y) + "px";
        var bw = 0;
        elem.style.width = (rectObj.w) + "px";
        elem.style.height = (rectObj.h) + "px";
        //if (rectObj.z)
        //    elem.style.zIndex = "" + rectObj.z;
        if (opts.hidden_f)
            elem.style.visibility = "hidden";
        //=====================================
        elem.style.userSelect = "none";
        //=====================================
        if (opts.baseColor)
            elem.style.backgroundColor = opts.baseColor;
        if (opts.innerTextColor)
            elem.style.color = opts.innerTextColor;
        if (opts.borderWidth !== undefined) {
            elem.style.borderStyle = "solid";
            elem.style.borderColor = opts.borderColor;
            elem.style.borderWidth = opts.borderWidth + "px";
        } else {
            elem.style.borderWidth = "0px";
        }
        if (opts.outsideShadowBlur) {
            var str = "";
            if (opts.outsideShadowBlur) {
                str += 10 + "px ";
                str += 10 + "px ";
                str += opts.outsideShadowBlur + "px ";
                str += "#000";
            }
            elem.style.boxShadow = str;
        }
    }

    build(md) {
        var self = this;
        var md = self.md;
        var op = md.opts;
        var lyMaps = md.lyMaps;
        var blocks = op.blocks;
        var layouts = op.layouts;
        //======================================    
        var cname = "c";
        var opts = {};
        opts.xc = 4;
        opts.yc = 4;
        opts.zIndex = 1000;
        opts.xm = 10;
        opts.ym = 10;
        opts.borderWidth = 0;
        layouts[cname] = { name: cname, type: "Layout~Ly_base~array.sys0", opts: opts };
        lyMaps["body"] = cname;

        //var opts = {};
        //md.setPns(opts);
        //blocks[cname] = {name: "basePanel", type: "Component~Cp_base~plate.none", opts: opts};


        //======================================
        for (var i = 0; i < 16; i++) {
            var cname = lyMaps["body"] + "~" + i;
            var opts = {};
            opts.baseColor = "rgba(0,0,0,0)";
            opts.zIndex = 1000;
            blocks[cname] = { name: "basePanel#" + i, type: "Component~Cp_base~plate.none", opts: opts };
        }



    }
}

class MdaBase {
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);
        this.subTypeOpts(opts);
        return opts;
    }
    subTypeOpts(opts) {
        if (this.md.subType === "base.sys0") {
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
        layouts[cname] = { name: cname, type: "Layout~Ly_base~array.sys0", opts: opts };
        lyMaps["body"] = cname;
        //======================================    
        var opts = {};
        md.setPns(opts);
        opts.mouseClick_f = 1;
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            return 1;
        };
        blocks[cname] = { name: "basePanel", type: "Component~Cp_base~plate.sys0", opts: opts };
    }
}

class MdaBox {
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);
        opts.titleHeight = 50;
        opts.buttonHeight = 50;
        opts.titleBaseColor = "#ccc";
        opts.title = "Title";
        opts.titleColor = "#000";
        opts.buttons = ['<i class="gf">&#xeacf;</i>', '<i class="gf">&#xead0;</i>'];
        opts.buttonIds = ["prevButton", "nextButton"];
        opts.autoPage_f = 1;
        opts.buttonsOn_f = 0;
        opts.buttonWidth = 150;
        opts.buttonXm = 20;
        opts.headButtons = [];
        opts.headButtonIds = [];
        opts.headButtonWidthes = [100, 100, 100, 100, 100, 100, 100, 100];
        opts.baseColor = "#ccc";
        var ksObj = opts.ksObj = {};
        ksObj.name = "testPlate";
        ksObj.type = "Component~Cp_base~plate.sys0";
        ksObj.opts = {};
        opts.eh = 9999;
        opts.ym = 0;
        opts.viewPage_f = 1;
        this.subTypeOpts(opts);
        return opts;
    }
    subTypeOpts(opts) {
    }
    nextPage() {
        var self = this;
        var md = self.md;
        var kvObj = md.blockRefs["mainMd"];
        if (kvObj.mdClass.nextPage) {
            kvObj.mdClass.nextPage();
            return;
        }
    }

    prevPage() {
        var self = this;
        var md = self.md;
        var kvObj = md.blockRefs["mainMd"];
        if (kvObj.mdClass.prevPage) {
            kvObj.mdClass.prevPage();
            return;
        }
    }


    afterCreate() {
        var self = this;
        var md = self.md;
        var op = md.opts;
        var mainMd = md.blockRefs["mainMd"];
        if (op.buttonsOn_f === 0) {
            if (mainMd.stas.pageAll >= 2) {
                if (op.autoPage_f) {
                    op.buttonsOn_f = 1;
                    md.stas.newMd = md.reCreate();
                    return;
                }
            }
        }
        var obj = {};
        obj.act = "afterCreate";
        obj.sender = this.md;
        KvLib.exe(this.md.opts.actionFunc, obj);
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
        layouts[cname] = { name: cname, type: "Layout~Ly_base~array.sys0", opts: opts };
        lyMaps["body"] = cname;
        //======================================    
        var opts = {};
        md.setPns(opts);
        opts.margin = 0;
        blocks[cname] = { name: "basePanel", type: "Component~Cp_base~plate.sys0", opts: opts };
        //======================================    
        var cname = lyMaps["body"] + "~" + 0;
        var opts = {};
        mda.setMargin(opts, op);
        opts.ym = op.ym;
        var titleHeight = 0;
        if (op.title)
            titleHeight = op.titleHeight;
        var buttonHeight = 0;
        if (op.buttonsOn_f)
            buttonHeight = op.buttonHeight;
        opts.yArr = [titleHeight, 9999, buttonHeight];
        layouts[cname] = { name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts };
        lyMaps["main"] = cname;
        //====================================================
        var cname = lyMaps["main"] + "~" + 0;
        var opts = {};
        opts.xm = 10;
        opts.xArr = [9999];
        for (var i = 0; i < op.headButtons.length; i++) {
            opts.xArr.push(op.headButtonWidthes[i]);
        }
        layouts[cname] = { name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts };
        lyMaps["headBody"] = cname;
        var opts = {};
        opts.basePanel_f = 1;
        opts.baseColor = op.titleBaseColor;
        blocks[cname] = { name: "basePanel", type: "Component~Cp_base~plate.none", opts: opts };
        //====================================================
        var cname = lyMaps["headBody"] + "~" + 0;
        var opts = {};
        opts.fontFamily = "Impact";
        opts.innerText = op.title;
        opts.baseColor = op.titleBaseColor;
        opts.borderWidth = 0;
        if (op.headButtons.length) {
            opts.lpd = 4;
            opts.textAlign = "left";
        }
        blocks[cname] = { name: "basePanel", type: "Component~Cp_base~label.title", opts: opts };
        for (var i = 0; i < op.headButtons.length; i++) {
            var cname = lyMaps["headBody"] + "~" + (i + 1);
            var opts = {};
            opts.innerText = op.headButtons[i];
            opts.id = op.headButtonIds[i];
            opts.actionFunc = function (iobj) {
                console.log("MdaBox:");
                console.log(iobj);
                iobj.sender = md;
                KvLib.exe(op.actionFunc, iobj);
            };
            opts.maxFontSize = 30;
            blocks[cname] = { name: "headButton#" + i, type: "Component~Cp_base~button.sys0", opts: opts };
        }
        //=======================================    
        var cname = lyMaps["main"] + "~" + 2;
        var opts = {};
        opts.xc = op.buttons.length;
        opts.xm = op.buttonXm;
        opts.ew = op.buttonWidth;
        opts.wAlign = "center";
        layouts[cname] = { name: cname, type: "Layout~Ly_base~array.sys0", opts: opts };
        lyMaps["footBody"] = cname;
        if (op.viewPage_f) {
            var opts = {};
            opts.iw = 200;
            opts.wAlign = "left";
            opts.innerText = "";
            opts.fontSize = 16;
            opts.textAlign = "left";
            blocks[cname] = { name: "pageView", type: "Component~Cp_base~plate.none", opts: opts };
        }

        for (var i = 0; i < op.buttons.length; i++) {
            var cname = lyMaps["footBody"] + "~" + i;
            var opts = {};
            opts.innerText = op.buttons[i];
            opts.id = op.buttonIds[i];
            if (opts.id === "nextButton" || opts.id === "prevButton") {
                opts.mousePushCon_f = 1;
                opts.mouseClick_f = 0;
            }
            opts.actionFunc = function (iobj) {
                console.log(iobj);
                if (iobj.act === "mousePush") {
                    var obj = {};
                    obj.act = "checkPreChange";
                    obj.kvObj = md;
                    obj.sender = md;
                    var errStrs = KvLib.exeFunc(op.actionFunc, obj);
                    if (errStrs) {
                        iobj.kvObj.stas.mousePushAct_f = 0;
                        return;
                    }

                    if (iobj.kvObj.opts.id === "nextButton") {
                        md.mdClass.nextPage();
                        return;
                    }
                    if (iobj.kvObj.opts.id === "prevButton") {
                        md.mdClass.prevPage();
                        return;
                    }
                }
                iobj.sender = md;
                KvLib.exe(op.actionFunc, iobj);
            };
            blocks[cname] = { name: op.buttonIds[i], type: "Component~Cp_base~button.sys0", opts: opts };
        }
        //=======================================    
        var cname = lyMaps["main"] + "~" + 1;
        var opts = {};
        opts.ih = op.eh;
        layouts[cname] = { name: cname, type: "Layout~Ly_base~array.sys0", opts: opts };
        lyMaps["centerBody"] = cname;
        //=======================================
        var cname = lyMaps["centerBody"] + "~" + 0;
        op.ksObj.opts.actionFunc = function (iobj) {
            console.log(iobj);
            if (iobj.act === "newPage") {
                var md = self.md;
                iobj.sender = md;
                KvLib.exeFunc(op.actionFunc, iobj);
                var kvObj = md.blockRefs["pageView"];
                if (kvObj) {
                    var endRow = iobj.rowStart + iobj.pageRowAmt;
                    if (endRow >= iobj.totalRow) {
                        endRow = iobj.totalRow;
                        var disB = 1;
                    }
                    var str = (iobj.rowStart + 1) + "~" + endRow;
                    kvObj.opts.innerText = str + " / " + (iobj.totalRow);
                    if (iobj.totalRow === 0)
                        kvObj.opts.innerText = "0 / 0";
                    kvObj.reCreate();
                }
                if (iobj.yPosRate === 0)
                    var disA = 1;
                if (iobj.yPosRate === 1)
                    var disB = 1;


                var kvObj = md.blockRefs["prevButton"];
                if (kvObj && (kvObj.opts.disable_f !== disA)) {
                    kvObj.opts.disable_f = disA;
                    kvObj.reCreate();
                }
                var kvObj = md.blockRefs["nextButton"];
                if (kvObj && (kvObj.opts.disable_f !== disB)) {
                    kvObj.opts.disable_f = disB;
                    kvObj.reCreate();
                }
                return;
            }
            iobj.sender = self.md;
            return KvLib.exeFunc(op.actionFunc, iobj);

        };
        blocks[cname] = { name: "mainMd", type: op.ksObj.type, opts: op.ksObj.opts };
    }
}

class MdaSelector {
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);
        opts.baseColor = "#ccc";
        opts.xc = 2;
        opts.yc = 10;
        opts.xm = 0;
        opts.ym = 0;
        opts.tm = 0;
        opts.bm = 0;
        opts.eh = 50;
        opts.margin = 0;
        opts.textAlign = "center";
        opts.lpd = 0;
        opts.kvTexts = [];
        opts.startInx = 0;
        opts.selectInx = -1;
        opts.selectAble_f = 0;
        opts.selectEsc_f = 1;
        for (var i = 0; i < opts.xc * opts.yc; i++) {
            opts.kvTexts.push("item#" + i);
        }

        this.subTypeOpts(opts);
        return opts;
    }
    subTypeOpts(opts) {
        if (this.md.subType === "base.sys0") {
        }
    }
    newPage() {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        var lyMaps = md.lyMaps;
        var cname = lyMaps["body"] + "~" + 0;
        md.clearOpts(cname);
        md.reCreate();
    }
    nextPage() {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        if ((op.startInx + st.totalAmt) >= op.kvTexts.length)
            return;
        op.startInx += st.totalAmt;
        this.newPage();
    }
    prevPage() {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        if ((op.startInx - st.totalAmt) < 0)
            return;
        op.startInx -= st.totalAmt;
        this.newPage();
    }

    setSelect(selInx) {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        var selectInx = op.startInx + selInx;
        var kvObj = md.blockRefs["item#" + selectInx];
        if (!kvObj)
            return;
        op.selectInx = selectInx;


        var totalAmt = op.xc * op.yc;
        if (op.selectAble_f) {
            var index = op.startInx;
            for (var j = 0; j < totalAmt; j++) {
                var kvObj = md.blockRefs["item#" + index];
                if (kvObj) {
                    var elem = document.getElementById(kvObj.elemId);
                    elem.style.backgroundColor = "#ccc";
                }
                index++;
            }
            var kvObj = md.blockRefs["item#" + op.selectInx];
            var elem = document.getElementById(kvObj.elemId);
            elem.style.backgroundColor = "#88f";
        }
        var kvObj = md.blockRefs["item#" + op.selectInx];
        var iobj = {};
        iobj.sender = md;
        iobj.act = "selected";
        iobj.selectText = kvObj.opts.innerText;
        iobj.selectInx = op.selectInx;
        KvLib.exeFunc(op.actionFunc, iobj);
    }

    afterCreate() {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        var lyMaps = md.lyMaps;

        var cname = lyMaps["body"] + "~" + 0;
        var posObj = md.getRectObj(cname, md.layouts);
        if (op.eh) {
            op.yc = Math.round((posObj.h - op.tm - op.bm + op.xm) / (op.eh + op.xm));
        }
        var cname = lyMaps["body"] + "~" + 0;
        var opts = {};
        mda.setMargin(opts, op);
        opts.xc = op.xc;
        opts.yc = op.yc;
        opts.xm = op.xm;
        opts.ym = op.ym;
        md.newLayout(cname, opts, "Layout~Ly_base~array.sys0", "main");





        var totalAmt = op.xc * op.yc;
        st.totalAmt = totalAmt;
        var inx = op.startInx;
        for (var i = 0; i < totalAmt; i++) {
            if (inx >= op.kvTexts.length)
                break;
            var cname = lyMaps["main"] + "~" + i;
            var opts = {};
            opts.textAlign = op.textAlign;
            opts.lpd = op.lpd;
            opts.innerText = op.kvTexts[inx];
            if (opts.innerText === null) {
                inx++;
                continue;
            }

            opts.baseColor = "#cdc";
            if (op.selectInx === inx)
                opts.baseColor = "#88f";
            opts.actionFunc = function (iobj) {
                console.log(iobj);
                var itemCnt = KvLib.toInt(iobj.kvObj.name.split("#")[1], 0);
                var selInx = itemCnt - op.startInx;
                md.mdClass.setSelect(selInx);
                return;


                var index = op.startInx;
                if (op.selectAble_f) {
                    for (var j = 0; j < totalAmt; j++) {
                        var kvObj = md.blockRefs["item#" + index];
                        if (kvObj) {
                            var elem = document.getElementById(kvObj.elemId);
                            elem.style.backgroundColor = "#ccc";
                        }
                        index++;
                    }
                    var itemCnt = KvLib.toInt(iobj.kvObj.name.split("#")[1], 0);
                    op.selectInx = itemCnt;
                    var elem = document.getElementById(iobj.kvObj.elemId);
                    elem.style.backgroundColor = "#88f";
                }
                //if (op.selectEsc_f) {
                iobj.sender = md;
                iobj.act = "selected";
                iobj.selectText = iobj.kvObj.opts.innerText;
                iobj.selectInx = KvLib.toInt(iobj.kvObj.name.split("#")[1], -1);
                KvLib.exeFunc(op.actionFunc, iobj);
                //}
            };
            md.newBlock(cname, opts, "Component~Cp_base~button.sys0", "item#" + inx);
            inx++;
        }

        var obj = {};
        obj.act = "newPage";
        obj.totalAmt = st.totalAmt;
        obj.rowStart = op.startInx;
        obj.totalRow = Math.floor((op.kvTexts.length - 0.001) / st.totalAmt) + 1;
        obj.rowStart = Math.floor((op.startInx - 0.001) / st.totalAmt) + 1;
        KvLib.exeFunc(op.actionFunc, obj);
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
        layouts[cname] = { name: cname, type: "Layout~Ly_base~array.sys0", opts: opts };
        lyMaps["body"] = cname;
        //======================================    
        var opts = {};
        md.setPns(opts);
        opts.margin = 0;
        blocks[cname] = { name: "basePanel", type: "Component~Cp_base~plate.sys0", opts: opts };
        //======================================    
    }
}

class MdaArray {
    constructor() {
    }

    initOpts(md) {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);
        opts.baseColor = "rgba(0,0,0,0)";
        opts.xc = 10;
        opts.yc = 10;
        opts.xm = 0;
        opts.ym = 0;
        opts.ksObjs = [];
        for (var i = 0; i < opts.xc * opts.yc; i++) {
            var ksObj = {};
            ksObj.name = "item#" + i;
            ksObj.type = "Component~Cp_base~button.sys0";
            ksObj.opts = {};
            opts.ksObjs.push(ksObj);
        }

        this.subTypeOpts(opts);
        return opts;
    }

    subTypeOpts(opts) {
        if (this.md.subType === "base.sys0") {
        }
    }

    afterCreate() {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
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
        layouts[cname] = { name: cname, type: "Layout~Ly_base~array.sys0", opts: opts };
        lyMaps["body"] = cname;
        //======================================    
        var opts = {};
        md.setPns(opts);
        opts.margin = 0;
        blocks[cname] = { name: "basePanel", type: "Component~Cp_base~plate.sys0", opts: opts };
        //======================================    
        var cname = lyMaps["body"] + "~" + 0;
        var opts = {};
        mda.setMargin(opts, op);
        opts.xc = op.xc;
        opts.yc = op.yc;
        opts.xm = op.xm;
        opts.ym = op.ym;
        layouts[cname] = { name: cname, type: "Layout~Ly_base~array.sys0", opts: opts };
        lyMaps["main"] = cname;
        //======================================    
        var totalAmt = op.xc * op.yc;
        for (var i = 0; i < op.ksObjs.length; i++) {
            if (i >= totalAmt)
                break;
            var cname = lyMaps["main"] + "~" + i;
            var ksObj = op.ksObjs[i];
            var opts = ksObj.opts;
            opts.actionFunc = function (iobj) {
                iobj.sender = md;
                KvLib.exe(op.actionFunc, iobj);
            };
            blocks[cname] = { name: ksObj.name, type: ksObj.type, opts: opts };
        }
    }
}

class MdaBlockSelect {
    constructor() {
    }

    initOpts(md) {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);
        opts.margin = 0;
        opts.baseColor = "rgba(0,0,0,0)";
        opts.xm = 0;
        opts.ym = 0;
        this.subTypeOpts(opts);
        return opts;
    }

    subTypeOpts(opts) {
        if (this.md.subType === "base.sys0") {
        }
    }

    afterCreate() {
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
        layouts[cname] = { name: cname, type: "Layout~Ly_base~array.sys0", opts: opts };
        lyMaps["body"] = cname;
        //======================================    
        var opts = {};
        md.setPns(opts);
        opts.margin = 0;
        blocks[cname] = { name: "basePanel", type: "Component~Cp_base~plate.sys0", opts: opts };
        //======================================    
        var cname = lyMaps["body"] + "~" + 0;
        var opts = {};
        mda.setMargin(opts, op);
        opts.yArr = [30, 9999];
        layouts[cname] = { name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts };
        lyMaps["main"] = cname;
        //======================================    
        var cname = lyMaps["main"] + "~0";
        var opts = {};
        opts.innerText = op.csName;
        opts.insideShadowBlur = null;
        opts.borderRadius = 0;
        opts.baseColor = "#ccc";
        opts.fontSize = "0.5rh";
        blocks[cname] = { name: "name", type: "Component~Cp_base~button.sys0", opts: opts };
        var cname = lyMaps["main"] + "~1";
        var opts = {};
        opts.innerText = op.title;
        blocks[cname] = { name: "block", type: op.type, opts: op.opts };

    }
}

class MdaSetLine {
    constructor() {
    }

    initOpts(md) {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);
        opts.xc = 10;
        opts.yc = 10;
        opts.xm = 0;
        opts.ym = 0;
        opts.titleBorderWidth = 0;
        opts.borderWidth = 1;
        opts.titleBaseColor = "#ccc";
        var setOpts = opts.setOpts = {};
        setOpts.setType = "buttonActs";
        this.subTypeOpts(opts);
        return opts;
    }

    subTypeOpts(opts) {
        if (this.md.subType === "base.sys0") {
        }
    }

    setValue(value, save_f) {
        var md = this.md;
        var op = md.opts;
        op.setOpts.value = value;
        ;
        if (save_f)
            this.checkValue(1);
    }
    getValue(save_f) {
        var md = this.md;
        var op = md.opts;
        if (save_f)
            this.checkValue(1);
        return op.setOpts.value;
    }

    //checkType str,int,hex,float,ip,serial,obj
    //dataType str,int,float,obj
    //array array level 
    checkValue(save_f) {
        var self = this;
        var md = this.md;
        var op = md.opts;
        var setOpts = op.setOpts;

        var inputText = md.blockRefs["inputText"];
        if (inputText) {
            var inputElem = inputText.elems["inputText"];
        }
        if (setOpts.setType === "textArea") {
            var inputText = md.blockRefs["textArea"];
            var inputElem = inputText.elems["textArea"];
        }
        if (setOpts.setType === "incEnum") {
            return;
        }
        if (setOpts.setType === "pullEnum") {
            return;
        }
        if (inputText) {
            var inValue = inputElem.value.trim();
            var checkType = setOpts.dataType;
            if (setOpts.checkType)
                checkType = setOpts.checkType;
            if (!inValue) {
                if (setOpts.nullErr_f) {
                    return [setOpts.title, "Data cannot be null !!!"];
                } else {
                    if (save_f) {
                        if (setOpts.dataType === "str")
                            setOpts.value = "";
                        else
                            setOpts.value = null;
                    }
                    return;
                }
            }
            //============================
            var number_f = 0;
            if (setOpts.checkType === "int")
                number_f = 1;
            if (setOpts.checkType === "float")
                number_f = 1;
            if (setOpts.checkType === "hex")
                number_f = 1;
            var chkValueA = [];
            if (!setOpts.array)
                var chkValueA = [inValue];
            else
                var chkValueA = inValue.split(",");
            //============================
            var ivA = [];
            for (var i = 0; i < chkValueA.length; i++) {
                var iValue = chkValueA[i].trim();
                if (checkType === "obj") {
                    try {
                        var obj = JSON.parse(iValue);
                    } catch (ex) {
                        return [setOpts.title, "Data format error !!!"];
                    }
                    ivA.push(obj);
                    continue;
                }
                if (number_f) {
                    if (checkType === "int")
                        var iv = KvLib.strToInt(iValue, null);
                    if (checkType === "hex")
                        var iv = KvLib.hexStrToInt(iValue, null);
                    if (checkType === "float")
                        var iv = KvLib.strToFloat(iValue, null);
                    if (iv === null)
                        return [setOpts.title, KvLib.getKvText(syst.errorOfDataFormat).text];
                    if (setOpts.max !== null && setOpts.max !== undefined)
                        if (iv > setOpts.max) {
                            return [setOpts.title, KvLib.getKvText(syst.dataOverTheMax).text + setOpts.max + " !!!"];
                        }
                    if (setOpts.min !== null && setOpts.min !== undefined)
                        if (iv < setOpts.min) {
                            return [setOpts.title, KvLib.getKvText(syst.dataLessTheMin).text + setOpts.min + " !!!"];
                        }
                    if (setOpts.dataType === "str")
                        ivA.push(iValue);
                    else
                        ivA.push(iv);
                }
                if (checkType === "ip") {
                    var strA = iValue.split(".");
                    if (strA.length !== 4)
                        return [setOpts.title, "Data format error !!!"];
                    for (var i = 0; i < strA.length; i++) {
                        var vv = KvLib.strToInt(strA[i], -1);
                        if (vv < 0 || vv > 255)
                            return [setOpts.title, "Data format error !!!"];
                    }
                    ivA.push(iValue);
                }
                if (checkType === "color") {
                    var color = KvLib.transColor(iValue, null);
                    if (color === null)
                        return [setOpts.title, "Data format error !!!"];
                    ivA.push(iValue);
                }
                if (checkType === "kvType") {
                    if (KvLib.checkKvType(iValue, null) === null) {
                        return [setOpts.title, "Data format error !!!"];
                    }
                    ivA.push(iValue);
                }
            }
            if (save_f) {
                var chg = 0;
                var newValue = inValue;
                if (setOpts.array) {
                    if (setOpts.dataType !== "str") {
                        newValue = ivA;
                    } else {
                        if (setOpts.dataType !== "str")
                            newValue = ivA[0];
                    }
                } else {
                    if (setOpts.dataType !== "str")
                        newValue = ivA[0];

                }
                var chg_f = 0;
                if (setOpts.array) {
                    for (var i = 0; i < newValue.length; i++) {
                        if (newValue[1] !== setOpts.value) {
                            chg_f = 1;
                            break;
                        }
                    }
                } else {
                    if (newValue !== setOpts.value)
                        chg_f = 1;
                }


                setOpts.value = newValue;
                if (chg_f) {
                    var obj = {};
                    obj.kvObj = md;
                    obj.setOptsObj = md;
                    obj.act = "checkChanged";
                    obj.sender = md;
                    obj.value = setOpts.value;
                    KvLib.exe(op.actionFunc, obj);
                }
            }
            return;


        }
    }
    chkWatch() {

    }

    addInputText(inStr, setAll_f) {
        var self = this;
        var md = self.md;
        if (md.opts.setOpts.setType === "inputText") {
            var inputText = md.blockRefs["inputText"];
            var inputElem = inputText.elems["inputText"];
        } else {
            var inputText = md.blockRefs["textArea"];
            var inputElem = inputText.elems["textArea"];
        }
        if (setAll_f) {
            inputElem.selectionStart = 0;
            inputElem.selectionEnd = -1;
        }
        var selst = inputElem.selectionStart;
        var selend = inputElem.selectionEnd;
        inputElem.value = KvLib.stringSplice(inputElem.value, selst, selend - selst, inStr);
        inputElem.focus();
        inputElem.setSelectionRange(selst + 1, selst + 1);
    }

    inputTextAct(act, value) {
        var self = this;
        var md = this.md;
        var op = md.opts;
        var st = md.stas;

        if (op.setOpts.setType === "inputText") {
            var inputText = md.blockRefs["inputText"];
            var inputElem = inputText.elems["inputText"];
        } else {
            var inputText = md.blockRefs["textArea"];
            var inputElem = inputText.elems["textArea"];
        }


        if (act === "clr") {
            self.addInputText("", 1);
            return;
        }
        if (act === "home") {
            inputElem.focus();
            inputElem.setSelectionRange(0, 0);
            return;
        }
        if (act === "left") {
            inputElem.focus();
            var pos = inputElem.selectionStart;
            if (pos === inputElem.selectionEnd) {
                if (pos)
                    pos--;
                inputElem.setSelectionRange(pos, pos);
                return;
            }
            inputElem.setSelectionRange(pos, pos);
            return;
        }
        if (act === "right") {
            inputElem.focus();
            var pos = inputElem.selectionStart;
            var end = inputElem.selectionEnd;
            if (pos === end) {
                pos++;
                inputElem.setSelectionRange(pos, pos);
                return;
            }
            inputElem.setSelectionRange(end, end);
            return;
        }



        if (act === "end") {
            inputElem.focus();
            inputElem.setSelectionRange(-1, -1);
            return;
        }
        if (act === "del") {
            var pos = inputElem.selectionStart;
            if (pos === inputElem.selectionEnd)
                inputElem.selectionEnd = pos + 1;
            self.addInputText("");
            inputElem.setSelectionRange(pos, pos);
            return;
        }
        if (act === "back") {
            var pos = inputElem.selectionStart;
            if (pos === inputElem.selectionEnd) {
                if (pos > 0) {
                    pos--;
                    inputElem.selectionStart = pos;
                    self.addInputText("");
                    inputElem.setSelectionRange(pos, pos);
                }
                return;
            }
            self.addInputText("");
            inputElem.setSelectionRange(pos, pos);
            return;
        }
    }

    actButtonAction(iobj) {
        console.log(iobj);
        var self = this;
        var md = self.md;
        var op = md.opts;
        var setOpts = md.opts.setOpts;

        var dt = setOpts.dataType;
        if (iobj.buttonId === "value") {//for range use
            var sop = op.setOpts;
            var kobj = md.blockRefs["inputRange"];
            var elem = kobj.elems["inputRange"];

            var opts = {};
            opts.title = sop.title;

            var tmpSetOpts = KvLib.copyObj(sop);
            tmpSetOpts.titleWidth = 0;
            tmpSetOpts.noWidth = 0;
            tmpSetOpts.iconWidth = 0;
            tmpSetOpts.value = elem.value;
            tmpSetOpts.setType = "inputText";
            var actButtons = ["inc", "dec"];
            tmpSetOpts.actButtons = actButtons;
            opts.setOpts = tmpSetOpts;
            opts.actionFunc = function (iobj) {
                console.log(iobj);
                if (iobj.buttonId === "enter") {
                    var inputTextObj = md.blockRefs["inputText"];
                    op.setOpts.value = KvLib.toInt(iobj.inputText, 0);
                    var valueStr = iobj.inputText;
                    if (op.setOpts.fixed) {
                        if (op.setOpts.dataType === "float") {
                            op.setOpts.value = KvLib.strToFloat(iobj.inputText, 0);
                            valueStr = op.setOpts.value.toFixed(op.setOpts.fixed);
                        }
                    }
                    var kobj = md.blockRefs["actButton#value"];
                    kobj.opts.innerText = valueStr;
                    kobj.reCreate();
                    var kobj = md.blockRefs["inputRange"];
                    kobj.opts.editValue = op.setOpts.value;
                    kobj.reCreate();
                }
            };
            if (sop.dataType === "int")
                box.intPadBox(opts);
            if (sop.dataType === "float")
                box.floatPadBox(opts);
            return;
        }
        if (iobj.buttonId === "pull") {
            var opts = {};
            opts.actionFunc = function (iobj) {
                console.log(iobj);
                //maskClickFunc();
                MdaPopWin.popOffTo(iobj.sender.opts.popStackCnt);
                iobj.sender = md;
                iobj.setOptsObj = md;
                var textValue = KvLib.getKvText(iobj.kvText, "").text;

                var kobj = md.blockRefs["inputText"];
                kobj.opts.editValue = textValue;
                var elem = kobj.elems["inputText"];
                if (elem)
                    elem.value = "" + textValue;

                if (setOpts.setType === "pullEnum") {
                    setOpts.value = KvLib.trsIntStrToInt(iobj.itemId.split("#")[1], 0);
                }


                var errStrs = md.mdClass.checkValue(1);
                if (errStrs) {
                    box.errorBox({ kvTexts: errStrs });
                    return;
                }


                KvLib.exeFunc(op.actionFunc, iobj);
            };
            opts.menus = dbg.getMenus("menu0", setOpts.enum.length);
            for (var i = 0; i < setOpts.enum.length; i++) {
                opts.menus.kvTexts[i].eng = "" + setOpts.enum[i];
            }
            var listObj = new Block("testList", "Model~MdaList~base.sys0", opts);
            listObj.stas.listSize = listObj.mdClass.getListSize(listObj.setOpts);

            var kobj = md.blockRefs["inputText"];
            var opts = {};
            opts.kvObj = listObj;
            opts.w = kobj.stas.cw;
            opts.h = listObj.stas.listSize.h;
            opts.center_f = 0;
            var elem = kobj.elems["inputText"];
            var pos = KvLib.getPosition(elem);
            opts.x = pos.x - 3;
            opts.y = pos.y + kobj.stas.ch;
            opts.maskColor = "rgba(0,0,0,0)";
            mda.popObjOpts(opts);
            return;
        }
        if (iobj.buttonId === "act") {
            if (md.opts.setOpts.dataType === "color") {
                var opts = {};
                opts.actionFunc = function (iobj) {
                    console.log(iobj);
                    var inputTextObj = md.blockRefs["inputText"];
                    var elem = inputTextObj.elems["inputText"];
                    elem.value = iobj.color;
                    var colorPlate = md.blockRefs["colorPlate"];
                    var elem = colorPlate.elems["base"];
                    elem.style.backgroundColor = iobj.color;
                };
                var inputTextObj = md.blockRefs["inputText"];
                var elem = inputTextObj.elems["inputText"];
                opts.color = elem.value;
                box.pickColorBox(opts);
                return;
            }
            iobj.sender = md;
            iobj.kvObj = md;
            iobj.act = "actButtonClick";
            KvLib.exe(md.opts.actionFunc, iobj);
        }

        if (iobj.buttonId === "pad" || iobj.buttonId === "edit") {
            var sop = md.opts.setOpts;
            var kobj = md.blockRefs["inputText"];
            if (sop.setType === "textArea") {
                var kobj = md.blockRefs["textArea"];
                var elem = kobj.elems["textArea"];
            } else {
                var kobj = md.blockRefs["inputText"];
                var elem = kobj.elems["inputText"];
                if (setOpts.fixed)
                    kobj.opts.editValue = setOpts.value.toFixed(setOpts.fixed);
            }

            var opts = {};
            opts.actionFunc = function (iiobj) {
                console.log(iiobj);
                if (iiobj.act === "padEnter") {
                    if (iobj.actionFunc) {
                        KvLib.exeFunc(iobj.actionFunc, iiobj);
                        return;
                    }



                    var inputTextObj = md.blockRefs["inputText"];
                    if (inputTextObj) {
                        var elem = inputTextObj.elems["inputText"];
                    } else {
                        var inputTextObj = md.blockRefs["textArea"];
                        var elem = inputTextObj.elems["textArea"];
                    }
                    elem.value = iiobj.inputText;
                    var errStrs = md.mdClass.checkValue(1);
                    if (errStrs) {
                        box.errorBox({ kvTexts: errStrs });
                        return;
                    }
                    var oobj = {};
                    oobj.sender = md;
                    oobj.setOptsObj = md;
                    oobj.act = "pressEnter";
                    oobj.kvObj = inputTextObj;
                    KvLib.exeFunc(op.actionFunc, oobj);
                    return;
                }
                var oobj = {};
                oobj.sender = md;
                oobj.setOptsObj = md;
                oobj.act = "pressEnter";
                oobj.value = iobj.inputText;
                KvLib.exeFunc(op.actionFunc, oobj);
            };
            opts.title = sop.title;
            opts.value = elem.value;

            var tmpSetOpts = KvLib.copyObj(setOpts);
            tmpSetOpts.watchDatas = [];
            tmpSetOpts.titleWidth = 0;
            tmpSetOpts.noWidth = 0;
            tmpSetOpts.iconWidth = 0;
            tmpSetOpts.checkWidth = 0;
            tmpSetOpts.value = elem.value;
            if (iobj.buttonId === "edit")
                tmpSetOpts.readOnly_f = 0;
            opts.setOpts = tmpSetOpts;

            if (sop.dataType === "color") {
                box.colorPadBox(opts);
                return;
            }
            if (sop.checkType === "float") {
                box.floatPadBox(opts);
                return;
            }
            if (sop.checkType === "hex") {
                box.hexPadBox(opts);
                return;
            }
            if (sop.checkType === "intHex") {
                box.intHexPadBox(opts);
                return;
            }
            if (sop.checkType === "int") {
                box.intPadBox(opts);
                return;
            }
            if (sop.checkType === "nature") {
                box.intPadBox(opts);
                return;
            }
            if (sop.checkType === "ip") {
                box.floatPadBox(opts);
                return;
            }

            box.keyboardBox(opts);
            return;
        }


        if (iobj.buttonId === "inc" || iobj.buttonId === "dec") {
            var kobj = md.blockRefs["inputText"];
            var preValue = md.opts.setOpts.value;
            kobj.opts.editValue = md.opts.setOpts.value;
            var elem = kobj.elems["inputText"];
            if (dt === "kvType") {
                dt = "int";
            }
            if (dt === "int") {
                if (setOpts.setType === "incEnum") {
                    if (iobj.buttonId === "inc")
                        setOpts.value++;
                    if (iobj.buttonId === "dec")
                        setOpts.value--;
                    if (setOpts.value >= setOpts.enum.length)
                        setOpts.value = setOpts.enum.length - 1;
                    if (setOpts.value < 0)
                        setOpts.value = 0;
                    elem.value = setOpts.enum[setOpts.value];
                } else {
                    if (setOpts.checkType === "hex")
                        var value = KvLib.hexStrToInt(elem.value, null);
                    else
                        var value = KvLib.toInt(elem.value, null);

                    if (value === null)
                        return;
                    if (iobj.buttonId === "inc")
                        value++;
                    else
                        value--;
                    if (setOpts.min !== undefined && setOpts.min !== null) {
                        if (value < setOpts.min)
                            if (setOpts.loop_f)
                                value = setOpts.max;
                            else
                                value = setOpts.min;

                    }
                    if (setOpts.max !== undefined && setOpts.max !== null) {
                        if (value > setOpts.max) {
                            if (setOpts.loop_f)
                                value = setOpts.min;
                            else
                                value = setOpts.max;
                        }
                    }
                    if (setOpts.checkType === "hex") {
                        if (value < 0)
                            value = 0;
                    }
                    setOpts.value = value;
                    if (setOpts.checkType === "hex")
                        elem.value = "" + setOpts.value.toString(16);
                    else
                        elem.value = "" + setOpts.value;
                }
                elem.setSelectionRange(-1, -1);
                iobj.act = "valueChanged";
                iobj.setOptsObj = md;
                iobj.sender = md;
                iobj.value = setOpts.value;
                iobj.preValue = preValue;
                KvLib.exe(op.actionFunc, iobj);
                return;

            }

        }

    }

    reNew() {
        var self = this;
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        var retFunc = function (iobj) {
            console.log(iobj);
            /*
             if (iobj.kvObj.name === "inputText") {
             if (iobj.act === "pressEnter") {
             console.log(iobj);
             var errStrs = md.mdClass.checkValue(1);
             if (errStrs) {
             box.errorBox({kvTexts: errStrs});
             return;
             }
             iobj.sender = md;
             iobj.setOpts = md.opts.setOpts;
             KvLib.exeFunc(op.actionFunc, iobj);
             return;
             }
             }*
             * 
             */
            if (iobj.act === "blur") {
                iobj.sender = md;
                iobj.setOptsObj = md;
                KvLib.exeFunc(op.actionFunc, iobj);
                return;
            }
            if (iobj.act === "pressEnter") {
                var errStrs = md.mdClass.checkValue(1);
                if (errStrs) {
                    box.errorBox({ kvTexts: errStrs });
                    return;
                }
                iobj.sender = md;
                iobj.setOptsObj = md;
                KvLib.exeFunc(op.actionFunc, iobj);

                var colorPlate = md.blockRefs["colorPlate"];
                if (colorPlate) {
                    var elem = colorPlate.elems["base"];
                    elem.style.backgroundColor = iobj.value;
                }


                return;
            }
            if (iobj.act === "escape") {
                console.log(iobj);
                iobj.sender = md;
                iobj.setOptsObj = md;
                KvLib.exeFunc(op.actionFunc, iobj);
            }
            if (iobj.act === "blur") {
                var inputText = md.blockRefs["inputText"];
                var errStrs = md.mdClass.checkValue(1);
                if (errStrs) {
                    box.errorBox({ kvTexts: errStrs });
                    return;
                }
            }
            if (iobj.act === "valueChange") {
                if (op.setOpts.setType === "inputRange") {
                    var kobj = md.blockRefs["actButton#value"];
                    kobj.opts.innerText = "" + iobj.value;
                    op.setOpts.value = iobj.value;
                    kobj.reCreate();
                    iobj.sender = md;
                    iobj.setOptsObj = md;
                    KvLib.exeFunc(op.actionFunc, iobj);
                }
            }
        };
        var cname = md.lyMaps["body"] + "~" + 0;
        md.clearOptsAll(cname);
        var setOpts = op.setOpts;
        var opts = {};
        md.setMargin(opts);
        var expandWidth = KvLib.setValue(setOpts.expandWidth, 0);
        var checkWidth = KvLib.setValue(setOpts.checkWidth, 0);
        var noWidth = KvLib.setValue(setOpts.noWidth, 0);
        var iconWidth = KvLib.setValue(setOpts.iconWidth, 0);
        var titleWidth = KvLib.setValue(setOpts.titleWidth, 0);
        var unitWidth = KvLib.setValue(setOpts.unitWidth, 0);
        opts.xArr = [expandWidth, checkWidth, noWidth, iconWidth, titleWidth, 9999, unitWidth];
        var actButtons = KvLib.setValue(setOpts.actButtons, []);
        var actButtonWidth = KvLib.setValue(setOpts.actButtonWidth, 50);
        for (var i = 0; i < actButtons.length; i++) {
            var ww = actButtonWidth;
            if (setOpts.readOnly_f) {
                if (actButtons[i] === "pad")
                    ww = 0;
            }
            opts.xArr.push(ww);
        }
        md.newLayout(cname, opts, "Layout~Ly_base~xyArray.sys0", "main");

        if (expandWidth) {
            var cname = md.lyMaps["main"] + "~" + 0;
            var opts = {};
            opts.actionFunc = function (iobj) {
                console.log(iobj);
                iobj.sender = md;
                iobj.setOptsObj = md;
                if (md.opts.setOpts.value)
                    iobj.act = "collaps";
                else
                    iobj.act = "expand";
                iobj.groupName = md.opts.setOpts.group;
                var strA = md.name.split("#");
                var strB = strA[1].split(".");
                iobj.index = KvLib.toInt(strB[0], 0);
                KvLib.exeFunc(op.actionFunc, iobj);

            };
            if (setOpts.setType === "group") {
                if (setOpts.value)
                    opts.innerText = "-";
                else
                    opts.innerText = "+";
                opts.fontSize = "0.5rh";
                md.newBlock(cname, opts, "Component~Cp_base~button.sys0", "buttonExpand");
            }
        }
        if (checkWidth) {
            var cname = md.lyMaps["main"] + "~" + 1;
            var opts = {};
            opts.actionFunc = function (iobj) {
                console.log(iobj);
                if (iobj.kvObj.opts.innerText.length) {
                    iobj.kvObj.opts.innerText = '';
                    setOpts.checked_f = 0;
                    iobj.kvObj.reCreate();
                } else {
                    iobj.kvObj.opts.innerText = '<i class="gf">&#xe5ca</i>';
                    setOpts.checked_f = 1;
                    iobj.kvObj.reCreate();
                }
            };
            opts.innerText = "";
            opts.innerTextColor = "#080";
            opts.baseColor = "#eef";
            if (setOpts.checked_f) {
                opts.innerText = '<i class="gf">&#xe5ca</i>';
            }
            md.newBlock(cname, opts, "Component~Cp_base~button.sys0", "buttonCheck");
        }
        if (noWidth) {
            var cname = md.lyMaps["main"] + "~" + 2;
            var opts = {};
            opts.innerText = setOpts.no;
            opts.borderType = "gridTr";
            opts.textAlign = "left";
            opts.fontSize = "0.5rh";
            opts.baseColor = "#eef";
            opts.lpd = 4;
            md.newBlock(cname, opts, "Component~Cp_base~label.sys0", "labelNo");
        }
        if (iconWidth) {
            var cname = md.lyMaps["main"] + "~" + 3;
            var opts = {};
            if (!op.setOpts.image)
                opts.backgroundImageUrls = [];
            else
                opts.backgroundImageUrls = [op.setOpts.image];
            opts.borderType = "gridTr";
            opts.borderWidth = 0;
            opts.borderColor = "#888";
            md.newBlock(cname, opts, "Component~Cp_base~icons.sys0", "labelTitle");
        }
        if (titleWidth) {
            var cname = md.lyMaps["main"] + "~" + 4;
            var opts = {};
            opts.innerText = setOpts.title;
            opts.fontSize = setOpts.titleFontSize;
            if (!setOpts.titleFontSize)
                opts.fontSize = 20;
            opts.baseColor = op.titleBaseColor;
            opts.textAlign = "left";
            opts.lpd = 4;
            opts.borderWidth = op.titleBorderWidth;
            md.newBlock(cname, opts, "Component~Cp_base~label.sys0", "labelTitle");
        }
        if (unitWidth) {
            var cname = md.lyMaps["main"] + "~" + 6;
            var opts = {};
            opts.innerText = setOpts.unit;
            opts.fontSize = setOpts.unitFontSize;
            if (!opts.fontSize)
                opts.fontSize = 14;
            opts.baseColor = op.titleBaseColor;
            opts.textAlign = "left";
            opts.lpd = 4;
            opts.borderWidth = 0;
            md.newBlock(cname, opts, "Component~Cp_base~label.sys0", "labelTitle");
        }

        for (var i = 0; i < actButtons.length; i++) {
            var cname = md.lyMaps["main"] + "~" + (7 + i);
            var opts = {};
            if (actButtons[i] === "inc") {
                opts.innerText = '<i class="gf">&#xe145</i>';
                opts.mousePushCon_f = 1;
                opts.mouseClick_f = 0;
            }
            if (actButtons[i] === "dec") {
                opts.mousePushCon_f = 1;
                opts.mouseClick_f = 0;
                opts.innerText = '<i class="gf">&#xe15b</i>';
            }
            if (actButtons[i] === "pull")
                opts.innerText = '<i class="gf">&#xead0</i>';
            if (actButtons[i] === "pad")
                opts.innerText = '<i class="gf">&#xf028</i>';
            if (actButtons[i] === "act")
                opts.innerText = '<i class="gf">&#xe8b8</i>';
            if (actButtons[i] === "edit")
                opts.innerText = '<i class="gf">&#xe3c9</i>';
            if (actButtons[i] === "value")
                opts.innerText = setOpts.value;
            if (actButtons[i] === "color") {
                opts.innerText = "A";
                md.newBlock(cname, opts, "Component~Cp_base~plate.sys0", "colorBase");
                var opts = {};
                opts.baseColor = op.setOpts.value;
                opts.borderColor = "#000";
                md.newBlock(cname + "#0", opts, "Component~Cp_base~plate.sys0", "colorPlate");
                continue;
            }
            opts.actionFunc = function (iobj) {
                console.log(iobj);
                var dt = setOpts.dataType;
                var strA = iobj.kvObj.name.split("#");
                var obj = {};
                obj.buttonId = strA[1];
                self.actButtonAction(obj);
                return;
                if (strA[1] === "value") {//for range use
                    var sop = op.setOpts;
                    var kobj = md.blockRefs["inputRange"];
                    var elem = kobj.elems["inputRange"];

                    var opts = {};
                    opts.title = sop.title;

                    var tmpSetOpts = KvLib.copyObj(sop);
                    tmpSetOpts.titleWidth = 0;
                    tmpSetOpts.noWidth = 0;
                    tmpSetOpts.iconWidth = 0;
                    tmpSetOpts.value = elem.value;
                    tmpSetOpts.setType = "inputText";
                    var actButtons = ["inc", "dec"];
                    tmpSetOpts.actButtons = actButtons;
                    opts.setOpts = tmpSetOpts;
                    opts.actionFunc = function (iobj) {
                        console.log(iobj);
                        if (iobj.buttonId === "enter") {
                            var inputTextObj = md.blockRefs["inputText"];
                            op.setOpts.value = KvLib.toInt(iobj.inputText, 0);
                            var valueStr = iobj.inputText;
                            if (op.setOpts.fixed) {
                                if (op.setOpts.dataType === "float") {
                                    op.setOpts.value = KvLib.strToFloat(iobj.inputText, 0);
                                    valueStr = op.setOpts.value.toFixed(op.setOpts.fixed);
                                }
                            }
                            var kobj = md.blockRefs["actButton#value"];
                            kobj.opts.innerText = valueStr;
                            kobj.reCreate();
                            var kobj = md.blockRefs["inputRange"];
                            kobj.opts.editValue = op.setOpts.value;
                            kobj.reCreate();
                        }
                    };
                    if (sop.dataType === "int")
                        box.intPadBox(opts);
                    if (sop.dataType === "float")
                        box.floatPadBox(opts);
                    return;
                }
                if (strA[1] === "pull") {
                    var opts = {};
                    opts.actionFunc = function (iobj) {
                        console.log(iobj);
                        //maskClickFunc();
                        MdaPopWin.popOffTo(iobj.sender.opts.popStackCnt);
                        iobj.sender = md;
                        iobj.setOptsObj = md;
                        var textValue = KvLib.getKvText(iobj.kvText, "").text;

                        var kobj = md.blockRefs["inputText"];
                        kobj.opts.editValue = textValue;
                        var elem = kobj.elems["inputText"];
                        if (elem)
                            elem.value = "" + textValue;

                        if (setOpts.setType === "pullEnum") {
                            setOpts.value = KvLib.trsIntStrToInt(iobj.itemId.split("#")[1], 0);
                        }


                        var errStrs = md.mdClass.checkValue(1);
                        if (errStrs) {
                            box.errorBox({ kvTexts: errStrs });
                            return;
                        }


                        KvLib.exeFunc(op.actionFunc, iobj);
                    };
                    opts.menus = dbg.getMenus("menu0", setOpts.enum.length);
                    for (var i = 0; i < setOpts.enum.length; i++) {
                        opts.menus.kvTexts[i].eng = "" + setOpts.enum[i];
                    }
                    var listObj = new Block("testList", "Model~MdaList~base.sys0", opts);
                    listObj.stas.listSize = listObj.mdClass.getListSize(listObj.setOpts);

                    var kobj = md.blockRefs["inputText"];
                    var opts = {};
                    opts.kvObj = listObj;
                    opts.w = kobj.stas.cw;
                    opts.h = listObj.stas.listSize.h;
                    opts.center_f = 0;
                    var elem = kobj.elems["inputText"];
                    var pos = KvLib.getPosition(elem);
                    opts.x = pos.x - 3;
                    opts.y = pos.y + kobj.stas.ch;
                    opts.maskColor = "rgba(0,0,0,0)";
                    mda.popObjOpts(opts);
                    return;
                }
                if (strA[1] === "act") {
                    if (md.opts.setOpts.dataType === "color") {
                        var opts = {};
                        opts.actionFunc = function (iobj) {
                            console.log(iobj);
                            var inputTextObj = md.blockRefs["inputText"];
                            var elem = inputTextObj.elems["inputText"];
                            elem.value = iobj.color;
                            var colorPlate = md.blockRefs["colorPlate"];
                            var elem = colorPlate.elems["base"];
                            elem.style.backgroundColor = iobj.color;
                        };
                        var inputTextObj = md.blockRefs["inputText"];
                        var elem = inputTextObj.elems["inputText"];
                        opts.color = elem.value;
                        box.pickColorBox(opts);
                        return;
                    }

                }
                if (strA[1] === "pad" || strA[1] === "edit") {
                    var sop = md.opts.setOpts;
                    var kobj = md.blockRefs["inputText"];
                    if (sop.setType === "textArea") {
                        var kobj = md.blockRefs["textArea"];
                        var elem = kobj.elems["textArea"];
                    } else {
                        var kobj = md.blockRefs["inputText"];
                        var elem = kobj.elems["inputText"];
                        if (setOpts.fixed)
                            kobj.opts.editValue = setOpts.value.toFixed(setOpts.fixed);
                    }
                    var opts = {};
                    opts.actionFunc = function (iobj) {
                        console.log(iobj);
                        if (iobj.act === "padEnter") {
                            var inputTextObj = md.blockRefs["inputText"];
                            if (inputTextObj) {
                                var elem = inputTextObj.elems["inputText"];
                            } else {
                                var inputTextObj = md.blockRefs["textArea"];
                                var elem = inputTextObj.elems["textArea"];
                            }
                            elem.value = iobj.inputText;
                            var errStrs = md.mdClass.checkValue(1);
                            if (errStrs) {
                                box.errorBox({ kvTexts: errStrs });
                                return;
                            }
                            iobj.sender = md;
                            iobj.setOptsObj = md;
                            iobj.act = "pressEnter";
                            iobj.kvObj = inputTextObj;
                            KvLib.exeFunc(op.actionFunc, iobj);
                            return;
                        }
                        iobj.sender = md;
                        iobj.setOptsObj = md;
                        iobj.act = "pressEnter";
                        iobj.value = iobj.inputText;
                        KvLib.exeFunc(op.actionFunc, iobj);
                    };
                    opts.title = sop.title;
                    opts.value = elem.value;

                    var tmpSetOpts = KvLib.copyObj(setOpts);
                    tmpSetOpts.watchDatas = [];
                    tmpSetOpts.titleWidth = 0;
                    tmpSetOpts.noWidth = 0;
                    tmpSetOpts.iconWidth = 0;
                    tmpSetOpts.checkWidth = 0;
                    tmpSetOpts.value = elem.value;
                    if (strA[1] === "edit")
                        tmpSetOpts.readOnly_f = 0;
                    opts.setOpts = tmpSetOpts;

                    if (sop.dataType === "color") {
                        box.colorPadBox(opts);
                        return;
                    }
                    if (sop.dataType === "float") {
                        box.floatPadBox(opts);
                        return;
                    }
                    if (sop.dataType === "int") {
                        if (sop.checkType === "hex") {
                            box.hexPadBox(opts);
                            return;
                        }
                        if (sop.checkType === "intHex") {
                            box.intHexPadBox(opts);
                            return;
                        }
                        box.intPadBox(opts);
                        return;
                    }
                    if (sop.checkType === "ip") {
                        box.floatPadBox(opts);
                        return;
                    }

                    box.keyboardBox(opts);
                    return;
                }


                if (strA[1] === "inc" || strA[1] === "dec") {
                    var kobj = md.blockRefs["inputText"];
                    var preValue = md.opts.setOpts.value;
                    kobj.opts.editValue = md.opts.setOpts.value;
                    var elem = kobj.elems["inputText"];
                    if (dt === "kvType") {
                        dt = "int";
                    }
                    if (dt === "int") {
                        if (setOpts.setType === "incEnum") {
                            if (strA[1] === "inc")
                                setOpts.value++;
                            if (strA[1] === "dec")
                                setOpts.value--;
                            if (setOpts.value >= setOpts.enum.length)
                                setOpts.value = setOpts.enum.length - 1;
                            if (setOpts.value < 0)
                                setOpts.value = 0;
                            elem.value = setOpts.enum[setOpts.value];
                        } else {
                            if (setOpts.checkType === "hex")
                                var value = KvLib.hexStrToInt(elem.value, null);
                            else
                                var value = KvLib.toInt(elem.value, null);

                            if (value === null)
                                return;
                            if (strA[1] === "inc")
                                value++;
                            else
                                value--;
                            if (setOpts.min !== undefined && setOpts.min !== null) {
                                if (value < setOpts.min)
                                    if (setOpts.loop_f)
                                        value = setOpts.max;
                                    else
                                        value = setOpts.min;

                            }
                            if (setOpts.max !== undefined && setOpts.max !== null) {
                                if (value > setOpts.max) {
                                    if (setOpts.loop_f)
                                        value = setOpts.min;
                                    else
                                        value = setOpts.max;
                                }
                            }
                            if (setOpts.checkType === "hex") {
                                if (value < 0)
                                    value = 0;
                            }
                            setOpts.value = value;
                            if (setOpts.checkType === "hex")
                                elem.value = "" + setOpts.value.toString(16);
                            else
                                elem.value = "" + setOpts.value;
                        }
                        elem.setSelectionRange(-1, -1);
                        iobj.act = "valueChanged";
                        iobj.setOptsObj = md;
                        iobj.sender = md;
                        iobj.value = setOpts.value;
                        iobj.preValue = preValue;
                        KvLib.exe(op.actionFunc, iobj);
                        return;

                    }

                }

            };
            opts.insideShadowBlur = null;
            opts.borderRadius = 0;
            md.newBlock(cname, opts, "Component~Cp_base~button.sys0", "actButton#" + actButtons[i]);
        }

        var cname = md.lyMaps["main"] + "~" + 5;
        if (setOpts.setType === "labelViews") {
            var opts = {};
            opts.xc = setOpts.enum.length;
            opts.xm = setOpts.xm;
            if (setOpts.lm)
                opts.lm = setOpts.lm;
            if (setOpts.rm)
                opts.rm = setOpts.rm;
            md.newLayout(cname, opts, "Layout~Ly_base~array.sys0", "mainBody");
            for (var i = 0; i < setOpts.enum.length; i++) {
                var cname = md.lyMaps["mainBody"] + "~" + i;
                var opts = {};
                opts.innerText = setOpts.enum[i];
                opts.baseColor = "#ccc";
                if (setOpts.enumColors) {
                    opts.baseColor = setOpts.enumColors[i];
                }
                if (setOpts.fontSize)
                    opts.fontSize = setOpts.fontSize;
                opts.actionFunc = function (iobj) {
                    console.log(iobj);
                    iobj.sender = md;
                    iobj.setOptsObj = md;
                    var strA = iobj.kvObj.name.split("#");
                    var inx = KvLib.toInt(strA[1]);
                    iobj.buttonInx = inx;
                    iobj.buttonText = md.opts.setOpts.enum[inx];
                    KvLib.exeFunc(op.actionFunc, iobj);
                };
                md.newBlock(cname, opts, "Component~Cp_base~label.sys0", "labelMain#" + i);
            }
            return;
        }
        if (setOpts.setType === "ledView") {
            var opts = {};
            if (setOpts.lm)
                opts.lm = setOpts.lm;
            if (setOpts.rm)
                opts.rm = setOpts.rm;
            opts.innerText = setOpts.value;
            opts.baseColor = setOpts.editBaseColor;
            if (setOpts.fontSize)
                opts.fontSize = setOpts.fontSize;
            md.newBlock(cname, opts, "Component~Cp_base~label.led", "labelMain#" + i);
            return;
        }
        if (setOpts.setType === "led") {
            var opts = {};
            opts.backgroundInx = setOpts.value;
            if (setOpts.watchDatas) {
                for (var i = 0; i < setOpts.watchDatas.length; i++) {
                    var items = setOpts.watchDatas[i];
                    md.setInputWatch(opts, items[0], items[1], items[2], items[3]);
                }
            }
            md.newBlock(cname, opts, "Component~Cp_base~icons.led", "labelMain#" + i);
            return;
        }
        if (setOpts.setType === "leds") {
            var opts = {};
            opts.xm = setOpts.xm;
            if (setOpts.lm)
                opts.lm = setOpts.lm;
            if (setOpts.rm)
                opts.rm = setOpts.rm;
            if (setOpts.xArr) {
                opts.xArr = setOpts.xArr;
                md.newLayout(cname, opts, "Layout~Ly_base~xyArray.sys0", "mainBody");
            } else {
                opts.xc = setOpts.enum.length;
                md.newLayout(cname, opts, "Layout~Ly_base~array.sys0", "mainBody");
            }
            for (var i = 0; i < setOpts.enum.length; i++) {
                var cname = md.lyMaps["mainBody"] + "~" + i;
                var opts = {};
                opts.innerText = setOpts.enum[i];
                opts.innerTextColor = setOpts.editTextColor;
                opts.fontSize = "0.7rh";
                if (setOpts.fontSize)
                    opts.fontSize = setOpts.fontSize;
                opts.headIconWidth = 40;
                if (setOpts.headIconWidth)
                    opts.headIconWidth = setOpts.headIconWidth;
                opts.imageUrls = [];
                opts.imageUrls.push("systemResource/gray_light.png");
                opts.imageUrls.push("systemResource/green_light.png");
                opts.imageUrls.push("systemResource/red_light.png");
                opts.imageUrls.push("systemResource/yellow_light.png");
                opts.imageUrls.push("systemResource/blue_light.png");
                opts.backgroundInx = setOpts.value[i];
                if (setOpts.watchDatas) {
                    var items = setOpts.watchDatas[i];
                    if (items)
                        md.setInputWatch(opts, items[0], items[1], items[2], items[3]);
                }
                opts.textAlign = "left";
                md.newBlock(cname, opts, "Component~Cp_base~plate.none", "labelMain#" + i);
            }
            return;
        }
        if (setOpts.setType === "lcdView") {
            var opts = {};
            if (setOpts.lm)
                opts.lm = setOpts.lm;
            if (setOpts.rm)
                opts.rm = setOpts.rm;
            opts.innerText = setOpts.value;
            opts.baseColor = setOpts.editBaseColor;
            opts.innerTextColor = setOpts.editTextColor;
            if (setOpts.fontSize)
                opts.fontSize = setOpts.fontSize;
            if (setOpts.watchDatas) {
                for (var i = 0; i < setOpts.watchDatas.length; i++) {
                    var items = setOpts.watchDatas[i];
                    md.setInputWatch(opts, items[0], items[1], items[2], items[3]);
                }
            }
            if (KvLib.getOs() === "Linux")
                opts.bpd = "0.2rh";
            md.newBlock(cname, opts, "Component~Cp_base~images.lcd", "labelMain#" + i);
            return;
        }

        if (setOpts.setType === "lcdYellow") {
            var opts = {};
            if (setOpts.lm)
                opts.lm = setOpts.lm;
            if (setOpts.rm)
                opts.rm = setOpts.rm;
            opts.innerText = setOpts.value;
            if (setOpts.fontSize)
                opts.fontSize = setOpts.fontSize;
            if (setOpts.watchDatas) {
                for (var i = 0; i < setOpts.watchDatas.length; i++) {
                    var items = setOpts.watchDatas[i];
                    md.setInputWatch(opts, items[0], items[1], items[2], items[3]);
                }
            }
            opts.backgroundImageUrls = ["systemResource/lcd2.bmp"];
            opts.backgroundInx = 0;
            opts.borderWidth = 2;
            opts.borderColor = "#000";
            opts.textAlign = "left";
            opts.lpd = 4;
            md.newBlock(cname, opts, "Component~Cp_base~images.sys0", "labelMain#" + i);
            return;
        }



        if (setOpts.setType === "buttonActs") {
            var opts = {};
            opts.xm = setOpts.xm;
            if (setOpts.lm)
                opts.lm = setOpts.lm;
            if (setOpts.rm)
                opts.rm = setOpts.rm;
            if (setOpts.xArr) {
                opts.xArr = setOpts.xArr;
                md.newLayout(cname, opts, "Layout~Ly_base~xyArray.sys0", "mainBody");
            } else {
                opts.xc = setOpts.enum.length;
                md.newLayout(cname, opts, "Layout~Ly_base~array.sys0", "mainBody");
            }
            var buttonFunc = function (iobj) {
                console.log(iobj);
                var strA = iobj.kvObj.name.split("#");
                var inx = KvLib.toInt(strA[1], -1);
                op.setOpts.value = inx;
                md.mdClass.reNew();
            };
            for (var i = 0; i < setOpts.enum.length; i++) {
                var cname = md.lyMaps["mainBody"] + "~" + i;
                var opts = {};
                opts.innerText = setOpts.enum[i];
                opts.fontSize = "0.7rh";
                if (setOpts.fontSize)
                    opts.fontSize = setOpts.fontSize;
                opts.actionFunc = function (iobj) {
                    console.log(iobj);
                    iobj.sender = md;
                    iobj.setOptsObj = md;
                    var strA = iobj.kvObj.name.split("#");
                    var inx = KvLib.toInt(strA[1]);
                    iobj.buttonInx = inx;
                    iobj.buttonText = md.opts.setOpts.enum[inx];
                    if (md.opts.setOpts.enumId)
                        iobj.buttonId = md.opts.setOpts.enumId[inx];
                    iobj.act = "actButtonClick";
                    iobj.kvObj = md;
                    KvLib.exeFunc(op.actionFunc, iobj);
                };
                opts.baseColor = "#ccf";
                opts.insideShadowBlur = null;
                opts.borderRadius = 0;
                md.newBlock(cname, opts, "Component~Cp_base~button.sys0", "buttonMain#" + i);
            }
            return;
        }
        if (setOpts.setType === "button") {
            var opts = {};
            opts.xm = setOpts.xm;
            if (setOpts.lm)
                opts.lm = setOpts.lm;
            if (setOpts.rm)
                opts.rm = setOpts.rm;
            opts.innerText = setOpts.enum[0];
            opts.fontSize = "0.7rh";
            if (setOpts.fontSize)
                opts.fontSize = setOpts.fontSize;
            opts.actionFunc = function (iobj) {
                console.log(iobj);
                iobj.sender = md;
                iobj.setOptsObj = md;
                iobj.buttonText = md.opts.setOpts.enum[0];
                if (md.opts.setOpts.enumId)
                    iobj.buttonId = md.opts.setOpts.enumId[0];
                iobj.act = "actButtonClick";
                iobj.kvObj = md;
                KvLib.exeFunc(op.actionFunc, iobj);
            };
            opts.baseColor = "#ccf";
            if (setOpts.watchDatas) {
                for (var i = 0; i < setOpts.watchDatas.length; i++) {
                    var items = setOpts.watchDatas[i];
                    md.setInputWatch(opts, items[0], items[1], items[2], items[3]);
                }
            }
            opts.insideShadowBlur = null;
            opts.borderRadius = 0;
            md.newBlock(cname, opts, "Component~Cp_base~button.sys0", "buttonMain#" + 0);
            return;
        }
        if (setOpts.setType === "buttonChecks") {
            var opts = {};
            opts.xc = setOpts.enum.length;
            opts.xm = setOpts.xm;
            if (setOpts.lm)
                opts.lm = setOpts.lm;
            if (setOpts.rm)
                opts.rm = setOpts.rm;
            md.newLayout(cname, opts, "Layout~Ly_base~array.sys0", "mainBody");
            var buttonFunc = function (iobj) {
                console.log(iobj);
                var strA = iobj.kvObj.name.split("#");
                var inx = KvLib.toInt(strA[1], -1);
                op.setOpts.value = inx;
                md.mdClass.reNew();
            };
            for (var i = 0; i < setOpts.enum.length; i++) {
                var cname = md.lyMaps["mainBody"] + "~" + i;
                var opts = {};
                opts.innerText = setOpts.enum[i];
                if (setOpts.fontSize)
                    opts.fontSize = setOpts.fontSize;
                opts.actionFunc = function (iobj) {
                    console.log(iobj);
                    iobj.sender = md;
                    iobj.setOptsObj = md;
                    var strA = iobj.kvObj.name.split("#");
                    var inx = KvLib.toInt(strA[1]);
                    setOpts.value ^= (1 << inx);
                    iobj.kvObj.opts.checked_f = 0;
                    if ((setOpts.value >> inx) & 1) {
                        iobj.kvObj.opts.checked_f = 1;
                    }
                    iobj.kvObj.reCreate();
                };
                opts.checked_f = 0;
                if ((setOpts.value >> i) & 1) {
                    opts.checked_f = 1;
                }
                md.newBlock(cname, opts, "Component~Cp_base~checkBox.sys0", "buttonMain#" + i);
            }
            return;
        }
        if (setOpts.setType === "buttonOnOffs") {
            var opts = {};
            opts.xc = setOpts.enum.length;
            opts.xm = setOpts.xm;
            if (setOpts.lm)
                opts.lm = setOpts.lm;
            if (setOpts.rm)
                opts.rm = setOpts.rm;
            md.newLayout(cname, opts, "Layout~Ly_base~array.sys0", "mainBody");
            var buttonFunc = function (iobj) {
                console.log(iobj);
                var strA = iobj.kvObj.name.split("#");
                var inx = KvLib.toInt(strA[1], -1);
                op.setOpts.value = inx;
                md.mdClass.reNew();
            };
            for (var i = 0; i < setOpts.enum.length; i++) {
                var cname = md.lyMaps["mainBody"] + "~" + i;
                var opts = {};
                opts.innerText = setOpts.enum[i];
                if (setOpts.fontSize)
                    opts.fontSize = setOpts.fontSize;
                opts.actionFunc = function (iobj) {
                    console.log(iobj);
                    iobj.sender = md;
                    iobj.setOptsObj = md;
                    var strA = iobj.kvObj.name.split("#");
                    var inx = KvLib.toInt(strA[1]);
                    if(setOpts.disAutoSet_f){
                        iobj.buttonInx = inx;
                        iobj.buttonText = iobj.kvObj.opts.innerText;
                        if (md.opts.setOpts.enumId) {
                            iobj.buttonId = md.opts.setOpts.enumId[iobj.buttonInx];
                        }
                        iobj.setOptsObj = md;
                        iobj.sender = md;
                        KvLib.exe(op.actionFunc, iobj);
                        return;
                    }
                    setOpts.value ^= (1 << inx);
                    iobj.kvObj.opts.baseColor = "#ccc";
                    iobj.kvObj.opts.innerTextColor = "#000";
                    if ((setOpts.value >> inx) & 1){
                        iobj.kvObj.opts.baseColor = setOpts.onColor;
                        if(setOpts.enumColors)
                             iobj.kvObj.opts.baseColor=setOpts.enumColors[inx];
                    }    
                    else
                        iobj.kvObj.opts.baseColor = setOpts.offColor;
                    iobj.kvObj.reCreate();
                    iobj.buttonInx = KvLib.toInt(iobj.kvObj.name.split("#")[1], -1);
                    iobj.buttonText = iobj.kvObj.opts.innerText;
                    if (md.opts.setOpts.enumId) {
                        iobj.buttonId = md.opts.setOpts.enumId[iobj.buttonInx];
                    }
                    iobj.setOptsObj = md;
                    iobj.sender = md;
                    KvLib.exe(op.actionFunc, iobj);

                };

                opts.baseColor = "#ccc";
                opts.innerTextColor = "#000";
                if ((setOpts.value >> i) & 1){
                    opts.baseColor = setOpts.onColor;
                    if(setOpts.enumColors)
                         opts.baseColor=setOpts.enumColors[i];

                }    
                else
                    opts.baseColor = setOpts.offColor;
                opts.insideShadowBlur = null;
                opts.borderRadius = 0;
                md.newBlock(cname, opts, "Component~Cp_base~button.sys0", "buttonMain#" + i);
            }

            if (setOpts.watchDatas) {
                for (var i = 0; i < setOpts.watchDatas.length; i++) {
                    var items = setOpts.watchDatas[i];
                    md.setInputWatch(op, items[0], items[1], items[2], items[3]);
                }
            }


            return;



        }
        if (setOpts.setType === "buttonSelect") {
            var opts = {};
            opts.xc = setOpts.enum.length;
            opts.xm = setOpts.xm;
            if (setOpts.lm)
                opts.lm = setOpts.lm;
            if (setOpts.rm)
                opts.rm = setOpts.rm;
            md.newLayout(cname, opts, "Layout~Ly_base~array.sys0", "mainBody");
            var buttonFunc = function (iobj) {
                console.log(iobj);
                if (!setOpts.actViewNone_f) {
                    var strA = iobj.kvObj.name.split("#");
                    var inx = KvLib.toInt(strA[1], -1);
                    op.setOpts.value = inx;
                    md.mdClass.reNew();
                }

                iobj.buttonInx = KvLib.toInt(iobj.kvObj.name.split("#")[1], -1);
                iobj.buttonText = iobj.kvObj.opts.innerText;
                if (md.opts.setOpts.enumId) {
                    iobj.buttonId = md.opts.setOpts.enumId[iobj.buttonInx];
                }
                iobj.setId = md.opts.setOpts.id;
                iobj.setOptsObj = md;
                iobj.sender = md;
                KvLib.exe(op.actionFunc, iobj);


            };
            for (var i = 0; i < setOpts.enum.length; i++) {
                var cname = md.lyMaps["mainBody"] + "~" + i;
                var opts = {};
                opts.innerText = setOpts.enum[i];
                if (setOpts.value === i) {
                    opts.baseColor = setOpts.onColor;
                    if (setOpts.enumColors) {
                        opts.baseColor = setOpts.enumColors[i];
                    }
                } else
                    opts.baseColor = setOpts.offColor;
                opts.actionFunc = buttonFunc;
                if (setOpts.fontSize)
                    opts.fontSize = setOpts.fontSize;
                opts.insideShadowBlur = null;
                opts.borderRadius = 0;
                md.newBlock(cname, opts, "Component~Cp_base~button.sys0", "buttonMain#" + i);
            }

            if (setOpts.watchDatas) {
                for (var i = 0; i < setOpts.watchDatas.length; i++) {
                    var items = setOpts.watchDatas[i];
                    md.setInputWatch(op, items[0], items[1], items[2], items[3]);
                }
            }


            return;
        }
        if (setOpts.setType === "buttonRadio") {
            var opts = {};
            opts.xc = setOpts.enum.length;
            opts.xm = setOpts.xm;
            if (setOpts.lm)
                opts.lm = setOpts.lm;
            if (setOpts.rm)
                opts.rm = setOpts.rm;
            md.newLayout(cname, opts, "Layout~Ly_base~array.sys0", "mainBody");
            var buttonFunc = function (iobj) {
                console.log(iobj);
                var strA = iobj.kvObj.name.split("#");
                var inx = KvLib.toInt(strA[1], -1);
                if (op.setOpts.value !== inx) {
                    op.setOpts.value = inx;
                    iobj.sender = md;
                    iobj.setOptsObj = md;
                    KvLib.exe(op.actionFunc, iobj);
                }
            };
            for (var i = 0; i < setOpts.enum.length; i++) {
                var cname = md.lyMaps["mainBody"] + "~" + i;
                var opts = {};
                opts.innerText = setOpts.enum[i];
                opts.checked_f = 0;
                if (setOpts.value === i)
                    opts.checked_f = 1;
                opts.actionFunc = buttonFunc;
                opts.radioName = setOpts.radioName;
                if (setOpts.fontSize)
                    opts.fontSize = setOpts.fontSize;
                opts.baseColor = "#ccf";
                md.newBlock(cname, opts, "Component~Cp_base~radioBox.sys0", "buttonMain#" + i);
            }
            return;
        }
        if (setOpts.setType === "inputText") {
            var opts = {};
            opts.actionFunc = retFunc;
            if (setOpts.fontSize)
                opts.fontSize = setOpts.fontSize;
            if (setOpts.viewType === "hex")
                opts.editValue = KvLib.trsIntToHexStr(setOpts.value);
            else {
                opts.editValue = "" + setOpts.value;
                if (setOpts.dataType === "float") {
                    if (setOpts.fixed) {
                        try {
                            opts.editValue = setOpts.value.toFixed(setOpts.fixed);
                        } catch (ex) {
                            opts.editValue = "" + setOpts.value;
                        }
                    }
                }
            }
            opts.innerText = "";
            opts.lpd = 0;
            opts.rpd = 0;
            opts.password_f = 0;
            if (setOpts.password_f)
                opts.password_f = 1;
            if (!op.disBlur_f)
                opts.blur_f = 1;
            opts.readOnly_f = setOpts.readOnly_f;
            opts.editBaseColor = setOpts.editBaseColor;
            if (setOpts.watchDatas) {
                for (var i = 0; i < setOpts.watchDatas.length; i++) {
                    var items = setOpts.watchDatas[i];
                    md.setInputWatch(opts, items[0], items[1], items[2], items[3]);
                }
            }
            md.newBlock(cname, opts, "Component~Cp_base~inputText.sys0", "inputText");
            document.onkeydown = function (evt) {
                evt = evt || window.event;
                if (evt.keyCode === 27) {
                    document.onkeydown = null;
                    var obj = {};
                    obj.act = "escape";
                    retFunc(obj);
                }
            };

            return;
        }
        if (setOpts.setType === "textArea") {
            var opts = {};
            opts.actionFunc = retFunc;
            if (setOpts.fontSize)
                opts.fontSize = setOpts.fontSize;
            if (setOpts.viewType === "hex")
                opts.editValue = KvLib.trsIntToHexStr(setOpts.value);
            else {
                opts.editValue = "" + setOpts.value;
                if (setOpts.dataType === "float") {
                    if (setOpts.fixed) {
                        try {
                            opts.editValue = setOpts.value.toFixed(setOpts.fixed);
                        } catch (ex) {
                            opts.editValue = "" + setOpts.value;
                        }
                    }
                }




            }
            opts.innerText = "";
            opts.lpd = 0;
            opts.rpd = 0;
            opts.editFontSize = 20;
            md.newBlock(cname, opts, "Component~Cp_base~textArea.sys0", "textArea");
            document.onkeydown = function (evt) {
                evt = evt || window.event;
                if (evt.keyCode === 27) {
                    document.onkeydown = null;
                    var obj = {};
                    obj.act = "escape";
                    retFunc(obj);
                }
            };
            return;
        }
        if (setOpts.setType === "label") {
            var opts = {};
            opts.editValue = setOpts.value;
            md.newBlock(cname, opts, "Component~Cp_base~label.sys3", "label");
            return;
        }
        if (setOpts.setType === "incEnum") {
            var opts = {};
            opts.editValue = setOpts.enum[setOpts.value];
            opts.innerText = "";
            opts.readOnly_f = 1;
            opts.lpd = 0;
            opts.rpd = 0;
            md.newBlock(cname, opts, "Component~Cp_base~inputText.sys0", "inputText");
            if (setOpts.watchDatas) {
                for (var i = 0; i < setOpts.watchDatas.length; i++) {
                    var items = setOpts.watchDatas[i];
                    md.setInputWatch(op, items[0], items[1], items[2], items[3]);
                }
            }
            return;
        }
        if (setOpts.setType === "pullEnum") {
            var opts = {};
            opts.editValue = setOpts.enum[setOpts.value];
            opts.innerText = "";
            opts.readOnly_f = 1;
            opts.lpd = 0;
            opts.rpd = 0;
            md.newBlock(cname, opts, "Component~Cp_base~inputText.sys0", "inputText");
            if (setOpts.watchDatas) {
                for (var i = 0; i < setOpts.watchDatas.length; i++) {
                    var items = setOpts.watchDatas[i];
                    md.setInputWatch(op, items[0], items[1], items[2], items[3]);
                }
            }
            return;
        }


        if (setOpts.setType === "select" || setOpts.setType === "inputSelect") {
            var opts = {};
            opts.actionFunc = retFunc;
            if (setOpts.fontSize)
                opts.fontSize = setOpts.fontSize;
            opts.editValue = setOpts.value;
            opts.innerText = "";
            opts.lpd = 0;
            opts.rpd = 0;
            if (setOpts.setType === "select")
                opts.readOnly_f = 1;
            md.newBlock(cname, opts, "Component~Cp_base~inputText.sys0", "inputText");
            return;
        }
        if (setOpts.setType === "inputRange") {
            var opts = {};
            opts.actionFunc = retFunc;
            opts.editValue = setOpts.value;
            opts.max = setOpts.max;
            opts.min = setOpts.min;
            md.newBlock(cname, opts, "Component~Cp_base~inputRange.sys0", "inputRange");
            return;
        }
    }

    afterCreate() {
        this.reNew();
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
        layouts[cname] = { name: cname, type: "Layout~Ly_base~array.sys0", opts: opts };
        lyMaps["body"] = cname;
        var opts = {};
        md.setPns(opts);
        if (op.setOpts.baseColor)
            opts.baseColor = op.setOpts.baseColor;
        if (op.setOpts.borderWidth !== undefined)
            opts.borderWidth = op.setOpts.borderWidth;
        blocks[cname] = { name: "basePanel", type: "Component~Cp_base~plate.none", opts: opts };
    }
}

//setType.dataType
//setType.checkType
class MdaPad {
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);
        opts.baseColor = "#ccc";
        opts.selected_f = 1;
        opts.margin = 4;
        opts.keyFlag = 0;
        opts.memoHeight = 270;
        opts.setOpts = {};
        this.subTypeOpts(opts);
        return opts;
    }

    subTypeOpts(opts) {
    }
    initKeyLayout() {
        var md = this.md;
        var opts = md.opts;
        var setOpts = opts.setOpts;
        var dataType = setOpts.dataType;
        var checkType = setOpts.checkType;
        var st = md.stas;
        st.padType = "keyboard";

        var numberStyle = 0;
        if (checkType === "int")
            numberStyle = 1;
        if (checkType === "float" || checkType === "ip")
            numberStyle = 1;
        if (numberStyle) {
            st.padType = "pad";
            opts.yArr = ["0.25rh", "0.25rh", "0.25rh", "0.25rh"];
            var xyArr = opts.xyArr = [];
            xyArr.push(["0.16rw", "0.16rw", "0.16rw", "0.16rw", "0.16rw", 9999]);
            xyArr.push(["0.16rw", "0.16rw", "0.16rw", "0.16rw", "0.16rw", 9999]);
            xyArr.push(["0.16rw", "0.16rw", "0.16rw", "0.16rw", "0.16rw", 9999]);
            xyArr.push(["0.16rw", "0.16rw", "0.16rw", "0.16rw", "0.16rw", 9999]);
            opts.numTbl = [
                "7", "8", "9", "", '<i class="gf">&#xe317;</i>', "Del",
                "4", "5", "6", "", "Home", "End",
                "1", "2", "3", "", "◀", "▶",
                "+-", "0", "", "", "Clr", '<i class="gf">&#xe31b;</i>'
            ];
            opts.numIds = [
                "7", "8", "9", "null", 'back', "del",
                "4", "5", "6", "null", "home", "end",
                "1", "2", "3", "null", "left", "right",
                "+-", "0", "null", "null", "clr", 'enter'
            ];
            if (checkType === "ip") {
                opts.numTbl[18] = "";
                opts.numIds[18] = "null";
            }
            if (setOpts.min >= 0) {
                opts.numTbl[18] = "";
                opts.numIds[18] = "null";
            }
            if (checkType === "float" || checkType === "ip") {
                opts.numTbl[20] = ".";
                opts.numIds[20] = ".";
            }
            if (setOpts.array) {
                opts.numTbl[3] = ",";
                opts.numIds[3] = ",";
                opts.numTbl[21] = "NL";
                opts.numIds[21] = "nextLine";
                if (setOpts.dataType === "str") {
                    opts.numTbl[9] = "\"";
                    opts.numIds[9] = "\"";
                    opts.numTbl[15] = "[ ]";
                    opts.numIds[15] = " ";
                }
            }
            return;
        }
        if (checkType === "hex" || checkType === "color") {
            st.padType = "pad";
            opts.yArr = ["0.2rh", "0.2rh", "0.2rh", "0.2rh", "0.2rh"];
            var xyArr = opts.xyArr = [];
            xyArr.push(["0.166rw", "0.166rw", "0.166rw", "0.166rw", "0.166rw", "0.166rw"]);
            xyArr.push(["0.2rw", "0.2rw", "0.2rw", "0.2rw", "0.2rw"]);
            xyArr.push(["0.2rw", "0.2rw", "0.2rw", "0.2rw", "0.2rw"]);
            xyArr.push(["0.2rw", "0.2rw", "0.2rw", "0.2rw", "0.2rw"]);
            xyArr.push(["0.2rw", "0.2rw", "0.2rw", "0.2rw", "0.2rw"]);
            opts.numTbl = [
                "A", "B", "C", "D", "E", "F",
                "7", "8", "9", '<i class="gf">&#xe317;</i>', "Del",
                "4", "5", "6", "Home", "End",
                "1", "2", "3", "◀", "▶",
                "", "0", "", "Clr", '<i class="gf">&#xe31b;</i>'
            ];
            opts.numIds = [
                "A", "B", "C", 'D', "E", "F",
                "7", "8", "9", 'back', "del",
                "4", "5", "6", "home", "end",
                "1", "2", "3", "left", "right",
                "null", "0", "null", "clr", 'enter'
            ];
            if (checkType === "color") {
                opts.numTbl[21] = "#";
                opts.numIds[21] = "#";
            }
            if (setOpts.array) {
                opts.numTbl[23] = ",";
                opts.numIds[23] = ",";
            }
            return;
        }

        opts.yArr = ["0.166rh", "0.166rh", "0.166rh", "0.166rh", "0.166rh", 9999];
        var xyArr = opts.xyArr = [];
        xyArr.push([9999, "0.10rw", "0.1rw", "0.1rw", "0.1rw", "0.1rw", "0.1rw", "0.1rw", "0.1rw"]);
        xyArr.push(["0.056rw", "0.056rw", "0.056rw", "0.056rw", "0.056rw", "0.056rw", "0.056rw", "0.056rw", "0.056rw", "0.056rw", "0.056rw", "0.056rw", "0.056rw", 9999, "0.005rw", "0.061rw", "0.061rw", "0.061rw"]);
        xyArr.push([9999, "0.056rw", "0.056rw", "0.056rw", "0.056rw", "0.056rw", "0.056rw", "0.056rw", "0.056rw", "0.056rw", "0.056rw", "0.056rw", "0.056rw", "0.066rw", "0.005rw", "0.061rw", "0.061rw", "0.061rw"]);
        xyArr.push(["0.084rw", "0.056rw", "0.056rw", "0.056rw", "0.056rw", "0.056rw", "0.056rw", "0.056rw", "0.056rw", "0.056rw", "0.056rw", "0.056rw", 9999, "0.005rw", "0.061rw", "0.061rw", "0.061rw"]);
        xyArr.push(["0.106rw", "0.056rw", "0.056rw", "0.056rw", "0.056rw", "0.056rw", "0.056rw", "0.056rw", "0.056rw", "0.056rw", "0.056rw", 9999, "0.005rw", "0.061rw", "0.061rw", "0.061rw"]);
        xyArr.push(["0.064rw", "0.064rw", "0.064rw", 9999, "0.064rw", "0.064rw", "0.064rw", "0.005rw", "0.061rw", "0.061rw", "0.061rw"]);
        opts.numTbl = ["", "Kext", "中文", "Cap", "Shift", "Ctr", "Fn", "Alt", "Clr",
            "\`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Back<br>Space", "", "INS", "Home", "Page<br>Up",
            "Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\", "", "DEL", "End", "Page<br>Down",
            "Cap", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter", "", "", "", "",
            "Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "Shift", "", "", "<i class='gf'>&#xe316</i>", "",
            "Ctr", "Fn", "Alt", " ", "Alt", "Fn", "Ctr", "", "<i class='gf'>&#xe314</i>", "<i class='gf'>&#xe313</i>", "<i class='gf'>&#xe315</i>"];
        opts.numIds = ["null", "Kext", "中文", "Cap", "Shift", "Ctr", "Fn", "Alt", "clr",
            "\`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "back", "", "ins", "home", "pageDown",
            "tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\", "", "del", "end", "pageUp",
            "cap", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "enter", "", "", "", "",
            "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "shift", "", "", "up", "",
            "ctr", "fn", "alt", " ", "alt", "fn", "ctr", "", "left", "down", "right"];
        opts.numTblA = ["", "Kext", "中文", "Cap", "Shift", "Ctr", "Fn", "Alt", "Clr",
            "~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "Back<br>Space", "", "INS", "Home", "Page<br>Up",
            "Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}", "|", "", "DEL", "End", "Page<br>Down",
            "Cap", "A", "S", "D", "F", "G", "H", "J", "K", "L", ":", "\"", "Enter", "", "", "", "",
            "Shift", "Z", "X", "C", "V", "B", "N", "M", "<", ">", "?", "Shift", "", "", "<i class='gf'>&#xe316</i>", "",
            "Ctr", "Fn", "Alt", " ", "Alt", "Fn", "Ctr", "", "<i class='gf'>&#xe314</i>", "<i class='gf'>&#xe313</i>", "<i class='gf'>&#xe315</i>"];
        opts.numIdsA = ["null", "Kext", "中文", "Cap", "Shift", "Ctr", "Fn", "Alt", "clr",
            "~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "back", "", "ins", "home", "pageDown",
            "tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}", "|", "", "del", "end", "pageUp",
            "cap", "A", "S", "D", "F", "G", "H", "J", "K", "L", ":", "\"", "enter", "", "", "", "",
            "shift", "Z", "X", "C", "V", "B", "N", "M", "<", ">", "?", "shift", "", "", "up", "",
            "ctr", "fn", "alt", " ", "alt", "fn", "ctr", "", "left", "down", "right"];
        opts.numTblB = ["", "Kext", "中文", "Cap", "Shift", "Ctr", "Fn", "Alt", "Clr",
            "", "ㄅ", "ㄉ", "ˇ", "ˋ", "ㄓ", "ˊ", "˙", "ㄚ", "ㄞ", "ㄢ", "ㄦ", "", "Back<br>Space", "", "INS", "Home", "Page<br>Up",
            "Tab", "ㄆ", "ㄊ", "ㄍ", "ㄐ", "ㄔ", "ㄗ", "ㄧ", "ㄛ", "ㄟ", "ㄣ", "", "", "", "", "DEL", "End", "Page<br>Down",
            "Cap", "ㄇ", "ㄋ", "ㄎ", "ㄑ", "ㄕ", "ㄘ", "ㄨ", "ㄜ", "ㄠ", "ㄤ", "", "Enter", "", "", "", "",
            "Shift", "ㄈ", "ㄌ", "ㄏ", "ㄒ", "ㄖ", "ㄙ", "ㄩ", "ㄝ", "ㄡ", "ㄥ", "Shift", "", "", "<i class='gf'>&#xe316</i>", "",
            "Ctr", "Fn", "Alt", " ", "Alt", "Fn", "Ctr", "", "<i class='gf'>&#xe314</i>", "<i class='gf'>&#xe313</i>", "<i class='gf'>&#xe315</i>"];
        opts.numIdsB = ["null", "Kext", "中文", "Cap", "Shift", "Ctr", "Fn", "Alt", "clr",
            "null", "ㄅ", "ㄉ", "ˇ", "ˋ", "ㄓ", "ˊ", "˙", "ㄚ", "ㄞ", "ㄢ", "ㄦ", "null", "back", "", "ins", "home", "pageDown",
            "tab", "ㄆ", "ㄊ", "ㄍ", "ㄐ", "ㄔ", "ㄗ", "ㄧ", "ㄛ", "ㄟ", "ㄣ", "null", "null", "null", "", "del", "end", "pageUp",
            "cap", "ㄇ", "ㄋ", "ㄎ", "ㄑ", "ㄕ", "ㄘ", "ㄨ", "ㄜ", "ㄠ", "ㄤ", "null", "enter", "", "", "", "",
            "shift", "ㄈ", "ㄌ", "ㄏ", "ㄒ", "ㄖ", "ㄙ", "ㄩ", "ㄝ", "ㄡ", "ㄥ", "shift", "", "", "up", "",
            "ctr", "fn", "alt", " ", "alt", "fn", "ctr", "", "left", "down", "right"];


    }

    chkWatch() {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        if (op.focusOut_f) {
            if (!gr.mouseDown_f) {
                op.focusOut_f = 0;
                var setLine = md.blockRefs["lcd"];
                if (op.setOpts.setType === "inputText") {
                    var inputText = setLine.blockRefs["inputText"];
                    var inputElem = inputText.elems["inputText"];
                } else {
                    var inputText = setLine.blockRefs["textArea"];
                    var inputElem = inputText.elems["textArea"];
                }
                inputElem.focus();
            }
        }
    }

    afterCreate() {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        var setLine = md.blockRefs["lcd"];
        if (op.setOpts.setType === "textArea") {
            var inputObj = setLine.blockRefs["textArea"];
            var inputElem = inputObj.elems["textArea"];
            inputElem.focus();
        } else {
            var inputObj = setLine.blockRefs["inputText"];
            var inputElem = inputObj.elems["inputText"];
            inputElem.focus();
            if (md.opts.selected_f) {
                inputElem.select();
                md.opts.selected_f = 0;
            }
        }
        if (op.setOpts.checkType === "str") {
            if (!gr.juingTbl) {
                gr.serverCallBack = function (iobj) {
                    console.log("fdf");
                    var strA = iobj.opts.fileContent.split("\n");
                    gr.juingTbl = strA;
                };
                mac.readServerFile("juingTbl.txt");
            }
        }
    }

    intHexConvert(value, intHex_f) {
        var self = this;
        var md = self.md;
        var op = md.opts;
        var setLine = md.blockRefs["lcd"];
        var inputObj = setLine.blockRefs["inputText"];
        var inputElem = inputObj.elems["inputText"];
        if (intHex_f) {
            var sv = KvLib.trsIntStrToHexStr(value, null);
            if (sv === null)
                return;
            inputElem.value = sv;
        } else {
            var sv = KvLib.trsHexStrToIntStr(value, null);
            if (sv === null)
                return;
            inputElem.value = sv;
        }
    }

    enterPrg(iobj) {
        var self = this;
        var md = self.md;
        var op = md.opts;

        var setLine = self.md.blockRefs["lcd"];

        if (op.setOpts.setType === "inputText") {
            var inputText = setLine.blockRefs["inputText"];
            var inputElem = inputText.elems["inputText"];
        } else {
            var inputText = setLine.blockRefs["textArea"];
            var inputElem = inputText.elems["textArea"];
        }

        var errStrs = setLine.mdClass.checkValue(1);
        if (errStrs) {
            box.errorBox({ kvTexts: errStrs });
            return errStrs;
        }
        var iobj = {};
        iobj.sender = md;
        iobj.inputText = inputElem.value;
        iobj.act = "padEnter";
        KvLib.exeFunc(op.actionFunc, iobj);
        return;

    }

    emuKey(numId, keyInx) {
        var self = this;
        var md = self.md;
        var op = md.opts;
        var st = md.stas;
        var lyMaps = md.lyMaps;

        var setLine = md.blockRefs["lcd"];
        if (op.setOpts.setType === "inputText") {
            var inputText = setLine.blockRefs["inputText"];
            var inputElem = inputText.elems["inputText"];
        } else {
            var inputText = setLine.blockRefs["textArea"];
            var inputElem = inputText.elems["textArea"];
        }

        op.focusOut_f = 1;
        if (numId === "")
            return;
        if (st.padType === "keyboard") {
            if (numId === "cap")
                keyInx = 3;
            if (numId === "shift")
                keyInx = 4;
            if (numId === "ctr")
                keyInx = 5;
            if (numId === "fn")
                keyInx = 6;
            if (numId === "alt")
                keyInx = 7;
            if (keyInx >= 1 && keyInx <= 7) {
                var shi = 1 << keyInx;
                op.keyFlag ^= shi;
                var kvObj = md.blockRefs["key#" + keyInx];
                kvObj.opts.baseColor = "#ccc";
                if (op.keyFlag & shi)
                    kvObj.opts.baseColor = "#ccf";
                kvObj.reCreate();
                if (keyInx === 2)
                    op.keyFlag &= shi;
                if (keyInx <= 4) {
                    var cname = lyMaps["main"] + "~" + 1;
                    md.clearOptsAll(cname);
                    self.buildKeyPad();
                    md.buildPart(cname);
                    md.reCreate(cname);
                }
                return;
            }
        }
        if (numId === "null")
            return;
        if (numId === "tab")
            return;
        if (numId === "up")
            return;
        if (numId === "down")
            return;
        if (numId === "pageUp")
            return;
        if (numId === "pageDown")
            return;
        if (numId === "ins")
            return;
        if (numId === "nextLine") {
            setLine.mdClass.addInputText("\n");
            return;
        }
        if (numId === "enter") {
            self.enterPrg();
            return;
        }

        if (numId === "clr") {
            setLine.mdClass.inputTextAct("clr");
            return;
        }


        if (numId === "home") {
            setLine.mdClass.inputTextAct("home");
            return;
        }
        if (numId === "left") {
            setLine.mdClass.inputTextAct("left");
            return;
        }
        if (numId === "right") {
            setLine.mdClass.inputTextAct("right");
            return;
        }
        if (numId === "end") {
            setLine.mdClass.inputTextAct("end");
            return;
        }
        if (numId === "del") {
            setLine.mdClass.inputTextAct("del");
            return;
        }
        if (numId === "back") {
            setLine.mdClass.inputTextAct("back");
            return;
        }
        var value = inputElem.value;
        if (numId === "+-") {
            var strA = value.split(",");
            var actStr = strA[strA.length - 1];
            var strB = actStr.split("");
            if (strB[0] === "-") {
                actStr = actStr.substring(1, actStr.length);
            } else {
                actStr = "-" + actStr;
            }
            var newStr = "";
            for (var i = 0; i < strA.length - 1; i++) {
                if (i !== 0)
                    newStr += ",";
                newStr += strA[i];
            }
            if (newStr.length)
                newStr += ",";
            newStr += actStr;
            setLine.mdClass.addInputText(newStr, 1);
            setLine.mdClass.inputTextAct("end");
            return;
        }
        var char = numId;


        if (op.keyFlag & 4) {
            if (char.length === 1 ) {
                var ok = 0;
                if (char === "˙") {
                    st.juingStr = char + st.juingStr;
                    ok = 1;
                } else {
                    if (char === " ") {
                        //op.juingStr += "-";
                        ok = 1;
                    } else
                        st.juingStr += char;
                }
                if (char === "ˇ" || char === "ˋ" || char === "ˊ")
                    ok = 1;


                if (ok) {
                    var chfonts = [];
                    var len = gr.juingTbl.length;
                    for (var i = 0; i < len; i++) {
                        var strA = gr.juingTbl[i].split("#");
                        if (strA.length !== 2)
                            continue;

                        if (strA[0] === st.juingStr) {
                            var strB = strA[1].split(",");
                            for (var i = 0; i < strB.length; i++)
                                chfonts.push(strB[i]);
                            break;
                        }

                    }

                    if (chfonts.length === 0) {
                        st.juingStr = "";
                        var kvObj = md.blockRefs["key#" + 0];
                        kvObj.opts.innerText = st.juingStr;
                        kvObj.reCreate();
                        return;
                    }
                    var opts = {};
                    opts.xc = 10;
                    opts.yc = 5;
                    opts.kvTexts = chfonts;
                    opts.title = "";
                    opts.actionFunc = function (iobj) {
                        console.log(iobj);
                        st.juingStr = "";
                        if (iobj.act === "selected") {
                            setLine.mdClass.addInputText(iobj.selectText);
                        }
                        return;
                    };
                    opts.selectEsc_f = 1;
                    box.selectBox(opts);
                    st.juingStr = "";
                    var kvObj = md.blockRefs["key#" + 0];
                    kvObj.opts.innerText = st.juingStr;
                    kvObj.reCreate();
                    return;
                } else {
                    if (st.juingStr.length > 3)
                        st.juingStr = "";
                    var kvObj = md.blockRefs["key#" + 0];
                    kvObj.opts.innerText = st.juingStr;
                    kvObj.opts.fontWeight = "bold";
                    kvObj.opts.fontSize = "0.6rh";
                    kvObj.reCreate();
                }
                return;
            }
            return;
        }










        if (op.keyFlag & 16) {
            if (op.keyFlag & 8) {
                char = numId.toLowerCase();
            } else {
                char = numId.toUpperCase();
            }
        }
        setLine.mdClass.addInputText(char);
        if (op.keyFlag & 0xf0) {
            op.keyFlag &= 0x0f;
            md.opts.setOpts.value = inputElem.value;
            var cname = lyMaps["main"] + "~" + 1;
            md.clearOptsAll(cname);
            self.buildKeyPad();
            md.buildPart(cname);
            md.reCreate(cname);
        }
        return;
    }

    buildKeyPad() {
        var self = this;
        var md = self.md;
        var op = md.opts;
        var st = md.stas;
        var lyMaps = md.lyMaps;
        var blocks = op.blocks;
        var layouts = op.layouts;



        var actionFunc = function (iobj) {
            console.log(iobj);
            if (iobj.act === "blur") {
                return;
            }
            var numId = iobj.kvObj.opts.id;
            var keyInx = KvLib.toInt(iobj.kvObj.name.split("#")[1], 0);
            md.mdClass.emuKey(numId, keyInx);
            return;
        };
        var inx = 0;
        for (var i = 0; i < op.xyArr.length; i++) {
            var xArr = op.xyArr[i];
            for (var j = 0; j < xArr.length; j++) {
                var cname = lyMaps["mainBody"] + "~" + (inx);
                var opts = {};
                opts.actionFunc = actionFunc;
                opts.innerText = op.numTbl[inx];
                opts.id = op.numIds[inx];

                if (op.keyFlag & 4) {
                    opts.innerText = op.numTblB[inx];
                    opts.id = op.numIdsB[inx];
                } else {
                    if ((op.keyFlag & 8) && !(op.keyFlag & 16)) {
                        opts.innerText = op.numTblA[inx];
                        opts.id = op.numIdsA[inx];
                    }
                    if (!(op.keyFlag & 8) && (op.keyFlag & 16)) {
                        opts.innerText = op.numTblA[inx];
                        opts.id = op.numIdsA[inx];
                    }
                }

                if (opts.id === "") {
                    inx++;
                    continue;
                }
                if (st.padType === "keyboard") {
                    if (inx >= 1 && inx <= 7) {
                        var shi = 1 << inx;
                        opts.baseColor = "#ccc";
                        if (op.keyFlag & shi)
                            opts.baseColor = "#ccf";
                    }
                }

                opts.fontSize = "0.35rh";
                if (opts.innerText.includes("<br>")) {
                    opts.fontSize = "0.4rh";
                    opts.tpd = 6;
                    opts.bpd = 6;
                }
                if (opts.innerText.length === 1) {
                    opts.fontSize = "0.6rh";
                }
                if (opts.id === "enter") {

                } else {
                    opts.mousePushCon_f = 1;
                    opts.mouseClick_f = 0;
                    opts.mousePushActPrd = 4;
                }
                blocks[cname] = { name: "key#" + inx, type: "Component~Cp_base~button.sys0", opts: opts };
                inx++;
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
        st.juingStr = "";
        self.initKeyLayout();
        op.setOpts.expandWidth = 0;
        op.setOpts.blur_f = 0;

        if (op.setOpts.setType === "textArea")
            op.setOpts.actButtons = [];
        if (op.setOpts.setType === "inputSelect")
            op.setOpts.actButtons = [];
        var actButtons = [];
        for (var i = 0; i < op.setOpts.actButtons.length; i++) {
            if (op.setOpts.actButtons[i] !== "pad" && op.setOpts.actButtons[i] !== "edit")
                actButtons.push(op.setOpts.actButtons[i]);
        }
        op.setOpts.actButtons = actButtons;
        //======================================    
        var cname = "c";
        var opts = {};
        layouts[cname] = { name: cname, type: "Layout~Ly_base~array.sys0", opts: opts };
        lyMaps["body"] = cname;
        //======================================    
        var opts = {};
        md.setPns(opts);
        opts.margin = 0;
        blocks[cname] = { name: "basePanel", type: "Component~Cp_base~plate.sys0", opts: opts };
        //======================================    
        var cname = lyMaps["body"] + "~" + 0;
        var opts = {};
        mda.setMargin(opts, op);
        if (op.setOpts.setType === "textArea")
            opts.yArr = [op.memoHeight, 9999];
        else
            opts.yArr = [70, 9999];
        layouts[cname] = { name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts };
        lyMaps["main"] = cname;
        //======================================    
        var cname = lyMaps["main"] + "~" + 1;
        var opts = {};
        mda.setMargin(opts, op);
        opts.yArr = op.yArr;
        opts.xyArr = op.xyArr;
        opts.xm = 4;
        opts.ym = 4;
        layouts[cname] = { name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts };
        lyMaps["mainBody"] = cname;
        //======================================    


        var cname = lyMaps["main"] + "~" + 0;
        var opts = {};
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            if (iobj.act === "pressEnter")
                self.enterPrg(iobj);
            return;
        };
        var setOpts = opts.setOpts = op.setOpts;

        if (setOpts.setType === "inputText" || setOpts.setType === "inputSelect")
            setOpts.setType = "inputText";
        else
            setOpts.setType = "textArea";
        setOpts.actButtonWidth = 80;
        opts.disBlur_f = 1;
        blocks[cname] = { name: "lcd", type: "Model~MdaSetLine~base.sys0", opts: opts };
        self.buildKeyPad();





    }
}
//===========================================
class MdaColorPicker {
    constructor() {
        this.colorTable = [
            "#000", "#222", "#444", "#666", "#888", "#999",
            "#aaa", "#bbb", "#ccc", "#ddd", "#eee", "#fff",
            "#400", "#800", "#c00", "#f00", "#440", "#880",
            "#040", "#080", "#0c0", "#0f0", "#cc0", "#ff0",
            "#005", "#008", "#00c", "#00f", "#088", "#0ff"
        ];
    }

    initOpts(md) {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);
        opts.color = "#0f0";
        opts.cr = 0;
        opts.cg = 0;
        opts.cb = 0;
        opts.opacity = 1;
        opts.margin = 4;
        this.subTypeOpts(opts);
        return opts;
    }
    subTypeOpts(opts) {
        if (this.md.subType === "base.sys0") {
        }
    }

    afterCreate() {
    }
    actionFunc(iobj) {
        console.log(iobj);
        var kvObj = iobj.kvObj;
        var act = iobj.act;
        var name = kvObj.name;
        var md = kvObj.fatherMd;
        var self = md.mdClass;
        var op = md.opts;
        if (act === "pressEnter") {
            var colorInputObj = md.compRefs["colorInput"];
            var colorInputElem = colorInputObj.elems["input"];
            var colorStr = colorInputElem.value;
            if (colorStr === "" && !op.nullErr_f) {
                KvLib.exe(md.opts.actionFunc, colorStr);
                sys.popOff(2);
                return;
            }
            var colorObj = KvLib.transColor(colorStr, null);
            if (!colorObj) {
                sys.mesBox("cr~Error", 500, "Input Error !!!");
                self.setColor();
                return;
            }
            var colorStr = KvLib.transColorStr(colorObj.r, colorObj.g, colorObj.b, op.opacity);
            KvLib.exe(md.opts.actionFunc, colorStr);
            sys.popOff(2);
        }

        if (act === "click") {
            if (name === "escButton") {
                sys.popOff(2);
                return;
            }
            if (name === "okButton") {
                var colorStr = KvLib.transColorStr(op.cr, op.cg, op.cb, op.opacity);
                KvLib.exe(md.opts.actionFunc, colorStr);
                sys.popOff(2);
                return;
            }
            var strA = name.split("~");
            if (strA[0] === "colorButton") {
                var inx = KvLib.toInt(strA[1], 0);
                var strColor = md.opts.colorTable[inx];
                self.transColor(strColor);
                self.setColor();
                sys.popOff(2);
                var colorStr = KvLib.transColorStr(op.cr, op.cg, op.cb, op.opacity);
                KvLib.exe(md.opts.actionFunc, colorStr);
                return;
            }
        }
        if (act === "valueChange") {
            if (name === "colorRed")
                md.opts.cr = KvLib.parseNumber(iobj.value);
            if (name === "colorGreen")
                md.opts.cg = KvLib.parseNumber(iobj.value);
            if (name === "colorBlue")
                md.opts.cb = KvLib.parseNumber(iobj.value);
            if (name === "opacity")
                md.opts.opacity = KvLib.parseNumber(iobj.value);
            if (name === "colorInput") {
                self.transColor(iobj.value);
            }
            self.setColor();
        }
    }

    transColor(colorStr) {
        var md = this.md;
        var op = md.opts;
        var cobj = KvLib.transColor(colorStr);
        op.cr = cobj.r;
        op.cg = cobj.g;
        op.cb = cobj.b;
        if (cobj.a !== undefined)
            op.opacity = cobj.a;
    }
    setColor() {
        var self = this;
        var md = self.md;
        var op = md.opts;
        var colorStr = KvLib.transColorStr(op.cr, op.cg, op.cb);
        var kvObj = md.blockRefs["nowColor"];
        kvObj.opts.baseColor = "rgba(" + op.cr + "," + op.cg + "," + op.cb + "," + op.opacity + ")";
        kvObj.reCreate();
        var kvObj = md.blockRefs["colorInput"];
        kvObj.opts.setOpts.value = colorStr;
        kvObj.reCreate();
        return;
    }

    getColor(iobj) {
        var self = this;
        var md = self.md;
        var op = md.opts;
        return KvLib.setColor(op.cr, op.cg, op.cb, op.opacity);
    }

    build(md) {
        var self = this;
        var md = self.md;
        var op = md.opts;
        var st = md.stas;
        var lyMaps = md.lyMaps;
        var blocks = op.blocks;
        var layouts = op.layouts;
        //======================================    
        var setColorFunc = function (iobj) {
            console.log(iobj);
            if (iobj.act === "pressEnter") {
                self.transColor(iobj.value);
                self.setColor();
                var obj = md.blockRefs["redRange"];
                obj.opts.setOpts.value = op.cr;
                obj.reCreate();
                var obj = md.blockRefs["greenRange"];
                obj.opts.setOpts.value = op.cg;
                obj.reCreate();
                var obj = md.blockRefs["blueRange"];
                obj.opts.setOpts.value = op.cb;
                obj.reCreate();
                var obj = md.blockRefs["opacityRange"];
                obj.opts.setOpts.value = Math.round(op.opacity * 100);
                obj.reCreate();
                iobj.act = "colorSelected";
                iobj.sender = md;
                iobj.color = KvLib.setColor(op.cr, op.cg, op.cb, op.opacity);
                KvLib.exeFunc(op.actionFunc, iobj);
                return;
            }
            var strA = iobj.kvObj.name.split("#");
            if (strA[0] === "colorButton") {
                iobj.value = self.colorTable[KvLib.toInt(strA[1], 0)];
                op.opacity = 1;
                iobj.act = "pressEnter";
                setColorFunc(iobj);
                return;
            }
            if (iobj.sender.name === "redRange") {
                op.cr = iobj.value;
            }
            if (iobj.sender.name === "greenRange") {
                op.cg = iobj.value;
            }
            if (iobj.sender.name === "blueRange") {
                op.cb = iobj.value;
            }
            if (iobj.sender.name === "opacityRange") {
                op.opacity = iobj.value / 100;
            }
            if (iobj.sender.name === "colorInput") {
                var color = KvLib.transColor(iobj.value);
                if (!color) {
                    box.errorBox({ kvTexts: ["Format Error !!!"] });
                    return;
                }
                op.cr = color.r;
                op.cg = color.g;
                op.cb = color.b;

            }
            self.setColor();

        };

        var cname = "c";
        var opts = {};
        layouts[cname] = { name: cname, type: "Layout~Ly_base~array.sys0", opts: opts };
        lyMaps["body"] = cname;
        //======================================    
        var opts = {};
        md.setPns(opts);
        opts.margin = 0;
        blocks[cname] = { name: "basePanel", type: "Component~Cp_base~plate.sys0", opts: opts };
        //======================================    
        var cname = lyMaps["body"] + "~" + 0;
        var opts = {};
        mda.setMargin(opts, op);
        opts.yArr = [40, 30, 30, 30, 30, 9999];
        var xyArr = opts.xyArr = [];
        xyArr.push([50, 9999]);
        xyArr.push([30, 9999]);
        xyArr.push([30, 9999]);
        xyArr.push([30, 9999]);
        xyArr.push([100, 9999]);
        xyArr.push([9999]);
        opts.xm = 4;
        opts.ym = 4;
        layouts[cname] = { name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts };
        lyMaps["main"] = cname;
        //======================================    
        var cname = lyMaps["main"] + "~" + 0;

        var opts = {};
        opts.innerText = "A";
        blocks[cname + "#1"] = { name: "nowColor", type: "Component~Cp_base~plate.sys2", opts: opts };



        var opts = {};
        if (!op.color)
            op.color = "#000";
        var cobj = KvLib.transColor(op.color);
        if (!cobj)
            cobj = { r: 0, g: 0, b: 0 };
        op.cr = cobj.r;
        op.cg = cobj.g;
        op.cb = cobj.b;
        if (cobj.a === undefined)
            op.opacity = 1;
        else
            op.opacity = cobj.a;
        opts.baseColor = op.color;
        opts.margin = 2;
        blocks[cname] = { name: "nowColor", type: "Component~Cp_base~plate.none", opts: opts };





        var cname = lyMaps["main"] + "~" + 1;
        var opts = {};
        var setOpts = opts.setOpts = KvLib.copyObj(dsc.optsCopy.str, {});
        setOpts.titleWidth = 0;
        self.transColor(op.color);
        var colorStr = KvLib.transColorStr(op.cr, op.cg, op.cb);
        setOpts.value = colorStr;
        setOpts.dataType = "color";
        setOpts.title = "color";
        opts.actionFunc = setColorFunc;
        blocks[cname] = { name: "colorInput", type: "Model~MdaSetLine~base.sys0", opts: opts };

        var cname = lyMaps["main"] + "~" + 2;
        var opts = {};
        opts.baseColor = "#f00";
        blocks[cname] = { name: "redRangeLabel", type: "Component~Cp_base~plate.sys0", opts: opts };

        var cname = lyMaps["main"] + "~" + 3;
        var opts = {};
        var setOpts = opts.setOpts = KvLib.copyObj(dsc.optsCopy.inputRange, {});
        setOpts.max = 255;
        setOpts.value = op.cr;
        opts.actionFunc = setColorFunc;
        blocks[cname] = { name: "redRange", type: "Model~MdaSetLine~base.sys0", opts: opts };

        var cname = lyMaps["main"] + "~" + 4;
        var opts = {};
        opts.baseColor = "#0f0";
        blocks[cname] = { name: "greenRangeLabel", type: "Component~Cp_base~plate.sys0", opts: opts };

        var cname = lyMaps["main"] + "~" + 5;
        var opts = {};
        var setOpts = opts.setOpts = KvLib.copyObj(dsc.optsCopy.inputRange, {});
        setOpts.max = 255;
        setOpts.value = op.cg;
        opts.actionFunc = setColorFunc;
        blocks[cname] = { name: "greenRange", type: "Model~MdaSetLine~base.sys0", opts: opts };

        var cname = lyMaps["main"] + "~" + 6;
        var opts = {};
        opts.baseColor = "#00f";
        blocks[cname] = { name: "blueRangeLabel", type: "Component~Cp_base~plate.sys0", opts: opts };

        var cname = lyMaps["main"] + "~" + 7;
        var opts = {};
        var setOpts = opts.setOpts = KvLib.copyObj(dsc.optsCopy.inputRange, {});
        setOpts.value = op.cb;
        setOpts.max = 255;
        opts.actionFunc = setColorFunc;
        blocks[cname] = { name: "blueRange", type: "Model~MdaSetLine~base.sys0", opts: opts };


        var cname = lyMaps["main"] + "~" + 8;
        var opts = {};
        opts.innerText = "opacity";
        blocks[cname] = { name: "opacityLabel", type: "Component~Cp_base~plate.sys0", opts: opts };

        var cname = lyMaps["main"] + "~" + 9;
        var opts = {};
        var setOpts = opts.setOpts = KvLib.copyObj(dsc.optsCopy.inputRange, {});
        setOpts.value = Math.round(op.opacity * 100);
        opts.actionFunc = setColorFunc;
        blocks[cname] = { name: "opacityRange", type: "Model~MdaSetLine~base.sys0", opts: opts };

        var cname = lyMaps["main"] + "~" + 10;
        var opts = {};
        opts.xc = 6;
        opts.yc = 5;
        opts.xm = 4;
        opts.ym = 4;
        layouts[cname] = { name: cname, type: "Layout~Ly_base~array.sys0", opts: opts };
        lyMaps["mainBody"] = cname;
        //======================================    
        for (var i = 0; i < 30; i++) {
            var cname = lyMaps["mainBody"] + "~" + i;
            var opts = {};
            opts.innerText = "";
            opts.baseColor = this.colorTable[i];
            opts.actionFunc = setColorFunc;
            blocks[cname] = { name: "colorButton#" + i, type: "Component~Cp_base~button.sys2", opts: opts };
        }

    }
}

class MdaBlockView {
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);
        opts.title = "title";
        //opts.blockType="Model~MdaList~base.sys0"; 
        opts.blockType = "Component~Cp_base~button.sys0";
        opts.ym = 4;
        opts.blockOpts = {};
        this.subTypeOpts(opts);
        return opts;
    }
    subTypeOpts(opts) {
        if (this.md.subType === "base.sys0") {
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
        layouts[cname] = { name: cname, type: "Layout~Ly_base~array.sys0", opts: opts };
        lyMaps["body"] = cname;
        //======================================    
        var opts = {};
        md.setPns(opts);
        //======================================    
        var cname = lyMaps["body"] + "~" + 0;
        var opts = {};
        mda.setMargin(opts, op);
        opts.yArr = [40, 9999];
        opts.ym = op.ym;
        layouts[cname] = { name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts };
        lyMaps["main"] = cname;
        //======================================    
        var cname = lyMaps["main"] + "~" + 0;
        var opts = {};
        opts.innerText = op.title;
        opts.baseColor = "#fff";
        opts.actionFunc = op.actionFunc;
        blocks[cname] = { name: "labelButton", type: "Component~Cp_base~button.sys0", opts: opts };
        //======================================    
        var cname = lyMaps["main"] + "~" + 1;
        blocks[cname] = { name: "viewTarget", type: op.blockType, opts: op.blockOpts };
        //======================================    
    }
}

class MdaBlocksSelect {
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);
        opts.title = "MdaBlocksSelect";
        opts.ym = 4;
        opts.eh = 200;
        opts.eym = 10;
        opts.exm = 10;
        opts.baseColor = "#ccc";
        opts.blockOpts = {};
        opts.ksObjWs = ["0.33rw", "0.33rw", 9999];
        opts.ksObjss = [];
        var types = dbg.getButtonsType();
        var inx = 0;
        for (var i = 0; i < 100; i++) {
            var ksObjs = [];
            for (var j = 0; j < 3; j++) {
                if (inx >= types.length)
                    break;
                var ksObj = {};
                ksObj.name = "item#" + i + "." + j;
                ksObj.type = "Model~MdaBlockView~base.sys0";
                var kopts = ksObj.opts = {};
                kopts.title = types[inx];
                kopts.blockType = types[inx]
                ksObjs.push(ksObj);
                inx++;
            }
            opts.ksObjss.push(ksObjs);
            if (inx >= types.length)
                break;
        }


        this.subTypeOpts(opts);
        return opts;
    }
    subTypeOpts(opts) {
        if (this.md.subType === "base.sys0") {
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
        layouts[cname] = { name: cname, type: "Layout~Ly_base~array.sys0", opts: opts };
        lyMaps["body"] = cname;
        //======================================    
        var opts = {};
        md.setPns(opts);
        //======================================    
        var cname = lyMaps["body"] + "~" + 0;
        var opts = {};
        //opts.margin=4;
        //mda.setMargin(opts, op);
        opts.xArr = [300, 9999];
        opts.xm = op.xm;
        layouts[cname] = { name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts };
        lyMaps["main"] = cname;
        //======================================    
        var cname = lyMaps["main"] + "~" + 0;
        var opts = {};
        opts.innerText = op.title;
        opts.baseColor = "#fff";
        opts.actionFunc = op.actionFunc;
        //blocks[cname] = {name: "labelButton", type: "Component~Cp_base~button.sys0", opts: opts};
        //======================================    
        var cname = lyMaps["main"] + "~" + 1;
        var obj = mac.blockSelectsBoxOpts(op);
        blocks[cname] = { name: "blockSelectsBox", type: obj.type, opts: obj.opts };
        //======================================    
    }
}

class MdaSetGroup {
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);
        opts.baseColor = "#002";
        opts.title = "GroupSet";
        opts.titleWidth = 100;
        opts.titleColor = "#fff";
        opts.titleIconColor = "#ccc";
        opts.titleIcon = "";
        opts.setBorderWidth = 1;
        opts.editIndex = -1;
        opts.editButtonIndex = 0;
        opts.ym = 2;
        opts.xm = 2;
        opts.setOptss = [];
        var setOptss = opts.setOptss;
        setOptss.push(sopt.getEditUnit({ title: "緯度:", titleWidth: 60, "unit": "度", unitWidth: 50 }));
        opts.yArr = [9999];
        opts.xyArr = [
            [9999]
        ];

        return opts;
    }
    create() {
    }

    chkWatch(optName) {
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        if (st.blurObjName) {
            if (!st.blurTime)
                st.blurTime = 0;
            st.blurTime++;
            if (st.blurTime > 30) {
                st.blurObjName = "";
            }
        }
    }

    actionFunc(iobj) {
        console.log(iobj);
        var md = iobj.sender.fatherMd;
        if (!md)
            md = iobj.sender;
        var st = md.stas;
        var op = md.opts;
        if (iobj.act === "blur") {
            var sender = iobj.sender;
            st.blurTime = 0;
            st.blurObjName = sender.name;
        }
        iobj.sender = md;
        KvLib.exe(op.actionFunc, iobj);
        return;

        if (iobj.act === "actButtonClick") {
            if (iobj.sender.name === ("mdaSetLine#" + op.editIndex)) {
                if (iobj.buttonInx === op.editButtonIndex) {
                    if (st.blurObjName) {
                        console.log(st.blurObjName);
                        var obj = md.blockRefs[st.blurObjName];
                        var opts = {};
                        opts.setOpts = {};
                        KvLib.deepCoverObject(opts.setOpts, obj.opts.setOpts);
                        opts.setOpts.titleWidth = 0;
                        opts.setOpts.unitWidth = 0;
                        opts.title = opts.setOpts.title;
                        box.intPadBox(opts);
                    }
                    return;
                }
                return;
            }
            iobj.nameId = iobj.sender.name;
            iobj.sender = iobj.sender.fatherMd;
            KvLib.exe(op.actionFunc, iobj);
            return;
        }
        if (iobj.act === "blur") {
            var sender = iobj.sender;
            st.blurTime = 0;
            st.blurObjName = sender.name;
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
        layouts[cname] = { name: cname, type: "Layout~Ly_base~array.sys0", opts: opts };
        lyMaps["body"] = cname;
        //======================================    
        var opts = {};
        md.setPns(opts);
        blocks[cname] = { name: "basePanel", type: "Component~Cp_base~plate.sys0", opts: opts };
        //=======================================
        var cname = lyMaps["body"] + "~" + 0;
        var opts = {};
        layouts[cname] = { name: cname, type: "Layout~Ly_base~array.sys0", opts: opts };
        lyMaps["mainBody"] = cname;
        var cname = lyMaps["mainBody"] + "~" + 0;
        var opts = {};
        opts.baseColor = op.baseColor;
        opts.margin = 4;
        opts.tm = 12;
        opts.borderColor = "#fff";
        blocks[cname + "#0"] = { name: "basePanel", type: "Component~Cp_base~plate.sys0", opts: opts };
        //=====================================
        if (op.titleIcon) {
            var opts = {};
            opts.iw = 26;
            opts.ih = 26;
            opts.wAlign = "left";
            opts.hAlign = "top";
            opts.lm = 20;
            opts.tm = 0;
            opts.lpd = 4;
            opts.innerText = op.titleIcon;
            opts.innerTextColor = op.titleIconColor;
            opts.textAlign = "left";
            opts.baseColor = op.baseColor;
            blocks[cname + "#1"] = { name: "titleIcon", type: "Component~Cp_base~plate.none", opts: opts };
        }
        //======================================
        var opts = {};
        opts.innerText = op.title;
        opts.fontSize = 20;
        opts.fontWeight = "normal";
        opts.fontFamily = "nomospace";
        var wobj = KvLib.measureText(op.title, opts.fontSize, opts.fontWeight, opts.fontFamily);
        opts.iw = wobj.w + 10;//op.titleWidth;
        opts.ih = 26;
        opts.wAlign = "left";
        opts.hAlign = "top";
        opts.lm = 20;
        if (op.titleIcon)
            opts.lm = 20 + 26;
        opts.tm = 0;
        opts.lpd = 4;
        opts.innerTextColor = op.titleColor;
        opts.textAlign = "left";
        opts.baseColor = op.baseColor;
        blocks[cname + "#2"] = { name: "title", type: "Component~Cp_base~plate.none", opts: opts };


        //=====================================

        var cname = lyMaps["mainBody"] + "~" + 0;
        var opts = {};
        opts.margin = 8;
        opts.tm = 30;
        opts.xm = op.xm;
        opts.ym = op.ym;
        opts.lm = op.lm;
        opts.yArr = op.yArr;
        opts.xyArr = op.xyArr;
        layouts[cname] = { name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts };
        lyMaps["gridBody"] = cname;
        //===
        for (var i = 0; i < op.setOptss.length; i++) {
            var cname = lyMaps["gridBody"] + "~" + i;
            var opts = {};
            opts.setOpts = op.setOptss[i];
            if (!opts.setOpts)
                continue;
            opts.titleBorderWidth = 1;
            if (opts.setOpts) {
                opts.actionFunc = this.actionFunc;
                blocks[cname] = { name: "mdaSetLine#" + i, type: "Model~MdaSetLine~base.sys0", opts: opts };
            }
        }
        return;
    }
}

class MdaButtons {
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);
        this.subTypeOpts(opts);
        opts.baseColor = "#222";
        opts.buttonColor = "#ccf";
        opts.buttons = ["button1", "button2", "button3"];
        opts.layoutType = "row";//row,collum,array
        opts.buttonAmt = 8;
        opts.buttonIds = [];
        opts.iw = 9999;
        opts.ih = 9999;
        opts.margin = 4;
        opts.xm = 30;
        opts.ym = 10;
        opts.fontSize = "0.7rh";
        opts.xc = 1;
        opts.yc = 1;
        return opts;
    }
    subTypeOpts(opts) {
        if (this.md.subType === "base.sys0") {
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
        md.setPns(opts);
        layouts[cname] = { name: cname, type: "Layout~Ly_base~array.sys0", opts: opts };
        lyMaps["body"] = cname;
        //======================================    
        var opts = {};
        md.setPns(opts);
        blocks[cname] = { name: "basePanel", type: "Component~Cp_base~plate.sys0", opts: opts };
        //======================================    

        if (op.buttons.length) {
            var cname = lyMaps["body"] + "~" + 0;
            var opts = {};
            if (op.layoutType === "row")
                opts.xc = op.buttonAmt;
            if (op.layoutType === "collum")
                opts.yc = op.buttonAmt;
            if (op.xc !== 1 || op.yc !== 1) {
                opts.xc = op.xc;
                opts.yc = op.yc;
            }

            opts.ih = op.ih;
            opts.xm = op.xm;
            opts.ew = op.iw;
            opts.ym = op.ym;

            opts.wAlign = "center";
            opts.hAlign = "top";
            opts.margin = op.margin;
            layouts[cname] = { name: cname, type: "Layout~Ly_base~array.sys0", opts: opts };
            lyMaps["buttonPanel"] = cname;

            for (var i = 0; i < op.buttons.length; i++) {
                var cname = lyMaps["buttonPanel"] + "~" + i;
                var opts = {};
                opts.innerText = op.buttons[i];
                opts.id = op.buttons[i];
                if (op.buttonIds[i])
                    opts.id = op.buttonIds[i];
                opts.baseColor = op.buttonColor;
                opts.actionFunc = function (iobj) {
                    console.log(iobj);
                    iobj.sender = md;
                    iobj.buttonInx = KvLib.toInt(iobj.kvObj.name.split("#")[1], 0);
                    iobj.buttonId = iobj.kvObj.opts.id;
                    iobj.buttonText = iobj.kvObj.opts.innerText;
                    KvLib.exe(op.actionFunc, iobj);
                };
                opts.fontSize = op.fontSize;
                blocks[cname] = { name: "button#" + i, type: "Component~Cp_base~button.sys0", opts: opts };
            }
        }



    }
}

class MdaHeadTitle {
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);
        opts.xArr = [9999, 100, 100];
        opts.headTitles = ["123", "456", "789"];
        this.subTypeOpts(opts);
        return opts;
    }
    subTypeOpts(opts) {
        if (this.md.subType === "base.sys0") {
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
        layouts[cname] = { name: cname, type: "Layout~Ly_base~array.sys0", opts: opts };
        lyMaps["body"] = cname;
        //======================================    
        var opts = {};
        md.setPns(opts);
        opts.mouseClick_f = 1;
        blocks[cname] = { name: "basePanel", type: "Component~Cp_base~plate.sys0", opts: opts };
        //======================================    
        opts.xArr = op.xArr;
        opts.xm = 0;
        layouts[cname] = { name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts };
        lyMaps["main"] = cname;


        for (var i = 0; i < op.xArr.length; i++) {
            var cname = lyMaps["main"] + "~" + i;
            var opts = {};
            opts.innerText = op.headTitles[i];
            blocks[cname] = { name: "basePanel", type: "Component~Cp_base~label.sys0", opts: opts };
        }
    }
}

class MdaSetNames {
    constructor() {

    }

    initOpts(md) {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);
        opts.propertyWidth = 500;
        opts.propertyHeight = 500;
        opts.title = "Title";
        opts.borderColor = "#fff";
        opts.borderWidth = 1;
        opts.readOnly_f = 0;
        //===================
        opts.menuSelectClear_f = 1;
        opts.menuSelectAll_f = 1;
        opts.menuNew_f = 1;
        opts.menuDelete_f = 1;
        opts.menuMoveUp_f = 1;
        opts.menuMoveUp_f = sys.setOptsSet("menuMoveUp_f", "flag", "inputBoolean");
        opts.menuMoveDown_f = 1;
        opts.menuMoveDown_f = sys.setOptsSet("menuMoveDown_f", "flag", "inputBoolean");
        opts.newInput_f = 0;
        opts.newInput_f = sys.setOptsSet("newInput_f", "flag", "inputBoolean");


        opts.menuSave_f = 1;
        opts.menuEsc_f = 1;

        opts.iconDisableA = [1, 1, 1, 1, 1, 1, 0, 0];
        opts.iconHeight = 50;
        opts.titleHeight = 40;
        opts.buttonHeight = 50;

        opts.rowCnt = 16;
        opts.rowStart = 0;
        opts.rowButtonOn_f = 1;
        this.subTypeOpts(opts);
        return opts;
    }
    subTypeOpts(opts) {
        if (this.md.subType === "base.sys0") {
        }
    }

    afterCreate() {
        var md = this.md;
        var op = md.opts;
        if (op.actionFunc)
            op.actionFunc({ act: "reDraw" });
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
                var tag = "✔";
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
            case "delete":
                var deleteAllFunc = function (iobj) {
                    if (iobj.buttonName !== "YES")
                        return;
                    for (var i = 0; i < op.valuesA.length;) {
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
            op.actionFunc({ act: "reDraw" });
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
        layouts[cname] = { name: cname, type: "base", opts: opts };
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
        layouts[cname] = { name: cname, type: "base", opts: opts };
        lyMap.set("pnIcon", cname);

        for (var i = 0; i < texts.length; i++) {
            var opts = {};
            var cname = lyMap.get("pnIcon") + "~" + i;
            var strA = texts[i].split(",");
            opts.itemId = strA[0];
            opts.innerText = strA[1];
            opts.disable_f = op.iconDisableA[i];
            opts.clickFunc = self.menuFunc;
            comps[cname] = { name: "iconButton#" + i, type: "button~sys", opts: opts };

        }

        var cname = lyMap.get("body") + "~" + 1;
        var opts = {};
        opts.fontWeight = "bold";
        opts.textAlign = "center";
        opts.innerText = op.title;
        comps[cname] = { name: "arrayName", type: "label~sys", opts: opts };
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
                    op.valuesA[vInx][op.selectInx] = "✔";
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
        models[cname] = { name: "setArrayPanel", type: "Md_setArrayPanel~sys", opts: opts };
        //======================================================================
        var cname = lyMap.get("body") + "~" + 3;
        var opts = {};
        opts.xc = 6;
        opts.yc = 1;
        opts.margin = 4;
        opts.xm = 10;
        layouts[cname] = { name: cname, type: "base", opts: opts };
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


        var texts = ["▲", "▼"];
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
            comps[cname] = { name: "phoneKeyButton#" + i, type: "button~sys", opts: opts };
        }
        var cname = lyMap.get("pnButton") + "~" + (0);
        var opts = {};
        opts.fontSize = "0.4rh";
        opts.innerText = "&nbsp;" + (op.rowStart + 1) + "/" + op.valuesA.length;
        opts.innerTextColor = "#ccc";

        comps[cname] = { name: "itemLabel", type: "plane~none", opts: opts };



    }
}

