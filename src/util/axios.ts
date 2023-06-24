import axios from 'axios'

import {Method, AxiosRequestConfig, AxiosResponse} from 'axios'

import list from './axios-list.json';


 

interface axiosItem {

    name: string

    type: Method,

    url: string

}


 

declare type parameter = {

    [key: string]: String | Array<parameter> | parameter

}

declare function ws(res: AxiosResponse<any, any>): AxiosResponse<any, any> | PromiseLike<AxiosResponse<any, any>>

declare function we(err: Object): PromiseLike<never>


 

const a: {

    [key: string]: axiosItem

} = (list as unknown as Array<axiosItem>).reduce((r, item) => {

    r[item.name] = item

    return r

}, {})


 

//const d: Boolean = import.meta.env.MODE == 'development'

let l: axiosItem

const p: parameter = {}

let s: typeof ws

let e: typeof we

let f: () => void



axios.defaults.baseURL = import.meta.env.VITE_BACKEND

 

const Axios = {

    load: (v: string) => {

        if(a[v]) {

            l = a[v]

            return {

                setParameter: (v1: parameter) => {

                    Object.keys(v1).forEach(item => p[item] = v1[item])

                    return Axios.load(v)

                },

                setWhenSuccess: (successCallback: typeof ws) => {

                    s = successCallback

                    return Axios.load(v)

                },

                setWhenError: (errorCallback: typeof we) => {

                    e = errorCallback

                    return Axios.load(v)

                },

                setWhenFinally: (alwaysCallback: () => void) => {

                    f = alwaysCallback

                    return Axios.load(v)

                },

                fire: (v?: HTMLElement): void => Axios.fire(v)

            }

        } else console.error(`axios-list.json 에 ${v} 누락!`)

    },

    fire: (v?: HTMLElement): void => {

        if(l == null) {

            console.warn('API 가 로드되지 않음')

            return

        }

        let n = 0

        if(v) {

            while(v.hasAttribute('show-axios-loading') && v.getAttribute('show-axios-loading')! >= n.toString()) n++

            v.setAttribute('show-axios-loading', n.toString())

        }

        const c: AxiosRequestConfig = {

            method: l.type,

            url: l.url,

            data: p

        }

        console.log('사용한 파라미터: ', p)

        const call = axios(c)

        if(s) call.then(s)

        if(e) call.catch(e)

        if(v || f) call.finally(() => {

            if(v) {

                const i = v.getAttribute('show-axios-loading')

                if(i == '0') v.removeAttribute('show-axios-loading')

                else v.setAttribute('show-axios-loading', (Number(i) - 1).toString())

            }

            if(f) f()

        })

    }

}


 

export default Axios