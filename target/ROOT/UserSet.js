/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class UserSet {
    constructor() {
        this.set = {};
    }
    init() {
        var set = this.set;
        var optsSet = set["optsSet"] = {};
    }
    view_innerTextObj() {
        var obj = {};
        obj.objName = "textObj";
        obj.type = "s: text | wLine | hLIne";
        obj.id = "s: object id";
        obj.lang = "s: eng | chn, default: eng";
        obj.english = "s: english text";
        obj.chinese = "s: chinese text";
        obj.color = "c: color, default: #000";
        obj.fontFamily="s: font family";
        obj.fontSize = "si: fontSize";
        obj.fontWeight = "s: normal | bold";
        obj.fontStyle = "s: normal | italic";
    }

}
var us = new UserSet();
us.init();