<template>
  <div>
    <a-form ref="formRef" :model="formState" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
      <a-form-item label="标题" v-bind="validateInfos.title">
        <a-input v-model:value="formState.title" allowClear />
      </a-form-item>
      <a-form-item label="副标题">
        <a-input v-model="formState.subtitle" allowClear />
      </a-form-item>
      <a-form-item label="内容" v-bind="validateInfos.text">
        <MdEditor ref="editor" v-model="formState.text" />
      </a-form-item>
      <a-form-item label="分类">
        <a-tree-select v-model:value="formState.metas" show-search style="width: 100%"
          :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }" placeholder="Please select" allow-clear multiple
          :show-checked-strategy="SHOW_ALL" tree-default-expand-all :tree-data="categorys" tree-node-filter-prop="label">
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
          :options="tags"></a-select>
      </a-form-item>
    </a-form>
    <a-space>
      <a-button @click.prevent="publish" type="primary">发布</a-button>
      <a-button @click="save">存为草稿</a-button>
      <a-button @click="back">取消</a-button>
    </a-space>
  </div>
</template>

<script setup lang='ts'>
import { BlogMeta, BlogMetaType } from '~/types/appTypes';
import type { FormInstance, SelectProps, TreeSelectProps } from 'ant-design-vue';
import { TreeSelect } from 'ant-design-vue';
import cloneDeep from 'lodash/cloneDeep'
import { Rule } from 'ant-design-vue/es/form';
import useForm from 'ant-design-vue/lib/form/useForm';
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
const route = useRoute()
const router = useRouter()

const metasStore = useMetasStore()
metasStore.getMetas(BlogMetaType.Category);
metasStore.getMetas(BlogMetaType.Tag);

const tags = ref<SelectProps['options']>([])

const categorys = ref<TreeSelectProps['treeData']>([])

const rules = reactive({
  title: [
    { required: true, trigger: 'change', message: '名称不能为空。' },
    { max: 128, trigger: 'change' }],
  text: [
    { required: true, trigger: 'change', message: '内容不能为空。' }
  ],
});

const { resetFields, validate, validateInfos } = useForm(formRef, rules, {
  onValidate: (...args) => console.log(...args),
});

watchEffect(() => {
  tags.value = getTagsTree(metasStore.state.tags, 0)
})

watchEffect(() => {
  categorys.value = getCategorysTree(cloneDeep(toRaw(metasStore.state.categorys)), 0);
})

function getCategorysTree(metas: BlogMeta[], parent: number): TreeSelectProps['treeData'] {
  const children: BlogMeta[] = metas.filter(x => x.parent === parent)
  const options: TreeSelectProps['treeData'] = []

  children.forEach(item => {
    options.push({
      label: item.name,
      value: item.id,
      children: getCategorysTree(metas, item.id)
    })
  });

  return options;
}

function getTagsTree(metas: BlogMeta[], parent: number): SelectProps['options'] {
  const children: BlogMeta[] = metas.filter(x => x.parent === parent)
  const options: SelectProps['options'] = []

  children.forEach(item => {
    options.push({
      label: item.name,
      value: item.id,
      children: getTagsTree(metas, item.id)
    })
  });

  return options;
}

const editor = ref()
const { $bus } = useNuxtApp();

const publish = () => {
  validate()
    .then(res => {
      console.log(res, toRaw(formState));
    })
    .catch(err => {
      console.log('error', err);
    });
}

const save = () => {

}

const getHtml = () => {
  console.log(editor.value.getHtml());
}


const back = () => {
  router.back();
}

</script>
