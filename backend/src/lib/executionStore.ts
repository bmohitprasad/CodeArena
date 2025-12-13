// src/lib/executionStore.ts

export type ExecutionStatus =
  | "QUEUED"
  | "RUNNING"
  | "DONE"
  | "ERROR";

export type ExecutionResult = {
  status: ExecutionStatus;
  output?: string;
  error?: string;
  createdAt: number;
};

class ExecutionStore {
  private store = new Map<string, ExecutionResult>();

  create(id: string) {
    this.store.set(id, {
      status: "QUEUED",
      createdAt: Date.now()
    });
  }

  setRunning(id: string) {
    const prev = this.store.get(id);
    if (!prev) return;
    this.store.set(id, { ...prev, status: "RUNNING" });
  }

  complete(id: string, output: string) {
    const prev = this.store.get(id);
    if (!prev) return;
    this.store.set(id, { ...prev, status: "DONE", output });
  }

  fail(id: string, error: string) {
    const prev = this.store.get(id);
    if (!prev) return;
    this.store.set(id, { ...prev, status: "ERROR", error });
  }

  get(id: string) {
    return this.store.get(id);
  }

  delete(id: string) {
    this.store.delete(id);
  }
}

export const executionStore = new ExecutionStore();
