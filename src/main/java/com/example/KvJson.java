/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 *
 * @author User
 */
public class KvJson {

    public String messageStr = "Error";
    public String valueStr = "";
    public JSONObject valueJo;
    public boolean errorF = true;
    public JSONObject jobj;
    public JSONArray jary;
    public ArrayList<String> strAL = new ArrayList<String>();

    public KvJson() {

    }

    public boolean rStrA(JSONObject iobj, String key) {
        jobj = iobj;
        return rStrA(key);
    }

    public boolean rStrA(String key) {
        errorF = true;
        try {
            this.valueStr = jobj.get(key).toString();
            jary = new JSONArray(jobj.get(key).toString());
            strAL.clear();
            for (int i = 0; i < jary.length(); i++) {
                strAL.add(jary.get(i).toString());
            }
        } catch (JSONException ex) {
            messageStr = "Read Json(key:" + key + ") To String Array Error !!!";
            return errorF;
        }
        errorF = false;
        return errorF;
    }

    public boolean rStr(JSONObject iobj, String key) {
        jobj = iobj;
        return rStr(key);
    }

    public boolean rStr(String key) {
        errorF = true;
        try {
            this.valueStr = jobj.get(key).toString();
        } catch (JSONException ex) {
            messageStr = "Read Json(key:" + key + ") To String Error !!!";
            return errorF;
        }
        errorF = false;
        return errorF;
    }


    public boolean rJo(JSONObject iobj, String key) {
        jobj = iobj;
        return rJo(key);
    }
    
    public boolean rJo(String key) {
        errorF = true;
        try {
            this.valueJo = new JSONObject(jobj.get(key).toString());
        } catch (JSONException ex) {
            messageStr = "Read Json(key:" + key + ") To String Error !!!";
            return errorF;
        }
        errorF = false;
        return errorF;
    }
    
    

    public boolean wObj(JSONObject jo, String key, Object value) {
        errorF = true;
        try {
            jo.put(key, value);
        } catch (JSONException ex) {
            messageStr = "Write Json(key:" + key + ") Error !!!";
            return errorF;
        }
        errorF = false;
        return errorF;
    }

    public boolean wStr(JSONObject jo, String key, String value) {
        errorF = true;
        try {
            jo.put(key, value);
        } catch (JSONException ex) {
            messageStr = "Write Json(key:" + key + ") Error !!!";
            return errorF;
        }
        errorF = false;
        return errorF;
    }
    
    
    static String objToJson(Object inst) {
        String ss;
        byte bb;
        int ii;
        long ll;
        float ff;
        double dd;
        String[] sa;
        byte[] ba;
        int[] ia;
        long[] la;
        float[] fa;
        double[] da;
        String jstr;
        try {
            Class<?> aClassHandle = inst.getClass();
            Field[] fields = aClassHandle.getDeclaredFields();
            String jsonStr = "{";
            for (int i = 0; i < fields.length; i++) {
                Object value = fields[i].get(inst);
                if (value == null) {
                    continue;
                }
                String keyName = "";
                if (i != 0) {
                    keyName += ",";
                }
                keyName += "\"" + fields[i].getName() + "\": ";
                if (value instanceof String) {
                    ss = (String) value;
                    jsonStr += keyName + "\"" + ss.replace("\n", "\\n") + "\"";
                } else if (value instanceof Byte) {
                    bb = (Byte) value;
                    jsonStr += keyName + bb;
                } else if (value instanceof Integer) {
                    ii = (Integer) value;
                    jsonStr += keyName + ii;
                } else if (value instanceof Long) {
                    ll = (Long) value;
                    jsonStr += keyName + ll;
                } else if (value instanceof Float) {
                    ff = (Float) value;
                    jsonStr += keyName + ff;
                } else if (value instanceof Double) {
                    dd = (Double) value;
                    jsonStr += keyName + dd;
                } else if (value instanceof String[]) {
                    sa = (String[]) value;
                    jstr = "[";
                    for (int j = 0; j < sa.length; j++) {
                        if (j != 0) {
                            jstr += ",";
                        }
                        jstr += "\"" + sa[j].replace("\n", "\\n") + "\"";
                    }
                    jstr += "]";
                    jsonStr += keyName + jstr;
                } else if (value instanceof byte[]) {
                    ba = (byte[]) value;
                    jsonStr += keyName + Arrays.toString(ba);
                } else if (value instanceof int[]) {
                    ia = (int[]) value;
                    jsonStr += keyName + Arrays.toString(ia);
                } else if (value instanceof long[]) {
                    la = (long[]) value;
                    jsonStr += keyName + Arrays.toString(la);
                } else if (value instanceof float[]) {
                    fa = (float[]) value;
                    jsonStr += keyName + Arrays.toString(fa);
                } else if (value instanceof double[]) {
                    da = (double[]) value;
                    jsonStr += keyName + Arrays.toString(da);
                } else {
                    Class<?> vClassHandle = value.getClass();
                    String classHandleName = vClassHandle.getName();
                    if (classHandleName.contains("HashMap")) {
                        Map<?, ?> map = (Map<?, ?>) value;
                        jsonStr += keyName + "{";
                        int kinx = 0;
                        for (Map.Entry<?, ?> entry : map.entrySet()) {
                            if (kinx != 0) {
                                jsonStr += ",";
                            }
                            kinx++;
                            String key = String.valueOf(entry.getKey());
                            jsonStr += "\"" + key + "\": ";
                            String tstr = KvJson.objToJson(entry.getValue());
                            jsonStr += tstr;
                        }
                        jsonStr += "}";

                    }
                    if (classHandleName.contains("kevin")) {
                        if (classHandleName.contains("[L")) {
                            Object[] objA = (Object[]) value;
                            jsonStr += keyName + "[";
                            for (int j = 0; j < objA.length; j++) {
                                if (j != 0) {
                                    jsonStr += ",";
                                }
                                String tstr = KvJson.objToJson(objA[j]);
                                jsonStr += tstr;
                            }
                            jsonStr += "]";

                        } else {
                            String subJsonStr = KvJson.objToJson(value);
                            jsonStr += keyName + subJsonStr;
                        }
                    }
                }
            }
            jsonStr += "}";
            return jsonStr;
        } catch (Exception ex) {
            Logger.getLogger(KvJson.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }
    
    
}
