<template>
  <a-layout style="height: 100%">
    <a-layout-header style="height: 58px">
      <a-menu
          theme="dark"
          mode="horizontal"
          v-model:selectedKeys="selectedKeys"
          style="line-height: 58px"
      >
        <a-menu-item key="1">nav 1</a-menu-item>
        <a-menu-item key="2">nav 2</a-menu-item>
        <a-menu-item key="3">nav 3</a-menu-item>
      </a-menu>
    </a-layout-header>

    <a-layout-content style="padding: 0 50px; margin:0 auto;">
      <div class="main-content">
        <a-row :gutter="16">
          <a-col :span="16">
            <router-view/>
          </a-col>
          <a-col :span="8">
            <div class="tag-container">
              标签
            </div>
          </a-col>
        </a-row>
      </div>
    </a-layout-content>

    <a-layout-footer style="text-align: center">
      Ant Design ©2018 Created by Ant UED
    </a-layout-footer>
  </a-layout>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    return {
      selectedKeys: ref(['2']),
    };
  },
});
</script>

<style lang="less">
.main-content {
  margin-top: 40px;
  width: 1100px;

  .tag-container {
    background: #fff;
  }
}
</style>
