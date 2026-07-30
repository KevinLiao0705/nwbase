/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
class Describe {
    constructor() {
        this.temp = `
`;
        this.kvText = `
        objName: "textObj"
        type: "text"|"hLIne"|"vLIne"
        eng: the text in language, dufault text.
        id<op>:
        image<op>
        menus<op>: kvTexts array, menu use;
        disable_f<op>: menu use
        hotkeyText<op>: menu use
`;
        this.dataType = `
        kvType
        bool
        str
        int
        float
        color
        obj
        
        
        intA
        
        boolA
        strA
        floatA
        objA
        intAA
        
        boolAA
        strAA
        floatAA
        objAA
`;
        this.optsCopy = {};
        this.optsBase = {};

    }
    initOpts() {
        var self = this;
        var des = "";
        var optsBase = self.optsBase;
        var optsCopy = self.optsCopy;


        optsCopy.bool = {dataType: "int", checkType: "int", setType: "inputText", value: 0, actButtons: ["inc"], loop_f: 1, min: 0, max: 1, group: "copy", dsc: ""};
        optsCopy.bool.image = "systemResource/icons8-flag-30.png";

        optsCopy.nature = {dataType: "int", checkType: "int", setType: "inputText", value: 0, actButtons: ["inc", "dec", "pad"], min: 0, group: "copy", dsc: ""};
        optsCopy.nature.image = "systemResource/icons8-add-48.png";

        optsCopy.int = {dataType: "int", checkType: "int", setType: "inputText", value: 0, actButtons: ["inc", "dec", "pad"], group: "copy", dsc: ""};
        optsCopy.int.image = "systemResource/number123.png";

        optsCopy.intA = {dataType: "int", checkType: "int", setType: "textArea", value: [1, 2, 3], actButtons: ["pad"], group: "copy", dsc: ""};
        optsCopy.intA.array = 1;
        optsCopy.intA.image = "systemResource/number123.png";


        optsCopy.hex = {dataType: "int", checkType: "hex", setType: "inputText", value: 0, actButtons: ["inc", "dec", "pad"], group: "copy", dsc: ""};
        optsCopy.hex.image = "systemResource/icons8-hex-40.png";


        optsCopy.float = {dataType: "float", checkType: "float", setType: "inputText", value: 2.5, fixed: 1, actButtons: ["pad"], group: "copy", dsc: ""};
        optsCopy.float.image = "systemResource/icons8-pie-40.png";

        optsCopy.str = {dataType: "str", checkType: "str", setType: "inputText", value: "", actButtons: ["pad"], group: "copy", dsc: ""};
        optsCopy.str.image = "systemResource/icons8-abc-40.png";

        optsCopy.strA = {dataType: "str", checkType: "str", setType: "textArea", value: "", actButtons: ["pad"], group: "copy", dsc: ""};
        optsCopy.strA.array = 1;
        optsCopy.strA.image = "systemResource/icons8-abc-40.png";


        optsCopy.struz = {dataType: "str", checkType: "str", setType: "inputText", value: "abc", nullErr_f: 1, actButtons: ["pad"], group: "copy", dsc: ""};
        optsCopy.struz.image = "systemResource/icons8-abc-40.png";

        optsCopy.kvType = {dataType: "kvType", checkType: "kvType", setType: "inputText", value: 0, actButtons: ["inc", "dec", "pad"], group: "copy", dsc: ""};
        optsCopy.kvType.image = "systemResource/icons8-user-40.png";

        optsCopy.select = {dataType: "str", checkType: "str", setType: "select", value: "select1", actButtons: ["pull"], enum: [], group: "copy", dsc: ""};
        optsCopy.select.image = "systemResource/icons8-list-48.png";
        optsCopy.select.enum = ["select1", "select2", "select3"];

        optsCopy.color = {dataType: "color", checkType: "color", setType: "inputText", value: "#000", actButtons: ["color", "act"], group: "copy", dsc: ""};
        optsCopy.color.image = "systemResource/color.png";

        optsCopy.colorA = {dataType: "color", checkType: "color", setType: "textArea", value: "#000", actButtons: ["pad"], group: "copy", dsc: ""};
        optsCopy.colorA.array = 1;
        optsCopy.colorA.image = "systemResource/color.png";


        optsCopy.inputSelect = {dataType: "str", checkType: "str", setType: "inputSelect", value: "select1", actButtons: ["pull", "pad"], enum: [], group: "copy", dsc: ""};
        optsCopy.inputSelect.image = "systemResource/icons8-editList-48.png";
        optsCopy.inputSelect.enum = ["select1", "select2", "select3"];

        optsCopy.inputRange = {dataType: "int", checkType: "int", setType: "inputRange", value: 25, min: 0, max: 100, fixed: 0, actButtons: ["value"], group: "copy", dsc: ""};
        optsCopy.inputRange.image = "systemResource/icons8-add-48.png";

        optsCopy.group = {dataType: "int", setType: "group", value: 0, group: "base"};
        optsCopy.group.image = "systemResource/icons8-group-50.png";

        optsBase.baseGroup = KvLib.copyObj(optsCopy.group, {group: "base", value: 0});
        optsBase.bool = KvLib.copyObj(optsCopy.bool, {group: "base"});
        optsBase.nature = KvLib.copyObj(optsCopy.nature, {group: "base"});
        optsBase.int = KvLib.copyObj(optsCopy.int, {group: "base"});
        optsBase.intA = KvLib.copyObj(optsCopy.intA, {group: "base"});
        optsBase.hex = KvLib.copyObj(optsCopy.hex, {group: "base"});
        optsBase.float = KvLib.copyObj(optsCopy.float, {group: "base"});
        optsBase.str = KvLib.copyObj(optsCopy.str, {group: "base"});
        optsBase.strA = KvLib.copyObj(optsCopy.strA, {group: "base"});
        optsBase.struz = KvLib.copyObj(optsCopy.struz, {group: "base"});
        optsBase.kvType = KvLib.copyObj(optsCopy.kvType, {group: "base"});
        optsBase.select = KvLib.copyObj(optsCopy.select, {group: "base"});
        optsBase.inputSelect = KvLib.copyObj(optsCopy.inputSelect, {group: "base"});
        optsBase.inputRange = KvLib.copyObj(optsCopy.inputRange, {group: "base"});
        optsBase.color = KvLib.copyObj(optsCopy.color, {group: "base"});
        optsBase.disable_f = KvLib.copyObj(optsCopy.bool, {group: "base"});
        optsBase.propertyWidth = KvLib.copyObj(optsCopy.nature, {group: "base"});
        optsBase.propertyHeight = KvLib.copyObj(optsCopy.nature, {group: "base"});
        optsBase.wAlign = KvLib.copyObj(optsCopy.select, {group: "base", enum: ["left", "center", "right"], value: "center"});
        optsBase.hAlign = KvLib.copyObj(optsCopy.select, {group: "base", enum: ["top", "center", "bottom"], value: "center"});
        optsBase.iw = KvLib.copyObj(optsCopy.kvType, {group: "base"});
        optsBase.ih = KvLib.copyObj(optsCopy.kvType, {group: "base"});
//==============================================================================================
        optsBase.marginGroup = KvLib.copyObj(optsCopy.group, {group: "margin", value: 0});
        optsBase.margin = KvLib.copyObj(optsCopy.kvType, {group: "margin"});
        optsBase.tm = KvLib.copyObj(optsCopy.kvType, {group: "margin"});
        optsBase.rm = KvLib.copyObj(optsCopy.kvType, {group: "margin"});
        optsBase.bm = KvLib.copyObj(optsCopy.kvType, {group: "margin"});
        optsBase.lm = KvLib.copyObj(optsCopy.kvType, {group: "margin"});
//==============================================================================================
        optsBase.paddingGroup = KvLib.copyObj(optsCopy.group, {group: "padding", value: 0});
        optsBase.padding = KvLib.copyObj(optsCopy.kvType, {group: "padding"});
        optsBase.tpd = KvLib.copyObj(optsCopy.kvType, {group: "padding"});
        optsBase.rpd = KvLib.copyObj(optsCopy.kvType, {group: "padding"});
        optsBase.bpd = KvLib.copyObj(optsCopy.kvType, {group: "padding"});
        optsBase.lpd = KvLib.copyObj(optsCopy.kvType, {group: "padding"});
//==============================================================================================
        optsBase.backgroundGroup = KvLib.copyObj(optsCopy.group, {group: "background", value: 0});
        optsBase.baseColor = KvLib.copyObj(optsCopy.color, {group: "background"});
        optsBase.background = KvLib.copyObj(optsCopy.inputSelect, {group: "background"});
        optsBase.backgroundInx = KvLib.copyObj(optsCopy.nature, {group: "background"});
        optsBase.backgroundColors = KvLib.copyObj(optsCopy.colorA, {group: "background"});


        //optsBase.backgroundColors = {dataType: "color", setType: "inputText", group: "background", dsc: des};
        //optsBase.backgroundImageUrls = {dataType: "strA", setType: "inputText", group: "background", dsc: des};
        //optsBase.backgroundRepeat = {dataType: "str", setType: "select", enum: ["repeat", "repeat-x", "repeat-y", "no-repeat"], group: "background", dsc: des};
        //optsBase.backgroundImagePosition = {dataType: "str", setType: "select", enum: ["extend", "center", "fit", "auto"], group: "background", dsc: des};
        //optsBase.opacity = {dataType: "float", setType: "inputText", group: "background", dsc: des};


    }

}
var dsc = new Describe();
dsc.initOpts();


