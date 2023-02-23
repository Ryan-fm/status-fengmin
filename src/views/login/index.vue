<template>
  <div class="login-container">
    <div class="login-card">
	 <div class="title" @click="test">
        LOGIN IN
      </div>
      <div class="content">
        <a-form
        :model="formState"
        name="basic"
        ref="formRef"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
        >
        <a-form-item
        label="username"
        name="username"
        :rules="[{ required: true, message: 'Please input your username!' }]"
        >
        <a-input v-model:value="formState.username" />
        </a-form-item>

        <a-form-item
        label="password"
        name="password"
        :rules="[{ required: true, message: 'Please input your password!' }]"
        >
        <a-input-password v-model:value="formState.password" />
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button type="primary" html-type="submit">Submit</a-button>
          <a-button style="margin-left: 10px" @click="resetForm">Reset</a-button>
        <div>
          <router-link style="float: right" to="/register">sign up</router-link>
        </div>
        </a-form-item>
      </a-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { login } from "@/service/LoginApi";
import { message } from "ant-design-vue/es";
import type { FormInstance } from 'ant-design-vue';
import storage from '@/utils/useStorage'
interface FormState {
  username: string;
  password: string;
}
const test = ()=>{
   storage.set('isCookie',true)
 
}
const formState = reactive<FormState>({
	username: '',
	password: '',
});
/** 登录表单校验规则 */
const loginFormRules: FormRules = {
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
  ]
}
const formRef = ref<FormInstance>();
const resetForm = () => {
	formRef.value.resetFields();
};
const router = useRouter();


const onFinish = () => {
	login(formState).then((res: any) => {
		if (res.code !== 0) return message.error(res.msg);
    router.push({ name: "home" });
     storage.set('isCookie',true)
	})
};
const onFinishFailed = (errorInfo: any) => {
	console.log('Failed:', errorInfo);
};
</script>
<style lang="scss" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100%;
  .theme-switch {
    position: fixed;
    top: 5%;
    right: 5%;
    cursor: pointer;
  }
  .login-card {
    width: 480px;
    border-radius: 20px;
    box-shadow: 0 0 10px #dcdfe6;
    background-color: #fff;
    overflow: hidden;
    .title {
      font-size: 33px;
      color: rgba(0, 0, 0, 0.85);
      font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
      font-weight: 600;
      text-align:center;
      top: 2px;
     
    }
    .content {
      padding: 20px 50px 50px 50px;
      :deep(.el-input-group__append) {
        padding: 0;
        overflow: hidden;
        .el-image {
          width: 100px;
          height: 40px;
          border-left: 0px;
          user-select: none;
          cursor: pointer;
          text-align: center;
        }
      }
      .el-button {
        width: 100%;
        margin-top: 10px;
      }
    }
  }
}
</style>
