import { _AsyncData } from "nuxt/dist/app/composables/asyncData";
import { message } from "ant-design-vue";

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

  get(url: string, params?: any): Promise<any> {
    return fetch(url, { method: 'get', params })
  }

  post(url: string, body?: any): Promise<any> {
    return fetch(url, { method: 'post', body })
  }

  put(url: string, body?: any): Promise<any> {
    return fetch(url, { method: 'put', body })
  }

  delete(url: string, params?: any): Promise<any> {
    return fetch(url, { method: 'delete', params })
  }

}
