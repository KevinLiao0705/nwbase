
/*
    0x2b,0x38 power on    
    0x2b,0x49 power off    
    0x2b,0x5a hv on    
    0x2b,0x6b hv off    
    0x2b,0x7c pulse on    
    0x2b,0x8d pulse off    
    0x2b,0x9e reset    
    0x2b,0x8e timer    
    0x2b,0x27 window arc    
    0x2b,0x13 twt arc     


*/


class NewTft15 {
    constructor() {
        /*
        rxbuf[0~31] 16ch a29 ad in
        rxbuf[32~34] outputFlag
        rxbuf[35~43] inputFlag rxbuf[36].0 xor
        rxbuf[44~45] errLedFlag
        rxbuf[63].0 101MenuSet_f
        if(rxMode=0)
            rxbuf[64~79] 8 word psA,psB value
        if(rxMode=1)
            rxbuf[64~69] a101 output setMode  6 bytes
            rxbuf[70~87] a101 output setMode  18 bytes
        if(rxMode=2)
            rxbuf[64~95] a109 adin page1
        if(rxMode=3)
            rxbuf[64~95] a109 adin page2
        if(rxMode=4)
            rxbuf[64~95] a109 adin page3
        if(rxMode=5)
            rxbuf[64~95] a109 adin threshold page1
        if(rxMode=6)
            rxbuf[64~95] a109 adin threshold page2
        if(rxMode=7)
            rxbuf[64~95] a109 adin threshold page3
        */

        gr.syncData = {};
        gr.syncData.a29AdA = [];
        for (var i = 0; i < 16; i++)
            gr.syncData.a29AdA.push(0);
        gr.syncData.outFlagA = [];
        for (var i = 0; i < 24; i++)
            gr.syncData.outFlagA.push(0);
        gr.syncData.inFlagA = [];
        for (var i = 0; i < 72; i++)
            gr.syncData.inFlagA.push(0);
        gr.syncData.outSetA = [];
        for (var i = 0; i < 24; i++)
            gr.syncData.outSetA.push(0);
        gr.syncData.inSetA = [];
        for (var i = 0; i < 72; i++)
            gr.syncData.inSetA.push(0);
        gr.syncData.errFlagA = [];
        for (var i = 0; i < 16; i++)
            gr.syncData.errFlagA.push(0);
        gr.syncData.psValueA = [];
        for (var i = 0; i < 8; i++)
            gr.syncData.psValueA.push(0);
        gr.syncData.a109ValueA = [];
        for (var i = 0; i < 48; i++)
            gr.syncData.a109ValueA.push(0);
        gr.syncData.a109SetA = [];
        for (var i = 0; i < 48; i++)
            gr.syncData.a109SetA.push(0);




        gr.socketRetPrgTbl["tick"] = function (sipphoneUiData) {
            var keys = Object.keys(sipphoneUiData);
            for (var i = 0; i < keys.length; i++) {
                var strA = keys[i].split("#");
                if (strA.length === 1) {
                    gr.sipphoneUiData[keys[i]] = sipphoneUiData[keys[i]];
                    continue;
                }
                if (strA.length === 2) {
                    var inx0 = KvLib.toInt(strA[1], 0);
                    gr.sipphoneUiData[strA[0]][inx0] = sipphoneUiData[keys[i]];
                    continue;
                }
            }
            gr.sipphoneUiData.rxed_f = 1;
            //console.log("sipphoneUiData");
        };


    }

    initOpts(md) {
        var self = this;
        var opts = {};
        opts.spFlag = 0;
        Block.setBaseOpts(opts);
        return opts;
    }

    chkWatch() {
        var self = this;
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        //ws.tick();


        var syncData = {};
        var rxbuf = syncData.rxbuf = [];
        for (var i = 0; i < 96; i++)
            rxbuf.push(0);

        /*
        rxbuf[0~31] 16ch a29 ad in
        rxbuf[32~34] outputFlag
        rxbuf[35~43] inputFlag rxbuf[36].0 xor
        rxbuf[44~45] errLedFlag
        rxbuf[63].0 101MenuSet_f
        if(rxMode=0)
            rxbuf[64~79] 8 word psA,psB value
        if(rxMode=1)
            rxbuf[64~69] a101 output setMode  6 bytes
            rxbuf[70~87] a101 output setMode  18 bytes
        if(rxMode=2)
            rxbuf[64~95] a109 adin page1
        if(rxMode=3)
            rxbuf[64~95] a109 adin page2
        if(rxMode=4)
            rxbuf[64~95] a109 adin page3
        if(rxMode=5)
            rxbuf[64~95] a109 adin threshold page1
        if(rxMode=6)
            rxbuf[64~95] a109 adin threshold page2
        if(rxMode=7)
            rxbuf[64~95] a109 adin threshold page3

        */




        st.ledv = [];
        for (var i = 0; i < 48; i++)
            st.ledv.push(0);
        st.butv = [];
        for (var i = 0; i < 14; i++)
            st.butv.push(0);
        st.butvt = [];
        for (var i = 0; i < 14; i++)
            st.butvt.push("");


        var bufA = [];
        for (var i = 0; i < 16; i++)
            bufA.push(0);
        var outputv = gr.syncData.outFlagA;
        var inputv = gr.syncData.inFlagA;

        bufA[0] = outputv[23] ^ 1;
        bufA[1] = outputv[20] ^ 1;
        bufA[2] = outputv[21] ^ 1;
        bufA[3] = outputv[19] ^ 1;
        bufA[4] = outputv[18] ^ 1;
        bufA[5] = outputv[15] ^ 1;
        bufA[6] = outputv[14] ^ 1;
        bufA[7] = outputv[4] ^ 1;
        bufA[8] = outputv[9] ^ 1;
        bufA[9] = outputv[6] ^ 1;
        bufA[10] = outputv[2] ^ 1;
        bufA[11] = outputv[3] ^ 1;
        bufA[12] = outputv[0] ^ 1;
        bufA[13] = outputv[5] ^ 1;

        for (var i = 0; i < 14; i++) {
            if (i >= 5 && i < 9) {
                if (bufA[i] === 0)
                    st.ledv[i] = 9;
                else
                    st.ledv[i] = 10;
            }
            else {
                if (bufA[i] === 0)
                    st.ledv[i] = 7;
                else
                    st.ledv[i] = 8;
            }
        }
        bufA[0] = outputv[16] ^ 0; // MODE
        bufA[1] = outputv[17] ^ 0; // BATTLE SHORT

        if (bufA[0] === 0) {
            st.butv[8] = "#080";
            st.butvt[8] = "遙控";
            if (gr.language === "english") {
                st.butvt[8] = "REMOTE";
            }
        }
        else {
            st.butv[8] = "#4f4";;
            st.butvt[8] = "本機";
            if (gr.language === "english") {
                st.butvt[8] = "LOCAL";
            }
        }

        if (bufA[1] === 0) {
            st.butv[9] = "#800";
            st.butvt[9] = "關";
            if (gr.language === "english")
                st.butvt[9] = "CLOSED";
        }
        else {
            st.butv[9] = "#f44";;
            st.butvt[9] = "開";
            if (gr.language === "english")
                st.butvt[9] = "OPEN";
        }

        if (op.spFlag === 1) {
            st.butvt[11] = "5:30保護<br>已開啟";
            if (gr.language === "english") {
                st.butvt[11] = "PROTECT<br>OPENED";
            }
        }
        else {
            st.butvt[11] = "5:30保護<br>已關閉";
            if (gr.language === "english") {
                st.butvt[11] = "PROTECT<br>CLOSED";
            }
        }

        var ledv_tbl = [47, 14, 16, 15, 17, 18, 19, 47,
            47, 21, 22, 23, 24, 25, 47, 20];
        for (i = 0; i < 16; i++) // rxbuf[12~13] 12bits assign to ledv[14~25]
        {
            if (gr.syncData.errFlagA[i])
                st.ledv[ledv_tbl[i]] = 10;
            else
                st.ledv[ledv_tbl[i]] = 5;
        }
        if (inputv[10] == 0) // filament fault
            st.ledv[26] = 10;
        else
            st.ledv[26] = 5; // 1:on  0:off
        if (outputv[22] == 1)
            st.ledv[26] = 5;
    }

