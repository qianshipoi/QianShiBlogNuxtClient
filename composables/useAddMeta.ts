import { FormInstance, TreeSelectProps } from "ant-design-vue";
import { Rule } from "ant-design-vue/es/form";
import cloneDeep from "lodash/cloneDeep";
import { BlogMeta, BlogMetaType } from "~/types/appTypes";

export const useAddMeta = (type: BlogMetaType) => {
  const visible = ref(false)

  const metas = useMetasStore()

  const loading = computed(() => metas.state.loading)
  interface FormState {
    id: number;
    name: string;
    description: string | null;
    parent: number | undefined
  }

  const rules: Record<string, Rule[]> = {
    name: [{ required: true, trigger: 'change', message: '名称不能为空。' }],
    description: [{ max: 255, trigger: 'change' }],
  };

  const formState = reactive<FormState>({
    id: 0,
    name: '',
    description: '',
    parent: undefined
  });

  const formRef = ref<FormInstance>();

  const showModal = (parentId?: number) => {
    formState.id = 0
    formState.name = ''
    formState.description = ''
    formState.parent = undefined

    if (parentId) {
      formState.parent = parentId
    }
    visible.value = true;
  };

  const showEdit = (meta: BlogMeta) => {
    formState.id = meta.id
    formState.name = meta.name
    formState.description = meta.description
    formState.parent = meta.parent === 0 ? undefined : meta.parent
    visible.value = true;
  }

  const parentTreeData = ref<TreeSelectProps['treeData']>()

  watch(() => [formState.id, metas.state.categorys], () => {
    parentTreeData.value = getTreeData(cloneDeep(toRaw(metas.state.categorys)), 0);
  }, {
    immediate: true
  })

  function getTreeData(metas: BlogMeta[], parent: number, disabled: boolean = false, level: number = 1): TreeSelectProps['treeData'] {
    const children: BlogMeta[] = metas.filter(x => x.parent === parent)
    const options: TreeSelectProps['treeData'] = []

    children.forEach(item => {
      const isDisabled = level === 3 ? true : disabled ? true : item.id === formState.id
      options.push({
        label: item.name,
        value: item.id,
        disabled: isDisabled,
        children: getTreeData(metas, item.id, isDisabled, level + 1)
      })
    });

    return options;
  }


  const handleOk = async () => {
    let isSucceeded = false
    try {
      await formRef.value?.validateFields();
      isSucceeded = true;
    } catch (error) {
      isSucceeded = false
    }
    if (isSucceeded) {
      let result: boolean = false
      if (formState.id > 0) {
        // edit
        result = await metas.editMeta({ ...toRaw(formState), type })
      } else {
        // add
        result = await metas.addMeta({ ...toRaw(formState), type })
      }

      if (result) {
        formRef.value?.resetFields()
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
    showEdit,
    handleOk,
    parentTreeData: computed(() => parentTreeData.value)
  }
}
