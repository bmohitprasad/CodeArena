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
    const e = this.store.get(id);
    if (e) e.status = "RUNNING";
  }

  complete(id: string, output: string) {
    const e = this.store.get(id);
    if (e) {
      e.status = "DONE";
      e.output = output;
    }
  }

  fail(id: string, error: string) {
    const e = this.store.get(id);
    if (e) {
      e.status = "ERROR";
      e.error = error;
    }
  }

  get(id: string) {
    return this.store.get(id);
  }
}

export const executionStore = new ExecutionStore();