    setPrg(id, setId) {
        var self = this;
        var md = self.md;
        var op = md.opts;
        var opts = {};

    }
    buttonClickFunc(iobj) {
        console.log(iobj);
        var md = iobj.kvObj.fatherMd;
        var op = md.opts;
        var opts = {};
        if (iobj.kvObj.name === "buttonA#0") {
            if (gr.language === "chineseT")
                gr.language = "english"
            else
                gr.language = "chineseT"
            gr.repaint_f = 1;
        }

        if (iobj.kvObj.name === "buttonA#1") {
            var opts = {};
            var kvObj = new Block("viewA101", "Model~ViewA101~base.sys0", opts);
            mda.popObj(9999, 9999, kvObj);
        }
        if (iobj.kvObj.name === "buttonA#10") {
            op.spFlag ^= 1;
        }







        if (iobj.kvObj.name === "buttonA#4") {
            var opts = {};
            opts.title = iobj.kvObj.opts.innerText;
            var kvObj = new Block("viewA109", "Model~ViewA109~base.sys0", opts);
            mda.popObj(9999, 9999, kvObj);
            return;

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
        layouts[cname] = { name: cname, type: "Layout~Ly_base~array.sys0", opts: opts };
        lyMaps["body"] = cname;
        var opts = {};
        md.setPns(opts);
        opts.borderWidth = 1;
        opts.borderColor = "#f00"
        opts.baseColor = "#cc0";
        blocks[cname] = { name: "basePanel", type: "Component~Cp_base~plate.none", opts: opts };
        //======================================    
        var cname = lyMaps["body"] + "~" + 0;
        var opts = {};
        opts.yArr = ["0.5rh", 9999];
        layouts[cname] = { name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts };
        opts.ym = 4;
        lyMaps["mainBody"] = cname;
        //==============================
        var cname = lyMaps["mainBody"] + "~" + 0;
        var opts = {};
        opts.baseColor = "#00a";
        opts.basePanel_f = 1;
        blocks[cname] = { name: "upPanel", type: "Component~Cp_base~plate.none", opts: opts };

        var cname = lyMaps["mainBody"] + "~" + 1;
        var opts = {};
        opts.baseColor = "#888";
        opts.basePanel_f = 1;
        blocks[cname] = { name: "downPanel", type: "Component~Cp_base~plate.none", opts: opts };

        var cname = lyMaps["mainBody"] + "~" + 0;
        var opts = {};
        opts.margin = 6;
        opts.xArr = [9999, "0.12rw"];
        layouts[cname] = { name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts };
        lyMaps["upBody"] = cname;
        //==============================
        var cname = lyMaps["upBody"] + "~" + 1;
        var opts = {};
        opts.yArr = ["0.08rh", "0.07rh", "0.03rh", 9999];
        layouts[cname] = { name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts };
        lyMaps["upR1Body"] = cname;
        //==============================
        var cname = lyMaps["upR1Body"] + "~" + 3;
        var opts = {};
        opts.yc = 6;
        opts.ym = 10;
        layouts[cname] = { name: cname, type: "Layout~Ly_base~array.sys0", opts: opts };
        lyMaps["upR2Body"] = cname;
        //==============================
        var cname = lyMaps["upR1Body"] + "~" + 0;
        var opts = {};
        opts.innerText = "1010113";
        opts.fontSize = "0.6rh";
        opts.borderWidth = 1;
        opts.borderColor = "#ff0";
        opts.baseColor = "#444";
        opts.innerTextColor = "#fff";
        blocks[cname] = { name: "upR1Panel#0", type: "Component~Cp_base~panel.sys0", opts: opts };

        var cname = lyMaps["upR1Body"] + "~" + 1;
        var opts = {};
        opts.innerText = "程式版本";
        if (gr.language === "english")
            opts.innerText = "VERSION";
        opts.fontSize = "0.5rh";
        opts.innerTextColor = "#fff";
        blocks[cname] = { name: "upR1Panel#1", type: "Component~Cp_base~plate.none", opts: opts };

        var buttonCnt = 0;
        var chTextA1 = ["英文顯示", "顯示 A101", "自　測", "表頭調校", "偵錯準位", "記錄資料"];
        if (gr.language === "english")
            chTextA1 = ["CHINESE", "DISP A101", "SELF TEST", "METER CAL", "THRESHOLD<br>VALUE ADJ", "RECORDS"];
        for (var i = 0; i < chTextA1.length; i++) {
            var cname = lyMaps["upR2Body"] + "~" + (i);
            var opts = {};
            opts.innerText = chTextA1[i];
            opts.baseColor = "#ff4";
            opts.fontSize = "0.4rh";
            opts.actionFunc = self.buttonClickFunc;
            blocks[cname] = { name: "buttonA#" + buttonCnt, type: "Component~Cp_base~button.sys0", opts: opts };
            buttonCnt++;
        }
        //=====================================================================

        var cname = lyMaps["upBody"] + "~" + 0;
        var opts = {};
        opts.yArr = [9999, "0.15rh", "0.08rh"];
        layouts[cname] = { name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts };
        lyMaps["upL1Body"] = cname;



        var cname = lyMaps["upL1Body"] + "~" + 0;
        var opts = {};
        opts.xArr = [9999, "0.08rw", "0.12rw"];
        layouts[cname] = { name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts };
        lyMaps["upL10Body"] = cname;

        //=====================================================================
        var cname = lyMaps["upL10Body"] + "~" + 0;
        var opts = {};
        opts.yArr = ["0.3rh", "0.1rh", 9999];
        opts.rm = 10;
        opts.tm = 0;
        opts.bm = 10;
        opts.ym = 2;
        layouts[cname] = { name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts };
        lyMaps["upL100Body"] = cname;

        var cname = lyMaps["upL100Body"] + "~" + 0;
        var opts = {};
        opts.xc = 3;
        opts.xm = 10;
        layouts[cname] = { name: cname, type: "Layout~Ly_base~array.sys0", opts: opts };
        lyMaps["upL1000Body"] = cname;

        var cname = lyMaps["upL100Body"] + "~" + 1;
        var opts = {};
        opts.xc = 3;
        opts.xm = 10;
        layouts[cname] = { name: cname, type: "Layout~Ly_base~array.sys0", opts: opts };
        lyMaps["upL1001Body"] = cname;

        var cname = lyMaps["upL100Body"] + "~" + 2;
        var opts = {};
        opts.xArr = [9999, "0.3rw"];
        layouts[cname] = { name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts };
        lyMaps["upL1002Body"] = cname;


        var cname = lyMaps["upL1002Body"] + "~" + 1;
        var opts = {};
        opts.xc = 3;
        opts.yc = 5;
        opts.tm = 20
        opts.bm = 20
        layouts[cname] = { name: cname, type: "Layout~Ly_base~array.sys0", opts: opts };
        lyMaps["upL10021Body"] = cname;

        var meterCnt = 0

        for (var i = 0; i < 3; i++) {
            var cname = lyMaps["upL1000Body"] + "~" + i;
            var opts = {};
            opts.innerText = "123.4";
            opts.fontSize = "0.9rh";
            opts.baseColor = "#0ff";
            opts.innerTextColor = "#000";
            opts.textShadow = "2px 2px 2px #fff";
            blocks[cname] = { name: "meterA#" + meterCnt, type: "Component~Cp_base~images.lcd", opts: opts };
            meterCnt++;
        }

        var chTextA0 = ["陰極電壓(KV)", "集極電壓(KV)", "轉換電源電壓(V)"];
        if (gr.language === "english")
            chTextA0 = ["BEAN VOLT(KV)", "COLL VOLT(KV)", "HV INVERT VOLT(V)"];
        for (var i = 0; i < 3; i++) {
            var cname = lyMaps["upL1001Body"] + "~" + i;
            var opts = {};
            opts.innerText = chTextA0[i];
            opts.innerTextColor = "#fff";
            opts.textShadow = "2px 2px 2px #000";
            opts.fontSize = "0.7rh";
            opts.rm = 10;
            blocks[cname] = { name: "upL1001Body#" + i, type: "Component~Cp_base~plate.none", opts: opts };
        }



        var cname = lyMaps["upL1002Body"] + "~" + 0;
        var opts = {};
        opts.innerText = "中 山 科 學 研 究 院<br>發 射 機 顯 控 面 板";
        opts.innerTextColor = "#fff";
        opts.textShadow = "2px 2px 2px #000";
        opts.fontSize = "0.9rh";
        opts.tpd = "0.3rh";
        opts.bpd = "0.3rh";
        opts.innerTextColor = "#FFC107";

        blocks[cname] = { name: "upL1002Body#" + 0, type: "Component~Cp_base~plate.none", opts: opts };


        for (var i = 0; i < 15; i++) {
            var cname = lyMaps["upL10021Body"] + "~" + i;
            if (i === 12)
                continue;
            if ((i % 3) === 0 || (i > 12)) {
                var opts = {};
                if (i === 0)
                    opts.innerText = "+5V";
                if (i === 3)
                    opts.innerText = "+15V";
                if (i === 6)
                    opts.innerText = "-15V";
                if (i === 9)
                    opts.innerText = "+25V";
                if (i === 13) {
                    opts.innerText = "直流電源B";
                    if (gr.language === "english")
                        opts.innerText = "DC PSB";
                }
                if (i === 14) {
                    opts.innerText = "直流電源A";
                    if (gr.language === "english")
                        opts.innerText = "DC PSA";
                }

                opts.innerTextColor = "#fff";
                opts.textShadow = "1px 1px 1px #000";
                opts.fontSize = "0.5rh";
                if (i < 12) {
                    opts.rm = 6;
                    opts.textAlign = "right";
                }
                blocks[cname] = { name: "upL10021Body#" + i, type: "Component~Cp_base~plate.none", opts: opts };
                continue;
            }


            var opts = {};
            opts.innerText = "123.4";
            opts.fontSize = "0.9rh";
            opts.baseColor = "#FFC107";
            opts.innerTextColor = "#000";
            opts.textShadow = "2px 2px 2px #fff";
            blocks[cname] = { name: "meterA#" + meterCnt, type: "Component~Cp_base~images.lcd", opts: opts };
            meterCnt++;
        }



        //=====================================================================
        var cname = lyMaps["upL10Body"] + "~" + 1;
        var opts = {};
        opts.yArr = ["0.11rh", "0.06rh", "0.112rh", "0.112rh", "0.112rh", "0.06rh", "0.02rh", "0.112rh", "0.112rh", "0.112rh", "0.06rh", 9999];
        opts.rm = 10;
        opts.tm = 0;
        opts.bm = 10;
        opts.ym = 2;
        layouts[cname] = { name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts };
        lyMaps["upL101Body"] = cname;

        var cname = lyMaps["upL10Body"] + "~" + 2;
        var opts = {};
        opts.yArr = ["0.11rh", "0.06rh", "0.112rh", "0.112rh", "0.112rh", "0.06rh", "0.02rh", "0.112rh", "0.112rh", "0.112rh", "0.06rh", 9999];
        opts.rm = 10;
        opts.tm = 0;
        opts.bm = 10;
        opts.ym = 2;
        layouts[cname] = { name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts };
        lyMaps["upL102Body"] = cname;




        for (var i = 0; i < 11; i++) {
            var cname = lyMaps["upL101Body"] + "~" + i;
            if (i === 1 || i === 6)
                continue;
            if (i === 5 || i === 10) {
                continue;
            }
            var opts = {};
            if (i === 0) {
                opts.innerText = "工作比";
                if (gr.language === "english")
                    opts.innerText = "DUTY";
            }
            if (i === 2)
                opts.innerText = "A-B";
            if (i === 3)
                opts.innerText = "B-C";
            if (i === 4)
                opts.innerText = "C-A";
            if (i === 7)
                opts.innerText = "A";
            if (i === 8)
                opts.innerText = "B";
            if (i === 9)
                opts.innerText = "C";
            opts.fontSize = "0.5rh";
            opts.innerTextColor = "#fff";
            opts.textAlign = "right";
            opts.textShadow = "2px 2px 2px #000";
            blocks[cname] = { name: "upL101#" + i, type: "Component~Cp_base~plate.none", opts: opts };
        }




        for (var i = 0; i < 11; i++) {
            var cname = lyMaps["upL102Body"] + "~" + i;
            if (i === 1 || i === 6)
                continue;
            if (i === 5 || i === 10) {
                var opts = {};
                if (i === 5) {
                    opts.innerText = "三相電壓(V)";
                    if (gr.language === "english")
                        opts.innerText = "3@AC V";
                }
                if (i === 10) {
                    opts.innerText = "三相電流(A)";
                    if (gr.language === "english")
                        opts.innerText = "3@AC I";
                }

                opts.fontSize = "0.9rh";
                opts.innerTextColor = "#fff";
                opts.textShadow = "2px 2px 2px #000";
                blocks[cname] = { name: "upL102#" + i, type: "Component~Cp_base~plate.none", opts: opts };
                continue;
            }
            var opts = {};
            opts.innerText = "123.4";
            opts.fontSize = "0.9rh";
            if (i !== 0)
                opts.baseColor = "#ff44ff";
            else
                opts.baseColor = "#afa";
            opts.innerTextColor = "#000";
            opts.textShadow = "2px 2px 2px #fff";
            blocks[cname] = { name: "meterA#" + meterCnt, type: "Component~Cp_base~images.lcd", opts: opts };
            meterCnt++;
        }











        var cname = lyMaps["upL1Body"] + "~" + 1;
        var opts = {};
        opts.xc = 5;
        opts.xm = 10;
        layouts[cname] = { name: cname, type: "Layout~Ly_base~array.sys0", opts: opts };
        lyMaps["upL11Body"] = cname;

        var cname = lyMaps["upL1Body"] + "~" + 2;
        var opts = {};
        opts.xc = 5;
        opts.xm = 10;
        layouts[cname] = { name: cname, type: "Layout~Ly_base~array.sys0", opts: opts };
        lyMaps["upL12Body"] = cname;
        //==============================

        for (var i = 0; i < 5; i++) {
            var cname = lyMaps["upL11Body"] + "~" + i;
            var opts = {};
            opts.innerText = "123.4";
            opts.fontSize = "0.9rh";
            opts.baseColor = "#0ff";
            opts.innerTextColor = "#000";
            opts.textShadow = "2px 2px 2px #fff";
            opts.rm = 10;
            blocks[cname] = { name: "meterA#" + meterCnt, type: "Component~Cp_base~images.lcd", opts: opts };
            meterCnt++;
        }

        var chTextA2 = ["峰值陰極電流(A)", "峰值體電流(A)", "調節器電壓(KV)", "真空離子電壓(KV)", "真空離子電流(uA)"];
        if (gr.language === "english")
            chTextA2 = ["PEAK BEAM<br>CURRENT(I)", "PEAK BODY<br>CURRENT(I)", "REG VOLT(KV)", "VAC-ION<br>VOLT(KV)", "VAC-ION<br>CURRENT(uA)"];

        for (var i = 0; i < 5; i++) {
            var cname = lyMaps["upL12Body"] + "~" + i;
            var opts = {};
            opts.innerText = chTextA2[i];
            opts.innerTextColor = "#fff";
            opts.textShadow = "2px 2px 2px #000";
            opts.fontSize = "0.50rh";
            opts.rm = 10;
            blocks[cname] = { name: "upL12Button#" + i, type: "Component~Cp_base~plate.none", opts: opts };
        }

        //======================================================================================================
        var cname = lyMaps["mainBody"] + "~" + 1;
        var opts = {};
        opts.yArr = ["0.08rh", "0.15rh", "0.09rh", "0.02rh", "0.15rh", "0.09rh", "0.15rh", "0.02rh", "0.1rh", "0.08rh", 9999];
        opts.margin = 6;
        layouts[cname] = { name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts };
        lyMaps["downBody"] = cname;
        //===========================================
        var cname = lyMaps["downBody"] + "~" + 0;
        var opts = {};
        opts.xArr = ["0.026rw", "0.107rw", "0.14rw", "0.141rw", "0.120rw", 9999];
        layouts[cname] = { name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts };
        lyMaps["downBody0"] = cname;

        var chB0 = ["電源", "高壓", "脈波", "操作模式", "戰備短路"];
        if (gr.language === "english")
            chB0 = ["POW", "HVP", "PLS", "MODE", "BAT SHT"];
        for (var i = 0; i < 5; i++) {
            var cname = lyMaps["downBody0"] + "~" + (i + 1);
            var opts = {};
            opts.innerText = chB0[i];
            opts.innerTextColor = "#fff";
            opts.textShadow = "2px 2px 2px #000";
            opts.fontSize = "0.8rh";
            opts.textAlign = "left";
            blocks[cname] = { name: "upL12Button#" + i, type: "Component~Cp_base~plate.none", opts: opts };
        }
        //===========================================
        var cname = lyMaps["downBody"] + "~" + 1;
        var opts = {};
        opts.xArr = ["0.02rw", "0.06rw", "0.01rw", "0.06rw", "0.01rw", "0.06rw", "0.01rw", "0.06rw", "0.01rw", "0.06rw"];
        opts.xArr.push("0.05rw", "0.1rw", "0.02rw", "0.1rw", "0.05rw");
        opts.xArr.push("0.06rw", "0.01rw", "0.06rw", "0.01rw", "0.06rw", "0.01rw", "0.06rw", "0.02rw")
        opts.xArr.push(9999);
        layouts[cname] = { name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts };
        lyMaps["downBody1"] = cname;
        var ledInx = 0;
        for (var i = 0; i < 11; i++) {
            var cname = lyMaps["downBody1"] + "~" + (i * 2 + 1);
            var opts = {};
            if (i === 5 || i === 6) {
                opts.margin = 2;
                opts.borderColor = "#000";
                opts.borderWidth = 2;
                opts.fontSize = "0.4rh";
                var regName0 = "self.fatherMd.stas.butv#" + (i + 3);//butv[8][9]
                var regName1 = "self.fatherMd.stas.butvt#" + (i + 3);//butv[8][9]
                Block.setInputWatch(opts, "directReg", regName0, "baseColor", 1);
                Block.setInputWatch(opts, "directReg", regName1, "innerText", 1);
                blocks[cname] = { name: "ledA#" + i, type: "Component~Cp_base~label.sys0", opts: opts };
                continue;
            }
            opts.fontSize = "0.9rh";
            var regName = "self.fatherMd.stas.ledv#";
            Block.setInputWatch(opts, "directReg", regName + ledInx, "backgroundInx", 1);
            blocks[cname] = { name: "ledA#" + i, type: "Component~Cp_base~icons.led", opts: opts };
            ledInx++;
        }
        //================
        var cname = lyMaps["downBody"] + "~" + 2;
        var opts = {};
        opts.xArr = ["0.02rw", "0.06rw", "0.01rw", "0.06rw", "0.01rw", "0.06rw", "0.01rw", "0.06rw", "0.01rw", "0.06rw"];
        opts.xArr.push("0.05rw", "0.1rw", "0.02rw", "0.1rw", "0.05rw");
        opts.xArr.push("0.06rw", "0.01rw", "0.06rw", "0.01rw", "0.06rw", "0.01rw", "0.06rw", "0.02rw")
        opts.xArr.push(9999);
        layouts[cname] = { name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts };
        lyMaps["downBody2"] = cname;
        var chB1 = ["啟動", "預備", "啟動", "致能", "啟動", "", ""];
        chB1.push("故障", "短撬開關<br>觸發", "離子電流<br>過高", "脈波");//
        if (gr.language === "english") {
            var chB1 = ["ON", "RDY", "ON", "EN", "ON", "", ""];
            chB1.push("FAULT", "CROWBAR<br>FIRED", "HI-ION<br>CURRENT", "RAD ON");
        }


        for (var i = 0; i < 11; i++) {
            var cname = lyMaps["downBody2"] + "~" + (i * 2 + 1);
            var opts = {};
            if (i !== 5 && i !== 6) {
                opts.innerText = chB1[i];
                opts.innerTextColor = "#fff";
                opts.textShadow = "2px 2px 2px #000";
                opts.fontSize = "0.5rh";
                if (i === 8 || i === 9) {
                    opts.fontSize = "0.4rh";
                }
                opts.bpd = 8;
                blocks[cname] = { name: "downLabelA#" + i, type: "Component~Cp_base~plate.none", opts: opts };
                continue;
            }
        }
        //===========================================
        var cname = lyMaps["downBody"] + "~" + 4;
        var opts = {};
        opts.xArr = ["0.009rw", "0.08rw", "0.02rw", "0.09rw", "0.05rw", "0.09rw", "0.07rw"];
        opts.xArr.push("0.10rw", "0.022rw", "0.10rw", "0.018rw");
        opts.xArr.push("0.06rw", "0.01rw", "0.06rw", "0.01rw", "0.06rw", "0.01rw", "0.06rw", "0.01rw", "0.06rw")
        opts.xArr.push(9999);
        layouts[cname] = { name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts };
        lyMaps["downBody4"] = cname;
        var chB1 = ["開啟", "開啟", "開啟", "備用", "暖機"];
        if (gr.language === "english")
            chB1 = ["ON", "ON", "ON", "SPARE", "CLOSED"];
        var ledInx = 9;
        for (var i = 0; i < 10; i++) {
            var cname = lyMaps["downBody4"] + "~" + (i * 2 + 1);
            var opts = {};
            if (i <= 4) {
                opts.margin = 2;
                opts.borderColor = "#000";
                opts.borderWidth = 2;
                opts.baseColor = "#faa";
                opts.innerText = chB1[i];
                opts.fontSize = "0.4rh";
                if (i > 2) {
                    opts.baseColor = "#ff0";
                }
                opts.actionFunc = self.buttonClickFunc;
                if (i === 4) {
                    var regName = "self.fatherMd.stas.butvt#11";
                    Block.setInputWatch(opts, "directReg", regName, "innerText", 1);
                }
                blocks[cname] = { name: "buttonA#" + buttonCnt, type: "Component~Cp_base~button.sys0", opts: opts };
                buttonCnt++;
                continue;
            }
            opts.fontSize = "0.9rh";
            opts.backgroundInx = 8;
            var regName = "self.fatherMd.stas.ledv#";
            Block.setInputWatch(opts, "directReg", regName + ledInx, "backgroundInx", 1);
            blocks[cname] = { name: "ledB#" + i, type: "Component~Cp_base~icons.led", opts: opts };
            ledInx++;
        }

        //===========================================
        var cname = lyMaps["downBody"] + "~" + 5;
        var opts = {};
        opts.xArr = ["0.009rw", "0.08rw", "0.02rw", "0.09rw", "0.05rw", "0.09rw", "0.07rw"];
        opts.xArr.push("0.10rw", "0.022rw", "0.10rw", "0.018rw");
        opts.xArr.push("0.06rw", "0.01rw", "0.06rw", "0.01rw", "0.06rw", "0.01rw", "0.06rw", "0.01rw", "0.06rw")
        opts.xArr.push(9999);
        layouts[cname] = { name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts };
        lyMaps["downBody5"] = cname;

        var chB1 = ["", "", "", "暖機計時", "", "微波測試<br>負載", "門鎖", "外門鎖", "次系統<br>正常", "冷卻系統<br>正常"];
        if (gr.language === "english") {
            chB1 = ["", "", "", "WARM TIM", "", "RF TEST<br>LOAD", "DOOR<br>INTLK", "EX<br>INTLK", "SUB SYS<br>NORMAL", "COOL<br>NORMAL"];
        }
        for (var i = 0; i < 10; i++) {
            var cname = lyMaps["downBody5"] + "~" + (i * 2 + 1);
            var opts = {};
            opts.innerText = chB1[i];
            opts.innerTextColor = "#fff";
            opts.textShadow = "2px 2px 2px #000";
            opts.fontSize = "0.4rh";
            if (i === 3) {
                opts.tm = 10;
                opts.fontSize = "0.6rh";
            }
            blocks[cname] = { name: "downLabelB#" + i, type: "Component~Cp_base~plate.none", opts: opts };
        }


        //===========================================
        var cname = lyMaps["downBody"] + "~" + 6;
        var opts = {};
        opts.xArr = ["0.009rw", "0.08rw", "0.02rw", "0.09rw", "0.05rw", "0.09rw", "0.07rw"];
        opts.xArr.push("0.10rw", "0.022rw", "0.10rw", "0.018rw");
        opts.xArr.push("0.06rw", "0.01rw", "0.06rw", "0.01rw", "0.06rw", "0.01rw", "0.06rw", "0.01rw", "0.06rw")
        opts.xArr.push(9999);
        layouts[cname] = { name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts };
        lyMaps["downBody6"] = cname;
        var chB1 = ["關閉", "關閉", "關閉", "", "故障重置"];
        if (gr.language === "english")
            chB1 = ["OFF", "OFF", "OFF", "", "FAULT<br>RST"];
        for (var i = 0; i < 5; i++) {
            var cname = lyMaps["downBody6"] + "~" + (i * 2 + 1);
            var opts = {};

            if (i === 3) {
                opts.innerText = "123.4";
                opts.fontSize = "0.6rh";
                opts.baseColor = "#0ff";
                opts.innerTextColor = "#000";
                opts.textShadow = "2px 2px 2px #fff";
                blocks[cname] = { name: "meterA#" + meterCnt, type: "Component~Cp_base~images.lcd", opts: opts };
                meterCnt++;
                continue;

            }
            opts.margin = 2;
            opts.borderColor = "#000";
            opts.borderWidth = 2;
            opts.baseColor = "#888";
            opts.innerText = chB1[i];
            opts.fontSize = "0.4rh";
            if (i > 2) {
                opts.baseColor = "#ff0";
            }
            opts.actionFunc = self.buttonClickFunc;
            blocks[cname] = { name: "buttonA#" + buttonCnt, type: "Component~Cp_base~button.sys0", opts: opts };
            buttonCnt++;
        }

        //=============================
        var cname = lyMaps["downBody"] + "~" + 8;
        var opts = {};
        opts.xc = 13;
        layouts[cname] = { name: cname, type: "Layout~Ly_base~array.sys0", opts: opts };
        lyMaps["downBody8"] = cname;
        var chB1 = ["行波管<br>電弧", "平均<br>體電流", "脈波<br>過寬", "偏壓<br>過低", "高壓<br>過高", "燈絲電壓<br>低低", "高壓電流<br>過大", "高壓<br>過低", "峰值<br>體電流", "導波管<br>電弧", "工作比<br>過大", "駐波比<br>過高", "真空離子<br>電流"];
        if (gr.language === "english")
            chB1 = ["TWT<br>ARC", "AVG<br>BODY I", "PLS<br>WIDE", "BIAS<br>LOW", "HVP<br>HIGH", "FILAMENT", "HVP I<br>HIGH", "HVP<br>LOW", "PEAK BODY<br>I HIGH", "WINDOW<br>ARC", "DUTY<br>HIGH", "VSWR<br>HIGH", "VAC-ION<br>CURRENT"];

        for (var i = 0; i < 13; i++) {
            var cname = lyMaps["downBody8"] + "~" + i;
            var opts = {};
            opts.innerText = chB1[i];
            opts.innerTextColor = "#fff";
            opts.textShadow = "2px 2px 2px #000";
            opts.fontSize = "0.4rh";
            if (gr.language === "english") {
                opts.fontSize = "0.35rh";
                opts.tpd = 10;
            }
            blocks[cname] = { name: "downLabelC#" + i, type: "Component~Cp_base~plate.none", opts: opts };
        }

        //=============================
        var cname = lyMaps["downBody"] + "~" + 9;
        var opts = {};
        opts.xc = 13;
        layouts[cname] = { name: cname, type: "Layout~Ly_base~array.sys0", opts: opts };
        lyMaps["downBody9"] = cname;
        var ledTbl = [14, 15, 16, 17, 18, 19, 26,
            20, 21, 22, 23, 24, 25];
        for (var i = 0; i < 13; i++) {
            var cname = lyMaps["downBody9"] + "~" + i;
            var opts = {};
            opts.backgroundInx = 5;
            var regName = "self.fatherMd.stas.ledv#" + ledTbl[i];
            Block.setInputWatch(opts, "directReg", regName, "backgroundInx", 1);
            blocks[cname] = { name: "ledD#" + i, type: "Component~Cp_base~icons.led", opts: opts };
        }

        var cname = lyMaps["downBody"] + "~" + 10;
        var opts = {};
        opts.xArr = ["0.385rw", "0.155rw", "0.46rw", 9999];
        layouts[cname] = { name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts };
        lyMaps["downBody10"] = cname;
        var chB3 = ["└─────────── 短撬觸發故障 ───────────┘", "└─ 高壓抑制故障 ─┘", "└────────────── 脈波抑制故障 ──────────────┘"];
        if (gr.language === "english")
            chB3 = ["└────────── CROWBAR FAULT  ─────────┘", "└─  HV FAULT   ─┘", "└───────────── PLS INH FAULT ─────────────┘"];

        for (var i = 0; i < 3; i++) {
            var cname = lyMaps["downBody10"] + "~" + (i);
            var opts = {};
            opts.innerText = chB3[i];
            opts.innerTextColor = "#fff";
            opts.textShadow = "2px 2px 2px #000";
            opts.fontSize = "0.6rh";
            //opts.textAlign="left";
            blocks[cname] = { name: "downLabelC#" + i, type: "Component~Cp_base~plate.none", opts: opts };
        }
        return;
    }

}




class ViewA101 {
    constructor() {
    }

