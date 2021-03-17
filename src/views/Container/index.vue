<template>
  <a-config-provider :locale="locale">
    <a-layout style="min-height: 100%; min-width: 1200px; background-color: white">
      <a-layout-header style="height: 58px">
        <a-row :gutter="[16,0]">
          <a-col :span="12">
            <a-menu
                theme="dark"
                mode="horizontal"
                v-model:selectedKeys="selectedKeys"
                style="line-height: 58px"
            >
              <a-menu-item key="1">Home</a-menu-item>
              <a-menu-item key="2">About</a-menu-item>
            </a-menu>
          </a-col>
          <a-col :span="12">
            <div style="text-align: right">
              <span style="color: white">fghfgh</span>
            </div>
          </a-col>
        </a-row>
      </a-layout-header>

      <a-layout-content style="padding: 0 50px; margin:0 auto;">
        <div class="main-content">
          <a-row :gutter="32">
            <a-col :span="16">
              <router-view/>
            </a-col>
            <a-col :span="8">
              <div class="tag-container" style="margin-top: 102px;">
                <a-table
                    :columns="columns"
                    :data-source="tags"
                    :pagination="false"
                    size="middle"
                    rowKey="tag_id"
                    bordered
                />
              </div>
            </a-col>
          </a-row>
        </div>
      </a-layout-content>

      <a-layout-footer style="text-align: center; background-color: white">
        ©2021 Created by Stupid Pig
      </a-layout-footer>
    </a-layout>
  </a-config-provider>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue';
import { getTags } from "@/api/tags";
import zhCN from 'ant-design-vue/es/locale/zh_CN';

export default defineComponent({
  setup() {
    const loadingMore = ref(false);
    const showLoadingMore = ref(true);
    const loadingTags = ref(false)
    const tags = ref([])

    let page = 1

    const onLoadMore = async () => {
      loadingMore.value = true
      page++
      const data = await getTags({
        params: {
          size: 10,
          page
        }
      })
      // 从后端拿数据
      tags.value.push(...data.items)
      // 是否显示加载，加载好了不转圈
      showLoadingMore.value = data.has_more
      loadingMore.value = false
    }

    // 生命周期
    onMounted(async () => {
      loadingTags.value = true
      const data = await getTags({
        params: {
          size: 10,
          page
        }
      })
      tags.value = data.items
      showLoadingMore.value = data.has_more
      loadingTags.value = false
    })

    return {
      tags,
      loadingTags,
      loadingMore,
      showLoadingMore,
      onLoadMore,
      selectedKeys: ref(['1']),
      locale: zhCN,
      columns: [
        {
          title: '标签',
          dataIndex: 'tag',
          key: 'tag_id',
        }
      ]
    }
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

.tag-loading {
  top: 50px
}
</style>
