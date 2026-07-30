/**
 * CodeMirror 編輯器工具函式庫
 * 提供顏色著色和基本操作
 */
var CodeMirrorLib = {
    // 儲存所有現有的 decoration 追蹤 ID
    decorationIds: {},

    /**
     * 初始化 CodeMirror 編輯器
     * @param {HTMLElement} container - 編輯器容器 DOM 元素
     * @param {Object} options - 配置選項
     * @returns {CodeMirror} CodeMirror 編輯器實例
     */
    initEditor: function(container, options) {
        const defaultOptions = {
            lineNumbers: options.showLineNumbers !== false,
            theme: options.theme || "default",
            indentUnit: options.indentUnit || 4,
            tabSize: options.tabSize || 4,
            indentWithTabs: options.indentWithTabs !== true,
            lineWrapping: options.lineWrapping !== false,
            readOnly: options.readOnly || false,
            height: "100%",
            width: "100%"
        };

        // 合併選項
        const finalOptions = Object.assign({}, defaultOptions, options);

        // 使用 CodeMirror 6 (簡化版 - 假設已載入 codemirror)
        // 如果是用舊的 CDN 方式，會是 CodeMirror() 構造函式
        if (typeof CodeMirror !== 'undefined') {
            const editor = CodeMirror(container, finalOptions);
            CodeMirrorLib.decorationIds[container.id] = [];
            return editor;
        }

        console.error("CodeMirror library not loaded");
        return null;
    },

    /**
     * 對選定文字著色
     * @param {CodeMirror} editor - CodeMirror 編輯器實例
     * @param {string} color - 顏色名稱 ("red", "green", "yellow")
     * @param {string} text - 要著色的文字
     */
    applyColorToText: function(editor, color, text) {
        if (!editor) return;

        const position = editor.getCursor();
        const line = position.line;
        const ch = position.ch;

        // 插入文字
        editor.replaceRange(text, position);

        // 設定著色 class
        let colorClass = "cm-color-" + color; // cm-color-red, cm-color-green, etc

        // 清除舊的著色
        //const marks = editor.findMarksAt(position);
        //marks.forEach(mark => mark.clear());

        // 設定新著色
        const startPos = {line: line, ch: ch};
        const endPos = {line: line, ch: ch + text.length};

        editor.markText(startPos, endPos, {
            className: colorClass,
            title: "Colored text: " + color
        });

        // 移動光標到文字結尾
        editor.setCursor({line: line, ch: ch + text.length});
    },

    /**
     * 對整行著色
     * @param {CodeMirror} editor - CodeMirror 編輯器實例
     * @param {string} color - 顏色名稱
     * @param {number} lineNum - 行號（預設最後一行）
     */
    colorLine: function(editor, color, lineNum) {
        if (!editor) return;

        if (lineNum === undefined) {
            lineNum = editor.lastLine();
        }

        const lineLength = editor.getLine(lineNum).length;
        const startPos = {line: lineNum, ch: 0};
        const endPos = {line: lineNum, ch: lineLength};

        let colorClass = "cm-color-line-" + color;

        editor.markText(startPos, endPos, {
            className: colorClass,
            title: "Line colored: " + color
        });
    },

    /**
     * 清除所有著色
     * @param {CodeMirror} editor - CodeMirror 編輯器實例
     */
    clearColors: function(editor) {
        if (!editor) return;

        const allMarks = editor.getAllMarks();
        allMarks.forEach(mark => {
            if (mark.className && mark.className.includes("cm-color")) {
                mark.clear();
            }
        });
    },

    /**
     * 設定編輯器為唯讀
     * @param {CodeMirror} editor
     * @param {boolean} readOnly
     */
    setReadOnly: function(editor, readOnly) {
        if (!editor) return;
        editor.setOption("readOnly", readOnly);
    },

    /**
     * 設定編輯器內容
     * @param {CodeMirror} editor
     * @param {string} content
     */
    setValue: function(editor, content) {
        if (!editor) return;
        editor.setValue(content || "");
    },

    /**
     * 取得編輯器內容
     * @param {CodeMirror} editor
     * @returns {string} 編輯器文字
     */
    getValue: function(editor) {
        if (!editor) return "";
        return editor.getValue();
    },

    /**
     * 向上翻一頁（CodeMirror）
     * @param {CodeMirror} editor
     */
    pageUp: function(editor) {
        if (!editor) return;

        const info = editor.getScrollInfo();
        const targetTop = Math.max(0, info.top - info.clientHeight);
        editor.scrollTo(null, targetTop);

        // 讓游標跟著翻頁後的視窗位置
        const pos = editor.coordsChar({ left: 0, top: targetTop }, "local");
        editor.setCursor(pos);
    },

    /**
     * 向下翻一頁（CodeMirror）
     * @param {CodeMirror} editor
     */
    pageDown: function(editor) {
        if (!editor) return;

        const info = editor.getScrollInfo();
        const maxTop = Math.max(0, info.height - info.clientHeight);
        const targetTop = Math.min(maxTop, info.top + info.clientHeight);
        editor.scrollTo(null, targetTop);

        // 讓游標跟著翻頁後的視窗位置
        const pos = editor.coordsChar({ left: 0, top: targetTop + info.clientHeight - 1 }, "local");
        editor.setCursor(pos);
    },

    /**
     * 設定編輯器模式（語言）
     * @param {CodeMirror} editor
     * @param {string} mode - 模式名稱 (例如 "javascript", "htmlmixed", "css")
     */
    setMode: function(editor, mode) {
        if (!editor) return;

        // CodeMirror 模式對應
        const modeMap = {
            "text": null,
            "javascript": "javascript",
            "js": "javascript",
            "html": "htmlmixed",
            "css": "css",
            "xml": "application/xml",
            "json": "application/json"
        };

        const cmMode = modeMap[mode] || mode;
        editor.setOption("mode", cmMode);
    }
};

// 如果在 node.js 環境，export 該模塊
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CodeMirrorLib;
}