    initOpts(md) {
        var self = this;
        var opts = {};
        opts.setF = 0;
        var rxData = opts.rxData = {};



        rxData.statusCnt = 4;
        rxData.rxCnt = 0;
        rxData.inputTA = []
        rxData.inputVA = []
        rxData.inputFA = []
        rxData.outputTA = [];//0 green 1:red 2:yellow
        rxData.outputVA = []
        rxData.outputFA = []

        for (var i = 0; i < 66; i++) {
            rxData.inputTA[i] = 0;
            rxData.inputVA[i] = 0;
            rxData.inputFA[i] = i & 3;
        }


        for (var i = 0; i < 24; i++) {
            rxData.outputTA[i] = 0;
            rxData.outputVA[i] = 0;
            rxData.outputFA[i] = i & 3;
        }
        var redA = [10, 11, 30, 38, 57, 58, 63]
        for (var i = 0; i < redA.length; i++) {
            rxData.inputTA[redA[i]] = 1;
        }
        var redA = [7, 8, 14, 36, 37, 43, 44, 48, 54, 55, 56, 60, 61, 62]
        for (var i = 0; i < redA.length; i++) {
            rxData.inputTA[redA[i]] = 2;
        }
        var redA = [4, 14, 15]
        for (var i = 0; i < redA.length; i++) {
            rxData.outputTA[redA[i]] = 1;
        }
        var redA = [6, 7, 9, 13, 16, 17]
        for (var i = 0; i < redA.length; i++) {
            rxData.outputTA[redA[i]] = 2;
        }



        opts.inputTextA = [
            "外門鎖備用1", "外門鎖備用2", "BSC 致能", "短撬開關預備", "低壓短路開關", "螺管電壓",
            "無故障", "負載", "天線", "離子電源", "燈絲電壓", "偏壓",
            "+25V 電源B", "+15V 電源B", "輻射啟動", "後級放大左門鎖", "後級放大右門鎖", "高壓短路開關",
            "柵極電壓", "+5V 電源B", "高壓控制器", "高壓控制器水流", "高壓櫃左門鎖", "高壓櫃右門鎖",
            "+25V 電源A", "+15V 電源A", "-15V 電源B", "高壓櫃上方水流", "高壓櫃下方水流", "行波管氣流",
            "脈波抑制", "+5V 電源A", "-15V 電源A", "矽控整流器水流", "微波負載水流", "後級放大溫度",
            "遙控重置", "微波負載", "高壓抑制", "行波管水流", "微波隔離器水流", "降壓開關水流",
            "正常模式", "戰備短路", "本機重置", "高壓箱櫃氣溫", "變壓器水流", "扼流器水流",
            "遙控", "燈絲半載", "待命模式", "水流溫度", "高壓箱櫃濕度", "後級放大氣溫",
            "高壓關閉", "脈波開啟", "脈波關閉", "高壓過低", "高壓過高", "導波管壓力",
            "電源開啟", "電源關閉", "高壓開啟", "短撬開關觸發", "離子電流備用", "離子電流"
        ];

        opts.inputTextB = [
            "EXT INT1", "EXT INT2", "BSC EN", "CB RDY", "LU SW", "SOL",
            "NOT FLT", "LOAD", "ANT", "ION PS", "FIL", "BIAS",
            "+25V PSB", "-15V PSB", "RAD ON", "PA DIL", "PA DIR", "HV SW",
            "GRID", "+5V PSB", "HUC", "HUC AF", "HU DIL", "HU DIR",
            "+25V PSA", "+15V PSA", "-15V PSB", "HVUP AF", "HVDN AF", "TWT AF",
            "PLS INH", "+5V PSA", "-15V PSA", "SCR WF", "MW WF", "PA HUM",
            "REM RST", "RF LOAD", "HV INH", "TWT WF", "ISO WF", "BUCK WF",
            "NORMAL", "BAT SHRT", "LOC RST", "HV AT", "XFMR WF", "CHK WF",
            "REMOTE", "KA MODE", "STANDBY", "WT", "HV HUM", "PA AT",
            "HV OFF", "PLS ON", "PLS OFF", "HV LOW", "HV HI", "WG PRES",
            "PWR ON", "PWR OFF", "HV ON", "CB FIRD", "ION I SP", "ION I",
        ];


        opts.outputTextA = [
            "天線系統", "低壓致能",
            "門鎖", "外門鎖",
            "離子電流", "冷卻系統",
            "負載", "天線",
            "燈絲半載", "輻射啟動",
            "正常模式", "待命模式",
            "偵錯邏輯致能", "無重置",
            "短撬開關觸發", "故障",
            "本機模式", "戰備短路",
            "脈波啟動", "脈波致能",
            "高壓預備", "高壓啟動",
            "電源致能", "電源啟動"
        ];

        opts.outputTextB = [
            "SUB SYS", "LVPS EN",
            "DR INT", "EXT INT",
            "ION I", "COOLING",
            "LOAD", "ANT",
            "KA MODE", "RAD ON",
            "NORMAL", "STANDBY",
            "F/L EN", "NOT RST",
            "CB FIRD", "FAULT",
            "LOCAL", "BAT SHRT",
            "PLS ON", "PLS EN",
            "HV RDY", "HV ON",
            "PWR EN", "PWR ON"
        ];


        Block.setBaseOpts(opts);
        return opts;
    }

