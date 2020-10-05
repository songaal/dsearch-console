import axios from 'axios'
import { Link } from 'react-router-dom';

import {SET_DSEARCH_SERVER} from "./redux/constants";


class Client {
    constructor() {
        this.server = null
    }
    call(config) {
        if (config.uri) {
            let server = sessionStorage.getItem(SET_DSEARCH_SERVER)
            if (server === null) {
                server = localStorage.getItem(SET_DSEARCH_SERVER)
            }
            // eslint-disable-next-line no-restricted-globals
            if (server === null && location.pathname !== "/") {
                // eslint-disable-next-line no-restricted-globals
                location.href = "/"
                console.log("server: is null and pathname: ", location.pathname)
                // location.href = process.env.PUBLIC_URL
                // return new Promise(async (resolve, reject) => reject())
            } else {
                    config.url = `${server}${config.uri}`
            }
        }
        // eslint-disable-next-line no-restricted-globals

        if (location.pathname.split("/").length >= 3) {
            // eslint-disable-next-line no-restricted-globals
            const clusterId = location.pathname.substring(1, location.pathname.indexOf("/", 1))
            config.headers = Object.assign(config.headers||{}, {
                "cluster-id": clusterId
            })
        }

        return new Promise(async (resolve, reject) => {
            try {
                config.withCredentials = true
                let response = await axios.request(config)
                // console.log('response >>> ', response)
                resolve(response)
            } catch (error) {
                console.log(error);
                if (error.response && error.response.status === 401 && config.uri !== '/auth') {
                    // eslint-disable-next-line no-restricted-globals
                    location.href = "/"
                    // location.href = process.env.PUBLIC_URL
                } else {
                    reject(error)
                }
                // if (axios.isCancel(error)) {
                //     console.log('Request canceled', error.message);
                // } else {
                //
                // }
            }
        })
    }
}
export default Client
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