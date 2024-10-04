export interface CommonResponse<T> {
  status?: number;
  error?: boolean ;
  message: any;
  body: T;
}