    chkWatch() {
        var self = this;
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        st.textA = [];
        st.baseColorA = [];
        st.fontColorA = [];
        for (var i = 0; i < 96; i++) {
            st.textA.push(null);
            st.baseColorA.push("#0f0");
            st.fontColorA.push("#000");
        }
        var rxData = op.rxData;
        rxData.rxCnt++;
        //====================

        /*
        for (var i = 0; i < 66; i++) {
            rxData.inputVA[i] = (rxData.rxCnt / 100) & 1;
        }
        for (var i = 0; i < 24; i++) {
            rxData.outputVA[i] = (rxData.rxCnt / 100) & 1;
        }
        */



        var chA = ["電源關閉", "電源啟動", "高壓預備", "脈波致能", "脈波啟動", "輻射啟動", "", ""]
        var chB = ["POWER OFF", "POWER ON", "HV RDY", "PLS EN", "PLS ON", "RAD ON", "", ""]



        st.textA[1] = chA[rxData.statusCnt];
        if (gr.language === "english")
            st.textA[1] = chB[rxData.statusCnt];
        st.textA[2] = "RX: " + ((rxData.rxCnt / 4) | 0) % 10;
        var inpInx = 0;
        for (var i = 0; i < 11; i++) {
            for (var j = 0; j < 6; j++) {
                var segInx = i * 8 + j + 8;
                if (rxData.inputTA[inpInx] === 0) {
                    st.baseColorA[segInx] = "#040";
                    st.fontColorA[segInx] = "#ccc";
                    if (rxData.inputVA[inpInx] === 1) {
                        st.baseColorA[segInx] = "#0f0";
                        st.fontColorA[segInx] = "#000";
                    }
                }
                if (rxData.inputTA[inpInx] === 1) {
                    st.baseColorA[segInx] = "#400";
                    st.fontColorA[segInx] = "#ccc";
                    if (rxData.inputVA[inpInx] === 1) {
                        st.baseColorA[segInx] = "#f00";
                        st.fontColorA[segInx] = "#000";
                    }
                }
                if (rxData.inputTA[inpInx] === 2) {
                    st.baseColorA[segInx] = "#440";
                    st.fontColorA[segInx] = "#ccc";
                    if (rxData.inputVA[inpInx] === 1) {
                        st.baseColorA[segInx] = "#ff0";
                        st.fontColorA[segInx] = "#000";
                    }
                }

                var text = op.inputTextA[inpInx];
                if (gr.language === "english")
                    text = op.inputTextB[inpInx];

                if (rxData.inputFA[inpInx] === 3)
                    text += "";
                if (rxData.inputFA[inpInx] === 2)
                    text += "<br>ON";
                if (rxData.inputFA[inpInx] === 1)
                    text += "<br>OFF";
                if (rxData.inputFA[inpInx] === 0)
                    text += "<br>XOR";
                st.textA[segInx] = text;
                if (op.setF === 1) {
                    st.fontColorA[segInx] = "#04f";
                }
                inpInx++;
            }
        }

        var outpInx = 0;
        for (var i = 0; i < 12; i++) {
            for (var j = 0; j < 2; j++) {
                var segInx = i * 8 + j + 6;
                if (rxData.outputTA[outpInx] === 0) {
                    st.baseColorA[segInx] = "#040";
                    st.fontColorA[segInx] = "#ccc";
                    if (rxData.outputVA[outpInx] === 1) {
                        st.baseColorA[segInx] = "#0f0";
                        st.fontColorA[segInx] = "#000";
                    }
                }
                if (rxData.outputTA[outpInx] === 1) {
                    st.baseColorA[segInx] = "#400";
                    st.fontColorA[segInx] = "#ccc";
                    if (rxData.outputVA[outpInx] === 1) {
                        st.baseColorA[segInx] = "#f00";
                        st.fontColorA[segInx] = "#000";
                    }
                }
                if (rxData.outputTA[outpInx] === 2) {
                    st.baseColorA[segInx] = "#440";
                    st.fontColorA[segInx] = "#ccc";
                    if (rxData.outputVA[outpInx] === 1) {
                        st.baseColorA[segInx] = "#ff0";
                        st.fontColorA[segInx] = "#000";
                    }
                }
                var text = op.outputTextA[outpInx];
                if (gr.language === "english")
                    text = op.outputTextB[outpInx];


                if (rxData.outputFA[outpInx] === 3)
                    text += "";
                if (rxData.outputFA[outpInx] === 2)
                    text += "<br>ON";
                if (rxData.outputFA[outpInx] === 1)
                    text += "<br>OFF";
                if (rxData.outputFA[outpInx] === 0)
                    text += "<br>XOR";
                st.textA[segInx] = text;
                if (op.setF === 1) {
                    st.fontColorA[segInx] = "#04f";
                }
                outpInx++;
            }
        }


    }

