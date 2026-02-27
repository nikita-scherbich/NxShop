export interface DBResponse<T = unknown> {
  error: {
    code: string;
    details: unknown;
    hint: unknown;
    message: string;
  };
  data: T[];
  count: unknown;
  status: number;
  statusText: string;
}
