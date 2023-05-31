import { _AsyncData } from "nuxt/dist/app/composables/asyncData";
import { message } from "ant-design-vue";
import { getToken } from "./auth";


const baseURL = "http://localhost:5142/api/"

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

    useFetch(reqURL, { ...options }).then(({ data, error }: _AsyncData<any, any>) => {
      if (error.value) {
        reject(error.value)
        return;
      }

      const value = data.value
      if (!value) {
        reject(value)
      } else if (value.code == 100) {
        message.error(value.message)
      } else {
        resolve(ref(value))
      }
    }).catch((err: any) => {
      reject(err)
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