    setPrg(id, setId) {
        var self = this;
        var md = self.md;
        var op = md.opts;
        var opts = {};

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
        opts.baseColor = "#000";
        blocks[cname] = { name: "basePanel", type: "Component~Cp_base~plate.none", opts: opts };
        //======================================    
        var cname = lyMaps["body"] + "~" + 0;
        var opts = {};
        opts.margin = 10;
        opts.yArr = [9999, "0.05rh", "0.05rh"];
        opts.ym = 4;
        layouts[cname] = { name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts };
        lyMaps["mainBody"] = cname;
        //==============================
        var cname = lyMaps["mainBody"] + "~" + 0;
        var opts = {};
        opts.xc = 8
        opts.yc = 12;
        opts.ym = 8;
        opts.xm = 4
        layouts[cname] = { name: cname, type: "Layout~Ly_base~array.sys0", opts: opts };
        lyMaps["mainBody0"] = cname;
        var inx = 0;
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 12; j++) {
                var cname = lyMaps["mainBody0"] + "~" + inx;
                var opts = {};
                opts.textShadow = "2px 2px 2px #000";
                opts.innerTextColor = "#fff";
                opts.fontSize = "0.44rh";
                opts.innerText = "";
                opts.borderWidth = 1;
                if (inx === 0) {
                    opts.innerText = "狀態";
                    if (gr.language === "english")
                        opts.innerText = "STATUS";
                    opts.borderWidth = 0;
                    blocks[cname] = { name: "labelA#" + inx, type: "Component~Cp_base~plate.none", opts: opts };
                    inx++;
                    continue;
                }
                if (inx === 1) {
                    opts.borderColor = "#ff0";
                    opts.baseColor = "#444";
                    opts.innerTextColor = "#ff0";
                    var regName = "self.fatherMd.stas.textA#";
                    Block.setInputWatch(opts, "directReg", regName + inx, "innerText", 1);
                    blocks[cname] = { name: "labelA#" + inx, type: "Component~Cp_base~plate.none", opts: opts };
                    inx++;
                    continue;
                }
                if (inx === 2) {
                    opts.borderWidth = 0;
                    var regName = "self.fatherMd.stas.textA#";
                    Block.setInputWatch(opts, "directReg", regName + inx, "innerText", 1);
                    blocks[cname] = { name: "labelA#" + inx, type: "Component~Cp_base~plate.none", opts: opts };
                    inx++;
                    continue;
                }
                if (inx < 6) {
                    inx++;
                    continue;
                }
                opts.textShadow = "";
                opts.fontSize = "0.44rh";
                opts.borderColor = "#ccc";
                opts.baseColor = "#000";
                opts.tpd = 8;
                opts.bpd = 8;
                var regName0 = "self.fatherMd.stas.textA#";
                var regName1 = "self.fatherMd.stas.baseColorA#";
                var regName2 = "self.fatherMd.stas.fontColorA#";
                Block.setInputWatch(opts, "directReg", regName0 + inx, "innerText", 1);
                Block.setInputWatch(opts, "directReg", regName1 + inx, "baseColor", 1);
                Block.setInputWatch(opts, "directReg", regName2 + inx, "innerTextColor", 1);
                opts.mouseClick_f = 1;
                opts.actionFunc = function (iobj) {
                    if (!op.setF)
                        return;
                    console.log(iobj);
                    var inx = parseInt(iobj.kvObj.name.split("#")[1])

                    if ((inx % 8) <= 5) {
                        var inInx = ((inx / 8) | 0) * 6 + (inx % 8) - 6;
                        if (inInx < 0)
                            return;
                    }
                    else {
                        var outInx = ((inx / 8) | 0) * 2 + (inx % 8) - 5;
                        if (outInx < 0)
                            return;

                    }

                    var opts = {};
                    opts.kvTexts = ["XOR", "OFF", "ON", "None"];


                    opts.actionFunc = function (iobj) {
                        console.log(iobj);
                        if (!op.setF)
                            return;
                        if (iobj.act === "selected") {
                            return;
                        }
                    };
                    opts.h = 300;
                    opts.w = 400;
                    if (inInx !== undefined)
                        opts.selectInx = inInx
                    if (outInx !== undefined)
                        opts.selectInx = outInx
                    opts.selectEsc_f = 1;
                    opts.actionFunc = function (iobj) {
                        console.log(iobj);
                        if (iobj.act === "selected") {
                            if (inInx !== undefined) {
                                op.rxData.inputFA[inInx] = iobj.selectInx;
                            }
                            if (outInx !== undefined) {
                                op.rxData.outputFA[outInx] = iobj.selectInx;
                            }
                            MdaPopWin.popOff(2);
                        }
                    }
                    box.selectBox(opts);
                    return;


                }
                blocks[cname] = { name: "labelA#" + inx, type: "Component~Cp_base~plate.none", opts: opts };
                inx++;
            }

        }

        //==============================
        var chA = ["└───", "輸入群", "───┘", "└─── 輸出群 ───┘"]
        if (gr.language === "english")
            var chA = ["└───", "INPUT GROUP", "───┘", "└─── OUTPUT GROUP ───┘"];



        var cname = lyMaps["mainBody"] + "~" + 1;
        var opts = {};
        opts.xArr = ["0.125rw", "0.5rw", "0.125rw", "0.25rw"];
        opts.ym = 8;
        opts.xm = 4;
        layouts[cname] = { name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts };
        lyMaps["mainBody1"] = cname;

        for (var i = 0; i < 4; i++) {
            var cname = lyMaps["mainBody1"] + "~" + i;
            var opts = {};
            opts.textShadow = "2px 2px 2px #000";
            opts.innerTextColor = "#fff";
            opts.fontSize = "0.4rh";
            opts.innerText = chA[i];
            opts.borderWidth = 0;
            blocks[cname] = { name: "labelB#" + inx, type: "Component~Cp_base~plate.none", opts: opts };
        }


        var chA = ["正常時燈亮", "", "正常時燈滅", "", "操作狀態", "", "設定", "返 回"]
        var chB = ["NORMAL ON", "", "NORMAL OFF", "", "OPERATION", "", "SET", "BACK"]
        var cname = lyMaps["mainBody"] + "~" + 2;
        var opts = {};
        opts.xc = 8;
        opts.ym = 8;
        opts.xm = 4;
        layouts[cname] = { name: cname, type: "Layout~Ly_base~array.sys0", opts: opts };
        lyMaps["mainBody2"] = cname;

        for (var i = 0; i < 8; i++) {
            var cname = lyMaps["mainBody2"] + "~" + i;
            if (i === 1 || i === 3 || i === 5)
                continue;
            var opts = {};
            opts.fontSize = "0.5rh";
            opts.innerText = chA[i];
            if (gr.language === "english") {
                opts.innerText = chB[i];
                opts.fontSize = "0.4rh";
            }

            if (i === 6 || i === 7) {
                opts.actionFunc = function (iobj) {
                    console.log(iobj);
                    if (iobj.kvObj.name === "labelC#6") {
                        if (md.opts.setF) {
                            md.opts.setF = 0
                            return;
                        }
                        var opts = {};
                        opts.title = "請輸入密碼";
                        opts.setOpts = {};
                        opts.setOpts.password_f = 1;
                        opts.actionFunc = function (iobj) {
                            console.log(iobj);
                            if (iobj.act === "padEnter") {
                                if (iobj.inputText === gr.paraSet.settingPassword)
                                    op.setParaPass_f = 1;
                                if (iobj.inputText === gr.paraSet.josnPassword)
                                    op.setParaPass_f = 2;

                                if (op.setParaPass_f) {
                                    md.opts.setF ^= 1;
                                    return;
                                } else {
                                    var opts = {};
                                    opts.kvTexts = ["密碼錯誤"];
                                    box.errorBox(opts);
                                }
                            }
                        };
                        box.intPadBox(opts);
                        return;
                    }
                    MdaPopWin.popOff(2);
                };
                blocks[cname] = { name: "labelC#" + i, type: "Component~Cp_base~button.sys0", opts: opts };
                continue;
            }
            opts.textShadow = "1px 1px 1px #fff";
            opts.innerTextColor = "#fff";
            if (i === 0) {
                opts.innerTextColor = "#000";
                opts.baseColor = "#0f0";
            }
            if (i === 2) {
                opts.innerTextColor = "#000";
                opts.baseColor = "#f00";
            }
            if (i === 4) {
                opts.innerTextColor = "#000";
                opts.baseColor = "#ff0";
            }

            blocks[cname] = { name: "labelC#" + i, type: "Component~Cp_base~plate.none", opts: opts };
        }



    }

}





class ViewA109 {
    constructor() {
    }

    initOpts(md) {
        var self = this;
        var opts = {};
        opts.title = "title";
        opts.pageCnt = 0;
        var rxData = opts.rxData = {};
        Block.setBaseOpts(opts);
        return opts;
    }

    chkWatch() {
        var self = this;
        var md = this.md;
        var op = md.opts;
        var st = md.stas;

    }

