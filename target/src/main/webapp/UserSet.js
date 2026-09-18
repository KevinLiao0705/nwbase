//保存使用者設定，並在建立 UI 元件時覆蓋預設選項。
class UserSet {
    constructor() {
        this.set = {};
    }
    init() {
        var set = this.set;
        var optsSet = set["optsSet"] = {};
    }

}
var us = new UserSet();
us.init();