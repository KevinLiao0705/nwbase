/* global gr, Kext, NaN */

//static coverObject(toObj, fromObj) {
//static deepCoverObject(toObj, fromObj,deepCnt) {
//static transInnerText(istr, defaultOut) {
//static transUnit(istr, defaultOut,w,h) {



//################################################################################
class KvLib {
    constructor(_name, _type, _opts, _paras) {
    }

    static genKid() {
        gr.kid++;
        return "kid" + gr.kid;
    }
    static genSer() {
        gr.ser++;
        return "ser" + gr.ser;
    }

    static getTextFileFromServer1(url, retFunc) {
        $.ajax({
            url: url,
            success: retFunc//
        });
    }

    static atan(x, y) {
        if (x === 0)
            x = 0.001;
        var rd = Math.atan(y / x);
        var dg = rd * 180 / Math.PI;
        if (x < 0)
            dg += 180;
        if (dg < 0)
            dg += 360;
        return dg;
    }

    static getOs() {
        const userAgent = navigator.userAgent;
        let os = 'Unknown';

        if (userAgent.includes('Win')) {
            os = 'Windows';
        } else if (userAgent.includes('Mac')) {
            os = 'macOS';
        } else if (userAgent.includes('Linux')) {
            os = 'Linux';
        } else if (userAgent.includes('Android')) {
            os = 'Android';
        } else if (userAgent.includes('iPhone') || userAgent.includes('iPad')) {
            os = 'iOS';
        }

        return os;
    }

    static anaString(istr, sep1, sep2) {
        var oobj = {};
        var strA = istr.split(sep1);
        for (var i = 0; i < strA.length; i++) {
            var strB = strA[i].split(sep2);
            if (strB.length !== 2)
                continue;
            oobj[strB[0].trim()] = strB[1].trim();
        }
        return oobj;
    }

    static stringSplice(str, index, count, add) {
        var ar = str.split('');
        ar.splice(index, count, add);
        return ar.join('');
    }

    static disJsonString(obj) {
        if (typeof obj === 'object')
            return obj;
        if (Array.isArray(obj))
            return obj;
        if (obj === null)
            return "";
        str = "" + obj;
        if (str.length === 0)
            return str;
        var str = str.trim();
        if (str.charAt(0) === "\"" && str.charAt(str.length - 1) === "\"") {
            return str.substring(1, str.length - 1);
        }
        return str;
    }

    static getCaretPosition(oField) {

        // Initialize
        var iCaretPos = 0;

        // IE Support
        if (document.selection) {

            // Set focus on the element
            oField.focus();

            // To get cursor position, get empty selection range
            var oSel = document.selection.createRange();

            // Move selection start to 0 position
            oSel.moveStart('character', -oField.value.length);

            // The caret position is selection length
            iCaretPos = oSel.text.length;
        }

        // Firefox support
        else if (oField.selectionStart || oField.selectionStart == '0')
            iCaretPos = oField.selectionDirection == 'backward' ? oField.selectionStart : oField.selectionEnd;

        // Return results
        return iCaretPos;
    }

    static setCaretPosition(elem, caretPos) {
        if (elem != null) {
            if (elem.createTextRange) {
                var range = elem.createTextRange();
                range.move('character', caretPos);
                range.select();
            } else {
                if (elem.selectionStart !== null && elem.selectionStart !== undefined) {
                    elem.focus();
                    elem.setSelectionRange(caretPos, caretPos);
                } else
                    elem.focus();
            }
        }
    }

    static drawRotated(degrees, canvas, ctx, image, ccw) {
        if (ccw)
            degrees = 360 - degrees;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        var hw = canvas.width / 2;
        var hh = canvas.height / 2;
        ctx.translate(hw, hh);
        ctx.rotate(degrees * Math.PI / 180);
        ctx.drawImage(image, 0, 0, image.width, image.height, 0 - hw, 0 - hh, canvas.width, canvas.height);
        ctx.restore();
    }

    static setValue(inData, defData) {
        if (inData === undefined || inData === "null")
            return defData;
        return inData;
    }