    setPrg(id, setId) {
        var self = this;
        var md = self.md;
        var op = md.opts;
        var opts = {};

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
        opts.baseColor = "#000";
        blocks[cname] = { name: "basePanel", type: "Component~Cp_base~plate.none", opts: opts };
        //======================================    
        var cname = lyMaps["body"] + "~" + 0;
        var opts = {};
        opts.margin = 0;
        opts.yArr = ["0.05rh", 9999];
        opts.ym = 4;
        layouts[cname] = { name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts };
        lyMaps["mainBody"] = cname;
        //==============================
        var cname = lyMaps["mainBody"] + "~" + 0;
        var actionPrg = function (iobj) {
            console.log(iobj);
            if (iobj.kvObj.name === "button#0") {
                op.pageCnt++;
                if (op.pageCnt > 2)
                    op.pageCnt = 0;
                md.reCreate();
                return;
            }
            MdaPopWin.popOff(2);

        }
        mac.setHeadTitleBar(md, cname, op.title, actionPrg, ["next", "esc"]);

        var cname = lyMaps["mainBody"] + "~" + 1;
        var opts = {};
        opts.margin = 0;
        opts.yc = 17;
        opts.ym = 8;
        layouts[cname] = { name: cname, type: "Layout~Ly_base~array.sys0", opts: opts };
        lyMaps["mainBody1"] = cname;




        var a109DscA = [
            "+5V 低壓電源 B (+5V LVPSB)",
            "+25V 低壓電源 B (+25V LVPSB)",
            "-15V 低壓電源 B (-15V LVPSB)",
            "+15V 低壓電源 B (+15V LVPSB)",
            "+5V 低壓電源 A (+5V LVPSA)",
            "+25V 低壓電源 A (+25V LVPSA)",
            "-15V 低壓電源 A (-15V LVPSA)",
            "+15V 低壓電源 A (+15V LVPSA)",
            "燈絲電壓過低(LOW FIL. VOLTAGE)",
            //===============================
            "行波管電流(PEAK CATHODE CURRENT)",
            "平均膽電流(AVE. BODY CURRENT)",
            "脈波過寬(WIDE PULSE WIDTH)",
            "偏壓過低(LOW BIAS VOLTAGE)",
            "高壓過高(HVPS HIGH)",
            "高壓電流過大(HVPS OVER CURRENT)",
            "高壓過低(HVPS LOW)",
            "峰值膽電流(PEAK BODY CURRENT)",
            "導波管電弧(WINDOW ARC)",
            "工作比過大(EXCESS DUTY CYCLE)",
            "駐波比過高(HIGH REF. POWER)",
            "真空電子電流(VAC-ION CURRENT)",
            //===============================
            "U23 暖機時間(WARM UP TIMER)",
            "U22 續活時間(KEEP ALIVE TIMER)",
            "U24 CVPS穩定時間(P.S. STEADY TIME)",
            "U25 開機後重置時間(POWER ON RESET TIME)",
            "U27 故障邏輯燈泡啟動時間(FL LAMP TIMER)"
        ];

        var a109SetA = [
            1000,
            1001,
            1002,
            1003,
            1004,
            1005,
            1006,
            1007,
            1008
        ];




        var a109SetB = [
            1010,
            1011,
            1012,
            1013,
            1014,
            1015,
            1016,
            1017,
            1018,
            1019,
            1010,
            1011
        ];

        var a109DscC = [
            "U23 暖機時間(WARM UP TIMER)",
            "U22 續活時間(KEEP ALIVE TIMER)",
            "U24 CVPS穩定時間(P.S. STEADY TIME)",
            "U25 開機後重置時間(POWER ON RESET TIME)",
            "U27 故障邏輯燈泡啟動時間(FL LAMP TIMER)"
        ];
        var a109SetC = [
            1020,
            1021,
            1022,
            1023,
            1024
        ]


        for (var i = 0; i < 17; i++) {
            var cname = lyMaps["mainBody1"] + "~" + i;
            var opts = {};
            opts.margin = 0;
            opts.xArr = ["0.05rw", "0.15rw", "0.15rw", "0.15rw", 9999];
            opts.xm = 6;
            layouts[cname] = { name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts };
            lyMaps["mainBody1" + i] = cname;
        }
        var iStart = 0;
        var iLen = 9
        if (op.pageCnt === 1) {
            var iStart = 9;
            var iLen = 12
        }
        if (op.pageCnt === 2) {
            var iStart = 21;
            var iLen = 5
        }

        var a109Dsc = gr.paraSet.a109Dsc;
        var a109Set = gr.paraSet.a109Set;
        var a109Value = gr.paraSet.a109Set;
        for (var i = 0; i < iLen + 1; i++) {
            var cname = lyMaps["mainBody1" + i] + "~" + 0;
            var opts = {};
            if (i === 0) {
            }
            else {
                opts.innerText = i;
                opts.innerTextColor = "#ff0"
            }
            opts.fontSize = "0.4rh";
            blocks[cname] = { name: "dscA#" + i, type: "Component~Cp_base~plate.none", opts: opts };

            var cname = lyMaps["mainBody1" + i] + "~" + 1;
            var opts = {};
            opts.fontSize = "0.4rh";
            if (i === 0) {
                opts.innerText = "設定值"
                opts.innerTextColor = "#ff0"
                blocks[cname] = { name: "setA#" + i, type: "Component~Cp_base~plate.none", opts: opts };
            }
            else {
                opts.innerText = a109Set[iStart + i - 1];
                blocks[cname] = { name: "setA#" + i, type: "Component~Cp_base~button.sys0", opts: opts };
            }


            var cname = lyMaps["mainBody1" + i] + "~" + 2;
            var opts = {};
            opts.fontSize = "0.4rh";
            if (i === 0) {
                opts.innerText = "取樣值"
                opts.innerTextColor = "#ff0"
                blocks[cname] = { name: "sampleA#" + i, type: "Component~Cp_base~plate.none", opts: opts };
            }
            else {
                opts.innerText = a109Value[iStart + i - 1];
                opts.baseColor = "#8f8"
                opts.fontSize = "0.9rh";
                opts.innerTextColor = "#000";
                opts.textShadow = "2px 2px 2px #fff";
                blocks[cname] = { name: "sampleA#" + i, type: "Component~Cp_base~images.lcd", opts: opts };
            }



            var cname = lyMaps["mainBody1" + i] + "~" + 3;
            var opts = {};
            opts.fontSize = "0.4rh";
            if (i === 0) {
                opts.innerText = "預設值"
                opts.innerTextColor = "#ff0"
                blocks[cname] = { name: "defaultA#" + i, type: "Component~Cp_base~plate.none", opts: opts };
            }
            else {
                var strA = a109Dsc[iStart + i - 1].split(",");
                opts.innerText = strA[0];
                blocks[cname] = { name: "defaultA#" + i, type: "Component~Cp_base~label.sys0", opts: opts };
            }



            var cname = lyMaps["mainBody1" + i] + "~" + 4;
            var opts = {};
            if (i === 0) {
                opts.innerText = "說明"
                opts.innerTextColor = "#ff0"
                opts.fontSize = "0.4rh";
                blocks[cname] = { name: "dscA#" + i, type: "Component~Cp_base~plate.none", opts: opts };
            }
            else {
                var strA = a109Dsc[iStart + i - 1].split(",");
                opts.innerText = strA[1];
                opts.innerTextColor = "#0ff"
                opts.textAlign = "left";
                opts.lpd = 10;
                opts.fontSize = "0.4rh";
                blocks[cname] = { name: "dscA#" + i, type: "Component~Cp_base~plate.none", opts: opts };
            }
        }




    }


}










class NewTft6 {
    constructor() {
        gr.syncData = {};
        gr.syncData.timerA = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        gr.syncData.inFlagA = [];
        for (var i = 0; i < 72; i++)
            gr.syncData.inFlagA.push(1);
        gr.syncData.outFlagA = [];
        for (var i = 0; i < 24; i++)
            gr.syncData.inFlagA.push(1);
        gr.syncData.inputModeA = [];
        for (var i = 0; i < 72; i++)
            gr.syncData.inputModeA.push(0);
        gr.syncData.outputModeA = [];
        for (var i = 0; i < 24; i++)
            gr.syncData.outputModeA.push(0);

        gr.syncData.errDnA = [];
        for (var i = 0; i < 48; i++)
            gr.syncData.errDnA.push(0);

        gr.syncData.errValA = [];
        for (var i = 0; i < 48; i++)
            gr.syncData.errValA.push(0);


        gr.socketRetPrgTbl["tick~react"] = function (retData) {
            var syncData = retData.syncData;
            var keys = Object.keys(syncData);
            for (var i = 0; i < keys.length; i++) {
                var strA = keys[i].split("#");
                if (strA.length === 1) {
                    gr.syncData[keys[i]] = syncData[keys[i]];
                    continue;
                }
                if (strA.length === 2) {
                    var inx0 = KvLib.toInt(strA[1], 0);
                    gr.syncData[strA[0]][inx0] = syncData[keys[i]];
                    continue;
                }
            }
            gr.syncDataRxed_f = 1;
            //console.log("sipphoneUiData");
        };
        gr.socketRetPrgTbl["saveA109~react"] = function (retData) {
            var opts = {};
            opts.kvTexts = ["SAVE OK"];
            box.okBox(opts);
        };



    }

    initOpts(md) {
        var self = this;
        var opts = {};
        opts.setF = 0;
        var rxData = opts.rxData = {};
        var GOFF_F = "#ccc";
        var GON_F = "#000";
        var GOFF_B = "#040";
        var GON_B = "#0f0";
        var YOFF_F = "#ccc";
        var YON_F = "#000";
        var YOFF_B = "#440";
        var YON_B = "#ff0";
        var ROFF_F = "#ccc";
        var RON_F = "#000";
        var ROFF_B = "#400";
        var RON_B = "#f00";


        opts.in_icon1 = [
            [1, GOFF_F, GOFF_B, GON_F, GON_B, " EXT INT1", " EXT INT1"],
            [1, GOFF_F, GOFF_B, GON_F, GON_B, " EXT INT2", " EXT INT2"],
            [1, GOFF_F, GOFF_B, GON_F, GON_B, " BSC EN  ", " BSC EN  "],
            [1, GOFF_F, GOFF_B, GON_F, GON_B, " CB RDY  ", " CB RDY  "],
            [1, GOFF_F, GOFF_B, GON_F, GON_B, "  LV SW  ", "  LV SW  "],
            [1, GOFF_F, GOFF_B, GON_F, GON_B, "   SOL   ", "   SOL   "],
            ///////////////////////////
            [1, GOFF_F, GOFF_B, GON_F, GON_B, " NOT FLT ", " NOT FLT "],
            [1, YOFF_F, YOFF_B, YON_F, YON_B, "  LOAD   ", "  LOAD   "],
            [0, YOFF_F, YOFF_B, YON_F, YON_B, "  ANT    ", "  ANT    "],
            [1, GOFF_F, GOFF_B, GON_F, GON_B, " ION PS  ", " ION PS  "],
            [0, ROFF_F, ROFF_B, RON_F, RON_B, "   FIL   ", "   FIL   "],
            [0, ROFF_F, ROFF_B, RON_F, RON_B, "  BIAS   ", "  BIAS   "],
            /////////////////////////////
            [1, GOFF_F, GOFF_B, GON_F, GON_B, " +25V PSB", " +25V PSB"],
            [1, GOFF_F, GOFF_B, GON_F, GON_B, " +15V PSB", " +15V PSB"],
            [0, YOFF_F, YOFF_B, YON_F, YON_B, " RAD ON  ", "  RAD ON "],
            [1, GOFF_F, GOFF_B, GON_F, GON_B, " PA DIL  ", " PA DIL  "],
            [1, GOFF_F, GOFF_B, GON_F, GON_B, " PA DIR  ", " PA DIR  "],
            [1, GOFF_F, GOFF_B, GON_F, GON_B, "  HV SW  ", "  HV SW  "],
            /////////////////////////////
            [0, GOFF_F, GOFF_B, GON_F, GON_B, "  GRID   ", "  GRID   "],
            [1, GOFF_F, GOFF_B, GON_F, GON_B, " +5V PSB ", " +5V PSB "],
            [1, GOFF_F, GOFF_B, GON_F, GON_B, "  HVC    ", "   HVC   "],
            [1, GOFF_F, GOFF_B, GON_F, GON_B, " HVC AF  ", " HVC AF  "],
            [1, GOFF_F, GOFF_B, GON_F, GON_B, " HV DIL  ", " HV DIL  "],
            [1, GOFF_F, GOFF_B, GON_F, GON_B, " HV DIR  ", " HV DIR  "],
            //////////////////////////////
            [1, GOFF_F, GOFF_B, GON_F, GON_B, " +25V PSA", " +25V PSA"],
            [1, GOFF_F, GOFF_B, GON_F, GON_B, " +15V PSA", " +15V PSA"],
            [0, GOFF_F, GOFF_B, GON_F, GON_B, " -15V PSB", " -15V PSB"],
            [1, GOFF_F, GOFF_B, GON_F, GON_B, " HVUP AF ", " HVUP AF "],
            [1, GOFF_F, GOFF_B, GON_F, GON_B, " HVDN AF ", " HVDN AF "],
            [1, GOFF_F, GOFF_B, GON_F, GON_B, " TWT AF  ", " TWT AF  "],
            ///////////////////////////////
            [1, ROFF_F, ROFF_B, RON_F, RON_B, " PLS INH ", " PLS INH "],
            [1, GOFF_F, GOFF_B, GON_F, GON_B, " +5V PSA ", " +5V PSA "],
            [1, GOFF_F, GOFF_B, GON_F, GON_B, " -15V PSA", " -15V PSA"],
            [1, GOFF_F, GOFF_B, GON_F, GON_B, " SCR WF  ", " SCR WF  "],
            [1, GOFF_F, GOFF_B, GON_F, GON_B, "  MW WF  ", "  MW WF  "],
            [1, GOFF_F, GOFF_B, GON_F, GON_B, " PA HUM  ", " PA HUM  "],
            //////////////////////////////
            [0, YOFF_F, YOFF_B, YON_F, YON_B, " REM RST ", " REM RET "],
            [0, YOFF_F, YOFF_B, YON_F, YON_B, " RF LOAD ", " RF LOAD "],
            [0, ROFF_F, ROFF_B, RON_F, RON_B, " HV INH  ", " HV INH  "],
            [1, GOFF_F, GOFF_B, GON_F, GON_B, " TWT WF  ", " TWT WF  "],
            [1, GOFF_F, GOFF_B, GON_F, GON_B, " ISO WF  ", " ISO WF  "],
            [1, GOFF_F, GOFF_B, GON_F, GON_B, " BUCK WF ", " BUCK WF "],
            //////////////////////////////
            [0, GOFF_F, GOFF_B, GON_F, GON_B, " NORMAL  ", " NORMAL  "],
            [0, YOFF_F, YOFF_B, YON_F, YON_B, " BAT SHRT", " BAT SHRT"],
            [1, YOFF_F, YOFF_B, YON_F, YON_B, " LOC RST ", " LOC RST "],
            [1, GOFF_F, GOFF_B, GON_F, GON_B, "  HV AT  ", "  HV AT  "],
            [1, GOFF_F, GOFF_B, GON_F, GON_B, " XFMR WF ", " XFMR WF "],
            [1, GOFF_F, GOFF_B, GON_F, GON_B, " CHK WF  ", " CHK WF  "],
            ///////////////////////////////
            [0, YOFF_F, YOFF_B, YON_F, YON_B, " REMOTE  ", " REMOTE  "],
            [0, GOFF_F, GOFF_B, GON_F, GON_B, " KA MODE ", " KA MODE "],
            [0, GOFF_F, GOFF_B, GON_F, GON_B, " STANDBY ", " STANDBY "],
            [1, GOFF_F, GOFF_B, GON_F, GON_B, "   WT    ", "   WT    "],
            [1, GOFF_F, GOFF_B, GON_F, GON_B, " HV HUM  ", " HV HUM  "],
            [1, GOFF_F, GOFF_B, GON_F, GON_B, "  PA AT  ", "  PA AT  "],
            ///////////////////////////////
            [0, YOFF_F, YOFF_B, YON_F, YON_B, " HV OFF  ", " HV OFF  "],
            [0, YOFF_F, YOFF_B, YON_F, YON_B, " PLS ON  ", " PLS ON  "],
            [0, YOFF_F, YOFF_B, YON_F, YON_B, " PLS OFF ", " PLS OFF "],
            [0, ROFF_F, ROFF_B, RON_F, RON_B, " HV LOW  ", " HV LOW  "],
            [0, ROFF_F, ROFF_B, RON_F, RON_B, "  HV HI  ", " HV HI   "],
            [1, GOFF_F, GOFF_B, GON_F, GON_B, " WG PRES ", " WG PRES "],
            //////////////////////////////
            [0, YOFF_F, YOFF_B, YON_F, YON_B, " PWR ON  ", " PWR ON  "], //
            [0, YOFF_F, YOFF_B, YON_F, YON_B, " PWR OFF ", " PWR OFF "],
            [0, YOFF_F, YOFF_B, YON_F, YON_B, "  HV ON  ", "  HV ON  "],
            [0, ROFF_F, ROFF_B, RON_F, RON_B, " CB FIRD ", " CB FIRD "],
            [1, GOFF_F, GOFF_B, GON_F, GON_B, " ION I SP", " ION I SP"],
            [1, GOFF_F, GOFF_B, GON_F, GON_B, "  ION I  ", "  ION I  "]
        ]

        opts.out_icon1 = [
            [0, GOFF_F, GOFF_B, GON_F, GON_B, " SUB SYS ", " SUB SYS "],
            [1, GOFF_F, GOFF_B, GON_F, GON_B, " LVPS EN ", " LVPS EN "],

            [1, GOFF_F, GOFF_B, GON_F, GON_B, " DR INT  ", " DR INT  "],
            [1, GOFF_F, GOFF_B, GON_F, GON_B, " EXT INT ", " EXT INT "],

            [0, ROFF_F, ROFF_B, RON_F, RON_B, "  ION I  ", "  ION I  "],
            [1, GOFF_F, GOFF_B, GON_F, GON_B, " COOLING ", " COOLING "],

            [1, YOFF_F, YOFF_B, YON_F, YON_B, "  LOAD   ", "  LOAD   "],
            [0, YOFF_F, YOFF_B, YON_F, YON_B, "  ANT    ", "  ANT    "],

            [0, GOFF_F, GOFF_B, GON_F, GON_B, " KA MODE ", " KA MODE "],
            [0, YOFF_F, YOFF_B, YON_F, YON_B, " RAD ON  ", " RAD ON  "],

            [0, GOFF_F, GOFF_B, GON_F, GON_B, " NORMAL  ", " NORMAL  "],
            [1, GOFF_F, GOFF_B, GON_F, GON_B, " STANDBY ", " STANDBY "],

            [0, GOFF_F, GOFF_B, GON_F, GON_B, " F/L EN  ", " F/L EN  "],
            [1, YOFF_F, YOFF_B, YON_F, YON_B, " NOT RST ", " NOT RST "],

            [0, ROFF_F, ROFF_B, RON_F, RON_B, " CB FIRD ", " CB FIRD "],
            [0, ROFF_F, ROFF_B, RON_F, RON_B, "  FAULT  ", "  FAULT  "],

            [1, YOFF_F, YOFF_B, YON_F, YON_B, "  LOCAL  ", " LOCAL   "],
            [0, YOFF_F, YOFF_B, YON_F, YON_B, " BAT SHRT", " BAT SHRT"],

            [0, GOFF_F, GOFF_B, GON_F, GON_B, " PLS ON  ", " PLS ON  "],
            [0, GOFF_F, GOFF_B, GON_F, GON_B, " PLS EN  ", " PLS EN  "],

            [1, GOFF_F, GOFF_B, GON_F, GON_B, " HV RDY  ", " HV RDY  "],
            [0, GOFF_F, GOFF_B, GON_F, GON_B, "  HV ON  ", "  HV ON  "],

            [1, GOFF_F, GOFF_B, GON_F, GON_B, " PWR EN  ", " PWR EN  "],
            [1, GOFF_F, GOFF_B, GON_F, GON_B, " PWR ON  ", " PWR ON  "],
        ];

        opts.setEn_f = 0;


        Block.setBaseOpts(opts);
        return opts;
    }

