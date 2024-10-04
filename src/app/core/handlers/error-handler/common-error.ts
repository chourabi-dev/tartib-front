export interface CommonError {
  statusCode?: number;
  status?: number;
  message?: any;
  statusText?: string;
  friendlyMessage?: any;
  error?: { [key: string]: string } ;
}
