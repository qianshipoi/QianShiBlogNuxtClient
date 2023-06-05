<template>
  <div class="login">
    <a-card style="width: 400px">
      <h1>LOGIN</h1>
      <a-form :model="formState" name="basic" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }" autocomplete="off"
        @finish="onFinish" @finishFailed="onFinishFailed">
        <a-form-item label="邮箱" name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
          <a-input v-model:value="formState.username" />
        </a-form-item>

        <a-form-item label="密码" name="password" :rules="[{ required: true, message: 'Please input your password!' }]">
          <a-input-password v-model:value="formState.password" />
        </a-form-item>

        <a-form-item :wrapper-col="{ span: 24 }">
          <a-button type="primary" html-type="submit" style="width: 100%;" :loading="loading">登录</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script setup lang='ts'>

import { message } from 'ant-design-vue';
import { login } from '../utils/api'

definePageMeta({
  layout: 'none'
})


interface FormState {
  username: string;
  password: string;
}
const formState = reactive<FormState>({
  username: 'kuriyama@qq.com',
  password: 'a123456a',
});

const token = useCookie('token')
const router = useRouter()
const route = useRoute()
const loading = ref<boolean>(false)

const onFinish = (values: any) => {
  loading.value = true;

  login(formState.username.trim(), formState.password.trim()).then(res => {
    if (res.value.succeeded) {
      message.success('登录成功！')
      token.value = res.value.data.jwToken
      const redirect = route.query['redirect']?.toString()
      redirect && navigateTo(redirect)
    } else {
      message.warning(res.value.message)
    }
  }).catch(err => {
    message.error(err)
  }).finally(() => {
    loading.value = false;
  })
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

