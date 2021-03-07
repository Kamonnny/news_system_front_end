<template>
  <p class="title">猪猪新闻</p>

  <a-list
      item-layout="vertical"
      size="large"
      :pagination="false"
      :data-source="listData"
      style="background-color: white; padding: 0 24px"
  >
    <template #renderItem="{ item }">
      <a-list-item key="item.title">
        <template #actions>
          <spam>
            <MessageOutlined/>
            {{ item.comments_count }}
          </spam>
          <spam>
            <AlertOutlined/>
            {{ item.views }}
          </spam>
        </template>
        <a-list-item-meta :description="item.content">
          <template #title>
            <a :href="item.href">{{ item.title }}</a>
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
  </a-list>
  <br>
  <a-pagination v-model:current="current" :total="50" show-less-items/>
</template>

<script>
import { onMounted, ref } from 'vue'
import { AlertOutlined, MessageOutlined } from '@ant-design/icons-vue';
import { getNews } from "@/api/news";


export default {
  components: {
    AlertOutlined,
    MessageOutlined,
  },

  setup() {
    const fetchConfig = {
      params:{
        page: 1,
        size: 5
      }
    }
    const listData = ref([])

    onMounted(async () => {
      const data = await getNews(fetchConfig)
      listData.value = data.items
    })

    const actions = [
      {
        type: 'MessageOutlined',
        text: '2',
      },
      {
        type: 'AlertOutlined',
        text: '156',
      },
    ];

    return {
      fetchConfig,
      listData,
      current: 2,
      actions,
    };
  },
};
</script>

<style lang="less" scoped>
.title {
  font-size: 40px;
}
</style>