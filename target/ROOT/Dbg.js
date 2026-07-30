/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
class Dbg {
    constructor() {
    }

    getBuilderMenus() {
        var menus = this.getMenus("menu0", 8);
        var kvs0 = menus.kvTexts;
        kvs0[0].chnT = "";
        kvs0[0].image = "systemResource/color.png";
        
        kvs0[5].eng = "MdaTest";
        kvs0[5].id = "mdaTest";
        kvs0[5].menus=this.getMenus(kvs0[5].id, 8);
        var kvs05=kvs0[5].menus.kvTexts;
        //
        kvs0[6].eng = "ComponentTest";
        kvs0[6].id = "componentTest";
        kvs0[6].menus=this.getMenus(kvs0[6].id, 8);
        var kvs06=kvs0[6].menus.kvTexts;
        //
        kvs0[7].eng = "DialogTest";
        kvs0[7].id = "dialogTest";
        kvs0[7].menus=this.getMenus(kvs0[0].id, 9);
        var kvs07=kvs0[7].menus.kvTexts;
        //===================================================================
        kvs07[0].id="testMesssageBox";
        kvs07[0].eng="Test MesssageBox";
        kvs07[0].image = "systemResource/icons8-info-64.png";
        kvs07[0].menus=this.getMenus(kvs07[0].id, 5);
        var kvs070=kvs07[0].menus.kvTexts;
        kvs070[0].id="mesBox";
        kvs070[0].eng="Show mesBox";
        kvs070[0].image = "systemResource/icons8-info-64.png";
        kvs070[1].id="warnBox";
        kvs070[1].eng="Show warnBox";
        kvs070[1].image = "systemResource/icons8-warning-48.png";
        kvs070[2].id="okBox";
        kvs070[2].eng="Show okBox";
        kvs070[2].image = "systemResource/icons8-ok-60.png";
        kvs070[3].id="errorBox";
        kvs070[3].eng="Show errorBox";
        kvs070[3].image = "systemResource/icons8-error-48.png";
        kvs070[4].id="checkBox";
        kvs070[4].eng="Show checkBox";
        kvs070[4].image = "systemResource/icons8-check-48.png";
        //================================
        kvs07[1].id="testSelectBox";
        kvs07[1].eng="Test SelectBox";
        kvs07[1].image = "systemResource/icons8-select-64.png";
        kvs07[1].menus=this.getMenus(kvs07[1].id, 4);
        var kvs071=kvs07[1].menus.kvTexts;
        kvs071[0].id="selectBox";
        kvs071[0].eng="Show selectBox";
        kvs071[0].image = "systemResource/icons8-selection-48.png";
        kvs071[1].id="selectOkBox";
        kvs071[1].eng="Show selectOkBox";
        kvs071[1].image = "systemResource/icons8-selection-48.png";
        kvs071[2].id="selectPageBox";
        kvs071[2].eng="Show selectPageBox";
        kvs071[2].image = "systemResource/icons8-page-100.png";
        kvs071[3].id="selectPageOkBox";
        kvs071[3].eng="Show selectPageOkBox";
        kvs071[3].image = "systemResource/icons8-page-64.png";
        //================================
        kvs07[2].id="testMdaList";
        kvs07[2].eng="Test Mdalist";
        kvs07[2].image = "systemResource/icons8-list-64.png";
        kvs07[2].menus=this.getMenus(kvs07[2].id, 2);
        var kvs072=kvs07[2].menus.kvTexts;
        kvs072[0].id="base.sys0";
        kvs072[0].eng="Show base.sys0";
        kvs072[0].image = "systemResource/icons8-list-50.png";
        kvs072[1].id="base.sys1";
        kvs072[1].eng="Show base.sys1";
        kvs072[1].image = "systemResource/icons8-listDark-50.png";
        //================================
        kvs07[3].id="testMdaContainer";
        kvs07[3].eng="Test MdaContainer";
        kvs07[3].image = "systemResource/icons8-container-64.png";
        kvs07[3].menus=this.getMenus(kvs07[3].id, 6);
        var kvs073=kvs07[3].menus.kvTexts;
        kvs073[0].id="base.page";
        kvs073[0].eng="Show base.page";
        kvs073[0].image = "systemResource/icons8-listPage-64.png";
        kvs073[1].id="base.table";
        kvs073[1].eng="Show base.table";
        kvs073[1].image = "systemResource/icons8-table-64.png";
        kvs073[2].id="base.free";
        kvs073[2].eng="Show base.free";
        kvs073[2].image = "systemResource/icons8-list-100.png";
        kvs073[3].id="dark.page";
        kvs073[3].eng="Show dark.page";
        kvs073[3].image = "systemResource/icons8-listDark-64.png";
        kvs073[4].id="dark.table";
        kvs073[4].eng="Show dark.table";
        kvs073[4].image = "systemResource/icons8-listDark-50.png";
        kvs073[5].id="dark.free";
        kvs073[5].eng="Show dark.free";
        kvs073[5].image = "systemResource/icons8-list-58.png";
        //================================
        kvs07[4].id="testContainerBox";
        kvs07[4].eng="Test ContainerBox";
        kvs07[4].image = "systemResource/icons8-container-64.png";
        kvs07[4].menus=this.getMenus(kvs07[4].id, 3);
        var kvs074=kvs07[4].menus.kvTexts;
        kvs074[0].id="base.page";
        kvs074[0].eng="Show base.page";
        kvs074[0].image = "systemResource/icons8-listPage-64.png";
        kvs074[1].id="base.table";
        kvs074[1].eng="Show base.table";
        kvs074[1].image = "systemResource/icons8-table-64.png";
        kvs074[2].id="base.free";
        kvs074[2].eng="Show base.free";
        kvs074[2].image = "systemResource/icons8-list-100.png";
        //================================
        kvs07[5].id="testSetLine";
        kvs07[5].eng="Test SetLine";
        kvs07[5].image = "systemResource/icons8-container-64.png";
        kvs07[5].menus=this.getMenus(kvs07[5].id, 16);
        var kvs075=kvs07[5].menus.kvTexts;
        kvs075[0].id="buttonActs";
        kvs075[0].eng="Show buttonActs";
        kvs075[0].image = "systemResource/icons8-listPage-64.png";
        kvs075[1].id="buttonOnOffs";
        kvs075[1].eng="Show buttonOnOffs";
        kvs075[1].image = "systemResource/icons8-table-64.png";
        kvs075[2].id="buttonSelect";
        kvs075[2].eng="Show buttonSelect";
        kvs075[2].image = "systemResource/icons8-list-100.png";
        kvs075[3].id="buttonChecks";
        kvs075[3].eng="Show buttonChecks";
        kvs075[3].image = "systemResource/icons8-listPage-64.png";
        kvs075[4].id="buttonRadio";
        kvs075[4].eng="Show buttonRadio";
        kvs075[4].image = "systemResource/icons8-table-64.png";
        kvs075[5].id="inputText";
        kvs075[5].eng="Show inputText";
        kvs075[5].image = "systemResource/icons8-list-100.png";
        kvs075[6].id="labelViews";
        kvs075[6].eng="Show labelViews";
        kvs075[6].image = "systemResource/icons8-list-100.png";
        kvs075[7].id="select";
        kvs075[7].eng="Show select";
        kvs075[7].image = "systemResource/icons8-list-100.png";
        kvs075[8].id="inputSelect";
        kvs075[8].eng="Show inputSelect";
        kvs075[8].image = "systemResource/icons8-list-100.png";
        kvs075[9].id="setLineBox";
        kvs075[9].eng="Show setLineBox";
        kvs075[9].image = "systemResource/icons8-list-100.png";
        kvs075[10].id="setOptsBox";
        kvs075[10].eng="Show setOptsBox";
        kvs075[10].image = "systemResource/icons8-list-100.png";
        kvs075[11].id="textArea";
        kvs075[11].eng="Show textArea";
        kvs075[11].image = "systemResource/icons8-list-100.png";
        
        
        //================================
        kvs07[6].id="testInputPad";
        kvs07[6].eng="Test Input Pad";
        kvs07[6].image = "systemResource/icons8-container-64.png";
        kvs07[6].menus=this.getMenus(kvs07[6].id, 8);
        var kvs076=kvs07[6].menus.kvTexts;
        kvs076[0].id="intPad";
        kvs076[0].eng="Show intPad";
        kvs076[0].image = "systemResource/icons8-listPage-64.png";
        kvs076[1].id="hexPad";
        kvs076[1].eng="Show hexPad";
        kvs076[1].image = "systemResource/icons8-table-64.png";
        kvs076[2].id="intPadBox";
        kvs076[2].eng="Show intPadBox";
        kvs076[2].image = "systemResource/icons8-list-100.png";
        kvs076[3].id="hexPadBox";
        kvs076[3].eng="Show hexPadBox";
        kvs076[3].image = "systemResource/icons8-listPage-64.png";
        kvs076[4].id="intHexPadBox";
        kvs076[4].eng="Show intHexPadBox";
        kvs076[4].image = "systemResource/icons8-table-64.png";
        kvs076[5].id="floatPadBox";
        kvs076[5].eng="Show floatPadBox";
        kvs076[5].image = "systemResource/icons8-table-64.png";
        kvs076[6].id="keyboardBox";
        kvs076[6].eng="Show keyboardBox";
        kvs076[6].image = "systemResource/icons8-list-100.png";
        kvs076[7].id="pickColorBox";
        kvs076[7].eng="Show pickColorBox";
        kvs076[7].image = "systemResource/icons8-list-100.png";
        
        //================================
        kvs07[7].id="testSetLineInputText";
        kvs07[7].eng="Test SetLine InputText Int";
        kvs07[7].image = "systemResource/icons8-container-64.png";
        kvs07[7].menus=this.getMenus(kvs07[7].id, 8);
        var kvs077=kvs07[7].menus.kvTexts;
        kvs077[0].id="inputTextInt";
        kvs077[0].eng="Show intputText int";
        kvs077[0].image = "systemResource/icons8-listPage-64.png";
        kvs077[1].id="inputTextStr";
        kvs077[1].eng="Show intputText str";
        kvs077[1].image = "systemResource/icons8-table-64.png";
        kvs077[2].id="intPassword";
        kvs077[2].eng="Show intPassword";
        kvs077[2].image = "systemResource/icons8-list-100.png";
        
        //================================
        kvs07[8].id="testViewBox";
        kvs07[8].eng="Test View Box";
        kvs07[8].image = "systemResource/icons8-container-64.png";
        kvs07[8].menus=this.getMenus(kvs07[8].id, 8);
        var kvs078=kvs07[8].menus.kvTexts;
        kvs078[0].id="editorBox";
        kvs078[0].eng="Editor Box";
        kvs078[0].image = "systemResource/icons8-listPage-64.png";
        

        
        //==========================================================
        kvs05[0].id="showMdaMenu";
        kvs05[0].eng="Show MdaMenu";
        kvs05[0].image = "systemResource/icons8-info-64.png";
        kvs05[0].menus=this.getMenus(kvs05[0].id, 3);
        var kvs050=kvs05[0].menus.kvTexts;
        kvs050[0].id="base.sys0";
        kvs050[0].eng="Base.sys0";
        kvs050[0].image = "systemResource/icons8-listPage-64.png";
        kvs050[1].id="base.sys1";
        kvs050[1].eng="Base.sys1";
        kvs050[1].image = "systemResource/icons8-listPage-64.png";
        //==============================
        kvs05[1].id="showMdaScroll";
        kvs05[1].eng="Show MdaScroll";
        kvs05[1].image = "systemResource/icons8-info-64.png";
        kvs05[1].menus=this.getMenus(kvs05[1].id, 4);
        var kvs051=kvs05[1].menus.kvTexts;
        kvs051[0].id="base.sys0";
        kvs051[0].eng="Base.sys0";
        kvs051[0].image = "systemResource/icons8-listPage-64.png";
        kvs051[1].id="base.sys1";
        kvs051[1].eng="Base.sys1";
        kvs051[1].image = "systemResource/icons8-listPage-64.png";
        kvs051[2].id="base.sys2";
        kvs051[2].eng="Base.sys2";
        kvs051[2].image = "systemResource/icons8-listPage-64.png";
        kvs051[3].id="base.sys3";
        kvs051[3].eng="Base.sys3";
        kvs051[3].image = "systemResource/icons8-listPage-64.png";
        //==============================
        kvs05[2].id="showMdaOthers";
        kvs05[2].eng="Show MdaOthers";
        kvs05[2].image = "systemResource/icons8-info-64.png";
        kvs05[2].menus=this.getMenus(kvs05[2].id, 4);
        var kvs052=kvs05[2].menus.kvTexts;
        kvs052[0].id="mdaBase";
        kvs052[0].eng="MdaBase";
        kvs052[0].image = "systemResource/icons8-listPage-64.png";
        kvs052[1].id="mdaBox";
        kvs052[1].eng="MdaBox";
        kvs052[1].image = "systemResource/icons8-listPage-64.png";
        kvs052[2].id="mdaSelector";
        kvs052[2].eng="MdaSelector";
        kvs052[2].image = "systemResource/icons8-listPage-64.png";
        kvs052[3].id="mdaArray";
        kvs052[3].eng="MdaArray";
        kvs052[3].image = "systemResource/icons8-listPage-64.png";
        
        
        
        
        
        //==========================================================
        kvs06[0].id="showButtons";
        kvs06[0].eng="Show Buttons";
        kvs06[0].image = "systemResource/icons8-info-64.png";
        kvs06[1].id="showLabels";
        kvs06[1].eng="Show Labels";
        kvs06[1].image = "systemResource/icons8-info-64.png";
        kvs06[2].id="showInputs";
        kvs06[2].eng="Show Inputs";
        kvs06[2].image = "systemResource/icons8-info-64.png";
        kvs06[3].id="showSetLines";
        kvs06[3].eng="Show SetLines";
        kvs06[3].image = "systemResource/icons8-info-64.png";
        kvs06[4].id="showGauges";
        kvs06[4].eng="Show Gauges";
        kvs06[4].image = "systemResource/icons8-info-64.png";
        kvs06[5].id="showCharts";
        kvs06[5].eng="Show Charts";
        kvs06[5].image = "systemResource/icons8-info-64.png";
        kvs06[6].id="showOthers";
        kvs06[6].eng="Show Others";
        kvs06[6].image = "systemResource/icons8-info-64.png";
        kvs06[6].menus=this.getMenus(kvs06[6].id, 4);
        var kvs066=kvs06[6].menus.kvTexts;
        kvs066[0].id="showYouTube";
        kvs066[0].eng="Show YouTube";
        kvs066[0].image = "systemResource/icons8-listPage-64.png";
        kvs066[1].id="showUrlReader";
        kvs066[1].eng="Show Url Reader";
        kvs066[1].image = "systemResource/icons8-listPage-64.png";
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        return menus;
        
    }

