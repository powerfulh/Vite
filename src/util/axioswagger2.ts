import axios from 'axios'
import {Method, AxiosRequestConfig, AxiosResponse} from 'axios'
import { unref } from 'vue'
import swag from '@/swag.json'
import {loadKey} from './from-swag'

interface axiosParameter {
    name: string
    required: Boolean
    in?: 'path' | 'query' | 'body'
    schema?: {
        $ref: String
    }
}

interface axiosItem {

    readonly type: Method

    readonly url: string

    validateParameter?: (target: parameter) => void

    parameters?: Array<axiosParameter>

    setedUrl?: String

}

interface $ref {

    required: Array<String>

    properties: {

        [key: string]: {

            maxLength: Number

        }

    }

}

declare type parameter = {

    [key: string]: String | Array<parameter> | parameter

}

declare function ws(res: Object): AxiosResponse<any, any> | PromiseLike<AxiosResponse<any, any>>

declare function we(err: Object): PromiseLike<never>

const a: {

    [key: string]: axiosItem

} = {}

Object.keys(swag.paths).forEach(item => {

    Object.keys(swag.paths[item]).forEach(method => {

        const apiItem: {
            parameters: Array<axiosParameter>
            operationId: loadKey
        } = swag.paths[item][method]

        const prop: axiosItem = {

            type: method as Method,

            url: item

        }

        if (apiItem.parameters) {
            prop.parameters = []
            apiItem.parameters.forEach(paramItem => {
                if(paramItem.in != 'body') prop.parameters.push(paramItem)
                else {
                    const ref = findBy$ref(paramItem.schema.$ref)
                    prop.parameters.push(...refToParameters(ref))
                }
            })
            //prop.parameters = apiItem.parameters

            prop.validateParameter = target => {

                const get = prop.type == 'GET' || prop.type == 'get'

                if(get) prop.setedUrl = prop.url + '?'

                prop.parameters.forEach(param => {

                    if (param.required && target[param.name] == undefined) {

                        console.error(`필수 파라미터 ${param.name} 누락`)

                        return

                    }

                    if (param.in == 'path') {

                        prop.setedUrl = prop.url.replace(`{${param.name}}`, target[param.name] as string)

                        delete target[param.name]

                        return

                    }

                    if(get && target[param.name]) prop.setedUrl += `${param.name}=${target[param.name]}&`

                })

            }

        }

        // 스웨거2에는 requestBody 없음
        //if(apiItem.requestBody && apiItem.requestBody.content['application/json']) { // multipart/form-data는 생략
        //    const ref = findBy$ref(apiItem.requestBody.content['application/json'].schema.$ref)
        //    prop.parameters = refToParameters(ref)
        //}

        a[apiItem.operationId] = prop

    })

})

// const d: Boolean = import.meta.env.MODE == 'development'
let l: axiosItem
const p: parameter = {}
let s: typeof ws
let e: typeof we
let f: () => void

function findBy$ref(ref: String): $ref {

    const list = ref.split('/').slice(1)

    let target = swag

    list.forEach(item => {

        target = target[item]

    })

    return target as unknown as $ref

}

function refToParameters(ref:$ref): Array<axiosParameter> {

    return Object.keys(ref.properties).map(item => Object.assign(ref.properties[item], {

        name: item,

        required: ref.required ? ref.required.includes(item) : false

    }))

}

const Axios = {

    load: (v: loadKey) => {

        if(a[v]) {

            l = a[v]

            return {

                setParameter: (v1: parameter) => {

                    Object.assign(p, Object.keys(v1).reduce((r, item) => Object.assign(r, {[item]: unref(v1[item])}), {}))

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

        } else console.error(`swag.json 에 ${v} 누락!`)

    },

    fire: (v?: HTMLElement): void => {

        if(l == null) {

            console.warn('API 가 로드되지 않음')

            return

        }
        
        let insideBtnList: NodeListOf<Element>

        if(v) {

            // 로딩 표현 스타일

            let n = 0

            while(v.hasAttribute('show-axios-loading') && v.getAttribute('show-axios-loading') >= n.toString()) n++

            v.setAttribute('show-axios-loading', n.toString())

            // 내부 버튼 비활성화

            insideBtnList = v.querySelectorAll('button:not([disabled])')

            insideBtnList.forEach(item => {

                item.setAttribute('disabled', 'true')

            })

        }

        if(l.validateParameter) l.validateParameter(p)

        const c: AxiosRequestConfig = {

            method: l.type,

            url: 'http://localhost:8000' + (l.setedUrl || l.url),

            data: l.parameters ? l.parameters.reduce((r, item) => {

                return Object.assign(r, p[item.name] ? {

                    [item.name]: p[item.name]

                } : {})

            }, {}) : {}

        }

        //c.headers = {
        //    Authorization: `Bearer ${loginStore.token}`
        //}

        console.log('사용한 파라미터: ', p)

        const call = axios(c)

        if(s) call.then(s)

        if(e) call.catch(e)

        if(v || f) call.finally(() => {

            if(v) {

                // 로딩 표현 스타일

                const i = v.getAttribute('show-axios-loading')

                if(i == '0') v.removeAttribute('show-axios-loading')

                else v.setAttribute('show-axios-loading', (Number(i) - 1).toString())

                // 내부 버튼 활성화

                insideBtnList.forEach(item => {

                    item.removeAttribute('disabled')

                })

            }

            if(f) f()

        })

        Object.keys(p).forEach(item => {

            delete p[item]

        })
    },

    getApiFromSwag: { // 개발 편의 속성, 개발 이후 삭제 todo

        map: a,

        loadKeyDeclaration: 'export type loadKey = ' + Object.keys(a).map(item => `'${item}'`).join(' | ')

    },

    validateParamForRequire: (requireList: Array<{name: string, label: String}>, map: parameter): Boolean => {

        const founded = requireList.filter(item => map[item.name] == undefined || map[item.name] == '')

        if(founded.length) {

            alert(founded.map(item => item.label).join('\n') + '\n\n위 항목은 필수 입력해야 합니다')

            return true

        }

        return false

    }

}

export default Axios