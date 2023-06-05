import { defineStore } from "pinia";
import { message } from "ant-design-vue";
import { BlogMeta, BlogMetaCreateDto, BlogMetaType } from "~/types/appTypes";
import { getMetas as getMetasFunc, addMeta as addMetaFunc, delMeta as delMetaFunc } from '~/utils/api'

export const useMetas = defineStore('metas', {
  state: () => ({
    categorys: [] as BlogMeta[],
    tags: [] as BlogMeta[],
    loading: false
  }),

  actions: {
    async getMetas(type: BlogMetaType): Promise<void> {
      try {
        this.loading = true
        const response = await getMetasFunc(type)
        if (type === BlogMetaType.Category) {
          this.categorys = response.items
        } else {
          this.tags = response.items
        }
      } catch {
        message.error("获取分类数据异常！")
      } finally {
        this.loading = false
      }
    },
    async addMeta(meta: BlogMetaCreateDto): Promise<boolean> {
      this.loading = true
      try {
        await addMetaFunc(meta)
        message.success("添加成功！");
      } catch (error) {
        message.error("添加失败！")
        return false
      } finally {
        this.loading = false
      }
      await this.getMetas(meta.type)
      return true
    },
    async delMeta(id: number, type: BlogMetaType): Promise<void> {
      this.loading = true
      try {
        await delMetaFunc(id)
        message.success("删除成功！");
      } catch (error) {
        message.error("删除失败！")
        return
      } finally {
        this.loading = false
      }
      await this.getMetas(type)
    }
  },

  persist: true
})