    getTestMenus() {
        var menus = this.getMenus("menu0", 8);
        var kvs = menus.kvTexts;
        kvs[0].chnT = "";
        kvs[0].image = "systemResource/color.png";
        for (var i = 0; i < 8; i++) {
            var count = 8;
            if (i === 2)
                count = 2;
            if (i === 6)
                count = 40;
            menus.kvTexts[i].menus = this.getMenus("menu1." + i, count);
            if (i === 2)
                continue;
            if (i === 7)
                continue;
            var kvs = menus.kvTexts[i].menus.kvTexts;
            kvs[0].image = "systemResource/color.png";
            if (i === 4)
                kvs[3].chnT = "q12345566778989090000000";
            kvs[5].image = "systemResource/color.png";
            kvs[3].hotkeyText = 'ctr+t';
            kvs[4].type = "hLine";
            kvs[3].menus = this.getMenus("menu2", 10);
            kvs[5].menus = this.getMenus("menu2", 10);
            kvs[1].disable_f = 1;
        }
        return menus;
    }


    getMenus(id, times) {
        var menus = {};
        menus.id = id;
        var kvTexts = menus.kvTexts = [];
        for (var i = 0; i < times; i++) {
            var tobj = {};
            tobj.id = "itemId#" + i;
            tobj.objName = "textObj";
            tobj.type = "text";//default text,hLine
            tobj.eng = "Menu-" + i;
            //tobj.chnT = "測試--" + i;
            tobj.image = "";
            //tobj.image = "systemResource/color.png";
            //tobj.disable_f = 1;
            //tobj.hotkeyText = 'ctr+t';
            //tobj.type="hLine";
            kvTexts.push(tobj);
        }
        return menus;
    }
    
    getButtonsType(){
        var types=[];
        types.push("Component~Cp_base~button.sys0");
        types.push("Component~Cp_base~button.sys1");
        types.push("Component~Cp_base~button.sys2");
        types.push("Component~Cp_base~button.sys3");
        types.push("Component~Cp_base~button.sys4");
        types.push("Component~Cp_base~button.list");
        types.push("Component~Cp_base~button.none");
        types.push("Component~Cp_base~button.menu0");
        types.push("Component~Cp_base~button.sys0");
        types.push("Component~Cp_base~button.sys0");
        return types;
        
    }

}

var dbg = new Dbg();


