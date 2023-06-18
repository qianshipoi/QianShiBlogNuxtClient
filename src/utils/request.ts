import { _AsyncData } from "nuxt/dist/app/composables/asyncData";
import { message } from "ant-design-vue";
import { getToken } from "./auth";


const baseURL = "/api/" //"http://localhost:5142/api/"

export interface ResponseConfig {
  code: number,
  status: number,
  data: any,
  message: string
}

export interface ValueConfig {
  value: any
}

const fetch = (url: string, options?: any): Promise<any> => {
  const reqURL = baseURL + url;
  return new Promise((resolve, reject) => {
    const token = getToken()
    let headers: Record<string, string> = {}
    token && (headers['Authorization'] = `Bearer ${token}`);

    options = Object.assign({}, options, { headers })

    const route = useRoute()

    useFetch(reqURL, {
      ...options,
      onRequest({ request, options }) {
        console.log(options);
      },
      onRequestError({ request, options, error }) {
        console.log(error);
        reject(error)
      },
      onResponse({ request, response, error }) {
        console.log(response);
        if (response.status === 401) {
          navigateTo({
            path: '/login',
            query: {
              redirect: route.fullPath
            }
          })
          reject("请重新登录")
          return
        }

        resolve(toRef(response._data))
      },
      onResponseError({ request, response, options }) {
        console.log(response);
      }
    })
  })
}

export default new class Http {

  get(url: string, params?: any, server?: boolean): Promise<any> {
    return fetch(url, { method: 'get', params, server })
  }

  post(url: string, body?: any, server?: boolean): Promise<any> {
    return fetch(url, { method: 'post', body, server })
  }

  put(url: string, body?: any, server?: boolean): Promise<any> {
    return fetch(url, { method: 'put', body, server })
  }

  delete(url: string, params?: any, server?: boolean): Promise<any> {
    return fetch(url, { method: 'delete', params, server })
  }

}
