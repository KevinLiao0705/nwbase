class GlobalRes {

    static initApp(self) {
        if (self.systemName === "dummyTarget") {
            self.deviceId="syncSet";
            if (self.appId === 0)
                self.appType = "Model~DummyTargetMaster~base.sys0";
            if (self.appId === 1)
                self.appType = "Model~DummyTargetSub~base.sys0";
            if (self.appId === 2)
                self.appType = "Model~DummyTargetCtr~base.sys0";
            if (self.appId === 99)
                self.appType = "Model~MdTest~base.sys0";
            self.logoImage = "systemResource/dummyTargetLogo.png";
            self.logoImageWidth = 800;
            self.logoImageHeight = 640;

        }
        if (self.systemName === "webBuilder") {
            self.appType = "Model~MdaMdTest~base.sys0";
        }
        if (self.systemName === "josnSipPhone") {
            self.deviceId="sipphoneSet";
            self.appType = "Model~SipphoneWeb~base.sys0";
        }
        if (self.systemName === "josnSipUi") {
            self.deviceId="sipphoneUiSet";
            self.appType = "Model~SipphoneUiWeb~base.sys0";
        }
        if (self.systemName === "sip6In1Ui") {
            self.deviceId="sip6In1UiSet";
            self.appType = "Model~Sip6In1UiWeb~base.sys0";
        }
        if (self.systemName === "flyingEagle") {
            self.deviceId="flyingEagleSet";
            self.appType = "Model~FlyingEagleWeb~base.sys0";
            self.logoImage = "systemResource/candidate_2_refined_640.png";
            self.logoImageWidth = 640;
            self.logoImageHeight = 640;


        }
    }
    constructor() {
        this.version = "w3.2";
        this.systemName="dummyTarget";
        //this.systemName="josnSipPhone";
        //this.systemName="josnSipUi";
        //this.systemName="webBuilder";
        //this.systemName="sip6In1Ui";
        //this.systemName="flyingEagle";
        this.appId=0;
        this.debug_f = 0;
        
        
        //=================================
        
        this.webSocketEnable_f=1;
        this.showLogo_f = 1;
        this.showLogoTime = 1000;//ms
        //this.logoImage = "systemResource/dummyTargetLogo.png";
        //this.logoImage = 'systemResource/robot_aiot_1920x1080.jpg';
        this.logoImage = "systemResource/candidate_2_refined_640.png";
        //this.logoImageWidth = 640;
        //this.logoImageHeight = 640;
        this.deviceId="";
        //=================================
        this.enabelLogin_f = 1;
        this.defaultUserName = "";
        this.defaultUserPassword = "";
        this.defaultUserName = "kevinAdmin";
        this.defaultUserPassword = "16020039";
        this.clearCookie_f = 0;
        //=================================
        this.globleTime = "DummyTargetMaster.globleTime()";
        GlobalRes.initApp(this);


        this.language = "chnT";
        this.appPageCnt = 0;
        this.appFirstEntry_f = 0;
        this.selfTestStartAll_f = 0;
        this.selfTestTime = 0;
        this.selfTestInx = 0;
        this.webSocketConnectCnt=0;
        this.webSocketConnectTime=0;
        //==============================
        this.kid = 0;
        this.ser = 0;
        //this.webSocketAddress = "192.168.0.28";
        this.webSocketAddress = "127.0.0.1";
        this.webSocketPort = "8765";
        this.webSocketConnect_f = 0;
        //
        this.mouseAct = {};
        this.baseColor = "#27282c";
        this.minFontSize = 10;
        this.maxFontSize = 200;
        this.mdTestInx = 0;
        this.scrollWidth = 0;
        this.debugCnt = 0;
        this.mouseDown_f = 0;
        this.addSubTimer = null;
        this.flash_f = 0;
        this.mesBoxOn_f = 0;
        this.paras = {};
        this.syncTmp = {};
        this.blockSubOpts = {};
        //============================
        this.footBarMessageText = "";
        this.footBarMessageColor = "#000";
        this.footBarMessageTime = 0;
        this.footBarStatus0 = "";
        this.footBarStatus1 = "";
        this.footBarStatus2 = "";
        /*
         this.message = "";
         this.messageKobj = null;
         this.messageTime = 0;
         this.messageColor = "#000";
         this.messageTimerId = null;
         this.status1 = "";
         this.status2 = "";
         this.status3 = "";
         */
        //============================
        this.animates = [];
        this.compOpts = {};
        this.modelOpts = {};
        this.compBaseOpts = {};
        this.plotOpts = {};
        this.plotBaseOpts = {};
        this.urlSelectObj = {};
        this.paraSet = {};
        this.socketRetPrgTbl = {};
        //=====================
        this.editUndoStack = [];
        this.editUndoInx = -1;
        this.editUndoEnd = -1;
        this.editUndo_f = 0;
        this.editRedo_f = 0;
        this.editUndoMax = 64;
        //============================
        this.systemParaSetPassword = "1234";
        this.systemParaSetDefaultPassword = "1234";
        this.repaint_f = 0;
        this.window_innerWidth_old = -1;
        this.window_innerHeight_old = -1;

        //this.systemName="webFrame";
        //this.systemName="future";
        //this.systemName="keyboardOled";
        //this.systemName="webIcs";



        this.mouseFuncPara = null;
        //this.googleMapKeys = ["AIzaSyDOlTL0xvlXJGN1gnqcV4zxEPhQW5rmd8Q"];
        this.googleMapKeys = [];


        this.colorTable = [
            "#ffffff",
            "#cccccc",
            "#888888",
            "#444444",
            "#000000",
            "#ff0000",
            "#aa0000",
            "#440000",
            "#00ff00",
            "#00aa00",
            "#004400",
            "#0000ff",
            "#0000aa",
            "#000044",
            "#00ffff",
            "#00aaaa",
            "#004444",
            "#ffff00",
            "#aaaa00",
            "#444400",
            "#000000",
            "#000000",
            "#000000"
        ];

        this.colorSetTbl = [//B/f
            "#4f4", "#000", //0
            "#ff0", "#000", //1
            "#f33", "#000", //2
            "#66f", "#000", //3
            "#000", "#4f4", //0
            "#000", "#ff0", //1
            "#000", "#f33", //2
            "#000", "#66f", //3

            "#060", "#fff", //0
            "#660", "#fff", //1
            "#800", "#fff", //2
            "#008", "#fff", //3
            "#fff", "#000", //0
            "#000", "#fff", //1
            "#fff", "#800", //2
            "#fff", "#008", //3

            "#000", "#000"  //end
        ];

        this.chartColors = {
            red: 'rgb(255, 99, 132)',
            orange: 'rgb(255, 159, 64)',
            yellow: 'rgb(255, 205, 86)',
            green: 'rgb(75, 192, 192)',
            blue: 'rgb(54, 162, 235)',
            purple: 'rgb(153, 102, 255)',
            grey: 'rgb(201, 203, 207)'
        };

        this.hexTable = [
            '0', '1', '2', '3',
            '4', '5', '6', '7',
            '8', '9', 'a', 'b',
            'c', 'd', 'e', 'f'
        ];


        var self = this;

        if ("syncUse") {




        }



    }
}



