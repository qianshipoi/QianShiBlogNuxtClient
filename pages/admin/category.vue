<template>
  <div>
    <a-button @click="showModal">新建分类</a-button>

    <a-table :columns="columns" :data-source="data" bordered>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'title'">
          <a>
            {{ record.title }}
          </a>
        </template>
        <template v-else-if="column.key === 'action'">
          <span>
            <a>Invite 一 {{ record.title }}</a>
            <a-divider type="vertical" />
            <a>Delete</a>
          </span>
        </template>
      </template>
    </a-table>

    <a-modal v-model:visible="addVisible" title="Title" :confirm-loading="confirmLoading" @ok="handleOk">
      <a-form ref="formRef" :model="formState" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }"
        autocomplete="off" @finish="onFinish" :rules="rules" @finishFailed="onFinishFailed">
        <a-form-item has-feedback label="名称" name="name">
          <a-input v-model:value="formState.name" />
        </a-form-item>

        <a-form-item has-feedback label="描述" name="description">
          <a-textarea v-model:value="formState.description" :auto-size="{ minRows: 2, maxRows: 5 }" />
        </a-form-item>

        <a-form-item has-feedback label="父级" name="parent">
          <a-select v-model:value="formState.parent" style="width: 120px">
            <a-select-option :value="0">无</a-select-option>
            <a-select-option :value="1">测试</a-select-option>
          </a-select>
        </a-form-item>

      </a-form>
    </a-modal>

  </div>
</template>

<script setup lang='ts'>
import { BlogMeta, GlobalPagedResponse } from '~/types/appTypes';
import type { Rule } from 'ant-design-vue/es/form';
import type { FormInstance } from 'ant-design-vue';


const data = ref<BlogMeta[]>([])

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

const token = getToken()

let headers: Record<string, string> = {}
token && (headers['Authorization'] = `Bearer ${token}`);

const { pending, data: categoryDatas, error } = useLazyFetch('http://localhost:5142/api/BlogMeta', {
  params: {
    type: 1,
    pageNumber: 1,
    pageSize: 100
  },
  headers,
  server: false
})

watch(categoryDatas, () => {
  data.value = (categoryDatas.value as GlobalPagedResponse<BlogMeta>).items
})

const modalText = ref<string>('Content of the modal');
const addVisible = ref<boolean>(false);
const confirmLoading = ref<boolean>(false);

const showModal = () => {
  addVisible.value = true;
};

const formRef = ref<FormInstance>();
const handleOk = async () => {
  let isSucceeded = false
  try {
    await formRef.value?.validateFields();
    isSucceeded = true;
  } catch (error) {
    isSucceeded = false
  }
  if (isSucceeded) {
    modalText.value = 'The modal will be closed after two seconds';
    confirmLoading.value = true;
    setTimeout(() => {
      addVisible.value = false;
      confirmLoading.value = false;
    }, 2000);
  }
};
interface FormState {
  name: string;
  description: string;
  parent: number
}

const formState = reactive<FormState>({
  name: '',
  description: '',
  parent: 0
});
const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
const rules: Record<string, Rule[]> = {
  name: [{ required: true, trigger: 'change' }],
  description: [{ max: 255, trigger: 'change' }],
};


</script>

<style>
</style>
