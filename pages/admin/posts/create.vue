<template>
  <div>
    <a-form :model="formState" name="basic" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }" autocomplete="off"
      @finish="onFinish" @finishFailed="onFinishFailed">
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
        <a-cascader v-model="formState.metas" multiple max-tag-count="responsive" :options="categoryOptions">
          <template #tagRender="data">
            <a-tag :key="data.value" color="blue">{{ data.label }}</a-tag>
          </template>
        </a-cascader>
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
import { BlogMeta, BlogMetaType, GlobalPagedResponse } from '~/types/appTypes';
import type { CascaderProps, SelectProps } from 'ant-design-vue';

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

const metasStore = useMetasStore()
metasStore.getMetas(BlogMetaType.Category);
metasStore.getMetas(BlogMetaType.Tag);

const categoryOptions = ref<CascaderProps['options']>([])

const tagOptions = ref<SelectProps['options']>([])


watchEffect(() => {
  categoryOptions.value = getTreeMeta(metasStore.state.categorys, 0)
})

watchEffect(() => {
  tagOptions.value = getTreeMeta(metasStore.state.tags, 0)
})

// getMetas(BlogMetaType.Category).then(res => {
//   const metas = res.items
//   categoryOptions.value = getTreeMeta(toRaw(metas), 0)
// })

// getMetas(BlogMetaType.Tag).then(res => {
//   const metas = res.items
//   tagOptions.value = getTreeMeta(toRaw(metas), 0)
// })

function getTreeMeta(metas: BlogMeta[], parent: number): CascaderProps['options'] {
  const children: BlogMeta[] = metas.filter(x => x.parent === parent)
  const options: CascaderProps['options'] = []

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

}

const save = () => {

}

const getHtml = () => {
  console.log(editor.value.getHtml());
}

</script>

<style>
</style>