    chkWatch() {
        var self = this;
        var md = this.md;
        var op = md.opts;
        var st = md.stas;

        ws.tick();


        st.text_ioInA = [];
        st.baseColor_ioInA = [];
        st.fontColor_ioInA = [];
        st.text_ioOutA = [];
        st.baseColor_ioOutA = [];
        st.fontColor_ioOutA = [];
        st.text_ioButA = [];
        st.baseColor_ioButA = [];
        st.fontColor_ioButA = [];
        st.text_setInA = [];
        st.text_setOutA = [];

        st.text_labelA = [];


        var inFlagA = gr.syncData.inFlagA;
        var outFlagA = gr.syncData.outFlagA;
        var inputModeA = gr.syncData.inputModeA;
        var outputModeA = gr.syncData.outputModeA;

        var inValueA = [];
        for (var i = 0; i < 66; i++)
            inValueA.push(1);
        var outValueA = [];
        for (var i = 0; i < 24; i++)
            outValueA.push(1);
        for (var i = 0; i < 66; i++) {
            if (inFlagA[i] === 0) {
                st.text_ioInA.push(op.in_icon1[i][5]);
                st.baseColor_ioInA.push(op.in_icon1[i][4]);
                st.fontColor_ioInA.push(op.in_icon1[i][3]);

            }
            else {
                st.text_ioInA.push(op.in_icon1[i][6]);
                st.baseColor_ioInA.push(op.in_icon1[i][2]);
                st.fontColor_ioInA.push(op.in_icon1[i][1]);
            }
            if (inputModeA[i] === 0)
                st.text_setInA.push("XOR");
            else if (inputModeA[i] === 1)
                st.text_setInA.push("OFF");
            else if (inputModeA[i] === 2)
                st.text_setInA.push("ON");
            else
                st.text_setInA.push("");



        }

        for (var i = 0; i < 24; i++) {
            if (outFlagA[i] === 0) {
                st.text_ioOutA.push(op.out_icon1[i][5]);
                st.baseColor_ioOutA.push(op.out_icon1[i][4]);
                st.fontColor_ioOutA.push(op.out_icon1[i][3]);
            }
            else {
                st.text_ioOutA.push(op.out_icon1[i][6]);
                st.baseColor_ioOutA.push(op.out_icon1[i][2]);
                st.fontColor_ioOutA.push(op.out_icon1[i][1]);
            }
            if (outputModeA[i] === 0)
                st.text_setOutA.push("XOR");
            else if (outputModeA[i] === 1)
                st.text_setOutA.push("OFF");
            else if (outputModeA[i] === 2)
                st.text_setOutA.push("ON");
            else
                st.text_setOutA.push("");
        }

        var labelA = ["T-U22:", "T-U23:", "T-U27:", "T-U25:", "T-U24:", "G:", "TOT:", "RX:"];
        var labelValueA = [1, 2, 3, 4, 5, 6, 7, 8];
        labelValueA[0] = "" + gr.syncData.timerA[0];
        labelValueA[1] = "" + gr.syncData.timerA[1];
        labelValueA[2] = "" + gr.syncData.timerA[4];
        labelValueA[3] = "" + gr.syncData.timerA[2];
        labelValueA[4] = "" + gr.syncData.timerA[3];
        labelValueA[5] = "" + gr.syncData.timerA[5];
        labelValueA[6] = "" + gr.syncData.timerA[6];


        labelValueA[7] = "" + gr.webSocketConnectCnt % 10;
        labelValueA[7] += gr.syncData.timerA[8] % 10;
        for (var i = 0; i < 8; i++) {
            st.text_labelA.push(labelA[i] + labelValueA[i]);
        }





        st.text_ioButA.push("109/110");
        st.baseColor_ioButA.push("#08f");
        st.fontColor_ioButA.push("#000");

        st.text_ioButA.push("SET DIS");
        if (op.setEn_f)
            st.baseColor_ioButA.push("#f80");
        else
            st.baseColor_ioButA.push("#08f");
        st.fontColor_ioButA.push("#000");





    }

