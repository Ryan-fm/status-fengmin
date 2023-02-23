<template>
  <div class="common-layout">
    <div class="top">
      <div class="header">
        <span class="title">欢迎</span>
      </div>
      <a-button :loading="logging" style="margin-top: 24px" size="large" type="primary" @click="handleClick">登录</a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const handleClick = () => {
	router.push({ name: "login" });
}
</script>

<style scoped>
.common-layout{
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
  background-image: url('https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg');
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: 110px;
  background-size: 100%;
}
.top {
    text-align: center;
}
.title {
	font-size: 33px;
	color: @title-color;
	font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
	font-weight: 600;
	position: relative;
	top: 2px;
}
</style>
