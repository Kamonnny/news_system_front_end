<template>
  <a-layout style="height: 100%; min-width: 1200px;">
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
            <div class="tag-container" style="margin-top: 102px;">
              <a-list size="small" bordered :loading="{
                spinning:loadingTags,
                wrapperClassName:loadingTags?'tag-loading':''
              }" :header="loadingTags?'':'新闻标签'" :data-source="tags" style="min-height: 100px">
                <template #loadMore>
                  <div
                      v-if="showLoadingMore && !loadingTags"
                      style="text-align: center; margin-top: 12px; margin-bottom: 8px; height: 32px; line-height: 32px;"
                  >
                    <a-spin v-if="loadingMore"/>
                    <a v-else>加载更多</a>
                  </div>
                </template>
                <template #renderItem="{ item }">
                  <a-list-item>{{ item.tag }}</a-list-item>
                </template>
              </a-list>
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
import { defineComponent, onMounted, ref } from 'vue';
import { getTags } from "@/api/tags";

export default defineComponent({
  setup() {
    const loadingMore = ref(false);
    const showLoadingMore = ref(true);
    const loadingTags = ref(false)
    const tags = ref([])

    const fetchTags = async page => {
      const data = await getTags({
        params: {
          size: 10,
          page
        }
      })
      tags.value = data.items
      showLoadingMore.value = data.has_more
    }

    onMounted(async () => {
      loadingTags.value = true
      await fetchTags(1)
      loadingTags.value = false
    })

    return {
      tags,
      loadingTags,
      loadingMore,
      showLoadingMore,
      selectedKeys: ref(['2']),
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