    static getTextFileFromServer(url, retFunc) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                retFunc(xhr.responseText);
                //document.getElementById('placeholder').innerHTML = xhr.responseText;
            }
        };
        xhr.open('GET', url);
        xhr.setRequestHeader("Cache-Control", "max-age=0");
        xhr.send();
    }
    getNowTime() {
        window.performance = window.performance || {};
        performance.now = (function () {
            return performance.now ||
                    performance.mozNow ||
                    performance.msNow ||
                    performance.oNow ||
                    performance.webkitNow ||
                    function () {
                        //Doh! Crap browser!
                        return new Date().getTime();
                    };
        })();
        return performance.now;
    }

    static transColorStr(cr, cg, cb, ca) {
        if (ca === undefined || ca === 1) {
            var str = "#";
            str += KvLib.numToHex2b(cr);
            str += KvLib.numToHex2b(cg);
            str += KvLib.numToHex2b(cb);
            return str;
        } else {
            var str = "rgba(";
            str += cr + ",";
            str += cg + ",";
            str += cb + ",";
            str += ca.toFixed(2) + ")";
            return str;
        }
    }

    static lineMoveEditor(kvObj, line) {
        if (!kvObj)
            return;
        var editor = kvObj.objs["editor"];
        if (!editor)
            return;
        var cur = editor.selection.getCursor();
        var rowAll = editor.session.getLength();
        cur.row += line;
        if (cur.row >= rowAll)
            cur.row = rowAll;
        if (cur.row < 0)
            cur.row = 0;
        var column = editor.session.getLine(cur.row).length;
        editor.gotoLine(cur.row + 1, column);
    }

    static getDateTime() {
        var today = new Date();
        var va = [];
        va.push(today.getFullYear());
        va.push(today.getMonth() + 1);
        va.push(today.getDate());
        va.push(today.getHours());
        va.push(today.getMinutes());
        va.push(today.getSeconds());
        for (var i = 0; i < 6; i++) {
            if (va[i] < 10)
                va[i] = "0" + va[i];
            else
                va[i] = "" + va[i];
        }

        var date = va[0] + '-' + va[1] + '-' + va[2];
        var time = va[3] + ':' + va[4] + ':' + va[5];
        return (date + ' ' + time);
    }

    static endInputEditor(kvObj, text, color) {
        if (!kvObj)
            return;
        var editor = kvObj.objs["editor"];
        if (!editor)
            return;
        var row = editor.session.getLength() - 1;
        var column = editor.session.getLine(row).length; // or simply Infinity
        editor.gotoLine(row + 1, column);
        if (row === 0 && column === 0) {
            editor.insert(text);
        } else {
            editor.insert("\n" + text);
        }
        if (color) {
            KvLib.setEditorMaker(editor, color);
        }
        var row = editor.session.getLength() - 1;
        var column = editor.session.getLine(row).length; // or simply Infinity
        editor.gotoLine(row + 1, column);

    }

    static setEditorMaker(editor, color) {
        var row = editor.session.getLength() - 1;
        var Range = ace.require('ace/range').Range;
        if (color === "red") {
            editor.session.addMarker(new Range(row, 0, row, 1), "myRedMarker", "fullLine");
            return;
        }
        if (color === "green") {
            editor.session.addMarker(new Range(row, 0, row, 1), "myGreenMarker", "fullLine");
            return;
        }
        if (color === "yellow") {
            editor.session.addMarker(new Range(row, 0, row, 1), "myYellowMarker", "fullLine");
            return;
        }
        editor.session.addMarker(new Range(row, 0, row, 1), color, "fullLine");
    }

    static clearEditorMaker(editor) {
        const prevMarkers = editor.session.getMarkers();
        if (prevMarkers) {
            const prevMarkersArr = Object.keys(prevMarkers);
            for (let item of prevMarkersArr) {
                editor.session.removeMarker(prevMarkers[item].id);
            }
        }
    }

    static deleteObjsId(objs, id) {
        for (var i = 0; i < objs.length; i++) {
            if (objs[i].id) {
                if (objs[i].id === id) {
                    objs.splice(i, 1);
                    return;
                }
            }
        }
    }

    static setObjsIdTime(objs, id, time, status) {
        for (var i = 0; i < objs.length; i++) {
            if (objs[i].id) {
                if (objs[i].id === id) {
                    objs[i].time = time;
                    objs[i].status = status;
                    return;
                }
            }
        }
    }

    static getObjsId(objs, id) {
        for (var i = 0; i < objs.length; i++) {
            if (objs[i].id) {
                if (objs[i].id === id) {
                    return objs[i];
                }
            }
        }
    }

    static setColor(cr, cg, cb, ca) {
        if (ca !== 1) {
            return"rgba(" + cr + "," + cg + "," + cb + "," + ca + ")";
        } else {
            return "#" + KvLib.numToHex2b(cr) + KvLib.numToHex2b(cg) + KvLib.numToHex2b(cb);
        }
    }
    static setColorRgba(colorStr, ca) {
        var errColor = {r: 0, g: 0, b: 0};
        var cobj = KvLib.transColor(colorStr, errColor);
        cobj.a = ca;
        var str = "rgba(";
        str += cobj.r;
        str += "," + cobj.g;
        str += "," + cobj.b;
        str += "," + cobj.a;
        str += ")";
        return str;
    }

    static darkColor(cstr, darkRate) {
        var cobj = KvLib.transColor(cstr);
        var str = "rgb(";
        str += cobj.r * darkRate;
        str += "," + cobj.g * darkRate;
        str += "," + cobj.b * darkRate;
        str += ")";
        return str;
    }
    static transColor(cstr, errColor) {
        var numA = [];
        var num;
        var color = {r: 0, g: 0, b: 0};
        if (!cstr)
            return null;
        var str = cstr.trim();
        var strA = str.split("");
        if (strA.length === 4) {
            var hexMap = {0: 0, 1: 0x11, 2: 0x22, 3: 0x33, 4: 0x44, 5: 0x55, 6: 0x66, 7: 0x77, 8: 0x88, 9: 0x99,
                a: 0xaa, A: 0xaa, b: 0xbb, B: 0xbb, c: 0xcc, C: 0xcc, d: 0xdd, D: 0xdd, e: 0xee, E: 0xee, f: 0xff, F: 0xff};
            if (strA[0] !== "#")
                return errColor;
            for (var i = 0; i < 3; i++) {
                num = hexMap[strA[i + 1]];
                if (num === undefined)
                    return errColor;
                numA.push(num);
            }
            color.r = numA[0];
            color.g = numA[1];
            color.b = numA[2];
            return color;
        }
        if (strA.length === 7) {
            var hexMap = {0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, a: 10, A: 10, b: 11, B: 11, c: 12, C: 12, d: 13, D: 13, e: 14, E: 14, f: 15, F: 15};
            if (strA[0] !== "#")
                return errColor;
            for (var i = 0; i < 3; i++) {
                var value;
                num = hexMap[strA[i * 2 + 1]];
                if (num === undefined)
                    return errColor;
                value = num;
                num = hexMap[strA[i * 2 + 2]];
                if (num === undefined)
                    return errColor;
                value = value * 16 + num;
                numA.push(value);
            }
            color.r = numA[0];
            color.g = numA[1];
            color.b = numA[2];
            return color;
        }
        if (strA[strA.length - 1] !== ')')
            return errColor;
        if (strA[0] === 'r' && strA[1] === 'g' && strA[2] === 'b' && strA[3] === '(') {
            strA = str.split("(");
            if (strA.length !== 2)
                return errColor;
            var strB = strA[1].split(")");
            if (strB.length !== 2)
                return errColor;
            strA = strB[0].split(",");
            if (strA.length !== 3)
                return errColor;
            for (var i = 0; i < 3; i++) {
                num = KvLib.strToInt(strA[i], null);
                if (num === null)
                    return errColor;
                if (num > 255 || num < 0)
                    return errColor;
                numA.push(num);
            }
            color.r = numA[0];
            color.g = numA[1];
            color.b = numA[2];
            return color;

        }
        if (strA[0] === 'r' && strA[1] === 'g' && strA[2] === 'b' && strA[3] === 'a' && strA[4] === '(') {
            strA = str.split("(");
            if (strA.length !== 2)
                return errColor;
            var strB = strA[1].split(")");
            if (strB.length !== 2)
                return errColor;
            strA = strB[0].split(",");
            if (strA.length !== 4)
                return errColor;
            for (var i = 0; i < 4; i++) {
                if (i === 3)
                    num = KvLib.strToNumber(strA[i], null);
                else
                    num = KvLib.strToInt(strA[i], null);
                if (num === null)
                    return errColor;
                if (num > 255 || num < 0)
                    return errColor;
                numA.push(num);
            }
            color.r = numA[0];
            color.g = numA[1];
            color.b = numA[2];
            color.a = numA[3];
            return color;
        }
        return errColor;


    }

    static hint(text, x, y) {
        var hint = document.getElementById("hintId");
        if (!hint)
            hint = document.createElement('div');
        hint.id = "hintId";
        var sty = hint.style;
        sty.fontSize = "12px";
        sty.fontWeight = "normal";
        sty.fontFamily = "sans-serif";
        var size = KvLib.measureText(text, 12, sty.fontWeight, sty.fontFamily);
        size.w += 8;
        size.h = size.h * 1.4;
        sty.position = "absolute";
        sty.width = size.w + "px";
        sty.height = size.h + "px";
        sty.left = x + "px";
        sty.top = y + "px";
        sty.backgroundColor = "#ff0";
        sty.color = "#000";
        sty.borderRadius = "6px";
        sty.borderWidth = "1px";
        sty.borderStyle = "solid";
        sty.borderColor = "#000";
        sty.textAlign = "center";
        sty.lineHeight = (size.h) + "px";
        sty.pointerEvents = "none";
        sty.zIndex = 100;
        sty.opacity = 0;
        hint.innerHTML = text;
        document.body.appendChild(hint);
        return size;

    }

    static measureText(pText, fontSize, fontWeight, fontFamily) {

        var lDiv = document.createElement('div');
        document.body.appendChild(lDiv);
        lDiv.style.fontFamily = fontFamily;
        lDiv.style.fontWeight = fontWeight;
        lDiv.style.fontSize = "" + fontSize + "px";
        lDiv.style.position = "absolute";
        lDiv.style.left = -1000;
        lDiv.style.top = -1000;
        //lDiv.textContent = pText;
        lDiv.innerHTML = pText;
        var lResult = {
            w: lDiv.clientWidth + 1,
            h: lDiv.clientHeight
        };
        document.body.removeChild(lDiv);
        lDiv = null;
        return lResult;
    }

    static coverObject(toObj, fromObj) {
        if (!fromObj)
            return;
        if (!toObj)
            return;
        var fromKeys = Object.keys(fromObj);
        for (var i = 0; i < fromKeys.length; i++) {
            var value = fromObj[fromKeys[i]];
            var typeName = typeof value;
            //if(typeName==="object")
            //    continue;
            toObj[fromKeys[i]] = fromObj[fromKeys[i]];
        }
    }

    static deleteObjectMenber(toObj, fromObj) {
        if (!fromObj)
            return;
        if (!toObj)
            return;
        var fromKeys = Object.keys(fromObj);
        for (var i = 0; i < fromKeys.length; i++) {
            delete toObj[fromKeys[i]];
        }
    }

    static copyObj(inObj, cObj) {
        var newObj = JSON.parse(JSON.stringify(inObj));
        if (cObj)
            KvLib.deepCoverObject(newObj, cObj);
        return newObj;

    }

    static deepCompareObject(baseObj, newObj) {
        if (!baseObj || !newObj)
            return;
        var newKeys = Object.keys(newObj);
        var outObj = {};
        for (var i = 0; i < newKeys.length; i++) {
            var key = newKeys[i];
            if (key === "subOpts")
                continue;
            if (key === "delOpts")
                continue;
            if (key === "optsDsc")
                continue;
            if (key === "end")
                break;
            var baseValue = baseObj[key];
            if (baseValue === undefined) {
                outObj[key] = newObj[key];
                continue;
            }
            var newValue = newObj[key];
            if (Array.isArray(newValue)) {
                var newArrayStr = JSON.stringify(newValue);
                var baseArrayStr = JSON.stringify(baseValue);
                if (newArrayStr === baseArrayStr)
                    continue;
                outObj[key] = newValue;
                continue;
            }
            var typeName = typeof newValue;
            if (typeName === "object") {
                var newObjectStr = JSON.stringify(newValue);
                var baseObjectStr = JSON.stringify(baseValue);
                if (newObjectStr === baseObjectStr)
                    continue;
                outObj[key] = newValue;
                continue;
            }
            if (newValue !== baseValue)
                outObj[key] = newValue;
        }
        return JSON.parse(JSON.stringify(outObj));
    }

    static deleteStringArray(myArray, name) {
        for (var i = 0; i < myArray.length; i++) {
            if (myArray[i] === name) {
                myArray.splice(0, 1);
                return;
            }
        }
    }

    static getFunc(func) {
        if (typeof func === 'function') {
            return func;
        }
        if (typeof func === 'string') {
            try {
                var nfunc;
                var evalStr = "nfunc=" + func + ";";
                eval(evalStr);
                return nfunc;
            } catch (ex) {
                return null;
            }
            return func;
        }
    }

    static deepCoverObject(toObj, fromObj, deepCnt) {
        if (!fromObj)
            return;
        if (!toObj)
            return;
        if (!deepCnt)
            deepCnt = 0;
        var fromKeys = Object.keys(fromObj);
        for (var i = 0; i < fromKeys.length; i++) {
            var key = fromKeys[i];
            if (key === "subOpts")
                continue;
            if (key === "delOpts")
                continue;
            if (key === "optsDsc")
                continue;
            var value = fromObj[key];
            if (value === undefined) {
                continue;
            }
            if (value === null) {
                toObj[key] = fromObj[key];
                continue;
            }
            if (typeof value === 'function') {
                toObj[key] = fromObj[key];
                continue;
            }

            if (Array.isArray(value)) {
                var ttuu = JSON.parse(JSON.stringify(fromObj[key]));
                toObj[key] = ttuu;
                continue;
            }
            var typeName = typeof value;
            if (typeName === "object") {
                if (typeof toObj[fromKeys[i]] !== "object")
                    toObj[fromKeys[i]] = {};
                deepCnt++;
                if (deepCnt >= 10) {
                    console.error("The deepCoverObject deepCnt over 10 !!!");
                    continue;
                }
                KvLib.deepCoverObject(toObj[fromKeys[i]], fromObj[fromKeys[i]], deepCnt);
                deepCnt--;
                continue;
            }
            try {
                toObj[fromKeys[i]] = fromObj[fromKeys[i]];
            } catch (ex)
            {

            }
        }
    }

    static getByteLen(str) {
        let len = 0;
        for (let i = 0; i < str.length; i++) {
            str.charCodeAt(i) < 256 ? (len += 1) : (len += 2);
        }
        return len;
    }

    static spaceStrTo(str, toNum) {
        var len = KvLib.getByteLen(str);
        if (len >= toNum)
            return;
        var m = toNum - len;
        for (var i = 0; i < m; i++)
            str += " ";
        return str;
    }

    static spaceText(istr) {
        var retStr = "";
        var spaceCnt = 0;
        var strA = istr.split("");
        for (var i = 0; i < strA.length; i++) {
            if (strA[i] === " ") {
                retStr += "&nbsp;";
            } else {
                retStr += strA[i];
            }
        }
        return retStr;
    }

    static setKvText(str, id) {
        var obj = {};
        obj.objName = "textObj";
        obj.type = "text";
        obj.id = id;
        obj.english = str;
        return obj;
    }
    static getKvText(istr, language, type) {
        if (istr === undefined || istr === null)
            return {text: ""};
        var typeName = typeof istr;
        if (typeName === "object") {
            var textObj = istr;
        } else {
            try {
                var textObj = JSON.parse(istr);
            } catch (ex) {
                return {text: "" + istr};
            }
        }

        if (!textObj.objName) {
            return {text: "" + istr};
        }
        if (textObj.objName !== "textObj")
            return {text: "" + istr};
        if (!textObj.type)
            textObj.type = "text";
        if (textObj.type === "text") {
            var lang = language;
            if (!lang)
                lang = gr.language;
            var text = textObj[lang];
            if (text === undefined)
                text = textObj.eng;
            if (text === undefined)
                return {text: ""};
            textObj.text = text;
            return textObj;
        }
        if (textObj.type === "hLine" || textObj.type === "vLine") {
            textObj.text = "";
            return textObj;
        }



        return {text: "" + istr};
    }

    static minMax(iData, min, max) {
        if (iData < min)
            return min;
        if (iData > max)
            return max;
        return iData;
    }

    static  scrollVExist(elem) {
        return elem.scrollHeight > elem.clientHeight;
    }
    static  scrollHExist(elem) {
        return elem.scrollWidth > elem.clientWidth;
    }

    static getAllUnit(arr, defaultOut, max, mm) {
        var values = [];
        var allv = 0;
        var rmax = max - (arr.length - 1) * mm;
        for (var i = 0; i < arr.length; i++) {
            var iv = KvLib.transUnit(arr[i], defaultOut, rmax, rmax);
            if (iv !== 9999)
                allv += iv;
            values.push(iv);
        }
        var rest = rmax - allv;
        for (var i = 0; i < values.length; i++) {
            if (values[i] === 9999) {
                values[i] = rest;
            }
        }
        return values;
    }

    static checkKvType(istr, defaultOut) {
        var od = KvLib.strToNumber(istr, defaultOut);
        if (od !== defaultOut) {
            return od;
        }
        return KvLib.transUnit(istr, defaultOut, 1, 1);
    }
    static transUnit(istr, defaultOut, w, h) {
        if (istr === null || istr === undefined)
            return defaultOut;
        if (istr === "")
            return defaultOut;
        if (typeof istr !== "string")
            return istr;
        if (istr === "rest")
            return 9999;
        var stra = istr.substr(0, istr.length - 2);
        var strb = istr.substr(istr.length - 2, 2);
        if (strb === "px") {
            var od = KvLib.parseNumber(stra);
            if (isNaN(od)) {
                return defaultOut;
            }
            return od;
        }
        if (strb === "rm") {
            var od = KvLib.parseNumber(stra);
            if (isNaN(od)) {
                return defaultOut;
            }
            return (od * w);
        }
        if (strb === "rs") {
            if (w > h)
                strb = "rh";
            else
                strb = "rw";
        }
        if (strb === "rb") {
            if (w > h)
                strb = "rw";
            else
                strb = "rh";
        }
        if (strb === "rw") {
            var od = KvLib.parseNumber(stra);
            if (isNaN(od)) {
                return defaultOut;
            }
            return (od * w);
        }
        if (strb === "rh") {
            var od = KvLib.parseNumber(stra);
            if (isNaN(od)) {
                return defaultOut;
            }
            return (od * h);
        }
        return defaultOut;

    }

    //=========================================
    static myString1(_str) {
        var strA, strB;
        var str, style;
        var num;
        var textSize, type, textColor, error, begin;
        var str = "";
        var second = 0;
        strA = _str.split("~!");
        if (strA.length > 1) {
            if (strA[0] !== "") {
                str += "<p>" + strA[0] + "</p>";
                second = 1;
            }
            for (let i = 1; i < strA.length; i++) {
                type = "";
                textColor = "";
                textSize = "";
                error = 1;
                begin = 0;
                for (let j = 0; j < strA[i].length; j++) {
                    if (strA[i].charAt(j) === "]") {
                        begin = j + 1;
                        error = 0;
                        break;
                    }
                    num = parseInt(strA[i].charAt(j + 1));
                    if (isNaN(num))
                        break;
                    switch (strA[i].charAt(j)) {
                        case 'p':
                            textSize = KvLib.textSizeTbl[num];
                            type = "p";
                            break;
                        case 'h':
                            textSize = KvLib.textSizeTbl[num];
                            type = "h";
                            break;
                        case 'c':
                            textColor = KvLib.textColorTbl[num];
                            break;
                        default:
                            j = strA[i].length;
                            break;
                    }
                    j++;
                }
                if (error) {
                    str += "<p>" + strA[i] + "</p>";
                } else {
                    if (type === "") {
                        type = "p";
                    }
                    style = " style='";
                    if (textColor !== "") {
                        style += "color:" + textColor + ";";
                    }
                    if (textSize !== "") {
                        style += "font-size:" + textSize + "px;";
                    }
                    if (second) {
                        type = "span";
                        //style+="display:"+"inline;";
                    }
                    type = "span";

                    style += "'";
                    str += "<" + type + style + ">";
                    str += strA[i].slice(begin);
                    str += "</" + type + ">";
                }
                second = 1;
            }

        } else {
            str += "<p>";
            str += _str;
            str += "</p>";
        }
        return str;
    }
    //=========================================


    static myString(_str) {
        var strA, strB;
        var str, style;
        var num;
        var textSize, type, textColor, error, begin;
        var str = "<p>";
        var second = 0;
        strA = _str.split("~!");
        if (strA.length > 1) {
            if (strA[0] !== "") {
                str += strA[0];
            }
            for (let i = 1; i < strA.length; i++) {
                type = "";
                textColor = "";
                textSize = "";
                error = 1;
                begin = 0;
                for (let j = 0; j < strA[i].length; j++) {
                    if (strA[i].charAt(j) === "]") {
                        begin = j + 1;
                        error = 0;
                        break;
                    }
                    num = parseInt(strA[i].charAt(j + 1));
                    if (isNaN(num))
                        break;
                    switch (strA[i].charAt(j)) {
                        case 'p':
                            textSize = KvLib.textSizeTbl[num];
                            break;
                        case 'c':
                            textColor = KvLib.textColorTbl[num];
                            break;
                        default:
                            j = strA[i].length;
                            break;
                    }
                    j++;
                }
                if (error) {
                    str += strA[i];
                } else {
                    style = " style='";
                    if (textColor !== "") {
                        style += "color:" + textColor + ";";
                    }
                    if (textSize !== "") {
                        style += "font-size:" + textSize + "px;";
                    }
                    if (second) {
                        type = "span";
                        //style+="display:"+"inline;";
                    }
                    type = "span";

                    style += "'";
                    str += "<" + type + style + ">";
                    str += strA[i].slice(begin);
                    str += "</" + type + ">";
                }
            }

        } else {
            str += _str;
        }
        str += "<p>";
        return str;
    }
    //=========================================




    static incId(idStr) {
        var str = "" + idStr;
        var stra = str.split("");
        var len = stra.length;
        const char = "012345678901";
        for (let i = 0; i < len; i++) {
            if (stra[len - i - 1] < "0" || stra[len - i - 1] > "9")
                return stra.join("");
            var k = 0;
            for (; k < 10; k++) {
                if (stra[len - i - 1] === char[k])
                    break;
            }
            stra[len - i - 1] = char[k + 1];
            if (k !== 9)
                return stra.join("");
        }
        return stra.join("");
    }

    static evalPrgA(obj, name, errorKey) {
        try {
            if (obj["error_f"])
                return false;
            eval(obj[name]);
            return true;
        } catch (e) {
            obj["error_f"] = 1;
            var obj = {};
            obj.name = errorKey;
            obj.error = e.toString();
            obj.Content = obj[name];
            gr.errorObjs.push(obj);
            return false;
        }
    }

    static  bytes2String(bytes) {
        var str = "";
        for (var i = 0; i < bytes.length; i++) {
            if (bytes[i] === 0)
                break;
            str += String.fromCharCode(bytes[i]);
        }
        return str;
    }

    static evalPrgB(evalStr, errorKey, ioValue) {
        try {
            eval(evalStr);
            return true;
        } catch (e) {
            var obj = {};
            obj.name = errorKey;
            obj.error = e.toString();
            obj.Content = evalStr;
            gr.errorObjs.push(obj);
            return false;
        }
    }

    static evalPrgC(errorKey, errorStr, content) {
        var obj = {};
        obj.name = errorKey;
        obj.error = errorStr;
        obj.Content = content;
        gr.errorObjs.push(obj);
    }

    static logErr(errorKey, errorStr, content) {
        var obj = {};
        obj.name = errorKey;
        obj.error = errorStr;
        obj.Content = content;
        gr.errorObjs.push(obj);
    }

    static popWindow(_name, _type, _opts, _paras) {
        var classStr = "new " + _paras.className + "(myName, type, opts, paras)";
        var paras = {
            newClass: classStr,
            width: _paras.width,
            height: _paras.height,
            end: 0
        };
        sysMaskShow("mask", "base", {opacity: '0.7'});
        var instObj = sysPopShow(_name, "base", _opts, paras);
        return instObj;
    }

    static bodyMouseDown() {
        var rightclick;
        var e = window.event;
        if (e.which)
            rightclick = (e.which === 3);
        else if (e.button)
            rightclick = (e.button === 2);
        if (rightclick) {
            KvLib.exeFunc(gr.rightMouseFunc, null);
            gr.rightMouseFunc = null;
            console.log("right mouse button");
        } else {
            gr.rightMouseFunc = null;
            console.log("left mouse button");
        }
    }

    static checkMouseRight() {
        var rightclick;
        var e = window.event;
        if (e.which)
            rightclick = (e.which === 3);
        else if (e.button)
            rightclick = (e.button === 2);
        return rightclick;

    }

    static isFileName(_str) {
        var str = _str.trim();
        if (str.length === 0)
            return false;
        var strA = str.split("");
        var ascii;
        for (let i = 0; i < strA.length; i++)
        {
            ascii = strA[i].charCodeAt(0) & 255;
            if (strA[i] === '_')
                continue;
            if (ascii >= 0x30 && ascii <= 0x39)
            {
                if (i === 0)
                    return false;
                continue;
            }
            if (ascii >= 0x41 && ascii <= 0x5a)//A~Z
                continue;
            if (ascii >= 0x61 && ascii <= 0x7a)//a~z
                continue;
            return false;
        }
        return true;
    }
    static chkType(x) {
        if (KvLib.isInteger(x))
            return "num";
        if (KvLib.isFloat(x))
            return "float";
        if (Array.isArray(x))
            return "array";
        if (typeof x === 'object' && x !== null)
            return "object";
        return "str";
    }

    static isFloat(x) {
        if (typeof x === "number")
            return !!(x % 1);
        return false;
    }
    static isInteger(x) {
        if (typeof x === "number")
            return !(x % 1);
        return false;
    }
    static isFloat(x) {
        if (typeof x === "number")
            return !!(x % 1);
        return false;
    }
    static parseNumber(x) {
        if (KvLib.isFloat(x)) {
            return x;
        }
        if (KvLib.isInteger(x)) {
            return x;
        }
        var f = parseFloat(x);
        if (!Number.isNaN(f))
            return f;
        return parseInt(x);
    }

    static parseNumberX(x) {
        var n = parseFloat(x);
        if (Number.isNaN(n))
            return n;
        if (KvLib.isFloat(n))
            return n;
        else
            return parseInt(n);
    }

    static fullScreen(elemId) {
        var elem = document.getElementById(elemId);
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        }
    }

    static asciiToHex(charCode) {
        var i;
        if (charCode < 0x30)
            return 0;
        if (charCode <= 0x39)
            return charCode - 0x30;
        if (charCode < 0x41)
            return 0;
        if (charCode < 0x41)
            return 0;
        if (charCode <= 0x46)
            return charCode - 0x41 + 10;
        ;
        if (charCode < 0x61)
            return 0;
        if (charCode <= 0x66)
            return charCode - 0x61 + 10;
        ;
        return(0);

    }
    //字元檢測函式 
    static char_test(chr) {
        var i;
        var smallch = "abcdefghijklmnopqrstuvwxyz";
        var bigch = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for (i = 0; i < 26; i++)
            if (chr === smallch.charAt(i) || chr === bigch.charAt(i))
                return(1);
        return(0);
    }
    //數字和特殊字元檢測函式 
    static spchar_test(chr) {
        var i;
        var spch = "_-.0123456789";
        for (i = 0; i < 13; i++)
            if (chr === spch.charAt(i))
                return(1);
        return(0);
    }

    static email_test(str)
    {
        var i, flag = 0;
        //“@”檢測的位置 
        var at_symbol = 0;
        //“.”檢測的位置 
        var dot_symbol = 0;
        //首字元必須用字母 
        if (KvLib.char_test(str.charAt(0)) === 0)
            return (1);
        //檢測“@”的位置 
        for (i = 1; i < str.length; i++) {
            if (str.charAt(i) === '@') {
                at_symbol = i;
                break;
            }
        }
        //沒有郵件伺服器域名 
        if (at_symbol === str.length - 1 || at_symbol === 0)
            return(2);
        //帳號少於三個字元 
        if (at_symbol < 3)
            return(3);
        //帳號多於十九個字元 
        if (at_symbol > 19)
            return(4);
        //不能用其它的特殊字元  
        for (i = 1; i < at_symbol; i++) {
            if (KvLib.char_test(str.charAt(i)) === 0 && KvLib.spchar_test(str.charAt(i)) === 0)
                return (5);
        }
        for (i = at_symbol; i < str.length; i++) {
            if (KvLib.char_test(str.charAt(i)) === 0 && KvLib.spchar_test(str.charAt(i)) === 0)
                return (5);
        }
        for (i = at_symbol; i < str.length; i++)
            if (str.charAt(i) === '.')
                dot_symbol = i;
        //簡單的檢測有沒有“.”，以確定伺服器名是否合法 
        for (i = at_symbol; i < str.length; i) {
            if (dot_symbol === 0 || dot_symbol === str.length - 1)
                return (6);
        }
        //郵件名合法 
        return (0);
    }

    static exeFunc(_func, event) {
        if (!_func)
            return;
        if (typeof _func === 'function') {
            return _func(event);
            return;
        } else {
            var func = getInstByString(_func);
            if (func) {
                return func(event);
            }
            return;
        }
    }

    static exe(_func, para0, para1, para2, para3) {
        if (!_func)
            return;
        if (typeof _func === 'function') {
            return _func(para0, para1, para2, para3);
        } else {
            var func = getInstByString(_func);
            if (func) {
                return func(para0, para1, para2, para3);
            }
        }
    }

    static deepEqual(x, y) {
        if (x === y) {
            return true;
        } else if ((typeof x === "object" && x !== null) && (typeof y === "object" && y !== null)) {
            if (Object.keys(x).length !== Object.keys(y).length)
                return false;

            for (var prop in x) {
                if (y.hasOwnProperty(prop))
                {
                    if (!KvLib.deepEqual(x[prop], y[prop]))
                        return false;
                } else
                    return false;
            }

            return true;
        } else
            return false;
    }

    static exeFilter(_func, _valueObj) {
        if (!_func)
            return null;
        if (typeof _func === 'function') {
            return _func(_valueObj);
        } else {
            var func = getInstByString(_func);
            if (func) {
                return func(_valueObj);
            }
            return null;
        }
    }

    static evalFunc(_func, inputObj, retFunc) {
        var retObj;
        try {
            if (!_func)
                return null;
            retObj = eval(_func + "(inputObj,retFunc);");
            return retObj;
        } catch (except) {
            console.error(except);
            return null;
        }
    }

    static numToHex2b(num) {
        var str = "";
        num = num % 256;
        str += gr.hexTable[parseInt(num / 16)];
        str += gr.hexTable[num % 16];
        return str;
    }

    static trsIntToHexStr(num) {
        var ba = [0, 0, 0, 0, 0, 0, 0, 0];
        for (var index = 0; index < ba.length; index++) {
            var byte = num & 15;
            ba [ index ] = byte;
            num = (num - byte) / 16;
        }
        var first_f = 1;
        var str = "";
        for (var i = 0; i < ba.length; i++) {
            var iv = ba[ba.length - 1 - i];
            if (first_f) {
                if (iv === 0)
                    continue;
            }
            first_f = 0;
            str += gr.hexTable[iv];
        }
        if (str === "")
            str = "0";
        return str;
    }

    static trsIntToHexStrFix(num) {
        var ba = [0, 0, 0, 0, 0, 0, 0, 0];
        for (var index = 0; index < ba.length; index++) {
            var byte = num & 15;
            ba [ index ] = byte;
            num = (num - byte) / 16;
        }
        var str = "";
        for (var i = 0; i < ba.length; i++) {
            str += gr.hexTable[ba[7-i]];
        }
        return str;
    }

    static trsShortToHexStrFix(num) {
        var ba = [0, 0, 0, 0];
        for (var index = 0; index < ba.length; index++) {
            var byte = num & 15;
            ba [ index ] = byte;
            num = (num - byte) / 16;
        }
        var str = "";
        for (var i = 0; i < ba.length; i++) {
            str += gr.hexTable[ba[3-i]];
        }
        return str;
    }



    static pt1(num) {
        var str = "";
        num = num % 256;
        str += gr.hexTable[parseInt(num / 16)];
        str += gr.hexTable[num % 16];
        return str;
    }

    static isColor(_colorStr) {
        var colorValue = {type: 0, cr: 0, cg: 0, cb: 0, opacity: 1};
        var strb = "";
        if (!_colorStr)
            return null;
        if ((typeof _colorStr) !== "string")
            return null;
        var colorStr = _colorStr.trim();

        if (/^#[0-9A-F]{3}$/i.test(colorStr)) {
            colorValue.type = 1;
            strb = "0x" + colorStr[1];
            colorValue.cr = parseInt(strb);
            strb = "0x" + colorStr[2];
            colorValue.cg = parseInt(strb);
            strb = "0x" + colorStr[3];
            colorValue.cb = parseInt(strb);
            return colorValue;
        }
        if (/^#[0-9A-F]{6}$/i.test(colorStr)) {
            colorValue.type = 2;
            strb = "0x" + colorStr[1] + colorStr[2];
            colorValue.cr = parseInt(strb);
            strb = "0x" + colorStr[3] + colorStr[4];
            colorValue.cg = parseInt(strb);
            strb = "0x" + colorStr[5] + colorStr[6];
            colorValue.cb = parseInt(strb);
            return colorValue;
        }
        if (colorStr[0] !== 'r')
            return null;
        if (colorStr[1] !== 'g')
            return null;
        if (colorStr[2] !== 'b')
            return null;
        if (colorStr[3] === '(') {
            if (colorStr[colorStr.length - 1] !== ')')
                return null;
            colorStr = colorStr.slice(4, colorStr.length - 1);
            var strA = colorStr.split(',');
            if (strA.length !== 3)
                return null;
            for (let i = 0; i < 3; i++) {
                if (Number.isNaN(parseInt(strA[i])))
                    return null;
            }
            colorValue.type = 3;
            colorValue.cr = parseInt(strA[0]);
            colorValue.cg = parseInt(strA[1]);
            colorValue.cb = parseInt(strA[2]);
            return colorValue;

        }
        if (colorStr[3] !== 'a')
            return null;
        if (colorStr[4] === '(') {
            colorStr = colorStr.slice(5, colorStr.length - 1);
            var strA = colorStr.split(',');
            if (strA.length !== 4)
                return null;
            var num;
            for (let i = 0; i < 3; i++) {
                if (Number.isNaN(parseInt(strA[i])))
                    return null;
            }
            if (Number.isNaN(parseFloat(strA[3])))
                return null;
            colorValue.type = 4;
            colorValue.cr = parseInt(strA[0]);
            colorValue.cg = parseInt(strA[1]);
            colorValue.cb = parseInt(strA[2]);
            colorValue.opacity = parseFloat(strA[3]);
            return colorValue;
        }
        return null;
    }

    static toNumber(_str, reti) {
        var str = "" + _str;
        var str = str.trim();
        if (_str === "")
            return null;
        var strA = str.split("");
        var float_f = false;
        if (strA[0] === '0' && strA[1] === 'x') {
            var num = parseInt(str, 16);
            if (isNaN(num))
                return reti;
            return num;
        }
        for (let i = 0; i < strA.length; i++)
        {
            if (strA[i] === '-')
            {
                continue;
            }
            if (strA[i] === '.')
            {
                if (float_f)
                    return reti;
                float_f = true;
                continue;
            }
            if ((strA[i].charCodeAt(0) & 255) < 0x30)
                return reti;
            if ((strA[i].charCodeAt(0) & 255) > 0x39)
                return reti;
        }
        if (float_f)
            var num = parseFloat(str);
        else
            var num = parseInt(str);
        if (isNaN(num))
            return reti;
        return num;

    }

    //if error return null else return number
    static trsStrToNum(_str) {

        if (_str === "")
            return null;
        var str = _str.trim();
        var strA = str.split("");
        var float_f = false;
        if (strA[0] === '0' && strA[1] === 'x') {
            return parseInt(str, 16);
        }


        for (let i = 0; i < strA.length; i++)
        {
            if (strA[i] === '-')
            {
                continue;
            }
            if (strA[i] === '.')
            {
                if (float_f)
                    return NaN;
                float_f = true;
                continue;
            }
            if ((strA[i].charCodeAt(0) & 255) < 0x30)
                return NaN;
            if ((strA[i].charCodeAt(0) & 255) > 0x39)
                return NaN;
        }
        if (float_f)
            return parseFloat(str);
        return parseInt(str);
    }

    static trsStrToStr(_str) {
        var str = _str.trim();
        if (str[0] === "\'" || str[0] === "\"")
        {
            if (str[str.length - 1] === "\'" || str[str.length - 1] === "\"")
            {
                var retStr = "";
                for (let i = 0; i < str.length - 2; i++)
                    retStr += str[i + 1];
                return retStr;
            }
        }
        return str;
    }

    static getObjType(obj) {
        var objType = obj.constructor.name;
        var myType = "null";
        while (true) {
            if (objType === "Number") {
                myType = "number";
                break;
            }
            if (objType === "String") {
                myType = "string";
                break;
            }
            if (objType === "Object") {
                myType = "object";
                break;
            }
            if (objType === "Array") {
                myType = "nullArray";
                if (!obj.length)
                    break;
                if (obj[0] === null || obj[0] === undefined)
                    break;

                objType = obj[0].constructor.name;
                if (objType === "Number") {
                    myType = "numberArray";
                    break;
                }
                if (objType === "String") {
                    myType = "stringArray";
                    break;
                }
                if (objType === "Object") {
                    myType = "objectArray";
                    break;
                }
                if (objType === "Array") {
                    myType = "nullArray2D";
                    if (!obj[0].length)
                        break;
                    objType = obj[0][0].constructor.name;
                    if (objType === "Number") {
                        myType = "numberArray2D";
                        break;
                    }
                    if (objType === "String") {
                        myType = "stringArray2D";
                        break;
                    }
                    if (objType === "Object") {
                        myType = "objectArray2D";
                        break;
                    }
                    break;
                }
                break;
            }
            break;
        }
        return myType;
    }

    static editToValue(type, inputValue) {
        var outObj = {error_f: 1, outValue: ""};
        switch (type) {
            case "free":
                outObj.outValue = inputValue;
                outObj.error_f = 0;
                return outObj;
            case 'number':
                var num = KvLib.trsStrToNum(inputValue);
                if (Number.isNaN(num))
                    return outObj;
                outObj.outValue = num;
                outObj.error_f = 0;
                return outObj;
            case 'userInput':
            case 'color':
            case 'string':
            case 'text':
            case 'shortString':
            case 'longString':
                outObj.outValue = KvLib.trsStrToStr(inputValue);
                outObj.error_f = 0;
                return outObj;
            case 'numberArray':
                strA = inputValue.split("\n");
                array = [];
                for (let i = 0; i < strA.length; i++) {
                    str = KvLib.trsStrToStr(strA[i]);
                    if (str.charAt(0) === ",") {
                        str = str.slice(1);
                    }
                    if (str.charAt(str.length - 1) === ",") {
                        str = str.slice(0, -1);
                    }
                    array.push(str);
                }
                str = "";
                for (let i = 0; i < array.length; i++) {
                    if (array[i] === "")
                        continue;
                    if (i !== 0)
                        str += ",";
                    str += array[i];
                }
                var strA = str.split(",");
                var array = [];
                for (let i = 0; i < strA.length; i++) {
                    num = KvLib.trsStrToNum(strA[i]);
                    if (Number.isNaN(num))
                        return outObj;
                    if (num === null)
                        return outObj;
                    array.push(num);
                }
                outObj.outValue = array;
                outObj.error_f = 0;
                return outObj;
            case 'freeArray':
            case 'imageUrls':
            case 'stringArray':
                array = [];
                var strA = inputValue.split("\n");
                for (let i = 0; i < strA.length; i++) {
                    var strB = strA[i].split(",");
                    for (let j = 0; j < strB.length; j++) {
                        var str = strB[j].trim();
                        if (str === "")
                            continue;
                        if (str.charAt(0) === '"' && str.charAt(str.length - 1) === '"') {
                            var nstr = str.slice(1, str.length - 1);
                            array.push(nstr);
                        } else {
                            array.push(str);
                        }
                    }
                }


                /*
                 var str = inputValue.replace("\n", ",");
                 strA = str.split(",");
                 array = [];
                 for (let i = 0; i < strA.length; i++) {
                 str = KvLib.trsStrToStr(strA[i]);
                 array.push(str);
                 }
                 
                 if(array.length===1){
                 if(array[0]==="")
                 array=[];
                 }
                 */
                outObj.outValue = array;
                outObj.error_f = 0;
                return outObj;
            case 'longStringArray':
                strA = inputValue.split("\n");
                array = [];
                for (let i = 0; i < strA.length; i++) {
                    str = KvLib.trsStrToStr(strA[i]);
                    array.push(str);
                }
                outObj.outValue = array;
                outObj.error_f = 0;
                return outObj;
            case 'numberArray2D':
                var strb;
                var strB;
                var arrbuf;
                strA = inputValue.split("\n");
                array = [];
                for (let i = 0; i < strA.length; i++) {
                    strb = strA[i].trim();
                    if (!strb.length)
                        continue;
                    arrbuf = [];
                    strB = strA[i].split(",");
                    for (let j = 0; j < strB.length; j++) {
                        num = KvLib.trsStrToNum(strB[j]);
                        if (Number.isNaN(num))
                            return outObj;
                        arrbuf.push(num);
                    }
                    array.push(arrbuf);
                }
                outObj.outValue = array;
                outObj.error_f = 0;
                return outObj;
            case 'freeArray2D':
            case 'stringArray2D':
                var strb;
                var strB;
                var arrbuf;
                strA = inputValue.split("\n");
                array = [];
                for (let i = 0; i < strA.length; i++) {
                    strb = strA[i].trim();
                    if (!strb.length)
                        continue;
                    arrbuf = [];
                    strB = strA[i].split(",");
                    for (let j = 0; j < strB.length; j++) {
                        str = KvLib.trsStrToStr(strB[j]);
                        arrbuf.push(str);
                    }
                    array.push(arrbuf);
                }
                outObj.outValue = array;
                outObj.error_f = 0;
                return outObj;
            case 'object':
                if (inputValue === "" || inputValue === "null") {
                    outObj.outValue = null;
                    outObj.error_f = 0;
                    return outObj;
                }
                try {
                    outObj.outValue = JSON.parse(inputValue);
                    outObj.error_f = 0;
                } catch (error) {
                    outObj.error_f = 1;
                    outObj.outValue = {};
                }
                return outObj;
            case 'objectArray':
            case 'objectArray2D':
                if (inputValue === "" || inputValue === "null") {
                    outObj.outValue = null;
                    outObj.error_f = 0;
                    return outObj;
                }
                try {
                    outObj.outValue = JSON.parse(inputValue);
                    if (!Array.isArray(outObj.outValue)) {
                        outObj.error_f = 1;
                        outObj.outValue = [];
                        return outObj;
                    }
                    outObj.error_f = 0;
                } catch (error) {
                    outObj.error_f = 1;
                    outObj.outValue = [];

                }
                return outObj;
        }
        return outObj;
    }

    static valueToEdit(type, inputValue) {
        var outObj = {error_f: 1, outValue: ""};
        switch (type) {
            case "free":
                outObj.outValue = inputValue;
                outObj.error_f = 0;
                return outObj;
            case 'number':
                if ((typeof inputValue) === "number") {
                    outObj.outValue = "" + inputValue;
                    outObj.error_f = 0;
                } else {
                    outObj.outValue = "0";
                    outObj.error_f = 1;
                }
                return outObj;
            case 'userInput':
            case 'color':
            case 'string':
            case 'text':
                outObj.outValue = inputValue;
                outObj.error_f = 0;
                return outObj;
            case 'numberArray':
                outObj.error_f = 0;
                if (Array.isArray(inputValue)) {
                    var str = "";
                    for (var i = 0; i < inputValue.length; i++) {
                        if (i !== 0)
                            str += ",";
                        if ((typeof inputValue[i]) !== "number") {
                            str += "0";
                            outObj.error_f = 1;
                        } else {
                            str += inputValue[i];
                        }
                    }
                    outObj.outValue = str;
                } else
                {
                    outObj.outValue = "";
                    outObj.error_f = 1;
                }
                return outObj;
            case 'freeArray':
            case 'imageUrls':
            case 'stringArray':
                outObj.error_f = 0;
                if (Array.isArray(inputValue)) {
                    var str = "";
                    for (var i = 0; i < inputValue.length; i++) {
                        if (i !== 0)
                            str += ",";
                        str += inputValue[i];
                    }
                    outObj.outValue = str;
                } else
                {
                    outObj.outValue = "";
                    outObj.error_f = 1;
                }
                return outObj;
            case 'longStringArray':
                outObj.error_f = 0;
                if (Array.isArray(inputValue)) {
                    var str = "";
                    for (var i = 0; i < inputValue.length; i++) {
                        if (i !== 0)
                            str += "\n";
                        str += inputValue[i];
                    }
                    outObj.outValue = str;
                } else
                {
                    outObj.outValue = "";
                    outObj.error_f = 1;
                }
                return outObj;

            case 'numberArray2D':
                outObj.error_f = 0;
                if (Array.isArray(inputValue)) {
                    var str = "";
                    for (var i = 0; i < inputValue.length; i++) {
                        if (i !== 0)
                            str += "\n";
                        var strB = inputValue[i];
                        if (Array.isArray(strB)) {
                            for (var j = 0; j < strB.length; j++) {
                                if (j !== 0)
                                    str += ",";
                                if ((typeof strB[j]) !== "number") {
                                    str += "0";
                                    outObj.error_f = 1;
                                } else {
                                    str += strB[j];
                                }

                            }
                        } else
                        {
                            str += "";
                            outObj.error_f = 1;
                        }
                    }
                    outObj.outValue = str;

                } else
                {
                    outObj.outValue = "";
                    outObj.error_f = 1;
                }
                return outObj;
            case 'freeArray2D':
            case 'stringArray2D':
                outObj.error_f = 0;
                if (Array.isArray(inputValue)) {
                    var str = "";
                    for (var i = 0; i < inputValue.length; i++) {
                        if (i !== 0)
                            str += "\n";
                        var strB = inputValue[i];
                        if (Array.isArray(strB)) {
                            for (var j = 0; j < strB.length; j++) {
                                if (j !== 0)
                                    str += ",";
                                str += strB[j];
                            }
                        } else
                        {
                            str += "";
                            outObj.error_f = 1;
                        }
                    }
                    outObj.outValue = str;

                } else
                {
                    outObj.outValue = "";
                    outObj.error_f = 1;
                }
                return outObj;
            case 'object':
            case 'objectArray':
            case 'objectArray2D':
                outObj.outValue = JSON.stringify(inputValue);
                outObj.error_f = 0;
                return outObj;
            default:
                return outObj;
        }
    }

    static textToValue(type, inputValue) {
        var outObj = {error_f: 1, outValue: ""};
        switch (type) {
            case "free":
                outObj.outValue = inputValue;
                outObj.error_f = 0;
                return outObj;
            case 'number':
                var num = KvLib.trsStrToNum(inputValue);
                if (Number.isNaN(num)) {
                    outObj = {error_f: 1, outValue: 0};
                    return outObj;
                }
                outObj.outValue = num;
                outObj.error_f = 0;
                return outObj;
            case 'font':
            case 'enum':
            case 'userInput':
            case 'color':
            case 'text':
            case 'string':
            case 'shortString':
            case 'longString':
                outObj.outValue = KvLib.trsStrToStr(inputValue);
                outObj.error_f = 0;
                return outObj;
            case 'numberArray':
                strA = inputValue.trim().split("\n");
                var array = [];
                for (let i = 0; i < strA.length; i++) {
                    str = strA[i].trim();
                    if (str.charAt(0) === ",") {
                        str = str.slice(1);
                    }
                    if (str.charAt(str.length - 1) === ",") {
                        str = str.slice(0, -1);
                    }
                    strB = str.split(",");
                    for (let j = 0; j < strB.length; j++) {
                        num = KvLib.trsStrToNum(strB[j]);
                        if (Number.isNaN(num))
                            return outObj;
                        if (num === null)
                            return outObj;
                        array.push(num);
                    }
                }
                outObj.outValue = array;
                outObj.error_f = 0;
                return outObj;
            case 'freeArray':
            case 'imageUrls':
            case 'stringArray':
                var strA = inputValue.trim().split("\n");
                array = [];
                for (let i = 0; i < strA.length; i++) {
                    str = strA[i].trim();
                    if (str.charAt(0) === ",") {
                        str = str.slice(1);
                    }
                    if (str.charAt(str.length - 1) === ",") {
                        str = str.slice(0, -1);
                    }
                    strB = str.split(",");
                    for (let j = 0; j < strB.length; j++)
                        array.push(KvLib.trsStrToStr(strB[j]));
                }
                outObj.outValue = array;
                outObj.error_f = 0;
                return outObj;
            case 'longStringArray':
                strA = inputValue.split("\n");
                array = [];
                for (let i = 0; i < strA.length; i++) {
                    var str = KvLib.trsStrToStr(strA[i]);
                    array.push(str);
                }
                outObj.outValue = array;
                outObj.error_f = 0;
                return outObj;
            case 'numberArray2D':
                var strb;
                var strB;
                var arrbuf;
                strA = inputValue.split("\n");
                array = [];
                for (let i = 0; i < strA.length; i++) {
                    strb = strA[i].trim();
                    if (!strb.length)
                        continue;
                    arrbuf = [];
                    strB = strA[i].split(",");
                    for (let j = 0; j < strB.length; j++) {
                        num = KvLib.trsStrToNum(strB[j]);
                        if (Number.isNaN(num))
                            return outObj;
                        arrbuf.push(num);
                    }
                    array.push(arrbuf);
                }
                outObj.outValue = array;
                outObj.error_f = 0;
                return outObj;
            case 'freeArray2D':
            case 'stringArray2D':
                var strb;
                var strB;
                var arrbuf;
                strA = inputValue.split("\n");
                array = [];
                for (let i = 0; i < strA.length; i++) {
                    strb = strA[i].trim();
                    if (!strb.length)
                        continue;
                    arrbuf = [];
                    strB = strA[i].split(",");
                    for (let j = 0; j < strB.length; j++) {
                        str = KvLib.trsStrToStr(strB[j]);
                        arrbuf.push(str);
                    }
                    array.push(arrbuf);
                }
                outObj.outValue = array;
                outObj.error_f = 0;
                return outObj;
            case 'object':
                try {
                    outObj.outValue = JSON.parse(inputValue);
                    outObj.error_f = 0;
                } catch (error) {
                    outObj.error_f = 1;
                    outObj.outValue = {};
                }
                return outObj;
            case 'objectArray':
            case 'objectArray2D':
                try {
                    outObj.outValue = JSON.parse(inputValue);
                    if (!Array.isArray(outObj.outValue)) {
                        outObj.error_f = 1;
                        outObj.outValue = [];
                        return outObj;
                    }
                    outObj.error_f = 0;
                } catch (error) {
                    outObj.error_f = 1;
                    outObj.outValue = [];

                }
                return outObj;
        }
        return outObj;
    }

    static setStrA(orgStr, inx, value) {
        var strA = orgStr.split(/[ ,]+/);
        strA[inx] = value;
        var retStr = "";
        for (var i = 0; i < strA.length; i++) {
            if (i >= 1)
                retStr += " ";
            retStr += strA[i];
        }
        return retStr;
    }

    static valueToMemo(_dataType, _inputValue, _inType) {
        var inputValue = _inputValue;
        var inType = _inType;
        var dataType = _dataType;
        if (_inType === "json") {
            inputValue = JSON.parse(_inputValue);
            inType = "value";
        }
        var outObj = {error_f: 1, outValue: ""};
        switch (dataType) {
            case "direct":
            case "string":
            case "color":
            case "text":
            case 'userInput':
                outObj.outValue = inputValue;
                outObj.error_f = 0;
                return outObj;
            case 'number':
                if ((typeof inputValue) === "number") {
                    outObj.outValue = "" + inputValue;
                    outObj.error_f = 0;
                } else {
                    outObj.outValue = "0";
                    outObj.error_f = 1;
                }
                return outObj;
            case 'numberArray':
                if (inType === "editStr") {
                    outObj.outValue = inputValue;
                    outObj.error_f = 0;
                    return outObj;
                }
                outObj.error_f = 0;
                if (Array.isArray(inputValue)) {
                    var str = "";
                    for (var i = 0; i < inputValue.length; i++) {
                        if (i === 0) {
                        } else {
                            if (i % 20)
                                str += ",";
                            else
                                str += "\n";
                        }
                        if ((typeof inputValue[i]) !== "number") {
                            str += "---";
                            outObj.error_f = 1;
                        } else {
                            str += inputValue[i];
                        }
                    }
                    outObj.outValue = str;
                } else
                {
                    outObj.outValue = "";
                    outObj.error_f = 1;
                }
                return outObj;



            case 'freeArray':
            case 'imageUrls':
            case 'stringArray':
                outObj.error_f = 0;
                if (Array.isArray(inputValue)) {
                    var str = "";
                    for (var i = 0; i < inputValue.length; i++) {
                        if (i !== 0)
                            str += ",";
                        str += inputValue[i];
                    }
                    outObj.outValue = str;
                } else
                {
                    outObj.outValue = "";
                    outObj.error_f = 1;
                }
                return outObj;
            case 'longStringArray':
                outObj.error_f = 0;
                if (Array.isArray(inputValue)) {
                    var str = "";
                    for (var i = 0; i < inputValue.length; i++) {
                        if (i !== 0)
                            str += "\n";
                        str += inputValue[i];
                    }
                    outObj.outValue = str;
                } else
                {
                    outObj.outValue = "";
                    outObj.error_f = 1;
                }
                return outObj;

            case 'numberArray2D':
                outObj.error_f = 0;
                if (Array.isArray(inputValue)) {
                    var str = "";
                    for (var i = 0; i < inputValue.length; i++) {
                        if (i !== 0)
                            str += "\n";
                        var strB = inputValue[i];
                        if (Array.isArray(strB)) {
                            for (var j = 0; j < strB.length; j++) {
                                if (j !== 0)
                                    str += ",";
                                if ((typeof strB[j]) !== "number") {
                                    str += "0";
                                    outObj.error_f = 1;
                                } else {
                                    str += strB[j];
                                }

                            }
                        } else
                        {
                            str += "";
                            outObj.error_f = 1;
                        }
                    }
                    outObj.outValue = str;

                } else
                {
                    outObj.outValue = "";
                    outObj.error_f = 1;
                }
                return outObj;
            case 'freeArray2D':
            case 'stringArray2D':
                outObj.error_f = 0;
                if (Array.isArray(inputValue)) {
                    var str = "";
                    for (var i = 0; i < inputValue.length; i++) {
                        if (i !== 0)
                            str += "\n";
                        var strB = inputValue[i];
                        if (Array.isArray(strB)) {
                            for (var j = 0; j < strB.length; j++) {
                                if (j !== 0)
                                    str += ",";
                                str += strB[j];
                            }
                        } else
                        {
                            str += "";
                            outObj.error_f = 1;
                        }
                    }
                    outObj.outValue = str;

                } else
                {
                    outObj.outValue = "";
                    outObj.error_f = 1;
                }
                return outObj;
            case 'object':
            case 'objectArray':
            case 'objectArray2D':
                outObj.outValue = JSON.stringify(inputValue);
                outObj.error_f = 0;
                return outObj;
            default:
                return outObj;
        }
    }

    static getCursorPosition(e)
    {
        var posx = 0;
        var posy = 0;
        if (!e) {
            var e = window.event;
            if (!e)
                return;
        }
        if (e.pageX || e.pageY) {
            posx = e.pageX - document.documentElement.scrollLeft - document.body.scrollLeft;
            posy = e.pageY - document.documentElement.scrollTop - document.body.scrollTop;
        } else if (e.clientX || e.clientY) {//for fucking IE
            posx = e.clientX;//+ document.body.scrollLeft+ document.documentElement.scrollLeft;
            posy = e.clientY;//+ document.body.scrollTop + document.documentElement.scrollTop;
            //如果想取得目前的捲動值 就把後面的註解拿掉
        }
        return {x: posx, y: posy};//posx posy就是游標的X,Y值了
    }

    static getPosition(el) {
        var xPos = 0;
        var yPos = 0;
        while (el) {
            if (el.tagName === "rootBody") {
// deal with browser quirks with body/window/document and page scroll
                var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
                var yScroll = el.scrollTop || document.documentElement.scrollTop;
                xPos += (el.offsetLeft - xScroll + el.clientLeft);
                yPos += (el.offsetTop - yScroll + el.clientTop);
            } else {
// for all other non-BODY elements
                xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
                yPos += (el.offsetTop - el.scrollTop + el.clientTop);
            }

            el = el.offsetParent;
        }
        return {
            x: xPos,
            y: yPos
        };
    }

    static changeMarkerPosition(marker, lat, lng) {
        var latlng = new google.maps.LatLng(lat, lng);
        marker.setPosition(latlng);
    }

    static centerScreen(elem) {
        elem.style.left = ((window.innerWidth - elem.offsetWidth) / 2) + "px";
        elem.style.top = ((window.innerHeight - elem.offsetHeight) / 2) + "px";
    }

    static toHex(int) {
        var hex = int.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }

    static  watchFilter(inData, filterStr, sourceObj)
    {
        if (inData === null || inData === undefined) {
            return inData;
        }
        var outData = inData;
        try {
            eval(filterStr);
            return outData;
        } catch (e) {
            return inData;
        }
    }

    static toggle(flag)
    {
        if (flag)
            return false;
        else
            return true;
    }

    static toBoolean(obj)
    {
        if (obj)
            return true;
        else
            return false;
    }

    static trsIntStrToHexStr(_str, errRet) {
        var iv = KvLib.trsIntStrToInt(_str, errRet);
        if (iv === errRet)
            return errRet;
        return KvLib.trsIntToHexStr(iv);
    }
    static trsHexStrToIntStr(_str, errRet) {
        var iv = KvLib.trsHexStrToInt(_str, errRet);
        if (iv === errRet)
            return errRet;
        return "" + iv;
    }

    static trsIntStrToInt(_str, errRet) {
        str = "" + _str;
        var str = str.trim();
        if (str === "")
            return errRet;
        if (str.match(/^-?\d+$/)) {
            return parseInt(str, 10);
        } else if (_str.match(/^-?\d*\.\d+$/)) {
            //valid float
            return errRet;
        } else {
            return errRet;
        }
    }

    static trsFloatStrToFloat(_str, errRet) {
        str = "" + _str;
        var str = str.trim();
        if (str === "")
            return errRet;
        if (_str.match(/^-?\d*\.\d+$/)) {
            return parseFloat(str);
        } else {
            return errRet;
        }
    }

    static toFloat(_str, errRet) {
        str = "" + _str;
        var str = str.trim();
        if (str === "")
            return errRet;
        if (_str.match(/^-?\d*\.\d+$/)) {
            return parseFloat(str);
        } else {
            return errRet;
        }
    }

    static strToNumber(str, reti) {
        var retData = KvLib.strToInt(str, reti);
        if (retData !== reti)
            return retData;
        return retData = KvLib.strToFloat(str, reti);
    }

    static strToInt(_str, reti)
    {
        var intTbl = "-0123456789";
        var str = "" + _str;
        str = str.trim();
        if (str === "")
            return reti;
        var strA = str.split("");
        for (var i = 0; i < strA.length; i++) {
            if (strA[i] === "-" && i !== 0)
                return reti;
            if (!intTbl.includes(strA[i]))
                return reti;
        }
        var num = parseInt(str);
        if (!isNaN(num))
            return num;
        return reti;
    }

    static strToFloat(_str, reti)
    {
        var intTbl = "-0123456789";
        var str = "" + _str;
        str = str.trim();
        if (str === "")
            return reti;
        var strA = str.split("");
        var point_f = 0;
        for (var i = 0; i < strA.length; i++) {
            if (strA[i] === "-" && i !== 0)
                return reti;
            if (strA[i] === ".") {
                if (point_f)
                    return reti;
                point_f = 1;
                continue;
            }
            if (!intTbl.includes(strA[i]))
                return reti;
        }
        var num = parseFloat(str);
        if (!isNaN(num))
            return num;
        return reti;
    }

    static hexStrToInt(_str, errRet)
    {
        var str = "" + _str;
        str = str.trim();
        if (str === "")
            return errRet;
        var strA = str.split("");
        var head = 0;
        if (strA[0] === "0" && strA[1] === "x")
            head = 1;
        if (strA[0] === "0" && strA[1] === "X")
            head = 1;
        if (head)
            str = str.substring(2, strA.length);
        return KvLib.trsHexStrToInt(str, errRet);
    }

    static trsHexStrToInt(_str, errRet) {
        str = "" + _str;
        var str = str.trim();
        if (str === "")
            return errRet;
        var strHex = "0123456789abcdefABCDEF";
        var strA = str.split("");
        for (var i = 0; i < strA.length; i++) {
            if (strHex.includes(strA[i]))
                continue;
            return errRet;
        }
        var num = parseInt(str, 16);
        if (!isNaN(num))
            return num;
        return errRet;
    }

    static toInt(_str, reti)
    {
        str = "" + _str;
        var str = str.trim();
        if (str === "")
            return null;
        var strA = str.split("");

        if (strA[0] === '0' && strA[1] === 'x') {
            var num = parseInt(str, 16);
        } else {
            var num = parseInt(str);
        }
        if (!isNaN(num))
            return num;
        return reti;
    }

    static getScrollbarWidth() {
        var div = $('<div style="width:50px;height:50px;overflow:hidden;position:absolute;top:-200px;left:-200px;"><div style="height:100px;"></div>');
        $('body').append(div);
        var w1 = $('div', div).innerWidth();
        div.css('overflow-y', 'scroll');
        var w2 = $('div', div).innerWidth();
        $(div).remove();
        return (w1 - w2);
    }

    static getImageSize(_src, retFunc) {
        const img = new Image();
        img.onload = function () {
            var wh = "" + this.width + "x" + this.height;
            var obj = {w: this.width, h: this.height, wh: wh};
            KvLib.exeFunc(retFunc, obj);
        };
        img.src = _src;
    }
}

