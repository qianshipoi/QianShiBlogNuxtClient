<template>
  <div>
    <a-button @click="showModal">新建分类</a-button>

    <a-table :columns="columns" :data-source="metas.categorys" bordered>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'title'">
          <a>
            {{ record.title }}
          </a>
        </template>
        <template v-else-if="column.key === 'action'">
          <span>
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
          <a-select v-model:value="formState.parent" style="width: 100%">
            <a-select-option :value="0">无</a-select-option>
            <a-select-option :value="item.id" v-for="item in metas.$state.categorys"
              :key="item.id">{{ item.name }}</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang='ts'>
import { useMetas } from '~/stores/metas';
import { BlogMetaType } from '~/types/appTypes';

const metas = useMetas()

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

onMounted(() => {
  metas.getMetas(BlogMetaType.Category)
})

const { loading: confirmLoading, visible: addVisible, showModal, handleOk, formRef, formState, rules } = useAddMeta(BlogMetaType.Category)

</script>

