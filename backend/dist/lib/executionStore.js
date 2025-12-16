"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executionStore = void 0;
class ExecutionStore {
    store = new Map();
    create(id) {
        this.store.set(id, {
            status: "QUEUED",
            createdAt: Date.now()
        });
    }
    setRunning(id) {
        const e = this.store.get(id);
        if (e)
            e.status = "RUNNING";
    }
    complete(id, output) {
        const e = this.store.get(id);
        if (e) {
            e.status = "DONE";
            e.output = output;
        }
    }
    fail(id, error) {
        const e = this.store.get(id);
        if (e) {
            e.status = "ERROR";
            e.error = error;
        }
    }
    get(id) {
        return this.store.get(id);
    }
}
exports.executionStore = new ExecutionStore();
