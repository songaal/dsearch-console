import axios from 'axios'

export default class Client {
    constructor(props) {
        console.log("init")
        // const instance = axios.create({
        //     baseURL: 'https://api',
        //     timeout: 1000
        // })
        this.server = process.env.REACT_APP_FASTCATX_SERVER_URL
    }
    call(config) {
        return new Promise(async (resolve, reject) => {
            try {
                config.url = `${this.server}${config.uri}`
                let response = await axios.request(config)
                console.log('response >>> ', response)
                resolve(response)
            } catch (err) {
                console.error('API Fail', config, err)
                reject(err)
            }
        })
    }
}

//   url?: string;
//   method?: Method;
//   baseURL?: string;
//   transformRequest?: AxiosTransformer | AxiosTransformer[];
//   transformResponse?: AxiosTransformer | AxiosTransformer[];
//   headers?: any;
//   params?: any;
//   paramsSerializer?: (params: any) => string;
//   data?: any;
//   timeout?: number;
//   timeoutErrorMessage?: string;
//   withCredentials?: boolean;
//   adapter?: AxiosAdapter;
//   auth?: AxiosBasicCredentials;
//   responseType?: ResponseType;
//   xsrfCookieName?: string;
//   xsrfHeaderName?: string;
//   onUploadProgress?: (progressEvent: any) => void;
//   onDownloadProgress?: (progressEvent: any) => void;
//   maxContentLength?: number;
//   validateStatus?: (status: number) => boolean;
//   maxRedirects?: number;
//   socketPath?: string | null;
//   httpAgent?: any;
//   httpsAgent?: any;
//   proxy?: AxiosProxyConfig | false;
//   cancelToken?: CancelToken;