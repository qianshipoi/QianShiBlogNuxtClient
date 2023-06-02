import { message } from "ant-design-vue"
import { delMeta as delMetaFunc } from "~/utils/api"

export const useDelMeta = () => {

  const loading = ref(false)

  const delMeta = async (id: number) => {
    if (loading.value) return

    loading.value = true
    delMetaFunc(id).then(res => {
      message.success('删除成功！')
    }).catch(err => {
      message.error(err)
    }).finally(() => loading.value = false)
  }

  return {
    delMeta
  }
}
