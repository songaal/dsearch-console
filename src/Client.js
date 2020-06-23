import axios from 'axios'
import {SET_FASTCATX_SERVER} from "./redux/constants";

export default class Client {
    constructor(props) {
        const fastcatxServer = localStorage.getItem(SET_FASTCATX_SERVER)
        if (fastcatxServer) {
            this.server = fastcatxServer
        }
    }
    call(config) {
        return new Promise(async (resolve, reject) => {
            try {
                if (config.uri) {
                    const registerFastcatxServer = localStorage.getItem(SET_FASTCATX_SERVER)
                    if (this.server === undefined || this.server === null) {
                        this.server = registerFastcatxServer
                    }
                    if ((this.server === undefined || this.server === null) && location.pathname !== "/") {
                        location.href = "/"
                        return
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