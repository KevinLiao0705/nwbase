class MyWebSocket {
    constructor() {
        this.wsok = 0;
        this.socket = null;
        this.webSocketConnect_f = 0;
        this.webSocketConnectCnt = 0;
        this.webSocketConnTime = 0;
        this.tickTime = 0;
        this.tickTimeK = 2;

    }

    socketPrg() {
        var self = this;
        if (self.wsok)
            return;
        try {
            var sockIp=gr.webIp;
            //if(gr.paraSet.systemIpAddress)
            //    sockIp=gr.paraSet.systemIpAddress;
            if(gr.paraSet.webSocketAddr)
                sockIp=gr.paraSet.webSocketAddr;
            self.socket = new WebSocket('ws://' + sockIp + ':' + gr.webSocketPort + '/websocket');
            console.log("connect to webServer:"+sockIp + ':' + gr.webSocketPort);
            
        } catch (ex) {
            console.log(ex);
        }
        self.wsok = null;
        self.socket.onopen = function ()
        {
            self.wsok = self.socket;
            console.log("WebSocket on Open");
        };
        self.socket.onclose = function ()
        {
            self.wsok = null;
            //console.log("WebSocket Disconnect...");
        };
        self.socket.onmessage = function (evt)
        {
            if (self.webSocketConnect_f === 0) {
                self.webSocketConnect_f = 1;
            }
            self.webSocketConnectCnt = 0;
            var received_msg = evt.data;
            var recObj = JSON.parse(received_msg);
            var wsSysObj = JSON.parse(recObj.wsSysJson);
            gr.webSocketConnectCnt=wsSysObj.serialTime;
            //gr.footBarStatus0 = "Connected " + (wsSysObj.serialTime % 10);
            if (gr.socketRetPrgTbl[recObj.act])
                gr.socketRetPrgTbl[recObj.act](recObj);
            if (recObj.tickBackValue) {
                var tickBackValue = JSON.parse(recObj.tickBackValue);
                if (gr.socketRetPrgTbl[tickBackValue.actName])
                    gr.socketRetPrgTbl[tickBackValue.actName](tickBackValue);
            }
            if (recObj.testBackValue) {
                console.log(recObj.testBackValue);
            }
            if (recObj.syncData) {
                if (gr.socketRetPrgTbl["tick"]) {
                    gr.socketRetPrgTbl["tick"](recObj.syncData);
                }
            }
            if (recObj.sipphoneData) {
                if (gr.socketRetPrgTbl["tick"]) {
                    gr.socketRetPrgTbl["tick"](recObj.sipphoneData);
                }
            }
            if (recObj.sipphoneUiData) {
                if (gr.socketRetPrgTbl["tick"]) {
                    gr.socketRetPrgTbl["tick"](recObj.sipphoneUiData);
                }
            }
        };
        return;
    }
    
    
    
    
    closeSocket() {
        if (this.wsok) {
            this.wsok.close();
        }

    }

    sendSocket(obj) {
        if(!gr.webSocketEnable_f)
            return;
        var self = this;
        if (!self.wsok) {
            self.webSocketConnTime++;
            if (self.webSocketConnTime >= 60) {
                self.webSocketConnTime = 0;
                self.socketPrg();
            }
            return;
        }
        obj.deviceId = gr.deviceId;
        obj.userName = gr.userName;
        try {
            if (self.wsok.readyState)
                self.wsok.send(JSON.stringify(obj));
        } catch (ex) {
            console.log(ex);
        }
    }

    tick(iobj) {
        var self = this;
        if (++self.tickTime >= self.tickTimeK) {
            self.tickTime = 0;
            if(iobj){
                var obj=iobj;
                if(obj.uiCmd)
                    console.log(obj.uiCmd);
            }    
            else{
                var obj = {};
                 obj.act = "tick";
            }     
            self.sendSocket(obj);
            return 1;
        }
        return 0;
    }

    cmd(cmd, paras) {
        var self = this;
        self.tickTime = 0;
        var obj = {};
        obj.act = cmd;
        if(paras)
            obj.paras = paras;
        self.sendSocket(obj);
    }

}
var ws = new MyWebSocket();