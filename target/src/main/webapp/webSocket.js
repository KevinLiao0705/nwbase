class MyWebSocket {
    constructor() {
        this.wsok = 0;
        this.socket = null;
        this.webSocketConnTime = 0;
        this.tickTime = 0;
        this.tickTimeK = 2;
        this.txSerial = 0;

    }

    socketPrg() {
        var self = this;
        if (self.wsok)
            return;
        try {
            var sockIp = gr.webIp;
            //if(gr.paraSet.systemIpAddress)
            //    sockIp=gr.paraSet.systemIpAddress;
            if (gr.paraSet.webSocketAddr)
                sockIp = gr.paraSet.webSocketAddr;
            self.socket = new WebSocket('ws://' + sockIp + ':' + gr.webSocketPort + '/websocket');
            console.log("connect to webServer:" + sockIp + ':' + gr.webSocketPort);

        } catch (ex) {
            console.log(ex);
        }
        self.wsok = null;
        self.socket.onopen = function () {
            self.wsok = self.socket;
            console.log("WebSocket on Open");
        };
        self.socket.onclose = function () {
            self.wsok = null;
            //console.log("WebSocket Disconnect...");
        };
        self.socket.onmessage = function (evt) {
            var received_msg = evt.data;
            var recObj = JSON.parse(received_msg);
            if (gr.systemName !== recObj.systemName)
                return;
            if (recObj.dataType === "webSocketServerData") {
                gr.webSocketConnectCnt = recObj.txSerial;
                if (recObj.responseType === "errorDialogOkMessage") {
                    if (recObj.message) {
                        console.log(recObj.message);
                        gr.footBarMessageText = recObj.message;
                        gr.footBarMessageTime = recObj.responseWaitTime;
                        if(recObj.status ==="ok")
                            gr.footBarMessageColor = "#0000ff";
                        if(recObj.status ==="error")
                            gr.footBarMessageColor = "#ff0000";
                    }
                }
            }
            else {
                var wsSysJson = JSON.parse(recObj.wsSysJson);
                gr.webSocketConnectCnt = wsSysJson.serialTime;
            }
            if (recObj.responseType) {
                if (recObj.responseType === "okDialog" || recObj.responseType === "errorDialog") {
                    var opts = {};
                    if (recObj.responseWaitTime) {
                        opts.waitTime = recObj.responseWaitTime;
                    }
                    opts.kvTexts = recObj.message.split("\n");
                    if (recObj.responseType === "okDialog") {
                        if (recObj.status == "ok")
                            box.okBox(opts);
                    }
                    if (recObj.status == "error")
                        box.errorBox(opts);
                }
                if (recObj.responseType === "okMessage" || recObj.responseType === "errorMessage") {
                    var opts = {};
                    gr.footBarMessageText = recObj.message;
                    if (recObj.responseWaitTime) {
                        gr.footBarMessageTime = (recObj.responseWaitTime / 16) | 0;
                    }
                    if (recObj.responseType === "okMessage") {
                        if (recObj.status == "ok") {
                            gr.footBarMessageColor = "#0000ff";
                        }
                    }
                    if (recObj.status == "error")
                        gr.footBarMessageColor = "#ff0000";

                }
            }
            if (gr.socketRetPrgTbl[recObj.act])
                gr.socketRetPrgTbl[recObj.act](recObj);
        };
        return;
    }




    closeSocket() {
        if (this.wsok) {
            this.wsok.close();
        }

    }

    sendSocket(obj) {
        if (!gr.webSocketEnable_f)
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
        obj.dataType = "browserCommand";
        obj.txSerial = this.txSerial++;
        try {
            if (self.wsok.readyState) {
                self.wsok.send(JSON.stringify(obj));

            }
        } catch (ex) {
            console.log(ex);
        }
        return obj.txSerial;
    }

    tick(iobj) {
        var self = this;
        if (++self.tickTime >= self.tickTimeK) {
            self.tickTime = 0;
            if (iobj) {
                var obj = iobj;
            }
            else {
                var obj = {};
                obj.act = "tick";
            }
            return self.sendSocket(obj);
        }
        return null;
    }

    cmd(cmd, paras) {
        var self = this;
        self.tickTime = 0;
        var obj = {};
        obj.act = cmd;
        if (paras)
            obj.paras = paras;
        self.sendSocket(obj);
    }

}
var ws = new MyWebSocket();