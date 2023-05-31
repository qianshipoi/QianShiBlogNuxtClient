export interface GlobalPagedResponse<T> {
  hasNextPage: boolean,
  hasPreviousPage: boolean,
  items: T[],
  pageNumber: number,
  totalCount: number,
  totalPage: number
}

export interface BlogMeta {
  id: number,
  name: string,
  descriptiopn: string | null,
  count: number,
  parent: number,
  children?: BlogMeta[]
}

export interface PostType {
  id: number,
  title: string,
  subtitle: string | null,
  order: number,
  status: number,
  type: number,
  allowComment: boolean,
  commentCount: number
}
