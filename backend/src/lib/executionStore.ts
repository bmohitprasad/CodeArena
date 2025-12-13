export type ExecutionResult = {
  status: "RUNNING" | "DONE";
  output?: string;
};

export const executionStore = new Map<string, ExecutionResult>();
