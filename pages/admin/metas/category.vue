<template>
  <div>
    <a-space>
      <a-button @click="showModal">新建分类</a-button>
    </a-space>

    <a-table :columns="columns" :data-source="data" bordered :pagination="false">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'title'">
          <a>
            {{ record.title }}
          </a>
        </template>
        <template v-else-if="column.key === 'action'">
          <span>
            <a href="#" @click="showModal(record.id)">Add</a>
            <a-divider type="vertical" />
            <a href="#" @click="showEdit(record)">Edit</a>
            <a-divider type="vertical" />
            <a-popconfirm title="确定删除该数据?" ok-text="确定" cancel-text="取消"
              @confirm="metas.delMeta(record.id, BlogMetaType.Category)">
              <a href="#">Delete</a>
            </a-popconfirm>
          </span>
        </template>
      </template>
    </a-table>

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
            tree-default-expand-all :tree-data="treeData" tree-node-filter-prop="label" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang='ts'>
import { TreeSelectProps } from 'ant-design-vue';
import { BlogMeta, BlogMetaType } from '~/types/appTypes';
import cloneDeep from 'lodash/cloneDeep'

const metas = useMetasStore()
metas.getMetas(BlogMetaType.Category)

const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '文章数量',
    dataIndex: 'count',
    key: 'count',
  },
  {
    title: '操作',
    key: 'action',
  },
];

const data = ref<BlogMeta[]>([])

watchEffect(() => {
  data.value = getTreeMeta(cloneDeep(toRaw(metas.state.categorys)), 0);
})

const treeData = ref<TreeSelectProps['treeData']>()

watchEffect(() => {
  treeData.value = getTreeData(cloneDeep(toRaw(metas.state.categorys)), 0);
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

function getTreeMeta(metas: BlogMeta[], parent: number): BlogMeta[] {
  const children: BlogMeta[] = metas.filter(x => x.parent === parent)

  children.forEach(item => {
    item.children = getTreeMeta(metas, item.id)
  });

  return children;
}

const { loading: confirmLoading, visible: addVisible, showModal, handleOk, formRef, formState, rules, showEdit } = useAddMeta(BlogMetaType.Category)

</script>

