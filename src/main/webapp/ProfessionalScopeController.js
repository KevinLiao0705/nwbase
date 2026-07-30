/*
 * Professional scope/waveform monitor controller
 * Non-breaking: this file is standalone and does not change existing MyPlot.js behavior.
 */

class ProfessionalScopeController {
    constructor(config) {
        this.config = Object.assign({
            maxChannels: 4,
            maxHistory: 100,
            onStateChanged: null,
            onError: null
        }, config || {});

        this.state = this.createDefaultState();
        this.history = [];
        this.redoStack = [];

        this.presets = {
            default: {
                timebase: { scale: 1e-3, offset: 0 },
                trigger: { enabled: true, source: 0, level: 0, slope: "rising", mode: "auto" },
                acquisition: { mode: "sample", sampleRate: 10e6, memoryDepth: 1e6 },
                display: { grid: true, cursor: false, persist: false, intensity: 0.7 },
                channels: [
                    this.makeChannel("CH1", true),
                    this.makeChannel("CH2", false),
                    this.makeChannel("CH3", false),
                    this.makeChannel("CH4", false)
                ]
            },
            pulse: {
                timebase: { scale: 100e-6, offset: 0 },
                trigger: { enabled: true, source: 0, level: 1.2, slope: "rising", mode: "normal" },
                acquisition: { mode: "peak_detect", sampleRate: 50e6, memoryDepth: 2e6 },
                display: { grid: true, cursor: true, persist: false, intensity: 0.8 },
                channels: [
                    Object.assign(this.makeChannel("CH1", true), { scale: 1.0, offset: 0.0, coupling: "dc" }),
                    Object.assign(this.makeChannel("CH2", true), { scale: 2.0, offset: -0.2, coupling: "dc" }),
                    this.makeChannel("CH3", false),
                    this.makeChannel("CH4", false)
                ]
            },
            power: {
                timebase: { scale: 20e-3, offset: 0 },
                trigger: { enabled: false, source: 0, level: 0, slope: "rising", mode: "auto" },
                acquisition: { mode: "average", sampleRate: 1e6, memoryDepth: 5e5 },
                display: { grid: true, cursor: true, persist: true, intensity: 0.6 },
                channels: [
                    Object.assign(this.makeChannel("Forward Power", true), { unit: "dBm", scale: 2.0 }),
                    Object.assign(this.makeChannel("Reflected Power", true), { unit: "dBm", scale: 2.0 }),
                    this.makeChannel("CH3", false),
                    this.makeChannel("CH4", false)
                ]
            }
        };

        this.loadPreset("default");
    }

    createDefaultState() {
        return {
            run: false,
            connected: false,
            selectedChannel: 0,
            timebase: { scale: 1e-3, offset: 0 },
            trigger: { enabled: true, source: 0, level: 0, slope: "rising", mode: "auto" },
            acquisition: { mode: "sample", sampleRate: 10e6, memoryDepth: 1e6 },
            display: { grid: true, cursor: false, persist: false, intensity: 0.7 },
            channels: [
                this.makeChannel("CH1", true),
                this.makeChannel("CH2", false),
                this.makeChannel("CH3", false),
                this.makeChannel("CH4", false)
            ],
            metrics: {
                fps: 0,
                latencyMs: 0,
                packetLoss: 0,
                updateAt: Date.now()
            }
        };
    }

    makeChannel(name, enabled) {
        return {
            name: name,
            enabled: !!enabled,
            unit: "V",
            scale: 1.0,
            offset: 0.0,
            coupling: "dc",
            bandwidthLimit: false,
            probeRatio: 10,
            color: "#4f46e5"
        };
    }

    clone(value) {
        return JSON.parse(JSON.stringify(value));
    }

    pushHistory() {
        this.history.push(this.clone(this.state));
        if (this.history.length > this.config.maxHistory) {
            this.history.shift();
        }
        this.redoStack = [];
    }

    emitState(reason) {
        this.state.metrics.updateAt = Date.now();
        if (typeof this.config.onStateChanged === "function") {
            this.config.onStateChanged(this.clone(this.state), reason || "update");
        }
    }

    emitError(message) {
        if (typeof this.config.onError === "function") {
            this.config.onError(message);
        }
    }

    loadPreset(name) {
        if (!this.presets[name]) {
            this.emitError("Unknown preset: " + name);
            return false;
        }
        this.pushHistory();
        const preset = this.clone(this.presets[name]);
        this.state.timebase = preset.timebase;
        this.state.trigger = preset.trigger;
        this.state.acquisition = preset.acquisition;
        this.state.display = preset.display;
        this.state.channels = preset.channels.slice(0, this.config.maxChannels);
        this.emitState("preset:" + name);
        return true;
    }

    setRun(value) {
        this.pushHistory();
        this.state.run = !!value;
        this.emitState("run");
    }

    setConnected(value) {
        this.state.connected = !!value;
        this.emitState("connected");
    }

    setSelectedChannel(index) {
        if (index < 0 || index >= this.state.channels.length) {
            this.emitError("Invalid channel index: " + index);
            return;
        }
        this.pushHistory();
        this.state.selectedChannel = index;
        this.emitState("select_channel");
    }

