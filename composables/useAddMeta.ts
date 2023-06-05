import { FormInstance, message } from "ant-design-vue";
import { Rule } from "ant-design-vue/es/form";
import { useMetas } from "~/stores/metas";
import { BlogMetaType } from "~/types/appTypes";
import { addMeta } from "~/utils/api"

export const useAddMeta = (type: BlogMetaType) => {
  const visible = ref(false)

  const metas = useMetas()

  const loading = computed(() => metas.$state.loading)
  interface FormState {
    name: string;
    description: string;
    parent: number
  }

  const rules: Record<string, Rule[]> = {
    name: [{ required: true, trigger: 'change', message: '名称不能为空。' }],
    description: [{ max: 255, trigger: 'change' }],
  };

  const formState = reactive<FormState>({
    name: '',
    description: '',
    parent: 0
  });

  const formRef = ref<FormInstance>();

  const showModal = () => {
    visible.value = true;
  };

  const handleOk = async () => {
    let isSucceeded = false
    try {
      const values = await formRef.value?.validateFields();
      isSucceeded = true;
    } catch (error) {
      isSucceeded = false
    }
    if (isSucceeded) {
      const result = await metas.addMeta({ ...toRaw(formState), type })
      if (result) {
        visible.value = false
      }
    }
  };

  return {
    formRef,
    rules,
    visible,
    formState,
    loading,
    showModal,
    handleOk
  }
}
