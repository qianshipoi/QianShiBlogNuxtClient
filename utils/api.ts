import { BlogMeta, BlogMetaCreateDto, BlogMetaType, GlobalPagedResponse } from '~/types/appTypes'
import Http from './request'

export const getMetas = (type: BlogMetaType): Promise<GlobalPagedResponse<BlogMeta>> => {
  return new Promise((resolve, reject) => {
    Http.get('BlogMeta', {
      type: type,
      pageNumber: 1,
      pageSize: 100
    }, false).then(res => {
      resolve(toRaw(res.value) as GlobalPagedResponse<BlogMeta>)
    }).catch(err => {
      reject(err)
    })
  })
}

export const addMeta = (meta: BlogMetaCreateDto) => {
  return Http.post('BlogMeta', meta, false)
}

export const delMeta = (id: number) => {
  return Http.delete(`BlogMeta/${id}`, {}, false)
}

export const updMeta = (id: number, meta: BlogMetaCreateDto) => {
  return Http.put(`BlogMeta/${id}`, meta, false)
}

export const login = (email: string, password: string) => {
  return Http.post('Auth/Login', { userName: email, password })
}

export const getPosts = () => {
  return Http.get('BlogContent', {
    type: 0,
    pageNumber: 1,
    pageSize: 100
  }, false)
}