    setPrg(id, setId) {
        var self = this;
        var md = self.md;
        var op = md.opts;
        var opts = {};

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
        opts.baseColor = "#000";
        blocks[cname] = { name: "basePanel", type: "Component~Cp_base~plate.none", opts: opts };
        //======================================    
        var cname = lyMaps["body"] + "~" + 0;
        var opts = {};
        opts.margin = 2;
        opts.xc = 8;
        opts.yArr = ["0.05rh", 9999];
        opts.xm = 6;
        layouts[cname] = { name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts };
        lyMaps["mainBody"] = cname;


        var cname = lyMaps["mainBody"] + "~" + 0;
        var opts = {};
        opts.xc = 8;
        opts.xm = 6;
        layouts[cname] = { name: cname, type: "Layout~Ly_base~array.sys0", opts: opts };
        lyMaps["upBody"] = cname;
        for (var i = 0; i < 8; i++) {
            var cname = lyMaps["upBody"] + "~" + i;
            var opts = {};
            opts.fontSize = "0.6rh";
            opts.innerTextColor = "#fff";
            opts.fontFamily = "monospace";
            var regName0 = "self.fatherMd.stas.text_labelA#" + i;
            Block.setInputWatch(opts, "directReg", regName0, "innerText", 1);
            blocks[cname] = { name: "labelA#" + i, type: "Component~Cp_base~plate.none", opts: opts };

        }



        var cname = lyMaps["mainBody"] + "~" + 1;
        var opts = {};
        opts.xc = 8;
        opts.yc = 12;
        opts.xm = 6;
        layouts[cname] = { name: cname, type: "Layout~Ly_base~array.sys0", opts: opts };
        lyMaps["downBody"] = cname;
        var inx = 0;
        for (var i = 0; i < 12; i++) {
            for (var j = 0; j < 8; j++) {
                var cname = lyMaps["downBody"] + "~" + inx;
                var opts = {};
                opts.yArr = ["0.6rh", 9999];
                layouts[cname] = { name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts };
                lyMaps["downBody" + inx] = cname;


                var cname = lyMaps["downBody" + inx] + "~" + 0;
                var opts = {};


                var dispMode = 0;
                if (i >= 1 && j < 6) {
                    var inputInx = (i - 1) * 6 + j;
                    dispMode = 1;
                    var ioValueName = "ioInA#" + inputInx;
                    var ioSetName = "setInA#" + inputInx;
                    opts.fontSize = "0.6rh";
                }
                if (j >= 6) {
                    var outputInx = i * 2 + j - 6;
                    dispMode = 2;
                    var ioValueName = "ioOutA#" + outputInx;
                    var ioSetName = "setOutA#" + outputInx;
                    opts.fontSize = "0.6rh";
                }
                if (inx === 0 || inx === 1) {
                    var setButInx = inx;
                    dispMode = 3;
                    var ioValueName = "ioButA#" + setButInx;
                    var ioSetName = "setButA#" + setButInx;
                    opts.fontSize = "0.7rh";
                }

                if (dispMode === 0) {
                    inx++;
                    continue;
                }
                opts.fontWeight = "bold";
                opts.mouseClick_f = 1;
                opts.actionFunc = function (iobj) {
                    console.log(iobj);




                    if (iobj.kvObj.name === "ioButA#0") {
                        var opts = {};
                        ws.cmd("viewA109");
                        opts.setEn_f = op.setEn_f;
                        opts.errDnA = [];
                        for (var i = 0; i < gr.syncData.errDnA.length; i++)
                            opts.errDnA.push(gr.syncData.errDnA[i]);
                        var kvObj = new Block("viewA101", "Model~SetA109~base.sys0", opts);
                        mda.popObj(9999, 9999, kvObj);
                        return;
                    }


                    if (iobj.kvObj.name === "ioButA#1") {

                        if (md.opts.setEn_f) {
                            md.opts.setEn_f = 0
                            return;
                        }
                        var opts = {};
                        opts.title = "請輸入密碼";
                        opts.setOpts = {};
                        opts.setOpts.password_f = 1;
                        opts.actionFunc = function (iobj) {
                            console.log(iobj);
                            if (iobj.act === "padEnter") {
                                var setParaPass_f = 0;
                                if (iobj.inputText === gr.paraSet.settingPassword)
                                    setParaPass_f = 1;
                                if (iobj.inputText === gr.paraSet.josnPassword)
                                    setParaPass_f = 2;
                                if (setParaPass_f) {
                                    md.opts.setEn_f ^= 1;
                                    return;
                                } else {
                                    var opts = {};
                                    opts.kvTexts = ["密碼錯誤"];
                                    box.errorBox(opts);
                                }
                            }
                        };
                        box.intPadBox(opts);
                        return;



                    }

                    if (!op.setEn_f)
                        return;
                    var strA = iobj.kvObj.name.split("#");
                    if (strA[0] === "ioInA" || strA[0] === "ioOutA") {
                        var opts = {};
                        opts.kvTexts = ["XOR", "OFF", "ON", "None"];
                        opts.title = "IO SET"
                        opts.h = 200;
                        opts.w = 400;
                        opts.selectEsc_f = 1;
                        opts.actionFunc = function (iobj) {
                            console.log(iobj);
                            if (iobj.act === "selected") {
                                if (strA[0] === "ioInA") {
                                    ws.cmd("setInMode", [parseInt(strA[1]), iobj.selectInx]);
                                    gr.paraSet.inIoSet[parseInt(strA[1])] = iobj.selectInx;
                                }
                                if (strA[0] === "ioOutA") {
                                    ws.cmd("setOutMode", [parseInt(strA[1]), iobj.selectInx]);
                                    gr.paraSet.outIoSet[parseInt(strA[1])] = iobj.selectInx;
                                }

                                MdaPopWin.popOff(2);
                            }
                        }
                        box.selectBox(opts);
                        return;

                    }

                }

                var regName0 = "self.fatherMd.stas.text_" + ioValueName;
                var regName1 = "self.fatherMd.stas.baseColor_" + ioValueName;;
                var regName2 = "self.fatherMd.stas.fontColor_" + ioValueName;;
                Block.setInputWatch(opts, "directReg", regName0, "innerText", 1);
                Block.setInputWatch(opts, "directReg", regName1, "baseColor", 1);
                Block.setInputWatch(opts, "directReg", regName2, "innerTextColor", 1);

                blocks[cname] = { name: ioValueName, type: "Component~Cp_base~plate.none", opts: opts };


                var cname = lyMaps["downBody" + inx] + "~" + 1;
                var opts = {};
                opts.fontSize = "0.44rh";
                opts.fontWeight = "bold";
                opts.innerTextColor = "#ccc";
                var regName0 = "self.fatherMd.stas.text_" + ioSetName;
                Block.setInputWatch(opts, "directReg", regName0, "innerText", 1);
                blocks[cname] = { name: ioSetName, type: "Component~Cp_base~plate.none", opts: opts };

                inx++;
            }

        }



    }

}
















class SetA109 {
    constructor() {
    }

    initOpts(md) {
        var self = this;
        var opts = {};
        opts.title = "A109";
        opts.pageCnt = 0;
        opts.setEn_f = 0;
        opts.errDnA = [];
        for (var i = 0; i < 48; i++)
            opts.errDnA.push(0);
        var rxData = opts.rxData = {};
        Block.setBaseOpts(opts);
        return opts;
    }

    chkWatch() {
        var self = this;
        var md = this.md;
        var op = md.opts;
        var st = md.stas;
        st.textA = [];
        st.setA = [];
        st.valueA = [];
        st.valueColorA = [];
        var errDnA = op.errDnA;
        var errValA = gr.syncData.errValA;





        for (var i = 0; i < 16; i++) {
            if (op.pageCnt === 2 && i >= 5) {
                st.textA.push("");
                st.setA.push("");
                st.valueA.push("");
                continue;
            }



            var overFlag = errValA[op.pageCnt + 32];
            var fontColor = "#0f0";
            if (overFlag & (1 << i)) {
                var fontColor = "#f00";
            }
            st.valueColorA.push(fontColor);

            st.textA.push(gr.paraSet.a109Dsc[op.pageCnt * 16 + i]);

            var setBuf = errDnA[op.pageCnt * 16 + i];
            setBuf = setBuf - 2048;
            setBuf = setBuf / 2048.0 * 10.0;
            if (setBuf > 9.99)
                setBuf = 9.99;
            if (setBuf < -9.99)
                setBuf = -9.99;
            var str = setBuf.toFixed(2);
            if (op.pageCnt !== 2)
                st.setA.push(str);
            else
                st.setA.push("" + errDnA[40 + i]);


            var setBuf = errValA[op.pageCnt * 16 + i];
            setBuf = setBuf - 2048;
            setBuf = setBuf / 2048.0 * 10.0;
            if (setBuf > 9.99)
                setBuf = 9.99;
            if (setBuf < -9.99)
                setBuf = -9.99;
            var str = setBuf.toFixed(2);


            if (op.pageCnt !== 2)
                st.valueA.push(str);
            else
                st.valueA.push("");

        }

    }

    setPrg(id, setId) {
        var self = this;
        var md = self.md;
        var op = md.opts;

        var opts = {};

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
        opts.baseColor = "#000";
        blocks[cname] = { name: "basePanel", type: "Component~Cp_base~plate.none", opts: opts };
        //======================================    
        var cname = lyMaps["body"] + "~" + 0;
        var opts = {};
        opts.margin = 8;
        opts.yArr = ["0.08rh", 9999];
        opts.ym = 4;
        layouts[cname] = { name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts };
        lyMaps["mainBody"] = cname;
        //==============================
        var cname = lyMaps["mainBody"] + "~" + 0;
        var actionPrg = function (iobj) {
            console.log(iobj);
            if (iobj.kvObj.opts.buttonId === "next") {
                op.pageCnt++;
                if (op.pageCnt > 2)
                    op.pageCnt = 0;
                return;
            }
            if (iobj.kvObj.opts.buttonId === "save") {
                var paras = [];
                for (var i = 0; i < op.errDnA.length; i++)
                    paras.push(op.errDnA[i])
                ws.cmd("saveA109", paras);
                //MdaPopWin.popOff(2);
                return;
            }
            ws.cmd("viewA101");
            MdaPopWin.popOff(2);

        }
        var buttons = ["next", "esc"];
        if (op.setEn_f)
            buttons = ["save", "next", "esc"];

        mac.setHeadTitleBar(md, cname, "A109", actionPrg, buttons);

        var cname = lyMaps["mainBody"] + "~" + 1;
        var opts = {};
        opts.margin = 0;
        opts.yc = 17;
        opts.ym = 0;
        layouts[cname] = { name: cname, type: "Layout~Ly_base~array.sys0", opts: opts };
        lyMaps["mainBody1"] = cname;









        for (var i = 0; i < 17; i++) {
            var cname = lyMaps["mainBody1"] + "~" + i;
            var opts = {};
            opts.margin = 0;
            opts.xArr = [9999, "0.2rw", "0.2rw"];
            opts.xm = 6;
            layouts[cname] = { name: cname, type: "Layout~Ly_base~xyArray.sys0", opts: opts };
            lyMaps["mainBody1" + i] = cname;
        }
        var iStart = 0;
        var iLen = 16
        if (op.pageCnt === 1) {
            var iStart = 16;
        }
        if (op.pageCnt === 2) {
            var iStart = 32;
        }

        var a109Dsc = gr.paraSet.a109Dsc;
        var a109Set = gr.paraSet.a109Set;
        var a109Value = gr.paraSet.a109Set;
        for (var i = 0; i < iLen + 1; i++) {

            var cname = lyMaps["mainBody1" + i] + "~" + 1;
            var opts = {};
            opts.fontSize = "0.7rh";
            if (i === 0) {
                opts.innerText = "設定值"
                opts.innerTextColor = "#fff"
                blocks[cname] = { name: "setA#" + i, type: "Component~Cp_base~plate.none", opts: opts };
            }
            else {
                opts.innerText = a109Set[iStart + i - 1];


                if (op.setEn_f) {
                    opts.innerTextColor = "#ff0"
                    opts.mouseClick_f = 1;
                    opts.actionFunc = function (iobj) {
                        console.log(iobj);
                        var inx = parseInt(iobj.kvObj.name.split("#")[1]);
                        var itemInx = op.pageCnt * 16 + inx - 1;
                        if (itemInx >= 37)
                            return;
                        if (itemInx >= 32)
                            itemInx += 8;
                        var opts = {};
                        opts.title = "請輸入設定值";
                        opts.setOpts = {};
                        opts.setOpts.value = iobj.kvObj.opts.innerText;
                        opts.actionFunc = function (iobj) {
                            console.log(iobj);
                            if (iobj.act === "padEnter") {
                                var setv = parseFloat(iobj.inputText);
                                if (op.pageCnt != 2)
                                    setv = (setv * 2048 / 10) + 2048;
                                setv = Math.round(setv);
                                op.errDnA[itemInx] = setv;

                            }
                        };
                        box.floatPadBox(opts);





                    };
                }

                else
                    opts.innerTextColor = "#fff"
                if (i % 2 === 0)
                    opts.baseColor = "#222";
                else
                    opts.baseColor = "#004";
                var regName0 = "self.fatherMd.stas.setA#";
                Block.setInputWatch(opts, "directReg", regName0 + (i - 1), "innerText", 1);
                blocks[cname] = { name: "setA#" + i, type: "Component~Cp_base~plate.none", opts: opts };
            }


            var cname = lyMaps["mainBody1" + i] + "~" + 2;
            var opts = {};
            opts.fontSize = "0.7rh";
            if (i === 0) {
                opts.innerText = "取樣值"
                opts.innerTextColor = "#fff"
                blocks[cname] = { name: "sampleA#" + i, type: "Component~Cp_base~plate.none", opts: opts };
            }
            else {
                opts.innerText = a109Value[iStart + i - 1];
                opts.baseColor = "#8f8"
                opts.innerTextColor = "#0f0";
                if (i % 2 === 0)
                    opts.baseColor = "#222";
                else
                    opts.baseColor = "#004";
                var regName0 = "self.fatherMd.stas.valueA#";
                var regName1 = "self.fatherMd.stas.valueColorA#";
                Block.setInputWatch(opts, "directReg", regName0 + (i - 1), "innerText", 1);
                Block.setInputWatch(opts, "directReg", regName1 + (i - 1), "innerTextColor", 1);
                blocks[cname] = { name: "sampleA#" + i, type: "Component~Cp_base~plate.none", opts: opts };
            }


            var cname = lyMaps["mainBody1" + i] + "~" + 0;
            var opts = {};
            opts.fontSize = "0.7rh";
            if (i === 0) {
                opts.innerText = "說明"
                opts.innerTextColor = "#fff"
                blocks[cname] = { name: "dscA#" + i, type: "Component~Cp_base~plate.none", opts: opts };
            }
            else {
                opts.innerText = a109Dsc[iStart + i - 1];;
                opts.innerTextColor = "#fff"
                opts.textAlign = "left";
                opts.lpd = 10;
                if (i % 2 === 0)
                    opts.baseColor = "#222";
                else
                    opts.baseColor = "#004";

                var regName0 = "self.fatherMd.stas.textA#";
                Block.setInputWatch(opts, "directReg", regName0 + (i - 1), "innerText", 1);
                blocks[cname] = { name: "dscA#" + i, type: "Component~Cp_base~plate.none", opts: opts };
            }
        }




    }


}
