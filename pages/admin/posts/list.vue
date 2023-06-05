<template>
  <a-space direction="vertical" style="width: 100%;">
    <a-form layout="inline" :model="formState" @finish="handleFinish" @finishFailed="handleFinishFailed">
      <a-form-item>
        <a-select ref="select" v-model:value="formState.status" style="width: 120px">
          <a-select-option :value="-1">全部</a-select-option>
          <a-select-option :value="0">草稿</a-select-option>
          <a-select-option :value="1">已发布</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-input v-model:value="formState.title" placeholder="search title." />
      </a-form-item>
      <a-form-item>
        <a-space>
          <a-button type="primary" html-type="submit">
            <template #icon>
              <search-outlined />
            </template>
          </a-button>
          <a-button type="dashed" @click="$router.push('/admin/posts/create')">
            <template #icon>
              <file-add-outlined />
            </template>
          </a-button>
        </a-space>
      </a-form-item>
    </a-form>

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
            <a-divider type="vertical" />
            <a class="ant-dropdown-link">
              More actions
              <down-outlined />
            </a>
          </span>
        </template>
      </template>
    </a-table>
  </a-space>
</template>

<script setup lang='ts'>
import { message } from 'ant-design-vue';
import { getPosts } from '~/utils/api'
import { DownOutlined, SearchOutlined, FileAddOutlined } from '@ant-design/icons-vue';
import type { UnwrapRef } from 'vue';
import type { FormProps } from 'ant-design-vue';
import { GlobalPagedResponse, PostType } from '~/types/appTypes';

interface FormState {
  user: string;
  title: string;
  status: number
}

const data = ref<PostType[]>([])
const formState: UnwrapRef<FormState> = reactive({
  user: '',
  title: '',
  status: -1
});
const handleFinish: FormProps['onFinish'] = values => {
  console.log(values, formState);
};
const handleFinishFailed: FormProps['onFinishFailed'] = errors => {
  console.log(errors);
};

const loading = ref<boolean>(false)

const getData = () => {
  loading.value = true;

  getPosts().then(res => {
    data.value = (res.value as GlobalPagedResponse<PostType>).items
  }).catch(err => {
    message.error(err)
  }).finally(() => {
    loading.value = true
  })
}

onMounted(() => getData())

const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'CommentCount',
    key: 'commentCount',
    dataIndex: 'commentCount',
  },
  {
    title: 'Action',
    key: 'action',
  },
];

</script>
