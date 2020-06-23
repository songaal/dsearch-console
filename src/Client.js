import axios from 'axios'
import {SET_FASTCATX_SERVER} from "./redux/constants";

export default class Client {
    constructor(props) {
        // const instance = axios.create({
        //     baseURL: 'https://api',
        //     timeout: 1000
        // })
        const fastcatxServer = localStorage.getItem(SET_FASTCATX_SERVER)
        if (fastcatxServer !== undefined && fastcatxServer !== null && "" !== fastcatxServer) {
            this.server = fastcatxServer
        }
    }
    call(config) {
        return new Promise(async (resolve, reject) => {
            try {
                if (config.uri) {
                    if (typeof this.server === 'undefined') {
                        location.href = "/"
                    }
                    config.url = `${this.server}${config.uri}`
                }
                config.withCredentials = true
                let response = await axios.request(config)
                console.log('response >>> ', response)
                resolve(response)
            } catch (err) {
                console.error('API Fail', config, err)
                console.log(err.statusCode)
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