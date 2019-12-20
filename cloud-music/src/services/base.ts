import Axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

/** 响应码 */
enum ResponseCode {
  OK = 200,
}

export interface BaseResponse {
  code: number;
}

const axios = Axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  },
});

// request
axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config;
  },
  (error: any) => {
    console.warn(error);
    return Promise.reject(error);
  },
);

// response
axios.interceptors.response.use(
  (response: AxiosResponse) => {
    // 响应数据具体在 services 中处理
    return response;
  },
  (error: any) => {
    return Promise.reject(error);
  },
);

class Services {
  private static _instance: Services | null = null;

  public static instance(): Services {
    if (this._instance === null) {
      this._instance = new this();
    }

    return this._instance!;
  }

  private async request<T>(config: AxiosRequestConfig): Promise<T | null> {
    try {
      const resp: AxiosResponse<T> = await axios(config);

      return resp.data;
    } catch (err) {
      console.warn(err);
      return null;
    }
  }

  public async get<T>(config: AxiosRequestConfig): Promise<T | null> {
    return this.request<T>(
      Object.assign({}, config, { method: 'GET' })
    );
  }

  public async post<T>(config: AxiosRequestConfig): Promise<T | null> {
    return this.request<T>(
      Object.assign({}, config, { method: 'POST' })
    );
  }

  public isErrorResponse<T extends BaseResponse>(resp: T, cond?: (resp: T) => boolean): boolean {
    if (resp.code !== ResponseCode.OK) return false;
    if (cond) {
      return cond(resp);
    }

    return true;
  }
}

export default Services.instance();

(window as any).__Services__ = Services.instance();
