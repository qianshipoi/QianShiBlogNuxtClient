import Http from './request'

export const getMetas = (type: 1 | 2) => {
  return Http.get('BlogMeta', {
    type: type,
    pageNumber: 1,
    pageSize: 100
  })
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
