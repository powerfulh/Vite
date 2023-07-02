import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios"
import { unref, ref } from "vue"

interface swagParam {
	name: string
	in: 'query' | 'body' | 'path'
	required: Boolean
	schema?: {
		$ref: String
	}
}
interface api {
	operationId: string
	parameters?: Array<swagParam>
}
interface swaggerDeclaration {
	paths: {
		[key: string]: {
			get?: api
			post?: api
			put?: api
			delete?: api
		}
	}
}
interface swag {
	readonly type: Method
	readonly url: String
	parameters: Array<swagParam>
	validateParameter?: (target: Object) => String
}
interface $ref {
    required: Array<String>
    properties: {
        [key: string]: Object
    }
}

declare function ws(res: Object): AxiosResponse<any, any> | PromiseLike<AxiosResponse<any, any>>
declare function we(err: Object): PromiseLike<never>

const swagMap: {
	[key: string]: swag
} = {}
const apiLoadingStack = ref(0)

class SpringFoxios {
	private operationId: string
	private setedUrl: String // final url
	private parameter: Object
	private successCallback: typeof ws
	private errorCallback: typeof we
	private alwaysCallback: () => void

	constructor(operationId: string) {
		if(operationId == undefined) {
			console.log({
				map: swagMap,
				operationIdDeclaration: 'export type operationId = ' + Object.keys(swagMap).map(item => `'${item}'`).join(' | ')
			})
			return
		}
		this.operationId = operationId
		this.setedUrl = swagMap[operationId].url
		this.parameter = {}
	}

	setParameter(p: Object) {
		Object.assign(this.parameter, Object.keys(p).reduce((r, item) => Object.assign(r, {[item]: unref(p[item])}), {}))
		return this
	}
	setWhenSuccess(successCallback: typeof ws) {
		this.successCallback = successCallback
		return this
	}
	setWhenError(errorCallback: typeof we) {
		this.errorCallback = errorCallback
		return this
	}
	setWhenFinally(alwaysCallback: () => void) {
		this.alwaysCallback = alwaysCallback
		return this
	}
	private fire(): void {
		const dealWith = swagMap[this.operationId]
		if(dealWith.validateParameter) this.setedUrl = dealWith.validateParameter(this.parameter)

		const c: AxiosRequestConfig = {
			method: dealWith.type,
			url: 'http://localhost:8000' + this.setedUrl,
			data: dealWith.parameters.reduce((r, item) => Object.assign(r, this.parameter[item.name] ? {
				[item.name]: this.parameter[item.name]
			}: {}), {})
		}

		//c.headers = {
		//	Authorization: ''
		//}

		if(Object.keys(this.parameter).length) console.log('사용한 파라미터: ', this.parameter)
		else console.log('호출할 API 주소: ' + c.url)

		const call = axios(c)
		if(this.successCallback) call.then(this.successCallback)
		if(this.errorCallback) call.catch(this.errorCallback)
		call.finally(() => {
			if(this.alwaysCallback) this.alwaysCallback()
			apiLoadingStack.value--
		})
		apiLoadingStack.value++
	}
	validateParamForRequire(requireList: Array<{name: string, label: String}>, p: Object) {
		const founded = requireList.filter(item => p[item.name] == undefined || p[item.name] == '')
		if(founded.length) {
			throw founded.map(item => item.label).join('\n') + '\n\n위 항목은 필수 입력해야 합니다'
		}
		
		return this.setParameter(p)
	}
}

function get(operationId: string) {
	return new SpringFoxios(operationId)
}
function makeSwagMap(d:swaggerDeclaration) {
	Object.keys(d.paths).forEach(item => {
		Object.keys(d.paths[item]).forEach(method => {
			const thisApi: api = d.paths[item][method]
			const prop: swag = {
				type: method as Method,
				url: item,
				parameters: []
			}

			if(thisApi.parameters) {
				thisApi.parameters.forEach(paramItem => {
					if(paramItem.in == 'body') {
						const ref = findBy$ref(paramItem.schema.$ref, d)
                    	prop.parameters.push(...refToParameters(ref))
					} else if(paramItem.in == 'query' || paramItem.in == 'path') prop.parameters.push(paramItem)
				})

				prop.validateParameter = target => {
					let setedUrl = prop.url
					const get = prop.type == 'GET' || prop.type == 'get'
					if(get) setedUrl += '?'
					prop.parameters.forEach(param => {
						if (param.required && target[param.name] == undefined) {
							console.error(`필수 파라미터 ${param.name} 누락`)
							return
						}
						if (param.in == 'path') {
							setedUrl = setedUrl.replace(`{${param.name}}`, target[param.name] as string)
							delete target[param.name]
							return
						}
						if(get && target[param.name]) setedUrl += `${param.name}=${target[param.name]}&`
					})
					return setedUrl
				}
			}

			swagMap[thisApi.operationId] = prop
		})
	})
}
function findBy$ref(ref: String, d: swaggerDeclaration): $ref {
    const list = ref.split('/').slice(1)
    let target = d
    list.forEach(item => {
        target = target[item]
    })
    return target as unknown as $ref
}
function refToParameters(ref:$ref): Array<swagParam> {
    return Object.keys(ref.properties).map(item => ({
		name: item,
		in: 'query',
		required: ref.required.includes(item)
	}))
}

export default {
	get, makeSwagMap, apiLoadingStack
}