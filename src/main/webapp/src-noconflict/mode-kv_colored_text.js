ace.define("ace/mode/kv_colored_text_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function(require, exports, module) {
    "use strict";

    var oop = require("../lib/oop");
    var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

    var KvColoredTextHighlightRules = function() {
        this.$rules = {
            "start": [
                { token: "kvtag.delimiter", regex: "\\[KV-RED\\]", next: "kv_red" },
                { token: "kvtag.delimiter", regex: "\\[KV-GREEN\\]", next: "kv_green" },
                { token: "kvtag.delimiter", regex: "\\[KV-YELLOW\\]", next: "kv_yellow" },
                { token: "kvtag.delimiter", regex: "\\[KV-CUSTOM\\]", next: "kv_custom" }
            ],
            "kv_red": [
                { token: "kvtag.delimiter", regex: "\\[/KV-RED\\]", next: "start" },
                { defaultToken: "kvtag.red" }
            ],
            "kv_green": [
                { token: "kvtag.delimiter", regex: "\\[/KV-GREEN\\]", next: "start" },
                { defaultToken: "kvtag.green" }
            ],
            "kv_yellow": [
                { token: "kvtag.delimiter", regex: "\\[/KV-YELLOW\\]", next: "start" },
                { defaultToken: "kvtag.yellow" }
            ],
            "kv_custom": [
                { token: "kvtag.delimiter", regex: "\\[/KV-CUSTOM\\]", next: "start" },
                { defaultToken: "kvtag.custom" }
            ]
        };

        this.normalizeRules();
    };

    oop.inherits(KvColoredTextHighlightRules, TextHighlightRules);
    exports.KvColoredTextHighlightRules = KvColoredTextHighlightRules;
});

ace.define("ace/mode/kv_colored_text", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text", "ace/mode/kv_colored_text_highlight_rules"], function(require, exports, module) {
    "use strict";

    var oop = require("../lib/oop");
    var TextMode = require("./text").Mode;
    var KvColoredTextHighlightRules = require("./kv_colored_text_highlight_rules").KvColoredTextHighlightRules;

    var Mode = function() {
        this.HighlightRules = KvColoredTextHighlightRules;
        this.$behaviour = this.$defaultBehaviour;
    };

    oop.inherits(Mode, TextMode);

    (function() {
        this.$id = "ace/mode/kv_colored_text";
    }).call(Mode.prototype);

    exports.Mode = Mode;
});
