import { message } from "ant-design-vue"
import { defineStore, skipHydrate } from "pinia"
import { BlogMeta, BlogMetaCreateDto, BlogMetaEditDto, BlogMetaType, GlobalPagedResponse, GlobalResponseT } from "~/types/appTypes"

export const useMetasStore = defineStore('metasStore', () => {
  const state = reactive<{
    categorys: BlogMeta[],
    tags: BlogMeta[],
    loading: boolean
  }>({
    categorys: [],
    tags: [],
    loading: false
  })

  const getMetas = async (type: BlogMetaType) => {
    try {
      state.loading = true
      const response = await httpGet<GlobalPagedResponse<BlogMeta>>('/api/BlogMeta', {
        params: {
          type: type,
          pageNumber: 1,
          pageSize: 999
        }
      })
      if (type === BlogMetaType.Category) {
        state.categorys = response.items
      } else {
        state.tags = response.items
      }
    } catch (err) {
      message.error("获取分类数据异常！")
    } finally {
      state.loading = false
    }
  }

  const addMeta = async (meta: BlogMetaCreateDto) => {
    state.loading = true
    try {
      await httpPost<GlobalResponseT<number>>('/api/BlogMeta', meta)
      message.success("添加成功！");
    } catch (error) {
      message.error("添加失败！")
      return false
    } finally {
      state.loading = false
    }
    await getMetas(meta.type)
    return true
  }

  const editMeta = async (meta: BlogMetaEditDto) => {
    state.loading = true
    try {
      await httpPut<GlobalResponseT<number>>('/api/BlogMeta/' + meta.id, meta)
      message.success("更新成功！");
    } catch (error) {
      message.error("更新失败！")
      return false
    } finally {
      state.loading = false
    }
    await getMetas(meta.type)
    return true
  }

  const delMeta = async (id: number, type: BlogMetaType) => {
    state.loading = true
    try {
      await httpDelete('/api/BlogMeta/' + id)
      message.success("删除成功！");
    } catch (error) {
      message.error("删除失败！")
      return
    } finally {
      state.loading = false
    }
    await getMetas(type)
  }

  return {
    state: skipHydrate(state),
    getMetas,
    addMeta,
    editMeta,
    delMeta
  }
})
