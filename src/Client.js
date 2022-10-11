import axios from 'axios'
// import { Link } from 'react-router-dom';
import {SET_DSEARCH_AUTH_USER, SET_DSEARCH_SERVER} from "./redux/constants";

const setCookie = function(name, value, ms) {
    const date = new Date();
    date.setTime(date.getTime() + ms);
    document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
}

const getCookie = function(name) {
    const value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value? value[2] : null;
}

const deleteCookie = function(name) {
    const date = new Date();
    document.cookie = name + "= " + "; expires=" + date.toUTCString() + "; path=/";
}

const getClientIp = async () => {
    const res = await axios.get('https://geolocation-db.com/json/')
    return res.data.IPv4
}

const setClientIpInHeader = async (config) => {
    const clientIp = sessionStorage.getItem("clientIp")

    if(clientIp === null){
        let newClientIp = await getClientIp()
        config.headers = Object.assign(config.headers||{}, {
            "client-ip": newClientIp
        })
        sessionStorage.setItem("clientIp", newClientIp)
    }else{
        config.headers = Object.assign(config.headers||{}, {
            "client-ip": clientIp
        })
    }

    return config
}


class Client {
    constructor() {
        this.server = null
    }

    async call(config) {
        if (config.uri) {
            let server = sessionStorage.getItem(SET_DSEARCH_SERVER)
            if (server === null) {
                server = localStorage.getItem(SET_DSEARCH_SERVER)
            }

            // eslint-disable-next-line no-restricted-globals
            if (server === null && location.pathname !== "/") {
                window.location.href = "/"
                // location.href = process.env.PUBLIC_URL
                // return new Promise(async (resolve, reject) => reject())
            } else {
                    config.url = `${server}${config.uri}`
            }
        }
        // eslint-disable-next-line no-restricted-globals

        if (window.location.pathname.split("/").length >= 3) {
            // eslint-disable-next-line no-restricted-globals
            const clusterId = window.location.pathname.substring(1, window.location.pathname.indexOf("/", 1))
            config.headers = Object.assign(config.headers||{}, {
                "cluster-id": clusterId
            })
        }
        const authUser = JSON.parse(sessionStorage.getItem(SET_DSEARCH_AUTH_USER)||"{}")
        const cookieToken = getCookie(SET_DSEARCH_AUTH_USER)
        if (authUser && authUser['token']) {
            config.headers = Object.assign(config.headers||{}, {
                "x-bearer-token": authUser['token']
            })
        } else if (cookieToken && window.location.pathname !== "/") {
            config.headers = Object.assign(config.headers||{}, {
                "x-bearer-token": cookieToken
            })
        }

        config = await setClientIpInHeader(config);
        

        if (String(window.location.pathname).endsWith("/auth/sign-out")) {
            deleteCookie(SET_DSEARCH_AUTH_USER)
        }

        return new Promise(async (resolve, reject) => {
            try {
                config.withCredentials = true
                let response = await axios.request(config)
                let token = (response['headers']||{})['x-bearer-token']
                if (token) {
                    authUser["token"] = token
                    sessionStorage.setItem(SET_DSEARCH_AUTH_USER, JSON.stringify(authUser))

                    if (!String(window.location.pathname).endsWith("/auth/sign-out")) {
                        setCookie(SET_DSEARCH_AUTH_USER, token, 60 * 60 * 24 * 1000) //1d
                    }
                }
                resolve(response)
            } catch (error) {
                console.log(error);
                if (error.response && error.response.status === 401 && config.uri !== '/auth') {
                    window.location.href = "/"
                    // location.href = process.env.PUBLIC_URL
                } else {
                    reject(error)
                }
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