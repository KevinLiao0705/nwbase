/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global gr, sys */

class SubOpts {
    static init() {
        //=============================================================
        if ("Component~Cp_base~button.sys0"){
            var opts = gr.blockSubOpts["Component~Cp_base~button.sys0"] = {};
            opts.propertyWidth = 200;
            opts.propertyHeight = 50;
            opts.viewMouseUpDown_f = 1;
            opts.viewMouseOverOut_f = 1;
            opts.mouseOnBorderColor = "#aaf";
            //=================
            opts.innerText = "Button";//"1234568<br>abcd";
            opts.fontSize = "0.7rh";
            opts.textShadow = "1px 1px 1px #fff";
            opts.innerTextColor = "#000";
            opts.disableTextColor = "#aaa";
            //opts.fontWeight="bold";
            opts.disable_f = 0;
            //=================
            opts.baseColor="#ccf";
            opts.borderType = "buttonFree";//none|normal|buttonPush|buttonFree
            opts.borderRadius = "0.15rh";
            opts.borderWidth = 2;
            opts.borderColor = "#fff";
            //=================
            opts.insideShadowBlur = "0.1rh";
            opts.outsideShadowBlur = null;
            opts.mouseClick_f = 1;
            opts.cursor="pointer";
            opts.fontFamily="Tahoma";
        }
        
        if ("Component~Cp_base~button.sys1"){
            var opts = gr.blockSubOpts["Component~Cp_base~button.sys1"] = {};
            KvLib.deepCoverObject(opts, gr.blockSubOpts["Component~Cp_base~button.sys0"]);
            opts.outsideShadowBlur = "0.2rh";
        }
        
        if ("Component~Cp_base~button.sys2"){
            var opts = gr.blockSubOpts["Component~Cp_base~button.sys2"] = {};
            KvLib.deepCoverObject(opts, gr.blockSubOpts["Component~Cp_base~button.sys0"]);
            opts.innerText="ABCDEFG<br>1234567";
            opts.fontSize="0.6rh";
            opts.tpd=6;
            opts.bpd=6;
            
        }
        
        if ("Component~Cp_base~button.sys3"){
            var opts = gr.blockSubOpts["Component~Cp_base~button.sys3"] = {};
            KvLib.deepCoverObject(opts, gr.blockSubOpts["Component~Cp_base~button.sys0"]);
            opts.insideShadowBlur = null;
            opts.borderRadius = 0;
        }
        
        if ("Component~Cp_base~button.sys4"){
            var opts = gr.blockSubOpts["Component~Cp_base~button.sys4"] = {};
            KvLib.deepCoverObject(opts, gr.blockSubOpts["Component~Cp_base~button.sys0"]);
            opts.borderWidth=0;
            opts.borderRadius = 0;
            opts.fontSize="0.9rw";
            opts.innerText="";
            opts.mouseOnBaseColor = "#eee";
            opts.insideShadowBlur = 6;
            opts.textShadow=null;
            opts.cursor="";
            
        }
        
        if ("Component~Cp_base~button.list"){
            var opts = gr.blockSubOpts["Component~Cp_base~button.list"] = {};
            KvLib.deepCoverObject(opts, gr.blockSubOpts["Component~Cp_base~button.sys3"]);
            opts.borderWidth=0;
            opts.textAlign="left";
            opts.lpd=4;
            opts.fontSize="0.5rh";
            opts.baseColor="#ddd";
            opts.mouseOnBaseColor = "#008";
            opts.mouseOnTextColor = "#fff";
            opts.textShadow=null;
            
        }

        if ("Component~Cp_base~button.none"){
            var opts = gr.blockSubOpts["Component~Cp_base~button.none"] = {};
            //KvLib.deepCoverObject(opts, gr.blockSubOpts["Component~Cp_base~button.sys3"]);
            //opts.viewMouseOverOut_f = 1;
            opts.baseColor="rgba(0,0,0,0)";
            opts.mouseClick_f = 1;
            //opts.cursor="pointer";
            //opts.mouseOnBaseColor = "#aaf";
            //opts.mouseOnTextColor = "#fff";
            //opts.textShadow = null;
            
        }
        
        if ("Component~Cp_base~button.menu0"){
            var opts = gr.blockSubOpts["Component~Cp_base~button.menu0"] = {};
            opts.propertyWidth = 200;
            opts.propertyHeight = 50;
            opts.viewMouseUpDown_f = 1;
            opts.viewMouseOverOut_f = 1;
            //=================
            opts.innerText = "123456";//"1234568<br>abcd";
            opts.fontSize = "0.7rh";
            opts.innerTextColor = "#000";
            //=================
            opts.baseColor="#ccc";
            opts.borderType = "normal";//none|normal|buttonPush|buttonFree
            opts.borderRadius = "0.15rh";
            opts.borderWidth = 1;
            opts.borderColor = "#ccc";
            //=================
            opts.mouseClick_f = 1;
            opts.cursor="pointer";
            opts.fontFamily="Impact";//  "Courier New";
        }
        
        if ("Component~Cp_base~checkBox.sys0"){
            var opts = gr.blockSubOpts["Component~Cp_base~checkBox.sys0"] = {};
            KvLib.deepCoverObject(opts, gr.blockSubOpts["Component~Cp_base~button.sys3"]);
            opts.checkBoxWidth = 40;
            opts.textAlign="left";
            opts.lpd=6;
            opts.checked_f=1;
        }
        
        if ("Component~Cp_base~radioBox.sys0"){
            var opts = gr.blockSubOpts["Component~Cp_base~radioBox.sys0"] = {};
            KvLib.deepCoverObject(opts, gr.blockSubOpts["Component~Cp_base~checkBox.sys0"]);
            opts.radioName = "radioName";
        }
        
        if ("Component~Cp_base~button.red"){
            var opts = gr.blockSubOpts["Component~Cp_base~button.red"] = {};
            KvLib.deepCoverObject(opts, gr.blockSubOpts["Component~Cp_base~button.sys0"]);
            opts.outsideShadowBlur = null;
            opts.insideShadowColor="#f00";
            opts.baseColor="#fcc";
        }
        
        if ("Component~Cp_base~button.green"){
            var opts = gr.blockSubOpts["Component~Cp_base~button.green"] = {};
            KvLib.deepCoverObject(opts, gr.blockSubOpts["Component~Cp_base~button.sys0"]);
            opts.outsideShadowBlur = null;
            opts.insideShadowColor="#0f0";
            opts.baseColor="#cfc";
        }
        
        if ("Component~Cp_base~button.blue"){
            var opts = gr.blockSubOpts["Component~Cp_base~button.blue"] = {};
            KvLib.deepCoverObject(opts, gr.blockSubOpts["Component~Cp_base~button.sys0"]);
            opts.outsideShadowBlur = null;
            opts.insideShadowColor="#00f";
            opts.baseColor="#ccf";
        }
        
        if ("Component~Cp_base~button.yellow"){
            var opts = gr.blockSubOpts["Component~Cp_base~button.yellow"] = {};
            KvLib.deepCoverObject(opts, gr.blockSubOpts["Component~Cp_base~button.sys0"]);
            opts.outsideShadowBlur = null;
            opts.insideShadowColor="#ff0";
            opts.baseColor="#ffc";
        }

        if ("Component~Cp_base~button.dark"){
            var opts = gr.blockSubOpts["Component~Cp_base~button.dark"] = {};
            KvLib.deepCoverObject(opts, gr.blockSubOpts["Component~Cp_base~button.sys0"]);
            opts.insideShadowColor="#ccc";
            opts.baseColor="#444";
            opts.innerTextColor="#fff";
            opts.textShadow = "2px 2px 2px #000";
            //opts.styles=`{base:{color:"#f00"}}`;
        }

        if ("Component~Cp_base~button.alt"){
            var opts = gr.blockSubOpts["Component~Cp_base~button.alt"] = {};
            KvLib.deepCoverObject(opts, gr.blockSubOpts["Component~Cp_base~button.dark"]);
            opts.baseColor="#000";
            opts.textShadow = "1px 1px 1px #000";
            opts.altColors=["#888","#f88","#0f0","#88f","#ff0","#fff"];
            opts.altColorInx=0;
            opts.insideShadowBlur = "0.2rh";
            opts.borderType="normal";
            opts.outsideShadowOffx=0;
            opts.outsideShadowOffy=0;
            opts.outsideShadowBlur = "0.2rh";
        }

        if ("Component~Cp_base~plate.sys0"){
            var opts = gr.blockSubOpts["Component~Cp_base~plate.sys0"] = {};
            opts.propertyWidth = 500;
            opts.propertyHeight = 500;
            //=================
            opts.baseColor = "#ccc";
            opts.borderType = "normal";//none|normal|buttonPush|buttonFree
            opts.borderWidth = 1;
            opts.borderColor = "#fff";
            //=================
        }
        
        if ("Component~Cp_base~plate.sys1"){
            var opts = gr.blockSubOpts["Component~Cp_base~plate.sys1"] = {};
            KvLib.deepCoverObject(opts, gr.blockSubOpts["Component~Cp_base~plate.sys0"]);
            opts.borderWidth = 2;
            opts.outsideShadowBlur = 10;
        }
        
        if ("Component~Cp_base~plate.none"){
            var opts = gr.blockSubOpts["Component~Cp_base~plate.none"] = {};
            KvLib.deepCoverObject(opts, gr.blockSubOpts["Component~Cp_base~plate.sys0"]);
            opts.borderWidth = 0;
            opts.baseColor="rgba(0,0,0,0)";
        }
        
        if ("Component~Cp_base~images.sys0"){
            var opts = gr.blockSubOpts["Component~Cp_base~images.sys0"] = {};
            KvLib.deepCoverObject(opts, gr.blockSubOpts["Component~Cp_base~plate.none"]);
            opts.backgroundImageUrls=["systemResource/josn_elec_a_169x40.png"];
            opts.backgroundInx=0;
            opts.backgroundImagePosition="extend";
            opts.baseColor="rgba(0,0,0,0)";
        }
        
        if ("Component~Cp_base~icons.sys0"){
            var opts = gr.blockSubOpts["Component~Cp_base~icons.sys0"] = {};
            KvLib.deepCoverObject(opts, gr.blockSubOpts["Component~Cp_base~plate.none"]);
            opts.backgroundImageUrls=["systemResource/color.png"];
            opts.backgroundInx=0;
            opts.baseColor="rgba(0,0,0,0)";
        }
        if ("Component~Cp_base~icons.led"){
            var opts = gr.blockSubOpts["Component~Cp_base~icons.led"] = {};
            KvLib.deepCoverObject(opts, gr.blockSubOpts["Component~Cp_base~plate.none"]);
            opts.backgroundImageUrls=[];
            opts.backgroundImageUrls.push("systemResource/gray_light.png");
            opts.backgroundImageUrls.push("systemResource/green_light.png");
            opts.backgroundImageUrls.push("systemResource/red_light.png");
            opts.backgroundImageUrls.push("systemResource/yellow_light.png");
            opts.backgroundImageUrls.push("systemResource/blue_light.png");
            opts.backgroundInx=0;
            opts.baseColor="rgba(0,0,0,0)";
        }
        
        
        if ("Component~Cp_base~images.lcd"){
            var opts = gr.blockSubOpts["Component~Cp_base~images.lcd"] = {};
            KvLib.deepCoverObject(opts, gr.blockSubOpts["Component~Cp_base~plate.none"]);
            opts.textShadow = "1px 1px 1px #000";
            opts.innerTextColor = "#ddd";
            //=================
            opts.baseColor="#44f";
            opts.borderType = "normal";//none|normal|buttonPush|buttonFree
            opts.borderWidth = 2;
            opts.borderColor = "#fff";
            //=================
            opts.insideShadowBlur = "0.2rh";
            opts.fontFamily="digital_2";
            opts.borderRadius = 0;
            opts.fontSize="1.0rh";
            opts.fontWeight="bold";
            opts.maxFontSize=500;
            
            /*
            opts.mouseClick_f = 0;
            opts.cursor="";
            opts.baseColor="#8ff";
            opts.fontFamily="digital_1";
            opts.borderRadius = 0;
            opts.fontSize="1.0rh";
            opts.fontWeight="bold";
            opts.viewMouseUpDown_f = 0;
            opts.viewMouseOverOut_f = 0;
            */
            
            
            /*
            var opts = gr.blockSubOpts["Component~Cp_base~images.lcd"] = {};
            KvLib.deepCoverObject(opts, gr.blockSubOpts["Component~Cp_base~plate.none"]);
            opts.backgroundImageUrls=["systemResource/lcd2.bmp"];
            opts.backgroundInx=0;
            opts.backgroundImagePosition="extend";
            opts.baseColor="rgba(0,0,0,0)";
            opts.borderRadius = 4;
            opts.borderColor="#000";
            opts.borderWidth = 2;
            opts.innerText="12345";
            opts.fontSize="1.0rh";
            opts.fontWeight="bold";
            opts.innerTextColor="#44a";
            opts.fontFamily="digital_1";
            //opts.insideShadowBlur = "0.2rh";
            opts.textShadow = "2px 2px 2px #000";
             * 
             */
            
            
        }
        
        if ("Component~Cp_base~label.sys0"){
            var opts = gr.blockSubOpts["Component~Cp_base~label.sys0"] = {};
            opts.propertyWidth = 200;
            opts.propertyHeight = 40;
            //=================
            opts.baseColor = "#ccc";
            opts.borderType = "normal";//none|normal|buttonPush|buttonFree
            opts.borderWidth = 1;
            opts.borderColor = "#888";
            opts.innerText="Label";
            //=================
        }
        
        if ("Component~Cp_base~label.sys1"){
            var opts = gr.blockSubOpts["Component~Cp_base~label.sys1"] = {};
            KvLib.deepCoverObject(opts, gr.blockSubOpts["Component~Cp_base~label.sys1"]);
            opts.baseColor = "#444";
            opts.innerTextColor="#ddd";
            opts.textShadow = "2px 2px 2px #000";
        }

        if ("Component~Cp_base~label.led"){
            var opts = gr.blockSubOpts["Component~Cp_base~label.led"] = {};
            opts.propertyWidth = 200;
            opts.propertyHeight = 40;
            //=================
            opts.borderRadius = "0.4rh";
            opts.borderWidth = 2;
            //=================
            opts.baseColor="#ccc";
            //opts.altColors=["#888","#f88","#0f0","#88f","#ff0","#fff"];
            //opts.altColorInx=0;
            opts.insideShadowBlur = "0.2rh";
            opts.borderType="normal";
            opts.outsideShadowOffx=0;
            opts.outsideShadowOffy=0;
            opts.outsideShadowBlur = "0.1rh";
            opts.innerTextColor="#000";
            //opts.iw="0.9rh";
            //opts.ih="0.9rh";
        }

        if ("Component~Cp_base~label.view"){
            var opts = gr.blockSubOpts["Component~Cp_base~label.view"] = {};
            KvLib.deepCoverObject(opts, gr.blockSubOpts["Component~Cp_base~label.led"]);
            opts.borderRadius = "0.1rh";
            opts.baseColor="#f0f0ff";
        }



        if ("Component~Cp_base~label.sys2"){
            var opts = gr.blockSubOpts["Component~Cp_base~label.sys2"] = {};
            KvLib.deepCoverObject(opts, gr.blockSubOpts["Component~Cp_base~label.sys0"]);
            opts.baseColor = "#888";
            opts.innerTextColor="#fff";
            opts.textShadow = "3px 3px 3px #000";
        }


        if ("Component~Cp_base~label.lamp"){
            var opts = gr.blockSubOpts["Component~Cp_base~label.lamp"] = {};
            KvLib.deepCoverObject(opts, gr.blockSubOpts["Component~Cp_base~button.sys0"]);
            opts.mouseClick_f = 0;
            opts.cursor="";
            opts.baseColor="#cfc";
            opts.borderRadius = "0.6rh";
            
            
        }


        if ("Component~Cp_base~label.title"){
            var opts = gr.blockSubOpts["Component~Cp_base~label.title"] = {};
            KvLib.deepCoverObject(opts, gr.blockSubOpts["Component~Cp_base~label.sys0"]);
            opts.baseColor = "#004";
            opts.innerTextColor="#fff";
            opts.fontFamily = "Impact";
            opts.borderWidth=0;
            opts.lpd=4;
            opts.textShadow = "3px 3px 3px #000";
        }



        if ("Component~Cp_base~label.gridTr"){
            var opts = gr.blockSubOpts["Component~Cp_base~label.gridTr"] = {};
            KvLib.deepCoverObject(opts, gr.blockSubOpts["Component~Cp_base~label.sys0"]);
            opts.borderType="gridTr";
        }
        
        
        
        if ("Component~Cp_base~label.sys3"){
            var opts = gr.blockSubOpts["Component~Cp_base~label.sys3"] = {};
            KvLib.deepCoverObject(opts, gr.blockSubOpts["Component~Cp_base~label.sys0"]);
            opts.borderType = "buttonFree";//none|normal|buttonPush|buttonFree
            opts.borderRadius = 0;
            opts.borderWidth = 2;
            opts.borderColor = "#fff";
        }

        if ("Component~Cp_base~inputText.sys0"){
            var opts = gr.blockSubOpts["Component~Cp_base~inputText.sys0"] = {};
            KvLib.deepCoverObject(opts, gr.blockSubOpts["Component~Cp_base~label.sys0"]);
            opts.textAlign="left";
            opts.lpd=10;
            opts.rpd=10;
            opts.editFontSize="0.5rh";
            //opts.titleWidth=100;
            opts.readOnly_f=0;
            opts.blur_f=0;
            opts.keyPress_f=1;
            opts.editValue="1234";
            opts.editFontFamily = "monospace";
            
        }
        
        if ("Component~Cp_base~editor.sys0"){
            var opts = gr.blockSubOpts["Component~Cp_base~editor.sys0"] = {};
            opts.propertyWidth = 400;
            opts.propertyHeight = 400;
            opts.baseColor="#222";
            opts.fontSize=20;
            opts.readOnly_f=0;
            opts.innerTextColor="#ccc";
            opts.editValue="";
            //=================
        }
        
        
        if ("Component~Cp_base~led.sys0"){
            var opts = gr.blockSubOpts["Component~Cp_base~led.sys0"] = {};
            opts.propertyWidth = 40;
            opts.propertyHeight = 40;
            //=================
            opts.borderRadius = "0.6rh";
            opts.borderWidth = 3;
            //=================
            opts.baseColor="#ccc";
            opts.altColors=["#444","#f88","#0f0","#88f","#ff0","#fff"];
            opts.altColorInx=0;
            opts.insideShadowBlur = "0.8rh";
            opts.borderType="normal";
            opts.outsideShadowOffx=0;
            opts.outsideShadowOffy=0;
            opts.outsideShadowBlur = "0.2rh";
            opts.iw="0.9rh";
            opts.ih="0.9rh";
        }

        if ("Component~Cp_base~led.sys1"){
            var opts = gr.blockSubOpts["Component~Cp_base~led.sys1"] = {};
            KvLib.deepCoverObject(opts, gr.blockSubOpts["Component~Cp_base~led.sys0"]);
            opts.backgroundImageUrls=[];
            opts.backgroundImageUrls.push("systemResource/led_base.png");
            opts.backgroundImageUrls.push("systemResource/led_red.png");
            opts.backgroundImageUrls.push("systemResource/led_green.png");
            opts.backgroundImageUrls.push("systemResource/led_blue.png");
            opts.backgroundImageUrls.push("systemResource/led_yellow.png");
            opts.backgroundImageUrls.push("systemResource/led_white.png");
            opts.insideShadowBlur = null;
            opts.borderWidth = 2;
            opts.outsideShadowBlur = "0.5rh";
            opts.altColorInx=1;
            opts.backgroundInx=1;
            opts.backgroundImagePosition="extend";
        }
        if ("Component~Cp_base~led.sys2"){
            var opts = gr.blockSubOpts["Component~Cp_base~led.sys2"] = {};
            KvLib.deepCoverObject(opts, gr.blockSubOpts["Component~Cp_base~led.sys0"]);
            opts.baseColor="#444";
            opts.borderRadius = 4;
            opts.borderWidth = 5;
            opts.iw=null;
            opts.ih=null;
        }    
    }
}
SubOpts.init();