    setChannelEnabled(index, enabled) {
        if (!this.state.channels[index]) {
            this.emitError("Invalid channel index: " + index);
            return;
        }
        this.pushHistory();
        this.state.channels[index].enabled = !!enabled;
        this.emitState("channel_enabled");
    }

    setChannelScale(index, scale) {
        if (!this.state.channels[index] || scale <= 0) {
            this.emitError("Invalid channel scale");
            return;
        }
        this.pushHistory();
        this.state.channels[index].scale = scale;
        this.emitState("channel_scale");
    }

    setChannelOffset(index, offset) {
        if (!this.state.channels[index]) {
            this.emitError("Invalid channel index: " + index);
            return;
        }
        this.pushHistory();
        this.state.channels[index].offset = offset;
        this.emitState("channel_offset");
    }

    setTimebase(scale, offset) {
        if (scale <= 0) {
            this.emitError("Invalid timebase scale");
            return;
        }
        this.pushHistory();
        this.state.timebase.scale = scale;
        if (typeof offset === "number") {
            this.state.timebase.offset = offset;
        }
        this.emitState("timebase");
    }

    setTrigger(options) {
        this.pushHistory();
        this.state.trigger = Object.assign({}, this.state.trigger, options || {});
        this.emitState("trigger");
    }

    setAcquisition(options) {
        this.pushHistory();
        this.state.acquisition = Object.assign({}, this.state.acquisition, options || {});
        this.emitState("acquisition");
    }

    setDisplay(options) {
        this.pushHistory();
        this.state.display = Object.assign({}, this.state.display, options || {});
        this.emitState("display");
    }

    updateMetrics(metrics) {
        this.state.metrics = Object.assign({}, this.state.metrics, metrics || {});
        this.emitState("metrics");
    }

    applyAction(action) {
        if (!action || !action.type) {
            this.emitError("Invalid action");
            return;
        }

        switch (action.type) {
            case "RUN":
                this.setRun(action.payload === true);
                break;
            case "STOP":
                this.setRun(false);
                break;
            case "SELECT_CHANNEL":
                this.setSelectedChannel(action.payload);
                break;
            case "SET_CHANNEL_ENABLED":
                this.setChannelEnabled(action.payload.index, action.payload.enabled);
                break;
            case "SET_CHANNEL_SCALE":
                this.setChannelScale(action.payload.index, action.payload.scale);
                break;
            case "SET_CHANNEL_OFFSET":
                this.setChannelOffset(action.payload.index, action.payload.offset);
                break;
            case "SET_TIMEBASE":
                this.setTimebase(action.payload.scale, action.payload.offset);
                break;
            case "SET_TRIGGER":
                this.setTrigger(action.payload);
                break;
            case "SET_ACQUISITION":
                this.setAcquisition(action.payload);
                break;
            case "SET_DISPLAY":
                this.setDisplay(action.payload);
                break;
            case "LOAD_PRESET":
                this.loadPreset(action.payload);
                break;
            case "UNDO":
                this.undo();
                break;
            case "REDO":
                this.redo();
                break;
            default:
                this.emitError("Unknown action: " + action.type);
                break;
        }
    }

    undo() {
        if (this.history.length === 0) {
            return;
        }
        this.redoStack.push(this.clone(this.state));
        this.state = this.history.pop();
        this.emitState("undo");
    }

    redo() {
        if (this.redoStack.length === 0) {
            return;
        }
        this.history.push(this.clone(this.state));
        this.state = this.redoStack.pop();
        this.emitState("redo");
    }

    exportConfig() {
        return this.clone(this.state);
    }

    importConfig(nextState) {
        if (!nextState || !nextState.channels || !Array.isArray(nextState.channels)) {
            this.emitError("Invalid config payload");
            return false;
        }
        this.pushHistory();
        this.state = this.clone(nextState);
        this.emitState("import");
        return true;
    }

    // Adapter output for existing watch-based UI frameworks.
    toUiBindings() {
        const buttonColors = this.state.channels.map((ch, idx) => {
            if (idx === this.state.selectedChannel) {
                return "#22c55e";
            }
            return ch.enabled ? "#93c5fd" : "#e5e7eb";
        });

        return {
            runColor: this.state.run ? "#93c5fd" : "#e5e7eb",
            triggerColor: this.state.trigger.enabled ? "#93c5fd" : "#e5e7eb",
            gridColor: this.state.display.grid ? "#93c5fd" : "#e5e7eb",
            cursorColor: this.state.display.cursor ? "#93c5fd" : "#e5e7eb",
            channelButtonColors: buttonColors,
            selectedChannel: this.state.selectedChannel,
            selectedScale: this.state.channels[this.state.selectedChannel].scale,
            selectedOffset: this.state.channels[this.state.selectedChannel].offset,
            timebaseScale: this.state.timebase.scale,
            triggerLevel: this.state.trigger.level,
            metrics: this.clone(this.state.metrics)
        };
    }
}

// Example (non-invasive):
// const scopeCtl = new ProfessionalScopeController({
//     onStateChanged: function (state, reason) { console.log(reason, state); },
//     onError: function (message) { console.error(message); }
// });
// scopeCtl.applyAction({ type: "LOAD_PRESET", payload: "pulse" });
// scopeCtl.applyAction({ type: "RUN" });
