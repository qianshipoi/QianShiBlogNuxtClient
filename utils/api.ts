import Http from './request'

export const getMetas = (type: 1 | 2) => {
  return Http.get('BlogMeta', {
    type: type,
    pageNumber: 1,
    pageSize: 100
  })
}
