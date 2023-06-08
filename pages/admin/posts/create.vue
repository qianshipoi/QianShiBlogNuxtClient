<template>
  <div>
    <a-form ref="formRef" :rules="rules" :model="formState" name="basic" :label-col="{ span: 4 }"
      :wrapper-col="{ span: 20 }" autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">
      <a-form-item label="标题">
        <a-input v-model="formState.title" allowClear />
      </a-form-item>
      <a-form-item label="副标题">
        <a-input v-model="formState.subtitle" allowClear />
      </a-form-item>
      <a-form-item label="内容">
        <MdEditor ref="editor" v-model="formState.text" />
      </a-form-item>
      <a-form-item label="分类">
        <a-tree-select v-model:value="formState.metas" show-search style="width: 100%"
          :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }" placeholder="Please select" allow-clear multiple
          :show-checked-strategy="SHOW_ALL" tree-default-expand-all :tree-data="treeData" tree-node-filter-prop="label">
          <template #tagRender="{ label, closable, onClose, option }">
            <a-tag :closable="closable" :color="option.color" style="margin-right: 3px" @close="onClose">
              {{ label }}&nbsp;&nbsp;
            </a-tag>
          </template>
          <template #title="{ value: val, label }">
            <b v-if="val === 'parent 1-1'" style="color: #08c">{{ val }}</b>
            <template v-else>{{ label }}</template>
          </template>
        </a-tree-select>
      </a-form-item>
      <a-form-item label="标签">
        <a-select v-model="formState.metas" mode="tags" style="width: 100%" placeholder="Tags Mode"
          :options="tagOptions"></a-select>
      </a-form-item>
    </a-form>
    <a-space>
      <a-button @click="publish" type="primary">发布</a-button>
      <a-button @click="save">存为草稿</a-button>
    </a-space>
  </div>
</template>

<script setup lang='ts'>
import { BlogMeta, BlogMetaType } from '~/types/appTypes';
import type { FormInstance, SelectProps, TreeSelectProps } from 'ant-design-vue';
import { TreeSelect } from 'ant-design-vue';
import cloneDeep from 'lodash/cloneDeep'
import { Rule } from 'ant-design-vue/es/form';
const SHOW_ALL = TreeSelect.SHOW_ALL;

interface FormState {
  title: string,
  subtitle?: string,
  text: string,
  htmlText: string,
  metas: number[],
  publish: boolean
}

const formState = reactive<FormState>({
  title: '',
  subtitle: '',
  text: '',
  htmlText: '',
  metas: [],
  publish: false
})

const formRef = ref<FormInstance>()

const metasStore = useMetasStore()
metasStore.getMetas(BlogMetaType.Category);
metasStore.getMetas(BlogMetaType.Tag);

const tagOptions = ref<SelectProps['options']>([])

const treeData = ref<TreeSelectProps['treeData']>([])

const rules: Record<string, Rule[]> = {
  title: [{ required: true, trigger: 'change', message: '名称不能为空。' }, { max: 128, trigger: 'change' }],
  text: [{ required: true, trigger: 'change', message: '名称不能为空。' }],
};

watchEffect(() => {
  tagOptions.value = getTreeMeta(metasStore.state.tags, 0)
})

watchEffect(() => {
  treeData.value = getTreeData(cloneDeep(toRaw(metasStore.state.categorys)), 0);
})

function getTreeData(metas: BlogMeta[], parent: number): TreeSelectProps['treeData'] {
  const children: BlogMeta[] = metas.filter(x => x.parent === parent)
  const options: TreeSelectProps['treeData'] = []

  children.forEach(item => {
    options.push({
      label: item.name,
      value: item.id,
      children: getTreeData(metas, item.id)
    })
  });

  return options;
}

function getTreeMeta(metas: BlogMeta[], parent: number): SelectProps['options'] {
  const children: BlogMeta[] = metas.filter(x => x.parent === parent)
  const options: SelectProps['options'] = []

  children.forEach(item => {
    options.push({
      label: item.name,
      value: item.id,
      children: getTreeMeta(metas, item.id)
    })
  });

  return options;
}

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

const editor = ref()

const publish = () => {
  formRef.value?.validateFields()
}

const save = () => {

}

const getHtml = () => {
  console.log(editor.value.getHtml());
}

</script>
