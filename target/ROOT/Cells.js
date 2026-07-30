/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
class Cells {
    constructor() {
    }
    get(csName) {
        var csType = "";
        var opts = {};
        var strA = csName.split(".");
        opts.innerText = strA[1];
        if (strA[0] === "button") {
            switch (strA[1]) {
                case "sys":
                    return {type: "Component~Cp_base~button.sys0", opts: opts, csName: csName};
                case "shadow":
                    opts.outsideShadowBlur = "0.2rh";
                    return {type: "Component~Cp_base~button.sys0", opts: opts, csName: csName};
                case "twoLine":
                    opts.innerText = csName + "<br>1234567";
                    opts.tpd = 8;
                    opts.bpd = 8;
                    return {type: "Component~Cp_base~button.sys0", opts: opts, csName: csName};
                case "simple":
                    opts.insideShadowBlur = null;
                    opts.borderRadius = 0;
                    return {type: "Component~Cp_base~button.sys0", opts: opts, csName: csName};
                case "icon":
                    opts.headIconWidth = 40;
                    opts.imageUrls = ["systemResource/color.png"];
                    return {type: "Component~Cp_base~button.sys0", opts: opts, csName: csName};
                case "mouseOnColor":
                    opts.borderWidth = 0;
                    opts.borderRadius = 0;
                    opts.fontSize = "0.9rw";
                    opts.mouseOnBaseColor = "#eee";
                    opts.insideShadowBlur = 6;
                    opts.textShadow = null;
                    return {type: "Component~Cp_base~button.sys0", opts: opts, csName: csName};
                case "list":
                    opts.borderRadius = 0;
                    opts.borderWidth = 0;
                    opts.textAlign = "left";
                    opts.lpd = 4;
                    opts.baseColor = "#ddd";
                    opts.mouseOnBaseColor = "#008";
                    opts.mouseOnTextColor = "#fff";
                    opts.insideShadowBlur = null;
                    opts.textShadow = null;
                    return {type: "Component~Cp_base~button.sys0", opts: opts, csName: csName};
                case "through":
                    opts.baseColor = "rgba(0,0,0,0)";
                    opts.borderRadius = 0;
                    opts.borderWidth = 0;
                    opts.insideShadowBlur = null;
                    opts.mouseOnTextColor = "#f00";
                    opts.textShadow = null;
                    return {type: "Component~Cp_base~button.sys0", opts: opts, csName: csName};
                case "menu":
                    return {type: "Component~Cp_base~button.menu0", opts: opts, csName: csName};
                case "red":
                    opts.outsideShadowBlur = null;
                    opts.insideShadowColor = "#f00";
                    opts.baseColor = "#fcc";
                    return {type: "Component~Cp_base~button.sys0", opts: opts, csName: csName};
                case "green":
                    opts.outsideShadowBlur = null;
                    opts.insideShadowColor = "#0f0";
                    opts.baseColor = "#cfc";
                    return {type: "Component~Cp_base~button.sys0", opts: opts, csName: csName};
                case "blue":
                    opts.outsideShadowBlur = null;
                    opts.insideShadowColor = "#00f";
                    opts.baseColor = "#ccf";
                    return {type: "Component~Cp_base~button.sys0", opts: opts, csName: csName};
                case "yellow":
                    opts.outsideShadowBlur = null;
                    opts.insideShadowColor = "#ff0";
                    opts.baseColor = "#ffc";
                    return {type: "Component~Cp_base~button.sys0", opts: opts, csName: csName};
                case "dark":
                    opts.insideShadowColor = "#ccc";
                    opts.baseColor = "#444";
                    opts.innerTextColor = "#fff";
                    opts.textShadow = "2px 2px 2px #000";
                    return {type: "Component~Cp_base~button.sys0", opts: opts, csName: csName};
                case "alt0":
                    opts.altColorInx = 0;
                    opts.insideShadowColor = "#ccc";
                    opts.innerTextColor = "#fff";
                    opts.baseColor = "#444";
                    opts.textShadow = "1px 1px 1px #000";
                    opts.altColors = ["#888", "#f88", "#0f0", "#88f", "#ff0", "#fff"];
                    opts.insideShadowBlur = "0.2rh";
                    opts.borderType = "normal";
                    opts.outsideShadowOffx = 0;
                    opts.outsideShadowOffy = 0;
                    opts.outsideShadowBlur = "0.2rh";
                    return {type: "Component~Cp_base~button.sys0", opts: opts, csName: csName};
                case "alt1":
                    var obj = cs.get("button.alt0");
                    obj.opts.innerText = strA[1];
                    obj.opts.altColorInx = 1;
                    obj.csName = csName;
                    return obj;
                case "alt2":
                    var obj = cs.get("button.alt0");
                    obj.opts.innerText = strA[1];
                    obj.opts.altColorInx = 2;
                    obj.csName = csName;
                    return obj;
                case "alt3":
                    var obj = cs.get("button.alt0");
                    obj.opts.innerText = strA[1];
                    obj.opts.altColorInx = 3;
                    obj.csName = csName;
                    return obj;
                case "alt4":
                    var obj = cs.get("button.alt0");
                    obj.opts.innerText = strA[1];
                    obj.opts.altColorInx = 4;
                    obj.csName = csName;
                    return obj;
                case "imageFit":
                    opts.backgroundImageUrls = ["systemResource/color.png"];
                    opts.backgroundInx = 0;
                    opts.baseColor = "rgba(0,0,0,0)";
                    opts.backgrounrdImagePosition = "fit"; //extend,center,fit//auto
                    return {type: "Component~Cp_base~button.sys0", opts: opts, csName: csName};
                case "imageExtend":
                    opts.backgroundImageUrls = ["systemResource/color.png"];
                    opts.backgroundInx = 0;
                    opts.baseColor = "rgba(0,0,0,0)";
                    opts.backgroundImagePosition = "extend"; //extend,center,fit//auto
                    return {type: "Component~Cp_base~button.sys0", opts: opts, csName: csName};
                case "imageYellow":
                    opts.backgroundImageUrls = ["systemResource/lcd2.bmp"];
                    opts.backgroundInx = 0;
                    opts.backgroundImagePosition = "extend"; //extend,center,fit//auto
                    return {type: "Component~Cp_base~button.sys0", opts: opts, csName: csName};
                case "imageMetal":
                    opts.backgroundImageUrls = ["systemResource/metalBackground.png"];
                    opts.backgroundInx = 0;
                    opts.backgroundImagePosition = "extend"; //extend,center,fit//auto
                    return {type: "Component~Cp_base~button.sys0", opts: opts, csName: csName};
                case "imageMetal1":
                    opts.backgroundImageUrls = ["systemResource/metalBackground1.png"];
                    opts.backgroundInx = 0;
                    opts.backgroundImagePosition = "extend"; //extend,center,fit//auto
                    return {type: "Component~Cp_base~button.sys0", opts: opts, csName: csName};
                case "imageMetal2":
                    opts.backgroundImageUrls = ["systemResource/metalBackground2.png"];
                    opts.backgroundInx = 0;
                    opts.backgroundImagePosition = "extend"; //extend,center,fit//auto
                    return {type: "Component~Cp_base~button.sys0", opts: opts, csName: csName};
                case "imageWood":
                    opts.backgroundImageUrls = ["systemResource/woodBackground.png"];
                    opts.backgroundInx = 0;
                    opts.backgroundImagePosition = "extend"; //extend,center,fit//auto
                    return {type: "Component~Cp_base~button.sys0", opts: opts, csName: csName};
                case "imageWood1":
                    opts.backgroundImageUrls = ["systemResource/woodBackground1.png"];
                    opts.backgroundInx = 0;
                    opts.backgroundImagePosition = "extend"; //extend,center,fit//auto
                    return {type: "Component~Cp_base~button.sys0", opts: opts, csName: csName};
                case "imageGlass":
                    opts.backgroundImageUrls = ["systemResource/glassBackground.png"];
                    opts.backgroundInx = 0;
                    opts.backgroundImagePosition = "extend"; //extend,center,fit//auto
                    return {type: "Component~Cp_base~button.sys0", opts: opts, csName: csName};
                case "imageGlass1":
                    opts.backgroundImageUrls = ["systemResource/glassBackground1.png"];
                    opts.backgroundInx = 0;
                    opts.backgroundImagePosition = "extend"; //extend,center,fit//auto
                    return {type: "Component~Cp_base~button.sys0", opts: opts, csName: csName};
                case "imageGlass2":
                    opts.backgroundImageUrls = ["systemResource/glassBackground2.png"];
                    opts.backgroundInx = 0;
                    opts.backgroundImagePosition = "extend"; //extend,center,fit//auto
                    return {type: "Component~Cp_base~button.sys0", opts: opts, csName: csName};


                case "circle":
                    opts.borderRadius = "0.5rh";
                    opts.borderColor = "#000";
                    opts.borderWidth = 1;
                    opts.whr = 1;
                    opts.innerText = '<i class="gf">&#xe8ac;</i>';
                    opts.insideShadowBlur = 3;
                    opts.backgroundInx = 0;
                    opts.backgroundImagePosition = "extend"; //extend,center,fit//auto
                    return {type: "Component~Cp_base~button.sys0", opts: opts, csName: csName};
                case "circleMetal":
                    var obj = cs.get("button.circle");
                    obj.opts.backgroundImageUrls = ["systemResource/metalBackground1.png"];
                    obj.csName = csName;
                    return obj;
                case "circleBlue":
                    var obj = cs.get("button.circle");
                    obj.opts.backgroundImageUrls = ["systemResource/led_blue.png"];
                    obj.csName = csName;
                    return obj;
                case "circleGrey":
                    var obj = cs.get("button.circle");
                    obj.opts.backgroundImageUrls = ["systemResource/led_base.png"];
                    obj.csName = csName;
                    return obj;
                case "circleGreen":
                    var obj = cs.get("button.circle");
                    obj.opts.backgroundImageUrls = ["systemResource/led_green.png"];
                    obj.csName = csName;
                    return obj;
                case "circleRed":
                    var obj = cs.get("button.circle");
                    obj.opts.backgroundImageUrls = ["systemResource/led_red.png"];
                    obj.csName = csName;
                    return obj;
                case "circleBlue":
                    var obj = cs.get("button.circle");
                    obj.opts.backgroundImageUrls = ["systemResource/led_blue.png"];
                    obj.csName = csName;
                    return obj;

                case "buttonTest1":
                    return {type: "Component~Cp_base~button.sys0", opts: opts, csName: csName};


            }
        }
        if (strA[0] === "label") {
            switch (strA[1]) {
                case "sys":
                    return {type: "Component~Cp_base~label.sys0", opts: opts, csName: csName};
                case "dark":
                    opts.baseColor = "#444";
                    opts.innerTextColor = "#ddd";
                    opts.textShadow = "2px 2px 2px #000";
                    return {type: "Component~Cp_base~label.sys0", opts: opts, csName: csName};
                case "gray":
                    opts.baseColor = "#888";
                    opts.innerTextColor = "#fff";
                    opts.textShadow = "3px 3px 3px #000";
                    return {type: "Component~Cp_base~label.sys0", opts: opts, csName: csName};
                case "ledAlt0":
                    //=================
                    opts.borderRadius = "0.4rh";
                    opts.borderWidth = 4;
                    opts.baseColor = "#ccc";
                    opts.altColors = ["#888", "#f88", "#0f0", "#88f", "#ff0", "#fff"];
                    opts.altColorInx = 0;
                    opts.insideShadowBlur = "0.2rh";
                    opts.borderType = "normal";
                    opts.outsideShadowOffx = 0;
                    opts.outsideShadowOffy = 0;
                    opts.outsideShadowBlur = "0.1rh";
                    opts.innerTextColor = "#000";
                    opts.textShadow = "1px 1px 1px #000";
                    return {type: "Component~Cp_base~label.sys0", opts: opts, csName: csName};

                case "ledAlt1":
                    var obj = cs.get("label.ledAlt0");
                    obj.opts.altColorInx = 1;
                    obj.opts.innerText = strA[1];
                    obj.csName = csName;
                    return obj;
                case "ledAlt2":
                    var obj = cs.get("label.ledAlt0");
                    obj.opts.altColorInx = 2;
                    obj.opts.innerText = strA[1];
                    obj.csName = csName;
                    return obj;
                case "ledAlt3":
                    var obj = cs.get("label.ledAlt0");
                    obj.opts.altColorInx = 3;
                    obj.opts.innerText = strA[1];
                    obj.csName = csName;
                    return obj;
                case "ledAlt4":
                    var obj = cs.get("label.ledAlt0");
                    obj.opts.altColorInx = 4;
                    obj.opts.innerText = strA[1];
                    obj.csName = csName;
                    return obj;
                case "title":
                    opts.baseColor = "#004";
                    opts.innerTextColor = "#fff";
                    opts.fontFamily = "Impact";
                    opts.borderWidth = 0;
                    opts.lpd = 4;
                    opts.textShadow = "3px 3px 3px #000";
                    return {type: "Component~Cp_base~label.sys0", opts: opts, csName: csName};
                case "shadow":
                    opts.borderWidth = 2;
                    opts.borderColor = "#eee";
                    opts.outsideShadowBlur = "0.2rh";
                    opts.innerTextColor = "#eee";
                    opts.baseColor = "#666";
                    opts.textShadow = "3px 3px 3px #000";
                    return {type: "Component~Cp_base~label.sys0", opts: opts, csName: csName};
                case "name":
                    opts.borderWidth = 2;
                    opts.borderColor = "#eee";
                    opts.innerTextColor = "#000";
                    opts.baseColor = "#ccc";
                    opts.textShadow = "1px 1px 1px #fff";
                    opts.insideShadowBlur = "0.05rh";
                    return {type: "Component~Cp_base~label.sys0", opts: opts, csName: csName};


                case "gridTr":
                    opts.borderType = "gridTr";
                    return {type: "Component~Cp_base~label.sys0", opts: opts, csName: csName};
                case "gridT":
                    opts.borderType = "gridT";
                    return {type: "Component~Cp_base~label.sys0", opts: opts, csName: csName};
                case "lampAlt0":
                    opts.propertyWidth = 40;
                    opts.propertyHeight = 40;
                    opts.borderRadius = "0.6rh";
                    opts.borderWidth = 3;
                    opts.baseColor = "#ccc";
                    opts.altColors = ["#888", "#f88", "#0f0", "#88f", "#ff0", "#fff"];
                    opts.altColorInx = 1;
                    opts.insideShadowBlur = "0.8rh";
                    opts.outsideShadowOffx = 0;
                    opts.outsideShadowOffy = 0;
                    opts.outsideShadowBlur = "0.2rh";
                    opts.iw = "0.9rh";
                    opts.ih = "0.9rh";
                    opts.backgroundImageUrls = [];
                    opts.backgroundImageUrls.push("systemResource/led_base.png");
                    opts.backgroundImageUrls.push("systemResource/led_red.png");
                    opts.backgroundImageUrls.push("systemResource/led_green.png");
                    opts.backgroundImageUrls.push("systemResource/led_blue.png");
                    opts.backgroundImageUrls.push("systemResource/led_yellow.png");
                    opts.backgroundImageUrls.push("systemResource/led_white.png");
                    opts.insideShadowBlur = null;
                    opts.borderWidth = 2;
                    opts.outsideShadowBlur = "0.5rh";
                    opts.altColorInx = 0;
                    opts.backgroundInx = 0;
                    opts.backgroundImagePosition = "extend";
                    opts.innerText = "";
                    opts.hint = csName;
                    return {type: "Component~Cp_base~label.sys0", opts: opts, csName: csName};

                case "lampAlt1":
                    var obj = cs.get("label.lampAlt0");
                    obj.opts.altColorInx = 1;
                    obj.opts.backgroundInx = 1;
                    obj.csName = csName;
                    return obj;
                case "lampAlt2":
                    var obj = cs.get("label.lampAlt0");
                    obj.opts.altColorInx = 2;
                    obj.opts.backgroundInx = 2;
                    obj.csName = csName;
                    return obj;
                case "lampAlt3":
                    var obj = cs.get("label.lampAlt0");
                    obj.opts.altColorInx = 3;
                    obj.opts.backgroundInx = 3;
                    obj.csName = csName;
                    return obj;
                case "lampAlt4":
                    var obj = cs.get("label.lampAlt0");
                    obj.opts.altColorInx = 4;
                    obj.opts.backgroundInx = 4;
                    obj.csName = csName;
                    return obj;

                case "imageMetal":
                    opts.borderWidth = 2;
                    opts.borderColor = "#eee";
                    opts.innerTextColor = "#000";
                    opts.baseColor = "#ccc";
                    opts.textShadow = "1px 1px 1px #fff";
                    opts.insideShadowBlur = "0.05rh";
                    opts.backgroundImageUrls = ["systemResource/metalBackground.png"];
                    opts.backgroundInx = 0;
                    opts.backgroundImagePosition = "extend"; //extend,center,fit//auto
                    return {type: "Component~Cp_base~label.sys0", opts: opts, csName: csName};
                case "imageMetal1":
                    var obj = cs.get("label.imageMetal");
                    obj.opts.backgroundImageUrls = ["systemResource/metalBackground1.png"];
                    obj.opts.innerText = strA[1];
                    obj.csName = csName;
                    return obj;
                case "imageMetal2":
                    var obj = cs.get("label.imageMetal");
                    obj.opts.backgroundImageUrls = ["systemResource/metalBackground2.png"];
                    obj.opts.innerText = strA[1];
                    obj.csName = csName;
                    return obj;
                case "imageYellow":
                    var obj = cs.get("label.imageMetal");
                    obj.opts.backgroundImageUrls = ["systemResource/yellowGlory.png"];
                    obj.opts.innerText = strA[1];
                    obj.csName = csName;
                    return obj;
                case "imageWood":
                    var obj = cs.get("label.imageMetal");
                    obj.opts.backgroundImageUrls = ["systemResource/woodBackground.png"];
                    obj.opts.innerText = strA[1];
                    obj.csName = csName;
                    return obj;
                case "imageWood1":
                    var obj = cs.get("label.imageMetal");
                    obj.opts.backgroundImageUrls = ["systemResource/woodBackground1.png"];
                    obj.opts.innerText = strA[1];
                    obj.csName = csName;
                    return obj;
                case "imageBlue":
                    var obj = cs.get("label.imageMetal");
                    obj.opts.backgroundImageUrls = ["systemResource/blueGlory.png"];
                    obj.opts.innerText = strA[1];
                    obj.csName = csName;
                    return obj;
                case "imageGreen":
                    var obj = cs.get("label.imageMetal");
                    obj.opts.backgroundImageUrls = ["systemResource/greenGlory.png"];
                    obj.opts.innerText = strA[1];
                    obj.csName = csName;
                    return obj;


            }
        }
        if (strA[0] === "input") {
            switch (strA[1]) {
                case "sys":
                    opts.checkBoxWidth = 40;
                    opts.textAlign = "left";
                    opts.lpd = 6;
                    opts.checked_f = 1;
                    opts.insideShadowBlur = null;
                    opts.borderRadius = 0;
                    return {type: "Component~Cp_base~button.sys0", opts: opts, csName: csName};
                case "radio":
                    var obj = cs.get("input.sys");
                    obj.opts.radioName = "radioName";
                    obj.opts.innerText = strA[1];
                    obj.csName = csName;
                    return obj;
                case "inputRange":
                    opts.innerText = "";
                    return {type: "Component~Cp_base~inputRange.sys0", opts: opts, csName: csName};
                case "inputText":
                    opts.innerText = "";
                    opts.titleWidth = 0;
                    opts.lpd = 0;
                    opts.rpd = 0;
                    return {type: "Component~Cp_base~inputText.sys0", opts: opts, csName: csName};


            }
        }
        if (strA[0] === "setLine") {
            switch (strA[1]) {
                case "buttonActs":
                    var setOpts = opts.setOpts = {};
                    setOpts.setType = "buttonActs";
                    setOpts.enum = ["button1", "button2", "button3"];
                    setOpts.xm = 4;
                    setOpts.lm = 0;
                    setOpts.titleWidth = 200;
                    setOpts.title = strA[1];
                    setOpts.fontSize = "0.4rh";
                    return {type: "Model~MdaSetLine~base.sys0", opts: opts, csName: csName};
                case "buttonOnOffs":
                    var obj = cs.get("setLine.buttonActs");
                    obj.csName = csName;
                    obj.opts.setOpts.title = strA[1];
                    obj.opts.setOpts.setType = "buttonOnOffs";
                    obj.opts.setOpts.value = 5;
                    obj.opts.setOpts.onColor = "#ddf";
                    obj.opts.setOpts.offColor = "#aaa";
                    return obj;
                case "buttonSelect":
                    var obj = cs.get("setLine.buttonActs");
                    obj.csName = csName;
                    obj.opts.setOpts.title = strA[1];
                    obj.opts.setOpts.setType = "buttonSelect";
                    obj.opts.setOpts.value = 0;
                    obj.opts.setOpts.onColor = "#ddf";
                    obj.opts.setOpts.offColor = "#aaa";
                    return obj;
                case "buttonChecks":
                    var obj = cs.get("setLine.buttonActs");
                    obj.csName = csName;
                    obj.opts.setOpts.title = strA[1];
                    obj.opts.setOpts.setType = "buttonChecks";
                    obj.opts.setOpts.value = 0;
                    return obj;
                case "buttonRadio":
                    var obj = cs.get("setLine.buttonActs");
                    obj.csName = csName;
                    obj.opts.setOpts.title = strA[1];
                    obj.opts.setOpts.setType = "buttonRadio";
                    obj.opts.setOpts.value = 0;
                    obj.opts.setOpts.radioName = "group1";
                    return obj;
                case "inputTextFloat":
                    var setOpts = opts.setOpts = {};
                    setOpts.setType = "inputText";
                    setOpts.dataType = "float";
                    setOpts.checkType = "float";
                    setOpts.value = 0;
                    setOpts.titleWidth = 200;
                    setOpts.title = strA[1];
                    setOpts.actButtons = ["pad"];
                    return {type: "Model~MdaSetLine~base.sys0", opts: opts, csName: csName};
                case "inputTextNature":
                    var obj = cs.get("setLine.inputTextFloat");
                    obj.csName = csName;
                    obj.opts.setOpts.title = strA[1];
                    obj.opts.setOpts.dataType = "int";
                    obj.opts.setOpts.checkType = "int";
                    obj.opts.setOpts.min = 0;
                    return obj;
                case "inputTextInt":
                    var obj = cs.get("setLine.inputTextNature");
                    obj.csName = csName;
                    obj.opts.setOpts.title = strA[1];
                    obj.opts.setOpts.min = -100;
                    obj.opts.setOpts.unit = "cm";
                    obj.opts.setOpts.unitWidth = 50;
                    obj.opts.setOpts.unitFontSize = 20;
                    return obj;
                case "inputTextIp":
                    var setOpts = opts.setOpts = {};
                    setOpts.setType = "inputText";
                    setOpts.dataType = "str";
                    setOpts.checkType = "ip";
                    setOpts.value = 0;
                    setOpts.titleWidth = 200;
                    setOpts.title = strA[1];
                    setOpts.titleFontSize = 20;
                    setOpts.actButtons = ["pad"];
                    return {type: "Model~MdaSetLine~base.sys0", opts: opts, csName: csName};
                case "inputTextStr":
                    var setOpts = opts.setOpts = {};
                    setOpts.setType = "inputText";
                    setOpts.dataType = "str";
                    setOpts.checkType = "str";
                    setOpts.value = "";
                    setOpts.titleWidth = 200;
                    setOpts.title = strA[1];
                    setOpts.titleFontSize = 20;
                    setOpts.actButtons = ["pad"];
                    return {type: "Model~MdaSetLine~base.sys0", opts: opts, csName: csName};
                case "intPassword":
                    var obj = cs.get("setLine.inputTextNature");
                    obj.opts.setOpts.dataType = "str";
                    obj.opts.setOpts.checkType = "intStr";
                    obj.opts.setOpts.value = "1234";
                    obj.opts.setOpts.password_f = 1;
                    obj.opts.setOpts.actButtons = ["pad"];
                    obj.opts.setOpts.max = 99999999;
                    obj.opts.setOpts.title = strA[1];
                    obj.csName = csName;
                    return obj;
                case "strPassword":
                    var obj = cs.get("setLine.inputTextStr");
                    obj.opts.setOpts.value = "1234abcd";
                    obj.opts.setOpts.password_f = 1;
                    obj.opts.setOpts.title = strA[1];
                    obj.csName = csName;
                    return obj;
                case "view":
                    var obj = cs.get("setLine.inputTextNature");
                    obj.opts.setOpts.actButtons = [];
                    obj.opts.setOpts.title = strA[1];
                    obj.opts.setOpts.readOnly_f = 1;
                    obj.opts.setOpts.editBaseColor = "#eeeeff";
                    obj.csName = csName;
                    return obj;
                case "lcdView":
                    var setOpts = opts.setOpts = {};
                    setOpts.setType = "lcdView";
                    setOpts.dataType = "str";
                    setOpts.checkType = "str";
                    setOpts.actButtons = [];
                    setOpts.readOnly_f = 1;
                    setOpts.editBaseColor = "#44f";
                    setOpts.titleWidth = 200;
                    setOpts.title = strA[1];
                    setOpts.value = "CONTENT OF LCD";
                    setOpts.fontSize = "0.5rh";
                    return {type: "Model~MdaSetLine~base.sys0", opts: opts, csName: csName};

                case "lcdYellow":
                    var obj = cs.get("setLine.lcdView");
                    obj.opts.setOpts.setType = "lcdYellow";
                    obj.opts.setOpts.title = strA[1];
                    obj.csName = csName;
                    return obj;

                case "leds":
                    var setOpts = opts.setOpts = {};
                    setOpts.setType = "leds";
                    setOpts.dataType = "natureA";
                    setOpts.checkType = "natureA";
                    setOpts.enum = ["Led1", "Led2", "Led3"];
                    setOpts.titleWidth = 200;
                    setOpts.title = strA[1];
                    setOpts.value = [0, 1, 2];
                    setOpts.max = 4;
                    setOpts.baseColor = "#002";
                    setOpts.actButtons = [];
                    setOpts.borderWidth = 0;
                    setOpts.editTextColor = "#fff";
                    setOpts.fontSize = "0.5rh";
                    return {type: "Model~MdaSetLine~base.sys0", opts: opts, csName: csName};
                case "textArea":
                    var setOpts = opts.setOpts = {};
                    setOpts.setType = "textArea";
                    setOpts.dataType = "str";
                    setOpts.checkType = "str";
                    setOpts.value = "content.....";
                    setOpts.titleWidth = 0;
                    setOpts.actButtons = ["pad"];
                    setOpts.title = strA[1];
                    return {type: "Model~MdaSetLine~base.sys0", opts: opts, csName: csName};
                case "select":
                    var setOpts = opts.setOpts = {};
                    setOpts.setType = "select";
                    setOpts.value = "select 1";
                    setOpts.titleWidth = 200;
                    setOpts.title = "select";
                    setOpts.titleFontSize = 20;
                    setOpts.dataType = "str";
                    setOpts.actButtons = ["pull"];
                    setOpts.enum = ["select 1", "select 2", "select 3"];
                    setOpts.title = strA[1];
                    return {type: "Model~MdaSetLine~base.sys0", opts: opts, csName: csName};
                case "inputSelect":
                    var setOpts = opts.setOpts = {};
                    setOpts.setType = "inputSelect";
                    setOpts.dataType = "str";
                    setOpts.checkType = "str";
                    setOpts.value = "select 1";
                    setOpts.titleWidth = 200;
                    setOpts.title = "inputSelect";
                    setOpts.titleFontSize = 20;
                    setOpts.actButtons = ["pull", "pad"];
                    setOpts.enum = ["select 1", "select 2", "select 3"];
                    setOpts.title = strA[1];
                    return {type: "Model~MdaSetLine~base.sys0", opts: opts, csName: csName};


            }
        }
        if (strA[0] === "guage") {
            switch (strA[1]) {
                case "circleDark":
                    return {type: "Model~MdbGauge~circle.dark", opts: opts, csName: csName};
                case "lineDark":
                    return {type: "Model~MdbGauge~line.dark", opts: opts, csName: csName};
                case "compassDark":
                    return {type: "Model~MdbGauge~compass.dark", opts: opts, csName: csName};
                case "circleLight":
                    return {type: "Model~MdbGauge~circle.light", opts: opts, csName: csName};
                case "lineLight":
                    return {type: "Model~MdbGauge~line.light", opts: opts, csName: csName};
                case "compassLight":
                    return {type: "Model~MdbGauge~compass.light", opts: opts, csName: csName};
            }
        }
        if (strA[0] === "chart") {
            switch (strA[1]) {
                case "bar":
                    return {type: "Model~MdbChart~bar", opts: opts, csName: csName};
                case "hbar":
                    opts.indexAxis = 'y';
                    return {type: "Model~MdbChart~bar", opts: opts, csName: csName};
                case "barDark":
                    return {type: "Model~MdbChart~bar.dark", opts: opts, csName: csName};
                case "hbarDark":
                    opts.indexAxis = 'y';
                    return {type: "Model~MdbChart~bar.dark", opts: opts, csName: csName};
                case "line":
                    return {type: "Model~MdbChart~line", opts: opts, csName: csName};
                case "lineDark":
                    return {type: "Model~MdbChart~line.dark", opts: opts, csName: csName};
                case "moutain":
                    return {type: "Model~MdbChart~moutain", opts: opts, csName: csName};
                case "moutainDark":
                    return {type: "Model~MdbChart~moutain.dark", opts: opts, csName: csName};


                case "doughnut":
                    return {type: "Model~MdbChart~doughnut", opts: opts, csName: csName};
                case "doughnutDark":
                    return {type: "Model~MdbChart~doughnut.dark", opts: opts, csName: csName};
                case "pie":
                    return {type: "Model~MdbChart~pie", opts: opts, csName: csName};
                case "pieDark":
                    return {type: "Model~MdbChart~pie.dark", opts: opts, csName: csName};
                case "polar":
                    return {type: "Model~MdbChart~polar", opts: opts, csName: csName};
                case "polarDark":
                    return {type: "Model~MdbChart~polar.dark", opts: opts, csName: csName};
                case "radar":
                    return {type: "Model~MdbChart~radar", opts: opts, csName: csName};
                case "radarDark":
                    return {type: "Model~MdbChart~radar.dark", opts: opts, csName: csName};

            }
        }
        if (strA[0] === "youTube") {
            switch (strA[1]) {
                case "darji":
                    opts.baseColor = "rgba(0,0,0,0)";
                    opts.urlsInx = 0;
                    opts.autoPlay_f=1;
                    opts.controls_f=1;
                    opts.loop_f=1;
                    opts.startTime=5;
                    opts.endTime=20;
                    opts.wwwUrls = ["https://www.youtube.com/embed/5afSSqSdHnU"];
                    return {type: "Component~Cp_base~youTube.sys0", opts: opts, csName: csName};

            }
        }
        if (strA[0] === "urlReader") {
            switch (strA[1]) {
                case "pdf":
                    opts.baseColor = "rgba(0,0,0,0)";
                    opts.urlsInx = 0;
                    opts.urls = ["./systemResource/JS-AIoT_DM_hardware.pdf"];
                    return {type: "Component~Cp_base~urlReader.sys0", opts: opts, csName: csName};
                case "txt":
                    opts.baseColor = "rgba(0,0,0,0)";
                    opts.urlsInx = 0;
                    opts.urls = ["./systemResource/helpTmp.txt"];
                    return {type: "Component~Cp_base~urlReader.sys0", opts: opts, csName: csName};
                case "xml":
                    opts.baseColor = "rgba(0,0,0,0)";
                    opts.urlsInx = 0;
                    opts.urls = ["./systemResource/build.xml"];
                    return {type: "Component~Cp_base~urlReader.sys0", opts: opts, csName: csName};
                case "png":
                    opts.baseColor = "rgba(0,0,0,0)";
                    opts.urlsInx = 0;
                    opts.urls = ["./systemResource/robot_aiot_1920x1080.png"];
                    return {type: "Component~Cp_base~urlReader.sys0", opts: opts, csName: csName};

            }
        }



    }
}

var cs = new Cells();


//linear-gradient(to top, #c5d5fa, #c3dc99);