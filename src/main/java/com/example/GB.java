package com.example;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import java.util.HashMap;
import java.util.Map;

/**
 *
 * @author kevin
 */
public class GB {

    //==============================================
    public static String dummyTargetWinParaSet = "e:/kevin/myCode/webSet/syncSet/paraSet.json";
    public static String dummyTargetLinuxParaSet = "/home/admintx/syncSetExe/paraSet.json";
    public static String josnSipPhoneWinParaSet = "e:/kevin/myCode/webSet/josnSipSet/paraSetSip.json";
    public static String josnSipPhoneLinuxParaSet = "/home/pi/kevin/sipphone/paraSetSip.json";
    public static String josnSipUiWinParaSet = "e:/kevin/myCode/webSet/josnSipSet/paraSetUi.json";
    public static String josnSipUiLinuxParaSet = "/home/pi/kevin/sipui2in1/paraSetUi.json";
    public static String webBuilderWinParaSet = "e:/kevin/myCode/webSet/webBuilderSet/paraSet.json";
    public static String webBuilderLinuxParaSet = "/home/pi/kevin/webBuilderSet/paraSet.json";
    public static String sip6In1UiWinParaSet = "e:/kevin/myCode/webSet/josnSip6In1Set/paraSetUi.json";
    public static String sip6In1UiLinuxParaSet = "/home/pi/kevin/sip6In1Ui/paraSetUi.json";
    public static String flyingEagleWinParaSet = "D:/kevinHomePcSync/flyingEagle/paraSet.json";
    public static String flyingEagleLinuxParaSet = "/home/pi/kevin/flyingEagle/paraSet.json";
    
    
    
    //=====================================
    public static int min_js_f = 0;
    public static String systemName = "";
    public static String osName = "win";
    public static String interfaces_path = "";
    static public String appName = "webServeletBase";
    public static Map<String, Object> paraSetMap = new HashMap<>();
    public static String sourceDir = "web/";          //for debug use
    public static String paraSetFullNamexxx = "";
    //public static String paraSetPath = "e:/kevin/myCode/webSet";
    //public static String paraSetPath = "/home/admintx/syncSetExe";
    //public static String paraSetPath = "e:/kevin/myCode/sipphoneSet";
    //public static String paraSetPath = "e:/kevin/myCode/sipphoneUiSet";
    //==============================================
    //======================================
    public static int syssec_f = 0;
    public static int syssec_xor = 0x00;
    public static String nowIp_str = "";
    public static String nowSubmask_str = "";
    public static String nowMac_str = "";
    public static String macStr;
    public static String startTime = "";
    public static int loaded_f = 0;
    //======================================
    //public static String paraSetPath = "e:/kevin/myCode/webServletBase/web/user-sync";

    public static String webSrcPath = "";
    public static String rootPath = "";
    public static String webRootPath = "";
    public static String exePath = "";
    public static HashMap<String, String> requestPara;
    public static int os = 2; //0: not defined, 1: win, 2: linux, 3: mac, 4: sunos
    public static HashMap<String, String> paraMap = new HashMap<>();
    public static HashMap<String, String> userParaMap = new HashMap<>();

    public static void init() {
        String osName = System.getProperty("os.name");
        if (osName != null) {
            if (osName.toLowerCase().contains("win")) {
                GB.osName = "win";
                GB.sourceDir = "web/";
            }
        } else {
            GB.osName = "linux";
            GB.sourceDir = "webapps/ROOT/";
        }

    }

    public static String getParaSetPath(String systemName) {
        String osName = System.getProperty("os.name");
        String paraSetFullName = "";
        if (osName != null) {
            if (osName.toLowerCase().contains("win")) {
                GB.osName = "win";
                GB.sourceDir = "web/";
                if (systemName.equals("dummyTarget")) {
                    paraSetFullName = GB.dummyTargetWinParaSet;
                }
                if (systemName.equals("josnSipPhone")) {
                    paraSetFullName = GB.josnSipPhoneWinParaSet;
                }
                if (systemName.equals("josnSipUi")) {
                    paraSetFullName = GB.josnSipUiWinParaSet;
                }
                if (systemName.equals("webBuilder")) {
                    paraSetFullName = GB.webBuilderWinParaSet;
                }
                if (systemName.equals("sip6In1Ui")) {
                    paraSetFullName = GB.sip6In1UiWinParaSet;
                }
                if (systemName.equals("flyingEagle")) {
                    paraSetFullName = GB.flyingEagleWinParaSet;
                }
                
                
                return paraSetFullName;
            }
        }
        GB.osName = "linux";
        GB.sourceDir = "webapps/ROOT/";
        if (systemName.equals("dummyTarget")) {
            paraSetFullName = GB.dummyTargetLinuxParaSet;
        }
        if (systemName.equals("josnSipPhone")) {
            paraSetFullName = GB.josnSipPhoneLinuxParaSet;
        }
        if (systemName.equals("josnSipUi")) {
            paraSetFullName = GB.josnSipUiLinuxParaSet;
        }
        if (systemName.equals("webBuilder")) {
            paraSetFullName = GB.webBuilderLinuxParaSet;
        }
        if (systemName.equals("sip6In1Ui")) {
            paraSetFullName = GB.sip6In1UiLinuxParaSet;
        }
        return paraSetFullName;

    }
    
    
    
    

}
