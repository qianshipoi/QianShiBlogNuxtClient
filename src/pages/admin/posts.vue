<template>
  <a-layout>
    <a-layout-sider>
      <h1>操作</h1>
      <a-space direction="vertical">
        <NuxtLink to="/admin/posts/edit">新建</NuxtLink>
        <a href="javascript:;">导入</a>
      </a-space>
      <h1>分类</h1>
      <a href="javascript:;" @click="() => showModal()">新建分类</a>
      <a-tree :tree-data="treeData2" v-if="treeData2.length" blockNode>
        <template #title="{ title, key, count, level }">
          <a-dropdown :trigger="['contextmenu']">
            <span>{{ title }} ({{ count }})</span>
            <template #overlay>
              <a-menu @click="(e: any) => onContextMenuClick(key, e.key as keyof handlerType)">
                <a-menu-item key="edit">编辑</a-menu-item>
                <a-menu-item key="del">删除</a-menu-item>
                <a-menu-item key="add" v-if="level < 3">新增</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </template>
      </a-tree>

      <a-modal v-model:visible="addVisible" title="Title" :confirm-loading="confirmLoading" @ok="handleOk">
        <a-form ref="formRef" :model="formState" name="basic" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }"
          autocomplete="off" :rules="rules">
          <a-form-item has-feedback label="名称" name="name">
            <a-input v-model:value="formState.name" />
          </a-form-item>

          <a-form-item has-feedback label="描述" name="description">
            <a-textarea v-model:value="formState.description" :auto-size="{ minRows: 2, maxRows: 5 }" />
          </a-form-item>

          <a-form-item has-feedback label="父级" name="parent">
            <a-tree-select v-model:value="formState.parent" show-search style="width: 100%"
              :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }" placeholder="Please select" allow-clear
              tree-default-expand-all :tree-data="parentTreeData" tree-node-filter-prop="label" />
          </a-form-item>
        </a-form>
      </a-modal>

    </a-layout-sider>
    <a-layout-content>
      <NuxtPage />
    </a-layout-content>
  </a-layout>
</template>

<script setup lang='ts'>
import cloneDeep from 'lodash/cloneDeep';
import { BlogMeta, BlogMetaType, handlerType } from '~/types/appTypes';

const metas = useMetasStore()
onMounted(() => {
  metas.getMetas(BlogMetaType.Category)
})

interface TreeData2 {
  title: string
  key: number
  count: number
  level: number
  children?: TreeData2[]
}

const treeData2 = ref<TreeData2[]>([])

watchEffect(() => {
  treeData2.value = getTreeData2(cloneDeep(toRaw(metas.state.categorys)), 0);
})


function getTreeData2(metas: BlogMeta[], parent: number, level: number = 1): TreeData2[] {
  const children: BlogMeta[] = metas.filter(x => x.parent === parent)
  const options: TreeData2[] = []

  children.forEach(item => {
    options.push({
      title: item.name,
      key: item.id,
      count: item.count,
      level: level,
      children: getTreeData2(metas, item.id, level + 1)
    })
  });

  return options;
}

const {
  loading: confirmLoading,
  visible: addVisible,
  showModal,
  handleOk,
  formRef,
  formState,
  rules,
  onContextMenuClick,
  parentTreeData } = useEditMeta(BlogMetaType.Category)

</script>

<style scoped>
.ant-layout-sider {
  background: transparent;
}

.ant-layout {
  background: transparent;
}
</style>
