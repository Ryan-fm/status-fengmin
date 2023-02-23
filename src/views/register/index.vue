<template>
  <div class="login-container">
    <div class="login-card">
	 <div class="title">
        注册
      </div>
      <div class="content">
        <a-form
			:model="formState"
			name="basic"
			ref="formRef"
			:label-col="{ span: 8 }"
			:wrapper-col="{ span: 16 }"
			autocomplete="off"
			:rules="rules"
			@finish="onFinish"
			@finishFailed="onFinishFailed"
			>
			<a-form-item
			label="账户名"
			name="username"
			:rules="[{ required: true, message: 'Please input your username!' }]"
			>
			<a-input v-model:value="formState.username" />
			</a-form-item>

			<a-form-item
			label="密码"
			name="password"
			>
			<a-input-password v-model:value="formState.password" />
			</a-form-item>
			<a-form-item
			label="确认密码"
			name="retype"
			>
			<a-input-password v-model:value="formState.retype" />
			</a-form-item>
			<a-form-item :wrapper-col="{ offset: 8, span: 16 }">
			<a-button type="primary" html-type="submit">Submit</a-button>
			<a-button style="margin-left: 10px" @click="resetForm">Reset</a-button>
			</a-form-item>
		</a-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { register } from "@/service/LoginApi";
import { message } from "ant-design-vue/es";
import type { FormInstance } from 'ant-design-vue';
interface FormState {
  username: string;
  password: string;
  retype: string;
}
const formRef = ref<FormInstance>();
const formState = reactive<FormState>({
	username: '',
	password: '',
	retype:''
});
const resetForm = () => {
	formRef.value.resetFields();
};
let validatePass = async (_rule: Rule, value: string) => {
	if (value === '') {
	return Promise.reject('Please input the password');
	} else {
	if (formState.retype !== '') {
		formRef.value.validateFields('retype');
	}
	return Promise.resolve();
	}
};
let validatePass2 = async (_rule: Rule, value: string) => {
	if (value === '') {
	return Promise.reject('Please input the password again');
	} else if (value !== formState.password) {
	return Promise.reject("Two inputs don't match!");
	} else {
	return Promise.resolve();
	}
};
const rules: Record<string, Rule[]> = {
	username: [{ required: true, message: 'Please input your username!' }],
	password: [{ required: true, validator: validatePass, trigger: 'change' }],
	retype: [{ required: true,validator: validatePass2, trigger: 'change' }],
};

const router = useRouter();

const onFinish = () => {
	console.log(formState);
	
	register(formState).then((res: any) => {
    if (res.code !== 0) return message.error(res.msg);
		resetForm();
		message.success("注册成功");
	});
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
