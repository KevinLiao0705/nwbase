class MdaMdTest {
    constructor() {
    }
    initOpts(md) {
        var self = this;
        var opts = {};
        Block.setBaseOpts(opts);
        return opts;
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
        layouts[cname] = {name: cname, type: "Layout~Ly_base~array.sys0", opts: opts};
        lyMaps["body"] = cname;

        var opts = {};
        md.setPns(opts);
        opts.mouseClick_f = 1;
        opts.actionFunc = function (iobj) {
            console.log("base");
            //console.log(iobj);
        };
        blocks[cname] = {name: "basePanel", type: "Component~Cp_base~plate.none", opts: opts};

        //======================================    
        var cname = lyMaps["body"] + "~" + 0;
        var opts = {};
        opts.margin = 0;
        opts.xm = 0;
        opts.ym = 0;
        //md.setDialogFrame(opts);
        //layouts[cname] = {name: cname, type: "Layout~Ly_base~array.sys0", opts: opts};
        opts.yArr = [24, 9999, 40];
        opts.xyArr = [[9999, 40, 40], [9999, 100, 200], [100, 9999, 100]];
        layouts[cname] = {name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts};
        lyMaps["body0"] = cname;


        //==============================
        var cname = lyMaps["body0"] + "~" + 0;
        var opts = {};
        opts.menus = dbg.getBuilderMenus();

        opts.actionFunc = function (iobj) {
            console.log(iobj);
            if (iobj.keyId === "menu0~itemId#0") {
                var opts = {};
                var kvObj = new Block("testList", "Model~MdaBlockView~base.sys0", opts);
                mda.popObj(300, 400, kvObj, 1);
                return;
            }

            if (iobj.keyId === "menu0~itemId#1") {
                var opts = {};
                var kvObj = new Block("testList", "Model~MdaBlocksSelect~base.sys0", opts);
                mda.popObj(9999, 9999, kvObj, 1);
                return;
            }

            if (iobj.keyId === "menu0~itemId#1") {
                //var opts = {};
                //var kvObj = new Block("testList", "Model~MdaContainer~base.page", opts);
                //mda.popObj(800, 600, kvObj, 1);
                //return;

                var opts = {};
                opts.containerType = "Model~MdaContainer~base.page";
                opts.title = "Object Table";
                opts.etm = 4;
                opts.ebm = 4;
                opts.erm = 4;
                opts.elm = 4;

                opts.w = 9999;
                opts.h = 9999;
                opts.eh = 100;
                opts.exm = 20;
                opts.eym = 20;
                opts.ym = 4;


                opts.margin = 2;

                opts.headButtons = ["ESC"];
                opts.headButtonIds = ["esc"];
                opts.title = "1234";
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
                        kopts.blockType = types[inx];
                        ksObjs.push(ksObj);
                        inx++;
                    }
                    opts.ksObjss.push(ksObjs);
                    if (inx >= types.length)
                        break;
                }





                mda.containerBox(opts);


                return;

            }

            if (iobj.keyId === "menu0~itemId#6") {
                var opts = {};
                var kvObj = new Block("testList", "Model~MdaList~base.sys0", opts);
                mda.popObj(300, 400, kvObj, 1);
                return;
            }


            if (iobj.keyId === "testMesssageBox~mesBox") {
                box.mesBox({});
                return;
            }
            if (iobj.keyId === "testMesssageBox~warnBox") {
                box.warnBox({});
                return;
            }
            if (iobj.keyId === "testMesssageBox~okBox") {
                box.okBox({});
                return;
            }
            if (iobj.keyId === "testMesssageBox~errorBox") {
                box.errorBox({});
                return;
            }
            if (iobj.keyId === "testMesssageBox~checkBox") {
                box.checkBox({});
                return;
            }
            //========================
            if (iobj.keyId === "testSelectBox~selectBox") {
                box.selectBox({});
                return;
            }
            if (iobj.keyId === "testSelectBox~selectOkBox") {
                box.selectOkBox({});
                return;
            }
            if (iobj.keyId === "testSelectBox~selectPageBox") {
                box.selectPageBox({});
                return;
            }
            if (iobj.keyId === "testSelectBox~selectPageOkBox") {
                box.selectPageOkBox({});
                return;
            }
            //========================
            if (iobj.keyId === "testMdaList~base.sys0") {
                var opts = {};
                var kvObj = new Block("testList", "Model~MdaList~base.sys0", opts);
                mda.popObj(300, 400, kvObj, 1);
                return;
            }
            if (iobj.keyId === "testMdaList~base.sys1") {
                var opts = {};
                var kvObj = new Block("testList", "Model~MdaList~base.sys1", opts);
                mda.popObj(300, 400, kvObj, 1);
                return;
            }
            //========================
            if (iobj.keyId === "testMdaContainer~base.page") {
                var opts = {};
                var kvObj = new Block("testList", "Model~MdaContainer~base.page", opts);
                mda.popObj(800, 600, kvObj, 1);
                return;
            }
            if (iobj.keyId === "testMdaContainer~base.table") {
                var opts = {};
                var kvObj = new Block("testList", "Model~MdaContainer~base.table", opts);
                mda.popObj(800, 600, kvObj, 1);
                return;
            }
            if (iobj.keyId === "testMdaContainer~base.free") {
                var opts = {};
                var kvObj = new Block("testList", "Model~MdaContainer~base.free", opts);
                mda.popObj(800, 600, kvObj, 1);
                return;
            }
            if (iobj.keyId === "testMdaContainer~dark.page") {
                var opts = {};
                var kvObj = new Block("testList", "Model~MdaContainer~dark.page", opts);
                mda.popObj(800, 600, kvObj, 1);
                return;
            }
            if (iobj.keyId === "testMdaContainer~dark.table") {
                var opts = {};
                var kvObj = new Block("testList", "Model~MdaContainer~dark.table", opts);
                mda.popObj(800, 600, kvObj, 1);
                return;
            }
            if (iobj.keyId === "testMdaContainer~dark.free") {
                var opts = {};
                var kvObj = new Block("testList", "Model~MdaContainer~dark.free", opts);
                mda.popObj(800, 600, kvObj, 1);
                return;
            }
            //========================
            if (iobj.keyId === "testContainerBox~base.page") {
                box.containerPageBox({}, {});
                return;
            }
            if (iobj.keyId === "testContainerBox~base.table") {
                box.containerTableBox({}, {});
                return;
            }
            if (iobj.keyId === "testContainerBox~base.free") {
                box.containerFreeBox({}, {});
                return;
            }
            //========================
            if (iobj.keyId === "testSetLine~buttonActs") {
                mda.setLineButtonActs({});
                return;
            }
            if (iobj.keyId === "testSetLine~buttonOnOffs") {
                mda.setLineButtonOnOffs({});
                return;
            }
            if (iobj.keyId === "testSetLine~buttonSelect") {
                mda.setLineButtonSelect({});
                return;
            }
            if (iobj.keyId === "testSetLine~buttonChecks") {
                mda.setLineButtonChecks({});
                return;
            }
            if (iobj.keyId === "testSetLine~buttonRadio") {
                mda.setLineButtonRadio({});
                return;
            }
            if (iobj.keyId === "testSetLine~inputText") {
                mda.setLineIntInputText({});
                return;
            }
            if (iobj.keyId === "testSetLine~textArea") {
                mda.setLineTextArea({});
                return;
            }
            //========================
            if (iobj.keyId === "testSetLine~labelViews") {
                mda.setLineLabelViews({});
                return;
            }
            if (iobj.keyId === "testSetLine~select") {
                mda.setLineSelect({});
                return;
            }
            if (iobj.keyId === "testSetLine~inputSelect") {
                mda.setLineInputSelect({});
                return;
            }
            if (iobj.keyId === "testSetLine~setLineBox") {
                box.setLineBox({});
                return;
            }
            if (iobj.keyId === "testSetLine~setOptsBox") {
                box.setOptsBox({});
                return;
            }
            //========================
            if (iobj.keyId === "testInputPad~intPad") {
                var obj = {};
                obj.name = "testClass";
                obj.type = "Model~MdaPad~base.sys0";
                obj.w = 600;
                obj.h = 400;
                var opts = obj.opts = {};
                opts.setOpts = dsc.optsCopy.int;
                opts.actionFunc = function (iobj) {
                    console.log(iobj);
                    MdaPopWin.popOffTo(iobj.sender.opts.popStackCnt);
                };
                mda.popKs(obj);
                return;
            }
            if (iobj.keyId === "testInputPad~hexPad") {
                var obj = {};
                obj.name = "testClass";
                obj.type = "Model~MdaPad~base.sys0";
                obj.w = 600;
                obj.h = 400;
                var opts = obj.opts = {};
                opts.setOpts = dsc.optsCopy.hex;
                opts.actionFunc = function (iobj) {
                    console.log(iobj);
                    MdaPopWin.popOffTo(iobj.sender.opts.popStackCnt);
                };
                mda.popKs(obj);
                return;
            }
            if (iobj.keyId === "testInputPad~intPadBox") {
                box.intPadBox({});
                return;
            }
            if (iobj.keyId === "testInputPad~hexPadBox") {
                box.hexPadBox({});
                return;
            }
            if (iobj.keyId === "testInputPad~intHexPadBox") {
                box.intHexPadBox({});
                return;
            }
            if (iobj.keyId === "testInputPad~floatPadBox") {
                box.floatPadBox({});
                return;
            }
            if (iobj.keyId === "testInputPad~keyboardBox") {
                var opts = {};
                opts.setOpts = dsc.optsCopy.str;
                box.keyboardBox(opts);
                return;
            }
            if (iobj.keyId === "testInputPad~pickColorBox") {
                box.pickColorBox({});
                return;
            }
            //========================
            if (iobj.keyId === "testSetLineInputText~inputTextInt") {
                mda.setLineIntInputText({});
                return;
            }
            if (iobj.keyId === "testSetLineInputText~inputTextStr") {
                mda.setLineStrInputText({});
                return;
            }
            //========================
            if (iobj.keyId === "testViewBox~editorBox") {
                var editorBox = box.editorBox({});
                var kvObj = editorBox.blockRefs["mainMd"];
                KvLib.endInputEditor(kvObj, "ewaweqweqw", "green");
                KvLib.endInputEditor(kvObj, "ewaweqweqw", "yellow");
                KvLib.endInputEditor(kvObj, "ewaweqweqw", "red");
                return;
            }
            //menu6=================================================================
            if (iobj.keyId === "componentTest~showButtons") {
                var op1 = {};
                var op2 = {};
                op1.title = "Select Buttons";
                op1.headButtons = ["ESC"];
                op1.headButtonIds = ["esc"];
                op2.ksObjWs = ["0.25rw", "0.25rw", "0.25rw", 9999];
                op2.eh = 90;
                op2.ksObjss = [];
                op2.ym = 10;
                op2.xm = 10;
                var inx = 0;
                var ser = 0;
                var lim = 36;
                for (var i = 0; i < 14; i++) {
                    var ksObjs = [];
                    for (var j = 0; j < 4; j++) {
                        if (inx >= lim)
                            break;
                        var ksObj = {};
                        ksObj.type = "Model~MdaBlockSelect~base.sys0";
                        var opts = ksObj.opts = {};
                        if (inx === 0)
                            var csObj = cs.get("button.sys");
                        if (inx === 1)
                            var csObj = cs.get("button.shadow");
                        if (inx === 2)
                            var csObj = cs.get("button.twoLine");
                        if (inx === 3)
                            var csObj = cs.get("button.simple");
                        if (inx === 4)
                            var csObj = cs.get("button.icon");
                        if (inx === 5)
                            var csObj = cs.get("button.mouseOnColor");
                        if (inx === 6)
                            var csObj = cs.get("button.list");
                        if (inx === 7)
                            var csObj = cs.get("button.through");
                        if (inx === 8)
                            var csObj = cs.get("button.menu");
                        if (inx === 9)
                            var csObj = cs.get("button.red");
                        if (inx === 10)
                            var csObj = cs.get("button.green");
                        if (inx === 11)
                            var csObj = cs.get("button.blue");
                        if (inx === 12)
                            var csObj = cs.get("button.yellow");
                        if (inx === 13)
                            var csObj = cs.get("button.dark");
                        if (inx === 14)
                            var csObj = cs.get("button.alt0");
                        if (inx === 15)
                            var csObj = cs.get("button.alt1");
                        if (inx === 16)
                            var csObj = cs.get("button.alt2");
                        if (inx === 17)
                            var csObj = cs.get("button.alt3");
                        if (inx === 18)
                            var csObj = cs.get("button.alt4");
                        if (inx === 19)
                            var csObj = cs.get("button.imageFit");
                        if (inx === 20)
                            var csObj = cs.get("button.imageExtend");
                        if (inx === 21)
                            var csObj = cs.get("button.imageMetal");
                        if (inx === 22)
                            var csObj = cs.get("button.imageMetal1");
                        if (inx === 23)
                            var csObj = cs.get("button.imageMetal2");
                        if (inx === 24)
                            var csObj = cs.get("button.imageYellow");
                        if (inx === 25)
                            var csObj = cs.get("button.imageWood");
                        if (inx === 25)
                            var csObj = cs.get("button.imageWood");
                        if (inx === 26)
                            var csObj = cs.get("button.imageWood1");
                        if (inx === 27)
                            var csObj = cs.get("button.imageGlass");
                        if (inx === 28)
                            var csObj = cs.get("button.imageGlass1");
                        if (inx === 29)
                            var csObj = cs.get("button.imageGlass2");
                        if (inx === 30)
                            var csObj = cs.get("button.circle");
                        if (inx === 31)
                            var csObj = cs.get("button.circleMetal");
                        if (inx === 32)
                            var csObj = cs.get("button.circleGrey");
                        if (inx === 33)
                            var csObj = cs.get("button.circleGreen");
                        if (inx === 34)
                            var csObj = cs.get("button.circleRed");
                        if (inx === 35)
                            var csObj = cs.get("button.circleBlue");
                        opts.type = csObj.type;
                        opts.opts = csObj.opts;
                        opts.csName = csObj.csName;
                        opts.opts.fontSize = "0.5rh";
                        ksObjs.push(ksObj);
                        inx++;
                    }
                    if (ksObjs.length)
                        op2.ksObjss.push(ksObjs);
                }
                box.containerPageBox(op1, op2);
                return;
            }
            if (iobj.keyId === "componentTest~showLabels") {
                var op1 = {};
                var op2 = {};
                op1.title = "Select Labels";
                op1.headButtons = ["ESC"];
                op1.headButtonIds = ["esc"];
                op2.ksObjWs = ["0.25rw", "0.25rw", "0.25rw", 9999];
                op2.eh = 90;
                op2.ksObjss = [];
                op2.ym = 10;
                op2.xm = 10;
                var inx = 0;
                var ser = 0;
                var lim = 26;
                for (var i = 0; i < 14; i++) {
                    var ksObjs = [];
                    for (var j = 0; j < 4; j++) {
                        if (inx >= lim)
                            break;
                        var ksObj = {};
                        ksObj.type = "Model~MdaBlockSelect~base.sys0";
                        var opts = ksObj.opts = {};

                        if (inx === 0)
                            var csObj = cs.get("label.sys");
                        if (inx === 1)
                            var csObj = cs.get("label.dark");
                        if (inx === 2)
                            var csObj = cs.get("label.gray");
                        if (inx === 3)
                            var csObj = cs.get("label.ledAlt0");
                        if (inx === 4)
                            var csObj = cs.get("label.ledAlt1");
                        if (inx === 5)
                            var csObj = cs.get("label.ledAlt2");
                        if (inx === 6)
                            var csObj = cs.get("label.ledAlt3");
                        if (inx === 7)
                            var csObj = cs.get("label.ledAlt4");
                        if (inx === 8)
                            var csObj = cs.get("label.title");
                        if (inx === 9)
                            var csObj = cs.get("label.shadow");
                        if (inx === 10)
                            var csObj = cs.get("label.name");
                        if (inx === 11)
                            var csObj = cs.get("label.gridTr");
                        if (inx === 12)
                            var csObj = cs.get("label.gridT");
                        if (inx === 13)
                            var csObj = cs.get("label.lampAlt0");
                        if (inx === 14)
                            var csObj = cs.get("label.lampAlt1");
                        if (inx === 15)
                            var csObj = cs.get("label.lampAlt2");
                        if (inx === 16)
                            var csObj = cs.get("label.lampAlt3");
                        if (inx === 17)
                            var csObj = cs.get("label.lampAlt4");
                        if (inx === 18)
                            var csObj = cs.get("label.imageMetal");
                        if (inx === 19)
                            var csObj = cs.get("label.imageMetal1");
                        if (inx === 20)
                            var csObj = cs.get("label.imageMetal2");
                        if (inx === 21)
                            var csObj = cs.get("label.imageYellow");
                        if (inx === 22)
                            var csObj = cs.get("label.imageWood");
                        if (inx === 23)
                            var csObj = cs.get("label.imageWood1");
                        if (inx === 24)
                            var csObj = cs.get("label.imageBlue");
                        if (inx === 25)
                            var csObj = cs.get("label.imageGreen");
                        opts.type = csObj.type;
                        opts.opts = csObj.opts;
                        opts.csName = csObj.csName;
                        opts.opts.fontSize = "0.5rh";
                        ksObjs.push(ksObj);
                        inx++;
                    }
                    if (ksObjs.length)
                        op2.ksObjss.push(ksObjs);
                }
                box.containerPageBox(op1, op2);
                return;
            }
            if (iobj.keyId === "componentTest~showInputs") {
                var op1 = {};
                var op2 = {};
                op1.title = "Select Inputs";
                op1.headButtons = ["ESC"];
                op1.headButtonIds = ["esc"];
                op2.ksObjWs = ["0.25rw", "0.25rw", "0.25rw", 9999];
                op2.eh = 90;
                op2.ksObjss = [];
                op2.ym = 10;
                op2.xm = 10;
                var inx = 0;
                var ser = 0;
                var lim = 6;
                for (var i = 0; i < 14; i++) {
                    var ksObjs = [];
                    for (var j = 0; j < 4; j++) {
                        if (inx >= lim)
                            break;
                        var ksObj = {};
                        ksObj.type = "Model~MdaBlockSelect~base.sys0";
                        var opts = ksObj.opts = {};

                        if (inx === 0)
                            var csObj = cs.get("input.sys");
                        if (inx === 1)
                            var csObj = cs.get("input.radio");
                        if (inx === 2)
                            var csObj = cs.get("input.radio");
                        if (inx === 3)
                            var csObj = cs.get("input.radio");
                        if (inx === 4)
                            var csObj = cs.get("input.inputRange");
                        if (inx === 5)
                            var csObj = cs.get("input.inputText");
                        opts.type = csObj.type;
                        opts.opts = csObj.opts;
                        opts.csName = csObj.csName;
                        opts.opts.fontSize = "0.5rh";
                        ksObjs.push(ksObj);
                        inx++;
                    }
                    if (ksObjs.length)
                        op2.ksObjss.push(ksObjs);
                }
                box.containerPageBox(op1, op2);
                return;
            }
            if (iobj.keyId === "componentTest~showSetLines") {
                var op1 = {};
                var op2 = {};
                op1.title = "Select SetLines";
                op1.headButtons = ["ESC"];
                op1.headButtonIds = ["esc"];
                op2.ksObjWs = ["0.5rw", 9999];
                op2.eh = 80;
                op2.ksObjss = [];
                op2.ym = 10;
                op2.xm = 10;
                op2.background = "linear-gradient(to top, #110044, #332266)";
                var inx = 0;
                var ser = 0;
                var lim = 19;
                for (var i = 0; i < 14; i++) {
                    var ksObjs = [];
                    for (var j = 0; j < 2; j++) {
                        if (inx >= lim)
                            break;
                        var ksObj = {};
                        ksObj.type = "Model~MdaBlockSelect~base.sys0";
                        var opts = ksObj.opts = {};

                        if (inx === 0)
                            var csObj = cs.get("setLine.buttonActs");
                        if (inx === 1)
                            var csObj = cs.get("setLine.buttonOnOffs");
                        if (inx === 2)
                            var csObj = cs.get("setLine.buttonSelect");
                        if (inx === 3)
                            var csObj = cs.get("setLine.buttonChecks");
                        if (inx === 4)
                            var csObj = cs.get("setLine.buttonRadio");
                        if (inx === 5)
                            var csObj = cs.get("setLine.inputTextNature");
                        if (inx === 6)
                            var csObj = cs.get("setLine.inputTextInt");
                        if (inx === 7)
                            var csObj = cs.get("setLine.inputTextStr");
                        if (inx === 8)
                            var csObj = cs.get("setLine.inputTextFloat");
                        if (inx === 9)
                            var csObj = cs.get("setLine.intPassword");
                        if (inx === 10)
                            var csObj = cs.get("setLine.strPassword");
                        if (inx === 11)
                            var csObj = cs.get("setLine.inputTextIp");
                        if (inx === 12)
                            var csObj = cs.get("setLine.lcdView");
                        if (inx === 13)
                            var csObj = cs.get("setLine.lcdYellow");
                        if (inx === 14)
                            var csObj = cs.get("setLine.leds");
                        if (inx === 15)
                            var csObj = cs.get("setLine.view");
                        if (inx === 16)
                            var csObj = cs.get("setLine.textArea");
                        if (inx === 17)
                            var csObj = cs.get("setLine.select");
                        if (inx === 18)
                            var csObj = cs.get("setLine.inputSelect");
                        opts.type = csObj.type;
                        opts.opts = csObj.opts;
                        opts.csName = csObj.csName;
                        opts.opts.fontSize = "0.5rh";
                        ksObjs.push(ksObj);
                        inx++;
                    }
                    if (ksObjs.length)
                        op2.ksObjss.push(ksObjs);
                }
                box.containerPageBox(op1, op2);
                return;
            }
            if (iobj.keyId === "componentTest~showGauges") {
                var op1 = {};
                var op2 = {};
                op1.title = "Select Gauges";
                op1.headButtons = ["ESC"];
                op1.headButtonIds = ["esc"];
                op2.ksObjWs = ["0.33rw", "0.33rw", 9999];
                op2.eh = 400;
                op2.ksObjss = [];
                op2.ym = 10;
                op2.xm = 10;
                var inx = 0;
                var ser = 0;
                var lim = 6;
                for (var i = 0; i < 2; i++) {
                    var ksObjs = [];
                    for (var j = 0; j < 3; j++) {
                        if (inx >= lim)
                            break;
                        var ksObj = {};
                        ksObj.type = "Model~MdaBlockSelect~base.sys0";
                        var opts = ksObj.opts = {};

                        if (inx === 0)
                            var csObj = cs.get("guage.circleDark");
                        if (inx === 1)
                            var csObj = cs.get("guage.lineDark");
                        if (inx === 2)
                            var csObj = cs.get("guage.compassDark");
                        if (inx === 3)
                            var csObj = cs.get("guage.circleLight");
                        if (inx === 4)
                            var csObj = cs.get("guage.lineLight");
                        if (inx === 5)
                            var csObj = cs.get("guage.compassLight");
                        opts.type = csObj.type;
                        opts.opts = csObj.opts;
                        opts.csName = csObj.csName;
                        opts.opts.fontSize = "0.5rh";
                        ksObjs.push(ksObj);
                        inx++;
                    }
                    if (ksObjs.length)
                        op2.ksObjss.push(ksObjs);
                }
                box.containerPageBox(op1, op2);
                return;
            }
            if (iobj.keyId === "componentTest~showCharts") {
                var op1 = {};
                var op2 = {};
                op1.title = "Select Charts";
                op1.headButtons = ["ESC"];
                op1.headButtonIds = ["esc"];
                op2.ksObjWs = ["0.5rw", 9999];
                op2.eh = 400;
                op2.ksObjss = [];
                op2.ym = 10;
                op2.xm = 10;
                var inx = 0;
                var ser = 0;
                var lim = 16;
                for (var i = 0; i < 10; i++) {
                    var ksObjs = [];
                    for (var j = 0; j < 2; j++) {
                        if (inx >= lim)
                            break;
                        var ksObj = {};
                        ksObj.type = "Model~MdaBlockSelect~base.sys0";
                        var opts = ksObj.opts = {};

                        if (inx === 0)
                            var csObj = cs.get("chart.bar");
                        if (inx === 1)
                            var csObj = cs.get("chart.hbar");
                        if (inx === 2)
                            var csObj = cs.get("chart.barDark");
                        if (inx === 3)
                            var csObj = cs.get("chart.hbarDark");
                        if (inx === 4)
                            var csObj = cs.get("chart.line");
                        if (inx === 5)
                            var csObj = cs.get("chart.lineDark");
                        if (inx === 6)
                            var csObj = cs.get("chart.moutain");
                        if (inx === 7)
                            var csObj = cs.get("chart.moutainDark");


                        if (inx === 8)
                            var csObj = cs.get("chart.doughnut");
                        if (inx === 9)
                            var csObj = cs.get("chart.doughnutDark");
                        if (inx === 10)
                            var csObj = cs.get("chart.pie");
                        if (inx === 11)
                            var csObj = cs.get("chart.pieDark");
                        if (inx === 12)
                            var csObj = cs.get("chart.polar");
                        if (inx === 13)
                            var csObj = cs.get("chart.polarDark");
                        if (inx === 14)
                            var csObj = cs.get("chart.radar");
                        if (inx === 15)
                            var csObj = cs.get("chart.radarDark");
                        opts.type = csObj.type;
                        opts.opts = csObj.opts;
                        opts.csName = csObj.csName;
                        opts.opts.fontSize = "0.5rh";
                        ksObjs.push(ksObj);
                        inx++;
                    }
                    if (ksObjs.length)
                        op2.ksObjss.push(ksObjs);
                }
                box.containerPageBox(op1, op2);
                return;
            }

            if (iobj.keyId === "showOthers~showYouTube") {
                var csObj = cs.get("youTube.darji");
                var opts={};
                opts.type = csObj.type;
                opts.opts = csObj.opts;
                opts.csName = csObj.csName;
                var kvObj = new Block(csObj.csName, csObj.type, csObj.opts);
                mda.popObj(1200, 800, kvObj, 1);
                return;
            }
            if (iobj.keyId === "showOthers~showUrlReader") {
                var csObj = cs.get("urlReader.png");
                var opts={};
                opts.type = csObj.type;
                opts.opts = csObj.opts;
                opts.csName = csObj.csName;
                var kvObj = new Block(csObj.csName, csObj.type, csObj.opts);
                mda.popObj(1200, 800, kvObj, 1);
                return;
            }


            //=================================================================
            if (iobj.keyId === "showMdaMenu~base.sys0") {
                var opts = {};
                var kvObj = new Block("testMenu", "Model~MdaMenu~base.sys0", opts);
                mda.popObj(1200, 40, kvObj, 1);
                return;
            }
            if (iobj.keyId === "showMdaMenu~base.sys1") {
                var opts = {};
                var kvObj = new Block("testMenu", "Model~MdaMenu~base.sys1", opts);
                mda.popObj(1200, 40, kvObj, 1);
                return;
            }
            //===============
            if (iobj.keyId === "showMdaScroll~base.sys0") {
                var opts = {};
                var kvObj = new Block("testScroll", "Model~MdaScroll~base.sys0", opts);
                mda.popObj(20, 800, kvObj, 1);
                return;
            }
            if (iobj.keyId === "showMdaScroll~base.sys1") {
                var opts = {};
                var kvObj = new Block("testScroll", "Model~MdaScroll~base.sys1", opts);
                mda.popObj(20, 800, kvObj, 1);
                return;
            }
            if (iobj.keyId === "showMdaScroll~base.sys2") {
                var opts = {};
                var kvObj = new Block("testScroll", "Model~MdaScroll~base.sys2", opts);
                mda.popObj(800, 20, kvObj, 1);
                return;
            }
            if (iobj.keyId === "showMdaScroll~base.sys3") {
                var opts = {};
                var kvObj = new Block("testScroll", "Model~MdaScroll~base.sys3", opts);
                mda.popObj(800, 20, kvObj, 1);
                return;
            }
            //===============
            if (iobj.keyId === "showMdaOthers~mdaBase") {
                var opts = {};
                var kvObj = new Block("testBase", "Model~MdaBase~base.sys0", opts);
                mda.popObj(1200, 800, kvObj, 1);
                return;
            }
            //===============
            if (iobj.keyId === "showMdaOthers~mdaBox") {
                var opts = {};
                opts.title = "1222";
                opts.buttonsOn_f = 1;
                opts.headButtons = ["ESC"];
                opts.headButtonIds = ["esc"];
                var kvObj = new Block("testBox", "Model~MdaBox~base.sys0", opts);
                mda.popObj(1200, 800, kvObj, 1);
                return;
            }
            //===============
            if (iobj.keyId === "showMdaOthers~mdaSelector") {
                var opts = {};
                var kvObj = new Block("testBox", "Model~MdaSelector~base.sys0", opts);
                mda.popObj(1200, 800, kvObj, 1);
                return;
            }
            //===============
            if (iobj.keyId === "showMdaOthers~mdaArray") {
                var opts = {};
                var kvObj = new Block("testBox", "Model~MdaArray~base.sys0", opts);
                mda.popObj(1200, 800, kvObj, 1);
                return;
            }
            if (iobj.keyId === "classTest~showOscilloscope") {
                var opts = {};
                opts.actionFunc = function (iobj) {
                    console.log(iobj);
                    if(iobj.act==="esc"){
                        MdaPopWin.popOffTo(iobj.sender.opts.popStackCnt);
                    }
                };
                var kvObj = new Block("testBox", "Model~Oscilloscope~base.sys0", opts);
                mda.popObj(9999, 9999, kvObj, 1);
                return;
            }

            if (iobj.keyId === "classTest~showLineChart") {
                var opts = {};
                opts.actionFunc = function (iobj) {
                    console.log(iobj);
                    if(iobj.act==="esc"){
                        MdaPopWin.popOffTo(iobj.sender.opts.popStackCnt);
                    }
                };
                //var kvObj = new Block("testBox", "Model~LineChart~base.sys0", opts);
                var kvObj = new Block("scope","Model~LineScope~base.sys0",  {});

                mda.popObj(9999, 9999, kvObj, 1);
                return;
            }



        };
        blocks[cname] = {name: "menu", type: "Model~MdaMenu~base.sys0", opts: opts};
        //==============================
        var cname = lyMaps["body0"] + "~" + 2;
        var opts = {};
        blocks[cname] = {name: "appIcon", type: "Component~Cp_base~icons.sys0", opts: opts};
        inx++;
        //
        //==============================
        var cname = lyMaps["body0"] + "~" + 3;
        var opts = {};
        opts.xc = 3;
        opts.yc = 14;
        opts.xm = 10;
        opts.ym = 10;
        opts.margin = 2;

        layouts[cname] = {name: cname, type: "Layout~Ly_base~array.sys0", opts: opts};
        lyMaps["mainBody"] = cname;
        //=================================================================================================
        var inx = 0;
        var cname = lyMaps["mainBody"] + "~" + inx;
        var opts = {};
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            var actionFunc = function (iobj) {
                console.log(iobj);
                MdaPopWin.popOffTo(iobj.sender.opts.popStackCnt);
            };
            mda.tableBox({});
        };
        blocks[cname] = {name: "button#" + inx, type: "Component~Cp_base~button.sys0", opts: opts};
        inx++;
        //
        var cname = lyMaps["mainBody"] + "~" + inx;
        var opts = {};
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            var actionFunc = function (iobj) {
                console.log(iobj);
                MdaPopWin.popOffTo(iobj.sender.opts.popStackCnt);
            };
            var opts = {};
            opts.actionFunc = actionFunc;
            var kvObj = new Block("mdaBox", "Model~MdaBox~base.sys0", opts);
            //====================================
            mda.popObj(800, 600, kvObj);
        };
        blocks[cname] = {name: "button#" + inx, type: "Component~Cp_base~button.sys1", opts: opts};
        inx++;
        //
        var cname = lyMaps["mainBody"] + "~" + inx;
        var opts = {};
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            var opts = {};
            var actionFunc = function (iobj) {
                console.log(iobj);
                MdaPopWin.popOffTo(iobj.sender.opts.popStackCnt);
            };
            opts.actionFunc = actionFunc;
            var kvObj = new Block("testList", "Model~MdaList~base.sys0", opts);
            mda.popObj(300, 400, kvObj, 1);
        };
        blocks[cname] = {name: "button#" + inx, type: "Component~Cp_base~button.sys2", opts: opts};
        inx++;
        //
        var cname = lyMaps["mainBody"] + "~" + inx;
        var opts = {};
        opts.headIconWidth = 40;
        opts.imageUrls = ["systemResource/color.png"];
        opts.actionFunc = function (iobj) {
            console.log(iobj);
            var opts = {};
            opts.w = 800;
            opts.h = 600;
            opts.actionFunc = function (iobj) {
                console.log(iobj);
            };
            mda.selectBox(opts);
        };
        blocks[cname] = {name: "button#" + inx, type: "Component~Cp_base~button.sys0", opts: opts};
        inx++;
        //
        var cname = lyMaps["mainBody"] + "~" + inx;
        var opts = {};
        blocks[cname] = {name: "checkBox#" + inx, type: "Component~Cp_base~checkBox.sys0", opts: opts};
        inx++;
        //
        var cname = lyMaps["mainBody"] + "~" + inx;
        var opts = {};
        blocks[cname] = {name: "radioBox#" + inx, type: "Component~Cp_base~radioBox.sys0", opts: opts};
        inx++;
        //
        var cname = lyMaps["mainBody"] + "~" + inx;
        var opts = {};
        blocks[cname] = {name: "radioBox#" + inx, type: "Component~Cp_base~radioBox.sys0", opts: opts};
        inx++;
        //
        var cname = lyMaps["mainBody"] + "~" + inx;
        var opts = {};
        blocks[cname] = {name: "radioBox#" + inx, type: "Component~Cp_base~radioBox.sys0", opts: opts};
        inx++;
        //
        var cname = lyMaps["mainBody"] + "~" + inx;
        var opts = {};
        //opts.titleWidth=100;
        opts.actionFunc = function (iobj) {
            console.log(iobj);
        };
        blocks[cname] = {name: "inputText#" + inx, type: "Component~Cp_base~inputText.sys0", opts: opts};
        inx++;


        //
        var cname = lyMaps["mainBody"] + "~" + inx;
        var opts = {};
        blocks[cname] = {name: "button#" + inx, type: "Component~Cp_base~button.red", opts: opts};
        inx++;
        //
        var cname = lyMaps["mainBody"] + "~" + inx;
        var opts = {};
        blocks[cname] = {name: "button#" + inx, type: "Component~Cp_base~button.green", opts: opts};
        inx++;
        //
        var cname = lyMaps["mainBody"] + "~" + inx;
        var opts = {};
        blocks[cname] = {name: "button#" + inx, type: "Component~Cp_base~button.blue", opts: opts};
        inx++;
        //
        var cname = lyMaps["mainBody"] + "~" + inx;
        var opts = {};
        blocks[cname] = {name: "button#" + inx, type: "Component~Cp_base~button.yellow", opts: opts};
        inx++;
        //
        var cname = lyMaps["mainBody"] + "~" + inx;
        var opts = {};
        blocks[cname] = {name: "button#" + inx, type: "Component~Cp_base~button.dark", opts: opts};
        inx++;
        //
        var cname = lyMaps["mainBody"] + "~" + inx;
        var opts = {};
        blocks[cname] = {name: "button#" + inx, type: "Component~Cp_base~button.alt", opts: opts};
        inx++;
        //
        var cname = lyMaps["mainBody"] + "~" + inx;
        var opts = {};
        blocks[cname] = {name: "label#" + inx, type: "Component~Cp_base~label.sys0", opts: opts};
        inx++;
        //
        var cname = lyMaps["mainBody"] + "~" + inx;
        var opts = {};
        blocks[cname] = {name: "label#" + inx, type: "Component~Cp_base~label.sys1", opts: opts};
        inx++;
        //
        var cname = lyMaps["mainBody"] + "~" + inx;
        var opts = {};
        blocks[cname] = {name: "button#" + inx, type: "Component~Cp_base~images.sys0", opts: opts};
        inx++;
        //
        var cname = lyMaps["mainBody"] + "~" + inx;
        var opts = {};
        blocks[cname] = {name: "led#" + inx, type: "Component~Cp_base~led.sys0", opts: opts};
        inx++;

        var cname = lyMaps["mainBody"] + "~" + inx;
        var opts = {};
        opts.min = 0;
        opts.max = 100;
        blocks[cname] = {name: "inputRange#" + inx, type: "Component~Cp_base~inputRange.sys0", opts: opts};
        inx++;



        md.setTimer("t0", 60, 10, function (tobj, nmd) {
            //nmd.clear(nmd.lyMaps["mainBody"] + "~" + tobj.repeatCnt);
        });



        //
        var cname = lyMaps["mainBody"] + "~" + inx;
        var opts = {};
        Block.setTimer(opts, "t0", 60, 0, function (tobj, nmd) {
            nmd.opts.backgroundInxTmp++;
            if (nmd.opts.backgroundInxTmp > 5)
                nmd.opts.backgroundInxTmp = 0;
            //console.log("timer");
        });
        opts.backgroundInxTmp = 0;
        md.setInputWatch(opts, "directName", "self.opts.backgroundInxTmp", "backgroundInx", 1);
        md.setInputWatch(opts, "directName", "self.opts.backgroundInxTmp", "altColorInx", 1);
        blocks[cname + "#0"] = {name: "led#" + inx, type: "Component~Cp_base~led.sys1", opts: opts};
        inx++;
        //
        var cname = lyMaps["mainBody"] + "~" + inx;
        var opts = {};
        opts.innerText = "12345";
        blocks[cname] = {name: "button#" + inx, type: "Component~Cp_base~images.lcd", opts: opts};
        inx++;
        /*    
         for (var i = 0; i < 56; i++) {
         var cname = lyMaps["mainBody"] + "~" + i;
         var opts = {};
         blocks[cname] = {name: "button#" + i, type: "Component~Cp_base~button.sys0", opts: opts};
         }
         * 
         */
        //==============================
    }
}
