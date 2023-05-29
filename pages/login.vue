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
definePageMeta({
  layout: 'none'
})

interface FormState {
  username: string;
  password: string;
}
const formState = reactive<FormState>({
  username: '',
  password: '',
});

const loading = ref<boolean>(false)

const onFinish = (values: any) => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false
  }, 3000);
  console.log('Success:', values);
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

