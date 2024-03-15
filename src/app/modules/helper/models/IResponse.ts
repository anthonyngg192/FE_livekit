export interface IResponse<T = any> {
  data: T;
  message: string;
  errorCode?: number;
  statusCode: number;
  validators: Record<string, string>;
}