var gr = new GlobalRes();
//disable mouse right key
document.addEventListener('contextmenu', event => event.preventDefault());
/*================================================================*/
var gbStyle = document.createElement('style');
gbStyle.innerHTML = `
@font-face {
        font-family: digital_1;
        src: url(font/digital7a-mono.ttf);
}
@font-face {
        font-family: digital_2;
        src: url(font/digital7a-fixMono.ttf);
}
@font-face {
        font-family: digital_3;
        src: url(font/digital7a-fixItaly.ttf);
}
@font-face {
        font-family: digital_4;
        src: url(font/digital7b-italy.ttf);
}
@font-face {
        font-family: hk-1;
        src: url(font/hk-1.ttc);
}



@font-face {
  font-family: 'Material Icons';
  font-style: normal;
  font-weight: 400;
  src: local('Material Icons'),
    local('MaterialIcons-Regular'),
    url(iconfont/MaterialIcons-Regular.woff2) format('woff2'),
    url(iconfont/MaterialIcons-Regular.woff) format('woff'),
    url(iconfont/MaterialIcons-Regular.ttf) format('truetype');
}
.material-icons,.gf{
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  display: inline-block;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  text-overflow: hidden;  
  pointer-events:none;  
  /* Support for all WebKit browsers. */
  -webkit-font-smoothing: antialiased;
  /* Support for Safari and Chrome. */
  text-rendering: optimizeLegibility;
  /* Support for Firefox. */
  -moz-osx-font-smoothing: grayscale;
  /* Support for IE. */
  font-feature-settings: 'liga';
}
 `;

var mouseWheelFunc = function (event) {
    gr.wheelEvent = event;
    console.log("global wheel");
};

var mouseUpFunc = function (event) {
    gr.mouseDown_f = 1;
};
var mouseDownFunc = function (event) {
    gr.mouseDown_f = 0;
    gr.mouseDisable_f = 0;
};

document.head.appendChild(gbStyle);
document.addEventListener('mousedown', mouseUpFunc);
document.addEventListener('mouseup', mouseDownFunc);
//document.addEventListener('wheel', mouseWheelFunc);

/*================================================================*/
//google map use
var initMap = function () {

};