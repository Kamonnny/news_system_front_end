<template>
  <a-layout style="min-height: 100%; min-width: 1200px;">
    <a-layout-header style="height: 58px">
      <a-menu
          theme="dark"
          mode="horizontal"
          v-model:selectedKeys="selectedKeys"
          style="line-height: 58px"
      >
        <a-menu-item key="1">Home</a-menu-item>
        <a-menu-item key="2">About</a-menu-item>
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
              <a-list
                  bordered
                  size="small"
                  style="min-height: 100px"
                  :header="loadingTags?'':'新闻标签'"
                  :data-source="tags"
                  :loading="{
                    spinning:loadingTags,
                    wrapperClassName:loadingTags?'tag-loading':''
                  }"
              >
                <template #loadMore>
                  <div
                      v-if="showLoadingMore && !loadingTags"
                      style="text-align: center; margin-top: 12px; margin-bottom: 8px; height: 32px; line-height: 32px;"
                  >
                    <a-spin v-if="loadingMore"/>
                    <a v-else @click="onLoadMore">加载更多</a>
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
      ©2021 Created by Stupid Pig
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
      tags.value.push(...data.items)
      console.log(tags.value)
      showLoadingMore.value = data.has_more
      loadingMore.value = false
    }

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
