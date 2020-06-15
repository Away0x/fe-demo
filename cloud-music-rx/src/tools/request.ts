import Axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios';

type ErrorResolveFunc = (err: any, config?: RequestConfig) => any;
type ResponseInterceptor<R, T> = (response: AxiosResponse<R>, config: RequestConfig) => T;

type CreateRequestOptions<R = any, T = any> = {
  baseURL: string;
  // interceptors
  requestInterceptor: (config: RequestConfig) => RequestConfig;
  responseInterceptor: ResponseInterceptor<R, T>;
  // errors
  requestInterceptorErrorCatch?: (err: any) => void;
  responseInterceptorErrorCatch?: (err: any) => AxiosResponse<T>;
  errorResolve?: ErrorResolveFunc;
};

interface RequestConfig extends AxiosRequestConfig {
  ignoreGlobalErrorToast?: boolean;
}


export class Request<RawResponse = any, Response = any> {

  private axiosInstance: AxiosInstance;
  private errorResolve: ErrorResolveFunc = () => {};
  private responseInterceptor: ResponseInterceptor<RawResponse, Response>;

  constructor({
    baseURL,

    requestInterceptor,
    requestInterceptorErrorCatch,
    responseInterceptor,
    responseInterceptorErrorCatch,
    errorResolve,
  }: CreateRequestOptions<RawResponse, Response>) {
    this.axiosInstance = Axios.create({
      baseURL,
    });

    if (errorResolve) { this.errorResolve = errorResolve; }
    this.responseInterceptor = responseInterceptor;

    this.axiosInstance.interceptors.request.use(
      (config: RequestConfig): RequestConfig => {
        return requestInterceptor(config);
      },
      (err) => {
        errorResolve && errorResolve(err);
        requestInterceptorErrorCatch && requestInterceptorErrorCatch(err);
      }
    );

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse<RawResponse>) => response,
      (err) => {
        if (errorResolve) { return errorResolve(err); }
        if (responseInterceptorErrorCatch) { return responseInterceptorErrorCatch(err); }
      }
    );
  }

  public get(config: RequestConfig): Promise<Response> {
    return this.request(Object.assign({}, config, { method: 'GET' }));
  }

  public post(config: RequestConfig): Promise<Response> {
    return this.request(Object.assign({}, config, { method: 'POST' }));
  }

  private async request(config: RequestConfig): Promise<Response> {
    try {
      const resp = await this.axiosInstance(config);

      return this.responseInterceptor(resp, config);
    } catch (err) {
      if (this.errorResolve) {
        return this.errorResolve(err, config);
      }
      return err;
    }
  }

}
